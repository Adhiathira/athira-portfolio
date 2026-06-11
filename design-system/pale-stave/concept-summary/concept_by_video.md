# Pale Stave — Concept by Video

## Scroll Opening

The page arrives without announcement. No preloader, no splash, no animated logo reveal. The first frame is complete: white field, IBM Plex Mono nav links already present at their 0.08em tracking, the hero image occupying its full-viewport position. The only motion at load is the AOS-orchestrated fade for elements below the fold — timed at 225ms stagger intervals (1.5× the source baseline), so the sequence breathes rather than snaps. The scroll opening is a document settling onto a reader's desk.

## Hero Experience

The hero is a still composition at resting state — full-bleed image, white page, Lora italic label anchored at lower left. However, this section is the primary candidate for ambient video: the design's restraint makes a near-still video more powerful here than any other placement. The video register should be indistinguishable from a high-resolution photograph until the viewer looks closely. A slow lateral drift across a precision object or surface — 8–10 seconds, imperceptible loop seam — adds temporal depth without spectacle.

**Hero video candidate:** `hero-bg.mp4`
Subject: Slow horizontal drift (approx. 2px/frame) across a lit manuscript page, engineering drawing, or notation sheet — fine ruled lines in a raking sidelight, the surface texture visible at close reading distance. The motion is so slow the video reads as a still image until the mind registers the drift. Duration: 10s loop. Color temperature matched to the #ffffff background — cool daylight, no warmth added.

## Section Transitions

As the user scrolls, sections do not announce themselves. Elements enter via AOS `fade` and `fade-up` with 225ms–900ms delay tiers — unhurried, sequenced at reading pace. There is no parallax, no clip-path wipe, no geometric panel transition. The sections arrive the way paragraphs arrive in continuous text: sequentially, quietly, at the reader's pace. The 0.9s transition duration on wrappers means nothing snaps into place.

## Content Rhythm

Individual elements enter the viewport with `fade-up` — a 20px upward displacement resolved to rest over 0.9s at ease. The displacement is from above rather than below (the twist applied to `fadeInUp`), which reads as elements descending into position rather than rising from below — a ceiling-drop entry that feels more typographic than kinetic. Feature cards and text columns stagger at 225ms intervals. Images do not animate; they are present from the moment the section loads.

## Footer Approach

The footer materializes on the same white field as the rest of the page. No color transition, no dark band approaching. The scroll reaches it the way a reader reaches the colophon: without ceremony. The 269px section margin above the footer gives the last content section room to complete before the closing information begins. The footer's presence is structural, not performative.

## Motion Principles

The timing philosophy is **deliberate rather than responsive** — the system communicates permanence through unhurried movement. A 0.45s button hover is not slow; it is considered. A 38s ticker loop is not endless; it is ambient. The easing choices are `ease` (default) and `cubic-bezier(0.45, 0.05, 0.55, 0.95)` (nav link hover) — both decelerate toward rest, which means every movement arrives with resolution rather than abrupt stopping. Nothing springs. Nothing snaps. The UI moves the way good typesetting sits: inevitably in its position.

## Video Placements

**1. Hero background — `hero-bg.mp4`**
- Section role: Hero / page opening
- Subject: Near-imperceptible slow drift across a precision ruled surface — manuscript lines, engineering graph paper, or music notation staff lines lit by directional daylight. The material surface is the subject; the drift is the video's reason for existing over a still. Shot flat at close reading distance with raking sidelight to reveal paper texture and ink depth. No color grading beyond matching the #ffffff page temperature.
- Motion quality: Slow drift, approximately 2px/frame — registering as movement only after 3–4 seconds of watching
- Duration: 10s loop, seamless
- Why video serves this section: The design's restraint means a static image at hero scale risks reading as an empty page. A near-still video adds the one quality a photograph cannot: confirmation that the image is alive. The viewer's uncertainty about whether they are watching or looking is the intended effect — it holds attention without demanding it.

**2. Feature / method section — `process-ambient.mp4`**
- Section role: Product or method showcase (the section describing how the thing works)
- Subject: Hands moving across a working surface — sketching, measuring, or composing something with deliberate, unhurried gestures. The hands do not need to be identifiable; the motion is about process at human pace. Shot from directly above (bird's-eye plan view) so the surface is the composition, not the person.
- Motion quality: Handheld with slight natural micro-movement, 24fps, no stabilization applied — the organic wobble confirms the human presence without interrupting the composition
- Duration: 8s loop
- Why video serves this section: The feature section describes a method, not a product. Still photography of process steps reads as instruction manual; ambient video of process in motion reads as studio visit. The difference is whether the viewer feels observed or present.

**3. Closing CTA / pre-footer — `studio-ambient.mp4`**
- Section role: Final conversion section before footer
- Subject: A quiet interior — a workspace, a library shelf, a well-lit table with objects arranged without staging. Natural light changing slowly (cloud cover shifting, a shadow moving). The kind of room that suggests the work happens here.
- Motion quality: Near-static — a timelapse at 0.5× real speed so light changes are visible but not dramatic. Duration: 10s loop, beginning and ending at the same light level for seamless looping.
- Duration: 10s loop
- Why video serves this section: The CTA section asks the viewer to take action. A still image here tends to read as advertisement. A slow ambient interior reads as invitation — the space is already occupied, already in use, and the viewer is being offered entry rather than being sold to.
