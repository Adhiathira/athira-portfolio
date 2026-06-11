# Services Ambient

**File:** assets/services-ambient.mp4
**Save to:** `landing-page/assets/services-ambient.mp4`
**Type:** Video
**Aspect ratio:** 16:9
**Duration:** 5s
**AI Tool:** Kling 2.6
**Page:** index.html
**Section:** #use-cases

## Context from code
- **Alt/title:** use-cases-video (no explicit alt — ambient left-panel video)
- **Nearest heading:** "Built for every listening environment."
- **Section purpose:** Asymmetric feature split — video fills the left panel alongside a list of use cases (Recording Studio, Live Venue, Audiophile, Architect) establishing the materiality and physical register of acoustic space
- **Background:** Light-to-mid — section uses near-white surface #fbfbfd

## Prompt

++Diffuse light drifting through a fine woven mesh++ — textile or wire suspended in mid-air, the weave tight enough to fracture the light into soft interference patterns across a warm neutral background. The fabric or mesh breathes in an imperceptible air current, shifting the light pattern slowly left then settling back, then holds. Warm side-light enters from the right edge, catching individual fibers and dissolving them into soft luminous halos against a slightly defocused ground. Camera holds completely still, the movement belonging entirely to the material and light. A barely audible ambient breath: the faint sibilance of air through fine mesh, a low room tone, then stillness.

## Negative Prompt

No text overlays, no logos, no watermarks, no jump cuts, no morphing objects, no people, no hands, no sharp focal pulls, no flickering, no overcrowded frame, no shaky distortion

## Applied
Mode:     text-to-video
Style:    ambient (specified)
Duration: 5s (specified)
Aspect:   16:9 (specified)
Audio:    ambience

## Usage

Used in `index.html` inside `#use-cases` as the left-panel ambient video alongside the use-case list, establishing the material and physical register of acoustic environments.
HTML: `<video src="assets/services-ambient.mp4" autoplay muted loop playsinline>`
