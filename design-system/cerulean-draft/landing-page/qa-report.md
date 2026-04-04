# QA Report — Strata / cerulean-draft

**Run date:** 2026-04-04
**Pages verified:** index.html, platform.html, methodology.html, contact.html
**Iterations:** 1 (found issue, fixed, re-verified = clean)

## Issues Found and Fixed

### Issue 1 — GSAP clip-path pre-application on step items
- **File:** index.html
- **Type:** animation stuck / content invisible
- **Detail:** `gsap.from('.step-item', { clipPath: 'inset(0 100% 0 0)' })` immediately sets all step items to clipped before ScrollTrigger fires. On page load, the entire how-it-works section appeared empty.
- **Fix:** Changed to `gsap.fromTo(item, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', immediateRender: false })`. Step items now visible on load; animate on scroll.
- **Severity:** High

### Issue 2 — Same pattern on contact.html contact-direct-item
- **File:** contact.html
- **Type:** animation stuck / content potentially invisible
- **Detail:** Same `gsap.from` with clip-path pattern applied to `.contact-direct-item` elements.
- **Fix:** Changed to `gsap.fromTo` with `immediateRender: false`.
- **Severity:** Medium (contact items are below fold so less likely to be seen blank, but still wrong)

## Console Errors (All Expected)

All console errors are 404s for video assets not generated (Steps 7-8 disabled per caller).

| Page | Errors | Description |
|---|---|---|
| index.html | 2 | assets/hero-bg-ambient.mp4, assets/instrument-showcase-ambient.mp4 — not generated |
| platform.html | 0 | — |
| methodology.html | 1 | assets/process-ambient.mp4 — not generated |
| contact.html | 0 | — |

## Navigation Verification

All nav links confirmed resolving to existing pages:
- index.html → ✓
- platform.html → ✓
- methodology.html → ✓
- contact.html → ✓
- platform.html#data-fusion → ✓
- platform.html#modeling → ✓
- platform.html#reporting → ✓
- methodology.html#standards → ✓
- methodology.html#validation → ✓

## Active State Verification

- index.html: no text link active (logo is homepage indicator) — ✓
- platform.html: "Platform" link dimmed at opacity 0.45 — ✓
- methodology.html: "Methodology" link dimmed at opacity 0.45 — ✓
- contact.html: "Contact" link dimmed at opacity 0.45 — ✓

## Visual QA (Playwright screenshots)

- index-viewport.png: Hero renders dark midnight bg, white Syne display heading, teal CTA button, nav overlay with white text — ✓
- index-full.png: All 5 sections visible, features bento grid, steps section, showcase dark section, CTA band, footer — ✓
- platform-full.png: Compact header, bento grid, alternating feature rows, dark reporting cards — ✓
- methodology-full.png: Compact header, dark process section, masonry standards grid, validation split — ✓
- contact-full.png: Minimal header, 2-column form layout, full footer — ✓

## Final Status

**PASS** — 4 pages clean after 1 repair iteration. All remaining console errors are expected asset 404s (generation skipped per caller instructions).
