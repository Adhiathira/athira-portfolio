`★ Insight ─────────────────────────────────────`
The `website-design` skill was triggered — this is a design analysis task, not a UI build task. The skill's enforcement rules (token loading, layout compliance) don't apply here. The skill is loaded but its workflows are irrelevant to pure analysis output. I'll proceed directly with the analysis.
`─────────────────────────────────────────────────`

---

## Hyer — Design Analysis

---

## Visual Identity

The palette is built on a strict near-black (`#000d10`) and white binary, punctuated by a single warm terracotta accent (`#bc7155`) and a sky-blue gradient hero (`#f0f4f7`). The typographic personality is industrial-modern: a single proprietary grotesque — HelveticaNowDisplay at 700 weight — dominates every scale from 72px display down to 18px body, with negative letter-spacing (`-1.44px` at h1) compressing the letterforms into tight, high-confidence blocks. Motion is restrained and utilitarian: two timing values (`0.3s` for buttons, `0.5s` for links) both using the same `cubic-bezier(0.4, 0, 0.2, 1)` easing, producing a consistent material-design-adjacent snappiness rather than theatrical choreography.

---

## Hero Section

The hero is full-viewport, using a static sky-gradient background (`#f0f4f7` → pale blue-grey) rather than video or parallax — the atmospheric depth is provided entirely by a 3D-rendered aircraft asset placed at mid-frame, floating across the composition. The wordmark "Hyer" is set at display scale (~72px, 700 weight, tight tracking) flush-left and bleeds to roughly 60% of horizontal viewport width, with a right-anchored secondary headline "Personalised Aviation" at h2 scale (~76px) positioned mid-height — a deliberate typographic split-column that uses type itself as the layout element. Two pill-shaped CTAs (`border-radius: 1000px`) sit bottom-right, both using the `#000d10` filled + white text treatment, with the transition system (`0.3s` color/bg/border) handling hover states. There is no scroll indicator visible and no observable load-in animation beyond the transition infrastructure.

---

## Content Sections

The page body alternates between three distinct background registers: pure white (`#ffffff`) content sections, a deep navy dark section (`#0e1a1f`) for the app showcase, and a three-panel chromatic split (dark + photo + terracotta `#bc7155`) for the services panel. Layout patterns include a 2×2 feature grid with horizontal rule dividers, an asymmetric two-column image/text split (50/50), a sidebar-plus-2-column-grid for the experience section, and a full-bleed interior photo slider — no single layout pattern repeats, creating a deliberate section-by-section rupture rhythm. Section padding is generous and consistent (`paddingTop: 162px`, `paddingBottom: 177px`) with a horizontal gutter of ~72px, establishing an airy breathing room that counterbalances the weight of the large display type. Typography within content sections maintains the single-family grotesque discipline — display headings compress to h3 (`27px`, 700) and body settles at `18px/29px` (400 weight), with no serif or contrasting typeface introduced at any scale.

---

## Footer Section

The footer sits on `#000d10` (near-black), structured in a 4-column asymmetric grid: a wide left column (~30%) holding the wordmark at small scale with social icon circles below, followed by three narrower link columns — "On-demand", "Aircraft Ownership", "Memberships" — each with a bold heading and muted-grey (`#8e8e95`) link items. Link text is typographically subdued relative to body: same family and weight (400) but reduced to ~18px, with a 0.5s color transition on hover that fades from `#8e8e95` to near-white (`#f2f2f3`). A lower legal bar separates copyright/address (left) from three legal links plus a long disclaimer paragraph (right), all in the same muted grey register. There is no newsletter form, no prominent CTA, and no brand color accent — the footer operates as a quiet structural close with visual weight concentrated entirely in its dark surface.

---

## Design Principles

- **Typography as primary layout element** — at hero scale, the wordmark at ~72px functions as a compositional block, not just a label; the two-column hero is built from type alone with no frame or card container
- **Single typeface discipline** — HelveticaNowDisplay at 400 and 700 carries every text role from nav to legal copy; contrast is achieved through weight and scale, never through family mixing
- **Section rupture over continuous scroll** — each content section introduces a new background register (white → dark navy → tri-color panel → white again), treating the page as a sequence of distinct surface compositions rather than a unified scrolling canvas
- **Pill radius as the only ornamental gesture** — `border-radius: 1000px` on all CTAs is the sole departure from the otherwise rectilinear grid; the dashed arc graphic in the services panel echoes this curve vocabulary decoratively
- **Warm terracotta as a single-point accent** — `#bc7155` appears in precisely one section (the Ownership panel background) and one button variant, preventing accent dilution while creating a strong visual anchor mid-page

---

## Distinctive Qualities

The most unusual structural choice is using the hero wordmark itself — not a background image or video — as the dominant visual mass. At ~72px tight-tracked grotesque, "Hyer" occupies the compositional weight slot that most sites reserve for full-bleed photography or motion. This means the design stakes its above-fold identity entirely on typographic confidence rather than atmospheric media.

The tri-color services section — dark navy / full-bleed photo / terracotta — is architecturally rare: it breaks the white/dark alternation pattern with a three-surface horizontal split that reads as a single unified panel rather than three separate components. The terracotta panel uses a dashed arc as its only graphical element, creating a schematic/technical drawing quality that contrasts deliberately with the photographic center panel.

The interaction system uses a single easing function (`cubic-bezier(0.4, 0, 0.2, 1)`) across every hover state — not because the system is unsophisticated, but because it enforces perceptual consistency. Every button, link, and nav item responds with identical motion physics, making the UI feel like a single designed artifact rather than assembled components.