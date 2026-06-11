# ink-burst — Concept Summary (Video / Motion)

## Motion Identity

ink-burst motion is **spring/bounce on everything** — nothing eases in quietly. Every element snaps, bounces, or slams into position. The spring easing (cubic-bezier(0.34, 1.56, 0.64, 1)) creates overshoot — elements go slightly past their target and snap back, mimicking the physical energy of comic action lines.

## Key Motion Moments

**Page Load — ZAP Sequence:**
The hero headline slams into existence — scaling from 0 with a slight rotation, overshooting, and snapping to its final position. Sub-elements cascade in with 80ms delays. The whole sequence takes under 0.8s but feels punchy.

**Hero Section:**
The headline uses `zapIn` — scale 0 → 1.08 → 1 with rotation 5° → 0°. The badge (e.g., "ZAP!") bounces in with a 5-step scale sequence. The CTA button springs up with a 40px Y translate + spring easing.

**Feature Cards — Panel Slam:**
Cards slam in from the left using ScrollTrigger `once: true`. Each card: x: -100px → 0, scale: 0.9 → 1, spring easing. Stagger of 0.08s per card so they cascade like panels being flipped.

**Stats Section:**
Numbers count up with GSAP's `Counter` utility. Each stat panel flips in using `panelFlip` — rotationY: 90° → 0° with perspective. Each panel a different color (red, yellow, cyan, white).

**How It Works — Comic Strip:**
Three-step process shown as a horizontal comic strip. Steps reveal left-to-right on scroll, each panel slamming in with a slight rotation (±2°) before settling straight.

**Hover Interactions:**
- Cards: lift up 3px + shadow expands from 4px to 7px offset
- Buttons: scale 1.02 + shadow lifts, active press scale 0.96 + shadow compresses
- Nav links: slight scale 1.05 + red text-shadow appears

**Speech Bubbles:**
Testimonial bubbles appear with a `zapIn` scale animation — they pop into existence rather than fading.

## Video Placement Suggestions

- **Hero panel animation:** 8-second loop showing a comic strip being created in BURST — panels appearing one by one with ZAP animations
- **Feature showcase:** Screen recording with comic-panel overlay transitions between features
- **Process animation:** A time-lapse of a comic strip being drawn, transitioning into the digital tool
