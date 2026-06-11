# Journals Collection Panel Video

**File:** assets/category-ambient-1.mp4
**Save to:** `landing-page/assets/category-ambient-1.mp4`
**Type:** Video
**Aspect ratio:** 9:16
**Duration:** 5s
**AI Tool:** Kling 2.6
**Page:** index.html
**Section:** panel-1 (inside #collections)

## Context from code
- **Alt/title:** (no alt — decorative background video inside collection panel)
- **Nearest heading:** "Journals" (h2, .panel-label)
- **Section purpose:** First of three tall collection panels in the editorial grid; this panel represents the hand-bound journals category with text overlay and CTA rendered above the video
- **Background:** Dark — `.panel-overlay--journals` darkens the video to ensure the white panel text and CTA button remain legible

## Prompt

A single hand-sewn leather journal rests closed on a dark walnut surface, positioned in the lower center of the frame with deep shadow filling the upper two-thirds — ++full-grain burgundy leather cover with faintly embossed surface texture and linen thread binding visible along the spine++, lit by a warm overhead key light positioned just off-center, soft rim catching the spine edge while shadow pools deep beneath and to the right. Camera holds completely still, vertical composition. A candle flame positioned just outside the left edge of frame sends a slow amber flicker across the leather face — the warm light travels left to right across the cover over five seconds, brightening the embossed grain as it passes, then settles and holds still. The leather maintains its exact form and color throughout. Near-silence — only a faint low candle crackle at the edge of audibility and the quiet, still air of a closed room.

## Negative Prompt

No text overlays, no logos, no watermarks, no jump cuts, no morphing objects, no background distractions, no prop changes mid-shot, no human figures, no camera movement, no flickering distortion, no fast motion

## Applied
Mode:     text-to-video
Style:    product (specified)
Duration: 5s (specified)
Aspect:   9:16 (specified)
Audio:    ambience (faint candle crackle, still room air)

## Usage

Used in `index.html` inside `#panel-1` (within `#collections`) as the full-bleed background video for the Journals collection panel.
HTML: `<video class="panel-video" autoplay loop muted playsinline><source src="assets/category-ambient-1.mp4" type="video/mp4"></video>`
