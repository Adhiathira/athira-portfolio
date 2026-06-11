# Datum Rail — Concept by Image

## Design System Identity

**Datum Rail** is a dashboard data visualization design system — a precision instrument for building information-dense interfaces used by developers, data teams, and operators. The aesthetic argues that the best data tooling looks built, not designed: rigorous, structured, and immediately legible.

---

## Section Design Patterns

Three primary section architectures define this system:

### Pattern 1: Metric Dashboard Panel

The dominant surface type. A card container (8px radius, 1px border at `#e2e8f0`, box-shadow `0 1px 3px rgba(0,0,0,0.1)`) holds a structured hierarchy: a data-label header (JetBrains Mono, 0.75rem, uppercase, 0.06em tracking) identifies the metric category; a large numeric value (JetBrains Mono, 2.5–3.5rem, weight 700) dominates the card center; a supporting body label (Inter, 0.875rem, muted text `#7d8ba4`) provides context. Cards sit on a `#f6f9fc` surface-background, creating subtle separation from the white page canvas.

### Pattern 2: Feature Grid with Data Labels

A 3-column card grid where each card leads with a small icon (CSS-drawn or emoji), followed by a monospace category label, a bold Inter heading, and compact body text. No decorative illustration or hero image — the information is the design. Card borders activate on hover (border-color shifts to `#2563eb`), providing functional feedback. Section background alternates between white and `#f6f9fc` to create visual rhythm without imagery.

### Pattern 3: Stats Row with Count-Up Animation

A full-width 4-column strip with a `#f6f9fc` or white background. Each column contains a JetBrains Mono large number, a short Inter label, and an optional trend indicator (small `+12%` in success green `#10b981` or error red `#ef4444`). The count-up animation (1200ms, `cubic-bezier(0.4, 0, 0.2, 1)`) triggers on viewport entry. This is the most expressive motion in the entire system — it signals data is live and responsive.

---

## Grid and Spacing System

Container max-width 1440px, 24px padding. 12-column grid at 16px gutters. Card grid gaps at 24px. Section padding 48px — compressed compared to editorial systems, maximizing data density. Nav height 56px. Table row height 44px.

The compressed rhythm is intentional: dashboard users scan, not read. Information spacing follows the logic of a terminal interface — tight enough to fit more data, loose enough to prevent visual noise.

---

## Color System

White (`#ffffff`) page background — the universal field for data surfaces. `#f6f9fc` alternate surface for card sections. Deep navy (`#0a2540`) headings. Dark slate (`#425466`) body. Slate-blue (`#7d8ba4`) muted labels. Crisp blue (`#2563eb`) as the single chromatic action signal — used for CTAs, active states, accent borders, and focus rings. Status colors (emerald `#10b981`, red `#ef4444`, amber `#f59e0b`) for metric indicators only.

Color functions as signal, not atmosphere. The blue is visible from any position in the data field, marking the conversion vector and active state precisely.

---

## Typography System

**Inter** as the primary sans-serif — geometrically neutral, maximally legible at small sizes, associated with product rationality. **JetBrains Mono** as the monospace accent — for all numeric data, metric values, category labels, and any element that must signal "this is a measurement."

The font pairing creates a deliberate semantic division: proportional type for language, monospace for data. A reader learns instantly which text is reading material and which is a number to act on.

Heading sizes are functional: h1 at 2.5–3.25rem is a section identifier, not a billboard. Dashboard users navigate by hierarchy, not drama.

---

## Interaction and Motion Principles

All transitions: 150ms `cubic-bezier(0.4, 0, 0.2, 1)`. No spring physics. No bounce. No dramatic entrance animations.

Card hover: border-color shifts from `#e2e8f0` to `#2563eb` — a single property change that communicates interactivity without drawing attention away from data.

Row hover: `rgba(0,0,0,0.04)` background fill — visible in peripheral vision, not intrusive.

Focus: 2px solid blue at 2px offset — WCAG-compliant, functional, not decorative.

The aesthetic argument: motion in a precision instrument is calibration, not celebration. The 150ms standard is fast enough to feel responsive, short enough to never feel like an animation.

---

## Design System Signals

Sharp 8px radius cards, 1px borders, white-dominant palette, JetBrains Mono numerics, compact 48px section spacing, 56px nav. Every token communicates the same message: this is a tool for people who take data seriously.
