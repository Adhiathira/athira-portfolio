# Merge Concepts

Reads `concept_by_image.md` (generated from static screenshots) and `concept_by_video.md` (generated from scroll recording) for a site, calls `qwen/qwq-32b` via OpenRouter to synthesize them into a single unified concept document, strips the model's `<think>...</think>` reasoning blocks from the response, and writes the result to `design-system/<site>/concept-summary/concept.md`.

## Run

```bash
node merge-concepts.js <site-name>
# e.g. node merge-concepts.js hermes

node merge-concepts.js all
# processes every directory under design-system/ sequentially
```

## Output

```
design-system/<site-name>/concept-summary/concept.md
```

The output is a markdown document with six sections: **Brand Overview**, **Visual Identity**, **Emotional Tone**, **Target Audience**, **Design Principles**, and **Distinctive Qualities**. It synthesizes both the static visual identity and the motion/temporal feel of the site into one coherent narrative.

## Notes

- **Requires `OPENROUTER_API_KEY`**: the script reads this from your `.env` file. If the key is missing the script will throw immediately.
- **Skips incomplete sites**: if either `concept_by_image.md` or `concept_by_video.md` is absent for a site, the site is skipped with a warning and the script continues. No partial writes occur.
- **Strips QwQ think blocks**: `qwen/qwq-32b` emits `<think>...</think>` chain-of-thought blocks before its final answer. These are stripped automatically before writing.
- **Sequential processing**: when run with `all`, sites are processed one at a time (not in parallel) to avoid hitting OpenRouter rate limits.
- **LLM timeout**: each call has a 180-second timeout. If a call times out or the API returns an error, the error is logged and the remaining sites continue; the script exits with code 1 after finishing.
- **No pipeline integration**: this script is standalone and is not registered in `registry.json`. It is a post-extraction utility, not a pipeline stage.
