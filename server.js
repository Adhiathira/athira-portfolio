import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { renderHome, renderSite } from './server/render.js';
import { createLogger } from './lib/logger.js';
import { readFontCatalog, readFontDb, writeFontDb } from './server/font-db.js';
import { saveVariant } from './server/save-variant.js';
import { parseEditorTokens } from './server/editor-tokens.js';

// Tracks running Next.js dev servers: siteName -> { process, port }
const nextjsProcesses = new Map();
let nextjsPortCounter = 5600;

// In-memory agent session map: siteName -> agentId
const siteAgents = {};

// In-memory cache for Google Fonts data
let googleFontsCache = null;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 5509;
const log = createLogger('server');
const DESIGN_SYSTEM_DIR = path.join(__dirname, 'design-system');
const DELULU_AGENCY_URL = process.env.DELULU_AGENCY_URL || 'http://localhost:9123';
const WORKSPACES_DIR = path.join(__dirname, 'workspaces');

function getSiteNames() {
  if (!fs.existsSync(DESIGN_SYSTEM_DIR)) return [];
  return fs.readdirSync(DESIGN_SYSTEM_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory() && !d.name.startsWith('.'))
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

function loadSiteUrls() {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'sites.json'), 'utf8'));
    const map = new Map();
    for (const entry of [...(data.queue || []), ...(data.done || [])]) {
      if (entry.name && entry.url) map.set(entry.name, entry.url);
    }
    return map;
  } catch {
    return new Map();
  }
}

function ensureWorkspace(siteName) {
  const src  = path.join(DESIGN_SYSTEM_DIR, siteName);
  const dest = path.join(WORKSPACES_DIR, siteName);
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
    fs.cpSync(src, dest, { recursive: true });
  }
  return dest;
}

async function fetchJSON(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`HTTP ${res.status} from ${url}`);
  return res.json();
}

async function drainAgentPrompt(agentId, content) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);
  try {
    const res = await fetch(`${DELULU_AGENCY_URL}/code-agents/${agentId}/prompt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`Prompt failed: HTTP ${res.status}`);
    // Drain the SSE stream until done or error
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      for (const line of chunk.split('\n')) {
        if (!line.startsWith('data:')) continue;
        let evt;
        try { evt = JSON.parse(line.slice(5).trim()); } catch { /* ignore malformed lines */ }
        if (!evt) continue;
        if (evt.type === 'done') return;
        if (evt.type === 'error') throw new Error(evt.content || 'Agent error during context prompt');
      }
    }
  } finally {
    clearTimeout(timeout);
  }
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = url.pathname;

  if (req.method !== 'GET' && req.method !== 'POST' && req.method !== 'DELETE') {
    res.writeHead(405);
    res.end('Method Not Allowed');
    return;
  }

  if (pathname === '/') {
    const sites = getSiteNames();
    const registry = loadRegistry();
    const siteUrls = loadSiteUrls();
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(renderHome(sites, registry, siteUrls));
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
    const siteUrl = loadSiteUrls().get(siteName) || null;
    const landingPageFile = path.join(siteDir, 'landing-page', 'index.html');
    const landingPageUrl = fs.existsSync(landingPageFile) ? `/site/${encodeURIComponent(siteName)}/landing-page/` : null;
    const nextjsDir = path.join(siteDir, 'landing-page-nextjs', 'landing-page');
    const hasNextjsApp = fs.existsSync(path.join(nextjsDir, 'package.json'));
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(renderSite(siteName, siteDir, registry, siteUrl, landingPageUrl, hasNextjsApp));
    return;
  }

  // GET /site/:name/editor — serve editor shell HTML
  const editorMatch = pathname.match(/^\/site\/([^/]+)\/editor$/);
  if (req.method === 'GET' && editorMatch) {
    let siteName;
    try {
      siteName = decodeURIComponent(editorMatch[1]);
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
      res.writeHead(404);
      res.end('Not Found');
      return;
    }
    const landingPageFile = path.join(siteDir, 'landing-page', 'index.html');
    if (!fs.existsSync(landingPageFile)) {
      res.writeHead(404);
      res.end('No landing page for this site');
      return;
    }
    const editorHtmlPath = path.join(__dirname, 'server', 'editor', 'editor.html');
    if (!fs.existsSync(editorHtmlPath)) {
      res.writeHead(500);
      res.end('Editor shell not yet built');
      return;
    }
    const editorHtml = fs.readFileSync(editorHtmlPath, 'utf8');
    const injected = editorHtml.replace('/*__EDITOR_SITE__*/', `const EDITOR_SITE = ${JSON.stringify(siteName)};`);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(injected);
    return;
  }

  // GET /api/editor-tokens/:site — return parsed editor token data
  const editorTokensMatch = req.method === 'GET' && pathname.match(/^\/api\/editor-tokens\/([^/]+)$/);
  if (editorTokensMatch) {
    let siteName;
    try {
      siteName = decodeURIComponent(editorTokensMatch[1]);
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
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Site not found' }));
      return;
    }
    const tokens = parseEditorTokens(siteDir, siteName);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(tokens));
    return;
  }

  // Serve landing-page static files: /site/:name/landing-page/...
  const landingPageMatch = pathname.match(/^\/site\/([^/]+)\/(landing-page|assets)(\/.*)?$/);
  if (landingPageMatch) {
    let siteName;
    try { siteName = decodeURIComponent(landingPageMatch[1]); } catch {
      res.writeHead(400); res.end('Bad Request'); return;
    }
    const subdir = landingPageMatch[2];
    const restRaw = (landingPageMatch[3] || '').replace(/^\//, '');
    const fileSegment = restRaw || 'index.html';
    const filePath = path.resolve(DESIGN_SYSTEM_DIR, siteName, subdir, ...fileSegment.split('/'));
    if (!filePath.startsWith(DESIGN_SYSTEM_DIR + path.sep)) {
      res.writeHead(400); res.end('Bad Request'); return;
    }
    let stat;
    try { stat = fs.statSync(filePath); } catch { /* not found */ }
    if (!stat?.isFile()) { res.writeHead(404); res.end('Not Found'); return; }
    const ext = path.extname(filePath).toLowerCase();
    const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'application/javascript', '.json': 'application/json', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.gif': 'image/gif', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.woff2': 'font/woff2', '.woff': 'font/woff' }[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mime });
    res.end(fs.readFileSync(filePath));
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

  // DELETE /api/site/:name
  const siteDeleteMatch = req.method === 'DELETE' && pathname.match(/^\/api\/site\/([^/]+)$/);
  if (siteDeleteMatch) {
    let siteName;
    try {
      siteName = decodeURIComponent(siteDeleteMatch[1]);
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
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Site not found' }));
      return;
    }
    try {
      fs.rmSync(siteDir, { recursive: true, force: true });
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  // GET /api/nextjs/:site/launch — start Next.js dev server and redirect to it
  const nextjsLaunchMatch = req.method === 'GET' && pathname.match(/^\/api\/nextjs\/([^/]+)\/launch$/);
  if (nextjsLaunchMatch) {
    let siteName;
    try { siteName = decodeURIComponent(nextjsLaunchMatch[1]); } catch {
      res.writeHead(400); res.end('Bad Request'); return;
    }
    const siteDir = path.resolve(DESIGN_SYSTEM_DIR, siteName);
    if (!siteDir.startsWith(DESIGN_SYSTEM_DIR + path.sep)) {
      res.writeHead(400); res.end('Bad Request'); return;
    }
    const nextjsDir = path.join(siteDir, 'landing-page-nextjs', 'landing-page');
    if (!fs.existsSync(path.join(nextjsDir, 'package.json'))) {
      res.writeHead(404); res.end('No Next.js app found'); return;
    }
    if (!nextjsProcesses.has(siteName)) {
      const port = nextjsPortCounter++;
      const proc = spawn('npx', ['next', 'dev', '--port', String(port)], {
        cwd: nextjsDir,
        stdio: 'ignore',
        detached: false,
      });
      proc.on('exit', () => nextjsProcesses.delete(siteName));
      nextjsProcesses.set(siteName, { process: proc, port });
      log.info(`Started Next.js dev server for ${siteName} on port ${port}`);
    }
    const { port } = nextjsProcesses.get(siteName);
    // Give Next.js a moment to start before redirecting
    setTimeout(() => {
      res.writeHead(302, { Location: `http://localhost:${port}` });
      res.end();
    }, 2000);
    return;
  }

  // GET /api/google-fonts
  if (req.method === 'GET' && pathname === '/api/google-fonts') {
    if (!googleFontsCache) {
      try {
        const fontsPath = path.join(__dirname, 'server', 'data', 'google-fonts.json');
        googleFontsCache = JSON.parse(fs.readFileSync(fontsPath, 'utf8'));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to load Google Fonts data' }));
        return;
      }
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(googleFontsCache));
    return;
  }

  // GET /editor-assets/:file — serve static files from server/editor/ with path traversal protection
  const editorAssetsMatch = pathname.match(/^\/editor-assets\/(.+)$/);
  if (req.method === 'GET' && editorAssetsMatch) {
    const EDITOR_DIR = path.join(__dirname, 'server', 'editor');
    let fileName;
    try {
      fileName = decodeURIComponent(editorAssetsMatch[1]);
    } catch {
      res.writeHead(400);
      res.end('Bad Request');
      return;
    }
    const filePath = path.resolve(EDITOR_DIR, ...fileName.split('/'));
    if (!filePath.startsWith(EDITOR_DIR + path.sep)) {
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
    const ext = path.extname(filePath).toLowerCase();
    const mime = {
      '.html': 'text/html; charset=utf-8',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.json': 'application/json',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.webp': 'image/webp',
      '.woff2': 'font/woff2',
      '.woff': 'font/woff',
    }[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mime });
    res.end(fs.readFileSync(filePath));
    return;
  }

  // POST /api/save-variant
  if (req.method === 'POST' && pathname === '/api/save-variant') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      let payload;
      try {
        payload = JSON.parse(body);
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
        return;
      }
      if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Request body must be a JSON object' }));
        return;
      }
      const { sourceSite, variantName, overrides } = payload;
      if (!sourceSite || !variantName || typeof overrides !== 'object' || overrides === null || Array.isArray(overrides)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Missing required fields: sourceSite, variantName, overrides' }));
        return;
      }
      try {
        const result = await saveVariant(DESIGN_SYSTEM_DIR, sourceSite, variantName, overrides);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (err) {
        const status = err.statusCode || 500;
        res.writeHead(status, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // GET /workspace/:site/* — serve files from workspaces/<site>/
  const workspaceMatch = pathname.match(/^\/workspace\/([^/]+)(\/.*)?$/);
  if (workspaceMatch) {
    let siteName;
    try { siteName = decodeURIComponent(workspaceMatch[1]); } catch {
      res.writeHead(400); res.end('Bad Request'); return;
    }
    if (siteName.includes('/') || siteName.includes('\\')) {
      res.writeHead(400); res.end('Bad Request'); return;
    }
    const restRaw = (workspaceMatch[2] || '').replace(/^\//, '') || 'index.html';
    const siteRoot = path.join(WORKSPACES_DIR, siteName);
    const filePath = path.resolve(siteRoot, ...restRaw.split('/'));
    if (!filePath.startsWith(siteRoot + path.sep)) {
      res.writeHead(400); res.end('Bad Request'); return;
    }
    let stat;
    try { stat = fs.statSync(filePath); } catch { /* not found */ }
    if (!stat?.isFile()) { res.writeHead(404); res.end('Not Found'); return; }
    const ext = path.extname(filePath).toLowerCase();
    const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'application/javascript', '.json': 'application/json', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.gif': 'image/gif', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.woff2': 'font/woff2', '.woff': 'font/woff' }[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mime });
    res.end(fs.readFileSync(filePath));
    return;
  }

  // POST /api/agent/:site/start — ensure workspace, start code agent, send context prompt
  const agentStartMatch = req.method === 'POST' && pathname.match(/^\/api\/agent\/([^/]+)\/start$/);
  if (agentStartMatch) {
    let siteName;
    try { siteName = decodeURIComponent(agentStartMatch[1]); } catch {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Bad site name' })); return;
    }
    const siteDir = path.resolve(DESIGN_SYSTEM_DIR, siteName);
    if (!siteDir.startsWith(DESIGN_SYSTEM_DIR + path.sep) || !fs.existsSync(siteDir)) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Site not found' })); return;
    }

    (async () => {
      // 1. Ensure workspace exists
      const workspaceDir = ensureWorkspace(siteName);

      // 2. Start (or retrieve) agent via delulu-agency
      const startAgent = async () => {
        const startRes = await fetchJSON(`${DELULU_AGENCY_URL}/code-agents`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ working_dir: workspaceDir }),
        });
        siteAgents[siteName] = startRes.agent_id;
        return startRes.agent_id;
      };
      const usedCached = Boolean(siteAgents[siteName]);
      let agentId = siteAgents[siteName] || await startAgent();
      const contextPrompt = [
        `You are a code editing agent for the "${siteName}" design system.`,
        `Your working directory contains all the site files. The landing page HTML/CSS lives in landing-page/.`,
        `Design tokens (CSS custom properties) are in landing-page/styles/tokens.css.`,
        `When making visual changes, prefer editing CSS variables in tokens.css first, then component CSS.`,
        `Only modify files inside landing-page/ unless explicitly asked otherwise.`,
        `Keep changes minimal and focused. Do not add new dependencies.`,
        `Acknowledge this setup with a single word: Ready`,
      ].join(' ');

      // 3. Send context prompt and drain SSE (wait for "Ready")
      // If drain fails with a cached agent ID, the agent may be stale — recreate and retry once.
      try {
        await drainAgentPrompt(agentId, contextPrompt);
      } catch (err) {
        if (usedCached) {
          delete siteAgents[siteName];
          agentId = await startAgent();
          await drainAgentPrompt(agentId, contextPrompt);
        } else {
          throw err;
        }
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        agentId,
        iframeUrl: `/workspace/${encodeURIComponent(siteName)}/landing-page/index.html`,
      }));
    })().catch(err => {
      log.major('Agent start failed', { message: err.message });
      res.writeHead(503, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'delulu-agency unavailable: ' + err.message }));
    });
    return;
  }

  // POST /api/agent/:site/prompt — proxy SSE from delulu-agency to client
  const agentPromptMatch = req.method === 'POST' && pathname.match(/^\/api\/agent\/([^/]+)\/prompt$/);
  if (agentPromptMatch) {
    let siteName;
    try { siteName = decodeURIComponent(agentPromptMatch[1]); } catch {
      res.writeHead(400); res.end('Bad Request'); return;
    }
    const agentId = siteAgents[siteName];
    if (!agentId) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Agent not started. Call /start first.' })); return;
    }

    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      let content;
      try { content = JSON.parse(body).content; } catch {
        res.writeHead(400); res.end('Bad Request'); return;
      }
      if (!content) { res.writeHead(400); res.end('Missing content'); return; }

      try {
        const upstream = await fetch(`${DELULU_AGENCY_URL}/code-agents/${agentId}/prompt`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content }),
        });
        if (!upstream.ok) {
          res.writeHead(502, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: `Agency returned ${upstream.status}` })); return;
        }
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        });
        const reader = upstream.body.getReader();
        const decoder = new TextDecoder();
        const pump = async () => {
          while (true) {
            const { done, value } = await reader.read();
            if (done) { res.end(); return; }
            res.write(decoder.decode(value, { stream: true }));
          }
        };
        pump().catch(() => res.end());
      } catch (err) {
        res.writeHead(503, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Agency unavailable: ' + err.message }));
      }
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
