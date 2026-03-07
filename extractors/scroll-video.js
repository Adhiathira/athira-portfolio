import { createLogger } from '../lib/logger.js';

export const metadata = { tag: 'scroll-video', recordVideo: true };

const log = createLogger('scroll-video');

export async function extract(page) {
  // The recording context is created by runner.js — this page is already being
  // recorded. Just scroll cinematically and return. Runner.js handles saving
  // the .webm after the page is closed.

  // Settle at top before the cinematic pass
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(2000);

  log.debug('Starting cinematic scroll');

  // Cinematic scroll: 20px every 60ms, stops when page stops moving
  await page.evaluate(async () => {
    await new Promise(resolve => {
      const distance = 20;
      const delay = 60;
      const MAX_STEPS = 800;
      let steps = 0;
      let noMovement = 0;
      let lastY = window.scrollY;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        steps++;
        const currentY = window.scrollY;
        if (Math.abs(currentY - lastY) < 1) {
          noMovement++;
        } else {
          noMovement = 0;
        }
        lastY = currentY;
        if (noMovement >= 3 || steps >= MAX_STEPS) {
          clearInterval(timer);
          resolve();
        }
      }, delay);
    });
  });

  await page.waitForTimeout(500);
  log.debug('Cinematic scroll complete');

  return { recorded: true, recordedAt: new Date().toISOString() };
}
