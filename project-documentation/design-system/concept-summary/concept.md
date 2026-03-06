It looks like write permissions haven't been granted yet for new files in that path. Please approve the write, or let me know if you'd like me to output the content here instead.

Here's the full concept summary I've written:

---

## Casper's Caviar — Concept Summary

## Brand Overview

Casper's Caviar is a New York-based luxury caviar retailer selling premium sturgeon roe — Ossetra, White Sturgeon, and other varieties — directly to consumers and restaurants via a Shopify storefront. The brand targets high-end food culture: chefs, hosts, and gourmands who treat caviar not as an occasional extravagance but as a recurring pleasure with provenance. Their tagline "WHERE TASTE MEETS RITUAL" signals that the product isn't just food — it's an occasion.

## Visual Identity

The palette is built entirely from darkness: a deep charcoal (`#1a1a1a`) page background, warm near-black browns (`#2d2b28`, `#3a3530`) derived directly from the caviar photography, and restrained warm off-whites (`#f5f0e8`, `#e8e2d8`) for text — a palette that feels extracted from the product itself rather than designed around it. Typography pairs two licensed typefaces: `interstate-condensed` for massive uppercase display headings (63px, weight 400, line-height 1:1) and `interstate` for all body and navigation — a single typeface family deployed at two optical sizes, creating unity without monotony. Motion is cinematic and layered: Locomotive Scroll drives multi-speed parallax with at least five distinct layer speeds (-0.5, -0.4, -0.3, -0.25, -0.15) operating simultaneously on the hero alone, supplemented by GSAP and a page-transition animation (`oldPage`/`newPage` keyframes) that scales the exiting page to 95% while the incoming page slides up from `clip-path: xywh(0px 50% 100% 100%)`.

## Emotional Tone

Heavy, textural, and quietly opulent. The site moves like a slow pour — unhurried, deliberate, weighted. The hero is a full-bleed photograph of glistening black roe; you feel the cold weight of the tin before reading a word. Warm browns and near-blacks create an atmosphere closer to a candlelit private dining room than an e-commerce storefront. The parchment accent (`#d4c9b4`) on CTA arrows — "SHOP CAVIAR →", "SOURCING →" — has the quality of aged paper or embossed stationery, suggesting heritage and provenance. Nothing is bright; nothing is urgent.

## Target Audience

Affluent urban consumers aged 30–55 who purchase caviar intentionally — for dinner parties, restaurant sourcing, or as considered personal luxuries. The $150 starting price for Ossetra and the sourcing-forward narrative ("Exceptional caviar, sourced with care and presented with intention") speak to buyers who want to understand the product's origin, not just its price tier. The brand communicates peer-to-peer with chefs and food professionals, not down to casual shoppers.

## Design Principles

- **Photography as the design system** — The warm brown-black color palette isn't chosen; it's photographed. Every surface color in the UI (`#2d2b28`, `#3a3530`) is a direct echo of the caviar tin imagery, making the product the literal source of the brand's visual language.
- **Condensed uppercase at maximum scale** — `interstate-condensed` at 63px with line-height 1:1 and `text-transform: uppercase` produces headings that feel stamped rather than typed — industrial weight applied to luxury content, creating an intentional tension.
- **Locomotive Scroll as depth engine** — Five parallax layers at different speeds (`-0.5` to `-0.15`) in a single hero simulate physical depth; combined with `data-scroll-event-progress` overlay opacity, scrolling through the hero feels like descending into the image.
- **Page transitions as brand signature** — The `oldPage`/`newPage` keyframe pair (outgoing page scales to 95%, incoming page rises from the bottom half) is a cinematic reveal borrowed from film editing — navigation feels like a scene change.
- **Restraint in accent color** — The single warm parchment accent (`#d4c9b4`) appears only on CTA arrow links. No secondary palette, no gradients. All emphasis is structural — size, contrast, and spacing rather than color.

## Distinctive Qualities

The most technically unusual choice is the **page transition system** using `clip-path: xywh()` — a 2023 CSS specification that clips the incoming page to its lower half, then expands to full view. Using `xywh()` (rather than `inset()` or `polygon()`) specifically allows percentage-based height offsets during the animation, enabling a smooth "rising curtain" effect without JavaScript. Very few e-commerce sites implement viewport-level page transitions at this level of CSS specificity. Combined with Locomotive Scroll's virtual scroll engine (which intercepts native scroll events entirely), the site achieves a level of scroll control typically reserved for award-winning portfolio sites — applied here to a caviar shop, which makes the product feel exactly as serious as the interaction design treating it.

---

`★ Insight ─────────────────────────────────────`
The nav hover state is a notable inversion: links default to `#f2f2f2` (near-white) and switch to `rgb(32, 32, 32)` (near-black) on hover — the background doesn't change, only the text. On a dark nav bar this means the text *darkens* toward invisibility rather than brightening, a counterintuitive choice that reads as sophisticated restraint: the link retreats rather than asserts on hover.
`─────────────────────────────────────────────────`