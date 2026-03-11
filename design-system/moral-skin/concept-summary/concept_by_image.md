`★ Insight ─────────────────────────────────────`
This is a concept extraction analysis task — the `generate-new-design-system` skill may apply if the goal is to capture and formalize these patterns, but the immediate request is for a pure analytical breakdown, no code generation. Proceeding as a senior UX/interaction analyst.
`─────────────────────────────────────────────────`

---

# Design System & Layout Pattern Analysis

## Section Design Pattern Inventory

Six distinct section patterns are visible across the three screenshots. They are analyzed below as reusable layout modules.

---

## Pattern 1 — Split-Field Hero with Typographic Overlay

### Internal Section Organization
The hero occupies the full above-fold viewport. The field is divided into two equal vertical halves: the left half is a full-bleed editorial photograph; the right half is a flat, near-white surface carrying abstract decorative blob shapes. A massively scaled wordmark is anchored to the bottom of the composition, spanning both columns simultaneously and acting as the primary visual bridge between the two fields. Navigation sits above both columns as a transparent overlay. The announcement bar sits above the navigation as a full-width utility strip.

The layout is **composition-driven** rather than grid-driven — the wordmark's scale and position are determined by the photograph's visual mass, not by a content column.

### Grid System and Spacing
No traditional content column is used within the hero. The 50/50 split is the only structural rule. The wordmark runs edge-to-edge with no horizontal margin, suggesting it is intentionally outside the container system and positioned at the viewport layer. The announcement bar above obeys a simple centered single-column rule with tight vertical padding.

### Media Composition and Art Direction
The editorial photograph occupies the left 50% at full bleed. The subjects — two faces in close proximity — are framed such that key facial features land near center mass, providing visual weight on the left. The right field is deliberately empty and graphic, providing the spatial counterweight. The decorative blob forms on the right field are low-contrast surface graphics, not interactive media — they function as visual texture to prevent the right field from reading as dead space.

### Visual Composition and Layout Intent
This is **image-driven narrative design**. The oversized wordmark functions as both branding and layout anchor — it ties the photographic field to the abstract field, making them read as one composition rather than two panels. The UI (navigation, announcement bar) is overlaid and subordinated entirely to the image composition.

### Hero Section Specifics
- **Background:** Full-bleed editorial photography left / flat off-white right
- **Viewport coverage:** Full viewport height
- **Text placement:** Wordmark bottom-anchored, spanning full width; no body text or headline copy in the traditional sense
- **Headline scale:** Display-scale wordmark at approximately 40–50% of viewport height
- **CTA count:** Zero visible CTAs in the above-fold hero — conversion is deferred
- **Navigation state:** Transparent overlay, black text links, no background fill
- **Announcement bar:** Soft sage green (`#c8d9c4`), centered small-caps text

---

## Pattern 2 — Modal Overlay (Newsletter Capture)

### Internal Section Organization
A centered modal card appears in the mid-page and footer screenshots, interrupting the page layer. The modal carries a single editorial headline in a large script or italic serif face, a short supporting body line, a single underlined input field, and a pill-shaped filled CTA button. The modal background is pure white; the page behind is visually dimmed to a neutral grey scrim.

### Component Styling
The input field uses a single bottom border only — no surrounding box or background fill. This is consistent with the overall no-radius, flat-border design language. The CTA button is fully filled black with white text and a heavily rounded pill border-radius — the strongest border-radius value visible anywhere in the interface.

### Shape Language
The pill button inside the modal is the **only** rounded element observable in the interface. All other components use zero-radius sharp corners. This contrast makes the primary CTA button visually distinctive by shape alone, regardless of color.

---

## Pattern 3 — Full-Width Announcement Bar

### Internal Section Organization
A single-row utility strip pinned above the navigation. Content is centered text only. No interactive elements visible.

### Color and Typography
Background color is the soft sage (`#c8d9c4`), which recurs in the footer — creating a bookend color rhythm between the top and bottom of the page. Typography is small, condensed, spaced — consistent with the nav font stack (`Inconsolata, monospace`).

---

## Pattern 4 — Section with Oversized Display Headline (Mid-page)

### Internal Section Organization
Visible in the upper portion of the mid-page screenshot beneath the scrolled navigation. The layout carries a large uppercase headline in the center of the section. The headline font switches to a different typeface — a bold grotesque — distinct from the serif body font, creating intentional typographic contrast. Below it, a large italic serif phrase serves as a secondary display line. The layout is **centered editorial**, reading as a brand statement block.

### Typography System Signal
This section demonstrates the dual-typeface system: the `Founders` grotesque family for uppercase display headlines and the `Self Modern` serif for italic display phrases. The scale contrast between these two lines is dramatic — the grotesque headline is visibly larger than the italic serif beneath it, establishing a hierarchy of emphasis → elaboration.

---

## Pattern 5 — Instagram Gallery Grid

### Internal Section Organization
A four-column equal-width grid of editorial photographs with no visible gutter or gap. The images run edge-to-edge and fill the full viewport width. Above the grid, centered above-grid text acts as a section label (the `@` social handle). No card borders, no hover treatments, no captions visible.

The grid reads as **pure media surface** — the section exists solely to present photography at high density.

### Grid System
Four equal columns, zero gap, full viewport width, no container. This is a deliberate contrast to the container-based grid used in content sections. The transition from contained content to edge-to-edge media creates strong visual punctuation.

---

## Pattern 6 — Footer with Brand Color Background

### Internal Section Organization
The footer uses the sage green background (`#c8d9c4`) — matching the announcement bar, creating the bookend rhythm. Content is organized in four horizontal columns of unequal visual weight: two link groups left, a centered wordmark, and a newsletter form right. Below this, a legal strip carries copyright, payment method icons, and attribution links in a smaller, lighter type scale.

### Footer Section Specifics
- **Column count:** Four columns (two link groups, logo center, form right)
- **Typography:** Smaller scale than body, lowercase, consistent with the site's letter-spacing and tracking values
- **Logo presence:** Wordmark centered in the footer
- **Newsletter form:** Email input with bottom-border-only styling, matching the modal input treatment — confirming this is a design system pattern, not a one-off
- **Legal text:** Lightest visual weight, smallest scale, bottom-anchored
- **Overall visual weight:** Brand sage green — neither dark nor neutral, clearly a deliberate brand color choice

---

## Navigation Bar Analysis

The navigation is clearest in the mid-page screenshot (post-scroll state) and the footer screenshot.

- **Layout zones:** Left cluster (two short text links), center (wordmark, appears after scroll), right cluster (account and cart with count)
- **Navigation items:** Four total — two content links left, two utility links right
- **CTA differentiation:** None — all navigation items are bare text links at identical scale. No outlined or filled CTA button in the navigation. The "SHOP NOW" button visible in mid-page is a section-level CTA, not a nav element
- **Background treatment:** At scroll state, the nav appears to sit over whatever section background is beneath it (transparent or very lightly surfaced)
- **Typography:** Small, condensed, monospace-adjacent (`Inconsolata`) — clearly differentiated from the serif body type, creating a functional vs. editorial type split

---

## Background and Section Design Behavior

Section backgrounds alternate in a deliberate rhythm:
1. **Sage green** — announcement bar (top)
2. **Transparent / photography** — hero
3. **White** — product content sections
4. **Light cool grey** (`#d8d8d5`) — ingredient and philosophy sections
5. **Warm tan** (`#b5a882`) — brand philosophy section
6. **Sage green** — footer (bottom)

This alternation creates pacing: the cool-to-warm-to-cool transitions prevent monotony without requiring dark sections. The page never goes dark. The mood stays light, organic, and clean throughout.

---

## Depth, Layering, and Visual Hierarchy

The interface is **lightly layered with one strong exception**: the modal overlay introduces the only significant depth event — a full-screen scrim beneath a white card. Outside of this, the interface is nearly flat. The hero's wordmark spanning two fields creates a compositional layer without a shadow or blur — it reads as layered through scale and position rather than elevation.

---

## Shape Language

- **Buttons in content sections:** Sharp zero-radius corners, outlined or filled, rectangular
- **Primary modal CTA:** Heavily pill-rounded (the single exception)
- **Input fields:** No border-radius, flat with only a bottom border
- **Photography containers:** Sharp, no border-radius on image crops
- **Modal card:** Appears slightly rounded at corners — a subtle softening relative to the rest of the interface

The shape language is **overwhelmingly sharp and rectangular** with one deliberate exception: the primary conversion action (pill button in the modal). This makes the pill shape function as a semantic signal for "primary conversion" rather than a stylistic default.

---

## Section Divider Geometry

All section transitions use **flat horizontal cuts** — no curves, waves, or diagonal shapes. Visual separation between sections is achieved entirely through background color changes and vertical whitespace. The transition from the four-column photo grid into the sage-green footer is the most abrupt — edge-to-edge photography ending at an edge-to-edge color field, no gap or divider element.

---

## Design System Consistency

**Consistent across all sections:**
- Zero border-radius on input fields and content-section buttons
- Bottom-border-only input field treatment (modal and footer)
- Sage green (`#c8d9c4`) as the brand accent surface color
- Black (`#000000`) as the primary interactive action color
- White (`#ffffff`) as the inverse action color
- Monospace font (`Inconsolata`) for all functional text (nav, labels, buttons)
- Serif font (`Self Modern`) for all editorial/body text

**Deliberate variation:**
- The pill-radius modal CTA breaks the zero-radius rule to signal primary conversion
- The oversized hero wordmark uses scale as a structural element rather than a typographic one
- The four-column photo grid uses zero-gap where all other grids use visible gutter spacing

---

## Color System Summary

| Role | Value |
|---|---|
| Page background | `#ffffff` |
| Brand surface accent | `#c8d9c4` (sage green) |
| Warm section background | `#f5f0e8`, `#f2ede4` |
| Cool grey section | `#d8d8d5` |
| Tan/khaki section | `#b5a882` |
| Primary action | `#000000` |
| Primary action text | `#ffffff` |
| Heading text | `#000000` |
| Body text | `#222222` |
| Muted / secondary text | `#888888` |
| Border / input underline | `#000000` |
| Success indicator | `#4a7c59` |

Color usage is **high-contrast and minimal**. The palette avoids mid-tone greys for text — it is either near-black or white, with muted grey only for tertiary content. The sage green is the only true brand chromatic color; all other surfaces are warm neutrals or cool neutrals.

---

## Typography System Summary

| Role | Family | Notes |
|---|---|---|
| Display wordmark | `Self Modern` (proprietary) | Used at extreme scale for hero and section identity |
| Section headlines | `Founders Regular` / `Founders Medium` | Uppercase grotesque for structural heads |
| Editorial / italic display | `Self Modern Italic` | Used for brand voice lines, italic serif style |
| Body copy | `Self Modern` | Consistent serif body throughout |
| Navigation / UI labels | `Inconsolata` | Monospace, functional, condensed |
| Button text | `Inconsolata` | Matches nav — functional type register |

The **dual-register system** — editorial serif for content, monospace for function — is the clearest single design system signal. It creates an immediate legibility division: anything in monospace is interactive or navigational; anything in serif is narrative or editorial.

---

## Visual Affordances

- **Filled black pill button** (modal): Strongest affordance signal — shape, weight, and color all signal primary action
- **Outlined rectangular buttons** (content sections): Secondary affordance — border-only treatment signals optional action
- **Bottom-border input fields:** Affordance is minimal by convention (understated editorial form style) — functional but not attention-demanding
- **Navigation text links:** No visual differentiation from body text in terms of weight — affordance relies entirely on placement in the nav zone and scale
- **Photo grid cells:** No hover state, no border, no shadow — the grid reads as pure media content, not as interactive cards (even if they link)

---

## Notable UX/UI Design Observations

**1. Typographic composition as structural architecture.** The hero wordmark is not a headline — it is a layout element. Its size and position are determined by the needs of the dual-column photographic composition, not by content hierarchy. This is an unusual inversion: typography serving layout geometry rather than layout serving typography.

**2. The dual-typeface register system as functional wayfinding.** The consistent split between monospace (functional) and serif (editorial) creates an implicit visual language. Users can scan for monospace elements to find interactive controls without reading the content of those elements. This is a design system decision with real navigability consequences.

**3. Sage green as a bookend rhythm device.** Using the same brand surface color at the top (announcement bar) and bottom (footer) of the page creates a subconscious framing — the page feels contained within the brand color. This is not accidental and functions as a structural pacing tool.

**4. Deliberate CTA deferral in the above-fold.** The hero contains zero CTAs. This is a meaningful UX choice: the above-fold communicates brand identity and aesthetic, not commercial intent. The conversion pressure is introduced only in subsequent sections. This editorial-first, commerce-second hierarchy is a notable departure from conventional e-commerce above-fold patterns.

**5. Shape language as semantic signal.** By using zero-radius for all content components and reserving pill-radius exclusively for the primary modal conversion CTA, the interface creates a shape-based hierarchy of action importance. The rounded pill is not a style — it is a semantic designator for "this is the most important action on this screen." The system would break if pill-radius were applied more broadly.