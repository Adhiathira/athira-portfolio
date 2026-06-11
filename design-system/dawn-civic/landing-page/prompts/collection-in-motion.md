# Collection — In Motion (Video)

**File:** assets/collection-in-motion.mp4
**Save to:** `landing-page/assets/collection-in-motion.mp4`
**Type:** Video
**Dimensions:** 1920×1080
**Aspect ratio:** 16:9
**Duration:** 10s
**AI Tool:** Kling 2.6
**Page:** atlas.html
**Section:** collection-showcase

## Context from code
- **Alt text:** Ordnance Press collection — cartographic object examined in diffused daylight
- **Nearest heading:** "The collection, in motion."
- **Section purpose:** Full-bleed video background for the atlas page collection showcase section. Dark rgba overlay with text overlay. The section presents the full Ordnance Press map collection — city surveys, topographic atlases, institutional commissions.
- **Background:** Light-to-dark treatment — the video itself should be bright, diffused, editorial; the overlay brings it dark for text legibility.

## Prompt

++A pair of hands — calm, precise, unhurried — opening a large format map on a pale linen surface++. The map is a city survey: dense linework, fine contours, the name of a city printed in a serif at the top margin. The hands are ++Fitzpatrick type III, clean, no rings++. The linen surface is lit by ++wide diffused daylight from a north-facing window, the light even and shadowless, the kind of light that makes all tones accurate++. The sound is the slow, deliberate sound of thick paper unfolding — a dry, clean sound, institutional. ++The map opens incrementally++: first one fold, then another, the linework revealing itself panel by panel, each fold a small disclosure of more detail — streets, parks, elevation markers, a river curving through the lower quadrant. The hands move with ++practiced, unhurried confidence — not performing, but working++. Midway through the clip, the map is two-thirds open and the hands pause, one resting flat on the surface to hold the sheet, the other tracing a district boundary with a single finger — not pointing, just orienting. ++By the final seconds the map is fully open, filling most of the linen surface, the linework visible across its entirety++, the hands having returned to the edges to hold it flat. The clip ends with the map still, the light still, the sound of the room returning to quiet.

**Motion endpoint:** Opens with the folded map in hands — compact, dense, all its information hidden. Closes with the full sheet open and flat, the entire city survey visible, the hands at rest.

**Camera endpoint:** Camera above the linen surface, looking straight down at 90 degrees — overhead, perfectly level, no angle drift. Framing holds the full map and a border of linen throughout.

**Negative prompt:** No text overlays, no computer screens, no phones, no modern tools, no rulers in shot (hands only), no artificial overhead lighting, no fast motion, no camera movement, no zoom, no hand shake, no jewelry, no nail polish, no background furniture visible, no digital artifacts.

## Usage

Used in `atlas.html` inside `#collection-showcase` as the full-bleed background video.
HTML: `<video src="assets/collection-in-motion.mp4" autoplay muted loop playsinline>`
