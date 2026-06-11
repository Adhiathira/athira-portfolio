// lib/log-writer.js
// Internal: file stream + rotation. Not part of the public API.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

function getConfig() {
  return {
    dir: process.env.LOG_DIR ?? './logs',
    appName: process.env.LOG_APP_NAME ?? 'app',
    rotateHours: parseFloat(process.env.LOG_ROTATE_HOURS ?? '24'),
    keepFiles: parseInt(process.env.LOG_ROTATE_KEEP_FILES ?? '7', 10),
  };
}

let _stream = null;
let _rotateTimer = null;
let _logDir = null;
let _appName = null;

function activeLogPath() {
  return path.resolve(ROOT, _logDir, `${_appName}.log`);
}

function rotatedFiles() {
  // Returns rotated log files sorted oldest-first (by birth time)
  const files = fs.readdirSync(path.resolve(ROOT, _logDir))
    .filter(f => f.startsWith(`${_appName}-`) && f.endsWith('.log'))
    .map(f => {
      const full = path.join(path.resolve(ROOT, _logDir), f);
      try { return { name: f, full, birthtimeMs: fs.statSync(full).birthtimeMs }; }
      catch (_) { return null; }
    })
    .filter(Boolean)
    .sort((a, b) => a.birthtimeMs - b.birthtimeMs);
  return files;
}

function pruneOldFiles(keepFiles) {
  const files = rotatedFiles();
  const toDelete = files.slice(0, Math.max(0, files.length - keepFiles));
  for (const f of toDelete) {
    try { fs.unlinkSync(f.full); } catch (_) {}
  }
}

function openStream(filePath) {
  if (_stream) {
    try { _stream.end(); } catch (_) {}
    _stream = null;
  }
  _stream = fs.createWriteStream(filePath, { flags: 'a', encoding: 'utf8' });
  _stream.on('error', () => {}); // silently ignore write errors
}

function rotate() {
  const cfg = getConfig();
  const currentPath = activeLogPath();
  if (!fs.existsSync(currentPath)) {
    // Nothing to rotate — just open a new stream
    openStream(currentPath);
    return;
  }
  const ts = new Date().toISOString().replace(/[:.]/g, '-').replace('T', 'T').slice(0, 19);
  const rotatedName = `${_appName}-${ts}.log`;
  const rotatedPath = path.join(path.resolve(ROOT, _logDir), rotatedName);
  try {
    if (_stream) { _stream.end(); _stream = null; }
    fs.renameSync(currentPath, rotatedPath);
  } catch (_) {}
  openStream(currentPath);
  pruneOldFiles(cfg.keepFiles);
}

export function init() {
  const cfg = getConfig();
  _logDir = cfg.dir;
  _appName = cfg.appName;

  // Ensure log directory exists
  try {
    fs.mkdirSync(path.resolve(ROOT, _logDir), { recursive: true });
  } catch (_) {}

  openStream(activeLogPath());

  // Schedule rotation
  if (cfg.rotateHours > 0) {
    const ms = cfg.rotateHours * 60 * 60 * 1000;
    _rotateTimer = setInterval(rotate, ms);
    if (_rotateTimer.unref) _rotateTimer.unref(); // Don't keep process alive
  }
}

export function write(line) {
  if (!_stream) return;
  try { _stream.write(line + '\n'); } catch (_) {}
}

export function close() {
  if (_rotateTimer) { clearInterval(_rotateTimer); _rotateTimer = null; }
  if (_stream) { _stream.end(); _stream = null; }
}
