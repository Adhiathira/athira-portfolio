# Motion Brief: Ochre Ledger

_A creative brief for motion direction — not a description of animations, but an articulation of where this design breathes and which moments earn video over a still image._

---

## Scroll Opening

The page arrives in stillness. On load, the warm cream ground (#fcf7f1) holds for a half-beat before the nav fades in — a deliberate pause that lets the color register before content enters. The hero content stack assembles from below: eyebrow first at 0.27s, headline at 0.45s, body and CTAs staggered at 0.1s intervals. The motion curve is `cubic-bezier(0.4, 0, 0.2, 1)` throughout — not elastic, not springy, but the precise deceleration of something arriving with intention. Nothing bounces. The system opens like a ledger being laid flat on a table.

## Hero Experience

The hero earns its full-viewport allocation through atmospheric density rather than spectacle. A slow ambient video loop runs as the hero background — the subject is a workspace surface: warm grain, papers, tools arranged without arrangement. The camera drifts at perhaps 2% of frame width over 10 seconds, enough to feel alive without distracting. The foreground editorial stack renders over the video in sharp contrast — Space Grotesk at 80px / 600 weight holds its legibility against any background luminance shift the loop produces. This is not video-as-decoration but video-as-material-grounding: it communicates warmth, craft, and physical presence before a word is read.

The hero is a **video background candidate**. See Video Placements.

## Section Transitions

As the user scrolls from the hero into the first feature section, the warm ivory background of the system takes over from the video — a natural continuation of the cream palette rather than a jarring cut. Sections enter via `slide-up` at 20px translate + opacity, governed by the `cubic-bezier(0.4, 0, 0.2, 1)` deceleration standard. The transition is not announced — elements simply arrive.

Between the asymmetric feature split sections, a horizontal rule draws in from the left at 0.36s — a typographic gesture, not a divider. The motion mirrors the left-to-right underline animation in the nav hover system: same origin, same timing, structural coherence across scales.

## Content Rhythm

Individual content elements enter at stagger intervals of 0.1s. Cards in the feature grid stagger left-to-right — the eye follows the reading direction. Accordion rows, when expanded, use the `grid-template-rows` transition at 0.9s with the standard deceleration easing — an unhurried reveal, measured as if unfolding a document.

The `animated-pulse` on loading indicators or status elements uses the 2.52s pulse timing — slow enough to feel deliberate rather than anxious. Nothing in this system moves quickly to attract attention. Motion is a quiet structural signal, not a performance.

## Footer Approach

The footer arrives with no ceremony. Its three columns stagger in at 0.05s intervals, left to right. The logo mark resolves last, 0.15s after the link columns — a compositional note that the brand identity is the destination, not the entry point. No parallax, no scale effects. The footer is a document's colophon: sober, precise, terminal.

## Motion Principles

This system's motion philosophy is **deliberate deceleration**. The `cubic-bezier(0.4, 0, 0.2, 1)` standard adopted from the Material easing library — chosen not for its brand origin but for its quality: elements arrive with purpose, shedding momentum as they settle rather than snapping into place. The timing scale is unhurried (0.18s → 0.27s → 0.36s → 0.9s) with a long-tail at 1.08s for structural transitions.

The system trusts stillness. Between animated moments, nothing moves. This creates contrast: when something does move, it reads as meaningful rather than ambient noise. The motion vocabulary is closer to the turn of a page than to a notification flash.

---

## Video Placements

### 1. Hero Background
- **Section role:** Hero — full-viewport above-fold
- **Suggested filename:** `hero-bg.mp4`
- **What the video shows:** Close overhead shot of a pale wooden worktable with papers, a ruler, and a pen arranged in use. Natural light enters from the upper left, casting soft shadows that shift barely perceptibly across 10 seconds. The camera drifts 2% left on a locked-off slider — just enough movement to feel present. Warm tones: cream paper, natural oak, ambient morning light.
- **Duration:** 10s loop — the longer duration supports the section's role as a dwelling space, not a transition
- **Why video over still:** The hero's purpose is material grounding — communicating warmth, craft, and physical precision before the product is introduced. A still image of the same scene would read as stock photography. A 10-second loop with near-imperceptible drift reads as a living environment, which establishes the brand register (precision tools, thoughtful process) in peripheral vision while the eye reads the headline.

### 2. Product Showcase / Features Section
- **Section role:** Feature showcase — mid-page, the asymmetric split sections
- **Suggested filename:** `features-ambient.mp4`
- **What the video shows:** A tight macro shot of a hand drawing a single line with a ruling pen — the stroke is slow, deliberate, and perfectly straight. The video loops at the moment just before the line terminates, so it never ends. Background is the same warm cream as the page background. No sound cues needed; this is purely visual.
- **Duration:** 5s loop — the action is brief and precise; a longer loop would dilute the tension
- **Why video over still:** The feature sections are about precision and process. A static illustration communicates the same information but lacks the temporal quality of watching a precise action unfold. The video communicates that this product is for people who care about the act of making, not just the output.

### 3. Footer / Closing Section
- **Section role:** Footer approach — the final zone before the page ends
- **Suggested filename:** `footer-grain.mp4`
- **What the video shows:** An extreme macro of paper grain — fibers visible, warm ivory tone matching #fcf7f1. Slow, almost imperceptible zoom out over 5 seconds from texture to context: you begin seeing only fiber, and by the end you understand it's a blank sheet waiting to be written on. No narrative, no product presence. Purely atmospheric.
- **Duration:** 5s loop — the brevity reinforces the closing register; this section is not asking for attention
- **Why video over still:** The footer is the page's silence. A static texture image closes the narrative definitively; a very slowly breathing texture keeps the system alive through the final scroll while saying nothing that competes with the utility content above it. The zoom-out metaphor (from fiber to page) closes the loop on the material language introduced in the hero.
