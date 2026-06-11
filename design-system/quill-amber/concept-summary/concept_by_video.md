# Lōmen — Scroll & Motion Behavior Reference

## Tone Twist Applied
Source: formless-ai (dark SaaS, monochromatic, typewriter hero, squircle shape language)
Twist: Warm editorial translation — dark near-black sections become contrast chambers rather than defaults; squircle shapes become editorial panels; typewriter animation becomes character-scramble reveal; single accent moves from electric blue (#006cf7) to warm orange (#fb7339).

---

## Video Placements

The following sections are designated for ambient video or high-motion visual treatment:

1. **Section 2 (Waveform Visualizer)** — No video. SVG path stroke-dashoffset animation driven by ScrollTrigger scroll position acts as the "motion event" for this section. The animated waveform is more precise than any stock video could be for this product context.

2. **Section 5 (Testimonials)** — Optional subtle ambient video: a slow macro shot of a mixing console fader or acoustic foam texture, played at very low speed (0.2×), behind the testimonial quote at 15–20% overlay opacity. If not available, use a CSS gradient grain texture as a fallback.

---

## Section Design Pattern Extraction

The interface uses a series of distinct, reusable section patterns reflecting the warm editorial/precision-instrument aesthetic.

### 1. Typographic Hero Section
- Full viewport, cream background (#f2efe9), typography as the primary visual event
- h1 at 9.072rem, weight 800, charcoal/taupe split within single element
- Per-character scramble animation on page load: each character spawns from a random (x: ±80px, y: ±60px) offset with rotation: ±15deg, animating to final position with GSAP stagger 0.04s per character
- Two-field input bar below, bottom-border styling, orange CTA
- No images, no video — the analysis platform's credibility is established through typographic precision alone

### 2. Waveform Visualizer Section (Dark)
- Background: #1a1a14 (near-black)
- Full-width inline SVG of a frequency-response curve — path drawn via ScrollTrigger stroke-dashoffset as user scrolls through the section
- Three stat counters that count from 0 to their target values when scrolled into view (GSAP counter animation)
- Transition in via upper organic SVG wave divider; transition out via lower wave divider
- No video

### 3. Feature Split Sections
- Alternating 60/40 layout swaps
- Row 1: clip-path morphing reveal (inset wipe from right)
- Row 2: element-assembly animation (UI wireframe elements enter from scattered positions, assemble into final layout)
- Light cream background (#f2efe9)
- No video

### 4. Process Steps Section
- Single column, cream background
- Vertical SVG connector line between steps, drawn progressively on scroll (stroke-dashoffset)
- Each row reveals with a horizontal sweep from left: `x: -70px, opacity: 0` → `x: 0, opacity: 1` with stagger 0.15s
- No video

### 5. Testimonials Section
- Background: #a39b8b (warm taupe)
- Quote text parallax: moves at 0.6× scroll speed vs background layer (two speed layers = depth illusion)
- Optional: slow ambient video at 15–20% opacity behind the taupe if available
- Above/below: unique organic SVG wave dividers (different shapes from all other dividers)
- No required video

### 6. Final CTA Section
- Background: #1a1a14
- Centered composition, elements assemble from scattered positions (the "explosion-in-reverse" assembly pattern)
- Heading spans, orange word, CTA button — all enter from different directions, arriving simultaneously
- No video

---

## Global Scroll Interaction Patterns

### Scroll Animations
- **Character scramble:** Hero headline — per-letter random position enter on page load
- **Stroke-dashoffset path draw:** Waveform SVG and process step connector line — both driven by scroll position via ScrollTrigger scrub
- **Counter animation:** Stats section — numbers count up when section reaches 80% viewport
- **Clip-path reveal:** Feature Row 1 — `inset(0 100% 0 0)` → `inset(0 0% 0 0)` on scroll
- **Element assembly:** Feature Row 2 and CTA section — scattered positions → grid positions with staggered spring timing
- **Parallax depth:** Testimonials — two layers at different scroll speeds
- **Organic wave dividers:** Inline SVG between every section — each a different shape

### Motion Hierarchy
1. Large structural SVG/shape elements establish section territory first
2. Heading text enters second (character-level for hero, section-level for others)
3. Body text and supporting UI enter third with slight stagger
4. CTA buttons enter last — always the final element in each section's reveal sequence

### Navigation Bar Behavior
- Fixed at top, 56px height
- Transparent on cream background at page top (text #575349 readable against cream)
- After 80px scroll: gains solid #f2efe9 background + subtle warm bottom shadow
- No color flip between light/dark sections — the fixed nav uses a cream card background from scroll-threshold onwards regardless of section behind it

### Section Divider Geometry — Required Per-Section Shapes

Each section boundary uses a unique organic SVG path (no two dividers are the same shape):

1. **Hero → Waveform:** Gentle single-arc wave — one slow undulation, amplitude ~40px
2. **Waveform → Features:** Asymmetric double-peak — two unequal bumps, sharper left peak, gentler right
3. **Features → Process Steps:** Flowing S-curve — one inflection point at 40% horizontal, creates mild serpentine
4. **Process Steps → Testimonials:** Three-drip organic — three teardrop protrusions of varying widths
5. **Testimonials → CTA:** Ragged cliff edge — irregular sawtooth with rounded tips, 5–7 irregular peaks
6. **CTA → Footer:** Liquid spill with 4 rounded drips — the formless-ai-inspired animated drip shape, drips pour downward from dark section into the cream footer card

### Cross-Section Persistent Elements
No elements travel across section boundaries. All animations are contained within their respective sections. The only persistent element is the fixed navigation bar.

### Scroll Axis Behavior
Strictly vertical. No horizontal scroll sections, no horizontal carousels.

---

## Section Aesthetic Identity

- **Hero:** Precise, confidence through restraint. The size and weight of the type does all the work.
- **Waveform:** Technical, visceral, dark. The drawn waveform makes the product's core function physically visible.
- **Features:** Structured, educational, alternating rhythm. Light and purposeful.
- **Process Steps:** Utilitarian and credible. The numbered sequence communicates methodology.
- **Testimonials:** Warm, human, textured. The taupe surface and parallax float soften the technical sections before and after.
- **CTA:** Decisive. The assembly animation makes the final call-to-action feel earned rather than imposed.
- **Footer:** Organized and self-contained. The cream card floats on near-black, closing the page without ending on the dark surface.
