# Atelier — Morning Light (Video)

**File:** assets/atelier-light.mp4
**Save to:** `landing-page/assets/atelier-light.mp4`
**Type:** Video
**Dimensions:** 1920×1080
**Aspect ratio:** 16:9
**Duration:** 10s
**AI Tool:** Kling 2.6
**Page:** index.html
**Section:** atelier

## Context from code
- **Alt text:** Ordnance Press atelier — morning light shifting across a cartography workbench
- **Nearest heading:** "Made in the atelier."
- **Section purpose:** Full-bleed video background for the dark contrast "atelier" section. Dark rgba overlay (0.52). White text over the video. The section describes the studio's process — cartographers working by hand, instruments, precision.
- **Background:** Dark section — the video should be moody but warm beneath the overlay. The overlay reduces to a rich dark atmosphere, not a solid black.

## Prompt

++An empty cartography workbench in early morning light++, shot from a low angle — the camera at the level of the bench surface, looking along its length. The bench is oak, worn smooth by decades of use. On its surface: a set of ++technical drawing pens arranged in a wooden tray++, a steel cartographic rule, a magnifying loupe, several rolled drafting tubes standing in a terracotta vessel. ++Morning light from a high warehouse window enters from the upper left++, moving almost imperceptibly across the bench surface as the earth turns — a slow, dignified arc of warm light crossing dark wood. The sound is near-silence: the faint creak of the building settling, the distant sound of rain on glass, then quiet again. ++The light moves across the pen nibs — each catches a brief glint as the angle shifts++, the steel rule holding the beam longest. The camera does not move — it is the world that moves, the light cycling through its slow geometry. ++By the mid-point of the clip the light has warmed noticeably, the wood grain reading deep amber where the beam falls and near-black in shadow.++ At the very end, the beam begins to narrow as the window angle changes, and the bench returns toward its beginning darkness — a quiet cycle, complete.

**Motion endpoint:** Opens in cool pre-dawn bench — tools barely visible. Closes with amber morning light fully established across the surface, the pen nibs glinting, the grain of the wood luminous.

**Camera endpoint:** Camera fixed, low, along the bench length — no movement. The motion is entirely the light.

**Negative prompt:** No people, no hands, no faces, no computer screens, no modern objects, no clocks, no vibration, no fast cuts, no zoom, no handheld shake, no artificial lighting, no overhead fluorescent, no digital artifacts.

## Usage

Used in `index.html` inside `#atelier` as the full-bleed background video for the dark contrast section.
HTML: `<video src="assets/atelier-light.mp4" autoplay muted loop playsinline>`
