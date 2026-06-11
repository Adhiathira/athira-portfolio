# Motion Brief — Seedkeep: Heritage Seed Library & Botanical Nursery

## Global Motion Principles

- **Timing base**: 0.75s — contemplative, unhurried, meditative
- **Easing**: `cubic-bezier(0.25, 0.1, 0.25, 1)` everywhere — smooth and organic, like natural growth
- **Tone**: Reverent, tactile, archival. Motion should feel like watching a time-lapse of germination — continuous, patient, profoundly purposeful
- **Ink reveal**: Animations reveal content as if ink is spreading through paper (clip-path left-to-right wipe)
- **Parchment fade**: Key transitions include a warm sepia-to-full-color dissolve

---

## Scroll Opening (Page Load — Ink Unfold Effect)

**Duration**: 1.0–1.3s total

**Sequence**:
1. (0–0.2s) Warm cream background appears. A fine hairline rule sweeps top-to-bottom at slow pace, like ink bleeding through paper.
2. (0.2–0.6s) Navigation logotype (Cormorant Garamond) fades in with slight rise (`translateY(8px → 0)`) and ease-out curve.
3. (0.6–1.0s) Hero headline (Cormorant Garamond 90px italic) fades in with gentle rise, letters appearing as if written by a hand drawing in ink. Simultaneous watercolor wash background enters beneath the headline.
4. (0.8–1.2s) Botanical illustration field fades in with subtle saturate filter animation — colors blooming from desaturated to full richness over 0.8s.
5. (1.2s+) CTA buttons scale in `scale(0.95 → 1.0)` with ease-out, settling with a subtle shadow arrival.

**Visual effect**: The page awakens like a hand-watercolored botanical plate being revealed. The warmth and knowledge emerge together.

---

## Hero Experience

**Primary video asset: botanical-unfold-loop.mp4**

The hero media field is a **full-bleed 50-second ambient video loop** of living botanical specimens:
- Extreme macro cinematography: seed pods unfurling, water droplets on leaf surfaces, soil particles catching light
- Gentle camera micro-movements (1–2px/s parallax shifts) suggesting the lens is breathing
- Natural light: golden-hour sunlight filtering through foliage, creating depth and texture
- Time-lapse elements: flowers opening at accelerated pace, suggesting growth without jarring motion
- No cuts. No transitions. Seamless loop feeling like continuous observation

Color palette: earth tones, sage greens, cream whites, subtle golden light. No saturation boost — everything is natural pigmentation.

**Interactivity**: On mouse hover over seed variety cards, the corresponding botanical illustration in the hero region receives a subtle localized brightness effect (brightness 1.0 → 1.08, 100ms duration) as if a hand is touching the specimen.

**Static state**: The warm-field control zone (nav + headline) does not animate after load. It is stable — the archival frame around the living botanical world below.

---

## Section Transitions

### Hero → Heirloom Varieties Section

**Trigger**: Scroll or CTA click.

**Duration**: 0.8–1.0s

**Sequence**:
1. (0–0.3s) A pale warm-gray wash blooms across the viewport — a subtle tonal shift that obscures the hero botanical field beneath.
2. (0.3–0.7s) Cream background transitions to very slightly warmer tone. Hero botanical media fades to 40% opacity.
3. (0.7–1.0s) New section fades in (ease-out) with heirloom seed variety cards entering in a staggered sequence (0.12s stagger).
4. Throughout: A thin horizontal rule (1px, opacity 0.3) sweeps bottom-to-top, like a page turn in an archival catalog.

### Content Section → Content Section

Soft opacity fade (0.5s) as section enters viewport center. Background color shifts (cream → warm gray → cream) are the only explicit boundaries. Any SVG illustration elements in section headers animate via `stroke-dasharray` — paths drawing themselves over 0.8s.

---

## Content Rhythm

### Per-Element Entrance (Scroll-Triggered via Intersection Observer)

**Stagger**: 0.12s between elements

- **Headline (Cormorant Garamond italic)**: Fades in (0–0.6s) and rises (`translateY(12px → 0)`) with ease-out-cubic.
- **Body copy (EB Garamond)**: Fades in (0.12–0.52s) with no rise — pure opacity, as if text is appearing on the page like reading a manuscript.
- **Botanical illustrations**: Fade in (0.2–0.8s) with simultaneous color bloom (desaturated → full saturation over 0.6s) using CSS `saturate()` filter animation.
- **Seed variety cards**: `ink-blot` entrance (scale 0 rotate(-5deg) → scale 1 rotate(0deg), 0.75s organic easing). Each card is a specimen materializing from the archive.
- **CTA buttons**: Fade in (0.25–0.65s), rise, then brief shadow pulse (shadow grows 0 → full → settled over 0.3s) to signal interactivity without breaking the contemplative tone.

**Easing**: `ease-out-sine` for fades. `ease-out-cubic` for rises. Combined they create a natural, unhurried rhythm matching plant growth cycles.

---

## Footer Approach

As the user scrolls toward the footer, the page **gradually warms and desaturates** over 2–3 seconds of scroll distance. By the footer, the cream background shifts to a richer ochre tone and all colors fade to gray-brown, as if the botanical world is settling into seed dormancy.

The footer itself: Cormorant Garamond logotype in black, EB Garamond subtext in muted gray, all text at 70% opacity. A restful state. The knowledge is preserved.

Any hover over footer CTAs: drawn-in underline appears instantly (0.3s ease-out) — the archive is still accessible. The user can scroll back up to explore further.

---

## Motion Principles

- **Base timing 0.75s** — never faster than 0.3s (unless micro-interaction), never slower than 1.2s
- **Easing: `cubic-bezier(0.25, 0.1, 0.25, 1)`** everywhere — organic curve for botanical patience
- **No snap/instant transitions** — all state changes bloom like watercolor
- **Ink reveal (`clip-path`) on all major entrances** — the signature animation of the system
- **Saturation bloom on illustrations** — grayscale → rich color transitions communicate bringing botanical knowledge to life
- **Reduced motion**: when `prefers-reduced-motion: reduce`, all animations disabled; illustrations remain at full saturation

---

## Video Placements

### 1. Hero Video — `botanical-unfold-loop.mp4`
- **Section role**: Full-viewport hero background, primary sensory anchor into the botanical world
- **Subject**: Macro cinematography of botanical specimens in extreme detail — seed pods unfurling, water droplets on petals, soil particles catching golden light, foliage with visible vein structure. Golden-hour natural light. Gentle micro-parallax drift (1–2px/s) suggesting the lens breathing. No cuts. Seamless loop.
- **Motion quality**: Continuous ambient observation. 60fps. 50–60 second loop. Color grading: warm, natural earth tones, no saturation boost.
- **Duration**: 50–60 second loop
- **Why video**: A botanical illustration is knowledge frozen in time. A macro video of living plants is *knowledge being born*. The continuous, unhurried cinematography communicates that this platform values observation and patience over speed and transaction.

### 2. Hands & Heritage — `hands-in-soil-loop.mp4`
- **Section role**: Mid-page "Heritage Stories" or "Cultivation Wisdom" section, full-width above or beside growing guide cards
- **Subject**: Hands demonstrating botanical craft — fingers opening seed pods, hands planting seeds in dark soil, hands patting earth around seedlings, fingers holding heirloom seed packets with handwritten labels. Close-up work photography. Natural window light. Texture-focused: soil particles, worn hands, aged paper seed labels.
- **Motion quality**: Documentary craft film. Slight grain. 24fps. Slow, deliberate movements (2–4s per action). Warm color grade: amber, ochre, shadows in cool gray-brown.
- **Duration**: 45–60 second loop
- **Why video**: This section celebrates botanical curation as a human craft. The visible hands and soil — the physical engagement with plants — positions the platform as a knowledge steward, not an algorithm. This is knowledge that humans *do*, not just know.

### 3. Seasonal Time-Lapse — `garden-cycle-loop.mp4`
- **Section role**: "Seasonal Calendar" or "Year in Growth" section, lower mid-page
- **Subject**: Heavily time-lapsed botanical garden over a growing cycle — bare spring soil → seedling emergence → flowering → seed set → frost dormancy. Wide landscape view of a heritage garden bed. Plants in succession: early-spring bloomers → late-summer heirloom varieties → frost-covered seed heads. No human activity. Pure botanical movement.
- **Motion quality**: True time-lapse. 5–8fps playback from 1-frame-per-hour capture. Overcast light for consistent diffuse tone. Loop at seasonal reset point.
- **Duration**: 50–70 second loop
- **Why video**: The compressed time-lapse reveals the full botanical journey — dormancy to emergence to seed set — in the span of a cup of tea. It communicates seasonal stewardship and the patient knowledge required to work with plants across their full life cycle.
