const { chromium } = require('rebrowser-playwright');
const fs = require('fs');
const path = require('path');

const OUTPUT_PATH = '/Users/delusionalmakubex/Documents/projects/design-system/extraction-assets/flux-finance/walkthrough.webm';
const VIDEO_DIR = path.dirname(OUTPUT_PATH);
const DOMAIN = 'flux.finance';

const NAV_URLS = [
  'https://www.flux.finance/',
  'https://www.flux.finance/about',
  'https://www.flux.finance/work',
  'https://www.flux.finance/learn',
];

async function smoothScrollDown(page) {
  const hasNativeScroll = await page.evaluate(() =>
    document.documentElement.scrollHeight > window.innerHeight + 50
  ).catch(() => true);

  const steps = 160;
  for (let i = 0; i < steps; i++) {
    try {
      await page.mouse.wheel(0, 60);
    } catch(e) {
      console.log('  Scroll interrupted:', e.message.substring(0, 50));
      break;
    }
    await new Promise(r => setTimeout(r, 40));
    if (hasNativeScroll) {
      const atBottom = await page.evaluate(() =>
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 20
      ).catch(() => false);
      if (atBottom) break;
    }
  }
}

async function smoothScrollUp(page) {
  for (let i = 0; i < 40; i++) {
    try {
      await page.mouse.wheel(0, -200);
    } catch(e) {
      break;
    }
    await new Promise(r => setTimeout(r, 30));
  }
}

async function main() {
  console.log('Recording', DOMAIN, '->', OUTPUT_PATH);
  fs.mkdirSync(VIDEO_DIR, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    channel: 'chrome',
    args: ['--disable-blink-features=AutomationControlled', '--window-size=1920,1080'],
    ignoreDefaultArgs: ['--enable-automation'],
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: { dir: VIDEO_DIR, size: { width: 1920, height: 1080 } },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
  });

  const page = await context.newPage();

  for (let i = 0; i < NAV_URLS.length; i++) {
    const url = NAV_URLS[i];
    console.log('\n[' + (i + 1) + '/' + NAV_URLS.length + '] ' + url);

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    } catch(e) {
      console.log('networkidle timeout, trying domcontentloaded...');
      try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      } catch(e2) {
        console.log('Navigation failed:', e2.message.substring(0, 80));
        continue;
      }
    }

    // Check page is still alive
    const isAlive = await page.evaluate(() => true).catch(() => false);
    if (!isAlive) {
      console.log('  Page closed unexpectedly — stopping.');
      break;
    }

    await new Promise(r => setTimeout(r, 3000));
    const title = await page.title().catch(() => 'unknown');
    console.log('  Title:', title);

    // Dismiss any modal/popup
    await page.keyboard.press('Escape').catch(() => {});
    await new Promise(r => setTimeout(r, 500));

    // Scroll to top
    await page.evaluate(() => window.scrollTo(0, 0)).catch(() => {});
    await page.mouse.move(960, 540).catch(() => {});
    await new Promise(r => setTimeout(r, 1000));

    console.log('  Scrolling down...');
    await smoothScrollDown(page);
    await new Promise(r => setTimeout(r, 800));

    console.log('  Scrolling up...');
    await smoothScrollUp(page);
    await new Promise(r => setTimeout(r, 800));
  }

  console.log('\nSaving video...');
  const tmpPath = await page.video().path().catch(() => null);
  console.log('Temp video path:', tmpPath);
  try {
    await context.close();
  } catch(e) {
    console.log('context.close error (non-fatal):', e.message.substring(0, 60));
  }
  try {
    await browser.close();
  } catch(e) {
    console.log('browser.close error (non-fatal):', e.message.substring(0, 60));
  }

  if (tmpPath && fs.existsSync(tmpPath)) {
    fs.renameSync(tmpPath, OUTPUT_PATH);
    const size = (fs.statSync(OUTPUT_PATH).size / 1024 / 1024).toFixed(2);
    console.log('Done:', OUTPUT_PATH, '(' + size + ' MB)');
  } else {
    // Try to find any webm file in the video dir
    const files = fs.readdirSync(VIDEO_DIR).filter(f => f.endsWith('.webm') && f !== 'walkthrough.webm');
    if (files.length > 0) {
      const found = path.join(VIDEO_DIR, files[0]);
      fs.renameSync(found, OUTPUT_PATH);
      const size = (fs.statSync(OUTPUT_PATH).size / 1024 / 1024).toFixed(2);
      console.log('Done (found alt file):', OUTPUT_PATH, '(' + size + ' MB)');
    } else {
      console.error('ERROR: Video file not found at:', tmpPath);
      process.exit(1);
    }
  }
}

main().catch(err => { console.error('Fatal:', err.message); process.exit(1); });
