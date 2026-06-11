# Concept by Video — Griting-Opux Merged System

## Overview

This document describes how video and motion assets should look, feel, and behave in the griting-opux merged design system. It synthesizes Opux's scroll-video and cinematic motion philosophy, fully retuned to Griting's green-world identity, narrative pace, and brand feeling.

The source authority for all color, typography, and brand decisions is Griting. Opux contributes the motion grammar: how video and animated backgrounds are structured, paced, and layered across the scroll journey.

---

## Brand Motion Identity

Griting's brand is infrastructure — permanent, load-bearing, grown from the ground up. Motion in this system does not excite or dazzle. It **grounds**. Animated elements behave like deep forest processes: they move slowly, continuously, with implied weight. There is no bounce, no spring, no pop. There is growth, depth, and accumulation.

The primary motion metaphor is **root systems and canopy**: things moving beneath the surface, slowly spreading, occasionally becoming visible. The animated terrain grid — the system's primary motion asset — is not a racing landscape or a digital void. It is an overhead or perspective view of a living ground: growing lines, spreading networks, the structure beneath the visible.

When motion accelerates, it does so with purpose — not to delight but to signal a narrative chapter change. The user should feel, on scroll, that they are moving through layers of a system, not through a marketing carousel.

---

## Animated Background: Forest-Floor Terrain Grid

### Description

The primary animated video/canvas element is a **perspective-distorted wireframe terrain grid**, rendered in motion. It functions as a full-bleed background layer in hero and mid-page narrative sections.

### Color Specification

- **Line color:** #00693e at 15–20% opacity
- **Background field:** #003620 (solid, no gradient)
- **Glow on lines:** none in resting state; at 0.5x scroll velocity intersection points may pulse to #00693e at 35% opacity for 200ms
- **No warm tones, no red/terracotta, no teal-black.** The original Opux terrain used a warm-to-cool gradient background (#6b2a24 → #1a3040) — this is replaced entirely with the Griting green field.

### Animation Behavior

The terrain grid moves in slow continuous forward motion — the camera appears to travel across the ground plane toward a horizon. Speed is approximately 20–30% of Opux's original pace. The motion should feel like time-lapse root growth, not forward flight.

- **Loop:** Seamless. The grid tiles along the forward axis; no visible restart.
- **Parallax:** The terrain plane moves at 0.6x the scroll velocity. Foreground content moves at 1.0x. This creates depth separation between foreground text and background terrain.
- **Scroll response:** Terrain velocity increases to 0.8x scroll speed during active scroll (not locked 1:1 — the terrain lags slightly, reinforcing its independence from the content layer).
- **Fade edges:** The terrain fades to transparent at the left and right edges (20% vignette) to prevent hard-cropped lines at viewport boundaries.

### When the Terrain Is Active

The terrain background appears in sections where Griting's green-world atmosphere is foregrounded:

1. **Hero section** — full opacity terrain, full depth composition
2. **GritMe Demo Beat (mid-page showcase)** — terrain reactivated to signal narrative chapter shift
3. **Footer** — terrain at 30% opacity, purely textural, not animated at full pace (reduced to 10% speed)

The terrain is **absent** in off-white/light sections (New Infrastructure, GritMe feature sections, Testimonials). Its controlled reappearance is the primary pacing mechanism on the page.

---

## Hero Video/Motion Composition

### Layer Stack

The hero operates as a three-layer motion composition:

1. **Layer 1 — Background (terrain):** Forest-floor grid, full opacity, slow forward motion, #003620 base
2. **Layer 2 — Midground (ghost typography):** Griting's G-icon or full wordmark at 5% white opacity, rendered at full viewport width. Static — does not animate. Functions as texture, not readable content.
3. **Layer 3 — Foreground (content):** Griting's headline (bottom-left anchor), CTAs, subheadline. Static. White text.

### Entrance Animation

On page load, the hero composition assembles in sequence:

1. **0–400ms:** Terrain fades in from 0% to full opacity (ease-out curve)
2. **200–600ms:** Ghost letterforms fade in from 0% to 5% opacity (ease-out, offset 200ms from terrain)
3. **400–800ms:** Foreground content block fades in with 20px upward slide (ease-out, offset 400ms)
4. **600–900ms:** CTA buttons fade in (staggered 80ms between primary and secondary)

The overall entrance reads as: environment appears first, then structure, then message. This sequence reinforces Griting's identity — the ground is established before the content speaks.

### Scroll Exit

As the user scrolls down from the hero:
- Terrain parallaxes at 0.6x scroll velocity (appears to recede)
- Foreground content scrolls at 1.0x (standard)
- The next section (off-white) slides up over the terrain — **layered overlap transition**, not a hard cut
- Terrain does not fade out; it is occluded by the incoming section surface

---

## Mid-Page Demo Showcase Section

### Purpose

This section is the **GritMe Demonstration Beat** — the cinematic mid-page moment that demonstrates the product in motion. It mirrors Opux's Media Showcase Section in structure and atmospheric intent.

### Layout

- Centered headline and subheadline (60% viewport width)
- Below: product video or animated UI mockup in a **browser-chrome container** (rounded rectangle, #003620 surface, 1px border in #00693e, browser dot indicators in #00693e at 40% opacity)
- Container width: approximately 70% of viewport width
- Background: terrain grid fully reactivated

### Video Content Direction

Video assets placed in the demo container follow these visual rules:

**Color grading:**
- Shadow tones: #003620 range (deep forest green blacks, not neutral dark)
- Midtone highlights: lifted toward #00693e
- Skin tones: preserved but shifted -5 to -10 degrees on the hue wheel toward cool green, to read as native to the green-world environment
- No warm red/amber tones. Any terracotta or rose elements from source footage are desaturated and cooled.
- UI elements within screencapture footage retain their original green-tinted card colors (the GritMe UI is already green-native)

**Narrative content:**
- The video demonstrates the system working — data flowing, evaluations completing, roadmaps generating. It does not demonstrate a concept or mood.
- Pace: deliberate, not rushed. Each state change in the UI has a 300–500ms hold before transitioning. The system appears to think, not snap.
- No voiceover. No music with tempo. Ambient sound only — if any audio is used, it is low-frequency environmental texture (forest ambience, very low volume) that reinforces the ground-level metaphor rather than adding product energy.

**Container entrance animation:**
- On scroll reveal: container fades in (opacity 0 → 1, 400ms) with a 30px upward slide
- Terrain background fades in simultaneously (0 → full opacity, 600ms)
- The two elements arrive together, terrain slightly faster, giving the sense that the ground appears first and the product emerges from it

---

## Section Transition Motion

### Animated to Static (terrain active → terrain absent)

When the page scrolls from a terrain-active section (hero, demo beat) into a static off-white section:
- The solid-background section slides up over the terrain at standard scroll velocity
- No cross-fade — the terrain is revealed and occluded by physical scroll position only
- This is a **layered overlap** transition, not a dissolve

### Static to Animated (terrain absent → terrain active)

When the page scrolls into a terrain-active section from a static section:
- The terrain background fades in as its section enters the viewport (opacity 0 → full, over 400ms of scroll entry)
- The content block fades in with 20px upward slide, offset 200ms after terrain starts
- The effect reads as: the ground re-emerges, then the content appears on it

### Static to Static

Between two off-white or light sections: seamless hard cut. No transition animation beyond content scroll-reveal (fade-in + slide-up, 300ms, ease-out).

---

## Scroll-Reveal Animation Vocabulary

All content reveals on scroll follow a consistent vocabulary:

| Element Type | Animation | Duration | Easing |
|---|---|---|---|
| Section headline | Fade in + 20px up | 400ms | ease-out |
| Section subheadline | Fade in + 20px up | 400ms | ease-out, 80ms offset |
| Body paragraph | Fade in | 300ms | ease-out, 160ms offset |
| Card (single) | Fade in + 16px up | 350ms | ease-out |
| Card (grid, multiple) | Staggered fade in + 16px up | 350ms per card | ease-out, 100ms stagger |
| CTA button | Fade in | 250ms | ease-out, last in sequence |
| UI mockup / media container | Fade in + 30px up | 450ms | ease-out |

No bounce. No spring. No scale transforms on reveal. The vocabulary is fade and translate — understated, structural, grown rather than popped.

---

## Motion Hierarchy

Three tiers of motion operate simultaneously on the page:

### Tier 1 — Ambient (background terrain)
Continuous, low-priority, always running in active sections. The user's eye adjusts to it and it becomes environmental rather than attention-drawing. Speed: very slow. It should be possible to watch a terrain section for 10 seconds and not feel any urgency from the motion.

### Tier 2 — Scroll-Linked (section transitions, parallax)
Triggered by scroll position. The terrain parallax (0.6x velocity) and layered-overlap section transitions fall here. These are not animated in the keyframe sense; they are tied directly to scroll position as transforms and opacity values.

### Tier 3 — Scroll-Triggered (content reveals)
One-time animations triggered when a section enters the viewport. Content fades in, slides up, staggers. Each element animates once on entry and then holds its final position. No looping, no pulse, no continuous motion at this tier.

---

## Video and Audio Asset Specifications

### Background Terrain Video (if pre-rendered)

If the terrain grid is delivered as a video asset rather than a canvas animation:

- **Format:** WebM (VP9) primary, MP4 (H.264) fallback
- **Resolution:** 1920×1080 minimum, 2560×1440 preferred
- **Duration:** 8–12 second seamless loop
- **Color space:** sRGB
- **Compression:** Visually lossless — the fine grid lines must not show compression artifacts
- **Audio:** None (muted)
- **Autoplay behavior:** autoplay, muted, loop, playsinline
- **Fallback (no video support):** Static image of a single terrain frame at #003620 base — no placeholder, no grey box. If the terrain cannot render, the section holds #003620 as a flat field. The ghost letterforms remain as a static midground layer.

### Demo Video (product showcase)

- **Format:** WebM (VP9) primary, MP4 (H.264) fallback
- **Resolution:** 1280×720 minimum (displayed at ~70% viewport width, so effective display is approximately 960px wide at 1440px viewport)
- **Duration:** 30–90 seconds, autoplay on scroll entry, muted, loop
- **Color grade:** Applied per specification above (green-world grading)
- **Playback controls:** Minimal — a single play/pause toggle visible on hover over the container. No scrubber, no volume (muted). The video is ambient demonstration, not interactive viewing.
- **Poster image:** A single frame from the video, color-graded to spec, used as the display state before autoplay begins

### Audio (if used)

Audio in this system is optional and must be off by default. If ambient sound is used:
- **Type:** Environmental texture — low-frequency forest ambience or low-noise white-noise floor. Not music, not rhythmic.
- **Volume:** Maximum -18dB (barely perceptible without headphones)
- **Trigger:** User-initiated opt-in only (a small, persistent mute/unmute toggle in the corner of terrain-active sections)
- **Never:** Auto-play audio, audio tied to scroll events, audio with beat or tempo

---

## Unavailable Asset Handling

If video or animated terrain assets cannot be rendered faithfully:

**Do not:** display a grey box, a placeholder image, or any generic fallback.

**Do:** show a diagnostic component that:
1. Names the missing asset (e.g., "Terrain animation — forest-floor wireframe grid, #00693e lines on #003620")
2. Explains why it is unavailable (e.g., "Canvas renderer not loaded", "Video file not found at /assets/terrain-loop.webm")
3. States the action required (e.g., "Re-run asset generation pipeline" or "Generate terrain video using Kling with the prompt in project-documentation/unavailable-content-prompts.md")

The diagnostic component uses #003620 background, #00693e border, white text. It occupies the same dimensions as the missing asset. It does not silently degrade to a color field.

---

## Summary: Motion Principles

1. **Ground first.** The environment (terrain, green field) appears before the content. Motion establishes the world; content populates it.
2. **Slow is permanent.** Animations that are slow feel structural. The terrain is ancient; it does not hurry.
3. **Motion as chapter signal.** Terrain reactivation at the demo section is not decorative — it is a narrative signal. Used sparingly, it remains meaningful.
4. **No motion for motion's sake.** Every animated element serves a function: the terrain creates depth, the parallax creates layer separation, the reveal stagger creates reading order. Decoration that adds no semantic value is removed.
5. **Green-world coherence.** All motion assets — terrain, ghost letterforms, video grading — exist within the same chromatic world (#003620 / #00693e). A motion asset that introduces a different color temperature breaks the environment and is not acceptable.
