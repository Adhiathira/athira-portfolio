# Feature Product Demo

**File:** assets/feature-product.mp4
**Save to:** `landing-page/assets/feature-product.mp4`
**Type:** Video
**Aspect ratio:** 16:9
**Duration:** 10s
**AI Tool:** Kling 2.6
**Page:** index.html
**Section:** #product-demo

## Context from code
- **Alt/title:** demo-video (no explicit alt — product demo inside browser chrome)
- **Nearest heading:** "See SONOR in action."
- **Section purpose:** Mid-page editorial pause — the video plays inside a mocked browser window showing the SONOR application interface cycling through measurement and correction UI states
- **Background:** Light — section uses near-white #f5f5f7 surface

## Prompt

++SONOR software interface++ displayed on a clean monitor screen, filling the frame — a precision acoustic measurement application with frequency response graphs, waveform displays, and correction curve controls rendered in the spectral accent palette of pink-to-indigo data visualization. The interface performs a slow, mechanical scroll downward through its own UI, revealing a second panel state — the correction module with EQ curves arcing across a dark data surface. The scroll completes and holds on the correction view for a measured beat, then a soft dissolve transitions to a third state: the analysis dashboard with room resonance readings. No hand, no cursor animation, no human presence — only the interface moving with unhurried, deliberate authority. Camera holds completely still on the screen, no drift, no tilt. The audio is near-silence: a faint digital interface click as the first scroll initiates, then the quiet hum of precision electronics.

## Negative Prompt

No text overlays outside the interface itself, no logos, no watermarks, no jump cuts, no morphing objects, no human hands, no cursor visible, no background distractions, no prop changes mid-shot, no shaky distortion, no flickering

## Applied
Mode:     text-to-video
Style:    product (inferred)
Duration: 10s (inferred — 8s requested but not a supported Kling 2.6 value; nearest is 10s)
Aspect:   16:9 (specified)
Audio:    sfx

## Usage

Used in `index.html` inside `#product-demo` as the browser-chrome product demo video showing the SONOR application interface cycling through UI states.
HTML: `<video src="assets/feature-product.mp4" autoplay muted loop playsinline>`
