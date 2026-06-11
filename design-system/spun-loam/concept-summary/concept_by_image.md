# Design System Analysis — Spun Loam

## Overview

The design system captured here originates from a single, fully realized compositional state: a full-viewport entry screen that functions as both loading gate and brand statement. All analysis is derived from this deliberate entry moment — which, far from being a limitation, reveals the system's design priorities in concentrated form.

---

## 1. Internal Section Organization

The section employs a **centered editorial composition** — all content is vertically and horizontally centered within the full viewport. There are no columns, no asymmetry, no grid divisions visible in this entry state.

The content stack (top to bottom): logotype mark → brand wordmark + tagline → primary CTA → secondary utility link. This is a strict single-column vertical stack with precisely calibrated whitespace both above and below the content cluster.

The layout is **minimal and composition-driven**. The content cluster occupies roughly the vertical middle third of the viewport, with the upper third held as a negative-space crown and the lower third as a grounding field. The proportions are not accidental — approximately 33% / 34% / 33% vertical split produces a balanced compositional weight without symmetry's rigidity. This is the ratio of a well-composed title page, not a UI template.

---

## 2. Grid System and Spacing System

No explicit multi-column grid is present. The layout is **container-centered with a single-column content block** maxing at approximately 280–320px — roughly 22–25% of a 1280px viewport width. This extreme column tightness, further emphasized by the system's 1088px container (85% of the source's 1280px), forces all reading into a narrow channel.

Spacing between content blocks follows a **tight modular rhythm**:
- Logo mark to wordmark: approximately equal to 1 line-height unit (≈17px at body scale)
- Wordmark to tagline: minimal, tightly coupled — treated as a single text unit, spacing ≤4px
- Tagline to CTA button: a deliberate break — approximately 30px, or roughly 2× the internal text spacing
- CTA to secondary link: the secondary link is bottom-anchored to the viewport edge with approximately 24px clearance, creating a strong vertical vector between the entry cluster and the exit affordance

Tokens confirm: `cta.paddingTop/Bottom` at 7px, `cta.borderRadius` at 3px (sharp-cornered), `section.paddingTop/Bottom` at 72px/54px. The section padding twist (+32px over source values) gives each compositional interval room to register as a beat rather than a gap.

---

## 3. Media Composition and Art Direction

**No photography, illustration, or media is present in this section.** The background is a flat field — warm linen parchment (`#f5f2ee`). This is a deliberate choice: the design uses color alone as the visual environment, with zero imagery competing for attention.

The absence of media is itself an art direction decision. The logo mark functions as both brand identity and decorative focal point, standing against the warm ground with the presence of ink pressed into uncoated stock. The relationship is typographic in the printing sense: ink on substrate, not pixel on screen.

---

## 4. Visual Composition and Layout Intent

The composition behaves as **editorial brand identity design** rather than product UI. The visual logic is: background field → centered graphic identity → minimal text → single action. This follows the grammar of printed brand splash pages translated to screen.

The warm, mineral background (`#f5f2ee`) acts as a **tonal canvas** — it is neither white nor neutral grey, and the distinction is meaningful. It has the weight of unbleached fiber: a color that admits it has been processed but remembers something pre-industrial. Text placed on this background in near-black warm brown (`#22211f`) is harmonically related — the two values are separated by approximately 191 luminance units, a gap that is clear but never harsh. They are tonal relatives, not contrasting opposites. The reading experience is less "foreground against background" and more "inscription into surface."

---

## 5. Background and Section Design Behavior

The section uses a **single solid chromatic background** across the full viewport. There are no gradients, no textures, no decorative shapes.

The color choice — warm linen `#f5f2ee` — carries specific tactile associations before any interaction occurs. It does not ask to be perceived as digital neutral. It asks to be read as material — like the endpaper of a cloth-bound reference book, or the printing ground of a cotton-rag broadsheet. Its warmth comes not from saturation (the hue is barely present) but from the specific balance of its RGB components: R=245, G=242, B=238, where blue is 7 units below green and 7 units below red, producing a barely-there warmth that reads as natural rather than tinted. This is a hallmark of **material-first design philosophy**: surface quality precedes typography and imagery in the communication sequence.

---

## 6. Depth, Layering, and Visual Hierarchy

The interface is **strictly flat**. There are no shadows, no elevation cues, no overlapping elements. The only layering present is the primary CTA's dark-filled surface (`#22211f`) sitting against the warm linen background — a minimal two-layer composition that achieves maximum contrast through hue relationship rather than the typical white-on-color or color-on-white pattern.

The design achieves hierarchy entirely through scale, weight, and spacing, not depth. Uppercase tracking at 0.06em adds a measured horizontal tension to the type that reads as architectural rather than decorative — each character slightly isolated from its neighbor, as if set in individual lead sorts. This is spacing as structure, not style: the system uses interletter space to create breathing room at the character level rather than at the layout level.

---

## 7. Component Styling (Borders, Surfaces, Elevation)

The primary CTA button: **dark-filled rectangular surface** with sharp corners (borderRadius 3px — precisely enough radius to prevent pixel-jagging on screens without anti-aliasing, but visually sharp). No shadow, no elevation, no glow. It reads as a colophon stamp or archival seal pressed against the warm background — authoritative, not friendly.

The secondary link: **no background, no border, underlined text** — a purely typographic affordance. The contrast between the filled dark-rectangle CTA and the plain underlined link constitutes the entire interactive hierarchy of the page. Components feel printed, not rendered: they exist on the surface rather than above it.

---

## 8. Shape Language

**Angular and restrained** throughout. The CTA button's 3px border-radius is a minimum-viable concession to screen rendering — it is visually a sharp-cornered rectangle. There is no pill-shape tendency anywhere; the system gravitates toward the geometry of printed matter: rectangular frames, straight rules, flush-left registration.

Condensed uppercase at 0.06em tracking creates a relationship between letterform and surrounding space that reads as controlled tolerance — each character exactly positioned, each spacing interval intentional. This is the geometry of instrument calibration, not of graphic design. The contrast between tight letterforms and the generous 72px section padding amplifies both: compressed type feels more compressed against an open ground; open ground feels more open beside compressed type.

---

## 9. Section Divider Geometry

Not applicable in the captured entry state. In extended layouts, section dividers would follow the restrained rectangular grammar of the system — flat horizontal rules in border-subtle (`#c4bfb7`) at 1px weight, or silent color-field transitions where the page background shifts slightly in luminance. Never organic curves; never gradient blends. The system's section transitions would feel like turning a page, not crossing a river.

---

## Hero Section Analysis

- **Background type:** Flat solid color — warm linen `#f5f2ee`. No imagery, no gradient.
- **Viewport coverage:** Full-height, 100vh.
- **Text placement:** Centered both axes. Text block is approximately 280px wide at 1440px viewport — a 19% width ratio, extremely focused.
- **Headline scale:** Barlow Condensed 700 at clamp(2rem, 6vw, 4rem). At 1440px viewport, renders at approximately 86px — substantial but not display-scale. Reads as a brand lockup with editorial weight.
- **CTA count:** Two — one primary (dark filled, 3px radius, uppercase tracked), one secondary (underlined text link).
- **Button style:** Primary is dark-filled sharp rectangle. Secondary is underlined link — no button chrome.
- **Scroll indicator:** None visible.
- **Navigation bar:** No traditional bar in the entry state. Navigation deferred past the entry gate — the interface presents only what is immediately needed.

---

## Typography System

All type is set in **Barlow Condensed** (Google Fonts CDN, weights 500–700). The type system operates on a tight single-family model with differentiation achieved through three variables alone: size, weight, and case.

- **Size scale:** heading h1 at clamp(2rem, 6vw, 4rem) / h2 at clamp(1.5rem, 4vw, 2.75rem) / h3 at clamp(1.1rem, 2.5vw, 1.75rem) / body at 10px / button at 11px — a compressed scale where the jump from h3 to body is approximately 2.5:1
- **Weight distribution:** 700 (headings) / 600 (body, button, nav) — only two weights used, separated by exactly 100 units
- **Case:** all text-transform: uppercase — no mixed-case anywhere in the system
- **Letter spacing:** 0.06em across headings and uppercase elements / 0.02em on body — the primary spacing interval that defines the system's typographic voice

Condensed uppercase at 0.06em tracking produces a measured horizontal density. Each line of text has the precision of a label on a specimen drawer — informative, exact, without ornament. The condensed axis of Barlow Condensed is approximately 30% narrower than its regular counterpart, which means the tracking's 0.06em adds back roughly 8% of that horizontal space — tightening the letterform while loosening the letter relationship.

---

## Color System and Visual Hierarchy

**Dominant background:** `#f5f2ee` (warm linen, luminance 242.4 on 0–255 scale) — the entire page field.
**Heading + body text:** `#22211f` (near-black warm brown, luminance 33.3) — luminance differential of 209 units produces a contrast ratio of approximately 11.4:1 — more than WCAG AA requires, but not the stark 21:1 of pure black on white. The gap leaves room for warmth.
**CTA surface:** `#22211f` — the single high-contrast element. Its contrast achieves maximum reading priority through darkness rather than the expected light-on-light contrast inversion.
**Muted text:** `#aaa59b` (warm mid-grey, luminance 165.5) — recedes into the linen ground with a differential of only 77 units. Just enough contrast to be readable at close viewing distance, not enough to demand attention.
**Soft surface:** `#e8e4de` (barely-warm off-white, luminance 228.5) — only 14 luminance units below the page background. This is shadow without depth: a surface that whispers rather than declares.

---

## What Resists Categorization

This system occupies territory between the **editorial minimal** (restraint, negative space, single-column composition) and the **material tactile** (warm chromatic ground, ink-on-surface color relationships, sharp corners that suggest impression rather than rendering). It is not luxury — the type is too compact, too utilitarian; luxury systems use generous spacing and display-scale typography to communicate abundance. It is not modernist tech — the palette is too warm, too organic; tech systems use cool greys and high-contrast geometries to communicate precision.

The specificity of the linen ground combined with condensed uppercase tracking creates a voice that most closely resembles the design of serious working documents: field guides, archival catalogs, technical manuals for objects that require understanding rather than desire. The system's authority comes not from visual richness but from visual economy — it demonstrates credibility by refusing to be more than it needs to be. In a landscape of design systems competing for attention through novelty, Spun Loam competes through restraint, and that restraint is the thing that is hardest to imitate.
