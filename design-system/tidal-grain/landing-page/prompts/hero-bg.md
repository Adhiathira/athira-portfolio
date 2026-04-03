# Hero Background Video

**File:** assets/hero-bg.mp4
**Save to:** `landing-page/assets/hero-bg.mp4`
**Type:** Video
**Aspect ratio:** 16:9
**Duration:** 10s
**AI Tool:** Kling 2.6
**Page:** index.html
**Section:** hero

## Context from code
- **Alt/title:** (no alt — decorative background video, aria-hidden via overlay)
- **Nearest heading:** "VELLUM & IRON" (h1, #hero-title)
- **Section purpose:** Full-viewport hero with video background, brand name, tagline, and dual CTAs; the video plays behind a dark overlay and the hero text content
- **Background:** Dark — `#hero-video-overlay` darkens the video to create legibility for the white text above it

## Prompt

A north-facing workshop window casts warm late-afternoon light across the surface of a hand-sewn leather journal resting on a raw linen workbench — full-grain cognac leather, every pore and hair follicle trace visible in the hide, raised spine cords throwing fine parallel micro-shadows across the surface. The camera begins framed on the lower two-thirds of the leather face where texture is densest, then performs an imperceptibly slow lateral drift rightward, moving so little over ten seconds that the viewer is uncertain whether the image is moving at all, then settles completely still at the end. As the drift unfolds, ++the hand-stitched thread channels catch the light and release it in sequence++ — each raised cord brightening and dimming as the illumination angle shifts across it, tooling impressions in the leather surfacing briefly from shadow and receding again. The upper third of the frame holds the diffused warm parchment tone of the leather face with no surface detail, breathing open and uncluttered. Near-silence throughout — only the faintest low creak of the workbench settling, the dry whisper of heated air moving through the room, and the barely-audible ticking of a clock just off frame.

## Negative Prompt

No text overlays, no logos, no watermarks, no jump cuts, no morphing objects, no flickering, no shaky distortion, no overcrowded frame, no human figures, no artificial color grading, no fast motion

## Applied
Mode:     text-to-video
Style:    ambient (specified)
Duration: 10s (specified)
Aspect:   16:9 (specified)
Audio:    ambience (low workbench creak, dry air whisper, distant clock tick)

## Usage

Used in `index.html` inside `#hero` as the full-viewport background video playing behind a dark overlay and the hero text content.
HTML: `<video class="hero-video" autoplay loop muted playsinline><source src="assets/hero-bg.mp4" type="video/mp4"></video>`
