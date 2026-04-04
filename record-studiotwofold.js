/**
 * record-studiotwofold.js
 * Records a cinematic walkthrough of studiotwofold.com.au
 * Uses playwright + Google Chrome for Testing (GPU crashes with headless shell on this site)
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const DOMAIN = 'studiotwofold.com.au';
const SCRATCHPAD = '/Users/delusionalmakubex/Desktop/scratchpad/website-flow-video-cli';
const MEMORY_PATH = path.join(SCRATCHPAD, 'memory', `${DOMAIN}.json`);
const OUTPUT_PATH = process.argv[2] || path.join(SCRATCHPAD, 'recordings', 'studiotwofold-com-au.webm');
const VIDEO_DIR = path.dirname(OUTPUT_PATH);

const CHROME_PATH = '/Users/delusionalmakubex/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';

let config = { cookieSelectors: [], navUrls: [], headedMode: false };
if (fs.existsSync(MEMORY_PATH)) {
  config = { ...config, ...JSON.parse(fs.readFileSync(MEMORY_PATH, 'utf8')) };
  console.log(`Loaded memory (last recorded: ${config.lastRecorded || 'unknown'})`);
}

const BOT_TITLES = ['Just a moment', 'Checking your browser', 'Attention Required', 'Please wait',
  'Access denied', 'DDoS protection by Cloudflare', 'One more step', 'Security check'];

async function isBotChallenge(page) {
  const title = await page.title().catch(() => '');
  return BOT_TITLES.some(t => title.includes(t));
}

async function dismissCookieBanner(page) {
  for (const selector of config.cookieSelectors) {
    try {
      const el = await page.$(selector);
      if (el) {
        await el.click();
        await page.waitForLoadState('domcontentloaded', { timeout: 10000 }).catch(() => {});
        await page.waitForTimeout(500);
        console.log(`  Cookie banner dismissed (${selector})`);
      }
    } catch (_) {}
  }
}

async function dismissMarketingPopup(page) {
  return page.evaluate(async () => {
    const isVisible = el => {
      if (!el) return false;
      const r = el.getBoundingClientRect();
      const s = window.getComputedStyle(el);
      return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && parseFloat(s.opacity) > 0;
    };
    const containerSels = ['[role="dialog"]', '[aria-modal="true"]', '[class*="modal"]', '[class*="popup"]', '[class*="overlay"]', '[class*="lightbox"]'];
    let modal = null;
    for (const sel of containerSels) {
      const els = Array.from(document.querySelectorAll(sel)).filter(isVisible);
      if (els.length) { modal = els[0]; break; }
    }
    if (!modal) return false;
    const closeSels = ['[aria-label*="close" i]', '[aria-label*="dismiss" i]', 'button[class*="close" i]', 'button[class*="dismiss" i]'];
    let btn = null;
    for (const sel of closeSels) {
      const el = modal.querySelector(sel);
      if (el && isVisible(el)) { btn = el; break; }
    }
    if (!btn) {
      const textRe = /^(no[,.]?\s*thanks?|close|dismiss|×|✕|✖|skip|maybe later|not now)$/i;
      btn = Array.from(modal.querySelectorAll('button, a, [role="button"]'))
        .find(el => isVisible(el) && textRe.test((el.textContent || '').trim()));
    }
    if (!btn) return false;
    btn.click();
    await new Promise(r => setTimeout(r, 400));
    return true;
  }).catch(() => false);
}

async function smoothScrollDown(page) {
  const hasNativeScroll = await page.evaluate(() =>
    document.documentElement.scrollHeight > window.innerHeight + 50
  ).catch(() => true);

  const steps = 160;
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, 60);
    await page.waitForTimeout(40);
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
    await page.mouse.wheel(0, -200);
    await page.waitForTimeout(30);
  }
}

async function main() {
  console.log(`Recording ${DOMAIN} → ${OUTPUT_PATH}`);
  console.log(`Pages: ${config.navUrls.join(', ')}`);

  fs.mkdirSync(VIDEO_DIR, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    executablePath: CHROME_PATH,
    args: [
      '--no-sandbox',
      '--disable-dev-shm-usage',
    ],
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: { dir: VIDEO_DIR, size: { width: 1920, height: 1080 } },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
  });

  const page = await context.newPage();

  for (let i = 0; i < config.navUrls.length; i++) {
    const url = config.navUrls[i];
    console.log(`\n[${i + 1}/${config.navUrls.length}] ${url}`);

    if (i > 0) {
      await page.mouse.move(960 + Math.floor(Math.random() * 200 - 100), 540 + Math.floor(Math.random() * 100 - 50));
      await page.waitForTimeout(500);

      let linkClicked = false;
      try {
        const targetPath = new URL(url).pathname;
        const linkHandle = await page.$(`a[href="${targetPath}"], a[href="${url}"]`);
        if (linkHandle) {
          await page.evaluate(el => el.scrollIntoView(), linkHandle);
          await page.waitForTimeout(300);
          await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle', timeout: 45000 }).catch(() => {}),
            linkHandle.click(),
          ]);
          await page.waitForTimeout(2000);
          linkClicked = true;
          console.log(`  Navigated via link click to ${targetPath}`);
        }
      } catch (_) {}

      if (!linkClicked) {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 }).catch(() =>
          page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 })
        );
        await page.waitForTimeout(2000);
      }
    } else {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() =>
        page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 })
      );
      await page.waitForTimeout(4000);
    }

    const title = await page.title();
    console.log(`  Title: ${title}`);

    if (title.includes('Access to this page has been denied') || title.includes('Gone -')) {
      console.warn('  Skipping (access denied / 404).');
      continue;
    }

    let retries = 0;
    while (await isBotChallenge(page) && retries < 8) {
      console.warn(`  Bot challenge detected, waiting... (${retries + 1}/8)`);
      await page.waitForTimeout(8000);
      retries++;
    }
    if (await isBotChallenge(page)) { console.error('  Bot challenge unresolved — skipping.'); continue; }

    await page.keyboard.press('Escape').catch(() => {});
    await page.waitForTimeout(400);
    await dismissCookieBanner(page);
    const popup1 = await dismissMarketingPopup(page);
    if (popup1) console.log('  Marketing popup dismissed (immediate).');
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.mouse.move(960, 540);
    await page.waitForSelector('[role="dialog"][aria-modal="true"]', { state: 'visible', timeout: 5000 })
      .then(async () => {
        const dismissed = await dismissMarketingPopup(page);
        if (dismissed) console.log('  Marketing popup dismissed (delayed).');
      })
      .catch(() => null);

    console.log('  Scrolling down...');
    await smoothScrollDown(page);
    const popup3 = await dismissMarketingPopup(page);
    if (popup3) { console.log('  Marketing popup dismissed (post-scroll).'); await page.waitForTimeout(500); }
    await page.waitForTimeout(800);

    console.log('  Scrolling up...');
    await smoothScrollUp(page);
    await page.waitForTimeout(800);
  }

  console.log('\nSaving video...');
  const tmpPath = await page.video().path();
  await context.close();
  await browser.close();

  if (fs.existsSync(tmpPath)) {
    fs.renameSync(tmpPath, OUTPUT_PATH);
    const size = (fs.statSync(OUTPUT_PATH).size / 1024 / 1024).toFixed(2);
    console.log(`Done: ${OUTPUT_PATH} (${size} MB)`);
  } else {
    console.error('ERROR: Video file not found at temp path:', tmpPath);
    process.exit(1);
  }
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
