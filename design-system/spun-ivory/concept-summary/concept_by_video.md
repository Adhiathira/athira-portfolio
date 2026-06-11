# Motion Brief: Spun Ivory

---

## Scroll Opening

The page arrives mid-breath. At load, the warm ivory field is already present — no reveal animation for the background itself. What loads is the foreground: headline letterforms climb in from 18px below their resting position, opacity stepping from 0 to 1 over 600ms with the material cubic-bezier (0.4, 0, 0.2, 1). No bounce, no spring — a settling, like laid paper finding the table. Navigation links resolve slightly after the headline, not as a dramatic cascade but as a quiet consequential step. The overall impression is unhurried self-possession.

---

## Hero Experience

The hero is a composition problem before it is an animation problem. The warm ivory background occupies the full viewport — its temperature already doing emotional work before any element moves. The headline enters with the scroll-opening treatment described above. Beneath it, the CTA surfaces with a 120ms delay from the headline's midpoint, using the same easing — motion inheritance rather than invention.

**Hero video candidate:** The hero section should use an ambient looping video background for the product showcase version of this page. This background should show the product in its natural context — slow drift across a workshop table, morning light through tall windows, objects resting on the surface at quiet. The video plays at extremely low opacity (0.12–0.18 against the warm ivory) so the background becomes a texture rather than a scene. Its job is to give the cream surface a temporal quality — something breathing rather than static. A still image cannot carry that depth.

Suggested asset: `hero-ambient.mp4` — 10s loop, 4K source, no camera movement faster than a gentle drift, subject: material surface (linen, uncoated paper, raw ceramic), morning or overcast light, no people.

---

## Section Transitions

Transitions between sections are not performed — they are acknowledged. A straight horizontal rule at the section boundary, with no wave, no clip-path geometry, no masked reveal. The content simply ends and the next begins. What carries the eye is the typographic scale shift: from editorial heading to body cluster, body cluster back to heading. The rhythm is prose pacing — no theatrical punctuation. Sections that carry feature grids let the grid items enter the viewport in a staggered sequence on scroll, each card ascending 12px over 380ms with a 60ms stagger between items.

---

## Content Rhythm

Individual elements enter the viewport using a restrained variant of the fadeInUp keyframe already defined in the motion system: `opacity: 0 → 1`, `transform: translateY(12px) → 0`, duration 380ms, easing cubic-bezier(0.4, 0, 0.2, 1). The 12px vertical travel is deliberately tight — not a dramatic slide but a microscopic adjustment that registers more as "settling" than "appearing." This respects the ivory register: nothing lurches or snaps. Stagger between sibling elements is 60ms — enough to read as sequential, not enough to feel choreographed.

---

## Footer Approach

The footer does not announce itself. As the last content section resolves, the footer's link columns simply come into view — no special treatment distinguishing their entry from any other section. The only motion note: the copyright line and social icons at the footer's base resolve 80ms after the columns above them, creating a faint suggestion of the page coming to rest in layers. The logotype, if animated, fades in on initial scroll into the footer at 0.4s — this is the page's final signature, not its climax.

---

## Motion Principles

**Deceleration-dominant.** Every transition uses easing curves that front-load energy and trail into stillness. The material cubic-bezier (0.4, 0, 0.2, 1) is the system's only easing constant — applied uniformly so that all motion reads as belonging to the same physical register. Nothing accelerates into view; everything arrives.

**Brevity over spectacle.** Maximum animation duration for UI elements is 550ms (the languid hover transition defined in the interaction system). Scroll-entry animations cap at 380ms. The longest single motion event is the hero video loop — 10 seconds — which earns its duration by being atmospheric rather than communicative.

**Silence as rhythm.** The absence of motion is as deliberate as its presence. Long stretches of pure scroll — especially within dense feature grids — use no animation at all. The eye rests. This makes the occasional motion moment more legible.

---

## Video Placements

**Placement 1 — Hero Background**
- Section role: hero
- Asset filename: `hero-ambient.mp4`
- Subject: Close-up of an artisanal material surface (uncoated cotton paper, raw linen, ivory ceramic). The camera barely moves — a nearly imperceptible drift of 2–3mm over 10 seconds, as if held by a very still hand. Morning light enters from the upper left, raking across the texture to make the grain visible. No people, no product, no brand marks.
- Duration: 10s
- Why video: A still image of this surface reads as a stock photograph. The near-imperceptible motion — the drift, the way light shifts almost unnoticeably across the grain — gives the ivory background a living quality that no static image can reproduce. The temporal element is the entire point. It communicates that the page is inhabited, not printed.

**Placement 2 — Product Showcase Section**
- Section role: mid-page feature demonstration (the 4-column feature grid)
- Asset filename: `product-in-context.mp4`
- Subject: The product being used at a desk — hands turning a physical object or scrolling through an interface on a screen, shot from a 45-degree overhead angle. The motion is slow and deliberate: a single complete gesture in 5 seconds (pick up, examine, set down; or scroll to a specific view and pause). Warm directional light. Hands visible; face never in frame.
- Duration: 5s loop
- Why video: Feature grids are inherently static — a grid of cards with icons and labels communicates structure but not feel. A short ambient video behind or adjacent to the grid introduces a human register into what would otherwise be an organizational diagram. The specific gesture — unhurried, careful — mirrors the motion philosophy of the system itself.

**Placement 3 — Services / Process Section**
- Section role: 2-column asymmetric layout (illustration/text split)
- Asset filename: `process-ambient.mp4`
- Subject: A single hand writing or sketching on uncoated paper. The camera is fixed; the hand moves slowly across the surface. No rushed motion. The subject should be abstract — lines, marks, notations — not recognizable text or finished drawing. Duration covers a single complete mark-making gesture.
- Duration: 5s loop
- Why video: The 2-column asymmetric layout already treats its left-column element as a structural mass rather than decoration. A video in this column reinforces that weight with temporal depth — the mark-making subject echoes the physical materiality running through the design's tactile identity. A static illustration would freeze what the rest of the page suggests is in motion.
