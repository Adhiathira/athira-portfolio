import { createLogger } from '../lib/logger.js';
import { cinematicScroll, settleAtTop } from '../lib/scroll.js';

export const metadata = { tag: 'scroll-video', recordVideo: true };

const log = createLogger('scroll-video');

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

  return { recorded: true, recordedAt: new Date().toISOString() };
}
