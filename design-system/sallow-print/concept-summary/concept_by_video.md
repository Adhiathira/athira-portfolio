# Motion Brief — Sallow Print

## Scroll Opening

The page enters silently. No pre-loader, no flash. The warm cream background is already present — the first text element resolves from opacity 0 over 0.52 seconds with a gentle upward drift of 20px. There is no scale transformation, no overshooting. The motion reads as emergence rather than entrance: the content feels like it was always there, becoming visible rather than being placed. The nav appears already in position, text already readable.

## Hero Experience

The hero earns the full viewport. A landscape or atmospheric product video occupies the right column behind a warm semi-transparent overlay — the video should move slowly enough to feel like a long-exposure photograph that has just woken up. The mood is materiality: warm ambient light on a surface, early morning, unhurried. Suggested subject: **slow drift across a studio workspace or printed-paper surface, morning side-light, 10s loop**. The video does not demand attention — it deepens the background register.

Text on the left enters with a staggered slide-up: eyebrow label first (0.52s), then display heading (0.65s, slightly larger delay), then subtext and CTA pair. The stagger delay is 0.1s between each element. The sequence reads as a deliberate typographic cadence — measured, not rushed.

The nav transition from transparent to opaque triggers on first scroll — immediate, no threshold delay. Duration 0.55s, ease-in-out.

## Section Transitions

Sections transition by color cut. The shift from warm cream to near-black is hard — the eye registers it as a page-turn rather than a fade. This is intentional. Content within each new section enters via the same fade-up pattern (0.65s, 20px), triggered on scroll-into-view. There is no scroll hijacking. The user maintains full vertical momentum; the animations serve the content, not the scroll.

Feature cards in the three-column grid stagger with 0.1s between children. The stagger reads as a quiet countdown — left to right, each card arriving in sequence as if being placed on a surface. No bounce, no spring. The easing is `ease-in-out` throughout.

## Content Rhythm

Individual elements enter via the standard slide-up pattern. For card grids: a stagger of 0.1s per child. For split-column sections: left element enters at 0s delay, right element enters at 0.15s delay — the split reads as a coordinated pair rather than simultaneous arrival.

Typography-only sections (process steps, editorial blocks) have the most restrained animation: fade-in at 0.52s, no translation. When the content is dense text, the motion is reduced to a single opacity resolve. Moving text as it enters would compete with the act of reading.

## Footer Approach

The footer appears via a single fade-in — no translate, no scale. Duration 0.52s. The footer is the end of the page; its entry should signal arrival, not fanfare. The transition from the last content section to the footer is a clean color cut.

## Motion Principles

The timing philosophy is **languid and composed**. All durations have been scaled to 1.3× from a standard base — the fastest interaction (button hover, link hover) is 0.55s; the slowest animation (rotating badge, if used) is 5.2s. There is no snappy micro-interaction. The system does not reward impatience with speed — it asks the user to inhabit each transition.

Easing is `ease-in-out` for everything structural. `linear` only for looping rotations (badge). No springy or bouncy easings — these would contradict the editorial register.

## Video Placements

**1. Hero background — `hero-bg.mp4`**
- Section role: hero
- Suggested filename: `hero-bg.mp4`
- Subject: slow horizontal drift across a warm-lit studio tabletop or printed-paper surface; morning window light casting soft diagonal shadows; grain and texture visible. Practically no movement in the frame — just light shifting.
- Motion quality: near-static drift, barely perceptible horizontal movement; feels like a long-exposure photograph breathing
- Duration: 10s loop
- Why video: a still image would be inert; the barely-perceptible motion adds temporal warmth to the warm cream palette, making the background feel alive without competing with the foreground text

**2. Product feature section — `feature-ambient.mp4`**
- Section role: product showcase / feature split
- Suggested filename: `feature-ambient.mp4`
- Subject: hands interacting with a physical or digital interface — deliberate, unhurried hand movements; warm overhead light; soft shadows; the interaction is careful, not performative
- Motion quality: slow handheld, slightly floating; the frame holds still except for the hands
- Duration: 10s loop
- Why video: the split-column section needs its right-side media to feel active but not aggressive; a slow product interaction video signals function without the clinical quality of a static screenshot

**3. Services section — `services-ambient.mp4`**
- Section role: services or capabilities showcase
- Suggested filename: `services-ambient.mp4`
- Subject: macro close-up of a printed or textured surface — paper grain, ink on stock, or a material sample — light moving slowly across the surface
- Motion quality: macro, ultra-slow pan; practically a still image with micro-motion
- Duration: 5s loop (tight ambient — the section is short)
- Why video: the services section is typically type-heavy; ambient material video behind or beside the text adds depth and signals craft without adding visual noise
