`★ Insight ─────────────────────────────────────`
These three screenshots all show the same above-fold hero state — no mid-page or footer content is visible. The "three scroll positions" are subtle viewport shifts of the same hero, likely captured to show the parallax/pan behavior of the hero image. The analysis below treats this as a single hero state with three frames, and draws on the extracted design tokens to fill in what cannot be inferred from static screenshots alone.
`─────────────────────────────────────────────────`

---

# Design System & Layout Pattern Analysis

## Section Design Patterns Identified

From the three screenshots — all capturing the same above-fold hero composition at slightly different image positions — one primary section pattern is fully visible, with secondary patterns implied by the extracted token data:

1. **Constrained-header / open-field hero** (visible)
2. **12-column editorial grid module** (inferred from grid tokens, structurally visible in the hero)

---

## 1. Internal Section Organization

The hero is organized into two distinct horizontal bands stacked vertically:

**Top band — navigation + headline zone**
A light-field zone (`#eaedf4`, the extracted visual page-background lavender-grey) contains three content clusters in a single row: a wordmark anchored far left, a large multi-line editorial headline occupying the center-left column span, and a pair of pill-shaped action buttons clustered to the far right. This band does not use a centered editorial model — it is strictly asymmetric, with a clear left-anchor and right-anchor pulling content to opposing poles, leaving the headline to occupy a middle-third zone. The layout reads as **asymmetric split-row**, not split-screen.

**Bottom band — full-bleed media zone**
A near-black (`#0a0a0a`) media field fills the remaining viewport height, functioning as the primary visual container. A thin footer bar closes the section at the very bottom. The section overall is **media-dominant**: the image zone occupies roughly 70–75% of viewport height.

---

## 2. Grid System and Spacing System

The token data confirms a **12-column grid** with a `2vw` fluid column gap (`34.56px` at 1440px viewport width). The hero section (`home-hero`) uses exactly this structure: 12 equal columns (`97.9px` each at extraction resolution) with two defined rows — a shallow top row (~142px for the nav/headline band) and a deep bottom row (~694px for the media field).

The horizontal padding is derived from `max(5vw, 40px)`, resolving to approximately `86px` at 1440px. This creates a generous but not excessive page margin that prevents content from touching viewport edges.

The spacing rhythm is **sparse and deliberate** — the three screenshots show very little internal visual clutter. The headline zone uses no subheadings, no supporting body text, and no visual separators between navigation and content. Vertical breathing room is allocated almost entirely to the media field, not to typographic content.

The button cluster uses a `borderRadius: 100px` (full pill) and tight internal padding (`~15–23px` horizontal, with a `~9.5px` gap between icon and label), giving them a compact, refined silhouette.

---

## 3. Media Composition and Art Direction

The hero image is a **full-bleed 3D render** of cross-shaped volumetric objects in black, cobalt blue (`#3d4fd6`), and grey — rendered against a near-black background. The image is compositionally **center-dense**: the objects cluster toward the visual center and lower-center of the frame, leaving the upper-left and upper-right quadrants darker and less visually busy.

This is not incidental. The three screenshots show the image at three slightly different vertical crop positions, but the upper margin of the image consistently presents a dark, low-texture zone that serves as a **text-safe area** — ideal for overlaying labels, legal text, or scroll indicators without legibility conflict.

The lower-edge footer bar (four `+` icons flanking "SCROLL TO EXPLORE") sits against this same dark zone, and the monospaced label reads cleanly at small scale because the background behind it is uncluttered.

The render does not attempt photographic naturalism. It is clearly synthetic — high-key highlights on the cross objects, uniform ambient light, no environmental context. This directs attention to **form and material** rather than scene or narrative, which is consistent with a portfolio-style identity for a digital craft studio.

---

## 4. Visual Composition and Layout Intent

The layout uses **compositional separation by field** rather than typographic separation. The light-field top band and the dark media field are hard-cut — no bleed, gradient transition, or overlap. Text does not float over media; it occupies its own zone entirely.

This is a notable editorial choice. Most hero layouts either overlay text on imagery (risking legibility conflicts) or use a side-by-side split (fragmenting the media). Here, the layout preserves the image's full compositional integrity by placing text entirely outside it — in a separate horizontal stripe above.

The headline itself ("We help brands create digital experiences that connect with their audience") is set at a large scale (`43.2px` / `1.1` line-height) in regular weight, in the same Aeonik typeface used for everything else on the page. There is **no typographic hierarchy variation** within the headline band — no subheading, no eyebrow label, no supporting copy. The single headline occupies the full center-left span with nothing competing for attention.

---

## 5. Background and Section Design Behavior

The light-field background (`#eaedf4`) is a desaturated lavender-grey — not pure white, not neutral grey. It reads as slightly off, slightly cool, which gives the page a distinctive tone that prevents it from feeling generic or corporate-white.

The media field (`#0a0a0a`) is near-black. This is not a soft dark; it is a hard contrast step.

The transition between the two fields is a **sharp horizontal edge** — no curve, no diagonal, no fade. The abruptness of this cut is itself a design gesture: it separates the "thinking zone" (light, typographic) from the "sensation zone" (dark, visual) without mediation. This binary contrast is a deliberate design decision that signals confidence in the layout system.

---

## 6. Depth, Layering, and Visual Hierarchy

The interface is **flat with one compositional depth layer**. There are no shadows, no elevation cues, and no overlapping elements. The two buttons in the top-right have filled and surface backgrounds (`#2b2e3a` / `#e4e6ef`) but no drop shadows — their visual prominence comes entirely from color contrast and pill geometry.

The 3D render in the media field creates an illusion of depth within the image itself, but the UI sits entirely outside the image — there is no floating UI layer over the media. Depth is embedded in the content, not in the interface structure.

---

## 7. Component Styling (Borders, Surfaces, Elevation)

The two navigation buttons demonstrate two distinct component surface treatments:

- **Primary CTA** (`LET'S TALK` with dot indicator): dark filled surface (`#2b2e3a`), white text, no border, pill shape
- **Utility button** (`MENU` with dots indicator): light surface (`#e4e6ef`), black text, no border, pill shape

Neither uses a stroke border. Separation from the background is achieved entirely through surface color contrast. There are no dividing lines between navigation zones, no separators between the header and the media field (beyond the implied edge of the light-field zone ending).

The footer bar beneath the media uses a row of `+` symbols as visual punctuation — these function as decorative separators and positional markers rather than interactive components. They appear at equal horizontal intervals, creating a structural rhythm across the full width.

---

## 8. Shape Language

Shape language is **consistently pill-dominant** for all interactive components. Button radii are `100px` (fully pill). Input fields use `18px` radius (softly rounded). The CTA block uses `~92px` radius at larger scale.

There is no sharp-cornered UI in evidence. The page background and media field use **zero-radius hard edges** — they are rectangles — which creates a deliberate contrast: soft interactive components (buttons, inputs) against hard structural zones (sections, fields). This pairing gives the interface tactility on interactive elements while maintaining structural clarity in the layout grid.

---

## 9. Section Divider Geometry

The hero section terminates at a **straight horizontal edge** — the media field has a hard bottom boundary where the footer bar begins. No wave, curve, or diagonal is used. The `+` symbols in the footer bar serve as **visual coda** rather than a geometric separator: they punctuate the end of the section rhythmically without introducing a new shape form.

---

## Hero Section Analysis (Above-Fold)

- **Background type**: Dual-field — light lavender-grey (`#eaedf4`) in the upper nav/headline band; near-black (`#0a0a0a`) in the full-bleed media field
- **Viewport coverage**: Full viewport height — the section fills the screen edge-to-edge with no visible content below the fold
- **Text placement**: Entirely in the top band, not overlaid on media — headline is left-of-center aligned within the top band, wordmark is far left, CTA cluster is far right
- **Headline scale**: Large — `43.2px` / `47.5px` line-height in regular weight, no additional emphasis. Headline spans three lines in the center-left zone. Contrast against the `#eaedf4` background is high (black on light)
- **CTA count**: Two — one primary filled pill ("LET'S TALK" with a dot indicator), one utility surface pill ("MENU" with a dots indicator). No ghost or underlined link style in the nav zone
- **Scroll indicator**: Present as a static text label — "SCROLL TO EXPLORE" in what appears to be monospaced type (IBM Plex Mono or LusionMono), centered in the footer bar beneath the media field, flanked by `+` icons
- **Navigation bar**: Transparent — sits inside the same light-field band as the headline with no separate background panel. No border, no blur treatment

---

## Navigation Bar Analysis

- **Layout zones**: Wordmark far left; headline content occupying center (not a typical nav link zone — the headline text operates as the primary above-fold message, not a nav item); action buttons far right
- **Navigation item count**: Two visible UI controls — one primary CTA, one utility/menu toggle
- **Visual differentiation**: The two buttons are visually distinct from each other (dark fill vs. light surface) and both are visually distinct from the wordmark (which is plain black text). There are no underlined links or icon-only elements in the nav zone
- **Background treatment**: Fully transparent — the nav bar has no independent background; it inherits the light-field zone of the top band
- **Fixed/floating/inline**: Appears inline with page content at the top of the layout, not visually floating or separated by a border

---

## Section Differentiation Analysis

Only one full section is visible across the three screenshots. However, the **internal differentiation within the hero** is notable: the light-band and dark-band behave as two sub-sections with opposing visual weights, color temperatures, and content densities. This internal contrast does the work that multi-section transitions typically accomplish across a longer page scroll — the section feels "complete" as a standalone visual unit precisely because it contains its own internal polarity.

---

## Design System Signals Across Sections

From the single visible section and extracted token data:

- **Button style consistency**: Pill geometry used across all interactive components at all sizes
- **Spacing scale**: Fluid `vw`-based spacing tied to a 12-column grid — consistent and mathematically derived, not arbitrary
- **Typography**: Single typeface family (Aeonik) used for all roles — headline, body, buttons, nav labels — differentiated by weight (`400` vs. `500`) and text-transform (`uppercase` for labels/buttons). No decorative or display secondary typeface in the hero
- **Color discipline**: The light-field zone uses only `#eaedf4` (background), `#000000` (text), `#2b2e3a` (primary CTA), and `#e4e6ef` (utility surface). This is a 4-color palette in the above-fold. The full token set reveals a richer system (`#1a2ffb`, `#c1ff00`, `#8832f7`), but these accent colors are reserved for deeper page sections

---

## Color System and Visual Hierarchy

The above-fold palette is intentionally restrained:

- `#eaedf4` — page field (slightly warm lavender-grey, the "default" surface)
- `#000000` — all text and wordmark
- `#2b2e3a` — primary CTA fill (dark near-navy, distinguishable from pure black)
- `#e4e6ef` — secondary button surface (a lighter variant of the page background, creating a subtle tone-on-tone effect)
- `#ffffff` — CTA text (white on dark)
- `#0a0a0a` — media field (near-black, not quite the same as `#000000`)

The cobalt blue (`#3d4fd6`, the brand accent visible in the 3D objects) appears exclusively inside the imagery at this stage — it is not used in any UI chrome at the above-fold level. This is a deliberate restraint: the accent is introduced visually through art direction before being deployed as a UI color, giving it narrative buildup.

---

## Typography System

The type system is **monolithic**: a single typeface (Aeonik, proprietary) across all roles, differentiated only by:

- **Weight**: `400` regular for headlines and body; `500` medium for buttons, labels, and uppercase elements
- **Scale**: Headline at `43.2px`; body/paragraph at `~15–16px`; button/label at `15.12px`
- **Case**: Labels and buttons use `text-transform: uppercase`, creating a visual register shift without changing the typeface

This is a high-confidence typographic system — using one face at all levels signals that the type system's expressiveness comes from scale and case contrast, not from typeface mixing. The IBM Plex Mono is registered in the token system for the scroll indicator and mono elements, providing a secondary register that is functionally distinct (data/label/UI chrome) from the editorial Aeonik register.

---

## Visual Affordances

In the static hero:

- **Primary CTA** ("LET'S TALK"): Filled pill, strong background contrast, includes a dot indicator — the dot functions as a visual affordance suggesting an action trigger
- **Utility button** ("MENU"): Surface pill, lighter tone, includes a `••` dots indicator — visually lower priority than the primary CTA
- **Minus/dash symbol** (`—`) to the left of the CTA cluster: Appears as a close or collapse affordance, styled as a standalone glyph in an invisible interactive zone
- **"SCROLL TO EXPLORE" label**: Static text in the footer bar, paired with `+` icons — the `+` shapes loosely suggest interactivity but appear to function as decorative markers rather than active tap targets in the static view

---

## Notable UX/UI Design Observations

**1. Typography-free media zone**
The hero image contains no text overlay whatsoever. All typographic content is housed in a separate light-field band above the image. This is a compositionally disciplined choice that protects both the image's visual integrity and the text's legibility simultaneously — two design goals that are usually in tension.

**2. Internal section polarity**
The hero functions as a self-contained narrative unit through hard contrast between a light cognitive zone (headline, navigation) and a dark sensory zone (media, 3D render). This binary structure condenses the visual experience that would normally be spread across two separate sections.

**3. Restrained accent color introduction**
The cobalt blue — the most emotionally charged color in the palette — appears only inside the 3D render at the hero level. It is withheld from UI chrome entirely. This creates a color discovery moment where the brand accent emerges from the content rather than being imposed by the interface system.

**4. Asymmetric headline positioning**
The headline occupies a center-left column span rather than a symmetrically centered position. The left column is reserved for the wordmark; the right ~40% of the top band contains only the two buttons. This asymmetry gives the headline room to breathe without centering it — preventing the layout from feeling static or brochure-like.

**5. Punctuation-as-structure in the footer bar**
The `+` icons in the footer bar at the bottom of the hero serve a dual function: they are compositional markers (creating horizontal rhythm across the full width) and navigation cues (signaling that more content follows below). Using a typographic symbol rather than a chevron or arrow is a deliberate tonal choice — it keeps the footer bar light and graphic without introducing an iconographic language that would require a separate design system register.