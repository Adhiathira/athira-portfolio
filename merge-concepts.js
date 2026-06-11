// merge-concepts.js
// Reads concept_by_image.md + concept_by_video.md for a site (or all sites),
// calls qwen/qwq-32b via OpenRouter to synthesize them, strips <think> blocks,
// and writes the result to design-system/<site>/concept-summary/concept.md.

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { OpenRouterProvider } from './lib/llm/providers/openrouter.js';
import { createLogger } from './lib/logger.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const log = createLogger('merge-concepts');

const DESIGN_SYSTEM_DIR = path.join(__dirname, 'design-system');

// ---------------------------------------------------------------------------
// Prompt
// ---------------------------------------------------------------------------

/**
 * Build the synthesis prompt for a site.
 * @param {string} siteName
 * @param {string} imageText
 * @param {string} videoText
 * @returns {string}
 */
function MERGE_PROMPT(siteName, imageText, videoText) {
  return `You are a creative director synthesizing two analyses of the same website into one unified concept document.

**ANALYSIS 1 — Image-based (static screenshots)**
${imageText}

**ANALYSIS 2 — Video-based (scroll recording)**
${videoText}

---

Using both analyses, write a unified concept document for ${siteName} in markdown. Synthesize the static visual identity (colors, typography, layout, components) with the motion and temporal feel (scroll behavior, animations, pacing, transitions) into a single coherent narrative.

Use the following section structure:

## Brand Overview
## Visual Identity
## Emotional Tone
## Target Audience
## Design Principles
## Animation & Dynamic Styles
## Distinctive Qualities

For **Animation & Dynamic Styles**, describe: scroll-triggered animations, entrance/exit transitions, hover effects, parallax layers, timing and easing character, any motion patterns that define the site's kinetic personality. Be specific — reference exact behaviors observed in the video analysis.

Be specific, evocative, and concrete. Use observations from both analyses. Avoid generic descriptions.`;
}

// ---------------------------------------------------------------------------
// Per-site merge logic
// ---------------------------------------------------------------------------

/**
 * Merge concept_by_image.md and concept_by_video.md for a single site.
 * @param {string} siteName
 * @param {OpenRouterProvider} provider
 * @returns {Promise<{ skipped: boolean }>}
 */
async function mergeSite(siteName, provider) {
  const conceptDir = path.join(DESIGN_SYSTEM_DIR, siteName, 'concept-summary');
  const imagePath = path.join(conceptDir, 'concept_by_image.md');
  const videoPath = path.join(conceptDir, 'concept_by_video.md');
  const outPath   = path.join(conceptDir, 'concept.md');

  log.debug(`Processing site: ${siteName}`);
  log.debug(`Image path: ${imagePath}`);
  log.debug(`Video path: ${videoPath}`);
  log.debug(`Output path: ${outPath}`);

  // Check for missing source files.
  if (!fs.existsSync(imagePath)) {
    log.minor(`Skipping ${siteName}: missing concept_by_image.md`);
    return { skipped: true };
  }
  if (!fs.existsSync(videoPath)) {
    log.minor(`Skipping ${siteName}: missing concept_by_video.md`);
    return { skipped: true };
  }

  const imageText = fs.readFileSync(imagePath, 'utf-8');
  const videoText = fs.readFileSync(videoPath, 'utf-8');

  log.info(`Calling qwen/qwq-32b for site: ${siteName}`);
  log.debug(`Image file length: ${imageText.length} chars`);
  log.debug(`Video file length: ${videoText.length} chars`);

  const raw = await provider.complete(
    [{ role: 'user', content: MERGE_PROMPT(siteName, imageText, videoText) }],
    { model: 'qwen/qwq-32b', timeout: 180000 }
  );

  log.debug(`Raw response length: ${raw.length} chars`);

  // Strip <think>...</think> blocks that QwQ models emit.
  const stripped = raw.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

  log.debug(`Stripped response length: ${stripped.length} chars`);

  if (!stripped) {
    throw new Error(`LLM returned empty content for site: ${siteName}`);
  }

  fs.writeFileSync(outPath, stripped, 'utf-8');
  log.info(`Written: ${outPath}`);

  return { skipped: false };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const arg = process.argv[2];

  if (!arg) {
    process.stdout.write(
      'Usage:\n' +
      '  node merge-concepts.js <site-name>   # single site\n' +
      '  node merge-concepts.js all           # all sites under design-system/\n'
    );
    process.exit(1);
  }

  const provider = new OpenRouterProvider();

  let siteNames;

  if (arg === 'all') {
    log.info('Scanning design-system/ for site directories...');
    const entries = fs.readdirSync(DESIGN_SYSTEM_DIR, { withFileTypes: true });
    siteNames = entries
      .filter(e => e.isDirectory())
      .map(e => e.name)
      .sort();
    log.info(`Found ${siteNames.length} site(s): ${siteNames.join(', ')}`);
  } else {
    siteNames = [arg];
  }

  let merged = 0;
  let skipped = 0;

  for (const siteName of siteNames) {
    log.debug(`--- Starting site: ${siteName} ---`);
    try {
      const result = await mergeSite(siteName, provider);
      if (result.skipped) {
        skipped++;
      } else {
        merged++;
      }
    } catch (err) {
      log.critical(`Failed to merge site: ${siteName}`, err instanceof Error ? err : new Error(String(err)));
      process.exitCode = 1;
    }
  }

  log.info(`Done: ${merged} merged, ${skipped} skipped`);
}

main();
