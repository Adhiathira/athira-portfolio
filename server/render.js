import fs from 'node:fs';
import path from 'node:path';

// ─── Utilities ───────────────────────────────────────────────────────────────

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Sanitize CSS content for safe injection into <style> blocks
 * Prevents XSS by stripping characters that could break out of CSS context
 * Preserves quotes and backslashes needed for valid CSS (content, font-family, etc.)
 */
function sanitizeCSS(str) {
  return String(str)
    // Remove </style> tags (case-insensitive) to prevent breaking out of style block
    .replace(/<\/style>/gi, '')
    // Strip angle brackets to prevent HTML injection
    .replace(/[<>]/g, '')
    // Remove control characters that could break CSS parsing
    .replace(/[\r\n\x00-\x1F\x7F]/g, '')
    // Normalize whitespace (preserve single spaces)
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Validate keyframe offset format (should be percentage or 'from'/'to')
 * Supports comma-separated selectors like "0%, 100%" or "0%, 60%, 100%"
 */
function isValidKeyframeOffset(offset) {
  const sanitized = String(offset).trim();

  // Split by comma for multi-selector support (e.g., "0%, 100%")
  const selectors = sanitized.split(',').map(s => s.trim());

  // Each selector must be a valid percentage or from/to
  return selectors.length > 0 && selectors.every(sel =>
    /^(\d+(\.\d+)?%|from|to)$/.test(sel)
  );
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return {};
  }
}

function readMarkdown(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return null;
  }
}

function isEmpty(data) {
  if (!data) return true;
  if (Array.isArray(data)) return data.length === 0;
  return Object.keys(data).length === 0;
}

function isExternalSrc(src) {
  return typeof src === 'string' && (src.startsWith('http://') || src.startsWith('https://'));
}

// CSS generic font family keywords — these render differently per OS/browser.
// We surface them as 'generic' so the viewer knows the specimen is imprecise.
const GENERIC_FONT_FAMILIES = new Set([
  // CSS generic font family keywords (CSS Fonts Level 3 + 4)
  'serif', 'sans-serif', 'monospace', 'cursive', 'fantasy',
  'system-ui', 'ui-serif', 'ui-sans-serif', 'ui-monospace', 'ui-rounded',
  'emoji', 'math', 'fangsong',
  // Platform-specific system font aliases
  '-apple-system', 'blinkmacsystemfont',
  // CSS global values (inherit/initial/unset mean the actual font is unknown)
  'inherit', 'initial', 'unset', 'revert',
]);

function getFontStatus(fontFamily, fontFaces) {
  // Normalize: strip quotes, take first name in fallback stack
  const normalized = String(fontFamily || '')
    .replace(/['"]/g, '')
    .split(',')[0]
    .trim()
    .toLowerCase();

  if (!normalized) return { status: 'no-face', reason: 'No font family specified', action: null };

  if (GENERIC_FONT_FAMILIES.has(normalized)) {
    return {
      status: 'generic',
      reason: `"${normalized}" is a generic CSS keyword — the browser picks any matching system font. Actual rendering varies by OS and browser; this specimen is not a faithful representation.`,
      action: null,
    };
  }

  const faces = fontFaces || [];
  const match = faces.find(f => String(f.family || '').toLowerCase() === normalized);

  if (!match) {
    const searchUrl = `https://fonts.google.com/search?query=${encodeURIComponent(normalized)}`;
    return {
      status: 'no-face',
      reason: 'Not captured as @font-face \u2014 may load via stylesheet link',
      action: searchUrl,
    };
  }

  const src = match.src;
  if (!src) {
    return { status: 'no-src', reason: 'Font face found but source URL missing', action: null };
  }

  if (src.startsWith('fonts/')) {
    return { status: 'loadable', reason: 'Downloaded from Google Fonts (local copy)', action: null };
  }

  if (isExternalSrc(src)) {
    try {
      const domain = new URL(src).hostname;
      return { status: 'loadable', reason: `Loading from ${domain}`, action: null };
    } catch {
      return { status: 'loadable', reason: 'Loading from external source', action: null };
    }
  }

  // local() or relative path
  const searchUrl = `https://fonts.google.com/search?query=${encodeURIComponent(normalized)}`;
  return {
    status: 'local',
    reason: 'Locally installed font, not web-accessible',
    action: searchUrl,
  };
}

function formatPx(v) {
  const s = String(v);
  if (s.endsWith('px')) {
    const n = parseFloat(s);
    if (!isNaN(n)) return n.toFixed(1) + 'px';
  }
  return s;
}

const ALLOWED_FONT_STYLES = new Set(['normal', 'italic', 'oblique']);

// Strip characters that can break out of a CSS string literal or terminate the <style> block.
function safeCSSStr(s) {
  return String(s).replace(/['\\\n\r]/g, '').replace(/<\/style/gi, '');
}

function buildFontFaceCSS(fontFaces, siteName) {
  return (fontFaces || []).filter(f => isExternalSrc(f.src) || (f.src && f.src.startsWith('fonts/'))).map(f => {
    const family = safeCSSStr(f.family);
    const weight = /^\d+$/.test(String(f.weight)) ? String(f.weight) : '400';
    const style  = ALLOWED_FONT_STYLES.has(String(f.style)) ? String(f.style) : 'normal';
    const rawSrc = f.src && f.src.startsWith('fonts/')
      ? `/fonts/${siteName}/${f.src.slice('fonts/'.length)}`
      : f.src;
    const src    = safeCSSStr(rawSrc);
    const fmt    = /\.woff2(?:[?#]|$)/.test(src) ? 'woff2' : 'woff';
    return `@font-face { font-family: '${family}'; font-weight: ${weight}; font-style: ${style}; src: url('${src}') format('${fmt}'); }`;
  }).join('\n');
}

function groupKeyframesByPattern(keyframes) {
  const groups = { fade: [], slide: [], scale: [], rotate: [], other: [] };
  keyframes.forEach(kf => {
    const name = kf.name.toLowerCase();
    if (name.includes('fade')) groups.fade.push(kf);
    else if (name.includes('slide')) groups.slide.push(kf);
    else if (name.includes('scale')) groups.scale.push(kf);
    else if (name.includes('rotate') || name.includes('orbit')) groups.rotate.push(kf);
    else groups.other.push(kf);
  });
  return groups;
}

// ─── Motion-system helpers ───────────────────────────────────────────────────

function hasVideoData(videos) {
  return videos && (videos.count > 0 || videos.libraries?.length > 0 || videos.animatedGifs > 0);
}

function hasScrollData(scroll) {
  return scroll && (scroll.libraries?.length > 0 || scroll.patterns?.length > 0 || scroll.elements?.length > 0);
}

function hasMicroInteractionData(micro) {
  return micro && (
    micro.buttonTransitions?.length > 0 ||
    micro.iconAnimations?.length > 0 ||
    micro.inputFocusAnimations?.length > 0 ||
    micro.loadingStates?.length > 0
  );
}

function truncateUrl(url, maxLength = 40) {
  if (!url || url.length <= maxLength) return url;
  return url.substring(0, maxLength - 3) + '...';
}

// ─── Fonts ───────────────────────────────────────────────────────────────────

function fontLinks() {
  return `<link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">`;
}

// ─── CSS ─────────────────────────────────────────────────────────────────────

function globalCSS() {
  return `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:         #FAF9F6;
  --surface:    #FFFFFF;
  --surface-2:  #F5F4F0;
  --border:     #E9E8E4;
  --border-2:   #D4D3CE;
  --text-1:     #1C1B18;
  --text-2:     #78776E;
  --text-3:     #AEADA6;
  --mono:       #3D6070;
  --accent:     #B45309;
  --accent-bg:  #FEF3C7;
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-ui:      'DM Sans', system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', 'SF Mono', monospace;
}

body {
  background: var(--bg);
  color: var(--text-1);
  font-family: var(--font-ui);
  font-size: 14px;
  line-height: 1.6;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

a { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; }

.mono { font-family: var(--font-mono); color: var(--mono); font-size: 12px; }
.text-2 { color: var(--text-2); }
.text-3 { color: var(--text-3); }

.badge {
  display: inline-block;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 3px;
  padding: 1px 7px;
  font-size: 11px;
  font-family: var(--font-mono);
  color: var(--text-2);
  letter-spacing: 0.01em;
}

/* ─── Layout ─── */
.container { max-width: 1200px; margin: 0 auto; padding: 0 40px; }

/* ─── Header ─── */
header {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
}
.header-inner {
  display: flex;
  align-items: center;
  gap: 14px;
  height: 52px;
}
.header-mark {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: var(--text-1);
  color: var(--surface);
  font-size: 10px;
  font-weight: 600;
  font-family: var(--font-mono);
  letter-spacing: 0.04em;
  border-radius: 5px;
  flex-shrink: 0;
}
.header-title {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-1);
  letter-spacing: -0.01em;
}
.header-sep {
  color: var(--border-2);
  font-size: 20px;
  font-weight: 200;
  line-height: 1;
  margin: 0 2px;
}
.back-link {
  font-size: 12px;
  color: var(--text-2);
  display: flex;
  align-items: center;
  gap: 5px;
  transition: color 0.15s;
}
.back-link:hover { color: var(--accent); text-decoration: none; }

/* ─── Home Hero ─── */
.home-hero {
  padding: 72px 0 56px;
  border-bottom: 1px solid var(--border);
}
.home-hero-kicker {
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--accent);
  margin-bottom: 18px;
}
.home-hero-title {
  font-family: var(--font-display);
  font-size: 58px;
  font-weight: 500;
  line-height: 1.08;
  color: var(--text-1);
  letter-spacing: -0.02em;
  margin-bottom: 14px;
}
.home-hero-sub {
  font-size: 15px;
  color: var(--text-2);
  font-weight: 300;
}

/* ─── Site Grid ─── */
@keyframes cardIn {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}

.site-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
  padding: 44px 0 88px;
}
.site-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 24px;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
  animation: cardIn 0.5s ease both;
  animation-delay: var(--card-delay, 0s);
}
.site-card:hover {
  border-color: var(--accent);
  box-shadow: 0 6px 24px rgba(180,83,9,0.07), 0 1px 4px rgba(0,0,0,0.04);
  transform: translateY(-2px);
}
.site-card a { color: inherit; display: block; }
.site-card a:hover { text-decoration: none; }
.site-card-icon {
  width: 36px;
  height: 36px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  font-family: var(--font-mono);
  color: var(--text-2);
  margin-bottom: 16px;
  text-transform: uppercase;
}
.site-card-name {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-1);
  letter-spacing: -0.01em;
  margin-bottom: 4px;
}
.site-card-meta {
  font-size: 11px;
  color: var(--text-3);
  font-family: var(--font-mono);
}

.empty-state {
  padding: 88px 0;
  text-align: center;
  color: var(--text-2);
}
.empty-state code {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--mono);
  background: var(--surface-2);
  padding: 2px 6px;
  border-radius: 3px;
}

/* ─── Site Hero ─── */
.site-hero {
  padding: 44px 0 32px;
  border-bottom: 1px solid var(--border);
}
.site-hero-kicker {
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--text-3);
  margin-bottom: 8px;
}
.site-hero-name {
  font-family: var(--font-display);
  font-size: 48px;
  font-weight: 500;
  color: var(--text-1);
  letter-spacing: -0.02em;
  line-height: 1.1;
  text-transform: capitalize;
}

/* ─── Tab Bar ─── */
.tab-bar {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 10;
}
.tab-list {
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  padding: 0 40px;
}
.tab-list::-webkit-scrollbar { display: none; }

.tab-btn {
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  color: var(--text-2);
  font-size: 13px;
  font-weight: 400;
  font-family: var(--font-ui);
  padding: 14px 18px;
  white-space: nowrap;
  transition: color 0.15s, border-color 0.15s;
  letter-spacing: -0.01em;
  position: relative;
  top: 1px;
}
.tab-btn:hover { color: var(--text-1); }
.tab-btn[aria-selected="true"] {
  color: var(--accent);
  border-bottom-color: var(--accent);
  font-weight: 500;
}
.tab-btn.empty-tab { color: var(--text-3); }
.tab-btn.empty-tab:hover { color: var(--text-2); }

/* ─── Tab Panels ─── */
.tab-panel { padding: 44px 0 88px; }
.tab-panel[hidden] { display: none; }

/* ─── Section Block ─── */
.section-block { margin-bottom: 52px; }
.section-label {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--text-3);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.section-label::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
}

/* ─── Color: Visual Palette ─── */
.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
}
.color-card {
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
  background: var(--surface);
  transition: transform 0.2s, box-shadow 0.2s;
}
.color-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(0,0,0,0.08);
}
.color-fill { height: 80px; width: 100%; }
.color-info { padding: 12px 14px; }
.color-role {
  display: block;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-3);
  margin-bottom: 3px;
}
.color-hex {
  display: block;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text-1);
  font-weight: 500;
  margin-bottom: 6px;
}
.color-desc {
  display: block;
  font-size: 11px;
  color: var(--text-2);
  line-height: 1.5;
}

/* ─── Color: Chips ─── */
.chip-row { display: flex; flex-wrap: wrap; gap: 8px; }
.color-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 7px 12px;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.color-chip:hover {
  border-color: var(--border-2);
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.chip-swatch {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  flex-shrink: 0;
  border: 1px solid rgba(0,0,0,0.1);
}
.chip-label {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-1);
}
.chip-value {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-2);
}

/* ─── Typography ─── */
.font-table { width: 100%; border-collapse: collapse; }
.font-table th {
  text-align: left;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-3);
  padding: 0 16px 12px 0;
  border-bottom: 1px solid var(--border);
}
.font-table td {
  padding: 11px 16px 11px 0;
  border-bottom: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-1);
}

.type-scale { display: flex; flex-direction: column; }
.type-card {
  padding: 32px 0;
  border-bottom: 1px solid var(--border);
}
.type-card:first-child { border-top: 1px solid var(--border); }
.type-specimen {
  color: var(--text-1);
  overflow: hidden;
  max-height: 160px;
  margin-bottom: 14px;
}
.type-meta {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 10px;
}

/* ─── Spacing ─── */
.spacing-vars { display: flex; flex-direction: column; gap: 4px; }
.spacing-var-row {
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 11px 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 7px;
}
.var-name {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--accent);
  flex: 1;
}
.var-value {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-1);
}

.element-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 12px;
}
.element-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 18px;
}
.element-name {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-3);
  margin-bottom: 14px;
  font-family: var(--font-mono);
}

/* Box diagram — grid-template-* are set inline per-card for proportional scaling */
.box-diagram {
  display: grid;
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: 6px;
  overflow: hidden;
}
.bd-top    { grid-column: 1 / -1; }
.bd-bottom { grid-column: 1 / -1; }
.bd-label {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--text-2);
  background: var(--surface-2);
  padding: 0 6px;
  overflow: hidden;
  white-space: nowrap;
}
.bd-center {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 38px;
  background: var(--surface);
  font-size: 10px;
  color: var(--border-2);
  font-family: var(--font-mono);
  letter-spacing: 0.04em;
}

.extra-badges { margin-top: 10px; display: flex; flex-wrap: wrap; gap: 4px; }

/* ─── Empty Section ─── */
.empty-section {
  text-align: center;
  padding: 64px 24px;
  border: 1.5px dashed var(--border-2);
  border-radius: 10px;
  color: var(--text-3);
  background: var(--surface);
}
.empty-icon { font-size: 20px; margin-bottom: 14px; color: var(--border-2); }
.empty-section p { font-size: 14px; color: var(--text-2); margin-bottom: 6px; }
.empty-hint { font-size: 12px; color: var(--text-3); font-family: var(--font-mono); }

/* ─── Grid System ─── */
.grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
}
.grid-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 18px;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.grid-card:hover {
  border-color: var(--border-2);
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}
.grid-card-name {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-3);
  margin-bottom: 12px;
  font-family: var(--font-mono);
}
.grid-props { display: flex; flex-direction: column; gap: 6px; }
.grid-prop-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 12px;
}
.grid-prop-key {
  color: var(--text-2);
  font-family: var(--font-mono);
}
.grid-prop-value {
  color: var(--text-1);
  font-family: var(--font-mono);
  font-weight: 500;
  text-align: right;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.container-box {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 18px;
}

.responsive-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
}
.responsive-table th {
  text-align: left;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-3);
  padding: 12px 16px;
  background: var(--surface-2);
  border-bottom: 1px solid var(--border);
}
.responsive-table td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-1);
}
.responsive-table tr:last-child td {
  border-bottom: none;
}

/* ─── Interaction States ─── */
.interaction-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 16px;
}
.interaction-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 18px;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.interaction-card:hover {
  border-color: var(--border-2);
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}
.interaction-header {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border);
}
.interaction-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-1);
  letter-spacing: -0.01em;
}
.interaction-selector {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-2);
  background: var(--surface-2);
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid var(--border);
  display: inline-block;
}
.state-table {
  width: 100%;
  border-collapse: collapse;
}
.state-table th {
  text-align: left;
  font-size: 9px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-3);
  padding: 6px 8px;
  background: var(--surface-2);
  border-bottom: 1px solid var(--border);
}
.state-table td {
  padding: 8px;
  border-bottom: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-1);
  vertical-align: top;
}
.state-table tr:last-child td {
  border-bottom: none;
}
.state-table .property-name {
  color: var(--text-2);
  font-weight: 500;
}
.state-table .changed {
  color: var(--accent);
  font-weight: 500;
}
.color-preview {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 3px;
  border: 1px solid rgba(0,0,0,0.1);
  vertical-align: middle;
  margin-right: 6px;
}

/* ─── Visual Preview Section ─── */
.interaction-preview-section {
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.preview-label {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-3);
  margin-bottom: 12px;
}

.preview-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: flex-start;
}

.preview-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid var(--border);
}

.preview-state-label {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--text-3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Isolation & Reset for preview elements */
.interaction-preview {
  all: unset;
  display: inline-block;
  box-sizing: border-box;
  pointer-events: none;
  cursor: default;
  min-width: 80px;
  min-height: 32px;
  padding: 8px 16px;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 14px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

/* Type-specific sizing */
.interaction-preview[data-type="buttons"] {
  min-width: 100px;
  min-height: 36px;
  border-radius: 6px;
}

.interaction-preview[data-type="inputs"] {
  min-width: 180px;
  min-height: 36px;
  border-radius: 4px;
}

.interaction-preview[data-type="links"] {
  min-width: 60px;
  min-height: 20px;
  padding: 4px 8px;
}

.interaction-preview[data-type="cards"],
.interaction-preview[data-type="navigation"] {
  min-width: 120px;
  min-height: 60px;
  border-radius: 8px;
}

.visual-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.visual-item {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 16px;
  transition: border-color 0.2s;
}
.visual-item:hover {
  border-color: var(--border-2);
}
.visual-section {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--accent);
  margin-bottom: 6px;
  font-family: var(--font-mono);
}
.visual-layout {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-1);
  margin-bottom: 4px;
}
.visual-desc {
  font-size: 12px;
  color: var(--text-2);
  line-height: 1.6;
}

.prose {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 32px;
  max-width: 800px;
  line-height: 1.7;
}
.prose h1, .prose h2, .prose h3 {
  font-family: var(--font-display);
  color: var(--text-1);
  margin-top: 32px;
  margin-bottom: 12px;
  line-height: 1.3;
}
.prose h1 { font-size: 32px; font-weight: 500; margin-top: 0; }
.prose h2 { font-size: 24px; font-weight: 500; }
.prose h3 { font-size: 18px; font-weight: 500; }
.prose p {
  color: var(--text-1);
  margin-bottom: 16px;
  font-size: 14px;
}
.prose ul, .prose ol {
  margin-bottom: 16px;
  padding-left: 24px;
}
.prose li {
  margin-bottom: 8px;
  color: var(--text-1);
  font-size: 14px;
}
.prose code {
  font-family: var(--font-mono);
  font-size: 12px;
  background: var(--surface-2);
  padding: 2px 6px;
  border-radius: 3px;
  color: var(--mono);
}
.prose strong {
  font-weight: 600;
  color: var(--text-1);
}
.prose hr {
  border: none;
  border-top: 1px solid var(--border);
  margin: 32px 0;
}

/* ─── Motion System: Performance ─── */
.perf-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
}
.perf-stat-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 18px;
  text-align: center;
}
.perf-stat-label {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-3);
  margin-bottom: 8px;
}
.perf-stat-value {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 500;
  color: var(--accent);
  line-height: 1;
}
.perf-badge {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  margin: 12px 0;
}
.perf-badge--light { background: #D1FAE5; color: #065F46; }
.perf-badge--moderate { background: #FEF3C7; color: #92400E; }
.perf-badge--heavy { background: #FEE2E2; color: #991B1B; }
.recommendation-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
}
.recommendation-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 12px;
}
.recommendation-icon {
  font-size: 16px;
  flex-shrink: 0;
}
.recommendation-text {
  font-size: 13px;
  color: var(--text-1);
  line-height: 1.5;
}

/* ─── Motion System: Timing Tokens ─── */
.timing-subsection {
  margin-bottom: 24px;
}
.timing-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-2);
  margin-bottom: 12px;
}
.timing-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 8px 14px;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.timing-chip:hover {
  border-color: var(--border-2);
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

/* ─── Motion System: Keyframes ─── */
.keyframe-group {
  margin-bottom: 32px;
}
.keyframe-group-label {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-2);
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}
.keyframe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 12px;
}
.keyframe-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 16px;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.keyframe-card:hover {
  border-color: var(--border-2);
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}
.keyframe-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border);
}
.keyframe-name {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  color: var(--accent);
  flex: 1;
}
.keyframe-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 11px;
  font-family: var(--font-mono);
}
.keyframe-table th {
  text-align: left;
  font-size: 9px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-3);
  padding: 6px 8px;
  background: var(--surface-2);
  border-bottom: 1px solid var(--border);
}
.keyframe-table td {
  padding: 7px 8px;
  border-bottom: 1px solid var(--border);
  color: var(--text-1);
}
.keyframe-table tr:last-child td {
  border-bottom: none;
}
.property-name {
  font-weight: 500;
  color: var(--text-2);
}
.keyframe-more {
  text-align: center;
  color: var(--text-3);
  font-size: 11px;
  padding: 12px;
}

/* ─── Motion System: Animation Preview ─── */
.animation-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
}
.preview-box {
  width: 40px;
  height: 40px;
  background: var(--accent);
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.preview-control {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.15s;
  line-height: 1;
}
.preview-control:hover {
  border-color: var(--accent);
  background: var(--accent-light);
}

/* ─── Motion System: Videos & Media ─── */
.media-summary {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}
.library-badges {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 12px;
}
.video-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 16px;
}
.video-card--hero {
  border-color: var(--accent);
  border-width: 2px;
}
.video-header {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border);
}
.video-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-1);
  flex: 1;
}
.video-props {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* ─── Motion System: Scroll Animations ─── */
.scroll-libraries,
.scroll-patterns,
.scroll-elements {
  margin-bottom: 20px;
}

/* ─── Motion System: Micro-interactions ─── */
.micro-summary {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
.micro-features {
  margin-top: 16px;
}

/* Font unavailability block — replaces the specimen entirely when font cannot be rendered */
.font-unavailable-block {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 20px 24px;
  background: #111;
  border: 1px solid #2a2a2a;
  border-left: 3px solid #f59e0b;
  border-radius: 4px;
  min-height: 80px;
  justify-content: center;
}
.font-unavailable-icon {
  font-size: 18px;
  line-height: 1;
  color: #f59e0b;
}
.font-unavailable-title {
  font-size: 12px;
  font-weight: 600;
  color: #e5e7eb;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}
.font-unavailable-reason {
  font-size: 12px;
  color: #6b7280;
  line-height: 1.5;
}
.font-unavailable-action {
  font-size: 11px;
  color: #60a5fa;
  text-decoration: none;
  align-self: flex-start;
}
.font-unavailable-action:hover {
  text-decoration: underline;
}
.font-status-chip {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
}
.font-status-chip--loaded {
  background: #052e16;
  color: #86efac;
  border: 1px solid #166534;
}
.font-status-chip--local {
  background: #451a03;
  color: #fde68a;
  border: 1px solid #78350f;
}
.font-status-chip--no-src {
  background: #450a0a;
  color: #fca5a5;
  border: 1px solid #991b1b;
}
.font-status-chip--no-face {
  background: #1c1917;
  color: #9ca3af;
  border: 1px solid #44403c;
}
.font-status-chip--generic {
  background: #1e1b4b;
  color: #a5b4fc;
  border: 1px solid #3730a3;
}

/* ─── Font Alternative Picker ─── */
.pick-alt-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 10px;
  padding: 6px 14px;
  background: #1a1a2e;
  color: #818cf8;
  border: 1px solid #3730a3;
  border-radius: 6px;
  font-size: 12px;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}
.pick-alt-btn:hover {
  background: #1e1b4b;
  border-color: #6366f1;
  color: #a5b4fc;
}
.font-picker-panel {
  margin-top: 12px;
  padding: 12px;
  background: #111827;
  border: 1px solid #374151;
  border-radius: 8px;
  display: none;
}
.font-picker-panel.open {
  display: block;
}
.font-picker-label {
  font-size: 11px;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 10px;
}
.font-catalog-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 260px;
  overflow-y: auto;
}
.font-catalog-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px 12px;
  background: #1f2937;
  border: 1px solid #374151;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.12s, border-color 0.12s;
}
.font-catalog-card:hover {
  background: #374151;
  border-color: #6366f1;
}
.font-catalog-card-meta {
  display: flex;
  align-items: baseline;
  gap: 8px;
}
.font-catalog-card-name {
  font-size: 13px;
  color: #f3f4f6;
}
.font-catalog-card-category {
  font-size: 11px;
  color: #6b7280;
}
.font-catalog-card-specimen {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.font-catalog-card-specimen-line {
  font-size: 13px;
  color: #d1d5db;
  line-height: 1.4;
}
.font-alt-specimen-block {
  margin-top: 10px;
  padding: 10px 14px;
  background: #0f2027;
  border: 1px solid #166534;
  border-radius: 6px;
}
.font-alt-specimen-text {
  font-size: 16px;
  color: #d1fae5;
  margin-bottom: 6px;
}
.font-alt-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: #86efac;
  background: #052e16;
  border: 1px solid #166534;
  border-radius: 4px;
  padding: 2px 8px;
}
`;
}

// ─── Section Renderers ────────────────────────────────────────────────────────

function renderEmptySection() {
  return `<div class="empty-section">
    <div class="empty-icon">○</div>
    <p>Not yet extracted.</p>
    <p class="empty-hint">Run the extractor to populate this tab.</p>
  </div>`;
}

function renderColorSection(data) {
  let html = '';

  if (data.visual && data.visual.length > 0) {
    html += `<div class="section-block">
      <div class="section-label">Visual Palette</div>
      <div class="color-grid">`;
    for (const c of data.visual) {
      html += `<div class="color-card">
        <div class="color-fill" style="background:${esc(c.hex)}"></div>
        <div class="color-info">
          <span class="color-role">${esc(c.role)}</span>
          <span class="color-hex">${esc(c.hex)}</span>
          <span class="color-desc">${esc(c.description)}</span>
        </div>
      </div>`;
    }
    html += `</div></div>`;
  }

  if (!isEmpty(data.cssVars)) {
    html += `<div class="section-block">
      <div class="section-label">CSS Variables</div>
      <div class="chip-row">`;
    for (const [name, value] of Object.entries(data.cssVars)) {
      html += `<div class="color-chip">
        <div class="chip-swatch" style="background:${esc(value)}"></div>
        <span class="chip-label">--${esc(name)}</span>
        <span class="chip-value">${esc(value)}</span>
      </div>`;
    }
    html += `</div></div>`;
  }

  if (!isEmpty(data.elements)) {
    html += `<div class="section-block">
      <div class="section-label">Elements</div>
      <div class="chip-row">`;
    for (const [name, value] of Object.entries(data.elements)) {
      html += `<div class="color-chip">
        <div class="chip-swatch" style="background:${esc(value)}"></div>
        <span class="chip-label">${esc(name)}</span>
        <span class="chip-value">${esc(value)}</span>
      </div>`;
    }
    html += `</div></div>`;
  }

  return html || renderEmptySection();
}

function renderTypographySection(data) {
  let html = '';

  const allFontFaces = data.fontFaces || [];
  if (allFontFaces.length > 0) {
    html += `<div class="section-block">
      <div class="section-label">Font Faces</div>
      <table class="font-table">
        <thead><tr><th>Family</th><th>Weight</th><th>Style</th><th>Status</th></tr></thead>
        <tbody>`;
    for (const f of allFontFaces) {
      const fStatus = getFontStatus(f.family, allFontFaces);
      const rowStatus = fStatus.status === 'generic' ? 'generic'
        : !f.src ? 'no-src'
        : isExternalSrc(f.src) ? 'loadable'
        : 'local';
      const chipClass = {
        loadable: 'font-status-chip--loaded',
        local: 'font-status-chip--local',
        'no-src': 'font-status-chip--no-src',
        generic: 'font-status-chip--generic',
      }[rowStatus] || '';
      const chipLabel = {
        loadable: 'Loaded',
        local: 'Local only',
        'no-src': 'No source',
        generic: 'Generic keyword',
      }[rowStatus] || rowStatus;
      html += `<tr>
        <td>${esc(f.family)}</td>
        <td>${esc(f.weight)}</td>
        <td>${esc(f.style)}</td>
        <td><span class="font-status-chip ${esc(chipClass)}">${esc(chipLabel)}</span></td>
      </tr>`;
    }
    html += `</tbody></table></div>`;
  }

  if (data.typeScale && !isEmpty(data.typeScale)) {
    html += `<div class="section-block">
      <div class="section-label">Type Scale</div>
      <div class="type-scale">`;
    for (const [level, props] of Object.entries(data.typeScale)) {
      const styleParts = [
        props.fontFamily   ? `font-family: ${props.fontFamily}` : '',
        props.fontSize     ? `font-size: ${props.fontSize}` : '',
        props.fontWeight   ? `font-weight: ${props.fontWeight}` : '',
        props.lineHeight   ? `line-height: ${props.lineHeight}` : '',
        props.letterSpacing ? `letter-spacing: ${props.letterSpacing}` : '',
        props.textDecoration ? `text-decoration: ${props.textDecoration}` : '',
      ].filter(Boolean).join('; ');

      const fontStatus = getFontStatus(props.fontFamily, data.fontFaces);
      const specimenHtml = fontStatus.status === 'loadable'
        ? `<div class="type-specimen" style="${esc(styleParts)}">The quick brown fox jumps over the lazy dog</div>`
        : `<div class="font-unavailable-block" data-font-family="${esc(props.fontFamily)}">
            <div class="font-unavailable-icon">⚠</div>
            <div class="font-unavailable-title">Font unavailable — specimen not shown</div>
            <div class="font-unavailable-reason">${esc(fontStatus.reason)}</div>
            ${fontStatus.action ? `<a class="font-unavailable-action" href="${esc(fontStatus.action)}" target="_blank" rel="noopener noreferrer">Search Google Fonts →</a>` : ''}
            <button class="pick-alt-btn" data-font="${esc(props.fontFamily)}">Pick alternative →</button>
            <div class="font-picker-panel"></div>
          </div>`;
      html += `<div class="type-card">
        ${specimenHtml}
        <div class="type-meta">
          <span class="badge">${esc(level)}</span>
          <span class="chip-label">${esc(props.fontFamily || '')}</span>
          <span class="chip-value">${esc(props.fontSize || '')}</span>
          <span class="chip-value">weight ${esc(props.fontWeight || '')}</span>
        </div>
      </div>`;
    }
    html += `</div></div>`;
  }

  return html || renderEmptySection();
}

function renderPerformanceSummary(perf) {
  let html = '<div class="section-block"><div class="section-label">Performance Analysis</div>';

  // Stats grid
  html += '<div class="perf-stats-grid">';
  html += `<div class="perf-stat-card">
    <div class="perf-stat-label">Total Elements</div>
    <div class="perf-stat-value">${perf.totalAnimatedElements || 0}</div>
  </div>`;
  html += `<div class="perf-stat-card">
    <div class="perf-stat-label">Keyframes</div>
    <div class="perf-stat-value">${perf.summary?.keyframes || 0}</div>
  </div>`;
  html += `<div class="perf-stat-card">
    <div class="perf-stat-label">Complex Animations</div>
    <div class="perf-stat-value">${perf.complexAnimations || 0}</div>
  </div>`;
  html += `<div class="perf-stat-card">
    <div class="perf-stat-label">Videos</div>
    <div class="perf-stat-value">${perf.summary?.videos || 0}</div>
  </div>`;
  html += '</div>';

  // Video load badge
  if (perf.videoLoad && perf.videoLoad !== 'none') {
    html += `<div class="perf-badge perf-badge--${perf.videoLoad}">
      ${perf.videoLoad.charAt(0).toUpperCase() + perf.videoLoad.slice(1)} Video Load
    </div>`;
  }

  // Recommendations
  if (perf.recommendations && perf.recommendations.length > 0) {
    html += '<div class="recommendation-list">';
    perf.recommendations.forEach(rec => {
      html += `<div class="recommendation-item">
        <span class="recommendation-icon">⚠</span>
        <span class="recommendation-text">${esc(rec)}</span>
      </div>`;
    });
    html += '</div>';
  }

  html += '</div>';
  return html;
}

function renderTimingTokens(tokens) {
  if (!tokens || (!tokens.durations?.length && !tokens.easings?.length)) {
    return '';
  }

  let html = '<div class="section-block"><div class="section-label">Timing Tokens</div>';

  // Durations
  if (tokens.durations && tokens.durations.length > 0) {
    html += '<div class="timing-subsection">';
    html += '<div class="timing-label">Durations</div>';
    html += '<div class="chip-row">';
    tokens.durations.forEach(duration => {
      html += `<div class="timing-chip">
        <span class="chip-label">${esc(duration)}</span>
      </div>`;
    });
    html += '</div></div>';
  }

  // Easings
  if (tokens.easings && tokens.easings.length > 0) {
    html += '<div class="timing-subsection">';
    html += '<div class="timing-label">Easing Functions</div>';
    html += '<div class="chip-row">';
    tokens.easings.forEach(easing => {
      html += `<div class="timing-chip">
        <span class="chip-label">${esc(easing)}</span>
      </div>`;
    });
    html += '</div></div>';
  }

  html += '</div>';
  return html;
}

function renderElementCard(name, props) {
  const PADDING_KEYS = new Set(['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft']);
  const extras = Object.entries(props).filter(([k]) => !PADDING_KEYS.has(k));

  const topVal    = parseFloat(props.paddingTop    || '0') || 0;
  const rightVal  = parseFloat(props.paddingRight  || '0') || 0;
  const bottomVal = parseFloat(props.paddingBottom || '0') || 0;
  const leftVal   = parseFloat(props.paddingLeft   || '0') || 0;

  const hasPadding = topVal || rightVal || bottomVal || leftVal;

  // Scale all four values against a single global max so cross-axis proportions
  // are visually meaningful (a 30px right padding should appear larger than a
  // 16px top padding, not the same height because it "maxes out" its own axis).
  const MIN_VIS = 16; // px — minimum size for zero-padding sides
  const MAX_VIS = 72; // px — maximum size (assigned to the largest value)
  const MIN_COL = 44; // px — column floor so the label always has room to render

  const globalMax = Math.max(topVal, rightVal, bottomVal, leftVal, 0.001);
  const scale = v => v === 0
    ? MIN_VIS
    : Math.round(MIN_VIS + (v / globalMax) * (MAX_VIS - MIN_VIS));

  const topH    = scale(topVal);
  const bottomH = scale(bottomVal);
  const leftW   = Math.max(MIN_COL, scale(leftVal));
  const rightW  = Math.max(MIN_COL, scale(rightVal));

  const label = v => v > 0 ? formatPx(String(v) + 'px') : '—';
  const gridStyle = `grid-template-columns: ${leftW}px 1fr ${rightW}px; grid-template-rows: ${topH}px auto ${bottomH}px;`;

  if (!hasPadding) {
    // No padding at all — skip the box diagram, just show extras
    return `<div class="element-card">
    <div class="element-name">${esc(name)}</div>
    ${extras.length > 0 ? `<div class="extra-badges">${extras.map(([k, v]) => `<span class="badge">${esc(k)}: ${esc(formatPx(v))}</span>`).join('')}</div>` : '<div class="extra-badges"><span class="badge">no padding</span></div>'}
  </div>`;
  }

  return `<div class="element-card">
    <div class="element-name">${esc(name)}</div>
    <div class="box-diagram" style="${esc(gridStyle)}">
      <div class="bd-top bd-label">${esc(label(topVal))}</div>
      <div class="bd-left bd-label">${esc(label(leftVal))}</div>
      <div class="bd-center">content</div>
      <div class="bd-right bd-label">${esc(label(rightVal))}</div>
      <div class="bd-bottom bd-label">${esc(label(bottomVal))}</div>
    </div>
    ${extras.length > 0 ? `<div class="extra-badges">${extras.map(([k, v]) => `<span class="badge">${esc(k)}: ${esc(formatPx(v))}</span>`).join('')}</div>` : ''}
  </div>`;
}

function renderSpacingSection(data) {
  let html = '';

  if (!isEmpty(data.cssVars)) {
    html += `<div class="section-block">
      <div class="section-label">CSS Variables</div>
      <div class="spacing-vars">`;
    for (const [name, value] of Object.entries(data.cssVars)) {
      html += `<div class="spacing-var-row">
        <span class="var-name">--${esc(name)}</span>
        <span class="var-value">${esc(value)}</span>
      </div>`;
    }
    html += `</div></div>`;
  }

  if (!isEmpty(data.elements)) {
    html += `<div class="section-block">
      <div class="section-label">Elements</div>
      <div class="element-cards">`;
    for (const [name, props] of Object.entries(data.elements)) {
      html += renderElementCard(name, props);
    }
    html += `</div></div>`;
  }

  return html || renderEmptySection();
}

function renderGridSection(data, siteDir) {
  let html = '';

  // Container
  if (!isEmpty(data.container)) {
    html += `<div class="section-block">
      <div class="section-label">Container</div>
      <div class="container-box">
        <div class="grid-props">`;
    for (const [key, value] of Object.entries(data.container)) {
      html += `<div class="grid-prop-row">
        <span class="grid-prop-key">${esc(key)}</span>
        <span class="grid-prop-value">${esc(value)}</span>
      </div>`;
    }
    html += `</div></div></div>`;
  }

  // Grid/Flex Layouts
  if (!isEmpty(data.grids)) {
    html += `<div class="section-block">
      <div class="section-label">Grid & Flex Layouts</div>
      <div class="grid-cards">`;
    for (const [name, props] of Object.entries(data.grids)) {
      html += `<div class="grid-card">
        <div class="grid-card-name">${esc(name)}</div>
        <div class="grid-props">`;
      for (const [key, value] of Object.entries(props)) {
        html += `<div class="grid-prop-row">
          <span class="grid-prop-key">${esc(key)}</span>
          <span class="grid-prop-value">${esc(value)}</span>
        </div>`;
      }
      html += `</div></div>`;
    }
    html += `</div></div>`;
  }

  // Responsive Breakpoints
  if (!isEmpty(data.responsive)) {
    html += `<div class="section-block">
      <div class="section-label">Responsive Breakpoints</div>
      <table class="responsive-table">
        <thead><tr><th>Breakpoint</th><th>Query</th><th>Changes</th></tr></thead>
        <tbody>`;
    for (const [bp, props] of Object.entries(data.responsive)) {
      const query = props.query || '';
      const changes = Object.entries(props)
        .filter(([k]) => k !== 'query')
        .map(([k, v]) => `${k}: ${v}`)
        .join(', ');
      html += `<tr>
        <td>${esc(bp)}</td>
        <td>${esc(query)}</td>
        <td>${esc(changes)}</td>
      </tr>`;
    }
    html += `</tbody></table></div>`;
  }

  // Visual Observations
  if (Array.isArray(data.visual) && data.visual.length > 0) {
    html += `<div class="section-block">
      <div class="section-label">Visual Layout Observations</div>
      <div class="visual-list">`;
    for (const obs of data.visual) {
      html += `<div class="visual-item">
        <div class="visual-section">${esc(obs.section || 'section')}</div>
        <div class="visual-layout">${esc(obs.layout || '')}</div>
        <div class="visual-desc">${esc(obs.description || '')}</div>
      </div>`;
    }
    html += `</div></div>`;
  }

  // CSS Variables
  if (!isEmpty(data.cssVars)) {
    html += `<div class="section-block">
      <div class="section-label">CSS Variables</div>
      <div class="spacing-vars">`;
    for (const [name, value] of Object.entries(data.cssVars)) {
      html += `<div class="spacing-var-row">
        <span class="var-name">--${esc(name)}</span>
        <span class="var-value">${esc(value)}</span>
      </div>`;
    }
    html += `</div></div>`;
  }

  // Layout Markdown
  if (siteDir) {
    const layoutMdPath = path.join(siteDir, 'grid-system', 'layout.md');
    const layoutMd = readMarkdown(layoutMdPath);
    if (layoutMd) {
      const mdHtml = markdownToHtml(layoutMd);

      html += `<div class="section-block">
        <div class="section-label">Layout Design Brief</div>
        <div class="prose">${mdHtml}</div>
      </div>`;
    }
  }

  return html || renderEmptySection();
}

function formatPropertyName(prop) {
  // Convert camelCase to human-readable (e.g., "backgroundColor" -> "Background Color")
  return prop
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
}

function formatValue(value) {
  // Truncate long values (especially boxShadow)
  const str = String(value);
  if (str.length > 40) {
    return str.slice(0, 37) + '...';
  }
  return str;
}

function shouldShowStatePreview(defaultState, compareState) {
  if (!defaultState || !compareState) return false;

  const visualProps = [
    'color', 'backgroundColor', 'borderColor', 'borderWidth',
    'opacity', 'boxShadow', 'outlineColor', 'outlineWidth'
  ];

  return visualProps.some(prop =>
    defaultState[prop] !== compareState[prop]
  );
}

function getElementContent(category) {
  const contentMap = {
    'buttons': '',
    'inputs': '',
    'links': 'Link',
    'cards': '',
    'navigation': ''
  };
  return contentMap[category] || '';
}

function getInverseColor(colorString) {
  if (!colorString) return 'rgb(240, 240, 240)'; // Default light gray

  // Parse rgb() or rgba() format
  const rgbMatch = colorString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgbMatch) {
    const r = 255 - parseInt(rgbMatch[1]);
    const g = 255 - parseInt(rgbMatch[2]);
    const b = 255 - parseInt(rgbMatch[3]);
    return `rgb(${r}, ${g}, ${b})`;
  }

  // For other formats (lab, oklab, hex, etc.), use a neutral gray
  return 'rgb(240, 240, 240)';
}

function buildPreviewStyles(stateData) {
  const styles = ['all: unset', 'display: inline-block', 'box-sizing: border-box'];

  // Add extracted visual properties
  if (stateData.color) styles.push(`color: ${stateData.color}`);
  if (stateData.backgroundColor) styles.push(`background-color: ${stateData.backgroundColor}`);
  if (stateData.borderColor && stateData.borderWidth) {
    styles.push(`border: ${stateData.borderWidth} solid ${stateData.borderColor}`);
  }
  if (stateData.opacity) styles.push(`opacity: ${stateData.opacity}`);
  if (stateData.boxShadow) styles.push(`box-shadow: ${stateData.boxShadow}`);
  if (stateData.outlineColor && stateData.outlineWidth) {
    styles.push(`outline: ${stateData.outlineWidth} solid ${stateData.outlineColor}`);
  }
  if (stateData.fontWeight) styles.push(`font-weight: ${stateData.fontWeight}`);

  return styles.join('; ');
}

function renderStatePreview(category, stateName, stateData) {
  if (!stateData) return '';

  // Determine element type
  const elementMap = {
    'buttons': 'button',
    'inputs': 'input',
    'links': 'a',
    'cards': 'div',
    'navigation': 'div'
  };
  const elementType = elementMap[category] || 'div';

  // Build inline styles
  const styles = buildPreviewStyles(stateData);

  // Get element content
  const content = getElementContent(category);

  // Calculate inverse background color for contrast
  // Prioritize backgroundColor, fallback to color
  const baseColor = stateData.backgroundColor || stateData.color;
  const inverseBackground = getInverseColor(baseColor);

  // Build element attributes
  let attrs = `class="interaction-preview" data-type="${esc(category)}" style="${esc(styles)}"`;

  if (elementType === 'button') {
    attrs += ' type="button"';
  } else if (elementType === 'input') {
    attrs += ' type="text"';
    // Only add disabled for the disabled state, not for default/focus/hover states
    if (stateName.toLowerCase() === 'disabled') {
      attrs += ' disabled';
    }
  } else if (elementType === 'a') {
    attrs += ' href="#"';
  }

  // Void elements (input) must be self-closing without content
  const isVoidElement = elementType === 'input';
  const elementHtml = isVoidElement
    ? `<${elementType} ${attrs} />`
    : `<${elementType} ${attrs}>${esc(content)}</${elementType}>`;

  // Generate HTML with inverse background
  return `<div class="preview-item" style="background: ${esc(inverseBackground)}">
    ${elementHtml}
    <div class="preview-state-label">${esc(stateName)}</div>
  </div>`;
}

function renderInteractionElement(name, element, category) {
  const { selector, ...states } = element;

  if (!states || Object.keys(states).length === 0) {
    return '';
  }

  // Define the properties we want to display and their order
  const TRACKED_PROPS = [
    'color',
    'backgroundColor',
    'borderColor',
    'borderWidth',
    'opacity',
    'boxShadow',
    'outlineColor',
    'fontWeight'
  ];

  // Define the state order
  const STATE_ORDER = ['default', 'hover', 'active', 'focus', 'disabled'];

  // Get available states in our preferred order
  const availableStates = STATE_ORDER.filter(state => states[state]);

  if (availableStates.length === 0) {
    return '';
  }

  // Get the default state as baseline for comparison
  const defaultState = states.default || states[availableStates[0]];

  // Collect states for preview section
  const stateNames = Object.keys(states);
  const statesToPreview = availableStates.filter(stateName => {
    if (stateName === 'default' || stateName === availableStates[0]) return true; // Always show default
    return shouldShowStatePreview(defaultState, states[stateName]);
  });

  // Build table rows for each tracked property
  let tableRows = '';

  for (const prop of TRACKED_PROPS) {
    // Check if this property exists in any state
    const hasProperty = availableStates.some(state => states[state] && states[state][prop] !== undefined);

    if (!hasProperty) continue;

    tableRows += '<tr>';
    tableRows += `<td class="property-name">${esc(formatPropertyName(prop))}</td>`;

    for (const stateName of availableStates) {
      const stateData = states[stateName];
      const value = stateData ? stateData[prop] : undefined;
      const defaultValue = defaultState[prop];

      if (value === undefined) {
        tableRows += '<td>—</td>';
      } else {
        const isChanged = stateName !== 'default' && value !== defaultValue;
        const isColorProp = prop.toLowerCase().includes('color');

        let cellContent = '';
        if (isColorProp && value !== 'transparent' && value !== 'none') {
          cellContent = `<span class="color-preview" style="background:${esc(value)}"></span>`;
        }
        cellContent += `<span class="${isChanged ? 'changed' : ''}">${esc(formatValue(value))}</span>`;

        tableRows += `<td>${cellContent}</td>`;
      }
    }

    tableRows += '</tr>';
  }

  if (!tableRows) {
    return '';
  }

  // Build table header
  let tableHeader = '<tr><th>Property</th>';
  for (const stateName of availableStates) {
    tableHeader += `<th>${esc(stateName)}</th>`;
  }
  tableHeader += '</tr>';

  // Render visual preview section if we have states to show
  let previewHtml = '';
  if (statesToPreview.length > 0 && category) {
    previewHtml = '<div class="interaction-preview-section">';
    previewHtml += '<div class="preview-label">Visual Preview</div>';
    previewHtml += '<div class="preview-row">';

    for (const stateName of statesToPreview) {
      previewHtml += renderStatePreview(category, stateName, states[stateName]);
    }

    previewHtml += '</div></div>';
  }

  return `<div class="interaction-card">
    <div class="interaction-header">
      <div class="interaction-name">${esc(name)}</div>
      ${selector ? `<code class="interaction-selector">${esc(selector)}</code>` : ''}
    </div>
    ${previewHtml}
    <table class="state-table">
      <thead>${tableHeader}</thead>
      <tbody>${tableRows}</tbody>
    </table>
  </div>`;
}

function renderInteractionStatesSection(data) {
  let html = '';

  // Define category order
  const CATEGORY_ORDER = ['buttons', 'inputs', 'links', 'cards', 'navigation'];

  // Process each category
  for (const category of CATEGORY_ORDER) {
    const elements = data[category];

    if (!elements || Object.keys(elements).length === 0) {
      continue;
    }

    // Render section for this category
    const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);
    html += `<div class="section-block">
      <div class="section-label">${esc(categoryLabel)}</div>
      <div class="interaction-grid">`;

    for (const [name, element] of Object.entries(elements)) {
      const elementHtml = renderInteractionElement(name, element, category);
      if (elementHtml) {
        html += elementHtml;
      }
    }

    html += '</div></div>';
  }

  return html || renderEmptySection();
}

function renderVideosAndMedia(videos) {
  if (!hasVideoData(videos)) {
    return '';
  }

  let html = '<div class="section-block"><div class="section-label">Videos & Media</div>';

  // Summary badges
  html += '<div class="media-summary">';
  if (videos.count > 0) {
    html += `<span class="badge">${videos.count} video${videos.count !== 1 ? 's' : ''}</span>`;
  }
  if (videos.hasHeroVideo) {
    html += '<span class="badge">Hero Video</span>';
  }
  if (videos.animatedGifs > 0) {
    html += `<span class="badge">${videos.animatedGifs} animated GIFs</span>`;
  }
  html += '</div>';

  // Animation libraries
  if (videos.libraries && videos.libraries.length > 0) {
    html += '<div class="library-badges">';
    videos.libraries.forEach(lib => {
      html += `<span class="badge">${esc(lib)}</span>`;
    });
    html += '</div>';
  }

  // Video cards
  if (videos.items && videos.items.length > 0) {
    html += '<div class="video-grid">';
    videos.items.slice(0, 5).forEach(video => {
      const heroClass = video.isHero ? ' video-card--hero' : '';
      html += `<div class="video-card${heroClass}">`;
      html += '<div class="video-header">';
      html += `<div class="video-label">${video.isHero ? 'Hero Video' : 'Video'}</div>`;
      if (video.attributes.autoplay) html += '<span class="badge">autoplay</span>';
      if (video.attributes.muted) html += '<span class="badge">muted</span>';
      html += '</div>';
      html += '<div class="video-props">';
      html += `<div class="grid-prop-row">
        <span class="grid-prop-key">Dimensions</span>
        <span class="grid-prop-value">${Math.round(video.position.width)} × ${Math.round(video.position.height)}</span>
      </div>`;
      if (video.sources && video.sources.length > 0) {
        html += `<div class="grid-prop-row">
          <span class="grid-prop-key">Source</span>
          <span class="grid-prop-value">${esc(truncateUrl(video.sources[0]))}</span>
        </div>`;
      }
      html += '</div></div>';
    });
    html += '</div>';
  }

  html += '</div>';
  return html;
}

function renderScrollAnimations(scroll) {
  if (!hasScrollData(scroll)) {
    return '';
  }

  let html = '<div class="section-block"><div class="section-label">Scroll Animations</div>';

  // Libraries
  if (scroll.libraries && scroll.libraries.length > 0) {
    html += '<div class="scroll-libraries">';
    html += '<div class="timing-label">Libraries Detected</div>';
    html += '<div class="chip-row">';
    scroll.libraries.forEach(lib => {
      html += `<span class="badge">${esc(lib)}</span>`;
    });
    html += '</div></div>';
  }

  // Patterns
  if (scroll.patterns && scroll.patterns.length > 0) {
    html += '<div class="scroll-patterns">';
    html += `<div class="timing-label">Animation Patterns (${scroll.patterns.length})</div>`;
    html += '<div class="chip-row">';
    scroll.patterns.slice(0, 15).forEach(pattern => {
      html += `<span class="badge">${esc(pattern)}</span>`;
    });
    if (scroll.patterns.length > 15) {
      html += `<span class="badge">+${scroll.patterns.length - 15} more</span>`;
    }
    html += '</div></div>';
  }

  html += '</div>';
  return html;
}

function renderMicroInteractions(micro) {
  if (!hasMicroInteractionData(micro)) {
    return '';
  }

  let html = '<div class="section-block"><div class="section-label">Micro-interactions</div>';

  // Summary
  html += '<div class="micro-summary">';
  if (micro.buttonTransitions?.length > 0) {
    html += `<span class="badge">${micro.buttonTransitions.length} button transitions</span>`;
  }
  if (micro.inputFocusAnimations?.length > 0) {
    html += `<span class="badge">${micro.inputFocusAnimations.length} input animations</span>`;
  }
  if (micro.iconAnimations?.length > 0) {
    html += `<span class="badge">${micro.iconAnimations.length} icon animations</span>`;
  }
  html += '</div>';

  // Features
  if (micro.hasSkeletonScreens || micro.customCursor) {
    html += '<div class="micro-features">';
    html += '<div class="timing-label">Features</div>';
    if (micro.hasSkeletonScreens) {
      html += '<span class="badge">✓ Skeleton Screens</span>';
    }
    if (micro.customCursor) {
      html += '<span class="badge">✓ Custom Cursor</span>';
    }
    html += '</div>';
  }

  html += '</div>';
  return html;
}

function renderKeyframeCard(kf, uniqueIndex) {
  // Generate unique ID for this animation (include index to prevent collisions)
  const sanitizedName = kf.name.replace(/[^a-zA-Z0-9]/g, '-');
  const animId = `preview-${uniqueIndex}-${sanitizedName}`;

  // Build @keyframes CSS from steps with sanitization to prevent XSS
  let keyframeCSS = `@keyframes ${animId} {`;
  kf.steps.forEach(step => {
    // Validate and sanitize offset (supports "0%", "50%", "from", "to", "0%, 100%", etc.)
    const offset = isValidKeyframeOffset(step.offset)
      ? sanitizeCSS(step.offset)
      : '0%'; // Fallback to safe default if invalid

    keyframeCSS += `${offset} {`;
    Object.entries(step.properties).forEach(([prop, value]) => {
      // Sanitize both property names and values to prevent style-tag breakout
      const safeProp = sanitizeCSS(prop);
      const safeValue = sanitizeCSS(value);
      keyframeCSS += `${safeProp}: ${safeValue};`;
    });
    keyframeCSS += `}`;
  });
  keyframeCSS += `}`;

  let html = '<div class="keyframe-card">';

  // Header
  html += '<div class="keyframe-header">';
  html += `<div class="keyframe-name">${esc(kf.name)}</div>`;
  html += `<span class="badge">${kf.steps.length} steps</span>`;
  html += '</div>';

  // Animation Preview
  html += `<style>${keyframeCSS}</style>`;
  html += '<div class="animation-preview">';
  html += `<div class="preview-box" style="animation: ${animId} 2s ease-in-out infinite;"></div>`;
  html += `<button class="preview-control" onclick="var box = this.previousElementSibling; box.style.animationPlayState = box.style.animationPlayState === 'paused' ? 'running' : 'paused'; this.textContent = box.style.animationPlayState === 'paused' ? '▶' : '⏸';">⏸</button>`;
  html += '</div>';

  // Property table (show first and last step)
  if (kf.steps.length >= 2) {
    const firstStep = kf.steps[0];
    const lastStep = kf.steps[kf.steps.length - 1];

    html += '<table class="keyframe-table">';
    html += '<thead><tr><th>Property</th><th>From (' + esc(firstStep.offset) + ')</th><th>To (' + esc(lastStep.offset) + ')</th></tr></thead>';
    html += '<tbody>';

    // Get unique properties across both steps
    const allProps = new Set([...Object.keys(firstStep.properties), ...Object.keys(lastStep.properties)]);

    Array.from(allProps).slice(0, 5).forEach(prop => {
      html += '<tr>';
      html += `<td class="property-name">${esc(prop)}</td>`;
      html += `<td>${esc(firstStep.properties[prop] || '-')}</td>`;
      html += `<td>${esc(lastStep.properties[prop] || '-')}</td>`;
      html += '</tr>';
    });

    if (allProps.size > 5) {
      html += `<tr><td colspan="3" class="keyframe-more">...${allProps.size - 5} more properties</td></tr>`;
    }

    html += '</tbody></table>';
  }

  html += '</div>';
  return html;
}

function renderKeyframeAnimations(keyframes) {
  if (!keyframes || keyframes.length === 0) {
    return '';
  }

  const groups = groupKeyframesByPattern(keyframes);
  const groupNames = { fade: 'Fade Animations', slide: 'Slide Animations', scale: 'Scale Animations', rotate: 'Rotate Animations', other: 'Other Animations' };

  let html = '<div class="section-block"><div class="section-label">Keyframe Animations (' + keyframes.length + ')</div>';

  // Global counter for unique animation IDs across all groups
  let globalIndex = 0;

  for (const [groupKey, groupKeyframes] of Object.entries(groups)) {
    if (groupKeyframes.length === 0) continue;

    html += `<div class="keyframe-group">`;
    html += `<div class="keyframe-group-label">${groupNames[groupKey]} (${groupKeyframes.length})</div>`;
    html += '<div class="keyframe-grid">';

    // Limit to 20 keyframes per group
    const displayKeyframes = groupKeyframes.slice(0, 20);

    displayKeyframes.forEach(kf => {
      html += renderKeyframeCard(kf, globalIndex++);
    });

    if (groupKeyframes.length > 20) {
      html += `<div class="keyframe-more">...and ${groupKeyframes.length - 20} more</div>`;
    }

    html += '</div></div>';
  }

  html += '</div>';
  return html;
}

function renderMotionSection(data) {
  let html = '';

  // 1. Performance Summary
  if (data.performance) {
    html += renderPerformanceSummary(data.performance);
  }

  // 2. Timing Tokens
  if (data.cssAnimations?.timingTokens) {
    html += renderTimingTokens(data.cssAnimations.timingTokens);
  }

  // 3. Keyframe Animations
  if (data.cssAnimations?.keyframes?.length > 0) {
    html += renderKeyframeAnimations(data.cssAnimations.keyframes);
  }

  // 4. Videos & Media
  if (hasVideoData(data.videos)) {
    html += renderVideosAndMedia(data.videos);
  }

  // 5. Scroll Animations
  if (hasScrollData(data.scrollAnimations)) {
    html += renderScrollAnimations(data.scrollAnimations);
  }

  // 6. Micro-interactions
  if (hasMicroInteractionData(data.microInteractions)) {
    html += renderMicroInteractions(data.microInteractions);
  }

  return html || renderEmptySection();
}

function markdownToHtml(md) {
  return md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, (_, code) => `<code>${esc(code)}</code>`)
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/gs, match => `<ul>${match}</ul>`)
    .replace(/^([^<\n].+)$/gm, '<p>$1</p>')
    .replace(/^---$/gm, '<hr>')
    .replace(/<\/(h[123])>\n<p>/g, '</$1>\n')
    .replace(/<\/p>\n<(h[123])>/g, '\n<$1>')
    .replace(/<\/ul>\n<p>/g, '</ul>\n')
    .replace(/<\/p>\n<ul>/g, '\n<ul>');
}

function renderConceptSummarySection(data) {
  if (!data.markdown) return renderEmptySection();
  return `<div class="section-block"><div class="prose">${markdownToHtml(data.markdown)}</div></div>`;
}

function renderSectionContent(slug, data, siteDir) {
  switch (slug) {
    case 'color-system':       return renderColorSection(data);
    case 'type-system':        return renderTypographySection(data);
    case 'spacing-system':     return renderSpacingSection(data);
    case 'grid-system':        return renderGridSection(data, siteDir);
    case 'interaction-states': return renderInteractionStatesSection(data);
    case 'motion-system':      return renderMotionSection(data);
    case 'concept-summary':    return renderConceptSummarySection(data);
    default:                   return renderEmptySection();
  }
}

// ─── Page Renderers ───────────────────────────────────────────────────────────

export function renderHome(sites, registry) {
  const cards = sites.length === 0
    ? `<div class="empty-state"><p>No sites extracted yet. Run <code>npm start</code> to extract design systems.</p></div>`
    : `<div class="site-grid">${sites.map((name, i) => `
      <div class="site-card" style="--card-delay: ${(i * 0.06).toFixed(2)}s">
        <a href="/site/${encodeURIComponent(name)}">
          <div class="site-card-icon">${esc(name.slice(0, 2))}</div>
          <div class="site-card-name">${esc(name)}</div>
          <div class="site-card-meta">${registry.length} categories</div>
        </a>
      </div>`).join('')}</div>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Design System Browser</title>
  ${fontLinks()}
  <style>${globalCSS()}</style>
</head>
<body>
  <header>
    <div class="container">
      <div class="header-inner">
        <div class="header-mark">DS</div>
        <span class="header-title">Design System Browser</span>
      </div>
    </div>
  </header>
  <main>
    <div class="container">
      <div class="home-hero">
        <div class="home-hero-kicker">Design System Browser</div>
        <h1 class="home-hero-title">Extracted Sites</h1>
        <p class="home-hero-sub">${sites.length} site${sites.length !== 1 ? 's' : ''} ready to inspect</p>
      </div>
      ${cards}
    </div>
  </main>
</body>
</html>`;
}

export function renderSite(siteName, siteDir, registry) {
  const sections = registry.map(entry => {
    const jsonFile = entry.outputFiles.find(f => f.endsWith('.json'));
    if (jsonFile) {
      const data = readJson(path.join(siteDir, entry.slug, jsonFile));
      return { entry, data };
    }
    const mdFile = entry.outputFiles.find(f => f.endsWith('.md'));
    if (mdFile) {
      const markdown = readMarkdown(path.join(siteDir, entry.slug, mdFile));
      return { entry, data: markdown ? { markdown } : {} };
    }
    return { entry, data: {} };
  });

  const typSection = sections.find(s => s.entry.slug === 'type-system');
  const fontFaceCSS = typSection ? buildFontFaceCSS(typSection.data.fontFaces, siteName) : '';

  const firstActiveIdx = Math.max(0, sections.findIndex(s => !isEmpty(s.data)));

  const tabs = sections.map((s, i) => {
    const hasData = !isEmpty(s.data);
    const isActive = i === firstActiveIdx;
    return `<button
      role="tab"
      id="tab-${i}"
      aria-selected="${isActive ? 'true' : 'false'}"
      aria-controls="panel-${i}"
      class="tab-btn${hasData ? '' : ' empty-tab'}"
    >${esc(s.entry.displayName)}</button>`;
  }).join('');

  const panels = sections.map((s, i) => {
    const hasData = !isEmpty(s.data);
    const isActive = i === firstActiveIdx;
    const content = hasData ? renderSectionContent(s.entry.slug, s.data, siteDir) : renderEmptySection();
    return `<div
      role="tabpanel"
      id="panel-${i}"
      aria-labelledby="tab-${i}"
      class="tab-panel container"
      ${isActive ? '' : 'hidden'}
    >${content}</div>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(siteName)} — Design System Browser</title>
  ${fontLinks()}
  ${fontFaceCSS ? `<style>${fontFaceCSS}</style>` : ''}
  <style>${globalCSS()}</style>
</head>
<body>
  <header>
    <div class="container">
      <div class="header-inner">
        <div class="header-mark">DS</div>
        <a href="/" class="back-link">← All Sites</a>
        <span class="header-sep">/</span>
        <span class="header-title">${esc(siteName)}</span>
      </div>
    </div>
  </header>

  <div class="site-hero container">
    <div class="site-hero-kicker">Design System Reference</div>
    <h1 class="site-hero-name">${esc(siteName)}</h1>
  </div>

  <nav class="tab-bar">
    <div class="tab-list" role="tablist">${tabs}</div>
  </nav>

  ${panels}

  <script>
    const SITE_NAME = ${JSON.stringify(siteName)};

    document.querySelector('[role="tablist"]').addEventListener('click', e => {
      const btn = e.target.closest('[role="tab"]');
      if (!btn) return;
      document.querySelectorAll('[role="tab"]').forEach(t => t.setAttribute('aria-selected', 'false'));
      document.querySelectorAll('[role="tabpanel"]').forEach(p => { p.hidden = true; });
      btn.setAttribute('aria-selected', 'true');
      document.getElementById(btn.getAttribute('aria-controls')).hidden = false;
    });

    // Font alternative picker
    let _catalog = null;

    function renderAltSpecimen(block, entry) {
      const existing = block.querySelector('.font-alt-specimen-block');
      if (existing) existing.remove();
      const div = document.createElement('div');
      div.className = 'font-alt-specimen-block';
      div.innerHTML =
        '<div class="font-alt-specimen-text" style="font-family: \\'' + entry.alternative + '\\'">The quick brown fox jumps over the lazy dog</div>' +
        '<span class="font-alt-badge">★ Recommended by human</span>';
      block.appendChild(div);
      loadGoogleFont(entry.alternative);
    }

    function loadGoogleFont(name) {
      const id = 'gf-' + name.replace(/\\s+/g, '-');
      if (document.getElementById(id)) return;
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=' + encodeURIComponent(name).replace(/%20/g, '+') + ':wght@400;700&display=swap';
      document.head.appendChild(link);
    }

    // Pre-load saved selections on page load
    fetch('/api/font-db/' + encodeURIComponent(SITE_NAME))
      .then(r => r.ok ? r.json() : {})
      .then(db => {
        document.querySelectorAll('.font-unavailable-block[data-font-family]').forEach(block => {
          const fontName = block.getAttribute('data-font-family');
          if (db[fontName]) renderAltSpecimen(block, db[fontName]);
        });
      })
      .catch(() => {});

    // Picker open/close
    document.addEventListener('click', e => {
      const btn = e.target.closest('.pick-alt-btn');
      if (!btn) return;
      const fontName = btn.getAttribute('data-font');
      const block = btn.closest('.font-unavailable-block');
      const panel = block.querySelector('.font-picker-panel');
      if (!panel) return;

      const isOpen = panel.classList.contains('open');
      // Close all other panels
      document.querySelectorAll('.font-picker-panel.open').forEach(p => p.classList.remove('open'));
      if (isOpen) return;

      panel.classList.add('open');

      if (_catalog) {
        renderCatalog(panel, fontName);
        return;
      }
      panel.innerHTML = '<div class="font-picker-label">Loading catalog…</div>';
      fetch('/api/font-catalog')
        .then(r => r.json())
        .then(catalog => {
          if (!Array.isArray(catalog)) throw new Error('Invalid catalog');
          _catalog = catalog;
          renderCatalog(panel, fontName);
        })
        .catch(() => { panel.innerHTML = '<div class="font-picker-label">Failed to load catalog</div>'; });
    });

    function renderCatalog(panel, fontName) {
      panel.innerHTML = '<div class="font-picker-label">Choose a replacement font</div><div class="font-catalog-grid"></div>';
      const grid = panel.querySelector('.font-catalog-grid');
      _catalog.forEach(font => {
        loadGoogleFont(font.name);
        const card = document.createElement('div');
        card.className = 'font-catalog-card';
        card.innerHTML =
          '<div class="font-catalog-card-meta">' +
            '<span class="font-catalog-card-name">' + font.name + '</span>' +
            '<span class="font-catalog-card-category">' + font.category + '</span>' +
          '</div>' +
          '<div class="font-catalog-card-specimen" style="font-family: \\'' + font.name + '\\'"><span class="font-catalog-card-specimen-line">THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG</span><span class="font-catalog-card-specimen-line">The quick brown fox jumps over the lazy dog</span></div>';
        card.addEventListener('click', () => selectFont(fontName, font.name, panel));
        grid.appendChild(card);
      });
    }

    function selectFont(originalFont, alternative, panel) {
      panel.classList.remove('open');
      fetch('/api/font-db/' + encodeURIComponent(SITE_NAME), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalFont, alternative })
      })
        .then(r => {
          if (!r.ok) throw new Error('Save failed');
          return r.json();
        })
        .then(entry => {
          document.querySelectorAll('.font-unavailable-block[data-font-family="' + CSS.escape(originalFont) + '"]')
            .forEach(block => renderAltSpecimen(block, entry));
        })
        .catch(() => {});
    }
  </script>
</body>
</html>`;
}
