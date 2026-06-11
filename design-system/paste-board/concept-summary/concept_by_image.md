# paste-board — Visual Concept

## Aesthetic Identity

Scrapbook collage aesthetic — the visual language of a beautifully curated mood board. Warm paper surfaces with cut-out elements layered at slight rotations, as if physically assembled by hand. The tension between handwritten annotation type (Caveat) and editorial print type (Playfair Display) mirrors the contrast between a personal diary and a magazine.

## Key Visual Signatures

**Paper surfaces.** Three tiers of warm cream — page background (#f5f0e8), lighter surface (#fff8e7), mid-tone paper (#ede4d3). No cool greys. Everything feels printed on warm stock.

**Card rotations.** All content cards tilt ±2 degrees. Alternating directions via :nth-child. The overall page breathes with casual energy — nothing is perfectly aligned, yet everything is intentional.

**Tape motifs.** Semi-transparent yellow (#ffd54f at ~70% opacity) strips applied at corners or across elements via ::before pseudo-elements, rotated ~4 degrees. The tape holds the collage together visually.

**Polaroid frames.** White border on top and sides, thick white border on bottom (classic Polaroid proportions — ~40px bottom pad). Slight drop shadow. Caveat annotation written below the image area.

**Sticky notes.** Square yellow (#ffd54f) cards with Caveat bold text, rotated ~-1 to -3 degrees. Used for "How it works" steps and callout facts.

**Torn edges.** CSS clip-path polygon with irregular, non-uniform bottom/top edges on section dividers and the footer. Simulates torn paper.

**Paper drop shadows only.** box-shadow: 3px 3px 8px rgba(0,0,0,0.12) — never coloured glow or hard pixel shadows. Shadows always reference the paper-on-surface metaphor.

**Colour palette.** Warm off-white page (#f5f0e8) + terracotta accent (#e85d2f) + sage secondary (#3d6b4f) + sticky-note yellow (#ffd54f). Muted and warm — no digital neons.

**Typography contrast.** Caveat (casual handwriting) for hero h1 and annotations creates an intimate, personal voice. Playfair Display (editorial serif) for h2 and pull quotes adds a crafted, printed quality. Lora for body feels warm and bookish.

## Spatial Logic

Elements overlap. Negative margin-top on select collage cards creates layering. The pinboard hero uses absolute positioning to scatter items across the surface, then GSAP assembles them on scroll. The overall feel: a vision board being constructed in real time.
