# plane-cut — Concept by Image

## Visual Concept: Paper-Cut Layered Depth

The plane-cut design system is built on the principle of **kirigami-inspired layered paper** — depth achieved through stacking flat sheets at z-axis intervals, each casting a directional shadow onto the layer beneath it.

## Core Visual Language

**Layer stacking:** Multiple paper surfaces in graduated warm tones (#ffffff, #f0ebe3, #e8dfd3, #d5c9bc) are positioned at distinct z-axis levels. Shadow is the primary depth signal — not gradients, not photography. Each layer's box-shadow encodes its height above the ground plane.

**Geometric silhouettes:** Shapes are defined by clip-path polygon() cutouts — sharp-edged geometric forms that suggest a craft knife moving through paper. Hexagons, diamonds, stepped rectangles, and chevrons appear as CSS clip-path shapes, never as images.

**Accent cut color:** A single high-contrast terracotta (#c65d3a) or deep teal (#2d5a6b) pierces the warm paper palette. This color signals "cut-through" — the accent color represents the bold graphic moment where a paper cut reveals something beneath.

**Typography as print:** Cormorant Garamond references the tradition of quality printed matter on fine paper stocks. Text feels embossed, precise, and crafted. Labels in Inter at wide tracking reinforce the precision of the paper-cutting craft.

**No photography, no gradients on surfaces:** All visual interest comes from shape, shadow depth, and the tension between flat colored layers.

## Depth System (z-axis reading)

| Layer | Color | Shadow | Description |
|---|---|---|---|
| Ground | #f8f4ef | none | Page base — the table the paper rests on |
| Layer 1 | #f0ebe3 | 0 2px 8px | First sheet above ground |
| Layer 2 | #e8dfd3 | 0 4px 20px | Second sheet — medium elevation |
| Layer 3 | #d5c9bc | 0 8px 32px | Third sheet — deepest visible |
| Elevated | #ffffff | 0 12px 40px | Cards and interactive elements |
| Accent cut | #c65d3a | — | Cut-through highlight color |

## Section Geometry

Each section in the landing page **overlaps the next by 40px** using negative margin-bottom, creating the visual effect of one sheet of paper sliding under another. Combined with progressively increasing z-index values, this makes the scroll experience feel like lifting sheets from a paper stack.

## Reference Aesthetics

Chinese paper-cutting (jiǎnzhǐ) precision, mid-century Scandinavian graphic design, architectural model-making, premium stationery and print design.
