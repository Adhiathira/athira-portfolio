/**
 * gallery.js
 * Gallery hover previews, skeleton state management, and filter stub.
 *
 * From goal.md > Factor 5 — Trust Requirements:
 *   "A full-width creator showcase appears in the second major section —
 *    after the hero establishes the value proposition, but before any signup CTA."
 *
 * From goal.md > Factor 14 — Performance Expectations:
 *   "Skeleton states hold layout while content loads progressively."
 *   "Videos play on hover (desktop), not on load."
 *
 * From blueprint.md > Section 2 — Scroll Logic > Explore > Section 3:
 *   "Creator hover states reveal names, community points, and profile access."
 *
 * Full implementation scheduled for task [kinetic-vid][5/12].
 */

(function () {
  'use strict';

  // ================================================================
  // Hover state — .gallery-item gets .is-hovered class on mouseenter
  // CSS handles the visual transform via .gallery-item.is-hovered in components.css
  // ================================================================

  function initHoverStates() {
    const items = document.querySelectorAll('.gallery-item');

    if (!items.length) {
      console.debug('[gallery] No .gallery-item elements found — hover states skipped.');
      return;
    }

    items.forEach(function (item) {
      item.addEventListener('mouseenter', function () {
        item.classList.add('is-hovered');
        console.debug('[gallery] hover enter:', item.dataset.id || item.className);
      });

      item.addEventListener('mouseleave', function () {
        item.classList.remove('is-hovered');
        console.debug('[gallery] hover leave:', item.dataset.id || item.className);
      });
    });

    console.debug('[gallery] hover states initialised for', items.length, 'items.');
  }

  // ================================================================
  // Skeleton removal — remove .skeleton class when image loads.
  // From goal.md Factor 14: "Skeleton states hold layout while
  // content loads progressively."
  // ================================================================

  function initSkeletonRemoval() {
    const images = document.querySelectorAll('.gallery-item img');

    if (!images.length) {
      console.debug('[gallery] No .gallery-item img elements found — skeleton removal skipped.');
      return;
    }

    images.forEach(function (img) {
      const skeletonEl = img.closest('.skeleton');
      if (!skeletonEl) return;

      if (img.complete && img.naturalWidth > 0) {
        // Image already cached — remove skeleton immediately
        skeletonEl.classList.remove('skeleton');
        console.debug('[gallery] skeleton removed (cached):', img.src || img.dataset.src);
      } else {
        img.addEventListener('load', function () {
          skeletonEl.classList.remove('skeleton');
          console.debug('[gallery] skeleton removed (loaded):', img.src || img.dataset.src);
        });

        img.addEventListener('error', function () {
          console.debug('[gallery] image failed to load — skeleton preserved:', img.src || img.dataset.src);
          // Leave skeleton in place — broken image would show nothing; skeleton is better.
        });
      }
    });

    console.debug('[gallery] skeleton removal initialised for', images.length, 'images.');
  }

  // ================================================================
  // Filter stub — full implementation in task [kinetic-vid][5/12]
  // From goal.md Factor 10: filter by "Video / Animation / Film"
  // ================================================================

  /**
   * filterGallery — stub for gallery filtering by media type tag.
   * @param {string} tag — e.g. "video", "animation", "film", or null for all
   */
  function filterGallery(tag) {
    console.info('[gallery] filter:', tag || 'all');
    // Full implementation in task [kinetic-vid][5/12].
    // Will filter .gallery-item elements by [data-tag] attribute.
  }

  // ================================================================
  // Filter button wiring — attach to .gallery-filter elements if present
  // ================================================================

  function initFilterButtons() {
    const filterBtns = document.querySelectorAll('[data-filter]');

    if (!filterBtns.length) {
      console.debug('[gallery] No [data-filter] buttons found — filter wiring skipped.');
      return;
    }

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const tag = btn.dataset.filter || null;

        // Update active state
        filterBtns.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');

        filterGallery(tag);
      });
    });

    console.debug('[gallery] filter buttons wired:', filterBtns.length);
  }

  // ================================================================
  // Init
  // ================================================================

  function init() {
    initHoverStates();
    initSkeletonRemoval();
    initFilterButtons();
    console.info('[gallery] initialised.');
  }

  // Expose filterGallery for external use (future task [kinetic-vid][5/12])
  window.filterGallery = filterGallery;

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
