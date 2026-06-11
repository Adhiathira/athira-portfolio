// @ts-check
import { randomUUID } from 'crypto';

/**
 * @import { Message, ContentBlock } from './providers/base.js'
 */

/**
 * @typedef {string | ContentBlock[]} ConversationContent
 */

/**
 * Unified multi-party conversation structure.
 *
 * Stores labeled messages from any number of parties and serializes them
 * as either a flat transcript string (for context injection) or as an LLM
 * API messages list (for LLMRouter.complete() calls).
 *
 * Port of thedelulucompany/agents/lib/llm/conversation.py.
 *
 * Usage:
 *   const conv = new Conversation();
 *   conv.add('Planner', 'Here is my analysis...');
 *   conv.add('Human', 'Use Redis for pub/sub.');
 *   conv.add('Advisor', 'Redis is a good fit here.');
 *
 *   // For LLM API (router.complete):
 *   const messages = conv.toMessages();
 *
 *   // For context injection:
 *   const text = conv.toTranscript();
 */
export class Conversation {
  constructor() {
    /** @type {string} */
    this.sessionId = randomUUID();

    /**
     * @private
     * @type {Array<{ party: string, content: ConversationContent }>}
     */
    this._entries = [];
  }

  /**
   * Append a labeled message from the given party.
   *
   * @param {string} party   — name of the speaking party (e.g., 'Planner', 'Human', 'user')
   * @param {ConversationContent} content — string or ContentBlock array
   */
  add(party, content) {
    this._entries.push({ party, content });
  }

  /**
   * Serialize as LLM API messages list.
   *
   * Maps party names to 'user'/'assistant' roles for the LLM API.
   * Parties in userParties map to 'user'; all others map to 'assistant'.
   *
   * @param {Set<string>} [userParties]
   * @returns {Message[]}
   */
  toMessages(userParties = new Set(['user', 'Human'])) {
    return this._entries.map(({ party, content }) => ({
      role: userParties.has(party) ? 'user' : 'assistant',
      content,
    }));
  }

  /**
   * Serialize as a flat labeled plain-text block.
   *
   * Format:
   *   [Party]
   *   content
   *
   *   [Party]
   *   content
   *   ...
   *
   * For multimodal content (ContentBlock[]), image and video blocks are
   * represented as placeholders: [image] or [video].
   *
   * @returns {string}
   */
  toTranscript() {
    if (this._entries.length === 0) return '';

    const parts = this._entries.map(({ party, content }) => {
      const text = typeof content === 'string'
        ? content
        : content.map(b => b.type === 'text' ? b.text : `[${b.type}]`).join(' ');
      return `[${party}]\n${text}`;
    });

    return parts.join('\n\n');
  }

  /**
   * True if no messages have been added yet.
   * @returns {boolean}
   */
  get isEmpty() {
    return this._entries.length === 0;
  }

  /**
   * Remove all stored messages (session_id is preserved).
   */
  clear() {
    this._entries = [];
  }

  /**
   * Number of turns in the conversation.
   * @returns {number}
   */
  get length() {
    return this._entries.length;
  }
}
