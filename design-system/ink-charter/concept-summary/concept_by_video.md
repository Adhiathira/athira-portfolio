# plane-cut — Concept by Video

## Motion Concept: Paper Assembly and Layer Rise

The plane-cut motion system treats every animation as a **physical paper assembly**. Nothing fades; everything is built. Layers rise from beneath the frame, casting shadows as they ascend, and the accent cut arrives as a decisive graphic event rather than a transition. For a B2B SaaS platform site carrying this system, motion becomes the argument for craft — the site should feel assembled by a hand that knows exactly where the knife goes, which is the whole counter-position against generic, template-assembled product pages. This brief translates the still concept into time.

## Scroll Opening

The opening beat is subtractive stillness before construction. Hold the empty pale ground (#f0f0f4) for a full breath — no layers, no headline, just the table the paper will rest on. This restraint earns the first movement. Then the deepest sheet (#cccce1) slides up from below the fold, followed by layer 2 and layer 1 in a 0.1s stagger, each carrying a box-shadow that deepens as it climbs. The reader should not perceive elements arriving; they should perceive a stack being built in front of them. Easing is power2.out throughout — a firm push that settles, never a bounce, because paper does not bounce.

## Hero Experience

The hero is the thesis statement, and its choreography is layer assembly resolving into a single oversized headline in Cormorant Garamond. Background sheets settle first; then the accent cut (#63cabe) enters last and fastest, sweeping across a headline word or piercing a clip-path shape to reveal the navy ink (#1b1b37) beneath. This is the one moment permitted to feel sharp rather than settling — a blade motion, 0.4s, decisive. Everything before it is preparation; the accent is the cut-through. Keep the hero quiet after it lands. Overworked heroes read as anxious; plane-cut reads as confident.

## Section Transitions

Transitions honor the section geometry from the still concept: each section overlaps the next by 40px, so in motion each new sheet slides *under* the previous one as the reader scrolls. A single 1px shadow line marks the seam where two sheets meet — this hairline is the entire trick, and it must stay crisp. The felt experience is flipping through a layered paper folio: one sheet lifting to reveal the next, never a hard cut, never a crossfade. Scroll-linked parallax between layers should be subtle (8–16px of differential travel), enough to sell depth without turning the page into a diorama.

## Content Rhythm

Feature content enters in staggered layer-rise: cards translate from y:20 with a box-shadow that grows from 0 2px 8px to 0 8px 32px synchronized to the lift, so shadow and motion tell one story — the card is being picked up off the table. Stagger left-to-right at 0.1s. Icon and step shapes open with cut-reveal: a narrow vertical slit widening to full clip-path, mimicking a knife parting paper. Rhythm across the page should alternate between construction (layers rising) and revelation (accent cuts), so the reader is paced between building and cutting rather than a monotone reveal cadence.

## Footer Approach

The footer is the stack at rest — the assembly complete. No new construction here; instead, let the accumulated layers settle into their final positions with a slow, almost imperceptible downward compression, as if the paper stack is being set down. A final accent cut can anchor the primary call-to-action, the last decisive mark on the page. Motion goes quiet. The reader should leave with the sense that something was made, deliberately, and then finished.

## Motion Principles

Four rules govern every sequence. First: **rise, never fade** — opacity changes always accompany upward translation, because plane-cut elements have physical height. Second: **shadow is motion's partner** — box-shadow intensity is animated in lockstep with vertical travel; a lift without a deepening shadow is a lie. Third: **the cut is the exception** — accent-color movements are faster and sharper than everything else, reserved for genuine graphic moments. Fourth: **respect reduced motion** — with prefers-reduced-motion, all scroll animations collapse to instant appearance and hover retains only color transitions, no transform, no shadow animation. Timing reference: hero assembly 0.6s / power2.out / 0.1s stagger; section rise 0.5s / power2.out; card grid 0.5s / power2.out / 0.1s; cut-reveal 0.6s / power2.inOut / 0.2s; card hover float 0.35s / ease-out.

## Video Placements

**1. Hero background — `hero-assembly.mp4` (10s).** Role: ambient loop behind the hero headline. Subject: pale paper sheets rising in sequence from below frame and settling into a layered stack, with a single teal accent cut sweeping across on the final beat, shadows deepening as each sheet climbs. Motion quality: firm, settling, deliberate — power2.out physicality with no bounce. Mood: crafted confidence, quiet precision. Why video beats a still: the entire concept is *assembly over time* — a still can show the finished stack but cannot convey that layers were built up by a hand, which is the core anti-template argument. The 10s loop lets the assembly complete and reset seamlessly on the held empty ground.

**2. Section seam divider — `layer-slide.mp4` (5s).** Role: ambient looping texture at a mid-page section transition where one sheet slides under the next. Subject: the 1px shadow-line seam of two overlapping paper sheets, with slow differential parallax travel between the layers and a faint fiber-edge texture catching light along the cut. Motion quality: slow, continuous, hypnotic drift. Mood: tactile, material, unhurried. Why video beats a still: the seam's shadow behaves — it breathes and shifts as layers move — and a static hairline reads as a border, killing the paper-folio illusion the transition depends on.

**3. Feature card lift — `card-lift.mp4` (5s).** Role: ambient loop inside a feature or product-capability card. Subject: a single white elevated card floating up 8px off the pale ground and settling, its box-shadow expanding beneath it, on a gentle repeating cycle. Motion quality: smooth ease-out lift and release, shadow blooming in sync. Mood: approachable, precise, physical. Why video beats a still: the synchronized shadow-growth-to-lift relationship is the whole feel of picking a card off a table — freeze it and you lose the causal link between height and shadow that makes the depth legible.
