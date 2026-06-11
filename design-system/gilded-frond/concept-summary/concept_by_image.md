# Gilded Frond — Concept by Image

## Visual Identity

This is a design system for a luxury textile atelier — **Atelier Botanica** — whose identity is rooted in the hand processes of natural dyeing, botanical weaving, and heritage loom craft. The design language draws from Art Nouveau's grammar of ornament: organic line, gold as primary accent, deep sage as counterweight, and white as the gallery wall against which all material things are displayed. Nothing is utilitarian; everything is considered.

## Color Register

The palette is deliberately restraint-meets-opulence. Pure white (`#ffffff`) functions as the primary surface — not cold or clinical, but the kind of white that exists on archival paper, sun-bleached linen, and gallery plaster. Against it: a warm antique gold (`#b0915b`) that reads as aged gilding rather than brash metallism, and a deep botanical sage (`#3f4d33`) that arrives with the authority of old pigment. Headings in `#092222` (darkest teal-black) give the typography a mineral depth, as though inked rather than printed.

## Typography Composition

Playfair Display italic at 96px functions as editorial capital — large, unhurried, slightly asymmetric in its serifs. It is always tilted, never roman; this is a conscious Art Nouveau affectation borrowed from Mucha posters and the masthead typography of fin-de-siècle publications. Body text in Lora maintains the serif tradition at reading size. Cormorant Garamond handles navigation and supporting headings, its extreme thin-to-thick contrast suggesting hand calligraphy. Dancing Script appears sparingly — captions, process notes, botanical names — where a human touch should be audible.

## Spatial Composition

The grid is generous by design. Maximum width at 1600px means gilded-frond rewards large monitors with room to breathe. Section padding at 128px top and bottom creates what the system calls "theatrical framing" — each content zone arrives as a stage, not a container. The `salon-framed` component overlays Art Nouveau corner flourishes via CSS pseudo-elements, mimicking the architectural detail of exhibition frames and vitrine glass. Grid gap at 36px slightly exceeds the 28px gutter, reflecting the Japanese concept of *ma* — negative space as an active design element, not a byproduct.

## Ornamental Language

The `salon-split` layout asymmetrically divides content seven-to-five with a 2px gold hairline divider — a direct quotation from the decorative borders found in Exposition Universelle catalogues and luxury auction house layouts. Corner flourishes on `.salon-framed` elements are 24×24px L-brackets with gold strokes, offset inward so they hover at the outer boundary of the component. The effect is archival, as though every card is a specimen label.

## Material Surface References

Textile surface cards use the `.salon-framed` component to echo the look of mounted fabric swatches. The deep sage sections (`#3f4d33`) function as the velvet-lined interiors of display cases — the color that museum conservators choose when they want an object to read as precious. On these sections, gold type and gold dividers achieve maximum contrast while maintaining the color family coherence that makes the palette feel chosen rather than assembled.

## Layout Patterns in Context

The `salon-feature` pattern (column 2, spanning 8) creates editorial content with flanking negative space — text that does not stretch wall-to-wall. `salon-narrow` (columns 3–10) is for the tightest text, used when the content is purely reading: provenance notes, care instructions, maker's statements. `salon-wide` offers the near-full canvas for photography and textile documentation imagery, still affording a single column of negative space on each side to prevent the image from touching the viewport edge.
