# Motion Brief: Tallow Press

---

## Scroll Opening

The page arrives resolved — no loading ceremony. The navigation bar is present at the first frame, fixed and legible, its letter-spaced uppercase links at 0.08em tracking sitting against the white surface with authority. The hero photograph fills the viewport immediately; the modal card or hero text block materializes in a clean 0.9s fade. No entrance sequence, no stagger on the nav itself. The design opens the way a well-printed book opens — already complete, waiting to be read.

---

## Hero Experience

The hero occupies the full viewport. The color logic is clear: deep teal (`#1e3a35`) as background, or a full-bleed editorial photograph where the tonal distribution has been pre-designed to hold white text comfortably. In either case the hero is an **ambient video candidate** — the scene earns temporal presence not through motion but through atmosphere.

**Designated video background:** 10-second loop. The subject is a lit workshop interior — tallow presses, print beds, hot-metal tools on worn oak. The camera is still; light shifts slowly from window to table surface, a single oblique ray crossing the frame at minute pace. No narrative movement, no cut. The loop point should be imperceptible.

---

## Section Transitions

Transitions are governed by opacity, not position. As sections enter the viewport, content elements fade in with the primary easing curve (`cubic-bezier(0.76, 0, 0.24, 1)`) over 0.9s — the base duration of this design system. No slides, no scale transforms on content. The occasional stagger of 0.1s between sibling elements creates a barely-perceptible cascade — paragraph arrives before caption, caption before footnote.

The two temporal registers never bleed into one another: hover interactions resolve at 0.2–0.3s; content arrivals at 0.9–1.125s. A user can interact without waiting for the site to finish animating.

---

## Content Rhythm

Individual elements enter through the `fade-in` keyframe. The stagger is metronomic — 0.1s per item, no variation. At the heading scale implied by Space Grotesk at 48px with 0.06em tracking, headings arrive as field events: the letterforms are large enough that the opacity transition is a reveal, not a flicker. The motion budget honors this — 0.9s is just long enough for the heading to emerge, not so long that the viewer waits.

The burnt orange accent (`#df5e12`) in CTAs and inline highlights catches attention once the text has resolved — it appears within the fade but reads as a punctuation mark, not a distraction.

---

## Footer Approach

The footer approaches without ceremony. The last content section completes its fade sequence; the footer resolves below. No dedicated footer animation, no large-scale reveal. The closing motion principle: the page ends as it began, with deliberate restraint. The dark footer panel (`#2b2918`) appears cleanly as the viewport arrives, functioning as a typographic full stop.

---

## Motion Principles

The timing philosophy is **deliberate deceleration** — the 1.5× stretch applied to all durations was intentional. Base transitions at 0.9s, medium animations at 1.125s, heavy animations at 1.35s. This pacing matches the weight of the content: large type requires more time to read as it arrives; the animation speed should never outrun comprehension.

Hover states remain fast (0.2–0.3s) because they are reactive — they respond to the user's hand. Page animations are proactive — they must not feel impatient. The split between these registers is the system's most important temporal decision.

---

## Video Placements

### 1. Hero Section
- **Asset filename:** `hero-workshop.mp4`
- **Duration:** 10s loop
- **What it shows:** A pre-industrial print workshop: tallow candles in iron holders, type cases, a press bed mid-impression. Camera fixed on a medium shot; oblique window light drifts slowly from frame right toward center as if the sun is moving. Slight warmth in highlights. No people. Deep teal color grade matching `#1e3a35`.
- **Why video:** The hero's teal background is atmospheric but static. A slow video loop gives the dark field temporal weight — the color stops being a design choice and starts being a place. The duration of 10s allows the light shift to be sensed rather than watched.

### 2. Product / Craft Showcase Section
- **Asset filename:** `press-surface.mp4`
- **Duration:** 5s loop
- **What it shows:** Extreme close-up of a letterpress impression pulling away from paper — the ink just-set, fibres lifting slightly at the edges. Macro lens, warm incandescent light, very shallow depth of field. The motion is the pull: slow, deliberate, one-directional, and completed within 4 seconds. The loop holds on the finished impression for 1s before restarting.
- **Why video:** This section describes the material process. A still photograph of a letterpress impression is legible; a video of the impression moment transforms legibility into embodiment. The viewer understands the weight and resistance of the process — the material reality the design system's name references.

### 3. Editorial / Concept Band
- **Asset filename:** `tallow-light.mp4`
- **Duration:** 5s loop
- **What it shows:** A single tallow candle burning — extreme close-up on the flame, unfocused background in warm brown. The flame is nearly still, with only the most minute atmospheric tremor. No wind, no dramatic movement. The loop is designed to be nearly imperceptible: flame geometry barely shifts over the 5 seconds.
- **Why video:** This section is the atmospheric anchor — the section where the brand's conceptual register is stated directly in type. A near-still flame provides depth and warmth without competing with the typography. The motion is too slow and too small to distract; it creates the sensation of being in a physical place rather than looking at a designed surface.
