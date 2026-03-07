import fs from 'fs';
import os from 'os';
import path from 'path';
import { LLMRouter, ClaudeCliProvider } from '../lib/llm/index.js';
import { createLogger } from '../lib/logger.js';

const router = new LLMRouter({
  providers: { 'claude-cli': new ClaudeCliProvider() },
  maxAttempts: 2,
});

export const metadata = { tag: 'color-system' };

const log = createLogger('color-system');

const LLM_PROMPT = `You are analyzing screenshots of a website to extract its color system.
Identify all visually distinct colors that are part of the design system — backgrounds, text, buttons, links, borders, highlights, navigation.
INCLUDE the dominant color of any background image that fills a section or the hero (e.g. a warm orange hero background), because that color is part of the user's visual experience of the brand.
IGNORE colors that appear only inside content thumbnails, article illustrations, team portrait photos, or product images — these are content, not design tokens.
The first two images show the navigation bar in two states (top-of-page and after scroll). If the nav colors differ between states, extract tokens for both states.
Return ONLY a JSON array (no markdown, no explanation):
[{ "hex": "#rrggbb", "role": "short-role-slug", "description": "1 sentence" }]
Common roles: page-background, surface-background, hero-background, primary-action, secondary-action, body-text, heading-text, muted-text, link, border, accent, success, error, warning, nav-background, nav-text, nav-link, nav-background-scrolled, nav-text-scrolled, nav-link-scrolled.`;

export async function extract(page, { outputDir, screenshotsDir } = {}) {
  // Pass 1 + 2: run in browser context
  const { cssVars, elements, buttonCandidates } = await page.evaluate(() => {
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
      ['pageBackground', 'body',  'backgroundColor'],
      ['bodyText',        'body',  'color'],
      ['headingText',     'h1,h2', 'color'],
      ['linkColor',       'a',     'color'],
    ];
    const elements = {};
    for (const [label, sel, prop] of targets) {
      const el = document.querySelector(sel);
      if (el) {
        const val = getComputedStyle(el)[prop];
        if (val && val !== 'rgba(0, 0, 0, 0)') elements[label] = toHex(val);
      }
    }

    // Pass 2 (button scan): full DOM scan for button/CTA candidates
    const fingerprints = new Map();
    const buttonCandidates = [];
    for (const el of document.querySelectorAll('button, a, [role="button"]')) {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      const style = getComputedStyle(el);
      const bg = style.backgroundColor;
      const border = style.borderColor;
      if (bg === 'rgba(0, 0, 0, 0)' && border === 'rgba(0, 0, 0, 0)') continue;
      const textColor = style.color;
      const bgHex = bg === 'rgba(0, 0, 0, 0)' ? bg : toHex(bg);
      const textHex = textColor && textColor !== 'rgba(0, 0, 0, 0)' ? toHex(textColor) : textColor;
      const borderHex = border === 'rgba(0, 0, 0, 0)' ? border : toHex(border);
      const fingerprint = `${bgHex}|${textHex}|${borderHex}`;
      if (fingerprints.has(fingerprint)) continue;
      fingerprints.set(fingerprint, true);
      const label = (el.textContent || '').trim().slice(0, 60);
      buttonCandidates.push({ bg: bgHex, textColor: textHex, border: borderHex, label });
    }

    // Pass 2A: nav colors at top-of-page state
    const navEl = document.querySelector('nav') || document.querySelector('header') || document.querySelector('[role="navigation"]');
    const navLinkEl = document.querySelector('nav a') || document.querySelector('header a');
    if (navEl) {
      const bg = getComputedStyle(navEl).backgroundColor;
      const col = getComputedStyle(navEl).color;
      if (bg) elements.navBackground = bg === 'rgba(0, 0, 0, 0)' ? bg : toHex(bg);
      if (col && col !== 'rgba(0, 0, 0, 0)') elements.navText = toHex(col);
    }
    if (navLinkEl) {
      const lc = getComputedStyle(navLinkEl).color;
      if (lc && lc !== 'rgba(0, 0, 0, 0)') elements.navLink = toHex(lc);
    }

    return { cssVars, elements, buttonCandidates };
  });

  // Pass 2B: scrolled nav colors — scroll to trigger nav state transition
  await page.evaluate(() => window.scrollTo(0, 200));
  await page.waitForTimeout(600);
  const navScrolled = await page.evaluate(() => {
    function toHex(value) {
      const m = value.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!m) return value.trim();
      return '#' + [m[1], m[2], m[3]]
        .map(n => parseInt(n).toString(16).padStart(2, '0'))
        .join('');
    }
    const navEl = document.querySelector('nav') || document.querySelector('header') || document.querySelector('[role="navigation"]');
    const navLinkEl = document.querySelector('nav a') || document.querySelector('header a');
    const result = {};
    if (navEl) {
      const bg = getComputedStyle(navEl).backgroundColor;
      const col = getComputedStyle(navEl).color;
      if (bg) result.navBackgroundScrolled = bg === 'rgba(0, 0, 0, 0)' ? bg : toHex(bg);
      if (col && col !== 'rgba(0, 0, 0, 0)') result.navTextScrolled = toHex(col);
    }
    if (navLinkEl) {
      const lc = getComputedStyle(navLinkEl).color;
      if (lc && lc !== 'rgba(0, 0, 0, 0)') result.navLinkScrolled = toHex(lc);
    }
    return result;
  });
  Object.assign(elements, navScrolled);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

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
    // Clear stale screenshots from previous runs (segment count can vary; nav files may change too)
    for (const f of fs.readdirSync(screenshotDir)) {
      if ((f.startsWith('segment-') || f.startsWith('nav-')) && f.endsWith('.jpg')) {
        fs.unlinkSync(path.join(screenshotDir, f));
      }
    }
  }

  const screenshotFiles = [];

  // Nav-specific screenshots: top state and scrolled state
  const navTopFilename = outputDir ? 'nav-top.jpg' : `color-nav-top-${Date.now()}.jpg`;
  const navScrolledFilename = outputDir ? 'nav-scrolled.jpg' : `color-nav-scrolled-${Date.now()}.jpg`;
  const navTopPath = path.join(screenshotDir, navTopFilename);
  const navScrolledPath = path.join(screenshotDir, navScrolledFilename);

  await page.screenshot({ path: navTopPath, type: 'jpeg', quality: 80 });
  await page.evaluate(() => window.scrollTo(0, 200));
  await page.waitForTimeout(600);
  await page.screenshot({ path: navScrolledPath, type: 'jpeg', quality: 80 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  const navImageContent = [
    { type: 'text', text: 'Image 1: navigation bar at top of page (may be transparent/overlay state).' },
    {
      type: 'image',
      source: { type: 'base64', media_type: 'image/jpeg', data: fs.readFileSync(navTopPath).toString('base64') },
    },
    { type: 'text', text: 'Image 2: navigation bar after scroll (active/opaque state — use this for nav color tokens).' },
    {
      type: 'image',
      source: { type: 'base64', media_type: 'image/jpeg', data: fs.readFileSync(navScrolledPath).toString('base64') },
    },
  ];
  if (!persistScreenshots) {
    try { fs.unlinkSync(navTopPath); } catch (_) {}
    try { fs.unlinkSync(navScrolledPath); } catch (_) {}
  }

  for (let i = 0; i < numSegments; i++) {
    const filename = outputDir
      ? `segment-${String(i + 1).padStart(2, '0')}.jpg`
      : `color-extract-seg-${i}-${Date.now()}.jpg`;
    const filePath = path.join(screenshotDir, filename);
    await page.screenshot({ path: filePath, type: 'jpeg', quality: 80 });
    screenshotFiles.push(filePath);
    if (i < numSegments - 1) {
      await page.evaluate(h => window.scrollBy(0, h), Math.round(viewportHeight * 1.15));
      await page.waitForTimeout(2000);
    }
  }

  // Read screenshots as base64; clean up only if using tmp (not the asset dir)
  const imageContent = [
    ...navImageContent,
    ...screenshotFiles.map(f => ({
      type: 'image',
      source: { type: 'base64', media_type: 'image/jpeg', data: fs.readFileSync(f).toString('base64') },
    })),
  ];
  if (!persistScreenshots) {
    for (const f of screenshotFiles) {
      try { fs.unlinkSync(f); } catch (_) {}
    }
  }

  // Call LLMRouter for vision analysis (supports vision via base64 content blocks)
  const buttonCandidatesBlock = {
    type: 'text',
    text: `Button candidates extracted from DOM (deduplicated by visual fingerprint):\n${JSON.stringify(buttonCandidates, null, 2)}\n\nFor EACH button candidate above, assign a role. Valid roles: primary-cta, secondary-cta, ghost, nav-link, utility, other.\nReturn a second JSON array (separate from the color tokens array) with this shape — no markdown, no explanation:\n[{ "bg": "...", "textColor": "...", "border": "...", "role": "..." }]`,
  };
  // imageContent is mixed: text label blocks + image blocks. Translate image blocks to LLM lib shape.
  const translatedContent = imageContent.map(block =>
    block.type === 'image'
      ? { type: 'image', data: block.source.data, mimeType: block.source.media_type }
      : block
  );

  let visual = [];
  let ctaButtons = [];
  try {
    const rawOutput = await router.complete(
      [{ role: 'user', content: [...translatedContent, buttonCandidatesBlock, { type: 'text', text: LLM_PROMPT }] }],
      { timeout: 180000 }
    );
    // Scan all [...] candidates and identify each array by shape, not position.
    // Visual palette items have a `hex` key; CTA button items have a `bg` key.
    // This is robust to the LLM emitting an empty [] for one array or reordering them.
    for (const match of rawOutput.matchAll(/\[[\s\S]*?\]/g)) {
      try {
        const parsed = JSON.parse(match[0]);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0]?.hex !== undefined) {
          visual = parsed;
          break;
        }
      } catch (_) { /* not valid JSON, try next candidate */ }
    }
    if (visual.length === 0) {
      log.minor('Vision pass returned no JSON array for visual palette, ignoring');
    }

    for (const match of rawOutput.matchAll(/\[[\s\S]*?\]/g)) {
      try {
        const parsed = JSON.parse(match[0]);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0]?.bg !== undefined) {
          ctaButtons = parsed.map(({ label: _l, ...rest }) => rest);
          break;
        }
      } catch (_) { /* not valid JSON, try next candidate */ }
    }
  } catch (err) {
    log.minor('Vision pass failed', { error: err instanceof Error ? err.message : String(err) });
  }

  return { cssVars, elements, visual, ctaButtons };
}
