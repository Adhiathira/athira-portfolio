# Gilded Tempo — Concept by Video

## Scroll Opening

The page loads to a complete, settled composition. No preloader. No entrance fanfare. The cream ground is already there — warm, still, waiting. Navigation sits in split-wing formation above the hero, transparent against whatever the hero holds. The first scroll gesture draws the user in; it does not push. Load-in animation, if used: a single GSAP `gsap.from('.page-container', { opacity: 0, duration: 0.381, ease: 'power1.inOut' })` at document ready — the page arriving like a page turning, not like a screen switching on. No element-level choreography at load. The page arrives whole.

## Hero Experience

The hero earns video. A split composition — visual material on the left (55% width), headline and CTA on the right (45% width) — where the left panel holds a looping ambient video. The camera is slow, nearly still: a workspace at the cusp of activity, morning light moving across a surface. The video should feel like a photograph that has remembered how to breathe. The subject is the texture of process: a desk, a material, a tool resting between uses. Suggested file: `hero-workspace.mp4`. Duration: 10s loop. GSAP fade-in on page load: `gsap.from('.hero-video', { opacity: 0, duration: 1.267, ease: 'power1.inOut', delay: 0.2 })`. The hero headline enters afterward — `gsap.from('.hero-headline', { opacity: 0, letterSpacing: '0em', duration: 0.8, ease: 'power2.out', delay: 0.5 })` — the letter-spacing animating from 0 to 0.06em as the text opens into its reading state.

## Section Transitions

Sections do not burst into view. As the user scrolls, content arrives on the tidal curve — `ease-in-out`, base duration 0.381s, no overshoot, no bounce. The cream background continues between sections without disruption; what shifts is content density and temperature. The golden orange section (#f5a400 field background) rolls in from beneath using a clip-path reveal: `gsap.fromTo('.golden-section', { clipPath: 'ellipse(0% 0% at 50% 100%)' }, { scrollTrigger: { trigger: '.golden-section', start: 'top 75%', once: true }, clipPath: 'ellipse(150% 150% at 50% 100%)', duration: 0.8, ease: 'power3.inOut' })`. The ellipse origin at the bottom pulls the color up from the earth rather than down from the sky — matching the palette's material register.

## Content Rhythm

Individual elements enter the viewport with deliberate stagger. The core pattern: `gsap.from(elements, { scrollTrigger: { trigger: container, start: 'top 80%', once: true }, y: 24, opacity: 0, duration: 0.507, ease: 'power2.out', stagger: 0.08 })`. The 24px Y-offset is deliberately small — not the dramatic 80–120px of attention-seeking animation, but the 24px that corresponds to one line-height unit in the body text, a proportional distance. Headings receive letter-spacing animation in addition: `gsap.from(heading, { letterSpacing: '0em', opacity: 0, duration: 0.6, ease: 'power2.out' })` — the letters expand from compressed to their 0.06em open state, the heading appearing to breathe itself awake. Card grids assemble with a wider initial scatter: x/y offsets of ±60px, rotation ±6deg (restrained compared to generic scatter animation), duration 0.8s, stagger 0.08s, `ease: 'back.out(1.4)'` — the cards settle with a small settling overshoot that registers as weight, not bounce.

## Footer Approach

The footer (#1a1400 near-black dark brown) is the page's gravitational anchor — the warm cream has been held in tension the entire scroll, and the dark footer releases it. It arrives via a SVG wave divider: an organic curve path whose fill is the footer's own background color, sweeping the cream ground into darkness without a hard border. The wave SVG uses `viewBox="0 0 1440 80"` with path `d="M0,20 C240,70 720,0 960,50 C1120,70 1300,10 1440,30 L1440,80 L0,80 Z"`. As the footer enters the viewport, column content (logo wordmark, link groups, contact) fades upward in three staggered groups: `gsap.from([col1, col2, col3], { scrollTrigger: { trigger: footer, start: 'top 80%', once: true }, y: 20, opacity: 0, duration: 0.507, ease: 'power2.out', stagger: 0.12 })`. The 0.12s group stagger creates a deliberate cascade — the logo arrives first, the content groups follow, the page closes with the same measured pace it opened with.

## Motion Character

The motion character of this system is **tidal-gravitational**. Not mechanical (no rigid clockwork intervals, no bounce in the strict spring-physics sense). Not percussive (no staccato reveals, no sharp entries that call attention to themselves). Not freely fluid (no loose, organic randomness). Instead: objects move as though under the influence of a consistent, significant gravitational field. They begin slowly, accelerate through the middle of their arc, decelerate gradually to rest. The precise easing expression is `cubic-bezier(0.45, 0.05, 0.55, 0.95)` — GSAP's `power2.inOut` approximation — which models a gravitational parabola. At 0.381s base duration, even hover states are felt rather than registered. The system's motion vocabulary has exactly two registers: the micro (0.191s for button/link hover text color) and the macro (0.381–0.507s for content reveals, 0.6–0.8s for heading entrances). Nothing in between. The gap between these two registers is what creates the sensation of weight: small things react quickly; large things arrive slowly. The design has mass.

## Spatial Tension in Motion

The 81px vertical hero padding creates a charged void above and below the headline. In motion terms, this void is not passive — it is the space the headline must "earn" as it animates in. The letter-spacing animation from 0 to 0.06em plays into this: the letters physically expand outward into the surrounding negative space, taking possession of the silence that was reserved for them. The section-to-section clip-path reveal creates a different tension: the incoming section's background pushes up against the base of the viewport like water rising, its organic wave edge in organic contact with the receding cream. These two spatial tensions — the headline expanding horizontally into its negative space, and the sections rising vertically into each other — are the two primary motion relationships in the design. They operate in perpendicular axes and never compete.

## Video Placements

Three sections of this design are video candidates.

**1. Hero Left Panel**
- Suggested file: `hero-workspace.mp4`
- Subject: A slow drift across a working surface — warm morning light raking across uncoated paper, a tool or implement at rest (a pen, a folded document, an instrument), the texture of process before it begins. The camera is nearly stationary; the motion is in the light, not the frame. Close enough to show paper grain. Shot on a warm color temperature (approximately 3200K). The motion must be imperceptible at first glance and felt deeply after three loops.
- Duration: 10s loop
- Why video: The hero's left panel is the primary visual argument for why this thing takes time. A 10s near-still video communicates deliberateness; a still image cannot sustain 10 seconds of the same claim. The loop length is chosen to match the time it takes a considered user to read the headline and CTA — by the loop's end, the video has made its argument in duration.

**2. Studio/Process Section**
- Suggested file: `process-ambient.mp4`
- Subject: A wide, stable shot of a workspace in active use — materials distributed across a surface, hands entering and exiting frame, no face, no voice. The motion is in the work itself: an object being assembled, a document being annotated, a sequence being arranged with care. Single natural light source from one side. The shot should feel like surveillance footage of someone doing real work, not like a commercial.
- Duration: 8s loop
- Why video: The process section's argument is that something is made here, by someone, not assembled by algorithm. A static photograph communicates the setting; an 8s ambient loop communicates ongoing presence — the work continues whether you are watching or not. The loop length suggests narrative without completing it.

**3. Golden Section (Amber Field Background)**
- Suggested file: `services-surface.mp4`
- Subject: An extreme macro close-up of a warm amber or golden surface — amber resin, beeswax, or burnished brass. The camera does not move. The surface itself has the motion: light shifting across it over 5s, the texture responding to the warmth of the light source. The color temperature of the video must match #f5a400 precisely — this is not a subject placed against the background, it is an extension of the background into a third dimension.
- Duration: 5s loop
- Why video: A flat #f5a400 section background risks reading as a design decision rather than a material one. A 5s macro video of a warm material surface at the same color temperature transforms the section from a color field into a material plane. The section becomes physically present — something you could touch rather than just see — which is the design system's governing claim about the nature of what it represents.
