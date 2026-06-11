# Motion Brief

## Scroll Opening

The page loads into composed stillness. The hero's three-layer background — terrain grid, ghost letterforms, and the warm-to-cool gradient field — is present from the first frame, not assembled by animation; the opening motion belongs entirely to the foreground content stack, which resolves from zero opacity with a 4px upward drift over 0.9s. This is not an entrance — it is a disclosure. The page was already there; the content becomes legible. The easing (`cubic-bezier(0.45, 0, 0.55, 1)`) removes any mechanical edge, holding the reveal in the same measured cadence that governs every subsequent transition. No spring, no bounce, no announce.

## Hero Experience

The hero is the page's single emission of warmth — the bicolor gradient and the three depth layers make it the most dimensional, most thermally charged zone on the entire page. This is the designated video background candidate. Suggested asset: `hero-bg.mp4` — a slow macro drift across a cooling metallic or mineral surface, the left frame edge amber-warm, the right frame edge settling into blue-grey, mimicking the exact temperature shift of the gradient. The subject might be rust oxidizing on raw iron, or copper patina mid-process — something whose warmth is visibly draining across frame. Motion quality: imperceptible lateral drift, micro-handheld instability, zero focal shift, zero human presence. The video occupies the furthest depth layer, behind ghost letterforms and terrain graphic; it must carry atmosphere rather than narrative. Duration: 10s loop.

Foreground content animates in on a staggered cascade: headline first (0s delay), body paragraph second (0.1s), CTA pair third (0.2s). Each element resolves from opacity 0 with a 4px translateY — the same entrance gesture throughout the page, applied here in sequence rather than simultaneously.

## Section Transitions

Transitions between sections are scroll-governed, not triggered. As the user moves from the hero into the asymmetric feature splits, the warm gradient field recedes above the viewport and the page enters its cooling phase — a tonal transition that occurs in the background layer without explicit animation. No cross-fades, no wipes, no color interpolation. The temperature change happens by subtraction: the gradient is gone, and what remains is the cool dark teal.

Within feature sections, content enters from slight vertical offsets (4px translateY, 0.7s duration, `cubic-bezier(0.45, 0, 0.55, 1)`) as elements cross the scroll viewport threshold. In two-column asymmetric layouts, the left-column heading resolves 0.1s before the right-column content — honoring the compositional reading direction.

## Content Rhythm

Cards in the three-column feature grid enter with a left-to-right stagger: each card delayed by 0.1s relative to its neighbor, opacity and 4px translateY entering in sequence. The total spread across three cards is 0.3s — enough to imply scanning direction without announcing itself as choreography. The effect is felt rather than seen.

Accordion rows in the FAQ section expand and collapse on height at 0.3s, eased with a mechanical curve (`cubic-bezier(0.4, 0, 0.6, 1)`). This is a utility interaction; the motion reflects that register — efficient, unsentimental, consistent.

The narrative CTA band resolves as a single unit: heading, subheadline, and browser-frame mockup entering together at 0.6s duration rather than staggered. This is the page's moment of held breath; the motion should reflect its stillness by refusing to decompose it into parts.

## Footer Approach

The footer enters without ceremony. Logo, column headings, and link lists resolve from opacity 0 over 0.9s as the section crosses the viewport threshold — the same entrance gesture used from the first element on the page. No closing animation, no terminal flourish. The footer is a utility zone that earns its exit by disappearing as a mechanism.

## Motion Principles

The timing philosophy is **measured and cooling** — neither snappy nor languid, but decelerating. Duration centers on 0.7–0.9s for reveals, 0.3s for utility interactions. The primary easing (`cubic-bezier(0.45, 0, 0.55, 1)`) sits between mechanical and fluid, removing both the stickiness of ease-out and the abruptness of linear. The stagger system (0.1s increments per element) is the most expressive gesture available — deployed selectively, it gives group reveals sequential logic without theatrical escalation.

Color does not participate in motion. No hue interpolation, no saturation shifts on scroll or hover. The warm-to-cool temperature transition encoded in the page's color system is a spatial condition, not a temporal animation — it exists in the scroll axis as geography, not choreography.

## Video Placements

**1. Hero background — `hero-bg.mp4`**
- Section role: hero (full-bleed background, furthest depth layer beneath terrain grid and ghost letterforms)
- Subject: macro surface of cooling metal or oxidizing mineral — copper, rust, or heated stone — with warm amber at frame left transitioning to cooler blue-grey at frame right
- Motion quality: imperceptible lateral drift, micro-handheld instability, no focal shift, no human element
- Duration: 10s loop
- Why video: the three-layer hero composition requires the deepest layer to carry atmospheric weight across time. A static gradient reads as paint; a living surface breathes. The warmth-to-cool temperature shift becomes felt quality rather than a static chromatic observation.

**2. Narrative CTA band — `feature-product.mp4`**
- Section role: mid-page editorial pause (centered heading + browser-frame product mockup)
- Subject: a software interface scrolling at slow, measured pace through two to three interface states, framed within browser chrome, shot from a slight overhead angle, no human hand visible
- Motion quality: slow mechanical scroll, interface state cycling at 4–6s per state, consistent frame rate, no camera movement
- Duration: 8s loop
- Why video: this section uses a browser-frame mockup as its primary demonstration medium. A static screenshot signals "this exists"; a looping video signals "this works". The browser chrome frames the video as product artifact rather than illustration — the page's clearest selling moment.

**3. Asymmetric feature split — `services-ambient.mp4`**
- Section role: the left-column large-heading zone of the content-dense asymmetric feature sections
- Subject: slow drift of light through a fine textured surface — woven textile, wire mesh, or translucent paper — lit from one side, no identifiable subject, emphasis on material grain and light behavior
- Motion quality: very slow drift, softly defocused edges, warm directional side-light, no motion faster than the drift of smoke
- Duration: 5s loop
- Why video: the asymmetric feature sections carry the highest information density on the page. The left-column large heading creates compositional breathing room — negative space that is structurally necessary but visually inert as a flat dark field. A restrained ambient video in this zone activates that space without adding information, transforming the compositional pause from empty ground into living ground.
