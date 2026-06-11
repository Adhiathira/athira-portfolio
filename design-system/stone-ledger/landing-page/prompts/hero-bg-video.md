# Hero Background Video

**File:** assets/hero-bg.mp4
**Save to:** `landing-page/assets/hero-bg.mp4`
**Type:** Video
**Aspect ratio:** 16:9
**Duration:** 10
**AI Tool:** Kling 2.6
**Page:** index.html, contact.html (index uses this video)
**Section:** #hero

## Context from code
- **Alt/title:** Kerala High Court colonnade, slow drift, opacity 0.18–0.22 over dark overlay
- **Nearest heading:** Aravindan & Co.
- **Section purpose:** Full-viewport hero establishing institutional identity before any copy is read
- **Background:** Very dark near-black #1a1a14

## Prompt

Exterior colonnaded verandah of the Kerala High Court in Ernakulam, early morning, very slow lateral camera drift leftward at approximately 0.3× real-time speed. Warm sandstone columns in raking early dawn light casting long narrow shadows across the stone floor. The camera is low and parallel to the colonnade — each column passes the frame at a measured, unhurried pace, one column approximately every four seconds. No people in frame. The stone is warm buff-gold, slightly weathered, the kind of surface that accumulates decades of monsoon and sun. The sky beyond the columns is pale indigo fading to amber at the horizon. Dust motes visible in the shaft of early light. Camera movement is barely perceptible — like institutional time itself.

## Negative Prompt

People, vehicles, modern architecture, fast motion, handheld shake, color grading, lens flare, tourist atmosphere, tropical vegetation in foreground, drone shot, commercial hotel aesthetic.

## Applied

Slow lateral drift past colonnade, dawn warm light, #1a1a14 shadow zones with warm buff #f2efe9-toned stone surfaces, deeply atmospheric and unhurried — the restraint of institutional precedent expressed through motion.

## Usage

Used in `index.html` inside `#hero` as the full-viewport video background behind the firm name lockup, playing at reduced opacity (0.18–0.22) over a dark overlay.
HTML: `<video src="assets/hero-bg.mp4" autoplay muted loop playsinline>`
