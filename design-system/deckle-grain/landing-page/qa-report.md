# QA Report — Deckle & Thread (deckle-grain)

## Summary
- **Iterations:** 1 of 3 (passed on first run)
- **JS Errors:** 0
- **Asset 404s:** 3 (expected — video assets not generated per caller instruction)
- **Nav Links:** All 4 sub-page links resolve (200 OK)
- **Active States:** Correct on all pages

## Pages Verified

| Page | Status | Title | JS Errors | Notes |
|------|--------|-------|-----------|-------|
| index.html | 200 | Deckle & Thread — Private Letterpress Studio, Edinburgh | 0 | Cover animation, book-flip, bookmarks all functional |
| editions.html | 200 | Editions — Deckle & Thread | 0 | Current edition grid + past editions alternating layout |
| process.html | 200 | Process — Deckle & Thread | 0 | Drop cap, 6 numbered steps, materials grid |
| commissions.html | 200 | Commissions — Deckle & Thread | 0 | Rate card, commission steps, correspondence |
| about.html | 200 | About — Deckle & Thread | 0 | 2fr/1fr story+video, people grid, recognition grid |

## Expected Asset 404s (videos not generated)
- `assets/hero-bg.mp4` — hero background video (index.html)
- `assets/process-ambient.mp4` — process section video (process.html)
- `assets/context-ambient.mp4` — studio context video (about.html)

All have `onerror` handlers that show the filename as a placeholder.

## Book System Features Verified
- Book cover opening animation (GSAP timeline)
- Page-flip clip-path transitions (ScrollTrigger scrub)
- Spine with stitching marks (fixed left)
- Page edge stack (fixed right)
- Bookmark tabs with active state tracking
- Progress dots with active state tracking
- Paper texture overlay on every page
- Running headers, chapter labels, folios on all pages
- Drop caps on opening paragraphs
- Marginalia (pull quote) on Chapter I
- Endpapers with marbled CSS pattern and printer's mark
- Colophon with publisher's note (no email form)

## Unresolved Issues
None.
