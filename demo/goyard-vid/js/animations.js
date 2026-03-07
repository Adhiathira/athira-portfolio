// animations.js — Goyard-vid entrance animations
// Timing sourced from motion.json — do not invent values
//
// motion.json timingTokens:
//   durations: ["1s", "0.5s", "0.15s"]
//   easings:   ["ease", "ease-in-out"]
//
// Hero entrance uses:
//   - Headline: duration 1s, ease  (header-level transition — the primary hero element)
//   - CTA:      duration 0.5s, ease (opacity/element transition — secondary element)
//   - Stagger delay between headline completion and CTA start: 0.15s (fast micro timing)
//
// GSAP is loaded via CDN in index.html — no imports needed.

document.addEventListener('DOMContentLoaded', () => {

  // Set initial states before the timeline runs so GSAP owns the y offset
  // from the very first frame — prevents a positional flash on load.
  // opacity: 0 is already declared in hero.css; gsap.set adds the y offset.
  gsap.set('.hero-headline', { y: 30 });
  gsap.set('.hero-cta', { y: 20 });

  // Hero entrance: headline reveals first, CTA follows after headline completes
  const tl = gsap.timeline();

  // Step 1 — headline: y: 30 → y: 0, opacity: 0 → 1
  // Duration: 1s (motion.json header transition — primary hero-level element)
  tl.to('.hero-headline', {
    y: 0,
    opacity: 1,
    duration: 1,        // motion.json timingTokens durations[0]: "1s"
    ease: 'power1.out', // maps to CSS "ease" from motion.json easings[0]
  });

  // Step 2 — CTA follows with 0.15s overlap before headline fully completes
  // Duration: 0.5s (motion.json opacity/element transition — secondary element)
  // Offset: "-=0.15" overlaps the tail of the headline by 0.15s (motion.json durations[2])
  tl.to('.hero-cta', {
    y: 0,
    opacity: 1,
    duration: 0.5,      // motion.json timingTokens durations[1]: "0.5s"
    ease: 'power1.out', // maps to CSS "ease" from motion.json easings[0]
  }, '-=0.15');          // motion.json timingTokens durations[2]: "0.15s" stagger overlap

  // ---------------------------------------------------------------------------
  // Register ScrollTrigger plugin
  // GSAP plugins must be registered before use; safe to call multiple times
  // ---------------------------------------------------------------------------
  gsap.registerPlugin(ScrollTrigger);

  // ---------------------------------------------------------------------------
  // How It Works — viewport-triggered reveal
  // Heading enters first (primary, 1s), then steps stagger in (secondary, 0.5s each)
  // Timing: motion.json timingTokens durations[0]: "1s", durations[1]: "0.5s"
  // ---------------------------------------------------------------------------

  // Set y offset on heading and step items before scroll reveal fires
  gsap.set('.how-it-works__heading', { y: 20 });
  gsap.set('.step', { y: 30 });

  // Heading reveal — fires when section top reaches 85% from viewport top
  gsap.to('.how-it-works__heading', {
    y: 0,
    opacity: 1,
    duration: 1,          // motion.json durations[0]: "1s" — primary/header element
    ease: 'power1.out',   // motion.json easings[0]: "ease"
    scrollTrigger: {
      trigger: '.how-it-works',
      start: 'top 85%',
    },
  });

  // Steps stagger reveal — starts 0.15s after heading animation begins
  gsap.to('.step', {
    y: 0,
    opacity: 1,
    duration: 0.5,        // motion.json durations[1]: "0.5s" — secondary element
    ease: 'power1.out',   // motion.json easings[0]: "ease"
    stagger: 0.15,        // motion.json durations[2]: "0.15s" — stagger between items
    scrollTrigger: {
      trigger: '.how-it-works',
      start: 'top 80%',
    },
  });

  // ---------------------------------------------------------------------------
  // Community Signals — viewport-triggered reveal
  // Heading enters first (1s), then cards stagger (0.5s each), then stat banner (0.5s)
  // ---------------------------------------------------------------------------

  // Set y offset on heading, cards, and stat banner
  gsap.set('.community-signals__heading', { y: 20 });
  gsap.set('.creator-profile-card', { y: 30 });
  gsap.set('.platform-stat-banner', { y: 20, opacity: 0 });

  // Heading reveal
  gsap.to('.community-signals__heading', {
    y: 0,
    opacity: 1,
    duration: 1,          // motion.json durations[0]: "1s"
    ease: 'power1.out',
    scrollTrigger: {
      trigger: '.community-signals',
      start: 'top 85%',
    },
  });

  // Creator cards stagger reveal
  gsap.to('.creator-profile-card', {
    y: 0,
    opacity: 1,
    duration: 0.5,        // motion.json durations[1]: "0.5s"
    ease: 'power1.out',
    stagger: 0.15,        // motion.json durations[2]: "0.15s"
    scrollTrigger: {
      trigger: '.community-signals',
      start: 'top 80%',
    },
  });

  // Platform stat banner reveal — enters after cards
  gsap.to('.platform-stat-banner', {
    y: 0,
    opacity: 1,
    duration: 1,          // motion.json durations[0]: "1s" — primary display element
    ease: 'power1.out',
    scrollTrigger: {
      trigger: '.platform-stat-banner',
      start: 'top 90%',
    },
  });

});
