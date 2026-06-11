# Motion Brief: Quartz Ledger — Creative Director's Guide

## Scroll Opening

The page opens into a white field. The navigation is already present — a centered logo between tracked nav links, not animated into existence but discovered. Below it, the hero content arrives as a single synchronous event: no cascade, no stagger, no progressive disclosure. Content materializes at full opacity with a 24px upward drift over 0.9s, using the AOS `fade-up` pattern that governs this system's scroll vocabulary. The easing is standard `ease` — a controlled decelerate that arrives and stops without apology. The opening is not a performance; it is a fact.

## Hero Experience

The hero occupies the full viewport as a white, open zone with significant vertical breathing room (144px top and bottom). The headline at Inter 600 weight with 0.06em tracking resolves from opacity 0 with a subdued upward drift. The yellow CTA (#ffdb01) is the single chromatic event in the white field — it arrives last, a beat after the headline and body, commanding full attention by contrast of timing as much as by contrast of hue. This section is a **video background candidate**: the clean white field and achromatic discipline suit a slow drift across a matte surface — cut paper, unprinted newsprint, a bleached linen flat — lit from a single overhead diffuse source. The material carries the weight that the color system withholds.

**Video candidate — hero-surface.mp4:** A slow drift across an unprinted paper surface — heavyweight cartridge stock, matte white, with visible tooth — lit from a diffuse overhead source that reveals texture without shadow drama. Motion quality: imperceptible lateral translation, no rotation, no subject change. Duration: 10s loop. Mood: material intelligence, restraint, latent possibility.

## Section Transitions

Transitions between sections operate through content arrival, not background color change — the white palette holds throughout. Each section's content block enters the viewport and resolves from opacity 0 and `translateY(20px)` over 0.9s at standard `ease`. Content lands. Cards enter with the same duration but with a 150ms stagger per item — below the threshold of choreography, above the threshold of simultaneity. The grid arrives as a composition, not as a sequence.

Heading and body text pairs enter as a single unit — no headline-first then body. The composition is the unit of animation. Elements that belong together arrive together.

## Content Rhythm

Individual elements within sections are treated as coequal units except where hierarchy is deliberately imposed. The primary rhythm: full-section fade on scroll enter, with a mild stagger only for grid and card groupings. The stagger increment is 150ms — consistent with the AOS delay tokens in the motion system. The system never narrates its own assembly.

At the masonry grid sections, images arrive in column order rather than row order — a reading sequence that follows the visual logic of how the eye travels a grid column before crossing to the next. The compressed gutter (29.376px) means items land in close proximity; the animation should reinforce this tightness rather than spreading them open.

## Footer Approach

The footer resolves from opacity 0 over 0.9s as it crosses the viewport threshold — the same fade-up gesture that governs the rest of the page. No special closing choreography. If the brand wordmark is in the footer, a hover opacity shift (0.8, 0.45s transition) is the only kinetic acknowledgment. The page ends the same way it began: by being present, not by performing.

## Motion Principles

The timing philosophy is **measured and resolved** — unhurried but never sluggish. Durations center on 0.9s for content reveals (scaled ×1.5 from the source system's 0.6s), 0.45s for button and link interactions, 0.3s for nav and header transitions. The primary easing is standard `ease` — a smooth decelerate that communicates inevitability rather than drama. The 0.45s button transition (scaled from 0.3s) reinforces this register: the interface responds without rushing. The system has time. Color does not animate. The white field is a fixed condition, not a state. The yellow CTA never pulses, never glows — it is simply present, unmistakably.

## Video Placements

**1. hero-surface.mp4**
- Section role: Full-viewport hero background, furthest depth layer beneath headline content
- Subject: Slow lateral drift across heavyweight paper stock — cartridge white, unprinted, with visible surface tooth — lit from diffuse overhead source, revealing texture without directional shadow. No human presence, no branded content.
- Motion quality: Imperceptible lateral translation, no camera rotation, 0.5× playback speed from original capture, no visible loop point
- Duration: 10s loop
- Why video: The hero's achromatic white field reads as clinical when static; a living paper surface gives the palette material warmth — the physical anchor that the black-and-white color system deliberately withholds from color but delivers through texture. The specular behavior of paper tooth under diffuse light creates a slow, breathing quality that no still image can replicate.

**2. work-ambient.mp4**
- Section role: Portfolio / work showcase section — the full-bleed background of a featured work section, or the right-hand media zone in an asymmetric split
- Subject: A slow drift across a printed surface — crisp-edged type on uncoated stock, a compositor's proof sheet, or a printed register grid — shot with soft window light at a low angle to reveal the surface relief of the ink impression against the paper
- Motion quality: Very slow horizontal drift, 20–30 second movement across frame compressed to 5s loop, slightly underexposed at the leading edge to preserve the white-field continuity of the surrounding layout
- Duration: 5s loop
- Why video: The work showcase zone is where the brand's output is placed before the audience. A living printed surface in the media zone adds material weight at the moment of highest stakes — and grounds the system's high-contrast typographic logic in physical production, where letters have weight and paper has tooth.

**3. editorial-detail.mp4**
- Section role: Split editorial section — the right-hand image zone in the personal or about narrative section
- Subject: An extreme close-up of a typeset page or printed proof — Inter at large scale, freshly printed on matte stock — with a single point light source creating a slow focus rack from the paper texture in the foreground to the sharp letter forms behind (5s for a full cycle), no camera movement
- Motion quality: Static camera, slow focus rack, the paper grain occupying the first 2s in soft focus before the letterforms resolve with precision; the yellow CTA color appears briefly as a color reference card in the edge of frame, then exits
- Duration: 5s loop
- Why video: The editorial section is the system's most direct human moment — the place where the brand names itself and its intent. A focus rack on a printed page provides temporal depth without horizontal motion that would disrupt the flat, rectilinear layout language. The shift from texture to letters is an enacted metaphor for this design system's entire logic: from material surface to structured meaning.
