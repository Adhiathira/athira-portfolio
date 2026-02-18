import { chromium } from 'playwright';

/**
 * Launch a Playwright browser instance.
 * Reads HEADLESS and TIMEOUT from environment variables (via dotenv).
 * @returns {Promise<Browser>}
 */
export async function launchBrowser() {
  const headless = process.env.HEADLESS !== 'false';
  return chromium.launch({ headless });
}

/**
 * Open a new page in the given browser, navigate to url, and wait for network idle.
 * @param {Browser} browser
 * @param {string} url
 * @returns {Promise<Page>}
 */
export async function newPage(browser, url) {
  const timeout = parseInt(process.env.TIMEOUT ?? '30000', 10);
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout });

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
  await page.waitForLoadState('networkidle').catch(() => {});

  return page;
}
