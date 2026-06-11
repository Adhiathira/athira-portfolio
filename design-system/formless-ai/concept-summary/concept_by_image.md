`★ Insight ─────────────────────────────────────`
The extracted tokens reveal a dual-register design: deeply dark (#000000 backgrounds, #1a1a1a elevated surfaces) with a single electric accent (#006cf7 blue). The 120.96px h1 at -5.184px letter-spacing and 0.9x line-height ratio signals a compressed, typographic-first approach — the type itself is the hero.
`─────────────────────────────────────────────────`

---

## Visual Identity

The palette is an uncompromising near-total black (#000000 page background, #1a1a1a surfaces, #2a2a2a card variants) punctuated by a single electric accent — `#006cf7` — used exclusively for primary CTAs and active states, making every call-to-action legible as the only blue object on screen. Typography is set entirely in Satoshi Variable (weight range 200–900), with the display scale running at 120.96px/h1 with -5.184px letter-spacing and a tight 0.9x line-height, creating a compressed slab-like texture without using a slab font. Motion is declarative and purposeful: 0.3s ease-in-out dominates micro-interactions, a `Typewriter-cursor` keyframe runs at 1s infinite on the hero input, and all entry animations use translateY offsets of 8–24px — never dramatic, always directional.

---

## Hero Section

The hero occupies full viewport height over a solid #000000 background with no image or video behind the text — typography is the visual event. The headline (`h1` at 120.96px, weight 700, -5.184px letter spacing, 0.9 line-height ratio) runs left-aligned, spanning nearly the full container width, with the second line rendered at #737373 — a muted gray approximately 45% luminance of #ffffff — creating a visible foreground/receding distinction within a single sentence. A small sparkle/star icon sits in the upper-left of the text block as the only decorative element, maintaining the minimal vocabulary. A single primary CTA (`#006cf7` pill) appears below, with a secondary ghost nav CTA using the same blue. The hero loads with a `translateY(-66px) → 0` entry animation at 0.3s ease-in-out (`i0vtpp4` keyframe), and the typewriter input bar immediately below incorporates an infinite cursor blink (`Typewriter-cursor`, 1s ease).

---

## Content Sections

The body sections alternate between a strict two-column asymmetric split (approximately 40/60 or 60/40 depending on text vs. UI weight) — left-text/right-UI and left-UI/right-text interleaving in deliberate rhythm, preventing monotony without changing the underlying grid. Each column contains either oversized display type (h3 at 69.12px, -2.9376px tracking) or a rounded dark-surface card (`#1a1a1a`, heavily border-radiused based on the visual screenshots), with no intermediate content weight between those two registers — there is no "medium" section. Whitespace is tight within each panel but generous between sections, using the `_109h81s3l` keyframe (translateY 20px → 0 with opacity 0→0.3 at entry) to stagger reveals. The full-width `#006cf7` highlight text section ("Collect deeper data" mixing white and blue within a single heading) breaks the two-column rhythm once as a typographic interlude, using h1-scale type edge-to-edge.

---

## Footer Section

The footer is a large `#f2f2f2` off-white rounded card (heavy border-radius, floated on the black page background) — visually contained rather than full-bleed, creating an inset capsule effect. It runs a five-column grid: a logo/wordmark column on the far left, followed by four categorized link columns (Use cases, Integrations, Resources, Products) in #000000 at approximately 16px/400 weight — a deliberate scale drop from the 69–120px body display type. The wordmark in the footer uses a light background app-icon treatment (rounded square container) rather than the inline logotype used in the nav. No newsletter form, no social links, no decorative elements — the footer is entirely navigation-utility. A centered copyright line sits below the column grid in small text, completing the closure.

---

## Design Principles

- **Monochromatic restraint with single-accent punctuation** — #006cf7 is the only non-black/gray/white hue; every occurrence signals action
- **Type scale as spatial architecture** — the jump from 120.96px h1 to 69.12px h3 to 28px p to 16px body creates section hierarchy without background color changes
- **Rounded-card surface system** — elevated surfaces use heavy border-radius to float on the black ground rather than sit flush, distinguishing interactive/content regions from ambient space
- **Motion is always translational, never rotational** — all entry keyframes use translateY (8–80px range); no spin, no scale for content (only UI microstate exceptions); motion direction is consistently upward-into-place
- **White/gray text split within headlines** — the #ffffff/#737373 split applied within a single sentence is the primary typographic design move, used to subordinate continuations of thought visually

---

## Distinctive Qualities

The most singular choice is the **intra-sentence luminance split in headlines**: primary words render at #ffffff (full brightness), continuation phrases at #737373 (muted gray), all within a single `<h1>` or `<h3>`. This isn't a primary/secondary heading hierarchy — it's emphasis modulation within a single statement, making word selection visible as a structural element. The **rounded footer card floating on black** is equally specific: rather than transitioning the page to a light background, the light area is geometrically contained, so the black field technically never ends — the page closes on black at the very edges. The `cubic-bezier(0.16, 1, 0.3, 1)` easing on the primary navigation transition is a spring-out curve (fast exit, slow settle) borrowed from iOS interaction vocabulary — precise and brand-specific, not a generic ease-in-out.