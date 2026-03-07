# Community Signals — Asset Generation Prompts

> Generated for Task 253: [goyard-vid][6/12] Home — How It Works + Community Signals Sections
> These prompts are for AI image generation tools (Midjourney, DALL-E, Flux, etc.)
> Place generated files in `demo/goyard-vid/assets/community-signals/`

---

## Creator Avatars (3 required)

Square crop, circular display. 512×512px. Warm lighting throughout. Color temperature matches platform palette: golden amber (#e8b14d) and forest green (#183f26) tones. Each creator should feel distinct in age, style, and background.

### avatar-1.jpg — Marisol (@marisol_films)
**Style**: Documentary filmmaker. Late 20s. Latinx woman. Creative workspace background (bookshelf, warm lamp light). Wearing simple dark clothing. Confident, direct gaze. Shot on a medium-format aesthetic with shallow depth of field.
**Lighting**: Warm tungsten mixed with natural window sidelight. Golden amber highlights on face.
**Prompt suggestion**:
`Portrait of a confident young Latina woman filmmaker in her late 20s, seated at a creative workspace with warm tungsten lighting, bookshelves softly blurred in background, shallow depth of field, cinematic medium-format look, warm golden-amber rim lighting, editorial photography, 512x512 square crop`

---

### avatar-2.jpg — Theo (@theo_motion)
**Style**: Motion graphics / abstract video artist. Mid 30s. Black man. Clean studio background, abstract digital art prints visible. Casual creative attire. Thoughtful, slightly off-camera gaze.
**Lighting**: Soft diffused studio light. Cool ambient fill with warm key light creating amber-green contrast.
**Prompt suggestion**:
`Portrait of a thoughtful Black man in his mid-30s, motion graphics artist, seated in a clean modern studio, abstract digital art prints visible in the soft background, soft studio lighting with warm key and cool fill, slight off-camera gaze, cinematic editorial look, 512x512 square crop`

---

### avatar-3.jpg — Priya (@priya_cuts)
**Style**: Narrative film editor / director. Early 30s. South Asian woman. Behind a monitor showing a timeline. Focused expression. Warm creative office atmosphere.
**Lighting**: Screen glow mixed with warm overhead ambient. Slight blue-green from monitor balanced with warm practical lamps.
**Prompt suggestion**:
`Portrait of a focused South Asian woman filmmaker in her early 30s, seated at an editing workstation with a monitor showing a timeline partially visible, warm office ambient lighting mixed with cool monitor glow, editorial photography aesthetic, creative professional, 512x512 square crop`

---

## Featured Project Thumbnails (3 required)

16:9 aspect ratio. Cinematic composition. Each thumbnail represents a different genre of creator output on the platform. Color temperature consistent with platform warm tone.

### featured-work-1.jpg — Documentary still (for @marisol_films)
**Genre**: Documentary / observational
**Subject**: A street market scene — a vendor arranging colourful produce, warm midday light, candid composition, slight lens flare.
**Mood**: Warm, human, grounded.
**Prompt suggestion**:
`Cinematic documentary still, street market vendor arranging colourful produce in warm midday sunlight, candid street photography aesthetic, slight lens flare, warm golden hour colour grading, 16:9 composition, film grain, photorealistic`

---

### featured-work-2.jpg — Artistic / abstract still (for @theo_motion)
**Genre**: Abstract motion graphics / experimental
**Subject**: Fluid abstract forms — ink-in-water or light diffraction patterns rendered digitally. Deep greens and amber golds. High contrast.
**Mood**: Elegant, mysterious, technical craft.
**Prompt suggestion**:
`Cinematic abstract art still, fluid motion graphics composition with deep forest green (#183f26) and golden amber (#e8b14d) colour palette, ink-in-water diffusion aesthetic rendered digitally, high contrast, elegant and mysterious mood, 16:9 frame, ultra-sharp detail`

---

### featured-work-3.jpg — Narrative still (for @priya_cuts)
**Genre**: Short narrative film
**Subject**: Two people in conversation at a coffee shop window — warm backlit silhouette composition, overexposed window light, shallow depth of field.
**Mood**: Intimate, warm, human drama.
**Prompt suggestion**:
`Cinematic narrative film still, two people in intimate conversation seated at a coffee shop window, warm backlit silhouette composition, overexposed golden window light, shallow depth of field, film photography aesthetic, warm colour grade, 16:9 aspect ratio`

---

## Placement

Once generated, save files to:
```
demo/goyard-vid/assets/community-signals/
  avatar-1.jpg
  avatar-2.jpg
  avatar-3.jpg
  featured-work-1.jpg
  featured-work-2.jpg
  featured-work-3.jpg
```

Then replace the placeholder `<div>` elements in `demo/goyard-vid/index.html` with:
```html
<img src="assets/community-signals/avatar-1.jpg" alt="@marisol_films — creator avatar" class="creator-avatar">
<img src="assets/community-signals/featured-work-1.jpg" alt="Featured work by @marisol_films" class="creator-featured-work">
```
