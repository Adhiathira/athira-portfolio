import { createLogger } from '../lib/logger.js';
import { cinematicScroll, settleAtTop, scrollBackToTop, shortCinematicScroll } from '../lib/scroll.js';

export const metadata = { tag: 'scroll-video', recordVideo: true };

const log = createLogger('scroll-video');

const NAV_LINK_COUNT = 4;      // how many nav links to visit
const PER_PAGE_MAX_STEPS = 300; // scroll depth per sub-page

async function discoverNavLinks(page, originUrl) {
  const origin = new URL(originUrl).origin;
  const selectors = ['nav a[href]', 'header a[href]', '[role="navigation"] a[href]'];

  for (const selector of selectors) {
    const hrefs = await page.evaluate(({ sel, origin, currentUrl }) => {
      const els = Array.from(document.querySelectorAll(sel));
      const seen = new Set();
      const results = [];
      for (const el of els) {
        const href = el.getAttribute('href');
        if (!href) continue;
        if (href.startsWith('#')) continue;
        let absolute;
        try {
          absolute = new URL(href, window.location.href).href;
        } catch {
          continue;
        }
        if (new URL(absolute).origin !== origin) continue;
        if (absolute === currentUrl) continue;
        if (seen.has(absolute)) continue;
        seen.add(absolute);
        results.push(href);
      }
      return results;
    }, { sel: selector, origin, currentUrl: originUrl });

    if (hrefs.length > 0) {
      return hrefs.slice(0, NAV_LINK_COUNT);
    }
  }
  return [];
}

export async function extract(page) {
  // The recording context is created by runner.js — this page is already being
  // recorded. Just scroll cinematically and return. Runner.js handles saving
  // the .webm after the page is closed.

  // Settle at top — let fonts, images, and JS initialize without consuming
  // scroll state. Records the true first-scroll experience.
  await settleAtTop(page);

  log.debug('Starting cinematic scroll');
  await cinematicScroll(page);

  await page.waitForTimeout(500);
  log.debug('Cinematic scroll complete');

  try {
    log.debug('Scrolling back to top');
    await scrollBackToTop(page);

    const originUrl = page.url();
    const navLinks = await discoverNavLinks(page, originUrl);
    log.debug(`Discovered ${navLinks.length} nav links`);

    for (const href of navLinks) {
      try {
        await page.evaluate(() => window.scrollTo(0, 0));

        const el = await page.$(`a[href="${href}"]`);
        if (!el) {
          log.minor('Nav link not found, skipping: ' + href);
          continue;
        }

        await el.hover();
        await page.waitForTimeout(1500);
        const preClickUrl = page.url();
        await el.click();
        await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        await page.waitForTimeout(2000);
        await shortCinematicScroll(page, PER_PAGE_MAX_STEPS);
        if (page.url() !== preClickUrl) {
          await page.goBack();
          await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
        }
      } catch (err) {
        log.minor('Error navigating to ' + href + ': ' + err.message);
        if (page.url() !== originUrl) {
          await page.goto(originUrl, { waitUntil: 'networkidle' }).catch(() => {});
        }
      }
    }
  } catch (err) {
    log.major('Nav exploration failed: ' + err.message);
  }

  return { recorded: true, recordedAt: new Date().toISOString() };
}
