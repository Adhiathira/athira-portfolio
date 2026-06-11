# Motion Design Brief — Black Market Sessions

## Scroll Opening

The page loads without ceremony. No fade-in, no progress bar, no welcome animation. Instant material presence — the same way a zine appears when you pull it from a stack. The sole concession to transition is a character-by-character xerox-degradation reveal on the headline: each letter blurs then snaps sharp in 40ms intervals, taking 1.2–1.5s total. This is the only load animation. Everything else is already there.

## Hero Experience

The hero background is `hero-turntable-spin.mp4` — a vinyl record rotating at 33 RPM, filmed from directly above with a macro lens locked to the label center. The needle descends at the 8-second mark. 12-second loop, shot at 24fps with deliberate slight undersampling to produce a mild judder. The video occupies the right 55–60% of the viewport, bleeding edge to edge, playing silently on loop. No scrim, no overlay — the Oswald headline sits directly over the groove topology. The temporal dimension (the spinning) is what earns video here: a still image would show you the artifact; the loop shows you the artifact *in operation*. A secondary micro-video sits in the lower-right of the left content zone — 200×200px, 50% opacity, scanning electron microscope footage of a vinyl groove cross-section at extreme magnification. This plays on scroll entry, loops, shows the material at a scale where it becomes pure texture.

## Section Transitions

Two transition vocabularies alternate across sections:

**Torn paper** — the bottom jagged edge of the outgoing section rises from below while the incoming section descends from above, meeting at center in a hand-cut collision. 800ms total, no easing, driven by scroll velocity. The tear geometry is SVG-generated with controlled randomness — not the same tear twice. This references the physical act of tearing a page from a zine to reshoot it.

**CRT scan line wipe** — horizontal retrace lines sweep across the viewport, 600ms, clearing the current section and stamping the next one into place. Used every two to three sections to break monotony; gives the rhythm an irregular pulse rather than a lockstep pattern.

## Content Rhythm

Text enters through xerox-degradation: characters appear one at a time at 40ms intervals, each initially blurred and low-contrast, snapping to full legibility in a single step. At 16px IBM Plex Mono body copy this reads as a typewriter; at 72px Oswald it reads as an ink press taking. Images enter via photocopier reveal — a horizontal scan line moves top-to-bottom at 600 pixels per second, uncovering the image beneath as if it is being copied in real time. 1.5–2 seconds total. Buttons, navigation links, and all utility text appear instantly with zero animation — the interface makes no ceremony of its functional layer.

## Footer Approach

No animation. The footer appears the moment it enters the viewport — instant stamp, not a fade. BOOKING · RECORDS · PRINTS · MANIFESTO · COPYLEFT arranged in a single horizontal row, IBM Plex Mono monospace, all appearing simultaneously as the footer scrolls into view. Optional micro-detail: a 40×40px VU meter ambient loop (`footer-vu-meter.mp4`) at 50% opacity in the lower-right corner — two needle columns bouncing against silence. If the loop exists it runs; if not, the footer is identical. Nothing depends on it.

## Motion Principles

No easing functions. Every transition is either `steps(1)` (instant flip) or linear (constant velocity). The design references 24fps and 30fps film, never 60fps smoothness — high frame rates imply consumer polish, which is antithetical to the register. All reveals are scroll-velocity driven, not timeline-driven: fast scrolling accelerates the entrance, slow scrolling lets it breathe. Nothing auto-plays on page load except the hero turntable loop. Every motion in this system references a material process — a physical action that produces a visible state change. Hovering over a button is not a transition; it is a switch flip.

## Video Placements

**1. Hero — `hero-turntable-spin.mp4`**
- Section role: hero, full-bleed right 55–60% of viewport
- Subject: vinyl record rotating at 33 RPM, macro overhead, needle descend at 8s
- Motion quality: slow constant rotation, clinical and hypnotic, 24fps with deliberate judder
- Duration: 12s loop
- Why video: the act of rotation is the subject — a still image shows a record; the loop shows *playing*. The temporal quality is the design argument.

**2. Mid-page "Live Sessions" — `venue-live-session.mp4`**
- Section role: documentation section showing the venue as a physical space
- Subject: concert performance footage, handheld camera, warm stage lighting, visible audience movement
- Motion quality: handheld, slightly unsteady, warm grain, real light
- Duration: 45s loop, 30fps with visible grain overlay
- Why video: the venue section argues for physical presence — still photography of a concert is evidence; video is the experience itself. The grain and camera movement document that something actually happened here.

**3. Process Detail — `vinyl-press-operation.mp4`**
- Section role: manufacturing/craft section, showing the production side of the label
- Subject: vinyl pressing equipment close-up — metal stampers, hydraulic press, the cooling cycle, finished record emerging from the press
- Motion quality: documentary, industrial lighting, no cinematic grading, close-up on mechanical action
- Duration: 20s loop, 24fps
- Why video: the pressing machine operates in a cycle that cannot be communicated by a still — the compression, the hold, the release, the record peeling away from the stamper. The loop makes the manufacturing process legible as a sequence, not just an image of equipment.
