# Hero Background

**File:** assets/hero-bg.mp4
**Save to:** `landing-page/assets/hero-bg.mp4`
**Type:** Video
**Aspect ratio:** 16:9
**Duration:** 10s
**AI Tool:** Kling 2.6
**Page:** index.html
**Section:** #hero

## Context from code
- **Alt/title:** hero-bg (no explicit alt — background video)
- **Nearest heading:** "Every room has a voice."
- **Section purpose:** Full-bleed hero background establishing atmospheric, material presence beneath the SONOR headline and gradient overlay
- **Background:** Dark — deep navy #0a3480 to deep indigo #1c1c6e overlay sits on top of the video

## Prompt

++Warm metallic surface++ fills the entire frame — rust-copper mineral texture catching diffuse side light, no horizon, no edges, just material. Amber tones pool at frame left, the warmth of heated stone or oxidized copper, while the right side cools gradually into blue-grey shadow, suggesting the transition from acoustic warmth into precision measurement. A barely perceptible lateral drift begins, moving right with the slowness of breath rather than mechanics, then settles into stillness at roughly the midpoint. Micro-movement persists throughout — a handheld quality suggesting presence, not absence of operator, as if someone chose to hold this very still. The camera remains at a fixed focal length throughout, no pull, no push, no rack — only that single unhurried drift and then rest. Near-silence carries the scene: a low, resonant room tone hum, the faint creak of thermal expansion in warm metal, and at the end a subsiding into held quiet.

## Negative Prompt

No text overlays, no logos, no watermarks, no jump cuts, no morphing objects, no focal shift, no depth-of-field change, no visible horizon, no people, no reflection of camera operator, no flickering, no shaky distortion

## Applied
Mode:     text-to-video
Style:    ambient (specified)
Duration: 10s (specified)
Aspect:   16:9 (specified)
Audio:    ambience

## Usage

Used in `index.html` inside `#hero` as the full-bleed atmospheric background beneath the dark gradient overlay and hero headline.
HTML: `<video src="assets/hero-bg.mp4" autoplay muted loop playsinline>`
