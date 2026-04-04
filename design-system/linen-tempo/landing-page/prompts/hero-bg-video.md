# Hero Background Video

**File:** assets/hero-bg.mp4
**Save to:** `landing-page/assets/hero-bg.mp4`
**Type:** Video
**Aspect ratio:** 16:9
**Duration:** 10
**AI Tool:** Kling 2.6
**Page:** index.html
**Section:** hero

## Context from code
- **Alt/title:** (aria-hidden video, no alt) — ambient hero background
- **Nearest heading:** "Gear for the Long Way"
- **Section purpose:** Full-viewport hero with layered depth composition — terrain grid, ghost letterforms, video as the furthest atmospheric layer. Light treatment (HERO_TREATMENT=light): sky blue (#BBE2EE) and warm cream (#FFF7E9) palette.
- **Background:** Light-sky — #BBE2EE fading to #FFF7E9

## Prompt

Extreme slow-motion macro drift across the surface of cooling oxidized copper or rusted iron — the left frame edge holds amber warmth, the right edge has already settled into grey-blue cool, as though heat is draining across the frame. The texture is granular and mineral: patina layers, corrosion crystals, micro-pitting. No human presence, no focal shift, no motion faster than the drift of smoke. Shot from directly overhead, the surface fills the entire frame. Warm amber tones (#BBE2EE family) on the left half bleeding into muted blue-grey on the right. The material carries light from a single raked source at frame-left that makes the oxidation surface feel three-dimensional and alive. Very slow imperceptible lateral drift with micro-handheld instability — imperceptibly moving, never still.

## Negative Prompt

No people, no text, no fast movement, no close cuts, no oversaturated colors, no artificial glow, no lens flare, no zoom, no digital compositing artifacts, no CGI surfaces.

## Applied
Style: ambient atmospheric, low-motion macro texture
Camera: overhead locked, micro-handheld instability
Motion: imperceptible lateral drift
Color: left half warm amber (#f16224, #BBE2EE adjacent); right half cooling blue-grey (#EFF8FC, #25446B desaturated)

## Usage

Used in `index.html` inside `.hero` as the furthest depth-layer background beneath terrain grid overlay and ghost letterforms.
HTML: `<video src="assets/hero-bg.mp4" autoplay muted loop playsinline>`
