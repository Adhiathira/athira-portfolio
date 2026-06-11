# Motion Director Brief — Deckle Grain

*A brief for a design language where the interface is a bookshelf. The user arrives at a row of book spines standing on a wooden shelf. Clicking a spine pulls the book forward, opens it flat, and reveals its content — the other volumes slide apart to make room. Every motion is grounded in the physics of paper, binding, and wood. Duration is measured in the time it takes to pull a book from a shelf, open it to a marked page, and begin reading.*

---

## Landing Experience — The Bookshelf

The page arrives as a bookshelf. Five book spines stand upright on a wooden ledge, centered in the viewport. There is no loading sequence, no entrance cascade — the shelf is populated and still, as if the user has walked into a private library and is standing before it. The only motion on initial load is a 400ms `ease-out` opacity rise on the entire bookshelf container: not a reveal, but the moment the eye adjusts to the room's light. The shelf ledge, the headband strips at the top of each spine, the italic titles reading bottom-to-top — all are in position from the first rendered frame. Below the shelf: "Edinburgh · Est. 2009" in small caps, already present, already still.

**Hover:** When the cursor approaches a spine, the book tips forward 6 degrees on its Y-axis — `rotateY(-6deg), translateZ(10px)` over 0.3s `power2.out`. The shadow deepens beneath it. This is not a button state. It is the involuntary response of a physical book to a hand reaching toward it: the slight forward lean as the spine is gripped at the top. The motion must feel gravitational, not decorative.

---

## Book-Opening Animation

When a spine is clicked, a three-phase GSAP timeline plays over approximately 0.9 seconds total:

1. **Pull forward** (0.35s `power2.out`) — The clicked spine scales to 1.08 and translates forward on the Z-axis. Its shadow intensifies. This is the moment the hand grips the book and tips it toward the reader.

2. **Split the shelf** (0.4s `power2.inOut`) — The remaining spines slide apart: books to the left of the pulled volume move left, books to the right move right. They fade to transparent as they clear the stage. The motion is asymmetric — a bookshelf with two books on the left and two on the right of the pulled volume splits unevenly, preserving the spatial logic of the shelf.

3. **Open and navigate** (0.5s `power3.inOut`) — The pulled spine expands horizontally (`scaleX: 3`) and fades, as if the book is opening toward the viewer and filling their field of vision. On completion, the browser navigates to the target page, which arrives in the open-book layout.

For the "Deckle & Thread" home spine, no navigation occurs. The bookshelf fades out and the homepage book-flip content is revealed in place — the scroll-driven page-turn system takes over.

---

## Arrival at an Open Book

Sub-pages render immediately in the open-book layout: side spines flanking an open two-page spread. If the user arrived via a bookshelf click (detected by `sessionStorage`), a 0.5s entrance animation plays:

- The open book fades in from 95% scale (`opacity: 0 → 1, scale: 0.95 → 1`) — the book settling flat on the reading desk.
- Left and right side spines slide in from ±80px with 0.08s stagger — the remaining volumes finding their resting positions on either side.

If the user arrived via direct URL, the layout is static from the first frame. No animation plays. A returning reader does not need to watch a shelf rearrange.

---

## Page-Turn Scroll System

Within the open book's content area, the existing scroll-driven page-flip system operates. ScrollTrigger pins the book pages and drives diagonal clip-path sweeps from top-right to bottom-left — the physics of a hand turning a page. The fold-back overlay follows the crease angle using `Math.atan2()`, casting a gradient perpendicular to the fold line.

**Critical timing:** The page-turn motion occupies the full scroll distance between pages (one viewport height per turn). The fold is not a transition effect — it is the content delivery mechanism. The user reads by turning pages. The motion must feel like paper: slightly resistant at the start of the turn, accelerating through the middle, settling at the end.

---

## Side Spine Interactions

The spines flanking an open book are navigation elements. They respond to hover with the same 6-degree Y-axis tilt as the bookshelf view. On click:

1. The spine tilts forward sharply (`rotateY: -15deg, z: 30, scale: 1.05`) over 0.25s — the book being pulled from its resting position.
2. The spine fades to transparent as it lifts (`opacity: 0, z: 60`) over 0.2s.
3. The browser navigates.

The receiving page plays the standard arrival animation: book settling, side spines sliding in.

---

## Content Rhythm

Within the open book, content is still by default. The page-turn clip-path is the primary temporal event. No scroll-triggered entrance animations are permitted on body text, headings, or standard content blocks — the page turn itself is the entrance animation. The one exception: plate grids (image galleries within the editions pages) resolve with a 150ms-staggered upward translate on their panels, differentiating the gallery from surrounding static typography.

Hover interactions on links and buttons use 0.75s transitions — long enough to feel like a deliberate acknowledgment, short enough to never stall the reading flow.

---

## Motion Principles

This system operates on the physics of **paper, binding, and furniture**. Motion references are:

- **Paper:** Page turns, fold creases, the slight spring of a sheet settling
- **Binding:** The resistance of a spine being opened, the gutter shadow between pages
- **Wood:** The solidity of the shelf, the weight of a book resting on it, the tap of a spine being pushed back into place

Primary easing: `power2.out` for physical motions (pulling, settling), `power3.inOut` for shape transitions (book opening, spine expanding). No springs, no bounces, no overshoots. Paper does not bounce. Wood does not spring.

Duration hierarchy:
- Spine hover: 0.3s (reflexive — the book responding to proximity)
- Book pull-out click: 0.9s total (deliberate — the reader choosing)
- Page turn: scroll-driven, approximately 1 viewport height (the reader's pace)
- Arrival animation: 0.5s (the book settling — involuntary)
- In-page hover: 0.75s (the reader's focus lingering)

---

## Video Placements

### 1. Hero Background — `hero-bg.mp4`
**Section role:** First page of the "Deckle & Thread" home book, visible after opening the home spine
**Subject:** Extreme macro slow-drift across dampened cotton rag paper under a single raking light source — the camera moving imperceptibly across the deckle edge of a freshly torn sheet. The texture of the fibers, the irregularity of the torn edge, the way light catches moisture still held in the cotton — the surface should fill the frame entirely. No press, no hands, no tools. Just the paper as material fact.
**Motion quality:** Ultra-slow lateral drift (~1.5% of frame width over 10 seconds); the directional light migrating across fiber texture, revealing characteristics invisible from a single angle — the way individual cotton fibers catch and release light, the micro-topography of the deckle edge
**Mood:** Material intimacy; the paper understood as the beginning of every printed object
**Duration:** 10s loop
**Why video:** A still photograph freezes paper in one angle of light. At 10 seconds, the viewer experiences the deckle edge as temporally present — light reveals fiber directions, moisture catches and releases highlights. The temporal quality communicates what a caption can only claim: this paper is alive, and it was made this way on purpose.

### 2. Process Documentation — `process-ambient.mp4`
**Section role:** The process or craft documentation section — how the letterpress work is made
**Subject:** A single, unhurried impression being pulled on a Vandercook cylinder press. The camera is locked at 45 degrees to the press bed, capturing the cylinder's slow traverse across the locked-up type form. Ink transfers to dampened paper in a single pass. The human presence is minimal: a hand at the edge of frame steadying the paper, or adjusting the gripper bar. The action completes once — cylinder forward, impression made, cylinder returned — and the loop begins.
**Motion quality:** Camera locked; the only motion is the mechanical traverse of the cylinder and the slow emergence of the printed impression; 5-second single take, no cut
**Mood:** The impression as accumulated evidence; the quality of the finished broadside rendered as observable labor
**Duration:** 5s loop
**Why video:** A photograph of a Vandercook press documents equipment. Ambient video renders the act of printing as present-tense and ongoing — the cylinder crosses the form, ink meets paper, the impression appears. The loop makes the gesture feel habitual: something that happens fifty times this morning, eighty copies of the same poem, each one pulled by hand.

### 3. Studio Context — `context-ambient.mp4`
**Section role:** About section establishing the physical world of the studio
**Subject:** The composing room at 14 Canongate Close in a moment of organized stillness. Metal type sorted in California job cases. A galley of set type waiting to be locked up. A brayer resting in an ink tray. Raking light from a north-facing window crosses the stone floor and illuminates suspended dust. No human presence. The space communicates that it is between operations — the morning's printing done, the afternoon's composition not yet begun.
**Motion quality:** Camera locked or drifting imperceptibly (<1% of frame over 5 seconds); environmental motion only — dust crossing a light beam, a reflection shifting across a polished chase, the imperceptible settling of paper on a drying rack
**Mood:** Place as argument for craft; the physical studio rendering itself as evidence of its practice
**Duration:** 5s loop
**Why video:** An about section asks the viewer to understand a world. A still photograph of a composing room shows an arrangement; ambient video renders the space as present-tense and inhabited — light shifts, dust moves, paper breathes on its rack. The viewer who watches for 5 seconds understands the studio as real and active, which transfers credibility to the printed editions without requiring a statement of values.
