# Seedkeep: A Heritage Seed Library & Botanical Nursery

> *Concept: A digital and physical repository for heritage seeds, botanical knowledge, and cultivation wisdom—designed as a living archive you explore, not a transactional catalog.*

---

## Visual Design System Analysis

---

### Section Design Patterns

Two primary patterns structure the interface:

1. **Cream editorial header / botanical hero** — a dual-zone composition: warm ivory control zone above, expansive photographic/illustrative botanical field below
2. **Modular grid with ample white space** — 12-column layout with 40px+ gutters, generous breathing room, botanical illustration elements as structural guides

---

### 1. Internal Section Organization

The hero is organized into two horizontal bands occupying distinct sensory registers:

**Top band — archival warmth + hand-crafted typography**
A warm cream field (`#fcf7f1`) contains three content clusters: a logotype anchored left in Cormorant Garamond (evoking editorial heritage and botanical precision), a multi-line headline in Cormorant Garamond 400 italic at 90px with generous leading (lending the page a manuscript's meditative authority), and a pair of softly-bordered buttons clustered right. This band is **asymmetric and tactile** — the user's conscious interface with the archive.

**Bottom band — infinite botanical depth**
A photographic or illustrated botanical field that transitions into a lush, detailed depiction of heirloom plants, hand-drawn seed pods, detailed botanical engravings, or macro photography of seedheads and foliage. This is not decoration; it is the reason the platform exists. The media zone occupies 55–65% of viewport height, drawing the eye downward into knowledge.

---

### 2. Grid System and Spacing System

Layout adheres to a **12-column editorial grid** with 28px gutters and 1520px maximum width. Horizontal padding is generous (48px default, 64px in content zones). The hero section has 112px vertical padding — ample room for contemplation and presence.

The asymmetric column utility (`journal-split`, 5fr/7fr, separated by a subtle earth-tone vertical rule) allows catalog information and botanical illustration to exist in editorial tension. Spacing is not density; it is *respect for the subject*. Every unit of white space is an invitation to look closer, to notice detail.

---

### 3. Media Composition and Art Direction

Media consists entirely of botanical authenticity:

- **Hand-drawn botanical illustration** — seed pods, foliage specimens, cross-sections of plant anatomy rendered in ink and watercolor. Art direction: vintage Kew Gardens botanical plates, Ernst Haeckel precision engravings. Sepia or earth-tone color palette.
- **Macro photography** — extreme close-up of seedheads, soil textures, germinating seeds, root systems, leaf veins. Depth-of-field photography that reveals hidden botanical complexity.
- **Time-lapse video** — plants unfurling, flowers blooming, seeds dispersing (used in video sections only).
- **Typographic specimens** — Cormorant Garamond and Source Serif 4 letterforms at display scale as section dividers and artistic elements.
- **Hand-written accents** — curator's notes suggesting personal curation and knowledge transfer.

No lifestyle photography. No human faces unless hands demonstrate gardening craft. All media is educational, precise, and reverent — it communicates knowledge rather than selling lifestyle.

---

### 4. Visual Composition and Layout Intent

The hero reads as a **botanical manifesto** — a declaration that seeds and plants are knowledge worth preserving. The 90px Cormorant Garamond italic headline announces the mission with editorial authority rooted in calligraphic tradition. The botanical illustration below extends the interface downward into a living archive.

Content sections shift to **curatorial catalog mode**: heirloom variety cards arranged in a 3-column grid with botanical illustrations above, detailed growing notes in EB Garamond, heritage story in Cormorant Garamond. The interface is warm and analog; the knowledge is precise and botanical. This duality is the experience.

---

### 5. Background and Section Design Behavior

Backgrounds follow a naturalistic alternating rhythm:

- **Warm cream (#fcf7f1)** — primary content on cream, Cormorant Garamond headings in pure black (#000000)
- **Soft warm gray (#e8e3da)** — botanical section backgrounds with a surface card quality
- **Near-white** — card components float above sections with warm shadow
- **Gradient: cream → pale warm gray (#e8e3da at 8%)** — transitional sections between content and botanical media
- **Warm cream** — footer with minimal Cormorant Garamond type

No hard section dividers. Transitions between sections use ink-reveal animations and gentle watercolor washes. The page is a continuous editorial journey through botanical knowledge, not a series of discrete panels.

---

### 6. Depth, Layering, and Visual Hierarchy

The interface uses **subtle elevation for depth** — card components use `box-shadow: 0 6px 16px rgba(0,0,0,0.10)` on hover with warm-toned shadow, creating a paper-like quality that suggests layered pages. Cards float with minimal elevation; the depth is tactile and understated.

The primary depth system is **ink darkness and illustration detail** — detailed botanical engravings advance; softer backgrounds recede. This creates a printmaking-inspired reading experience where complexity equals importance.

---

### 7. Component Styling: Borders, Surfaces, Elevation

Buttons are **softly rounded (4px radius), earth-toned**:
- **Primary**: Black fill (#000000) with cream Cormorant Garamond type; hover adds `box-shadow: 0 4px 16px rgba(0,0,0,0.12)` warm depth. Warmth replaces neon.
- **Ghost**: Transparent, 1.5px solid black border; hover transitions to subtle warm tint background and muted border (#696969).

Cards use **1px warm-gray border (#e8e3da)** with cream background. On hover, border shifts to muted gray (#696969) and adds `box-shadow: 0 6px 16px rgba(0,0,0,0.10)` — a tactile lift suggesting the card is a page you can pick up.

---

### 8. Shape Language

Shape language is **restrained and purposeful**: 4px border-radius on interactive components, creating a slightly softened aesthetic that reads as hand-crafted rather than machine-precise. Botanical illustration provides the only visible organic curves (leaf edges, seed pod forms), while all UI elements maintain careful geometry.

The pill (border-radius 100px) is reserved for heritage classification tags and botanical family labels. Primary buttons and cards use soft rectangle (4px radius). This hierarchy communicates: tags are categorical knowledge, buttons are actions, cards are individual botanical records.

---

### 9. Section Divider Geometry

Section transitions use **no explicit dividers**. Instead:
- Background color shifts (cream → warm gray → cream) create implicit boundaries
- Botanical illustration elements (seed pods, leaf motifs) serve as visual section markers
- A thin horizontal rule (1px, opacity 0.4, via `currentColor`) may appear between major content sections as a reference to manuscript page breaks

The interface is deliberately grounded — the botanical world is always present in the background, as if the digital interface is overlaid on the living archive.

---

### Hero Section Analysis

- **Background**: Dual-field — cream (#fcf7f1) in nav/headline zone; botanical illustration field in media zone
- **Headline**: Cormorant Garamond 400 italic at 90px, letter-spacing -0.01em, line-height 1.15, black (#000000) on warm cream field
- **CTA buttons**: Two — primary black with warm shadow hover, secondary ghost with muted transition
- **Navigation**: Transparent nav → warm white on scroll, Cormorant Garamond 0.8rem, fixed, maintains editorial presence above all content

---

### Design Ethos Summary

This design system is a **botanical archive rendered as editorial experience**. Typography is hand-crafted and reverent. Motion is slow and contemplative. Color is warm, earth-bound, and grounded in natural pigments. The interface exists between archival precision (Cormorant Garamond italic display, botanical illustration, detailed growing notes in EB Garamond) and sensory warmth (cream backgrounds, drawn-in underlines, paper-edge shadows). Every decision — 90px italic Cormorant Garamond, 0.75s ease-in-out, 112px hero padding, subtle card lifts — communicates one message: **this is knowledge you steward, not content you consume.**
