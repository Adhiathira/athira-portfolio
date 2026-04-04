# Iron Vellum — Concept by Video

## Scroll Opening

The page loads into stillness. The warm off-white field (#f9f8f3) holds for 0.4 seconds before anything moves — a deliberate pause that lets the ground register as a material choice, not an absence of content. The logo and navigation resolve in place with a 0.2s ease-in-out, not sliding from anywhere. The display headline rises from below by 20px with a slow cubic-bezier(0.4, 0, 0.2, 1) over 0.8s — unhurried, gravitational. No parallax on the hero background itself. The scroll caret appears at the bottom of the viewport only after the headline has finished settling.

## Hero Experience

The hero is a video background candidate. The subject: a slow tracking shot across a workbench surface — hand tools, a folded sheet of uncoated paper, morning light from a window at frame left, 10-second loop. The camera drifts almost imperceptibly left-to-right; the motion is barely motion, more like the image breathing. Text sits at the lower-left of the viewport against the warm ground, not over the video — the hero uses a split layout where the video occupies the right 55% and the text occupies the left 45% on a warm background. The video's slow drift sets the pacing register for everything that follows: nothing in this system moves faster than necessary.

Suggested asset: `hero-ambient.mp4` — 10s loop, slow rightward drift across a material workspace, morning light, warm tones.

## Section Transitions

Sections enter by resolving their background from transparent to opaque over a 0.3s ease-in-out as their top edge crosses the midpoint of the viewport. No hard cuts. No color wipes. Text content inside each section stagger-reveals at 0.1s intervals, starting from the eyebrow label, then the heading, then the body paragraph. The stagger is tight enough to feel like a single gesture rather than a sequence of separate events.

## Content Rhythm

Individual elements enter with `motion-floatIn` — opacity 0→1, translateY 20px→0, cubic-bezier(0.4, 0, 0.2, 1), 0.6s duration. Cards in feature grids stagger at 0.1s per card reading left-to-right. The stagger creates a cascade that reads as deliberate rather than mechanical, the visual equivalent of pages being laid down one at a time. Images enter slightly faster than text (0.4s vs 0.6s) so the visual frame resolves before the words arrive — this is intentional, it lets the image create the context that the text then describes.

## Footer Approach

As the user approaches the footer, the warm background shifts toward the last content section with no break. The footer itself fades in from full opacity background — no separate animation, just continuity. The newsletter input resolves with a subtle border-color transition (0.2s ease-in-out) as it comes into viewport, drawing attention without demanding it. The closing section feels like the final paragraph of a well-structured essay: it arrives without ceremony and concludes with authority.

## Motion Principles

The timing philosophy is **languid and material**: everything moves at the pace of physical objects, not interface widgets. The primary easing is ease-in-out throughout — nothing snaps, nothing bounces. Transitions between sections use cubic-bezier(0.4, 0, 0.2, 1) for the most structural movements (page-level reveals, large type entries). Hover states are faster (0.2s–0.3s) because they need to feel responsive — but they still use ease-in-out rather than ease, which removes the slight acceleration that makes most hover states feel computerized. The overall effect is that the page moves like paper being turned rather than a screen being refreshed.

## Video Placements

**1. Hero — `hero-ambient.mp4`**
- Section role: Hero split-layout, right column (55% of viewport width)
- Suggested filename: `hero-ambient.mp4`
- Subject: Slow tracking shot across a material workspace — uncoated paper, hand tools, pencils, a folded document. Morning light from window at frame left. Camera drifts 10% rightward over 10 seconds, imperceptible in real time.
- Motion quality: Ultra-slow drift, locked off except for the barely-visible rightward creep. No camera shake. Shallow depth of field.
- Duration: 10s loop
- Why video: A still image of the same subject reads as stock photography. The barely-visible motion creates the sense of a living, inhabited space — it is the difference between a photograph of a studio and being present in one.

**2. Product Showcase — `process-ambient.mp4`**
- Section role: Mid-page product or process showcase section (the section that demonstrates how the system works)
- Suggested filename: `process-ambient.mp4`
- Subject: Macro shot of a pen moving across graph paper, writing a short sequence of numbers. The pen moves slowly across the frame, then lifts. The paper has a visible texture. Loop is tight — 5 seconds, the movement completes and the paper is empty again.
- Motion quality: Macro lens, extreme shallow focus. The tip of the pen is in focus, the paper slightly soft. Motion is deliberate and measured.
- Duration: 5s loop
- Why video: The section is about process and precision. A macro video of the actual act of marking — deciding, committing a mark — captures the cognitive gesture that design tools are meant to support. No still image conveys this with the same economy.

**3. Studio / About — `studio-interior.mp4`**
- Section role: Studio or team section, full-bleed background behind a centered quote or team description
- Suggested filename: `studio-interior.mp4`
- Subject: A wide shot of a studio interior — natural light, architectural shelving, a few people at work desks but not prominently featured. The camera is fixed; the only motion is the slow movement of light and shadow as clouds pass. 10-second loop.
- Motion quality: Completely static camera. The temporal quality comes entirely from the changing light — the cloud-shadow passes across the floor slowly, subtly warming and cooling the space.
- Duration: 10s loop
- Why video: A photograph of the studio would require a great photograph. Video of a studio where the only movement is light behaves more like an architectural rendering — it conveys atmosphere, scale, and the quality of the working environment without requiring the viewer to read it as a specific moment in time.
