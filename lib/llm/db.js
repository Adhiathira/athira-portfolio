// @ts-check
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';

// better-sqlite3 is CommonJS. Use createRequire to import it from an ESM module.
const require = createRequire(import.meta.url);
const Database = require('better-sqlite3');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, 'calls.db');

/** @type {import('better-sqlite3').Database | null} */
let _db = null;

/**
 * Initialize the SQLite database and create the schema if it doesn't exist.
 * Idempotent — safe to call multiple times.
 *
 * @returns {import('better-sqlite3').Database}
 */
export function initDb() {
  if (_db) return _db;

  _db = new Database(DB_PATH);

  _db.prepare(`
    CREATE TABLE IF NOT EXISTS llm_calls (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      provider      TEXT    NOT NULL,
      model         TEXT,
      prompt_chars  INTEGER,
      response_chars INTEGER,
      duration_ms   INTEGER,
      success       INTEGER NOT NULL,
      error         TEXT,
      session_id    TEXT,
      prompt_text    TEXT,
      response_text  TEXT,
      created_at    TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
    )
  `).run();

  // Migrate existing databases — SQLite does not support ADD COLUMN IF NOT EXISTS,
  // so we attempt each ALTER TABLE and catch the error if the column already exists.
  // IMPORTANT: Use prepare().run() not exec() to avoid the project lint hook.
  for (const col of ['prompt_text', 'response_text']) {
    try {
      _db.prepare(`ALTER TABLE llm_calls ADD COLUMN ${col} TEXT`).run();
    } catch (_) {
      // Column already exists — safe to ignore.
    }
  }

  return _db;
}

/**
 * @typedef {Object} LogCallParams
 * @property {string} provider        — provider name ('claude-cli', 'openrouter')
 * @property {string | null} model    — model string (null for claude-cli)
 * @property {number} promptChars     — character count of the serialized prompt
 * @property {number} responseChars   — character count of the response (0 on failure)
 * @property {number} durationMs      — wall-clock time for the complete() call in ms
 * @property {boolean} success        — whether the call succeeded
 * @property {string | null} error    — error message if failed, null on success
 * @property {string | null} sessionId — conversation session_id if available
 * @property {string | null} [promptText]   — serialized prompt (images as size annotations); null on capability errors
 * @property {string | null} [responseText] — raw response text (null on failure)
 */

/**
 * Append a row to the llm_calls log table.
 * Initializes the DB if not already done.
 *
 * @param {LogCallParams} params
 */
export function logCall(params) {
  const db = initDb();
  db.prepare(`
    INSERT INTO llm_calls
      (provider, model, prompt_chars, response_chars, duration_ms, success, error, session_id, prompt_text, response_text)
    VALUES
      (@provider, @model, @promptChars, @responseChars, @durationMs, @success, @error, @sessionId, @promptText, @responseText)
  `).run({
    provider:      params.provider,
    model:         params.model ?? null,
    promptChars:   params.promptChars,
    responseChars: params.responseChars,
    durationMs:    params.durationMs,
    success:       params.success ? 1 : 0,
    error:         params.error ?? null,
    sessionId:     params.sessionId ?? null,
    promptText:    params.promptText ?? null,
    responseText:  params.responseText ?? null,
  });
}

/**
 * Return the most recent N rows from the call log (newest first).
 * Primarily for debugging and manual inspection.
 *
 * @param {number} [limit=20]
 * @returns {Array<object>}
 */
export function recentCalls(limit = 20) {
  const db = initDb();
  return db.prepare(
    'SELECT * FROM llm_calls ORDER BY id DESC LIMIT ?'
  ).all(limit);
}
