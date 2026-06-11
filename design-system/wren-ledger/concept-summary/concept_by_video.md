# Wren Ledger — Concept by Video

## Scroll Opening

The page loads in stillness. No entrance animation fires immediately — the nav resolves first at full opacity, its Archivo letterforms already present and composed. Then the hero content rises: headline text fading up from 20px below its final position over 0.527s (fast duration, unhurried), the 0.06em letter-spacing opening gently as the glyphs find their position. Body copy follows at a 0.15s delay. The initial state communicates arrival, not performance — the page has been waiting, not staging.

## Hero Experience

The hero section earns video. The warm parchment ground (#f5f2ee) and the editorial precision of the Archivo display type call for something that demonstrates material intelligence at rest — not manufacturing, not technology, but craft in its most deliberate form. The hero video should show a workspace at the moment before work begins: a well-lit writing desk with notebooks, a hand setting a paper document beside a keyboard, or the motion of an archivist retrieving and opening a folio. Shot at a slight distance with natural window light, the movement is slow and intentional — the camera holds, the subject moves with purpose. 10-second loop, a single continuous motion, no cuts. The warm tones in the video should find their echo in the parchment palette — aged paper, natural wood, morning light against a linen surface.

## Section Transitions

Sections enter through y-translate reveals at the motion system's measured pace — each major heading rising 20px into position over 0.527s, body text following at a 0.12s stagger delay. There are no hard cuts, no structural beats that interrupt the pacing. The layout assembles itself quietly, each section arriving when the user reaches it rather than announcing its presence from a distance. The overall rhythm is editorial: one thing, then the next, each given its full time.

## Content Rhythm

Individual content cards use a scale-and-opacity entrance: `scale: 0.97, opacity: 0` entering the viewport, resolving to `scale: 1, opacity: 1` over 0.702s (medium duration) with a 0.15s stagger between sibling cards. The scale shift is minimal — barely perceptible — which prevents the entrance from competing with the content. Feature rows use a horizontal sweep from left (`x: −40px`) for the heading, with the accompanying body copy rising vertically (`y: 20px`) on a 0.12s delay. The motion reads as the layout composing itself with deliberate hands, not materializing from nothing.

## Footer Approach

The footer arrives without announcement. The generous 64px section gap above it creates a visible pause before the footer content — space that reads as a breath between the last section and the closing. Footer elements resolve at page-end from a gentle `y: 16px` offset, opacity rising over 0.878s (the alt duration). No theatrical reveal; the footer simply becomes present. If a closing CTA exists, it enters first — the button appearing at full opacity while surrounding text follows at 0.15s delay, the same pattern as the hero's entrance in reverse.

## Motion Principles

The timing philosophy is measured before everything else. The 1.5× duration scaling from the motion source gives the system a tempo that reads as chosen rather than defaulted — these are not browser animation durations, they are durations that someone decided upon. Easings favor `ease-out` for entrances (decisive, landing with authority) and `ease` for hover states (bidirectional, equally patient on approach and retreat). The opacity-retreating hover gesture (0.75) operates at `ease` timing, which means the retreat on approach and the recovery on departure take the same time — a symmetry that communicates steadiness. No spring physics, no bounce, no overshoot. The precision aesthetic is enacted in the motion as much as in the type.

## Video Placements

**1. Hero — full-bleed ambient workspace video**
- Section role: primary hero, the page's opening declaration
- Suggested asset filename: `hero-bg.mp4`
- What the video shows: a well-lit workspace at the moment before work begins — a writing desk with organized notebooks, a hand placing a document beside a keyboard, or an archivist opening a folio on a reading stand. Natural window light, warm tones, slow deliberate movement. The subject is human craft, not technology. Shot from a slight distance with shallow depth-of-field so the background surface resolves into warm bokeh. Camera is static; the subject moves. 10-second loop.
- Duration: 10s — the hero needs the full loop duration to communicate the quality of sustained attention the brand represents; a quick loop would undercut the deliberate pacing of everything else
- Why video over still: a still image shows a workspace; the ambient video shows someone working with intention — the continuous, unhurried motion communicates the brand's core argument that good work happens in considered time

**2. Process section — hands and material in motion**
- Section role: mid-page capability or process showcase
- Suggested asset filename: `process-ambient.mp4`
- What the video shows: close-up of hands organizing a document, marking a page, or aligning printed sheets on a surface. Macro lens, warm available light, the motion of careful hands. No screen interfaces — only physical material. 5-second loop.
- Duration: 5s — tight loop, the content is legible quickly; the brevity of the loop mirrors the precision of the action shown
- Why video over still: the process section is where methodical care is established as a brand quality. An animated sequence of careful hands communicates active precision in a way no still image can — the motion is the argument

**3. Testimonial or editorial section — paper and light**
- Section role: social proof, editorial quote, or values statement
- Suggested asset filename: `editorial-ambient.mp4`
- What the video shows: a sheet of paper in raking light, the surface texture visible as the light shifts slightly — the paper's grain and weight communicated through subtle shadow movement. Or: a notebook page with handwriting being written, the nib and ink visible at macro distance. Shot with extreme stillness except for the single subject motion. 5-second loop.
- Duration: 5s — this section is a pause in the narrative, a breath; the video should match that quality — minimal motion, maximum texture
- Why video over still: the testimonial section anchors the brand's claims in human testimony. Paper and handwriting as visual context communicates that the brand's relationship with its users is documented, considered, and real — not assembled from templates but built from actual exchange
