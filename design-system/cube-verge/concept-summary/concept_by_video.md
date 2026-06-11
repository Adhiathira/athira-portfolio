# Motion Direction — Isometric

## Scroll Opening

The page arrives unbuilt. On load, the viewport is empty — the background plane is present but all content is absent. Then assembly begins: cube faces slide in from their respective isometric source angles simultaneously, as if a diagram is being drawn on a drafting table in real time. The top face descends from above at 30°, the front face slides in from the lower-left, the side face pushes in from the right — each arriving on its own vector, converging at the structural node. The effect is of an engineering illustration constructing itself, not of content fading into view. The nav bar clicks into place last, 240ms after the hero assembly completes. The opening is mechanical, precise, and deliberate.

## Hero Experience

The hero hosts a large isometric city or architecture illustration that occupies the right two-thirds of the viewport. On load, cube elements within the illustration bob gently on their y-axis — a slow, continuous oscillation of 4px amplitude over a 3s cycle, staggered by 200ms between adjacent elements. The effect is of a model under slight seismic tremor: present, alive, structurally sound but not static. Alternatively, for the video-backed variant, the illustration plane slow-rotates over a 20s cycle — the axonometric camera position orbiting the scene, keeping the 30° projection constant. Text in the left column holds absolutely still against this ambient motion, which is the compositional argument: the structure moves, the language does not.

**Video placement: `iso-city.mp4`** — slow rotation or gentle y-axis bob of an isometric city illustration, dark background, 12s loop. Video serves this section because the static isometric illustration communicates structure but not scale — only motion can convey that this is a world rather than a diagram.

## Section Transitions

Sections do not fade. Each section assembles. As a new section enters the viewport via ScrollTrigger, its geometric components click into place in sequence: base plane first, then vertical elements, then surface content last. The timing is a 200ms interval stagger between each structural layer. The easing is `cubic-bezier(0.4, 0, 0.2, 1)` throughout — a curve that begins with measured acceleration and arrives with mechanical precision, no overshoot, no spring. The total assembly duration per section is 600–800ms. A viewer who watches carefully will see the build order; a viewer who doesn't will simply register that the section is present and complete.

## Content Rhythm

Cards enter from their isometric source angle — each card slides in at 30° from the direction it would occupy in the isometric grid. A card in the left column slides from the lower-left on its isometric vector; a card in the right column arrives from the lower-right. The displacement is 40px along the isometric axis before settling to position. Stagger between cards in a row is 200ms — three cards in a row assemble over 600ms total. The effect is not of cards appearing but of cards arriving from their structural origin, as if the grid is drawing them toward their assigned position in the composition.

Images within cards do not fade in separately — they are revealed by the card face assembling over them, as if the top face is the lid of a container whose contents are disclosed by the build sequence. This preserves the cube face hierarchy logic at the micro-scale of individual card components.

## Footer Approach

The footer is the final isometric plane. As it enters the viewport, a single large ground-plane tile slides in from the bottom at the isometric angle — the darkest surface in the composition descending into position like the base plate of a scale model being set down. The footer content — link columns, copyright — resolves within this plane at 200ms after the base tile locks. The hard offset shadow beneath the footer plane is the last element to appear, sliding in from the lower-right at 400ms, confirming that the composition has found its ground.

## Motion Principles

**Mechanical, precise, staggered.** The base interval is 200ms between structural layers — fast enough to read as assembly rather than reveal, slow enough to preserve the sequence logic. No animation bounces, no element springs past its destination. The `cubic-bezier(0.4, 0, 0.2, 1)` easing curve is applied universally: it is the easing of a component being fitted into a machine, arriving at tolerance without drama. Linear easing is used only for continuous ambient animations — the y-axis bob, the slow rotation — where the absence of acceleration is the point.

All animations use `transform` exclusively. No layout properties animate. The reduced-motion media query collapses all assembly durations to 1ms — the final composed state is the same, only the build sequence is suppressed. Hardware acceleration is non-negotiable: isometric compositions involve many simultaneous moving elements, and paint performance must be maintained at all viewport sizes.

## Video Placements

### 1. Hero — `iso-city.mp4`
**Section:** Hero background or hero illustration
**Subject:** Slow rotation or gentle y-axis bob of an isometric city illustration — buildings, infrastructure, and technical elements rendered in flat-coloured axonometric planes. Dark background, 30° projection maintained throughout. Cube elements oscillate at staggered intervals.
**Motion quality:** Slow, ambient — nearly a still image with breath. Rotation over 12–15s if orbiting, 3s bob cycle if oscillating.
**Duration:** 12s loop, seamless
**Why video over still:** The isometric city as a still image communicates structure; as a video, it communicates scale and inhabitation. The slow motion implies that this is a living system, not a diagram.

### 2. Features / Showcase — `iso-assembly.mp4`
**Section:** Product features or capabilities showcase
**Subject:** 3D cube elements assembling themselves step by step — faces sliding in from their axonometric source angles, building a complete isometric structure over 6 seconds. The assembly is precise and mechanical: each face arrives on its correct vector, locks into place, and the next face begins. Loop seamlessly.
**Motion quality:** Mechanical, staggered — 200ms between each face, linear within each move, sudden lock at destination
**Duration:** 6s loop
**Why video over still:** The assembly sequence demonstrates the design system's core spatial logic — cube face hierarchy — in real time. A still image shows the completed structure; the video shows how it is built, which is the system's argument about precision and construction.

### 3. About / Editorial — `iso-wireframe.mp4`
**Section:** About section, philosophy statement, or editorial context
**Subject:** Rotating wireframe cube grid — a technical blueprint of isometric geometry, white or pale lines on dark background, slowly rotating in 3D while maintaining the 30° projection reference. The wireframe reveals the underlying grid system that governs every element in the design.
**Motion quality:** Slow continuous rotation — 8s per full revolution, constant speed, no easing. The absence of easing is deliberate: it communicates a system under inspection, not a product in motion.
**Duration:** 8s loop
**Why video over still:** The wireframe is the design system's structural argument made transparent. As a still image it is a diagram; as a rotating video it becomes a demonstration of the spatial logic governing the entire composition — the isometric tile system made visible at its most abstract.
