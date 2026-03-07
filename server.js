import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderHome, renderSite } from './server/render.js';
import { createLogger } from './lib/logger.js';
import { readFontCatalog, readFontDb, writeFontDb } from './server/font-db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 5509;
const log = createLogger('server');
const DESIGN_SYSTEM_DIR = path.join(__dirname, 'design-system');

function getSiteNames() {
  if (!fs.existsSync(DESIGN_SYSTEM_DIR)) return [];
  return fs.readdirSync(DESIGN_SYSTEM_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);
}

function loadRegistry() {
  try {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'registry.json'), 'utf8'));
  } catch (err) {
    log.major('Failed to load registry.json', { message: err.message });
    return [];
  }
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = url.pathname;

  if (req.method !== 'GET' && req.method !== 'POST') {
    res.writeHead(405);
    res.end('Method Not Allowed');
    return;
  }

  if (pathname === '/') {
    const sites = getSiteNames();
    const registry = loadRegistry();
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(renderHome(sites, registry));
    return;
  }

  const siteMatch = pathname.match(/^\/site\/([^/]+)$/);
  if (siteMatch) {
    let siteName;
    try {
      siteName = decodeURIComponent(siteMatch[1]);
    } catch {
      res.writeHead(400);
      res.end('Bad Request');
      return;
    }
    const siteDir = path.resolve(DESIGN_SYSTEM_DIR, siteName);
    if (!siteDir.startsWith(DESIGN_SYSTEM_DIR + path.sep)) {
      res.writeHead(400);
      res.end('Bad Request');
      return;
    }
    if (!fs.existsSync(siteDir)) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<!DOCTYPE html><html><body><h1>Site not found</h1></body></html>');
      return;
    }
    const registry = loadRegistry();
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(renderSite(siteName, siteDir, registry));
    return;
  }

  const fontMatch = pathname.match(/^\/fonts\/([^/]+)\/(.+)$/);
  if (fontMatch) {
    let site, rest;
    try {
      site = decodeURIComponent(fontMatch[1]);
      rest = decodeURIComponent(fontMatch[2]);
    } catch {
      res.writeHead(400);
      res.end('Bad Request');
      return;
    }
    const filePath = path.resolve(DESIGN_SYSTEM_DIR, site, 'fonts', ...rest.split('/'));
    if (!filePath.startsWith(DESIGN_SYSTEM_DIR + path.sep)) {
      res.writeHead(400);
      res.end('Bad Request');
      return;
    }
    let stat;
    try { stat = fs.statSync(filePath); } catch { /* not found */ }
    if (!stat?.isFile()) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }
    let contentType = 'application/octet-stream';
    if (filePath.endsWith('.woff2')) contentType = 'font/woff2';
    else if (filePath.endsWith('.woff')) contentType = 'font/woff';
    const buffer = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(buffer);
    return;
  }

  // GET /api/font-catalog
  if (req.method === 'GET' && pathname === '/api/font-catalog') {
    let catalog;
    try {
      catalog = readFontCatalog();
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to load font catalog' }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(catalog));
    return;
  }

  // GET /api/font-db/:site
  const fontDbGetMatch = req.method === 'GET' && pathname.match(/^\/api\/font-db\/([^/]+)$/);
  if (fontDbGetMatch) {
    let site;
    try {
      site = decodeURIComponent(fontDbGetMatch[1]);
    } catch {
      res.writeHead(400);
      res.end('Bad Request');
      return;
    }
    const siteDir = path.resolve(DESIGN_SYSTEM_DIR, site);
    if (!siteDir.startsWith(DESIGN_SYSTEM_DIR + path.sep)) {
      res.writeHead(400);
      res.end('Bad Request');
      return;
    }
    let db;
    try {
      db = readFontDb(site, DESIGN_SYSTEM_DIR);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(db));
    return;
  }

  // POST /api/font-db/:site
  const fontDbPostMatch = req.method === 'POST' && pathname.match(/^\/api\/font-db\/([^/]+)$/);
  if (fontDbPostMatch) {
    let site;
    try {
      site = decodeURIComponent(fontDbPostMatch[1]);
    } catch {
      res.writeHead(400);
      res.end('Bad Request');
      return;
    }
    const siteDir = path.resolve(DESIGN_SYSTEM_DIR, site);
    if (!siteDir.startsWith(DESIGN_SYSTEM_DIR + path.sep)) {
      res.writeHead(400);
      res.end('Bad Request');
      return;
    }
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      let payload;
      try {
        payload = JSON.parse(body);
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
        return;
      }
      const { originalFont, alternative } = payload;
      if (!originalFont || !alternative) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Missing originalFont or alternative' }));
        return;
      }
      let db;
      try {
        db = readFontDb(site, DESIGN_SYSTEM_DIR);
        db[originalFont] = { alternative, recommendedByHuman: true, savedAt: new Date().toISOString() };
        writeFontDb(site, DESIGN_SYSTEM_DIR, db);
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(db[originalFont]));
    });
    return;
  }

  // POST /api/concept-video/:site
  const conceptVideoPostMatch = req.method === 'POST' && pathname.match(/^\/api\/concept-video\/([^/]+)$/);
  if (conceptVideoPostMatch) {
    let site;
    try {
      site = decodeURIComponent(conceptVideoPostMatch[1]);
    } catch {
      res.writeHead(400);
      res.end('Bad Request');
      return;
    }
    const siteDir = path.resolve(DESIGN_SYSTEM_DIR, site);
    if (!siteDir.startsWith(DESIGN_SYSTEM_DIR + path.sep)) {
      res.writeHead(400);
      res.end('Bad Request');
      return;
    }
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      const filePath = path.join(siteDir, 'concept-summary', 'concept_by_video.md');
      try {
        fs.writeFileSync(filePath, body, 'utf8');
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true }));
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end('<!DOCTYPE html><html><body><h1>404 Not Found</h1></body></html>');
});

server.on('error', err => {
  if (err.code === 'EADDRINUSE') {
    log.major(`Port ${PORT} is already in use. Is the browser already running?`);
    process.exitCode = 1;
    return;
  }
  throw err;
});

server.listen(PORT, () => {
  log.info(`Design System Browser running at http://localhost:${PORT}`);
});
