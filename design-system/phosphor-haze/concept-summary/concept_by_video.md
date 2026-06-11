# Motion Brief — Neon Reverie: Vaporwave Lo-Fi Streaming Platform

## Global Motion Principles

- **Timing base**: 0.8s — slow, meditative, unhurried
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` everywhere — smooth but not sharp. Everything dissolves rather than snaps.
- **Tone**: Hypnotic, analog-warm. Motion should feel like watching a cassette tape play — continuous, slightly worn, slightly soft.
- **Chromatic aberration**: Persistent, subtle red/cyan fringing at edges. Pulses every 8–10 seconds.
- **Scan-line texture**: 2–3% opacity overlay on atmospheric sections.

---

## Scroll Opening (Page Load — CRT Warmup Effect)

**Duration**: 1.2–1.5s total

**Sequence**:
1. (0–0.3s) Black screen. A thin horizontal CRT scan line sweeps top-to-bottom at 20% opacity. Parallel scan lines flicker in at low frequency.
2. (0.3–0.8s) White page background fades in beneath scan effect. Simultaneously, the perspective grid floor in the hero media zone begins drawing — neon grid lines extending outward from the vanishing point, line by line.
3. (0.8–1.2s) Headline (Exo 2 85px) fades in and rises `translateY(20px → 0)` with ease-out curve. Logo and nav fade to full opacity. CTA buttons scale in `scale(0.9 → 1.0)` with ease-out-cubic, then settle with a brief neon glow pulse.
4. (1.2s+) Neon city video in the hero begins fading in over 0.8s, bringing the dreamscape to full opacity.

**Visual effect**: The page warms up like a CRT monitor — from black to scan lines to warm white to neon. The user experiences the interface materializing before them.

---

## Hero Experience

**Primary video asset: neon-descent-loop.mp4**

The hero media field is a **full-bleed 60-second ambient video loop** of a neon city at night:
- Perspective grid floor (neon purple and cyan lines) receding into the infinite distance
- Distant neon signs and architecture reflected in rain-slick surfaces
- Slow particle drift (digital motes, embers) across the viewport at 5px/s
- Every 8–10 seconds: red/cyan chromatic aberration pulse at screen edges (5–8px displacement, fades over 1s)

The camera moves in a very slow continuous descent through the grid — like falling through digital memory at 0.01 seconds per frame.

**Interactivity**: On mouse move, the neon city shifts in inverse parallax at 3–5% of cursor displacement. Glowing `+` symbols appear and fade near the cursor as the user explores the hero zone.

**Static state**: The warm-field control zone (nav + headline) does not animate after load. It is stable — the analog anchor to the neon world below.

---

## Section Transitions

### Hero → Playlist Section

**Trigger**: Scroll or CTA click.

**Duration**: 0.8–1.0s

**Sequence**:
1. (0–0.2s) Chromatic aberration intensifies — red/cyan fringing to 15–20px displacement. Neon grid flickers.
2. (0.2–0.6s) White background in warm field transitions to a slightly different tonal warmth (pale lavender or cream). Signals state change.
3. (0.6–1.0s) Hero media zone fades out (ease-in). New section fades in (ease-out) with its own media.
4. Throughout: A horizontal scan-line sweep crosses the viewport — the VHS transition metaphor.

### Content Section → Content Section

Soft opacity fade (0.4s) as section enters viewport center. Background color shift is the only explicit boundary. No hard dividers.

---

## Content Rhythm

### Per-Element Entrance (Scroll-Triggered via Intersection Observer)

**Stagger**: 0.15s between elements

- **Headline**: Fades in (0–0.6s) and rises (`translateY(20px → 0)`) with ease-out-cubic.
- **Body copy**: Fades in (0.15–0.55s) and rises, staggered 0.15s after headline.
- **Buttons/CTAs**: Fade in (0.3–0.7s), rise, then brief scale pulse (1 → 1.05 → 1 over 0.2s) to signal interactivity.
- **Cards**: Fade in (0.2–0.8s) with no rise — just opacity. On complete fade, a brief neon border glow appears and fades (0.3s). Albums and playlists materialize out of the dreamscape.

**Easing**: `ease-out-sine` for fades. `ease-out-cubic` for rises. Combined they create a musical, choreographed rhythm.

---

## Footer Approach

As the user scrolls toward the footer, the page **gradually desaturates and darkens** over 2–3 seconds of scroll distance. By the footer, colors are muted (10–20% saturation remaining). The neon world is fading.

Scan-line effect intensifies — faster flicker (every 0.5s) suggesting a CRT losing signal.

The footer itself: Russo One monochrome, Space Mono subtext, all opacity at 60–70%. A terminal state. The dream is ending.

Any hover over footer CTAs: neon glow returns instantly (0.2s ease-out) — the dream is still accessible. The user can scroll back up to return.

---

## Motion Principles

- **Base timing 0.8s** — never faster than 0.4s, never slower than 1.5s (except footer desaturation)
- **Easing: `cubic-bezier(0.4, 0, 0.2, 1)`** everywhere — the Google Material smooth curve, adapted for dreamy pacing
- **No snap/instant transitions** — all state changes dissolve
- **Neon glow on all interactive elements** — `box-shadow` intensity is the hover/active signal
- **Chromatic aberration pulse** — persistent, subtle, every 8–10 seconds
- **Reduced motion**: when `prefers-reduced-motion: reduce`, all animations disabled except static glow states

---

## Video Placements

### 1. Hero Video — `neon-descent-loop.mp4`
- **Section role**: Full-viewport hero background, primary atmospheric anchor
- **Subject**: Perspective isometric grid floor (neon purple/cyan lines) receding to horizon. Slow descent through the grid. Distant neon signs reflecting in rain. Particle drift at 5px/s. Chromatic aberration pulses every 8–10s.
- **Motion quality**: Continuous ambient drift. No cuts. 60fps. 60–90 second loop, seamless.
- **Duration**: 60–90 second loop
- **Why video**: A still image of the grid is a diagram. Video of the grid in slow motion is an *experience*. The continuous movement communicates that this is a place you inhabit — not a product you evaluate.

### 2. Studio / Genre Showcase — `lo-fi-studio-ambient.mp4`
- **Section role**: Mid-page "Genre Rooms" or "Curated Playlists" section, full-width above or beside the playlist grid
- **Subject**: A slow pan through a retro music production studio: vinyl records on shelves, Moog synthesizer keys, cassette tapes in amber lamp light, occasional neon reflection in glass. Camera moves 5–10px/s, unhurried.
- **Motion quality**: Warm documentary. Slightly soft focus. 24fps. No quick cuts. Amber and magenta color palette.
- **Duration**: 45–60 second loop
- **Why video**: Establishes lo-fi music as a craft. The human warmth of the studio — the physical records, the analog instruments — positions the platform as a curation service with editorial soul, not an algorithm.

### 3. Abstract Synthwave — `chromatic-abstract-loop.mp4`
- **Section role**: "Featured Artist" or "Now Trending" showcase section, lower mid-page or end-of-fold
- **Subject**: Purely abstract motion design: layered neon color planes (pink, cyan, purple, magenta) that slowly shift and dissolve. Geometric shapes (circles, grids, stripes) animate in/out at 8–12s transitions. Baked-in chromatic aberration creates the illusion of 3D depth.
- **Motion quality**: Pure digital. No photographic elements. 90–120 second loop, no visible reset. Deep blacks, neon pinks, cyans, magentas.
- **Duration**: 90–120 second loop
- **Why video**: This section celebrates music as pure mood. The abstract visuals leave space for the user's imagination. A still frame of abstract color is a painting. The same frame in slow motion is a *feeling*. This is the peak of the dreamscape experience.
