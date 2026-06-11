# strata-drift — Concept by Video

## Motion Identity

The site's motion is geological and physical — layers separate under scroll pressure, elements drift in ambient atmospheric motion, and the overall feel is of navigating through a three-dimensional depth environment, not reading a flat page.

## Opening Scroll Behavior

On initial load, three background layers are already in position. As the user begins scrolling:
- Background layer (large circular field, #1a1d2e) moves at 20% of scroll speed — it barely moves, establishing the ground plane
- Mid layer (blob shape, #1e2340) moves at 10% — moderate drift, feels like fog or atmosphere
- Foreground layer (geometric lines) moves at 3% — nearly locked to the viewer, confirming they occupy this layer
- Text content moves at 0% — pure depth anchor, the viewer stands in this plane

The visual result: the layers peel apart as if the viewer is descending through strata.

## Hero Entry Animation

On page load (not scroll-triggered):
- Background circular element drifts slowly into position (gsap.from, y: 30, opacity: 0, duration 1.5, ease power2.out)
- Mid blob resolves slightly later (delay 0.3s)
- Foreground geometric lines last (delay 0.5s)
- Hero text block fades up with stagger (delay 0.6s)

The effect: depth materializes from the background forward, as if the layers are assembling themselves.

## Section Reveals

As sections enter the viewport:
- Feature cards reveal with staggered upward movement (y: 40 → 0, opacity 0 → 1, stagger 0.15s)
- Stats numbers count up from 0 (CountUp.js or GSAP numeric tween)
- How-it-works steps reveal sequentially left-to-right
- Decorative geometric shapes in each section float continuously in CSS (not scroll-triggered)

## Ambient Depth Atmosphere

Throughout all sections, decorative layer elements run continuous CSS float animations:
- Background circle: float-slow 8s ease-in-out infinite (±10px, slight rotation)
- Mid blob: float-drift 10s ease-in-out infinite (±8px with X drift)
- Accent elements: float 4s ease-in-out infinite (±6px, clean Y-only)

These ambient motions maintain the physical depth environment even when no scrolling occurs.

## Hover Depth Activation

Feature cards respond to hover with a precise z-elevation:
- Transform: scale(1.04) translateY(-4px) — the card rises toward the viewer's plane
- Box-shadow glow expands — purple light radiates from the activated depth plane
- Transition 0.3s ease-out — smooth approach, not springy

Buttons respond with subtle lift + glow intensification. Navigation links respond with color plane shift (lavender → white).

## Navigation Depth Layer

The nav transitions between two depth states:
- Default: fully transparent — invisible, letting the parallax layers read unobstructed
- Scrolled: rgba(15,17,23,0.85) + backdrop-filter:blur(20px) — a frosted glass plate materializes, establishing the nav as its own depth plane above the content

The glass blur effect creates a physical separation between the nav depth layer and the content below it — you can see through it, but it is clearly above.

## Product Demo Placement

In the hero section: an ambient depth loop video showing cloud infrastructure topology rendered as depth layers — color-coded strata showing compute, network, application planes. The video is positioned as a mid-layer element in the parallax stack, so it drifts at mid-ground speed as users scroll. Product context: the Strata visualization tool showing its core cloud infrastructure layer mapping capability.
