## Scroll Opening

The page arrives without ceremony. On load, the navigation bar fades in at full opacity within the first 200ms — settling into position before the hero content below has fully resolved. The hero section itself uses a staggered entry: the video background reaches full opacity at 400ms, the display heading follows at 600ms with a 16px upward translate combined with a fade, the subheading and CTA enter last at 800ms. The sequence is brief and reads as intentional rather than animated for its own sake. No spinner, no loading state visible to the user — assets are preloaded or the loading state resolves before paint.

## Hero Experience

The hero is the primary video candidate on the page. A full-bleed, full-viewport ambient loop plays beneath the headline — the kind of footage that establishes atmosphere rather than demonstrates feature. The video background carries the warmth and material quality that static imagery alone cannot hold: slow camera drift across a physical drafting table with engineering paper visible, a hand making a mark, nothing identifiable enough to date the footage. The heading sits over this in EB Garamond at large display size, black on a semi-opaque ivory overlay band that preserves legibility without masking the video entirely. The hero does not scroll-parallax the video layer — the camera motion in the clip provides sufficient sense of depth without additional transform complexity.

## Section Transitions

Between sections, there is no hard line, no rule, no divider element. Sections separate through vertical spacing and background shifts — the ivory page background remains consistent, but feature sections introduce a subtle warm gray container behind card groups, creating visual segmentation without color drama. As the user scrolls into each section, content blocks enter through a uniform fade-translate pattern: opacity 0 to 1, translateY 20px to 0, over 400ms with a cubic-bezier ease-out curve. The motion is quick enough to feel native to a technical tool, unhurried enough to feel considered.

## Content Rhythm

Individual elements enter sequentially within each section rather than simultaneously. In a three-column feature grid, cards stagger by 80ms each — left to right, giving the grid the sense of being assembled rather than dropped. In text-heavy sections, the heading enters first, body text follows 120ms later. Specification callouts and mono-type data points enter last within their containing block, a subtle ordering that mirrors how a reader would actually process the content: structure first, detail second. This rhythm is consistent across sections so users develop an unconscious expectation that serves their reading.

## Footer Approach

The footer enters as a block rather than element-by-element. As the final content section exits the viewport, the footer fades into position with a single 300ms opacity transition — no translate, no stagger. This restraint signals that the narrative portion of the page is complete and the utility layer is now available. Column headings are set in uppercase micro-type matching the navigation register, which creates a quiet visual echo between the entry and exit of the page experience.

## Motion Principles

The timing philosophy is precise and short. No animation exceeds 500ms. Easing functions favor ease-out curves — fast entry, graceful deceleration — which read as confident rather than decorative. There is no bounce, no spring physics, no elastic overshoot. Scroll-triggered animations fire at 15% viewport entry to give content a moment to settle before it's fully in view. Hover states on interactive elements respond within 100ms. The overall effect is a page that feels alive in the way that a well-calibrated instrument feels alive — responsive to input, accurate in output, nothing wasted.

## Video Placements

**Placement 1 — Hero Section**
Section role: Primary brand entry point, full viewport
Suggested filename: `hero-drafting-loop.mp4`
Subject: Slow-drift overhead shot of a lit drafting table — engineering paper with faint grid lines, a hand making precise marks, nothing identifiable as software or digital tool. The camera moves at approximately 2px/frame to suggest continuous presence without obvious looping.
Motion quality: Extremely slow, deliberate, warm light
Mood: Material precision, analog warmth as contrast to digital output
Duration: 10s
Why video: Still photography cannot hold the ambient quality this section requires. The product converts natural language into engineering artifacts — the hero needs to evoke the physical world of making, not the digital world of interfaces. A slow-drift video of physical drafting material achieves that without literal product demonstration.

**Placement 2 — Capabilities / Feature Reveal Section**
Section role: Mid-page feature showcase, sits between hero and testimonials
Suggested filename: `pcb-render-loop.mp4`
Subject: Ambient footage of a PCB layout rendering slowly on a dark monitor — traces appearing progressively, copper pours filling in, no UI chrome visible. The render progresses but never completes within the loop, implying continuous generation.
Motion quality: Slow progressive reveal, fine detail
Mood: Technical precision, generative process, controlled complexity
Duration: 10s
Why video: This section describes the product's generative output. A looping render-in-progress communicates the core value proposition — AI generating real design artifacts — without requiring the viewer to interact with a demo. The progressive appearance of PCB traces reads as intelligent production, which is exactly the message.

**Placement 3 — Social Proof / Output Gallery Section**
Section role: Gallery of generated artifacts, late-page
Suggested filename: `stl-rotate-loop.mp4`
Subject: A 3D STL model rotating slowly in ambient light against a near-black background — a mechanical bracket or enclosure, detailed geometry, no interface elements visible. One continuous slow rotation.
Motion quality: Smooth single-axis rotation, 6 RPM approximate
Mood: Confident, precise, artifact as object worthy of attention
Duration: 5s
Why video: Static renders of 3D geometry lose dimensionality on a 2D screen. A rotating STL loop communicates depth, surface quality, and geometric precision that a still image cannot. In a gallery context where multiple artifact types are shown side by side, one looping 3D video among static PCB and DXF stills creates a natural hierarchy of attention without requiring the viewer to click anything.
