/**
 * prose-weight — Reading Progress Bar
 * Fills a wine-red 2px bar as the user scrolls the page.
 * Pure JS scroll event — no GSAP needed.
 */

(function () {
  'use strict';

  function initReadingProgress() {
    const bar = document.querySelector('.reading-progress-bar');
    if (!bar) return;

    function updateProgress() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        bar.style.width = '0%';
        return;
      }
      const pct = Math.min((scrollTop / docHeight) * 100, 100);
      bar.style.width = pct + '%';
    }

    // Set immediately on load
    updateProgress();

    // Passive listener for performance
    window.addEventListener('scroll', updateProgress, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReadingProgress);
  } else {
    initReadingProgress();
  }
})();
