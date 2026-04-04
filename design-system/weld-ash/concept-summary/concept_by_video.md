# Motion Brief — weld-ash

## Scroll Opening

The page loads into stillness. No entrance animation — the composition simply appears, fully formed, as if it was already there. The display headline renders at full opacity from frame one. The 3D object settles into frame from a very slight downward position (translateY: -8px → 0, 600ms, ease-out), a barely perceptible landing that adds weight without theatrics. Navigation items fade in at 200ms with a 0.08em letter-spacing that the eye reads as deliberate — mechanical, not hurried.

## Hero Experience

The hero does not scroll away — it persists as the page peels beneath it. As the user initiates scroll, the 3D object holds its ground slightly longer than the background, creating a brief parallax separation that reinforces its physical presence in the composition. The headline drifts at 70% scroll speed, the object at 85%, the background at 100% — three rates that together imply depth.

**Video background candidate:** The hero background field warrants ambient video treatment — not as decoration, but as surface material. The ash grey field should carry the specific quality of a surface under observation: slow light migration across a matte industrial plane, the kind of footage shot on a copy stand with a fixed camera over 10–15 minutes and time-compressed. The subject is not the object — it is the quality of the ground the object rests on.

## Section Transitions

Sections reveal on a threshold scroll trigger, not a continuous parallax. Each section's content block enters with `opacity: 0→1` and `translateY: 24px→0` over 480ms with `cubic-bezier(0.4, 0, 0.2, 1)`. This is deliberate forward motion — not bouncy, not springy, not floating. The easing implies something being placed, not something arriving.

Section boundaries are marked by the background color shifting — from ash (#e5e5e5) to near-black (#0f0e12) and back — with no animated transition between them. The cuts are hard. The sections are discrete zones, not a continuous scroll narrative.

## Content Rhythm

Individual elements within a section enter with a stagger of 0.08s between items. The sequence moves left-to-right, top-to-bottom — reading order. No random or cascading patterns. The rhythm is predictable, which is the point: this is a design that trusts its content enough not to dress it up with complex entrance choreography.

The motion system's 1.3× duration scaling (0.39s base) gives each element enough time to land before the next begins. The accumulation of these micro-pauses creates a reading pace that is unhurried — the design assumes the viewer will wait.

## Footer Approach

The footer enters from below as the user approaches the bottom of the page. It does not animate in — it is simply revealed as the last section's content scrolls up to expose it. The footer's dark surface (#0f0e12) functions as the final transition, framing the page as a closed object rather than an open scroll.

The scroll-to-top affordance appears at the bottom-right corner at 300px from the bottom. It fades in over 200ms. When clicked, the page scrolls back to 0 with `behavior: smooth` and `scrollIntoView` — no GSAP, no custom easing. The native scroll arc is sufficient.

## Motion Principles

**Timing philosophy:** Deliberate and unhurried. The 1.3× duration scaling amplifies what is already true of the source material — this is a system that takes its time. Snappy transitions would read as anxious. The longer durations imply confidence: the design believes the viewer will wait for what it has to show.

**Easing character:** `cubic-bezier(0.4, 0, 0.2, 1)` — the Material standard easing — carries a slight ease-out deceleration that implies things decelerating into position rather than stopping abruptly. It reads as physical: objects that have mass.

**Motion vocabulary:** Translate and opacity only. No scale. No rotation. No blur. The absence of kinetic effects reflects the industrial restraint of the ash palette — the design system was built around surfaces, not gestures.

**Reduced motion:** All entrance animations should respect `prefers-reduced-motion: reduce`. When reduced motion is enabled, all `translateY` animations are disabled; only `opacity` transitions remain, at half the standard duration.

---

## Video Placements

### 1. Hero Background — `hero-surface.mp4`
- **Section role:** Primary hero, full-viewport background layer
- **Subject:** Slow light migration across a matte industrial surface — concrete, sand-blasted aluminum, or ash-painted steel. Fixed camera overhead or raking. Light source moves laterally across the frame over the full 10 seconds.
- **Motion quality:** Imperceptible drift — this is time-compressed natural light, not a camera move. The surface texture should be visible but secondary to the quality of the light itself.
- **Duration:** 10s loop
- **Why video:** A still background gives the ash grey palette nothing to do. Video introduces the one quality static color cannot carry: the specific way industrial materials respond to changing light. The surface becomes evidence of the physical world, not a CSS color value.

### 2. Product/Feature Showcase — `material-study.mp4`
- **Section role:** Mid-page product showcase or feature proof section
- **Subject:** A sequence of material surface close-ups — anodized aluminum, matte black powder coat, brushed steel. Each surface occupies the full frame, lit from one angle, held for 2–3 seconds before cutting to the next. Total: 6–7 cuts in 10 seconds.
- **Motion quality:** Static camera, varying subject. The motion is entirely in the light and texture — small imperfections, micro-scratches, grain. Not macro. Not soft. Precise and factual.
- **Duration:** 10s loop
- **Why video:** Still product photography can show what a material looks like. Video shows how it behaves — the way a surface catches light at different angles, the quality of its silence. This section is where the design system's industrial vocabulary is most legible, and video is the only medium that can carry the temporal quality of that.

### 3. Services/Process Section — `workshop-ambient.mp4`
- **Section role:** Services, process, or methodology section
- **Subject:** Wide shot of a workshop or production space — sparse, organized, no human presence. Camera fixed. Natural light through industrial windows. Dust motes visible if possible. Objects at rest.
- **Motion quality:** Slow drift if using a slider, otherwise static. The ambient quality is what matters — the feeling of a space between uses. A held breath before work resumes.
- **Duration:** 5s loop
- **Why video:** This section describes process without showing people performing it. The empty workshop is more legible as a place of serious work than any staged production shot. Still photography would make it look like a real estate listing. Video with ambient light movement makes it feel inhabited.
