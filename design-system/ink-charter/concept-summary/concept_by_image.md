# plane-cut — Concept by Image

## Visual Concept: Paper-Cut Layered Depth

The plane-cut design system is built on the principle of **kirigami-inspired layered paper** — depth achieved through stacking flat sheets at z-axis intervals, each casting a directional shadow onto the layer beneath it.

## Core Visual Language

**Layer stacking:** Multiple paper surfaces in graduated neutral tones (#ffffff, #f0f0f4, #cccce1), edged with the border tone #cccce1, are positioned at distinct z-axis levels. Shadow is the primary depth signal — not gradients, not photography. Each layer's box-shadow encodes its height above the ground plane.

**Geometric silhouettes:** Every shape carries the memory of the blade that made it. Forms are defined by clip-path polygon() cutouts, but read them as physical events — the drag of a craft knife pressed into a sheet, the slight resistance of fiber, the clean parting of two edges that will never sit flush again. Hexagons, diamonds, stepped rectangles, and chevrons are not decorations laid on top of the surface; they are removals from it, negative acts cut into paper stock, and the eye feels the missing material as much as the shape that remains. Nothing here is drawn — everything is severed.

**Accent cut color:** A single high-contrast teal (#63cabe) — or, alternately, violet (#b79cff) or blue (#477cbe) — pierces the white paper palette. This color signals "cut-through" — the accent color represents the bold graphic moment where a paper cut reveals the navy ink (#1b1b37) beneath.

**Typography as print:** Cormorant Garamond references the tradition of quality printed matter on fine paper stocks. Text feels embossed, precise, and crafted. Labels in Inter at wide tracking reinforce the precision of the paper-cutting craft.

**No photography, no gradients on surfaces:** All visual interest comes from shape, shadow depth, and the tension between flat colored layers.

## Depth System (z-axis reading)

| Layer | Color | Shadow | Description |
|---|---|---|---|
| Ground | #f0f0f4 | none | Page base — the table the paper rests on |
| Layer 1 | #ffffff | 0 2px 8px | First sheet above ground |
| Layer 2 | #f0f0f4 | 0 4px 20px | Second sheet — medium elevation |
| Layer 3 | #cccce1 | 0 8px 32px | Third sheet — deepest visible |
| Elevated | #ffffff | 0 12px 40px | Cards and interactive elements |
| Accent cut | #63cabe | — | Cut-through highlight color |

## Section Geometry

Each section in the landing page **overlaps the next by 40px** using negative margin-bottom, creating the visual effect of one sheet of paper sliding under another. Combined with progressively increasing z-index values, this makes the scroll experience feel like lifting sheets from a paper stack.

## Reference Aesthetics

Chinese paper-cutting (jiǎnzhǐ) precision, mid-century Scandinavian graphic design, architectural model-making, premium stationery and print design.
