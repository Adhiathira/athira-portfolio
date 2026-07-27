# Layout Brief: Brand Name Marketing Site

This is a masterclass in restrained, systematic marketing site layout design. The whole page is built on a visible architectural grid, where the structure itself becomes a decorative element. Here's the full breakdown.

## 1. Overall Page Structure

The page is a long single-column scroll composed of roughly seven major zones: announcement bar, sticky header, centered hero with a large product mockup, a logo wall, a massive scroll-driven feature section (with five sub-chapters), a dark full-bleed secondary feature section, and a final feature section that continues in dark mode. The flow alternates between light and dark passages, which creates chapter breaks in an otherwise very quiet, monochrome page.

The defining structural move: the main content lives inside a **bounded content frame** with thin vertical hairline rules running down both edges, roughly 10% in from each side of the viewport. Nearly every section snaps to this frame, and horizontal hairlines close off each section. The page reads like a technical drawing — every module has a visible boundary, and the gutters outside the frame stay empty. This gives the page a spine and makes the rare full-bleed moments feel intentional.

## 2. Header / Navigation

Two stacked bars:

- **Announcement bar** — a full-width dark strip, ~55px tall, with a single centered line of text plus arrow, and a dismiss "×" pinned to the far right. Highest-contrast element on the page, but very thin, so it reads as a ribbon rather than a section.
- **Main nav** — light, ~80px tall, sticky on scroll, with a hairline bottom border. Classic three-zone layout: logo left, primary links (four nav items) grouped left-of-center right beside the logo rather than centered or spread out, and two CTAs on the right — a ghost Secondary CTA and a solid dark pill Primary CTA. The left-clustered nav links leave a large calm void in the middle of the bar. Total nav weight is light; the dark pill button is the only anchor of visual mass.

The nav stays pinned throughout the entire scroll, always paired with the dark announcement bar above it.

## 3. Hero Section

Fully centered, symmetrical, single-column — no split layout, no asymmetry. Vertical stack, all center-aligned:

1. A small pill-shaped eyebrow link with generous space above it
2. A very large statement headline — the type scale here is enormous relative to everything else on the page, easily 4–5× the body size
3. A two-line muted subheadline
4. A horizontal pair of buttons: ghost Secondary CTA + solid dark Primary CTA, sitting side by side with equal visual footprint

Below the copy block sits the hero's payoff: a **large browser-chrome product mockup** (window controls included) spanning nearly the full content frame width. It's cropped at the bottom by the viewport fold, so the app UI bleeds off-screen — a deliberate "there's more below" cue. The background behind the hero is a whisper-subtle gradient with a faint vertical pinstripe texture that intensifies into an accent-tinted band behind the mockup's lower half. So: centered editorial top, full-width immersive artifact bottom.

Inside the mockup itself there's a two-panel app layout (sidebar + main canvas) — the product screenshot carries its own information hierarchy, and the marketing page stays out of its way.

## 4. Content Sections Below the Hero

### Logo Wall
A strict **5-column × 3-row grid of equal cells**, each cell divided by hairline rules — a true table, not a floating logo row. One logo centered per cell, all rendered in monochrome. A few cells carry a small diagonal arrow in the top-right corner, hinting those logos link to case studies. The uniform cell size forces rhythm; no logo dominates.

### Main Feature Section (the biggest section)
Opens with a small pill label and an oversized two-tone headline — bold dark first sentence, then continuation in muted grey. This two-tone headline pattern repeats throughout the whole page and is the site's primary hierarchy device.

Then comes the signature layout of the page: a **two-column sticky-scroll arrangement**:

- **Left rail (~25% width):** a vertical text index — five feature category labels (Feature A / Feature B / Feature C / Feature D / Feature E). The active item is dark with a small vertical tick mark on its left; inactive items are pale grey. This rail is sticky and acts as a scroll progress indicator across five sub-chapters.
- **Right area (~75% width):** stacked content panels, each bounded by hairlines. Each sub-chapter follows the same internal rhythm: a two-tone statement paragraph (bold lead + grey continuation) set in a generous panel, followed by a large product visualization panel below or beside it.

The product visualizations vary per chapter and are the page's texture:
- A **data table mockup** with an overlapping **floating composer card** anchored to the right edge, sitting on top of the table with a soft shadow — a genuine overlapping layer, one of the few on the page.
- A **workflow diagram** on a dotted-grid canvas: rounded node cards connected by thin routed lines, with small status pills floating above the nodes.
- A **kanban board** of four columns, the last column bleeding off the right edge of the frame — another intentional crop implying horizontal continuation.
- **Floating record cards** (a detail card, a secondary panel) placed in adjacent cells of a two-column sub-grid.
- **Dashboard charts** paired with an answer panel in a two-column split.

Between statement panels and visuals the section frequently splits into **two equal side-by-side cells** (paired mini-headline moments), each cell holding its own mini-headline, subcopy, and floating UI cards. The hairline grid keeps these paired cells crisp.

### Dark Secondary Feature Section
An abrupt inversion to a full-dark canvas. It opens with a dramatic full-width visual — a thin glowing arc (an eclipse/horizon motif with a gradient stroke) spanning the entire content frame. Below it, a **5-column row of equal feature cells**, mirroring the logo wall's geometry: each cell has a small line icon top-left, then a bold one-line claim and two lines of muted grey copy bottom-aligned. Icon at top, text pinned low — the empty middle of each cell gives the row air.

### Final Feature Section
Still dark. Pill label + two-tone headline (light bold + grey continuation) sits in the **left half only**, while the right half holds a radial/orbital line visualization. This is a 50/50 asymmetric split — text weight left, graphic weight right — cut off at the fold in these captures.

## 5. Footer

Not captured in these screenshots. Based on the section rhythm, expect it to continue the dark passage or return to light within the same bounded frame.

## 6. Notable Layout Patterns

- **The visible hairline grid** is the site's identity. Vertical page-edge rules + horizontal section rules turn the layout into an exposed skeleton. Sections don't float in whitespace; they're *cells in a drawing*.
- **Sticky left navigation rail** through the long main feature section — the standard "scrollytelling index" pattern, executed with minimal styling (just weight and a tick mark).
- **Sticky global header** with a persistent dark announcement bar.
- **Two-tone headlines** (bold ink + muted grey in one continuous sentence) do almost all hierarchy work — very few font-size changes outside the hero.
- **Floating/overlapping UI cards**: the composer card over the table, record cards with soft shadows, status pills over workflow nodes. Shadows are shallow and diffuse; nothing skeuomorphic.
- **Intentional cropping**: hero mockup cut by the fold, kanban's fourth column cut by the frame edge, a content panel fading out at a section boundary. Cropping is used consistently to imply depth and continuation.
- **Light→dark chaptering**: the switch to dark is the single loudest move on the page and marks the shift between the page's two narrative halves.
- **Whitespace discipline**: sections get very tall padding (statement panels are often ~60% empty), and the muted grey copy keeps contrast low so the product mockups — the only colorful, detailed elements — always win attention.

**Overall proportions and rhythm:** content frame ~80% of viewport width; feature rails split roughly 25/75; paired cells split 50/50; grids come in 5-column modules. The rhythm alternates *statement panel → artifact panel* all the way down, like a gallery: wall text, then the piece, wall text, then the piece.