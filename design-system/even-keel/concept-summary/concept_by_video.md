# Halcyon Gauge — Concept by Video (Motion Director's Brief)

## Scroll Opening

The page opens onto a clean white field at rest — no preloader, no splash, no logo build. The ghost letterforms (Cormorant Garamond at 18vw, opacity 0.04) are already embossed into the surface when the first frame renders; they were never animated in. The scroll is governed by Lenis smooth-scroll at a 1.2s duration with exponential easing, deliberately slower than a SaaS dashboard and closer to the pace of someone turning the pages of a bound survey under a reading lamp. Nothing on the hero moves for the first half-second of stillness. The intent is orientation before motion: the reader must feel that the document existed before they arrived, and that scrolling is an act of consultation rather than a triggered experience. The first scroll increment does not fire a transition; the page simply yields, one measured step, then another.

## Hero Experience

The heading "Halcyon Gauge" assembles from scattered characters via Splitting.js — glyphs dispersed radially outward as if laid across a chart surface, then drawn back over 0.85s per character at a 0.022s stagger measured from center outward, so the interior letters land first and the periphery last. Three parallax depth layers sit beneath the type in z-order — a sextant arc, a compass rose, a tide-gauge column — tracking scroll at 38% / 19% / 8% of viewport velocity, at opacities of 0.03, 0.05, and 0.08 respectively. They are latent, not decorative: the nearest layer is the only one a reader consciously notices, and only on second look. The subheading cycles instrument names — sextant, tide gauge, thermometer, barometer, compass, sounding lead — on a 2.8s interval, each word exiting upward and the next entering from below, establishing the single vertical vocabulary the whole site obeys.

## Section Transitions

Every section boundary is an asymmetric SVG divider filled with the destination section's background color, so the incoming section appears to eat into the one above it. The vocabulary rotates deliberately: an off-center sinusoidal wave, an irregular-tooth zigzag, an unequal-width arch series, and a shallow 4-degree diagonal plane. None are symmetric, and the asymmetry is systematic — a hand-ruled line is never perfectly level, and the page should read as surveyed rather than composed. The catalog rule, modeled on a tide-gauge scale with tick marks of varying height, draws left-to-right on scrub as the catalog enters the viewport and finishes when the section reaches mid-screen. Scrub values sit at 1.5–2.2, so the drawing lags perceptibly behind the reader's hand, like transport with a touch of mechanical resistance.

## Content Rhythm

Content arrives in instrument time, not app time. Catalog cards scatter in from off-screen at ±20° rotation with a from-random stagger, tight enough to feel disordered but never chaotic — records pulled from a drawer and laid across a clean table in whatever order they come. The bento block's large cell wipes down from the top while its two flanking stat tiles wipe up from below, a closing-casing motion as if two halves of a transit case shut around the featured instrument. Stat-tile counters run over 2.8s on power2.out — 847 objects, 62 years, 14 active fellowships — landing and holding with no overshoot, the way a gauge needle settles to a reading. Exactly one departure from stillness is permitted: the editorial section heading passes through an feTurbulence displacement of up to 24px on scroll entry, resolving to zero over 1.4s, a single water-lensing moment in an otherwise composed field. Its rarity is what makes it register.

## Footer Approach

The footer arrives without animation — no entrance, no fade, no curtain. It is simply the page's final state: a wide brand column and three link-list columns on the same white ground as the hero. It does not acknowledge being a footer; it continues the document as back matter — index, colophon, contact address. The only motion in the region is the focus ring on the newsletter input: a 3px blue outline (`#2563eb`) that appears on keyboard focus, the one chromatic signal in a near-neutral field. Nothing here is engineered to retain the reader. The footer's job is to close the record cleanly.

## Motion Principles

1. **All motion begins at velocity.** No ease-in from zero — every animation is already moving on its first frame.
2. **Deceleration is the dominant arc.** power3.out for entrances, power2.out for hover pull, a single elastic.out(1, 0.3) reserved for instrument-tile release; all converge toward rest.
3. **Duration runs long.** 0.85s, 1.1s, 1.4s, 2.8s. The site advances rather than accelerates.
4. **Vertical vocabulary is consistent.** Exit upward, enter from below — every vertical transition obeys this.
5. **One optical distortion, used once.** The feTurbulence heading is the sole departure from the calibration aesthetic; its singularity is the point.
6. **Grain is not animated.** Surface texture stays fixed; motion happens in front of it, the way film grain holds while the subject moves through frame.

## Video Placements

**1. Hero Background — Chart Paper Under a Reading Lamp**
- Section role: Hero background field, sitting beneath the ghost letterforms and parallax layers at low opacity.
- Suggested file: `hero-bg.mp4`
- Subject + motion + mood: An extreme close-up of nautical chart paper on a survey table, lit evenly from camera-left by a single clean reading lamp. The paper's fiber and a faint printed coastline are just legible. A slow, almost subperceptual drift of the lamp's light crosses the surface over the loop, plus perhaps 2mm of paper curl settling. Clean white base, cool neutral cast, slate-gray print tones. Calm, archival, precise.
- Duration: 10s loop
- Why video beats a still: A static fill achieves the white ground but not the surface. A near-still video gives the background material a subtle weight and a living quality, so the site reads as a document on a lit surface rather than a flat color on glass — and the moving light echoes the ghost letterforms without competing with them.

**2. Bento Featured Cell — Instrument Under Directional Light**
- Section role: The bento block's large 2fr featured-instrument cell.
- Suggested file: `instrument-detail.mp4`
- Subject + motion + mood: A sextant arc on a pale baseboard, lit sharply from above so relief shadows fall into the degree engravings. The light source drifts fractionally upward over the loop, expanding the cone and softening focus by a hair before holding. Near-black and cool steel tones against a clean white ground, crisp detail, compressed highlight-to-shadow. Studied, unhurried, forensic.
- Duration: 10s loop
- Why video beats a still: A still places an object on a surface; the slow light drift places it inside an act of examination — the instrument is being studied, not displayed, the way one leans over a loupe on a contact sheet. The motion is subperceptual on first viewing, so it deepens presence without pulling focus from the catalog data beside it.

**3. Catalog Divider — Film Strip Advancing on a Light Table**
- Section role: The catalog section divider, layered behind the tide-gauge measurement rule as it draws in.
- Suggested file: `catalog-divider.mp4`
- Subject + motion + mood: A length of 35mm black-and-white film advancing over a light table, sprocket holes on both edges, each frame a contact-sized view of an instrument — a barometer dial, a compass rose, a thermometer scale. Advance is roughly one frame every 4 seconds, silent, shallow depth of field so the far sprockets go soft. Cool neutral gray on a clean bright base, luminous white ground.
- Duration: 5s loop
- Why video beats a still: The divider is an index gesture, and a film strip advancing makes the index logic literal — each frame an accession record, each advance a page turn — while the light-table glow transitions naturally into the faint gray panel catalog cards below. A still frame would state the same idea but lose the sense of a record being consulted in sequence.
