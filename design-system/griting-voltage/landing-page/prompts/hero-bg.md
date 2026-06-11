# Hero Background Video

**File:** assets/hero-bg.mp4
**Save to:** `landing-page/assets/hero-bg.mp4`
**Type:** Video
**Aspect ratio:** 16:9
**Duration:** 10s
**AI Tool:** Kling 2.6
**Page:** index.html
**Section:** hero-wrapper

## Context from code
- **Alt/title:** (no alt — ambient background video, no text overlay dependency)
- **Nearest heading:** "Talent Trust and Readiness Infrastructure for the AI Capital"
- **Section purpose:** Full-viewport hero; video fills 100vw × 100vh behind a dark gradient overlay (rgba 0,35,16 from 0.3 to 0.7). Text reads white on top.
- **Background:** Deep forest green #003620

## Prompt

An aerial view of a vast, dark forest canopy at dusk, rendered in deep forest green (#003620) and near-black (#031f18), shot at extreme altitude so individual trees blur into a continuous textured field. A slow, almost imperceptible drift — the camera moves forward at 0.3 km/h, not floating, but advancing with quiet inevitability, like a power grid coming online at steady load. Faint bioluminescent veins of light pulse along unseen channels beneath the canopy surface, green-gold (#00693e) tracing network paths that appear and disappear without urgency. The mood is permanence and infrastructure under load — not restless, not decorative. The field breathes once in ten seconds. No people, no sky, no horizon line — only the textured dark green expanse, held under its own weight, carrying current.

## Negative Prompt

Busy motion, dramatic weather, explosions, fast camera movement, bright whites, lens flares, people, text overlays, generic stock forest, daylight, colorful foliage, blue tones, purple tones, warm sunset colors, CGI glow effects, particle systems, neon.

## Applied

Camera starts locked on a vast dark forest-green field, framing the canopy in the lower three-quarters of the frame — vast field with single focal point in lower third. Slow forward drift across uncluttered dark surface. Pulse of faint #00693e veins at 0:03 and 0:08, each lasting 1.5 seconds, then receding. Color graded to #003620 dominant, #031f18 shadows, no specular highlights above 15% brightness.

## Usage

Used in `index.html` inside `#hero-wrapper` as the full-viewport ambient background.
HTML: `<video id="hero-bg-video" src="assets/hero-bg.mp4" autoplay muted loop playsinline>`
