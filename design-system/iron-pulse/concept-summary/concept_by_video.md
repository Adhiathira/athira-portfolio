# Motion Brief: Iron Pulse — Creative Director's Guide

## Scroll Opening

The page opens without ceremony into a near-black field. The navigation appears at full opacity — already present, not assembled. Below it, content materializes in a single synchronous event: no stagger, no cascade, no progressive disclosure. This is not a loading sequence; it is an arrival. The grid or hero element is a fact, not a performance. Easing favors the mechanical decelerate curve — `cubic-bezier(0.76, 0, 0.24, 1)` — which makes the entrance feel like a shutter opening rather than a drift into frame.

## Hero Experience

The hero occupies the full viewport as a dark, immersive zone. The near-black (`#080a0f`) page background becomes the canvas, with a teal-blue ambient glow (`#0a1a2e`) in the lower periphery suggesting depth and atmosphere without naming a subject. Content — headline at Inter 800 weight, body, CTA — resolves from opacity 0 with a 24px upward drift over 0.8s, using `cubic-bezier(0.76, 0, 0.24, 1)`. The movement is assertive, not gentle. This section is a **video background candidate**: the deep space quality of the color palette suits a slow macro drift across a dark industrial surface — oxidized steel, carbon fiber weave, or anodized aluminum — lit from one directional source. The blue-teal ambient in the hero palette maps directly to the cool tonal cast of metalworking light.

**Video candidate — hero-surface.mp4:** A slow drift across a dark metallic surface — brushed steel or anodized titanium — with a single directional light source creating a moving specular highlight. Motion quality: imperceptible lateral translation, no camera rotation, no subject change. Duration: 10s loop. Mood: precision, material intelligence, controlled energy.

## Section Transitions

Transitions between sections are governed by scroll position, not triggered by discrete events. The near-black palette holds across all sections, so transitions do not operate through background color change — they operate through content arrival. Each section's content block enters the viewport and resolves from opacity 0 and `translateY(16px)` over 0.7s at `cubic-bezier(0.76, 0, 0.24, 1)`. The mechanical decelerate curve is the governing easing choice: content lands, does not float. There is no bounce, no spring undershoot, no elastic tail.

Card entries use the spring overshoot curve (`cubic-bezier(0.34, 1.56, 0.64, 1)`) with a controlled 0.6s duration and 0.1s stagger per card — the one moment in the system where restraint is traded for kinetic precision. The effect: cards settle into position with a brief, exact overshoot, as if placed by a machine rather than drifted by an animation.

## Content Rhythm

Individual elements within sections are treated as coequal units except where hierarchy is deliberately imposed. The primary rhythm pattern is: full-section opacity reveal on scroll enter, followed by a mild internal stagger only for grid or card groupings. The stagger increment is 0.1s — below the threshold of conscious choreography, above the threshold of perceived simultaneity. The governing principle: elements arrive as a composition, not as a sequence. The system should never feel like it is narrating its own assembly.

Heading + body text pairs enter as a single unit — no headline-first then body. This applies in asymmetric splits and editorial sections alike. The composition is the unit of animation, not the component.

## Footer Approach

The footer resolves from opacity 0 over 0.9s as it crosses the viewport threshold — the same reveal gesture that governs the rest of the page. No special treatment, no closing choreography. The footer is a utility zone. If the brand wordmark is present in the footer, a subtle underline expansion on hover (0.3s, `cubic-bezier(0.4, 0, 0.2, 1)`) is the only kinetic acknowledgment of the terminal position. The page ends the same way it began: by being present, not by performing.

## Motion Principles

The timing philosophy is **mechanical and resolute** — not snappy, not languid, but purposeful. Durations center on 0.7s for content reveals, 0.4s for nav and utility interactions, 0.2s for micro-interactions. The primary easing is `cubic-bezier(0.76, 0, 0.24, 1)` — a dramatic decelerate that arrives with authority and stops without apology. The spring curve (`cubic-bezier(0.34, 1.56, 0.64, 1)`) is reserved exclusively for card group entries — one controlled departure from the system's flat mechanical resolve, used to give the grid life without abandoning precision. The 0.45s hover transition (extended by the languid Twist A from interaction-states) reinforces this unhurried mechanical register: the interface responds to input without rushing.

Color does not animate. The near-black palette is a fixed condition, not a state. Scroll does not interpolate background hues. The iridescent accent palette (`#4a9eff` blue, `#ff6b35` warm orange, `#00d4aa` teal) appears only in surface accents or data highlights — never as animated gradients.

## Video Placements

**1. hero-surface.mp4**
- Section role: Full-viewport hero background, furthest depth layer beneath headline content
- Subject: Slow lateral drift across a dark brushed-steel or anodized-titanium surface, single directional light source, moving specular highlight tracking the drift
- Motion quality: Imperceptible lateral translation, no camera rotation, micro-handheld texture at 0.5× playback speed of original capture, no cut point within loop
- Duration: 10s loop
- Why video: The hero's deep-space color field (`#080a0f` to `#0a1a2e`) reads as atmospheric when static; the living surface gives the palette a physical anchor — material intelligence rather than color theory. The specular drift reinforces the iridescent accent logic of the brand system.

**2. work-ambient.mp4**
- Section role: Portfolio or work showcase section — the right-hand media zone in an asymmetric split, or the full-bleed background of a featured project section
- Subject: A slow drift across an architectural detail or fabricated surface — concrete texture, steel plate with welded seams, or glass with internal structure — shot with available directional light, no human presence
- Motion quality: Very slow drift, 20–30 second movement across frame compressed to 5s loop, slightly underexposed at edges to complement the dark palette
- Duration: 5s loop
- Why video: The work showcase zone is the highest-stakes content section — the moment where the brand's output is placed before the audience. A living background in the media zone adds atmospheric weight that a static image cannot provide at dark-palette contrast levels, where a still image can read as flat or underexposed.

**3. about-precision.mp4**
- Section role: Split editorial section — the right-hand image zone in the personal or studio narrative section
- Subject: An extreme close-up of a precision instrument or fabricated component — a watch movement, a machined aluminum part, a circuit board — with a single point light source, very slow focus rack from near to far (5s for a full cycle) with no camera movement
- Motion quality: Static camera, slow focus rack, subject entirely dark with bright specular highlights at sharp points — jewel-like quality
- Duration: 5s loop
- Why video: The editorial split section is the system's most direct human moment. A focus rack on a precision object provides temporal depth without introducing motion that would disrupt the flat, rectilinear design language — it deepens the frame without moving it.
