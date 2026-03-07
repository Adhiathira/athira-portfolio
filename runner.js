import 'dotenv/config';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import { launchBrowser, newPage, warmupPage, dismissCookieBanners } from './lib/browser.js';
import { write } from './lib/writer.js';
import { createLogger } from './lib/logger.js';
import { createProgress } from './lib/progress.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const log = createLogger('runner');

async function run() {
  // Optional: --only <slug> to run a single extractor (useful during development)
  const onlyIdx = process.argv.indexOf('--only');
  if (onlyIdx !== -1 && (!process.argv[onlyIdx + 1] || process.argv[onlyIdx + 1].startsWith('-'))) {
    log.major('Usage: node runner.js --only <slug>');
    process.exitCode = 1;
    return;
  }
  const onlySlug = onlyIdx !== -1 ? process.argv[onlyIdx + 1] : null;

  const sitesPath = path.join(__dirname, 'sites.json');
  const sites = JSON.parse(fs.readFileSync(sitesPath, 'utf8'));

  if (!sites.queue || sites.queue.length === 0) {
    log.info('Queue is empty. Nothing to process.');
    return;
  }

  const site = sites.queue[0];
  log.info(`Processing: ${site.name} (${site.url})`);

  let registry = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'registry.json'), 'utf8')
  );
  if (onlySlug) {
    registry = registry.filter(e => e.slug === onlySlug);
    if (registry.length === 0) {
      log.major(`No extractor found for slug: ${onlySlug}`);
      process.exitCode = 1;
      return;
    }
  }

  const browser = await launchBrowser();
  const siteBar = createProgress('sites', { total: 1 });
  siteBar.start();

  const extBar = createProgress('extractors', { total: registry.length, parent: site.name });
  extBar.start();

  try {
    for (const entry of registry) {
      const { slug } = entry;

      const extractorPath = new URL(`./extractors/${slug}.js`, import.meta.url);
      const extractor = await import(extractorPath);

      const outputDir = path.join('design-system', site.name, slug);
      const screenshotsDir = path.join('design-system', site.name, 'screenshots');

      if (extractor.metadata?.recordVideo) {
        // Recording extractor: create a single context with recordVideo so only
        // one browser window opens. The extractor gets this page directly.
        const videoContext = await browser.newContext({
          recordVideo: { dir: os.tmpdir(), size: { width: 1280, height: 720 } },
          viewport: null,
        });
        let videoPage;
        try {
          videoPage = await videoContext.newPage();
          await videoPage.goto(site.url, { waitUntil: 'load', timeout: parseInt(process.env.TIMEOUT ?? '30000', 10) });
          await dismissCookieBanners(videoPage);
          await warmupPage(videoPage);

          const data = await extractor.extract(videoPage, { outputDir, screenshotsDir });
          await write(site.name, slug, data);

          // Close page first — Playwright finalizes the .webm on close
          await videoPage.close();
          const tmpVideoPath = await videoPage.video().path();
          const videoOutDir = path.join('extraction-assets', site.name);
          fs.mkdirSync(videoOutDir, { recursive: true });
          fs.renameSync(tmpVideoPath, path.join(videoOutDir, 'scroll-recording.webm'));
        } finally {
          if (videoPage && !videoPage.isClosed()) await videoPage.close().catch(() => {});
          await videoContext.close().catch(() => {});
        }
      } else {
        // Normal extractor: standard single page lifecycle
        let page;
        try {
          page = await newPage(browser, site.url);
          const data = await extractor.extract(page, { outputDir, screenshotsDir });
          await write(site.name, slug, data);
        } finally {
          if (page) await page.close();
        }
      }

      extBar.tick(slug);
    }
    extBar.done();
  } finally {
    await browser.close();
  }

  siteBar.tick(site.name);
  siteBar.done();

  // Only mutate the queue when running the full registry — partial runs shouldn't consume the entry
  if (!onlySlug) {
    sites.queue.shift();
    sites.done = sites.done ?? [];
    sites.done.push({ ...site, processedAt: new Date().toISOString() });
    fs.writeFileSync(sitesPath, JSON.stringify(sites, null, 2), 'utf8');
    log.info(`Moved "${site.name}" to done`);
  } else {
    log.info('Done (--only mode: queue not mutated)');
  }
}

run().catch((err) => {
  log.critical('Runner failed', err);
  process.exitCode = 1;
});
