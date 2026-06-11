# Quill Plane — Concept by Image

## Named Entity

**Quill Plane Instrument Co.** — a precision calibration tools manufacturer founded in 1971 in Stroud, Gloucestershire, originally supplying the British hand-papermaking revival with tools for measuring sheet formation: thickness gauges, formation testers, and folding endurance rigs. Acquired in 1998 by a private trust and never modernized. Still produces the QP-7 Fold Endurance Tester and the QP-12 Thickness Comparator for conservation studios, archival binderies, and the handful of remaining European mills using cylinder mould formation. Their website does not exist yet. It should.

## Brand Premise

Quill Plane Instrument Co. exists in the gap between scientific instrument manufacturers (who design for laboratories) and craft tool suppliers (who design for workshops). The QP instruments require both — they live on the bench alongside bone folders and paring knives but calibrate to ISO 5626 and TAPPI T511. The site's design registers this dual identity precisely: a light gray dominant palette drawn from uncoated 120gsm stock, editorial Lora serif headings that read like hand-set type proofed on dampened paper, and Inter grotesque delivering specifications at the controlled regularity of a measurement printout. The design does not perform heritage warmth. It demonstrates the kind of rigorous attention that earns trust among people who know that a 0.3mm variance in a folding score can ruin a first-edition binding.

## Color Architecture

The dominant surface is a warm pale gray (#f2f2f2) — the precise tone of uncoated 120gsm Rives BFK viewed under diffused north light at approximately 4000 lux. This is not a neutral placeholder: it is the chosen background that places the system in immediate material relationship with what QP instruments measure. Near-black charcoal (#202020) anchors all headings, while pure black (#000000) grounds body text and navigation — two distinct registers of dark that read as control marks on a calibration sheet: one printed, one struck. Warm greige (#b1ada7) appears as muted labeling — the tone of a 4H pencil mark on cartridge paper, not yet erased. The CTA system uses black-on-white and transparent-on-field combinations, never introducing chromatic interruption. The coolest value in the system (#e9e9eb) surfaces only in card backgrounds, providing a barely-perceptible depth shift equivalent to a sheet held against board. The palette works precisely because it refuses color: there are no accent hues because QP instruments have no aesthetic ambition. They measure.

## Typography System

Lora (serif, 400/500 weight) anchors all display and editorial content. Its moderate stroke contrast — hairline serifs at approximately 1:5 thick-to-thin ratio — registers like letters set in 10pt Bembo on dampened 90gsm cartridge stock: warm, weighted, undecorated. Headings carry `--font-letter-spacing-heading: 0.06em`, which opens the serifs to their full optical mass.

Exact type scale ratios (h1 → body = 3.3:1 major third cascade):
- h1: 52.8px / 58.08px (leading ratio 1.10) — display headline
- h2: 40px / 48px (leading ratio 1.20) — section titles
- h3: 28px / 36px (leading ratio 1.29) — sub-section markers
- body/p: 16px / 1.65 (26.4px) — primary reading text
- button: 13px / 1.4 — functional labels
- nav: 14px (0.875rem) / 15.4px (0.9625rem) — uppercase at 0.08em tracking

The progression h1 → h2 → h3 follows a ratio of approximately 1.32:1.43, close to a perfect fourth without declaring itself a scale. Inter (sans-serif, 400/500 weight) governs all functional text. The pairing is deliberate: Lora sets the intention — the product philosophy, the heritage claims, the engineering rationale — and Inter delivers the instruction — the specifications, the navigation, the form labels. Navigation inherits from the type system root without overriding it.

## Spatial System

The container maxes at 1306px — a deliberately editorial constraint derived from reducing the source 1536px by 15% to match the column proportions of a B1 sheet at 100gsm. On a standard 1440px display, this creates 67px of white field on each side, framing the content like a page within a page. The gap values at breakpoint 1280px run at 90px — exactly the column gutter of a 12-column grid at 1306px with 20px margins, producing a primary column width of approximately 75px per unit or 225px for a 3-column editorial block. The hero occupies 68px top and bottom padding — a breathing chamber at the ratio of 1:19 of the container width, positioning the brand register as publication rather than product grid. Section rhythm follows two-column asymmetric architecture with occasional full-width centred headers, structural decisions drawn directly from the QP Instrument Co. catalogue printed by Westonbirt Press in 1983: left column for image/diagram, right column for specification table and editorial paragraph.

## Material Identity

The QP-12 Thickness Comparator has a cast aluminum body with a matte powder coat in BS 10 B 17 (pale warm gray, approximately Pantone Cool Gray 1) and stainless steel contact faces. When you hold it, the combination of the casting's weight (870g), its matt surface, and its audible click at zero position transmits the same register as the design system: controlled, repeatable, without ornament. The design system's #f2f2f2 background is not a design decision. It is a material fact. The instruments and the page share the same surface temperature.

## What Makes This System Unmistakably Itself

Three things together make quill-plane irreducible from any other light-palette system: (1) The page background is the exact tone of the product's operating context — uncoated paper stock under north light — making the surface a claim about what QP instruments do rather than about how the brand wants to be perceived. (2) The 3.3:1 type scale ratio between h1 and body text is a classic broadside proportion, historically used in printed ephemera where text and instruction needed to coexist in a single reading field without either overwhelming the other. (3) The motion system's 1.125s transition duration at cubic-bezier(0.4, 0, 0.2, 1) — the Material Design "standard" curve at 2.5× its typical speed — resolves every hover at the tempo of a careful fold: measured, irreversible, exact.
