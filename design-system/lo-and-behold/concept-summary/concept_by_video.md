# Lo and Behold — Concept by Video

## Scroll Opening

The page loads with the hero already fully established — full-screen background video running at the ambient atmosphere it was designed to hold, centered typography visible at full opacity, transparent nav in place. There is no page-load entrance sequence; the cinematic state is the default state from the first frame. The video content is dark and desaturated: abstract particle forms or light bokeh rather than legible footage. The effect is of arriving inside a working atmosphere rather than watching a presentation begin.

## Hero Experience

The hero background video is a continuous ambient loop — not a product demo, not a brand statement video, but a texture of light and motion that establishes the register before the user has read a word. As the user begins scrolling, the hero video remains visually anchored while the content layer below scrolls upward over it, creating a shallow parallax depth effect without scroll-hijacking. The hero does not pin or stop the user — it simply holds its position as the next section climbs into view.

## Section Transitions

The hero-to-typographic-statement boundary is the site's single signature motion event. An animated sinusoidal wave — approximately 1.5 to 2 peaks visible across the viewport width, with a shallow amplitude of 3–5% of the viewport height — continuously oscillates at the section's top edge. The wave moves at its own tempo: continuous, not scroll-scrubbed, not responding to scroll speed. It functions as a breathing seam between the static atmospheric hero and the text-driven section below. The dark-to-light chapter break between the typographic statement and the portfolio grid is a hard straight-edge color shift — the most structurally definitive moment on the page. All other section boundaries use straight horizontal edges.

## Content Rhythm

Scroll-triggered content reveals follow a progressive fade-in combined with a short-distance slide-up: elements emerge smoothly from slightly below their resting position as the viewport crosses their trigger point. Duration range is 0.3–0.7s with smooth cubic-bezier easing. In the portfolio grid, cards animate in with a directional stagger — building in reading order (left-to-right, top-to-bottom) — directing the eye systematically through the collection. A client logo marquee section runs as an autonomous, continuously scrolling horizontal track; it does not respond to user scroll input and does not require interaction to advance.

## Footer Approach

The footer section is a clean dark field matching the site's dark register. Typography follows the established hierarchy. No distinctive entrance animation beyond the standard fade-up reveal applied to its content. The transition from the portfolio grid's light background back to the footer's dark field is a straight hard edge — the light register closes without ceremony. The site finishes as it began: dark, composed, and without decoration.

## Motion Principles

Two motion registers operate independently. Atmospheric motion — the hero video, the animated wave divider — runs continuously on its own clock, independent of user input. Content motion — fade-and-rise reveals, staggered grid entries — is scroll-triggered and proportional to viewport position. GSAP is confirmed in the technology stack. The premium quality comes from the ambient hero video, the animated section divider, and the custom shape language on cards — not from complex per-element orchestration in content sections. No spring physics, no scroll-hijacking, no GSAP-per-element staggers on static content. The motion system rewards scroll with steady, confident reveals.

## Video Placements

**1. Hero Section — Atmospheric particle/light ambient loop**
- Suggested file: `hero-bg-ambient.mp4`
- Subject: A slow, dark ambient clip — abstract, fine-grained particles or soft bokeh light forms drifting across a near-black field; no identifiable subjects, no motion blur, no rapid movement; 10–12s loop with a seamless loopback point; the camera (or simulation) barely moves; the motion is more texture than footage — the kind of video that reads as a living still
- Duration: 10–12s loop
- Why video: The hero communicates entirely through atmosphere before the user engages with any text. A static dark background in this position would reduce the opening to a typography exercise. The ambient video creates depth and a sense of being inside a working environment — it signals that this studio thinks in motion, not just in layout.

**2. Portfolio Grid Cards — Project preview autoplay clips**
- Suggested file: `project-preview-01.mp4` (and equivalents for additional cards)
- Subject: Short (4–6s) autoplay loops showing actual project outputs — interface motion, brand animation, physical product in motion, or campaign still frames dissolving; no audio; muted; each clip is specific to one project card and loops within its custom concave-arced frame; the clip should have sufficient visual interest to communicate the project's character within 2 seconds of looping
- Duration: 4–6s per card, looping
- Why video: The portfolio grid section uses custom wavy-card frames that already signal design investment. Autoplay video inside those frames turns each card from a still thumbnail into a micro-demonstration of the work's motion character — which is precisely what a digital creative studio's portfolio should show. Still photography in this position would undersell the most important evidence the site offers.
