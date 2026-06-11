# Terminal / CLI Interface — Concept by Image

## Design System: Cursor Black

---

### 1. Visual Register

Cursor Black operates exclusively within the terminal/CLI aesthetic register. Every design decision — typeface selection, color palette, layout structure, motion vocabulary, component geometry — derives from the visual grammar of 1980s workstation terminals and modern developer tooling. This is not retro nostalgia. It is a precision instrument that communicates mastery, control, and computational power through form.

The near-black page surface (`#0d0d0d`) functions as a CRT screen. The phosphor green accent (`#39ff14`) is the single chromatic signal — the active frequency, the indicator state, the cursor presence. Body text `#d4d4d4` reads as terminal output: legible, non-decorative, information-dense. Muted text `#6b6b6b` is inactive output — logged but not priority.

---

### 2. Monospace as the Sole Visual Register

Monospace typography is not a stylistic choice in this system — it is the structural foundation. Every character occupies identical horizontal space. This creates:

- **Grid alignment**: All text aligns to an invisible character grid. Columns of information snap to the same vertical axis as if rendered by a fixed-width terminal emulator.
- **Information density**: Monospace allows more information in less space. This is a power-user interface; density is a feature, not a problem.
- **Authority**: Developers recognize JetBrains Mono and IBM Plex Mono as tooling fonts — fonts that appear in code editors, terminal emulators, and documentation. Their presence signals that this product is built for people who work close to the machine.

JetBrains Mono (700 for h1, 600 for h2, 500 for h3) provides the structural hierarchy. IBM Plex Mono (400, 0.875rem, 1.6 line-height) handles body copy — optimal for dark-background reading at terminal density.

---

### 3. Panel-Based Information Architecture

Content is organized as **terminal panels**: rectangular containers with 1px phosphor hairline borders (`rgba(57, 255, 20, 0.2)`), zero border-radius, 24px padding. These panels read as terminal windows — framed data containers that could be resized, moved, or closed.

Three panel variants:
1. **Panel** — bare bordered container. Data records, feature descriptions, code examples.
2. **Panel-titled** — with 40px title bar and 1px separator line. Command windows, configuration panels.
3. **Split panel** — `1fr 1px 1fr` grid with phosphor hairline center divider. Side-by-side comparisons, terminal split views.

The panel border color (`rgba(57, 255, 20, 0.2)`) is intentionally dim at rest — 20% phosphor green opacity. On hover, it intensifies to 100% (`#39ff14` solid) and emits a glow shadow. This mirrors terminal selection: the active window glows, inactive windows recede.

---

### 4. The 80-Column Constraint

Body content columns are constrained to approximately 720px — the optimal reading width for monospace body text at 0.875rem. This is not an arbitrary design decision: 720px at this size approximates 80 characters per line, the canonical terminal column width that has defined readable command-line output since the 1970s.

This constraint creates deliberate whitespace in wide viewports. Rather than stretching content to fill container width, the interface acknowledges its terminal heritage by maintaining the 80-column reading discipline. The whitespace flanking the text column communicates restraint and precision.

---

### 5. Cursor States as the Only Interactive Signal

Interaction feedback in this system is minimal and precise:

- **Hover**: Text color switches from `#d4d4d4` to phosphor `#39ff14`. No background change. The character illuminates — like a character under a blinking cursor.
- **Active/selected (reverse video)**: Background becomes `#39ff14`, text becomes `#0d0d0d`. This is "reverse video" — the classic terminal selection state where the character field inverts.
- **Focus**: 1px dashed phosphor outline at 3px offset — not solid, not rounded. Terminal text editors draw cursor indicators as dashed rectangles.
- **Disabled**: Opacity 0.3, cursor: not-allowed. The command is inactive.

All transitions: 80ms step-start — snappy, mechanical, instant. There is no easing curve. The terminal does not smooth its state changes; it switches.

---

### 6. CRT Scanline Effect

The hero and major dark sections carry a subtle CRT scanline texture:

```css
background-image: repeating-linear-gradient(
  transparent 50%,
  rgba(0, 0, 0, 0.05) 50%
);
background-size: 100% 4px;
```

This produces horizontal bands 2px transparent / 2px at 5% opacity — the visual signature of a CRT raster display. The effect is intentionally subtle: at a glance the surface reads as solid black. Examined closely, the scanline texture communicates hardware presence — the screen is alive, not static.

---

### 7. Phosphor Green — One Frequency

The decision to restrict chromatic accent to a single phosphor green `#39ff14` is a strict design constraint, not a limitation. A terminal monitor does not switch between green and blue depending on the content's emotional register. The single frequency:

- Creates **visual hierarchy without color complexity**: everything phosphor-green is interactive or active; everything else is passive output.
- Produces **maximum contrast** against `#0d0d0d` background — phosphor green at full brightness on near-black reads at approximately 12:1 contrast ratio.
- Enforces **brand discipline**: the accent is not decorative. It only appears where it means something — CTAs, borders, hover states, the logo sigil.

---

### 8. Shape Language

Zero border-radius. Every component is a rectangle. Terminal hardware renders text in fixed rectangular cells; terminal windows are rectangular; command-line interfaces have no rounded corners. This system inherits that geometry absolutely. Cards are rectangular panels. Buttons are rectangular. Input fields are rectangular. The 90-degree corner communicates: precision, no compromise, built for work.

---

### Design Ethos Summary

Cursor Black is a **CRT terminal rendered as a design system**. The near-black field is the dark glass of a powered-on monitor. The phosphor green accent is the cathode ray trace — the single active frequency. Monospace type is the character ROM — every glyph rendered in the same fixed cell. Panel borders are window chrome. Hover states are cursor selection. This system communicates one register: you are operating a machine.
