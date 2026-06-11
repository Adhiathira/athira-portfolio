## Visual Identity

The palette resists easy categorization: it is neither the aspirational minimalism of luxury DTC nor the maximalist signal of streetwear — it sits in a third register that might be called *working warmth*. The cream field (`#f0ece0`, luminance 235) is not neutral; it has pigment in it, the particular warmth of paper that has been touched. Against it, the golden amber accent (`#f4b30c`) does not read as brand color but as something extracted from the material — egg yolk, beeswax, the patina on a brass instrument key. The near-black body text (`#1a1200`) has a brown undertone that prevents the contrast from reading as digital binary. This is a palette that implies craft without performing rusticity.

Typography splits between **Anton** (condensed, uppercase, 75px, weight 400) for display headings and **Poppins** (geometric sans, weight 400/600) for all body and UI text. The Inter type system assembled here — with a `+0.06em` letter-spacing injection at intensity 3 — introduces open tracking that shifts the heading register from tight condensed urgency to a lapidary, inscribed spacing: each letter held at deliberate distance from its neighbor, as if cast in metal and set by hand. At 42px/46px line-height with 0.06em tracking, the h1 takes on the quality of a foundry block proof — heavy, spaced, authoritative.

`★ Insight ─────────────────────────────────────`
The Anton/Poppins pairing is a deliberate contrast strategy: Anton was designed for ultra-condensed newspaper headlines and carries an urgency that Poppins (designed for pan-South-Asian readability) softens. The two fonts occupy completely different emotional registers, and the tension between them is intentional brand energy. The 0.06em tracking at heading level works against Anton's natural compression — the two pressures (condensed letterform vs. open spacing) create a typographic surface that holds its own compositional tension.
`─────────────────────────────────────────────────`

---

## Hero Section

The hero doesn't arrive — it erupts. The full-height, full-bleed green field (`#09543d`) functions as a launch pad: the oversized cartoon hands surge in from the left and right viewport edges simultaneously, bleeding past the frame boundary before the eye has settled. The headline loads in sequence — a small Poppins label drops first, then the three-line Anton stack charges down at 75px / 69.75px line-height (a 0.93 ratio, tighter than golden proportion but looser than unit spacing), the final two lines detonating into the inline pink color block (`#ffa9e9` background, `#461e10` text) mid-read.

**Spatial tension:** the asymmetric container padding (65px left / 89px right) introduces a 24px rightward bias that the hero headline never quite resolves — the text column leans slightly off-center against the illustration elements, creating a compositional pressure that prevents the hero from settling into symmetry. The two pill CTAs — `border-radius: 100px`, 20px horizontal padding after the spacing twist — sit below as a bracketed pair, their expanded cushion making them feel physically pressable rather than merely labelled.

The GSAP character scatter on the hero heading: `ease: 'back.out(1.7)'`, stagger `0.03s`, characters arriving from `x: gsap.utils.random(-200, 200)` and `rotation: gsap.utils.random(-45, 45)`. At 0.03s stagger across a 42px/700-weight heading, the assembly takes approximately 0.8–1.2s total — fast enough to read as a single event, slow enough that each character's individual path registers. The spring easing (`cubic-bezier(0.68, -0.55, 0.265, 1.55)`) matches the motion system's assembled easing, so the character arrivals feel native to the page's temporal register rather than imported.

---

## Content Sections

Below the hero, sections shift to `#fffdf7` (warm off-white) as the ambient background with `white` (`#ffffff`) used for elevated card and form surfaces — a two-level surface hierarchy without hard dividers. The card surface has a specific tactile quality: the `border-radius: 30px` mirrors the corner of a well-worn index card or a matte-laminated print piece — not a digital softness convention, but something that suggests a physical object with heft and edge. The 24px card padding creates the breathing room of a gallery label: the whitespace is structural, not residual.

**Grid proportions:** the 12-column benefits grid at 1220px container width produces column units of approximately 85px (1220 − 130px container padding) / 12 ≈ 91px per column unit. At 65px/89px asymmetric padding, the reading column carries more weight on its right flank — this is not a golden ratio grid (1:1.618) but closer to a 1:1.37 ratio between left margin and right, which reads as deliberate without announcing itself. The 40px column gap at 4-column grid width gives each column a gutter of roughly 44% of a column unit — wide for an editorial system, creating the open-field quality of a broadsheet rather than the tight columns of a UI data table.

**Negative space pressure:** the 222px section top padding (from the spacing system's +32px breathing room twist) creates a 222px empty zone above each section's content — enough vertical space that the content appears to float in the lower half of the section, the whitespace above functioning as weight rather than absence.

`★ Insight ─────────────────────────────────────`
The 30px border-radius applied consistently to cards, containers, article elements, and hero zones creates a design system "shape token" — a unified roundness language that makes disparate components read as a coherent family. The CTA radius at 100px (pill) versus the card radius at 30px creates a two-tier roundness hierarchy: pill = action, rounded-rectangle = content. These two values cover the entire component library.
`─────────────────────────────────────────────────`

---

## Footer Section

The footer operates as typographic silence: six Poppins links in a single centered row, two lines of legal copy, off-white field. No colored surfaces, no logo, no CTAs. The visual weight is near-zero — the terminal zone is designed to exhale. But the two full-width dark green (`#09543d`) CTA cards immediately above absorb all remaining conversion pressure, functioning as a chromatic full stop before the footer's release. The contrast is structural: the page's highest-energy surface (dark green, large type, CTAs) sits immediately above its lowest-energy surface (the footer), and the cut between them — a hard edge rather than a gradual fade — makes the transition feel like a page turn rather than a scroll.

---

## Design Principles

- **Two-font, two-register system**: Anton for announcement (uppercase, condensed, 75px) and Poppins for communication (geometric, readable, 14–36px). Heading tracking at 0.06em works counter to Anton's native compression, creating a lapidary spacing that slows the headline's visual momentum.
- **Color as structure, not decoration**: `#09543d`, `#ffa9e9`, and `#fffdf7` are zonal rather than accent — each color occupies defined page regions (hero background, action elements, body field). The amber accent `#f4b30c` appears only as action signal and border material.
- **Uniform roundness token**: `border-radius: 30px` for content surfaces, `border-radius: 100px` for action elements — two values, full component coverage.
- **Asymmetric container bias**: 65px left / 89px right padding creates a rightward lean that never fully resolves, keeping the layout in productive compositional tension.
- **Springy-mechanical timing**: `cubic-bezier(0.68, -0.55, 0.265, 1.55)` at 0.45s base duration — not organic, not digital smooth, but mechanical: each element overshoots, rebounds, settles.

---

## Motion Character

**Mechanical / clockwork.** This design does not flow — it clicks. The springy easing (`cubic-bezier(0.68, -0.55, 0.265, 1.55)`) gives every transition a spring-loaded arrival: elements overshoot their target position by a small, precise amount and snap back, like a typewriter key returning to rest or a precision instrument's pointer settling after deflection. The 0.45s base duration is unhurried — not languid in the organic sense but deliberate in the mechanical sense, a duration that implies the motion has inertia and mass rather than computational immediacy. The 0.15s stagger step creates sequences that feel gear-driven: each element triggered by the previous one's completion, a cascade of mechanical actions rather than a single digital event. The overall kinetic character is that of a well-maintained analog mechanism — precise, slightly weighted, satisfying in the small click of each completed motion.

---

## Distinctive Qualities

The most distinctive decision is the **open heading tracking against condensed letterforms** — the 0.06em letter-spacing injected at intensity 3 into the Inter type system works counter to the natural compression pressure. This is not a conventional pairing; most designs that use condensed display type tighten tracking to emphasize the letterform density. Here the tracking is opened, slowing the headline's visual tempo and giving each glyph room to breathe — the typographic equivalent of a measured stride rather than a sprint.

The **asymmetric container** (65px/89px) is the grid system's most consequential choice. The 24px differential creates a reading field that leans right, placing the content slightly off-axis from the visual center. At desktop width this is subliminal — the user does not consciously notice the imbalance but experiences a slight directional pull that prevents the layout from feeling inert. This is a technique from print design (particularly Swiss grid systems that favored asymmetric margins) applied to a screen context where it is relatively rare.

The **springy motion easing** applied uniformly to all transitions — not just playful elements, but navigation, content transitions, and layout shifts — creates a design where even functional interactions have physical character. A nav item hover resolves with a spring. A card entering the viewport rebounds at its final position. This consistency means the site's temporal register is coherent rather than mixed: every interaction belongs to the same mechanical vocabulary.
