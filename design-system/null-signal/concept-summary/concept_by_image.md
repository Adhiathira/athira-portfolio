# Glitch/Data — Concept by Image

## Section Design Pattern Extraction

Three primary, distinct section design patterns define the interface's visual architecture as a machine-readable information topology:

1. **Full-Page Data Matrix Grid:** A terminal-style scrolling index used as the primary content surface on the homepage and data dashboard pages. Cells flicker with content presence cues.
2. **Asymmetric Command Panel Section:** A split layout combining a monospace key-value registry on one side with a glitch-corrupted image composition on the other. Text operates as navigational metadata.
3. **Split Terminal Editorial Section:** A two-column layout featuring a large uppercase headline in VT323 pixel font, a paragraph of technical documentation-style body text, and a single corrupted or scanned image asset.

---

### 1. Internal Section Organization

The hero is organized as a single, continuous data surface below the global navigation bar. There are no distinct headline or text block zones — the layout is a media-and-data-dominant, scan-line-driven matrix grid. The visual field is dense and machine-like, prioritizing rapid information parsing. Multiple columns (3–4 on desktop viewport) where content containers of varying heights are tightly packed with hairline 1px dividers between cells. The grid operates as a terminal emulator grid, where each cell is a single unit of addressable data.

---

### 2. Grid System and Spacing System

Layout adheres to a **12-column terminal grid** with 8px gutters and 1440px maximum width. Container padding is 16px — tight data terminal margins. The asymmetric column utility (`.terminal-split`, 1fr 1px 1fr, separated by a visible binary divider) allows catalog information and corrupted imagery to exist in operational tension. Spacing is not invitation; it is *compression interval*. Every 8px gap is a calculated interval — the bitstream alignment of a data stream, not mere emptiness. The system breathes in 8px increments. Hero padding is 48–56px vertical (vs editorial systems' 80–120px) — the page opens quickly, without ceremony.

---

### 3. Media Composition and Art Direction

Media consists entirely of digital artifact authenticity:

- **Glitch-corrupted photographs** — photographic assets with rgb-split chromatic aberration (red/cyan channel offset ±2–4px), horizontal scanline overlays (2px lines at 0.05 opacity), and occasional clip-path data-reveal masks. Art direction: surveillance cameras, server hardware, oscilloscope traces, command-line outputs.
- **Monospaced typographic specimens** — VT323 and IBM Plex Mono letterforms at display scale as section dividers, status indicators, and data callout elements.
- **Pixel-grid overlays** — dot-matrix or grid overlays on image fields suggesting data rasterization.
- **Terminal screen captures** — images of text scrolling in terminal emulator windows; scrolling command output as ambient texture.

No lifestyle photography. No human faces unless hands operate hardware. All media is operational, technical, and precise — it communicates process rather than experience.

---

### 4. Visual Composition and Layout Intent

The hero reads as a **system boot screen** — a declaration that this is a machine interface, not a consumer product. The 88px VT323 uppercase headline announces the operating context with pixel-precision authority. The near-black background `#19191c` creates a CRT screen surface; the magenta accent `#fd356e` appears only at interactive thresholds — CTAs, link hovers, and active nav indicators.

Content sections shift to **data matrix mode**: items arranged in dense grid formations with hairline dividers, IBM Plex Mono uppercase labels above each entry, JetBrains Mono body text below. The interface is cold and operational; the information is precise and technical. This machine logic is the experience.

---

### 5. Background and Section Design Behavior

Backgrounds follow a terminal-system consistency:

- **Near-black `#19191c`** — primary dark field, page background, section background for all major content zones
- **Dark surface `#252529`** — raised card backgrounds and input fields
- **Darker surface `#1d1d20`** — card component hover states and nested content
- No background color alternation between sections — the dark field is continuous. Sections are demarcated only by 1px hairline rules (`rgba(172, 172, 175, 0.12)`) and label typography changes.

The page reads as a single, scrollable command interface. No soft transitions between sections — sections arrive as data blocks.

---

### 6. Depth, Layering, and Visual Hierarchy

The interface operates in strict 2D planes with discrete layering. No soft shadows or gradual depth. Separation between cells is created by 1px hairline dividers and the compressed 8px gutters. Glitch artifacts (rgb-split, clip-path fragments) create visual **rupture** — data corruption interrupting the matrix order. This corruption is calibrated, not chaotic.

The primary depth system is **luminance and edge contrast** — the magenta accent at full saturation `#fd356e` advances from the dark field; muted gray text at `#acacaf` settles into the background plane. Interactive elements announce themselves through neon-glow box-shadow on hover.

---

### 7. Component Styling: Borders, Surfaces, Elevation

Buttons are **sharp-cornered, monospace-labeled**:
- **Primary**: Magenta fill `#fd356e` with IBM Plex Mono uppercase label; hover adds neon glow `box-shadow: 0 0 8px rgba(253,53,110,0.6)`. Warmth replaced by signal intensity.
- **Ghost**: Transparent, 1px solid magenta border; hover transitions to magenta background tint and amplified glow.

Cards use **1px hairline border `rgba(172,172,175,0.12)`** with near-black background. On hover, border shifts to magenta-tinted `rgba(253,53,110,0.4)` and adds neon glow shadow — a signal state, not a material lift.

---

### 8. Shape Language

Shape language is **strictly rectilinear**: zero border-radius on all components. Every corner is 90 degrees. No softening, no rounding, no organic curves. Botanical illustration, natural forms, and curved geometries are absent. The system operates exclusively in pixel-grid angles — the visual grammar of terminal hardware and early digital displays.

The 1px panel border (`.panel` class) is the primary component framing device — a data container boundary, not a decorative element.

---

### 9. Section Divider Geometry

Section transitions use **no implicit visual softness**. Instead:
- 1px hairline horizontal rules (`rgba(172,172,175,0.12)`) divide major sections — barely visible, marking data block boundaries
- IBM Plex Mono uppercase label tags (`font-size: 11px`, `letter-spacing: 0.15em`) serve as section identifiers in the manner of terminal command prompts
- Magenta accent line (1px `rgba(253,53,110,0.4)`) marks the top of the active section — a cursor line

The interface is continuously dark — the digital machine is always running in the background, always consuming.

---

### Design Ethos Summary

This design system is a **data interface rendered as terminal experience**. Typography is machine-precise and operational. Motion is twitchy and fragmented. Color is restrained to near-black and one neon signal frequency. The interface exists between archival precision (VT323 pixel display, IBM Plex Mono uppercase metadata, technical JetBrains Mono body text) and signal warmth (magenta-pink neon, scanline textures, rgb-split glitch). Every decision — 88px VT323 uppercase, 0.15s mechanical snap, 48px hero padding, neon glow on hover — communicates one message: **this is a machine you operate, not content you consume.**
