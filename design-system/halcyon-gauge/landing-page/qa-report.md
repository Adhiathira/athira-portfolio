# QA Report

Generated: 2026-04-04T19:26:00Z
Iteration: 1 of 3

## Summary
- Pages checked: 5
- Issues found: 0 real issues (10 expected asset 404s — all covered by onerror diagnostic placeholders)
- Screenshots: design-system/halcyon-gauge/landing-page/qa-screenshots/

## Per-Page Results

### index.html
| Check | Result | Detail |
|---|---|---|
| Console errors | ✅ Pass | 5 asset 404s — all expected (skipped generation), all have onerror handlers |
| Assets loaded | ✅ Pass | 3 img + 2 video — all have onerror/missing-asset diagnostics; no broken-without-placeholder |
| Animations resolved | ✅ Pass | 0 elements stuck at opacity:0 after full-page scroll |
| Nav links | ✅ Pass | All 5 links resolve to existing files |
| Visible content | ➖ N/A | CONTENT_MODE=invented |

### archive.html
| Check | Result | Detail |
|---|---|---|
| Console errors | ✅ Pass | 0 errors |
| Assets loaded | ✅ Pass | No images on this page |
| Animations resolved | ✅ Pass | Table rows animate in correctly |
| Nav links | ✅ Pass | All 5 links resolve |
| Visible content | ➖ N/A | CONTENT_MODE=invented |

### collection.html
| Check | Result | Detail |
|---|---|---|
| Console errors | ✅ Pass | 4 asset 404s — all expected (class-angular, class-pressure, class-thermal, class-depth), all have onerror handlers |
| Assets loaded | ✅ Pass | 4 img — all have onerror diagnostics |
| Animations resolved | ✅ Pass | Section alternating horizontal sweeps resolve on scroll |
| Nav links | ✅ Pass | All 5 links resolve |
| Visible content | ➖ N/A | CONTENT_MODE=invented |

### fellowship.html
| Check | Result | Detail |
|---|---|---|
| Console errors | ✅ Pass | 0 errors |
| Assets loaded | ✅ Pass | No images on this page |
| Animations resolved | ✅ Pass | Term cards and form elements animate in correctly |
| Nav links | ✅ Pass | All 5 links resolve |
| Visible content | ➖ N/A | CONTENT_MODE=invented |

### about.html
| Check | Result | Detail |
|---|---|---|
| Console errors | ✅ Pass | 1 asset 404 — founder-portrait.jpeg expected (skipped generation), has onerror handler |
| Assets loaded | ✅ Pass | 1 img — has onerror diagnostic showing "→ assets/founder-portrait.jpeg" |
| Animations resolved | ✅ Pass | Timeline items, founder section, location section all visible after scroll |
| Nav links | ✅ Pass | All 5 links resolve |
| Visible content | ➖ N/A | CONTENT_MODE=invented |

## Issues List
```json
[]
```

## Notes on Asset 404s
All 10 asset 404s across the 5 pages are **expected and correct**. Asset generation (Steps 7-8) was explicitly skipped per caller instructions. Every missing asset has an `onerror` diagnostic handler that:
1. Names the missing file (e.g. `→ assets/parchment-ambient.mp4`)
2. Displays a muted grey placeholder box
3. Does NOT silently show a broken image icon

This is the correct behavior per project rules ("No Silent Visual Fallbacks").

## Unresolved After 3 Iterations
None — QA passed on first iteration with zero real issues.
