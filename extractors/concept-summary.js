import fs from 'fs';
import os from 'os';
import path from 'path';
import { LLMRouter, ClaudeCliProvider, OpenRouterProvider } from '../lib/llm/index.js';
import { createLogger } from '../lib/logger.js';

export const metadata = { tag: 'concept-summary' };

const log = createLogger('concept-summary');

const router = new LLMRouter({
  providers: {
    'claude-cli': new ClaudeCliProvider(),
    'openrouter': new OpenRouterProvider(),
  },
  // defaultProvider reads from LLM_DEFAULT_PROVIDER env var, falls back to 'claude-cli'
  maxAttempts: 2,
});

const CONCEPT_PROMPT = `You are a creative director and design analyst examining a website's visual and structural design.

Using the extracted design data and page screenshots provided, write a design analysis for this website in markdown. Be specific, concrete, and precise — focus entirely on design decisions.

STRICT RULE: Do not include any brand or business content. This means no company descriptions, no target audience statements, no emotional brand positioning, no marketing language, and no mentions of what the company sells or who its customers are. Every sentence must describe a visual or structural design decision — if it could appear in a brand brief or marketing document, remove it.

You are provided multiple screenshots taken at different scroll positions. Do not assume any ordering — instead, visually identify each page zone from the content of each image. The hero is the prominent entry section: large headline type, full-bleed or high-impact background, often a CTA and a scroll indicator. Content sections are the scrolling body between hero and footer: feature grids, editorial columns, product showcases, image/text alternating layouts. The footer is the closing section: small type, multiple link columns, copyright or legal line, subdued palette, often a logo. If none of the screenshots clearly shows a zone, say so rather than fabricating detail.

## Visual Identity
[Color palette mood, typographic personality, motion character — 2-3 sentences]

## Hero Section
[Above-fold treatment: background type (full-bleed video / parallax image / static color / gradient), viewport coverage (full-height or partial), text position (centered / left-aligned / bottom-anchored), headline scale contrast to body text, CTA count and style (ghost / filled / pill / underlined link), scroll indicator presence and type (animated arrow / "scroll" text / dot / none), and any visible load-in animation — 3-4 sentences]

## Content Sections
[Body of the page between hero and footer: layout patterns (editorial columns / full-bleed alternating sections / feature grids / image-text splits), whitespace philosophy (generous and airy / dense and information-rich / rhythmic and modular), image treatment (photography style, contained vs. edge-to-edge, color grading), section rhythm (alternating background colors / hard dividers / seamless continuous scroll), and how typography scales from display to body within these sections — 3-4 sentences]

## Footer Section
[Footer treatment: column count and link grouping, typographic subduing relative to body (smaller scale, lower weight, case treatment), logo or wordmark presence, newsletter form or CTA presence, social link treatment, legal/copyright text style, and overall visual weight relative to the rest of the page (dark / light / brand color / neutral) — 3-4 sentences]

## Design Principles
[3-5 core design decisions that define this site's aesthetic approach, as bullet points]

## Distinctive Qualities
[What makes this site's design stand out — specific unique choices, not generic praise]

Keep each section focused. Use the extracted data to support specific observations (e.g., exact font names, color values, animation style).`;

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

  // Bottom-of-page screenshot (footer)
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  const footerPath = path.join(screenshotDir, 'concept-footer.png');
  await page.screenshot({ path: footerPath });
  screenshotFiles.push(footerPath);

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

  // Step 4: Build LLMRouter content blocks and call the router.
  // Convert imageContent (which uses the Anthropic stream-json shape) to the
  // internal ImageBlock shape that LLMRouter expects: { type, data, mimeType }.
  const imageBlocks = imageContent.map(img => ({
    type: /** @type {'image'} */ ('image'),
    data: img.source.data,
    mimeType: /** @type {'image/png'} */ (img.source.media_type),
  }));

  const userContent = [
    ...imageBlocks,
    { type: /** @type {'text'} */ ('text'), text: promptText },
  ];

  let markdownOutput = '';
  try {
    log.debug('Calling LLMRouter for concept summary', { imageCount: imageBlocks.length });
    markdownOutput = await router.complete(
      [{ role: 'user', content: userContent }],
      { timeout: 180000 }
    );
    log.debug('Concept summary generation complete', { chars: markdownOutput.length });
  } catch (err) {
    log.minor('Concept summary generation failed', { error: err instanceof Error ? err.message : String(err) });
    return `# Concept Summary\n\n*Generation failed — no data available.*\n`;
  }

  // Step 5: Return the markdown string directly.
  return markdownOutput;
}
