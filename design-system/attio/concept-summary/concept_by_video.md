# Concept by Video — Attio (attio.com)

Source recording: `extraction-assets/attio/walkthrough.webm` (162s, 1920×1080, five routes: home, platform/AI, platform/workflows, customers, pricing).

> Method note: this analysis was produced by frame-by-frame inspection of the recorded walkthrough. The Gemini CLI path in `analyze-video-for-design` was unavailable this run (Google deprecated the free-tier Code Assist OAuth client, so `gemini` returns an `IneligibleTierError` and writes an empty file). The analysis below was derived directly from the real recorded frames instead of a silent no-op — see the Handoff note at the end.

---

## Overall Concept

An editorial, high-craft B2B SaaS aesthetic built around a single idea: a "quiet, intelligent product that works while you sleep." The site pairs a near-monochrome, print-magazine layout discipline (huge type, wide gutters, hairline rules, generous whitespace) with continuously self-animating product mockups that carry all the color and life. The feel is calm and confident rather than loud — the interface stays still and neutral while the *demonstrations inside it* move. This is the opposite of the generic AI-gradient aesthetic: restraint everywhere except deliberate, controlled bursts of motion and a single multicolor accent.

---

## 1. Internal Section Organization

Each section follows a consistent editorial template: a small pill/tag label sits above a large two-tone headline (a black lead clause followed by a lighter-gray continuation clause), a short gray sub-line, then a paired product artifact. Feature sections use a two-column split — text held left, an animated product panel or diagram right. Hero and trust sections center their content. Numbered feature indices ([01]–[08]) organize the platform capability grid into a scannable matrix. Sections are internally left-aligned for content-heavy blocks and center-aligned for statement/trust moments, giving a deliberate rhythm of "declaration → demonstration."

## 2. Grid System and Spacing System

A wide max-width container with large symmetric side gutters holds all content; nothing runs edge-to-edge except full-bleed dark CTA bands and the top announcement bar. Feature blocks read as a 12-column grid split roughly 5/7 (text/visual). Logo trust bands use even multi-column rows (6-up on the primary strip). Pricing is a clean 4-equal-column layout. Vertical spacing is generous and consistent — large padding above and below each headline, with hairline separators marking sub-rows inside feature lists and the footer. The spacing scale feels modular and roomy, reinforcing the premium/editorial tone.

## 3. Media Usage (Images, Video, Illustration, 3D)

Media is dominated by **auto-playing UI product mockups** framed in macOS browser chrome (traffic-light controls). These are not static screenshots — they type queries, stream AI responses, and reveal overlay cards in a loop. Secondary media types: a colorful pointillist/halftone dot-matrix graphic (green-teal-blue-orange-pink) that assembles the site's only vivid color moment; wireframe hexagon-cluster line art in dark CTA bands; a live node-graph workflow diagram with animated status pills; hand-drawn portrait line illustrations beside testimonials; and photographic case-study thumbnails and talking-head video stills on the customers page. Real product UI is the hero medium; abstract graphics are used sparingly as accents.

## 4. Visual Composition and Layout Intent

Composition intent is "editorial spread meets product demo." Text is set as a confident left-aligned or centered statement with abundant negative space; the product artifact is offset to balance it. The eye is led from a small tag → oversized headline → gray supporting line → CTA → moving mockup. Asymmetric two-column feature blocks alternate which side holds the visual only occasionally, but mostly keep text-left/visual-right for consistency. The layout intentionally under-decorates the frame so that motion inside the mockups becomes the focal point.

## 5. Background and Section Design Behavior

Backgrounds alternate between two dominant modes: soft near-white (#fafafa-range) for the majority of content sections, and full-bleed near-black (#0d0d0d-range) for CTA bands ("Start with a 14-day free trial", "Ask more from CRM"). The hero background carries a very subtle lavender/purple gradient wash beneath the product mockup. Dark bands introduce thin gray grid/wireframe lines and hexagon line art. Transitions between light and dark are hard color-block cuts, used to punctuate the scroll with rhythm.

## 6. Depth, Layering, and Visual Hierarchy

Depth is built with soft elevation rather than heavy shadow. Product mockups float above their gradient/plain backgrounds with a gentle drop shadow. Overlay cards (an AI "qualify leads" card, an email-compose panel) layer atop the base mockup at a higher elevation. A persistent floating AI prompt pill and a support-chat bubble occupy the top z-layer above everything. The dot-matrix graphic sits as a mid-depth background texture behind its floating card. Hierarchy is unambiguous: giant headline → supporting gray text → interactive product surface → floating utilities.

## 7. Component Styling (Borders, Surfaces, and Elevation)

Surfaces are clean white cards with 1px hairline light-gray borders and subtle soft shadows. Buttons are pill-shaped: a solid near-black primary ("Start for free") and an outline/ghost secondary ("Talk to sales"). Tags and badges are small rounded pills with light fills. Pricing cards are bordered rectangles with rounded corners; the Pro tier is emphasized with a stronger border/highlight and a dark primary CTA. The product-mockup browser chrome adds realistic window framing. Elevation is used to separate interactive surfaces from the page, never for decoration.

## 8. Shape Language (Rounded vs Square)

Predominantly rounded and soft: pill buttons, pill badges, rounded input bars, rounded cards, rounded browser-chrome mockups. The one deliberate angular counterpoint is the **hexagon wireframe cluster** in dark CTA bands, which introduces a geometric, technical edge to signal "engine/infrastructure." This tension — soft rounded product surfaces against a sharp hexagonal engine motif — is a recurring signature.

## 9. Section Divider Geometry

Dividers are mostly implicit: whitespace and thin full-width hairline rules separate content rows (feature lists, footer columns, testimonial-to-CTA boundaries). There are no decorative wave/zigzag SVG dividers. The strongest "divider" is the hard light-to-dark color-block transition into CTA bands. Inside dark bands, faint vertical grid lines subdivide the space.

## 10. Section Differentiation Analysis

Sections are differentiated primarily by (a) background mode (light vs dark), (b) typographic register (geometric sans for product sections vs high-contrast serif for testimonials), (c) media type (product mockup vs dot-matrix vs node-graph vs hexagon wireframe), and (d) alignment (centered statement vs left feature split). Despite variety, a shared spacing scale, pill-tag convention, and two-tone headline pattern keep everything unmistakably one system.

## 11. Section Aesthetic Identity

- **Hero**: monumental, centered, calm — a single big claim over a living product demo.
- **Feature/platform sections**: analytical, left-aligned, indexed, tab-driven.
- **Trust/logo bands**: quiet, evenly gridded, low-contrast.
- **Testimonials**: editorial and literary — large serif, generous whitespace, hand-drawn portrait.
- **Dark CTA bands**: technical and dramatic — black field, wireframe hexagons, white type.
- **Pricing**: structured and comparative — four clean columns, one highlighted.
- **Customers/case studies**: journalistic — category tags, thumbnails, "read case study" links.

## 12. Design System Signals Across Sections

Strong, consistent tokens: pill buttons (solid-dark primary / outline secondary), pill tag labels above headlines, two-tone (black + gray) headline treatment, hairline borders, macOS browser-chrome mockup framing, bracketed numeric indices ([01]), a single multicolor dot-matrix accent, a persistent floating AI prompt pill, and a recurring hexagon wireframe for "engine" moments. Type, spacing, and color are tightly governed — this reads as a mature, centrally-owned design system.

## 13. Scroll Animations

Sections reveal on scroll with subtle fade-and-rise entrances. The dot-matrix halftone graphic assembles into place. Two-tone headlines with a lighter continuation clause imply progressive emphasis as they enter. Most importantly, product mockups **auto-play independent of scroll position** — AI chat typing and streaming responses run on their own timers, so the network stays busy (this is why `networkidle` never fires and a `navTimeout` cap is required for recording). Scroll is smooth and native; content settles rather than aggressively parallaxing.

## 14. Motion Hierarchy

Motion is deliberately tiered. Primary motion lives *inside* the product mockups (typing, streaming AI answers, state pills flipping Running→Completed on the workflow node graph). Secondary motion is section entrance reveals and the dot-matrix assembly. Tertiary motion is micro-interaction (button/tag hover states, the floating AI pill's contextual placeholder swapping per section). The frame itself stays still; the "intelligence" moves. This hierarchy sells the product's core promise — autonomous work happening on its own.

## 15. Navigation Bar Behavior

A sticky top navigation bar persists on white/translucent throughout: wordmark left; centered menu with two dropdown items (Platform, Resources) plus flat links (Customers, Pricing); right side holds a ghost "Sign in" and a solid-dark "Start for free" pill. Above it, a full-width black announcement bar carries an arrow CTA and a dismiss (×); it stays until dismissed and then collapses, shifting the nav up. Navigation is stable, low-chrome, and always accessible.

## 16. Color System and Visual Hierarchy

Base palette is near-monochrome: off-white/#fafafa backgrounds, near-black #111 headings, medium-gray secondary text. The two-tone headline (black lead, gray continuation) is the core hierarchy device. Dark CTA bands invert to near-black fields with white text and thin gray lines. Accents are rationed: a soft lavender gradient behind the hero mockup, a small blue on AI send buttons and "AI" badges, and one saturated multicolor dot-matrix (green/teal/blue/orange/pink) as the single vivid focal moment. Color is used as punctuation, not decoration.

## 17. Typography System

Two deliberate type registers. (1) A large, tight, geometric grotesque sans for headlines and UI — very large hero scale, tight tracking, mixed weights within a single headline for the two-tone effect; neutral gray sans for body and sub-lines. (2) A high-contrast serif (transitional/Didone character) reserved for testimonial quotes, set large and centered — a conscious editorial pivot that signals "human voice." Supporting micro-typography includes uppercase small-caps category tags and bracketed monospace-flavored numeric indices ([01]–[08]). Pricing uses oversized bold numerals. The pairing of a rational sans with a literary serif is a defining signature.

## 18. Interaction Affordances

- **Persistent floating AI prompt pill** at bottom-center: a rounded "Ask anything…" input with an up-arrow send button whose placeholder text changes contextually per section — the site's most distinctive affordance, following the scroll as a live invitation.
- **Tab/stepper** in the "intelligent system" section: a vertical list (Build pipeline → Retain and expand) that highlights the active item and swaps the paired mockup.
- **Pricing toggle**: Monthly/Annual segmented control; highlighted Pro tier.
- **FAQ accordion**: [+] expanders on the pricing page.
- **Case-study cards**: hover/"Read case study →" link affordance with directional arrows.
- **Dropdown menus** (Platform, Resources) in the nav.
- **Dismissible announcement bar** and a bottom-right support chat bubble.

## 19. Section Transitions

Transitions rely on rhythm rather than elaborate effects: soft scroll-reveal entrances carry most sections in, while the shift into full-bleed dark CTA bands is an abrupt, high-contrast color-block cut that resets attention. Route changes (home → platform → customers → pricing) reuse the same sticky nav and container, so navigation feels continuous. The recurring logo trust band acts as a connective "breath" between denser feature blocks.

## 20. Notable UX/UI Design Observations

- **The product does the talking.** Rather than describing features in copy, the site loops real, self-animating product demos (AI chat, workflow node graphs, table + email-compose overlays). The static, restrained frame exists specifically to let these demos be the focus.
- **A single color budget.** Near-total monochrome makes the one multicolor dot-matrix graphic and the small blue AI accents land hard — color signals "intelligence" precisely because it is scarce.
- **Two-typeface storytelling.** The rational grotesque sans (product/logic) versus the literary serif (human testimony) encodes the brand's thesis — software that amplifies people — directly in the type system.
- **The floating AI prompt as a through-line.** A contextual, scroll-persistent "ask anything" pill reifies the product's promise on the marketing page itself and is the most memorable interaction pattern.
- **Soft-round product surfaces vs sharp hexagon "engine."** The shape-language tension quietly separates "what you touch" (rounded, friendly) from "what runs underneath" (angular, technical).
- **Editorial discipline throughout.** Wide gutters, hairline rules, big type, indexed feature matrices, and category-tagged case studies give the whole site a print-magazine calm that reads as premium and trustworthy — a deliberate anti-generic-AI aesthetic.

---

### Handoff note (pipeline)

The recorded walkthrough is valid and reusable at `extraction-assets/attio/walkthrough.webm` (and cached at `~/Desktop/scratchpad/website-flow-video-cli/recordings/attio-com.webm`). To regenerate this analysis via the intended Gemini path, the `gemini` CLI needs working auth — either re-run `gemini` login/migration or export a `GEMINI_API_KEY` before invoking `analyze-video-for-design`. Blocker logged in `~/Desktop/scratchpad/analyze-video-for-design/memory/learnings.md`.
