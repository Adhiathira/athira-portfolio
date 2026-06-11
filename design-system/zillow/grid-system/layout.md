`★ Insight ─────────────────────────────────────`
This is a pure text transformation task — no code, no files to read first. The goal is surgical: strip identity markers while preserving every structural/spatial descriptor intact.
`─────────────────────────────────────────────────`

# Brand Homepage — Layout Brief

---

## 1. Overall Page Structure

The page follows a classic top-to-bottom editorial stack with five distinct zones:

1. **Global navigation bar** — fixed at the very top
2. **Hero** — full-width photographic backdrop with centered search
3. **Horizontal card carousels** — two to three stacked sections of content listings
4. **Promotional/marketing triptych** — three equal service cards on a grey field
5. **Footer** — multi-tier link grid, legal block, social bar

The spatial rhythm is generous: each section breathes with consistent vertical padding, and transitions between sections are clean cuts (no bleeds or overlaps). The overall feel is utilitarian and grid-disciplined rather than expressive or editorial.

---

## 2. Header / Navigation

A **single-bar, two-sided nav** sits at the very top of the page:

- **Left cluster:** Five flat text links — primary navigation categories — spaced at equal intervals, relatively compact weight
- **Center anchor:** The brand logo (wordmark + icon) acts as the optical midpoint
- **Right cluster:** Three secondary utility links followed by a high-contrast filled pill button (Primary CTA)

On scroll, the nav compresses and the search bar migrates up into it — the hero's search field is replaced by a thinner inline search input that lives inside the nav bar. This is the page's primary sticky/adaptive element.

The nav has no background on the hero but gains a crisp light fill as soon as the user scrolls past the fold.

---

## 3. Hero Section

A **full-bleed photographic band** roughly 45–50% of viewport height. Key layout details:

- The photo is full-width, edge-to-edge, with no padding or gutters
- Large bold headline copy floats in the **lower-left quadrant** of the image, light text at display size
- A **floating search pill** — light-filled, heavily rounded, search-icon right-aligned — is centered horizontally and sits roughly at vertical center, slightly overlapping where the hero photo meets the section below
- The photo subject occupies the right two-thirds of the frame; the headline occupies the left third
- No overlay gradient is visible; headline legibility relies on the naturally dark/neutral tone of the background

The search box is the hero's single call-to-action — it is large, high-contrast, and impossible to miss.

---

## 4. Content Sections Below the Hero

### Section A — Featured Listings Carousel

A **horizontal scroll carousel** of content listing cards:

- Section header: bold left-aligned title + subdued one-line descriptor below it; left-and-right chevron arrow buttons float to the far right of the header row, creating a dumbbell header layout
- Cards are uniform width (~4-up visible on desktop), all the same height
- Each card has: full-bleed photo top, a rounded badge label floating over the top-left of the photo, then a light content block below with bold primary value, metadata row, and descriptor line in smaller weight
- The rightmost card is **clipped**, signalling horizontal continuability
- Cards have subtle rounded corners and a light shadow/border separating them from the light background

### Section B — Secondary Carousel (additional listings)

Visually identical to Section A — same card structure, same 4-up grid, same clipped edge pattern. This reinforces a modular, repeatable carousel component used throughout the page. The headers and labels change but the layout DNA is identical.

### Section C — Calculator Tool + Recommended Listings (two-column split)

A **left/right horizontal split** at roughly 40% / 60% proportions:

- **Left:** A contained light card with a calculator UI — input fields, numeric output, and a prominent filled full-width CTA button (Primary CTA)
- **Right:** Another instance of the listing card row — same card format, partially loading/skeleton state visible, three cards shown

This section breaks the all-carousel rhythm and introduces a heavier left-column anchor, giving the tool equal visual weight to the content listings.

### Section D — Service Triptych ("Service A / Service B / Service C")

Three **equal-width cards on a light grey background** — the only full-width section with a non-white fill, which creates a clear visual break:

- Cards are perfectly symmetrical, ~30% width each with comfortable internal padding
- Each card: circular illustrated icon, bold centred heading, body copy paragraph, and a bordered/outlined secondary CTA button (Secondary CTA)
- All three CTAs are uniform in size and style (hollow rectangle, not filled) — deliberately lower hierarchy than the filled hero button
- The grey background acts as a visual container, separating this promotional band from the listing carousels above and below

---

## 5. Footer

The footer is a **multi-tier stacked block**, dense but organized:

**Tier 1 — Accordion nav columns:** Four equal-width sections, each with a downward chevron, separated by thin vertical dividers. This is a compressed mega-menu accordion.

**Tier 2 — Flat link rows:** Two rows of small secondary links (legal/utility) centered on the page, no columns, just inline wrapping text.

**Tier 3 — Legal / compliance text block:** Centered paragraph text, smaller weight, hyperlinks for regulatory disclosures. Very dense, low-contrast — clearly not meant to be read, just present for compliance.

**Tier 4 — App store badge row:** Two standard store badges centered side by side.

**Tier 5 — Brand bar:** The brand logo, "Follow us:" + social icons, and a copyright line — all inline, centered, creating a clean final rule for the page.

---

## 6. Notable Layout Patterns

### Adaptive Sticky Navigation
The most sophisticated layout behavior: the hero's large centered search bar "transfers" into the nav bar on scroll. The nav transitions from transparent + logo-center to light fill + search-embedded. This is a progressive compression pattern common in search-led interfaces.

### Full-Bleed Hero Photography
The hero image extends edge-to-edge with zero margin, creating maximum visual presence at the fold. The search input's light fill creates strong foreground/background contrast against the photo without needing a dark overlay.

### Floating Badge Labels on Cards
Status and category labels use an **absolutely-positioned overlay** pattern — they sit in the top-left corner of card photos without affecting the card's content flow below. A high-contrast accent color creates instant urgency contrast against the card photography.

### Grey Section as Visual Separator
The service triptych's grey background is the only full-bleed color break on the page. It acts as a deliberate rhythm interruption — signaling "this is different from listings" without any typographic announcement.

### Right-Edge Card Clipping
All carousels clip the last visible card at roughly 85% width. This is a canonical **affordance cue** — the partial card tells the user the row is scrollable without requiring any instructional text.

### Centred Compliance Footer
The legal text block is centred at a narrow measure, deliberately creating a narrow column within the full-width footer. This mimics the visual weight of a paragraph, reducing the cognitive load of dense regulatory copy.