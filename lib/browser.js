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
  return page;
}
