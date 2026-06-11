# Quill Meridian — Concept by Video

## Page Load Sequence

The page initializes in complete stillness. The nav appears fully formed at opacity 1 — no fade, no slide. The hero heading enters via SVG filter warp: an `<feTurbulence>` node with `type="fractalNoise"`, `numOctaves="3"`, initial `baseFrequency="0.065"` connected through `<feDisplacementMap scale="24">`. The warp resolves with: `gsap.to(turbulence, {attr:{baseFrequency:0}, duration:1.1, ease:'power2.out', delay:0.2, onComplete: () => heroTitleWrap.style.filter='none'})` — the heading arrives as if resolving from visual noise into precision, a direct analogue to a measuring instrument finding its zero. No other element moves on page load. Total load-to-settled time: 1.3 seconds.

## Hero Experience

The hero occupies the full viewport. The oversized Cormorant Garamond 300 heading — "Precision Registered. Provenance Certified." — is the first content encountered. After the SVG filter warp settles, a text scramble sequence runs on the subheadline using Splitting.js: `Splitting({by:'chars'})` then `gsap.from(chars, {x:()=>gsap.utils.random(-220,220), y:()=>gsap.utils.random(-110,110), rotation:()=>gsap.utils.random(-50,50), opacity:0, scale:()=>gsap.utils.random(0.2,1.4), stagger:{each:0.022, from:'random'}, ease:'back.out(2.2)', duration:0.72})`. The characters arrive from scattered positions, assembling into legibility — a direct analogue to instruments finding their registered tolerance range.

## Section Entry Animations

As each section scrolls into view, a ScrollTrigger fires `start:'top 78%'`. Feature cards enter via the exploded assembly technique: each card starts at `x: gsap.utils.random(-40vw, 40vw), y: gsap.utils.random(-30vh, 30vh), rotation: gsap.utils.random(-30, 30), opacity: 0` and converges to its grid position: `gsap.to(cards, {x:0, y:0, rotation:0, opacity:1, stagger:{each:0.085, from:'center'}, ease:'power3.out', duration:1.1})`. The bento grid cells use a clip-path shape reveal: each cell starts with `clip-path: inset(0 100% 0 0)` and opens to `clip-path: inset(0 0% 0 0)` via `gsap.to(cell, {clipPath:'inset(0 0% 0 0)', duration:0.85, ease:'expo.inOut', stagger:0.12})`.

## Divider and Rule Animations

The horizontal rules between sections are SVG paths drawn on scroll. Each `<path>` has `getTotalLength()` computed on init, then `strokeDasharray` and `strokeDashoffset` set to that value. On scroll entry: `gsap.to(path, {strokeDashoffset:0, ease:'none', scrollTrigger:{trigger:path, scrub:2, start:'top 90%', end:'top 40%'}})`. The path draw is tied directly to scroll position — pausing mid-draw if the user stops scrolling, communicating the precision of a ruling pen being drawn across a measured line.

## Counter Animation

The certifications-issued counter (displayed as a large typographic number in the bento primary cell) triggers on scroll: `gsap.to(counter, {innerText:4847, duration:2.4, ease:'power2.out', snap:{innerText:1}, scrollTrigger:{trigger:counter, start:'top 70%'}})`. The snap ensures the number reads as an integer throughout its animation — a calibration register, not a sales figure.

## Multi-Layer Parallax

Three depth planes move at distinct scrub rates as the user scrolls through the hero:
- Specimen label column (right side): `scrub: 0.8` — moves slowly, closest plane
- Ghost word background text ("MERIDIAN", font-size clamp(8rem, 18vw, 15rem), opacity 0.04): `scrub: 1.5` — mid-depth
- Hairline rule overlay: `scrub: 2.5` — fastest, creates the impression of a transparent ruled sheet sliding across the page

Implementation: `gsap.to(el, {yPercent: -12, ease:'none', scrollTrigger:{trigger:hero, start:'top top', end:'bottom top', scrub: VALUE}})` for each layer.

## Elastic Hover on Cards

Service cards and bento side cells carry a mousemove elastic hover: on `mousemove`, offset is tracked at 0.25× mouse position relative to card center and applied as `transform: translate(Xpx, Ypx)`. On `mouseleave`, the card returns to center with `gsap.to(card, {x:0, y:0, duration:1.2, ease:'elastic.out(1, 0.28)'})`. This gives each interactive surface the quality of a suspended object — responsive without acceleration, precise without snap.

## Footer Sequence

The footer enters as a single unit via clip-path iris reveal: `clip-path: circle(0% at 50% 50%)` expanding to `clip-path: circle(150% at 50% 50%)` over 1.0s with `ease:'expo.out'`, triggered when the penultimate section exits the viewport. The iris center point (50% 50%) places the reveal origin at the geometric center of the footer — a photographic aperture opening on the final statement of the page.

## Additional Techniques (New)

**Technique I — Method Card Rule Draw (scaleX timeline):**
The horizontal rule above each method card is a `<div>` with `width:0` that expands to `100%` on scroll entry. Exact implementation: `gsap.to(ruleEl, {width:'100%', duration:0.7, delay: cardIndex * 0.12, ease:'power2.out'})`, triggered by `ScrollTrigger.create({trigger: card, start:'top 85%', once:true})`. The stagger interval of `0.12s × card-index` means the three rules arrive at 0ms, 120ms, and 240ms after the first one fires — the temporal gap reads as a single controlled gesture spread across three positions rather than three independent events.

**Technique II — Bento Primary Iris Clip-Path Reveal (circle expansion):**
The primary bento cell (dark field containing the counter and the central statement) enters via clip-path circle expansion rather than the standard inset reveal used on the side cells. Initial state: `gsap.set(bentoPrimary, {clipPath:'circle(0% at 50% 50%)'})`. Reveal: `gsap.to(bentoPrimary, {clipPath:'circle(150% at 50% 50%)', duration:1.0, ease:'expo.out'})`, triggered `start:'top 80%'`. The origin point (50% 50%) places the aperture at the geometric center of the dark cell — as if a circular iris in a camera lens were opening, revealing the instrument count as the thing being photographed. The 150% radius ensures full coverage including corners.

## Video Placements

**1. Hero Ambient — `instrument-calibration.mp4`**
- Section role: hero background
- Suggested filename: `instrument-calibration.mp4`
- What the video shows: extreme close-up of a ruling pen being drawn across drafting film, leaving a precise ink line 0.1mm wide. A graduated scale bar is visible in the lower third. The motion is continuous, deliberate, 8 seconds per stroke. Shot under collimated tungsten light that reveals the meniscus of ink in the pen slit.
- Duration: 10s loop
- Why video: the hero must instantiate the concept of precision as a physical act. A static image of a rule drawn line communicates the result; a video communicates the care that produced it — the pause at the start of a stroke, the consistency of pressure, the hairline arriving exactly where it was aimed.

**2. Registry Entry — `certification-stamp.mp4`**
- Section role: service/features section (bento primary cell)
- Suggested filename: `certification-stamp.mp4`
- What the video shows: a hand applies a verification stamp to a paper certificate document, lifts it cleanly, and the impression settles into the fiber of the paper. Slow motion, 60fps captured, played at 40% speed. The stamp is circular with fine radial text around the perimeter.
- Duration: 6s loop
- Why video: the primary conversion proposition — "a certificate is issued" — needs a physical referent. The act of stamping a document is universally understood as the moment at which an assertion becomes official. A video of this act running on loop in the primary bento cell makes the promise concrete before the user reads a word.

**3. Archive Drawer — `archive-drawer.mp4`**
- Section role: provenance/about section
- Suggested filename: `archive-drawer.mp4`
- What the video shows: a slow pull-focus drift across a systematically organized flat-file drawer: labeled card dividers, instrument sleeves with printed registration numbers, a pair of cotton gloves folded at one corner. The camera drifts extremely slowly — 4mm of travel in 12 seconds. Light is side-raked, revealing texture in every surface.
- Duration: 12s loop
- Why video: institutional memory cannot be asserted through text alone. A drift across an organized archive demonstrates, without argument, that the organization maintaining it has been doing so for a long time and knows exactly where everything is.
