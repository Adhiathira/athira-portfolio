# Hero Background Video

**File:** assets/hero-bg.mp4
**Save to:** `landing-page/assets/hero-bg.mp4`
**Type:** Video
**Aspect ratio:** 16:9
**Duration:** 5s
**AI Tool:** Kling 2.6
**Page:** index.html
**Section:** #hero

## Context from code
- **Alt/title:** aria-hidden (decorative background)
- **Nearest heading:** "Maison Cendré" (h1 .hero-headline)
- **Section purpose:** Full-bleed hero background filling 100vh behind the brand name and tagline "From cold water. Nothing more."
- **Background:** dark #1a1a18 warm charcoal page background, video covers entire viewport

## Prompt

A near-black #1a1a18 warm charcoal vessel fills the frame, its surface densely packed with ++dark Atlantic caviar spheres++ — each pearl a deep charcoal-pewter, catching a single off-camera ambient light source that traces a subtle specular highlight across individual grains. The caviar settles with imperceptible organic weight, individual spheres shifting micro-distances and then holding still, filmed at high frame rate and played at 60–70% speed so the motion reads as opulent suspension rather than movement. The camera holds completely static — no push, no tilt, no drift — letting material weight and light do all the work, then holds for the full duration. Near-silence throughout: the faintest dry micro-rustle as a single sphere shifts against its neighbor, then absolute stillness. Warm organic darkness, the texture of luxury restrained to a single surface.

## Negative Prompt

No text overlays, no logos, no watermarks, no jump cuts, no morphing objects, no camera movement, no shaky distortion, no flickering, no overcrowded frame, no color shifting, no bright highlights, no cool or blue tones

## Applied

Mode:     text-to-video
Style:    cinematic (specified)
Duration: 5s (specified)
Aspect:   16:9 (specified)
Audio:    sfx (near-silence, dry micro-rustle)

## Usage

Used in `index.html` inside `#hero` as a full-bleed 100vh background video behind the brand headline and tagline.
HTML: `<video src="assets/hero-bg.mp4" autoplay muted loop playsinline>`
