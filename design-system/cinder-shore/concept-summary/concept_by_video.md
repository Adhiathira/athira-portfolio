# Motion Direction — Cinder Shore

## Scroll Opening

The page arrives still. On load, the nav fades in from above with no dramatic entrance — just a quiet opacity transition over 480ms. The hero content follows in a stagger sequence: headline first, then supporting copy at +100ms, then the CTA at +200ms. Each element rises 20px into its final position as it fades in. The opening does not announce itself. It simply becomes present.

## Hero Experience

The hero is the site's only unrestricted moment. The text occupies the left column in controlled, editorial stillness. The right side — a product or atmospheric image — is the candidate for ambient video. A slow drift across the subject, shot at low angle, morning or late-afternoon light, with almost no camera movement: this is the register. The depth should feel breathable, not dramatic. 10-second loop, crossfade seamlessly.

**Hero video candidate:** `hero-ambient.mp4` — slow horizontal drift across the primary product surface or workspace, natural light, 10s loop. Video serves this section because the static hero requires a sense of temporal presence — the product is not a screenshot but a thing that exists in time.

## Section Transitions

Sections do not announce themselves with graphic effects. As each section enters the viewport via ScrollTrigger, it simply resolves from a slight downward offset and low opacity into full presence. The timing is 480ms ease-out. The effect is subtle enough that a casual viewer might not notice it — and that is correct. Motion here is in service of rhythm, not attention.

Between major sections, a horizontal rule or spacing gap acts as the visual pause. No wipe transitions, no color crossfades, no parallax backgrounds competing with the content. The motion vocabulary is additive, not theatrical.

## Content Rhythm

Individual elements within sections — cards, testimonial blocks, feature bullets — stagger into view with a 100ms delay between each item. A three-item row arrives over 300ms total. The stagger is horizontal-aware: in a three-column grid, the leftmost item arrives first, signaling reading direction. The effect reads as natural cadence, the rhythm of a page being laid out before your eyes.

Images within cards fade up from opacity 0 over 600ms with a slight scale from 0.98 to 1.0 — barely perceptible, but it prevents the harsh pop of an instant image load. The combined effect is of content settling into place, like objects arranging themselves on a surface.

## Footer Approach

As the footer enters the viewport, the copyright line reveals using a clip-path expansion: from `inset(0 100% 0 0)` to `inset(0 0 0 0)` over 600ms, ease-out. The footer text sweeps in from left to right, a horizontal reveal that mirrors the reading direction. The effect is final and deliberate — the page knowing it has reached its own edge.

## Motion Principles

**Languid but not slow.** The base duration is 480ms, which is on the longer side for UI animation. This is intentional: the system's serif headings and generous spacing already signal a measured, unhurried register. Motion that resolves in 200ms would feel mismatched — abrupt against the editorial weight of the typography. The goal is a site that feels considered rather than responsive.

**Hardware-accelerated only.** All animations use `transform` and `opacity` exclusively. No `margin`, `padding`, or `width` animations. The reduced-motion media query collapses all durations to 0.01ms — the layout remains correct, the experience simply loses its cinematic quality.

**Easing is always ease-out.** Nothing bounces. The `cubic-bezier(0.0, 0.0, 0.2, 1.0)` ease-out curve means elements arrive quickly and settle precisely — no springiness, no overshoot. This matches the precision instrument character of the design.

## Video Placements

**1. Hero background — `hero-ambient.mp4`**
- Section role: hero
- Suggested filename: `hero-ambient.mp4`
- Subject: slow horizontal drift across the primary product workspace or material surface — a desk, a workbench, a piece of polished equipment, tools arranged with intention. Morning light or controlled studio light. Almost no camera movement.
- Duration: 10s loop, seamless crossfade
- Why video: The hero communicates the texture of the product world. A still image can show form; only video can show the quality of light moving across a surface over time. This is what separates a brand mark from a brand presence.

**2. Process/method section — `method-sequence.mp4`**
- Section role: product showcase or process explanation
- Suggested filename: `method-sequence.mp4`
- Subject: macro footage of a process — hands adjusting, assembling, or measuring. Tight crop, shallow depth of field, warm practical light. Slow and deliberate.
- Duration: 8s loop
- Why video: The process section earns video because it describes transformation — a state before and after. A static image can only show one moment. Video implies that something is happening, that expertise is in motion.

**3. Testimonials/social proof section — `studio-interior.mp4`**
- Section role: social proof or studio / environment
- Suggested filename: `studio-interior.mp4`
- Subject: ambient footage of the environment where the work happens — interior light shifting subtly, a window catching afternoon light, the background depth of a studio or workspace. No people, no action. Pure atmosphere.
- Duration: 5s loop, tightly looping so the transition is imperceptible
- Why video: Social proof sections are the most credibility-dependent part of a landing page. An atmospheric video background provides environmental context without competing with the testimonial text. It signals: this product exists in the real world, in places like this.
