// lib/progress.js
import { createLogger, registerProgressRenderer } from './logger.js';

const log = createLogger('progress');

// Active bars: Map<name, { total, current, label, startMs, parent }>
const _bars = new Map();
let _lastRenderedLines = 0;

function barString(name, state) {
  const TOTAL_CHARS = 12;
  const ratio = state.total > 0 ? state.current / state.total : 0;
  const filled = Math.round(ratio * TOTAL_CHARS);
  const empty = TOTAL_CHARS - filled;
  const bar = '█'.repeat(filled) + '░'.repeat(empty);
  const progress = `${state.current}/${state.total}`;
  const label = state.label ?? '';
  const nameLabel = (name.charAt(0).toUpperCase() + name.slice(1)).padEnd(10, ' ');
  return `${nameLabel} ${bar}  ${progress}  ${label}`;
}

function clearLines(n) {
  for (let i = 0; i < n; i++) {
    if (i > 0) process.stdout.write('\x1b[1A'); // cursor up
    process.stdout.write('\r\x1b[2K'); // clear line
  }
}

function redrawBars() {
  const entries = [..._bars.entries()];
  for (let i = 0; i < entries.length; i++) {
    const [name, state] = entries[i];
    const line = barString(name, state);
    process.stdout.write(line);
    if (i < entries.length - 1) process.stdout.write('\n');
  }
  _lastRenderedLines = entries.length;
}

// Registered with logger so log lines don't interleave with bars
registerProgressRenderer({
  clear: () => {
    if (_lastRenderedLines > 0) {
      clearLines(_lastRenderedLines);
      _lastRenderedLines = 0;
    }
  },
  redraw: () => {
    if (_bars.size > 0) {
      redrawBars();
    }
  },
});

/**
 * Create a progress bar tracker.
 * @param {string} name - Display name (e.g. 'sites', 'extractors')
 * @param {{ total: number, parent?: string }} options
 */
export function createProgress(name, { total = 0, parent = null } = {}) {
  return {
    start() {
      _bars.set(name, { total, current: 0, label: parent ?? '', startMs: Date.now() });
      log.info(`Starting: ${total} item${total !== 1 ? 's' : ''}${parent ? ` [${parent}]` : ''}`);
      // Initial render
      if (_lastRenderedLines > 0) {
        clearLines(_lastRenderedLines);
      }
      redrawBars();
    },

    tick(label = '') {
      const state = _bars.get(name);
      if (!state) return;
      state.current = Math.min(state.current + 1, state.total);
      state.label = label;
      // Redraw all bars in place
      if (_lastRenderedLines > 0) {
        clearLines(_lastRenderedLines);
      }
      redrawBars();
    },

    done() {
      const state = _bars.get(name);
      if (!state) return;
      state.current = state.total;
      if (_lastRenderedLines > 0) {
        clearLines(_lastRenderedLines);
      }
      _bars.delete(name);
      // Redraw remaining bars (if any)
      if (_bars.size > 0) {
        redrawBars();
      } else {
        _lastRenderedLines = 0;
      }
      const elapsed = ((Date.now() - state.startMs) / 1000).toFixed(1);
      log.info(`Completed ${state.total}/${state.total} in ${elapsed}s${parent ? ` [${parent}]` : ''}`);
    },
  };
}
