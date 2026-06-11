# Motion Director Brief

*A brief for a design language where motion is the minimum necessary proof of life. Every second of duration must earn its place.*

---

## Scroll Opening

The page arrives fully resolved. Navigation bar appears at full opacity on load — no fade, no entrance — because navigation is infrastructure. The hero section loads with a single opacity rise over 300ms, `ease-out`. Nothing else moves during the initial render. The stillness is compositional, not loading-state: the page is complete before the first scroll.

---

## Hero Experience

The hero is a video background candidate. The subject is not a person — it is the product object or material surface in close physical context. The video should exist at the threshold of perceptibility: the viewer watches for 8 seconds uncertain whether the image is still or moving. This uncertainty is the intended experience.

**Designated video placement:** `hero-bg.mp4`
Extreme macro slow-drift across a primary material surface — leather grain, pressed paper texture, mineral crystal facets, or wood fiber catching and releasing directional light. Duration: 10s loop. Camera moves approximately 1.5% of frame width over the full loop. The motion quality should evoke geological time rather than production tempo. A still photograph collapses material depth into one moment; video at this speed reveals the surface as temporally alive, the light migrating across texture as tide moves across shore.

The text overlay and CTA enter with the page — no animation, no stagger, present from the first frame. Their stillness is deliberate contrast to the imperceptible drift beneath them.

---

## Section Transitions

Transitions between sections are not animated. The user's scroll velocity is the transition. Each section boundary is a hard cut — a structural event, not a managed visual handoff. This restraint is not default; it is load-bearing. Animation at section boundaries would undercut the percussive density logic that gives the layout its character.

One exception: if the page contains an editorial card grid with three or more panels, each panel resolves from a slight upward translate (8px → 0) with a 200ms stagger between panels (`cubic-bezier(0.4, 0, 0.2, 1)`). This is the single scroll-triggered animation allowed on the page. Its function is differentiation, not decoration — it prevents three fused panels from reading as a single static block discovered at once.

---

## Content Rhythm

Individual elements within sections do not animate on scroll by default. The card grid stagger above is the exception that proves the rule. Footer content arrives at full opacity — no reveal sequence, no entrance. The footer is utility; it does not require cinematic treatment.

Button and link transitions use 0.2s `cubic-bezier(0.4, 0, 0.2, 1)` for hover states. The transition is fast enough to feel responsive without claiming attention. Focus rings resolve in a single frame — accessibility affordances should not be delayed.

The 0.1s stagger delay between sequenced items creates perceptible rhythm without theatrics. A feature grid of four items resolves over 0.3s total — enough to read as intentional sequence, not long enough to feel like a performance.

---

## Footer Approach

The footer arrives without animation. The cut from editorial photography or rich content to a white text-link grid is the most dramatic perceptual event on the page — the silence after a loud note. Animation here would dilute the contrast that makes the cut meaningful. The footer is structurally static throughout.

---

## Motion Principles

This interface operates on **fast and declarative** timing. All interaction transitions: ≤0.2s. All content entrance animations: ≤0.4s. No spring physics. No bounce. No overshoot. The easing system (`cubic-bezier(0.4, 0, 0.2, 1)`) produces motion that reads as grounded rather than playful. Duration is always the minimum necessary for the viewer to register the change as intentional, not accidental.

Ambient video loops (hero, product, material) operate on a completely separate temporal register — 5–10 second cycles — and should never interrupt or compete with the interaction layer. The two registers inhabit the same page but different timescales.

---

## Video Placements

### 1. Hero Background — `hero-bg.mp4`
**Section role:** Primary hero, full viewport
**Subject:** Extreme macro drift across the defining material of the product — paper fiber, leather grain, mineral surface, woven textile — with directional light shifting slowly across the texture
**Motion quality:** Ultra-slow lateral drift, barely perceptible (camera moves ~1.5% of frame width over 10 seconds)
**Mood:** Material intimacy, the texture of the made object, deep time
**Duration:** 10s loop
**Why video:** A still photograph compresses material depth into a single frozen moment of light and shadow. Video at this speed reveals the surface as temporally alive — light migrates, minute reflections shift with the camera's almost-stillness. The viewer who watches for 10 seconds knows the material differently than the viewer who glances at a still. This is the argument for this product's craftsmanship, made through time rather than description.

### 2. Product or Materials Detail — `materials-ambient.mp4`
**Section role:** Secondary product story or craft process section
**Subject:** Components or raw materials arranged on a neutral surface — the tools, ingredients, or parts that go into making the primary product — lit from a single directional source (window light, warm tungsten)
**Motion quality:** Camera locked; slow light shift over the duration, or a single deliberate movement of a human hand arranging one element (5s)
**Mood:** Craft process, material transformation, the accumulated time in an object
**Duration:** 5s loop
**Why video:** Static photography can document a finished product; ambient video shows the materials as existing in time — the craft process as ongoing rather than complete. The hand movement (if used) should be unhurried and partial, suggesting larger labor without narrating it.

### 3. Atmospheric Context — `context-ambient.mp4`
**Section role:** An editorial, story, or about section where the brand's physical context is established
**Subject:** A specific location or environment where the product is made or used — workshop floor, studio interior, natural terrain, coastal light — with minimal action and maximum atmosphere
**Motion quality:** Very slow camera drift or timelapse compressed to 5 seconds; camera locked; light or weather provides the motion
**Mood:** Place, season, the physical world the product inhabits
**Duration:** 5s loop
**Why video:** The atmospheric context section asks the viewer to understand a world, not a product. Video renders a place as living — the light changes, a shadow moves, water reflects — in ways that a still image cannot. This temporal quality communicates that the brand inhabits a real physical world, not a studio.
