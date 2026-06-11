# prose-weight — Concept by Video

## Motion Narrative

The page behaves as a story being told in real time. Motion is paced to reading speed, not interaction speed.

## Scroll Opening

The reading progress bar begins filling the moment the user scrolls even one pixel. Wine red advances from left to right along the bottom edge of the navigation. It is the first motion the reader notices — a quiet acknowledgment that the story has begun.

## Hero Entrance

The chapter number label appears first: bronze, uppercase, letter-spaced — it slides up from y:12, fades in, 400ms. Then the headline: Playfair Display letter-spacing compresses from 0.5em to its natural -0.01em tracking over 800ms. The motion is typographic — letters closing ranks, finding their positions, like ink settling into paper. The body paragraph beneath fades up (y:16, 500ms, ease-out), followed by the pull quote at 100ms delay.

## Chapter Progression

Each section that scrolls into view follows the same unhurried sequence: chapter number first (400ms), then heading (800ms letter-spacing-in), then body paragraphs staggered at 0.1s per paragraph (500ms each). The reader feels the text arriving, not loading.

## Pull Quote Entrance

Pull quotes scale from 0.97 to 1.0 as they appear — barely perceptible, but the eye registers the frame settling. Simultaneously fading in (600ms). No drama. The quote arrives with gravity, not fanfare.

## Marginal Annotations

Annotations in the right margin slide in from x:16 (from the right edge inward), 400ms ease-out, triggered when the corresponding paragraph enters view. The effect is the author whispering something additional — the aside appearing in the margin as the reader's eye reaches that paragraph.

## Feature Cards

Three feature cards stagger in: first card y:16 → 0 at 0ms, second at 100ms, third at 200ms. Each 500ms. The stagger creates the impression of items being laid on a table one by one.

## Testimonials

Testimonial blocks fade up with y:12 offset, 500ms, 150ms stagger between the two columns. Quote marks (the large Playfair Display " in wine red) appear 50ms before their quote text.

## Stats Section

The large Playfair Display numerals count up from 0 to their target values over 1200ms with ease-out — like a counter settling on a final answer. Annotation captions below fade in once the count completes.

## Footer

The footer's reading progress indicator (a static bar showing 100% complete — the reader has reached the end) is set at page load since it only shows in the footer. Footer content fades up in sequence: logo, links, copyright — 400ms each, 100ms stagger.

## Video Placements

- **Header ambient video** (optional): Full-width muted autoplay loop in the hero background, playing behind a warm paper overlay at 0.85 opacity — the paper surface contains the story even over video.
- **Author interview section**: A play-button card in the How It Works section — clicking reveals an embedded video of an author talking about their process.
- **Process footage**: In the About page, a horizontal scroll-triggered video strip shows the platform's editorial process.

## Timing Philosophy

400ms minimum, 800ms maximum. No animation exceeds reading cadence. The reader should never feel the page is performing for them — the motion should feel like the natural revelation of content, not a show.
