/**
 * record-studiotwofold.cjs
 * Records studiotwofold.com.au using playwright + Google Chrome for Testing
 */

const playwright = require('/Users/delusionalmakubex/Documents/projects/design-system/node_modules/playwright/index.js');
const chromium = playwright.chromium;
const fs = require('fs');
const path = require('path');

const DOMAIN = 'studiotwofold.com.au';
const SCRATCHPAD = '/Users/delusionalmakubex/Desktop/scratchpad/website-flow-video-cli';
const MEMORY_PATH = path.join(SCRATCHPAD, 'memory', `${DOMAIN}.json`);
const OUTPUT_PATH = process.argv[2] || path.join(SCRATCHPAD, 'recordings', 'studiotwofold-com-au.webm');
const VIDEO_DIR = path.dirname(OUTPUT_PATH);

const CHROME_PATH = '/Users/delusionalmakubex/Library/Caches/ms-playwright/chromium_headless_shell-1208/chrome-headless-shell-mac-arm64/chrome-headless-shell';

let config = { cookieSelectors: [], navUrls: [], headedMode: false };
if (fs.existsSync(MEMORY_PATH)) {
  config = { ...config, ...JSON.parse(fs.readFileSync(MEMORY_PATH, 'utf8')) };
  console.log('Loaded memory for ' + DOMAIN + ' (last recorded: ' + (config.lastRecorded || 'unknown') + ')');
}

const BOT_TITLES = ['Just a moment', 'Checking your browser', 'Attention Required', 'Please wait',
  'Access denied', 'DDoS protection by Cloudflare', 'One more step', 'Security check'];

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

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
        await sleep(500);
        console.log('  Cookie banner dismissed (' + selector + ')');
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
      const textRe = /^(no[,.]?\s*thanks?|close|dismiss|×|\u2715|\u2716|skip|maybe later|not now)$/i;
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

  for (let i = 0; i < 160; i++) {
    await page.mouse.wheel(0, 60);
    await sleep(40);
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
    await sleep(30);
  }
}

async function main() {
  console.log('Recording ' + DOMAIN + ' -> ' + OUTPUT_PATH);
  console.log('Pages: ' + config.navUrls.join(', '));

  fs.mkdirSync(VIDEO_DIR, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    executablePath: CHROME_PATH,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: { dir: VIDEO_DIR, size: { width: 1920, height: 1080 } },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
  });

  const page = await context.newPage();
  page.on('crash', () => console.error('PAGE CRASHED'));

  for (let i = 0; i < config.navUrls.length; i++) {
    const url = config.navUrls[i];
    console.log('\n[' + (i + 1) + '/' + config.navUrls.length + '] ' + url);

    if (i > 0) {
      await page.mouse.move(960 + Math.floor(Math.random() * 200 - 100), 540 + Math.floor(Math.random() * 100 - 50));
      await sleep(500);

      let linkClicked = false;
      try {
        const targetPath = new URL(url).pathname;
        const linkHandle = await page.$('a[href="' + targetPath + '"], a[href="' + url + '"]');
        if (linkHandle) {
          await page.evaluate(el => el.scrollIntoView(), linkHandle);
          await sleep(300);
          await Promise.all([
            page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 45000 }).catch(() => {}),
            linkHandle.click(),
          ]);
          await sleep(2000);
          linkClicked = true;
          console.log('  Navigated via link click to ' + targetPath);
        }
      } catch (_) {}

      if (!linkClicked) {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 }).catch(() =>
          page.goto(url, { waitUntil: 'commit', timeout: 30000 })
        );
        await sleep(3000);
      }
    } else {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(async (e) => {
        console.log('  domcontentloaded error, retrying with commit:', e.message.split('\n')[0]);
        return page.goto(url, { waitUntil: 'commit', timeout: 30000 });
      });
      await sleep(4000);
    }

    const title = await page.title().catch(() => '');
    console.log('  Title: ' + title);

    if (!title || title.includes('Access to this page has been denied') || title.includes('Gone -')) {
      console.warn('  Skipping.');
      continue;
    }

    let retries = 0;
    while (await isBotChallenge(page) && retries < 8) {
      console.warn('  Bot challenge, waiting... (' + (retries + 1) + '/8)');
      await sleep(8000);
      retries++;
    }
    if (await isBotChallenge(page)) { console.error('  Bot challenge unresolved.'); continue; }

    await page.keyboard.press('Escape').catch(() => {});
    await sleep(400);
    await dismissCookieBanner(page);
    const popup1 = await dismissMarketingPopup(page);
    if (popup1) console.log('  Marketing popup dismissed.');
    await page.evaluate(() => window.scrollTo(0, 0)).catch(() => {});
    await page.mouse.move(960, 540);
    await page.waitForSelector('[role="dialog"][aria-modal="true"]', { state: 'visible', timeout: 5000 })
      .then(async () => {
        const dismissed = await dismissMarketingPopup(page);
        if (dismissed) console.log('  Delayed popup dismissed.');
      })
      .catch(() => null);

    console.log('  Scrolling down...');
    await smoothScrollDown(page);
    await sleep(800);

    console.log('  Scrolling up...');
    await smoothScrollUp(page);
    await sleep(800);
  }

  console.log('\nSaving video...');
  const tmpPath = await page.video().path();
  await context.close();
  await browser.close();

  if (fs.existsSync(tmpPath)) {
    fs.renameSync(tmpPath, OUTPUT_PATH);
    const size = (fs.statSync(OUTPUT_PATH).size / 1024 / 1024).toFixed(2);
    console.log('Done: ' + OUTPUT_PATH + ' (' + size + ' MB)');
  } else {
    console.error('ERROR: Video file not found at temp path:', tmpPath);
    process.exit(1);
  }
}

main().catch(err => { console.error('Fatal:', err.message || err); process.exit(1); });
