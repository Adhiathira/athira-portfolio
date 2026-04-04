# Jessie Andrews — Concept by Video

## Scroll Opening

The page loads with a solid white nav bar already in place and the first horizontal media scroller immediately filling the viewport below it. Auto-playing video clips are already running within the track before the user takes any action. There is no entrance animation on the nav, no page title reveal, no fade-in choreography — the media is simply present. The opening is quiet and immediate: you arrive at the work, not at an introduction.

## Hero Experience

The hero is the first horizontal scroller — a full-bleed track at fixed height containing a sequence of auto-playing video clips and still photographs that extends rightward beyond the viewport edge. The leftmost content begins at the viewport's left boundary; the track's continuation to the right is implied rather than announced. There is no hero headline, no tagline overlay, no gradient wash across the media, no CTA button. The first scroller functions as a silent film strip: the site opens on motion, not on text.

## Section Transitions

All section transitions are hard straight horizontal edges with generous vertical whitespace — no animated shapes, no parallax, no crossfade between sections. Between media scrollers, a narrow text section (all-caps section label, optional body line) occupies a white field. These text intervals are pacing devices: brief pauses between immersive media runs. Page-to-page navigation uses a fade-through-white transition: the current page fades to white, the incoming page fades in from white. Within the page, there are no scroll-triggered boundary animations.

## Content Rhythm

Individual content reveals are minimal to nonexistent. The page's content is largely pre-rendered and visible without scroll-triggered animation. There may be a subtle initial page-load fade-in on the primary content area, but no per-element stagger, no GSAP scroll orchestration, no parallax on images. The horizontal scrollers scroll on a separate axis from the page scroll: dragging or swiping left moves through the track horizontally while the viewport's vertical position remains unchanged. The page scroll moves entire sections into view normally; the horizontal drag interaction is a parallel, independent motion mode.

## Footer Approach

The footer is a typographic block — contact links and attribution text set in small all-caps Open Sans on a white field. No entrance animation. The transition from the last media scroller to the footer is a straight cut: whitespace ends, footer begins. No decorative boundary, no motion event.

## Motion Principles

Motion on this site is entirely in the media content, not in the interface. Videos autoplay within horizontal tracks; photographs are static. The UI carries no intrinsic animation — no hover transitions with measurable duration, no scroll-triggered reveals, no parallax, no GSAP. The one UI motion event of note is the page fade-through-white on navigation, which is a navigational convention rather than an expressive gesture. The tempo of the experience is set entirely by the video content in the scrollers. The designer's motion vocabulary is one of restraint: let the footage move; hold the frame still.

## Video Placements

**1. First Horizontal Scroller — Homepage opening media reel**
- Suggested file: `homepage-reel.mp4`
- Subject: A horizontally sequenced composite of 4–6 short (2–4s) clips representing different creative contexts — editorial fashion photography, campaign behind-the-scenes, ambient portrait moments — assembled in a continuous horizontal filmstrip with no titles or UI overlays; each clip loops without transition; the composite feels like a light table at the start of an edit session, with each frame giving way naturally to the next
- Duration: Composite track; individual clips 2–4s each
- Why video: The first scroller is the site's opening statement. Auto-playing video in this position establishes the subject's media presence immediately and confirms that this is a working archive — a live, temporal record — rather than a static photography portfolio.

**2. Standalone Full-Width Section — Ambient portrait loop**
- Suggested file: `portrait-ambient.mp4`
- Subject: A single slow ambient clip — subject partially in frame, warm directional light, nearly static camera; 8s loop; the clip functions as a breathing moment between the media-dense horizontal scrollers; movement is barely perceptible — a slight shift in light, a slow exhale — enough that it reads as alive rather than still
- Duration: 8s loop
- Why video: A single full-width ambient video placed between two horizontal scrollers creates a tonal pause that photographs cannot. Its stillness contrasts with the motion-rich scroller tracks on either side, giving the browsing experience a cinematic quality — the difference between a filmstrip in motion and a single frame held.
