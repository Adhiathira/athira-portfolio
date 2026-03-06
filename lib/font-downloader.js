import fs from 'node:fs';
import path from 'node:path';
import { createLogger } from './logger.js';

const log = createLogger('font-downloader');

// Same generic keyword set as render.js — never treat these as downloadable
const GENERIC_FONT_FAMILIES = new Set([
  'serif', 'sans-serif', 'monospace', 'cursive', 'fantasy',
  'system-ui', 'ui-serif', 'ui-sans-serif', 'ui-monospace', 'ui-rounded',
  'emoji', 'math', 'fangsong',
  '-apple-system', 'blinkmacsystemfont',
  'inherit', 'initial', 'unset', 'revert',
]);

// Google Fonts CSS API requires a modern Chrome User-Agent to return woff2 format
const CHROME_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

/**
 * For each primaryFont in data.typeScale that has no matching fontFace entry,
 * query the Google Fonts CSS API, download .woff2 files locally, and inject
 * fontFace entries into data.fontFaces.
 *
 * @param {object} data      - { cssVars, fontFaces, typeScale } from page.evaluate()
 * @param {string} outputDir - Path to design-system/<site>/<tag>/ directory
 * @returns {object} Updated data with new fontFaces entries for downloaded fonts
 */
export async function downloadGoogleFonts(data, outputDir) {
  const apiKey = process.env.google_fonts_api_key;
  if (!apiKey) {
    log.info('google_fonts_api_key not set — skipping Google Fonts download');
    return data;
  }

  if (!outputDir) {
    log.info('outputDir not provided — skipping Google Fonts download');
    return data;
  }

  // Index both raw family names and resolved names (e.g. __Inter_f367f3 and Inter)
  // so Next.js hashed font faces are not mistaken for unmatched candidates.
  const knownFamilies = new Set(
    (data.fontFaces || []).flatMap(f => [
      String(f.family || '').toLowerCase(),
      String(f.resolvedName || '').toLowerCase(),
    ])
  );

  // Collect candidate fonts: primaryFont values with no existing fontFace entry
  const candidatesMap = new Map(); // family name → Set<weight string>
  for (const entry of Object.values(data.typeScale || {})) {
    const primary = entry.primaryFont;
    if (!primary) continue;
    const normalized = primary.toLowerCase().trim();
    if (GENERIC_FONT_FAMILIES.has(normalized)) continue;
    if (knownFamilies.has(normalized)) continue;
    if (!candidatesMap.has(primary)) candidatesMap.set(primary, new Set());
    const w = normalizeWeight(entry.fontWeight);
    if (w) candidatesMap.get(primary).add(w);
  }

  if (candidatesMap.size === 0) {
    log.info('No unmatched Google Fonts candidates');
    return data;
  }

  const fontsBaseDir = path.resolve(outputDir, '..', 'fonts');
  const newFontFaces = [...(data.fontFaces || [])];

  for (const [familyName, weights] of candidatesMap) {
    try {
      const downloaded = await fetchAndDownloadFamily(familyName, weights, fontsBaseDir, apiKey);
      newFontFaces.push(...downloaded);
      if (downloaded.length > 0) {
        log.info(`Downloaded ${downloaded.length} variant(s) for "${familyName}"`);
      }
    } catch (err) {
      log.info(`Failed to process "${familyName}": ${err.message}`);
    }
  }

  return { ...data, fontFaces: newFontFaces };
}

function normalizeWeight(w) {
  if (!w) return '400';
  const n = parseInt(w, 10);
  if (!isNaN(n)) return String(n);
  if (w === 'bold') return '700';
  if (w === 'normal') return '400';
  return null;
}

// Strip non-alphanumeric/space chars to block path traversal, then collapse spaces to hyphens.
// All real Google Font family names (Inter, DM Sans, Roboto Mono) survive this intact.
function safeFamily(name) {
  return name.replace(/[^a-zA-Z0-9 ]/g, '').trim().replace(/\s+/g, '-') || 'Unknown';
}

async function fetchAndDownloadFamily(familyName, weights, fontsBaseDir, apiKey) {
  const weightList = weights.size > 0 ? [...weights].join(';') : '400';
  const encoded = encodeURIComponent(familyName);
  const cssUrl = `https://fonts.googleapis.com/css2?family=${encoded}:wght@${weightList}&display=swap&key=${apiKey}`;

  const cssRes = await fetch(cssUrl, { headers: { 'User-Agent': CHROME_UA } });
  if (!cssRes.ok) {
    log.info(`Google Fonts API returned ${cssRes.status} for "${familyName}" — not on Google Fonts, skipping`);
    return [];
  }

  const css = await cssRes.text();
  const blocks = parseFontFaceBlocks(css);
  if (blocks.length === 0) {
    log.info(`No woff2 @font-face blocks found for "${familyName}"`);
    return [];
  }

  // Google Fonts orders subsets extended→Latin; keep last entry per weight+style so Latin wins.
  const dedupedBlocks = [...new Map(blocks.map(b => [`${b.weight}-${b.style}`, b])).values()];

  const safeName = safeFamily(familyName);
  const familyDir = path.join(fontsBaseDir, safeName);
  fs.mkdirSync(familyDir, { recursive: true });

  const faces = [];
  for (const block of dedupedBlocks) {
    try {
      const filename = `${safeName}-${block.weight}-${block.style}.woff2`;
      const localPath = path.join(familyDir, filename);
      const src = `fonts/${safeName}/${filename}`;

      if (!fs.existsSync(localPath)) {
        const fontRes = await fetch(block.url, { headers: { 'User-Agent': CHROME_UA } });
        if (!fontRes.ok) {
          log.info(`Failed to fetch ${block.url} (${fontRes.status})`);
          continue;
        }
        const buf = await fontRes.arrayBuffer();
        fs.writeFileSync(localPath, Buffer.from(buf));
      }

      faces.push({ family: familyName, weight: block.weight, style: block.style, src, resolvedName: familyName });
    } catch (err) {
      log.info(`Error downloading variant (${block.weight}/${block.style}): ${err.message}`);
    }
  }

  return faces;
}

function parseFontFaceBlocks(css) {
  const blockPattern = /@font-face\s*\{([^}]+)\}/g;
  return [...css.matchAll(blockPattern)].flatMap(([, body]) => {
    const weightMatch = body.match(/font-weight:\s*([^;]+)/);
    const styleMatch  = body.match(/font-style:\s*([^;]+)/);
    const urlMatch    = body.match(/url\(['"]?([^'")\s]+\.woff2[^'")\s]*)['"]?\)/);
    if (!urlMatch) return []; // skip non-woff2 variants
    return [{
      weight: weightMatch ? weightMatch[1].trim() : '400',
      style:  styleMatch  ? styleMatch[1].trim()  : 'normal',
      url:    urlMatch[1],
    }];
  });
}
