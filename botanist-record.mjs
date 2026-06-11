import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const OUTPUT_PATH = '/Users/delusionalmakubex/Documents/projects/design-system/extraction-assets/botanist/walkthrough.webm';
const VIDEO_DIR = path.dirname(OUTPUT_PATH);

const navUrls = [
  'https://botanist.co.nz/',
  'https://botanist.co.nz/collections/shop',
  'https://botanist.co.nz/pages/events',
  'https://botanist.co.nz/pages/driedflowers',
  'https://botanist.co.nz/pages/about-new'
];

async function smoothScrollDown(page) {
  const hasNativeScroll = await page.evaluate(() =>
    document.documentElement.scrollHeight > window.innerHeight + 50
  ).catch(() => true);
  for (let i = 0; i < 160; i++) {
    await page.mouse.wheel(0, 60);
    await page.waitForTimeout(40);
    if (hasNativeScroll && i % 10 === 0) {
      const atBottom = await page.evaluate(() =>
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 20
      ).catch(() => false);
      if (atBottom) break;
    }
  }
}

async function smoothScrollUp(page) {
  for (let i = 0; i < 40; i++) {
    await page.mouse.wheel(0, -200);
    await page.waitForTimeout(30);
  }
}

async function main() {
  console.log('Recording botanist.co.nz...');
  fs.mkdirSync(VIDEO_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: { dir: VIDEO_DIR, size: { width: 1920, height: 1080 } },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });
  const page = await context.newPage();

  for (let i = 0; i < navUrls.length; i++) {
    const url = navUrls[i];
    console.log('[' + (i+1) + '/' + navUrls.length + '] ' + url);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000);
    const title = await page.title();
    console.log('  Title: ' + title);
    await page.keyboard.press('Escape').catch(() => {});
    await page.waitForTimeout(300);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.mouse.move(960, 540);
    await page.waitForTimeout(800);
    console.log('  Scrolling down...');
    await smoothScrollDown(page);
    await page.waitForTimeout(600);
    console.log('  Scrolling up...');
    await smoothScrollUp(page);
    await page.waitForTimeout(600);
  }

  console.log('Saving video...');
  const tmpPath = await page.video().path();
  console.log('Temp path: ' + tmpPath);
  await context.close();
  await browser.close();

  if (fs.existsSync(tmpPath)) {
    fs.renameSync(tmpPath, OUTPUT_PATH);
    const size = (fs.statSync(OUTPUT_PATH).size / 1024 / 1024).toFixed(2);
    console.log('Done: ' + OUTPUT_PATH + ' (' + size + ' MB)');
  } else {
    console.error('ERROR: Video file not found at:', tmpPath);
    process.exit(1);
  }
}

main().catch(err => { console.error('Fatal:', err.message); process.exit(1); });
