# Motion Brief — Ochre Signal

## Scroll Opening

The page loads into quiet presence. The hero background — terrain grid and ghost letterforms — is already in place before the user's eye has time to register it; what resolves is the foreground content, lifting out of opacity over 0.9s with a gentle 4px upward drift. The motion system's cubic-bezier (`0.44, 0, 0.56, 1`) holds the entrance in a composed, slightly deliberate cadence — not announcing itself, simply clarifying. The easing mirrors the quality of the color system: warm, unhurried, nothing overplayed.

## Hero Experience

The hero is the warmest visual moment — the cream ground, the charcoal type, and the single orange CTA form the design's emotional peak before the interface settles into cooler structural content. For ambient video, the hero background is the prime candidate: a slow surface drift across natural warm material — waxed cotton, natural beeswax, or a flat-pressed flax fiber — shot at near-macro distance, with side-lit warmth that echoes `#f2efe9` in its tonal temperature. The video sits furthest back in the composition, behind the ghost letterforms and the editorial content stack, and must carry texture across time rather than movement. Duration: 10s loop.

Foreground content enters in a cascading sequence: headline resolves first, then body copy, then the CTA pair — each delayed by 0.1s. The orange CTA button lands last, a deliberate final beat that directs the eye toward action after the editorial content has been received.

## Section Transitions

Transitions between sections are scroll-driven rather than event-driven. As the user moves from the hero into the asymmetric feature splits, the warm monochromatic ground persists — there is no color event at section breaks, only spacing rhythm and content density changing. Content enters from slight vertical offsets (4px translateY, 0.34s duration at the assembled 0.26s × 1.3 scale) as it crosses the scroll threshold. Left-column headings resolve slightly before right-column content, reinforcing the asymmetric compositional reading direction.

## Content Rhythm

Cards in the feature grid enter with a stagger pattern — each card delayed by 0.1s relative to its neighbor, reading left to right. This transforms a simultaneous reveal into a horizontal cascade that traces the scanning direction. At the assembled timing (0.26s base), the spread across three cards is subtle: a 0.2s total distribution, enough to imply sequence without announcing choreography.

Accordion rows in the FAQ section expand with height at 0.26s, eased with the primary curve — efficient, mechanical, appropriate to the utility of the interaction.

## Footer Approach

The footer enters without drama. The three-column structure resolves at opacity 0→1 over 0.9s as the section crosses the viewport threshold — the same entrance used throughout. The footer is continuation, not conclusion; it shares the warm cream ground with the rest of the page and reads as one final section, not a separate zone. No closing animation, no celebratory gesture.

## Motion Principles

The timing philosophy is **measured and warm** — deliberate without being languid, resolved without being snappy. The 0.26s base duration (scaled slightly above the superlist source's 0.2s to allow more physical presence) keeps interactions from feeling hurried while matching the unhurried material character of the color system. The stagger system uses 0.1s per element — used selectively, giving group reveals a sequential logic. Motion operates only on position, opacity, and timing. Color is stationary: the orange accent does not pulse, shimmer, or animate — it earns its presence by being still in a moving context.

## Video Placements

**1. Hero background — `hero-bg.mp4`**
- Section role: hero (full-bleed background, furthest depth layer, behind ghost letterforms)
- Subject: slow surface drift across warm natural material — flat-pressed linen or waxed cotton, shot at near-macro distance; side-lit from left with warm daylight, transitioning imperceptibly across the frame from warmer amber on the left to slightly cooler ivory on the right, echoing the tonal temperature shift encoded in the warm cream ground
- Motion quality: imperceptible micro-drift, essentially still — the camera barely moves, the material's texture breathing rather than traveling
- Duration: 10s loop
- Why video: the three-layer hero (terrain + ghost type + foreground) requires the deepest layer to carry atmospheric weight over time. A still cream fill reads as a color choice; a living cream surface reads as a material environment. The warmth of the background becomes something the user feels rather than names.

**2. Feature showcase — `feature-product.mp4`**
- Section role: mid-page narrative CTA band (the section using a browser-frame product mockup as its primary media)
- Subject: a clean product interface — the software or tool being positioned — scrolling slowly through its own UI states, framed within the browser chrome; shot from slightly above at a shallow angle, warm ambient light from the left consistent with the hero temperature
- Motion quality: slow mechanical scroll, 2–3 interface states cycling at measured pace; no human hand, no cursor motion — the product moves itself, with the quiet confidence of a well-made thing demonstrating its own capability
- Duration: 8s loop
- Why video: the browser mockup transforms from a static promotional claim into a working artifact when it moves. In this system, where all color restraint is maintained and the orange CTA is the only saturated accent, the product itself must do the demonstrating — a looping UI gives it temporal weight that a screenshot cannot.

**3. Services ambient — `material-detail.mp4`**
- Section role: asymmetric feature split sections (the highest information density zone mid-page, left-column heading + right-column body copy pairs)
- Subject: abstract light passing through a fine woven or pressed fiber surface — rice paper, or thin linen mesh — at very slow speed; warm side-lit, the material's texture reading as topography at this scale; no identifiable object, purely surface and light quality
- Motion quality: very slow lateral drift, defocused background, the fiber weave registering as a luminous field rather than a technical subject
- Duration: 5s loop
- Why video: the asymmetric split sections carry the interface's highest information density. A background ambient video placed in the left-column large-heading zone — restrained, non-competitive with the text — activates the compositional breathing room rather than filling it. The fiber surface connects visually to the warm material vocabulary of the color system, reinforcing the brand's craft positioning without adding a photographic figure or narrative subject.
