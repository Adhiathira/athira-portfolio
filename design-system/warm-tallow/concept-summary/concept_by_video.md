# Motion Brief: Warm Tallow

---

## Scroll Opening

The page begins in near-stillness. The warm ivory background (#f2efe9) is already present — no fade from white, no dramatic reveal. The nav links ghost in from opacity 0 at 0.45s each, staggered 0.08s apart, starting from the logo. The hero headline emerges through a gentle upward translate (20px → 0) at 0.75s ease, as if the text has always been there and is only now becoming visible to the eye. No scale animation. No blur. The effect is less entrance and more disclosure.

---

## Hero Experience

The hero is the spatial anchor of the page. A full-viewport section with generous 144px top padding creates a column of sky above the headline before the eye encounters it. The primary heading — EB Garamond, tracked wide at 0.14em, uppercase — arrives first. The subhead follows 0.3s later. The CTA pill resolves last.

This section is a **video background candidate**. Suggested asset: `hero-bg.mp4` — a slow drift across a warm studio surface, morning light raking across paper grain or raw linen, 10s loop. The subject is material texture at human scale: the weave of fabric, the tooth of uncoated stock, the grain of pale wood. The motion is a slow lateral drift, 1–2mm per second, the camera barely moving. The warmth of the source palette (#f2efe9, #fb7339) is present in the light itself. Video serves this section because still images cannot convey the quality of light changing across a surface over time — the depth that makes a background feel inhabited rather than designed.

---

## Section Transitions

Sections are separated by whitespace rather than dividers. As a section enters the viewport, its content reveals through translate-Y (20px → 0) and opacity (0 → 1) at 0.75s, eased with cubic-bezier(0.4, 0, 0.2, 1). There is no spring, no overshoot. The motion vocabulary matches the material: things settle rather than snap.

Card grids stagger their entries at 0.1s intervals per column, reading left to right. The stagger is perceptible but not theatrical. Three cards in a row arrive as a cohesive set, not as individual performers.

---

## Content Rhythm

Individual elements within sections enter the viewport using a two-property reveal: translate-Y 20px → 0 and opacity 0 → 1, at 0.75s with the system's standard easing. Headings enter first; body copy follows 0.15s later; supporting elements (icons, labels, subtext) trail last. This ordering reinforces reading hierarchy through motion sequencing — the eye is given the structure before the content, the context before the detail.

Buttons do not animate on scroll entry — they are present as static affordances from the moment their section resolves. Their hover state (color, background transition at 0.45s) is the only motion they perform.

---

## Footer Approach

The footer arrives with no ceremony. It is the quietest moment on the page — a two-zone strip, logo left, links right. No stagger. No translate. It materializes at opacity 0 → 1 over 0.45s as the viewport scrolls to it. The effect is more like reading to the end of a page than arriving at a destination.

The absence of motion here is intentional. After the hero's generous scale and the section reveals, the footer's stillness reads as resolution rather than anticlimactic.

---

## Motion Principles

The system operates at a **languid, considered tempo**. The base duration is 0.45s; slow transitions run to 0.75s. Nothing is instantaneous. The easing — cubic-bezier(0.4, 0, 0.2, 1) — is the material standard, deceleration-weighted, ending gently. There is no bounce, no elastic, no spring. The motion vocabulary is that of heavy paper, not interface chrome.

The widened letter-spacing (0.14em) in headings creates visual breadth that asks for equivalent pacing in motion: slow enough to let the eye traverse the width of a headline before the next element arrives. Typography and motion are calibrated together, not independently.

---

## Video Placements

**1. Hero background — `hero-bg.mp4`**
- **Section role**: Hero, above-the-fold atmospheric background
- **Subject**: Slow drift across a warm studio surface — raw linen, uncoated paper, or light wood grain — in morning raking light. Texture visible, color temperature matching the palette (#f2efe9 tone)
- **Motion quality**: Barely perceptible lateral drift, 1–2mm/sec, shot on a locked-down or very slow slider. Not a pan. A presence.
- **Duration**: 10s, seamless loop
- **Why video over still**: A still background image cannot capture the quality of light shifting across a textured surface over time. The warmth in this palette is thermal — it implies morning, material, slowness. Video makes that quality temporal and felt, not merely described.

**2. Product showcase — `services-ambient.mp4`**
- **Section role**: Mid-page product or services section demonstrating the product's primary value
- **Subject**: Overhead time-lapse of a desk surface — documents being arranged, a hand turning pages, objects placed and removed. Shot at 4–6× speed to feel active without urgency. The surface is warm: pale wood, cream paper, natural cotton.
- **Motion quality**: Overhead fixed frame, human hands entering and leaving. Time-lapse, not animation.
- **Duration**: 8s loop
- **Why video over still**: This section asks the viewer to understand process — how something gets made or used. A still can show a state; video can show a transition. The overhead time-lapse is an efficient narrative form that communicates "this is how work happens here" without requiring text to say it.

**3. Studio interior — `studio-interior.mp4`**
- **Section role**: About or studio section establishing context and brand identity
- **Subject**: A slow dolly through a naturally lit workspace — shelves of materials, a worktable, afternoon light through a window. Shot handheld but smoothed in post. The space should read as intentional, not generic. Warm tones, natural materials, visible evidence of craft.
- **Motion quality**: Slow walk-through, 0.5m/s, camera at table height
- **Duration**: 10s loop
- **Why video over still**: Spatial context cannot be communicated in a single still frame with the same authority as a slow reveal. The dolly builds a sense of place over time — width, depth, light direction, scale — that a photograph compresses into two dimensions. For a brand whose palette implies craft and materiality, the studio video is evidence, not decoration.
