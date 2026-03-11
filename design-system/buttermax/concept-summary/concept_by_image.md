`★ Insight ─────────────────────────────────────`
The screenshots show the same above-fold hero at three different moments (hero load, mid-scroll title animation, further scroll) — not three separate scroll positions. The "design system" is therefore concentrated in a single viewport section, making this a focused analysis of a **single-screen design grammar** rather than a multi-section page system.
`─────────────────────────────────────────────────`

---

# Visual Design System Analysis

## Section Design Patterns Identified

Only **two distinct section patterns** are visible across the three screenshots:

1. **Hero / Landing Screen** — full-viewport composition with display type, 3D media object, and branded identity elements
2. **Persistent Utility Bar** — anchored bottom-edge cookie/consent strip with copy and ghost CTA buttons

These are the only structural sections present. No scroll-revealed sections, feature grids, or footer content appears.

---

## 1. Internal Section Organization

**Hero section:** Uses a **layered, media-dominant composition** with no traditional grid zones. The layout operates on three overlapping strata:

- **Background stratum:** Flat chromatic field (full-bleed solid color, no gradient or texture)
- **Typography stratum:** Display headline at extreme scale, left-anchored, extending beyond the visible viewport edge — intentionally overflowing the container
- **Media stratum:** A high-fidelity 3D-rendered object floats at center-right, physically overlapping and obscuring portions of the headline text

This is **composition-driven rather than grid-driven** — elements are positioned relationally to each other, not to a column system. The subheading copy sits in the lower-left quadrant, typographically isolated from the headline and physically separated by significant vertical distance.

**Utility bar:** Strictly functional, horizontally split — body copy left-anchored, two ghost CTA buttons right-anchored. Dark surface contrasts sharply against the hero above.

---

## 2. Grid System and Spacing System

The hero section **does not follow a conventional column grid**. No container margins are enforced at the headline level — the display type intentionally breaks the page boundary. This is a deliberate design choice: the type is meant to feel like environmental signage, not page content.

The utility bar does use an implied horizontal two-zone split: text occupies roughly 60–65% of the bar width, CTAs occupy the remaining right zone. This aligns with a loose 12-column grid logic, but the implementation is compositionally loose.

Navigation uses a **three-zone horizontal split**: far-left icon, centered logotype/symbol, far-right link cluster. This is a classic trinity nav pattern with strong visual balance through symmetry around the center mark.

Vertical spacing in the hero is generous and intentional — the subheading sits roughly at the 35–40% vertical mark, well below the headline cap-height. This creates a large breathing zone that gives the 3D object room to dominate.

---

## 3. Media Composition and Art Direction

The 3D rendered object is the **structural anchor of the composition**. It is:

- Positioned at center-right, occupying roughly 35–40% of viewport width
- Rendered with high photorealism — ambient occlusion, specular highlights, transparent chassis
- Tilted on a diagonal axis (~15–20° pitch, ~10° yaw), giving it dimensional presence on a flat background
- Sized to span the full vertical height of the visible viewport

The object is **art-directed to interact with the headline text** — it sits in front of the type, creating a deliberate occlusion relationship. This foreground/background inversion (media in front of text) is compositionally aggressive and marks the design as media-dominant.

The background is a **text-safe zone by design** — the flat electric yellow (#FFD600) has no photographic complexity, no gradients, no texture, making it perfectly readable for large black display type at any placement.

---

## 4. Visual Composition and Layout Intent

This interface behaves as **image-driven narrative design** rather than structured grid UI. The layout grammar prioritizes:

- **Tension between type and object** — the headline begins to read, then is interrupted by the 3D media, creating visual curiosity and forcing the eye to track around the object
- **Scale contrast as hierarchy** — the headline is 10–12× larger than any other text element on screen, making it operate more as a visual texture than readable copy at first glance
- **Spatial generosity** — large amounts of unused background space frame both the text and the object, preventing visual crowding

The composition creates a poster-like quality. The layout intent is **brand declaration, not information delivery**.

---

## 5. Background and Section Design Behavior

The hero background is a **monochromatic, full-bleed solid field** in a high-chroma yellow (#FFD600). No texture, no gradient, no photography.

The utility bar switches to a near-black (#101010) surface, creating an immediate **light-to-dark section boundary** at the bottom edge of the viewport. This transition is abrupt — no separator shape, no decorative edge treatment — which functions as a functional zone demarcation rather than a design narrative transition.

No other background types appear in the visible screenshots. The section pacing is therefore: **brand field → functional dark bar**, a minimal two-state rhythm.

---

## 6. Depth, Layering, and Visual Hierarchy

The interface uses **strong foreground layering** despite a flat color background. Depth is created entirely through:

- **Occlusion** — the 3D object covers portions of the display headline, establishing clear foreground/background relationship
- **Render quality contrast** — the photorealistic, specular-lit 3D object reads as physically present against the flat color field, creating strong perceptual depth without any drop shadows or elevation tokens
- **Type scale differential** — the massive headline behind the object recedes by scale into "environmental" space, while the smaller subheading reads as "near" and accessible

The interface feels **strongly dimensional** despite using zero shadow tokens or blur effects. Depth is achieved through compositional placement and render contrast, not CSS elevation.

---

## 7. Component Styling (Borders, Surfaces, Elevation)

Navigation items use **thin outlined pill buttons** with black (#000000) border on the yellow background. The pill border radius is substantial — buttons read as capsule-shaped, not rounded rectangles.

The utility bar CTAs use the **same pill geometry** but with yellow (#FFD600) border on dark surface — a color-inverted version of the same component. This is a clean dark-mode variant of the navigation button pattern.

No card surfaces, elevation shadows, or background-contrast component styling appears. **Borders are the primary component definition mechanism** — the design relies on outline shapes rather than filled surfaces.

---

## 8. Shape Language

The interface uses a **pill-dominant shape language** consistently across all interactive components. Navigation links, the logo symbol, and utility bar CTAs all share heavy circular border-radius. This creates a rounded, friendly geometry that contrasts with the aggressive scale of the display typography.

The 3D object has its own internal shape language (mechanical, rectangular, with exposed circuit geometry) which sits in deliberate tension with the organic pill shapes of the UI system.

---

## 9. Section Divider Geometry

The only visible section transition (hero → utility bar) uses a **straight horizontal edge** — no curves, no diagonals, no decorative separator. The transition is purely functional, delineated by the abrupt dark background of the utility bar.

This is consistent with the overall design philosophy: ornament is reserved for the brand color and the 3D object. Structural transitions are handled minimally.

---

## Hero Section Analysis

- **Background:** Full-bleed flat solid color (#FFD600) — no image, no gradient
- **Viewport coverage:** Full-viewport height, edge-to-edge width
- **Text placement:** Display headline is left-anchored, baseline near vertical center, extends past right viewport edge (overflow-visible). Subheading is left-anchored, lower-left quadrant
- **Headline scale:** Extremely large — roughly 20–24vw cap-height, operating at environmental/signage scale
- **CTA presence:** None in the hero itself — CTAs are nav-level (outlined pill links)
- **Scroll indicator:** Not visible as a static element
- **Navigation state:** Transparent background at page top — nav items render directly against the yellow field, using black pill-outline buttons and a centered logotype mark

---

## Footer/Utility Bar Analysis

The bottom persistent strip is a **consent/utility bar**, not a traditional site footer. It is:

- **Full-width, single-row** — no column structure
- **Dark surface (#101010)** contrasting against the hero yellow
- **Typography:** Small-scale, capitalized, white text — lower visual weight, functional register
- **CTA count:** Two — pill-outline buttons with yellow (#FFD600) border, functioning as binary choice CTAs
- **No logo, no link groups, no social icons, no copyright block**

This is not a footer — it is a transient overlay element. The actual site footer is not visible in any of the three screenshots.

---

## Navigation Bar Analysis

- **Layout:** Three-zone — far-left icon mark (X symbol), center logotype mark (horizontal oval/eye symbol), far-right link group
- **Link count:** Three — short all-caps labels (single words)
- **CTA differentiation:** Navigation links are styled as outlined pill buttons, identical in weight to each other — no primary CTA differentiation within the nav
- **Background:** Transparent — nav floats over the yellow hero field
- **Position:** Appears fixed or sticky at top of viewport across all three screenshots
- **Visual tone:** Minimal, high-contrast, clean — black-on-yellow pill outlines

---

## Section Differentiation Analysis

| Section | Background | Typography Scale | Media Density | Component Type |
|---|---|---|---|---|
| Hero | Solid yellow | Extreme display | High (3D object dominant) | Nav pills, decorative |
| Utility bar | Solid near-black | Small utility copy | None | Action pills (binary CTA) |

The differentiation between sections is achieved entirely through **background color contrast** and **typographic scale shift**. No shape change, no texture change, no layout structure change.

---

## Design System Signals Across Sections

**Consistent:** Pill shape language, font weight (semibold throughout), all-caps labeling, border-as-definition (no filled surfaces except the two background fields), uppercase small-scale labels

**Deliberate variation:** Button border color inverts between sections — black on yellow in nav, yellow on dark in utility bar. This is a clean **dark/light variant system** applied consistently to the same component token.

---

## Color System and Visual Hierarchy

Two-color palette in active use:

- **Primary field: #FFD600** — dominates 90%+ of the visible viewport; functions as background, brand identity, and positive/action surface
- **Secondary field: #101010** — used exclusively for the utility bar; signals functional/dark mode context
- **Typography: #000000** — headline and nav links; maximum contrast on yellow
- **Accent in dark context: #FFD600** — button borders and text within the dark utility bar; the same brand yellow functions as an accent/highlight color on dark surfaces

The color system is **binary and deliberate** — two background states, one text color per background, one accent per background. No tertiary colors, no neutrals, no gradients.

---

## Typography System

The system uses a **single typeface family** across all elements (proprietary, not web-accessible — identified as "my Font" in tokens). Key observations:

- **Display headline:** ~20–24vw, weight 600/semibold, tight or negative tracking — operates as environmental signage
- **Subheading/caption:** ~14px, weight 600, uppercase, tight letter-spacing (~-0.7px) — functional descriptor register
- **Nav labels:** ~10–11px, weight 600, uppercase, tight tracking — minimal UI register
- **Utility bar copy:** ~10px, weight 600, uppercase — identical register to nav labels

The typeface features **strong calligraphic contrast** in display sizes — the screenshots at different moments reveal a cursive/script secondary word appearing alongside the block-weight primary headline. This **dual-weight display pairing** (grotesque block + expressive script) is a key typographic signature of the design system.

`★ Insight ─────────────────────────────────────`
The cursive script wordmark visible in screenshots 2 and 3 is a secondary display weight of the same proprietary family — not a separate typeface. This "grotesque + script" pairing within one family is a high-signal typographic technique used by premium creative studios to inject personality at display scale without introducing typeface complexity.
`─────────────────────────────────────────────────`

---

## Visual Affordances

Interactive elements are signaled through:

- **Pill-outline border** — the primary affordance signal. All tappable/clickable elements use this shape. Nothing else on the page uses bordered pill shapes
- **Label casing** — all interactive labels are all-caps, distinguishing them from any potential mixed-case editorial copy
- **High contrast** — black border on yellow or yellow border on dark; both configurations exceed 4.5:1 contrast ratio

Non-interactive elements (headline, subheading, 3D object) have no border treatment. The visual distinction is clean and unambiguous.

---

## Section Transitions

Hero → Utility bar: **Immediate dark field cut**, no transition geometry. The utility bar appears as a hard edge anchored to the viewport bottom, not a scroll-revealed section. This functions as a viewport layer (always-present overlay) rather than a content section.

---

## Notable UX/UI Design Observations

**1. Compositional occlusion as brand statement**
The 3D object physically obscures the display headline. This is a mature art direction decision — it signals that the brand's aesthetic confidence is high enough to sacrifice readability for composition. The effect says "the visual experience is the message."

**2. Overflow typography as spatial device**
The headline extends beyond the right viewport edge without constraint. This treats the viewport as a **window into a larger composition space** rather than a container to fill. It implies lateral content or motion, creating tension that encourages engagement.

**3. Single-family display pairing (block grotesque + script)**
Using both a slab-weight grotesque and an expressive script form within the same typeface family — rendered at display scale — achieves maximum typographic contrast with minimal system complexity. This is a sophisticated restraint: personality through weight extremes, not through introducing additional fonts.

**4. Color as brand field, not decoration**
The dominant yellow is not an accent color — it *is* the interface. The entire viewport is the brand color. This inverts conventional web layout logic (white/neutral canvas + brand accents) and creates an immersive brand environment rather than a content presentation surface.

**5. Component color inversion as dark mode token**
The pill button inverts exactly between light context (black border, black text on yellow) and dark context (yellow border, yellow text on near-black). This is a clean **two-token variant system** applied to a single component, suggesting a mature design system architecture even within a visually minimal interface.