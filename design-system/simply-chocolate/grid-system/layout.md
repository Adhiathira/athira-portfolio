# Brand Name — Layout Brief

---

## Overall Page Structure

The screenshots capture a cookie consent modal interrupting the initial page load, so direct content access is limited. However, enough of the background page bleeds through to make meaningful layout observations. The site appears to use a **single-page vertical scroll** structure with a full-bleed cinematic hero visible behind the modal. The general flow reads as: nav → hero (full-viewport image/video background) → content sections below.

---

## Header / Navigation

The header is a **slim, minimal top bar** spanning the full viewport width. It operates in two distinct modes visible across screenshots:

- **Light/transparent mode** (first screenshot): A nearly invisible bar with the wordmark in a compact, all-caps stylized mark on the left, and two icon-only controls — a search magnifier and a shopping cart — anchored to the far right. This is classic **edge-to-edge three-point navigation**: logo left, utilities right, nothing in the center.
- **Dark/overlay mode** (subsequent screenshots): The same structure but the nav background deepens to near-black, suggesting the header transitions on scroll or when the modal dims the page — it's likely a **sticky header with a scroll-triggered background fill**.

The nav feels light and restrained — it steps aside to let the hero breathe.

---

## Hero Section

The hero is a **full-viewport, edge-to-edge image** (or video) — there are no columns, no split, no text boxes visible on screen. The imagery is product-focused, filling 100% of the viewport width and height.

Across the sequential screenshots, the **background image shifts subtly** — different compositions of the same product category appear, suggesting either a **parallax scroll effect** or an **auto-advancing full-screen slideshow/carousel**. The background transitions between scenes while the modal stays locked in place, which is a strong hint at a looping video or GSAP-driven image sequence beneath.

The overall hero spatial logic: **no text hierarchy is visible at launch** — the brand lets the imagery do the work before the user scrolls. Extremely high-confidence, image-first storytelling.

---

## Consent Modal (Structural Note)

While not a content section, the modal itself reveals design character:

- **Centered card** with generous internal padding — roughly 540px wide, vertically centered
- Clean **two-column button row** at the bottom: Secondary CTA (outlined/ghost) and Primary CTA (filled accent color) — equal width, side by side, communicating clear hierarchy through fill vs. stroke
- Below the buttons, a **four-column icon row** for preference categories, evenly spaced with toggle switches
- Typography is clean, legible, left-aligned body copy with a larger left-aligned heading — classical modal composition

The modal uses **light surface** against the dark-dimmed page, creating strong figure-ground separation. The accent CTA color is the brand's primary action color.

---

## Content Sections (Inferred)

Because the modal prevents scrolling to reveal body content, the below is based on partial viewport bleeds and brand context:

The background imagery suggests **product-forward editorial sections** — likely alternating full-bleed photography with text overlays or side-by-side text-image columns. The dark overlay treatment points to sections that use **color-field backgrounds** (near-black, dark accent) to frame product photography or editorial text, rather than white-background grid cards.

A premium brand of this caliber typically structures content as:
- **Full-bleed editorial panels** stacked vertically, each taking 80–100vh
- **Asymmetric two-column layouts** for product storytelling (image left/right, text opposite)
- A **product grid** (likely 2–4 columns) for the catalog section

---

## Footer Layout

Not visible in the captured screenshots.

---

## Notable Layout Patterns

| Pattern | Description |
|---|---|
| **Sticky nav with fill transition** | Header background fades in on scroll — keeps the hero clean on load |
| **Full-bleed background media** | Hero is 100vw × 100vh with no gutters or padding |
| **Animated background** | Background shifts between screenshots — parallax or looping slideshow |
| **Modal with dimmed overlay** | Standard lightbox dim, but the background is dark enough that the overlay barely registers — the light modal card does all the work |
| **Two-tone CTA pairing** | Ghost + filled button pattern for consent choices — communicates optionality vs. recommendation clearly |
| **Edge-anchored utility nav** | No hamburger on desktop — icon-only controls keep the nav visually weightless |

---

## Spatial Rhythm & Hierarchy Summary

Brand Name leads with **restraint and confidence** — minimal chrome, maximum imagery. The spatial vocabulary is cinematic: wide, unhurried, full-bleed. The color palette leans dark (near-black backgrounds, deep accent) with light surfaces reserved for modal/content areas. Typography appears uppercase and compact in the nav, suggesting the body content uses a contrasting editorial serif or display face for hierarchy. The overall impression is a luxury editorial layout — slow, considered, image-first — not a fast-scroll catalog grid.