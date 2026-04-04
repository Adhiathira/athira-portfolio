## Visual Identity

The palette operates in extreme restraint: pure black (`#000000`) on white (`#ffffff`) as the primary surface, with a single anomalous accent — deep navy-indigo (`#182c59`) for link color, a chromatic interjection that reads more institutional than decorative. The typographic system is built on a deliberate hierarchy of registers: **Playfair Display** at weight 800 for display headings (raised from the source's 600, lending a denser, more pressurized quality to the largest type) against **Open Sans** (geometric humanist) for body copy and **Raleway** (geometric sans with high elegance at light weights) for editorial labels and buttons. The interplay between a heavy serif display and a lightweight sans creates structural tension — the page breathes in sans, announces in serif. Motion is slow and considered: primary transitions at 2.47 seconds with `ease-in-out`, a timing that suggests deliberate reading rather than interface responsiveness.

The material character of this system evokes something tactile and pressbound: the weight of the Playfair Display at 800 has the density of letterpress ink on heavy stock, where ink squish creates optical weight that exceeds what the point size alone would suggest. The white field is not digital white — it carries the grain of uncoated paper, a surface that accepts rather than reflects.

`★ Insight ─────────────────────────────────────`
The Playfair Display 800 / Open Sans 400 pairing is a contrast not just of weight but of origin: Playfair was designed to reference 18th-century transitional typefaces (sharp contrast strokes, bracketed serifs), while Open Sans was engineered for screen legibility. The system holds two centuries of typographic intent in the same block.
`─────────────────────────────────────────────────`

---

## Hero Section

The hero occupies extreme vertical space: 192px padding top and bottom (50% more than the system baseline, the maximum editorial breathing room this spacing scale allows), creating a field of silence around the headline before content begins. The Playfair Display headline at 800 weight and 55px anchors the center of that silence — not as decoration but as a load-bearing element. The white background is absolute: no gradient, no texture rendered through CSS, no atmospheric overlay. The text-on-white contract is made through weight and letter-spacing (0.04em) rather than color variation. Navigation rides the top edge as transparent until scrolled, at which point a white field appears with a 1px bottom border at 10% opacity — a structural signal rather than a visual assertion.

---

## Content Sections

Below the hero, sections shift into a 12-column grid constrained to 1320px — an editorial width derived from reduction (the source system had no meaningful max-width; this design adds one as a structural principle). Content grids alternate between `1fr 1fr` symmetric feature layouts and `2fr 1fr` editorial splits, preventing the eye from settling into a fixed rhythm. Section padding holds at 96px top and bottom — generous but not as extreme as the hero, establishing a two-tier hierarchy of spatial emphasis. Body text in Open Sans at 14px / 23.8px line-height produces a reading tempo that matches the slow motion system: unhurried, precise, aware of its own measure. Link interactions carry a 2px focus outline — not decorative, an accessibility decision that doubles as a visible marker of the system's precision.

`★ Insight ─────────────────────────────────────`
The 1320px container is a deliberate editorial constraint. Most contemporary design systems push containers toward 1440px or full-bleed; the narrower field creates a column that behaves more like a printed page width relative to a 1920px monitor — the negative space becomes active, not empty.
`─────────────────────────────────────────────────`

---

## Footer Section

The footer closes quietly: Raleway in uppercase at 0.04em letter-spacing, matching the button register used throughout the body. No color inversion, no dark footer contrast band — the page ends as it begins, in white. The nav-level typography (Open Sans, 14px, 0.08em letter-spacing, uppercase) makes footer links read identically to navigation, suggesting that the site's wayfinding apparatus is continuous rather than sectioned. The terminal gesture is typographic, not visual.

---

## Design Principles

- **Serif weight as the primary signal**: Playfair Display at 800 is not decoration — it is the highest-contrast element on a white page, heavier than any rule or border the system employs.
- **Slow time**: 2.47-second transitions enforce a reading pace that resists skimming; the system does not animate to entertain but to acknowledge.
- **Constrained container as editorial act**: 1320px max-width is not a technical limit but a compositional decision — the margins earn their width.
- **Uppercase + letter-spacing as register marker**: Raleway and Open Sans in uppercase with 0.04–0.08em spacing create a secondary register used for navigation, labels, and CTAs — structurally distinct from the Playfair Display display register and the Open Sans body register.
- **Focus states as precision markers**: 2px solid outline with 2px offset is not a default accessibility checkbox — it is visually consistent with the 1px rule system and the general preference for precise, thin structural lines.

---

## Distinctive Qualities

The most distinctive decision is the relationship between heading weight and motion pace. Playfair Display at 800 weight carries enough optical mass that it reads as a fully formed object on the page — not type sitting on a surface but type constituting the surface. The 2.47-second transition duration then enforces a temporal density that matches: you read at the pace the type occupies space. This is unusual in contemporary digital design, where heading weight and motion speed are treated as independent axes; here they are calibrated against each other.

The letter-spacing in the nav system (0.08em) is the third register marker after Playfair's weight and the page's whiteness — small caps logic applied to nav without actually using small caps, creating a micro-institution out of the navigation bar.
