# QA Report

Generated: 2026-04-04T18:20:00Z
Iteration: 1 of 3

## Summary
- Pages checked: 5
- Issues found: 0 (0 critical, 0 warnings)
- Expected 404s: 3 (video assets not generated per caller instruction — onerror placeholders active)
- Screenshots: landing-page/qa-screenshots/

## Per-Page Results

### index.html
| Check | Result | Detail |
|---|---|---|
| Console errors | ✅ Pass | 3 expected video 404s only (botanical-unfold-loop.mp4, hands-in-soil-loop.mp4, garden-cycle-loop.mp4) |
| Assets loaded | ✅ Pass | No broken imgs; 3 video onerror placeholders rendering correctly with color:transparent |
| Animations resolved | ✅ Pass | Hero entrance sequence fired; variety cards visible after scroll; step rows visible |
| Nav links | ✅ Pass | All 5 links resolve to files on disk |
| Visible content | ➖ N/A | CONTENT_MODE=invented |

### collection.html
| Check | Result | Detail |
|---|---|---|
| Console errors | ✅ Pass | 0 errors |
| Assets loaded | ✅ Pass | No broken assets |
| Animations resolved | ✅ Pass | Header entrance fired; nav active state correct (Collection dimmed) |
| Nav links | ✅ Pass | All 5 links resolve |
| Visible content | ➖ N/A | CONTENT_MODE=invented |

### wisdom.html
| Check | Result | Detail |
|---|---|---|
| Console errors | ✅ Pass | 0 errors |
| Assets loaded | ✅ Pass | No broken assets |
| Animations resolved | ✅ Pass | Header entrance fired; nav active state correct (Wisdom dimmed) |
| Nav links | ✅ Pass | All 5 links resolve |
| Visible content | ➖ N/A | CONTENT_MODE=invented |

### almanac.html
| Check | Result | Detail |
|---|---|---|
| Console errors | ✅ Pass | 0 errors |
| Assets loaded | ✅ Pass | No broken assets |
| Animations resolved | ✅ Pass | Header entrance fired; nav active state correct (Almanac dimmed) |
| Nav links | ✅ Pass | All 5 links resolve |
| Visible content | ➖ N/A | CONTENT_MODE=invented |

### stewards.html
| Check | Result | Detail |
|---|---|---|
| Console errors | ✅ Pass | 0 errors |
| Assets loaded | ✅ Pass | No broken assets |
| Animations resolved | ✅ Pass | Dark header contrast beat rendering; nav active state correct (Stewards dimmed) |
| Nav links | ✅ Pass | All 5 links resolve |
| Visible content | ➖ N/A | CONTENT_MODE=invented |

## Issues List
```json
[]
```
