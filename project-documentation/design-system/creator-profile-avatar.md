# Creator Avatar — Generation Prompts

## Asset specifications

- Dimensions: 120x120px, square crop
- Usage: Creator identity header on /creators/username.html
- Format: JPEG or WebP

## Image generation prompt (Midjourney / DALL-E)

Portrait photograph, professional creative, neutral studio background,
warm lighting consistent with luxury brand aesthetic (warm cream tones),
close crop, confident direct gaze, editorial photography style.
Style: high contrast, refined, no text, no watermarks.
Color temperature: warm — consistent with page background (#f0ede6).

## Kling / video prompt (if avatar is animated)

Not applicable for static avatar. If an animated avatar loop is desired:
Smooth 2-second loop, subject breathing subtly, no camera movement,
neutral studio background, consistent warm color temperature.

## Placeholder currently in use

```html
<div class="creator-identity__avatar" aria-label="Creator avatar: @username">
  [Creator avatar: @username]
</div>
```

Replace with:
```html
<img src="../assets/username-avatar.jpg" alt="Studio Username" class="creator-identity__avatar">
```

Note: When replacing, remove the `display: flex` centering styles that position the
placeholder text — the `<img>` will render the asset directly. The width/height/border
styles on `.creator-identity__avatar` remain correct for the img element.
