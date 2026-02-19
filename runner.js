import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { launchBrowser, newPage } from './lib/browser.js';
import { write } from './lib/writer.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function run() {
  // Optional: --only <slug> to run a single extractor (useful during development)
  const onlyIdx = process.argv.indexOf('--only');
  if (onlyIdx !== -1 && (!process.argv[onlyIdx + 1] || process.argv[onlyIdx + 1].startsWith('-'))) {
    console.error('Usage: node runner.js --only <slug>');
    process.exit(1);
  }
  const onlySlug = onlyIdx !== -1 ? process.argv[onlyIdx + 1] : null;

  const sitesPath = path.join(__dirname, 'sites.json');
  const sites = JSON.parse(fs.readFileSync(sitesPath, 'utf8'));

  if (!sites.queue || sites.queue.length === 0) {
    console.log('Queue is empty. Nothing to process.');
    return;
  }

  const site = sites.queue[0];
  console.log(`\nProcessing: ${site.name} (${site.url})`);

  let registry = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'registry.json'), 'utf8')
  );
  if (onlySlug) {
    registry = registry.filter(e => e.slug === onlySlug);
    if (registry.length === 0) {
      console.error(`No extractor found for slug: ${onlySlug}`);
      process.exit(1);
    }
  }

  const browser = await launchBrowser();

  try {
    for (const entry of registry) {
      const { slug } = entry;
      console.log(`  [${slug}] extracting...`);

      const extractorPath = new URL(`./extractors/${slug}.js`, import.meta.url);
      const extractor = await import(extractorPath);

      const page = await newPage(browser, site.url);
      try {
        const outputDir = path.join('design-system', site.name, slug);
        const screenshotsDir = path.join('design-system', site.name, 'screenshots');
        const data = await extractor.extract(page, { outputDir, screenshotsDir });
        await write(site.name, slug, data);
        console.log(`  [${slug}] done`);
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }

  // Only mutate the queue when running the full registry — partial runs shouldn't consume the entry
  if (!onlySlug) {
    sites.queue.shift();
    sites.done = sites.done ?? [];
    sites.done.push({ ...site, processedAt: new Date().toISOString() });
    fs.writeFileSync(sitesPath, JSON.stringify(sites, null, 2), 'utf8');
    console.log(`\nDone. Moved "${site.name}" to done.`);
  } else {
    console.log(`\nDone. (--only mode: queue not mutated)`);
  }
}

run().catch((err) => {
  console.error('Runner failed:', err);
  process.exit(1);
});
