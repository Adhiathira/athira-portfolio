# Brand Website - Layout System Brief

## Overall Page Structure

The site follows a **vertical scroll narrative** with distinct, full-viewport sections that create a cinematic, magazine-editorial experience. Each major section feels like a self-contained "chapter" with generous vertical breathing room between content blocks. The overall flow is:

1. Hero (full-bleed background image)
2. Mission statement (photo-anchored content)
3. News/announcements (asymmetric card grid)
4. Section teaser (centered illustration-driven)
5. Leadership quote (minimal, typography-focused)
6. Products overview (tabbed interface with hero imagery)
7. Footer (structured link columns)

The layout emphasizes **whitespace as a design element**, using generous padding and full-width color blocks to separate sections. There's a strong sense of vertical rhythm with alternating content densities—expansive hero spaces followed by tighter editorial sections.

---

## Header/Navigation Layout

**Fixed-position, minimal header** with three distinct zones:

- **Left zone**: Search icon + input field (subtle, low-contrast)
- **Center zone**: Brand wordmark (oversized, acts as visual anchor)
- **Right zone**: Four navigation links in a horizontal row (About, News, Team, Careers) — evenly spaced, right-aligned

The header sits on a **translucent or adaptive background** that allows the hero image to show through while maintaining text legibility. The entire header is quite tall (likely 80-100px) to match the generous proportions of the site.

There's also a **persistent "Accessibility Mode" toggle** in the bottom-left corner of the viewport (not in the header itself) that appears across all sections.

---

## Hero Section

**Full-viewport, full-bleed hero** with these characteristics:

- **Background**: Single large-scale image (gradient background) that fills the entire viewport
- **Content**: Centered, stacked vertically
  - Primary headline: Brand tagline in **large italic serif** (likely 80-120px at desktop)
  - Secondary tagline: Brand mission statement in smaller weight beneath
- **Alignment**: Perfect center-alignment, creating a calm, confident first impression
- **Spacing**: Headline sits roughly in the vertical center with ample breathing room above and below

No overlapping elements or floating cards—the hero is intentionally pure and minimal, letting typography and the background image do all the work.

---

## Content Sections

### 1. Mission Statement Section (Two-Column Photo Anchors)

**Asymmetric, edge-anchored photo layout:**

- **Background**: Solid color block (neutral background)
- **Layout structure**: 
  - Left edge: Portrait photo (offset from edge, roughly 15% width)
  - Center: Text block (50-60% width, perfectly centered)
  - Right edge: Portrait photo (offset from edge, roughly 15% width)
- **Text hierarchy**: 
  - Small eyebrow label at top (brand identifier)
  - Large body text (40-50px) in a refined serif
  - CTA button below (Primary CTA →)
- **Vertical rhythm**: Photos appear to sit slightly below the text baseline, creating a grounded feel

The photos act as **visual brackets** framing the central message, while the generous negative space creates an editorial, high-end magazine aesthetic.

---

### 2. News/Announcements Section (Asymmetric Card Grid)

**Two-column, variable-height card grid** with editorial card design:

**Layout pattern:**
- Cards are **not uniform**—each occupies roughly 45% width with a central gutter (~10%)
- Cards stagger vertically (not aligned to a strict grid), creating visual interest
- Each row feels like a "curated pair" rather than a rigid grid

**Card anatomy:**
- Large hero image (3:2 or 4:3 aspect ratio)
- Title (medium-large serif, 28-36px)
- Metadata row: category tag (pill-shaped) + read time
- For some cards, the image is a **composite or triptych**

**Spatial rhythm:**
- Generous inter-card spacing (80-120px between cards)
- Cards appear to "float" on the white background
- CTA at bottom (View All CTA →) centered below the grid

This section breaks the strict symmetry of earlier sections, introducing **editorial asymmetry** while maintaining balance through careful weight distribution.

---

### 3. Section Teaser (Centered Illustration Block)

**Single-column, illustration-driven layout:**

- **Alignment**: Everything center-aligned
- **Structure**:
  1. Section heading (large display serif)
  2. Subheading (two lines of body text)
  3. Large illustration (60-70% viewport width)
  4. CTA button (Section CTA →)
- **Background**: Solid neutral background
- **Vertical spacing**: Extremely generous—illustration sits well below the heading, creating a slow, contemplative scroll rhythm

This section acts as a **visual palette cleanser**—after the density of the news grid, it returns to minimal, centered composition.

---

### 4. Leadership Quote Section (Typography-Dominant)

**Minimal, quote-focused layout:**

- **Background**: Solid neutral background (continuation from previous section)
- **Structure**: 
  - Left side (70% width): **Oversized quote text** in serif (60-80px), left-aligned, multiple lines
  - Right side (30% width): Signature image + attribution text (name and title)
- **Spacing**: Massive leading (line-height) on the quote text creates dramatic vertical rhythm
- **Alignment**: Quote baseline roughly aligns with signature baseline

This is the most **typographically expressive** section—the scale of the text turns language itself into a visual element.

---

### 5. Products Section (Tabbed Interface + Hero)

**Tab-controlled content switcher:**

**Tab bar:**
- Four tabs in a horizontal row (Product 1, Product 2, Product 3, Product 4)
- Pills/rounded rectangles with subtle background fill
- Centered below introductory paragraph

**Content area (per tab):**
- **Large hero image** (full-width or 90% width, likely 16:9 aspect)
- **Overlay treatment**: Product name overlaid on image in large display type
- **Interactive element**: Input box overlaid on bottom-center of image
- **Description text**: Below image, centered, 60% width

This section introduces **interactivity** and **layered UI elements** (text over images) for the first time in the layout system.

---

## Footer Layout

**Multi-column link grid** with clean hierarchy:

**Structure:**
- **Left zone**: Brand wordmark (same as header)
- **Center zone**: Four-column link list
  - Column 1: Primary site links (About, News, Team, Careers)
  - Column 2: Social links (LinkedIn, Instagram, X)
  - Column 3: Legal/utility links (Contact, Privacy & Cookies, Terms, Trademarks, Parent Brand)
- **Right zone**: Copyright and legal disclaimer text (smaller, secondary hierarchy)

**Styling:**
- Links are plain text, likely underlined on hover
- Generous vertical spacing between link rows
- Footer is separated from content by solid color background (neutral background)
- Footer is **tall** (likely 300-400px) to match the site's generous spatial proportions

---

## Notable Layout Patterns

### 1. **Full-Bleed Color Sections**
Every section uses **edge-to-edge background colors**—no containers or max-widths on the color fields themselves. This creates immersive, cinematic transitions between sections.

### 2. **Content Max-Width Variability**
While backgrounds are full-bleed, **content width varies by section**:
- Hero text: ~600-800px centered
- Mission text: ~700px centered
- News cards: ~1200px total grid width
- Footer links: ~1400px spread

### 3. **Edge-Anchored Elements**
Photos in the mission section are **positioned relative to viewport edges**, not a central grid. This creates tension and visual interest—elements feel "pinned" to the screen rather than floating in a container.

### 4. **Vertical Rhythm via Alternating Density**
The page alternates between:
- **Sparse sections** (hero, section teaser, quote) — minimal elements, maximum whitespace
- **Dense sections** (news grid, products) — multiple content blocks, tighter spacing

This creates a **breathing pattern** that guides scrolling pace.

### 5. **Typography as Layout**
In several sections (hero, quote), **oversized typography becomes the primary layout element**. The scale is so large that individual words create visual shapes and spatial relationships.

### 6. **Floating Accessibility Controls**
The "Accessibility Mode" toggle is **position: fixed** in the bottom-left, appearing across all sections. It sits outside the main layout flow entirely.

### 7. **Illustrative Collage Elements**
The news section and section teaser use **illustrative, artistic imagery** (watercolors, photo collages) rather than standard photography, giving the site a warmer, more human feel. These images often have **irregular shapes or soft edges** (not hard rectangles).

### 8. **No Hard Grids**
While there's clear structure, this isn't a strict 12-column grid system. Sections use **custom proportions** tailored to their content—sometimes 70/30 splits, sometimes centered 60% blocks, sometimes asymmetric pairs. This flexibility creates a more editorial, less "template-driven" feel.

---

## Design Philosophy Summary

This layout system prioritizes **breathing room, editorial asymmetry, and typographic scale** over conventional grid-based web design. It feels more like a **digital magazine or art book** than a standard corporate website. The generous whitespace, oversized type, and full-bleed imagery create a premium, confident aesthetic.

The layout uses **restraint** (limited columns, simple alignment, minimal UI chrome) to let content and imagery create impact through scale and proportion rather than complexity.