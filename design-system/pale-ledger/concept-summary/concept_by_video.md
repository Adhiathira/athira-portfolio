## Scroll Opening

The page loads into pure black — no progressive image decode, no fade from white, no skeleton. The background is already at its terminal state (#000000) before a single element appears. What arrives is typography: the h1 block enters with a translateY(-66px) → 0 translation in 0.3s, a brisk upward thrust that reads as confident rather than delicate. The motion has no warmup — it begins at full velocity and decelerates to stillness, the ease-in-out curve making the settle feel deliberate. By 300 milliseconds post-load, the hero is fully composed and the cursor blink has already begun its 1s loop. There is no loading state to witness; the page is either absent or complete.

---

## Hero Experience

The hero is a scroll-stable zone — it does not parallax, does not recede, does not scale on scroll. It holds its position with the confidence of a landing position, not a departure point. The headline occupies this stillness in two registers: the first line in #ffffff, full-weight 700 at 120.96px, and the second line in #737373, a visible step down in luminance that reads as a grammatical subordination made spatial. Below the headline, a typewriter input bar pulses its cursor at exactly 1s intervals — a constant low-frequency heartbeat that prevents the hero from reading as a static image. The CTA pill in #006cf7 sits beneath, the only chromatic object in the viewport, drawing the eye without competing with the typographic event above it. A scrolling user does not experience this hero as an image to pass through — they experience it as a threshold to clear.

---

## Section Transitions

Transitions between content sections are not marked by any wipe, crossfade, or background color shift. The page remains black throughout, and section boundaries are communicated solely through vertical whitespace and the staggered arrival of new content. As each two-column block enters the viewport, both columns animate independently via the translateY keyframe — 20px → 0 with opacity rising from 0 to its final value — creating a sequential reveal that lands text and card in a perceptible but brief cascade rather than simultaneously. The mid-page full-width #006cf7 typographic interlude reads as a tempo break within the scroll: the two-column rhythm pauses, a single chromatic statement expands to fill the full container, then the two-column pattern resumes. The transition in and out of this interlude uses the same translateY entry as all other sections, preserving motion vocabulary while allowing tonal interruption.

---

## Content Rhythm

Individual content elements enter the viewport with a uniform upward drift — translateY 20px → 0, opacity 0 → 1, over approximately 0.3s each. The stagger between left and right columns in a two-column block is short enough to read as near-simultaneous but distinct enough to register as sequence: left column arrives slightly before right, establishing a reading direction that matches the left-to-right text flow. Display type within cards (h3 at 69.12px, tight tracking) enters as a single block rather than word-by-word or line-by-line, treating the oversized headline as a unit. Cards with #1a1a1a surface treatment appear to solidify into position — their heavy border-radius and dark fill give them a physical mass that makes the upward drift read as weight settling rather than lightweight fade-in. The rhythm never accelerates or decelerates across the page length; every section enters on the same timing contract, making the scroll feel metronomic.

---

## Footer Approach

As the final content section clears the viewport and the user scrolls into the footer zone, a large #f2f2f2 rounded card rises into view against the still-black page background. Unlike every other element on the page, the footer card is light — its off-white surface is the first and only full-section light field the scroll has encountered — making its arrival feel like an inversion rather than a continuation. The capsule geometry (heavy border-radius, contained width) ensures the black page background remains visible at the edges even within the footer zone, so the background color technically never changes; only a bounded surface changes. The five-column navigation grid within the footer settles without dramatic animation, communicating utility and closure rather than spectacle. The copyright line at the bottom is the last text in the visual sequence, small and centered, a period after the scroll's sentence.

---

## Motion Principles

The overall timing philosophy is mechanical rather than fluid — not in the sense of being harsh, but in the sense of being precise and non-expressive. Every duration clusters around 0.3s; there are no slow-dissolve moments, no lingering parallax drifts, no easing curves that overshoot or spring back dramatically. Motion is always translational and always upward — nothing slides in from the left, nothing scales from zero, nothing rotates. This constraint gives the scroll a single directional grammar: content rises into place and stays there. The cursor blink in the hero is the only looping motion on the page, and its 1s interval is slow enough to read as breathing rather than flickering. The result is a scroll experience that feels authored rather than animated — every motion choice reads as a deliberate decision, not a default.
