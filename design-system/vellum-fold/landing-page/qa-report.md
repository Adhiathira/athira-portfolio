# QA Report

Generated: 2026-04-10T16:42:30Z
Iteration: 1 of 3

## Summary
- Pages checked: 5
- Issues found: 0 (0 critical, 0 warnings)
- Screenshots: qa-screenshots/

**Note:** All image and video asset 404s are expected behavior -- asset generation was skipped. The onerror diagnostic placeholders are displaying correctly where applicable (showing file paths like "assets/origin-studio.jpeg"). This is the correct fallback behavior per project rules and is NOT counted as an issue.

## Per-Page Results

### index.html
| Check | Result | Detail |
|---|---|---|
| Console errors | Pass | 2 video asset 404s (expected -- asset generation skipped) |
| Assets loaded | Pass | No failed images; 2 video 404s (hero-frontispiece.mp4, social-proof-ink.mp4) -- expected |
| Animations resolved | Pass | All visible after scroll |
| Nav links | Pass | All 5 links resolve (index.html, about.html, process.html, collection.html, contact.html) |
| Visible content | N/A | Invented content mode |

### about.html
| Check | Result | Detail |
|---|---|---|
| Console errors | Pass | 6 asset 404s (5 images, 1 video) -- expected, asset generation skipped |
| Assets loaded | Pass | 5 image placeholders showing diagnostic text; 1 video 404 -- all expected |
| Animations resolved | Pass | All visible after scroll |
| Nav links | Pass | All 5 links resolve |
| Visible content | N/A | Invented content mode |

### process.html
| Check | Result | Detail |
|---|---|---|
| Console errors | Pass | 12 image asset 404s -- expected, asset generation skipped |
| Assets loaded | Pass | 12 image placeholders showing diagnostic text -- all expected |
| Animations resolved | Pass | All visible after scroll |
| Nav links | Pass | All 5 links resolve |
| Visible content | N/A | Invented content mode |

### collection.html
| Check | Result | Detail |
|---|---|---|
| Console errors | Pass | 6 image asset 404s -- expected, asset generation skipped |
| Assets loaded | Pass | 6 image placeholders showing diagnostic text -- all expected |
| Animations resolved | Pass | All visible after scroll |
| Nav links | Pass | All 5 links resolve |
| Visible content | N/A | Invented content mode |

### contact.html
| Check | Result | Detail |
|---|---|---|
| Console errors | Pass | None |
| Assets loaded | Pass | All loaded (no images or videos on this page) |
| Animations resolved | Pass | All visible after scroll |
| Nav links | Pass | All 5 links resolve |
| Visible content | N/A | Invented content mode |

## Issues List
```json
[]
```

## Screenshots

- `qa-screenshots/index-top.png`
- `qa-screenshots/index-mid.png`
- `qa-screenshots/index-bottom.png`
- `qa-screenshots/about-top.png`
- `qa-screenshots/about-mid.png`
- `qa-screenshots/about-bottom.png`
- `qa-screenshots/process-top.png`
- `qa-screenshots/process-mid.png`
- `qa-screenshots/process-bottom.png`
- `qa-screenshots/collection-top.png`
- `qa-screenshots/collection-mid.png`
- `qa-screenshots/collection-bottom.png`
- `qa-screenshots/contact-top.png`
- `qa-screenshots/contact-mid.png`
- `qa-screenshots/contact-bottom.png`

## Unresolved After 3 Iterations
(not applicable -- no issues found on iteration 1)
