/**
 * editor-tokens.js
 *
 * Parses extracted design system JSON files for a given site and returns
 * structured token maps suitable for an editor UI. Each token has a label,
 * a raw CSS value, and a type hint for the control to render.
 *
 * Usage:
 *   import { parseEditorTokens } from './server/editor-tokens.js';
 *   const tokens = parseEditorTokens('/abs/path/to/design-system/pale-draft', 'pale-draft');
 */

import fs from 'fs';
import path from 'path';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

/**
 * Read and parse a JSON file. Returns null on any error (missing file,
 * parse failure, permission issue) — never throws.
 * @param {string} filePath  Absolute path to a JSON file
 * @returns {object|null}
 */
function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return null;
  }
}

/**
 * Convert a camelCase string to kebab-case.
 * Examples:
 *   pageBackground  → page-background
 *   bodyText        → body-text
 *   maxWidth        → max-width
 * @param {string} str
 * @returns {string}
 */
function camelToKebab(str) {
  return str.replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`);
}

/**
 * Build a human-readable label from a CSS variable name.
 * Strips the `--` prefix, strips common category prefixes, replaces hyphens
 * with spaces, and title-cases each word.
 *
 * Examples:
 *   --color-page-bg           → "Page Bg"
 *   --font-size-heading-xl    → "Size Heading Xl"
 *   --duration-fast           → "Fast"
 *   --grid-max-width          → "Max Width"
 *   --bs-border-radius-sm     → "Border Radius Sm"
 * @param {string} cssVarName  Full CSS variable name including `--`
 * @returns {string}
 */
function makeLabel(cssVarName) {
  // Strip leading --
  let s = cssVarName.startsWith('--') ? cssVarName.slice(2) : cssVarName;

  // Strip known category prefixes (longest first to avoid partial matches)
  const prefixes = [
    'font-letter-spacing-',
    'font-size-',
    'font-weight-',
    'font-',
    'color-',
    'grid-',
    'spacing-',
    'motion-',
    'duration-',
    'ease-',
    'hover-',
    'transition-',
    'bs-',
  ];
  for (const prefix of prefixes) {
    if (s.startsWith(prefix)) {
      s = s.slice(prefix.length);
      break;
    }
  }

  // Replace hyphens with spaces and title-case each word
  return s
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Infer an editor control type from the CSS variable name and value.
 * @param {string} key    Full CSS variable name (e.g. "--color-page-bg")
 * @param {string} value  The CSS value string
 * @returns {string}  One of: color | font | clamp | weight | em | px | duration | easing | opacity | text
 */
function inferType(key, value) {
  const v = String(value).trim();
  const k = String(key).toLowerCase();

  // Color: hex, rgb(), hsl()
  if (/^#[0-9a-fA-F]{3,8}$/.test(v) || /^rgba?\(/i.test(v) || /^hsla?\(/i.test(v)) {
    return 'color';
  }

  // Font family: key is a known font-family var, or value contains quoted font names
  if (
    /font-(edito|primary|secondary|body|heading|mono)/.test(k) ||
    (v.includes('"') && /[A-Z]/.test(v))
  ) {
    return 'font';
  }

  // Clamp
  if (v.startsWith('clamp(')) {
    return 'clamp';
  }

  // Font weight: key contains "weight" and value is a numeric 100–900
  if (k.includes('weight') && /^\d{3}$/.test(v) && Number(v) >= 100 && Number(v) <= 900) {
    return 'weight';
  }

  // Duration: matches digits + optional decimal + "s" with no other units
  if (/^\d+\.?\d*s$/.test(v)) {
    return 'duration';
  }

  // Easing: named keywords or cubic-bezier
  if (
    v === 'ease' ||
    v === 'ease-in' ||
    v === 'ease-out' ||
    v === 'ease-in-out' ||
    v === 'linear' ||
    v.startsWith('cubic-bezier')
  ) {
    return 'easing';
  }

  // Opacity: key contains "opacity" and value is a number 0–1 (integer or decimal)
  if (k.includes('opacity') && /^\d*\.?\d+$/.test(v)) {
    const num = parseFloat(v);
    if (num >= 0 && num <= 1) return 'opacity';
  }

  // em unit
  if (v.endsWith('em')) {
    return 'em';
  }

  // px-like: rem, px, %, vw, vh, vmin, vmax, or plain number
  if (/(\d)(rem|px|%|vw|vh|vmin|vmax)$/.test(v) || /^\d+\.?\d*$/.test(v)) {
    return 'px';
  }

  // Fallback
  return 'text';
}

// ---------------------------------------------------------------------------
// Per-category extractors
// ---------------------------------------------------------------------------

/**
 * Extract color tokens from color-system/colors.json.
 * Primary source is `elements` (camelCase semantic map).
 * Also merges any populated `cssVars` entries (future-proof).
 * Skips "transparent" values and var() aliases.
 * @param {string} siteDir
 * @returns {Record<string, {label: string, value: string, type: string}>}
 */
function extractColors(siteDir) {
  const data = readJson(path.join(siteDir, 'color-system/colors.json'));
  if (!data) return {};

  const result = {};

  // --- Pull from elements (camelCase semantic map) ---
  const elements = data.elements ?? {};
  for (const [camel, value] of Object.entries(elements)) {
    if (!value) continue;
    const v = String(value).trim();
    if (v === 'transparent' || v.startsWith('var(')) continue;
    const varName = `--color-${camelToKebab(camel)}`;
    result[varName] = {
      label: makeLabel(varName),
      value: v,
      type: inferType(varName, v),
    };
  }

  // --- Merge from cssVars if populated (future-proof) ---
  for (const [key, value] of Object.entries(data.cssVars ?? {})) {
    if (!value) continue;
    const v = String(value).trim();
    if (v.startsWith('var(')) continue;
    const varName = key.startsWith('--') ? key : `--${key}`;
    if (!result[varName]) {
      result[varName] = {
        label: makeLabel(varName),
        value: v,
        type: inferType(varName, v),
      };
    }
  }

  return result;
}

/**
 * Extract typography tokens from type-system/typography.json.
 * Source is `cssVars` — keys are without `--` prefix, values are CSS strings.
 * Skips var() aliases.
 * @param {string} siteDir
 * @returns {Record<string, {label: string, value: string, type: string}>}
 */
function extractTypography(siteDir) {
  const data = readJson(path.join(siteDir, 'type-system/typography.json'));
  if (!data) return {};

  const result = {};
  for (const [key, value] of Object.entries(data.cssVars ?? {})) {
    if (!value) continue;
    const v = String(value).trim();
    if (v.startsWith('var(')) continue;
    const varName = key.startsWith('--') ? key : `--${key}`;
    result[varName] = {
      label: makeLabel(varName),
      value: v,
      type: inferType(varName, v),
    };
  }

  return result;
}

/**
 * Extract spacing tokens from spacing-system/spacing.json.
 * Source is `cssVars` only — `elements` contains nested objects and is skipped.
 * Keys are without `--` prefix; prepend `--` before storing.
 * @param {string} siteDir
 * @returns {Record<string, {label: string, value: string, type: string}>}
 */
function extractSpacing(siteDir) {
  const data = readJson(path.join(siteDir, 'spacing-system/spacing.json'));
  if (!data) return {};

  const result = {};
  for (const [key, value] of Object.entries(data.cssVars ?? {})) {
    if (!value) continue;
    const v = String(value).trim();
    if (v.startsWith('var(')) continue;
    const varName = key.startsWith('--') ? key : `--${key}`;
    result[varName] = {
      label: makeLabel(varName),
      value: v,
      type: inferType(varName, v),
    };
  }

  return result;
}

/**
 * Extract grid tokens from grid-system/grid.json.
 * Prefers populated `cssVars`. Falls back to `container` camelCase keys
 * mapped to `--grid-{kebab}` variables.
 * @param {string} siteDir
 * @returns {Record<string, {label: string, value: string, type: string}>}
 */
function extractGrid(siteDir) {
  const data = readJson(path.join(siteDir, 'grid-system/grid.json'));
  if (!data) return {};

  const result = {};

  // Try cssVars first
  const cssVars = data.cssVars ?? {};
  const hasCssVars = Object.keys(cssVars).length > 0;

  if (hasCssVars) {
    for (const [key, value] of Object.entries(cssVars)) {
      if (!value) continue;
      const v = String(value).trim();
      if (v.startsWith('var(')) continue;
      const varName = key.startsWith('--') ? key : `--${key}`;
      result[varName] = {
        label: makeLabel(varName),
        value: v,
        type: inferType(varName, v),
      };
    }
    return result;
  }

  // Fallback: pull from container camelCase map
  const container = data.container ?? {};
  for (const [camel, value] of Object.entries(container)) {
    if (!value) continue;
    const v = String(value).trim();
    if (v.startsWith('var(')) continue;
    const varName = `--grid-${camelToKebab(camel)}`;
    result[varName] = {
      label: makeLabel(varName),
      value: v,
      type: inferType(varName, v),
    };
  }

  return result;
}

/**
 * Sanitize a timing value to a safe CSS variable name suffix.
 * Examples:
 *   "0.195s"                        → "0-195s"
 *   "ease-out"                      → "ease-out"
 *   "cubic-bezier(0.4, 0, 0.2, 1)" → "cubic-bezier-0-4-0-0-2-1"
 * @param {string} value
 * @returns {string}
 */
function sanitizeTokenSuffix(value) {
  return value
    .replace(/\(/g, '-')
    .replace(/\)/g, '')
    .replace(/,\s*/g, '-')
    .replace(/\./g, '-')
    .replace(/\s+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Extract motion tokens from motion-system/motion.json.
 * There is no cssVars field; synthesize tokens from:
 *   cssAnimations.timingTokens.durations  → --duration-{sanitized}
 *   cssAnimations.timingTokens.easings    → --ease-{sanitized}
 * @param {string} siteDir
 * @returns {Record<string, {label: string, value: string, type: string}>}
 */
function extractMotion(siteDir) {
  const data = readJson(path.join(siteDir, 'motion-system/motion.json'));
  if (!data) return {};

  const result = {};
  const timing = data?.cssAnimations?.timingTokens ?? {};

  const durations = Array.isArray(timing.durations) ? timing.durations : [];
  for (const value of durations) {
    if (!value) continue;
    const v = String(value).trim();
    const suffix = sanitizeTokenSuffix(v);
    const varName = `--duration-${suffix}`;
    result[varName] = {
      label: makeLabel(varName),
      value: v,
      type: inferType(varName, v),
    };
  }

  const easings = Array.isArray(timing.easings) ? timing.easings : [];
  for (const value of easings) {
    if (!value) continue;
    const v = String(value).trim();
    const suffix = sanitizeTokenSuffix(v);
    const varName = `--ease-${suffix}`;
    result[varName] = {
      label: makeLabel(varName),
      value: v,
      type: inferType(varName, v),
    };
  }

  return result;
}

/**
 * Extract interaction tokens from interaction-states/interactions.json.
 *
 * For each component group (buttons, links, cards, navigation):
 *   hover.opacity  → --hover-{key}-opacity
 *   default.transition → --transition-{key}
 *
 * For inputs:
 *   focus.transition → --transition-{key}-focus
 *
 * @param {string} siteDir
 * @returns {Record<string, {label: string, value: string, type: string}>}
 */
function extractInteractions(siteDir) {
  const data = readJson(path.join(siteDir, 'interaction-states/interactions.json'));
  if (!data) return {};

  const result = {};

  /**
   * Process a component group (buttons, links, cards, navigation).
   * Each entry may have default.transition and hover.opacity.
   */
  function processGroup(groupKey, group) {
    if (!group || typeof group !== 'object') return;
    for (const [componentKey, states] of Object.entries(group)) {
      if (!states || typeof states !== 'object') continue;
      const slug = componentKey; // e.g. "default-button", "default-link"

      // hover.opacity → --hover-{slug}-opacity
      const hoverOpacity = states?.hover?.opacity;
      if (hoverOpacity != null) {
        const v = String(hoverOpacity).trim();
        const varName = `--hover-${slug}-opacity`;
        result[varName] = {
          label: makeLabel(varName),
          value: v,
          type: inferType(varName, v),
        };
      }

      // default.transition → --transition-{slug}
      const defaultTransition = states?.default?.transition;
      if (defaultTransition) {
        const v = String(defaultTransition).trim();
        const varName = `--transition-${slug}`;
        result[varName] = {
          label: makeLabel(varName),
          value: v,
          type: inferType(varName, v),
        };
      }
    }
  }

  // Process all component groups
  processGroup('buttons', data.buttons);
  processGroup('links', data.links);
  processGroup('cards', data.cards);
  processGroup('navigation', data.navigation);

  // Inputs: use focus.transition (more meaningful than default for inputs)
  const inputs = data.inputs ?? {};
  for (const [componentKey, states] of Object.entries(inputs)) {
    if (!states || typeof states !== 'object') continue;
    const focusTransition = states?.focus?.transition;
    if (focusTransition) {
      const v = String(focusTransition).trim();
      const varName = `--transition-${componentKey}-focus`;
      result[varName] = {
        label: makeLabel(varName),
        value: v,
        type: inferType(varName, v),
      };
    }
  }

  return result;
}

// ---------------------------------------------------------------------------
// Pages and assets enumeration
// ---------------------------------------------------------------------------

/** Extensions recognized as design assets */
const ASSET_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.mp4', '.webm']);

/**
 * Enumerate HTML pages found in the site's landing-page/ directory.
 * Returns an empty array if the directory does not exist or is unreadable.
 * @param {string} siteDir
 * @param {string} siteName
 * @returns {Array<{label: string, url: string}>}
 */
function enumeratePages(siteDir, siteName) {
  const landingDir = path.join(siteDir, 'landing-page');
  try {
    const files = fs.readdirSync(landingDir).filter((f) => f.endsWith('.html'));
    return files.map((f) => ({
      label:
        f === 'index.html'
          ? 'Home'
          : f
              .replace('.html', '')
              .replace(/-/g, ' ')
              .replace(/\b\w/g, (c) => c.toUpperCase()),
      url: `/site/${siteName}/landing-page/${f}`,
    }));
  } catch {
    return [];
  }
}

/**
 * Enumerate asset files found in the site's landing-page/assets/ directory.
 * Returns an empty array if the directory does not exist or is unreadable.
 * @param {string} siteDir
 * @param {string} siteName
 * @returns {Array<{name: string, path: string, isCurrent: boolean}>}
 */
function enumerateAssets(siteDir, siteName) {
  const assetsDir = path.join(siteDir, 'landing-page/assets');
  try {
    const files = fs
      .readdirSync(assetsDir)
      .filter((f) => ASSET_EXTENSIONS.has(path.extname(f).toLowerCase()));
    return files.map((f) => ({
      name: f,
      path: `/site/${siteName}/assets/${f}`,
      isCurrent: true,
    }));
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Parse all extracted design system JSON files for a given site and return
 * a structured token map grouped by design category, plus pages and assets.
 *
 * @param {string} siteDir   Absolute path to the site's design-system folder
 *                           (e.g. "/abs/path/design-system/pale-draft")
 * @param {string} siteName  The site slug (e.g. "pale-draft")
 * @returns {{
 *   colors:       Record<string, {label: string, value: string, type: string}>,
 *   typography:   Record<string, {label: string, value: string, type: string}>,
 *   spacing:      Record<string, {label: string, value: string, type: string}>,
 *   grid:         Record<string, {label: string, value: string, type: string}>,
 *   motion:       Record<string, {label: string, value: string, type: string}>,
 *   interactions: Record<string, {label: string, value: string, type: string}>,
 *   pages:        Array<{label: string, url: string}>,
 *   assets:       Array<{name: string, path: string, isCurrent: boolean}>
 * }}
 */
export function parseEditorTokens(siteDir, siteName) {
  return {
    colors:       extractColors(siteDir),
    typography:   extractTypography(siteDir),
    spacing:      extractSpacing(siteDir),
    grid:         extractGrid(siteDir),
    motion:       extractMotion(siteDir),
    interactions: extractInteractions(siteDir),
    pages:        enumeratePages(siteDir, siteName),
    assets:       enumerateAssets(siteDir, siteName),
  };
}
