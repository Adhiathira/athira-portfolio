// @ts-check
import { TransientProviderError, CapabilityError } from './providers/base.js';
import { getCapabilities } from './capabilities.js';
import { initDb, logCall } from './db.js';

/**
 * @import { LLMProvider, Message, ContentBlock, Capability } from './providers/base.js'
 * @import { Conversation } from './conversation.js'
 */

/**
 * @typedef {Object} RouterCompleteOpts
 * @property {string} [systemPrompt]     — system prompt injected into every call
 * @property {string} [provider]         — override the default provider
 * @property {string} [model]            — override the provider's default model
 * @property {number} [timeout]          — timeout in ms (default: 90000)
 * @property {import('./conversation.js').Conversation} [conversation] — if provided, appends turn to conversation history
 */

/**
 * LLMRouter — provider-agnostic gateway for LLM calls.
 *
 * Handles:
 *   - Provider selection (by name or default)
 *   - Capability gating (throws CapabilityError before any API call)
 *   - Transient error retry (up to maxAttempts)
 *   - SQLite call logging via lib/llm/db.js
 *   - Conversation history management
 *
 * Usage:
 *   const router = new LLMRouter({
 *     providers: {
 *       'claude-cli': new ClaudeCliProvider(),
 *       'openrouter': new OpenRouterProvider(),
 *     },
 *     defaultProvider: 'claude-cli',
 *   });
 *   const result = await router.complete({
 *     messages: [{ role: 'user', content: 'Hello' }],
 *     systemPrompt: 'You are a brand strategist.',
 *   });
 */
export class LLMRouter {
  /**
   * @param {Object} opts
   * @param {Record<string, LLMProvider>} opts.providers   — named provider instances
   * @param {string} [opts.defaultProvider]                 — default provider name
   * @param {number} [opts.maxAttempts]                     — max retry attempts (default: 3)
   */
  constructor({ providers, defaultProvider, maxAttempts = 3 }) {
    /** @type {Record<string, LLMProvider>} */
    this._providers = providers;

    /** @type {string} */
    this._defaultProvider = defaultProvider
      ?? process.env.LLM_DEFAULT_PROVIDER
      ?? Object.keys(providers)[0]
      ?? 'claude-cli';

    /** @type {number} */
    this._maxAttempts = maxAttempts;

    // Initialize DB schema on construction (idempotent).
    initDb();
  }

  /**
   * Complete a prompt using the selected (or default) provider.
   *
   * @param {Message[]} messages          — conversation messages to send
   * @param {RouterCompleteOpts} [opts]
   * @returns {Promise<string>}
   */
  async complete(messages, opts = {}) {
    const {
      systemPrompt,
      provider: providerName = this._defaultProvider,
      model,
      timeout = 90000,
      conversation,
    } = opts;

    // 1. Resolve provider.
    const provider = this._providers[providerName];
    if (!provider) {
      throw new Error(
        `LLMRouter: provider '${providerName}' not found. Available: ${Object.keys(this._providers).join(', ')}`
      );
    }

    const effectiveModel = model ?? provider.defaultModel ?? undefined;

    // 2. Capability gating — inspect all content blocks in all messages.
    this._assertCapabilities(messages, providerName, effectiveModel ?? null);

    // 3. Compute prompt character count for logging.
    const promptChars = this._countPromptChars(messages, systemPrompt);
    const promptText = this._serializePromptForLog(messages, systemPrompt);

    // 4. Retry loop.
    const t0 = Date.now();
    let raw = '';
    let lastError = null;

    for (let attempt = 0; attempt < this._maxAttempts; attempt++) {
      try {
        raw = await provider.complete(messages, { systemPrompt, model: effectiveModel, timeout });
        lastError = null;
        break; // success
      } catch (err) {
        if (err instanceof TransientProviderError) {
          lastError = err;
          if (attempt < this._maxAttempts - 1) {
            const delay = attempt === 0 ? 1000 : 3000;
            await this._sleep(delay);
          }
        } else {
          // Non-transient error — log and re-raise immediately.
          const durationMs = Date.now() - t0;
          logCall({
            provider: providerName,
            model: effectiveModel ?? null,
            promptChars,
            responseChars: 0,
            durationMs,
            success: false,
            error: err instanceof Error ? err.message : String(err),
            sessionId: conversation?.sessionId ?? null,
            promptText,
            responseText: null,
          });
          throw err;
        }
      }
    }

    const durationMs = Date.now() - t0;

    // 5. Handle exhausted retries.
    if (lastError !== null) {
      logCall({
        provider: providerName,
        model: effectiveModel ?? null,
        promptChars,
        responseChars: 0,
        durationMs,
        success: false,
        error: lastError.message,
        sessionId: conversation?.sessionId ?? null,
        promptText,
        responseText: null,
      });
      throw lastError;
    }

    // 6. Log success.
    logCall({
      provider: providerName,
      model: effectiveModel ?? null,
      promptChars,
      responseChars: raw.length,
      durationMs,
      success: true,
      error: null,
      sessionId: conversation?.sessionId ?? null,
      promptText,
      responseText: raw,
    });

    // 7. Append to conversation if provided.
    if (conversation) {
      const lastUserMessage = this._extractLastUserContent(messages);
      conversation.add('user', lastUserMessage);
      conversation.add('assistant', raw);
    }

    return raw;
  }

  /**
   * Inspect all content blocks across all messages and throw CapabilityError
   * if any block type is not in the model's capability set.
   *
   * @param {Message[]} messages
   * @param {string} providerName
   * @param {string | null} model
   */
  _assertCapabilities(messages, providerName, model) {
    const caps = getCapabilities(providerName, model);

    for (const msg of messages) {
      if (typeof msg.content === 'string') continue;
      for (const block of msg.content) {
        /** @type {Capability} */
        const needed = /** @type {Capability} */ (block.type === 'text' ? 'text' :
                        block.type === 'image' ? 'image' :
                        block.type === 'video' ? 'video' : 'text');
        if (!caps.has(needed)) {
          throw new CapabilityError(
            `Provider '${providerName}' with model '${model ?? 'default'}' does not support '${needed}' content. ` +
            `Supported capabilities: ${[...caps].join(', ')}`,
            { capability: needed, provider: providerName, model: model ?? 'default' }
          );
        }
      }
    }
  }

  /**
   * Count the total characters in the prompt (for logging only).
   *
   * @param {Message[]} messages
   * @param {string | undefined} systemPrompt
   * @returns {number}
   */
  _countPromptChars(messages, systemPrompt) {
    let count = systemPrompt?.length ?? 0;
    for (const msg of messages) {
      if (typeof msg.content === 'string') {
        count += msg.content.length;
      } else {
        for (const block of msg.content) {
          if (block.type === 'text') count += block.text.length;
          else if (block.type === 'image') count += block.data.length;
          else if (block.type === 'video') count += block.url.length;
        }
      }
    }
    return count;
  }

  /**
   * Serialize messages + systemPrompt into a human-readable string for logging.
   * Image blocks are replaced with a size annotation to keep the log compact
   * and to avoid storing large base64 payloads in the database.
   *
   * @param {Message[]} messages
   * @param {string | undefined} systemPrompt
   * @returns {string}
   */
  _serializePromptForLog(messages, systemPrompt) {
    const parts = [];

    if (systemPrompt) {
      parts.push(`[system]\n${systemPrompt}`);
    }

    for (const msg of messages) {
      if (typeof msg.content === 'string') {
        parts.push(`[${msg.role}]\n${msg.content}`);
      } else {
        const blockParts = msg.content.map(block => {
          if (block.type === 'text') return block.text;
          // base64 length * 0.75 = approximate decoded byte size; divide by 1024 for kb.
          if (block.type === 'image') return `[image ~${Math.round(block.data.length * 0.75 / 1024)}kb]`;
          if (block.type === 'video') return `[video ${block.url}]`;
          return `[${block.type}]`;
        });
        parts.push(`[${msg.role}]\n${blockParts.join('\n')}`);
      }
    }

    return parts.join('\n\n');
  }

  /**
   * Extract the content of the last user message for conversation tracking.
   *
   * @param {Message[]} messages
   * @returns {string | import('./providers/base.js').ContentBlock[]}
   */
  _extractLastUserContent(messages) {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === 'user') return messages[i].content;
    }
    return '';
  }

  /**
   * @param {number} ms
   * @returns {Promise<void>}
   */
  _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
