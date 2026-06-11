# Record Scroll

Launches a headless Chromium browser with Playwright video recording enabled, navigates to a site from `sites.json`, runs a slow cinematic scroll from top to bottom, and saves the result as a `.webm` file. Intended for manual submission to a Gemini model via OpenRouter (Vertex AI provider) to generate richer concept summaries that capture motion, parallax, and scroll-triggered animations — signals the standard 2-screenshot approach misses.

## Run

```bash
node record-scroll.js <site-name>
# e.g. node record-scroll.js hermes
```

The site name must match a `name` field in either the `queue` or `done` array of `sites.json`. If the name is not found the script exits with a list of all available site names.

## Output

```
extraction-assets/<site-name>/scroll-recording.webm
```

The file is a 720p (1280x720) `.webm` recording. A typical page produces 25-35 seconds of video.

## Notes

- **Warmup pass first**: the script does a fast scroll before recording to trigger lazy-loaded content and Intersection Observers, so the cinematic pass captures fully-loaded pages.
- **Gemini via OpenRouter — Vertex AI required**: when submitting the `.webm` to an LLM manually, use a Gemini model (e.g. `google/gemini-2.5-pro`) through OpenRouter and select the **Vertex AI** provider. OpenRouter's Vertex AI backend accepts base64-encoded `.webm` inline. Google AI Studio only accepts YouTube links and will not work with local files.
- **File size**: 720p is chosen deliberately to stay well within OpenRouter's 100MB inline base64 limit. Do not upsample to 1080p without verifying the file size first.
- **No pipeline integration**: this script is standalone and is not registered in `registry.json`. It is a utility tool, not a pipeline stage.
