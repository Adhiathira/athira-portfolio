# Blog Hero Background

**File:** assets/blog-hero-bg.jpeg
**Save to:** `landing-page/assets/blog-hero-bg.jpeg`
**Type:** Image
**Dimensions:** 1440×800
**Aspect ratio:** 16:9
**AI Tool:** Higgsfield Nano Banana Pro
**Page:** pages/blog/index.tsx
**Section:** blog-featured-post

## Context from code
- **Alt text:** (decorative background, aria-hidden="true")
- **Nearest heading:** "The First Agentic Career Mentorship System from Silicon Valley."
- **Section purpose:** Full-bleed editorial hero covering the featured blog post. Deep dark-green gradient overlay (#003620, opacity 0.92 on left, 0.45 on right) sits on top of the image, so the image texture and depth show through on the right half only. The left 55% is nearly consumed by the overlay.
- **Background:** Dark — the image lives beneath a strong green-tinted gradient

## Prompt
A wide cinematic editorial photograph of a Silicon Valley tech campus at dusk, glowing amber and teal light spilling from floor-to-ceiling glass windows onto manicured grounds, shallow depth of field with the foreground lawn soft and bokeh-rich. The scene evokes a high-stakes AI-era career moment: purpose-built, ambitious, quietly prestigious. Deep shadows in cool charcoal and forest green anchor the frame while the warm office glow creates a single luminous focal point at the right third. Color palette centers on deep forest green (#003620), warm amber highlights, and soft white point-lights. No people, no text, no logos — pure atmosphere and place.

## Usage
Used in `pages/blog/index.tsx` inside `#blog-featured-post`.
HTML: `<div style="backgroundImage: url(/assets/blog-hero-bg.jpeg)" aria-hidden="true" />`
The image renders at full section width and height (min-height: 55vh) with backgroundSize: cover and backgroundPosition: center. A linear-gradient overlay (rgba(0,54,32,0.92) left to rgba(0,54,32,0.45) right) is applied on top, so high-contrast textures and strong mid-tones in the right half of the image will show best.
