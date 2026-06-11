`★ Insight ─────────────────────────────────────`
This task is pure text transformation — no code involved. The challenge is surgical: remove brand identity (GSAP, specific colors like `#0e0e0e`, lime green) while preserving structural vocabulary (6-column grid, 40%/60% split, pill-shaped buttons). The hardest cases are hybrid phrases like "bright lime green gradient" where the color role IS the structure.
`─────────────────────────────────────────────────`

# Website Layout Brief

## Overall Page Structure

The page consists of approximately 8–10 major sections flowing top to bottom on a near-black background, with a dramatic tonal reversal in the footer (warm off-white/cream). The rhythm alternates between edge-to-edge typographic moments and more contained, compositionally balanced sections. The page has a distinctly editorial quality — large type acts as visual architecture, not just content.

---

## Header / Navigation

- **Full-width sticky bar**, dark background, minimal height (~56px)
- Left: wordmark in a bold, condensed custom logotype
- Center-left: horizontal nav links with even spacing
- Far right: secondary text link + a pill-shaped CTA button ("Primary CTA") with a white border
- Above the main nav sits a full-width **announcement bar** — high-contrast gradient background, centered body-size text with an underlined hyperlink. Acts as a high-contrast banner that commands immediate attention before the nav.

---

## Hero Section

Highly theatrical, intentionally asymmetric, full-viewport-height layout:

- **Background:** near-black, full bleed
- **Typography dominates:** large display heading rendered at ~300–400px display scale, in a warm cream/off-white. The first word sits on the upper-left, while the second word consumes the full width of the lower half. Letters nearly touch the viewport edges — this is *typographic as architecture*
- **Floating 3D objects:** two organic/gradient 3D forms are layered *over* the letterforms — one above the first letter of the opening word, one nestled inside a character. These are not contained in any box; they float freely, breaking the grid
- **Bottom-left:** a bracketed callout box — "{…}" style code brackets frame a two-line descriptive sentence. Low visual weight, deliberately subordinate to the massive type
- **Bottom-right:** a secondary CTA button — pill-shaped, outlined in a high-contrast accent color, "Primary CTA ↓". Positioned at the lower-right corner creating a diagonal visual path from top-left (logo) to bottom-right (CTA)
- **No image or video background** — the composition IS the layout. Space is used as a structural element.

---

## Section 2 — Editorial Statement

- **Full-width, centered-left** text layout on dark background
- A small bracketed section label "{ Section Name }" appears at the top-left as a micro-header
- A single massive paragraph of display type (~80–100px), left-aligned, occupying roughly 85% of the viewport width
- No sidebars, no imagery, no columns — pure typographic weight used as a content block
- A thin horizontal rule separates it from the next section
- The spatial rhythm here is *deliberate emptiness* — the white space below the text before the rule is generous, almost uncomfortably so

---

## Section 3 — Animated Feature Showcase (Horizontal Scroll / Marquee)

- **Full-bleed dark section**, likely a horizontally animated or scroll-driven text strip
- Oversized display text runs edge-to-edge and **bleeds off both sides** of the viewport — text extends beyond the frame
- **Floating label chips** are layered *on top of* the scrolling text — pill/badge-shaped labels at various rotations, positioned with no grid alignment. These rotate ~5–15° creating a scattered, playful energy
- **3D gradient objects** float freely in the composition at different scales and depths, no bounding container
- This section operates as a full-viewport animation stage, not a readable content block

---

## Section 4 — Feature Highlights (Alternating Two-Column)

- Layout shifts to a **two-column alternating structure**: left column holds a large abstract shape/illustration; right column holds category label + headline + CTA button
- Proportions: roughly 40% left / 60% right with generous internal padding
- Each "row" (feature category) is separated by a thin hairline rule
- The **category label** is rendered in a distinct accent color — creating a color-coding system across the section
- Shapes are large, filling their column fully, and use gradient fills — they function as brand illustration, not photography
- CTAs are pill-shaped outlined buttons, consistently sized

---

## Section 5 — Category Grid (Full Mega-Nav Panel)

- A **6-column grid** of categories fills the full width
- Each column: a colored category heading followed by 3–4 plain light text links below
- Tight vertical spacing, no borders or cards — pure typographic grid
- This section acts as a visual sitemap, giving power-users at-a-glance navigation
- Background remains dark, maintaining continuity with the sections above

---

## Section 6 — Showcase Carousel

- A **featured card** occupies roughly 65% of the viewport width, center-left, presented as a contained preview at moderate scale
- Left side: accent-color full-bleed sidebar column (approximately 15% width) acts as a color accent frame
- Right side: content bleeds off-screen, implying a horizontal carousel
- Below the preview: title + subtitle in left-aligned small body copy
- Bottom row: a full-width CTA button ("Secondary CTA") aligned left, and left/right arrow navigation buttons aligned far right — establishing clear carousel affordance
- This section introduces **vertical asymmetry**: the sidebar column has no heading, serving purely as a structural color break

---

## Footer

A dramatic tonal inversion — from near-black to a **warm off-white/cream background**:

- **Upper zone (still dark):** the 6-column category mega-nav grid carries through from Section 5, providing visual continuity before the footer break
- **Lower zone (cream):** new background color signals the footer proper
- **Three-column layout:**
  - Left (~50% width): newsletter signup — large bold heading, email input field as a single underlined line (no border box), arrow submit button at the right end of the line
  - Center (~25% width): primary links column
  - Right (~25% width): secondary links column
- **Sub-footer bar:** very bottom row — copyright text far left, brand mark centered, legal links far right
- The footer is airy and minimal — generous vertical padding, no decorative elements, clean typographic hierarchy

---

## Notable Layout Patterns

**Floating / Overlapping Elements:** The hero and the marquee sections rely heavily on objects that break out of their containers entirely — 3D forms, rotating label chips, and oversized type that bleeds past the frame. This is a deliberate anti-grid aesthetic.

**Tonal Reversal as Section Break:** The shift from dark to light in the footer is the single most dramatic structural signal on the page — it reads as a hard section boundary without any divider line.

**Brackets as Section Labels:** The `{ Section Name }` pattern used for section labels is a recurring typographic device that references code syntax — it builds brand personality directly into the layout system.

**Full-bleed Typography as Layout:** Rather than using type *within* a layout, the hero and marquee sections treat letterforms as the structural framework themselves. White space, proportions, and visual weight are all derived from letter shapes.

**Consistent CTA Morphology:** All interactive buttons share the same pill (fully rounded rectangle) shape with an outline treatment — creating visual consistency across sections regardless of background color.

**Color-Coded Navigation System:** Each category has its own accent color, used consistently in both the feature section and the footer mega-nav. This is a spatial wayfinding system embedded in color.