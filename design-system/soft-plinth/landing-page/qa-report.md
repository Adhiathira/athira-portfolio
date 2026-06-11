# QA Report — Roundwork Studio (soft-plinth)

Generated: 2026-04-05T09:03:02Z
Iteration: 1 of 3

## Summary

- Pages checked: 5
- Issues found: 2 (0 critical, 2 warnings)
- All nav links: valid (all 5 HTML files exist on disk)
- JS errors: 0 real errors (2 expected video 404s on index.html, 1 expected video 404 on process.html)
- Stuck animations: 0 on all pages
- Failed image assets: 0 on all pages (no `<img>` elements used — all product visuals are CSS/SVG placeholders)
- Assets directory: empty (`assets/.gitkeep` only) — all video references 404, but per task spec the three videos listed (`hero-ambient.mp4`, `clay-craft.mp4`, `spring-field.mp4`) are expected missing

## Per-Page Results

| Page | Title | JS Errors | Video 404s | Img Failures | Stuck Anim | Nav Links | Result |
|---|---|---|---|---|---|---|---|
| index.html | Roundwork Studio — No corners. No compromises. | 0 real | 2 (expected) | 0 | 0 | 5/5 OK | PASS |
| collection.html | Collection — Roundwork Studio | 0 | 0 | 0 | 0 | 5/5 OK | PASS |
| process.html | Process — Roundwork Studio | 0 real | 1 (expected) | 0 | 0 | 5/5 OK | PASS |
| studio.html | Studio — Roundwork Studio | 0 | 0 | 0 | 0 | 5/5 OK | PASS |
| contact.html | Contact — Roundwork Studio | 0 | 0 | 0 | 0 | 5/5 OK | PASS |

## Issues List

```json
[
  {
    "id": 1,
    "severity": "warning",
    "page": "index.html",
    "type": "missing-asset",
    "asset": "assets/hero-ambient.mp4",
    "description": "Hero background video 404. Per spec this is an expected missing asset (CONTENT_MODE: invented). Video slot renders as solid dark-green background — no layout breakage.",
    "action": "Generate video asset or leave as-is per content mode."
  },
  {
    "id": 2,
    "severity": "warning",
    "page": "index.html, process.html",
    "type": "missing-asset",
    "asset": "assets/clay-craft.mp4",
    "description": "Process section video 404 on both index.html (line 324) and process.html. Per spec this is an expected missing asset. Video slot renders as solid colour background — no layout breakage.",
    "action": "Generate video asset or leave as-is per content mode."
  }
]
```

## Notes

- The `Uncaught TypeError: Cannot set properties of undefined (setting 'parent')` GSAP error seen in the initial console dump was **session bleed** from prior Playwright tabs (other design systems). On a clean fresh load of index.html, that error does not appear. Confirmed by re-navigating to `http://localhost:9876/index.html` in isolation: only the two expected video 404s fire.
- All pages use CSS/SVG ceramic blob shapes as product placeholders — no `<img>` elements with external URLs, so zero image failures.
- All GSAP scroll animations resolved correctly at scroll midpoint (opacity > 0 for all in-viewport sections).
- Nav active states are correctly highlighted per page (e.g., "Collection" dimmed/active on collection.html).
- Footer newsletter forms present and styled correctly on all 5 pages.
- Screenshots saved to: `qa-screenshots/` (15 files: top/mid/bottom per page).
