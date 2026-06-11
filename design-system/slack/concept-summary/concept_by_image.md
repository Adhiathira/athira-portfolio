# Slack — Concept by Image

## Brand Premise

A SaaS platform site organized around a cinematic scroll journey. The design synthesizes the core visual grammar of modern tech marketing — dark hero, light content sections, adaptive sticky nav — with a set of genuinely distinctive structural choices: a persistent 3D geometric scroll actor that travels down the page, an animated sinusoidal wave as a section boundary event, and a wide shallow concave arc at the hero-to-content transition. These are not surface embellishments but architectural decisions that transform the seams and boundaries of the page into expressive design moments.

## Color Architecture

The palette operates through a high-contrast binary. Dark near-black backgrounds establish the immersive, cinematic register of the hero and narrative sections; pure white or very light grey backgrounds establish the functional, informational register of the feature and product sections. The primary brand accent (`#1264a3` — a rich, medium-saturation blue) appears on CTA buttons, interactive links, and navigation elements — a single chromatic statement against the achromatic field. White links in the navigation (`linkColor: #ffffff`) confirm the dark-first opening register, with the nav's text adapting dynamically as the page's background shifts between dark and light.

## Typography System

Two typefaces, both proprietary. Salesforce Avant Garde (proprietary, a geometric display sans) carries all section headlines — its clean geometric construction gives the type scale a restrained modernist authority. Salesforce Sans (proprietary, a clean humanist sans) handles all body copy, navigation links, and UI text. Neither face is available via web CDN; both are served as woff2 or equivalent through the site's own font infrastructure. The typographic system is defined by scale rather than face variation — the headline is large and bold, the body is small and regular, and the ratio between them is generous enough to be immediately legible in the dense, grid-driven content sections.

## Spatial System

The page organizes into four primary zone types. The dark hero is a full-viewport centered composition: a multi-line bold headline centered in the viewport, a secondary CTA below it, a slow atmospheric background video, and the 3D scroll actor floating between text and background. A wide shallow concave arc divider (scooping upward at the hero's base) provides the transition to the first light section. Split media-text feature sections occupy the light zones: two columns (approximately 50/50), alternating media-left and media-right across instances, on white or light-grey backgrounds. A horizontal scroll-jacked card track section breaks the vertical axis: the user's vertical scroll is mapped to horizontal card progression, and the section's bottom boundary is an animated multi-peaked sinusoidal wave (approximately 2.5 peaks across the viewport, continuously undulating). A footer closes the page.

## Photography and Editorial Voice

Product media in the feature sections consists of high-fidelity UI mockups and product photography — not lifestyle photography or brand imagery. The media is art-directed with centered subjects and clean backgrounds, serving as direct visualization of feature claims in the adjacent text. Media containers use slightly rounded corners consistently across all instances. The 3D scroll actor — a complex amorphous object with a metallic, iridescent, rotating surface — is not photography but a real-time rendered element that serves as a sculptural brand statement. It is the site's primary non-functional visual, and its presence in the dark sections gives those sections a material richness that photographic media cannot provide.

## Navigation and Wayfinding

The navigation is a single row in three zones: wordmark far left, primary navigation links centered, primary CTA button far right — contained within the main page grid. It is sticky from load. Over the dark hero, the nav is fully transparent with white link text; as the user scrolls into the light content sections, the nav transitions to a solid white background with dark text and a subtle drop shadow. The transition is a smooth cross-fade, not an abrupt swap. The nav link color (`#1264a3`) remains consistent across both states — the brand blue functions as an always-on accent within the navigation regardless of background state.

## Overall Design Character

The design makes a sophisticated argument that structural creativity and functional clarity are not in tension. The dark hero, the 3D scroll actor, and the animated wave divider signal cinematic ambition; the split-feature sections and horizontal card track signal product depth; the adaptive navigation signals engineering polish. The result is a site that earns its motion and its complexity — each of its creative choices serves a specific structural purpose rather than functioning as decoration. The page's seams (the arc divider, the wave) become its most memorable visual moments.
