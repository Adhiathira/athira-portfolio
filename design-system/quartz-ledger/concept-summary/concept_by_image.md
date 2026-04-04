# Quartz Ledger — Concept by Image

## Section Design Pattern Extraction

Three primary, distinct section design patterns define the interface's visual architecture:

1. **Full-Page Masonry Image Grid:** A portfolio-style showcase used as the primary content surface on the homepage and image gallery pages.
2. **Asymmetric Informational Section:** A split layout combining a simple typographic data list on one side with a multi-image composition on the other.
3. **Split Editorial Section:** A two-column layout featuring a large headline, a paragraph of body text, and a single supporting image.

---

## Pattern 1: Full-Page Masonry Image Grid

This pattern is the dominant structure for the homepage and main content pages.

### Internal Section Organization

The entire section below the global navigation bar is a single, continuous media area. There are no distinct headline or text block zones within this section. The layout is a media-dominant, composition-driven masonry grid — dense and immersive, prioritizing imagery above all else. Multiple columns (3–4 on desktop viewport) where image containers of varying heights are tightly packed.

### Grid System and Spacing System

The section utilizes a strict, column-based grid. All images align perfectly to the vertical columns. The layout is container-based, with consistent margins on the left and right edges of the page. The gutters between image containers carry the precision of a scored crystal face — not mere emptiness but a calibrated interval, as measured as the space between register marks on a compositor's plate. Each gutter is a tolerance zone, as exact as the clearance machined into a precision bearing race: holding each photographic panel apart with the same engineering logic that keeps a glass sheet from thermal fracture. The compressed gap (29.376px) is a structural choice, not a reduction — it tightens the rhythm so that each image reads within its interval, never floating free.

### Media Usage

The section exclusively uses high-quality, professional photography. Media is contained within grid-aligned rectangular containers. Images do not span the full viewport width — they respect the page container's margins. The grid is loaded as a complete compositional unit.

### Visual Composition and Layout Intent

The intent is that of a structured grid UI functioning as a visual index or portfolio. The layout prioritizes efficient scanning of a large volume of visual information. The composition creates a strong sense of order and rhythm. Readability is not a factor as there is no text. Visual balance is achieved through the structured but varied nature of the masonry layout.

### Background and Section Design Behavior

The section background is pure white (#ffffff). This maximizes contrast with photographic content and emphasizes images as the primary focus.

### Depth, Layering, and Visual Hierarchy

The interface is entirely flat. No shadows, overlapping elements, or other depth cues. Separation between images is created purely by the minimal whitespace of the compressed gutters.

### Shape Language

Strictly rectilinear. All components, specifically the image containers, use sharp, 90-degree corners.

---

## Pattern 2: Asymmetric Informational Section

Used on secondary pages to display key-value data alongside a curated set of images.

### Internal Section Organization

A distinct two-zone, asymmetric layout: a narrow typographic zone (left, ~25%) containing a headline and vertical key-value list; a wider media zone (right, ~75%) containing a grid-based composition of multiple images.

### Grid System and Spacing System

Aligns with the underlying grid. The left text column is a single wide column; the right media area is subdivided into a two-column grid. The gutter between images in the right-hand media grid is consistent with the masonry grid gutters, reinforcing system rules.

### Aesthetic Identity

An **informational, editorial-style aesthetic** — clean, structured, and balanced. The 0.06em heading letter spacing introduces air between characters without disturbing the overall geometric rationality of the type system.

---

## Pattern 3: Split Editorial Section

Used on the About page to present narrative text alongside a single compelling image.

### Internal Section Organization

A balanced two-zone layout: a typographic zone (left) containing a large bold headline and body paragraph; a single, large media area (right) containing one photograph. Classic split-screen editorial with two roughly equal columns. Hero padding (144px top and bottom) creates an amplified sense of entry — the section breathes at a scale that signals the content is worth arriving for.

### Aesthetic Identity

**Minimalist, typography-driven editorial aesthetic.** Personal, refined, and calm. The tracked headings (0.06em) and generous hero spacing produce a stillness that invites sustained reading rather than fast scanning.

---

## Color System and Visual Hierarchy

Extremely minimal, high-contrast. White (#ffffff) page backgrounds. Black (#000000) text and UI elements. Yellow (#ffdb01) as the single chromatic assertion — used exclusively for primary CTA buttons and price anchors. This creates a system where color functions as a signal, not as atmosphere: the yellow is visible from any position in the visual field, marking the conversion vector precisely.

---

## Typography System

Inter operates as the primary sans-serif — geometrically neutral, legible at all scales, and associated with product rationality. **The letter-spacing twist (0.06em on headings)** introduces a measured interval between characters that tightens the visual relationship between letters while creating an expanded sense of space at the heading scale. At 4.75rem, this produces characters that breathe without opening. Instrument Serif provides an editorial counterpoint for pull quotes and long-form reading — its high contrast and open apertures offer warmth that the sans-serif system deliberately withholds. JetBrains Mono for technical contexts (code, data tables) — precise, mechanical, and legible at small sizes.

---

## Design System Signals Across Sections

Container-based grid (1728px max-width), compressed gutters (29.376px), sharp 90-degree corners universally, white background as the universal field, tracked headings with clean separation, and the single yellow accent as the only departure from the achromatic field. The system communicates through discipline rather than decoration.
