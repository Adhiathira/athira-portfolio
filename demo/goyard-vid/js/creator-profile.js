/* =============================================================================
   creator-profile.js — Creator Profile Page Logic
   Task 259: [goyard-vid][12/12] Public Creator Profile Page

   Responsibilities:
   1. Scroll-depth CTA trigger — same pattern as explore.js (checkScrollDepth)
      Fires when portfolio grid midpoint crosses viewport bottom.
   2. Auth state: if window.__auth exists (set by nav.js), show Follow button
      immediately; otherwise show timed "Make your own" CTA.
   ============================================================================= */

(function () {
  'use strict';

  var portfolioGrid  = document.querySelector('.gallery-grid');  /* the 3-col portfolio grid */
  var persistentCTA  = document.getElementById('creator-persistent-cta');
  var ctaSignup      = document.getElementById('creator-cta-signup');
  var ctaFollow      = document.getElementById('creator-cta-follow');

  if (!persistentCTA) {
    console.warn('[creator-profile.js] Persistent CTA element not found — aborting init');
    return;
  }

  /* --------------------------------------------------------------------------
     Auth state: nav.js sets window.__auth before this script runs.
     Logged-in: show Follow button immediately (no scroll trigger needed).
     Logged-out: show "Make your own" on scroll depth.
     -------------------------------------------------------------------------- */

  if (window.__auth) {
    /* Logged-in visitor: reveal CTA immediately with Follow button */
    if (ctaSignup) ctaSignup.hidden = true;
    if (ctaFollow) ctaFollow.hidden = false;
    persistentCTA.removeAttribute('hidden');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        persistentCTA.classList.add('is-visible');
      });
    });
  } else {
    /* Logged-out visitor: scroll-depth trigger for "Make your own" */
    var ctaShown = false;

    function checkScrollDepth() {
      if (ctaShown) return;
      if (!portfolioGrid) return;
      var rect = portfolioGrid.getBoundingClientRect();
      var gridMidpoint = rect.top + rect.height * 0.5;
      if (gridMidpoint <= window.innerHeight) {
        ctaShown = true;
        window.removeEventListener('scroll', checkScrollDepth, { passive: true });
        persistentCTA.removeAttribute('hidden');
        /* Double rAF: removeAttribute('hidden') sets display:flex; two frames
           ensure a layout pass before .is-visible fires the CSS transition. */
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            persistentCTA.classList.add('is-visible');
          });
        });
      }
    }

    window.addEventListener('scroll', checkScrollDepth, { passive: true });
    /* Run once on load in case page is already scrolled (browser restore) */
    checkScrollDepth();
  }

  /* --------------------------------------------------------------------------
     GSAP entrance animation — same timing as explore.js (motion.json values)
     duration: 0.5s, ease: power2.out, stagger: 0.08s, y offset: 40px
     -------------------------------------------------------------------------- */

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('[creator-profile.js] GSAP not available — skipping entrance animation');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.portfolio-card', {
    scrollTrigger: {
      trigger: '.gallery-grid',
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
