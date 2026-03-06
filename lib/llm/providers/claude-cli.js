// @ts-check
import { spawnSync } from 'child_process';
import { LLMProvider, TransientProviderError } from './base.js';

/**
 * @import { Message, CompletionOpts, ContentBlock, Capability } from './base.js'
 */

/**
 * LLM provider that wraps the local `claude -p` CLI.
 *
 * Communicates via the stream-json input/output format, which supports
 * multimodal messages (text + base64 images). Video is not supported
 * because the CLI has no video input path.
 *
 * Capabilities: text, image
 */
export class ClaudeCliProvider extends LLMProvider {
  /** @returns {string} */
  get providerName() {
    return 'claude-cli';
  }

  /** @returns {null} */
  get defaultModel() {
    return null; // always the local claude binary, no model selection
  }

  /**
   * @param {string} _model — ignored; model is determined by local claude config
   * @returns {Set<Capability>}
   */
  capabilities(_model) {
    return new Set(['text', 'image']);
  }

  /**
   * Send messages to the local claude CLI and return the response text.
   *
   * System prompt is injected as a separate `system` turn in the stream-json
   * message array. The messages array may contain text and image content blocks.
   *
   * @param {Message[]} messages
   * @param {CompletionOpts} [opts]
   * @returns {Promise<string>}
   */
  async complete(messages, opts = {}) {
    const { systemPrompt, timeout = 90000 } = opts;

    // Build the content array for the stream-json message.
    // We flatten all messages into a single user message (multi-turn
    // conversation is serialized as text history + final user message).
    const content = this._buildContent(messages, systemPrompt);

    const streamJsonInput = JSON.stringify({
      type: 'user',
      message: {
        role: 'user',
        content,
      },
    });

    const result = spawnSync(
      'claude',
      ['-p', '--input-format', 'stream-json', '--output-format', 'stream-json', '--verbose', '--allowedTools', ''],
      {
        input: streamJsonInput,
        encoding: 'utf8',
        timeout,
        maxBuffer: 50 * 1024 * 1024,
      }
    );

    if (result.error) {
      // Spawn-level error (ENOENT, ETIMEDOUT, etc.)
      const msg = result.error.message ?? String(result.error);
      if (msg.includes('ETIMEDOUT') || msg.includes('timeout')) {
        throw new TransientProviderError(`claude CLI timed out: ${msg}`);
      }
      throw new Error(`claude CLI spawn error: ${msg}`);
    }

    if (result.status !== 0) {
      const stderr = result.stderr?.trim() ?? '';
      throw new Error(`claude CLI exited with code ${result.status}: ${stderr}`);
    }

    return this._parseResult(result.stdout ?? '');
  }

  /**
   * Build a flat content block array from the messages list, serializing
   * prior conversation turns as text and appending the final user message's
   * content blocks directly.
   *
   * @param {Message[]} messages
   * @param {string | undefined} systemPrompt
   * @returns {Array<object>}
   */
  _buildContent(messages, systemPrompt) {
    const content = [];

    // If there is prior conversation history, serialize it as a text prefix.
    const priorTurns = messages.slice(0, -1);
    if (priorTurns.length > 0) {
      const historyParts = priorTurns.map(m => {
        const roleLabel = m.role === 'user' ? 'User' : 'Assistant';
        const text = typeof m.content === 'string'
          ? m.content
          : m.content.map(b => b.type === 'text' ? b.text : `[${b.type}]`).join(' ');
        return `${roleLabel}: ${text}`;
      });
      content.push({ type: 'text', text: historyParts.join('\n') });
    }

    // Add system prompt as a text block if provided.
    if (systemPrompt) {
      const prefix = priorTurns.length > 0 ? '\n\n---\n\n' : '';
      content.push({ type: 'text', text: `${prefix}${systemPrompt}` });
    }

    // Add the final message content blocks.
    const lastMessage = messages[messages.length - 1];
    if (lastMessage) {
      if (typeof lastMessage.content === 'string') {
        content.push({ type: 'text', text: lastMessage.content });
      } else {
        for (const block of lastMessage.content) {
          content.push(this._translateBlock(block));
        }
      }
    }

    return content;
  }

  /**
   * Translate an internal ContentBlock to the claude stream-json content format.
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
        type: 'image',
        source: {
          type: 'base64',
          media_type: block.mimeType,
          data: block.data,
        },
      };
    }
    // VideoBlock — should never reach here because the router gates on capabilities,
    // but guard defensively.
    throw new Error(`ClaudeCliProvider does not support content type: ${block.type}`);
  }

  /**
   * Parse the stream-json stdout to extract the result text.
   *
   * @param {string} stdout
   * @returns {string}
   */
  _parseResult(stdout) {
    const resultLine = stdout.split('\n').find(l => l.includes('"type":"result"'));
    if (!resultLine) {
      throw new Error('claude CLI returned no result line in stream-json output');
    }

    let parsed;
    try {
      parsed = JSON.parse(resultLine);
    } catch (err) {
      throw new Error(`claude CLI result line is not valid JSON: ${resultLine.slice(0, 200)}`);
    }

    if (parsed.is_error) {
      throw new Error(`claude CLI returned an error result: ${parsed.result}`);
    }

    if (typeof parsed.result !== 'string') {
      throw new Error(`claude CLI result has unexpected shape: ${JSON.stringify(parsed).slice(0, 200)}`);
    }

    return parsed.result.trim();
  }
}
