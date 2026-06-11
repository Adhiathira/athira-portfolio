# QA Report — IRID Landing Page (prism-drift)

**Date:** 2026-04-05
**Base URL:** http://localhost:9876
**Pages checked:** index.html, technology.html, applications.html, studio.html, contact.html
**CONTENT_MODE:** invented
**ASSET_MODE:** generated (no video assets created — all .mp4 404s are expected and ignored)

---

## Issues Summary

**Total issues found:** 1
**Critical:** 0
**Warnings:** 1

---

## Issues Found

| # | Type | Page | Detail | Severity |
|---|------|------|--------|----------|
| 1 | broken-asset | index.html | `favicon.ico` returns 404 — no favicon file exists in the landing page directory | warning |

> Note: All `.mp4` 404 errors (holo-surface.mp4, prism-refraction.mp4, iridescent-bubble.mp4) are intentionally ignored per ASSET_MODE=generated. No video assets were generated.

---

## Per-Page Results

### index.html
- **Title:** IRID — Structural Color. No Pigments.
- **Console errors:** 2 on first load (holo-surface.mp4 — ignored; favicon.ico — warning), 1 on subsequent loads (mp4 only)
- **Nav links:** All 5 nav links verified on disk (index.html, technology.html, applications.html, studio.html, contact.html) — PASS
- **Stuck animations:** None detected — PASS
- **Screenshots:** index-top.png, index-mid.png, index-bottom.png
- **Status:** PASS (1 warning: favicon missing)

### technology.html
- **Title:** Technology — IRID Structural Color Systems
- **Console errors:** 1 (prism-refraction.mp4 — ignored)
- **Nav links:** Inherited from shared nav — PASS
- **Stuck animations:** None detected — PASS
- **Screenshots:** technology-top.png, technology-mid.png, technology-bottom.png
- **Status:** PASS

### applications.html
- **Title:** Applications — IRID Structural Color
- **Console errors:** 1 (prism-refraction.mp4 — ignored)
- **Nav links:** Inherited from shared nav — PASS
- **Stuck animations:** None detected — PASS
- **Screenshots:** applications-top.png, applications-mid.png, applications-bottom.png
- **Status:** PASS

### studio.html
- **Title:** Studio — IRID Structural Color
- **Console errors:** 1 (iridescent-bubble.mp4 — ignored)
- **Nav links:** Inherited from shared nav — PASS
- **Stuck animations:** `#studio-hero-scroll-hint` has opacity:0 at page bottom — confirmed NOT stuck: element is out of viewport (rectTop: -4505px), this is a scroll hint that correctly fades after the user scrolls past the hero. PASS
- **Screenshots:** studio-top.png, studio-mid.png, studio-bottom.png
- **Status:** PASS

### contact.html
- **Title:** Contact — IRID Structural Color Systems
- **Console errors:** 0
- **Nav links:** Inherited from shared nav — PASS
- **Stuck animations:** None detected — PASS
- **Screenshots:** contact-top.png, contact-mid.png, contact-bottom.png
- **Status:** PASS

---

## Screenshots

All screenshots saved to:
`/Users/delusionalmakubex/Documents/projects/design-system/design-system/prism-drift/landing-page/qa-screenshots/`

| File | Description |
|------|-------------|
| index-top.png | index.html above fold — hero with "STRUCTURAL COLOR" heading |
| index-mid.png | index.html mid — application cards + "HOW THIN-FILM COATING WORKS" |
| index-bottom.png | index.html bottom — "EVERY SURFACE IS A LIGHT EVENT." CTA |
| technology-top.png | technology.html above fold — "THE PHYSICS OF STRUCTURAL COLOR" |
| technology-mid.png | technology.html mid — "PERFORMANCE PARAMETERS" spec grid |
| technology-bottom.png | technology.html bottom — "ENGINEERED FOR YOUR SURFACE." CTA |
| applications-top.png | applications.html above fold — "APPLICATIONS" hero |
| applications-mid.png | applications.html mid — FASHION section |
| applications-bottom.png | applications.html bottom — "THE RIGHT COLOR FOR EVERY SURFACE." CTA |
| studio-top.png | studio.html above fold — "IRID STUDIO" black hero |
| studio-mid.png | studio.html mid — "BUILT ON DEEP SCIENCE" team section |
| studio-bottom.png | studio.html bottom — "LIGHT IS THE MATERIAL." CTA |
| contact-top.png | contact.html above fold — "START A PROJECT" + form |
| contact-mid.png | contact.html mid — form + FAQ section |
| contact-bottom.png | contact.html bottom — FAQ accordion items |

---

## Visual Observations

- All pages render correctly with consistent IRID brand identity (dark forest green, cream, burnt orange accent)
- Navigation is consistent across all pages with correct active-state highlighting per page
- Typography renders correctly — large display type, monospaced labels, clean body text
- Wave/SVG section dividers render correctly on all pages
- Contact page form is well-structured with all fields visible and accessible
- Studio page has a compelling black full-bleed hero
- Applications page uses a distinctive outlined/stroke text treatment on the hero heading
- No layout breaks, overflow issues, or missing critical content sections observed
