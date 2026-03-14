# Hero Background

**File:** assets/hero-bg.jpeg
**Save to:** `landing-page/assets/hero-bg.jpeg`
**Type:** Image
**Dimensions:** 2560×1440
**Aspect ratio:** 16:9
**AI Tool:** Higgsfield Nano Banana Pro
**Page:** index.html
**Section:** section-hero

## Context from code
- **Alt text:** "Dark atmospheric interior — preserved goods and candlelight"
- **Nearest heading:** "Maison Cendre" (h1 #hero-headline)
- **Section purpose:** Full-viewport hero — the primary cinematic establishing shot for the entire page; covers 100vh at 1440px+ desktop; image is cropped via `object-fit: cover; object-position: center 30%` and scaled slightly to 1.06 for parallax breathing room; overlaid by a radial + linear gradient that fades heavily to #19191c at the bottom and left
- **Background:** #19191c (near-black), multi-layer gradient overlay, grain texture at 4% opacity on top

## Prompt

A subterranean Parisian cellar interior of a high-end preservation house, dimly lit by a single large pillar candle placed among rows of hand-sealed glass jars and dark lacquered tins of caviar and conservas on raw stone shelves. The light source is warm amber — a single candleflame throwing deep rim shadows across the jars and casting a long, directional glow across worn limestone floor. The composition is wide and cinematic with the subject slightly left-of-center, allowing the right two-thirds of the frame to dissolve into near-black. Color palette dominated by #19191c near-black, #2c2c30 dark stone grey, amber candle warmth, and muted #acacaf for the glass and metal surfaces. Mood: cinematic, material, deliberate — a still life that communicates patience, luxury, and the weight of slow craft.

## Usage

Used in `index.html` inside `#section-hero` as the full-viewport cinematic background image behind the hero headline and CTA.
HTML: `<img src="../assets/hero-bg.jpeg" alt="Dark atmospheric interior — preserved goods and candlelight">`
