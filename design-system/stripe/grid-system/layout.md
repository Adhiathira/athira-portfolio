`★ Insight ─────────────────────────────────────`
This task is pure text transformation — no code reading needed, no skill invocation required. The brief uses structural layout vocabulary (grid splits, bleed patterns, z-index layering) that must survive intact while brand-specific nouns get swapped for generic placeholders.
`─────────────────────────────────────────────────`

`★ Insight ─────────────────────────────────────`
The trickiest substitutions here are the ones that straddle both categories — "dark navy" is a color role description (preserve) but also brand-specific (borderline). The instruction resolves this: keep color *roles* ("dark background") but drop specific color names ("olive green"). "Dark navy" → "dark background" is the right call.
`─────────────────────────────────────────────────`

`★ Insight ─────────────────────────────────────`
Statistics like "135+", "$1.4T", "99.999%", "500M+" are structural placeholders for a "4-column proof bar" pattern — the *number of stats* and the *layout* matter, not the values. Replace values with "[Stat]" but keep the column count and visual weight description.
`─────────────────────────────────────────────────`

---

# Brand Name Homepage — Layout Brief

## 1. Overall Page Structure

The page flows through approximately **12–14 distinct sections**, organized into three broad zones:

- **Zone 1 — Acquisition** (Hero + logo bar): Immediate value prop + social proof
- **Zone 2 — Product Education** (Features, product showcases, use cases): Deep scrolling exploration, alternating between light and dark backgrounds
- **Zone 3 — Credibility + Close** (Stats, testimonials, case studies, developer pitch, footer): Trust-building before conversion

The content uses a **centered content rail** (roughly 75% of viewport width, with generous left/right margins) throughout, but this rail is broken deliberately at key moments by full-bleed elements for visual emphasis.

---

## 2. Header / Navigation

The navigation is a **fixed top bar** that sits above the content. It is structured in three horizontal zones:

- **Left:** Company wordmark (bold, compact)
- **Center:** Five text navigation items with dropdown indicators (Category 1, Category 2, Category 3, Category 4, Category 5) — evenly spaced, modest weight
- **Right:** Two CTA buttons — "Sign in" (outlined, light border) and "Primary CTA" (filled, high-contrast accent) — with an arrow glyph on the latter

The nav is relatively low-height and compact, with generous whitespace above and below the text links. The two CTAs at the right create clear visual termination. The background appears light/translucent against the hero content below.

---

## 3. Hero Section

The hero uses a **split-column structure with an overlapping decorative element**:

- **Left column (~55% width):** Contains the primary headline, a live counter stat ("[Stat] [descriptor]"), and two CTA buttons (primary filled accent + secondary outlined "Secondary CTA"). The text stack is left-aligned and sits in the upper-left quadrant of the viewport.
- **Right column (~45% width):** Entirely occupied by a large, full-bleed **abstract gradient artwork** — flowing warm-to-cool waves that bleed beyond the viewport edge. This is not a photograph or UI mockup; it's pure brand illustration.
- **Overlap behavior:** The gradient artwork doesn't respect a hard column boundary — it bleeds into the center of the page, overlapping behind the text column slightly, creating depth and tension without obscuring legibility.

The hero section is approximately **one full viewport tall**, with the text content sitting in the vertical middle-third, giving it breathing room above and below.

Below the hero text/CTAs, still within the hero zone, sits the **logo bar** — a horizontal row of 7 customer brand logos in muted greyscale, evenly spaced across the full content rail width.

---

## 4. Content Sections Below the Hero

### Section: Product Feature Showcase (Tabbed / Tiled)
This is the first major product section. It uses a **2-up and 3-up card grid**:
- A large **2-column split** at top: left card features a product interface mockup; right card features a second product view — both sit inside rounded-corner cards with pastel gradient backgrounds
- Below that, a **3-column equal grid** of smaller cards, each with a headline and an illustrated UI preview — these establish the breadth of the company's product surface

Cards have consistent border-radius and subtle drop shadows. The overall section background is pure white, making the cards pop as discrete objects.

### Section: Full-Bleed Platform Showcase
A **full-width immersive card** spanning the entire content rail, with an annotated UI diagram overlaid on a warm gradient background. Callout boxes float around the central dashboard UI — these are small light cards with code snippets and labels, positioned at irregular angles to suggest an "exploded view" of the platform. This layered, floating-elements pattern recurs throughout the page.

Below this, **three icon + text columns** in equal thirds with short descriptive copy ("Key Benefit A", "Key Benefit B", "Key Benefit C").

### Section: Statistics / Proof Bar
A clean **4-column horizontal bar** on a white background, separated by thin vertical rules. Each column contains a large bold number ([Stat]) and a short descriptor beneath. The numbers decrease in visual weight from left to right — the first number is darkest/boldest, subsequent ones progressively lighter/more muted, creating a subtle visual fade.

### Section: Animated Network Visualization
A **full-bleed, full-width illustration section** on a pale light background. A sunburst of thin lines radiates from a central point, creating a global-reach metaphor. Below it, a short centered headline in large display weight. This section is unusually tall — primarily occupied by the visual, with text playing a supporting role.

### Section: Enterprise Split
A **2-column asymmetric layout**:
- **Left (~40%):** Headline, CTA button
- **Right (~60%):** Supporting paragraph copy

This is one of the sparser, more editorial sections — high whitespace, no imagery, purely typographic hierarchy. A hairline rule separates it from adjacent sections.

### Section: Case Study / Customer Story
A **featured case study** using a **2-row structure**:
- **Top row:** Company logo + headline claim spanning full rail width, with a "Read the story" link flush right
- **Below:** A full-bleed editorial photograph, with a three-stat bar beneath it ([Stat], [Stat], [descriptor list])

This is one of the most editorial moments — the photograph takes over the visual field completely, with no overlaid UI elements.

### Section: Accordion / Expandable List
Three **full-width expandable rows**, each with a company logo, a headline claim, and a "+" expand button flush right. This is a minimal list pattern — no imagery, pure typographic + interactive rhythm. Generous vertical padding between each row.

### Section: Services — 3-Column Cards
A **3-equal-column card grid** with icon + headline + body copy + link in each card (Service A, Service B, Service C). Very clean, low visual weight — this is informational rather than marketing.

### Section: Featured Stories Carousel
A **4-column horizontal carousel** of editorial "magazine cover" cards — each card is a large dark image with logo and company name overlaid at bottom. Below each card: a short sentence and a "Read [Company]'s story" link in accent color. Left/right arrow navigation controls sit at top-right of the section above the card row.

Below the carousel: a **2-column promotional split** (Program A / Program B), each with text on the left and a bold geometric gradient illustration on the right. The illustrations are colorful and abstract.

### Section: Technical / Developer Showcase
A **dark full-bleed section** breaking the otherwise light page. Contains:
- A top subsection with headline + 2 CTA buttons (one filled, one outlined ghost)
- Below: a **3-column layout** (Feature A, Feature B, Feature C)

Inside this dark section, a **full-bleed architectural diagram** — a node-and-edge graph showing integrations (Partner A, Partner B, Partner C → Integration Layer → Company Platform → Data Pipeline → Data Destination). The diagram uses the same dark background so it blends seamlessly — the nodes are muted accent-color rectangles.

### Section: Wave Visualization + Metrics
A **full-bleed dark background section** featuring an animated (or static rendered) wave illustration — flowing accent-color lines that sweep across the full width in a sine-wave pattern. Below the wave, a **3-column stat bar** ([Stat], [Stat], [Stat]) on the same dark background.

### Section: Testimonial
A **centered single-column testimonial block**: a circular avatar photo, a large italic quote block centered with generous left/right padding (roughly 60% of the content rail), and attribution below. Very quiet layout — maximum focus on the words.

Below: a **4-column logo bar** in muted greyscale, evenly spaced.

---

## 5. Footer Layout

The footer transitions to a **dark background** (matching the dark developer sections), establishing it as a distinct zone:

- Multiple columns of navigation links, organized by product category
- The company wordmark + copyright at the bottom-left
- Language/country selector and legal links at bottom-right

The footer uses a **dense multi-column grid** — likely 5–6 columns — each column being a vertical list of links under a category heading.

---

## 6. Notable Layout Patterns

**Sticky navigation:** The header bar is sticky — it remains visible as the user scrolls through the long page.

**Full-bleed background breaks:** The page uses background color as a sectioning tool. The dominant rhythm is light → light → light → dark → light → dark → light → dark footer. These dark breaks create dramatic punctuation in the scroll flow.

**Floating UI annotation panels:** Multiple sections feature "exploded view" layouts where UI screenshots are annotated by floating callout cards positioned around the central element at angles and offsets. This creates a layered, z-axis depth illusion using only 2D layout.

**Gradient art bleeds:** The hero and several product cards use gradient illustrations that extend beyond their containers or bleed to the viewport edge. This breaks the grid intentionally, creating a sense of energy contained within an otherwise structured system.

**Asymmetric two-column text pairs:** The "bold lead sentence / muted follow sentence" pattern recurs throughout — headlines are written in two weights where the primary claim is dark and the elaboration is medium-grey and slightly lighter weight. This is both a typographic and layout technique, creating hierarchy within a single block.

**Content rail consistency:** Despite all the visual variation, the readable text never exceeds roughly 75% of viewport width. The margins breathe consistently, anchoring the reader across very different section types.