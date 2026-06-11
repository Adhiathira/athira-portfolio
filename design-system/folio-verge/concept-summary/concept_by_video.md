# Video Concept — folio-verge
**Concept Enhancer:** Applied — GSAP parameters named precisely, 2 additional animation techniques added

---

## Video Placements

### 1. Hero Entrance — "The Photograph Resolves"

**Filename:** `hero-entrance.mp4`
**Subject:** A full-bleed editorial photograph of a single figure in an architectural interior: raw concrete columns, hard raking light from a high side window, the figure standing at the left third of the frame with the right two-thirds holding geometric shadow forms. The image was not composed for visual balance — it was composed to leave a dark, structurally quiet zone where text can sit.
**Motion:**

```javascript
// Hero entrance — GSAP precise parameters
const tl = gsap.timeline({ delay: 0.2 });

// Image enters as z-axis push (scale from 1.0 → 1.04, translateX drift)
tl.fromTo('.hero-image',
  { scale: 1.0, x: 0 },
  { scale: 1.04, x: -12, duration: 10, ease: 'none' },
  0
);

// Display headline — opacity lift only, no y movement
tl.fromTo('.hero-title',
  { opacity: 0 },
  { opacity: 1, duration: 0.975, ease: 'power2.out' },
  0.4
);

// Subtitle
tl.fromTo('.hero-subtitle',
  { opacity: 0 },
  { opacity: 1, duration: 0.975, ease: 'power2.out' },
  0.8
);

// CTA cluster
tl.fromTo('.hero-cta',
  { opacity: 0 },
  { opacity: 1, duration: 0.975, ease: 'power2.out' },
  1.2
);
```

**Duration:** 10s Ken Burns drift after entrance resolves at t=2.2s. Seamless loop on drift.
**Rationale:** Establishes editorial-cinematic register. The z-axis push signals arrival without transition clichés (no slide-up, no fade-in with y displacement). Text opacity-only entrance respects the image's spatial authority.

---

### 2. Feature Section — "The Grid Assembles"

**Filename:** `grid-assembly.mp4`
**Subject:** Overhead architectural shot — polished concrete floor, three rectangular printed objects placed in a sparse grid arrangement, strong directional light from upper-left casting long geometric shadows.
**Motion:**

```javascript
// Grid assembly — scattered elements converge on ScrollTrigger
ScrollTrigger.create({
  trigger: '.bento-section',
  start: 'top 70%',
  once: true,
  onEnter: () => {
    // Set random start positions
    gsap.set('.bento-cell', {
      x: () => gsap.utils.random(-400, 400),
      y: () => gsap.utils.random(-200, 200),
      rotation: () => gsap.utils.random(-18, 18),
      opacity: 0
    });

    // Converge to grid positions
    gsap.to('.bento-cell', {
      x: 0,
      y: 0,
      rotation: 0,
      opacity: 1,
      duration: 0.9,
      stagger: { amount: 0.5, from: 'random' },
      ease: 'back.out(1.4)'
    });
  }
});
```

Video plays at 60% opacity as section texture bed, reduced to `filter: brightness(0.85)` on mobile.
**Duration:** 6s loop.
**Rationale:** Assembly motion gives the grid a sense of discovered order — elements finding their arrangement. The `back.out(1.4)` overshoot registers as physical deceleration, matching the material weight the system evokes.

---

### 3. Closing Statement — "Ink on Surface"

**Filename:** `ink-surface.mp4`
**Subject:** Extreme close-up of letterpress printing in progress — a slow pull-back from freshly printed ink on uncoated stock. The acid green (#81b81a) appears as a spot color pass. The clip is desaturated except for the green, which retains full saturation. Visible: ink squash at the type impression, the slight emboss of a previous pass, paper grain.
**Motion:**

```javascript
// Section enters with clip-path bloom
gsap.fromTo('.ink-section',
  { clipPath: 'ellipse(0% 0% at 50% 50%)' },
  {
    clipPath: 'ellipse(150% 150% at 50% 50%)',
    duration: 1.05,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.ink-section',
      start: 'top 60%',
      once: true
    }
  }
);

// Video brightness lift on section hover
document.querySelector('.ink-section').addEventListener('mouseenter', () => {
  gsap.to('.ink-video', { filter: 'brightness(1.15)', duration: 0.6, ease: 'power1.out' });
});
document.querySelector('.ink-section').addEventListener('mouseleave', () => {
  gsap.to('.ink-video', { filter: 'brightness(1.0)', duration: 0.6, ease: 'power1.in' });
});
```

**Duration:** 10s forward + reverse loop (total 20s).
**Rationale:** The most literal expression of the system's material identity. The clip-path bloom reveals the section as though the ink itself is spreading.

---

## Additional Animation Techniques

### 4. Word-by-Word Rotation Entrance (SVG Filter + Splitting.js)

For the section heading in the grid section:

```javascript
// Splitting.js word split
Splitting();

// Apply SVG turbulence filter momentarily during entrance
gsap.fromTo('.section-title .word',
  {
    y: 40,
    opacity: 0,
    rotation: -6,
    filter: 'url(#turbulence)'
  },
  {
    y: 0,
    opacity: 1,
    rotation: 0,
    filter: 'url(#turbulence-zero)',
    duration: 0.75,
    stagger: 0.08,
    ease: 'back.out(1.7)',
    scrollTrigger: { trigger: '.section-title', start: 'top 75%', once: true }
  }
);
```

SVG filter: `<feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="2" result="noise"/>`. Animates `baseFrequency` from 0.04→0 over the entrance duration via `gsap.to(turbulenceFilter, { attr: { baseFrequency: 0 }, duration: 0.75 })`. Produces a brief micro-distortion that resolves into clean type, as though the letterform is setting onto the surface.

### 5. Elastic Magnetic Cursor on Primary CTA

```javascript
// Elastic magnetic hover — primary CTA button
const btn = document.querySelector('.nav-cta-primary');
const btnBounds = btn.getBoundingClientRect();

document.addEventListener('mousemove', (e) => {
  const dx = e.clientX - (btnBounds.left + btnBounds.width / 2);
  const dy = e.clientY - (btnBounds.top + btnBounds.height / 2);
  const dist = Math.sqrt(dx * dx + dy * dy);
  const threshold = 80;

  if (dist < threshold) {
    const strength = (threshold - dist) / threshold;
    gsap.to(btn, {
      x: dx * strength * 0.35,
      y: dy * strength * 0.35,
      duration: 0.3,
      ease: 'power2.out'
    });
  } else {
    gsap.to(btn, {
      x: 0, y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)'
    });
  }
});
```

The `elastic.out(1, 0.4)` on mouseleave creates a snap-back with a single visible oscillation — physically legible as something with mass returning to rest.
