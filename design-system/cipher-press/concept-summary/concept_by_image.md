## Section Design Pattern Extraction

Five distinct section patterns are visible across the three screenshots:

1. **Full-bleed hero overlay** — large-format dark background with oversized display typography floating above a textured image
2. **Editorial product feature split** — asymmetric two- or three-column composition alternating product imagery with contextual copy
3. **Brand manifesto / statement section** — full-width dark field with oversized headline spanning near the full viewport width, used as a visual punctuation mark
4. **Email signup / conversion section** — split layout: editorial copy left, form right
5. **Utility footer** — columnar link grid with copyright and social references on a dark background

The modal (sign-up popup) present across all three screenshots is a UI layer floating above the page — it is not a section pattern and is analyzed separately under Visual Affordances.

---

## 1. Internal Section Organization

**Hero:** Layered composition with a full-bleed dark photographic background. The headline occupies the upper-center zone in an oversized display scale, rendered at near-viewport width. Supporting copy sits bottom-left, and a text-link CTA anchors bottom-right — a split-anchor approach that keeps both corners of the viewport active. The layout is media-dominant and depth-layered, not grid-driven. Navigation floats above as a transparent overlay at the very top edge.

**Product feature splits:** These sections use two- and three-column arrangements. The dominant pattern is a large-format product photograph occupying one full column (left), product name and pricing occupying center as a card-like zone, and a contextual food/plating photograph in the right column. The content zone is deliberately sparse — very little body copy, relying on image quality and label hierarchy to communicate product identity. Layout is grid-driven within a 12-column system, but the grid is used to create asymmetric compositions rather than uniform card grids.

**Brand manifesto sections:** These sections do not pause the page — they accelerate it. The oversized all-caps headline surges laterally across the full content width, carrying kinetic mass proportional to its scale. At ~85.5px condensed uppercase, each character occupies physical territory with the force of a print poster: the eye does not read across the line so much as sweep through it. The weight of each letterform — now rendered at 700, the heaviest the Garamond cut offers — presses into the page like a steel stamp into dampened cotton rag, holding its impression long after the eye has moved past. The decorative stamp graphic and secondary image act as tempo markers — visual objects the eye bounces off before the headline pulls focus forward again. Rather than slowing narrative pace, these sections shift its register: from the measured tempo of product grids to a single charged beat, then release.

**Conversion section:** A two-column split with editorial copy occupying the left half and a form (label + inputs + CTA button) in the right half. The form side is vertically centered, sparsely padded, and restrained in visual weight to keep focus on the CTA button.

**Footer:** Three-column columnar grid. Left column: brand description paragraph. Center and right columns: grouped navigation links. Bottom edge: copyright and social/credits row. The footer is typographically subdued — small scale, low weight — consistent with luxury convention of keeping utility navigation visually quiet.

---

## 2. Grid System and Spacing System

The underlying grid is a 12-column system with an expanded ~48px gutter. This wider gutter creates more room between columns than is conventional for editorial layouts — it adds a deliberate breathing interval between adjacent content zones, reinforcing the sense that each column is a distinct field of attention rather than part of a contiguous flow.

Vertical spacing follows a modular scale anchored at ~19px (base unit). Section vertical padding is ~95px (5× base), creating generous breathing room between sections. This rhythm is consistent across product sections and the footer. The nav uses the same 19px unit for padding.

Internal card spacing is minimal — the product feature splits rely primarily on column separation and image contrast rather than internal card padding. This is a deliberate luxury convention: objects do not need to be framed or padded; they speak for themselves.

The container is full-width with hero margins at 120px — the expanded hero indent creates a restrained inner frame, giving the hero content room to breathe without touching the viewport edge.

---

## 3. Media Composition and Art Direction

Photography is the dominant visual medium throughout. It operates at three registers:

- **Full-bleed background layer** (hero): The caviar tin/grain texture image spans the full viewport. It is art-directed as a dark, low-contrast field — functioning as a texture rather than a subject. The grain fills the frame uniformly, creating a safe text zone across the entire viewport surface.
- **Foreground subject photography** (product sections): Product tin close-ups and food plating images appear as foreground content within grid columns. These are tightly cropped, high-contrast, and subject-dominant. Negative space within the product imagery is not used as a text zone — text appears in adjacent columns instead.
- **Atmospheric/editorial photography** (brand manifesto sections): The product carrying case image and similar editorial shots appear alongside the oversized headline. These feel like magazine editorial photography — props, context, mood — rather than e-commerce product shots.

The circular brand stamp graphic used in the manifesto section is a decorative motif — it introduces a non-photographic visual element and functions as a brand identity anchor alongside the typographic headline.

---

## 4. Visual Composition and Layout Intent

The interface behaves as **editorial narrative design layered over e-commerce structure**. The hero section positions text in the visually quiet center of the background image, with the grain texture providing uniform darkness — no subject competes for attention in the headline zone.

In the product feature splits, imagery anchors the composition: the product tin fills an entire column, creating visual mass on one side while the opposite column provides restrained informational content. This mirrors editorial magazine layouts where photography leads and text annotates rather than competes.

The manifesto sections are purely composition-driven: the oversized headline is the layout. The text IS the visual element, scaled to perform as graphic composition rather than readable copy at normal distance.

UI placement follows compositional logic rather than grid logic — elements are positioned where they create visual balance, not merely where the grid defaults them.

---

## 5. Background and Section Design Behavior

The dominant background register is **bright near-white** (#fcfcfc). This near-white ground is not simply blank — it has a slight warmth, like uncoated stock fresh from the press, that keeps the field from reading as digital or sterile. Visual separation between sections is achieved through:

- Photography transitions (background texture → foreground product image → editorial photography)
- Typographic scale shifts (small label → oversized display)
- Density shifts (sparse product section → dense manifesto headline)

There is no use of gradient overlays, wave separators, or decorative geometric dividers. Section transitions are implicit — driven by content type change — rather than explicit decorative breaks. This is a high-confidence luxury convention: unnecessary visual elements are eliminated.

---

## 6. Depth, Layering, and Visual Hierarchy

The interface uses **moderate depth cuing** — not flat, not strongly dimensional:

- **Hero:** Clear foreground/background separation via text-over-image layering. No shadows.
- **Product sections:** Columns sit adjacently with no elevation distinction — they read as peers on the same plane.
- **Modal:** The modal popup introduces the strongest depth cue — a white card floating above a dimmed dark overlay.
- **Manifesto sections:** The stamp graphic appears layered behind the headline typographically, creating subtle depth without shadow or blur.

Overall, the interface reads as lightly layered. The dominant depth mechanism is value contrast rather than shadow or blur effects.

---

## 7. Component Styling (Borders, Surfaces, Elevation)

Component boundaries are minimalist:

- **Navigation:** No background fill, no border — transparent overlay. Links are purely typographic.
- **Product columns:** No card borders or surface fills — columns are separated purely by the grid gap.
- **Form inputs (modal):** Rendered with a visible light border on a white surface — the only significant use of borders in the interface.
- **CTA buttons:** The primary action button uses a thin dark border on dark fill — a near-monochromatic treatment.
- **Footer:** No borders. Column separation is purely spatial.

Visual separation throughout relies on **whitespace and color contrast** rather than borders or shadows.

---

## 8. Shape Language

The shape language is **predominantly sharp-cornered** — no rounded cards, no pill buttons, no radius on product images. The geometry reads as rectilinear and severe.

The notable exception is a circular button element (likely a scroll indicator), and the circular brand stamp graphic which introduces a round form as a deliberate contrast to the rectangular grid. This creates a geometric counterpoint: the stamp's circle against the otherwise entirely rectangular layout system.

---

## 9. Typography System

The typography system uses **extreme scale contrast as its primary expressive tool**:

- **Display/H1:** EB Garamond at weight 700, tracked at 0.08em — used as graphic element in hero and manifesto sections. The bold cut gives each character a density it earns through negative space alone; there are no serifs trimmed, no ink traps opened — just the full presence of the stroke.
- **H3/H4/Labels:** 14px, uppercase, weight 500 — used for product names, section labels
- **Body:** IBM Plex Sans 16px, weight 400, line-height 28px — generous leading for readability
- **Nav/Links:** IBM Plex Sans 14px, weight 500, letter-spacing 0.08em — minimal, quiet, tracked

The ratio between display and nav/label is approximately **6:1** — an unusually wide scale range that creates strong visual hierarchy and allows headlines to function as layout elements rather than merely textual elements.

---

## Design System Signals Across Sections

**Consistent across sections:**
- Background lightness (near-white dominant throughout)
- Typography weight at body level (weight 400)
- CTA style (text links with arrow, no filled button outside modal)
- Shape language (sharp corners universally)
- Color palette (black text on near-white backgrounds)

**Deliberate variation:**
- Typographic scale varies dramatically — from 14px nav links to 76px+ display headlines. This is the primary expressive variable in the system.
- Photography density shifts by section — background texture → foreground product → editorial atmospheric.
- The modal introduces white surfaces and black filled buttons — the inverted color register does not appear elsewhere on the page.
