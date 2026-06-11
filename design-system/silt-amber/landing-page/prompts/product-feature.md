# Product Feature Video

**File:** assets/product-feature.mp4
**Save to:** `landing-page/assets/product-feature.mp4`
**Type:** Video
**Aspect ratio:** 16:9
**Duration:** 10s
**AI Tool:** Kling 2.6
**Page:** index.html
**Section:** #product-split

## Context from code
- **Alt/title:** (no explicit title — editorial product split video)
- **Nearest heading:** "Oscietra Reserve" (h2 .product-label)
- **Section purpose:** Right column of the editorial 5fr/7fr product split grid. The video fills 580px height at full column width, serving as the visual anchor for the Oscietra Reserve product description. Container is `#product-split-video` with clip-path wipe entrance animation.
- **Background:** dark #1a1a18 warm charcoal page background

## Prompt

A dark slate surface occupies the lower two-thirds of the frame, its grain catching a single soft key light from camera left that rakes across the stone in warm near-black tones. A ++matte black caviar tin++ with minimal embossed lettering descends slowly from above — a hand barely entering the top edge of frame — placed onto the slate with one unhurried, ceremonial gesture filmed at 120fps played at half speed, so the moment of contact carries absolute weight and precision. The tin meets the surface and settles still; the hand withdraws upward out of frame and holds gone. The long natural shadow cast to the right of the tin deepens as the key light reasserts, then the frame holds completely static on the resting tin. Near-silence throughout the descent: the faintest whisper of movement through air, then a soft, muted contact thud as tin meets stone — low, dense, final — then silence. Warm color grade, #1a1a18 darkness in the background — restraint, gravity, ritual.

## Negative Prompt

No text overlays, no logos, no watermarks, no jump cuts, no morphing objects, no shaky distortion, no flickering, no additional hands or props, no background distractions, no prop changes mid-shot, no cool or blue tones, no bright overexposure

## Applied

Mode:     text-to-video
Style:    cinematic (specified)
Duration: 10s (specified)
Aspect:   16:9 (specified)
Audio:    sfx (air whisper, muted contact thud, silence)

## Usage

Used in `index.html` inside `#product-split` as the right-column editorial video for the Oscietra Reserve product section.
HTML: `<video src="assets/product-feature.mp4" autoplay muted loop playsinline>`
