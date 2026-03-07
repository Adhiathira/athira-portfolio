Here is the concept summary — you can approve the write when ready, or I can paste it here for you to use directly:

---

# Moooi — Concept Summary

## Brand Overview

Moooi is a Dutch luxury furniture and lighting brand that treats interior objects as works of art. Every product is positioned as a collaboration between design and culture — evidenced by celebrity co-creations (Robbie Williams × Moooi) sitting alongside ceramic collections and hand-crafted lounge chairs. The brand's audience is wealthy design connoisseurs who furnish spaces the way curators build collections.

## Visual Identity

The palette is built around warm organic tones: terracotta burnt-orange (`#c4622d`), deep walnut brown (`#3d2b1f`), and creamy off-white (`#f5f0eb`) — all grounded by a near-black (`#1a1a1a`) that appears in hero video overlays and the footer. Typography pairs **TYPE SANGBLEU SANS** (a refined geometric editorial serif, set at 72px/−1.44px tracking for hero headlines) with **TYPE GILL SANS** (humanist sans-serif for all body copy and UI chrome), creating a tension between gallery-wall gravitas and catalog readability. Motion is restrained and slow: image transitions run at 1.3s with `cubic-bezier(0.19, 1, 0.22, 1)` — an ease-out curve that decelerates languidly, like watching someone set down a heavy object with care.

## Emotional Tone

Hushed, sensual, and slightly theatrical. The site feels like wandering through a dimly lit design museum after hours — warm amber light pooling on sculptural forms, silence punctuated by movement. The full-viewport hero video of a bedroom drenched in golden-hour light, the handwritten Robbie Williams headline crashing against a cinematic dark backdrop, the terracotta modal panel with its mandala-print magazine covers — all of it leans into a world that is *curated*, not browsed. There is no urgency; only invitation.

## Target Audience

Affluent urban professionals (35–60) with European or cosmopolitan taste — architects, interior designers, and serious collectors who reference *Wallpaper**, visit design weeks in Milan and Copenhagen, and consider a sofa a decade-long relationship. They respond to cultural cachet (celebrity collabs, editorial photography) over technical specs, and they expect a brand to have a *point of view*.

## Design Principles

- **Editorial storytelling over product catalog**: Content is structured as a series of full-bleed editorial spreads — split 50/50 panels, cinematic hero video, large-scale typographic overlays — not as a grid of products with filters.
- **Restraint as luxury signal**: The color system has 80+ CSS variables but the *visible* palette reduces to ~5 warm tones. Whitespace is extremely generous (section padding runs ~89px top/bottom at 1280px). Nothing competes for attention.
- **Typographic hierarchy as art direction**: H1 is set in a 72px editorial serif with negative tracking (−1.44px). H3 is a 14px uppercase Gill Sans label at 0.84px letter-spacing. The gap between these two scales is enormous by design — the brand speaks in whispers or shouts, never in-between.
- **Slow, hardware-accelerated motion**: Every image transition uses `transform + opacity` (GPU-composited properties only) at 1.3s with a decelerating ease. Nothing snaps or pops. The site breathes.
- **Cultural collabs as visual content**: Collaboration features (Robbie Williams, Ceramic Surfaces, Luminora) are treated as editorial covers, not product launches — handwritten type, atmospheric photography, zero price anchoring above the fold.

## Distinctive Qualities

- **The 50/50 split panel** is the dominant structural motif: warm cream meets terracotta, dark void meets lit sculpture. It appears in product features, the newsletter modal, and editorial sections — making asymmetry feel systematized.
- **The newsletter modal is itself a brand artifact**: the left panel is a burnt-orange field (`#c4622d`) displaying the magazine with a decorative medallion pattern — it functions as product advertising inside a subscription prompt.
- **Font licensing reflects brand values**: Moooi uses four bespoke licensed typefaces (TYPE BROWN, TYPE GILL SANS, TYPE SANGBLEU SANS, TYPE TIEMPOS FINE/TEXT) via Next.js font obfuscation — not a single Google Font in sight. Type is treated as intellectual property, not infrastructure.
- **The announcement bar is a design element**: A single underlined ALL-CAPS link on a black strip — no background color, no emoji, no countdown timer. The restraint is conspicuous.
- **"A Life Extraordinary"** — the modal eyebrow label — functions as the brand's core positioning statement, used contextually rather than plastered in the header. It surfaces only when the brand is asking for something (your email), which makes it land harder.

---

`★ Insight ─────────────────────────────────────`
Two things stand out about Moooi's font strategy: (1) Next.js obfuscates licensed font family names into hashed identifiers like `__TYPE_SANGBLEU_SANS_069a48` — a common pattern for font IP protection that the extractor correctly de-aliased via `@font-face` resolution. (2) The fallback fonts (`local("Times New Roman")` for serifs, `local("Arial")` for sans-serifs) reveal the typographic intent even without custom fonts loaded — the brand chose the most neutral, universally available fallbacks to avoid any "wrong brand feel" during font loading.
`─────────────────────────────────────────────────`