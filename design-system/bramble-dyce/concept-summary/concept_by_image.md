# Bramble & Dyce — Concept by Image

## Brand Premise

Bramble & Dyce is a single-estate botanical press operating from a converted stone mill on the Orkney Islands, producing hand-pulled letterpress prints of indigenous plant specimens — sea thrift, yellow rattle, bog cotton, common stonecrop — in strictly limited editions of forty per print, four releases per year. Subscriptions open once each season; a waiting list of approximately 180 names exists for the winter release. The site's visual argument is that restraint and precision are not the same thing as minimalism: every element on the page earns its position through the logic of the press — ink weight, registration, impression — and nothing appears that does not serve the work. The palette is warm bone and linen derived from uncoated cotton stock; the typography pairs Cormorant Garamond at display scale (the weight of letterpress impression in serif form) with Inter uppercase in tight small-scale tracking for all utility text. The composition never shouts. It waits.

The site reads as something that already exists somewhere in a browser tab kept permanently open by someone who knows what they are looking at. It does not explain itself. It does not need to.

## Color Architecture

The palette is entirely light-register, derived from the warm neutrals of a letterpress workshop: uncoated cotton paper (#f9f7f4), deckle-edge warm linen (#f3f1ed), bone (#ede8e1), aged vellum (#e8e2d9). All eight surface values pass luminance > 190. The single dark note — deep umber (#1a1714) for headings and CTA backgrounds — is the ink in the system: it appears sparingly, with the precision of a single well-inked forme on a white sheet. There are no accent colors, no blues or greens for interactive states. All affordances are expressed through weight, tracking, and surface lift rather than hue change.

**Proportions:** Page background (#f9f7f4) occupies approximately 70% of visible surface area. Surface warm (#ede8e1) and bone (#e8e2d9) appear in roughly equal parts at 10–12% each for card and section backgrounds. Umber heading text (#1a1714) appears at display scale only, commanding 5–8% of the visual field at any scroll position. The warm border (#c9c3bb) as a 1px rule is present throughout the page as a structural element — separating nav from hero, specimen cards from their labels, footer from body — but never appears as a decorative flourish. The single dark umber surface (#2c2318 on CTA buttons) appears once per section maximum, with a ratio of roughly 1:40 ink-to-paper by surface area, mirroring the actual ink coverage of a well-pulled letterpress impression.

**Type ratios:** Display (80px/84px, weight 300, Cormorant) to body (16px/26px, weight 400, Inter) gives a 5:1 scale ratio — wider than conventional, which makes the serif headlines read as printmaker's marks rather than web headings. The italic subheading at 28px (Cormorant, weight 400 italic) bridges display and body without introducing a third family. The Latin binomial label (Inter 11px uppercase, 0.12em tracking) anchors every specimen card as a taxonomic marker — this smallest text size performs the most specific identifying work, which is the correct hierarchy for a naturalist press.

## Typography System

Cormorant Garamond Light (300) at display and heading scales carries the site's editorial authority. Its extreme contrast between thick strokes and hairline serifs at large sizes reads as letterpress impression — the same pressure-weight quality that appears in the actual prints Bramble & Dyce produces. At heading scale (52px, tracking -1.6px), the tightly-set Cormorant creates a horizontal band of dense letterforms that evokes a galley proof. At 80px display scale, a single Cormorant word reads like a plate number or edition mark.

Inter handles all utility text — navigation labels, body paragraphs, captions, button text — in 11px uppercase at 0.12em tracking (navigation), 16px at -0.1px (body), and 13px uppercase at 0.08em (buttons). The Inter/Cormorant pairing is a classic archival contrast: one family for reading, one for seeing.

**Distinctive identity paragraph:** The site's most specific typographic moment is the specimen grid: each print is presented with its common name in Cormorant italic at 24px and its Latin binomial in Inter uppercase 11px below — a layout that mirrors the label convention of a natural history herbarium sheet. The white space around each specimen card is unusually generous (48px padding), which creates a reading rhythm that feels like turning the pages of a folio rather than scrolling a product grid.

## Spatial System

Seven spatial zones define the page. A full-bleed hero section presents the edition-cover specimen print as a large centered image on a cream ground, with the season and edition number as an eyebrow label (Inter 11px uppercase, #7a7268), the specimen name as the display headline (Cormorant 80px), and a single ghost CTA below. A narrow sinusoidal wave SVG divider (amplitude 48px, full-width) transitions to the specimen grid. The grid uses the asymmetric 7/5 editorial split for featured specimens: full-width on the left side (7 columns), three small thumbnails stacked on the right (5 columns, 3 rows). A diagonal section cut (transform: skewY(-2.5deg)) introduces the process description — a single-column text block with a pull-quote in Cormorant italic 28px. The bento grid section presents edition data: total prints made to date (counter animation), active subscribers, next release date — in three unequal cells (2fr 1fr 1fr). A centered-narrow CTA section with a horizontal SVG rule above and below closes the body. The footer is sparse: wordmark, navigation links, and a single line of provenance text.

## Photography and Editorial Voice

No conventional photography. All visual content is the prints themselves — high-resolution scans of the letterpress specimens on uncoated cotton stock — displayed with a fine 1px bone border frame and generous whitespace. The printing texture (ink impression, paper grain, slight registration variation) is the visual identity. No stock photography, no lifestyle imagery, no human subjects. The specimens — sea thrift, yellow rattle, bog cotton, common stonecrop — are photographed (or scanned) with the precision of scientific illustration but composed with the negative space of fine art printing.

## Navigation and Wayfinding

Three-zone letterpress bar: Cormorant wordmark left, four Inter uppercase navigation links center (Archive / Process / Subscribe / About), ghost CTA button right ("Current Edition"). Transparent over the hero's cream ground, converting to solid #f9f7f4 with a 1px #e8e2d9 border-bottom on scroll. Hover: left-origin underline draw on all navigation links — no background fills, no pills. The navigation communicates editorial authority through what it omits as much as what it includes.

## Overall Design Character

The site argues that an edition-based object — something that exists in forty copies and no more — should have a digital presence that communicates scarcity without theatrics. The archival restraint of the color system, the impression-weight of the Cormorant typography, the absence of any decorative color, and the precisely-proportioned whitespace all communicate the same thing: this is a precision instrument, not a shop. The person who finds Bramble & Dyce through the site will feel that they have discovered it — that it was not designed to be found by everyone.
