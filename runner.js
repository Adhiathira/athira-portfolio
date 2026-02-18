import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { launchBrowser, newPage } from './lib/browser.js';
import { write } from './lib/writer.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function run() {
  const sitesPath = path.join(__dirname, 'sites.json');
  const sites = JSON.parse(fs.readFileSync(sitesPath, 'utf8'));

  if (!sites.queue || sites.queue.length === 0) {
    console.log('Queue is empty. Nothing to process.');
    return;
  }

  const site = sites.queue[0];
  console.log(`\nProcessing: ${site.name} (${site.url})`);

  const registry = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'registry.json'), 'utf8')
  );

  const browser = await launchBrowser();

  try {
    for (const entry of registry) {
      const { slug } = entry;
      console.log(`  [${slug}] extracting...`);

      const extractorPath = new URL(`./extractors/${slug}.js`, import.meta.url);
      const extractor = await import(extractorPath);

      const page = await newPage(browser, site.url);
      try {
        const data = await extractor.extract(page);
        await write(site.name, slug, data);
        console.log(`  [${slug}] done`);
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }

  // Move site from queue → done
  sites.queue.shift();
  sites.done = sites.done ?? [];
  sites.done.push({ ...site, processedAt: new Date().toISOString() });
  fs.writeFileSync(sitesPath, JSON.stringify(sites, null, 2), 'utf8');

  console.log(`\nDone. Moved "${site.name}" to done.`);
}

run().catch((err) => {
  console.error('Runner failed:', err);
  process.exit(1);
});
