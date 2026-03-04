# Brand Name Website — Layout Brief

---

## 1. Overall Page Structure

The page follows a classic editorial site structure with five distinct vertical zones:

1. Fixed navigation header
2. Full-bleed hero (video/image)
3. Dual-feature editorial section
4. Press/editorial grid
5. Product shop grid
6. Footer

The rhythm alternates between **full-bleed immersive** moments and **contained editorial** grids, creating a breathing, cinematic scroll experience. White space is generous between sections — the page never feels crowded.

---

## 2. Header / Navigation

**Tripartite horizontal bar** with three distinct zones:

- **Left:** Single icon (search/magnifier) — minimal, text-free
- **Center:** Brand wordmark in a refined serif, large and commanding — acts as the visual anchor
- **Right:** Two icons (account, cart) — matched weight to left icons for perfect symmetry

Below the logo bar sits a **secondary navigation row** — five evenly spaced all-caps text links. Generous horizontal padding keeps these links light and airy.

The header appears **fixed/sticky**, sitting above the full-bleed hero below it. The entire header is on a light ground, contrasting cleanly with the dark hero that follows.

---

## 3. Hero Section

**Full-bleed, edge-to-edge** image or video — no padding, no container. The image bleeds to all four browser edges.

Text is **overlaid directly on the image**, centered both horizontally and vertically in the lower half of the frame:

- A large all-caps display headline
- A smaller subtitle in spaced caps beneath it
- Two **side-by-side CTA buttons** — outlined/ghost style, roughly equal width — floating in the center of the image

The image itself is dark and cinematic (theatrical lighting, deep shadows), which gives the white overlay text strong contrast without needing a scrim or overlay layer. The depth-of-field photography intentionally creates a natural "safe zone" in the center where text sits.

**Notable:** No bounding boxes around text — everything floats directly on the photograph. The buttons have a thin outline border (no fill), matching the editorial restraint of the layout.

---

## 4. Content Sections Below the Hero

### Section 2 — Editorial Feature (Two-Column Split)

A centered section heading in spaced caps anchors this block, followed by two **equal-width editorial tiles** side by side at full container width.

Each tile is:
- A tall **portrait-ratio image** (roughly 2:3 aspect)
- With an overlaid title and a single CTA button centered in the lower third of the image

The two tiles sit flush against each other — no gap — creating a **diptych effect**. This section uses the full container width but is not browser-edge bleed like the hero.

### Section 3 — Press / Editorial Grid

A **three-column equal grid** of press/editorial photography cards. Each card:
- Square-ish image
- Date below in small, light text
- Headline title below the date
- No borders, no background cards — images sit directly on the light ground

A **"View All" link** sits centered above the grid, acting as a navigational intro to the section. The grid cards feel evenly spaced with consistent gutter widths.

### Section 4 — Product Grid

Another **three-column equal grid**, this time for products. Each tile:
- Portrait-ratio product photography on a neutral background
- Status badge (e.g., "Sold Out") in a small dark pill, positioned in the **lower-right corner** of the image
- Product name in spaced caps below
- Price in regular weight below that
- Clean, catalog-style presentation

Below the grid sits a centered **Primary CTA pill button** — filled dark background, slightly more visual weight than outlined CTAs, acting as a shopping gateway.

---

## 5. Footer

**Asymmetric two-column layout** on a light ground:

- **Left column (narrow):** Stacked vertical list of utility links in small all-caps. Left-aligned, generous line height.

- **Right column (wide):** Newsletter subscription block — large heading, descriptor copy, email input field with inline subscribe action button. Social icons sit below the input.

The footer bottom bar is **centered** across the full width:
- Currency/locale selector with dropdown
- A horizontal row of payment method logos
- Copyright line at the very bottom

**Spatial note:** The left utility links and right newsletter block feel roughly 1/3 — 2/3 proportionally, giving the newsletter signup more visual weight.

---

## 6. Notable Layout Patterns

**Sticky header:** The light header remains fixed at top as content scrolls beneath it — standard but clearly executed with clean separation.

**Full-bleed hero:** Zero-margin image that touches all browser edges, creating maximum immersion. Achieved by removing the site's standard container constraints for this one section.

**Floating overlaid CTAs:** All hero and editorial-tile CTAs sit directly on imagery without card backgrounds or scrim overlays. This requires careful image selection (dark backgrounds) to maintain legibility — a deliberate editorial commitment.

**Consistent typographic register:** All text across the page is set in spaced, light-weight all-caps. This single typographic rule creates visual unity across wildly different section types (nav, hero, grid labels, footer links).

**Grid-pure layout:** The layout is symmetrical columns, centered type, equal-weight tiles. Visual drama comes from the photography, not the layout system.

**Accessibility widget:** A persistent floating accessibility icon (bottom-right corner) appears across all scroll positions — a fixed overlay element sitting above all page content in z-order.