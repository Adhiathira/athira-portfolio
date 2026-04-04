# Copper Still — Concept by Image

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

The section utilizes a strict, column-based grid. All images align perfectly to the vertical columns. The layout is container-based with consistent margins on the left and right edges of the page. The gutters between image containers carry the precision of a scored copper face — not mere emptiness but a calibrated interval, as measured as the space between register marks on a compositor's plate. Each gutter is a tolerance zone, as exact as the clearance machined into a precision bearing race: holding each photographic panel apart with the same engineering logic that keeps a glass sheet from thermal fracture. The compressed gap (29.376px) is a structural choice, not a reduction — it tightens the rhythm so that each image reads within its interval, never floating free.

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

An **informational, editorial-style aesthetic** — clean, structured, and balanced. The 0.06em heading letter spacing introduces air between characters without disturbing the overall geometric rationality of the type system. Cormorant Garamond brings a high-contrast, warm-blooded serif presence to the editorial heading role: the hairline strokes of its letterforms hold the same quality of thinness you find in a copper engraving plate freshly bitten by acid — precise reduction as aesthetic logic.

---

## Pattern 3: Split Editorial Section

Used on the About page to present narrative text alongside a single compelling image.

### Internal Section Organization

A balanced two-zone layout: a typographic zone (left) containing a large bold headline and body paragraph; a single, large media area (right) containing one photograph. Classic split-screen editorial with two roughly equal columns. Hero padding (144px top and bottom) creates an amplified sense of entry — the section breathes at a scale that signals the content is worth arriving for.

### Aesthetic Identity

**Minimalist, typography-driven editorial aesthetic.** Personal, refined, and calm. The tracked headings (0.06em) and generous hero spacing produce a stillness that invites sustained reading rather than fast scanning.

---

## Color System and Visual Hierarchy

Extremely minimal, high-contrast. White (#ffffff) page backgrounds. Dark warm-grey (#4e4946) text and UI elements — not pure black but a tonal warmth that reads like ink on uncoated stock, not laser-printed on gloss. This is a system where color functions as atmosphere rather than signal: the warmth of the text field creates a perceptual temperature that pure black never achieves. A single link color (#666666) handles tertiary navigation — understated, present, never assertive.

---

## Typography System

Cormorant Garamond operates as the primary display serif — high-contrast, elegant, and associated with engraved tradition. **The letter-spacing twist (0.06em on headings)** introduces a measured interval between characters that tightens the visual relationship between letters while creating an expanded sense of space at the heading scale. At 55px, this produces characters that breathe without opening. Raleway provides a geometric uppercase label voice for h3 elements — its construction logic of clean angles and optical balancing offers a counterpoint to the serif's drawn quality. Inter handles body paragraphs — precise, mechanical, legible at small sizes. Open Sans and Work Sans fill support and button roles with unobtrusive reliability.

---

## Design System Signals Across Sections

Tighter editorial container (807px max-width), compressed gutters, sharp 90-degree corners universally, white background as the universal field, tracked headings with warm-grey ink color, generous scaled spacing (1.35× factor), and deliberate motion pacing (1.3× duration scale). The system communicates through discipline rather than decoration — precision and restraint as the signature quality.
