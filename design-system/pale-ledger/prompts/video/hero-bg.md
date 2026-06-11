# Hero Background Video

**File name:** hero-bg.mp4
**Save to:** `pale-ledger/assets/hero-bg.mp4`
**Type:** Video
**Dimensions:** 1920x1080
**Duration:** 8–12 seconds, seamless loop
**AI Tool:** Kling 2.6

## Prompt

Cinematic aerial slow push-in over a trading floor at dawn. The camera begins high above and drifts downward and forward with near-imperceptible speed — a barely-there dolly through air. Warm cream and soft amber morning light rakes across dark navy desks arranged in precise geometric rows, the light gradually brightening over the shot as if the sun is just cresting the horizon. The palette is restricted to deep navy (#0e1726), warm off-white cream (#fcfbf9), and muted rose-gold accent tones. No people — only the architecture of precision: curved monitor arrays glowing faintly, printed ledger sheets fanned across surfaces, soft bokeh pulsing in the deep background. The motion is absolutely restrained — no shake, no flicker, only the slow breath of the camera descending. The mood is quiet authority before markets open. Cinematic grain, luxury financial publication quality.

## Usage

Used in `landing-page/index.html` as the hero section full-bleed background video, positioned absolute behind the headline content. Falls back to `hero-bg.png` if video cannot play.
HTML: `<video autoplay muted loop playsinline><source src="../assets/hero-bg.mp4" type="video/mp4"></video>`
