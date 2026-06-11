# QA Report

Generated: 2026-04-05T11:22:00Z
Iteration: 1 of 3

## Summary
- Pages checked: 5
- Issues found: 0 (0 critical, 0 warnings)
- Screenshots: /Users/delusionalmakubex/Documents/projects/design-system/design-system/cube-verge/landing-page/qa-screenshots

## Per-Page Results

### index.html
| Check | Result | Detail |
|---|---|---|
| Console errors | ✅ Pass | 3 resource 404s (iso-city.mp4, iso-assembly.mp4, iso-wireframe.mp4) — all have placeholder divs (.hero-video-placeholder, .assembly-video-placeholder, .cta-video-placeholder) showing asset path. Expected per ASSET_MODE=generated spec. |
| Assets loaded | ✅ Pass | No broken images. 3 video elements 404 but each has a sibling placeholder div with diagnostic text — correct behavior. |
| Animations resolved | ✅ Pass | No elements stuck at opacity:0 after scroll to 50%. |
| Nav links | ✅ Pass | All 5 links resolve on disk: index.html, platform.html, solutions.html, projects.html, contact.html. |
| Visible content | ➖ N/A | CONTENT_MODE=invented |

### platform.html
| Check | Result | Detail |
|---|---|---|
| Console errors | ✅ Pass | 1 resource 404 (cap-parametric-engine.jpeg) — has onerror handler; img hidden, sibling .card__image-placeholder shown with diagnostic text "cap-parametric-engine.jpeg — Asset not generated — run asset pipeline". Correct behavior. |
| Assets loaded | ✅ Pass | 1 image 404 but onerror diagnostic placeholder is visible. Not a broken asset issue per spec. |
| Animations resolved | ✅ Pass | No elements stuck at opacity:0 after scroll to 50%. |
| Nav links | ✅ Pass | Nav links on platform.html all resolve (platform.html, solutions.html, projects.html, contact.html). |
| Visible content | ➖ N/A | CONTENT_MODE=invented |

### solutions.html
| Check | Result | Detail |
|---|---|---|
| Console errors | ✅ Pass | 3 resource 404s (solution-residential.jpeg, solution-commercial.jpeg, solution-infrastructure.jpeg) — all have onerror handlers; images hidden, .solution-row__image-placeholder siblings visible with diagnostic text. Correct behavior. |
| Assets loaded | ✅ Pass | 3 images 404 but each has a visible diagnostic placeholder sibling. Not broken asset issues per spec. |
| Animations resolved | ✅ Pass | No elements stuck at opacity:0 after scroll to 50%. |
| Nav links | ✅ Pass | Nav links resolve on disk. |
| Visible content | ➖ N/A | CONTENT_MODE=invented |

### projects.html
| Check | Result | Detail |
|---|---|---|
| Console errors | ✅ Pass | 6 resource 404s (project-1.jpeg through project-6.jpeg) — all have onerror handlers; images hidden, inline diagnostic div injected into parent .project-card-img-wrap showing "assets/project-N.jpeg — not found". Correct behavior. |
| Assets loaded | ✅ Pass | 6 images 404 but each parent contains an inline diagnostic overlay. Not broken asset issues per spec. |
| Animations resolved | ✅ Pass | No elements stuck at opacity:0 after scroll to 50%. |
| Nav links | ✅ Pass | Nav links resolve on disk. |
| Visible content | ➖ N/A | CONTENT_MODE=invented |

### contact.html
| Check | Result | Detail |
|---|---|---|
| Console errors | ✅ Pass | None |
| Assets loaded | ✅ Pass | No failed images or videos. |
| Animations resolved | ✅ Pass | No elements stuck at opacity:0 after scroll to 50%. |
| Nav links | ✅ Pass | Nav links resolve on disk. |
| Visible content | ➖ N/A | CONTENT_MODE=invented |

## Issues List
```json
[]
```

## Screenshots Written
- /Users/delusionalmakubex/Documents/projects/design-system/design-system/cube-verge/landing-page/qa-screenshots/index-top.png
- /Users/delusionalmakubex/Documents/projects/design-system/design-system/cube-verge/landing-page/qa-screenshots/index-mid.png
- /Users/delusionalmakubex/Documents/projects/design-system/design-system/cube-verge/landing-page/qa-screenshots/index-bottom.png
- /Users/delusionalmakubex/Documents/projects/design-system/design-system/cube-verge/landing-page/qa-screenshots/platform-top.png
- /Users/delusionalmakubex/Documents/projects/design-system/design-system/cube-verge/landing-page/qa-screenshots/platform-mid.png
- /Users/delusionalmakubex/Documents/projects/design-system/design-system/cube-verge/landing-page/qa-screenshots/platform-bottom.png
- /Users/delusionalmakubex/Documents/projects/design-system/design-system/cube-verge/landing-page/qa-screenshots/solutions-top.png
- /Users/delusionalmakubex/Documents/projects/design-system/design-system/cube-verge/landing-page/qa-screenshots/solutions-mid.png
- /Users/delusionalmakubex/Documents/projects/design-system/design-system/cube-verge/landing-page/qa-screenshots/solutions-bottom.png
- /Users/delusionalmakubex/Documents/projects/design-system/design-system/cube-verge/landing-page/qa-screenshots/projects-top.png
- /Users/delusionalmakubex/Documents/projects/design-system/design-system/cube-verge/landing-page/qa-screenshots/projects-mid.png
- /Users/delusionalmakubex/Documents/projects/design-system/design-system/cube-verge/landing-page/qa-screenshots/projects-bottom.png
- /Users/delusionalmakubex/Documents/projects/design-system/design-system/cube-verge/landing-page/qa-screenshots/contact-top.png
- /Users/delusionalmakubex/Documents/projects/design-system/design-system/cube-verge/landing-page/qa-screenshots/contact-mid.png
- /Users/delusionalmakubex/Documents/projects/design-system/design-system/cube-verge/landing-page/qa-screenshots/contact-bottom.png
