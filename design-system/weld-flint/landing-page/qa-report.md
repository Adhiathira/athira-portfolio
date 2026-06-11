# QA Report — Ferren / weld-flint

**Run date:** 2026-04-04
**QA iterations:** 1 of 3
**Issues found:** 0 blocking

## Pages verified

| Page | Status | Nav active | Console errors |
|---|---|---|---|
| index.html | ✓ | Logo only (correct) | 5 expected 404s (ungenerated assets) |
| systems.html | ✓ | Systems dimmed correctly | 4 expected 404s |
| process.html | ✓ | Process dimmed correctly | 5 expected 404s |
| specifications.html | ✓ | Specifications dimmed correctly | 0 |
| contact.html | ✓ | Contact dimmed correctly | 1 expected 404 |

## Console errors

All console errors are asset 404s (`assets/*.jpeg`, `assets/*.mp4`). These are expected:
- `ASSET_MODE=generated`, Steps 7–8 skipped per caller instruction
- `onerror` handlers fire correctly — placeholders display the asset path
- No JavaScript errors, no CSS parse errors, no broken links

## Visual verification

- **Hero:** Full-viewport dark section with video placeholder visible, Figtree 0.06em letter-spacing correct, large headline renders at expected scale
- **Light sections:** #f2f2f2 background renders correctly on numbers strip, systems grid, features split — correct light-dominant rhythm
- **Dark contrast beats:** Intro, process band, testimonial, CTA band — correct alternation
- **Nav:** Fixed black nav, all 4 links render, active state (opacity 0.45) fires correctly on each sub-page, "REQUEST QUOTE" CTA renders with border
- **Forms (contact):** Two-column name row, email, company, inquiry type select, textarea, submit button — all rendered correctly
- **Spec tables:** Two-column key/value rows with hairline separators — correct
- **Typography:** Figtree loaded (headings), Nunito loaded (body) — confirmed via render
- **Responsive:** CSS breakpoints at ≤900px and ≤600px present in all component files

## Unresolved issues

None. Site is functional end-to-end with placeholder assets.
