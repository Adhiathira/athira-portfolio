# Brand Name — Layout Design Brief

---

## 1. Overall Page Structure

The page is a long-scroll narrative experience with approximately **8–10 major sections**, each functioning as a full-viewport "chapter." The flow is cinematic: the user moves through the story of the product from introduction → lifestyle promise → technical features → social proof → product details. Sections alternate between full-bleed immersive moments and more intimate, contained layouts, creating a deliberate push-pull rhythm between openness and focus.

---

## 2. Header / Navigation

**Sticky global header** composed of three completely separate floating elements — not a single unified bar:

- **Top-left:** A small square pill/badge (white, heavily rounded corners) containing only the brand logomark. It sits independently at the top-left corner, appearing to float over all content below.
- **Top-right:** Two sibling elements — a small square pill with the hamburger menu icon (same white rounded-square treatment as the logo), and a **primary CTA button** ("Primary CTA") with generous border-radius. These float independently at the top-right.
- **Top-center:** A slim **announcement bar** in a brand accent color sits flush at the very top of the viewport, full-width, with centered small-cap text. This is the only element that spans edge to edge.

The nav has no connecting bar or background — the logo and menu float in space, which allows hero imagery to show through behind them. This is a deliberate transparency-forward nav strategy.

---

## 3. Hero Section

**Full-bleed, full-viewport-height cinematic hero.**

- A large-scale product photograph fills the entire screen edge to edge, top to bottom (below the announcement bar).
- Massive typographic headline is **overlaid directly on the image**, set in an extremely large weight, anchored center-right but extending nearly full width. The text does not sit in a box — it bleeds into the image, with the product sitting in front of/below the letterforms, creating a layered depth effect.
- **Bottom-right floating inset:** A secondary video thumbnail appears as a **picture-in-picture** element — a rounded-corner card floating over the bottom-right of the hero image. This is a deliberate asymmetric accent, roughly 30% of viewport width, that anchors the composition and adds a secondary focal point.
- No visible text lockup block or CTA button in the hero itself — the navigation primary CTA button serves that role persistently.

**Spatial hierarchy:** Image fills 100% → Giant headline at ~60–70% viewport height overlaid → floating PiP video at bottom-right as tertiary element.

---

## 4. Content Sections Below Hero

### Section 2 — Full-Bleed Text-on-Color
A **full-viewport section** with a flat, neutral background. A single centered headline sits in the vertical center of the screen. Text is very large, bold, and slightly desaturated — nearly blending into the background tone. No imagery, no supporting copy — pure typographic breathing room. The section feels almost transitional, a pause between visual moments.

---

### Section 3 — Split-Screen Dual Image (Mode A / Mode B)
A **true 50/50 horizontal split** spanning full viewport width and height. Left half: a darker, warmer-toned image (Mode A lifestyle). Right half: a cooler image (Mode B). The product straddles both panels at center, creating a visual bridge. Typographic labels sit in the lower-third of each respective panel in large white bold type. This is a **semantic layout** — the split is both compositional and conceptual.

---

### Section 4 — Full-Bleed Video/Image with Transitional Strips
A **full-width landscape photo** with a centered headline overlay. The left and right edges of this section show **partial glimpses of the preceding section's panels**, suggesting this is either a horizontal scroll or a layered z-axis reveal — the previous panel peeks in from the left edge, while the next peeks from the right. This creates a **parallax strip** effect: the content feels like it's sliding through a window.

---

### Section 5 — Image + Floating Text Card (Two-Column Asymmetric)
The full-width landscape image from the previous section **persists or transitions into** a layout where a **text card appears floating at the bottom-right**, roughly 30% viewport width, with a translucent light background and rounded corners. It contains 2–3 lines of body copy. The relationship is asymmetric: ~70% image, ~30% text card overlapping the image's bottom-right corner. The text card doesn't displace the image — it layers over it.

---

### Section 6 — Full-Bleed Text + Color Block (Two-panel Vertical)
The viewport shows **two stacked zones**:
- Upper: Dark full-bleed section with a large left-aligned bold headline at the top.
- Lower: A light section beginning to enter from the bottom, with a large centered headline rendering in a **dual-weight treatment** — alternating between dark solid text and lighter ghost text on alternating words. This creates a staggered typographic rhythm.

The transition between sections is a clean horizontal cut — no overlap, no gradient.

---

### Section 7 — Testimonials / Story Cards (Horizontal Scroll Gallery)
A **4-up horizontal card row** sits below a slim horizontal divider. Cards are:
- **Equal width**, roughly 25% each of the viewport
- Tall rounded-corner image thumbnails in the upper portion of each card
- Short caption text below (story title in small body type)
- **Navigation arrows** float at the far right, vertically centered relative to the cards — indicating a carousel/swipeable component

Above the card row, there is a very faint single horizontal rule and a centered "+" icon — a subtle structural marker dividing the quote/testimonial heading area from the card grid.

---

### Section 8 — Feature Detail: Split Panel (Features Tabs)
A **two-column asymmetric split** — roughly 35/65:
- **Left panel:** Light background with subtle dot-grid texture. Contains: feature name in large display heading type, a thin horizontal rule with a "+" icon, and a 3-line body copy description at the bottom. Vertical spacing is very generous — the feature name sits in the upper-third, the copy sits in the lower-third, leaving a large open middle zone.
- **Right panel:** Full-bleed product photograph, edge to edge, no padding.

A **horizontal tab bar** runs along the bottom of the left panel only (not full-width) — numbered feature labels ("1. Feature A, 2. Feature B…") in small caps. The active tab is indicated by slightly bolder or underlined treatment.

A **full-width action button** spans the entire left panel width at the very bottom, in a neutral translucent treatment.

The left panel appears to **scroll or swap content** while the right image transitions — a sticky-panel pattern where the left stays fixed and the right image changes per feature tab.

---

### Section 9 — Feature Tabs in Transition (Animation State)
The same 35/65 split layout, but captured mid-transition: the feature title text is **visually stacked/overlapping** — multiple headlines from sequential tabs are simultaneously visible, creating a blur/stagger effect. This is a scroll-driven animation where the previous title slides out as the new one slides in, and the screenshot caught them mid-state. The right image has also changed to show a close-up product shot corresponding to the new tab.

---

## 5. Footer Layout

Not fully visible in the provided screenshots. The page cuts off during the feature detail section.

---

## 6. Notable Layout Patterns

### Floating / Detached Navigation
The logo and menu are independent floating pills — not a unified navbar — allowing hero content to read as truly full-bleed. This is a high-design choice that requires careful z-index management but creates a premium, editorial feel.

### Full-Viewport Chapter Sections
Each section is designed to fill the viewport completely. The page reads as a sequence of "slides" in a vertical narrative, not a traditional scrolling article. Spatial rhythm is controlled by section-to-section contrast: dark/light, image/type, full-bleed/contained.

### Sticky Split Panel (Features Section)
The left text panel appears fixed/sticky while right-side imagery scrolls or fades. This is a classic "scrollytelling" pattern — it maintains orientation while advancing narrative content.

### Overlapping Text + Image Layers
Multiple sections use text directly overlaid on imagery with no box or scrim — the typography is large enough and contrasty enough to read without a background. This keeps the visual plane unified rather than creating foreground/background divisions.

### Asymmetric Floating Insets
Both the hero PiP video thumbnail and the body copy card (Section 5) use **floating inset elements** anchored to the bottom-right — a consistent compositional signature across the page that creates visual familiarity without rigidity.

### Scroll-Driven Text Animation
The section testimonial headline uses a **split-weight typographic reveal** — alternating solid and ghost words — suggesting a scroll-triggered animation where words "fill in" as the user scrolls into the section.

### Dot-Grid Texture
The left panels in the feature section use a subtle dot-grid or grain texture on the light background — adds tactility and differentiates the informational panels from the photographic panels without competing with either.