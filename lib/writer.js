import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

/**
 * Write extracted data for a design tag to disk.
 * This is the only module that writes output files.
 *
 * @param {string} websiteName - e.g. "stripe"
 * @param {string} tag - extractor slug, e.g. "color-system"
 * @param {object} data - raw extracted data from extractor.extract()
 */
export async function write(websiteName, tag, data) {
  const registry = JSON.parse(
    fs.readFileSync(new URL('../registry.json', import.meta.url), 'utf8')
  );

  const entry = registry.find((e) => e.slug === tag);
  if (!entry) throw new Error(`Unknown tag in registry: "${tag}"`);

  const outputDir = path.join('design-system', websiteName, tag);
  fs.mkdirSync(outputDir, { recursive: true });

  for (const file of entry.outputFiles) {
    const filePath = path.join(outputDir, file);
    if (file.endsWith('.json')) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } else if (file.endsWith('.css')) {
      fs.writeFileSync(filePath, buildCssCustomProperties(tag, data), 'utf8');
    } else if (file.endsWith('.md')) {
      fs.writeFileSync(filePath, data, 'utf8');
    }
  }
}

/**
 * Convert a flat data object into CSS custom properties.
 * Nested objects are flattened with dashes.
 * @param {string} tag - used as prefix for variable names
 * @param {object} data
 * @returns {string}
 */
function buildCssCustomProperties(tag, data) {
  const lines = [':root {'];
  flattenToCssVars(tag, data, lines);
  lines.push('}');
  return lines.join('\n') + '\n';
}

function flattenToCssVars(prefix, obj, lines) {
  for (const [key, value] of Object.entries(obj)) {
    const varName = `--${prefix}-${key}`.replace(/[^a-zA-Z0-9-]/g, '-');
    if (key === '_note') { lines.push(`  /* ${value} */`); continue; }
    if (Array.isArray(value)) continue; // no CSS representation for arrays
    if (typeof value === 'boolean') continue; // boolean flags (e.g. webAccessible) are JSON-only
    if (value !== null && typeof value === 'object') {
      flattenToCssVars(`${prefix}-${key}`, value, lines);
    } else if (value !== null && value !== undefined && value !== '') {
      lines.push(`  ${varName}: ${value};`);
    }
  }
}
