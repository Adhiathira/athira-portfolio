# Dawn Civic — Concept by Video

## Scroll Opening

The page loads into stillness. The hero image holds for 800ms before any motion begins — long enough for the eye to register the full composition, short enough to avoid the impression of a broken page. The first animation is structural: the navigation slides down from y: -20px to y: 0 with a 0.6s ease-out, followed at 200ms stagger by the hero text block rising from y: 30px, opacity 0 → 1. The effect is a page assembling itself from the top — civic order imposing itself on the blank field.

## Hero Experience

The hero is the site's primary temporal statement. A full-bleed video plays behind the type stack — not decorative motion but atmospheric: the slow movement of morning light across a stone facade, or a figure moving with intention through an open plaza. The video runs at 10–12 seconds per loop, muted, with an overlay that preserves text legibility while allowing the motion to contribute to the site's sense of living presence. Text appears over the video rather than floating free of it — the two planes are in dialogue, not in competition.

The entry animation for the hero type is restrained: a simultaneous fade-translate pair (opacity 0→1, y: 20→0, duration 0.8s, cubic-bezier(0.4, 0.0, 0.2, 1)) that matches the site's material easing standard. No bounce, no spring — the easing is the one used for Material transitions: deceleration into rest, as if the text arrived from somewhere and settled.

## Section Transitions

Sections reveal on scroll via IntersectionObserver with 0.15 threshold. The entry is a gentle rise: `y: 40, opacity: 0` → `y: 0, opacity: 1`, duration 0.7s, stagger 0.1s across child elements. This is not a scroll animation in the theatrical sense — it is a reveal system that makes the page feel like it is unfolding rather than appearing all at once. The transition between sections is handled by the spatial system itself (158px vertical margin) rather than by motion — the gap is the transition.

## Content Rhythm

Individual content elements — card grids, feature lists, testimonials — enter the viewport using a stagger pattern calibrated to the element count. For a 3-column grid: `stagger: 0.12s, y: 30, opacity: 0`. For a 2-column asymmetric layout: the wider left column enters first (`x: -40, opacity: 0`) and the right column follows at 180ms. For single headline elements above grids: `y: 20, opacity: 0, duration: 0.6s` — restrained, because the content is the point.

The hover states contribute to content rhythm: the 0.45s ease-in-out transition on buttons with translateY(-2px) produces a micro-response that feels like physical lift rather than color swap. The cumulative effect across dozens of hover interactions is a site that feels responsive to touch — materially present.

## Footer Approach

The footer enters from below the fold not with animation but with the spatial system doing its work: the 118px marginTop above the footer creates a long open field before the terminal section, so the eye arrives at the footer after a breath. If any animation is applied, it is subtle: the footer's content grid fades in at 0.5s, 0.08s stagger across columns — just enough to mark the transition from body to close without theatrics.

## Motion Principles

The timing philosophy is deceleration-first: Material standard easing (`cubic-bezier(0.4, 0.0, 0.2, 1)`) for primary transitions — snappy entry, smooth settle. Secondary interactions (`ease-in-out`) for bidirectional states where symmetry matters. Duration tokens of 1s for structural transitions, 0.5s for content reveals, 0.15s for micro-interactions. The system reads as: fast enough to feel responsive, slow enough to feel considered. Nothing bounces. Nothing overshoots. Precision is the affect.

## Video Placements

**1. Hero — `hero-civic-morning.mp4`**
- Section role: Full-bleed hero background
- Subject: Slow tracking shot across the face of a Haussmann-era stone building at dawn — diffused morning light creating long parallel shadows across the rusticated limestone, an empty sidewalk below; no people, pure architectural patience. The camera moves at barely perceptible speed — 1cm per second — making the stone feel like a breathing surface rather than a still image.
- Motion quality: Ultra-slow lateral drift, locked-off tripod with minimal vibration
- Duration: 10s loop
- Why video: The site's core argument is civic precision with morning warmth — a still image communicates the content but not the temporal quality. The barely-perceptible drift of dawn light across stone is a temporal statement that can only be made through video. It establishes that this brand operates in a world where time moves at the right pace.

**2. About / Story section — `atelier-light.mp4`**
- Section role: Editorial story section, full-width background or large inset panel
- Subject: Interior of a precision workshop — long wooden workbench running left to right, morning light entering from high windows at a steep angle, pooling on white paper, the edge of a drafting tool visible at frame right. No motion in the subject: the video's movement is the light itself, shifting incrementally across the table surface as if minutes are passing in seconds.
- Motion quality: Time-lapse at 1hr : 6s compression — imperceptible as timelapse but alive as still image
- Duration: 6s loop
- Why video: The "atelier" register communicates craft, but a still photograph of an empty workspace is a cliché. Compressed time passing across a workbench surface communicates that something is made here, over time, with attention — without showing a single hand.

**3. Collection / Product showcase — `collection-in-motion.mp4`**
- Section role: Product grid or feature section, used as a contained right-panel video
- Subject: A single product (shoe, bag, or architectural object) on a clean surface, a hand entering frame from the left and rotating it slowly — examining it from multiple angles at the pace of a jeweler assessing a gem. The background is the site's near-white (#fbfbfd), continuous with the page.
- Motion quality: Smooth, controlled rotation — handheld but stabilized, no jarring
- Duration: 5s loop (seamless)
- Why video: A product detail page shows isolated views. A video of examination communicates that this object rewards close attention — that there is always more to find. The matched background makes the video feel embedded in the page rather than inserted into it.
