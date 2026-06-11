# Opaline Draft — Concept by Video

## Scroll Opening

The page load resolves quietly — no flash, no dramatic entrance sequence. The near-white ground appears first, then the navigation fades in at its transparent state. The first meaningful motion is the heading text, which slides up 8px and fades from opacity 0 to 1 over 0.3s with ease-in-out timing. No stagger between heading and subheading — they enter together, as a composed unit. The effect is less "animation" and more "appearance" — as if the content has always been there and is now choosing to be visible.

## Hero Experience

The hero carries the system's chromatic ambition. A gradient wordmark — looping across pink, purple, indigo, cyan — is the page's single expressive element. Everything else is white and near-black. The hero section should use a video background for exactly this reason: a static gradient is resolved; a slow, drifting video surface underneath the transparent type gives the gradient something to move against without competing with it.

**Suggested hero video:** slow drift across a polished white surface with a single narrow beam of spectrum light — prism refraction tracking from left to right over 10 seconds, looped. The light source should be off-frame; only its cast is visible. The white surface texture should be barely detectable — smooth stone, ceramic, or brushed composite. This creates a live background that changes the gradient's apparent temperature as the light drifts, without the video ever demanding attention.

## Section Transitions

Transitions between sections are structural, not cinematic. Background color shifts from #fbfbfd to #f5f5f7 to #f0f5fa create chapter breaks without theatrical effect. On scroll, content blocks (not individual elements) fade in and translate 10px up over 0.3s. The motion never stacks — each block resolves before the next enters. No parallax on text; the motion is scroll-offset reveal only.

## Content Rhythm

Individual elements enter as grouped units: heading + subheading together, then body text after a 0.05s gap, then the CTA button after another 0.05s. The stagger is minimal — barely perceptible at normal scroll speed, present enough to suggest sequence. Cards in grid sections enter with a 0.08s stagger per column. No scale or blur effects — opacity and translateY only. The system's precision character is maintained in motion by refusing decorative entrances.

## Footer Approach

The footer section transitions from the last content section via a full-bleed background shift to a slightly deeper surface (#f5f5f7). No cinematic signaling. The footer elements fade in as a unit — no stagger within the footer columns. The final fade-in is the lightest motion on the page, appropriate to a section whose purpose is reference rather than persuasion.

## Motion Principles

The overall timing philosophy is **symmetrical and measured**. The ease-in-out easing applied system-wide means every motion — enter and exit — takes the same care with both ends. Nothing snaps. Nothing lingers. The hover interaction at 0.35s is the fastest motion in the system. Scroll reveals at 0.3s. The system reserves its slowest moments for transitions between major page states (0.4–0.5s), but these are rare. The experience is one of a precisely calibrated instrument: responsive without aggression, expressive without excess.

## Video Placements

**1. Hero Background — `hero-bg.mp4`**
- **Section role:** Hero — full-bleed behind the gradient wordmark and opening headline
- **What the video shows:** A polished white or pale stone surface. A single narrow beam of spectrum light (prism refraction, no lens flare) drifts slowly from frame-left to frame-right. The light casts a faint rainbow bar — no more than 20–30px wide — that moves across the surface. The surface itself is barely textured. Shot from directly above or at a very shallow angle. Motion quality: extremely slow drift, almost imperceptible at first, building to a clear traverse over 10 seconds.
- **Duration:** 10s loop
- **Why video serves this section:** The gradient wordmark is the hero's primary visual event. A static background resolves the composition at load — it never changes. A slow light drift keeps the background alive during the user's reading time, making the gradient text appear to shift temperature subtly as the light moves beneath it. The video never demands attention; it rewards attention if the user lingers.

**2. Product Showcase — `product-ambient.mp4`**
- **Section role:** Mid-page product feature showcase — illustrating the product in use
- **What the video shows:** Close-up macro footage of a precise digital interface or physical tool. Fingers adjusting a dial, or a cursor moving through a clean software interface, or a pen tracking across graph paper — the exact subject should be drawn from the product concept. Motion quality: handheld with micro-stabilization, warm ambient light. 5-second loop, no cuts.
- **Duration:** 5s loop
- **Why video serves this section:** A still image of a product feature conveys function. A close-up video loop conveys precision — the user's hand moving carefully, the interface responding with the same care the motion system applies to every interaction. This section earns video because the product's character is better demonstrated than described.

**3. Materials / Texture Section — `surface-texture.mp4`**
- **Section role:** A supporting section illustrating the system's material vocabulary — surfaces, craft, precision
- **What the video shows:** Extreme macro of a material surface — white ceramic, brushed aluminum, smooth paper, or pale stone — with raking light from one side. The light source moves extremely slowly, revealing the surface texture as it shifts. No color other than white, grey, and the faint warmth of incandescent raking light. Motion quality: timelapse light movement on a static surface, 5 seconds.
- **Duration:** 5s loop
- **Why video serves this section:** The opaline-draft color system is built on the near-white ground (#fbfbfd) — a color with material implication. A static image of a surface reads as a photograph. A slow-raking-light video of the same surface reads as a presence — something occupying space and time. This section's purpose is to give the abstract palette a physical referent.
