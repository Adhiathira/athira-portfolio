# QA Report — Meridian Grain Landing Page

**Date:** 2026-04-02
**Run:** 1 of 3 (2 iterations performed — 1 repair pass)
**Status:** PASS — all critical issues resolved

---

## Pages Tested

| Page | Status | Issues Found | Issues Fixed |
|---|---|---|---|
| index.html | ✓ Pass | 0 | — |
| services.html | ✓ Pass | 1 (spacing) | ✓ Fixed |
| process.html | ✓ Pass | 1 (spacing) | ✓ Fixed |
| work.html | ✓ Pass | 1 (spacing) | ✓ Fixed |
| contact.html | ✓ Pass | 1 (spacing) | ✓ Fixed |

---

## Issues Found and Resolved

### Issue 1 — Sub-page header top padding too large (4 pages)

**Severity:** Minor visual
**Pages:** services.html, process.html, work.html, contact.html
**Description:** Page headers had `padding-top: var(--space-3xl, 202.5px)` which stacked on top of the nav-spacer (154px), creating ~356px of blank space before content on first render.
**Fix:** Reduced page-header `padding-top` from `var(--space-3xl)` to `var(--space-2xl, 101.25px)` on all 4 sub-pages. Total above-content space is now ~255px (nav 154px + header padding 101px), which reads as intentional breathing room rather than empty space.
**Status:** ✓ Fixed

---

## Nav Link Audit

All 5 pages contain correct links to all 5 HTML files. No 404s.

| Link | Resolves |
|---|---|
| index.html | ✓ |
| services.html | ✓ |
| process.html | ✓ |
| work.html | ✓ |
| contact.html | ✓ |

---

## CSS Link Audit

All pages link to:
- `styles/tokens.css` — ✓ exists
- `components/nav.css` — ✓ exists
- `components/hero.css` — ✓ exists (index only, correct)
- `components/sections.css` — ✓ exists

---

## Active Nav State Audit

| Page | Active Link | Correct |
|---|---|---|
| index.html | (logo is home indicator, no text link active) | ✓ |
| services.html | Services (opacity: 0.45) | ✓ |
| process.html | Process (opacity: 0.45) | ✓ |
| work.html | Work (opacity: 0.45) | ✓ |
| contact.html | Book a Run (nav-link--active on CTA) | ✓ |

---

## Visual Rendering Audit

| Check | Status |
|---|---|
| Typography loaded (Bricolage Grotesque + Archivo Narrow) | ✓ |
| Orange accent (#fb7339) renders correctly | ✓ |
| Dark hero background (#1a1a14) renders correctly | ✓ |
| Cream background (#f2efe9) renders correctly | ✓ |
| Nav centered alignment (single row) | ✓ |
| Uppercase headings with letter-spacing | ✓ |
| GSAP animations scripted (transform-only, no opacity:0 in from()) | ✓ |
| Video tags with onerror fallback | ✓ |

---

## Asset Status

- `hero-bg.mp4` — not yet generated (prompt file written to prompts/)
- `cta-depth.mp4` — not yet generated (prompt file written to prompts/)
- Video tags use `onerror="this.style.display='none'"` — graceful degradation confirmed

---

## Unresolved Issues

None. All issues resolved within 2 iterations.

---

## Screenshots

Located at: `qa-screenshots/`
- index-qa.png — initial
- index-full.png — full page scroll
- services-qa.png — initial / services-qa2.png — after spacing fix
- process-qa.png — initial / process-qa2.png — after spacing fix
- work-qa.png — initial / work-qa2.png — after spacing fix
- contact-qa.png — initial / contact-qa2.png — after spacing fix
