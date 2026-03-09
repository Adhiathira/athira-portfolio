import 'dotenv/config';
import fs from 'fs';
import os from 'os';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';
import { launchBrowser, newPage, warmupPage, dismissCookieBanners } from './lib/browser.js';
import { write } from './lib/writer.js';
import { createLogger } from './lib/logger.js';
import { createProgress } from './lib/progress.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const log = createLogger('runner');

function ask(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(question, answer => { rl.close(); resolve(answer.trim()); }));
}

const _retriesParsed = parseInt(process.env.EXTRACTOR_RETRIES ?? '2', 10);
const MAX_RETRIES = Math.max(0, isNaN(_retriesParsed) ? 2 : _retriesParsed);

async function runExtractor(browser, extractor, site, outputDir, screenshotsDir) {
  let lastError;
  for (let attempt = 1; attempt <= MAX_RETRIES + 1; attempt++) {
    if (attempt > 1) log.info(`Retrying (attempt ${attempt}/${MAX_RETRIES + 1})...`);

    if (extractor.metadata?.recordVideo) {
      let videoContext;
      let videoPage;
      try {
        videoContext = await browser.newContext({
          recordVideo: { dir: os.tmpdir(), size: { width: 1280, height: 720 } },
          viewport: null,
        });
        videoPage = await videoContext.newPage();
        await videoPage.goto(site.url, { waitUntil: 'load', timeout: parseInt(process.env.TIMEOUT ?? '30000', 10) });
        await dismissCookieBanners(videoPage);
        await warmupPage(videoPage);

        const data = await extractor.extract(videoPage, { outputDir, screenshotsDir });
        await write(site.name, extractor.slug ?? path.basename(outputDir), data);

        await videoPage.close();
        const tmpVideoPath = await videoPage.video().path();
        const videoOutDir = path.join('extraction-assets', site.name);
        fs.mkdirSync(videoOutDir, { recursive: true });
        fs.renameSync(tmpVideoPath, path.join(videoOutDir, 'scroll-recording.webm'));
        return; // success
      } catch (err) {
        lastError = err;
        log.info(`Extractor failed: ${err.message}`);
      } finally {
        if (videoPage && !videoPage.isClosed()) await videoPage.close().catch(() => {});
        if (videoContext) await videoContext.close().catch(() => {});
      }
    } else {
      let page;
      try {
        page = await newPage(browser, site.url);
        const data = await extractor.extract(page, { outputDir, screenshotsDir });
        await write(site.name, path.basename(outputDir), data);
        return; // success
      } catch (err) {
        lastError = err;
        log.info(`Extractor failed: ${err.message}`);
      } finally {
        if (page) await page.close().catch(() => {});
      }
    }
  }
  throw lastError;
}

async function processSite(site, registry, sitesPath) {
  log.info(`Processing: ${site.name} (${site.url})`);

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

      await runExtractor(browser, extractor, site, outputDir, screenshotsDir);
      extBar.tick(slug);
    }
    extBar.done();
  } finally {
    await browser.close();
  }

  siteBar.tick(site.name);
  siteBar.done();

  // Mutate the queue: shift processed site to done
  const sites = JSON.parse(fs.readFileSync(sitesPath, 'utf8'));
  sites.queue.shift();
  sites.done = sites.done ?? [];
  sites.done.push({ ...site, processedAt: new Date().toISOString() });
  fs.writeFileSync(sitesPath, JSON.stringify(sites, null, 2), 'utf8');
  log.info(`Moved "${site.name}" to done`);
}

async function run() {
  // Parse flags
  const args = process.argv.slice(2);
  const onlyIdx = args.indexOf('--only');
  if (onlyIdx !== -1 && (!args[onlyIdx + 1] || args[onlyIdx + 1].startsWith('-'))) {
    log.major('Usage: node runner.js --only <slug>');
    process.exitCode = 1;
    return;
  }
  const onlySlug = onlyIdx !== -1 ? args[onlyIdx + 1] : null;
  const runAll = args.includes('--all');
  const onlyOne = args.includes('--only-one');
  const askPermission = args.includes('--ask-permission');

  if (onlySlug && (runAll || askPermission)) {
    log.major('--only <slug> cannot be combined with --all or --ask-permission (queue would be permanently consumed after partial extraction)');
    process.exitCode = 1;
    return;
  }

  const sitesPath = path.join(__dirname, 'sites.json');
  const sites = JSON.parse(fs.readFileSync(sitesPath, 'utf8'));

  if (!sites.queue || sites.queue.length === 0) {
    log.info('Queue is empty. Nothing to process.');
    return;
  }

  let registry = JSON.parse(fs.readFileSync(path.join(__dirname, 'registry.json'), 'utf8'));
  if (onlySlug) {
    registry = registry.filter(e => e.slug === onlySlug);
    if (registry.length === 0) {
      log.major(`No extractor found for slug: ${onlySlug}`);
      process.exitCode = 1;
      return;
    }
  }

  // --only-one or default (no multi-site flag): process first site only
  if (onlyOne || (!runAll && !askPermission)) {
    const site = sites.queue[0];
    await processSite(site, registry, sitesPath);
    if (onlySlug) {
      // Undo the queue mutation from processSite — partial runs shouldn't consume the entry
      const updated = JSON.parse(fs.readFileSync(sitesPath, 'utf8'));
      updated.done.pop();
      updated.queue.unshift(site);
      fs.writeFileSync(sitesPath, JSON.stringify(updated, null, 2), 'utf8');
      log.info('Done (--only mode: queue not mutated)');
    }
    return;
  }

  // --all: process every site without pausing
  if (runAll) {
    const total = sites.queue.length;
    log.info(`Processing all ${total} site(s) in queue...`);
    for (let i = 0; i < total; i++) {
      const current = JSON.parse(fs.readFileSync(sitesPath, 'utf8'));
      if (!current.queue.length) break;
      await processSite(current.queue[0], registry, sitesPath);
    }
    return;
  }

  // --ask-permission: prompt after each site, with option to switch to --all
  if (askPermission) {
    let autoApprove = false;
    let remaining = sites.queue.length;

    for (let i = 0; i < remaining; i++) {
      const current = JSON.parse(fs.readFileSync(sitesPath, 'utf8'));
      if (!current.queue.length) break;

      const site = current.queue[0];
      const queueLen = current.queue.length;

      await processSite(site, registry, sitesPath);

      if (autoApprove) continue;

      const next = JSON.parse(fs.readFileSync(sitesPath, 'utf8'));
      if (!next.queue.length) break;

      const nextSite = next.queue[0];
      process.stdout.write('\n');
      const answer = await ask(
        `  Next: "${nextSite.name}" (${next.queue.length} remaining)\n` +
        `  [y] Continue  [a] Continue all  [n] Stop\n` +
        `  > `
      );

      const normalizedAnswer = answer.toLowerCase();
      if (normalizedAnswer === 'a') {
        autoApprove = true;
        log.info('Auto-approving remaining sites...');
      } else if (normalizedAnswer !== 'y') {
        log.info('Stopped by user.');
        break;
      }
    }
  }
}

run().catch((err) => {
  log.critical('Runner failed', err);
  process.exitCode = 1;
});
