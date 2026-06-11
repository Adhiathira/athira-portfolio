# Globe Network — CTA Background Video

**File:** assets/globe-network.mp4
**Save to:** `landing-page/assets/globe-network.mp4`
**Type:** Video
**Aspect ratio:** 16:9
**Duration:** 10s
**AI Tool:** Kling 2.6
**Page:** about-us.html
**Section:** #globe-cta

## Context from code
- **Alt/title:** aria-hidden background video (no alt text); fallback label "Video asset missing: globe-network.mp4"
- **Nearest heading:** "Ready to build connections that shape your Future?"
- **Section purpose:** Full-bleed CTA section — the video plays behind the final call-to-action heading, reinforcing the infrastructure-at-scale identity of Griting. The overlay gradient (rgba #003620 at 25–55%) sits above the video, so the video must read through it clearly.
- **Background:** Dark #003620

## Prompt

──────────────────────────────────────────────
PROMPT
──────────────────────────────────────────────
Deep space environment rendered in dark forest green (#003620) and near-black, a ++translucent globe++ suspended at the center of frame — its surface a fine mesh of latitude and longitude lines, faintly luminous, as if rendered from live telemetry. Nodes pulse at connection points across the globe surface: North America, Western Europe, Southeast Asia, East Africa — not decorating geography but registering load. Thin, straight data-lines connect node pairs, appearing briefly at irregular intervals and fading, the way active network traffic behaves under real infrastructure monitoring. The globe rotates slowly clockwise on a slight axial tilt, completing roughly one quarter turn over the full duration, then holds at a settled position. Camera begins at a medium establishing shot — globe fills 60% of frame — then drifts infinitesimally closer over 8 seconds, stopping with the globe at 70% of frame. Throughout: a low, steady electronic ambience, barely perceptible — the subsonic hum of servers under sustained load, with occasional clean digital pulse sounds timed loosely to node activations. The mood is operational persistence, not spectacle. This network is not performing. It is working.

──────────────────────────────────────────────
NEGATIVE PROMPT
──────────────────────────────────────────────
No text overlays, no logos, no watermarks, no jump cuts, no morphing objects, no lens flares, no particle explosions, no bright white highlights, no neon colors, no fast rotation, no flourishes, no decorative glow bursts, no overcrowded frame, no shaky distortion, no flickering

──────────────────────────────────────────────
APPLIED
──────────────────────────────────────────────
Mode:     text-to-video
Style:    cinematic ambient (specified)
Duration: 10s (specified)
Aspect:   16:9 (specified)
Audio:    ambience — low server hum, sparse digital pulse timed to node activations

──────────────────────────────────────────────
TRY ALSO
──────────────────────────────────────────────
Try style: ambient with a wider establishing shot — globe at 40% of frame, more deep-space void visible — if the section needs the video to feel more vast and less close.
──────────────────────────────────────────────

## Usage
Used in `about-us.html` inside `#globe-cta` as a full-bleed `position: absolute` background video. Covers the entire section (min-height: 80vh), overlaid with a dark forest green gradient (rgba #003620, 25–55% opacity). Text "Ready to build connections that shape your Future?" renders above the overlay on `z-index: 1`.
