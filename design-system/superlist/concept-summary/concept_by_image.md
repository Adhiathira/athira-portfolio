The `website-design` skill is for selecting/enforcing a design system before writing UI code. This task is a design analysis write-up based on provided screenshots and extracted tokens — no code to write, no design system to install.

---

`★ Insight ─────────────────────────────────────`
- **Two-tone headline technique**: Superlist's hero uses split color on a single headline — white for the declarative claim, `#f04e23` orange-red for the emotional punctuation ("Finally in one app."). This is a deliberate typographic strategy to direct attention and inject energy without adding visual complexity.
- **Framer-hosted fonts vs. web-accessible**: The `Haffer XH` family is served from `framerusercontent.com` — meaning it's proprietary to the Framer CDN and not self-hostable. Any downstream reproduction must substitute, which is why the extractor flagged all Haffer variants with `"webAccessible": false`.
- **Opacity-only hover state**: The cookie dismiss button's hover interaction (`opacity: 1 → 0.6`) is a minimalist micro-interaction pattern — no background shift, no scale, just a fade. This keeps the interaction vocabulary consistent with a subdued, confidence-first aesthetic.
`─────────────────────────────────────────────────`

---

## Visual Identity

The palette is anchored by a deep navy-purple background (`#1a1929` / `#181824`) with a single high-voltage accent in orange-red (`#f04e23`) that handles all primary CTA and headline emphasis duties. Surface layers step just slightly lighter (`#21203a`, `#26253b`) to create hierarchy without introducing contrast noise. The typographic personality is modern-technical: `Haffer XH SemiBold` at tight negative tracking (−1.76px at 88px) for display, dropping to `Inter` for body — a pairing that contrasts geometric authority at large scale with neutral readability at small scale. Motion is disciplined: the extracted timing token is a single easing curve (`cubic-bezier(0.44, 0, 0.56, 1)`) applied at 0.2s — fast, symmetric, and intentionally restrained rather than expressive.

---

## Hero Section

The hero is a static full-height section on a near-black navy-purple background (`#1a1929`) with a deep purple radial gradient bloom (`#3b2a5c`) behind the headline — no video, no parallax, no texture. All content is center-aligned: the headline runs two lines at 88px / −1.76px tracking in `Haffer XH SemiBold`, split two-tone (white + `#f04e23`), commanding an estimated 60% of the visible viewport height by letter-height alone. A single subheadline paragraph follows in `Inter` 16px at reduced opacity, then one filled pill CTA ("Sign up for free") in `#f04e23` with `border-radius: 100px` — no ghost alternative, no secondary action. An app UI screenshot is positioned below the CTA, cropped at the viewport's bottom edge so it bleeds into the next section, acting as a scroll invitation rather than a traditional animated arrow or "scroll" label. No explicit scroll indicator is present.

---

## Content Sections

The page cycles through several distinct layout patterns with no consistent alternating-background rhythm — sections shift between full-width centered text blocks, 2-column equal cards, 3-column feature grids, and a sidebar-left / content-right split for interactive feature tabs. Whitespace philosophy is modular and rhythmic: the extracted spacing tokens show consistent `50px` horizontal padding on full-width sections and a `64px` gap in the primary hero block, suggesting an 8-point-adjacent system scaled to 4× multiples. Feature cards are rendered on solid accent-color backgrounds (`#4a9eff` blue, `#a855f7` purple, `#ff6b35` orange) rather than neutral surfaces — each card color is distinct, creating a carnival-of-features energy that contrasts with the restrained dark page background. Typography scales predictably from 88px display down to 48px (h2), 30px (h3), and 16px body in `Inter`, with section headlines remaining in `Haffer XH SemiBold` throughout.

---

## Footer Section

The footer uses a 5-column structure: Company (internally split into two sub-columns of links), App, Use Cases, Social, and Updates. Each column heading is typeset as a colored link — Company in `#7c3aed` purple, App in `#eab308` amber, Use Cases in orange-red, Social in `#3b82f6` blue, Updates in `#22c55e` green — a deliberate chromatic column-labeling system that makes category scanning instant. Link body copy drops to a muted `#8e8da0` lavender-grey at smaller scale relative to page body, creating clear visual subordination. No newsletter form or logo appears in the footer proper. A standalone update card in the Updates column (`background: #26253b`, white headline, muted date) functions as a mini changelog widget. The copyright line is centered at the footer base in minimal type. Overall visual weight is dark-neutral — the footer recedes to the same background as the page, unified rather than contrasting.

---

## Design Principles

- **Single accent, maximum leverage**: `#f04e23` is the only primary action color and appears on the hero CTA, headline accent, and logo — never diluted by competing warm tones in the main UI.
- **Surface layering without borders**: Hierarchy between background, surface, and elevated layers is achieved through three close dark values (`#1a1929` → `#21203a` → `#26253b`) rather than border lines or shadows.
- **Proprietary typeface as brand signal**: `Haffer XH` is deliberately non-web-accessible (Framer CDN only), meaning its presence signals Framer-built identity and creates a typographic fingerprint that cannot be trivially replicated.
- **Chromatic footer taxonomy**: Column headings in five distinct colors (`#7c3aed`, `#eab308`, `#f04e23`, `#3b82f6`, `#22c55e`) turn a standard link grid into a color-coded information architecture system.
- **Restrained motion vocabulary**: A single easing curve at 0.2s for all transitions — no staggered reveals, no scroll-triggered animations in the extracted CSS — keeps the interface feeling fast and focused rather than theatrical.

---

## Distinctive Qualities

**The two-tone headline split** — white + `#f04e23` on a single sentence — is the most distinctive visual move on the page. It's not a gradient, not an underline, not a background highlight; it's a mid-sentence color change that creates typographic rhythm and emphasis in a single line of markup.

**Feature cards as chromatic set-pieces**: Rather than using screenshot mockups on neutral grey cards, each feature gets a solid vivid background (blue, purple, orange) that makes each feature zone feel like a distinct world within the same page — an editorial magazine aesthetic applied to product marketing.

**The scroll-fading feature list**: The extracted grid data references a "features-scroll-list" section with feature names progressively fading from full white to near-invisible grey — a scroll-driven opacity cascade that encodes the page's information hierarchy directly into the scroll behavior rather than layout position.

**Colored footer column headings**: Using five different accent colors as column labels in the footer is unusual and counterintuitive — footers conventionally use subdued, uniform type — but it maps directly to the page's overall accent-color system, creating visual continuity between the body's feature cards and the footer's link taxonomy.