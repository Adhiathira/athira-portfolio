# Dark Frame — Motion Concept

## Photography in Time

Every motion in the Dark Frame system is derived from the behavior of physical photography: the slow opening of an aperture, the development of an image, the deliberate pan of a view camera.

## Motion Signature

**Letterbox reveal on section enter.** As sections scroll into view, image placeholders expand from a cinematic letterbox crop (clip-path: inset(20% 0 20% 0)) to full frame. Duration: 900ms, ease-out. This is a frame opening — an aperture widening. The most distinctive motion in the system.

**Slow zoom (Ken Burns at web speed).** On scroll enter, images scale from 1.0 to 1.08 over 800ms. This is barely perceptible — a settling into focus rather than a dramatic zoom. The image breathes into its space.

**Parallax image translation.** Hero and full-bleed image sections translate vertically at 0.7x scroll speed. The image moves slower than the page — it has weight and resistance. Implemented via GSAP ScrollTrigger scrub or rAF-based transform.

**Fade-up text reveals.** Text blocks enter from y:40 with opacity 0 to y:0 with opacity 1 over 700ms. The text surfaces quietly beneath the image, never competing for attention.

**Crossfade between dark sections.** Transitions between full-dark sections use gentle opacity fade (900ms) rather than sharp cuts — the page dissolves rather than snaps.

**Nav state transition.** At 80px of scroll, the navigation transitions from transparent to rgba(10,10,10,0.95) with backdrop-filter blur(12px). Duration 400ms. The nav materializes from the image surface.

## Overlay hover feedback.

On image hover, the overlay opacity transitions from 0.6 to 0.2 in 350ms (ease-out). The photograph brightens — the image rewards the viewer's attention by revealing more of itself.

## Video Placements

1. **Hero ambient video** (required): A looping sequence of camera movements — shallow-focus scenes, studio preparation, subject framing. No audio. Dark overlay. Letterbox crops in as hero loads.

2. **Editorial showcase**: Mid-page full-bleed section showing a photographer at work. Video plays on scroll-enter. Subtle overlay. No controls visible.

3. **Process footage**: Behind-the-scenes narrow-width video in the About section. 7fr editorial split: text on left, process video on right. Letterbox reveal on enter.

## Timing Philosophy

Photography needs slower motion than technology products. The minimum useful duration is 600ms. Nothing happens in under 350ms except nav transitions and hover overlays. Slow is confident. Slow is expensive.
