`★ Insight ─────────────────────────────────────`
This task is pure text transformation — no code involved. The challenge is pattern recognition: identifying what's "site-specific" (brand identity, product details) vs. "structural" (layout measurements, design patterns). The distinction matters because the layout descriptions are the *valuable* reusable knowledge.
`─────────────────────────────────────────────────`

# Layout Brief — Generic Template

---

## 1. Overall Page Structure

The page flows through approximately 8–10 distinct major sections stacked vertically. The rhythm alternates between full-bleed immersive sections (hero, mission statement, featured content) and contained, structured content blocks (article grids, listing board, resource carousel). A persistent sticky email-capture modal floats over the right half of the viewport throughout the entire scroll experience, creating a constant layer of UI sitting above the page content.

---

## 2. Header / Navigation

**Three-tier header system:**

- **Top utility bar:** A full-width announcement strip (~30px tall). Centered uppercase text with an underlined CTA link. Purely typographic — no icons, no background imagery.
- **Utility nav row:** A slim light-background row housing three right-aligned text links (Account, Cart, Checkout) with generous whitespace. No logo at this level.
- **Primary nav bar:** Light background with the Brand Name wordmark logo anchored hard-left. Center-aligned navigation links in spaced uppercase sans-serif (Section A ▾, Section B, Section C ▾, Section D, Section E ▾). Right side holds a search field + icon button and a standalone action link styled differently (underlined, slightly bolder). The three tiers stack tightly with clear visual separation through weight and color contrast.

---

## 3. Hero Section

**Full-bleed, layered, two-panel composition:**

The hero spans the full viewport width and is roughly 60–65% of viewport height. A large-scale, colorful textural photograph fills the entire background edge-to-edge.

Over this background, two content panels float as light-background boxes positioned center-right:
- **Left panel:** Large serif display type (primary headline) rendered at headline scale, positioned in the lower-left quadrant of the image area. No box behind it — it reads directly on the photo.
- **Right panel:** A floating white card with form elements — bold headline, supporting copy, email input field, disclaimer text. This card sits center-right, partially overlapping the image. Its right edge is obscured by the persistent sidebar modal.

The composition creates a deliberate three-layer depth: photo → floating text → floating card → floating modal. Spatial tension is intentional.

---

## 4. Content Sections Below the Hero

### Category Navigation Bar
A compact horizontal rule just below the hero. Light background. Underlined active state on the first tab followed by spaced, uppercase tab labels (Category A, Category B, Category C, Category D, Category E, Category F). Functions as a sticky-feeling content filter row.

### Featured Content Cards Grid
A horizontally scrolling or cut-off 4-column card grid. Each card is image-dominant (roughly 3:2 ratio), with a small category label above and an italic serif headline below. Subtext in lighter weight beneath each title. Cards are equal-width, evenly spaced with comfortable gutters. The 4th card is partially cropped — implies scroll/overflow behavior.

### Mission Statement — Full-Bleed Typography Section
A massive typographic moment. Light background, very large display serif text spanning nearly full viewport width. The italic words alternate with upright roman text, creating visual rhythm. Inline decorative characters are embedded directly into the text flow as typographic ornaments. A small pill-label chip ("Our Mission") floats above the text block, centered.

### Promo Banner — Two-Column, Full-Bleed
A tinted full-width band. Left column: a dark text box overlaid directly on the background containing the headline in mixed serif styles. Center: body copy + outlined CTA button ("Primary CTA"). Right column: a decorative illustrated element. The composition is asymmetric — text block left-weighted, illustration right-anchored.

### Listings Section — Full-Width Centered Hero Text
A light section with a large centered serif headline paired with an illustrated collage element positioned hard-left, floating outside the text column boundary. A large bordered CTA button sits below the headline, centered. Below this, a horizontally scrolling category ticker strip (Category 1 · Category 2 · Category 3 · Category 4 · Category 5 · Category 6 ·…) runs in lightweight italic serif, separated by decorative dividers.

### Resource Carousel — 4-Up Horizontal Scroll
Four resource/guide cards in a horizontal row. Each card is square-format with an illustrated or painterly cover image and a bold serif headline overlaid (some with highlight blocks behind the text). Below each card: italic title in small serif + single-line descriptor. A right-arrow navigation control sits at the far right edge of the row.

### Featured Content — Full-Bleed Warm Gradient
A large full-width section with a warm painterly/textured background. Large dark display serif type dominates the left half at roughly 50% viewport width. A circular graphic element floats in the right area. Body text sits below the headline. This section has strong tonal contrast — the warmest, most saturated block on the page.

### Content Grid — 3-Column Regular
A standard 3-up content card grid (light background). Cards are image-dominant with a category label above and italic serif headline below. No subtext visible. The grid continues below the fold with another 3-card row partially visible.

### Social Proof — Two-Column, Full-Bleed Gradient
A pastel multi-color gradient background (the same soft painterly texture from the hero). Left column (~40% width): large serif headline ("What Our Readers Are Saying") + dark CTA button ("Primary CTA"). Right column (~60%): three floating pull-quote testimonials in italic serif, centered, stacked vertically with generous line spacing. No boxes or cards — quotes float directly on the gradient.

---

## 5. Footer

**Dark full-width footer, three-column structure:**

- **Left column (~35%):** Large light logotype at top. Below it, a brand tagline in large serif. Social media icons in a horizontal row.
- **Center column (~20%):** Small serif legal/policy links stacked vertically (Terms & Conditions, Privacy, Accessibility, Advertise, Blog, Guides).
- **Right column (~25%):** Larger navigation links stacked vertically (Section A, Section B, Section C, Section D, Section E, Service A, Service B, About, Contact).

Copyright line sits at the very bottom left in small type.

---

## 6. Notable Layout Patterns

### Persistent Floating Modal (Dominant Pattern)
The single most distinctive layout decision: a tall, fixed-position email capture panel (~35% viewport width) anchors to the right side of the screen and remains visible across all scroll positions. It has its own layered interior — a gradient background with the primary headline in large mixed-serif type, body copy, email input, and Subscribe button. A close (×) button sits top-right. This creates a persistent split of the visible viewport: ~65% page content, ~35% modal overlay, for the entire page experience.

### Mixed Typographic Weights as Layout Devices
Throughout the page, roman and italic serif variants of the same typeface alternate within single headlines. This is used structurally — it creates rhythm and emphasis without requiring separate visual blocks. The italic reads as accent color without using actual color.

### Decorative Illustrated Elements as Floating Anchors
Several sections use illustrated/photographic cutout elements positioned partially outside their containing grid column, bleeding into adjacent whitespace. These are not contained — they create spatial energy that crosses column boundaries.

### Full-Bleed Color Section as Pacing Device
The page uses alternating background tones (light → tinted → light → warm → light → gradient) to delineate sections without requiring visible dividers. Each tonal shift signals a new section. The gradient sections (hero and social proof) use the same visual language — pastel painterly texture — creating bookend symmetry between top and bottom of the page.

### Inline Decorative Characters as Typographic Ornament
The mission statement section embeds decorative characters directly into large-scale display type, treating them as typographic decorations rather than UI elements. This gives the page a warm, editorial/magazine personality.