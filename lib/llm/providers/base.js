// @ts-check
/**
 * @fileoverview Base interface and shared types for LLM providers.
 *
 * Content block types (provider-agnostic internal format):
 *   TextBlock  — { type: 'text', text: string }
 *   ImageBlock — { type: 'image', data: string, mimeType: string }  // base64-encoded
 *   VideoBlock — { type: 'video', url: string, mimeType?: string }  // URL-based
 *
 * Capability values:
 *   'text'      — plain text input/output
 *   'image'     — image input (base64)
 *   'video'     — video input (URL)
 *   'json_mode' — structured JSON output mode
 */

/**
 * @typedef {'text' | 'image' | 'video' | 'json_mode'} Capability
 */

/**
 * @typedef {{ type: 'text', text: string }} TextBlock
 */

/**
 * @typedef {{ type: 'image', data: string, mimeType: string }} ImageBlock
 */

/**
 * @typedef {{ type: 'video', url: string, mimeType?: string }} VideoBlock
 */

/**
 * @typedef {TextBlock | ImageBlock | VideoBlock} ContentBlock
 */

/**
 * @typedef {{ role: 'user' | 'assistant' | 'system', content: string | ContentBlock[] }} Message
 */

/**
 * @typedef {Object} CompletionOpts
 * @property {string} [systemPrompt]   — system prompt to inject
 * @property {string} [model]          — model override (provider uses its default if omitted)
 * @property {number} [timeout]        — timeout in milliseconds (default: 90000)
 */

/**
 * Raised by providers for transient failures that may succeed on retry
 * (network errors, timeouts, HTTP 5xx).
 */
export class TransientProviderError extends Error {
  /** @param {string} message */
  constructor(message) {
    super(message);
    this.name = 'TransientProviderError';
  }
}

/**
 * Raised by LLMRouter when a message contains a content type
 * that the selected model does not support (e.g., image sent to text-only model).
 */
export class CapabilityError extends Error {
  /**
   * @param {string} message
   * @param {{ capability: Capability, provider: string, model: string }} details
   */
  constructor(message, details) {
    super(message);
    this.name = 'CapabilityError';
    this.capability = details.capability;
    this.provider = details.provider;
    this.model = details.model;
  }
}

/**
 * Abstract base class for LLM providers.
 * Subclasses must implement all abstract methods.
 */
export class LLMProvider {
  /** @returns {string} */
  get providerName() {
    throw new Error(`${this.constructor.name} must implement providerName`);
  }

  /** @returns {string | null} */
  get defaultModel() {
    throw new Error(`${this.constructor.name} must implement defaultModel`);
  }

  /**
   * Return the capability set for the given model.
   * @param {string} _model
   * @returns {Set<Capability>}
   */
  // eslint-disable-next-line no-unused-vars
  capabilities(_model) {
    throw new Error(`${this.constructor.name} must implement capabilities()`);
  }

  /**
   * Send messages to the LLM and return the text response.
   * @param {Message[]} _messages
   * @param {CompletionOpts} [_opts]
   * @returns {Promise<string>}
   */
  // eslint-disable-next-line no-unused-vars
  async complete(_messages, _opts) {
    throw new Error(`${this.constructor.name} must implement complete()`);
  }
}
