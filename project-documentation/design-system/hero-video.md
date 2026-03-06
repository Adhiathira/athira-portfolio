# Hero Background Video — Kling AI Generation Prompt

This file contains the Kling AI video generation prompt for the caspers-vid hero background (`hero-bg.mp4`). The prompt is derived directly from extracted design tokens: color palette from `color-system/colors.json`, motion pacing from `motion-system/motion.json`, and brand concept from `concept-summary/concept.md`.

The generated video will serve as a full-bleed looping background behind the caspers-vid hero section. It must coexist with Locomotive Scroll parallax at `data-scroll-speed: "-0.5"` — meaning the video element moves at half the scroll velocity. Every frame of the video must be visually coherent in isolation, because the visible frame is always changing relative to the viewport position.

---

## Kling AI Video Prompt

### Scene Description

A near-static close study of a dark, glistening surface — the kind found on freshly opened caviar. The surface fills the frame edge to edge. It is not a product shot; it is almost abstract. Individual dark spheres catch warm light at oblique angles, producing tiny points of warm parchment-colored glisten (`#d4c9b4`) scattered sparsely across an otherwise uniform deep warm brown (`#2d2b28`). The surface recedes into depth: the far plane dissolves into deep charcoal black (`#1a1a1a`), creating the impression of infinite darkness behind the texture. There are no sharp edges, no defined objects, no identifiable forms — only surface, depth, and the faintest suggestion of material weight.

The camera is static. If it moves at all, the motion is a barely-perceptible push-in: starting perhaps 0.5% wider than the end frame over the full 6–8 second duration. The viewer should feel like the frame is breathing rather than moving. There is no panning, no tilting, no rack focus, no hand-held shake. The camera simply exists in front of the surface like a held breath.

### Aspect Ratio

16:9

### Color Palette — Strict

Use only the following three values. No other colors appear anywhere in the frame, in the depth layers, in the light, or in the shadows.

- `#2d2b28` — dominant surface color, warm dark brown, derived from caviar photography
- `#1a1a1a` — deep background, deep charcoal black, where the image dissolves at depth
- `#d4c9b4` — warm parchment tan, used only as light catch on individual surface points — sparingly, appearing as small specular highlights, not as a wash or fill

No blues. No greens. No reds. No neutrals outside this range. No skin tones, no ambient daylight, no studio white.

### Atmosphere Keywords

Heavy. Textural. Quietly opulent. Intimate. Cold material weight. Dark luxury. Depth layers. Slow pour. Still water surface. Candlelit grain. No urgency. No energy. Just presence.

### Motion Pacing

Extremely slow. Think of the pacing as a 0.3-second easing curve — `cubic-bezier(0.4, 0, 0.2, 1)` — stretched across the entire 6–8 second duration. Or equivalently, a cinematic 1-second ease — `cubic-bezier(0.625, 0.05, 0, 1)` — applied at one-sixth normal speed. There is no acceleration, no moment of drama. If the surface has any micro-motion (light shift, depth shimmer), it moves slower than a human blink. The video should feel like a photograph that is barely, reluctantly, almost-not-quite alive.

### Loop — Seamless Crossfade Required

The final frame must be visually identical to the first frame, or close enough that a crossfade dissolve over 0.5–1 second is completely invisible. Do not let the camera drift or the light shift across the duration in a way that makes the start and end frames distinguishable. The loop point must be imperceptible.

If the platform permits specifying a loop type: use crossfade/dissolve loop, not a hard cut.

### Duration

6 to 8 seconds. Prefer 8 seconds for a more imperceptible loop rhythm.

### Negative Prompt

text, words, letters, typography, logos, watermarks, branding marks, people, faces, hands, body parts, skin, hair, camera shake, handheld motion, lens flare, light bloom, bokeh rings, bright light sources, white backgrounds, cream backgrounds, off-white wash, colors outside `#2d2b28` / `#1a1a1a` / `#d4c9b4`, oversaturated, high contrast, vivid, punchy, dynamic, energetic, fast movement, bubbles, water, liquid pour, splash, condensation, ice, reflective glass, mirrors, silver, gold, metallic sheen (except warm parchment glisten), food styling, product photography, studio setup, visible lighting rig, hard shadows, rim lighting, colored gel lighting, neon, RGB, cinematic action, dramatic reveal, any movement faster than a slow drift

---

## How to Use This Video

1. Open Kling AI and create a new video generation. Paste the Scene Description above as the main prompt. Paste the Negative Prompt into the negative prompt field. Set aspect ratio to 16:9 and duration to 8 seconds.

2. If Kling offers a "motion level" or "camera motion intensity" slider, set it to the minimum value (0 or lowest available).

3. After generation, review the output. Check that the loop point is invisible when played back-to-back. Check that no colors outside the three specified hex values appear anywhere in the frame. Check that no motion faster than a slow drift is present.

4. Export the video and save it as `public/hero-bg.mp4` in the caspers-vid project directory. Use H.264 encoding for broadest browser support. Target file size under 5MB for reasonable load performance.

5. In `public/index.html`, locate the `<div class="video-placeholder">` element inside the hero section. Replace it with the following structure:

```html
<video
  class="hero-video"
  autoplay
  loop
  muted
  playsinline
  preload="auto"
>
  <source src="./hero-bg.mp4" type="video/mp4" />
</video>
```

6. The video element already sits inside the Locomotive Scroll container with `data-scroll-speed="-0.5"` applied to its wrapper. No additional JavaScript is required for the parallax behavior — Locomotive Scroll handles it. Confirm the video covers the full hero frame at all scroll positions by testing at the top of the page and mid-scroll.
