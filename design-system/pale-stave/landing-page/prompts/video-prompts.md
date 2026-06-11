# Pale Stave / Calliper — Video Generation Prompts

These prompts correspond to the video placeholder elements in the landing page.
Use the `use-higgsfield` skill to generate each video.

---

## 1. hero-bg.mp4

**Placement:** Hero section background (`index.html`)
**Element:** `.hero-video-placeholder`
**Duration:** 10s seamless loop

**Prompt:**
Extreme close-up of a precision-ruled manuscript page or engineering graph paper, lit by raking directional daylight from the left. The surface fills the entire frame — fine horizontal ruled lines, the slight texture of the paper visible at this distance. A slow, almost imperceptible horizontal camera drift of approximately 2 pixels per frame carries the composition rightward over 10 seconds. The motion is so slow it reads as a still image for the first 3–4 seconds before the drift registers. Color temperature: cool daylight, neutral white, no warmth added. No color grading. The paper white matches #ffffff — neutral and receptive.

**Technical:**
- Aspect ratio: 16:9 (full viewport)
- Color temperature: 6500K neutral daylight
- Motion: horizontal drift, ~2px/frame
- Loop: seamless (beginning and ending frame identical in composition)

---

## 2. process-ambient.mp4

**Placement:** Feature split section (`index.html`, `.feature-video-placeholder`)
**Element:** `.feature-split__image`
**Duration:** 8s loop

**Prompt:**
Bird's-eye view directly above a working surface — a drafting table or fieldwork desk. Two hands move across the surface with deliberate, unhurried gestures: measuring with a steel rule, annotating a site drawing, or making reference marks. The hands do not need to be identifiable as a specific person. The composition is the surface and the hands in motion — no face, no context beyond the working plane. Shot handheld with slight natural micro-movement, 24fps, no stabilization — the organic wobble confirms human presence without interrupting the composition. Surface: white paper or drafting vellum. Light: directional overhead with soft fill.

**Technical:**
- Aspect ratio: 4:5 (portrait, fills the split column)
- Handheld, natural micro-movement
- 24fps
- Loop: 8s — hands completing a natural gesture and returning to start

---

## 3. studio-ambient.mp4

**Placement:** Closing CTA section background (`index.html`, `.cta-ambient`)
**Element:** `.cta-video-placeholder`
**Duration:** 10s loop

**Prompt:**
A quiet interior — a workspace, conservation studio, or well-lit reference library. Objects arranged on a table without staging: a steel rule, a few reference drawings, an open notebook. Natural light from a window at left, shifting slowly as cloud cover moves — shadows on the surface change gradually over the 10 seconds. The room reads as occupied and in use, not empty. Shot as a timelapse at 0.5× real speed so the light change is visible but not dramatic. Beginning and ending at the same light level for seamless looping. Warm neutral light — slightly warmer than the hero, but not amber.

**Technical:**
- Aspect ratio: 16:9 (fills the CTA section)
- Timelapse at 0.5× real speed
- Color temperature: warm neutral, 4500–5000K
- Loop: 10s seamless — light level matches at start and end
