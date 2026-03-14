# Visual Identity — deep-signal

Source system: void-spring | Tone twist: Restraint shift (one paragraph made more observational, less interpretive)

---

## Visual Identity

The palette is built on a monochromatic green architecture: deep forest green (`#062914`) as the dominant canvas, forest green (`#155527`) as the primary structural surface, and vivid green (`#1E7E45`) as the sole action accent — a combination that reads as authoritative and technically grounded rather than decorative. The only departure from the green monochrome is mint off-white (`#EEF5EE`) deployed as the light-section alternation, and white (`#FFFFFF`) as text on dark. Typography uses **Plus Jakarta Sans** (bold geometric sans-serif, weights 600–700) for all headings and **Inter** (neutral, highly legible, weights 300–500) for all body and UI text — a pairing that communicates enterprise precision without sacrificing readability. Motion is measured and deliberate: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` drives all micro-interactions at 0.21s, entry animations at 0.52s, creating a tempo that feels considered rather than either sluggish or hyperactive.

`★ Insight ─────────────────────────────────────`
The letter-spacing injection applied to headings (0.06em) and nav links (0.08em) is the twist that separates deep-signal from its void-spring source. Where void-spring used tightly compressed Anton headlines for percussive impact, deep-signal uses Plus Jakarta Sans at expanded tracking — the same geometric weight, but stretched into formal precision rather than urgency. It is the difference between a punch and a signature.
`─────────────────────────────────────────────────`

---

## Hero Section

The hero section occupies full viewport height over the deep forest canvas (`#062914`) — no imagery, no gradient, just the green field and typographic authority. The Plus Jakarta Sans headline arrives at display scale (7.560rem, -0.04em letter-spacing, 0.9 line-height), left-aligned against the dark canvas, its negative tracking preventing the geometric forms from reading as loose at large scale. Supporting copy in Inter 400 at 1.25rem sits below with generous spacing — the scale ratio between headline and body is approximately 6:1, creating structural drama without requiring decorative elements. Two CTAs bracket the action zone: a primary filled button in `#1E7E45` and a ghost variant with white border — both use the same 6px border-radius that signals precision without softness. Section entrance animations use `fadeInUp` at 0.52s with staggered 0.13s delays between elements, giving the hero a cascade quality: headline, subhead, CTAs arrive in deliberate sequence.

---

## Content Sections

Below the hero, sections alternate between dark zones (full-bleed `#062914`) and light zones (`#EEF5EE` mint background). The alternation is structural rather than decorative — dark sections carry product and ecosystem content (3-column card grids, split feature layouts), light sections carry editorial and testimonial content. This rhythm creates a predictable but non-monotonous scroll experience. Layout patterns are varied but obey a strict 12-column grid at 1440px max-width with 24px column gaps: split features use 60/40 text-to-UI ratios, ecosystem overviews use 3-column equal cards, mentorship grids run 4 columns at full width. All cards on dark sections use the elevated surface (`#0D3B1C`) with `#1A4B2A` borders — they read as contained depth rather than elevation. Section spacing is generous at 96px vertical padding — the 1440px canvas requires room to breathe.

`★ Insight — Restraint shift applied ─────────────────────────────────────`
Card borders use `#1A4B2A` — a value approximately 10 luminance points above the `#062914` page background. On dark sections this creates separation through proximity rather than contrast. On scroll, the cards' `translateY(-4px)` hover lift is 4px — a distance small enough that it reads as intentional movement, not animation.
`─────────────────────────────────────────────────`

---

## Footer Section

The footer runs a 5-column dark structure: a brand column with extended description on the left (2fr), then four equal link columns. Background is continuous with the page — `#062914` — no footer-specific surface break. The footer reads as a content-dense extension of the page, not a distinct zone. Typography contracts to Inter at small scale, with muted sage text (`#9DBBA5`) for column headers and white for links. No newsletter form, no decorative separators. A utility bar at the bottom holds copyright and legal links at the smallest type scale.

---

## Design Principles

- **Monochromatic green depth** — `#062914`, `#155527`, and `#1E7E45` form a 3-stop luminance ladder within the green hue. The palette is not dark-mode generic; it is specifically forest green, which reads as organic precision rather than technological void.
- **Alternating section zones** — Dark (`#062914`) and light (`#EEF5EE`) sections alternate structurally, creating page rhythm without decorative dividers.
- **Single accent — pure function** — `#1E7E45` appears exclusively on primary CTAs, active states, focus rings, and interaction highlights. It is never used as decoration.
- **Enterprise typography** — Plus Jakarta Sans at expanded tracking + Inter body creates a dual-register system: announcement + communication. This is the visual voice of infrastructure software.
- **4px–8px radius discipline** — Buttons at 6px, cards at 8px. Neither pill-shaped nor sharp. The rounding is functional, not expressive.

---

## Distinctive Qualities

The most consequential decision in deep-signal is the refusal to use any warm color. Every value in the palette — from the near-black page background to the mint section alternation — stays within a green-to-cool-neutral range. This eliminates the warmth shortcuts that make AI-generated interfaces feel generic. The forest green is not chosen for friendliness; it is chosen for depth. Griting's brand promise is verifiability — the ability to know with precision what a person can do. The palette communicates exactly that: measured, calibrated, dark where it should be dark, clear where it needs to be clear.

The `0.06em` letter-spacing injection on Plus Jakarta Sans headings is the typographic signature of the system. Most enterprise design systems either track tight for compression or ignore tracking entirely. This value — subtle enough to miss at a glance, noticeable once seen — gives every heading a deliberate quality that signals human craft rather than automated generation.
