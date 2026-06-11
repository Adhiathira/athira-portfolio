import fs from 'fs';
import path from 'path';
import { LLMRouter, ClaudeCliProvider } from '../lib/llm/index.js';
import { createLogger } from '../lib/logger.js';

const router = new LLMRouter({
  providers: { 'claude-cli': new ClaudeCliProvider() },
  defaultProvider: 'claude-cli',
  maxAttempts: 2,
});

export const metadata = { tag: 'content' };

const log = createLogger('content');

const CONTENT_PROMPT = `You are a content extraction assistant. Your job is to read a website screenshot and extract all visible text content into a structured markdown document.

Extract EVERY piece of visible text content on the page, organized by page section. Include:
- Navigation items (logo text, nav links, CTAs in the header)
- Hero section (headline, subheadline, body text, CTA button labels)
- Each content section below the hero (section headings, body paragraphs, card titles, card body text, feature labels, list items)
- Footer (link groups, labels, copyright text)

Format rules:
- Use ## for section headings (Navigation, Hero Section, etc.)
- Use **Label:** Value format for labeled items (e.g. **Headline:** ..., **CTA:** ...)
- Use --- between major sections
- Use ### for sub-sections within a section (e.g. card names, feature names)
- Preserve the exact wording from the page — do not paraphrase or summarize
- If a section is image-only with no text, note it: *(image-only — no text content)*
- Do not include URLs, only visible text

Start with "# Landing Page" as the title.`;

async function captureScrollScreenshots(page, screenshotsDir) {
  const screenshotPaths = [];

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);
  const above = path.join(screenshotsDir, 'content-above-fold.png');
  await page.screenshot({ path: above });
  screenshotPaths.push(above);

  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  const viewHeight = await page.evaluate(() => document.documentElement.clientHeight);

  // Mid-page (50%)
  const midY = Math.max(0, Math.floor((pageHeight - viewHeight) * 0.5));
  await page.evaluate(y => window.scrollTo(0, y), midY);
  await page.waitForTimeout(600);
  const mid = path.join(screenshotsDir, 'content-mid-page.png');
  await page.screenshot({ path: mid });
  screenshotPaths.push(mid);

  // Lower page (80%)
  const lowerY = Math.max(0, Math.floor((pageHeight - viewHeight) * 0.8));
  await page.evaluate(y => window.scrollTo(0, y), lowerY);
  await page.waitForTimeout(600);
  const lower = path.join(screenshotsDir, 'content-lower-page.png');
  await page.screenshot({ path: lower });
  screenshotPaths.push(lower);

  // Footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(600);
  const footer = path.join(screenshotsDir, 'content-footer.png');
  await page.screenshot({ path: footer });
  screenshotPaths.push(footer);

  // Scroll back to top
  await page.evaluate(() => window.scrollTo(0, 0));

  return screenshotPaths;
}

export async function extract(page, { outputDir, screenshotsDir } = {}) {
  fs.mkdirSync(outputDir, { recursive: true });

  const ssDir = screenshotsDir ?? path.join(outputDir, '..', 'screenshots');
  fs.mkdirSync(ssDir, { recursive: true });

  // Capture scroll screenshots
  let screenshotPaths;
  try {
    screenshotPaths = await captureScrollScreenshots(page, ssDir);
  } catch (err) {
    log.minor('Screenshot capture failed', { error: err.message });
    const fallback = path.join(ssDir, 'content-fallback.png');
    await page.screenshot({ path: fallback, fullPage: true });
    screenshotPaths = [fallback];
  }

  // Build image blocks for LLM
  const imageBlocks = screenshotPaths
    .filter(f => { try { return fs.statSync(f).isFile(); } catch { return false; } })
    .map(f => ({
      type: /** @type {'image'} */ ('image'),
      data: fs.readFileSync(f).toString('base64'),
      mimeType: /** @type {'image/png'} */ ('image/png'),
    }));

  const userContent = [
    ...imageBlocks,
    { type: /** @type {'text'} */ ('text'), text: CONTENT_PROMPT },
  ];

  let markdown = '';
  try {
    log.debug('Calling LLM for content extraction', { imageCount: imageBlocks.length });
    markdown = await router.complete(
      [{ role: 'user', content: userContent }],
      { timeout: 120000 }
    );
    log.debug('Content extraction complete', { chars: markdown.length });
  } catch (err) {
    log.minor('Content extraction failed', { error: err instanceof Error ? err.message : String(err) });
    markdown = `# Landing Page\n\n*Content extraction failed — re-run the extractor to populate this section.*\n`;
  }

  fs.writeFileSync(path.join(outputDir, 'landing-page.md'), markdown, 'utf8');

  // Return {} so writer.js (outputFiles: []) does nothing extra
  return {};
}
