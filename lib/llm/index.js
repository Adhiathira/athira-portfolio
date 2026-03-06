// @ts-check
/**
 * @fileoverview Public API for the lib/llm LLM abstraction module.
 *
 * Usage:
 *   import { LLMRouter, Conversation, ClaudeCliProvider, OpenRouterProvider } from '../lib/llm/index.js';
 *
 *   const router = new LLMRouter({
 *     providers: {
 *       'claude-cli': new ClaudeCliProvider(),
 *       'openrouter': new OpenRouterProvider(),
 *     },
 *     defaultProvider: 'claude-cli',
 *   });
 *
 *   const result = await router.complete(
 *     [{ role: 'user', content: 'Hello' }],
 *     { systemPrompt: 'You are a brand strategist.' }
 *   );
 */

export { LLMRouter } from './router.js';
export { Conversation } from './conversation.js';
export { ClaudeCliProvider } from './providers/claude-cli.js';
export { OpenRouterProvider } from './providers/openrouter.js';
export { getCapabilities, hasCapability } from './capabilities.js';
export { TransientProviderError, CapabilityError } from './providers/base.js';
export { initDb, logCall, recentCalls } from './db.js';
