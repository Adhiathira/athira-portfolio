# Motion Brief — Bauhaus/Constructivist Design School

## Overall Design Grammar

The motion system must amplify the pedagogical, structural clarity of the Bauhaus interface. Motion is **functional and geometric**, never decorative. Animation serves to:

1. **Reveal structure** — grid lines animate in; layout geometry becomes visible through choreography
2. **Emphasize ideology** — the tilted hero heading rotates into its off-axis position as a statement of break from symmetry
3. **Guide reading sequence** — content reveals in grid order, top-to-bottom, left-to-right, teaching the eye how to scan
4. **Mark section boundaries** — primary color fields animate in as ideological shifts, not decorative transitions

Motion is **not continuous or organic**. Easing is linear throughout. Durations are fast (120–400ms). This creates a **mechanical, deliberate quality** — like a printed page being constructed in real time, not a consumer app showing off its smoothness.

---

## Scroll Opening

**Initial state:** Hero manifesto heading is invisible. Primary color field block sits off-canvas left. Grid lines in subsequent sections are invisible (opacity: 0). Navigation links are present but at 40% opacity.

**Construction sequence (0–800ms):**
1. **(0–250ms)** Primary color field block slides in from left at constant velocity (`linear`), filling 40–50% of hero background. No easing.
2. **(200–500ms)** Manifesto headline fades in and rotates from 0° to final 12° tilt. Linear easing, 300ms. The rotation feels mechanical — a printing press rotating the headline into place.
3. **(400–600ms)** Navigation links fade to full opacity (0.4 → 1.0).
4. **(550–800ms)** Secondary manifesto text scales from 0.92 → 1.0 and fades in, staggered 100ms after the main heading.

**Visual effect:** The hero is *constructed* before the viewer's eyes. Color slides in. Type rotates into place. Secondary text scales up. The construction happens in deliberate sequence, teaching the eye the grid-based hierarchy.

---

## Hero Experience

The hero is the **ideological entry point**. Motion establishes asymmetry and geometric tension.

**Static state while in viewport:**
- The tilted headline remains in its rotated position — no hover animation
- Primary color field is static
- CTA button: hover triggers linear color inversion (0.15s linear), no lift, no shadow

**As user scrolls past:**
- Headline text fades out (opacity: 1 → 0, 300ms linear) as it approaches viewport top
- Primary color field does not parallax — it scrolls at normal rate (Bauhaus rejects decorative parallax; the grid is fixed)
- Navigation bar remains always visible — 56px structural boundary, 4px bottom border present at all times

**No video in the hero.** The primary color field is the only visual story — static, geometric, color-based.

---

## Section Transitions

**White → Primary color manifesto section:**
1. A thin black line sweeps left-to-right across the section width (200ms linear) — architectural notation marking the boundary
2. (+100ms) Primary color field fades in left-to-right (200ms linear)
3. (+50ms) Manifesto headline fades in (opacity 0 → 1, 200ms)

**Primary color → White content section:**
1. Primary color field fades out (300ms linear) as viewport scrolls past
2. White background is revealed cleanly — no overlap, no dissolved edge

**Grid section → Grid section:**
1. 2px gap lines fade in (opacity 0 → 1, 300ms) as new section enters viewport center — structural disclosure
2. Grid lines remain visible for ~600ms, then fade out as user scrolls past
3. Content reveals in reading order (L→R, T→B) with 0.06s stagger between items

---

## Content Rhythm

Content elements reveal in **grid reading order**: top-to-bottom, left-to-right. This references Constructivist print reading systems and Bauhaus layout pedagogy.

**3-column grid section:**
- Grid lines appear first (opacity: 0 → 1, 200ms, linear)
- Row 1, col 1 → col 2 → col 3, each 50ms stagger
- Row 2, col 1 → col 2 → col 3, 80ms after row 1 completes
- Each item: `opacity: 0 → 1` over 150ms linear. No slide, no scale. Pure opacity — the element is either present or not.

**Heading reveals:** `slideFromLeft` animation — translateX(-100%) → translateX(0), 0.4s linear. The heading slides in at constant velocity like a horizontal bar being drawn.

**Bar reveals:** `.bauhaus-bar` elements animate via `constructBar` — width: 0 → 100%, 0.25s linear. The bar draws itself from left to right like a ruling pen across a drafting board.

---

## Footer Approach

**As footer enters viewport (20% threshold):**
1. Optional thin primary color line sweeps in above footer (300ms linear left-to-right)
2. Footer content fades in (opacity 0 → 1, 250ms linear)

**Footer in viewport:** All animation stops. Footer is a terminal state — motion ends here. No parallax, no continuous loop, no ambient video. The footer announces closure.

---

## Motion Principles

- **Easing: linear throughout** — no acceleration curves, no ease-in-out. Every movement is constant velocity. Machine-like.
- **Durations**: fast 0.12s (links, nav), base 0.25s (bars, grid lines), entrance 0.4s (slides, major reveals), slow 0.5s (section color fields). Never exceeds 500ms.
- **Stagger**: 0.06s between grid items. 100–150ms between heading/subhead/body.
- **No auto-play animations on load** except the hero construction sequence.
- **Scroll-triggered**: All section animations trigger via Intersection Observer — not timeline-based.
- **Reduced motion**: All animations respect `prefers-reduced-motion`. When reduced motion is active, everything appears instantly at full opacity with zero animation.

---

## Video Placements

**1. Workshop / Studio — `workshop-hands-on.mp4`**
- Section role: Mid-page "active workshops" or "current projects" section
- Subject: Hands working with design tools — sketching with ruler and compass, arranging colored paper rectangles, organizing type specimens on a light table, Constructivist geometric paper exercise
- Motion quality: Slow, deliberate, methodical. Long takes of hands arranging objects on a grid. 24fps, no quick cuts. Industrial lighting.
- Duration: 10s loop
- Why video: Humanizes the pedagogical content. Seeing hands do the work teaches that design is *craft*, not code. The deliberate pace matches the system's linear motion philosophy — nothing rushes.

**2. Grid Construction — `grid-construction-time-lapse.mp4`**
- Section role: "Design methodology" or "How we teach" section
- Subject: Time-lapse of a grid being constructed on paper — ruler dragging across, perpendicular lines being marked, column gutters labeled in pencil. Technical drawing documentation.
- Motion quality: 60–90 seconds of real-world process compressed to 10 seconds. Mechanical, precise, educational. Close-up on the ruler edge and pencil stroke.
- Duration: 10s loop
- Why video: The grid-construction video *explains* the grid philosophy without words. It teaches that the grid is not abstract but a physical, constructible thing — made by hand, with tools, with intention. Perfect pairing with a section describing grid methodology.

**3. Bauhaus Archive — `bauhaus-archive-footage.mp4`**
- Section role: Historical context or "Design heritage" section, dark background
- Subject: Archival footage of Bauhaus workshops — students at looms, typography exercises, geometric paper studies, design critiques. High-contrast black-and-white 16mm film (1920s–1930s).
- Motion quality: Slow, documentary, historically authentic. Film grain and slight degradation are structural — they signal weight, history, and lineage. 16–24fps, original frame rate preserved.
- Duration: 10s loop
- Why video: Archival footage authenticates the design system's philosophical lineage. The contrast between black-and-white archival and primary-color contemporary sections marks the tonal shift from pedagogy to history. This section earns ambient video because the temporal quality of archival film cannot be communicated by a still — the grain, the movement, the human presence in the workshop are only legible in motion.
