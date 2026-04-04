# QA Report — Varo Studio (weld-straw)

**Date:** 2026-04-04
**Server:** python3 -m http.server 9876
**Pages tested:** index.html, work.html, process.html, contact.html
**QA iterations:** 2 (initial check → CSS/HTML selector mismatch fixed → re-check clean)

---

## Summary

**Issues found after final iteration: 0**

All 4 pages load and render correctly. All navigation links resolve to existing files.

---

## Issues Fixed (Iteration 1 → 2)

### CSS/HTML selector mismatch
- **Symptom:** Process steps grid rendered in extremely narrow columns; feature split and manifesto sections had no styling applied
- **Root cause:** The sections.css file was written using ID selectors (`#feature-split`, `#manifesto`, `#process-preview`, `#process-steps-grid`, `#site-footer`, etc.) and specific child class names (`.process-step-number`, `.process-step-content`, `.work-item-name`), but the initial HTML was written using class-based selectors (`.feature-split`, `.manifesto`, etc.) with different element class names
- **Fix:** All 4 HTML files were rewritten to use the exact IDs and class names expected by the existing CSS

---

## Per-Page Results (Final)

### index.html
- Title: "Varo Studio — Architectural Hardware, Copenhagen" ✓
- Nav: transparent on-dark (light text over hero video), all links present ✓
- Hero: full-viewport, dark placeholder visible (video 404 expected — ASSET_MODE=generated) ✓
- Feature split: 1.4fr/1fr grid, left media column + right text column ✓
- Manifesto: large editorial blockquote, field background placeholder visible ✓
- Process preview: 3-column numbered step grid ✓
- CTA band: dark #1a1a18 background, headline + button ✓
- Footer: dark 3-column layout ✓
- Console errors: 3 (hero-bg.mp4, craft-detail.mp4, grain-field.mp4 — expected 404)

### work.html
- Title: "Work — Varo Studio" ✓
- Nav: light transparent base, scrolls to dark ✓
- Nav-spacer active: prevents content jumping under fixed nav ✓
- Page header: large Inter 700 headline, subtitle ✓
- Work grid: asymmetric 1.4fr/1fr, first item spans 2 rows ✓
- Work items: dark placeholder backgrounds visible, item name + material overlaid at bottom ✓
- Work description: 2-column split, "Commissions" label + heading on left, body + CTA on right ✓
- Footer: consistent with index ✓
- Console errors: 4 (work item images — expected 404)

### process.html
- Title: "Process — Varo Studio" ✓
- Page header: correct ✓
- Process full steps: 5 articles in 100px/1fr/1fr grid, each with step number, text content, image placeholder ✓
- Materials strip: dark #2d2b27 section, 9 material tags in flex wrap ✓
- Footer: consistent ✓
- Console errors: 5 (process step images — expected 404)

### contact.html
- Title: "Contact — Varo Studio" ✓
- Page header: large 3-line headline ✓
- Contact body: 1fr/1.2fr grid — info column left, white form card right ✓
- Form: 5 fields (name, email, role, project type, message textarea), submit button ✓
- Footer: consistent ✓
- Active nav link: "Contact" correctly dimmed at opacity 0.45 ✓
- Console errors: 0

---

## Asset Status

| Asset | Status |
|---|---|
| assets/hero-bg.mp4 | Pending generation — onerror placeholder active |
| assets/craft-detail.mp4 | Pending generation — onerror placeholder active |
| assets/grain-field.mp4 | Pending generation — onerror placeholder active |
| assets/work-featured-handle.jpeg | Pending generation — onerror: parent bg #2d2b27 |
| assets/work-hinge-pair.jpeg | Pending generation — onerror: parent bg #3d3a34 |
| assets/work-escutcheon.jpeg | Pending generation — onerror: parent bg #2d2b27 |
| assets/work-pull-handle.jpeg | Pending generation — onerror: parent bg #3d3a34 |
| assets/process-brief.jpeg | Pending generation — placeholder div visible |
| assets/process-pattern.jpeg | Pending generation — placeholder div visible |
| assets/process-casting.jpeg | Pending generation — placeholder div visible |
| assets/process-filing.jpeg | Pending generation — placeholder div visible |
| assets/process-finish.jpeg | Pending generation — placeholder div visible |

All missing assets degrade gracefully per the "No Silent Visual Fallbacks" rule — each shows a diagnostic placeholder indicating what is missing.

---

## Unresolved Issues

None.
