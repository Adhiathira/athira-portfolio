# Brand Name — Layout Brief

## Overall Page Structure

The page is a long-form marketing landing page with 9–10 distinct sections flowing top to bottom on a pure black (`#000`) background. The rhythm alternates between **tight, content-dense** sections and **open, breathing** sections. The full page order is:

1. Navigation
2. Hero (split three-column asymmetric)
3. Community Gallery Scroll Strip
4. Features Section (accordion + product mockup)
5. User-Generated Content Gallery Mosaic
6. Social Proof Section
7. Pricing Section
8. Enterprise CTA Banner
9. Newsletter Subscribe Section
10. Footer

---

## 1. Header / Navigation

**Full-width floating nav bar** — black background, no border or separator line. The nav is minimal and uses extreme left–right tension:

- **Left:** Logomark + wordmark stacked two lines, flush left
- **Right:** Two buttons flush right — "Sign In" (dark pill, near-black fill, rounded) + Primary CTA (white fill, dark text, rounded pill). The buttons are identical size and sit side by side with a small gap.
- No center navigation links. The entire middle is intentionally empty — maximizing negative space and making the nav feel extremely minimal.
- The nav **sticks to the top** throughout scrolling — it remains visible on all screenshots.

---

## 2. Hero Section

**Three-zone asymmetric horizontal composition**, roughly left-center-right thirds, though not equal:

- **Left zone (~30% width):** Large display headline in two lines in heavy white weight. Below it, a short paragraph of body copy in lighter grey. Then a white-bordered Primary CTA button with significant top margin — creating breathing room between copy and button.
- **Center zone (~25% width):** A floating UI panel — a dark rounded card showing the app's actual interface. The panel appears to be mid-air with no drop shadow — it floats against the black. One item in the interface is highlighted/selected.
- **Right zone (~45% width):** A single large hero visual — a product or brand asset — rendered at large scale. It's cropped by the right edge, bleeds partially off-screen. No container, no card, just the element sitting in space against black.

The three elements are vertically offset from each other, creating an **irregular, layered composition** rather than a neat baseline-aligned row. The headline is mid-height, the floating UI panel is slightly higher, and the hero visual is vertically centered in the viewport.

---

## 3. Community Gallery Scroll Strip

A **horizontal overflow strip** of user-created project cards. It spans full viewport width with no gutters on the edges — cards bleed to both sides, implying infinite horizontal scroll.

- Each card is roughly square-ish (portrait-leaning), with a rounded corner radius (~12px)
- Cards show a creator avatar, name, and tool name overlaid at bottom, and the visual output fills the card
- The cards appear **at different vertical offsets** — not a flat row but a gentle arc or wave, with some cards sitting slightly higher or lower than neighbors
- 5 cards are visible; partial cards on both edges suggest carousel or marquee behavior

---

## 4. Features Section

**Sticky left-side product mockup + right-side accordion list**

- **Left half:** A floating product UI mockup card (dark, rounded corners) showing a feature panel. Behind it, a large decorative visual asset floats. A small secondary element appears at lower-left of the mockup. This side feels layered — the mockup, the background asset, and the secondary element occupy different perceived depths.
- **Right half:** A vertical accordion feature list — each feature is a single row with a title on the left and a `+` or `—` toggle on the right, separated by a thin horizontal rule. The first item is expanded, showing a 2–3 line description below the title. All others are collapsed.
- The two halves maintain equal visual weight despite different content densities. The feature list is uppercase-minimal with clean typographic hierarchy.

The accordion items represent the platform's core feature set: Feature A, Feature B, Feature C, Feature D, Feature E, Feature F, Feature G, Feature H, Feature I.

---

## 5. User-Generated Content Gallery Mosaic

**Full-width organic mosaic / collage layout** of community output images.

- The heading is centered, large, white, two lines
- Below it, a mass of rectangular cards arranged in a **staggered, multi-row collage** — cards of varying widths and heights, creating visual density
- Cards have no uniform grid — they appear to be arranged in 2–3 rows with horizontal offset and varying sizes (some portrait, some landscape, some nearly square)
- This section feels deliberately chaotic and playful — maximum visual energy, communicating creative abundance
- Cards extend partially beyond the viewport edges (full-bleed horizontal)

---

## 6. Social Proof Section

**Two-column card mosaic with centered heading above**

- Section heading centered, large, with a subtitle in smaller grey below
- Below the heading: a **masonry-style card layout** — testimonial or social cards of varying heights, sitting in 3 visible columns. Cards have dark grey fill, rounded corners, generous internal padding.
- Left and right columns appear at different vertical start positions — cards interleave like masonry columns, not a flat grid. This creates a natural, organic feel vs. a rigid table.
- Cards contain: avatar + name + verification badge + handle + body text + an optional image or media embed
- A horizontal carousel indicator (3 dots + prev/next arrows) appears between the scrolling gallery above and the masonry below — suggesting the collage section above is a slider

---

## 7. Pricing Section

**Centered heading + three-column card grid**

- Large centered display headline, followed by a short subtitle
- Three pricing cards in an equal-width 3-column grid, separated by small gaps
- Cards have: a dark grey rounded-rectangle container, a tier label top-left, price top-right in very large type, a Primary CTA button, then a bulleted feature list with small `?` icons on the right
- The **middle card** and **right card** have a prominent accent toggle row inside the card: a feature upsell toggle — toggled on, with an accent-color pill background
- The cards sit on black — they use slightly lighter dark grey to distinguish themselves from the background
- Feature list items include dimmed secondary labels ("Demo", "[Limit]", "[Limit]", "Soon") in a muted accent color

---

## 8. Enterprise CTA Banner

**Full-width rounded card / banner** — centered on the page with generous left/right margins.

- A **large rounded rectangle** (~80% viewport width, tall proportions) filled with a dynamic full-bleed gradient radiating from center-left, creating a swirling, multi-directional flow.
- On top of the gradient: centered white text — "Enterprise" as the primary headline, a subtitle below, and a white rounded Secondary CTA button
- The outer black background is visible around the card's rounded corners — it feels like a contained jewel rather than a full-bleed splash
- This section provides the highest visual contrast point on the entire page

---

## 9. Newsletter Subscribe Section

**Narrow centered form block**

- Centered two-line headline in large white display type
- Below: a dark grey rounded input field ("Your email")
- Below: a full-width white Action Button (same width as the input)
- Below: a checkbox row with consent/policy agreement text and a small circular checkbox on the left
- The entire form is narrow — roughly 40% of viewport width — sitting centered in abundant black space
- The enterprise gradient banner from the section above is still partially visible at the top edge, creating a visual transition from vivid color to empty black

---

## 10. Footer

**Single centered column of links**

- Minimal flat footer, purely typographic, no background color change (stays black)
- Two rows of text links centered: top row = social and contact links; second row = legal links
- Bottom: small copyright line
- No columns, no icons (except link text), no decorative elements — purely utilitarian

---

## Notable Layout Patterns

| Pattern | Where |
|---|---|
| **Floating visuals with no container** | Hero, Features — assets sit directly against black with no card/shadow |
| **Layered depth / z-axis composition** | Hero (3 overlapping planes), Features (mockup + background asset + secondary element) |
| **Full-bleed horizontal strips** | Community gallery, UGC mosaic — cards bleed to viewport edges |
| **Staggered/offset rows** | Gallery strip cards sit at varying vertical positions; masonry social cards |
| **Sticky navigation** | Nav bar persists across all scroll positions |
| **Contained gradient banner** | Enterprise section — rounded card with margin, not edge-to-edge |
| **Extreme negative space** | Dark background absorbs everything; only content has presence |
| **Near-zero decoration** | No dividers, rules, section backgrounds, or decorative shapes — pure spatial rhythm via vertical margins |