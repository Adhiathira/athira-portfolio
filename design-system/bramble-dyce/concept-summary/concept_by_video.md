# Bramble & Dyce — Concept by Video

## Scroll Opening

The page loads into stillness. No loading animation, no entrance sequence. The hero is static for 0.4 seconds — a deliberate beat that lets the warm cream field and the Cormorant specimen name register at rest before any motion begins. Then, on a slow autonomous clock, the sinusoidal wave SVG divider at the base of the hero begins a very slow lateral drift: the wave shifts its phase position at 0.15px/frame, creating a barely perceptible horizontal tide in the boundary between the hero and the specimen grid below. The page breathes before the user begins to scroll.

## Hero Experience

The hero is a single focal layer: the specimen name as a Cormorant Light display headline (80px, tracking -2.4px), an eyebrow label above (Inter 11px uppercase: "Spring Edition · No. 47"), and a ghost CTA below. There are no floating elements, no gradient motion, no layered shapes. The motion in the hero is entirely at the boundary — the sinusoidal wave SVG below the hero. When the user begins to scroll, the wave accelerates briefly to match scroll velocity, then relaxes as the user continues downward. The hero content itself uses character scatter on load: the specimen name arrives with each letter scattering in from a wide radius (x: ±250px, rotation: ±60deg, scale: 0.3–1.5, ease: back.out(2), duration 0.65s, stagger 0.02s from random). The effect is of the type being set — letters finding their positions from distributed origins, like a compositor's hand placing sorts into a stick.

## Section Transitions

Four transition types are used, each for a specific structural purpose. The sinusoidal wave (amplitude 48px, 18 cycles, full viewport width) marks the boundary between the hero and the specimen grid — its slow lateral drift continues on scroll, making the boundary feel liquid rather than fixed. A scalloped arch SVG divider (12 arches, height 40px) separates the specimen grid from the diagonal process section — the arches evoke the profile of a type bed or a composing rule. The diagonal section itself uses transform: skewY(-2.5deg) with all children counter-rotated at skewY(2.5deg) — the entire section is a tilted plane that creates a hard geometric interruption in the otherwise horizontal page flow. The bento edition-data section arrives with a clip-path iris reveal (circle(0%) → circle(100%), ease: power4.inOut, duration: 1.4s) when it enters the viewport.

## Content Rhythm

All scroll-triggered reveals follow a single rule: elements press in, not slide up. The `press-in` keyframe (scale 1.02 → 1.0, opacity 0 → 1, duration 0.85s) is used for all card and section entry animations. This single shared keyframe enforces a consistent impression-weight rhythm across the page — everything enters as if being stamped into its position rather than floating up from below.

The specimen grid uses scattered assembly: individual cards arrive from dispersed positions across a wide field (x: ±40vw, y: ±30vh, rotation: ±25deg), each landing in its grid cell with power3.out over 1.0s, staggered at 0.06s from random. The effect is of the compositor's cases being distributed across the press bed.

The bento edition-data section presents three counter animations: total prints (e.g., 1,640), active subscribers (e.g., 328), and days to next release (e.g., 47). Each counter runs from 0 to its target with power2.out over 2.2s when the section enters the viewport.

The process section features an SVG stroke draw animation on an architectural line illustration of the press mechanism: the path's full length is measured (getTotalLength()), set to strokeDasharray, and animated from strokeDashoffset = full length to 0 with scrub: 2 as the user scrolls through the section. The illustration draws itself at the pace of reading.

## Footer Approach

The footer arrives without animation — a clean neutral closure. The Cormorant wordmark at left, four navigation links in Inter 11px uppercase center, and a provenance line at right: "Established 2019 · Mainland, Orkney". The footer's stillness is deliberate — the motion vocabulary of the page (character scatter, scattered assembly, sinusoidal wave, iris reveal) does not extend into administrative territory.

## Motion Principles

The motion vocabulary has one register: deliberate. Nothing moves faster than it needs to. The character scatter on the hero headline is the only moment of rapid, wide-radius motion — it establishes kinetic range and then the rest of the page operates at a slower pace. Scroll-triggered reveals use a single shared keyframe (press-in). Section transitions use SVG organic shapes that drift at ambient pace. The overall effect is of a craftsperson working: intentional, unhurried, precise.

**Additional GSAP Techniques:**

**Technique: SVG feTurbulence paper displacement on specimen scans**
On hover of each specimen card: a `<filter>` with `<feTurbulence baseFrequency="0.04" numOctaves="3" result="noise"/>` and `<feDisplacementMap in="SourceGraphic" in2="noise" scale="24"/>` is applied to the specimen image. On hover entry, `gsap.to(feTurbulence, {attr:{baseFrequency: 0.04}, duration: 0, onStart: () => img.style.filter = 'url(#paper-warp)'})` activates the displacement; on hover exit, `gsap.to(feTurbulence, {attr:{baseFrequency: 0}, duration: 1.1, ease:'power3.out', onComplete: () => img.style.filter = 'none'})` smoothly collapses the distortion. The effect reads as the specimen print being picked up from the press bed — a brief material deformation resolving into flatness as the finger lifts.

**Technique: Parallax stack in the process section**
The process section uses three layered elements at different parallax depths: the paper-grain ambient video (background, scrub: 2.0), the SVG press-mechanism line drawing (mid, scrub: 1.5), and the text column (foreground, scrub: 1.0). Implementation: `const layers = [videoEl, svgEl, textEl]; const depths = ['-50%', '-25%', '-10%']; layers.forEach((el, i) => gsap.to(el, {y: depths[i], scrollTrigger:{trigger: processSection, scrub: 2 - i*0.5}}))`. This creates the impression that the process section has physical depth — that the viewer is moving through the press room rather than scrolling past a flat page.

**Technique: Lenis-synchronized sinusoidal wave drift**
The hero-base sinusoidal wave SVG animates its `d` attribute using a custom ticker that reads Lenis scroll velocity. When Lenis velocity is near zero (page at rest), the wave drifts slowly on its own clock (phase += 0.0008/frame). When Lenis velocity increases on scroll, the wave amplitude scales proportionally (amplitude = 48 + Math.abs(velocity) * 120, clamped to 80px max). Implementation in the Lenis raf loop: `function raf(time) { const vel = lenis.velocity; updateWavePath(vel); lenis.raf(time); requestAnimationFrame(raf) }`. The wave communicates scroll state as a physical phenomenon — the tidal metaphor completing the Orkney context.

## Video Placements

**1. Process Section — Letterpress impression in motion**
- Suggested file: `press-impression.mp4`
- Subject: Close-up of a letterpress platen closing onto an inked type forme on uncoated cotton stock — the moment of impression from approximately 20cm above, showing the ink transferring to the paper surface; hold for 2 seconds after impression, then pull back to reveal the finished print; neutral warm-light studio lighting; no text on screen except what is being printed; 8–10s loop
- Duration: 8–10s loop
- Placement: Full-width (4/12 columns on the left in the 7/5 editorial split in the process description section) — the video plays behind a semi-transparent bone overlay (#ede8e1 at 0.7 opacity), allowing the print detail to read through the text column. The physical quality of the ink-on-paper moment is the single best argument for what Bramble & Dyce is — no static photograph of the same moment can communicate the pressure and timing of the impression.

**2. Specimen Grid — Paper texture ambient loop**
- Suggested file: `paper-grain-ambient.mp4`
- Subject: Macro close-up of uncoated cotton letterpress stock in extreme slow drift — camera at 3mm above the paper surface, moving laterally at 0.5mm/second, showing the tooth and grain of the stock under warm raking light; no text, no specimens, no color except warm white and shadow; 12s loop
- Duration: 12s loop
- Placement: Used as the background texture layer for the hero section — positioned behind the specimen name headline at very low opacity (0.12–0.18), providing a tactile surface quality that communicates the substrate of the prints without competing with the display typography. A static image of paper texture reads as stock photography; a slow-drift macro video of the actual cotton stock used for the editions communicates material specificity.

**3. Subscribe Section — Specimen being placed in glassine envelope**
- Suggested file: `specimen-packaging.mp4`
- Subject: An overhead view of a freshly printed specimen (the current season's release) being folded into an archival glassine envelope and placed in a slim kraft board mailer — hands visible (wearing white cotton gloves), movements deliberate; no voiceover; warm studio light; neutral bone-colored work surface; 6–8s loop
- Duration: 6–8s loop
- Placement: Right panel (5 columns) in the subscribe section's 7/5 editorial split — the text column left describes the subscription process and edition terms, while this clip plays silently on the right, communicating the physical care of the packaging. The subscriber is not just receiving a print; they are receiving an object that was handled with this precision.
