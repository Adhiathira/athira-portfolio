# Creator Portfolio Thumbnails — Generation Prompts

## Asset specifications

- Dimensions: 16:9 aspect ratio (e.g., 1280x720px or 1920x1080px)
- Usage: Portfolio grid on /creators/username.html — 6 thumbnails
- Format: JPEG or WebP

## Image generation prompt (for static thumbnail stills)

Cinematic video thumbnail, professional production quality, dramatic lighting,
strong composition. Subject: [brief description per card — see below].
Style: editorial, high contrast, film-grade color grading. No text overlays.
Color temperature: warm to neutral — consistent with page aesthetic.

## Per-card subject descriptions

1. Short film montage — sweeping urban landscape, golden hour, motion blur
2. Brand identity reveal — product shot, clean white surface, geometric lighting
3. Documentary excerpt — candid portrait, authentic moment, photojournalism style
4. Motion typography — abstract shapes, bold color field, typographic form
5. Product showcase — still life, macro lens, studio lighting, premium material
6. Travel diary — foreign street scene, ambient natural light, warm color palette

## Kling video prompt (for animated thumbnail previews)

Smooth 3-second loop, cinematic color grade, [subject description],
slight camera movement (gentle dolly or breathing parallax), no text.

## Placeholder currently in use

```html
<div class="card-media portfolio-thumb">
  <div class="card-media-placeholder">
    <span class="placeholder-filename">[Video thumbnail: creator project — brief description]</span>
  </div>
</div>
```

Replace with:
```html
<div class="card-media portfolio-thumb">
  <img src="../assets/creator-thumb-1.jpg" alt="Short film montage" class="card-media-img">
</div>
```

Note: The `.portfolio-thumb::after` play icon overlay is CSS-only and will remain
functional after replacing the placeholder div with a real `<img>` — the `::after`
pseudo-element is positioned absolutely over the parent `.portfolio-thumb` container.
Ensure the parent retains `position: relative` (it already does via `.portfolio-thumb`).
