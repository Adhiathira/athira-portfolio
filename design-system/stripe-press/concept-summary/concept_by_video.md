# Stripe Press — Concept by Video

## Scroll Opening

The page loads directly into the 3D book carousel at full viewport height: the central book is already lit and focused, the books above and below it already recede into depth, and the custom vertical scroll indicator on the left is already positioned. No entrance animation, no loading sequence. The scene is fully composed on arrival — the user's first action is scroll, not wait.

## Hero Experience

The hero section is governed by a single, scroll-remapped interaction. The user's vertical scroll input is hijacked and remapped entirely to the rotation of the 3D book stack: each unit of scroll advances the stack by one position, bringing the next book into the central focal zone with its depth-of-field effect intensifying for the books outside focus. This is not a "scroll animation" in the conventional sense — it is a scroll-as-input-device mechanic where the page does not move; only the 3D objects rotate. When the user has scrolled through the entire carousel, the mapping is released and normal vertical scroll resumes, moving the page into the sections below.

## Section Transitions

All section transitions on this site are hard straight-edge horizontal cuts. The dominant transition type is the dark-to-dark cut between the carousel, the static poster section, and the video section — all sharing the near-black background, so the sections read as a continuous dark environment punctuated by different content types. The single structural transition event is the dark-to-white cut from the video section into the informational text section — a complete color inversion that functions as a chapter break between the immersive browsing experience and the rational reading/conversion experience.

## Content Rhythm

Motion is concentrated in two types. Structural: the 3D carousel rotation is the primary motion event and it is entirely user-controlled. Atmospheric: the background video in the video section plays continuously on its own clock (dark architectural footage, subtle scroll-scale-up effect tied to scroll position). Content reveals — the poster image and the text sections — fade in gently as they scroll into view. No stagger, no choreographed sequences. The page's pacing is controlled by the mechanical structure (carousel duration) rather than by animation choreography.

## Footer Approach

The footer arrives below the informational text section via a thin horizontal rule separator on the white background. No entrance animation, no color change. The footer closes the page in the same white reading register as the informational section that precedes it. The transition from the informational section to the footer is the lightest, most understated boundary on the page — a single thin line.

## Motion Principles

The motion philosophy is dimensional immersion in the browsing experience, flat restraint in the reading experience. The 3D carousel is the site's only complex motion element — it earns its computational complexity because the books are the product. Elsewhere, motion is minimal: atmospheric video backgrounds, subtle fade-ins, a scroll-scale-up on the video section. No GSAP scroll choreography in the content sections, no persistent scroll actors, no animated dividers. The principle is that motion belongs to the objects being sold, not to the interface around them.

## Video Placements

**1. 3D Carousel Background — Dark atmospheric environment**
- Suggested file: `carousel-bg-ambient.mp4`
- Subject: An extremely slow, barely-moving capture of light on a textured dark surface — the grain of aged paper, the weave of a dark cloth binding, or the subtle warmth of lamp light diffusing across a dark reading table; near-still, cycling very slowly (almost imperceptible motion); 15s loop; the tone is deep dark charcoal with occasional warm amber light blooms consistent with the `#dfc78e` accent; the motion is slow enough that it reads as a static atmosphere at glance but gives the background a living quality at sustained attention
- Duration: 15s loop
- Why video: The 3D book carousel section uses a dark, near-black background as the environment for the 3D objects. A subtly living background video gives this environment material richness and depth — it transforms the carousel from floating objects in void to objects existing in a particular physical atmosphere. The near-static video texture reinforces the physical, craft quality of printed books.

**2. Editorial Video Section — Cinematic atmospheric loop**
- Suggested file: `editorial-atmosphere-ambient.mp4`
- Subject: A dark, desaturated architectural or urban scene — a long corridor, a reading room at night, light coming through tall windows onto a dark floor — with slow camera motion or minimal ambient subject motion; the scene is contemplative and still, suggesting a world where serious reading and thinking happen; 10s loop; warm single-point light sources creating pools of light against darkness, consistent with the amber/gold accent color of the typography system
- Duration: 10s loop
- Why video: This section uses background video as a promotional moment — an atmospheric chapter break between the 3D carousel and the informational text section. A static background would reduce this moment to a simple billboard. Video gives it temporal depth and cinematic register, making the section feel like the opening frames of a film rather than a slide in a presentation.
