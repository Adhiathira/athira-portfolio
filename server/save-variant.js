/**
 * server/save-variant.js
 *
 * Copies a design system folder to a new variant name and patches its
 * CSS token file with overrides.
 *
 * Part of the design-system platform — handles variant creation for the
 * local design system browser and editor workflows.
 */

import fs from 'node:fs';
import path from 'node:path';

// ─── Validation ──────────────────────────────────────────────────────────────

/**
 * Validates a site/variant name segment.
 * Rejects any value containing path traversal characters.
 * @param {string} name
 * @returns {boolean}
 */
function isValidSegment(name) {
  if (typeof name !== 'string') return false;
  if (name.includes('/') || name.includes('..') || name === '.') return false;
  return true;
}

/**
 * Validates a variant name against the slug pattern.
 * Must start with a lowercase letter or digit, then 1-63 chars of [a-z0-9\-_].
 * @param {string} name
 * @returns {boolean}
 */
function isValidVariantName(name) {
  return /^[a-z0-9][a-z0-9\-_]{1,63}$/.test(name);
}

// ─── CSS Override Patching ────────────────────────────────────────────────────

/**
 * Applies a map of CSS variable overrides to CSS source text.
 * For each variable name, finds the existing declaration in any :root block
 * (or anywhere in the file) and replaces only the value portion.
 *
 * If a variable is not found in the file it is silently skipped — the caller
 * is responsible for knowing which variables exist in the tokens file.
 *
 * @param {string} cssContent - Full content of tokens.css
 * @param {Record<string, string>} overrides - { "--css-var-name": "new-value" }
 * @returns {string} Patched CSS content
 */
function applyOverridesToCss(cssContent, overrides) {
  let result = cssContent;
  for (const [varName, value] of Object.entries(overrides)) {
    // Reject non-CSS-custom-property keys — guards against empty/invalid keys
    // producing overly broad regex patterns that corrupt the entire file.
    if (typeof varName !== 'string' || !varName.startsWith('--')) continue;
    if (typeof value !== 'string') continue;
    const escapedName = varName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`(${escapedName}\\s*:\\s*)([^;]+)(;)`, 'g');
    // Use a function replacer to prevent $ sequences in value from being
    // interpreted as backreferences by String.replace.
    result = result.replace(pattern, (_, p1, _old, p3) => p1 + value + p3);
  }
  return result;
}

// ─── Main Export ──────────────────────────────────────────────────────────────

/**
 * Copies a design system folder to a new variant name and patches its
 * tokens.css with the provided CSS variable overrides.
 *
 * @param {string} designSystemDir - Absolute path to the design-system/ root
 * @param {string} sourceSite - Name of the source folder (e.g. "pale-draft")
 * @param {string} variantName - Name for the new folder (e.g. "my-dark-theme")
 * @param {Record<string, string>} overrides - CSS variable overrides
 * @returns {{ ok: true, variantName: string }}
 * @throws {Error & { statusCode: number }} 400 | 404 | 409
 */
export async function saveVariant(designSystemDir, sourceSite, variantName, overrides) {

  // ── Step 1: Validate both name segments ──────────────────────────────────

  if (!isValidSegment(sourceSite) || !isValidSegment(variantName)) {
    const err = new Error('Invalid site or variant name: must not contain "/" or ".."');
    err.statusCode = 400;
    throw err;
  }

  if (!isValidVariantName(variantName)) {
    const err = new Error(
      'Invalid variant name: must match /^[a-z0-9][a-z0-9\\-_]{1,63}$/'
    );
    err.statusCode = 400;
    throw err;
  }

  // ── Step 2: Check source exists ───────────────────────────────────────────

  const sourcePath = path.join(designSystemDir, sourceSite);

  if (!fs.existsSync(sourcePath) || !fs.statSync(sourcePath).isDirectory()) {
    const err = new Error('Source site not found');
    err.statusCode = 404;
    throw err;
  }

  // ── Step 3: Check destination does not exist ──────────────────────────────

  const destPath = path.join(designSystemDir, variantName);

  if (fs.existsSync(destPath)) {
    const err = new Error('Variant name already exists');
    err.statusCode = 409;
    throw err;
  }

  // ── Steps 4–6: Copy source folder, patch tokens.css + assembly-log.json ──
  // All three steps share a single try/catch so that any failure — including a
  // mid-copy error from cpSync — cleans up destPath before rethrowing.
  // Without this, a partial copy would leave a directory behind and cause
  // future retries with the same variantName to receive a false 409.

  try {
    fs.cpSync(sourcePath, destPath, { recursive: true });
    const tokensCssPath = path.join(destPath, 'landing-page', 'styles', 'tokens.css');

    if (fs.existsSync(tokensCssPath)) {
      const original = fs.readFileSync(tokensCssPath, 'utf8');
      const patched = applyOverridesToCss(original, overrides);
      fs.writeFileSync(tokensCssPath, patched, 'utf8');
    }
    // If tokens.css is absent, silently skip — not an error condition

    const assemblyLogPath = path.join(destPath, 'assembly-log.json');

    let data = {};
    if (fs.existsSync(assemblyLogPath)) {
      try {
        const parsed = JSON.parse(fs.readFileSync(assemblyLogPath, 'utf8'));
        // Guard against valid JSON that isn't a plain object (null, [], "str", 42).
        // In those cases discard the value and start fresh rather than letting
        // `data.variant = ...` throw a TypeError that triggers rollback.
        data = (parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed))
          ? parsed
          : {};
      } catch {
        // Malformed JSON in the source — start fresh rather than propagating
        data = {};
      }
    }

    data.variant = {
      derivedFrom: sourceSite,
      createdAt: new Date().toISOString(),
      overrideCount: Object.keys(overrides).length,
    };

    fs.writeFileSync(assemblyLogPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    // Roll back any partial copy so the caller can retry with the same name
    fs.rmSync(destPath, { recursive: true, force: true });
    throw err;
  }

  // ── Done ──────────────────────────────────────────────────────────────────

  return { ok: true, variantName };
}
