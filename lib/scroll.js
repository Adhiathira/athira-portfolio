export async function cinematicScroll(page) {
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
}

export async function settleAtTop(page) {
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
  await page.waitForTimeout(3000);
}

export async function scrollBackToTop(page) {
  await page.evaluate(async () => {
    await new Promise(resolve => {
      const distance = 80;
      const delay = 30;
      let lastY = window.scrollY;
      const timer = setInterval(() => {
        window.scrollBy(0, -distance);
        const currentY = window.scrollY;
        if (currentY <= 0) {
          clearInterval(timer);
          resolve();
          return;
        }
        if (Math.abs(currentY - lastY) < 1) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
          return;
        }
        lastY = currentY;
      }, delay);
    });
  });
}

export async function shortCinematicScroll(page, maxSteps) {
  await page.evaluate(async (MAX_STEPS) => {
    await new Promise(resolve => {
      const distance = 20;
      const delay = 60;
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
  }, maxSteps);
}
