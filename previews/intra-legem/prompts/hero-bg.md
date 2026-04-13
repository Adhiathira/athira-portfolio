# Hero Background Video

**File:** assets/hero-bg.mp4
**Save to:** `landing-page/assets/hero-bg.mp4`
**Type:** Video
**Aspect ratio:** 16:9
**Duration:** 10s
**AI Tool:** Kling 2.6
**Page:** index.html
**Section:** site-hero

## Context from code
- **Alt/title:** Hero background — Kerala High Court exterior colonnade at dawn
- **Nearest heading:** INTRA LEGEM LAWYERS (firm name lockup in hero)
- **Section purpose:** Full-bleed hero background establishing institutional identity before any copy is read; plays at reduced opacity (~0.20) beneath the firm name and tagline
- **Background:** Very dark near-black #1a1a14 overlay on top of video

## Prompt

Early morning light washes across the exterior colonnade of the Kerala High Court in Ernakulam — sandstone columns glow in warm golden tones (#a39b8b), long diagonal shadows stripe the stone floor between each pillar, and pale cream sky fills the upper third of the frame. ++The colonnaded verandah++ drifts slowly into view from right to left, one column passing every four seconds, the camera's lateral movement barely perceptible — a measured pace that suggests institutional time rather than commercial motion. Thin morning mist softens the far end of the walkway where the columns recede into haze; the deep shadow charcoal (#1a1a14) of the shaded zones holds firm against the brightening dawn. No people are present; no object moves except the camera, which completes its slow traverse and then holds static at a new vantage, the colonnade now centered in frame. Ambient audio rises naturally from the scene: distant early-morning birdsong from the surrounding trees, a faint stone-surface resonance as warmth enters the architecture, near-silence otherwise — the quiet of a building before the institution awakens. The mood is stone, shadow, and the weight of precedent; unhurried, permanent.

## Negative Prompt

No text overlays, no logos, no watermarks, no jump cuts, no morphing objects, no people in frame, no vehicles, no overcrowded frame, no shaky distortion, no flickering, no artificial lighting, no modern signage

## Applied
Mode:     text-to-video
Style:    cinematic ambient
Duration: 10s
Aspect:   16:9
Audio:    ambience (distant birdsong, stone resonance, near-silence)

## Usage

Used in `index.html` inside `#site-hero` as the full-bleed ambient background video behind the firm name lockup.
HTML: `<video src="assets/hero-bg.mp4" autoplay muted loop playsinline>`
