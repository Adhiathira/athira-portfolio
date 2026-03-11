`★ Insight ─────────────────────────────────────`
The task is content substitution while preserving structural/spatial language — this is a precision editing job, not a design task. Skills like `brainstorming` or `frontend-design` don't apply here.
`─────────────────────────────────────────────────`

# Brand Name — Layout Brief

---

## Overall Page Structure

The site is a **scroll-driven single-page portfolio** that progresses through roughly 5–6 distinct sections: a full-viewport hero with rotating title words, a transitional "About" moment, a long scroll-driven projects gallery, and an implied footer zone at the bottom. The visual rhythm is cinematic — each section commands the full viewport before yielding to the next. There is no traditional page chrome; everything flows as one continuous vertical experience.

---

## Header / Navigation

The header is **minimal and pinned to the viewport** — never obtrusive. It holds exactly four elements:

- **Top-left:** The brand logotype — a prominent mark that stays fixed across all scroll states. Its size is generous (~200px wide), acting more as a decorative anchor than a simple wordmark.
- **Bottom-left:** A persistent status line — location and availability indicator with a live status dot. Small caps, light weight.
- **Bottom-center:** A persistent availability statement — small caps, anchored to the bottom bar.
- **Bottom-right:** Primary CTA — with a decorative glyph. Same typographic register.

The bottom bar functions as a **persistent floating footer strip** — thin, always visible, spanning the full width in three clusters (left / center / right). It reads as a HUD rather than a traditional nav.

There is also a **vertical dot-navigation** on the far left — a column of small circles (filled = current section, outline = unvisited) sitting roughly centered vertically on the left edge. This gives positional awareness through the scroll without text labels.

---

## Hero Section

The hero is **aggressively typographic** — it is a full-bleed, full-viewport layout where oversized type dominates nearly the entire frame. Key layout decisions:

- **Title as fragmented display type:** The role descriptor is broken across multiple lines at display scale — letters are so large they bleed off the viewport edges. This is intentional: the type itself *is* the visual.
- **Split vertical zones:** Top half carries the large left-anchored title fragment. The right column holds the continuation at matching scale, creating a two-column typographic split without a visible grid line.
- **Floating image card:** A tilted/rotated photograph (~40% viewport width) floats in the lower-left quadrant, overlapping both the type and the base layer. The card has a slight rotation (~-10°), breaking the grid intentionally. It is layered *above* the background but *below* the full type stack — creating depth through z-index, not shadow.
- **Background:** Solid dark background — all type and the photo card sit against this uninterrupted plane.
- **Color contrast:** The accent display type against the dark background is the defining chromatic statement of the whole site.

As the user scrolls, the title words cycle — the hero is essentially a **scroll-driven typographic animation**.

---

## Section 2 — About / Bio

A quieter moment. The layout settles into a calmer register:

- The giant display type continues scrolling but a **left-aligned body paragraph** appears mid-frame — roughly 30% viewport width, sitting in the lower-left quadrant.
- The body copy is set in small caps at a comfortable reading size — a jarring contrast of scale against the display letters still looming above and below it.
- An outlined rectangle (empty/minimal) appears center-right — possibly a placeholder or a subtle UI device marking a focal point. No label, no content.
- The spatial relationship here is **hierarchical asymmetry**: the micro body text grounds the reader amid the macro type spectacle.

---

## Section 3 — Projects Gallery (Horizontal Scroll within Vertical Scroll)

This is the most complex layout zone. It appears to use a **horizontal carousel / slide-per-project system** nested inside the vertical scroll:

- Each project occupies a **full-viewport-width panel**, split into two zones:
  - **Left ~75%:** A large featured image/screenshot of the project — full bleed to the left edge, approximately 1200px wide. The image bleeds vertically to fill most of the viewport height.
  - **Right ~25%:** A sidebar panel with a dark/semi-transparent background, holding: project title in very large display type (top-right corner, partially clipped), a 1–2 line description in small body copy, an action button (Primary CTA), and optionally a featured badge.
- **Project name + dot pagination:** Below the image, a small project label paired with a row of small dot indicators (●○○○○) — indicating this project has multiple screenshots/states.
- The **dot nav on the left edge** updates to show which project is active.
- Some project panels show **background imagery bleeding beyond the main card** — the card sits centered with its own context image filling the full viewport as an atmospheric layer behind it. This creates a **foreground card / background bleed** spatial relationship.

---

## Footer

No traditional footer is visible — the site ends with the persistent **bottom status bar** that has been present throughout. This bar holds all contact/availability information, functioning as a continuous footer-as-navigation.

---

## Notable Layout Patterns

### Persistent Overlay HUD
The bottom bar + left dot nav form a persistent overlay system — they never scroll away. The logo in the top-left is equally persistent. The entire site lives beneath this HUD layer.

### Full-Bleed Atmospheric Backgrounds
In the projects gallery, full-viewport background images bleed edge-to-edge behind the main content card. The card itself floats centered within this atmosphere. This **foreground card + full-bleed atmosphere** pattern is the defining layout language of the gallery.

### Tilted / Rotated Floating Elements
The hero image card is rotated ~-10°, refusing to align to the grid. This is a deliberate visual statement: the layout is not rigid.

### Scale Contrast as Hierarchy
The entire site uses extreme scale disparity — display type at 300–400px alongside body text at 14–16px, with almost nothing in between. There are no medium-sized headings. Scale *is* the hierarchy.

### Overlapping Type + Image Layers
In the hero, text, image card, and background occupy distinct z-layers with explicit overlaps — the photo sits *inside* the letter forms visually, while the type reads above it. This depth through overlap (not shadow or blur) is the site's signature spatial move.