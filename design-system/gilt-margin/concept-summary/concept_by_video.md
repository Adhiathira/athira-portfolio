## Scroll Opening

The page opens at full charge: the deep forest green field fills the viewport before scroll begins. The nav — already resolved into its slim 40px typographic ribbon at 0.12em uppercase letter-spacing — floats at the top edge, three links left, wordmark centered, three links right. There is no loading animation. The Lenis smooth scroll instance is already active, its `duration: 1.2` and `easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t))` giving the scroll container an exponential deceleration — momentum that bleeds off smoothly rather than cutting. The scroll cursor hasn't moved and the design has already made its claim: compressed, direct, charged.

## Hero Experience

The cartoon hands enter under `cubic-bezier(0.17, 0.67, 0.3, 1.1)` — a curve whose 1.1 output value means the illustration overshoots its resting position by approximately 10% before rebounding. The motion feels launched, not placed. The headline assembles via GSAP Splitting.js character scatter: `stagger: 0.03`, `ease: 'back.out(1.7)'`, characters arriving from `x: gsap.utils.random(-200, 200)` and `y: gsap.utils.random(-100, 100)`, `rotation: gsap.utils.random(-45, 45)`, `scale: 0` to `1`. At 0.03s stagger with 0.8s individual duration, a 5-character word assembles in approximately 0.92s — long enough to read as an event, short enough that the full heading is composed before the first scroll gesture. The spring easing `back.out(1.7)` gives each character a slight rebound at arrival, matching the assembled motion system's springy character.

**Hero video candidate (`hero-bg.mp4`):** The green field here is a video surface — a slow macro drift across deep matte material: dyed wool, coated paper stock, or painted concrete at very close proximity. The texture visible only in motion is invisible in a still; video earns its place by revealing what a hex value cannot. Motion quality: 1–2px/second lateral drift with a fractional rack-focus cycle (depth breathing at 8s period). Duration: 10s seamless loop, blended at start/end with crossfade. Why video over still: `#09543d` as a flat fill reads as a brand color decision; as a moving material surface it reads as an environment — and that shift from color to place is the hero's structural argument.

## Section Transitions

The first scroll gesture cuts the green to the warm off-white (`#fffdf7`) — a hard cut at the hero's bottom edge. No crossfade, no parallax gradient, no opacity blend. The transition is governed by scroll position rather than CSS animation. Within the body, cards enter via GSAP ScrollTrigger scattered assembly: `x: gsap.utils.random(-innerWidth/2, innerWidth/2)`, `y: gsap.utils.random(-300, 300)`, `rotation: gsap.utils.random(-20, 20)`, `opacity: 0`, `duration: 1.0`, `stagger: 0.08`, `ease: 'power3.out'`. At 0.08s stagger across a row of three cards, the full row assembles in 1.16s — a single composed gesture. The `power3.out` easing (deceleration exponent 3) gives each card a rapid initial movement that slows sharply at the final position: fast arrival, controlled landing.

The clip-path iris bloom is reserved for section-opening moments: `gsap.fromTo(el, { clipPath: 'ellipse(0% 0% at 50% 50%)' }, { clipPath: 'ellipse(150% 150% at 50% 50%)', duration: 1.2, ease: 'power3.inOut' })`. At 1.2s with `power3.inOut` (symmetric cubic deceleration), the iris opens with equal acceleration into and out of the midpoint — the expansion feels organic, like an aperture opening, rather than mechanical. Applied to section backgrounds (the dark green mission cards entering via iris rather than fade), it transforms a layout transition into a photographic gesture.

## Content Rhythm

The body sections move at medium density. The 222px section top padding (from the spacing system's +32px breathing room twist) creates a long empty zone before each section's content — the whitespace is not passive but acts as temporal spacing, forcing a pause in the scroll before the content arrives. This is the spatial tension of an inhalation before a phrase.

Multi-layer parallax governs the section backgrounds: `.layer-back { scrollTrigger: { scrub: 1 }, y: '-30%' }` and `.layer-mid { y: '-15%' }`. At a section height of ~800px, the back layer travels −240px over the scroll distance (30% of 800px), the mid layer −120px — creating approximately 2× depth separation between layers. This is not decorative parallax; it functions as a depth signal that makes the content cards (no parallax, stationary) feel physically forward in the z-axis.

The number counter animation marks statistical moments: `gsap.from({ val: 0 }, { val: targetNumber, duration: 2, ease: 'power2.out', onUpdate: function() { stat.textContent = Math.round(this.targets()[0].val).toLocaleString() } })`. At 2s with `power2.out`, the counter accelerates initially and decelerates at the target — the final digits settling slowly gives each statistic a sense of arriving at a specific value rather than stopping arbitrarily. These moments punctuate the scroll as legible data events.

The SVG path draw (scrubbed) runs as a decorative thread through the body: `const len = path.getTotalLength(); gsap.set(path, { strokeDasharray: len, strokeDashoffset: len }); gsap.to(path, { scrollTrigger: { scrub: 1 }, strokeDashoffset: 0 })`. With `scrub: 1`, the path draws at a 1:1 ratio with scroll position — the user's gesture directly controls the drawing, making the scroll feel authorial rather than passive.

## Footer Approach

Approaching the terminal zone, the two full-width dark green rounded cards arrive as the last chromatic event — the highest-energy surface before the close. A second video candidate lives as background to these cards: a warm ambient loop that differentiates them from static colored blocks and implies the lived environment behind the product's claims.

**Pre-footer video candidate (`cta-ambient.mp4`):** Slow zoom across warm-lit neutral material — cream paper stock, natural linen, or a wooden surface in golden-hour sidelight. Motion: imperceptible zoom, less than 0.3px/frame. Duration: 5s seamless loop. Why video: the dark green terminal cards risk reading as graphic decoration; ambient video in the background layer signals that this is a physical environment, not a screen element — the final persuasion before the footer's exhale.

After the green cards, the footer arrives without ceremony: six links, two lines of legal text, no animation, no closing beat. The page stops. The magnetic hover (`elastic.out(1, 0.3)`, duration `0.6s` return) is active on the footer links — each link pulls toward the cursor on approach and snaps back elastically on exit, the spring release (`elastic.out`) creating a brief shimmer of physical energy at the very end of the scroll experience.

## Motion Principles

Two timing anchors: the assembled spring easing (`cubic-bezier(0.68, -0.55, 0.265, 1.55)`) for UI transitions at 0.45s, and ScrollTrigger's `scrub: 1` for scroll-driven animations at direct 1:1 ratio. The first is mechanical-clockwork; the second is frictionless-continuous. Together they define the site's kinetic register: **discrete interactions snap and rebound; scroll-driven motion flows without resistance**. Stagger values: `0.03s` for character-level sequences (Splitting.js), `0.08s` for card-level sequences (scattered assembly), `0.15s` for section-level sequences (motion system base stagger). Each tier of stagger corresponds to a different compositional scale, creating a timing hierarchy that reads as designed rather than arbitrary.

## Video Placements

**1. Hero background — `hero-bg.mp4`**
- Section role: full-viewport hero behind headline assembly and illustration entry
- Subject: slow macro drift across deep matte green — dyed textile, matte concrete, or heavy coated paper stock at close proximity; surface texture should be legible at 100% opacity
- Motion quality: lateral drift at 1–2px/second with fractional rack-focus depth breathing (8s period, barely perceptible)
- Duration: 10s seamless loop with crossfade blend
- Why video: transforms `#09543d` from a flat brand fill to a material environment; the texture visible in motion is the hero's structural claim — you are not looking at a screen element but at a physical surface that the brand inhabits

**2. Mission / values body section — `mission-surface.mp4`**
- Section role: ambient layer behind the mission card grid in the body
- Subject: diffuse light drifting slowly across cream paper or natural linen — the texture of a ruled notebook opened to a blank page, or a desk surface in filtered morning light; no objects, no hands, no branding
- Motion quality: slow light drift, purely tonal — no hard shadows, no legible surface edges that would compete with card content
- Duration: 8s seamless loop
- Why video: the mission section carries the site's credibility argument; static cards in a light field risk reading as infographic panels; an ambient surface in the background layer shifts the register from marketing presentation to working document — the implication of a physical environment where this work happens

**3. Pre-footer CTA block — `cta-ambient.mp4`**
- Section role: background layer behind the two dark-green terminal CTA cards
- Subject: warm-lit neutral material in golden-hour sidelight — cream linen, natural wood grain, or heavy paper stock; warm color temperature (≈3000K) to contrast the green cards' cool depth
- Motion quality: imperceptible slow zoom, less than 0.3px/frame, no lateral movement
- Duration: 5s seamless loop
- Why video: the terminal CTA cards are the site's last conversion surface; a warm ambient environment behind them creates physical depth and differentiates this zone from the body's card grid above — the warmth of the video against the dark green surface signals a tonal shift toward invitation, making the CTAs feel like an opening rather than a wall
