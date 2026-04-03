# Motion Direction Brief

## Scroll Opening

The page load begins in darkness. For the first 400ms, the viewport holds pure black — no navigation, no announcement bar, no content. Then the hero video resolves in from zero opacity over 600ms using an ease-out curve, not a linear fade. The navigation chrome (transparent background, white labels) materializes simultaneously with the video, never appearing before it. The announcement bar slides down from above the viewport edge 200ms after the nav appears, entering at reduced opacity and reaching full presence over 300ms. This sequence ensures the very first perceptible motion is the video — the editorial statement — not the UI scaffolding around it. The total page-load reveal takes no longer than 1.2 seconds from first paint to full operational state. No skeleton screens, no loading spinners — the darkness is intentional and must be held.

## Hero Experience

The hero is a full-viewport video background candidate. The video should be a single continuous ambient shot — slow lateral drift across an interior space, natural daylight entering at a low angle, objects in the foreground slightly out of focus while mid-ground pieces resolve with clarity. The camera movement should feel hand-guided rather than on a motorized rig: an almost imperceptible micro-wobble at the edges of the pan, suggesting presence rather than apparatus. Suggested asset filename: `hero-ambient.mp4`. Duration: 10 seconds, looped with a cross-dissolve join point placed at a moment of minimal movement to make the loop invisible. The play/pause control must remain accessible at lower-left at all times; its appearance should match the near-black palette — no intrusive icon, no bright affordance. The video surface alone must communicate the design register before a single word is read.

## Section Transitions

Section-to-section transitions operate through background color displacement, not animated dividers or parallax skewing. As the user scrolls, the outgoing section's bottom edge acts as a clean shutter — no easing, no fade between sections, just the hard horizontal cut that characterizes the layout grammar. However, the incoming section's primary content (hero image or editorial text block) initiates a translate-Y reveal: it begins 24px below its final resting position and arrives at zero translate over 480ms with a cubic-bezier ease-out (0.25, 0.46, 0.45, 0.94). This gives each section the sensation of emerging from below the cut rather than simply being unveiled. The background surface itself does not animate — only the content layer inside the incoming section moves. This preserves the structural sharpness of the cuts while adding a single layer of weight to the content's arrival.

## Content Rhythm

Within each two-column editorial section, elements enter the viewport in a two-beat stagger. The image column resolves first — a fade from 0 to 1 opacity over 400ms with no transform, anchored and immediate. Then, 120ms after the image initiates, the text column begins its entry: the eyebrow label appears first, followed 80ms later by the headline, followed 80ms after that by the body paragraph and CTA link. Each text element uses a translate-Y of 16px at entry, easing to zero. The stagger should feel like a single breath, not a cascade — the total time from first element to last element landing should not exceed 700ms. Category browse strips use simultaneous entry for all columns: they arrive together, no item-level stagger, because the section's grammar is equivalence rather than hierarchy.

## Footer Approach

The pre-footer utility band should enter on a delayed threshold: it becomes active only after 90% of the band is visible in the viewport, rather than the standard 75%. The band's content fades in at 0.4s, no transform. The footer itself uses no entry animation — it is already present, fixed in place at the bottom of the document. The scroll-up arrow in the pre-footer band uses a subtle vertical bounce loop: a 3px translate-Y up and back over 1.2 seconds, ease-in-out, infinite, beginning only after the band has fully entered. The bounce is the single kinetic element in an otherwise static footer zone, and its restraint is the point — it marks the end of the scroll journey without competing with the content above it.

## Motion Principles

The governing tempo of this system is languid but not slow. Durations sit in the 400–600ms range for primary reveals; 200–300ms for secondary and supporting elements. No animation in this system should feel mechanical or spring-based — there are no overshoots, no bounces on content entry. Easing curves are consistently cubic-bezier ease-out on entry and ease-in on exit, mimicking the behavior of objects with natural mass settling into position. The overall scroll experience should feel like turning the pages of a very well-made book: each section arrives with purpose and weight, nothing slides in from unexpected angles, nothing flickers or pulses for attention. Motion here is architecture, not decoration.

## Video Placements

**Placement 1 — Hero Background**
- Section role: Full-viewport hero, above the fold
- Suggested asset filename: `hero-ambient.mp4`
- Content: Slow lateral drift across a warm interior space. Morning light from a large window at frame-left. One statement object in sharp focus at mid-frame, surrounding elements soft. No people, no movement except the camera itself and the slow shift of light on surfaces.
- Motion quality: Slow drift — near-imperceptible lateral pan, handheld micro-wobble
- Duration: 10 seconds — the narrative build of the opening page-load justifies the longer loop
- Why video over still: A still image can communicate the objects; only video can communicate the atmosphere that makes those objects feel alive. The ambient light shift across a 10-second loop gives the opening the sensation of time passing — something a photograph cannot deliver, and something that positioning around living with design specifically requires.

**Placement 2 — Editorial Product Detail Section (terracotta variant)**
- Section role: Mid-page editorial product storytelling section
- Suggested asset filename: `editorial-object-detail.mp4`
- Content: Macro shot of a single product piece — a lamp, textile, or ceramic object — with the camera tracking infinitesimally slowly across the object's surface. The focus plane moves as the camera moves, revealing material texture in sequence: finish surface, then structural edge, then the inner geometry of the form. The background is a flat warm terracotta matching the palette.
- Motion quality: Macro drift — motorized slider at 1–2mm/second, clinical yet sensory
- Duration: 5 seconds — the loop is tight because the section is a pause, not an opening
- Why video over still: The design system's material shift principle — the palette reads as physical substances (ceramic, cast iron, beeswax) — demands that at least one section demonstrate materiality in actual motion. A still product shot can only imply texture; a slow macro drift across the surface makes texture an active visual event.

**Placement 3 — Two-Column Equal-Media Split (lifestyle paired panels)**
- Section role: Lifestyle storytelling, mid-page visual pacing section
- Suggested asset filename: `lifestyle-interior-right.mp4`
- Content: Right-hand panel only uses video. A warmly furnished domestic interior, late afternoon. A person moves through the frame — not a model walk, but an ordinary action: setting something down on a table, adjusting a curtain. The movement is incidental, occupying perhaps 20% of the video duration. The remaining 80% of the loop is near-static: just the room, the furniture, the ambient light.
- Motion quality: Handheld stillness — the camera is on a tripod but the recording captures the organic micro-movements of a room: dust motes, curtain sway, the slight movement of plant leaves near a heat source
- Duration: 5 seconds — the paired-panel structure means the right-panel video reads against a static left-panel photograph, and the contrast between moving and still across the horizontal cut is the visual argument
- Why video over still: The left panel is a static photograph; placing video in the right panel makes the horizontal split legible as a distinction between document (left, still, archival) and experience (right, moving, present). The contrast does not need to be dramatic — even the slowest drift of curtain fabric makes the difference between these two registers immediately felt.
