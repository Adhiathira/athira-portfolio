# PCB Render Loop

**File:** assets/pcb-render-loop.mp4
**Save to:** `landing-page/assets/pcb-render-loop.mp4`
**Type:** Video
**Aspect ratio:** 16:9
**Duration:** 10s
**AI Tool:** Kling 2.6
**Page:** index.html
**Section:** capabilities

## Context from code
- **Alt/title:** aria-hidden (ambient background video)
- **Nearest heading:** "Three output formats. One prompt."
- **Section purpose:** Mid-page capabilities section — demonstrates the AI generative process visually. PCB traces appearing progressively communicates intelligent production and controlled complexity.
- **Background:** Deep indigo-black #050d1a with dark overlay

## Prompt

On a dark monitor in a dim environment, ++a PCB layout renders progressively++ — thin copper traces appearing one by one from the left edge of the board, differential pairs routing themselves around a central processor footprint, copper pours beginning to fill the ground plane in the lower-right quadrant. Shot on virtual anamorphic lens, 24mm, near-black color grade with warm copper tones. No UI chrome visible in frame, no cursor, no interface elements — only the geometry of the board itself on a dark surface. The rendering progresses deliberately but never completes within the loop, implying continuous intelligent generation. Camera holds completely still on a tight medium shot of the monitor surface, then the final trace segment appears and holds for a beat. A subtle continuous electronic hum underlies the scene — near-silence with only a faint high-frequency digital tone and the soft ambient warmth of the room's electronics. Controlled complexity, technical precision, generative process made visible.

## Negative Prompt

No text overlays, no logos, no watermarks, no jump cuts, no morphing objects, no UI toolbars, no cursor, no person in frame, no flickering, no shaky distortion, no overcrowded frame

## Applied
Mode:     text-to-video
Style:    cinematic (inferred)
Duration: 10s (specified)
Aspect:   16:9 (specified)
Audio:    ambience (electronic hum, faint digital tone)

## Usage

Used in `index.html` inside `#capabilities` as the full-section ambient background video demonstrating the PCB generation process.
HTML: `<video src="assets/pcb-render-loop.mp4" autoplay muted loop playsinline>`
