import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export function readFontCatalog() {
  const catalogPath = join(__dirname, '..', 'data', 'font-catalog.json');
  return JSON.parse(readFileSync(catalogPath, 'utf8'));
}

export function readFontDb(site, designSystemDir) {
  const dbPath = join(designSystemDir, site, 'type-system', 'font-db.json');
  try {
    return JSON.parse(readFileSync(dbPath, 'utf8'));
  } catch (err) {
    if (err.code === 'ENOENT') return {};
    throw err;
  }
}

export function writeFontDb(site, designSystemDir, data) {
  const siteDir = join(designSystemDir, site);
  if (!existsSync(siteDir)) {
    throw new Error('Site directory does not exist');
  }
  writeFileSync(join(siteDir, 'type-system', 'font-db.json'), JSON.stringify(data, null, 2), 'utf8');
}
