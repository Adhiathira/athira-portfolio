# Pale Circuit — Concept by Video

## Scroll Opening

The page loads on white silence. No immediate animation — the nav resolves first, its uppercase Archivo letterforms materializing at full opacity before anything else. Then the hero content rises: headline text fading up from 20px below its final position, the motion unhurried (0.254s base duration), the spacing between characters opening as if the type is expanding into its own breath. The scroll cue appears last, a single downward pulse that disappears once the user initiates scroll.

## Hero Experience

The hero section earns video. The brand's technical register and the open 1440px grid call for something that demonstrates scale and craft simultaneously — not product demonstration, but ambient proof of intent. The hero video should show precision manufacturing at a distance: circuit assembly, instrument calibration, or clean-room fabrication, shot with shallow depth-of-field so the background dissolves into soft bokeh while the foreground process stays sharp. 10-second loop, no cuts within the loop. The violet-blue tones in the brand palette should find their echo in the video's lighting — a UV-tinted manufacturing floor, LED array glow, or spectrographic readout. The hero overlay is light (0.15–0.2 opacity white wash) so the video reads clearly against the white-dominant palette.

## Section Transitions

As the user scrolls past the hero, sections enter through gentle y-translate reveals — each major heading rising 20px into position over 0.254s, body text following at a 0.1s stagger delay. The dark navy section (#0D1B3E) enters as a hard cut: no fade, just the sudden field change, which reads as a structural beat in the page's rhythm. Elements within the dark section reveal themselves against the deep field — white text emerging from darkness, the violet accent appearing as a live signal.

## Content Rhythm

Individual content cards use a scale-and-rise pattern: `scale: 0.95, y: 24px` entering the viewport, resolving to `scale: 1, y: 0` over 0.338s with a 0.12s stagger between sibling cards. Feature rows use a horizontal sweep from left (`x: -50px`) for the heading, with the accompanying body copy rising vertically (`y: 30px`) on a slight delay — creating a sense of the layout assembling itself. The motion is measured throughout, never rushed — the 1.3× duration scaling from the motion system gives every entrance a considered quality, as if each element has waited its turn.

## Footer Approach

The footer enters without announcement — the spacing-system's generous 41px padding-top creates a visible breath before the footer content, which resolves at page-end opacity. No theatrical reveal; the footer simply arrives, complete and composed. If a contact CTA is present, it enters first, the violet-blue button appearing at full opacity while the surrounding text follows at a 0.15s delay.

## Motion Principles

The overall timing philosophy is measured over mechanical. The 1.3× duration scaling from the pale-draft motion source creates a tempo that reads as deliberate rather than slow — animations that feel as if they were timed by someone who has decided exactly how long each transition should take, and isn't in a hurry to be done. Easings favor `ease-out` for entrances (decisive, landing with authority) and `ease` for hover states (bidirectional, equally responsive on approach and retreat). No spring physics, no bounce — the precision aesthetic demands linear-to-eased progressions that feel engineered, not playful.

## Video Placements

**1. Hero — full-bleed ambient video background**
- Section role: primary hero, the page's opening declaration
- Suggested asset filename: `hero-bg.mp4`
- What the video shows: precision manufacturing environment — circuit board assembly line, clean-room fabrication, or instrument calibration bench. Macro lens, shallow depth-of-field, slow lateral camera drift (not static, not handheld — controlled mechanical movement). Blue-violet ambient lighting echoes the brand palette. 10-second loop.
- Duration: 10s — the hero needs temporal depth to justify the full-bleed treatment; a quick loop would feel restless against the measured pace of the rest of the site
- Why video over still: the brand's proposition is precision infrastructure. A still image shows a moment; the slow ambient video shows a process — which is what the brand actually sells. The continuous motion communicates that the system behind the interface is always working.

**2. Feature showcase — ambient technical process loop**
- Section role: mid-page product story or capability showcase
- Suggested asset filename: `process-ambient.mp4`
- What the video shows: close-up of data visualization or interface interaction, shot as a seamless loop — a dashboard refreshing, a trace resolving, a signal propagating across a display. High-contrast screen glow against a dark surface. 5-second loop.
- Duration: 5s — tight loop, the content is dense enough that the video reads quickly; a longer loop would outlast user attention at this scroll depth
- Why video over still: the feature section is where technical credibility is established. An animated data trace conveys that the system is live and responsive in a way no static screenshot can match.

**3. Dark section — atmospheric infrastructure depth**
- Section role: contrast beat, the dark navy (#0D1B3E) section
- Suggested asset filename: `infrastructure-ambient.mp4`
- What the video shows: server room or data center environment — rows of blinking indicator lights, cool-white LED strips running along rack edges, the visual rhythm of active infrastructure. Shot with a long lens so rack-to-rack repetition compresses into an abstract pattern of light and interval. 5-second loop.
- Duration: 5s — the dark section is a contrast beat, not a narrative moment; a quick loop maintains its function as punctuation in the page's rhythm
- Why video over still: the dark section needs depth to avoid reading as a flat color band. Infrastructure video turns it into a window — the impression that behind the white interface lies an active system. This serves the brand's technical credibility argument at exactly the moment the page has committed to demonstrating it.
