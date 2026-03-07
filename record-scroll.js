/**
 * record-scroll.js
 *
 * Standalone CLI tool that records a cinematic browser scroll for a site
 * from sites.json and saves the output as a .webm video. The resulting file
 * is intended to be submitted manually to a Gemini model via OpenRouter
 * (Vertex AI provider) for video-based concept analysis.
 *
 * Usage: node record-scroll.js <site-name>
 * e.g.:  node record-scroll.js hermes
 *
 * Output: extraction-assets/<site-name>/scroll-recording.webm
 */

import fs from 'fs';
import os from 'os';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';
import { dismissCookieBanners } from './lib/browser.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------
// CLI argument validation
// ---------------------------------------------------------------------------

const siteName = process.argv[2];

if (!siteName) {
  console.error('Usage: node record-scroll.js <site-name>');
  console.error('e.g.:  node record-scroll.js hermes');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Resolve site URL from sites.json
// ---------------------------------------------------------------------------

const sitesPath = path.join(__dirname, 'sites.json');
const sitesData = JSON.parse(fs.readFileSync(sitesPath, 'utf-8'));

// Search both queue and done arrays; take the first match
const allSites = [...(sitesData.queue ?? []), ...(sitesData.done ?? [])];
const siteEntry = allSites.find(s => s.name === siteName);

if (!siteEntry) {
  // Deduplicate names for a clean error message
  const availableNames = [...new Set(allSites.map(s => s.name))].sort();
  console.error(`Error: site "${siteName}" not found in sites.json`);
  console.error('');
  console.error('Available sites:');
  for (const name of availableNames) {
    console.error(`  ${name}`);
  }
  process.exit(1);
}

const { url } = siteEntry;

// ---------------------------------------------------------------------------
// Main recording flow
// ---------------------------------------------------------------------------

console.log(`Recording: ${siteName} (${url})`);

const browser = await chromium.launch({ headless: false, args: ['--start-maximized'] });

// Video recording is a context-level option — cannot use browser.newPage() directly.
const context = await browser.newContext({
  recordVideo: {
    dir: os.tmpdir(),
    size: { width: 1280, height: 720 },
  },
  viewport: null,
});

const page = await context.newPage();

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

console.log('Navigating...');
await page.goto(url, { waitUntil: 'load', timeout: 30000 });
// Let network settle — challenge pages often fire additional requests after load
await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
await dismissCookieBanners(page);

// ---------------------------------------------------------------------------
// Manual challenge pause — bot challenges (Cloudflare, PerimeterX, etc.) may
// appear. The browser is visible — solve any slider/captcha, wait for the
// real site to fully load, then press Enter.
// ---------------------------------------------------------------------------

console.log('\n⚠️  Check the browser window.');
console.log('   If a bot challenge (slider, captcha) is visible — solve it and wait for the site to load.');
console.log('   If the site is already loaded — press Enter now.\n');

await new Promise(resolve => {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question('Press Enter to start recording... ', () => {
    rl.close();
    resolve();
  });
});

// Let any post-challenge redirects and animations settle before recording
await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
await page.waitForTimeout(1000);

// ---------------------------------------------------------------------------
// Warmup scroll — fast pass to trigger lazy-loaded content and Intersection
// Observers. This is NOT the recorded focus; it just primes the page before
// the cinematic pass begins. Mirrors the warmupPage logic in lib/browser.js.
// ---------------------------------------------------------------------------

console.log('Warming up page...');
await page.evaluate(async () => {
  await new Promise(resolve => {
    const distance = 300;
    const delay = 80;
    const MAX_STEPS = 60; // ~18 000px max — enough for any normal page
    let steps = 0;
    const timer = setInterval(() => {
      window.scrollBy(0, distance);
      steps++;
      const scrollHeight = Math.max(
        document.body?.scrollHeight ?? 0,
        document.documentElement?.scrollHeight ?? 0,
      );
      const atBottom = window.scrollY + window.innerHeight >= scrollHeight;
      if (atBottom || steps >= MAX_STEPS) {
        clearInterval(timer);
        window.scrollTo(0, 0);
        resolve();
      }
    }, delay);
  });
});

// Let network requests triggered by lazy content settle before the recording pass
await page.waitForTimeout(2000);

// ---------------------------------------------------------------------------
// Cinematic scroll — this is the actual recording
// ---------------------------------------------------------------------------

console.log('Recording cinematic scroll...');

// Return to top and give the page a moment to settle
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(1000);

// Slow scroll: 20px every 60ms, stops as soon as scroll position stops changing
// (3 consecutive no-movement steps = truly at bottom).
await page.evaluate(async () => {
  await new Promise(resolve => {
    const distance = 20;
    const delay = 60;
    const MAX_STEPS = 800;
    let steps = 0;
    let noMovement = 0;
    let lastY = window.scrollY;
    const timer = setInterval(() => {
      window.scrollBy(0, distance);
      steps++;
      const currentY = window.scrollY;
      if (Math.abs(currentY - lastY) < 1) {
        noMovement++;
      } else {
        noMovement = 0;
      }
      lastY = currentY;
      if (noMovement >= 3 || steps >= MAX_STEPS) {
        clearInterval(timer);
        resolve();
      }
    }, delay);
  });
});

// Brief hold at bottom before finalizing
await page.waitForTimeout(500);

// ---------------------------------------------------------------------------
// Finalize video — ordering is critical:
//   1. page.close()       — triggers Playwright to flush and finalize the .webm
//   2. page.video().path() — only resolves AFTER the page is closed
// ---------------------------------------------------------------------------

console.log('Finalizing video...');

await page.close();
const videoPath = await page.video().path();

const outputDir = path.join(__dirname, 'extraction-assets', siteName);
fs.mkdirSync(outputDir, { recursive: true });

const outputPath = path.join(outputDir, 'scroll-recording.webm');
fs.renameSync(videoPath, outputPath);

await context.close();
await browser.close();

console.log(`\nRecording saved: extraction-assets/${siteName}/scroll-recording.webm`);
