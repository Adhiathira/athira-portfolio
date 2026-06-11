# Brutalist Editorial System — Visual Analysis

## Section Design Patterns

One section pattern dominates: a **full-bleed brutalist hero** with a stark geometric mark, no atmospheric decoration, and bare-minimum navigation. No gradients. No particle fields. No decorative layering. The hero is raw confrontation.

---

## 1. Internal Section Organization

The hero uses **hard geometric separation** into three functional layers:

- **Background layer**: solid near-black or white field — pure foundation, no texture, no ambient glow theatrics
- **Focal mark**: centered or off-axis typographic or geometric form — the object itself is the message
- **Text layer**: utility label positioned with mechanical precision — function only

No composition tricks. No depth theater. All placement is orthogonal and immediate. The grid is implicit in the hard edges.

---

## 2. Grid System and Spacing System

No decorative composition. Layout follows **utility-first principle**:

- 6-column newspaper broadsheet grid — equal columns, 16px tight gutters
- Content density maximized — spacing is minimal because excess is dishonest
- Negative space is not breath; it is refusal
- Decoration is deleted. Only the object remains

Button padding is form-input scale (4px/8px) — sharp corners, zero border-radius. All alignment is to grid intersections with no optical adjustment. This is **structural conviction, not comfort**.

---

## 3. Media Composition and Art Direction

Photography is **documentary or absent**. Media consists of:

- **Technical diagrams** — schematics, wireframes, system documentation in black and white
- **Typographic specimens** — enlarged Anton letterforms at display scale as visual content
- **Process documentation** — hands-on captures, raw workshop footage, unretouched
- **Data visualization** — tables, charts, raw numbers. Information as aesthetic
- **Source code** — code as visual content, not hidden behind UI chrome

No soft-focus imagery. No lifestyle photography. No aspirational staging. All media is documentary, functional, or analytical — it teaches structure rather than sells emotion.

---

## 4. Visual Composition and Layout Intent

The hero section behaves as **manifesto declaration**: massive Anton type fills the viewport at 160px, all-caps, line-height 1.0. No photography, no ambient color field. The headline IS the hero. Secondary text in Space Mono 14px creates maximum contrast — 11× size gap from display to body.

Content sections shift to **newspaper column density**: the 6-column grid becomes the interface. Information is packed, rows are tight, every cell earns its content. Where other design systems provide breathing room, this one provides information.

---

## 5. Background and Section Design Behavior

Backgrounds follow a stark functional rhythm:

- **White (#ffffff)** — primary content on white, all-caps Anton headings as sole visual content
- **Near-black (#1d1d1f)** — reversed sections with white type on dark background
- **White with 2px black border-top** — `.brutal-divider` marks every section transition
- **White** — footer with minimal monospace type

No gradients. No tinted overlays. No photographic backgrounds. Section boundaries are defined by hard horizontal rules (2px/4px/8px) and background color shifts. The border IS the divider.

---

## 6. Depth, Layering, and Visual Hierarchy

The interface is **rigorously flat** — no shadows, no elevation, no blur. The only depth cue is **border weight**: thick borders advance; thin borders recede. Primary hierarchy is through scale: 160px vs 14px creates a 1140% size differential that makes typographic hierarchy unavoidable.

No card elevation. No modal shadows. No hover lift. Components are bordered, not shadowed. The border signals containment; weight signals importance.

---

## 7. Component Styling: Borders, Surfaces, Elevation

Buttons are **rectangular, 2px bordered, zero radius** — no pill-shapes, no softness:
- **Primary**: solid blue fill (#0071e3) with white Anton type; hover inverts instantly to white fill + blue border
- **Ghost**: transparent fill, 2px solid black border, black Anton type; hover fills black instantly, type goes white
- **Active state**: instant red flash (#e30000) — state change as punctuation

Cards use **2px solid black borders** on white. No shadows. Hover: instant background fill to #f5f5f7. No hover lift. The border stays constant — only the fill changes.

---

## 8. Shape Language

Shape language is **rectilinear only**:

- All containers, cards, and sections: 90-degree corners
- No curved buttons, no pill-shapes, no organic forms
- No border-radius on any element
- Asymmetric composition through grid placement, not shape softness

The rectangle is the only shape. Anton letterforms are the only permitted curves — and only because they are type, not decoration.

---

## 9. Section Divider Geometry

All section transitions use `.brutal-divider`: `border-top: 2px solid #000000`. No decorative treatment. In high-emphasis transitions, the border may increase to 4px or 8px — weight carries the semantic signal. No wave shapes, no SVG curves, no diagonal cuts. The horizontal rule is the only divider in a newspaper; it is the only divider here.

---

## Hero Section Analysis

The hero is a **typographic declaration**:

- **Layout**: 160px Anton in all-caps fills the upper third of the viewport; no centering, left-aligned or full-bleed
- **Background**: White field — no color blocks, no photography, no atmospheric effects
- **Typography**: One heading, one subhead in Space Mono 14px, one CTA button (2px bordered)
- **Navigation**: 80px fixed bar with 8px bottom border — masthead above content, always present
- **No decoration**: The headline occupies its space with force. Nothing else is needed.

The hero reads as a **newspaper front page** — the date, the masthead, the headline. Information first.

---

## Footer Section Analysis

The footer is **terminal and functional**:

- **Background**: White or near-black
- **Content**: Left-aligned links, copyright, minimal icons in Space Mono 12px
- **Accent**: 4px black horizontal rule sits above footer as the final section boundary
- **No newsletter form**: The footer is navigation and legal text, nothing more

---

## Design Ethos Summary

This design system is a **brutalist editorial platform rendered as web interface**. Typography is the sole visual medium. Scale creates hierarchy. Borders create structure. Zero motion creates presence. Every design decision — 160px type, 8px nav border, 4px base spacing, 0s transitions — communicates one message: **information is the design. Design is information. Decoration is dishonesty.**
