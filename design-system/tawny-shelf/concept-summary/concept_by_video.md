# Motion Brief — Tawny Shelf

A motion brief for a director working with this design system. Not a description of CSS animations — a brief about where the design *breathes*, which moments earn video over a still image, and what this system's motion character demands from a camera.

---

## Resisting the Obvious Motion Categories

This system does not belong to atmospheric minimalism (no soft ambient drifts over 30 seconds) nor to high-energy editorial (no rapid cuts, no kinetic type overlays). It is not a luxury house asking you to slow everything down, and it is not a tech platform asking you to prove capability through speed. The camera here should behave like a craftsperson's hand: deliberate, unhurried in its setup, decisive in its gesture. The single motion word for this system is **qualified authority** — things arrive promptly and settle without ceremony. Video should amplify the system's material warmth, not perform it.

---

## Scroll Opening

The page arrives already in progress. No loader, no splash, no greeting. The warm ivory field fills the viewport at rest, the forest-green nav rail fixed at the top with its tracked uppercase at `0.08em`. As the first scroll event fires, the headline — Cormorant Garamond at `64px`, `0.06em` letter spacing — assembles character by character from a tight orbital scatter: chars arrive from `x: random(-120, 120)`, `y: random(-60, 60)`, `rotation: random(-25, 25)`, `opacity: 0`, `scale: 0.6`, duration `0.65s`, `ease: 'expo.out'`, `stagger: 0.03s`. This is not a theatrical title sequence; it is the sensation of a word remembering its shape. The page does not announce itself. It opens like a well-made drawer.

---

## Hero Experience

The hero is a **video background candidate** — specifically because this design system's emotional register is about *materiality and temporal light quality*, which a still image cannot carry. The warm ivory field beneath the headline should hold an ambient moving image that registers as presence rather than motion.

**Candidate video:** `hero-ambient.mp4` — 10s seamless loop, locked-off camera with near-imperceptible lateral drift (~0.2mm/s), warm raking light at low angle (morning or late afternoon), subject: polished natural stone surface or rolled linen, focal length: macro (showing surface grain at the level of individual fibers or mineral crystals). The light should move slowly enough to be perceptible only at second viewing. Duration 10s because the section needs to carry a narrative breath — the user spends 4–8s in the hero on first visit, and the light should shift slightly between arrival and scroll departure, registering as lived-in time.

---

## Section Transitions

Hard cuts between light and dark sections. No dissolves, no scroll-triggered color blends, no wave-form CSS transitions at the boundary. The background switches at a single frame. What earns transition timing is the content *within* each section: elements enter via `ts-slide-up` — `translateY(28px) → 0`, `duration: 0.65s`, `ease: 'expo.out'`, `stagger: 0.05s` between adjacent elements. The sense of motion lives in the content arrival, not the section switch. This is the correct inversion: slow the content arrival, snap the container.

Grid cells behind hairline top-borders enter left-to-right with a `0.05s` stagger per cell and a `ts-draw-rule` animation — `scaleX(0 → 1)` over `0.91s` from `transform-origin: left center`. The border draws before the cell content appears (`delay: 0.15s` on content after rule completes), staging a sequence of: rule arrives → content populates. This mimics the action of laying out a table: the structure precedes the objects.

---

## Content Rhythm

Individual blocks enter via `ts-slide-up`. Stagger: `0.05s` per element — not a cascade, just a breath of difference. The grid feels populated gradually, not assembled. Feature cells appear row by row (all cells in row 1 before row 2 starts). The hairline rule draws in before content becomes visible.

Stat counters (where present): count from `0` to target value over `0.65s`, `ease: 'power2.out'`. GSAP params: `gsap.from({ val: 0 }, { val: targetNumber, duration: 0.65, ease: 'power2.out', onUpdate: function() { el.textContent = Math.round(this.targets()[0].val).toLocaleString(); }})`. The number sweeps, does not tick. Ticking is too mechanical for this system — it implies a clock, and this system does not want to suggest urgency.

Clip-path iris bloom on mid-page reveal sections: `ellipse(0% 0% at 50% 50%) → ellipse(150% 150% at 50% 50%)`, `duration: 1.2s`, `ease: 'power3.inOut'`. Used sparingly — once per page, on the most important non-hero reveal. The iris bloom is the system's single theatrical gesture; its rarity gives it force.

---

## Footer Approach

The footer is deep forest green (`#2a5c3a`). As it enters the viewport, the green surfaces from below as a clip-path iris bloom opening from the bottom edge: `ellipse(0% 0% at 50% 100%) → ellipse(150% 150% at 50% 100%)`, `duration: 0.91s`, `ease: 'power3.inOut'`. The wordmark fades in at `delay: 0.4s`. Link columns stagger in at `0.05s` each after the background reveal. The effect is a closing curtain — not a finale, but a completion. The page ends with the same quiet authority it opened with, and the green that framed everything at the top now holds the bottom.

---

## Motion Principles

**System character: Percussive-Precise.** Not mechanical-clockwork (implies rigidity, audible tick patterns). Not fluid-tidal (implies continuous, atmospheric flow). Closer to: a craftsperson's tool finding its indexed position. The motion fires, arrives, and settles — without oscillation, without overshoot, without the elastic rebound that signals celebration. The expo-out easing (`cubic-bezier(0.19, 1, 0.22, 1)`) provides a final 15ms of deceleration that prevents brittleness, but the character is always decisive.

Timing hierarchy:
- `0.195s` — instant feedback (hover opacity states, nav underline)
- `0.26s` — standard UI response (button background-color, border-color)
- `0.325s` — card hover (transform + opacity)
- `0.65s` — content entry, stat counters, headline scatter
- `0.91s` — structural reveals (draw-rule, footer iris bloom)

**Stagger discipline:** `0.03s` for char-level scatter, `0.05s` for element-level grid entry. Never exceed `0.08s` per item — beyond that, the stagger becomes a cascade and reads as theatrical rather than rhythmic.

The single emotional register of this system's motion: **qualified authority**. Things arrive promptly and settle quietly.

---

## Video Placements

### 1. Hero — `hero-ambient.mp4`
- **Section role:** Full-bleed hero background, behind Cormorant Garamond headline at 64px
- **Suggested filename:** `hero-ambient.mp4`
- **Subject:** Macro drift across polished natural stone (limestone, slate) or rolled linen surface; warm morning light at low angle, revealing grain/fiber structure; temperature approximately 4200K. No human presence, no product.
- **Motion quality:** Near-imperceptible lateral drift, `~0.2mm/s` — registered only by comparing frame 1 to frame 300, not in real time. The motion is felt as atmospheric warmth, not seen as movement.
- **Duration:** 10s seamless loop
- **Why video over still:** The still image captures the surface. The video captures the quality of light *living on* the surface — its micro-shimmer, its micro-shift as the angle changes imperceptibly. This is the sensory register the design system is claiming: not the appearance of material quality, but the experience of it.

### 2. Feature / Materials Showcase — `feature-material.mp4`
- **Section role:** Mid-page editorial split panel (Pattern C), left half of 50/50 dark split
- **Suggested filename:** `feature-material.mp4`
- **Subject:** A pair of hands examining or slowly turning a physical object against a dark background (`#000d10`). The object is the product or its material source — not being demonstrated, being *considered*. The hands move at 0.5× natural speed (post-processing slow-motion). Incandescent light source off-frame left. Shallow depth of field, object sharp, hands slightly soft.
- **Motion quality:** Handheld with intentional micro-shake (human presence without human distraction), real-time speed before slow-motion processing, 50mm focal equivalent
- **Duration:** 8s loop, with a 0.5s ease-in and ease-out matched to loop point
- **Why video over still:** The 50/50 dark-panel layout exists to generate felt contrast: dense moving material on the left, near-empty space on the right. A still photograph occupies the left half but does not create temporal asymmetry. The video creates a condition where the left side *continues* while the right side *holds still* — which is the compositional tension this layout architecture was designed to produce. The still image collapses it.

### 3. Process Interior — `process-ambient.mp4`
- **Section role:** Background panel for an archival, process, or methodology section — typically the third or fourth content section after the hero
- **Suggested filename:** `process-ambient.mp4`
- **Subject:** Interior of a workspace or storage archive — light changing through a window over time (timelapse compression, 8–12× speed). Shelves or organized storage at the periphery, slightly out of focus. Surface of a work table in the midground, sharp. No human presence.
- **Motion quality:** Locked-off tripod, no camera movement whatsoever, only light moves. Late-afternoon window light transitioning from warm gold (`4200K`) to cooler ambient (`6000K`) as the sun shifts. Approximately 90 real seconds compressed to 10s of footage.
- **Duration:** 10s loop, with a color-graded reversal at the loop point so it can run ping-pong without visible cut
- **Why video over still:** A timelapse of changing light across a workspace compresses the temporal dimension of practice — the sense that this place exists across hours, not at a single photographed instant. It communicates institutional depth in a single ambient shot: things happen here over time, and the space holds that time gracefully. No still image can carry this quality, because the quality is specifically temporal.
