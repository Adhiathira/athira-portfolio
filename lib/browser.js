import { chromium } from 'playwright';
import { createLogger } from './logger.js';

const log = createLogger('browser');

/**
 * Launch a Playwright browser instance.
 * Reads HEADLESS and TIMEOUT from environment variables (via dotenv).
 * @returns {Promise<Browser>}
 */
export async function launchBrowser() {
  const headless = process.env.HEADLESS !== 'false';
  const args = headless ? [] : ['--start-maximized'];
  return chromium.launch({ headless, args });
}

/**
 * Warm up a page by scrolling to trigger lazy-loaded content and waiting for network settle.
 * @param {Page} page
 */
async function warmupPage(page) {
  // Scroll incrementally to trigger lazy-loaded content and Intersection Observers.
  // Caps at MAX_STEPS to handle infinite-scroll pages (scrollHeight grows unboundedly).
  await page.evaluate(async () => {
    await new Promise(resolve => {
      const distance = 300;
      const delay = 80;
      const MAX_STEPS = 60; // ~18 000px max — enough for any normal page
      let steps = 0;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        steps++;
        const scrollHeight = Math.max(document.body?.scrollHeight ?? 0, document.documentElement?.scrollHeight ?? 0);
        const atBottom = window.scrollY + window.innerHeight >= scrollHeight;
        if (atBottom || steps >= MAX_STEPS) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, delay);
    });
  });

  // Let any triggered network requests settle
  await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
  // Wait 2 seconds for JavaScript-driven content to initialize
  await page.waitForTimeout(2000);
}

/**
 * Open a new page in the given browser, navigate to url, and wait for network idle.
 * Dismisses cookie banners BEFORE warmup to ensure scroll works correctly.
 * @param {Browser} browser
 * @param {string} url
 * @returns {Promise<Page>}
 */
export async function newPage(browser, url) {
  const timeout = parseInt(process.env.TIMEOUT ?? '30000', 10);
  const headless = process.env.HEADLESS !== 'false';
  const viewport = headless ? { width: 1920, height: 1080 } : null;
  const page = await browser.newPage({ viewport });
  await page.goto(url, { waitUntil: 'load', timeout });

  // Dismiss cookie banners BEFORE warmup scroll (they can block scrolling)
  await dismissCookieBanners(page);

  // Warmup: scroll and wait for lazy-loaded content
  await warmupPage(page);

  return page;
}

/**
 * Attempt to dismiss common cookie consent banners and privacy overlays.
 * Uses multi-selector approach with graceful fallbacks.
 * @param {Page} page - Playwright page instance
 */
export async function dismissCookieBanners(page) {
  // Specific CMP selectors (high confidence, click without validation)
  const SPECIFIC_SELECTORS = [
    // Consent Manager (consentmanager.net) - common in Europe
    '.cmpboxbtnyes',
    '.cmpboxbtn:has-text("Accept")',
    '#cmpwrapper a[role="button"]:has-text("Accept")',

    // OneTrust (most common)
    '#onetrust-accept-btn-handler', // Accept all button

    // CookieBot
    '#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll',
    '.CybotCookiebotDialogBodyButton',

    // Specific class/ID patterns (scoped to cookie/consent)
    '[id*="cookie-accept"]',
    '[class*="cookie-accept"]',
    '[class*="consent-accept"]',
    '[aria-label*="Accept cookies"]',
    '[aria-label*="Close cookie"]',
    '.cookie-banner button[aria-label*="Close"]',
  ];

  // Generic selectors scoped to consent containers
  const SCOPED_GENERIC_SELECTORS = [
    '[id*="cookie"] button:has-text("Accept")',
    '[id*="cookie"] button:has-text("OK")',
    '[id*="cookie"] button:has-text("Continue")',
    '[id*="consent"] button:has-text("Accept")',
    '[id*="consent"] button:has-text("OK")',
    '[id*="consent"] button:has-text("I Agree")',
    '[class*="cookie"] button:has-text("Accept")',
    '[class*="cookie"] button:has-text("Accept All")',
    '[class*="cookie"] button:has-text("Allow All")',
    '[class*="consent"] button:has-text("Accept")',
    '[class*="consent"] button:has-text("Accept All")',
    '[id*="cookie"] a[role="button"]:has-text("Accept")',
    '[id*="consent"] a[role="button"]:has-text("Allow")',
    // Scoped aria-label selectors
    '[id*="cookie"] [aria-label*="Accept all"]',
    '[id*="consent"] [aria-label*="Accept all"]',
    '[class*="cookie"] [aria-label*="Accept all"]',
    '[class*="consent"] [aria-label*="Accept all"]',
  ];

  const ALL_SELECTORS = [...SPECIFIC_SELECTORS, ...SCOPED_GENERIC_SELECTORS];
  const QUICK_CHECK_TIMEOUT = 100; // 100ms for quick existence check
  const CLICK_TIMEOUT = 1000;
  const CLICK_DELAY = 500; // Wait 500ms after click for animation

  // Quick pass: find which selectors actually match (avoids long timeouts)
  const matchedSelectors = [];
  for (const selector of ALL_SELECTORS) {
    try {
      const button = page.locator(selector).first();
      const isVisible = await button.isVisible({ timeout: QUICK_CHECK_TIMEOUT }).catch(() => false);
      if (isVisible) {
        matchedSelectors.push(selector);
      }
    } catch (err) {
      continue;
    }
  }

  // If no matches found, try a Playwright-native text-based fallback.
  // This handles CMPs that render late (e.g. Transcend airgap.js) or use
  // closed Shadow DOM that blocks standard querySelector.
  if (matchedSelectors.length === 0) {
    const acceptLabels = ['Accept all', 'Accept All', 'Accept cookies', 'Allow all', 'I accept', 'OK'];
    let fallbackClicked = false;
    // Give the first candidate a longer wait (3s) for slow-initializing CMPs;
    // subsequent candidates get a quick check only (300ms).
    let firstCandidate = true;
    for (const label of acceptLabels) {
      const waitMs = firstCandidate ? 3000 : 300;
      firstCandidate = false;
      try {
        const btn = page.getByRole('button', { name: label, exact: true });
        const visible = await btn.isVisible({ timeout: waitMs }).catch(() => false);
        if (visible) {
          log.debug(`Dismissing cookie banner (text fallback): "${label}"`);
          await btn.click({ timeout: CLICK_TIMEOUT });
          await page.waitForTimeout(CLICK_DELAY);
          fallbackClicked = true;
          break;
        }
      } catch (_) {
        continue;
      }
    }
    if (!fallbackClicked) {
      log.debug('No cookie banner detected');
    }
    return;
  }

  // Try clicking matched selectors with URL validation
  const originalUrl = page.url();

  for (const selector of matchedSelectors) {
    try {
      const button = page.locator(selector).first();
      log.debug(`Dismissing cookie banner: ${selector}`);
      await button.click({ timeout: CLICK_TIMEOUT });
      await page.waitForTimeout(CLICK_DELAY);

      // Verify click didn't navigate away (safety check)
      // Only treat as navigation if origin or pathname changed (ignore hash/query changes)
      const currentUrl = new URL(page.url());
      const original = new URL(originalUrl);
      const navigationOccurred = currentUrl.origin !== original.origin ||
                                  currentUrl.pathname !== original.pathname;

      if (navigationOccurred) {
        log.minor(`Click caused navigation: ${originalUrl} -> ${currentUrl.href}`);
        log.minor('Recovering by navigating back to original URL');

        try {
          await page.goto(originalUrl, { waitUntil: 'load', timeout: 10000 });
          log.debug('Successfully recovered original page state');

          // Recursively retry dismissal on the recovered page (with depth limit to prevent infinite loops)
          // Note: We don't warmupPage() here because newPage() will handle it after dismissal completes
          const maxRecoveryAttempts = 1;
          if (!page._dismissalRecoveryDepth) page._dismissalRecoveryDepth = 0;
          if (page._dismissalRecoveryDepth < maxRecoveryAttempts) {
            page._dismissalRecoveryDepth++;
            await dismissCookieBanners(page);
          }
        } catch (err) {
          log.major(`Failed to recover original URL: ${err.message}`);
          log.minor('Continuing with current page state despite recovery failure');
          // Don't throw - cookie dismissal is not critical, continue with current page
        }

        return; // Exit after recovery
      }

      // Verify dismissal worked (button should be gone)
      const stillVisible = await button.isVisible({ timeout: 500 }).catch(() => false);
      if (!stillVisible) {
        log.debug('Cookie banner dismissed successfully');
        return; // Success, exit early
      }
    } catch (err) {
      // Click failed, try next one
      continue;
    }
  }

  // Fallback: try Escape key
  try {
    await page.keyboard.press('Escape');
    await page.waitForTimeout(CLICK_DELAY);
    log.debug('Attempted cookie banner dismissal via Escape key');
  } catch (err) {
    // Ignore errors
  }

  // If we got here, no cookie banner was detected or all dismissals failed
  log.debug('No cookie banner detected or dismissal not needed');
}
