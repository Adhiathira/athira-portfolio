# Image Generation Prompt — about-problem-image

**Asset slot:** Section 2 right column atmospheric image
**Suggested filename:** `problem-state.jpg`
**Pixel dimensions:** 1200 × 900px
**Aspect ratio:** 4:3
**Placement:** 60% right column of the About page asymmetric split section ("The Problem Earned")

---

## Generation Prompt

**Paste directly into Nano Banana:**

Subject: A lone video editor hunched over a cluttered workstation in a dark, cramped room — single monitor glow as the only light source, timeline scrubber visible on screen, stacks of hard drives and cables suggesting years of slow accumulated work, figure positioned lower-left of the frame occupying roughly one-third of the composition
Composition: Asymmetric — subject anchored lower-left, upper-right two-thirds given to oppressive darkness and the faintest suggestion of wall texture; negative space feels heavy not open; no horizon line visible, the frame closes in
Depth of field: Shallow — the monitor and nearest hard drives sharp, the figure slightly soft, the background walls dissolving entirely into grain and shadow
Lighting: Single source — the monitor's cold blue-white glow emanates from in-frame, casting long downward shadows on the editor's face and hands; no fill light; no ambient; the room is otherwise complete darkness; colour temperature approximately 5500K — clinical, not warm
Colour palette: dominant #1a1a1a (the surrounding darkness — floor, walls, ceiling all collapse into this), mid-tone #2d2b28 (the warmth of the desk surface and aged wooden chair), accent #d4c9b4 (used only in the monitor screen glow as a narrow warm fringe — suggests aged paper or overexposed film on screen edges — not a dominant tone), shadow #111111 (areas where no light reaches at all)
Texture and finish: Film grain — heavy 35mm documentary grain throughout; matte finish; no sharpening; slight halation around the monitor light source; the image should feel like a still from a long-form documentary about solo creative labor; photorealistic
Aesthetic register: Documentary editorial — the register of a still from an independent film about a craftsperson working alone; heavy, textural, quietly melancholic; feels extracted from the product itself (darkness as palette) rather than designed; the atmosphere is "slow pour — unhurried, deliberate, weighted" per the caspers-caviar design system concept — applied here to the weight of solitary creative work, not luxury
Negative prompt: stock photo look, HDR glow, unnatural oversaturation, colours not in the palette (#f5f0e8 #e8e2d8 #9e9588 should NOT appear prominently — those are text colors, not image colors), lens flare, heavy vignette, bright background, multiple people, cheerful lighting, clean desk, modern open office, neon signs, RGB keyboard lighting, any colours outside #1a1a1a / #2d2b28 / #3a3530 / #d4c9b4 / #111111

---

## Design System Derivation Notes

- **Emotional tone (concept.md):** "Heavy, textural, and quietly opulent... moves like a slow pour — unhurried, deliberate, weighted." Translated here to the heaviness of solo video production as oppressive rather than luxurious — same palette vocabulary applied to a problem state.
- **Colour meaning (concept.md):** "#2d2b28, #3a3530 derived directly from the caviar photography... warm near-black browns." Used here as desk/chair surfaces — the same material warmth that makes the design system feel tactile, now applied to an environment of constraint.
- **Palette constraint:** Dominant #1a1a1a. The accent parchment #d4c9b4 appears only as the monitor screen's warm fringe — mirroring the design system rule that #d4c9b4 "appears only on CTA arrow links" — here it is the one visible trace of creative aspiration in an otherwise closed frame.
- **Grid signal (grid.json):** 12-column dense grid → rich documentary scene, editorial density, not a single-subject minimal frame.
- **Texture (concept.md):** "photography as the design system" — the image must feel extracted from the same material world as the UI, not dropped in from a different world. Film grain serves the same role as the caviar photography's warm-black tactility.
- **Register (concept.md):** "closer to a candlelit private dining room than an e-commerce storefront" — this image inverts that register deliberately: the problem state is the opposite of warmth and ceremony, but uses the same vocabulary (darkness, single light, texture) to make the inversion land.
