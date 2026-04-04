# Services Ambient Background Video

**File:** assets/services-ambient.mp4
**Save to:** `landing-page/assets/services-ambient.mp4`
**Type:** Video
**Aspect ratio:** 16:9
**Duration:** 5
**AI Tool:** Kling 2.6
**Page:** index.html
**Section:** philosophy

## Context from code
- **Alt/title:** (aria-hidden video) — ambient background for dark philosophy section
- **Nearest heading:** "Slow travel. Real gear."
- **Section purpose:** Dark navy philosophy section with three-column content pillars. Video creates living atmosphere behind the content. Section background: #25446B (deep navy). Overlay: rgba(37,68,107,0.55)
- **Background:** Deep navy #25446B with semi-transparent dark overlay

## Prompt

Very slow drift of diffused side-light moving through a fine natural textile — woven canvas or open-weave linen — lit from frame-left by warm directional light that illuminates the warp and weft threads individually, making each fiber cast a hair-thin shadow. The background is deep shadow, the fabric occupies center frame. Soft, totally defocused edges. The light moves imperceptibly left to right, not faster than the drift of fog. Warm cream textile (#FFF7E9 family) catching navy-adjacent ambient light (#25446B). No other subject, no identifiable context, no focal shift, no movement except the slow passage of light. Material grain, thread tension, natural imperfection of hand-woven cloth — this is the only content.

## Negative Prompt

No people, no text, no sharp focus on edges, no oversaturation, no artificial glow, no fast movement, no digital effects, no multiple subjects, no synthetic materials.

## Applied
Style: ambient atmospheric, material texture
Camera: locked macro, slightly softened
Motion: imperceptible light drift, no camera movement
Color: warm cream (#FFF7E9) lit against deep navy shadow (#25446B)

## Usage

Used in `index.html` inside `.philosophy` as ambient atmosphere layer behind brand philosophy content.
HTML: `<video src="assets/services-ambient.mp4" autoplay muted loop playsinline>`
