# Scroll Experience — deep-signal

Creative brief for a motion director. Grounded in the deep-signal token set (void-black-and-charcoal monochrome, Plus Jakarta Sans / Inter, `cubic-bezier(0.25, 0.46, 0.45, 0.94)` timing) and framed for a dark cinematic premium-restraint B2B SaaS platform site — the Linear-esque calm where nothing performs and everything arrives.

---

## Scroll Opening

Direct the opening as a held breath, not a reveal. The void-black canvas (`#000000`) fills the frame before any content resolves; the only motion in the first beat is a single, slow gradient glow — a low-luminance pool of deep navy `#020B44` drifting behind where the headline will land, moving at roughly 2% viewport-width per second so it never announces itself as animation. This is the cinematic restraint the system is built on: the audience should feel depth in the dark field before they can name why. As the page becomes interactive, the 72px navigation resolves from transparent to full opacity over 0.52s, and the hero cascade begins — headline, subhead, CTA cluster entering on `fadeInUp` at 0.52s with 0.13s stagger. The whole opening must complete in under a second of active motion, then hold perfectly still. The glow continues underneath; everything else settles.

## Hero Experience

The hero does not perform — it arrives, and the motion director's job is to protect that stillness. The Plus Jakarta Sans headline at display scale (7.560rem, -0.04em tracking) lands left-aligned and then stops moving entirely; no parallax on the type, no character-by-character build, no shimmer. The one permitted continuous element is the ambient glow behind the composition, treated like a slow key light on a dark set — it breathes on a 12–16s cycle, brightening no more than 6% at peak, so the void-black canvas reads as a lit surface rather than a flat fill. The right third of the 1440px viewport stays deliberately empty; resist the urge to fill it with motion. Negative space is the composition. The feeling to shoot for is a still photograph of authority that happens to have a pulse.

## Section Transitions

Section boundaries are cut, not dissolved. Scrolling from the void canvas into the first charcoal (`#3a3f42`) zone should read as a hard material change — a page turn between two substances — not a gradient blend or a wave divider. Let the background alternation (void → charcoal → void → charcoal) carry the entire rhythm of the site. The only motion at a boundary is the content inside the incoming section entering on its own `fadeInUp`; the boundary line itself does nothing. On the void-to-void seams (hero into a dark product section, or the final CTA into the footer) allow the ambient glow to migrate slowly toward the new focal point, so continuity of light — not a visible transition device — tells the eye the page has moved on.

## Content Rhythm

Individual elements enter on `fadeInUp` — opacity 0→1, translateY 24px→0, over 0.52s at the house easing curve — and ScrollTrigger fires at `top 80%` so content is already resolving before the viewer expects it, which reads as readiness rather than lag. Card grids stagger left-to-right at 0.13s per column: short enough to feel like one textured motion event, not three separate animations. Split feature layouts enter their two columns simultaneously — no stagger between the copy and the UI panel. The director should treat all stagger values as micro-timing; nothing overstays. The governing rule is that the eye should never wait for the interface. Motion arrives early, settles quickly, and then leaves the composition alone.

## Footer Approach

Approach the footer without ceremony. The final dark, full-bleed CTA resolves the persuasion arc, and the footer below is visually continuous — same `#000000`, no divider, no color break, no closing flourish. The only signal that the footer has begun is the drop from display-scale CTA type to Inter small-scale link columns. Let the ambient glow fade to its lowest state here, dimming the set as the page ends. No parallax, no reveal, no farewell animation. The page simply comes to rest on the same void-black field that opened it.

## Motion Principles

The timing philosophy is considered precision — not languid, not snappy, exactly calibrated. Micro-interactions run 0.21s and feel faster than they measure because `cubic-bezier(0.25, 0.46, 0.45, 0.94)` accelerates early and decelerates clean, giving a sense of completion rather than cutoff; entrances run 0.52s and feel slower for the same reason, arriving fully at rest. Nothing bounces, nothing overshoots. For a platform selling reliability, the motion vocabulary must be the promise made visible: predictable, precise, without surprises. The single expressive liberty is the ambient gradient glow — and it earns its place only by staying beneath the threshold of conscious notice. If a viewer can point to it and say "that's moving," it is too strong.

## Video Placements

Three sections carry ambient looping video; everywhere else stays static. Each placement is chosen where a still frame would flatten the depth the palette is engineered to create.

- **Hero background — `hero-bg.mp4`, 10s loop.** Role: the lit void-black field behind the hero headline. Subject: an extremely slow volumetric drift of soft deep-navy light through near-black depth — think fog lit from within a dark chamber, `#000000` to `#020B44` gradients folding over one another. Motion quality: sub-perceptual, continuous, seamless loop point with no visible seam. Mood: calm authority, a set that is lit rather than filled. Why video beats a still: a static gradient reads as a flat wallpaper; the drift gives the dark canvas the sense of a real, deep space, which is the entire distinction between engineered void depth and dark-mode-generic.

- **Mid-page ecosystem band — `ecosystem-flow.mp4`, 10s loop.** Role: full-bleed dark backdrop behind the ecosystem / product-grid section. Subject: faint interconnecting lines of deep-navy `#020B44` accent light pulsing along unseen paths, like signal moving through infrastructure, at very low opacity over the `#000000` field. Motion quality: slow directional travel, one accent pulse resolving roughly every 4–5s, never rhythmic enough to become a pattern. Mood: quiet competence, systems working in the dark. Why video beats a still: the section's message is that things connect and move; a still would have to imply motion with arrows or diagrams, whereas ambient signal-flow says it without a single label.

- **Final CTA band — `cta-glow.mp4`, 5s loop.** Role: backdrop behind the closing full-bleed CTA before the footer. Subject: a single slow bloom of deep-navy `#020B44` glow rising and settling behind the centered CTA, like a light being brought up on a dark stage. Motion quality: one gentle swell per loop, symmetrical ease, no flicker. Mood: resolution, a final held note. Why video beats a still: the CTA is the emotional peak of the page and a still leaves it inert; the slow bloom gives the moment lift without adding a button animation or any device that would break the system's no-bounce, no-overshoot restraint.
