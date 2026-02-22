`★ Insight ─────────────────────────────────────`
This task is pure text transformation — no code involved. The key challenge is distinguishing between structural/spatial language (preserve) and brand-specific content (genericize). Terms like "pink highlight block" and "rounded corners" are design system vocabulary; brand names, CTAs, and industry terms are not.
`─────────────────────────────────────────────────`

# Brand Name — Layout Brief

## 1. Overall Page Structure

The page is a long-form, single-scroll marketing site with approximately **8–9 distinct content sections**. The flow moves from high-energy hero → mission/values → services overview → dual CTAs → product marketplace → search/filter tool → community/resources → blog feed. The overall rhythm alternates between **full-bleed dark background sections** and **warm off-white (cream) background sections**, creating a visual breathing pattern that signals section transitions without hard borders.

---

## 2. Header / Navigation

The navigation is **sticky and pill-shaped** — a dark background bar with heavily rounded corners (≈16px radius), floating slightly inset from the screen edges. It does not span edge-to-edge; there's consistent margin on all four sides, giving it a floating card quality.

Layout is a classic **three-group split**:
- **Left cluster:** 3 text links (Primary Nav Link, Secondary Nav Link, Tertiary Nav Link)
- **Center:** Logo (Brand Name wordmark)
- **Right cluster:** 3 text links (About, Concept, Contact)

Typography is compact and all-caps medium weight. The nav feels lightweight despite the dark background — it doesn't dominate. On scroll, it transitions from a flush top-of-page bar to the floating pill form, adding a subtle layering effect over content below.

---

## 3. Hero Section

The hero is **full-viewport-height, full-bleed dark background** — a high-contrast, immersive opening. The layout is **centered single-column** for the text, but the real character comes from the **flanking floating brand illustrations** positioned absolutely left and right of the text column, extending partially outside the visible frame (cropped at viewport edges). These illustrations are large, decorative, and illustrative — not contained in any card or box.

The typographic hierarchy has three layers:
- Small eyebrow text: *Brand tagline* (centered, modest weight)
- **Massive display type** (2–3 lines): uppercase, bold, light — occupying roughly 60% of the viewport width
- A **accent highlight block** on the final phrase — the accent background extends edge-to-edge across that text block, acting as a color punch that breaks the dark field

Below the headline, a short body paragraph sits in a narrow center column (≈50% viewport width), followed by two **pill-shaped CTA buttons** side by side — one solid accent (primary), one outlined (secondary).

The overall feeling is **theatrical and editorial** — the oversized type, the cropped illustrations, and the color punch make it feel like a poster, not a typical web hero.

---

## 4. Content Sections

### Section 2 — Mission Statement
A transitional section on cream/off-white background. **Centered single-column layout** with the same display-headline treatment: uppercase text on top, accent highlight block on the key phrase. The section feels sparse — mostly negative space above and below the headline stack. No supporting copy visible at this scroll position. This functions as a typographic interlude between the hero and body content.

### Section 3 — Values / Key Message Card
A **sticky-scroll card reveal** pattern. The left portion of the viewport shows a fixed contextual panel (the content heading stays in place), while the right side scrolls a large **white rounded-corner card** into view. The card has generous internal padding, a headline + body text on the left half, and a large brand illustration on the right half — a **50/50 split within the card**. The card has a shadow/lift quality suggesting elevation. This creates an immersive focus moment.

### Section 4 — Services (Features List)
**Asymmetric two-column layout** — roughly 40/60 split.
- **Left column (40%):** Sticky content anchor — eyebrow label, display headline (with accent block highlight), and a pill CTA button. A large brand illustration floats between columns.
- **Right column (60%):** Vertically stacked **numbered service cards**, each as a white rounded-rectangle card. Cards are numbered 01–04 with an accent circle badge. Each card shows a large display headline and supporting paragraph text. Cards scroll past individually, creating a step-through reading rhythm.

This is a classic **sticky left + scrolling right** pattern — the left panel acts as a persistent label while the right panel tells the story through progressive disclosure.

### Section 5 — Dual CTA Cards
Two **equal-width accent cards side by side**, both with heavy rounded corners (≈24px). Each card contains:
- Large brand illustration centered at top
- Small eyebrow label (Action A / Action B)
- Bold uppercase display headline
- Pill CTA button (outlined, light)

These cards sit on the cream background with visible space between them. Equal sizing signals equivalence between the two user journeys. High visual weight — the solid accent fills most of the viewport.

### Section 6 — Listings (Marketplace)
**Full-bleed section** transitioning back to cream. A section headline with accent highlight block tops the section. Below is a **horizontal three-column card grid** — each listing card is borderless/frameless with just a thin column separator line between them. Cards show: featured badge (pill), reference number (outlined pill), item name in large type, location tags (accent rounded pills). No card borders — columns are separated by vertical hairline dividers, creating a newspaper/directory aesthetic.

### Section 7 — Search / Filter Tool
A full-width **white card** with rounded corners, sitting on the cream background with generous margin. Inside: form layout with two **dropdown selects** side by side (Filter A / Filter B), checkbox group for a range parameter below, then two **large colored filter blocks** — one dark, one accent — each containing tag pills for filtering by attribute type. This is the most utilitarian section, but the color blocking of the two filter zones maintains visual interest.

### Section 8 — Community / Resources Section
Centered single-column layout on cream. Eyebrow text, display headline with accent highlight block. Below, two **large rounded-corner tiles** side by side — one dark background, one accent — functioning as gateway cards to sub-sections. Similar to the dual CTA section but used here for content navigation.

### Section 9 — Blog / Article Feed
**Two-column asymmetric layout** — roughly 65/35 split.
- **Left (65%):** Vertically stacked article rows. Each row has a thumbnail image + tag pills + date + headline + text link. Items are separated by visible horizontal rules.
- **Right (35%):** Sidebar with a category filter block (accent background, rounded corners) and a **community CTA card** (dark background, brand illustration, newsletter signup button).

The sidebar stays visually anchored while the feed scrolls — a conventional editorial/blog pattern, but executed with the brand's signature color blocking.

---

## 5. Footer

Not visible in the screenshots provided.

---

## 6. Notable Layout Patterns

**Floating / absolute brand illustrations** — Brand illustrations appear throughout as decorative floating elements. They are never contained in boxes or constrained by grid columns. They overlap text, bleed off-screen, and bridge between sections. This is the single most distinctive spatial pattern on the site.

**Accent text highlight blocks** — The accent background applied to key display-headline phrases is a recurring signature. It functions like a physical highlighter pen on the type, drawing the eye to the payoff phrase in every section headline. It's always applied at the display level, never body text.

**Alternating background rhythm** — The page strictly alternates dark ↔ cream sections, with the single exception of white cards layered over cream. This creates a predictable visual cadence and acts as a section-break signal without needing explicit dividers.

**Rounded everything** — Buttons, cards, nav bar, filter blocks, and even section containers all share a high-radius rounded corner treatment. This creates a friendly, approachable spatial language that softens the bold typography.

**Sticky left + scroll right** — Used in at least two major sections to create depth and a "chapter" reading feel, rewarding engaged scrolling.

**Card elevation** — White cards over cream backgrounds use subtle drop shadows to create a floating/lifted quality, suggesting an interactive or focusable surface.