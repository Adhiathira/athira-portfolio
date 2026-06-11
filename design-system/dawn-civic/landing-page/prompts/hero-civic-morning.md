# Hero — Civic Morning (Video)

**File:** assets/hero-civic-morning.mp4
**Save to:** `landing-page/assets/hero-civic-morning.mp4`
**Type:** Video
**Dimensions:** 1920×1080
**Aspect ratio:** 16:9
**Duration:** 10s
**AI Tool:** Kling 2.6
**Page:** index.html
**Section:** hero

## Context from code
- **Alt text:** Hero background — dawn light moving across Haussmann limestone facade
- **Nearest heading:** "The world, measured and drawn."
- **Section purpose:** Full-bleed hero background video for Ordnance Press homepage. Light rgba overlay (max 0.30). Text positioned bottom-left: brand name, tagline, CTA button.
- **Background:** Dark rgba overlay on limestone — the limestone should read warm, the overlay keeps text legible

## Prompt

A ++limestone building facade in the pale blue stillness before sunrise++, shot from street level across the empty sidewalk. The camera begins perfectly still, holding the full width of the Haussmann building — four stories of ++rusticated grey limestone++ with tall arched windows on each floor, iron balustrades, the geometry precise and severe. The sidewalk is empty, the cobbles damp. ++A barely perceptible lateral drift begins — the camera moving left at 1 centimetre per second++, so slow the stone seems to breathe rather than the camera to move. Silence at first — then the faint, distant sound of a city beginning to wake, a low urban hum like the city drawing breath. As the camera drifts, ++dawn light enters from the upper right, warm amber raking across the limestone courses and casting long parallel shadows in the carved grooves++. The warmth builds incrementally — from cool blue-grey pre-dawn (#b8c4d4 tone) toward warm amber first light (#f0c87a tone). The architectural geometry stays unwavering: the camera drift reveals new stone surface without distorting the proportions. ++By the final seconds the limestone glows, the parallel shadow lines etched deep into the rusticated surface, the building enormous, patient, unhurried.++ The sound has grown fractionally — a distant bell, a single bird, then stillness again.

**Motion endpoint:** Opens in cool pre-dawn stillness, camera locked; closes with warm amber raking light and 10cm of accumulated lateral drift — the building feels warmer, closer, more present.

**Camera endpoint:** Begins centered on the facade's second bay; ends two bays left, the drift so slow the movement reads as the building breathing rather than the camera moving.

**Negative prompt:** No people, no vehicles, no text overlays, no modern signage, no CCTV cameras, no fast motion, no handheld shake, no lens flare, no rain, no wind, no foliage movement, no digital artifacts.

## Usage

Used in `index.html` inside `#hero` as the full-bleed background video.
HTML: `<video src="assets/hero-civic-morning.mp4" autoplay muted loop playsinline>`
