# paste-board — Motion Concept

## Scroll Opening (0–3s)

The page loads showing only the warm paper background. Then, in rapid sequence, collage elements "pin" into place: each card drops from above (pin-drop keyframe) with a tiny bounce and slight rotation, settling at its final tilt angle. The effect mirrors placing photographs and clippings onto a real board.

## Hero Assembly

The hero section is a collage in motion. From scattered, off-screen positions, 5–7 cards and text fragments animate in on scroll with staggered pin-drop and tilt-jiggle keyframes. The Caveat headline types itself into view (or fades in last, anchoring the composition). Tape strips fade in across card corners as a final touch.

## Scroll Transitions

As the user scrolls through sections:
- Feature cards enter with `tilt-jiggle` — each card arrives at a slight angle and settles
- Sticky notes slide in with `tape-reveal` — a skewed slide from the left corner
- Polaroid testimonial cards drop in with `pin-drop` with stagger 0.1s between each
- Pull quote fades in with the quote mark scaling up first, then text appearing

## Hover Interactions

When a user hovers a tilted card, it springs to perfectly straight (rotate 0deg) and lifts slightly (translateY -4px). The spring easing (0.34, 1.56, 0.64, 1) gives a physical snap — like picking up a piece of paper off a board. On mouse-out it tilts back to its original angle.

## Suggested Video Placements

1. **Process video (hero or features section):** Hands assembling a physical mood board — cutting, placing, and taping images. Shot overhead on warm paper surface. Duration: 15–30s loop.

2. **Product showcase (gallery section):** Screen recording of the Clippings app UI in use — dragging images, creating boards, annotating. Clean, warm ambient light.

3. **Studio ambience (about section):** Wide shot of a creative studio — cork boards covered in reference images, warm afternoon light. No faces necessary. Duration: 10–20s loop.

## Transitions Between Pages

Page transitions use a brief tape-reveal — the new page slides in from the left with a slight skew, as if a new sheet of paper is being laid over the previous one. Outgoing page fades with mild scale-down.
