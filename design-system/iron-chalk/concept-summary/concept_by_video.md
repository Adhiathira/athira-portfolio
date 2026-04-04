# Motion Brief — Iron Chalk

## Scroll Opening

The page arrives already composed. No loader, no splash — the dark nav bar at the top is already in position, the condensed heading is already set, and the only thing that moves is opacity: the hero text fades in from 0 to 1 over 0.75s, then the CTA cluster 0.1s behind it. The timing is deliberate and unhurried. The first impression is of a system that does not perform arrival — it simply appears, having already decided to be here.

## Hero Experience

The hero does not use video. Its power comes from the static confrontation of the large condensed uppercase display text against the light grey field — the lime-green CTA at the bottom is the only kinetic element, drawing the eye as a target rather than as decoration. The hero earns its presence through typography alone: weight, scale, and the studied pause the 165px vertical padding creates around the content block.

If a hero video background is introduced in a later iteration, the subject should be: long exposure workshop light, minimal hand movement, 10s loop — material and atmospheric without narrative. The motion must not compete with the heading.

## Section Transitions

Section transitions are governed by whitespace expansion and scale contrast, not decorative dividers. As the user scrolls from the hero into the first feature section, the scale drops — 85px condensed display gives way to 19px body text — and the visual pace slows. The transition does not announce itself. The single dark near-black section (#151313) is the only declared boundary in the scroll journey: when it appears, it functions as a chapter break. Everything before it is buildup; everything after is resolution.

## Content Rhythm

Individual elements enter the viewport with a staggered fade-in-scale-up: 0.75s duration, `cubic-bezier(0.76, 0, 0.24, 1)` easing, 0.1s stagger between sibling elements. Cards in grid sections animate in column by column, left to right. The stagger timing is calibrated to be perceptible as sequence rather than loading — the eye follows the cascade and reads the grid before any individual card is fully visible. Headlines animate before body text. CTAs animate last, after the argument has been made.

## Footer Approach

The footer is quiet. No animation, no transition. It simply becomes visible as the user reaches the bottom of the content column. The multi-column link grid reduces typography to its smallest utility scale, and the lime-green accent is absent — the footer is a navigation tool, not a conversion moment. Its silence after the structured scroll above it is the correct punctuation.

## Motion Principles

The timing philosophy is **studied and deliberate**. 0.6s for navbar transforms. 0.75s for section reveals. 0.3s for hover and micro-interactions. These durations are not slow by accident — they are calibrated to prevent the interface from feeling reactive or anxious. The easing is always controlled: the primary curve (`cubic-bezier(0.76, 0, 0.24, 1)`) has a pronounced ease-in and a sharp ease-out, which reads as confident rather than playful. Nothing bounces. Nothing overshoots. Every motion arrives exactly where it intended to go.

## Video Placements

**Placement 1: Product Showcase Section**
- Section role: Feature explainer — the section that demonstrates the core product capability in context
- Asset filename: `product-ambient.mp4`
- What the video shows: Slow pan across a lit workspace surface — papers, tools, a screen edge in frame, natural side lighting, macro focus on texture. No hands, no faces. 10s loop.
- Duration: 10s
- Why video: A static image would freeze the materiality. The slow pan gives the product section an atmospheric depth that a screenshot cannot achieve — the viewer's peripheral attention is anchored by the ambient motion while their focal attention reads the feature text beside it.

**Placement 2: Dark Section Background**
- Section role: The single dramatic dark section (#151313 background) — the architectural chapter break
- Asset filename: `dark-section-ambient.mp4`
- What the video shows: Very slow drift of light across a dark matte surface — industrial or concrete texture, near-black, with a single light source moving laterally at 2mm/s apparent motion. 10s loop, seamlessly looping on a still frame.
- Duration: 10s
- Why video: The dark section is the most visually isolated moment in the scroll journey. Adding a barely-perceptible ambient surface motion gives it atmospheric weight that holds the viewer's attention during the conceptual pause it represents. Still images in this context read as flat; the micro-motion reads as depth.

**Placement 3: Testimonial / Social Proof Section**
- Section role: Customer testimonial grid — the section that provides social validation
- Asset filename: `testimonial-bg.mp4`
- What the video shows: Very low-opacity gradient field, two overlapping soft light sources drifting slowly across a warm-neutral field. The gradient colours are within the system's warm grey palette. 5s seamless loop.
- Duration: 5s
- Why video: The testimonial section is the most emotionally-weighted part of the page — it is where trust is built. A very-low-opacity ambient gradient motion underneath the cards gives the section a warmth and life that distinguishes it from the more structured grid sections above. The motion is atmospheric rather than illustrative: it communicates that this section has a different quality without announcing what that quality is.
