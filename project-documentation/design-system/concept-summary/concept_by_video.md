# Concept by Video — Griting × Formless Motion World

## Overview

This document describes the motion and video aesthetic for the Griting × Formless merged design system. Griting's visual identity is the foundation: deep forest green, earned trust, infrastructure permanence. Formless contributes the motion grammar: generative flow, cinematic scale, atmospheric depth, and a single coherent easing character. Together they produce a world that feels both grounded and alive — infrastructure that breathes.

---

## Brand World Description

The visual world of Griting × Formless is one of deep growth: not the rapid, surface-level growth of a startup, but the slow, structural growth of a forest. The dominant metaphor is infrastructure beneath the surface — root systems, structural beams, deep water — all rendered in the brand's deep forest green (#003620) with soft ambient light as the only luminous element.

Formless adds to this a sense of fluid intelligence: forms that shift, resolve, and reveal themselves over time. Not chaos — controlled emergence. The motion feels purposeful, like a system becoming legible as you watch it.

---

## Color World for Video Assets

All video and motion assets must operate within Griting's chromatic environment:

**Primary environment color:** `#003620` (deep forest green) — the dominant field, the ground
**Brand accent:** `#00693e` (medium green) — the brightest living element, used sparingly as highlight
**Ambient glow core:** `#0d4a35` — the light source in the deep green world, warm but not bright
**Text / luminous element:** `#ffffff` / `#f4f2f0` — white-to-cream, used only for type and the softest light
**No blues, purples, or warm neutrals** — the chromatic world is entirely within the green family

The Formless source system used a teal-to-blue ambient glow shift. In this merged system, that shift is retuned entirely to the green family: the hero glow is `#0d4a35` at its brightest core, and the footer glow is `#002918` — a slightly cooler, deeper green — creating the same chromatic arc Formless used but wholly within Griting's palette.

---

## Motion Character

### Easing
A single easing curve governs all motion: `cubic-bezier(0.4, 0, 0.2, 1)`. Duration varies by context:
- Micro interactions (hover, opacity shifts): 0.2s
- Standard transitions (card reveals, button states): 0.3s
- Scroll-triggered section reveals: 0.5s
- Large atmospheric or video transitions: 0.8s – 1.2s

No bounce, no spring, no elastic. The easing is smooth and declarative — infrastructure does not bounce.

### Motion Hierarchy for Scroll Reveals
When a section enters the viewport, elements reveal in this order:
1. Large headline or section statement — slides up from 20px below, fades in
2. Major media surface or product mockup — fades in at 0.3s delay
3. Primary CTA — fades in at 0.5s delay
4. Supporting body copy and secondary elements — fades in at 0.7s delay

This preserves the main promise before revealing detail. The user reads the claim before the evidence.

### Atmospheric Motion (Background Video Loops)
Background videos are extremely slow — nearly still. Camera movement, if present, is measured in millimeters per second. The motion communicates: this has always been here. Nothing is surprising. Everything is stable.

---

## Video Asset Specifications

### Hero Background Video
**Concept:** A slow overhead drift through dense deep-green forest canopy, viewed from below looking up. The camera is nearly still — a barely perceptible upward drift of 2–3% over a 30-second loop. The light source is diffused through dense leaves, creating soft patterns of #0d4a35 ambient light against the deep #003620 canopy field.

**Color range:** `#003620` at the darkest (shadow) to `#00693e` at the brightest (where light catches a leaf edge). No other colors.
**Motion:** Imperceptibly slow. Loopable. No cuts, no hard transitions.
**Audio:** None (or: very low ambient environmental — wind through leaves, no music)
**Duration:** 30-second seamless loop
**No people, no text, no UI elements.**

**Generation prompt (Kling or equivalent):**
> Slow drift through dense deep green forest canopy, viewed from below, shot in overcast natural light. Color palette is exclusively deep forest green (#003620) to medium green (#00693e). Camera movement: nearly imperceptible upward drift over 30 seconds. Extremely slow. Loopable. Photorealistic. No people, no sky visible, only leaf canopy and diffused light. Aspect ratio 16:9. Cinematic quality. No music, no narration.

---

### Section Atmospheric Background (GritMe Sections)
**Concept:** A dark studio environment with a single soft radial glow emerging from lower center — green light in a dark field. Not a lens flare, not a particle system — just ambient environmental light suggesting depth and warmth in darkness. Completely still or barely breathing (0.5% scale oscillation over 6 seconds).

**Color:** Central glow `#0d4a35`, outer field `#001a0f` (near-black green). No other colors.
**Motion:** Breathing — a slow, imperceptible scale pulse (100% → 100.5% → 100%) on a 6-second loop.
**Use:** As a video background layer beneath product mockup sections on dark backgrounds.

**Generation prompt:**
> Single soft radial ambient glow, deep green (#0d4a35) at center, fading to near-black green (#001a0f) at edges. Completely dark environment. No subjects, no objects, just atmospheric depth. Slightly breathing — almost imperceptible scale oscillation. Loopable. 16:9. Cinematic.

---

### Footer Atmospheric Background
**Concept:** Same radial glow as the hero, but shifted to a cooler, deeper temperature — `#002918` at the glow core, `#001008` at the outer field. The chromatic shift signals arrival, completion, the system closing its loop.

**Generation prompt:**
> Single soft radial ambient glow, deep cool green (#002918) at center, fading to near-black (#001008) at edges. Slightly dimmer and cooler than the hero version. Loopable. Static or barely breathing. 16:9. Cinematic.

---

### Concept Motion — "Infrastructure Beneath the Visible"
**Concept:** A generative visualization of a network resolving from noise into structure. Begins as ambient green light particles in slow chaotic drift — the Formless quality — then gradually self-organizes into a stable, geometric node graph. The nodes and edges are in `#00693e` on `#003620`. The organization process takes 8–12 seconds, then holds for 3 seconds before the loop resets with a slow dissolve.

**Color:** `#003620` background, `#00693e` lines and nodes, `#f4f2f0` node highlights (very subtle)
**Motion:** Slow drift → gradual crystallization → stable hold → slow dissolve → loop
**Use:** Optional: hero section background behind the headline, or as a standalone brand video asset
**This is the most "Formless" moment in the merged system** — generative, fluid, resolving into structure. It is allowed here because it serves Griting's core thesis: trust is built from observed evidence, not assertion.

---

## UI Transition Patterns for Video/Interactive Contexts

### Section Entry (Scroll-Triggered)
- Section enters from 20px below current position
- Opacity: 0 → 1
- Transform: translateY(20px) → translateY(0)
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)`
- Duration: 0.5s
- Stagger within section: 0.15s between child elements

### Page-Level Background Transition (Dark → Light Zones)
- Background color crossfades over 0.3s as the user scrolls through the transition boundary
- No hard cut — the background field dissolves between zones
- The transition uses the midpoint of the section boundary as the trigger threshold

### Sticky Scroll (GritMe Product Panels)
- Left column (media/mockup) is position: sticky at 20% from top
- Right column (text) scrolls normally
- A thin vertical rule (`#00693e`, 1px, 0.3 opacity) divides left from right
- Text stack reveals stagger at 0.15s intervals as each GritMe section enters the sticky zone

### CTA Hover States
- Primary button: background shifts from `#00693e` to `#004d2c` (darker green), 0.2s, `cubic-bezier(0.4, 0, 0.2, 1)`
- Ghost button: transparent fill → solid `#00693e` fill, text inverts to `#ffffff`, 0.2s
- Link text: opacity 1.0 → 0.6, 0.2s (opacity reduction, not color change)
- Icon links: opacity 1.0 → 0.6, 0.2s

---

## Asset Generation Guidance Summary

| Asset | Colors | Motion | Concept |
|---|---|---|---|
| Hero background video | #003620, #00693e, #0d4a35 | Imperceptibly slow drift | Forest canopy from below |
| Section atmospheric glow | #0d4a35 → #001a0f | Breathing pulse, 6s loop | Radial ambient depth |
| Footer atmospheric glow | #002918 → #001008 | Static or breathing | Chromatic bookend, cooler |
| Brand concept video | #003620, #00693e, #f4f2f0 | Drift → crystallize → hold → dissolve | Network resolving from noise into structure |
| UI section reveals | n/a | Scroll-triggered, staggered, 0.5s | Slide up + fade in, hierarchy order |

All assets must avoid: bright colors, warm tones, blue tones, artificial glow effects that break the green chromatic world, rapid motion, particle explosions, lens flares, or any visual element associated with generic AI-generated aesthetics.

