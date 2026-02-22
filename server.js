import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderHome, renderSite } from './server/render.js';
import { createLogger } from './lib/logger.js';

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

  if (req.method !== 'GET') {
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
