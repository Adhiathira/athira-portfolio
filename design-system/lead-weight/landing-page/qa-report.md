# QA Report

Generated: 2026-04-05T12:24:00Z
Iteration: 1 of 3

## Summary
- Pages checked: 5 (index.html, work.html, process.html, about.html, contact.html)
- Issues found: 2 (0 critical, 2 warnings)
- Screenshots: /Users/delusionalmakubex/Documents/projects/design-system/design-system/lead-weight/landing-page/qa-screenshots/

## Static File Checks (all pages)

| Check | Result | Detail |
|---|---|---|
| `opacity: 0` in CSS | ⚠️ Warning | `components/nav.css:170` — `.site-nav.nav-mobile-open .nav-mobile-toggle span:nth-child(2) { opacity: 0; }` — this is the hamburger middle-bar X-state, a UI interaction toggle, not a stuck animation. Acceptable but noted. |
| `<style>` blocks in HTML | ✅ Pass | None found in any HTML file |
| `style=""` inline attributes | ✅ Pass | None found in any HTML file |
| `box-shadow` in CSS | ✅ Pass | Only occurrence is `box-shadow: none` in `nav.css:18` — a reset, not an applied shadow |
| GSAP CDN (3.12.5) | ✅ Pass | All pages load from `cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/` |

## Per-Page Results

### index.html
| Check | Result | Detail |
|---|---|---|
| Console errors | ⚠️ Warning | 3 video asset 404s: `assets/hero-type-motion.mp4`, `assets/editorial-pages.mp4`, `assets/letterpress-craft.mp4` — placeholder divs present but `display:none` (onerror not fired; browser stalls videos rather than erroring) |
| Assets loaded | ✅ Pass | No broken images. Videos 404 but placeholder divs exist per spec. Onerror diagnostic pattern is in place. |
| Animations resolved | ✅ Pass | No sections stuck at opacity:0 after scroll to 50% |
| Nav links | ✅ Pass | All links resolve — index.html, work.html, process.html, about.html, contact.html all exist on disk |
| Active nav | ⚠️ Warning | No `nav-link--active` class set on any nav link for index.html. The homepage has no self-referencing active state on the logo or nav links. |
| Visible content | ➖ N/A | CONTENT_MODE=invented |

### work.html
| Check | Result | Detail |
|---|---|---|
| Console errors | ✅ Pass | None |
| Assets loaded | ✅ Pass | No broken images or videos |
| Animations resolved | ✅ Pass | No sections stuck at opacity:0 after scroll |
| Nav links | ✅ Pass | All nav links resolve to existing files |
| Active nav | ✅ Pass | `nav-link--active` on Work (desktop + mobile) |
| Visible content | ➖ N/A | CONTENT_MODE=invented |

### process.html
| Check | Result | Detail |
|---|---|---|
| Console errors | ✅ Pass | None |
| Assets loaded | ✅ Pass | No broken images or videos |
| Animations resolved | ✅ Pass | No sections stuck at opacity:0 after scroll |
| Nav links | ✅ Pass | All nav links resolve to existing files |
| Active nav | ✅ Pass | `nav-link--active` on Process (desktop + mobile) |
| Visible content | ➖ N/A | CONTENT_MODE=invented |

### about.html
| Check | Result | Detail |
|---|---|---|
| Console errors | ✅ Pass | None |
| Assets loaded | ✅ Pass | No broken images or videos |
| Animations resolved | ✅ Pass | No sections stuck at opacity:0 after scroll |
| Nav links | ✅ Pass | All nav links resolve to existing files |
| Active nav | ✅ Pass | `nav-link--active` on About (desktop + mobile) |
| Visible content | ➖ N/A | CONTENT_MODE=invented |

### contact.html
| Check | Result | Detail |
|---|---|---|
| Console errors | ✅ Pass | None |
| Assets loaded | ✅ Pass | No broken images or videos |
| Animations resolved | ✅ Pass | No sections stuck at opacity:0 after scroll |
| Nav links | ✅ Pass | All nav links resolve to existing files |
| Active nav | ✅ Pass | `nav-link--active` on Contact CTA (desktop + mobile) |
| Visible content | ➖ N/A | CONTENT_MODE=invented |

## Issues List
```json
[
  {
    "file": "index.html",
    "type": "broken-asset",
    "detail": "3 video assets 404: assets/hero-type-motion.mp4, assets/editorial-pages.mp4, assets/letterpress-craft.mp4. The onerror handler is present on all three <video> elements but the browser stalls rather than firing onerror, so placeholder divs remain display:none. Assets directory exists but video files are absent.",
    "severity": "warning"
  },
  {
    "file": "index.html",
    "type": "css-missing",
    "detail": "No nav-link--active class applied to any nav link on index.html. The homepage has no active state — the logo link (index.html) has no active class, and none of the nav-links are marked active. All other pages correctly mark their own link as active.",
    "severity": "warning"
  }
]
```

## Screenshots Written
- /Users/delusionalmakubex/Documents/projects/design-system/design-system/lead-weight/landing-page/qa-screenshots/index-top.png
- /Users/delusionalmakubex/Documents/projects/design-system/design-system/lead-weight/landing-page/qa-screenshots/index-mid.png
- /Users/delusionalmakubex/Documents/projects/design-system/design-system/lead-weight/landing-page/qa-screenshots/index-bottom.png
- /Users/delusionalmakubex/Documents/projects/design-system/design-system/lead-weight/landing-page/qa-screenshots/work-top.png
- /Users/delusionalmakubex/Documents/projects/design-system/design-system/lead-weight/landing-page/qa-screenshots/work-mid.png
- /Users/delusionalmakubex/Documents/projects/design-system/design-system/lead-weight/landing-page/qa-screenshots/work-bottom.png
- /Users/delusionalmakubex/Documents/projects/design-system/design-system/lead-weight/landing-page/qa-screenshots/process-top.png
- /Users/delusionalmakubex/Documents/projects/design-system/design-system/lead-weight/landing-page/qa-screenshots/process-mid.png
- /Users/delusionalmakubex/Documents/projects/design-system/design-system/lead-weight/landing-page/qa-screenshots/process-bottom.png
- /Users/delusionalmakubex/Documents/projects/design-system/design-system/lead-weight/landing-page/qa-screenshots/about-top.png
- /Users/delusionalmakubex/Documents/projects/design-system/design-system/lead-weight/landing-page/qa-screenshots/about-mid.png
- /Users/delusionalmakubex/Documents/projects/design-system/design-system/lead-weight/landing-page/qa-screenshots/about-bottom.png
- /Users/delusionalmakubex/Documents/projects/design-system/design-system/lead-weight/landing-page/qa-screenshots/contact-top.png
- /Users/delusionalmakubex/Documents/projects/design-system/design-system/lead-weight/landing-page/qa-screenshots/contact-mid.png
- /Users/delusionalmakubex/Documents/projects/design-system/design-system/lead-weight/landing-page/qa-screenshots/contact-bottom.png
