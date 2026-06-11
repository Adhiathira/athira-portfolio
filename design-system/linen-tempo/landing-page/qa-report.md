# QA Report — Ardenne Supply Co. Landing Page

**Design system:** linen-tempo
**Output path:** `linen-tempo/landing-page/`
**QA date:** 2026-04-03
**Server:** Python HTTP on port 9876
**Pages tested:** index.html, collection.html, journal.html, about.html

---

## Summary

All 4 pages pass QA. One real error was found and fixed during the session (SVG transform syntax). All remaining console errors are expected asset 404s due to ASSET_MODE=generated (no assets have been generated yet — prompts written, assets pending Higgsfield/Kling generation).

**Result: PASS**

---

## Page-by-Page Results

### index.html — Gear for the Long Way

| Check | Result |
|---|---|
| Console errors | 9 (all asset 404s — expected) |
| Stuck animations at 50% scroll | 0 |
| Nav links resolve | index.html, collection.html, journal.html, about.html — all files confirmed |
| Hero renders | PASS — sky blue bg, terrain SVG grid, ghost "WILD" text, Lora/Jakarta type |
| Collection preview renders | PASS — bento 1.4fr 1fr 1fr grid, placeholder icons |
| Philosophy section renders | PASS — dark navy (#25446B), numbered pillars with border-left |
| Journal teaser renders | PASS — cream bg, 1.5fr 1fr article split |
| Contact CTA renders | PASS — cream bg, two CTAs |
| Footer renders | PASS — navy bg, 4-column grid, social icons, copyright |

### collection.html — Collection

| Check | Result |
|---|---|
| Console errors | 9 (all asset 404s — expected) |
| Stuck animations at 50% scroll | 0 |
| Nav active state | PASS — "COLLECTION" correctly bold/dim |
| Hero renders | PASS — left-anchored heading, correct eyebrow |
| Filter tabs render | PASS — pill style, "ALL GEAR" active (navy fill) |
| Category headers render | PASS — numbered 01/02/03 prefix in orange |
| Product cards render | PASS — 3-column grid, weights, "LEARN MORE" CTAs |
| "NEW SEASON" badge renders | PASS — forest green badge on Brume Softshell card |
| Footer renders | PASS — consistent with index |

### journal.html — Journal

| Check | Result |
|---|---|
| Console errors | 7 (all asset 404s — expected) |
| Stuck animations at 60% scroll | 0 |
| Nav active state | PASS — "JOURNAL" correctly dim/active |
| Hero renders | PASS — left-anchored, cream bg |
| Category strip renders | PASS — ALL/ROUTE REPORTS/GEAR REVIEWS/TECHNIQUE/DISPATCHES, ALL underlined |
| Feature article renders | PASS — horizontal split, "Seven days in the Torngat" in Lora |
| Article grid renders | PASS — 3-column masonry, 6 cards, category tags in orange |
| Footer renders | PASS — consistent |

### about.html — About

| Check | Result |
|---|---|
| Console errors | 4 (all asset 404s — expected) |
| Stuck animations at 50% scroll | 0 |
| Nav active state | PASS — "ABOUT" correctly dim/active |
| Hero renders | PASS — sky blue bg, ghost "ARDENNE" letterform behind heading |
| Origin section renders | PASS — cream bg, asymmetric 2-col split |
| Values section renders | PASS — accordion-style numbered rows |
| Team section renders | PASS — 3fr/2fr grid, Sébastien (large) + Marie-Claude + David cards |
| Footer renders | PASS — consistent |

---

## Errors Found and Fixed

### SVG `<rect>` invalid transform attribute (FIXED)

- **File:** `index.html`
- **Error:** `<rect> attribute transform: Expected transform function, "perspective(400)…"`
- **Cause:** CSS 3D transform syntax (`perspective(400) rotateX(20deg)`) used in an SVG `transform` attribute. SVG transforms only support 2D matrix operations.
- **Fix:** Removed the `transform` attribute from the `<rect>` element. Visual perspective effect is achieved via manually-drawn convergence lines in the SVG `<line>` elements.
- **Status:** FIXED

---

## Expected Asset 404s (not errors)

All image and video `src` references are placeholders pending asset generation. Each `<img>` element has an `onerror` handler showing a contextual emoji placeholder. All video elements gracefully degrade without sources.

Assets pending generation (see `prompts/` directory):
- 2 videos — `hero-bg.mp4`, `services-ambient.mp4` (Kling 2.6 prompts)
- 27 images — collection cards, product items, journal covers, team portraits, origin story (Higgsfield Nano Banana Pro prompts)

---

## Animation Verification

All GSAP ScrollTrigger animations confirmed working across all pages. No elements stuck at `opacity: 0` at mid-scroll position on any page. Animation variety maintained:

| Page | Animation patterns used |
|---|---|
| index.html | cascade stagger, sweep-x, clip reveal, scale-rise |
| collection.html | clip-from-left, vertical stagger, rotate-rise |
| journal.html | x-sweep, divergent (image/content split), scale-rise |
| about.html | cascade, divergent, vertical stagger, rotate-rise |

---

## Design Token Fidelity

| Token | Expected | Observed |
|---|---|---|
| Page background | #FFF7E9 | PASS (cream) |
| Primary bg (hero) | #BBE2EE | PASS (sky blue) |
| Footer/philosophy bg | #25446B | PASS (dark navy) |
| Accent color | #f16224 | PASS (orange on category tags, active nav) |
| Heading font | Lora | PASS (serif headings throughout) |
| Body font | Plus Jakarta Sans | PASS (all body copy) |
| Nav height | ~36px | PASS |
| Nav alignment | centered | PASS (wordmark centered, links right) |
