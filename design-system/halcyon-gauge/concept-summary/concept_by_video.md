# Halcyon Gauge — Concept by Video (Analog Film Re-cut)

## Motion Philosophy

Motion here does not accelerate. It advances — like film moving through a gate, one frame at a time, each frame complete before the next begins. There is no anticipation, no rubber-band ease-in, no theatrical overshoot. Animations settle at their endpoints the way an exposure settles into a print: the image arrives, holds, and is. The GSAP easing profile is deceleration-dominant throughout — `power3.out` for entrances, `power2.out` for hover magnetic pull, `elastic.out(1, 0.3)` for the single physical spring reserved for instrument tile release. Nothing eases in from zero. All motion begins at velocity, the way a shutter opens already committed to the exposure. Duration values lean long: 0.85s, 1.1s, 1.4s — the unhurried cadence of a photographer who has loaded fresh film and is in no danger of running out.

## Scroll Opening

The page opens onto parchment — no preloader, no splash animation. The hero arrives at rest. The ghost letterforms (Cormorant Garamond at 18vw, opacity 0.04) are already present, static, like embossing on the paper surface of an old tide record. On first scroll, no transition fires. The page simply begins to yield, the way film advancing through a transport mechanism yields: one measured increment, then another. The Lenis smooth scroll duration is set to 1.4s with exponential easing — not the snappy scroll of a SaaS dashboard, but the slow, deliberate scroll of someone consulting a document under a reading lamp, one page at a time. Nothing on the hero section moves until the user has been still for a half-second; the word-rotation in the subheading begins after a 1.8s delay following page load, allowing full orientation before the catalogue index starts turning.

## Hero Experience

The heading "Halcyon Gauge" assembles from scattered characters using Splitting.js — characters dispersed radially outward as if distributed across a surveyed chart surface, then drawn back in over 0.85s per character at 0.022s stagger from center. The assembly converges rather than scans: center characters arrive first, periphery last, the way a darkroom print develops from its chemical center outward when developer is uneven in the tray. The three parallax depth layers — sextant arc, compass rose, tide gauge column — move at depths of 38% / 19% / 8% as the user scrolls past. All three remain below the heading in z-index. The farthest is opacity 0.03, barely present, like a latent image not yet fully developed. The nearest is opacity 0.08, the most resolved layer — still barely there, but the first thing you notice when you look past the type.

The hero subheading cycles through instrument names — sextants, tide gauges, thermometers, barometers, compasses, sounding leads — at 2.8s intervals. The rotation is a vertical flip: the exiting word rises and fades, the entering word rises into view from below. The direction is consistent with the curtain-reveal mechanic used throughout the site: all vertical motion exits upward, enters from below, a single vocabulary.

## Section Transitions

Each section transition uses a unique SVG organic divider — sinusoidal wave, angular zigzag with irregular tooth spacing, inverted arch U-curves, and a 4-degree diagonal plane — all filled with the destination section's background color so the divider appears to be the section eating into the one above it. None of the dividers are symmetric; the asymmetry is systematic, the way a hand-ruled line is never perfectly level.

The catalog rule — a graduated measurement scale modeled on a tide gauge, tick marks of varying height — draws left-to-right on scrub as the catalog section enters the viewport. It finishes drawing when the catalog section reaches mid-viewport. The tick marks are not uniform. Their spacing is irregular in the same way the section dividers are irregular: this is a surveyed page, not a designed one.

## Content Rhythm

Content arrives in instrument time, not app time. Catalog cards scatter in from off-screen random positions at ±20° rotation — tighter than the typical ±30° scatter, because archival objects arrive disordered but not chaotic, like prints pulled from a developing tank and laid on a light table in whatever order they come. Stagger is from-random, ensuring no predictable procession. The bento block's large cell wipes down from the top; the two small cells wipe up from the bottom — a closing-casing motion, as if two halves of a transit case are shutting around the featured instrument.

The editorial section heading passes through an SVG feTurbulence filter on scroll entry: up to 28 pixels of displacement, resolving to zero over 1.4s. The distortion is a water-lensing effect — text read through the surface of a still developing bath, resolving to clarity as the text settles. It fires once, for the founding-document heading only. The restraint is deliberate: one moment of optical disturbance in a site otherwise committed to stillness.

Stat tile counters run over 2.8s with power2.out easing. 847 objects. 62 years. 14 active fellowships. The numbers land and hold. No overshoot, no bounce. A gauge needle settling to a reading.

## Footer Approach

The footer arrives without animation. No entrance, no fade, no curtain. It is simply the final state of the page — a wide brand column plus three link-list columns, set in the same warm parchment ground as the hero. The footer does not acknowledge being a footer. It continues the document. The only motion in the footer region is the focus ring on the newsletter input — a 3px amber-clay outline (`#b85c2a`) that appears on keyboard focus, the one chromatic signal in an otherwise near-neutral field. The footer feels like the back matter of a catalogue: index, colophon, contact address. It is not designed to retain the user. It is designed to close the record.

## Motion Principles

1. **All motion begins at velocity.** No ease-in from zero. Every animation starts moving on the first frame.
2. **Deceleration is the dominant arc.** power3.out, power2.out, elastic.out(1, 0.3) — all converge toward rest, never away from it.
3. **Duration is long.** 0.85s, 1.1s, 1.4s, 2.8s. The site does not hurry. It advances frame by frame.
4. **Vertical vocabulary is consistent.** Exit upward, enter from below. Every vertical transition obeys this rule.
5. **One optical distortion, used once.** The feTurbulence filter on the editorial heading is the only technique that departs from the instrument-calibration aesthetic. Its singularity is what makes it land.
6. **Scrub animations are slow.** Scrub values of 1.5–2.2 mean scroll position has to move considerably before the animation catches up — the site lags slightly behind the user's hand, like film transport with a touch of mechanical resistance.
7. **Grain is not animated.** The texture in the system is static. Motion happens in front of it. The grain of the background stays fixed, the way film grain stays fixed when the subject moves through frame.

## Video Placements

**1. Hero Background — Darkroom Print Drying**
- Suggested file: `darkroom-print-drying.mp4`
- Subject: An extreme close-up of a silver-gelatin print hanging to dry on a wooden clip line in a darkroom. The print is slightly damp — the surface has a subtle sheen from the wash water. The image on the print is barely visible at this proximity: a ghosted nautical chart, the coastline of the Galician coast, rendered in warm-gray silver. A single incandescent safelight throws amber warmth across the scene from camera-left. The print sways imperceptibly in a slow air current — perhaps 2mm of motion over 20 seconds, then returning. The grain of the baryta paper is visible at this focal length. Shot at 50mm equivalent on a medium-format film camera; the depth of field is shallow enough that the far edge of the print goes soft. 20s loop. Color palette: warm off-white base, amber safelight cast, silver-gray image tones. The motion is so slow it registers only when you look away and look back.
- Duration: 20s loop
- Why video: The hero background is parchment-toned. A static color achieves the hue but not the surface. A near-still video of a drying photographic print gives the background material weight — the site feels like a document held under light, not projected on glass. The grain of the baryta paper echoes the ghost letterforms in the hero at opacity 0.04.

**2. Bento Featured Instrument Cell — Instrument Under Enlarger Light**
- Suggested file: `instrument-enlarger.mp4`
- Subject: A brass sextant arc placed on a darkroom enlarger baseboard, illuminated from above by the enlarger's cold lamp. The light is sharp and directional — it throws strong relief shadows into the arc's degree engravings, making the graduations read as deeply incised as they are. The enlarger head drifts very slowly upward over 12 seconds, softening the focus fractionally as the light cone expands, then holds. Shot on Kodak Tri-X 400 pushed to 1600, or a faithful digital simulation thereof: grain is visible, the shadow-to-highlight transition is compressed, the highlight on the brass knurled tangent screw blooms slightly. 12s loop. No color — the instrument's own brass and black lacquer against the white baseboard paper. The grain is the color.
- Duration: 12s loop
- Why video: The bento block's large 2fr cell is the featured instrument showcase. A static image places an object on a surface. A video of an instrument under enlarger light places it inside a photographic process — the instrument is not being displayed, it is being studied, the way a photographer leans over a loupe to examine a contact sheet. The motion of the enlarger head is slow enough to be subperceptual on first viewing.

**3. Catalog Section Divider — Film Strip Advancing**
- Suggested file: `filmstrip-advance.mp4`
- Subject: A length of 35mm black-and-white film advancing slowly through a film transport mechanism, viewed from directly above against a light table. The sprocket holes are visible on both edges. The frames on the film are contact-print sized views of hydrographic instruments — a barometer dial, a compass rose, a thermometer scale — each frame slightly underexposed, the silver image warm-gray on a near-clear base. The transport advances at approximately one frame every 4 seconds. The mechanical sound is not included (this is a silent ambient). Shot at a shallow depth of field so the far sprocket holes are soft. 16s loop.
- Duration: 16s loop
- Why video: The catalog section divider is a graduated measurement scale that draws on scroll. The video of a film strip advancing beneath it reinforces the catalog-index logic: each frame is an accession record, each advance is a page turn. The 35mm format echoes the archival photography dimension of the system without requiring photographic assets in the catalog tiles themselves. The light table glow provides a luminous ground that transitions naturally into the warm linen card color of the catalog below it.
