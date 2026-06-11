# Unavailable Content — Generation Prompts

When the design system browser cannot render an asset faithfully, it directs you here. Use the appropriate prompt below with the indicated tool to generate a representative stand-in.

---

## Images — Nano Banana

Use these prompts in **Nano Banana** when an extracted image or visual asset is unavailable.

### Hero / Brand Photography

```
A cinematic, editorial-quality photograph in the visual language of [SITE_NAME].
Style: [describe extracted concept — e.g. "minimal luxury with warm neutral tones", "high-contrast monochrome editorial"].
Mood: [extracted concept mood — e.g. "quiet confidence", "precision and craft"].
Composition: [e.g. "centered subject, generous negative space, subtle depth of field"].
Color palette: [paste extracted hex values from color-system.json, e.g. "#F5F0EB, #1A1A1A, #8B7355"].
No text, no logos. Photorealistic. Aspect ratio 16:9.
```

**Fill in:** `[SITE_NAME]`, the concept description from `concept.json`, and the primary palette from `color-system.json`.

---

### UI Screenshot / Product Shot

```
A clean product UI screenshot in the visual style of [SITE_NAME].
Typography: [paste font names from typography.json typeScale].
Color palette: [paste hex values from color-system.json].
Layout: [describe grid — e.g. "12-column, generous margins, cards with 24px padding"].
Style: [e.g. "SaaS dashboard, dark theme, dense information hierarchy"].
Realistic interface elements. No lorem ipsum. Aspect ratio 16:9.
```

---

### Texture / Material

```
A close-up macro photograph of [MATERIAL — e.g. "hand-stitched leather", "brushed stainless steel", "matte paper with embossed lettering"].
Lighting: [e.g. "soft directional light from the left, subtle shadow"].
Color palette: [paste hex values].
Photorealistic. Square crop.
```

---

## Video / Motion — Kling

Use these prompts in **Kling** when extracted motion or interaction data cannot be played back.

### Brand Motion / Intro Sequence

```
A 3–5 second brand motion sequence in the visual language of [SITE_NAME].
Style: [describe extracted motion concept — e.g. "slow reveal, typographic fade-in", "liquid organic transitions", "sharp geometric wipes"].
Color palette: [paste hex values from color-system.json].
Typography: [paste primary font from typeScale — e.g. "Neue Haas Grotesk, all-caps, tracking +0.1em"].
Easing: [paste easing curves from motion.json — e.g. "cubic-bezier(0.16, 1, 0.3, 1)"].
No audio. 1920×1080. Black background.
```

**Fill in:** motion easing values from `motion.json`, concept from `concept.json`.

---

### Scroll / Parallax Demonstration

```
A 4-second looping video demonstrating a [EFFECT — e.g. "parallax scroll", "fade-and-slide reveal", "staggered card entrance"] effect.
Visual style: [site's design concept].
Color palette: [paste hex values].
Elements: [e.g. "three editorial cards with headline text entering from bottom"].
Timing: [paste duration and delay values from motion.json].
Seamless loop. 1920×1080.
```

---

### Hover / Interaction State

```
A 2-second loop showing a UI element transitioning from its default to hover state, in the style of [SITE_NAME].
Element: [e.g. "a navigation link with an underline draw-on effect"].
Transition: [paste transition duration and easing from motion.json].
Color: [paste relevant colors].
Clean white or dark background matching the site's palette. 800×200.
```

---

## How the browser uses this file

When the design system browser detects a missing or unrenderable asset, it displays a diagnostic component pointing to this file. The component shows:
- The asset type and identifier
- The reason it cannot be rendered
- A direct reference: _"See `project-documentation/unavailable-content-prompts.md` for generation prompts"_

Fill in the bracketed placeholders from the site's extracted JSON files in `design-system/<site-name>/`.
