# Motion Brief: Iron Folio

## Scroll Opening

The page loads without performance. The nav is already present — transparent, static, already in its reading position. Below it, the hero text is already set: headline, subhead, eyebrow label all in place, waiting. The entrance is a single synchronized slide: all three elements translate up 30px and fade from opacity 0 to 1 over 0.75 seconds (the system's standard duration), ease-in-out. Nothing staggers — they arrive as one composed statement. The product panel below the text fold follows 0.3s later, completing the scene. The register is: arrived, not arriving.

## Hero Experience

The hero does not perform. It presents. The warm cream field is static; the Manrope headline — tracked at 0.06em, weight 500, 5.5rem — arrives once and holds. There is no ambient loop behind it, no gradient sweep, no particle field. What moves is exactly one thing: the product panel below the fold shifts at a very slow parallax rate (0.08× scroll speed), giving it the quality of a floating physical object rather than a pinned screenshot. The rest of the hero is a still life.

If the product concept calls for a human presence — a hand at work, a material surface, a workshop in early morning — the appropriate hero video is not behind the headline but below it: the product panel becomes a window onto process. That window loops slowly, almost imperceptibly. The text above it remains unmoving.

## Section Transitions

Sections do not announce themselves with animation. They appear at the viewport boundary and scroll into view at normal rate. What varies is the background: the warm cream hero gives way to the near-black feature card section through simple scrolling contrast. There is no CSS transition between backgrounds — the contrast itself is the transition. The eye registers the shift through luminance, not through motion.

Individual content blocks within each section enter with a slide-up (translateY 30px → 0, opacity 0 → 1) at 0.75s, ease-in-out. Feature cards within a row stagger by 0.12s — enough to read as sequential arrival without feeling mechanical. Heading text always leads; body text follows at the next stagger interval.

## Content Rhythm

The system's timing philosophy means nothing in the content layer arrives quickly. The slowest elements (section headers, editorial statements) take 0.75 seconds to settle. This is deliberate: the page is not in a hurry to show you what it contains. It believes you will scroll. Content arrives the way a page turns — not instant, not theatrical, simply present.

Feature cards in the dark section slide up and fade in with a slight delay cascade. Left card first, then center, then right — or left-to-right at 0.12s intervals — so the composition assembles itself in the direction of reading. The effect is that the layout feels built, not rendered.

## Footer Approach

The footer arrives without ceremony. It does not animate. There is no wipe, no gradient reveal, no curtain. The footer simply exists below the last section's whitespace. Social links and legal text are already at resting opacity. The page has made its case; the footer is the colophon.

## Motion Principles

**Timing philosophy:** Measured and unhurried. The 1.5× duration scaling applied to the base motion system means the fastest transition (0.135s) is perceptible, and the standard transition (0.75s) is felt in the body. The system never snaps. Everything settles, like an object finding its resting place on a table.

**Easing character:** Standard ease-in-out throughout the content layer. The decelerate curve (`cubic-bezier(0.68, 0, 0.23, 1)`) is reserved for transform-dominant transitions — things that physically arrive somewhere. Nothing uses spring or bounce easing. The aesthetic register is restraint over expressiveness.

**Hover states:** Languid at 0.45s — longer than most systems' hover durations. The extended hover response is subtle at first interaction and clarifying on the second: the system responds to you, but it does not rush.

**Reduced motion:** Full support — all animations reduce to 0.01ms. The page reads identically in layout and content, losing only the temporal dimension of arrival.

## Video Placements

**1. Hero Below-Fold Panel — hero-product-ambient.mp4**
- Role: The product panel that extends below the hero text fold
- Suggested filename: `hero-product-ambient.mp4`
- What the video shows: An extreme close-up of hands at work — fingers turning the pages of a printed reference document, pen resting at the edge of a ruled spread, light falling across the paper at a low angle. Not a staged shot: the hands move with the economy of someone who knows what they're looking for. Motion quality: handheld-steady, macro, naturalistic. Mood: deliberate, pre-digital, material.
- Duration: 10s loop — the loop earns its length by showing a full gesture cycle: search, find, mark, rest. A 5s version would truncate the gesture before it resolves.
- Why video: The hero panel is the page's primary proof-of-concept moment. A still image shows a product surface; a looping ambient capture shows the product in relation to human practice — the thing it replaces, complements, or extends. The contrast between the warm physical material of the paper and the screen interface above it is the argument made visually.

**2. Feature Section Dark Background — services-ambient.mp4**
- Role: Background ambient layer behind the dark feature card section
- Suggested filename: `services-ambient.mp4`
- What the video shows: A slowly drifting view of a letterpress printing press in operation — ink roller passing over type blocks, the impression bar descending, paper pulling away with the mark of the characters already set. Motion quality: slow-motion macro, 40% speed reduction, the mechanism making one complete cycle. Mood: precision, repeatability, the satisfaction of a process that produces identical results through careful setup.
- Duration: 10s loop — the full press cycle (roller pass, impression, release) takes approximately 8s at the slowed rate; the loop completes naturally.
- Why video: The dark feature cards demonstrate precision product functionality. The letterpress provides the atmospheric metaphor: a system that, once configured correctly, produces consistent results without variation. The video does not illustrate the product — it evokes the same category of feeling that the product is designed to produce.

**3. Editorial Showcase Section — studio-interior.mp4**
- Role: Ambient background for the mid-page editorial showcase section
- Suggested filename: `studio-interior.mp4`
- What the video shows: A wide-angle slow drift across a working studio interior — flat-plan spreads pinned to a foam board, a large-format monitor with a document open, morning light entering through a north-facing window. No people visible; only evidence of work. Motion quality: extremely slow lateral drift (imperceptible in the first 3s), timelapse-adjacent. Mood: the hour before the workday begins, when the tools are ready but nothing has started yet.
- Duration: 5s loop — a tight ambient loop meant to give the section atmospheric depth without becoming a cinematic sequence. The near-imperceptible motion prevents the section from reading as a static image while not drawing attention away from the content above it.
- Why video: The editorial showcase section is where the design system's warmest register surfaces — the warm cream, the Garamond body text, the unhurried pacing. A still studio interior would read as stock photography. The slow ambient drift makes it a window rather than a photograph, implying that this studio is real and currently occupied.
