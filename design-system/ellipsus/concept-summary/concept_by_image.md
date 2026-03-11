Looking at the screenshots and extracted design tokens, here is the design analysis:

---

## Visual Identity

The site employs a high-contrast dual-mode palette — a near-black charcoal (`#0c0d0d`, `#1d1e20`) for hero and footer sections paired against warm off-white (`#f4f4f2`, `#fbfbf9`) for content sections, creating a stark rhythmic oscillation as you scroll. Typographically, Roslindale Display Narrow (light weight, 300) anchors all display text with editorial softness, while Manrope handles all UI text — the contrast between this condensed serif and the geometric sans is the site's most distinctive typographic decision. Motion character is understated: keyframe-driven opacity transitions at 0.4–0.5s using `cubic-bezier(0.19, 1, 0.22, 1)` (a fast-out, slow-decelerate) give scroll-triggered reveals a weighted, physical quality.

`★ Insight ─────────────────────────────────────`
The `cubic-bezier(0.19, 1, 0.22, 1)` easing is a classic "ease out expo" curve — objects decelerate dramatically as they land, mimicking physical mass. Ellipsus uses this on scroll-reveal transforms but not on button transitions (which use plain `ease`), creating a two-tier motion system: ambient/structural animations feel more cinematic than micro-interactions.
`─────────────────────────────────────────────────`

---

## Hero Section

The hero is a full-height viewport section with a near-black background (`#282825`/`#0c0d0d`) populated with scattered, low-opacity individual lowercase letters rendered in the same charcoal-gray — forming a typographic texture field rather than a pattern or image. The headline "Write like a human.|" is set in Roslindale Display Narrow at approximately 96px (matching the extracted `h1` token: 96px, weight 300), center-aligned, white on dark. Below it sits a single filled CTA button ("Join for free") in near-black on white with a `border-radius: 8px` — matching the extracted `radius-s: 8px` token — plus a looping cursor-blink animation (`styles_blink__yKBRw`) on the headline's trailing `|` character that runs at exactly 50% opacity steps, emulating a text editor cursor. A purple arrow cursor SVG (`#c455eb`, extracted as `color-brand-purple`) floats decoratively to the right at approximately 1/3 viewport height, injecting the only saturated accent color into an otherwise achromatic hero.

---

## Content Sections

The page alternates between dark (`#0c0d0d`/`#1d1e20`) and light (`#fbfbf9`/`#f4f4f2`) full-bleed sections with no visible dividers — section transitions are purely background-color cuts at hard boundaries. The second screenshot shows a dark "One place for drafts, edits, and discussions" section where display text scales to approximately 80px (matching `h2: 80px, 300 weight`), flanked by hand-drawn line-art illustrations (coffee cup left, desk lamp right) that are positioned beyond the content container's max-width (`1054px`) and allowed to bleed toward the frame edges — giving the section breadth beyond its text column. Below, a 3-column card carousel at the section edge uses `swiper-slide` elements on a blue-tinted background (`#2a6b7c`) with cards at `border-radius: 12px` (matching `radius-m`). Whitespace is generous at section level — extracted spacing shows `section paddingTop/paddingBottom: 80px` — but dense within typography blocks where `p` margins are absorbed by narrow column widths. The hand-drawn illustration aesthetic (origami, book stacks, gear, crumpled paper) appears consistently across content sections as a decorative system, positioned absolutely outside the text grid.

`★ Insight ─────────────────────────────────────`
The illustrations are positioned with `transition: opacity 0.4s linear, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)` — suggesting they scroll-animate into position using JS intersection observers, not pure CSS. The two-part transition (fast opacity fade + weighted transform deceleration) is a common pattern for making decorative elements feel "placed" rather than "appearing."
`─────────────────────────────────────────────────`

---

## Footer Section

The footer uses a full-black background (`#0c0d0d`) — heavier than the dark content sections — with an asymmetric 2-column layout: left column holds the Ellipsus wordmark logo (large, white) above a stacked list of uppercase nav links in Manrope at small scale, all-caps, weight 400, zero letter-spacing variation. The right column contains a single large display quote in Roslindale Display Narrow (~64px, weight 300) with a blinking cursor `|` appended — matching the hero's text-editor motif. A bottom bar carries a row of social icon glyphs (email, Tumblr, Discord, Instagram, TikTok, LinkedIn, Bluesky) left-aligned, with legal links ("TERMS OF SERVICE", "PRIVACY POLICY") centered and a physical address right-aligned — all in small Manrope, uppercase, `color-content-secondary: #64645e`. The footer carries the same visual weight as the hero — it is the second full-bleed dark section, bookending the page and closing the dark/light/dark oscillation.

---

## Design Principles

- **Typographic texture as environment**: The scattered letter field in the hero treats individual glyphs as spatial elements, not text — the alphabet becomes wallpaper. This pattern recurs in the footer quote section.
- **Two-font system with maximum contrast**: Roslindale Display Narrow (condensed serif, editorial weight 300) vs. Manrope (geometric sans, functional weight 400–500) — never a third family. Every typographic decision routes through this binary.
- **Illustration system as a grid layer**: Hand-drawn line-art illustrations sit in a z-layer above the text grid but outside the content container's max-width, decorating the page periphery. They are consistent in style (single-weight white stroke) but not in subject — creating variety within a visual system.
- **Hard-cut section alternation**: No gradients, no bleed transitions, no overlapping sections. Each background switch is a binary cut from `#fbfbf9` to `#0c0d0d` or vice versa.
- **Blinking cursor as motif**: The `|` cursor animation appears in at least three locations (hero headline, footer quote, and a library/landing section) — using the same `styles_blink__yKBRw` keyframe (0→49%: opacity 0, 50→99%: opacity 1). It functions as a brand signature, not a one-off effect.

---

## Distinctive Qualities

**Multi-color nav link hover:** The three navigation items each resolve to a different brand color on hover — coral (`#eb5b55`), purple (`#c455eb`), blue (`#2173be`) — using the site's brand color palette as a per-link identity system. This is unusual: most sites use a single hover color universally.

**Six-video horizontal carousel outside viewport:** The motion-system data reveals 6 video elements positioned at `top: ~3994px` with `left` values ranging from `-2077px` to `+2150px` — a horizontally scrolling panel wider than the viewport (each card at `~809px` wide). All videos are looping, muted, no-controls — suggesting a passive continuous scroll track rather than a user-initiated media player.

**Sprinkle animation system on the cursor SVG:** The purple cursor uses 5 distinct `sprinkle` keyframes (`sprinkle1–5`), each with offset opacity windows that don't overlap — creating a staggered sparkle effect around the cursor where individual points appear and disappear at non-synchronized intervals. This is a non-trivial keyframe composition for a single decorative element.

**Negative spacing tokens as first-class values:** The spacing system explicitly defines negative equivalents for every positive spacing token (`spacing-negative-xxs` through `spacing-negative-jumbo-xl`). This signals that the layout uses deliberate negative margin or positioning offsets as a layout primitive, not a workaround.