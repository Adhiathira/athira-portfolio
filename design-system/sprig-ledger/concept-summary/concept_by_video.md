# Sprig Ledger — Concept by Video

## Scroll Opening

The page arrives in stillness. On load, the hero's oversized tracked heading fades in with a gentle upward drift — `opacity: 0 → 1`, `translateY(20px) → 0` — using the unhurried 0.351s duration of the sprig-ledger motion system. Nothing accelerates. The entrance communicates deliberateness: this is a design that earns your attention by refusing to grab it.

## Hero Experience

The hero section is the most considered moment on the page — a white field anchored by a large tracked heading and a single CTA. The depth here comes not from photography but from typographic scale and the quality of the air around each element. The hero is a strong candidate for a subtle ambient video background: a slow macro drift across botanical specimens — pressed fern fronds, seed envelopes, layered paper textures — shot in diffuse morning light. The motion should be barely perceptible, a 10-second loop that reads more like breathing than movement. The video sits behind the type at low opacity, contributing texture without competing with the hierarchy above it.

**Suggested asset:** `hero-ambient.mp4` — macro drift across pressed botanical specimens, morning light, 10s loop, 30% opacity overlay.

## Section Transitions

As the user scrolls from hero into the first content section, elements enter from below using the `slide-up` keyframe with staggered timing — 0.1s between sibling elements, each at the medium duration of 0.468s. The transition between white and any darker container sections uses a slow cross-fade of the background, not a hard cut. The rhythm is slow enough to register as a breath, fast enough to not interrupt reading flow.

## Content Rhythm

Individual cards and list items enter the viewport via `slide-up` with a 0.1s stagger per item. The expanded spacing (1.2× global scale) means each element has more travel distance before settling — this makes the entrance animations feel more considered, less mechanical. Pull quotes and large typographic statements fade in at the xslow duration (1.404s) to honor their weight. The letter-tracked headings animate as single units, not character-by-character — their breadth should land all at once.

## Footer Approach

The footer fades in as a complete unit — `opacity: 0 → 1` at the slow duration (1.17s). No dramatic entrance. The footer's role is resolution, not spectacle. If the scroll journey has been properly paced, arriving at the footer feels like setting down a well-made book: satisfying, unhurried, complete.

## Motion Principles

The overall timing philosophy is **botanical pacing** — every transition has been scaled to 1.3× of what might be considered "standard." Nothing snaps. The system communicates that thoughtfulness takes time. The easing is deceleration-first: `cubic-bezier(0.4, 0, 0.2, 1)` and `cubic-bezier(0.68, 0, 0.23, 1)` are the dominant curves, both of which settle into final position without overshooting. The motion system defers to content; it is never the main event.

## Video Placements

**1. Hero Background — `hero-ambient.mp4`**
- Section role: hero
- Suggested filename: `hero-ambient.mp4`
- What the video shows: slow macro drift across dried botanical specimens — pressed ferns, seed packets, handmade paper edges — in diffuse morning window light. Motion quality: extreme slow drift, nearly static. Mood: studiousness, material intelligence, quiet precision.
- Duration: 10s loop
- Why video: the hero must establish material register before the user reads a word. A perfectly still image cannot convey the quality of attention this design system embodies; a near-static video of rare materials demonstrates it through time.

**2. Product Showcase — `process-detail.mp4`**
- Section role: product/feature showcase (second content section)
- Suggested filename: `process-detail.mp4`
- What the video shows: close-up of hands working with precision instruments — measuring, annotating, calibrating. Handheld but steady. The tools are beautiful and functional simultaneously. Mood: craft, care, expertise.
- Duration: 8s loop
- Why video: a product feature section built on text and static cards risks feeling abstract. A video of the work being done makes the claim concrete — it shows, rather than tells, that the product serves people who care about doing things right.

**3. Studio/Archive — `archive-ambient.mp4`**
- Section role: studio or about section
- Suggested filename: `archive-ambient.mp4`
- What the video shows: slow timelapse or drift across an organized archive — shelved specimens, labeled drawers, systematically arranged objects. Light shifts gradually across the frame. Mood: institutional memory, accumulated knowledge, care for order.
- Duration: 10s loop
- Why video: the "about" or studio section needs to communicate that this platform is not improvised. A video of a curated, organized environment conveys institutional seriousness more effectively than a static photograph — because the slow accumulation of detail in video form mirrors the accumulated intelligence the platform represents.
