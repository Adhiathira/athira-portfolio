Looking at this task, I need to genericize a layout brief by replacing site-specific content while preserving all structural/design descriptions.

# Homepage — Layout Brief

---

## 1. Overall Page Structure

The page flows as a vertical stack of full-width editorial panels, each one a self-contained "billboard" for a product or service. There's no sidebar, no persistent rail — just a clean single-column spine where each section commands the full viewport width. The rhythm alternates between light and dark backgrounds, creating visual breathing room and preventing monotony. Scrolling feels like flipping through a high-end product catalog: one product, one message, one panel at a time.

Major sections, top to bottom:
1. Global navigation bar (persistent)
2. Hero — Product 1 (light gray, full-bleed)
3. Product 2 (light gray continuation)
4. Product 3 (full-bleed dark)
5. Two-up grid — Product 4 + Product 5 (light cool tones)
6. Two-up grid — Product 6 + Product 7 (dark + warm gray)
7. Feature A + Feature B two-column
8. Content horizontal carousel
9. Legal/footnotes block
10. Footer mega-menu
11. Footer utility bar

---

## 2. Header / Navigation

The nav is a full-width, ultra-slim bar — roughly 44px tall — pinned to the top. It sits on a frosted/translucent light background that blurs content scrolling beneath it. The brand logo anchors the far left, a utility icon sits far right, with a search icon just inside it. Between them, category links are distributed evenly across the horizontal center — equal spacing, no visual grouping, all lowercase/title-case, same weight. The hierarchy is entirely flat: no dropdown megamenu is visible in the resting state. The bar disappears visually into the page; it's more of a quiet label strip than a bold navigation component.

---

## 3. Hero Section — Product 1

The hero is a centered, editorial composition on a light warm-gray full-bleed background. The layout is **strictly single-column, vertically stacked, center-aligned**:

- Product name in large, heavy display type — roughly 60–72px equivalent, occupying the visual crown of the section
- Tagline one step smaller, medium weight, immediately below
- Availability or date line in fine, secondary weight — tertiary hierarchy
- Two CTAs side by side: a **filled primary pill button** ("Primary CTA") and a **ghost/outline pill button** ("Secondary CTA") — equal height, slight gap between, centered as a unit
- Product image below the CTAs — a large floating photograph of the product against the background, bleeding toward the bottom of the section with no hard crop line visible
- A floating action chip overlays the product image, positioned near center — pill-shaped, semi-transparent dark, functioning as a tertiary action embedded within the visual

The overall feel is **center-gravity**: every element collapses to the vertical axis. No columns, no asymmetry. The product image is large but not full-screen — it's contained within the section's implied frame, with generous empty space above and to the sides.

---

## 4. Content Sections Below the Hero

### Product 2 — Single Editorial Panel
Same layout formula as the hero: full-bleed light background, center-stacked type, product image. The image is shot at an angle and extends upward from the section, suggesting it bleeds across the section boundary from above. Headline, subhead, and CTAs follow the same typographic hierarchy and button pattern.

### Product 3 — Full-Bleed Dark Panel
A dramatic tonal shift: this section is **pure dark**, full-bleed edge to edge. Light text on dark reverses the color logic. Same centered layout — product name large, tagline below, dual CTAs. The product image is dramatically lit against the dark background, appearing to float in darkness. The dark section creates a strong visual "chapter break" in the scroll rhythm and reads as a premium moment.

### Product 4 + Product 5 — Two-Up Grid
The page splits into a **symmetrical 2-column grid** at 50/50 proportions. Each half is its own mini-editorial unit with a distinct background color (left: pale cool-gray for Product 4; right: very light tint for Product 5). Each cell contains:
- Product name (top-aligned within cell)
- Subtitle + availability text
- Two CTA buttons (same pill pattern)
- A product image filling the lower half of each cell, with the item appearing to float or tilt toward the viewer

The two cells sit flush against each other with no gutter — the color boundary itself is the divider. This creates a strong diptych rhythm.

### Product 6 + Product 7 — Two-Up Grid (Dark/Light)
Another 50/50 split, but this time the left panel is **dark** (Product 6) and the right is **warm off-white** (Product 7). Same editorial-cell structure: title, subtitle, CTAs, floating product image. The dark/light contrast within a single grid row creates maximum tension and visual interest. Product 7 typography is notably different — a category label uses an uppercase, condensed sans alongside the brand logo glyph, breaking the otherwise uniform type treatment.

### Feature A + Feature B — Two-Up Asymmetric
Another 2-column layout, but this time each half contains a **photographic image showing the product in use** rather than clean white-background product shots. The imagery is lifestyle/contextual. Text sits above the image within each cell, with a single CTA per panel. The overall feel is slightly more editorial/magazine than the clean product panels above.

### Content Carousel
A **horizontal scroll carousel** occupying full width. Large featured content tiles with overlapping card-style thumbnails sliding left and right. Dot indicators appear below. A pause button sits far right. The tiles bleed partially off-screen left and right, implying scrollability. This is the only interactive horizontal component in the page.

### Legal / Footnotes Block
Plain text block, left-aligned, at document width. Dense body text, no visual decoration. Functions as a typographic "release valve" after the visual intensity above — purely informational, no layout artistry.

---

## 5. Footer

### Mega-Menu Footer
A **5-column grid** of link categories, equal-width columns spanning the full content width. Each column has a bold category header followed by a stack of plain text links in smaller weight. Categories and sub-groupings are organized by theme. The footer has generous vertical padding and a hairline top border separating it from the legal copy above.

### Utility Footer Bar
A slim strip below the mega-menu with:
- Copyright notice on the far left
- Policy links centered (Privacy Policy, Terms of Use, Legal, Site Map) separated by vertical pipe characters
- Locale selector on the far right

The three-zone layout (left / center / right) is a classic footer utility pattern — functional, minimal, no imagery.

---

## 6. Notable Layout Patterns

**Full-bleed section alternation** — Every major product section is full-viewport-width with its own background color. There are no content-width containers visible; the color always reaches the browser edge. This creates a "sections as slides" feeling rather than "page with scrolling content."

**Center-axis gravity throughout** — Almost everything locks to the horizontal centerline. Text, buttons, product images, CTAs — all center-aligned. This creates extreme predictability and calm, which lets the photography and color carry the visual variation.

**Background-as-brand-moment** — The background color isn't neutral filler. The dark product panel, the cool-tinted panel, the dark/light diptych — each background is a deliberate brand decision that communicates the product's character (premium, airy, bold).

**Floating product photography** — Products are never shown sitting on a surface or inside a frame. They float — held in a hand, tilted in space, angled toward the viewer. This removes grounding and creates a light, airy, almost gravity-free spatial quality.

**Pill-button system** — All CTAs use identical pill (fully rounded) buttons, either filled primary or outlined ghost. The visual consistency across every section means the eye immediately recognizes actions without reading them.

**No decorative dividers** — Sections are separated purely by background color change. No horizontal rules, no drop shadows between sections, no margins between full-bleed panels. The seam is invisible or is itself a design moment (the color shift).

**Image-to-text proportion** — Across all product sections, images occupy roughly 60–70% of the section's vertical space, with text/CTA occupying the upper 30–40%. The hierarchy is: image tells, text labels, buttons act.