# Notion — Concept by Video

## Scroll Opening

The page loads into the dark hero at full height, nav transparent with white links. Floating illustrated character graphics are already in slow parallax motion in the background — drifting independently of scroll, looping continuously. The central product UI animation is already running inside its window frame. No page-load entrance sequence; the scene is live on arrival. The animated background is the only motion the user observes before scrolling.

## Hero Experience

The hero operates through two simultaneous motion layers. Background: illustrated character graphics drift in slow, independent looping parallax paths — abstract motifs and brand-aligned figures that establish personality before the user reads a word. Foreground: the central product UI frame contains an animated product demonstration. These two layers run at different tempos and neither is scroll-triggered; both are continuous ambient animations that function as a living environment. When the user begins scrolling, the hero content scrolls away normally (no pinning, no parallax scroll). The nav simultaneously begins its transition from transparent/dark-themed to sticky/light-themed.

## Section Transitions

All section transitions on this site are hard straight-edge horizontal cuts. The primary structural transition — dark hero to first light section — is a straight edge, with the background color inversion doing all the narrative work of the "chapter break." The adaptive nav transition (transparent → solid white) happens in parallel with this scroll moment, creating a simultaneous two-layer signal: layout register changes, nav register changes. Logo ticker section, card grids, pricing, footer — all joined by straight horizontal edges, with alternating white/light-gray backgrounds providing the only visual separation between same-type sections.

## Content Rhythm

Scroll-triggered reveals are gentle and uniform: a soft fade-in combined with a short upward slide applies consistently to all content elements. Headlines animate first, establishing the section topic, followed by a quick stagger through supporting content blocks — body text, cards, or split-screen media. The stagger is subtle and fast (not a slow orchestrated sequence). Cards in grid sections animate in left-to-right row order. The interactive pricing toggle (billing cycle segmented control) sits above the pricing columns and does not animate into view with special treatment — it appears with the same fade-up as everything else. No horizontal scrolling sections, no scroll-axis changes.

## Footer Approach

The footer is a standard multi-column utility block on white background. Straight horizontal edge from the final content section. Content reveals with the standard fade-up. No distinctive motion event. The page ends on the same note as its light sections — clean, ordered, unhurried.

## Motion Principles

Two motion registers. Ambient hero motion: background character illustrations loop continuously on independent paths, independent of scroll or user input; product UI demo animation runs within the hero frame on its own clock. Scroll-driven reveals: consistent fade + slide-up for all content sections, headline-first stagger, applied uniformly. No GSAP ScrollTrigger complex choreography, no parallax on content sections, no scroll actors traveling between sections. The system's restraint in the content sections is what makes the animated hero feel like a deliberate departure rather than a default. The motion vocabulary outside the hero is purposefully invisible.

## Video Placements

**1. Hero Section Background — Ambient illustrated character loop**
- Suggested file: `hero-bg-ambient.mp4`
- Subject: A slow, continuous drift of abstract illustrated graphic elements across a very dark navy field — stylized character figures, rounded geometric motifs, translucent layered shapes — moving in gentle, independent parallax paths at different speeds and depths; the overall motion is subtle and non-distracting, functioning as atmosphere rather than focal content; 12s loop with a seamless path repeat; warm point-light accents (soft glow on certain elements) create depth against the dark field
- Duration: 12s loop
- Why video: The hero's background character animations are the site's most humanizing and differentiating visual element. A static version of these illustrated graphics would turn the hero into a standard dark-background SaaS hero. Video preserves the temporal quality of the characters' gentle motion — their drifting, breathing quality — that a still image fundamentally cannot replicate.

**2. Feature Split Section — Animated product UI walkthrough**
- Suggested file: `feature-walkthrough-ambient.mp4`
- Subject: A screen recording-style ambient clip showing the product's interface in quiet, focused use — a document being built, blocks appearing, a page structure emerging naturally over 8–10s; motion is deliberate and slow, as if a thoughtful user is composing something; the interface is visible and legible; no UI cursor theatrics, no rapid animations; the clip loops back to the beginning smoothly so it reads as a perpetual work session
- Duration: 8–10s loop
- Why video: The alternating split-screen feature sections use product media as direct demonstration of capability. An ambient video of the product being used in context shows the experience of the product, not just its visual design — which is the conversion argument these sections are meant to make.
