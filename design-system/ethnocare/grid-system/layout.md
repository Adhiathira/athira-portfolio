# Brand Name — Layout Brief

## Overall Page Structure

The site flows through a series of **full-bleed, edge-to-edge sections** stacked vertically. The pacing is deliberate and theatrical — long stretches of near-total darkness punctuated by sudden product imagery. The rhythm feels more like a cinematic sequence than a conventional product page. Sections don't have visible dividers; transitions are implied through content emergence from dark backgrounds.

---

## Header / Navigation

The header is a **full-width, horizontally distributed bar** sitting flush against the top edge of the viewport. It uses a classic split-tension layout:

- **Far left:** Brand wordmark in small, uppercase, condensed lettering
- **Center:** Primary navigation links — "Primary Nav Item" (with a dropdown caret), "Secondary Item," "About," "Category," "Support" — evenly spaced with comfortable breathing room
- **Far right:** Two utility elements — a text label and an icon — sitting close together as a paired group

The nav is extremely lean. Very little vertical height. The letterforms are small and refined against the dark background. There's a **thin announcement bar** that appears in the initial frame above the nav — a single-line horizontal strip running full-width, holding a short message and a "Read more" link. It disappears on scroll (or is dismissed).

---

## Hero Section

The hero is **full-bleed, full-viewport**, occupying 100% of the screen width and height. The dominant element is a **massive typographic lockup** — a brand wordmark rendered in enormous, ultra-wide letterforms that fill roughly 80% of the viewport width. It sits in the lower-center of the frame, slightly below vertical center, creating a sense of the type *grounding* the composition rather than floating.

The background is near-black with a very subtle dark radial gradient, adding slight depth. The overall effect is cinematic and austere — the type is not white but a muted dark tone, creating a low-contrast, mysterious tone rather than a bold declaration.

A small superscript sits in the upper-right corner of the type block. No other content is visible in the hero — no subheadline, no Primary CTA, no imagery. The restraint is intentional and communicates confidence.

A **cookie consent modal** floats over the lower-right corner of the viewport — a light card with standard consent controls. It's a UX interrupt layered on top of the hero but clearly not part of the designed layout.

---

## Content Sections Below the Hero

### Section 2 — Void / Transition
Several consecutive screenshots show **pure dark frames** — essentially empty viewport. This is almost certainly a **scroll-driven reveal sequence**: content (likely a video or animated product element) that begins fully invisible and emerges as the user scrolls. The section occupies at minimum one full viewport height, possibly more. This is a deliberate pacing device — the darkness asks the user to keep scrolling, building anticipation.

### Section 3 — Product Grid (Asymmetric Two-Column)
The first content to emerge from the darkness is a **two-column product layout** with strong asymmetry:

- **Left column:** A tall, portrait-ratio product card occupying roughly one-third of the viewport width. The image is a moody, desaturated photograph of a product against a dark atmospheric background. A label sits in the lower-left of the image in small light type.
- **Right column:** A second product card, much wider — occupying roughly two-thirds of the viewport — with its own product image. A label appears in a similar position in the lower-left.

The two cards are **not equal width** — the left is narrow, the right is wide. They appear to share the same baseline but differ in proportions. The gap between them is minimal, almost flush. Together they form a single full-bleed band across the viewport.

This asymmetric card pairing creates **visual tension and hierarchy** — the narrower card draws the eye first by contrast with the wider one's mass.

---

## Footer Layout

Not visible in the provided screenshots. The scroll sequence ends mid-page at the product section reveal.

---

## Notable Layout Patterns

### Full-Bleed Darkness as a Design Element
The most distinctive pattern on this site is **using dark space as content**. Empty screens are not empty — they are pacing. The ratio of "nothing" to "something" is very high, which forces every piece of content to feel earned and significant when it appears.

### Scroll-Driven Reveal Architecture
The content doesn't exist in a traditional above-the-fold / below-the-fold structure. Instead, it appears to use **scroll-triggered visibility** — elements are hidden until a scroll threshold is reached. This creates a presentation-mode feel, more akin to a keynote slide sequence than a scrollable page.

### Typographic Hero at Monumental Scale
The brand wordmark in the hero is not decorative — it *is* the hero. The entire viewport real estate is surrendered to a single word rendered at near-architectural scale. This is a pattern borrowed from high-end brand design where the brand name itself carries enough visual weight to anchor a full-screen composition.

### Floating Modal Layer
The consent card uses a **bottom-right anchored float**, independent of the layout grid. It persists across scroll states, indicating it's positioned fixed to the viewport rather than embedded in the document flow.

### Asymmetric Product Cards
The two-column product section avoids the predictability of equal-width cards. The **1:2 width ratio** creates a rhythm that suggests editorial curation rather than catalog browsing — one card is featured, one supports.