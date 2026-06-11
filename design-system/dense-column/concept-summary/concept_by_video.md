# Motion Brief — Brutalist Editorial Design System

## Philosophy

**ZERO MOTION. INSTANT STATE CHANGES. ANTI-ANIMATION.**

This is a brutalist platform. Motion in the service of decoration is rejected. Movement happens only when function demands it. All transitions are immediate or mechanical. No easing. No ease-in-out. No "feels natural" illusions. The page snaps into being.

---

## Scroll Opening

**Content snaps into existence on page load.** No fade-in. No slide animation. No progressive reveal choreography. The hero appears fully rendered, immediately visible, all at once. The 160px Anton headline is present the moment the page is interactive. Navigation bar with its 8px bottom border is ready.

This is **raw immediacy**. No animation for arrival. The page *is* when you arrive. The browser renders; you read. No transition between loading and loaded.

---

## Hero Experience

The massive Anton headline (160px, all-caps, line-height 1.0) does not animate. It exists. It does not scale from small. It does not fade from invisible. It does not move on hover. The text occupies the viewport with force and remains.

**No video in the hero.** The headline IS the visual story. A video background would dilute the typographic force. The hero is a newspaper front page — the masthead, the date, the headline. Static. Declarative. Already there.

The CTA button below the headline switches states instantly on hover: white background becomes blue (#0071e3), no transition. The transition IS the state change. There is no in-between frame.

---

## Section Transitions

**Abrupt cuts between sections.** No sinusoidal wave dividers. No smooth easing. No progressive fade between states. When a section ends, `.brutal-divider` (2px or 4px solid black border-top) marks the transition — a horizontal rule, not a curve.

Scroll is navigation, not animation trigger. As viewport scrolls, sections appear fully rendered. No fade-in on intersection. No stagger. No parallax. The newspaper column is present or it is not.

---

## Content Rhythm

Elements appear **instantly** as they enter the viewport. No Intersection Observer animations. No `opacity: 0 → 1`. No `translateY(-20px) → 0`. Content in the 6-column grid is present or absent.

If mechanical state change is needed (e.g., active nav link): instant color change to red (#e30000). One frame. Binary.

Typography works because of its scale, not its animation. 160px Anton needs no entrance effect to demand attention.

---

## Footer Approach

**Plain terminal state.** The footer is the end. `.brutal-divider` (4px solid black border-top) marks the boundary above the footer — the heaviest rule on the page. Then: Space Mono 12px links, copyright text. Static. No hover animations (or hover is instant color change, no smoothing). No "back to top" animation. The footer announces: content ends here.

---

## Motion Principles

- **All transitions: 0s** — no intermediate frames, no easing curves
- **Easing: step-start** — binary state change (off/on, not a curve)
- **No keyframe animations** — no entrance effects, no loading animations, no looping motion
- **No scroll-triggered reveals** — content is immediately visible when scrolled to
- **No parallax** — the page is flat, not a stage set
- **No micro-interactions** — hover states change instantly or not at all
- **No skeleton screens** — content loads or it doesn't; no theatrical loading state
- **Reduced motion: already at zero** — the system is already fully accessible by default

---

## Video Placements

Video is placed **only where it documents reality**, not where it decorates mood. Three placements are permitted for this brutalist editorial platform.

### 1. Process Documentation — `editorial-process.mp4`
- **Section role**: "How we work" or "Our methodology" — mid-page content section, full-width
- **Subject**: Hands at a desk — marking up printed pages with red pen, arranging layouts on a table, typing at a terminal. Close-crop, industrial lighting. No color correction. Real environment.
- **Motion quality**: Documentary. Real time or minimal acceleration (1.5×). No slow-motion. No music. Environment sound only (typing, paper, ambient room). Single continuous take or minimal cuts.
- **Duration**: 20–30 seconds, looped
- **Why video**: Shows process happening over time — the mark-up, the correction, the iteration. A still image is one moment; the work is multiple moments. Video is the only honest medium for depicting revision as practice.

### 2. Material Close-Up — `typographic-specimen.mp4`
- **Section role**: "Typography system" or "Type specimens" section — product feature showcase
- **Subject**: Close-up of printed Anton letterforms on large-format paper. Camera pulls slowly from extreme macro (individual ink grain visible) to reveal full letter, then full word. Harsh raking light emphasizes the physical ink.
- **Motion quality**: Clinical. Slow continuous pull. Real-time. Single take. No color grading — white paper, black ink, grey shadow.
- **Duration**: 15–20 seconds, looped
- **Why video**: Shows that typography has physical weight — ink on paper. The macro-to-wide reveal communicates scale in a way a static image cannot. The movement earns its place because it is teaching, not decorating.

### 3. Field Documentation — `platform-in-use.mp4`
- **Section role**: "Case studies" or "In the field" section — evidence of real-world deployment
- **Subject**: Screen recording of the platform in actual use — someone navigating, building, editing. Cursor movement is direct and purposeful. No mouse choreography for the camera. Real workflow, unedited.
- **Motion quality**: Direct capture. Real time. No post-production. Monochrome or desaturated post-capture if needed for aesthetic coherence. The screen is the subject.
- **Duration**: 30–60 seconds, looped
- **Why video**: A still screenshot is a claim; a screen recording is evidence. Showing the platform working proves it works. The brutalist platform earns its documentary video placement because documentary is all it permits.

---

## Anti-Motion Rules

**DO NOT:**
- Animate entrance via scroll (no GSAP ScrollTrigger)
- Use parallax depth effects
- Add loading animations or skeleton screens
- Ease color state transitions (they must be instant)
- Fade between sections
- Slide text into view
- Stagger reveals across grid columns
- Use any keyframe animations except for cursor/caret behavior in inputs
- Add micro-interactions (no hover scale, no hover lift, no hover shadow)

**DO:**
- Render content immediately on load
- Use instant (0s) state changes for all interactive elements
- Place video only where it documents real process or real usage
- Treat scroll as navigation, not as an animation timeline
- Keep all text static and fully readable without any motion
