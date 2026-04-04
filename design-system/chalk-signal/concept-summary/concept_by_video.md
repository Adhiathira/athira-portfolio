# Chalk Signal — Concept by Video

## Scroll Opening

The page loads into its resolved state: the navigation bar is already in position, the hero headline is already rendered at display scale. There is no entrance animation triggered on load — the page simply exists, already composed. The off-white field is already present, the Barlow Condensed type is already set, the decorative accent mark is already placed. Scrolling begins immediately from a fully established frame, not from a blank or loading state.

## Hero Experience

The hero is a typography-first composition. The headline — set in Barlow Condensed uppercase at display scale, with primary words at full heading weight and secondary continuation phrases at muted value — is the entire visual event. A small four-pointed star or sparkle graphic occupies the upper register as the only decorative element. The hero background is the off-white field; there is no image, no video, no gradient. The content loads with a gentle `translateY(-20px) → 0` entry animation at 0.45s (the base duration in the ×1.5-scaled motion system) — unhurried, composed, directional. The hero does not animate on its own clock; it waits for the user to initiate scroll before any subsequent motion occurs.

## Section Transitions

All section boundaries use straight horizontal edges. The primary transition vocabulary is generous vertical whitespace between content blocks — the ×1.35 spacing scale creates gaps wide enough to function as visual pauses without requiring geometric ornament. One exception: the boundary between the final dark CTA section and the squircle footer capsule is an organic liquid-drip shape — four to five downward teardrop protrusions of varying width and length — the single moment of non-geometric ornament in an otherwise entirely rectilinear layout. This boundary animates on scroll: as the user approaches the footer, the drip shape translates upward slowly, creating a subtle parallax effect as the footer rises into view.

## Content Rhythm

Scroll-triggered reveals follow a consistent stagger: headline enters first at `y: 20, opacity: 0` → resolved; body copy and media container follow in sequence at 0.14s intervals. The element-level cascade is brief and purposeful — three elements maximum per stagger group, never more. Feature sections with split media-text layouts use a horizontal divergence reveal: the text column enters from the left (`x: -40`), the media container enters from the right (`x: 40`), both at 0.75s (slow duration) with the same easing. The motion reinforces the structural logic — what is split in space is split in arrival. The FAQ accordion rows reveal individually on row entry, not as a block — each question fades in at 0.30s (fast duration) as it crosses the viewport threshold.

## Footer Approach

The footer arrives inside its squircle capsule — a large, heavily rounded light container floating on the dark background of the preceding conversion section. The capsule itself does not animate; only the drip boundary above it moves. Inside the footer, no element-level animations are present: column links are already resolved. The closing gesture is architectural rather than choreographic — the container's presence as a bounded form on the dark ground is the design event, not a sequence of reveals. The copyright line at the base of the capsule is the page's quietest moment.

## Motion Principles

The motion vocabulary is built on a single principle: directional entry, never rotational or scalar for content. All scroll-reveal animations use `translateY` (20px range upward) or `translateX` (40px range inward) — never scale, never rotate for structural content. The `cubic-bezier(0.4, 0, 0.2, 1)` standard easing handles most content reveals; the decelerate curve `cubic-bezier(0, 0, 0.2, 1)` governs fast micro-interactions (0.30s); the spring curve `cubic-bezier(0, 0.4, 0.4, 2)` is reserved for the nav transition and the liquid-drip boundary movement. The ×1.5 timing scale across all durations (fast=0.30s, base=0.45s, slow=0.75s, xslow=1.05s) produces pacing that reads as considered rather than urgent — the product is communicating precision, not excitement. Hover interactions across all links and nav elements fade to 0.75 opacity rather than amplifying through color change alone — a subduing gesture that signals presence without performing it.

## Video Placements

**1. Split Media-Text Feature Section — Data Collection Loop**
- Suggested file: `feature-data-collection-loop.mp4`
- Subject: A product interface inside a squircle-framed container showing form fields or survey configuration being set up — a cursor navigating input elements, selecting options, configuring collection parameters; the interface should be clean and light-mode, matching the section's background; neutral light on white surfaces; no faces; precise, intentional cursor movement without hurry
- Duration: 5s loop
- Why video: The feature section about collecting data is the product's primary value proposition. A looping screen recording inside the squircle frame communicates the product's real-time, interactive quality in a way a static screenshot cannot — the cursor moving through the interface demonstrates ease-of-use and product responsiveness at a glance, while the squircle containment maintains the section's visual language.

**2. Split Media-Text Feature Section — Analysis Output Loop**
- Suggested file: `feature-analysis-output-loop.mp4`
- Subject: A dashboard or results interface progressively rendering — charts populating, data rows appearing, percentage values counting upward; the motion should be smooth and deliberate, not animated in a flashy way; dark panel or card elements on a slightly darker background than the page surface; no people, no logos; the data should feel real and structured, not playful
- Duration: 5s loop
- Why video: The analysis output section is where the product justifies its value — showing results, not just collecting input. A looping animation of data resolving communicates analytical capability in real time. Static dashboards read as finished states; the progressive render communicates the system actively working, which is closer to the actual product experience.

**3. CTA Section — Ambient Background**
- Suggested file: `cta-ambient-bg.mp4`
- Subject: An abstract, near-imperceptible dark gradient field in slow drift — the near-charcoal tones of `#1a1a18` to `#3d3a34` shifting almost imperceptibly across the frame; no objects, no shapes, no directional light sources; the motion should be so slow it reads as barely alive rather than actively animating; 10s loop
- Duration: 10s loop
- Why video: The full-width dark CTA section is the page's single cinematic beat — the one moment where the light-field logic suspends and a different register takes over. A barely-perceptible ambient video in the dark background adds a sense of depth and atmospheric presence that a flat solid color cannot provide, without competing with the headline and CTA that occupy the foreground. The motion, if noticed at all, should feel like heat shimmer rather than animation.
