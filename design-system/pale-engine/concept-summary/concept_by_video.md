# Concept by Video — Pale Engine Motion Direction

## Scroll Opening

The page does not begin — it is already present. On load, the viewport resolves out of darkness: the deep forest green field (#003620) is there before any content, as if the page existed in this state before the user arrived. The G-icon wordmark traces in from opacity zero over 0.6 seconds, using the single easing curve (`cubic-bezier(0.4, 0, 0.2, 1)`), its arrival understated. Navigation links materialize in sequence from left to right at 0.08s stagger intervals — not a dramatic reveal but a quiet activation, the way instrument panels power up one by one. There is no splash animation. There is no loading metaphor. The page simply becomes legible, and the process of becoming is itself the first statement: this infrastructure was always here.

## Hero Experience

The hero is a confrontation with material weight before it is a communication of content. The full-bleed green field takes the full viewport without transition — the user is placed inside the environment rather than shown it from outside. The headline arrives at the bottom-left anchor point 0.3 seconds after load, sliding up 20px and resolving from opacity zero. The placement has directional intention: text rising from below, as if surfacing from the structure it describes. The two CTA buttons resolve last, 0.6 seconds after load, completing the content hierarchy in strict priority order.

This section is a **video background candidate**. The subject should not decorate the message — it should constitute the ground beneath it. A slow overhead drift through dense deep-green forest canopy, viewed from below, with diffused overcast light filtering through leaf layers, renders the #003620 field as living material rather than a flat color. The camera barely moves. The world is already in motion before the user reads a word.

**Video asset:** `hero-bg.mp4` — forest canopy from below, near-imperceptible upward drift, 30s seamless loop. Color range exclusively #003620 (shadow) to #00693e (brightest leaf edge). No sky, no people, no UI. The loop point must be imperceptible at playback speed.

## Section Transitions

Background zones transition through a crossfade triggered at the midpoint of each section boundary rather than at a hard edge. As the user scrolls from deep green hero into the light gray infrastructure section, the background dissolves over 0.3s — not a parallax effect, not a clip path, but a full-field color crossfade that makes the shift feel like pressure releasing rather than a page turning. The curved top edge on each incoming content block reinforces this: the geometry softens what the color is already softening. Each transition between dark and light zones is legible as a breath — the page inhales when it goes dark, exhales when it opens to light.

## Content Rhythm

Individual elements enter the viewport in strict hierarchy: the section headline arrives first, sliding up 20px from opacity zero over 0.5s. The major media surface — product mockup, card grid, or testimonial array — follows at 0.3s delay, fading in without vertical movement (it is already placed; it only becomes visible). Primary CTAs resolve at 0.5s delay. Supporting body copy and secondary elements complete the sequence at 0.7s, appearing last because they reward the visitor who stayed to read. The stagger across sibling elements within a section is fixed at 0.15s. All motion operates on the same easing character regardless of element type — the kinetic voice is singular. Nothing bounces. Nothing springs.

## Footer Approach

The footer's approach is the mirror image of the hero's arrival — the deep forest green returns as the page closes, and the re-entry of that environment is itself the closing animation. As the footer enters the viewport, the five-column link grid materializes column by column at 0.1s stagger intervals, left to right, each column sliding up 15px from opacity zero. The G-icon wordmark appears as the terminal element: it resolves last, full-width, centered beneath the link grid, its arrival marking the close of the designed frame that the hero wordmark opened. The ambient radial glow pulses at 0.3% scale over a 6s loop — barely perceptible, but present. The page does not end. It returns to the state it was in before the user began.

## Motion Principles

The motion philosophy of this system is **declarative latency** — the pace of infrastructure being brought online, not the energy of a product being launched. There is no snappiness here. There is no delight-driven micro-animation. The single easing curve (`cubic-bezier(0.4, 0, 0.2, 1)`) governs every transition from 0.3s hover opacity shifts to 0.75s atmospheric dissolves, and its consistent character creates a unified kinetic voice: smooth entry, settled exit, no overshoot. Duration is the only variable. Background video assets reinforce this — they move at the pace of geological processes, not product releases.

## Video Placements

This system warrants exactly three ambient video placements, each selected because still imagery cannot carry the temporal dimension the section's concept requires.

**Placement 1 — Hero section.** Asset: `hero-bg.mp4`. The hero's design thesis — infrastructure that was always present — cannot be conveyed by a still color field alone. A still field is a choice; a living field is a condition. The forest canopy footage makes the #003620 environment feel like something the user has stepped into rather than something a designer placed there. Specific subject: dense canopy of mature deciduous trees, viewed from below, overcast diffused light, 30s loop with imperceptible loop point. Motion quality: nearly still, 2–3% upward drift over the full duration. Mood: permanent, pre-existing, patient. Duration 30s because the hero is the longest dwell point on the page and the loop must survive extended reading without becoming visibly cyclical.

**Placement 2 — Ecosystem section (dark green gradient background).** Asset: `ecosystem-ambient.mp4`. The Ecosystem section introduces the three-audience market structure against a dark green gradient. A still gradient communicates depth as color; a slowly breathing atmospheric glow communicates depth as space. Specific subject: single soft radial glow, #0d4a35 at center, dissolving to #001a0f at the outer field, with a barely perceptible scale pulse (100% → 100.4% → 100%) on a 6s loop. Motion quality: meditative, sub-perceptible. Mood: the space between content zones, a pressurized interior. Duration 10s because the section requires enough time for the three white card columns to be read in full, and the pulse must not complete more than once during typical dwell time.

**Placement 3 — CTA banner.** Asset: `cta-depth.mp4`. The CTA banner — "Ready to build connections that shape your future?" — is the most emotionally direct moment on the page, and a static brand-color background reads as flat at exactly the moment the copy is asking for something personal. A network-resolve visualization (particles in slow drift crystallizing into a stable node graph) gives the section a sense of becoming — structure forming in real time — that maps directly to the platform's core thesis: trust is built from evidence assembling into a verifiable system. Specific subject: abstract node graph resolving from ambient drift into stable geometric structure, held for 3s, then dissolving back to drift. Motion quality: fluid emergence, not mechanical. Mood: potential becoming actual. Duration 10s because the crystallization narrative requires enough runtime to be legible as a process, not just a state.
