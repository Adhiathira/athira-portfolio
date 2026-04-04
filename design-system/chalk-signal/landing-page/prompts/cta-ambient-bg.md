# CTA Ambient Background

**File:** assets/cta-ambient-bg.mp4
**Save to:** `landing-page/assets/cta-ambient-bg.mp4`
**Type:** Video
**Aspect ratio:** 16:9
**Duration:** 10s
**AI Tool:** Kling 2.6
**Page:** index.html
**Section:** cta-dark

## Context from code
- **Alt/title:** "Abstract ambient dark gradient background"
- **Nearest heading:** "A habitat has always been listening. Now you can too."
- **Section purpose:** Full-width dark CTA section — the site's single cinematic beat. Video plays behind the headline and CTA at 0.3 opacity. Near-charcoal tones (#1a1a18 to #3d3a34).
- **Background:** Dark (#1a1a18 near-charcoal)

## Prompt

An ++abstract dark gradient field++ in near-charcoal tones — the deep warm near-black of forest floor at moonrise, a thermal shimmer barely perceptible at the surface. No objects, no shapes, no faces, no light sources. The gradient shifts imperceptibly from one dark warm tone to another across the full frame — not an animation you can point to, but a field you sense is alive. Camera holds completely static, framing the entire field. As the scene progresses, a second extremely slow drift begins in the opposite direction, so subtle the eye reads it as texture rather than motion, then the first drift returns and settles. Near-total silence — only the faintest low ambient resonance, like the acoustic floor of a forest at 3am, present but containing nothing. Atmospheric and unhurried, the feeling of a vast dark habitat holding still.

## Negative Prompt

No text overlays, no logos, no watermarks, no jump cuts, no morphing objects, no visible objects or shapes, no people, no faces, no light beams, no stars, no fire, no recognizable natural forms, no shaky distortion, no flickering, no overcrowded frame

## Applied

Mode:     text-to-video
Style:    ambient (specified)
Duration: 10s (specified)
Aspect:   16:9 (specified)
Audio:    ambience (near-silent forest acoustic floor)

## Usage

Used in `index.html` inside `#cta-dark` as the full-width ambient background video behind the conversion section headline and CTA.
HTML: `<video src="assets/cta-ambient-bg.mp4" autoplay muted loop playsinline>`
