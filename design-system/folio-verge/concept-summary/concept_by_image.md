# Concept Summary — folio-verge

**Source system:** prabal-gurung
**Tone twist:** C — Material shift
**Concept Enhancer:** Applied — specificity increased, type scale relationships named, grid proportions quantified, resistance paragraph added

---

## Named Entity

**Verge & Signal** — a private publication platform for independent art directors who work between editorial, institutional, and commercial contexts. Not a portfolio tool. A publishing instrument: the kind of system used to produce a biannual journal that arrives in a matte-laminated envelope with no barcode. The discovery quality: it was built by a single art director over three years without public announcement and now quietly powers 14 independent publications across Europe and Japan.

---

## Typographic Architecture — Specific Relationships

The type scale is built on a structural asymmetry between announcement and continuation. Archivo at 600 weight governs display (80px / 88.32px leading, −3.6px tracking) and heading (49px / 57.2px leading, −1.2px tracking). The ratio between display and heading is 1.63:1 — close to a minor third stack but not precisely that, which is what gives the scale a found quality rather than a system quality. It was not designed from a modular scale; it was landed on by measurement.

The critical relationship: display letter-spacing at −3.6px against body tracking at −0.3125px. At 80px, negative tracking brings the display characters into physical contact at the counter edges — the word-shapes compress without colliding. At 18px, the same logic at −0.3125px reads as refinement rather than compression. The system uses the same directional principle (always negative tracking) across two scales that are 4.4× apart, which means the *feel* of the type hierarchy is coherent even when no shared values are visible.

Inter at 500 weight runs the body and UI layer. Its weight difference from Archivo 600 is not dramatic (one step), but the transition between the two typefaces is complete at the family level — different skeleton, different rhythm, different proportion system — which prevents the scale from reading as a single-family system with weight variation.

The `--font-letter-spacing-heading` token (0.06em) applies specifically to section headings and overrides the negative tracking token at that size, producing the only positive-tracking moment in the system. It reads as an intentional exhale between the compressed display and the closely tracked body.

---

## Grid Proportions — Quantified

Container at 1220px with 77px horizontal padding creates an inner reading column of 1066px. At 1440px viewport, the resulting lateral margin on each side is 187px — wider than the container padding itself. This means the page carries more air in the wings than in the column padding, which is the inverse of most content-dense layouts. The grid reads as inset, held, suspended within a wider page field.

The 4-column grid at 56px column gaps and 22px row gaps produces columns of approximately 218px at full width — each column is slightly narrower than a standard editorial column at A4 scale (typically 230–240px equivalent), which compresses content into narrower cells and generates more inter-column white space per unit of content area.

The 3-column variant produces columns of approximately 300px — a more comfortable reading width for mixed image-text cards, which is where the editorial card grid lives.

---

## Material Character and Tactile Register

The chromatic architecture of this system has the physical quality of ink on uncoated stock. The white ground (#ffffff) is not the cool white of a screen at full brightness — it reads as the near-white of a matte surface: something to press against, not to emit light from. The acid green heading accent (#81b81a) behaves like a spot color registration mark: precise, chemical, placed with the same intentionality as a fluorescent ink pass on a letterpress sheet. The violet primary (#533afd) carries the specific density of a deep-pigment offset ink — it does not glow; it saturates. The pale lavender border (#d6d9fc) is the color of a slightly aged registration guide printed in blue — the production artifact that shows process.

The motion system extends this material register. All durations are scaled to 1.5× the source baseline. At 0.975s for emphasis animations and 0.45s for panel interactions, the system moves the way heavy paper moves when leafed: with resistance, not friction. The spring easing (`cubic-bezier(0.68, -0.55, 0.265, 1.55)`) is reserved for search and interactive widget expansion — the one moment where the system acknowledges its digital substrate.

---

## Spatial Logic — Quantified

Section spacing at 480px top margin and 192px internal row gap is not decorative — it is the spatial equivalent of a chapter break in a well-typeset book, a deliberate halt in flow that resets the reader's attention. The hero paddingBottom at 777.6px enforces a pause longer than the visible viewport on most screens. On a 900px tall screen, the hero content sits within the top 122.4px of space above the break — approximately 14% of the hero zone. The reader must scroll through 878px of white before reaching the next section. This is architecture, not CSS.

---

## Resistance to Categorization

This system refuses its obvious neighbors. It shares Archivo's condensed authority with SaaS platforms that use it for marketing sites, but the immersive section spacing and spot-color accent mark it as foreign to the growth-hacking context where Archivo typically appears. It shares the light-on-white palette with luxury fashion editorial, but the violet-blue primary and the structural use of Inter betray a tool-making sensibility — something engineered rather than curated. It is not a design portfolio system (the grid is too functional, the type too utilitarian), not a publication CMS (the motion and interaction layer is too light, the button system too SaaS-inflected), and not a brand identity system (the color palette is too restrained and the logo treatment too neutral). It exists in the interstice between these categories, which is precisely where independent publishing tools tend to live: serious without being precious, structured without being rigid.
