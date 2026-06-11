# Silver Grain — Concept by Video

## Scroll Opening

The page opens onto parchment — no preloader, no splash animation. The hero arrives at rest. The ghost letterforms (Cormorant Garamond at 18vw, opacity 0.04) are already present, static, like embossing on the paper surface of an old tide record. On first scroll, no transition fires. The page simply begins to yield, the way film advancing through a transport mechanism yields: one measured increment, then another. The Lenis smooth scroll duration is set to 1.4s with exponential easing — not the snappy scroll of a SaaS dashboard, but the slow, deliberate scroll of someone consulting a document under a reading lamp, one page at a time. Nothing on the hero section moves until the user has been still for a half-second; the word-rotation in the subheading begins after a 1.8s delay following page load, allowing full orientation before the catalogue index starts turning.

## Hero Experience

The heading assembles from scattered characters using Splitting.js — characters dispersed radially outward as if distributed across a surveyed chart surface, then drawn back in over 0.85s per character at 0.022s stagger from center. The assembly converges rather than scans: center characters arrive first, periphery last, the way a darkroom print develops from its chemical center outward when developer is uneven in the tray. The three parallax depth layers move at depths of 38% / 19% / 8% as the user scrolls past. The farthest is opacity 0.03, barely present, like a latent image not yet fully developed. The nearest is opacity 0.08 — still barely there, but the first thing you notice when you look past the type.

This section is a video background candidate. The hero background should use `darkroom-print-drying.mp4` — an extreme close-up of a silver-gelatin print hanging to dry, the warm safelight catch in the damp surface, the image barely visible at this proximity. The video replaces what was a static parchment color field and gives it material weight: the site feels like a document held under light, not projected on glass.

## Section Transitions

Each section transition uses a unique SVG organic divider — sinusoidal wave, angular zigzag with irregular tooth spacing, inverted arch U-curves, and a 4-degree diagonal plane — all filled with the destination section's background color so the divider appears to be the section eating into the one above it. None of the dividers are symmetric; the asymmetry is systematic, the way a hand-ruled line is never perfectly level.

The catalog rule — a graduated measurement scale modeled on a tide gauge, tick marks of varying height — draws left-to-right on scrub as the catalog section enters the viewport. The tick marks are not uniform. Their spacing is irregular in the same way the section dividers are irregular: this is a surveyed page, not a designed one.

## Content Rhythm

Content arrives in instrument time, not app time. Catalog cards scatter in from off-screen random positions at ±20° rotation — tighter than the typical ±30° scatter, because archival objects arrive disordered but not chaotic, like prints pulled from a developing tank and laid on a light table in whatever order they come. The bento block's large cell wipes down from the top; the two small cells wipe up from the bottom — a closing-casing motion, as if two halves of a transit case are shutting around the featured instrument.

The editorial section heading passes through an SVG feTurbulence filter on scroll entry: up to 28 pixels of displacement, resolving to zero over 1.4s. The distortion is a water-lensing effect — text read through the surface of a still developing bath, resolving to clarity as the text settles. It fires once, for the founding-document heading only. The restraint is deliberate: one moment of optical disturbance in a site otherwise committed to stillness.

## Footer Approach

The footer arrives without animation. No entrance, no fade, no curtain. It is simply the final state of the page — a wide brand column plus three link-list columns, set in the same warm parchment ground as the hero. The footer does not acknowledge being a footer. It continues the document. The only motion in the footer region is the focus ring on the newsletter input — a 3px amber-clay outline that appears on keyboard focus, the one chromatic signal in an otherwise near-neutral field.

## Motion Principles

1. **All motion begins at velocity.** No ease-in from zero. Every animation starts moving on the first frame.
2. **Deceleration is the dominant arc.** power3.out, power2.out — all converge toward rest, never away from it.
3. **Duration is long.** 0.85s, 1.1s, 1.4s, 2.8s. The site does not hurry. It advances frame by frame.
4. **Vertical vocabulary is consistent.** Exit upward, enter from below. Every vertical transition obeys this rule.
5. **One optical distortion, used once.** The feTurbulence filter on the editorial heading is the only technique that departs from the instrument-calibration aesthetic.
6. **Scrub animations are slow.** Scrub values of 1.5–2.2 mean scroll position has to move considerably before the animation catches up.
7. **Grain is not animated.** The texture in the system is static. Motion happens in front of it.

## Video Placements

**1. Hero Background — Darkroom Print Drying**
- Suggested file: `darkroom-print-drying.mp4`
- Subject: An extreme close-up of a silver-gelatin print hanging to dry on a wooden clip line in a darkroom. A single incandescent safelight throws amber warmth across the scene from camera-left. The print sways imperceptibly — perhaps 2mm of motion over 20 seconds. The grain of the baryta paper is visible at this focal length. 20s loop. Color palette: warm off-white base, amber safelight cast, silver-gray image tones.
- Duration: 20s loop
- Why video: A static parchment color achieves the hue but not the surface. A near-still video of a drying photographic print gives the background material weight. The grain of the baryta paper echoes the ghost letterforms in the hero at opacity 0.04.

**2. Bento Featured Instrument Cell — Instrument Under Enlarger Light**
- Suggested file: `instrument-enlarger.mp4`
- Subject: A brass sextant arc placed on a darkroom enlarger baseboard, illuminated from above by the enlarger's cold lamp. The light is sharp and directional — it throws strong relief shadows into the arc's degree engravings. The enlarger head drifts very slowly upward over 12 seconds, softening the focus fractionally. Grain is visible; the highlight on the brass knurled tangent screw blooms slightly. 12s loop.
- Duration: 12s loop
- Why video: A static image places an object on a surface. A video of an instrument under enlarger light places it inside a photographic process — the instrument is being studied, not displayed.

**3. Catalog Section Divider — Film Strip Advancing**
- Suggested file: `filmstrip-advance.mp4`
- Subject: A length of 35mm black-and-white film advancing slowly through a film transport mechanism, viewed from directly above against a light table. The frames on the film are contact-print sized views of hydrographic instruments. The transport advances at approximately one frame every 4 seconds. 16s loop.
- Duration: 16s loop
- Why video: The catalog section divider is a graduated measurement scale that draws on scroll. The video of a film strip advancing beneath it reinforces the catalog-index logic: each frame is an accession record, each advance is a page turn.
