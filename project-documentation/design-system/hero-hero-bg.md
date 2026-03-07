# Hero Background Video — hero-bg.mp4

**Placement:** Hero section, full-viewport looping background
**Output path:** /assets/hero-bg.mp4
**Generator:** Kling AI

---

## Kling Prompt

A single creator works at a worn wooden desk in a darkened studio at golden hour. The frame opens in extreme close-up on hands resting on a keyboard — fingers poised, not typing, a moment of focused stillness before motion begins. Warm amber light streams in through a tall window at frame left, casting long directional rays across the desk surface and catching dust motes suspended in the air. The background falls away into a deep forest green shadow, almost indistinguishable from the wall behind. No text, no screens, no UI elements are visible anywhere in the frame.

Shallow depth of field. The keyboard and hands are in sharp focus; the background dissolves into soft bokeh. The amber light shifts almost imperceptibly over the 8-second loop — brightening very slightly at the midpoint, then easing back — giving the scene a slow, breathing rhythm. The loop is seamless: the final frame dissolves back to the opening frame without a cut.

Color palette: deep forest green (#183f26) in the shadows and background surfaces; warm amber (#e8b14d) carried in the window light, catching the edge of the desk, the rim of a coffee cup at the far edge of the frame. No other colors. No blue tones, no cool fills — the entire scene lives in the green-to-amber range.

Lighting is documentary-style and naturalistic — a single practical window source, no fill lights, no rim lights from off-camera. The overall exposure is low-key: more shadow than light, with the amber rays doing all the work of revealing form.

Aspect ratio: 16:9. No motion blur artifacts. No camera movement — the camera is locked on a tripod. The only motion in the frame is the shifting quality of the window light and the barely perceptible rise and fall of the creator's breathing.

The mood is focused creative urgency held in a quiet breath. Community is implied by the presence of a second mug at the edge of frame — someone else was here, or will be soon — but the frame shows one person, one moment, one decision about to be made.

---

## Placement Instructions

Replace the `.hero-video-placeholder` div in `demo/goyard-vid/index.html` with:

```html
<video class="hero-video" autoplay muted loop playsinline aria-hidden="true">
  <source src="/assets/hero-bg.mp4" type="video/mp4">
</video>
```

Place the generated video file at: `demo/goyard-vid/assets/hero-bg.mp4`
