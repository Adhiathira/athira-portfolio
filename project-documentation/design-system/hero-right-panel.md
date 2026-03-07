# Hero Right Panel — Image Asset Slot

**Status**: Placeholder — no image generated yet
**Panel position**: Right (bright/energetic treatment)
**Placeholder background**: `var(--color-kv-surface-light)` → `#f6f9fc`

## Placeholder div pattern

Use this pattern in HTML until the image asset is available:

```html
<div class="hero-panel-image">
  <!-- Background color = var(--color-kv-surface-light) #f6f9fc -->
  <!-- When image is ready: replace background-color with background-image: url('path/to/right-panel.jpg') -->
  <div class="hero-panel-placeholder-label" aria-hidden="true">
    [Image] Same creator — bright workspace, collaborating, faster<br>
    Prompt: design-system/hero-right-panel.md
  </div>
</div>
```

## Image generation prompt (Kling / Midjourney)

> The same video creator now in a bright, modern collaborative workspace. Multiple monitors showing a shared video timeline, teammates visible in background, energetic posture, natural light flooding in. Clean, optimistic, fast feeling. Same wide angle as companion shot. No text.

## Usage notes

- When the image asset is available, set `background-image: url(...)` on `.hero-panel--right .hero-panel-image`
- Remove the placeholder `background-color` declaration at the same time
- The image should be a full-bleed cover fill (`background-size: cover; background-position: center`)
- Pair with the left panel prompt (`hero-left-panel.md`) — both images are companion shots of the same creator, before and after joining the platform
