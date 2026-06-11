# Gilded Frond — Concept by Video

## Scroll Opening

The page opens in stillness. Before the user scrolls, the hero is a white field with the logotype in deep teal-black italic, the only movement a barely perceptible gold shimmer on the wordmark — `goldShimmer` at 2s infinite, so subtle it reads first as an optical quality of the letterform itself rather than an animation. As the user begins to scroll, the hero content `fadeSlideUp` (0.91s decelerate-expo), introducing the botanical studio imagery with a cloth-drapery weight — not a snap, but a settling.

## Hero Experience

The hero is a video background candidate. The frame is a slow horizontal drift across a natural-dye workshop: indigo vats with their characteristic blue oxidation plume, hanks of yarn hung against whitewashed stone, morning light entering through tall workshop windows at a low angle. Shot at 24fps on a large-format camera, 10-second loop, desaturated in the warm register to blend with the `#ffffff` page surface when the video fades at scroll. The subject is **hand-dye process** — the human hand in the frame throughout, never the product alone. This matters because the brand's authority rests on labor, not logo.

**Suggested asset:** `hand-dye-process.mp4` — slow drift, workshop interior, natural light, 10s loop

## Section Transitions

Between sections, content enters with `revealSweep` — a left-to-right clip-path reveal at 0.9s that mimics the uncovering of a fabric bolt being unrolled. This is the primary transition verb for this system and it should appear exactly where a cloth or curtain metaphor would feel earned: at section boundaries, when new content categories appear, and when the botanical taxonomy shifts from one material family to another. Scroll triggers are set at 0.15 threshold — content begins animating when 15% of it enters the viewport, not at the very first pixel.

## Content Rhythm

Individual cards and specimen elements enter with `scaleReveal` at 1.43s (cinematic duration) — slower than most systems would use for cards, but correct here. The logic is deliberate: at Atelier Botanica, each piece is presented as an artifact. Rushing its entrance would undercut the authority of the object. `stagger-item` classes on grid children delay at 0.1s intervals, so a row of four textile samples arrives as a coordinated group rather than a single burst. The `.petal` stagger class (5 items, 0.1s delay increment) is reserved for botanical taxonomy displays and icon clusters.

## Footer Approach

The footer arrives via `fadeSlideUp` on the content block (0.91s) while the footer background surface itself uses a `revealSweep` at wider duration — the sage green section coming in like a curtain closing across the stage. The footer contains the atelier address, a wax seal device (`.accent-gold` goldShimmer on the SVG), and a final botanical specimen credit line in Dancing Script italic. The animation completes slightly before the user reaches the bottom, so the full footer is visible and settled when they arrive.

## Motion Principles

This system is languid, never hurried. The 0.75–0.91s animation durations are intentionally at the edge of what reads as animation versus behavior. The `cubic-bezier(0.34, 1.56, 0.64, 1)` organic bounce — used for petals and botanical decorative elements — is the only place the system permits elastic movement, and even there the overshoot is controlled (1.56 Y-peak, not 2.0). Everything else decelerates to rest: `cubic-bezier(0.0, 0.0, 0.2, 1)` and `cubic-bezier(0.16, 1, 0.3, 1)` are the workhorses. The guiding question for any animation decision is: does this feel like cloth, water, or smoke? If it feels like a UI widget, it's wrong.

## Video Placements

**1. Hero — `hand-dye-process.mp4`**
Section role: hero background
Subject: A dyer's hands submerging and lifting a silk hank from an indigo vat; oxidation plume rising from the surface; steam; workshop stone walls behind. Camera: locked off then slow drift right. Motion quality: slow-motion (50% speed), natural light only, slight lens warmth.
Duration: 10s loop — the oxidation cycle completes and resets naturally at 10s.
Why video: The indigo oxidation process is fundamentally temporal — the blue appears in real-time as the cloth meets oxygen. A still image cannot communicate this transformation, which is the central narrative of the brand's hand-process claim.

**2. Feature Section — `loom-weave-rhythm.mp4`**
Section role: craft process / product showcase
Subject: A floor loom in operation — the shuttle crossing, heddles lifting, the woven surface building row by row. Shot from slightly above, centered on the textile surface, hands and feet visible at margins. Camera: static. Motion quality: real-time, not slowed — the loom's rhythm IS the motion.
Duration: 5s loop — one complete shuttle pass and return; loops invisibly because the rhythmic repetition is the point.
Why video: The weave structure of the textile is architectural — it only becomes legible as a rhythm in time. Still photography of textiles can show texture but cannot convey the structural intelligence of the weave. The loom makes the argument for the product.

**3. Editorial Section — `botanical-studio.mp4`**
Section role: brand story / atelier identity
Subject: The studio interior at dawn — flat-lay arrangement of pressed botanical specimens, pigment jars, yarn samples, and linen swatches on a weathered oak table; a window at left casting long shadows that slowly sweep across the surface as the light shifts. Camera: overhead, slow zoom out at 0.5× normal speed.
Duration: 10s loop — shadow sweep completes and the light returns to its starting position.
Why video: The studio-as-still-life is a totem of the craft brand genre, but the shadow sweep transforms it from a commercial tableau into a study of material, time, and light — which is exactly the territory Atelier Botanica occupies. It is also the only section where luxury is communicated entirely through environment rather than product.
