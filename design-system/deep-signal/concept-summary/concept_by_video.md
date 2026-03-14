# Scroll Experience — deep-signal

Generated from scratch (per skill instructions). Describes the visual and kinetic experience of scrolling through a site built on this system.

---

## Scroll Opening

The page loads in silence. Before the first scroll event, the deep forest canvas (`#062914`) occupies the full viewport — no image renders, no video preloads, no background texture resolves. The only loading event visible is the navigation: the 72px bar assembles from transparent to its full-opacity forest green state in 0.52s as the page becomes interactive. This moment — dark field, nav completing — establishes the register immediately: this is not a consumer product. The hero content enters in cascade: headline first at 0.52s, subhead at 0.65s, CTA cluster at 0.78s. Each element translates 24px upward while fading from 0 opacity to 1. The total opening sequence takes under a second from first paint to fully composed state.

---

## Hero Experience

The hero does not perform — it arrives. The Plus Jakarta Sans headline at 7.560rem occupies the left two-thirds of the viewport, left-aligned, its geometric forms precise and still against the forest canvas. There is no parallax, no typewriter effect, no character animation. The text is simply there, large and certain. Supporting Inter copy at 1.25rem appears below the headline gap, followed by the two CTAs — primary green and ghost white — spaced with generous vertical rhythm. The right portion of the hero viewport at full desktop width (1440px) remains empty: negative space as compositional intention, not omission. On narrower viewports, the composition compresses symmetrically and the headline scales fluidly via `clamp()`. The overall hero reads as a still photograph of authority — nothing moves once the entrance animation completes.

---

## Section Transitions

Section boundaries are defined by background alternation, not decorative geometry. Scrolling into the first content section, the background transitions sharply from `#062914` to `#EEF5EE` — a hard cut between dark and light that operates like a page turn rather than a fade. No gradient blends, no wave separators, no diagonal cuts. The visual rhythm of the page is: dark → light → dark → light, with each zone carrying a distinct content register. Dark sections feel architectural — product grids, ecosystem cards, feature splits. Light sections feel editorial — testimonials, explanatory copy. The alternation is consistent enough to feel systematic, but the content within each zone is varied enough that it never reads as repetitive. On scroll, sections cross the viewport edge with no decorative transition mechanism — only the background shift marks the boundary.

---

## Content Rhythm

Individual elements enter the viewport via `fadeInUp` — opacity 0 to 1, translateY 24px to 0, over 0.52s at the standard easing curve. Card grids use staggered entry: items in a 3-column grid enter with 0.13s delays between each column, so the grid assembles left-to-right rather than all-at-once. This stagger is subtle — 0.13s is short enough that it reads as a single motion event with texture rather than three separate animations. Feature sections with split layouts enter their two columns simultaneously — no stagger between the text zone and the UI zone. The overall content rhythm is regular but not mechanical: staggered cards give organic entry, but all stagger values are at the micro end of the timing scale, so nothing overstays its welcome. ScrollTrigger fires at `top 80%` of the viewport — elements begin entering early, before the user expects them, which maintains a feeling of readiness rather than delay.

---

## Footer Approach

The footer is approached without fanfare. The final CTA section (dark, full-bleed, centered) resolves the page's persuasion arc, and the footer below it is visually continuous with the dark canvas — same `#062914` background, no divider, no color break. The only visual signal that the footer has begun is the shift from display-scale CTA typography to Inter small-scale link columns. The nav may or may not persist (depending on implementation), but no closing animation marks the footer's appearance. It is utility, not ceremony. The page simply ends: grid of links, copyright line, same forest green field that opened the experience.

---

## Motion Principles

The timing philosophy of deep-signal is **considered precision** — not languid, not snappy, but exactly calibrated. The 0.21s micro-interactions feel faster than they are because the easing curve (`cubic-bezier(0.25, 0.46, 0.45, 0.94)`) accelerates quickly and decelerates smoothly, creating a quality of completion rather than cutoff. The 0.52s entrance animations feel slower than they are because the same curve ensures a clean arrival at rest. The 1.3× duration multiplier applied from the source system (intensity 2 slower twist) means every timed event sits approximately a beat longer than the reference — the system does not rush. Nothing bounces. Nothing overshoots. The `cubic-bezier(0.4, 0, 0.2, 1)` material standard easing used on section entrances reinforces this: it is the easing of certainty, not excitement. For a product selling AI-powered talent verification, the motion vocabulary must match the promise: reliable, precise, without surprises.
