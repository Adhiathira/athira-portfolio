const { chromium } = require('rebrowser-playwright');

async function main() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--disable-blink-features=AutomationControlled', '--window-size=1920,1080'],
    ignoreDefaultArgs: ['--enable-automation'],
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
  });

  const page = await context.newPage();

  console.log('Navigating to flux.finance...');
  await page.goto('https://www.flux.finance/', { waitUntil: 'networkidle', timeout: 45000 }).catch(() =>
    page.goto('https://www.flux.finance/', { waitUntil: 'domcontentloaded', timeout: 30000 })
  );
  await new Promise(r => setTimeout(r, 3000));

  const title = await page.title();
  console.log('Title:', title);

  // Screenshot
  await page.screenshot({ path: '/tmp/flux-discover.png', type: 'png' });
  console.log('Screenshot saved to /tmp/flux-discover.png');

  // Get all nav links
  const links = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('nav a, header a, [role="navigation"] a, a'));
    return anchors
      .map(a => ({ href: a.href, text: (a.textContent || '').trim().substring(0, 60) }))
      .filter(l => l.href && l.href.startsWith('http') && !l.href.includes('#') && l.text.length > 0)
      .filter((l, i, arr) => arr.findIndex(x => x.href === l.href) === i);
  });

  console.log('\nAll links found:');
  links.forEach(l => console.log(`  ${l.text} -> ${l.href}`));

  // Check for cookie banner
  const cookieBanner = await page.evaluate(() => {
    const bannerSels = ['[id*="cookie"]', '[class*="cookie"]', '[id*="consent"]', '[class*="consent"]',
      '[id*="gdpr"]', '[class*="gdpr"]', '[aria-label*="cookie" i]', '[data-testid*="cookie" i]'];
    for (const sel of bannerSels) {
      const el = document.querySelector(sel);
      if (el) {
        const r = el.getBoundingClientRect();
        const s = window.getComputedStyle(el);
        if (r.height > 0 && s.display !== 'none' && s.visibility !== 'hidden') {
          return { found: true, selector: sel, html: el.outerHTML.substring(0, 200) };
        }
      }
    }
    return { found: false };
  });

  console.log('\nCookie banner check:', JSON.stringify(cookieBanner));

  await context.close();
  await browser.close();
}

main().catch(err => { console.error('Error:', err.message); process.exit(1); });
