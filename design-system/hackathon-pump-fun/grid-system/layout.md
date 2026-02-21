# Event Landing Page — Layout Brief

## 1. Overall Page Structure

This is a single-page scrolling experience with approximately **9-10 major sections** stacked vertically. The page follows a **cinematic, dark-themed aesthetic** with dramatic gradients, generous whitespace, and a clear narrative flow from hero → value proposition → features → social proof → timeline.

The layout rhythm alternates between:
- Full-width centered content (hero, quotes, timeline)
- Asymmetric two-column splits (feature sections)
- Centered single-column text blocks
- Multi-column grids (category cards, partner logos)

Scroll-driven storytelling creates a linear narrative from initial hook through program details to application timeline.

---

## 2. Header/Navigation Layout

**Fixed-position top bar** spanning full viewport width:

- **Left-aligned logo**: Brand wordmark with icon
- **Center-right navigation**: Horizontal menu (4-5 links) with ample letter-spacing
- **Right-aligned CTAs**: Two buttons side-by-side
  - "Secondary CTA" (secondary, dark/transparent)
  - "Primary CTA" (primary, bright accent color, high contrast)

Navigation feels spacious—likely 60-80px tall with balanced horizontal padding. The layout creates clear visual zones: brand identity (left), wayfinding (center), conversion actions (right).

---

## 3. Hero Section

**Full-viewport height, centered content** with theatrical composition:

### Background Layer
- Dark base (near-black)
- Large, soft gradient overlays (aurora-like multi-hue gradients flowing diagonally)
- Creates depth and movement without competing with text

### Content Stack (vertically centered)
1. **Pill badge**: Status indicator text with live indicator dot — floats above headline
2. **Headline**: Massive, bold, two-line lockup — occupies ~40% of vertical space
3. **Subheading**: Single line describing key value proposition, lighter weight, smaller scale (~18-20pt)
4. **CTA pair**: Two buttons horizontally centered with gap between
   - "Primary CTA" (accent color, primary)
   - "Secondary CTA" (dark, secondary)
5. **Scroll indicator**: Chevron or animated arrow at bottom center

**Proportions**: Content occupies roughly middle 60% of viewport height, with breathing room above/below. No columnar split—pure center-axis symmetry creates focus and drama.

---

## 4. Content Sections Below Hero

### Section A: Value Proposition (Single Column, Text-Heavy)

**Left-aligned, single-column prose layout**:
- Accent color heading (key value statement)
- Large body copy (~24-28pt) in white
- Secondary explanatory text in muted gray
- Maximum width ~600-700px, left-aligned on page (or centered with left text-align)

Creates a breather between dramatic hero and structured content below. Feels editorial, authoritative.

---

### Section B: Program Categories (Three-Column Card Grid)

**Centered heading + symmetric grid**:

**Header block** (centered):
- "Main section heading" headline
- Two-line subheading explaining structure

**Grid below**:
- Three equal-width cards with ~24-32px gutters
- Each card is a vertical stack:
  - Icon (top, ~40-48px)
  - Colored title (Category A/B/C in accent colors)
  - Description paragraph
  - Bullet checklist (checkmarks in left margin)
  - Stage indicator (progression metric)
  - "Action CTA" button (full-width or left-aligned)

Cards have **subtle rounded corners** (~12-16px) and dark fill with faint border. Visual hierarchy moves eye top-to-bottom, then left-to-right across cards.

---

### Section C: Partners/Social Proof (Centered Logo Strip)

**Simple, centered composition**:
- "Partner/credential heading" (centered, likely ~18-20pt)
- Horizontal row of partner logos (equal height, variable width, evenly spaced)
- Logos appear muted/desaturated to reduce visual noise

Clean, trust-building section. Minimal chrome.

---

### Sections D-F: Feature Sections (Asymmetric Two-Column)

These follow a **repeating two-column pattern** that alternates image/text positions (left/right, then right/left) for visual rhythm:

#### Layout Structure (each section):

**Text column** (~40-45% width):
- Small accent label (accent color, ~12-14pt, uppercase or colored)
- Large heading (~48-56pt, bold)
- Body paragraph (~16-18pt, gray)
- "Action CTA" button

**Visual column** (~55-60% width):
- Large rounded rectangle container (~24-32px border-radius)
- Vibrant gradient background (changes per section: blue→pink, yellow→teal, red→teal)
- Floating dark UI mockup/screenshot inside (appears to sit on top of gradient)

**Specific sections**:
1. **"Feature A"**: Text left, gradient box right (contains product interface mockup)
2. **"Feature B"**: Gradient box left (feature interface mockup), text right
3. **"Feature C"**: Text left, gradient box right (product interface mockup)

The alternating pattern creates a zig-zag visual rhythm. Gradients add energy; dark mockups provide contrast and readability. Text columns align vertically at their own baseline, while visual columns float with generous padding.

**Spatial relationships**: 
- Column gap: ~80-120px
- Vertical padding between sections: ~120-160px
- Mockups appear to "float" ~20-40px inside gradient boxes, creating layered depth

---

### Section G: Testimonial/Quote (Full-Width Centered)

**Centered, minimal layout**:
- Large pull quote (~36-48pt, bold or semi-bold, centered)
- Avatar + attribution below (name, title, stacked or inline)

Full-bleed section, likely with generous top/bottom padding (~100-140px). Creates pause in scroll rhythm—moment of reflection before timeline.

---

### Section H: Timeline Sections (Centered, Vertical Flow)

**Stacked timeline entries**, each structured as:

1. **Date badge** (rounded pill, white background or outlined)
2. **Phase heading** (e.g., "Phase Name", ~32-40pt)
3. **Description paragraph** (~16-18pt, gray, max-width ~600px)
4. **Optional UI element**: 
   - Countdown timer (four-column grid showing days/hours/minutes/seconds in dark rounded tiles)
   - OR simple callout text

**Timeline rhythm**: Each entry feels like a "card" but without visible borders—defined by spacing alone (~60-80px between entries).

---

## 5. Footer Layout

Not visible in screenshots, but typical structure would likely follow:

- Full-width dark background (slightly lighter than body)
- Multi-column grid (logo + links, resources, social, legal)
- Horizontal rule
- Copyright + small links centered below

Given the minimalist aesthetic, footer is probably restrained—no heavy graphics or complex nesting.

---

## 6. Notable Layout Patterns

### Floating Elements & Layering
- **Gradient boxes with nested mockups** create **2-3 layer depth**: gradient background → dark container → UI screenshot
- Mockups appear to hover ~20-40px inset from gradient edges
- Subtle shadows or blurs likely reinforce floating effect

### Full-Bleed Gradients
- Hero section uses full-viewport gradient backgrounds
- Feature sections use **constrained gradient boxes** (not edge-to-edge) with rounded corners
- Gradients transition across multiple hues (blue→pink, yellow→teal) creating vibrant energy

### Sticky Elements
- Top navigation likely **sticky/fixed** (stays visible on scroll)
- No other obvious sticky elements; clean scroll flow

### Spatial Rhythm
- **Generous vertical padding** (~120-200px between major sections)
- **Tight internal spacing** within components (~16-24px)
- **Wide gutters** in multi-column layouts (~80-120px)
- Creates breathing room, prevents crowding

### Symmetry vs. Asymmetry
- **Hero, quotes, timeline**: Pure center-axis symmetry (stability, focus)
- **Feature sections**: Asymmetric two-column (60/40 split, alternating sides for rhythm)
- **Cards/grids**: Symmetric distribution (equality, fairness)

### Text Hierarchy Scale
- Hero headline: ~72-96pt (dominant)
- Section headings: ~48-56pt
- Body large: ~24-28pt (intro paragraphs)
- Body standard: ~16-18pt
- Accent labels: ~12-14pt (uppercase or colored)

### Color Zoning
- **Dark backgrounds** (near-black, #0a0a0a-ish) for most sections
- **Vibrant gradients** for feature callouts (blue, pink, yellow, teal, coral)
- **Accent color** for CTAs and highlights
- **White/gray text** (white for headlines, gray ~#a0a0a0 for body)

### Button Patterns
- Primary CTA: **Accent color pill button** (~48px tall, generous horizontal padding, full-radius corners)
- Secondary CTA: **Dark/transparent button** with border or subtle fill
- Buttons appear in pairs (hero) or standalone (sections)

### Overlapping/Masking
- No true overlapping elements that break section bounds
- Layers exist *within* containers (mockups inside gradients)
- Clean section breaks, no z-index acrobatics

---

## Design Principles in Play

1. **Cinematic storytelling**: Vertical scroll acts like a film reel—each section is a "shot"
2. **Contrast-driven hierarchy**: Dark + vibrant gradients create focal points; white text pops
3. **Breathing room**: Generous spacing prevents cognitive overload
4. **Alternating rhythm**: Symmetry/asymmetry pattern keeps scroll engaging
5. **Depth through layering**: Gradients + floating mockups create 2.5D effect without gimmicks
6. **Clarity over cleverness**: No hidden navigation, mystery meat, or complex interactions—straightforward, scrollable narrative

---

This layout balances **bold visual impact** (gradients, large type, dramatic hero) with **functional clarity** (obvious CTAs, logical section flow, readable text blocks). The design system is consistent but not monotonous—repeating patterns with enough variation to maintain interest through a long scroll.