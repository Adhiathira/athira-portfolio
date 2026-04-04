# Motion Director Brief — Weld Flint

*A brief for a design language where motion is the minimum necessary proof of life. Every second of duration must justify its presence against a system that defaults to stillness.*

---

## Scroll Opening

The page arrives fully resolved. Navigation appears at full opacity — no entrance fade, no slide-in — because navigation is infrastructure. The hero section loads with a single opacity rise over 400ms, `ease-out`. Nothing else animates during the initial render. The stillness is intentional, not loading-state: the page is complete before the first scroll impression. The black type on cool off-white communicates the system's intent from the first moment: clarity before gesture.

---

## Hero Experience

The hero is a video background candidate. The subject is not environment or atmosphere — it is the primary material or object of the product, at a scale that reveals rather than decorates. The video should exist at the threshold of movement: the viewer watches for 10 seconds before confirming the image is in motion. This ambiguity between still and moving is the intended experience.

**Designated video placement:** `hero-bg.mp4`
Extreme macro slow-drift across the product's defining surface — anodized aluminum, tensioned carbon fiber, precision-milled steel, or machined ceramic — with a single directional light source (overhead, slightly off-center) moving approximately 1.5% of frame width over the full 10-second loop. The motion quality should communicate tolerance specifications rather than production polish: the surfaces are interesting because of what they required to produce, not because they were staged. The text overlay and CTA arrive with the page — no animation, no stagger — present from the first frame. Their stillness is deliberate contrast to the imperceptible drift beneath.

---

## Section Transitions

Section boundaries are not animated. The user's scroll velocity is the transition. Each boundary is a structural cut — a hard edge in a system that uses structural events rather than managed handoffs. Animation at boundaries would dilute the percussive density that gives the layout its character. One exception: a product or feature grid with three or more panels resolves from a slight upward translate (8px → 0) with a 150ms stagger between panels (`ease-out`). This is the single scroll-triggered animation permitted on the page — its function is differentiation, not decoration.

---

## Content Rhythm

Individual elements within sections do not animate on scroll by default. The grid panel stagger above is the exception that establishes the rule. The 0.75s hover transitions on interactive elements create a secondary rhythm: deliberate, measured, communicating that interaction here is a considered event. The 0.08em letter spacing on nav items and the 59px item intervals provide typographic rhythm that does not require temporal animation — the spacing itself creates cadence that the eye reads as motion.

---

## Footer Approach

The footer arrives without animation. The transition from technical photography or product detail to a structured link taxonomy is the most declarative perceptual event on the page — the conclusion after an argument. Animation here would suggest the footer is performing, which would undercut its structural role as utility. The footer is architecturally static.

---

## Motion Principles

This interface operates on **measured and declarative** timing. Primary transitions: 1.04s. Hover interactions: 0.75s. No spring physics. No overshoot. The easing system (`ease`) produces motion that reads as calibrated rather than engineered — confident in its trajectory, not dramatizing its path. Duration is always the minimum required to register as intentional rather than instantaneous. Ambient video loops operate on a completely separate temporal register — 5–10 second cycles — and should never compete with the interaction layer.

---

## Video Placements

### 1. Hero Background — `hero-bg.mp4`
**Section role:** Primary hero, full viewport
**Subject:** Extreme macro slow-drift across the defining material surface of the product — anodized metal, precision-machined ceramic, tensioned carbon weave, or polished stone — with single-source directional light (overhead or raking) shifting across texture over the loop duration
**Motion quality:** Ultra-slow lateral drift with almost-imperceptible camera movement (~1.5% of frame width over 10 seconds); material texture should be sharp enough to reveal individual surface characteristics
**Mood:** Technical intimacy; the surface as evidence of what was required to produce it
**Duration:** 10s loop
**Why video:** A still photograph freezes a surface in one moment of light. At 10 seconds, the viewer experiences the surface as temporally alive — light migrates across micro-facets, reflections shift with the camera's near-stillness. This temporal quality communicates precision manufacturing without naming it: the viewer understands from duration what a caption would only assert.

### 2. Process Detail — `process-ambient.mp4`
**Section role:** Product detail, methodology, or craft/process section
**Subject:** A single production step or quality verification process — a measuring instrument applied to a component, a surface finishing operation mid-motion, or components arranged on a calibration surface — lit with controlled industrial lighting (overhead fluorescent, single window light, or tungsten with diffusion)
**Motion quality:** Camera locked; the only motion is the process itself — a hand making a single deliberate adjustment, an instrument completing a reading, a component being set down with precision (5s, single take)
**Mood:** Process as evidence; the accumulated decision-making that produces quality
**Duration:** 5s loop
**Why video:** Static photography can document a finished object; ambient video shows the process as ongoing — the accumulated labor in an object rendered as present-tense rather than completed past. The single, unhurried hand movement communicates more about craft than a gallery of finished product photographs.

### 3. Environment or Context — `context-ambient.mp4`
**Section role:** About, studio, or brand context section establishing the physical world the product inhabits
**Subject:** The workspace, laboratory, or environment where the product is produced or used — controlled, ordered, characterful — with minimal human presence and maximum atmospheric legibility: organized tool surfaces, calibrated equipment at rest, morning light through industrial glazing
**Motion quality:** Camera locked; environmental motion only — a subtle air movement, dust particles in a light beam, a gauge needle at rest — or very slow camera drift (1% of frame over 5 seconds); no staged action
**Mood:** Place as argument; the physical world the product belongs to
**Duration:** 5s loop
**Why video:** An about section asks the viewer to understand a world, not a product. Video renders a place as temporally present — the light shifts, dust moves in a beam, a surface breathes — in ways that convey atmosphere rather than documentation. The viewer who watches for 5 seconds understands the environment as real and inhabited, which transfers credibility to the product without requiring a claim.
