# Cerulean Draft — Concept by Video

## Scroll Opening

The page loads fully composed, no entrance animation for the frame itself. The navigation begins transparent and positioned absolute — invisible until the eye finds it. The first section is a full-width header block with heading text anchored bottom-left, white background, already in place. A single staggered fade-up sequence initiates on the heading text and subheading immediately below it: opacity 0 → 1 with translateY(20px) → 0, the two elements separated by a 0.1s stagger delay. No loading state, no skeleton screen. The site trusts its structure over its entrance.

## Hero Experience

The hero section is a full-width composition with deep midnight background (`#1b1b37`), large display heading at 72px/300 weight in white, and a restrained subheading below. No video background in the hero — the color field itself is the atmosphere. On entry, the heading and subheading reveal via staggered slide-up (0.1s apart), the CTA button following 0.2s after the subheading. The hero earns its presence through scale and restraint rather than motion spectacle. If an ambient video is used here, the subject should be: slow-motion close capture of a precision instrument — a measurement tool, a calibrated surface, or a mathematical model rendering — in neutral light, 10s loop, barely moving, communicating exactness rather than energy.

## Section Transitions

All section transitions are clean horizontal cuts with background color shifts: white content zones → light blue-grey (`#f0f0f4`) structural interstices → white again → midnight-blue (`#1b1b37`) emphasis containers → white. No animated dividers, no wave shapes, no parallax transitions between sections. The color alternation is the entire section vocabulary. Each section reveals its content via staggered entrance as the viewport crosses the section boundary — but the section itself arrives instantaneously.

## Content Rhythm

The 0.1s stagger delay between sequential elements is the primary motion vocabulary. Cards in a feature grid enter with `cerulean-slide-up` — opacity 0 → 1, translateY(20px) → 0, 0.35s duration — with each card delayed 0.1s behind the previous. A three-column grid completes its entrance in 0.2s from first to last card. Lists and bullet items enter the same way. The effect is a composed, almost mechanical sequence — not organic like a spring or bounce, but precise like a measurement readout populating one value at a time. No rotation, no scale-and-bounce, no overshoot.

## Footer Approach

The footer announces itself through the background shift to a deeper tone, either midnight-blue or a structural blue-grey, depending on the preceding section's color. Multi-column utility links, the brand mark, and secondary navigation arrange into a tight five-column grid. No entrance animation. The footer is the closing page of the document — it arrives fully composed, as a landing state rather than a performed reveal.

## Motion Principles

The motion vocabulary is precise and deferential. The stagger system (0.1s intervals, 0.35s duration, `cubic-bezier(0.4, 0, 0.2, 1)`) is the system's one assertive motion decision — all else follows from it. There is no GSAP overshoot, no springy bounce, no playful rotation. The easing curve is the Material standard easing — smooth, mechanical, reliable. Reduced motion is fully respected: the stagger system collapses to instant state changes when `prefers-reduced-motion` is active. The motion philosophy is: animation should confirm state transitions, not perform brand personality.

## Video Placements

**1. Instrument Showcase Section — Precision ambient loop**
- Suggested file: `instrument-showcase-ambient.mp4`
- Subject: An extreme close-up of a precision instrument surface — the face of a gauge, a calibrated scale, or a machined metal part — under directional studio light; the camera barely moves, a slow 2mm drift left over 10s; teal and cool-white light tones match the accent palette; no hands, no context, just the object's surface with its tolerances visible
- Duration: 10s loop
- Why video: This section is the product's technical proof point — the moment where the design system asserts its instrument-grade register. A barely-moving video of a precision surface communicates calibration and exactness more convincingly than a static photograph, because the lack of motion itself becomes meaningful — this object doesn't need to announce itself.

**2. Hero Background — Optional dark-register atmospheric loop**
- Suggested file: `hero-bg-ambient.mp4`
- Subject: A slow drift across a dark flat surface with subtle directional light — a slate grey or midnight blue plane, almost no texture, with a thin beam of light crossing at 15° over 8s; the effect is a near-black field with one line of clarity; abstract, non-representational, deeply still
- Duration: 8s loop
- Why video: The hero's dark color field (`#1b1b37`) benefits from having temporal depth — a video background that is almost indistinguishable from a static color makes the hero feel inhabited rather than painted. The key is that the motion be imperceptible except as a quality: the section feels alive without announcing that it's moving.

**3. Process / Methodology Section — Documentary ambient**
- Suggested file: `process-ambient.mp4`
- Subject: A time-lapse of a drafting or layout process — graph paper being marked with precise lines, a ruler sliding across a surface, contour lines appearing in measured increments; 6s loop; overhead shot, warm neutral light on cold paper; the tempo matches the stagger rhythm — each mark appears with the same deliberate interval as the system's 0.1s stagger
- Duration: 6s loop
- Why video: This section communicates how the work is made — the discipline and method behind the precision. A short overhead time-lapse of a physical drafting process gives the methodology section an evidence quality that text and static images cannot provide. It shows the care without describing it.
