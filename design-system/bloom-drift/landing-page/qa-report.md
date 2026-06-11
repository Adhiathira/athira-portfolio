# QA Report — bloom-drift / Solubl Landing Page

**Generated:** 2026-04-05
**Pages tested:** index.html, collections.html, process.html, about.html, contact.html
**Server:** `python3 -m http.server 9876`
**QA iterations:** 1
**ASSET_MODE:** generated (Steps 7–8 skipped per project recommendations)
**CONTENT_MODE:** invented

---

## Summary

**Issues found (functional):** 0
**Issues found (visual — fixed):** 2
**Issues resolved after 1 iteration:** 2
**Unresolved issues:** 0

---

## Page Results

### index.html
- **Console errors:** 7 (all expected 404s — ASSET_MODE=generated)
  - `assets/hero-product.jpeg` — hero product frame (onerror handled)
  - `assets/collection-mineral.jpeg`, `collection-citrus.jpeg`, `collection-bloom.jpeg`, `collection-tide.jpeg` — collection bento cards (onerror handled)
  - `assets/fluid-gradient.mp4`, `assets/liquid-surface.mp4` — hero + atmospheric video (onerror handled)
- **Status:** PASS

### collections.html
- **Console errors:** 0
- **Status:** PASS

### process.html
- **Console errors:** 5 (all expected 404s — ASSET_MODE=generated)
  - `assets/process-sourcing.jpeg`, `process-extraction.jpeg`, `process-matrix.jpeg`, `process-compression.jpeg`, `process-qa.jpeg` — alternating step images (onerror handled)
- **Status:** PASS

### about.html
- **Console errors:** 1 (expected 404 — ASSET_MODE=generated)
  - `assets/about-studio.jpeg` — studio section image (onerror handled)
- **Status:** PASS

### contact.html
- **Console errors:** 0
- **Status:** PASS

---

## Issues Fixed (Iteration 1)

### Issue 1 — Placeholder text visible: hero product frame
- **Severity:** visual
- **File:** `index.html`, `components/hero.css`
- **Symptom:** When `assets/hero-product.jpeg` failed to load, the onerror handler showed the `#hero-product-placeholder` div which contained the asset filename as visible text (`→ assets/hero-product.jpeg`) due to `color: rgba(0,0,0,0.4)`.
- **Fix:** Changed `color` to `transparent` in `hero.css` and added `color:transparent` to the inline style on the placeholder div in `index.html`.

### Issue 2 — Placeholder text visible: collection cards + process step images + atmospheric video
- **Severity:** visual
- **Files:** `components/sections.css`, `components/subpages.css`, `process.html`, `about.html`
- **Symptom:** All `.product-card-placeholder`, `.process-step-placeholder`, and `#atmospheric-video-placeholder` elements had non-transparent text colors, showing filename strings when images failed to load.
- **Fix:**
  - `sections.css`: `.product-card-placeholder` color `rgba(0,0,0,0.35)` → `transparent`
  - `sections.css`: `#atmospheric-video-placeholder` color `rgba(255,255,255,0.3)` → `transparent`
  - `subpages.css`: `.process-step-placeholder` color `rgba(0,0,0,0.35)` → `transparent`
  - `process.html`: 5 inline `style` overrides `color:rgba(0,0,0,0.3)` → `color:transparent`
  - `about.html`: 1 inline `style` override `color:rgba(0,0,0,0.3)` → `color:transparent`

---

## Visual QA — Screenshots

| Page | Viewport region | File |
|---|---|---|
| index.html | Top (hero) | qa-index-reload.png |
| index.html | Mid (intro stats) | qa-index-mid.png |
| index.html | Collections bento (pre-fix) | qa-index-collections.png |
| index.html | Collections bento (post-fix) | qa-index-collections-fixed.png |
| index.html | Dark atmospheric section | qa-index-dark-sections.png |
| index.html | CTA band + footer | qa-index-footer.png |
| collections.html | Top | qa-collections-top.png |
| process.html | Top | qa-process-top.png |
| about.html | Top | qa-about-top.png |
| contact.html | Top | qa-contact-top.png |

---

## Nav Link Resolution

All nav links resolve to real files:
- `collections.html` ✓
- `process.html` ✓
- `about.html` ✓
- `contact.html` ✓

Active nav states confirmed (current page link dimmed, pointer-events: none).

---

## Unresolved After 3 Iterations

None. All issues resolved in iteration 1.
