## Vesper Grain — Scroll Video Analysis

---

### Scroll Opening

The page loads into total darkness before any content is resolved. The near-black background occupies the full viewport for a beat — a deliberate hold that lets the eye adjust before the caviar grain texture bleeds in from the center outward, its warm charcoal surface materializing at low opacity then settling into full presence. Navigation links do not animate in; they are simply present at the top edge, transparent against the dark field. The effect is one of submersion: you arrive inside the environment rather than watching it construct itself from components.

---

### Hero Experience

The display headline enters at scale — not building letter by letter but arriving as a single mass, the condensed uppercase letterforms slamming into position as if set by a compositor who expected no argument. The text does not fade; it cuts. Supporting copy in the bottom-left resolves a half-beat later in a fade from zero opacity, and the paired CTAs anchor the four corners of the composition. There is no parallax effect on the background texture in the opening state; the grain image holds still while the typographic layer floats above it as a distinct plane. The Montserrat headings — tracked at 0.08em — read with a slightly more airy tension than condensed faces: each letter maintains its own territory, the spacing giving the display type a refined, almost institutional authority.

---

### Section Transitions

Scrolling from the hero into the first product feature split is not marked by any wipe or dissolve — the transition is purely spatial. The grain texture slides off the top of the viewport and the product photography column rises to fill it, already fully resolved. No cross-fade, no scale tween: the new section arrives edge-flush with the previous one, consistent with the straight-horizontal-edge geometry that governs all section boundaries in the design. When the manifesto section enters, the oversized headline moves slightly faster than the viewport scroll speed — a subtle parallax differential that amplifies its visual mass, making the text feel anchored in a layer in front of the page plane rather than embedded within it. The springy easing inherited from the Apple Mac motion system gives any scroll-triggered element a slight physical overshoot — a barely perceptible bounce at the end of its travel that reads as material rather than digital.

---

### Content Rhythm

Individual content elements across the product feature splits enter with a staggered vertical reveal: the photograph column fades and translates upward by approximately 20–24px, followed 80–100ms later by the product name and pricing zone, then the contextual food image. The stagger is short enough that the three columns feel simultaneous at a glance but distinct under attention. Body copy within the conversion section enters as a single block — no per-line animation — with the form inputs fading in at full opacity on a slight delay after the copy has settled. The grid's expanded gutters (2.8em column gaps, 33.6px row gaps) mean each content zone has generous breathing room to arrive into — there is no crowding, no element obscuring another during its entrance. Button padding, widened to 26px horizontal, makes CTAs feel more resolved, more considered as they settle into their resting positions.

---

### Footer Approach

As the footer enters the viewport, no transition animation distinguishes it from the preceding conversion section — both share the same dark background register, and the footer's content simply resolves as the scroll position reaches it. The three-column text grid fades in at low opacity and returns to full presence without translation, consistent with the footer's intent as a typographically quiet close. The centered nav's geometry — 71.5px item spacing, uppercase type — echoes in the footer's columnar link structure: the same commitment to horizontal breathing room persists from top to bottom of the page. There is no closing animation loop, no scroll-to-top prompt with visual decoration; the page simply terminates, the darkness continuing past the last line of copyright text.

---

### Motion Principles

The overall timing philosophy is **languid and deliberate, with a physical undercurrent**. The springy easing curve (`cubic-bezier(0.68, -0.55, 0.265, 1.55)`) inherited from the Apple Mac motion system introduces micro-overshoots that distinguish this design system from purely CSS-smooth predecessors — transitions arrive past their target and spring back, giving even subtle fades a sense of inertia. This is not a bouncy, playful system: the overshoots are small, and the durations are moderate (400–600ms) — they read as material, as if the interface has slight physical weight, rather than as cartoon physics. The dominant motion register of the page is cinematic: controlled, composed, edited. Motion is used as a reveal mechanism rather than a feedback mechanism — it discloses content, it does not respond to user gesture beyond the scroll event itself.

---

### Motion Principles — Summary

| Property | Character |
|---|---|
| Primary easing | Springy overshoot (`cubic-bezier(0.68, -0.55, 0.265, 1.55)`) — physical, slightly bouncy |
| Duration range | 400–700ms for reveals, 300ms for hover states |
| Scroll trigger behavior | Vertical translate + opacity fade, short stagger between column siblings |
| Parallax | Subtle — manifesto headlines move faster than scroll to amplify mass |
| Overall register | Cinematic, deliberate, material — not reactive or performative |
