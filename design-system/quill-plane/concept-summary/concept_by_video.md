# Quill Plane — Concept by Video

## Scroll Opening

The page loads in full resolution on the first frame. No preloader, no transition. The navigation is present from the start: uppercase Inter at 0.875rem, 0.08em letter spacing, sitting above a full-bleed hero composed entirely of the #f2f2f2 field and a single large Lora serif heading set at 52.8px. Lenis smooth scroll initializes silently with `lerp: 0.08, duration: 1.6, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))` — a deceleration curve that matches the resistance of paper sliding across a glass lightbox. The system is fully operational before the visitor performs any action.

## Hero Experience

The hero heading (`"QP-12"` or the full brand wordmark) enters through a character-by-character Splitting.js scattered assembly. Each character is assigned a random starting position across the full viewport, then converges to its baseline position on a staggered timeline:

```javascript
Splitting({ target: '.hero-title', by: 'chars' });
gsap.from('.hero-title .char', {
  x: gsap.utils.random(-340, 340, true),
  y: gsap.utils.random(-180, 180, true),
  rotation: gsap.utils.random(-72, 72, true),
  opacity: 0,
  stagger: { each: 0.022, from: 'center' },
  ease: 'back.out(1.7)',
  duration: 0.85,
  delay: 0.3
});
```

The characters feel lifted from scattered positions on the work surface and placed by a steady hand onto the baseline. The `from: 'center'` stagger direction means the middle letters arrive first, the outer letters last — the assembly builds outward like a compositing frame.

## Section Transitions

### SVG Line Draw — Instrument Outline

A precision outline SVG of the QP-7 Fold Endurance Tester traces its own path as the services section enters the viewport. `strokeDasharray` is set to `pathLength`, `strokeDashoffset` starts at `pathLength` and animates to `0`:

```javascript
const path = document.querySelector('.qp7-outline path');
const length = path.getTotalLength();
gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
ScrollTrigger.create({
  trigger: '.instrument-section',
  start: 'top 75%',
  end: 'top 15%',
  scrub: 1.2,
  onUpdate: (self) => {
    gsap.set(path, { strokeDashoffset: length * (1 - self.progress) });
  }
});
```

The line completes itself exactly as the section settles into view — a calibration mark drawing itself under the eye of measurement.

### Parallax Depth Stack

Three depth layers operate in each major content section:

```javascript
gsap.to('.bg-texture', {
  yPercent: -10,
  ease: 'none',
  scrollTrigger: { trigger: section, scrub: 2.2, start: 'top bottom', end: 'bottom top' }
});
gsap.to('.mid-heading', {
  yPercent: -5,
  ease: 'none',
  scrollTrigger: { trigger: section, scrub: 1.3, start: 'top bottom', end: 'bottom top' }
});
gsap.to('.fg-caption', {
  yPercent: -2,
  ease: 'none',
  scrollTrigger: { trigger: section, scrub: 0.6, start: 'top bottom', end: 'bottom top' }
});
```

Maximum travel: 40px background, 20px mid, 8px foreground. The depth differential is perceptible but not theatrical — it confirms the page has physical depth without announcing it.

## Motion System Signature

### Elastic Magnetic Hover

Every CTA card and instrument product panel carries a magnetic pull on hover:

```javascript
el.addEventListener('mousemove', (e) => {
  const rect = el.getBoundingClientRect();
  const dx = e.clientX - (rect.left + rect.width / 2);
  const dy = e.clientY - (rect.top + rect.height / 2);
  gsap.to(el, { x: dx * 0.12, y: dy * 0.12, ease: 'power1.out', duration: 0.35 });
});
el.addEventListener('mouseleave', () => {
  gsap.to(el, { x: 0, y: 0, ease: 'elastic.out(1, 0.3)', duration: 1.4 });
});
```

The snap-back carries the physical quality of a calibrated spring returning to datum — deliberate and exact.

### Clip-Path Bloom — Work Panel Reveal

The featured instrument case study panel reveals from center via clip-path:

```javascript
gsap.fromTo('.work-panel',
  { clipPath: 'ellipse(0% 0% at 50% 50%)' },
  {
    clipPath: 'ellipse(200% 200% at 50% 50%)',
    ease: 'power3.inOut',
    duration: 1.1,
    scrollTrigger: { trigger: '.work-panel', start: 'top 58%' }
  }
);
```

The panel surfaces like an impression developing on a contact print — the image present in the emulsion before it's visible.

### Specification Counter — Number Measurement

Specification values (tolerances in microns, weight in grams, test cycles) count up on entry:

```javascript
const obj = { val: 0 };
gsap.to(obj, {
  val: targetVal,
  duration: 2.2,
  ease: 'power2.out',
  scrollTrigger: { trigger: '.spec-counter', start: 'top 70%' },
  onUpdate: () => { el.textContent = Math.round(obj.val).toLocaleString(); }
});
```

Numbers resolve at measurement speed — the 2.2s duration matches the time a QP-12 takes to complete a single thickness reading cycle.

### SVG feTurbulence Paper Grain

An animated SVG `feTurbulence` filter sits over the hero field, producing an animated paper-grain texture below conscious perception:

```html
<svg style="position:absolute;width:0;height:0;overflow:hidden">
  <filter id="paper-grain">
    <feTurbulence id="turbulence" type="fractalNoise"
      baseFrequency="0.65" numOctaves="4" stitchTiles="stitch" result="noise"/>
    <feColorMatrix type="saturate" values="0" in="noise" result="gray"/>
    <feBlend in="SourceGraphic" in2="gray" mode="overlay" result="blended"/>
    <feComponentTransfer>
      <feFuncA type="linear" slope="0.04"/>
    </feComponentTransfer>
  </filter>
</svg>
```

GSAP drives the `baseFrequency` attribute between `0.65` and `0.70` over 4 seconds on an infinite alternate loop:

```javascript
const turbulence = document.querySelector('#turbulence');
gsap.to({ freq: 0.65 }, {
  freq: 0.70,
  duration: 4,
  ease: 'sine.inOut',
  repeat: -1,
  yoyo: true,
  onUpdate: function() { turbulence.setAttribute('baseFrequency', this.targets()[0].freq.toFixed(3)); }
});
```

### Word-by-Word Rotation Stagger — Section Sub-Headers

Section sub-header labels (`"INSTRUMENT"`, `"CALIBRATION"`, `"TOLERANCE"`) entrance through a word-rotation stagger: each word arrives from a 90° Y-axis rotation with staggered delay:

```javascript
Splitting({ target: '.section-label', by: 'words' });
gsap.from('.section-label .word', {
  rotationY: 90,
  transformOrigin: 'left center',
  opacity: 0,
  stagger: 0.08,
  ease: 'power3.out',
  duration: 0.7,
  scrollTrigger: { trigger: '.section-label', start: 'top 80%' }
});
```

### Custom Cursor with Precision Trail

A custom cursor element — a 6px circle with a 1px border in #202020 — follows the mouse with a lagged trail via GSAP quickTo:

```javascript
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
const xDot = gsap.quickTo(cursorDot, 'x', { duration: 0.12, ease: 'power2.out' });
const yDot = gsap.quickTo(cursorDot, 'y', { duration: 0.12, ease: 'power2.out' });
const xRing = gsap.quickTo(cursorRing, 'x', { duration: 0.55, ease: 'power3.out' });
const yRing = gsap.quickTo(cursorRing, 'y', { duration: 0.55, ease: 'power3.out' });
window.addEventListener('mousemove', (e) => {
  xDot(e.clientX); yDot(e.clientY);
  xRing(e.clientX); yRing(e.clientY);
});
```

The ring trails the dot at 0.55s delay — the instrument and its measurement shadow, separated by a brief, exact interval.

## Video Placements

**1. Hero Background — Paper surface close-up ambient loop**
- Suggested file: `hero-material.mp4`
- Subject: Extreme close-up of 120gsm Rives BFK uncoated paper under raking side light at approximately 15° angle — grain structure, individual fibre clusters, and the faint translucency at the sheet edge visible at the frame boundary. Camera static. 6s loop. No sound. Color temperature 5500K neutral daylight.
- Duration: 6s loop, `autoplay muted loop playsinline`
- CSS Ken Burns: `animation: ken-burns 12s ease-in-out infinite alternate; @keyframes ken-burns { from { transform: scale(1.0); } to { transform: scale(1.04); } }`
- Why video: The hero states its material relationship through color alone in its static state. A near-still video of the actual surface the instruments measure — Rives BFK grain at 1:1 physical proximity — makes the claim physical. The 1.04 scale drift over 12s is below the threshold of noticed motion; the visitor experiences the page as having surface texture without registering animation.

**2. Process Section — QP-12 calibration ambient loop**
- Suggested file: `calibration-process.mp4`
- Subject: A single hand adjusting the micrometer thimble on a QP-12 Thickness Comparator against a folded paper edge — the thimble rotation, the paper compression visible under 15° side-light, the dial needle settling to zero point. Hold on dial face for 3 seconds. 8s total loop. Shot on matte gray surface, no specular reflection from instrument chrome.
- Duration: 8s loop, `autoplay muted loop playsinline`
- CSS Ken Burns: `animation: ken-burns-slow 16s ease-in-out infinite alternate; @keyframes ken-burns-slow { from { transform: scale(1.0) translateX(0); } to { transform: scale(1.03) translateX(-8px); } }`
- Why video: The process section describes what QP instruments do. A still photograph of a measuring instrument reads as product photography. A close-up video of the actual measurement act — thimble rotation, paper compression, needle settlement — is the argument for precision made visible rather than stated.

**3. Testimonial / Working Environment Section — Light table ambient loop**
- Suggested file: `work-surface.mp4`
- Subject: Top-down overhead view of a Dolan&Bullock light table (or equivalent) with a sheet of Pergamenata vellum partially unrolled, a QP-7 fold tester set beside it, and diffused north light washing the surface. No hands. No movement except the barely perceptible lift of the vellum edge in a room draft over 10s. Shot 1000mm overhead.
- Duration: 10s loop, `autoplay muted loop playsinline`
- CSS: `object-fit: cover; object-position: center; animation: none` — the stillness is the statement.
- Why video: The testimonial section needs atmospheric depth that places words inside a working context. The near-motionless video creates spatial presence — a specific workspace, a named practice — without competing with the text it backgrounds. The vellum edge breathing is the only visible event, and it is small enough to read as presence rather than spectacle.
