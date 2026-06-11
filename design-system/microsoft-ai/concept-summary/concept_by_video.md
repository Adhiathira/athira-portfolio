# Microsoft AI — Concept by Video

## Scroll Opening

The page loads with a fully rendered above-fold state: the dark purple announcement banner at the very top, the transparent navigation bar below it, and the split-screen hero section with its editorial text column and video thumbnail on the right. All elements are visible at full opacity on first frame. The organic peach and cream background blobs in the hero are static decorative elements — they do not animate on load. No loading sequence, no entrance choreography. The page is fully formed at the moment it arrives.

## Hero Experience

The hero section is a static split composition. The left column — eyebrow label, display headline, body copy, primary CTA button — is present without animation. The right column's video thumbnail (a mosaic of portrait photographs with a play button overlay) is a static image until the user interacts with it. The organic blob background motif does not move. The one ambient motion in the hero is the announcement banner at the top, which may contain a horizontal text marquee or rotating message. Beyond that, the hero is a still life: a composed, informational layout that trusts its typography and art direction rather than motion to establish presence.

## Section Transitions

As the user scrolls, each section fades into view as a unified block — content appearing with a brief, gentle opacity reveal (roughly 300ms, ease-out) once the section enters the viewport. Elements within sections do not stagger individually; the whole section appears as one unit. The transition from the white-background card sections to the full-bleed atmospheric lavender-rose gradient section is the page's most distinctive visual moment — but it happens as a hard color cut, not a gradual blend. The gradient section functions as a mid-page chapter break, using background color as the transition device.

## Content Rhythm

The page's content rhythm is driven by its section structure rather than element-level choreography. The horizontal card carousel scrolls smoothly with user drag or button controls. The atmospheric gradient section's three floating content columns appear as a unit when the section scrolls into view. The sticky in-page section navigation tab bar activates when the user scrolls past the hero — it appears with a brief background solidification (from transparent to white/light surface, ~0.3s ease). The in-page tab bar then persists as a navigational anchor throughout the rest of the page scroll. No section content uses scroll-triggered stagger animations or parallax effects.

## Footer Approach

The footer arrives as the page's functional close — six equal-width link columns in a white/neutral surface, preceded by a row of social media icons. No animation on footer entry. The type scale steps down noticeably from the body sections above it, signaling the shift from content to utility. The legal/copyright utility bar below the link columns is the page's final typographic element. The footer does not close with a visual statement; it resolves with information.

## Motion Principles

The motion philosophy is minimal, accessible, and support-focused. Animations exist to confirm state changes (scroll reveals, sticky nav activation, button hover states) rather than to characterize the brand. Reveal durations are short (200–350ms), easing is consistently ease-out or ease-in-out, and no motion is purely decorative. The purple `#702573` CTA buttons may carry a subtle hover transition (background darken, ~150ms) that confirms interactivity without performance. The card hover states use a light elevation shift (subtle shadow increase or brightness change) to signal clickability. The design trusts its information architecture and color hierarchy to do the work that animation does elsewhere.

## Video Placements

One section of this site is pre-designated for video content:

**1. Hero Right Column — Product story video**
- Suggested file: `hero-product-video.mp4`
- Subject: A curated highlight reel of AI product interactions — users collaborating with AI tools, copilot suggestions appearing, code being generated — edited as a 60–90s brand video; plays on click from the thumbnail. The thumbnail in the hero shows a mosaic of portrait photographs with a centered play button overlay.
- Duration: 60–90s on-click video (not ambient — plays on user interaction)
- Why video: The hero's right column video container is the page's primary product demonstration slot. It converts the compositional split from "editorial text + static image" to "editorial text + active product story." The thumbnail is a call-to-interaction embedded within the hero's static layout; the video it launches is the brand's most direct product argument.

**2. Optional — Atmospheric mid-page section ambient loop**
- Suggested file: `atmospheric-ambient.mp4`
- Subject: A slow, abstract visualization of data or network connections on the soft lavender-rose palette — cloud textures forming and dissipating, node graphs resolving and reorganizing — at very low motion intensity; 12s loop, fully muted, no visible UI chrome
- Duration: 12s loop
- Why video: The full-bleed lavender-rose gradient section currently uses a purely static atmospheric background. A near-still abstract video in the same palette would preserve the section's visual pacing role (mid-page chapter break) while adding the temporal quality that an AI infrastructure brand's "trustworthy AI" section warrants — the sense of a system working quietly, at scale, in the background.
