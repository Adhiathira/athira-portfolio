# Motion Brief: Pale Current

## Scroll Opening

The page loads into near-stillness. The hero background — layered terrain and ghost letterforms — is already present, not animated in; the first movement belongs to the foreground content stack, which resolves out of opacity over 0.9s with a gentle upward drift of 4px. The effect reads less as an entrance and more as a clarification — the page was always there, and now it becomes legible. No bounce, no spring; the motion system's primary easing (`cubic-bezier(0.45, 0, 0.55, 1)`) holds everything in a composed, non-mechanical cadence.

## Hero Experience

The hero is the page's warmest visual moment — the bicolor gradient field (`#6b2a24` → `#1a3040`) and the three depth layers (terrain, ghost type, foreground content) make it the most dimensional zone on the page. For ambient video, the hero background is the prime candidate: a slow atmospheric drift across a textured surface, lit with the same warm-to-cool temperature shift that the gradient encodes. Suggested subject: embers or heated metal cooling, shot at macro distance, 10s loop — the warmth of the left gradient gradually transitioning to the cooler register of the right. The video sits furthest back in the composition, behind the ghost letterforms and the editorial content stack, so it must carry texture rather than movement — nothing that competes with the foreground hierarchy.

The foreground content animates in on the ChapterNav stagger cadence (0.1s increments per element), but here applied to the headline, body, and CTA cluster in sequence. The headline resolves first, then body, then CTA pair — a cascading declaration rather than a simultaneous reveal.

## Section Transitions

Transitions between sections are scroll-driven, not event-driven. As the user moves from the hero into the asymmetric feature splits, the warm gradient gives way to the cool monochromatic dark palette — a tonal transition that happens in the background layer without any explicit animation. No cross-fades, no wipes. The change is atmospheric: the temperature of the page cools as the user descends into structural content.

Within feature sections, content enters from slight vertical offsets (4px translateY, 0.7s duration) as it crosses the scroll threshold. The stagger system from the motion tokens applies: left-column headings resolve 0.1s before right-column content, reinforcing the compositional reading direction.

## Content Rhythm

Cards in the feature grid enter with the ChapterNav stagger pattern — each card delayed by 0.1s relative to its neighbor, reading left to right. This transforms a simultaneous group reveal into a horizontal cascade that traces the scanning direction. The effect is subtle at intensity 3: 0.3s total spread across three cards, enough to imply sequence without announcing itself.

Accordion rows in the FAQ section animate on open/close with height expansion at 0.3s, eased with the nav curve (`cubic-bezier(0.4, 0, 0.6, 1)`) — efficient, mechanical, appropriate for a utility interaction.

## Footer Approach

The footer enters without drama. Logo and column headings resolve at opacity 0→1 over 0.9s as the section crosses the viewport threshold — the same entrance curve used throughout, consistent to the last element. No celebratory closing animation. The footer is a utility zone and its motion should reflect that: present when needed, invisible as a mechanism.

## Motion Principles

The timing philosophy is **composed and unhurried** — neither snappy nor languid, but measured. The 0.32s base duration and the primary easing keep interactions from feeling sticky while avoiding the abruptness that snappy systems carry. The stagger system (0.1s per step, up to 14 steps at 1.3s total) is the most expressive motion gesture in the system — used selectively, it gives group reveals a sequential logic without resorting to theatrical choreography.

Color is stationary. Motion never changes hue or saturation — it operates only on position, opacity, and timing. This preserves the integrity of the color system's warm-cool hierarchy as a spatial tool rather than a temporal one.

## Video Placements

**1. Hero background — `hero-bg.mp4`**
- Section role: hero (full-bleed background, furthest depth layer)
- Subject: slow macro drift across a warm metallic or mineral surface — rust, copper, or heated stone — transitioning in temperature from warm amber at frame left to cooler blue-grey at frame right, echoing the `#6b2a24` → `#1a3040` gradient
- Motion quality: imperceptible drift, handheld micro-movement, no focal shift
- Duration: 10s loop
- Why video: the three-layer hero composition (terrain + ghost type + foreground) requires the deepest layer to carry atmospheric weight across time. A still gradient reads as flat; a living gradient breathes. The warmth-to-cool temperature shift becomes a felt quality rather than a static observation.

**2. Narrative CTA band — `feature-product.mp4`**
- Section role: mid-page editorial pause (the section using the browser-frame product mockup)
- Subject: a browser window or software interface scrolling slowly through its own UI — product-native, framed within the browser chrome container, shot from slightly above at a shallow angle
- Motion quality: slow mechanical scroll, 2–3 interface states cycling at measured pace, no human hand visible
- Duration: 8s loop
- Why video: this section uses a browser-frame mockup as its primary media. A looping video of the actual product in motion transforms the demonstration from a static screenshot into a live artifact — the browser chrome signals "product" while the motion signals "working". This is the page's clearest selling moment and it earns temporal depth.

**3. Services / feature detail — `services-ambient.mp4`**
- Section role: asymmetric feature split (the content-dense sections mid-page)
- Subject: abstract light passing through a fine material mesh or woven surface — textile, wire, or paper — at very slow speed, emphasizing texture and light quality over identifiable subject matter
- Motion quality: slow drift, softly defocused, warm side-lit
- Duration: 5s loop
- Why video: the asymmetric split sections carry the highest information density on the page. A background ambient video in the left-column large-heading zone — restrained and non-competitive — adds depth without adding information. It activates the compositional breathing room rather than filling it.
