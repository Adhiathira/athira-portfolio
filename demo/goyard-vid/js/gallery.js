/* =============================================================================
   gallery.js — Creator Gallery Section
   Task 252: [goyard-vid][5/12] Home — Creator Gallery Section

   Responsibilities:
   1. Filter logic — show/hide cards by media type; show coming-soon for
      types without live content (Animation, Film)
   2. GSAP ScrollTrigger staggered entrance animation — cascading waterfall
      effect as documented in concept_by_video.md

   Motion source: motion.json
   - Dominant transition duration across all transitionElements: 0.5s
   - Dominant timing function: "ease"
   - No dedicated staggerDelay token found; 0.08s stagger derived from
     concept_by_video.md pattern ("adjacent items animate in slightly afterward")
   ============================================================================= */

(function () {
  'use strict';

  /* ---------------------------------------------------------------------------
     DOM references
     --------------------------------------------------------------------------- */

  var filterBar   = document.querySelector('.gallery-filter-bar');
  var galleryGrid = document.querySelector('.gallery-grid');
  var comingSoon  = document.querySelector('.gallery-coming-soon');
  var cards       = document.querySelectorAll('.creator-card');

  if (!filterBar || !galleryGrid) {
    console.warn('[gallery.js] Required DOM elements not found — aborting init');
    return;
  }

  /* ---------------------------------------------------------------------------
     Filter Logic

     Media types with live content are in LIVE_TYPES.
     All other types show the coming-soon message and hide the grid.
     --------------------------------------------------------------------------- */

  // Types that have real cards available right now
  var LIVE_TYPES = ['all', 'video'];

  filterBar.addEventListener('click', function (e) {
    var btn = e.target.closest('.filter-btn');
    if (!btn) return;

    var filter = btn.dataset.filter;

    // --- Update active button state ---
    filterBar.querySelectorAll('.filter-btn').forEach(function (b) {
      b.classList.remove('active');
    });
    btn.classList.add('active');

    // --- Coming Soon types: hide grid, show message ---
    if (!LIVE_TYPES.includes(filter)) {
      galleryGrid.hidden = true;
      comingSoon.hidden  = false;
      return;
    }

    // --- Live types: show grid, hide coming soon ---
    galleryGrid.hidden = false;
    comingSoon.hidden  = true;

    // --- Filter individual cards ---
    cards.forEach(function (card) {
      var type    = card.dataset.mediaType;
      var visible = filter === 'all' || type === filter;
      card.hidden = !visible;
    });
  });

  /* ---------------------------------------------------------------------------
     GSAP ScrollTrigger — Staggered Entrance Animation

     Concept (concept_by_video.md):
     "The first card appears immediately as the section enters view.
      Adjacent items animate in slightly afterward. This produces a
      cascading or waterfall effect across the grid."

     Timing decisions from motion.json analysis:
     - duration: 0.5s  → dominant transitionElement duration across all elements
     - ease: "power2.out" → GSAP equivalent of CSS "ease" (smooth deceleration)
     - stagger: 0.08s  → no token in motion.json; derived from concept description
       ("slightly afterward" = perceptible but not slow — 80ms per card)
     - y offset: 40px  → matches fade-in + translate-up pattern in concept_by_video.md

     ScrollTrigger fires once when the section top crosses 80% of viewport height,
     ensuring the animation triggers before the content is fully on screen.
     --------------------------------------------------------------------------- */

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('[gallery.js] GSAP or ScrollTrigger not available — skipping entrance animation');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.creator-card', {
    scrollTrigger: {
      trigger: '.creator-gallery',
      start:   'top 80%',  /* fire when section top crosses 80% of viewport */
      once:    true,       /* animation runs once; ScrollTrigger is then killed */
    },
    opacity:  0,
    y:        40,
    duration: 0.5,   /* motion.json dominant transitionElement duration */
    ease:     'power2.out',
    stagger:  0.08,  /* 80ms between cards — cascading waterfall from concept_by_video.md */
  });

}());
