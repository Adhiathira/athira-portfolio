# Motion Brief: Verre Calme

---

## Scroll Opening

The page opens already at rest. No preloader, no entrance sequence, no declaration of arrival. The navigation sits unhurried at the top of the frame — letter-spaced uppercase links against a warm ivory field — and the hero resolves from black in a single 1.04s fade, as if the image is being developed rather than loaded. The first moment of the page belongs entirely to the photograph. The design earns its attention by giving the viewer time.

---

## Hero Experience

The hero is a full-bleed editorial photograph, warm-toned, with a compositional logic: its midrange tonal field supports a floating white modal card without any overlay or scrim. This deliberate tonal engineering — image as UI infrastructure — makes the hero a strong video candidate. The photograph has already been designed to sustain close, unhurried attention. Video extends that quality.

**Designated video background:** hero section, replaced with a 10-second ambient loop. Subject: a figure in editorial stillness against a warm greige interior — fabric, posture, controlled light from one direction. The camera does not move. Light shifts almost imperceptibly across the surface of the clothing. The loop restart should be undetectable.

---

## Section Transitions

Sections enter through opacity, not translation. As content scrolls into view, elements fade from zero to full opacity over 1.04s — the extended motion timing of this system means transitions feel like consideration rather than animation. There is no slide, no bounce, no dramatic reveal. The 0.1s stagger between sibling elements gives sequence without theater. Each section feels like a page turning, not a slide advancing.

---

## Content Rhythm

Individual elements arrive through the established fade sequence, staggered at 0.1s per item in source order: heading, subheading, body text, CTA. Because the motion system runs at 1.3× the source timing, the stagger itself becomes perceptible as a rhythm — slow enough to register each element individually, not so slow that it reads as delay. The uppercase heading typography (46px, 0.06em tracking) enters as a field event rather than a typographic detail; the animation budget must respect its weight.

---

## Footer Approach

The footer arrives without announcement. The preceding section's stagger completes, and below it the footer resolves at the same pace — no special treatment, no closing flourish. This is the correct decision: the footer is a functional zone, not an editorial moment. The page ends the way it begins: with restraint and the quiet authority of a design that knows it does not need to perform.

---

## Motion Principles

The timing philosophy is **deliberate deceleration** — durations scaled 1.3× across the board, creating a system where nothing rushes and nothing lingers awkwardly. At 1.04s for primary content arrivals and 0.26s for micro-interactions, the system maintains two temporal registers: the slow time of content presence and the fast time of interface response. These registers never bleed into each other. The easing — predominantly `cubic-bezier(0.4, 0, 0.6, 1)` — decelerates smoothly without backtracking or bounce. The overall effect is of a design that breathes at its own pace.

---

## Video Placements

### 1. Hero Section
- **Asset filename:** `hero-ambient.mp4`
- **Duration:** 10s loop
- **What it shows:** An editorial figure in near-stillness, warm greige interior, single-direction light drift from frame left. No camera movement. Fabric and skin catch the light at slightly different rates. The loop is so subtle a viewer cannot locate the restart.
- **Why video:** The hero's entire compositional logic — the tonal midrange that holds the floating modal card — depends on sustained attention. A near-still video holds the viewer in that sustained state. A still image freezes the moment; this video holds it.

### 2. Product Feature Section
- **Asset filename:** `surface-detail.mp4`
- **Duration:** 5s loop
- **What it shows:** An extreme close-up of a material surface — matte paper, coated stock, or light-raked linen — with slow lateral movement of a light source. Texture becomes visible and then subsides. No readable text or branding in frame.
- **Why video:** The product feature section uses the near-monochrome palette at its most reduced. A material texture loop in the background — barely moving, barely there — gives the typography a physical substrate to sit against. The type gains weight and gravity against a surface that is perceivably real, not flat.

### 3. Editorial Content Band
- **Asset filename:** `interior-light.mp4`
- **Duration:** 5s loop
- **What it shows:** A room corner or architectural detail — a window frame, a receding wall — with morning light moving slowly across a pale surface. Shadow edge drifts across plaster or stone. No figures. No narrative.
- **Why video:** This section is the system's most purely editorial zone — long text over a quiet field. A 5s ambient loop at low motion transforms what would be an inert static background into a surface with a quality of duration. The video does not compete with the text; it gives the text something to rest against.
