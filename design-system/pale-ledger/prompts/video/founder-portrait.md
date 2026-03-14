# Founder / Client Portrait Video

**File name:** founder-portrait.mp4
**Save to:** `pale-ledger/assets/founder-portrait.mp4`
**Type:** Video
**Dimensions:** 400x400
**Duration:** 4–6 seconds, seamless loop
**AI Tool:** Kling 2.6

## Prompt

Editorial portrait video of a woman in her late 40s, a senior portfolio manager, against a warm cream (#fcfbf9) studio background with a subtle navy-tinted shadow behind her. She is dressed in a dark navy blazer, expression composed and quietly assured. The camera is locked off — absolute stillness — while only the most human micro-motions animate the scene: a single slow breath expanding and releasing, the faintest blink once over the duration of the clip, a barely-perceptible shift of weight. Her eyes are looking slightly off-camera toward the upper right, conveying composed forward-thinking authority. The studio key light is soft from the left, gentle fill from the right. The video has the quality of a luxury financial publication portrait made cinematic: grain-free, precise, warmly human without sentimentality. Square crop, face centered. The motion communicates presence, not performance.

## Usage

Used in `landing-page/index.html` as the avatar video in the first testimonial card (Margaret Hollingsworth, CIO, Aldgate Capital Management). Falls back to `founder-portrait.jpg` if video cannot play.
HTML: `<video autoplay muted loop playsinline><source src="../assets/founder-portrait.mp4" type="video/mp4"></video>`
