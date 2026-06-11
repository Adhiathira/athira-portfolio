# Motion Brief — Null Signal: Glitch/Data Interface

## Global Motion Principles

- **Timing base**: 0.15–0.2s — twitchy, machine-like, instant
- **Easing**: `cubic-bezier(0.55, 0, 1, 0.45)` everywhere — sharp mechanical decelerate, not organic ease
- **Tone**: Cold, operational, fragmented. Motion should feel like watching a system process requests — deterministic, fast, occasionally glitching
- **Data reveal**: Animations reveal content as clip-path steps (4 discrete increments over 0.2s) — terminal line-by-line loading
- **Glitch pulse**: Key transitions include a brief rgb-split chromatic aberration flicker (0.15s) acknowledging the arrival of new data

---

## Scroll Opening (Page Load — System Boot Sequence)

**Duration**: 0.4–0.6s total

**Sequence**:
1. (0–0.05s) Near-black background instantiates. No fade — the machine is already on. A single horizontal scanline sweeps top-to-bottom (1px, opacity 0.06), taking 0.3s.
2. (0.05–0.15s) Navigation bar materializes: IBM Plex Mono links and magenta bottom border appear via a 4-step clip-path reveal (left-to-right, step-start, 0.15s).
3. (0.15–0.3s) VT323 headline (88px, uppercase) arrives with a glitch-shift flicker — translateX(-4px → 2px → 0) over 0.15s, followed immediately by rgb-split chromatic aberration (0.1s) that resolves to clean white.
4. (0.3–0.4s) Subheadline and body text arrive via opacity transition (0.1s) — appearing like text being printed to terminal.
5. (0.4–0.5s) CTA buttons snap in — clip-path 4-step reveal (0.15s each), then magenta glow box-shadow blooms to full intensity over 0.1s.

**Visual effect**: The page boots like a command-line terminal initializing — structured, fast, with controlled glitch artifacts that announce system presence.

---

## Hero Experience

**Primary video asset: hero-monitor.mp4**

The hero media field is a **full-bleed 10-second ambient video loop** of CRT monitor presence:
- A static shot of a CRT monitor displaying a dark screen (`#19191c`) with barely-visible scanlines drifting downward at 0.25× speed
- Occasional electromagnetic flicker — imperceptible opacity jitters at 0.1–0.3s intervals
- No subject, no content, no light source — pure electronic presence
- The magenta accent `#fd356e` never appears in the video — it is reserved for the overlay interface layer

**Interactivity**: On hover over data cards, the card receives a brief `glitch-shift` animation (0.15s) and a magenta neon glow border — the card responds to cursor presence like a terminal process acknowledging input.

**Static state**: The near-black background is the fixed condition — the machine is always running. The scanline animation beneath the interface layer reinforces this.

---

## Section Transitions

### Hero → Data Matrix Section

**Trigger**: Scroll.

**Duration**: 0.2–0.3s

**Sequence**:
1. (0–0.1s) First row of data matrix cells arrives via clip-path step-reveal (left-to-right, 4 steps, 0.15s each cell, 50ms row stagger).
2. (0.1–0.2s) Hairline section divider appears (1px horizontal rule, opacity 0 → 0.12, 0.1s ease-out).
3. (0.2–0.3s) Section label (IBM Plex Mono uppercase, `#fd356e`, 11px wide-tracked) fades in (0.1s).

### Content Section → Content Section

Each new section's content block enters the viewport with a 4-step clip-path reveal (0.2s, `steps(4, start)`) followed by a glitch-shift flicker on the section heading (0.15s). No background color changes — the dark field holds. The only visible boundary between sections is the hairline rule and label typography.

---

## Content Rhythm

### Per-Element Entrance (Scroll-Triggered via Intersection Observer)

**Stagger**: 50ms between elements

- **Headline (VT323 uppercase)**: clip-path 4-step reveal (0–0.2s) + glitch-shift flicker (0.15s) with rgb-split chromatic aberration.
- **Body copy (JetBrains Mono)**: opacity 0 → 1 over 0.1s — text appearing as terminal output, no motion.
- **Data cards**: clip-path 4-step reveal (0.2s, `steps(4, start)`) with 50ms row stagger. Each card is a data record arriving from the system.
- **CTA buttons**: opacity + clip-path reveal (0.15s), then magenta glow box-shadow blooms (0.1s) to signal interactivity.
- **IBM Plex Mono labels**: opacity transition only (0.1s) — metadata appears quietly, without fanfare.

**Easing**: `cubic-bezier(0.55, 0, 1, 0.45)` for all clip-path reveals. `ease-out` for opacity transitions. Combined they create a machine-like rhythm matching terminal output cycles.

---

## Footer Approach

As the user scrolls toward the footer, content density decreases but the dark field holds — no warm desaturation, no color shift. The footer arrives via clip-path 4-step reveal (0.2s), with the brand wordmark (VT323 uppercase, white) getting a brief glitch-shift flicker on arrival (0.15s). Footer links at `#acacaf` — muted and operational. Hover over footer CTAs triggers the magenta drawn-in underline (0.15s ease-out). The system does not wind down; it simply stops rendering content. The cursor blinks. The machine waits for the next command.

---

## Motion Principles

- **Base timing 0.15–0.2s** — never slower than 0.3s (unless background scanline loop), never as fast as a single frame
- **Easing: `cubic-bezier(0.55, 0, 1, 0.45)`** everywhere — sharp decelerate for mechanical precision
- **No smooth gradual transitions** — all content arrivals are clip-path step reveals
- **Glitch flicker on all major arrivals** — glitch-shift + optional rgb-split = the system acknowledging data receipt
- **Neon glow on interaction** — magenta box-shadow signals interactive state, not decoration
- **Reduced motion**: when `prefers-reduced-motion: reduce`, all animations reduced to 0.01s; glitch effects removed; neon glow remains at static full intensity

---

## Video Placements

### 1. Hero Video — `hero-monitor.mp4`
- **Section role**: Full-viewport hero background, the CRT screen surface beneath all overlay content
- **Subject**: A static shot of a CRT monitor displaying a near-black screen (`#19191c`, matching page background exactly). Vertical scanlines drift downward at 0.25× playback speed (a full scanline pass takes 40 seconds of real time). Occasional electromagnetic flicker: opacity jitters of 3–5% intensity at random intervals (5–7 per loop). No subject, no branding, no light source — pure electronic presence. The monitor fills the frame edge-to-edge.
- **Motion quality**: Vertical scanline drift (imperceptible unless watched closely), random electronic flicker at micro-opacity level, no camera movement. 60fps. Color grade: very slight cyan tint in the near-black (`#19191c` with blue undertone preserved). No saturation boost.
- **Duration**: 10s loop
- **Why video**: The hero's near-black field reads as flat when static; a CRT monitor with living scanline drift and electronic flicker gives the dark palette **electronic presence** — grounding it in physical hardware history and distinguishing it from simple CSS `background: #19191c`. The scanline behavior creates slow vertical motion that no still image can replicate, and anchors the system in CRT/terminal culture without kitsch nostalgia.

### 2. Data Stream — `data-stream.mp4`
- **Section role**: Data matrix showcase section or work gallery — the right-hand media zone in an asymmetric command panel, or a full-bleed section background in the portfolio grid
- **Subject**: A terminal emulator window displaying rapidly scrolling monospaced text (IBM Plex Mono, white-on-dark, scrolling upward at 2–3 lines per second — fast enough to signal busy computation, too fast to read). Interspersed with occasional rgb-split corruption frames (chromatic aberration at ±3px offset, 3–5 per loop) and brief opacity flicker glitches (0.2s, 80% dips). Slight green color grade (85% saturation) evoking monochrome CRT terminal monitors. Underexposed at edges to preserve dark field continuity.
- **Motion quality**: Text scroll upward at reading threshold (fast but not frantic), occasional glitch frames (rgb-split, opacity jitter), no camera movement. Subtle vignette at frame edges.
- **Duration**: 5s loop
- **Why video**: The work showcase zone is where output is displayed. A living terminal scrolling with data and glitch artifacts adds **machine agency** at the moment of highest stakes — and grounds the aesthetic in simulated digital process, where text moves, glitches happen, and computation is ongoing. A static terminal screenshot is inert; this video is running.

### 3. Corrupted Scan — `corrupted-scan.mp4`
- **Section role**: Technical editorial or about section — the image zone in a split terminal editorial layout
- **Subject**: Extreme close-up of printed JetBrains Mono text on dark background with a slow horizontal rgb-split glitch effect applied cyclically (red channel drifts +3px right over 4 seconds, cyan drifts -3px left, creating visible chromatic aberration, then resolves back to clean white over 1s). The text content is legible for 3s, becomes corrupted/unreadable as the rgb-split reaches maximum offset (1s), then resolves. A single magenta pixel accent appears briefly at center during the corruption peak, then disappears. Vertical scanlines drift continuously at background level.
- **Motion quality**: Static camera, cyclic horizontal rgb-split drift (smooth cubic, 5s full cycle), vertical scanline ambient (40s per pass), text shifts between legible and corrupted states
- **Duration**: 5s loop (one full corruption/resolution cycle)
- **Why video**: The editorial section is the system's most direct moment of self-documentation. An rgb-split corruption effect on monospaced text provides **temporal data fragmentation** — the interface itself questioning its own integrity. The legibility-to-glitch-to-legibility cycle enacts the system's core aesthetic logic: clean data, machine error, recovery. A static corrupted image would be a pose; this video is a process.
