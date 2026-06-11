# Datum Rail — Concept by Video (Motion Principles)

## Page Load Behavior

**Immediate render — no entrance animation on page load.** The nav, hero content, and above-the-fold dashboard mockup are all visible from the first frame. Dashboard users are operators: they expect immediate data, not a welcome ceremony. The page arrives already running.

---

## Scroll Opening Behavior

As sections scroll into view, content reveals with a minimal `opacity: 0 → 1` + `y: 8px → 0` translate. Duration: 200ms. Easing: `cubic-bezier(0.4, 0, 0.2, 1)`. Stagger between cards in a grid: 40ms per card.

This is barely perceptible as an animation — it reads more as a "load in" than a performance. The intent is to signal that content is dynamically available, not to entertain the eye.

---

## Stats / Metric Count-Up

When the stats row scrolls into viewport, all four numeric metrics count up from 0 to their final value simultaneously. Duration: 1200ms. Easing: `cubic-bezier(0.4, 0, 0.2, 1)` (accelerates fast, decelerates near target — feels authoritative, like a measurement settling into place).

This is the single most expressive motion in the system. It signals: these numbers are live, not static. They were computed for you.

---

## Card Hover

Cards animate on pointer enter: border-color transitions from `#e2e8f0` → `#2563eb`. Duration: 150ms. No transform, no box-shadow explosion, no scale. The border activation is the feedback — it says "this card is interactive" without interrupting the data scan.

---

## Table Row Hover

Row background fills to `rgba(0,0,0,0.04)` — 100ms, immediate, crisp. In a dense table, this must be fast enough that it doesn't lag behind the cursor.

---

## Chart / Bar Draw Animation

When a chart section enters the viewport, bars grow from height 0 upward using `transform: scaleY(0 → 1)` with `transform-origin: bottom`. Duration: 800ms. Easing: `cubic-bezier(0.4, 0, 0.2, 1)`. Bars stagger at 60ms intervals.

This is the only animation that exceeds 200ms — charts are the focal data visualization element, and the draw reveals the data in the same way a physical instrument needle moves to its reading.

---

## Button Interactions

Button hover: background darkens 8% (primary: `#2563eb → #1d4ed8`). Duration: 150ms. No letter-spacing, no scale, no glow. The darkening is the feedback — minimal, functional, unambiguous.

Button press: `translateY(1px)` — 100ms. Confirms the action with a physical metaphor.

---

## Navigation

Nav is fixed. No scroll-triggered background change (it's white throughout). No logo animation. Mobile menu: slides into view at 150ms — no drama, just reveal.

---

## Motion Principles Summary

| Interaction | Duration | Easing |
|---|---|---|
| Button hover | 150ms | cubic-bezier(0.4, 0, 0.2, 1) |
| Card border | 150ms | cubic-bezier(0.4, 0, 0.2, 1) |
| Row hover | 100ms | cubic-bezier(0.4, 0, 0.2, 1) |
| Scroll reveal | 200ms | cubic-bezier(0.4, 0, 0.2, 1) |
| Count-up | 1200ms | cubic-bezier(0.4, 0, 0.2, 1) |
| Chart draw | 800ms | cubic-bezier(0.4, 0, 0.2, 1) |
| Mobile menu | 150ms | cubic-bezier(0.4, 0, 0.2, 1) |
| Page entrance | none | — |

**One easing to rule them all.** `cubic-bezier(0.4, 0, 0.2, 1)` is the Material Design standard curve — it accelerates quickly off the start and decelerates into the end, simulating the motion of a physical object decelerating under friction. In a data tool, this reads as mechanical precision, not organic animation.

Motion in Datum Rail is calibration, not celebration.
