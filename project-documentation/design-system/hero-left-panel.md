# Hero Left Panel — Image Asset Slot

**Status**: Placeholder — no image generated yet
**Panel position**: Left (dark/moody treatment)
**Placeholder background**: `var(--color-kv-dark-section)` → `#1a1a6e`

## Placeholder div pattern

Use this pattern in HTML until the image asset is available:

```html
<div class="hero-panel-image">
  <!-- Background color = var(--color-kv-dark-section) #1a1a6e -->
  <!-- When image is ready: replace background-color with background-image: url('path/to/left-panel.jpg') -->
  <div class="hero-panel-placeholder-label" aria-hidden="true">
    [Image] Solo creator — dim room, single monitor, slow<br>
    Prompt: design-system/hero-left-panel.md
  </div>
</div>
```

## Image generation prompt (Kling / Midjourney)

> A solo video creator working alone at a cluttered desk in a dim room. Single monitor, scattered hard drives and cables, tired expression, muted blue-purple tones. Cinematic, moody, slow feeling. Shot from slightly above, wide angle. No text.

## Usage notes

- When the image asset is available, set `background-image: url(...)` on `.hero-panel--left .hero-panel-image`
- Remove the placeholder `background-color` declaration at the same time
- The image should be a full-bleed cover fill (`background-size: cover; background-position: center`)
- Pair with the right panel prompt (`hero-right-panel.md`) — both images should feel like companion shots (same wide angle, same lighting ratio direction, same time of day feel but opposite mood)
