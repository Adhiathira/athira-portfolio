/* =============================================================================
   explore.js — Explore Page Logic
   Task 255: [goyard-vid][8/12] Explore Page — Filterable Creator Gallery

   Responsibilities:
   1. Filter logic — show/hide cards by media type; show coming-soon for
      types without live content (Animation, Film).
      Pattern is identical to gallery.js; scoped to #explore-filter-bar
      and #explore-gallery to avoid collisions with homepage gallery.

   2. Persistent CTA scroll trigger — IntersectionObserver fires when
      50% of #explore-gallery is visible in the viewport. At that depth
      the visitor has seen significant content and is primed for conversion.
      Once shown, the CTA stays visible (observer.disconnect()).

   3. GSAP ScrollTrigger staggered entrance — same timing as gallery.js
      (motion.json dominant values: 0.5s duration, "ease", 80ms stagger)
      Scoped to #explore-gallery to avoid double-animating homepage cards.
   ============================================================================= */

(function () {
  'use strict';

  /* ---------------------------------------------------------------------------
     DOM references
     --------------------------------------------------------------------------- */

  var filterBar      = document.getElementById('explore-filter-bar');
  var exploreGallery = document.getElementById('explore-gallery');
  var comingSoon     = document.querySelector('.gallery-coming-soon');
  var persistentCTA  = document.getElementById('explore-persistent-cta');
  var cards          = document.querySelectorAll('.creator-card');

  if (!filterBar || !exploreGallery) {
    console.warn('[explore.js] Required DOM elements not found — aborting init');
    return;
  }

  /* ---------------------------------------------------------------------------
     Filter Logic
     Identical pattern to gallery.js. LIVE_TYPES: only 'all' and 'video'
     have cards; Animation and Film show coming-soon state.
     --------------------------------------------------------------------------- */

  var LIVE_TYPES = ['all', 'video'];

  filterBar.addEventListener('click', function (e) {
    var btn = e.target.closest('.filter-btn');
    if (!btn) return;

    var filter = btn.dataset.filter;

    // Update active button state
    filterBar.querySelectorAll('.filter-btn').forEach(function (b) {
      b.classList.remove('active');
    });
    btn.classList.add('active');

    // Coming Soon types: hide grid, show message
    if (!LIVE_TYPES.includes(filter)) {
      exploreGallery.hidden = true;
      comingSoon.hidden = false;
      return;
    }

    // Live types: show grid, hide coming soon
    exploreGallery.hidden = false;
    comingSoon.hidden = true;

    // Filter individual cards by data-media-type
    cards.forEach(function (card) {
      var type    = card.dataset.mediaType;
      var visible = filter === 'all' || type === filter;
      card.hidden = !visible;
    });
  });

  /* ---------------------------------------------------------------------------
     Persistent CTA — IntersectionObserver scroll trigger

     threshold: 0.5 fires when 50% of the gallery element is visible in the
     viewport. For a 5×3 grid (15 cards), this corresponds to the visitor
     having scrolled through roughly 7–8 cards — enough engagement to
     warrant the "Make your own" conversion prompt.

     Double rAF pattern: removeAttribute('hidden') sets display:flex, then
     the two nested requestAnimationFrame calls ensure the browser has
     completed one layout pass before adding .is-visible, allowing the
     CSS opacity + translateY transition to fire correctly.
     --------------------------------------------------------------------------- */

  if (persistentCTA) {
    var ctaShown = false;

    // Use scroll-based midpoint logic rather than IntersectionObserver threshold.
    // threshold: 0.5 on a tall element measures visible area fraction, not scroll depth —
    // for a 5-row gallery (~1500px), 50% area visible is geometrically unlikely to
    // trigger. Instead: fire when the gallery's midpoint crosses the viewport bottom,
    // i.e. the visitor has scrolled far enough to reveal the first half of the gallery.
    function checkScrollDepth() {
      if (ctaShown) return;
      // Gallery is display:none when a coming-soon filter is active.
      // getBoundingClientRect() returns all-zeros for display:none elements,
      // which would make galleryMidpoint === 0 and fire the CTA immediately.
      if (exploreGallery.hidden) return;
      var rect = exploreGallery.getBoundingClientRect();
      var galleryMidpoint = rect.top + rect.height * 0.5;
      if (galleryMidpoint <= window.innerHeight) {
        ctaShown = true;
        window.removeEventListener('scroll', checkScrollDepth, { passive: true });
        persistentCTA.removeAttribute('hidden');
        // Double rAF: removeAttribute('hidden') sets display:flex; two frames
        // ensure a layout pass before .is-visible fires the CSS transition.
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            persistentCTA.classList.add('is-visible');
          });
        });
      }
    }

    window.addEventListener('scroll', checkScrollDepth, { passive: true });
    // Run once on load in case the page is already scrolled (e.g. browser restore)
    checkScrollDepth();
  }

  /* ---------------------------------------------------------------------------
     GSAP ScrollTrigger — Staggered Entrance Animation

     Timing decisions from motion.json analysis (same as gallery.js):
     - duration: 0.5s  → dominant transitionElement duration
     - ease: "power2.out" → GSAP equivalent of CSS "ease"
     - stagger: 0.08s  → cascading waterfall per concept_by_video.md
     - y offset: 40px  → fade-in + translate-up pattern

     Scoped to '#explore-gallery .creator-card' to prevent collision
     with homepage gallery if both pages are somehow loaded simultaneously.
     --------------------------------------------------------------------------- */

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('[explore.js] GSAP or ScrollTrigger not available — skipping entrance animation');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  gsap.from('#explore-gallery .creator-card', {
    scrollTrigger: {
      trigger: '#explore-gallery',
      start: 'top 80%', /* fire when section top crosses 80% of viewport */
      once: true,       /* animation runs once; ScrollTrigger is then killed */
    },
    opacity: 0,
    y: 40,
    duration: 0.5,   /* motion.json dominant transitionElement duration */
    ease: 'power2.out',
    stagger: 0.08,   /* 80ms between cards — cascading waterfall effect */
  });

}());
