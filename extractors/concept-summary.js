import fs from 'fs';
import os from 'os';
import path from 'path';
import { spawnSync } from 'child_process';
import { createLogger } from '../lib/logger.js';

export const metadata = { tag: 'concept-summary' };

const log = createLogger('concept-summary');

const CONCEPT_PROMPT = `You are a brand strategist and creative director analyzing a website.

Using the extracted design data and page screenshots provided, write a concept summary for this website in markdown. Be specific, evocative, and concrete — avoid generic descriptions.

## Brand Overview
[What this company does and who it's for — 2-3 sentences]

## Visual Identity
[Color palette mood, typographic personality, motion character — 2-3 sentences]

## Emotional Tone
[The feeling this site evokes — use vivid adjectives and sensory language]

## Target Audience
[Who this is clearly designed for — be specific about demographics/mindset]

## Design Principles
[3-5 core design decisions that define this site's aesthetic approach, as bullet points]

## Distinctive Qualities
[What makes this site stand out — specific unique choices, not generic praise]

Keep each section focused. Use the extracted data to support specific observations (e.g., exact font names, color mood, animation style).`;

/**
 * Safely read and parse a JSON file. Returns null on any error.
 */
function loadJson(siteDir, slug, filename) {
  const filePath = path.join(siteDir, slug, filename);
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    if (err.code !== 'ENOENT') {
      log.minor(`Failed to load ${filePath}`, { error: err.message });
    }
    return null;
  }
}

export async function extract(page, { outputDir, screenshotsDir } = {}) {
  // Step 1: Load sibling extractor data
  const siteDir = outputDir ? path.join(outputDir, '..') : null;

  const siblingData = {};
  if (siteDir) {
    const siblings = [
      { slug: 'color-system',       file: 'colors.json' },
      { slug: 'type-system',        file: 'typography.json' },
      { slug: 'spacing-system',     file: 'spacing.json' },
      { slug: 'grid-system',        file: 'grid.json' },
      { slug: 'motion-system',      file: 'motion.json' },
      { slug: 'component-library',  file: 'components.json' },
      { slug: 'interaction-states', file: 'interactions.json' },
    ];
    for (const { slug, file } of siblings) {
      const data = loadJson(siteDir, slug, file);
      if (data !== null) siblingData[slug] = data;
    }
  }

  // Step 2: Capture above-fold and mid-page screenshots
  const screenshotDir = screenshotsDir ?? (outputDir ? path.join(outputDir, 'screenshots') : os.tmpdir());
  const persistScreenshots = !!(screenshotsDir || outputDir);
  if (persistScreenshots) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const screenshotFiles = [];

  // Above-fold screenshot (position 0)
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);
  const aboveFoldPath = path.join(screenshotDir, 'concept-above-fold.png');
  await page.screenshot({ path: aboveFoldPath });
  screenshotFiles.push(aboveFoldPath);

  // Mid-page screenshot (~50% scroll)
  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  const viewportHeight = await page.evaluate(() => document.documentElement.clientHeight);
  const midScrollY = Math.max(0, Math.floor((pageHeight - viewportHeight) * 0.5));
  await page.evaluate(y => window.scrollTo(0, y), midScrollY);
  await page.waitForTimeout(1000);
  const midPagePath = path.join(screenshotDir, 'concept-mid-page.png');
  await page.screenshot({ path: midPagePath });
  screenshotFiles.push(midPagePath);

  // Read screenshots as base64
  const imageContent = screenshotFiles.map(f => ({
    type: 'image',
    source: { type: 'base64', media_type: 'image/png', data: fs.readFileSync(f).toString('base64') },
  }));

  // Clean up temp screenshots only if not persisting
  if (!persistScreenshots) {
    for (const f of screenshotFiles) {
      try { fs.unlinkSync(f); } catch (_) {}
    }
  }

  // Step 3: Build prompt text with all sibling JSON data
  const dataBlocks = Object.entries(siblingData)
    .map(([slug, data]) => `### ${slug}\n\`\`\`json\n${JSON.stringify(data, null, 2)}\n\`\`\``)
    .join('\n\n');

  const promptText = dataBlocks.length > 0
    ? `The following design tokens were extracted from this website:\n\n${dataBlocks}\n\n---\n\n${CONCEPT_PROMPT}`
    : CONCEPT_PROMPT;

  // Step 4: Call claude -p with stream-json (supports vision via base64 content blocks)
  const msg = JSON.stringify({
    type: 'user',
    message: {
      role: 'user',
      content: [...imageContent, { type: 'text', text: promptText }],
    },
  });

  const result = spawnSync(
    'claude',
    ['-p', '--input-format', 'stream-json', '--output-format', 'stream-json', '--verbose', '--allowedTools', ''],
    { input: msg, encoding: 'utf8', timeout: 180000, maxBuffer: 50 * 1024 * 1024 }
  );

  if (result.error || result.status !== 0) {
    log.minor('Concept summary generation failed', {
      error: result.error?.message ?? `exit ${result.status}`,
      stderr: result.stderr?.trim() || '',
    });
    return `# Concept Summary\n\n*Generation failed — no data available.*\n`;
  }

  let markdownOutput = '';
  try {
    const resultLine = result.stdout?.split('\n').find(l => l.includes('"type":"result"'));
    const claudeResult = resultLine ? JSON.parse(resultLine) : null;
    if (claudeResult?.is_error) {
      log.minor('Concept summary API error', { result: claudeResult.result });
      return `# Concept Summary\n\n*API error during generation.*\n`;
    }
    markdownOutput = claudeResult?.result ?? '';
  } catch (_) {
    log.minor('Concept summary returned unparseable output');
    return `# Concept Summary\n\n*Output parsing failed.*\n`;
  }

  // Step 5: Return the markdown string directly
  return markdownOutput;
}
