# Motion Brief — Spun Vellum

## Scroll Opening

The page arrives quietly. No loading animation. The hero image is present before the user's eye has settled — a full-bleed photograph already in place, no reveal mechanism required. The first motion is the nav fading in at low opacity, settling to full presence over 1.3s using the primary easing curve. The announcement bar slides down from the top edge with a 0.52s ease-out, establishing the top chrome before any scroll has occurred. The effect is of waking into a scene rather than watching one assemble.

## Hero Experience

The hero is a held breath. Typography enters from the center of the composition — display-scale letterforms materializing at 0% opacity and arriving at full presence in a single unhurried curve over 1.56s. No slide. No blur. Purely tonal, like a photograph developing. The hero should carry a video background for any deployment that can support it: a slow drift across a landscape at the hour when light is still uncertain — pre-dawn or late dusk, 10 seconds, looping without a visible cut point. The subject should be peripheral: edge of a field, texture of weathered material, movement of something small and deliberate. The video serves not as content but as time — it marks the difference between a still image and a living surface.

**Hero background video candidate:** `hero-bg.mp4` — slow cinematic drift over a surface with tonal warmth and natural texture. The motion should be 3–5% frame per second lateral or vertical movement, barely perceptible. 10s loop, no audio.

## Section Transitions

Sections transition through tonal shift, not animation. Each section background change (cream → photography → olive-warm → cream) is a hard edge — no dissolve, no fade. The visual drama is the contrast itself. What moves between sections is the user's attention, not the page. At scroll trigger (80% viewport threshold), content within the incoming section begins its entrance: the heading resolves from opacity 0 to 1 over 0.78s, the body copy follows 0.13s later, and the CTA last at 0.26s offset. The stagger is tight — not a cascade but a sequence of breath.

## Content Rhythm

Individual elements enter with restraint. The principle is: one element at a time, barely. Headings arrive first, settling into their typographic weight (800) before the eye has time to anticipate the body copy. Body copy fades up after a 130ms delay. Cards in grid sections stagger at 65ms intervals — enough to give the eye a path without becoming decorative. The motion system's 1.3× scaling ensures nothing feels rushed; each entrance completes fully before attention moves on. No horizontal slides. No transform-based arrivals. Only opacity, with the single exception of the shadow-card component which uses a brief translateY(-4px) over 1.56s to suggest a settling of mass.

## Footer Approach

The footer enters from below the scroll fold as a complete unit — no internal stagger. The warm olive background is present the moment the footer crosses the viewport threshold. The typographic link column, which uses display-scale type, resolves opacity over 0.65s as the user arrives. The newsletter CTA and social links appear together, 0.26s after the primary type column. The footer should feel like the end of a chapter: it is already there, waiting, complete.

## Motion Principles

The timing philosophy is **languid with precision**. Every duration has been scaled 1.3× from the source system (flayks), producing a tempo closer to the natural pace of a considered reader than of a product demo. This is not slow for slowness' sake — the 0.39s dot transitions and the 0.52s card transitions are still crisp. But the 1.3s logo and nav transitions, the 2.6s icon transforms, the 78s ambient rotation: these operate at human scale, not interface scale. The easing vocabulary is dominated by `cubic-bezier(0.76, 0, 0.24, 1)` for primary transitions (a controlled ease-in-out with deliberate deceleration) and `cubic-bezier(0.165, 0.84, 0.44, 1)` for secondary elements (a sharper ease-out quart that communicates decisiveness without snappiness).

The motion system should never draw attention to itself. When it works, the user is aware only of content arriving at the right moment, not of animation executing.

## Video Placements

**Placement 1: Hero Background**
- Section role: hero
- Filename: `hero-bg.mp4`
- Subject: slow cinematic drift across a textured natural surface — stone, aged wood, or dense vegetation — during transitional light (pre-dawn or late afternoon). The camera moves laterally at approximately walking pace but slowed to 10% of that speed. The image should be overexposed slightly in one register and correctly exposed in another, creating tonal depth. No identifiable human subject, no focal object.
- Duration: 10s loop, imperceptible seam
- Why video serves this section: The hero is required to establish a sense of temporal presence — the feeling that this brand exists in a specific material world with specific atmospheric conditions. A still image can suggest this, but only video can prove it. The slow drift confirms that the scene is real, inhabited, and unhurried. The landing page's color register (pure white page background, near-black text) would otherwise feel clinical without this grounding. Video anchors the brand in physicality before the interface makes any product claims.

**Placement 2: Split Feature — Product Environment**
- Section role: product showcase / split asymmetric feature (Pattern 3 context)
- Filename: `product-ambient.mp4`
- Subject: close-up, macro drift across the surface of the product or its immediate environment. The subject should be specific enough to suggest the product category without needing to be identified — texture of a material, edge of a form, reflection in a surface. 5-second loop. Motion should be a slow pull-back or push-in along a single axis.
- Duration: 5s loop
- Why video serves this section: The split feature section establishes product credibility through visual evidence. A static photograph shows the object; a slow ambient video shows the object existing in time — it has weight, it occupies space, it is not a render. The 5s loop is deliberately short because the section's content is structured (tab navigation, body copy, CTA) and the video operates as ambient texture behind the product panel, not as the primary subject.

**Placement 3: Testimonial Transition — Editorial Pause**
- Section role: editorial pause / section background between testimonials and footer
- Filename: `studio-interior.mp4`
- Subject: a slow environmental interior — workshop, studio, or archival space. Low key. A single source of directional light. Movement should be micro: the edge of a shadow shifting as the light source moves, or the texture of a surface revealed by a slow camera pan. No people. 10s loop.
- Duration: 10s loop
- Why video serves this section: The editorial pause section (Pattern 2 — full-width centered editorial) is currently the most static moment in the page. A centered text phrase on a solid cream field is powerful but risks feeling like a loading state if held too long. A video background operating at extreme opacity (approximately 8–12% over the cream field, barely visible) introduces temporal quality without disrupting the typographic purity. The user will not consciously perceive the video as video — only as a surface that seems to have depth. This is the distinction between a printed page and a lit page.
