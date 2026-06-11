# Motion Director Brief

*A motion brief for an interface that treats animation as editorial punctuation, not decoration. Every motion choice here answers one question: does this moment earn duration?*

---

## Scroll Opening

The page arrives without ceremony. On load, the navigation bar resolves at full opacity in a single frame — no fade, no slide — because the nav is infrastructure, not an entrance. The hero image below it loads with a brief opacity rise over 300ms using `ease-out`, just long enough to register as intentional rather than an artifact of load time. Nothing else moves on initial render. The design earns its stillness by being compositionally complete before the user scrolls.

---

## Hero Experience

The hero section is a video background candidate. The subject is the product in close physical contact with its environment — not a lifestyle shot, not an aspirational human subject, but the object itself in atmospheric context. The video should feel like the image is breathing rather than playing: ultra-slow lateral drift, 10 seconds per loop, imperceptible motion speed. The goal is for a viewer to watch for 5 seconds and be uncertain whether the video is actually moving.

**Designated video placement:** `hero-bg.mp4`
Extreme macro drift across the featured product's upper surface — vulcanized rubber texture, mineral crystal facets catching and releasing light at the pace of a slow tide. 10s loop. The video earns its placement by communicating material specificity that a still photograph compresses into a single moment; the video reveals it as temporal depth.

The text overlay and CTA enter with no animation — they are present when the page loads, compositionally placed in the art-directed text-safe zone. They do not stagger, they do not fade in. Their stillness is a deliberate contrast to the video's imperceptible drift beneath them.

---

## Section Transitions

Transitions between sections are not animated. The scroll is the transition. Each section boundary is a hard cut — the user's own scroll velocity determines the pace of the reveal. No scroll-triggered fade-in sequences, no parallax offsets, no section overlap effects. This is a deliberate restraint: applying animation to section boundaries would undercut the percussive density logic of the layout structure, which is built on the impact of hard contrasts rather than managed dissolves.

The one exception is the editorial card grid: as the three panels enter the viewport on scroll, each panel resolves from a very slight upward translate (8px → 0) with a 200ms stagger between panels, `cubic-bezier(0.4, 0, 0.2, 1)`. This is the only scroll-triggered animation on the page. Its function is not decoration — it differentiates the three panels as discrete units that happen to be fused, preventing them from reading as a single static block discovered all at once.

---

## Content Rhythm

Individual elements within sections do not animate on scroll by default. The card grid stagger (above) is the exception. Footer links appear at full opacity with no reveal sequence — the footer is a utility zone and does not require cinematic entrance treatment. Navigation items are always visible; they do not animate on scroll.

Button interactions use the motion system's fast duration: `0.2s` `cubic-bezier(0.4, 0, 0.2, 1)` for hover state transitions. The pill button border darkens or the fill inverts; the transition is crisp enough to feel responsive without calling attention to itself. Focus rings resolve in a single frame (no animation) — accessibility affordances should not be delayed.

---

## Footer Approach

The footer arrives as the card grid exits. There is no transitional section and no softening animation. The density shift from full-bleed photography to a white text-link grid is the design's most dramatic perceptual event — animation would dilute it. The footer link columns are static on scroll entry. The legal bar at the base of the footer is static throughout.

The one footer motion moment is the newsletter input field: when focused, the underline indicator transitions with the motion system's medium duration (`0.3s`, `ease-out`), signaling active state with the same restraint applied everywhere else in the interface.

---

## Motion Principles

This interface operates on **fast and declarative** timing. Transitions are short (max 400ms), directional (ease-out for entrances, ease-in for exits), and purposeful (no spring physics, no bounce, no overshoot). The easing system — `cubic-bezier(0.4, 0, 0.2, 1)` as primary — produces motion that reads as confident rather than playful. Duration is always the minimum necessary for the viewer to register the change as intentional.

The video placements (hero, category panels, sub-brand) are the only places where duration extends beyond UI timescales. These are ambient loops operating on 5–10 second cycles — a completely separate temporal register from the interaction layer. The two registers should never fight each other.

---

## Video Placements

### 1. Hero Background — `hero-bg.mp4`
**Section role:** Primary hero, full viewport
**Subject:** Extreme macro drift across the featured product's upper surface — vulcanized rubber texture, crystalline mineral facets, midsole foam geometry
**Motion quality:** Ultra-slow lateral drift, imperceptible speed (camera moves approximately 2% of frame width over 10 seconds)
**Mood:** Material intimacy, geological time, the object as landscape
**Duration:** 10s loop
**Why video:** A still photograph collapses material depth into a single moment of light and shadow. Video at this speed reveals the surface as temporally alive — light migrates across texture, minute reflections shift. The viewer who watches for 10 seconds knows the product differently than the viewer who glances at a still.

### 2. Category Editorial Panels — `category-ambient.mp4`
**Section role:** Three-panel editorial card grid (sport category navigation)
**Subject:** Three simultaneously looping 5-second ambient panels — night running on wet pavement (left), studio athlete mid-motion in artificial light (center), desert sand dune at golden hour with foot strike (right)
**Motion quality:** Each panel loops independently: handheld with subtle stabilized drift (left), slow-motion frame (center), wide-angle with minimal camera movement (right)
**Mood:** Parallel worlds, simultaneous athletic registers, three climates in one breath
**Duration:** 5s per panel, independent loops
**Why video:** The three-panel grid's "visual fusion" effect — panels reading as a single panoramic band — becomes kinetically complex when each panel moves on its own temporal cycle. The eye registers three independent rhythms within one horizontal composition, creating a sense of athletic multiplicity that static photography, however editorial, cannot produce.

### 3. Sub-brand Ambient — `subbrand-ambient.mp4`
**Section role:** Sub-brand or product line showcase section (workshop/craft emphasis)
**Subject:** Workshop floor timelapse — shoe components laid out on a raw concrete surface, light transitioning from cool fluorescent to warm tungsten over the course of a production day
**Motion quality:** Timelapse compressed to 10 seconds, camera locked, subjects static while light moves
**Mood:** Craft process, material transformation, the time embedded in an object
**Duration:** 10s loop
**Why video:** Still photography can document a moment in the production process; timelapse shows the process as duration — the time that goes into making the object becomes visible as light moving across components. This is the visual argument for craftsmanship that static assets cannot make.
