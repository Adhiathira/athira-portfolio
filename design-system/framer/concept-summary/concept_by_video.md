# Framer — Concept by Video

## Scroll Opening

The page loads immediately into the hero with the navigation already rendered and the headline visible. On load, the hero executes a brief entrance: the headline fades and slides in from below, followed by the body copy and CTA buttons in staggered sequence. The animated thumbnail grid below activates almost immediately — cards that were static on first paint begin to move or shimmer, giving the hero a sense of energy that arrives within the first second of the page load.

## Hero Experience

The hero has no ambient video background — its visual energy comes from the animated mosaic of website thumbnails filling the lower zone. The thumbnails respond to hover with a subtle scale-up, and the entire grid executes a coordinated entrance sequence on load. The defining motion moment is the hero exit: when scrolling past the hero, the thumbnail grid animates in a "zoom-in" — the grid expands to fill the screen before fading away, a cinematic wipe that creates a dramatic transition into the more structured content below. This is the page's single most expressive motion event, and it is positioned precisely where transition momentum is highest.

## Section Transitions

Below the hero, the sticky-scroll feature explainer controls its own pacing. As the user scrolls, the right column's media content transitions — new product UI demonstrations fade or slide into view as the corresponding left-column text item becomes active. The active state on the left column sub-headings transitions from gray to white: a subtle but effective signal that communicates which feature is currently "on screen." After the feature explainer, sections transition through generous whitespace — no animated dividers, no structural transitions, just space that signals a clear chapter end. The horizontal carousels appear with their own scroll-triggered entrance (cards fade in as a group) but do not hijack the vertical scroll axis.

## Content Rhythm

In most sections, content reveals use a staggered fade-in + slight upward slide: headline first, body text second, CTAs or media third. The cadence is fast — 150–200ms stagger — creating the impression of a designed sequence without perceptible delay. In the feature explainer, the rhythm is user-controlled: the visitor determines the pace by scrolling. In the pricing table and FAQ, content appears as a single group reveal rather than per-element stagger, appropriate for the higher-density, lower-hierarchy nature of those sections.

## Footer Approach

The footer arrives without animation — a standard multi-column informational zone that the page scrolls to. No closing flourish, no special background treatment at the page's end. The scroll journey's true conclusion is the pricing table above: the footer is functional infrastructure, not a narrative endpoint.

## Motion Principles

The motion philosophy is staggered-reveal-plus-one-cinematic-moment. The standard vocabulary — scroll-triggered staggered fades across all content sections — is executed quickly and without drama. The single exception is the hero zoom-out transition, where the system allows itself one theatrical gesture before returning to restraint for the remainder of the scroll journey. Duration is short (200–400ms), easing is ease-out, and there is no spring or bounce. The approach ensures the scroll feels polished without feeling slow.

## Video Placements

Two sections of this site would benefit from ambient looping video:

**1. Hero Background — Product creation ambient loop**
- Suggested file: `hero-ambient.mp4`
- Subject: A close-up timelapse or accelerated video of a website being designed in a visual editor — elements being dragged, colors shifting, a layout assembling itself in real time; 8s loop, fast but smooth
- Duration: 8s loop
- Why video: The current hero relies on static thumbnails that animate on hover. A looping video behind the headline zone — one that shows the *act* of creation rather than the *output* — would add a temporal dimension to the brand argument: this tool is about the creative process, not just the final artifact. It would deepen the hero without replacing the product grid.

**2. Feature Explainer Section — UI capability demo**
- Suggested file: `feature-demo-ambient.mp4`
- Subject: A split-screen showing the design editor on the left and the live published site on the right, updating in sync — demonstrating the tool's real-time feedback loop; 10s loop
- Duration: 10s loop
- Why video: The sticky-scroll feature section currently uses static screenshots and UI recordings to demonstrate capabilities. A looping video that shows the live synchronization between design environment and output would be more compelling than any screenshot — it captures the temporal quality that makes the tool impressive. This is the one section where video shows something a static image fundamentally cannot.
