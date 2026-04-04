# QA Report — Wren Ledger Landing Page
Generated: 2026-04-04

## Summary
- **Iterations run:** 1 of 3
- **Issues found:** 1 (fixed during QA pass)
- **Issues unresolved:** 0
- **Pages verified:** 5 (index.html, research.html, archives.html, about.html, contact.html)
- **Overall status:** PASS

---

## Pages Verified

### index.html — Wren Ledger (Homepage)
- Status: PASS
- Console errors: 3 (expected — video asset 404s: hero-bg.mp4, process-ambient.mp4, editorial-ambient.mp4)
- Nav active state: "Home" dimmed correctly
- Sections rendered: Hero (video container visible, overlay correct), Services (3-col asymmetric grid), Credentials bar (4-col), Process (dark overlay), Testimonial, CTA band, Footer

### research.html — Research Methodology
- Status: PASS
- Console errors: 0
- Nav active state: "Research" dimmed correctly
- Sections rendered: Page header ("METHODOLOGY" eyebrow), Proof Standard (two-col), Evidence Categories (bento grid, 3-col + 2-col below), Documentation (detail list)

### archives.html — Archives
- Status: PASS
- Console errors: 0
- Nav active state: "Archives" dimmed correctly
- Sections rendered: Page header ("38 COUNTRIES" eyebrow), Repository Types (4-col feature grid), Regions (2-col grid, 8 regions with border dividers), Access Notes (two-col)

### about.html — About
- Status: PASS
- Console errors: 3 (expected — team portrait 404s: team-eleanor-marsh.jpeg, team-rui-ferreira.jpeg, team-anna-kowalczyk.jpeg)
- Nav active state: "About" dimmed correctly
- Sections rendered: Page header ("THE PRACTICE" eyebrow), Practice Statement (two-col), Team (3-col grid, onerror placeholders showing filenames per No-Silent-Fallbacks rule), Values (4-col feature grid)

### contact.html — Contact
- Status: PASS
- Console errors: 0
- Nav active state: "Contact" dimmed correctly, nav-cta link has aria-current="page"
- Sections rendered: Contact header ("ENQUIRIES" eyebrow, compact ≤200px), Two-column layout (info column sticky + form column), FAQ (5 items, border-separated)

---

## Issues Found and Fixed

### Issue 1 — `.service-card-meta` browser default bullets (FIXED)
- **File:** index.html / components/sections.css
- **Severity:** medium
- **Symptom:** `<ul class="service-card-meta">` rendered with browser default bullet points `•`
- **Root cause:** Missing `list-style: none; margin: 0; padding: 0` on `.service-card-meta`
- **Fix:** Added the three properties to `.service-card-meta` in `components/sections.css`
- **Verification:** JS evaluation confirmed `list-style: none, padding: 0px` after fix

---

## Expected 404s (not issues)
All video and portrait image assets are expected 404s because asset generation was skipped per recommendations parameter. All affected elements use the `onerror` placeholder pattern (showing asset path) per CLAUDE.md No Silent Visual Fallbacks rule.

- `assets/hero-bg.mp4` — homepage hero video background
- `assets/process-ambient.mp4` — homepage process section video
- `assets/editorial-ambient.mp4` — homepage testimonial section video
- `assets/team-eleanor-marsh.jpeg` — about page portrait
- `assets/team-rui-ferreira.jpeg` — about page portrait
- `assets/team-anna-kowalczyk.jpeg` — about page portrait

---

## Screenshots
All screenshots saved to `qa-screenshots/`:
- `index-top.png` — hero section
- `index-mid.png` — services section (before fix)
- `index-services.png` — services section (after fix, no bullets)
- `index-process.png` — dark process section + testimonial
- `index-bottom.png` — CTA band + footer
- `contact-top.png` — contact header + two-column form layout
- `research-top.png` — research header + proof standard section
- `research-mid.png` — evidence categories bento grid
- `archives-top.png` — archives header + 4-col repository types grid
- `archives-mid.png` — 2-col regions list (8 regions)
- `about-top.png` — about header + practice statement two-col
- `about-team.png` — team grid with onerror placeholders

---

## Nav Integrity
All 5 nav links resolve to existing HTML files:
- Home → index.html ✓
- Research → research.html ✓
- Archives → archives.html ✓
- About → about.html ✓
- Contact → contact.html ✓
- Begin Enquiry (CTA) → contact.html ✓
