// lib/logger.js
import * as logWriter from './log-writer.js';

const LEVELS = { debug: 1, info: 2, minor: 3, major: 4, critical: 5 };

const ANSI = {
  debug:    '\x1b[90m',
  info:     '\x1b[37m',
  minor:    '\x1b[33m',
  major:    '\x1b[31m',
  critical: '\x1b[41m\x1b[1m',
  reset:    '\x1b[0m',
};

let _initialized = false;
let _progressRenderer = null;

function ensureInit() {
  if (_initialized) return;
  _initialized = true;
  logWriter.init();
}

/**
 * Called by lib/progress.js to register bar clear/redraw hooks.
 * When registered, logger will clear bars before writing to stdout,
 * then redraw bars after — preventing interleaved output.
 * @param {{ clear: () => void, redraw: () => void }|null} renderer
 */
export function registerProgressRenderer(renderer) {
  _progressRenderer = renderer;
}

function levelNum(name) {
  return LEVELS[name] ?? 0;
}

function getStdoutThreshold() {
  const env = (process.env.LOG_LEVEL_STDOUT ?? 'info').toLowerCase();
  return LEVELS[env] ?? LEVELS.info;
}

function getFileThreshold() {
  const env = (process.env.LOG_LEVEL_FILE ?? 'debug').toLowerCase();
  return LEVELS[env] ?? LEVELS.debug;
}

function isSilent() {
  return process.env.LOG_SILENT === 'true';
}

function formatTimestamp() {
  const now = new Date();
  const Y = now.getFullYear();
  const M = String(now.getMonth() + 1).padStart(2, '0');
  const D = String(now.getDate()).padStart(2, '0');
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  return `${Y}-${M}-${D} ${h}:${m}:${s}`;
}

function formatContext(context) {
  if (!context) return '';
  if (context instanceof Error) return '';
  try {
    const json = JSON.stringify(context);
    if (json === '{}' || json === undefined) return '';
    return ' ' + json;
  } catch (_) { return ''; }
}

function formatLine(level, moduleName, msg, context) {
  const ts = formatTimestamp();
  const lvlLabel = level.toUpperCase().padEnd(8, ' ');
  const ctx = formatContext(context);
  return `${ts} [${lvlLabel}] [${moduleName}] ${msg}${ctx}`;
}

function formatStack(context) {
  if (!(context instanceof Error)) return '';
  const lines = (context.stack || String(context)).split('\n');
  return '\n' + lines.map(l => '    ' + l).join('\n');
}

function writeToConsole(colorized, level) {
  const stream = (level === 'major' || level === 'critical') ? process.stderr : process.stdout;
  if (_progressRenderer) {
    _progressRenderer.clear();
    stream.write(colorized + '\n');
    _progressRenderer.redraw();
  } else {
    stream.write(colorized + '\n');
  }
}

function log(level, moduleName, msg, context) {
  if (isSilent()) return;
  ensureInit();

  const num = levelNum(level);
  const plain = formatLine(level, moduleName, msg, context) + formatStack(context);

  if (num >= getStdoutThreshold()) {
    const colored = ANSI[level] + plain + ANSI.reset;
    writeToConsole(colored, level);
  }

  if (num >= getFileThreshold()) {
    logWriter.write(plain);
  }
}

/**
 * Create a named logger instance for a module.
 * @param {string} moduleName - e.g. 'runner', 'browser', 'color-system'
 * @returns {{ debug, info, minor, major, critical }}
 */
export function createLogger(moduleName) {
  return {
    debug:    (msg, ctx) => log('debug',    moduleName, msg, ctx),
    info:     (msg, ctx) => log('info',     moduleName, msg, ctx),
    minor:    (msg, ctx) => log('minor',    moduleName, msg, ctx),
    major:    (msg, ctx) => log('major',    moduleName, msg, ctx),
    critical: (msg, ctx) => log('critical', moduleName, msg, ctx),
  };
}
