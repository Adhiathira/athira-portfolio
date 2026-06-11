// @ts-check
import { LLMProvider, TransientProviderError } from './base.js';

/**
 * @import { Message, CompletionOpts, ContentBlock, Capability } from './base.js'
 */

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

/**
 * LLM provider that calls the OpenRouter API via native fetch.
 *
 * Translates internal ContentBlock format to OpenAI vision message format.
 * Capabilities depend on the model — the capabilities registry (capabilities.js)
 * is the source of truth; this provider declares a broad superset and the router
 * enforces per-model gating before calling complete().
 *
 * Default model: qwen/qwen3.5-27b (text-only)
 */
export class OpenRouterProvider extends LLMProvider {
  /**
   * @param {object} [opts]
   * @param {string} [opts.apiKey]       — override OPENROUTER_API_KEY env var
   * @param {string} [opts.defaultModel] — override default model
   */
  constructor(opts = {}) {
    super();
    this._apiKey = opts.apiKey ?? process.env.OPENROUTER_API_KEY ?? '';
    this._defaultModel = opts.defaultModel ?? process.env.OPENROUTER_DEFAULT_MODEL ?? 'qwen/qwen3.5-27b';
  }

  /** @returns {string} */
  get providerName() {
    return 'openrouter';
  }

  /** @returns {string} */
  get defaultModel() {
    return this._defaultModel;
  }

  /**
   * OpenRouter can route to many models — capabilities are declared in
   * the capabilities registry (capabilities.js), not here. This method
   * returns a broad superset; the router does per-model gating before calling.
   *
   * @param {string} _model
   * @returns {Set<Capability>}
   */
  capabilities(_model) {
    // The router uses capabilities.js for per-model gating.
    // This returns all capabilities the provider can theoretically support.
    return new Set(['text', 'image', 'video', 'json_mode']);
  }

  /**
   * Send messages to OpenRouter and return the response text.
   *
   * @param {Message[]} messages
   * @param {CompletionOpts} [opts]
   * @returns {Promise<string>}
   */
  async complete(messages, opts = {}) {
    if (!this._apiKey) {
      throw new Error('OPENROUTER_API_KEY is not set');
    }

    const { systemPrompt, model, timeout = 90000 } = opts;
    const effectiveModel = model ?? this._defaultModel;

    // Build OpenAI-format messages array.
    const apiMessages = this._buildApiMessages(messages, systemPrompt);

    const body = {
      model: effectiveModel,
      messages: apiMessages,
    };

    const controller = new AbortController();
    const timerId = setTimeout(() => controller.abort(), timeout);

    let resp;
    try {
      resp = await fetch(OPENROUTER_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this._apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
    } catch (err) {
      clearTimeout(timerId);
      const msg = err instanceof Error ? err.message : String(err);
      if (err instanceof Error && err.name === 'AbortError') {
        throw new TransientProviderError(`OpenRouter request timed out after ${timeout}ms`);
      }
      throw new TransientProviderError(`OpenRouter fetch error: ${msg}`);
    } finally {
      clearTimeout(timerId);
    }

    if (!resp.ok) {
      const body = await resp.text().catch(() => '');
      if (resp.status >= 500) {
        throw new TransientProviderError(`OpenRouter HTTP ${resp.status}: ${body.slice(0, 200)}`);
      }
      throw new Error(`OpenRouter HTTP ${resp.status}: ${body.slice(0, 200)}`);
    }

    let data;
    try {
      data = await resp.json();
    } catch (err) {
      throw new Error('OpenRouter returned non-JSON response');
    }

    const choices = data?.choices;
    if (!Array.isArray(choices) || choices.length === 0) {
      throw new Error(`OpenRouter response missing choices: ${JSON.stringify(data).slice(0, 200)}`);
    }

    const content = choices[0]?.message?.content;
    if (typeof content !== 'string') {
      throw new Error(`OpenRouter response has non-text content: ${JSON.stringify(data).slice(0, 200)}`);
    }

    return content.trim();
  }

  /**
   * Build OpenAI-format messages array from internal Message[].
   *
   * System prompt → { role: 'system', content: '...' } prepended.
   * ContentBlock[] → OpenAI vision content array.
   *
   * @param {Message[]} messages
   * @param {string | undefined} systemPrompt
   * @returns {Array<object>}
   */
  _buildApiMessages(messages, systemPrompt) {
    const apiMessages = [];

    if (systemPrompt) {
      apiMessages.push({ role: 'system', content: systemPrompt });
    }

    for (const msg of messages) {
      if (msg.role === 'system') {
        // System messages in the messages array are passed through directly.
        apiMessages.push({ role: 'system', content: typeof msg.content === 'string' ? msg.content : this._contentToText(msg.content) });
        continue;
      }

      if (typeof msg.content === 'string') {
        apiMessages.push({ role: msg.role, content: msg.content });
      } else {
        // Multimodal content — translate to OpenAI vision format.
        const contentArray = msg.content.map(block => this._translateBlock(block));
        apiMessages.push({ role: msg.role, content: contentArray });
      }
    }

    return apiMessages;
  }

  /**
   * Translate an internal ContentBlock to OpenAI vision content block format.
   *
   * @param {ContentBlock} block
   * @returns {object}
   */
  _translateBlock(block) {
    if (block.type === 'text') {
      return { type: 'text', text: block.text };
    }
    if (block.type === 'image') {
      return {
        type: 'image_url',
        image_url: { url: `data:${block.mimeType};base64,${block.data}` },
      };
    }
    if (block.type === 'video') {
      // Video blocks passed as image_url with the URL directly.
      // Models like Gemini accept video URLs in this format.
      return {
        type: 'image_url',
        image_url: { url: block.url },
      };
    }
    throw new Error(`OpenRouterProvider: unknown content block type: ${/** @type {any} */ (block).type}`);
  }

  /**
   * Flatten a ContentBlock[] to plain text (for system messages).
   * @param {ContentBlock[]} blocks
   * @returns {string}
   */
  _contentToText(blocks) {
    return blocks.map(b => b.type === 'text' ? b.text : `[${b.type}]`).join(' ');
  }
}
