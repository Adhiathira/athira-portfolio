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

});
