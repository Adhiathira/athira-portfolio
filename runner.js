import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { launchBrowser, newPage } from './lib/browser.js';
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

      // Wrap entire page lifecycle in try/finally to prevent leaks
      let page;
      try {
        // newPage() now handles cookie dismissal before warmup scroll
        page = await newPage(browser, site.url);

        const outputDir = path.join('design-system', site.name, slug);
        const screenshotsDir = path.join('design-system', site.name, 'screenshots');
        const data = await extractor.extract(page, { outputDir, screenshotsDir });
        await write(site.name, slug, data);
        extBar.tick(slug);
      } finally {
        if (page) await page.close();
      }
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
