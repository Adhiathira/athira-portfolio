`★ Insight ─────────────────────────────────────`
This task is purely editorial transformation — no code involved. The key challenge is pattern recognition: identifying proper nouns, product names, and industry-specific numbers buried within structural descriptions, without accidentally genericizing layout terminology like "pill-shaped" or "masonry" which are design vocabulary, not brand-specific.
`─────────────────────────────────────────────────`

# Homepage Layout Brief

## Overall Page Structure

The page flows through approximately 10–12 distinct sections, progressing from a centered, editorial hero down through a series of alternating product showcases, social proof bands, feature grids, and a dark-mode integration section before landing on a final CTA and footer. The dominant background is a warm cream/linen tone that unifies the entire scroll — sections don't break into harsh color blocks but instead breathe within this consistent field. A persistent privacy notice floats bottom-left throughout, functioning as an overlay layer independent of the scroll.

---

## Header / Navigation

The navigation is a **full-width, centered-content bar** sitting flush against the top of the viewport. It's composed of three distinct zones:

- **Left:** Wordmark with a small dropdown chevron — minimal, no icon
- **Center:** Five text navigation items (e.g., Product, Solutions, Pricing, Resources, Sign in), evenly spaced with light weight typography
- **Right:** Two CTA buttons — Secondary CTA (outlined, pill-shaped) and Primary CTA (solid dark/black, pill-shaped), sitting side by side

The nav feels slim and restrained, with generous negative space on either side. Typography is small and mid-weight. The two-button right cluster creates a clear primary/secondary hierarchy without being loud.

---

## Hero Section

The hero is **centered, single-column, typographically dominant**. No split layout — everything converges on a central vertical axis:

1. **Announcement pill** at top center: a small pill badge labeled with a short category tag followed by a short text line with a right-arrow link. It reads like a floating notification — small, rounded, softly bordered.
2. **Large display heading** (roughly 80–96px equivalent): Two lines of editorial text. First line renders a key phrase in strikethrough with dark color; a second word or phrase appears in a distinctively styled script/italic typeface in an accent color — a deliberate typographic juxtaposition that serves as the visual focal point.
3. **Subheading** (2 lines, centered, comfortable reading width ~600px): standard body copy, muted.
4. **Two CTA buttons** centered, side-by-side: outlined Secondary CTA and solid dark Primary CTA.
5. **Product UI mockup** below: a large, slightly cropped browser frame showing the product interface — it bleeds past the fold, implying continuity and inviting scroll.

The hero has substantial vertical padding above and below the text cluster, giving it a calm, unrushed cadence. The floating privacy dialog (bottom-left, fixed) overlaps the product screenshot without disrupting the hierarchy.

---

## Content Sections

### Section 2 — Social Proof / Ratings Band
A **full-width horizontal band** that reads as a footer-within-a-section. Two distinct zones side by side:
- **Left:** Three rating scores from third-party review platforms in a loose horizontal row — small numeral, small label, visually equal weight
- **Right:** Three compliance/certification badges displayed as logos/icons with small type

The layout is intentionally low-contrast and modest — it functions as credibility punctuation, not a hero moment. Generous whitespace separates it from sections above and below.

---

### Section 3 — Logo Parade / Customer Logos
A single centered headline ("[Stat]+ leading companies trust Brand Name...") above a **horizontal logo strip** — 6–7 company logos evenly spaced across the full width. Logos are monochrome/grayscale, medium size, giving a clean editorial feel. No bounding boxes or cards — logos float on the light background field.

Below this, a **large decorative wave/curve** shape transitions the section into the next — a full-bleed organic curved divider that arches from the light background into a dark background. This is the most dramatic layout moment on the page.

---

### Section 4 — Feature Showcase (Left text / Right product mockup)
Two-column layout, roughly **40% left / 60% right**:
- Left: stacked list of feature bullets (faint left-border accent, alternating active/inactive state on hover), with the active item slightly bolder
- Right: large product UI screenshot in a rounded browser frame, elevated with subtle shadow

This pattern repeats multiple times throughout the page with content swapped. The proportions consistently favor the product visual — it takes more horizontal real estate than the text.

---

### Section 5 — Full-Width Testimonial Pull Quote
A large, **centered single testimonial** spanning approximately 60% of page width. Oversized quotation typeset — around 36–48px equivalent — no card boundary, no background box. Just text and attribution (avatar circle + name + title) centered below. Lavish vertical breathing room above and below.

---

### Section 6 — Dark Section with Integration Constellation
A dramatic **full-bleed dark panel** introduced by the organic wave from above. Inside:
- Left: large heading, 2–3 lines, white text describing a key value proposition
- Floating integration icons: scattered across the right side in a loose, orbiting arrangement — circular icon chips connected by faint dashed lines, suggesting a network/constellation pattern. Icons feel decorative but functional.

This section is the strongest visual contrast on the page — dark background against the pervasive light background creates a moment of pause.

---

### Section 7 — Testimonials Grid (Masonry/Card grid)
Back to light background. Section heading centered above a **card grid** — approximately 2 columns wide with variable row heights suggesting a **masonry or staggered card layout**:
- Some cards are taller text-only quote cards
- One card contains a large metric callout ("[Stat]") — stat displayed at display scale (~80px), label below in small type
- Cards have white fills, subtle rounded corners, soft shadow — they float above the light field

---

### Section 8 — Case Study List
Below the testimonials grid, a section heading introduces a **stacked list of case study rows**. Each row is a full-width horizontal card with:
- Left: company logo mark + company name + "switched from [Product]" label in small caps
- Center: person name + title
- Right: "Case study ↗" link text

Rows are separated by visible but subtle borders. The layout has a clean tabular rhythm — it reads like a structured list, not a card grid.

---

### Section 9 — Feature Grid (Enterprise/Security)
Dense **3-column card grid** — cards are compact, uniform height, with:
- Small category tag at top right (color-coded by category type)
- Icon + feature name
- Short 2–3 line description

The grid spans full content width. Card density is noticeably higher here than elsewhere — it signals a "comprehensive feature list" rather than a spotlight. Cards have white fills on the light background with soft rounded corners.

---

### Section 10 — Final CTA with Testimonials
A **two-column asymmetric layout**:
- Left (~40%): heading, checklist of 5 items with checkmark bullets, two CTA buttons stacked
- Right (~60%): vertical stack of 3 testimonial cards — white-background quote cards, each with avatar + name + title, stacked with gap

Strong left–right visual balance despite the column asymmetry — the testimonials give the right side visual weight to match the bold heading on the left.

---

## Footer

A **multi-column link grid** — approximately 5 columns of navigation links with equal column widths. Link items are standard small-weight type with modest leading. No elaborate design — purely utilitarian, consistent with standard footer conventions.

Above the link columns: a final brand statement in large display type, centered, continuing the editorial voice of the page.

---

## Notable Layout Patterns

**Floating privacy overlay:** A bottom-left fixed card persists across all scroll states — it has its own white card background, dismiss (×) button, and link. It functions as a fixed layer independent of scroll, overlapping product screenshots without disrupting reading flow.

**Organic wave dividers:** The transition into and out of the dark section uses large full-bleed SVG/CSS curve shapes — not hard horizontal rules but sweeping arcs that create a sense of dimensional depth, as if the light and dark layers are overlapping surfaces.

**Consistent product mock framing:** Product UI screenshots throughout use rounded browser-chrome frames with soft drop shadows — they read as "windows" floating above the page field rather than flat images. This consistency creates a visual language that distinguishes "product evidence" from "page content."

**Typographic scale rhythm:** The page uses an unusually wide scale range — from very small label type up to display-scale metric callouts and the hero heading. Each section earns its own scale moment, preventing visual monotony across a long-scroll page.

**Spatial generosity:** Throughout, sections have substantial vertical padding — the page never feels cramped. Even the dense feature card grid breathes with card-to-card gap. This premium spacing is a core layout choice that signals confidence and calm.

`★ Insight ─────────────────────────────────────`
A few judgment calls worth noting: (1) "pill-shaped" was kept — it's a design pattern term, not brand-specific. (2) The wave divider description was preserved verbatim except replacing the color names ("cream", "dark charcoal") with role-based equivalents ("light background", "dark background"). (3) The metric in Section 7 ("90% fewer repeated questions") was reduced to `[Stat]` since the number itself is brand-evidence, but the *card layout pattern* it demonstrates was fully preserved.
`─────────────────────────────────────────────────`