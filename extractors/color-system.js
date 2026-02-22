import fs from 'fs';
import os from 'os';
import path from 'path';
import { spawnSync } from 'child_process';
import { createLogger } from '../lib/logger.js';

export const metadata = { tag: 'color-system' };

const log = createLogger('color-system');

const LLM_PROMPT = `You are analyzing screenshots of a website to extract its color system.
Identify all visually distinct colors that are part of the design system — backgrounds, text, buttons, links, borders, highlights, navigation.
INCLUDE the dominant color of any background image that fills a section or the hero (e.g. a warm orange hero background), because that color is part of the user's visual experience of the brand.
IGNORE colors that appear only inside content thumbnails, article illustrations, team portrait photos, or product images — these are content, not design tokens.
Return ONLY a JSON array (no markdown, no explanation):
[{ "hex": "#rrggbb", "role": "short-role-slug", "description": "1 sentence" }]
Common roles: page-background, surface-background, hero-background, primary-action, secondary-action, body-text, heading-text, muted-text, link, border, accent, success, error, warning.`;

export async function extract(page, { outputDir, screenshotsDir } = {}) {
  // Pass 1 + 2: run in browser context
  const { cssVars, elements } = await page.evaluate(() => {
    function toHex(value) {
      const m = value.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!m) return value.trim();
      return '#' + [m[1], m[2], m[3]]
        .map(n => parseInt(n).toString(16).padStart(2, '0'))
        .join('');
    }
    function isColorValue(v) {
      const s = v.trim();
      return /^(#[0-9a-fA-F]{3,8}|rgba?\([^)]+\)|hsla?\([^)]+\))$/.test(s) ||
        (/^[a-z]+$/i.test(s) &&
          !['auto','inherit','initial','unset','none','normal','transparent'].includes(s));
    }

    // Pass 1: CSS custom properties from :root
    const cssVars = {};
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (!rule.selectorText?.match(/^(:root|html)$/)) continue;
          for (const prop of rule.style) {
            if (!prop.startsWith('--')) continue;
            const val = rule.style.getPropertyValue(prop).trim();
            if (isColorValue(val)) cssVars[prop.slice(2)] = toHex(val);
          }
        }
      } catch (_) { /* cross-origin */ }
    }

    // Pass 2: computed element colors
    const targets = [
      ['pageBackground', 'body',         'backgroundColor'],
      ['bodyText',        'body',         'color'],
      ['headingText',     'h1,h2',        'color'],
      ['buttonBackground','button',       'backgroundColor'],
      ['buttonText',      'button',       'color'],
      ['linkColor',       'a',            'color'],
      ['borderColor',     'button,input', 'borderColor'],
    ];
    const elements = {};
    for (const [label, sel, prop] of targets) {
      const el = document.querySelector(sel);
      if (el) {
        const val = getComputedStyle(el)[prop];
        if (val && val !== 'rgba(0, 0, 0, 0)') elements[label] = toHex(val);
      }
    }
    return { cssVars, elements };
  });

  // Pass 3: scroll-and-screenshot, then claude -p vision analysis
  const MAX_SEGMENTS = 10;

  // Measurement pass: scroll to bottom to detect infinite scroll + page height
  const { viewportHeight, initialScrollHeight } = await page.evaluate(() => ({
    viewportHeight: document.documentElement.clientHeight,
    initialScrollHeight: document.body.scrollHeight,
  }));
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  const finalScrollHeight = await page.evaluate(() => document.body.scrollHeight);

  const isInfinite = finalScrollHeight > initialScrollHeight;
  const numSegments = isInfinite
    ? MAX_SEGMENTS
    : Math.min(Math.ceil(finalScrollHeight / viewportHeight), MAX_SEGMENTS);

  // Reload the page to get a clean top-of-page state (avoids scroll animation residue)
  // Use 'load' instead of 'networkidle' — sites with analytics/SSE never reach networkidle
  await page.reload({ waitUntil: 'load' });
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(2000);

  const screenshotDir = screenshotsDir ?? (outputDir ? path.join(outputDir, 'screenshots') : os.tmpdir());
  const persistScreenshots = !!(screenshotsDir || outputDir);
  if (persistScreenshots) {
    fs.mkdirSync(screenshotDir, { recursive: true });
    // Clear stale screenshots from previous runs (segment count can vary)
    for (const f of fs.readdirSync(screenshotDir)) {
      if (f.startsWith('segment-') && f.endsWith('.png')) fs.unlinkSync(path.join(screenshotDir, f));
    }
  }

  const screenshotFiles = [];

  for (let i = 0; i < numSegments; i++) {
    const filename = outputDir
      ? `segment-${String(i + 1).padStart(2, '0')}.png`
      : `color-extract-seg-${i}-${Date.now()}.png`;
    const filePath = path.join(screenshotDir, filename);
    await page.screenshot({ path: filePath });
    screenshotFiles.push(filePath);
    if (i < numSegments - 1) {
      await page.evaluate(h => window.scrollBy(0, h), Math.round(viewportHeight * 1.15));
      await page.waitForTimeout(2000);
    }
  }

  // Read screenshots as base64; clean up only if using tmp (not the asset dir)
  const imageContent = screenshotFiles.map(f => ({
    type: 'image',
    source: { type: 'base64', media_type: 'image/png', data: fs.readFileSync(f).toString('base64') },
  }));
  if (!persistScreenshots) {
    for (const f of screenshotFiles) {
      try { fs.unlinkSync(f); } catch (_) {}
    }
  }

  // Call claude via stream-json (supports vision via base64 content blocks)
  const msg = JSON.stringify({
    type: 'user',
    message: {
      role: 'user',
      content: [...imageContent, { type: 'text', text: LLM_PROMPT }],
    },
  });
  const result = spawnSync(
    'claude',
    ['-p', '--input-format', 'stream-json', '--output-format', 'stream-json', '--verbose', '--allowedTools', ''],
    { input: msg, encoding: 'utf8', timeout: 180000, maxBuffer: 50 * 1024 * 1024 }
  );

  let visual = [];
  if (result.error || result.status !== 0) {
    log.minor('Vision pass failed', { error: result.error?.message ?? `exit ${result.status}`, stderr: result.stderr?.trim() || '' });
  } else {
    try {
      const resultLine = result.stdout?.split('\n').find(l => l.includes('"type":"result"'));
      const claudeResult = resultLine ? JSON.parse(resultLine) : null;
      if (claudeResult?.is_error) {
        log.minor('Vision pass API error', { result: claudeResult.result });
      } else {
        const rawOutput = claudeResult?.result ?? '';
        // Try each [...] candidate (non-greedy) until one parses as a non-empty array.
        // Handles markdown fences, leading notes like "[note: 10 found]", or trailing brackets.
        for (const match of rawOutput.matchAll(/\[[\s\S]*?\]/g)) {
          try {
            const parsed = JSON.parse(match[0]);
            if (Array.isArray(parsed) && parsed.length > 0) {
              visual = parsed;
              break;
            }
          } catch (_) { /* not valid JSON, try next candidate */ }
        }
        if (visual.length === 0) {
          log.minor('Vision pass returned no JSON array, ignoring');
        }
      }
    } catch (_) {
      log.minor('Vision pass returned unparseable output, ignoring');
    }
  }

  return { cssVars, elements, visual };
}
