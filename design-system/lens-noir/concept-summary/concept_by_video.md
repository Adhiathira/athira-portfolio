# lens-noir — Concept by Video

## Motion Identity

Motion follows the grammar of cinema, not digital UI. Animations are slow (800ms–1200ms), ease-out (no spring, no bounce), and purposeful. Each animation quotes a film technique.

## Scene 1: Hero — Title Card Sequence

The page opens on black. The nav fades in first — barely there, transparent. Then the Bebas Neue headline appears: opacity 0 to 1 over 800ms with a 400ms hold before the fade begins. This is the cinematic title card: the held darkness before the name appears. The film grain overlay is already running at 0.04 opacity. The letterbox bars (black, 80px top and bottom) are structural — they define the frame before the content exists inside it.

**GSAP:** `gsap.from(headline, { autoAlpha: 0, delay: 0.4, duration: 0.8, ease: 'power3.out' })`

## Scene 2: Scroll — Letterbox Reveals

As the viewer scrolls, each section's content reveals via a clip-path that opens from inset(0 0 100% 0) to inset(0 0 0% 0) — a wipe from top to bottom, like a curtain rising. The film content cards drift in from x:20 to x:0 simultaneously, 1.2s, power1.out. This is the cinematic tracking shot: slow, deliberate, horizontal.

**GSAP:** `gsap.from(section, { clipPath: 'inset(0 0 100% 0)', duration: 1.0, ease: 'power2.inOut', scrollTrigger: { once: true } })`

## Scene 3: Iris Wipes

The stats section uses a circular clip-path expanding from center — the iris wipe of silent cinema. Numbers appear as if the camera's iris is opening on them: `circle(0% at 50% 50%)` → `circle(75% at 50% 50%)`.

## Scene 4: Credits Roll

Footer credits lines stagger in from y:30 at 0.1s intervals — like rolling title credits at the end of a film. The film roll divider at the top of the footer appears first, then each credit column cascades downward.

## Scene 5: Hover States

Image areas respond to hover with filter:brightness(1.15) — as if a light has been turned up on the projected image. No color changes, no movement. The stillness of the hover state is part of the cinematic feel.

## Asset Placement

- **Hero background:** Cinematic trailer / sizzle reel — widescreen, dark, movement across the frame
- **Film cards (section 2):** Behind-the-scenes cinematography stills — 16:9 crop, high contrast, minimal color
- **About page:** Director's studio photography — pools of light against dark ground
- **Process section:** Time-lapse of editing timeline or color grading workflow
