# Motion Brief — Cursor Black: Terminal / CLI Interface

## Global Motion Principles

- **Timing base**: 30ms per character (typewriter), 80–100ms for state transitions
- **Easing**: `step-start` everywhere — no curves, no smooth transitions. The machine switches; it does not flow.
- **Tone**: Mechanical, deterministic, terse. Motion communicates that a command has been received and is being executed.
- **Typewriter effect**: Characters appear one at a time via JavaScript — the text does not fade in; it is typed.
- **Cursor blink**: `@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} } 1s step-end infinite` — the cursor is always present where text is being generated.
- **Glitch**: Brief horizontal shift (-2px to +2px) with green/cyan color split for 0.1s. Used on section headings on entrance.

---

## Scroll Opening (Page Load — System Boot)

**Duration**: 0.3–0.5s total

**Sequence**:
1. (0s) Page background `#0d0d0d` is immediate. No fade. The screen is on.
2. (0–0.05s) Nav bar materializes — no animation. Fixed. It is already there.
3. (0.05–0.1s) Phosphor green nav border line appears (1px at bottom) — drawn left-to-right via clip-path step reveal.
4. (0.1–0.3s) Hero headline types itself in at 30ms per character. A blinking cursor `_` follows the last typed character.
5. (0.3–0.4s) Subheading and descriptor text appear line by line, 80ms per line, instant (no fade). Terminal output.
6. (0.4–0.5s) CTA buttons snap into existence — 80ms step-start. Border lights up phosphor green.

**Visual effect**: A terminal booting. Content arrives as if being printed to screen by a command returning output.

---

## Hero Experience

**Primary video: `hero-terminal.mp4`**

A full-bleed ambient video of a working terminal emulator. Dark background (`#0d0d0d`), monospaced text in phosphor green scrolling slowly upward — command output being generated at a pace slow enough to read fragments but fast enough to communicate active computation. Occasional cursor blink visible in the terminal window. No music, no branding, no subject — pure machine activity. Subtle CRT scanline overlay at 3% opacity.

**Typewriter animation (CSS/JS)**:
- Hero headline text is rendered character by character at 30ms intervals via JavaScript typewriter function
- A `|` cursor blink follows the insertion point
- After headline completes: brief glitch effect (0.1s) — horizontal shift ±2px, green/cyan color split — the screen acknowledges the line is complete
- Subheading types in immediately after at 20ms per character

**Static state**: All terminal windows and panels maintain phosphor borders. The interface reads as live and active even at rest.

---

## Section Transitions

### Hero → Features Section

**Trigger**: Scroll — `once: true`.

**Sequence** (GSAP ScrollTrigger):
1. Three feature cards enter with `y: 20, autoAlpha: 0` → `y: 0, autoAlpha: 1` with 0.1s stagger between cards. Duration: 0.15s per card. Easing: `steps(4, end)` — mechanical stagger.
2. Section heading types in at 25ms per character.
3. Phosphor borders on all panels start at `rgba(57,255,20,0.08)` and step to `rgba(57,255,20,0.2)`.

### Features → How It Works Section

**Trigger**: Scroll — `once: true`.

Steps 1–4 enter sequentially: each step block slides in `x: -16px` → `x: 0` with `step-start` easing. 120ms per step, 80ms stagger. Section feels like command-line steps being printed sequentially.

### How It Works → Testimonials

**Trigger**: Scroll — `once: true`.

Testimonial blocks enter as terminal output: each line types in at 15ms per character (fast output mode). The `>` prompt prefix appears first, then the content text types in. Stagger 200ms between testimonials.

### Testimonials → Pricing

**Trigger**: Scroll — `once: true`.

Pricing cards appear via 4-step clip-path reveal (`animation: data-reveal 0.15s steps(4, start) both`). Headers type in at 20ms per character after card appears.

---

## Content Rhythm

### Per-Element Entrance (GSAP ScrollTrigger, `once: true`)

- **Section headings**: Typewriter effect via JS at 25ms/char. After completion: glitch-shift flicker (0.1s). GSAP handles the container entrance.
- **Body paragraphs**: `y: 0, autoAlpha: 0` → `autoAlpha: 1`, 0.1s, `steps(4, end)`. Text appears as terminal output, no motion.
- **Feature cards**: `y: 20, autoAlpha: 0` → `y: 0, autoAlpha: 1`, stagger 0.1s, 0.15s duration, `steps(4, end)`.
- **Step items**: `x: -16, autoAlpha: 0` → `x: 0, autoAlpha: 1`, sequential 80ms stagger, `step-start`.
- **Testimonial blocks**: Character-by-character text reveal at 15ms/char via JS typewriter.
- **CTA buttons**: `autoAlpha: 0` → `autoAlpha: 1`, 0.08s, instant. Border glow then pulses via CSS animation for 2s.

---

## Footer Approach

Footer arrives as the page's final terminal output line. Content uses `autoAlpha: 0` → `autoAlpha: 1` at 0.1s, no motion. Footer text color `#6b6b6b` — logged output, dimmed but present. Brand wordmark in phosphor green with `>_` prefix. On hover: links snap to phosphor `#39ff14` at 80ms step-start. The machine does not wind down; it waits with the cursor blinking.

---

## Video Placements

### 1. Hero — `hero-terminal.mp4`
- **Section**: Full-viewport hero background layer beneath content overlay
- **Subject**: Terminal emulator window with phosphor-green text scrolling upward on near-black background. Commands executing, output printing. A blinking block cursor at the prompt. Occasional brief glitch frame (1–2 per loop). Subtle CRT scanline overlay at 3% opacity.
- **Motion**: Text scroll 2–3 lines/second, cursor blinks at 1s interval, scanline drift 3s/pass
- **Duration**: 8s loop
- **Why video**: Static dark hero reads as flat. A live terminal communicates active computation — the product is running. The typewriter JS text overlay pairs with the video background to create layered motion: the real terminal underneath, the marketing copy being "typed" above it.

### 2. Demo Screen Recording — `tool-demo.mp4`
- **Section**: "How it Works" step 2 or 3 panel — the media zone in the wide-format `3fr 2fr` layout
- **Subject**: Screen recording of the actual CLI tool in use. A real terminal session: user types a command, output streams line by line, success indicator appears in phosphor green. No voiceover. Captions optional. Real product, real output.
- **Motion**: Typing at natural pace, output streaming, cursor blink. Cut at the success state.
- **Duration**: 12–15s loop, auto-play muted
- **Why video**: Developer tools are evaluated by watching them run, not by reading descriptions. A screen recording of the actual tool in operation is more persuasive than any copywriting.

### 3. Team/About Ambient — `server-room.mp4`
- **Section**: Team page hero or about section background
- **Subject**: Extreme close-up of a server rack or PCB, very slow dolly motion. LED indicator lights blink. No faces. The hardware is the subject. Slightly underexposed to preserve dark field continuity. Optional green color grade at 20% to echo phosphor palette.
- **Motion**: Very slow dolly (imperceptible in first second), LED blink, rack fan motion
- **Duration**: 10s loop
- **Why video**: The team section builds trust through hardware authenticity — communicating that the people behind this product build things close to the machine.
