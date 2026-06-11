## Motion Brief: Ivory Ledge

---

### Scroll Opening

The page loads in stillness. No splash, no preloader. The hero fades in at full opacity from a state of near-invisibility — a 0.6s opacity rise from 0 to 1 on the headline, 0.9s on the hero image behind it, staggered 0.15s apart. The effect is not dramatic; it is the quiet arrival of light through a high window. The navigation resolves last, its items sliding down 8px into position with a 0.3s ease-in-out. The page does not announce itself — it simply becomes present.

---

### Hero Experience

The hero is the only section that justifies video. It holds a full-bleed photographic or video plane beneath a monochromatic type composition — a large Prata headline in white, centered, with two rounded CTA buttons below. The recommended treatment is a slow atmospheric video: **hero-bg.mp4**, 10s loop, depicting a white architectural interior — light moving across a concrete or plaster wall, a slow camera drift left, no human subjects, morning quality. The motion should be below the threshold of conscious awareness. The viewer should not notice it is moving; they should only feel that the space breathes. This is not a video as content. It is video as material.

---

### Section Transitions

Between the hero and the first content grid, the transition is a straight horizontal edge with no decoration. What changes is the atmosphere: the dark photographic field gives way to a white ground with black type. This shift is the most powerful moment in the scroll sequence. No animation should soften it — the contrast should land cleanly. Subsequent section transitions are handled by background-color changes alone (white → pale tint → photography → white). The edit is the motion.

Between the full-width editorial CTA and the footer, a gradual background deepening occurs — the footer's near-black terminal arrives as the natural conclusion of the value gradient the page has built. No animated transition is needed; the weight of the dark background carries its own arrival.

---

### Content Rhythm

Individual elements enter the viewport using a modest stagger-fade pattern:

- **Headings**: translateY(16px) → 0, opacity 0 → 1, duration 0.6s, ease-out
- **Body paragraphs**: opacity 0 → 1, duration 0.45s, 0.1s after heading
- **Cards in grids**: stagger 0.08s per card, translateY(12px) → 0, opacity 0 → 1
- **CTA buttons**: scale(0.97) → 1, opacity 0 → 1, 0.2s after paragraph

The timing scale is languid rather than snappy. No element should feel urgent. The 0.45s base duration — the system's motion signature — means that reveals feel considered rather than reactive. This is not an interface that wants to impress you with its speed.

---

### Footer Approach

The footer resolves with no animation. Its arrival is structural: the background shifts to near-black, the type is white at small scale, and the columns simply appear. The finality of the dark footer is earned by what came before it — the page's rhythm of light and space makes the terminal darkness feel like a held breath, not an ending. No exit animation for the last content section; let the footer's color do all the work.

---

### Motion Principles

The ivory-ledge motion system is built around a single value: **patience**. The 0.45s base duration is deliberately above the threshold for "fast" UI — it communicates that this product does not require urgency. Easings favor ease-out and cubic-bezier(0.4, 0, 0.2, 1): each motion begins with energy and settles into its resting position. Nothing springs; nothing overshoots. The stagger delays (0.08–0.15s) create rhythm without percussion. The system's restraint is its personality: it belongs to a product that trusts its own quality and does not need to move fast to prove it.

---

### Video Placements

**1. Hero background — `hero-bg.mp4`**
- Section role: hero
- Subject: white architectural interior — light drifting across a plastered wall or concrete ceiling, no camera whip, just the sensation of time passing in a beautiful room
- Motion quality: slow drift (imperceptible unless watched still), long exposure quality
- Duration: 10s loop
- Why video: A still photograph would freeze the atmospheric quality this hero depends on. The barely-perceptible movement of light across a surface communicates material depth that no static image can hold. The viewer does not register the video consciously — they register the space as alive.

**2. Process/feature showcase — `process-ambient.mp4`**
- Section role: mid-page product feature or services section
- Subject: hands manipulating a material object — paper, fabric, or a tool — in close-up, slow motion, light from one side, no face visible
- Motion quality: macro slow-motion, 60fps slowed to 30, tactile emphasis
- Duration: 5s loop (seamless cut)
- Why video: The feature section needs to communicate craftsmanship and intentionality. A still image of a hand holding a product reads as stock photography. A 5-second slow-motion loop of the same gesture reads as authorship. The difference is temporal: video shows that the making is careful.

**3. Studio/company section — `studio-interior.mp4`**
- Section role: about, studio, or company culture section
- Subject: an empty workspace — a desk with morning light, a window, books or materials organized precisely, no person in frame
- Motion quality: ultra-slow dolly or static camera with subtle natural movement (sunlight shifting, curtain edge)
- Duration: 8s loop
- Why video: A still of an empty desk reads as a stock photo. The same frame with five seconds of moving light reads as a place that is actually inhabited — temporarily absent rather than generic. This is the emotional register the company section needs: evidence of a real working context, not a studio shoot.
