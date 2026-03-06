// @ts-check
/**
 * @fileoverview Model capability registry.
 *
 * Maps provider+model identifiers to the set of content modalities and
 * features they support. Used by LLMRouter to gate requests before calling
 * any provider — prevents sending unsupported content types to models.
 *
 * Models not in the registry default to text-only.
 *
 * Adding a new model:
 *   Add an entry to CAPABILITIES with key format 'provider-name/model-id'
 *   or just 'model-id' (matched by model string alone).
 */

/**
 * @import { Capability } from './providers/base.js'
 */

/**
 * Model capability map.
 * Keys are model identifiers as passed to the provider (e.g., 'qwen/qwen3.5-27b').
 * Values are Sets of capabilities.
 *
 * @type {Map<string, Set<Capability>>}
 */
const CAPABILITIES = new Map([
  // OpenRouter — text-only models
  ['qwen/qwen3.5-27b',             new Set(['text', 'json_mode'])],
  ['qwen/qwen3.5-35b-a3b',        new Set(['text', 'json_mode'])],
  ['qwen/qwen-2.5-72b-instruct',   new Set(['text', 'json_mode'])],
  ['anthropic/claude-3.5-haiku',   new Set(['text', 'image', 'json_mode'])],
  ['anthropic/claude-3.5-sonnet',  new Set(['text', 'image', 'json_mode'])],
  ['anthropic/claude-3-opus',      new Set(['text', 'image', 'json_mode'])],
  ['openai/gpt-4o',                new Set(['text', 'image', 'json_mode'])],
  ['openai/gpt-4o-mini',           new Set(['text', 'image', 'json_mode'])],

  // OpenRouter — vision + video capable models (Gemini)
  ['google/gemini-2.0-flash-001',            new Set(['text', 'image', 'video', 'json_mode'])],
  ['google/gemini-2.0-flash-lite-001',       new Set(['text', 'image', 'video', 'json_mode'])],
  ['google/gemini-2.5-flash',                new Set(['text', 'image', 'video', 'json_mode'])],
  ['google/gemini-2.5-flash-image',          new Set(['text', 'image', 'video', 'json_mode'])],
  ['google/gemini-2.5-pro',                  new Set(['text', 'image', 'video', 'json_mode'])],
  ['google/gemini-1.5-pro',                  new Set(['text', 'image', 'video', 'json_mode'])],
  ['google/gemini-1.5-flash',                new Set(['text', 'image', 'video', 'json_mode'])],

  // OpenRouter — Qwen vision models
  ['qwen/qwen2.5-vl-72b-instruct', new Set(['text', 'image', 'json_mode'])],
  ['qwen/qwen2.5-vl-7b-instruct',  new Set(['text', 'image', 'json_mode'])],

  // Claude CLI provider — always text + image (vision via stream-json)
  // The claude-cli provider uses this implicitly; the router also checks it.
  ['claude-cli/default',           new Set(['text', 'image'])],
]);

/**
 * Default capabilities for unknown models.
 * Conservative: text-only to prevent accidental multimodal calls.
 *
 * @type {Set<Capability>}
 */
const DEFAULT_CAPABILITIES = new Set(['text']);

/**
 * Return the capability set for a given provider + model combination.
 *
 * Lookup order:
 *   1. Exact match on model string (e.g., 'qwen/qwen3.5-27b')
 *   2. Provider-scoped fallback key (e.g., 'claude-cli/default') for claude-cli
 *   3. DEFAULT_CAPABILITIES (text-only)
 *
 * @param {string} providerName  — e.g., 'openrouter', 'claude-cli'
 * @param {string | null | undefined} model  — model string (may be null for claude-cli)
 * @returns {Set<Capability>}
 */
export function getCapabilities(providerName, model) {
  // For claude-cli, the model param is always null — use the provider-scoped key.
  if (providerName === 'claude-cli') {
    return CAPABILITIES.get('claude-cli/default') ?? DEFAULT_CAPABILITIES;
  }

  if (model && CAPABILITIES.has(model)) {
    return CAPABILITIES.get(model) ?? DEFAULT_CAPABILITIES;
  }

  return DEFAULT_CAPABILITIES;
}

/**
 * Check whether a provider+model supports a specific capability.
 *
 * @param {string} providerName
 * @param {string | null | undefined} model
 * @param {Capability} capability
 * @returns {boolean}
 */
export function hasCapability(providerName, model, capability) {
  return getCapabilities(providerName, model).has(capability);
}
