# QA Report

Generated: 2026-04-04T19:55:00Z
Iteration: 1 of 3

## Summary
- Pages checked: 5
- Issues found: 0 critical, 19 warnings (all pending asset generation — expected for ASSET_MODE=generated with asset generation skipped)
- Screenshots: design-system/bramble-dyce/landing-page/qa-screenshots/

## Per-Page Results

### index.html
| Check | Result | Detail |
|---|---|---|
| Console errors | ✅ Pass | No JS errors. 4 asset 404s + 1 video 404 + favicon 404 — all expected (ASSET_MODE=generated) |
| Assets loaded | ⚠ Warning | 4 images + 1 video not on disk (awaiting generation): specimen-sea-thrift.jpeg, specimen-yellow-rattle.jpeg, specimen-bog-cotton.jpeg, specimen-stonecrop.jpeg, specimen-packaging.mp4 |
| Animations resolved | ✅ Pass | No stuck elements ([] returned) after scroll to 50% |
| Nav links | ✅ Pass | All 5 links resolve: index.html, archive.html, process.html, subscribe.html, about.html |
| Visible content | ➖ N/A | CONTENT_MODE=invented |

### about.html
| Check | Result | Detail |
|---|---|---|
| Console errors | ✅ Pass | No JS errors. 2 asset 404s + favicon 404 — expected |
| Assets loaded | ⚠ Warning | 2 images not on disk: about-mill-exterior.jpeg, about-mill-landscape.jpeg |
| Animations resolved | ✅ Pass | No stuck elements after scroll |
| Nav links | ✅ Pass | All 5 links resolve |
| Visible content | ➖ N/A | CONTENT_MODE=invented |

### archive.html
| Check | Result | Detail |
|---|---|---|
| Console errors | ✅ Pass | No JS errors. 8 asset 404s + favicon 404 — expected |
| Assets loaded | ⚠ Warning | 8 images not on disk: archive-sea-thrift.jpeg, archive-yellow-rattle.jpeg, archive-bog-cotton.jpeg, archive-stonecrop.jpeg, archive-heath-spotted-orchid.jpeg, archive-sea-campion.jpeg, archive-ragged-robin.jpeg, archive-grass-of-parnassus.jpeg |
| Animations resolved | ✅ Pass | No stuck elements after scroll |
| Nav links | ✅ Pass | All 5 links resolve |
| Visible content | ➖ N/A | CONTENT_MODE=invented |

### process.html
| Check | Result | Detail |
|---|---|---|
| Console errors | ✅ Pass | No JS errors. 4 asset 404s + 1 video 404 + favicon 404 — expected |
| Assets loaded | ⚠ Warning | 4 images + 1 video not on disk: process-collection.jpeg, process-drying.jpeg, process-typesetting.jpeg, process-impression.jpeg, press-impression.mp4 |
| Animations resolved | ✅ Pass | No stuck elements after scroll |
| Nav links | ✅ Pass | All 5 links resolve |
| Visible content | ➖ N/A | CONTENT_MODE=invented |

### subscribe.html
| Check | Result | Detail |
|---|---|---|
| Console errors | ✅ Pass | No JS errors. 1 asset 404 + favicon 404 — expected |
| Assets loaded | ⚠ Warning | 1 image not on disk: subscribe-sea-thrift-edition.jpeg |
| Animations resolved | ✅ Pass | No stuck elements after scroll |
| Nav links | ✅ Pass | All 5 links resolve |
| Visible content | ➖ N/A | CONTENT_MODE=invented |

## Issues List
```json
[
  {"file":"index.html","type":"broken-asset","detail":"assets/specimen-sea-thrift.jpeg, specimen-yellow-rattle.jpeg, specimen-bog-cotton.jpeg, specimen-stonecrop.jpeg — 404, onerror diagnostic active (expected: ASSET_MODE=generated, generation skipped per recommendations)","severity":"warning"},
  {"file":"index.html","type":"broken-asset","detail":"assets/specimen-packaging.mp4 — 404, onerror diagnostic active (expected: video not generated)","severity":"warning"},
  {"file":"about.html","type":"broken-asset","detail":"assets/about-mill-exterior.jpeg, about-mill-landscape.jpeg — 404, onerror diagnostic active","severity":"warning"},
  {"file":"archive.html","type":"broken-asset","detail":"assets/archive-sea-thrift.jpeg, archive-yellow-rattle.jpeg, archive-bog-cotton.jpeg, archive-stonecrop.jpeg, archive-heath-spotted-orchid.jpeg, archive-sea-campion.jpeg, archive-ragged-robin.jpeg, archive-grass-of-parnassus.jpeg — 404, onerror diagnostic active","severity":"warning"},
  {"file":"process.html","type":"broken-asset","detail":"assets/process-collection.jpeg, process-drying.jpeg, process-typesetting.jpeg, process-impression.jpeg — 404, onerror diagnostic active","severity":"warning"},
  {"file":"process.html","type":"broken-asset","detail":"assets/press-impression.mp4 — 404, onerror diagnostic active","severity":"warning"},
  {"file":"subscribe.html","type":"broken-asset","detail":"assets/subscribe-sea-thrift-edition.jpeg — 404, onerror diagnostic active","severity":"warning"}
]
```

## Notes
- All 19 broken-asset warnings are expected: asset generation was explicitly skipped per caller recommendations ("skip asset generation — do not run Steps 7-8")
- Onerror diagnostic placeholders are functioning correctly — pages render with informative placeholders instead of broken images
- No critical issues found. All pages are functionally complete.
- favicon.ico 404 is a minor cosmetic issue (no favicon created for this build)
