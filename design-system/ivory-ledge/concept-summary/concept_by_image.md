## Visual Design System Analysis

---

### Section Design Patterns

Four distinct section design patterns repeat across the interface:

1. **Full-bleed media overlay** — photography spanning the full viewport with text and CTAs layered on top
2. **Equal-column content grid** — 2–3 column grid with symmetric card-style blocks on a white or near-white background
3. **Split 2-column media-text** — one half image, one half text, horizontally divided
4. **Full-width centered editorial** — white background, centered heading and body, single CTA, no media

---

### 1. Internal Section Organization

**Full-bleed media overlay** sections use a single layered composition: photography fills the entire container as a background plane, with a text+CTA cluster centered horizontally and vertically within the viewport. Content hierarchy is: large display heading → paragraph body → CTA row. There is no explicit card or grid within the overlay; all content floats as a single centered column above the image.

**Equal-column content grids** are content-dense and grid-driven. Three columns with equal width divide images (top), heading (mid), and body text (bottom) within each column. A single CTA appears beneath one column in the mid-page instance — not repeated across all columns — creating mild asymmetry within an otherwise symmetric structure.

**Split 2-column** sections divide the horizontal axis cleanly: left half is a full-height rectangular photograph, right half is a vertical stack of heading, body paragraph, and button. No gutter decorations or dividers appear between the two halves.

**Full-width centered editorial** sections are minimal: white background, no imagery, no columns. Content is a centered single column: heading → body → CTA. This pattern functions as a breathing pause in the page's pacing.

---

### 2. Grid System and Spacing System

The container system is clearly bounded — content does not stretch to full viewport width in most sections. A max-width container is center-aligned with equal left/right margins.

In the 3-column grids, columns appear evenly spaced with consistent gutters. Spacing between the image and the text below each card feels deliberate — roughly one unit of whitespace — giving the grid a compact, editorial density.

Vertical rhythm between sections is generous: sections are clearly separated by large whitespace padding above and below their content, creating a slow, deliberate scroll pace. The section padding values suggest generous proportions, and the button padding is uniform and slightly rounded, appearing consistent across every CTA in every section.

---

### 3. Media Composition and Art Direction

Photography is used in two compositional modes:

**Background plane mode**: In the hero and mid-page overlay sections, photography occupies the full section background. A subtle dark overlay is applied over the imagery to ensure text contrast. The subjects are positioned with enough central mass to allow overlaid text to read against a relatively consistent mid-tone zone.

**Foreground content mode**: In the 3-column grid and 2-column split sections, photography sits within the layout as a content element — not a background. Images are cropped to tall rectangles in the grid, and to a half-viewport square in the split section.

The cycling/mountain imagery in mid-page overlay sections uses desaturated monochrome treatment, distinct from warmer, color-treated hero photography. This tonal shift functions as a visual chapter break.

---

### 4. Visual Composition and Layout Intent

The hero section behaves as **image-driven narrative design**: the photograph is the dominant visual element, and the UI is embedded within it rather than placed beside it. The interface treats the hero as a full-canvas composition.

The mid-page content grid sections shift to **structured grid UI**: photography becomes a content element with fixed proportions, the layout becomes predictable and symmetric, and visual weight is distributed evenly across columns.

The full-width centered CTA section is **editorial storytelling**: no visual complexity, maximum whitespace, single voice.

---

### 5. Background and Section Design Behavior

Backgrounds alternate in a clear rhythm:

- **Photography (dark-tinted)** → hero overlay
- **White** → 3-column content grid
- **Photography (monochrome, dark-tinted)** → mid-page overlay
- **White** → 3-column facility/services grid
- **White** → 2-column split
- **Pale tint** → testimonial/success stories grid
- **Photography** → team image overlay
- **White** → editorial CTA
- **Near-black** → footer

This dark → light → dark → light → accent → dark → light → terminal sequence creates strong visual pacing. No gradients or textures appear. Section backgrounds are flat or photographic.

---

### 6. Depth, Layering, and Visual Hierarchy

The interface is **lightly layered** in the overlay sections — photography sits behind a semi-transparent dark scrim, which sits behind text. This two-layer stack is the only depth system employed.

In the grid and editorial sections, the interface is entirely **flat**: no shadows, no elevation, no card lift, no float effects. Cards in the 3-column grids are defined solely by their internal structure and the spacing between them — not by borders, shadows, or background contrast.

The result is a surface-flat visual language punctuated by deep photographic backgrounds. The physical weight of this design is carried not in surface ornamentation but in negative space — the voids between elements hold as much compositional mass as the elements themselves.

---

### 7. Component Styling (Borders, Surfaces, Elevation)

CTA buttons use a filled style with no visible outline in the primary instances, and a bordered outline style in the navigation. Neither carries a drop shadow. The interface avoids card borders entirely in the grid sections — column separation is achieved through gutters and whitespace alone.

The navigation CTA uses a thin rectangular outline border, contrasting with the slightly rounded body CTAs. This creates a two-register button system: navigation utility style versus content action style.

---

### 8. Shape Language

Body CTAs are consistently rounded, creating a softened, approachable shape language. The navigation CTA diverges with a rectangular border and less radius, signaling a distinct interactive register.

No other geometric softening appears — section containers, image crops, and grid structures all use sharp, rectilinear geometry. The rounded buttons are the sole carrier of softened form in the interface.

---

### 9. Section Divider Geometry

All section transitions use straight horizontal edges. No curves, waves, diagonals, or graphic separators appear. Section boundaries are defined purely by background color change and whitespace. This creates a clean, functional visual rhythm without decorative interruption.

---

### Hero Section Analysis

The hero uses a **full-bleed, full-viewport-height photograph** as the background layer. A semi-transparent dark overlay increases text legibility across the image. The text block is centered both horizontally and vertically within the viewport.

Headline is set at a very large display scale in white, creating extreme contrast against the tinted photograph. Below it, a body paragraph is set at a smaller scale with normal weight. Two pill CTAs sit side by side below the paragraph.

The navigation bar appears transparent at the top of the page, with light-toned link text and a rectangular outlined CTA button — visually consistent with the light-over-dark hero composition.

---

### Footer Section Analysis

The footer uses a near-black background as a full-width solid terminal. Content is organized in two horizontal rows:

**Row 1**: Navigation links distributed horizontally across the width, with copyright text right-aligned.

**Row 2**: Three zones — licensing/accreditation text left, a dense legal disclaimer block center, social icons right-aligned.

No newsletter form or logo appears in the footer. The footer functions as a navigational and legal terminus without editorial content.

---

### Navigation Bar Analysis

The navigation is a full-width horizontal bar. Logo and wordmark sit center-aligned. Navigation links are distributed symmetrically across the remaining width. A CTA sits far-right with a rectangular outlined button style.

The bar carries no visible background in the hero state — it is transparent and overlaid on the hero photograph, with light text.

---

### Design System Signals

**Consistent**: Rounded body CTAs, a single typeface family across all text elements, white text on photography overlays, modular spacing scale, center-aligned container with a logo, generous section padding.

**Deliberate variation**: The navigation CTA uses rectangular outline style while body CTAs use filled rounded style. Photography tone varies (color vs. monochrome) to create visual chapter breaks.

---

### Color System and Visual Hierarchy

The palette operates on three tiers:

- **Neutral base**: White dominates content sections; near-black for heading text on light backgrounds
- **Photography tint**: semi-transparent dark scrim in overlay sections
- **Monochromatic emphasis**: the identity is carried entirely through value contrast — no secondary accent hue is used

The interface is resolved in black, white, and grey. This restraint is the system's strongest signal: every hierarchy decision is made through spatial relationships and typographic scale, not through color.

---

### Typography System

The system pairs a high-contrast display serif (Prata) with a warm rounded sans (Figtree) and a monospaced companion (Inconsolata):

| Role | Family | Size | Weight |
|---|---|---|---|
| Display heading | Prata | 56px | 400 |
| Section heading | Prata | 40px | 400 |
| Sub-heading | Prata | 27.2px | 400 |
| Label/eyebrow | Inconsolata | 20.8px | 400 (uppercase, tracked) |
| Body text | Figtree | 16px | 400 |
| Button label | Figtree | 16px | 500 |

The Prata–Figtree pairing creates a clear editorial tension: the high-contrast vertical-axis serif carries weight through optical structure, while the rounded sans-serif body text introduces warmth and approachability at reading size. Inconsolata's monospaced precision in labels creates a three-register typographic voice.

---

### Visual Affordances

Interactive elements are signaled through:

- **Rounded filled buttons** — the primary affordance for page-level CTAs
- **Outlined rectangular button** in the navigation — signaling a distinct register
- **Navigation links** with expanding underline animation on hover
- No visible card borders or shadows — grid cards are not treated as clickable affordances in the static view
