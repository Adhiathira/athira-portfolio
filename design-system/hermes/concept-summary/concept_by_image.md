# Hermès Paris — Concept Summary

## Brand Overview
Hermès is a French luxury maison founded in 1837, specializing in leather goods, silk, fashion, and lifestyle objects of exceptional craftsmanship. The site serves affluent global consumers who perceive luxury not as ostentation, but as heritage and connoisseurship. It is designed for an audience that already knows the brand — the site does not sell, it curates.

## Visual Identity
The palette is built entirely on restraint: a warm parchment cream (`#f5f0e8`) as the primary surface, pure black (`#000000`) for all text and linework, with `#696969` as the only concession to softness. Typography pairs **EBGaramond** (an 18th-century italic serif) with **Manrope** (a geometric grotesque) — a deliberate tension between archival and contemporary. Motion is minimal but precise: a 0.3s `ease` nav slide, a 200px `translateY` content reveal, and a singular looping product video — nothing gratuitous.

## Emotional Tone
Quiet, unhurried, and slightly austere — the site feels like entering a well-lit atelier where the silence is intentional. The cream-on-black palette evokes aged paper and India ink. The slow reveal animations suggest that what you are about to see is worth waiting for. There is no urgency, no flash sale energy — only the steady confidence of a house that has existed for nearly two centuries.

## Target Audience
Wealthy professionals and collectors aged 35–65, primarily European and Asian, who distrust conspicuous branding. They recognize EBGaramond as a cultural signal, not just a typeface. They are shopping for investment objects, not trend pieces. The site assumes fluency — it does not explain itself.

## Design Principles
- **Chromatic minimalism as prestige signal** — the near-monochromatic palette (`#f5f0e8`, `#000000`, `#1a1a1a`, `#696969`) communicates that the product needs no embellishment
- **Editorial grid over e-commerce grid** — 4-column and 2-column equal layouts privilege visual rhythm over product density; it reads as a magazine, not a shop
- **Typography as historical artifact** — EBGaramond italic at 34px for headings directly references the brand's 19th-century letterpress heritage, while Manrope at 12px provides modern readability without competing
- **Motion as restraint** — the `active-hover-animation` keyframe (full-width underline that erases and rewrites itself from the right) is the most expressive interaction on the page — deliberate, not decorative
- **No CTA hierarchy** — ghost buttons with black outline and muted utility buttons at `#696969` refuse to use color to coerce clicks; the user is trusted to decide

## Distinctive Qualities
The most unusual choice is the **nav background**: it is `transparent` at rest and transitions to the same cream (`#f5f0e8`) on scroll — meaning the nav is structurally invisible until needed. This is not common even in luxury e-commerce. Combined with the `max-width: 1920px` container but `margin: 235px` on sections, the site enforces extreme lateral whitespace at wide viewports — the content occupies perhaps 60% of the screen at 1920px, deliberately leaving the rest as breathing room. The underline hover animation (`active-hover-animation`) — which contracts right-to-left then expands left-to-right — is the one moment of visible craft that rewards close attention.