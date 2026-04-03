# QA Report

Generated: 2026-04-03T03:55:00Z
Iteration: 1 of 3

## Summary
- Pages checked: 4
- Issues found: 1 (0 critical, 1 warning)
- Screenshots: /Users/delusionalmakubex/Documents/projects/design-system/design-system/tidal-grain/landing-page/qa-screenshots/

## Notes on Asset Handling
All missing assets (images and videos) have correct diagnostic placeholders rendering in-place:
- Images: onerror handlers fire and reveal a sibling `<div class="*-placeholder">` showing `→ assets/<filename>` — correct behavior per project rules
- Videos: sibling diagnostic divs show `→ assets/<filename>.mp4` — correct behavior
- Console 404 errors are all from expected missing assets, not script/module failures
- This is `CONTENT_MODE=invented`, so Check 7 (visible content) was skipped on all pages

## Per-Page Results

### index.html
| Check | Result | Detail |
|---|---|---|
| Console errors | ✅ Pass | 5 console 404s — all from expected missing assets (hero-bg.mp4, category-ambient-1.mp4, category-ambient-2.jpeg, category-ambient-3.jpeg, subbrand-ambient.mp4). No JS runtime errors. |
| Assets loaded | ✅ Pass | 2 images and 3 videos missing, but all have diagnostic placeholder elements showing. Correct behavior per project rules. |
| Animations resolved | ✅ Pass | No stuck elements (opacity:0 after scroll) |
| Nav links | ❌ Fail | `about.html` linked from footer nav does not exist in landing-page directory. 7/8 links resolve correctly. |
| Visible content | ➖ N/A | invented mode — skipped |

### work.html
| Check | Result | Detail |
|---|---|---|
| Console errors | ✅ Pass | 6 console 404s — all from expected missing assets (work-item-1 through work-item-6.jpeg). No JS runtime errors. |
| Assets loaded | ✅ Pass | 6 images missing, but all have `work-card-img-placeholder` sibling divs showing. Correct behavior per project rules. |
| Animations resolved | ✅ Pass | No stuck elements (opacity:0 after scroll) |
| Nav links | ✅ Pass | All 10 links resolve (work.html, process.html, index.html, inquire.html, or anchor #) |
| Visible content | ➖ N/A | invented mode — skipped |

### process.html
| Check | Result | Detail |
|---|---|---|
| Console errors | ✅ Pass | 5 console 404s — all from expected missing assets (material-1 through material-4.jpeg, subbrand-ambient.mp4). No JS runtime errors. |
| Assets loaded | ✅ Pass | 4 images and 1 video missing, but all have diagnostic placeholder siblings showing. Correct behavior per project rules. |
| Animations resolved | ✅ Pass | No stuck elements (opacity:0 after scroll) |
| Nav links | ✅ Pass | All 8 links resolve (work.html, process.html, index.html, inquire.html) |
| Visible content | ➖ N/A | invented mode — skipped |

### inquire.html
| Check | Result | Detail |
|---|---|---|
| Console errors | ✅ Pass | None |
| Assets loaded | ✅ Pass | All loaded (no missing assets on this page) |
| Animations resolved | ✅ Pass | No stuck elements (opacity:0 after scroll) |
| Nav links | ✅ Pass | All 7 links resolve (work.html, process.html, index.html, inquire.html) |
| Visible content | ➖ N/A | invented mode — skipped |

## Issues List
```json
[
  {
    "file": "index.html",
    "type": "nav-404",
    "detail": "Nav link href='about.html' in footer points to a file that does not exist: /Users/delusionalmakubex/Documents/projects/design-system/design-system/tidal-grain/landing-page/about.html",
    "severity": "warning"
  }
]
```

## Unresolved After 3 Iterations
(not applicable — this is iteration 1)
