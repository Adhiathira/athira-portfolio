# Moral Skin — Concept by Video

## Scroll Opening

The page loads with the above-fold state fully rendered: the announcement bar at the top in sage green, the sticky white navigation bar below it, and the full-bleed hero split-screen composition immediately visible. The massive serif wordmark is present at full opacity, spanning both halves of the split. No loading animation, no entrance sequence. The left lifestyle photograph and the right abstract sphere background are already in place. The visitor arrives to a complete editorial composition.

## Hero Experience

The hero is a static split-screen composition. The lifestyle photograph on the left does not move. The soft 3D-rendered spheres on the right do not animate. The serif wordmark does not fade in — it is there from the first frame. The hero makes no entrance. Its only designed transition is at its bottom boundary: a single gentle concave arc divides the hero from the first content section. This arc is static, not animated, but its presence as the site's only non-rectilinear element gives the hero's exit a deliberately organic quality — the edge curves away like a breath rather than cutting.

## Section Transitions

As the user scrolls from the hero into the body content, sections arrive in a consistent pattern: the entire section content fades and slides up gently (opacity 0→1, y 16→0, roughly 350ms ease-out) as it enters the viewport. This is applied uniformly across all content sections — editorial headline, product introduction, benefits, ingredients. The scroll-triggered reveals are brief and supportive; they do not call attention to themselves. The transition from the warm beige background zones to the sage/mint green zones (social proof, footer) is a straight color cut at the section boundary, with no gradation or blending.

## Content Rhythm

The page's defining motion event is the floating product benefits section. As the user scrolls into this section, the product bottle image fades and scales into the center of the viewport, then holds fixed. While the bottle is pinned, three benefit text blocks — each with a large headline keyword, descriptive copy, and a small circular lifestyle photo — scroll from the bottom of the viewport, pass behind the product bottle, and continue upward. The product bottle occludes the text as it passes. The text is sized and positioned to be legible before and after it passes behind the bottle, and the scrolling is slow enough to read each benefit completely. This section's pacing is entirely user-controlled: scroll speed determines how fast each benefit arrives. After the third benefit block passes, the bottle un-pins and scrolls out of view with the rest of the section.

Beyond the benefits section: ingredient lists use a left-to-right stagger fade-in (80ms between items) when they enter the viewport. The auto-scrolling horizontal UGC gallery at the bottom of the page runs continuously at a slow, steady pace independent of scroll position — the site's only persistent ambient motion.

## Footer Approach

The footer sits on the sage/mint green background, continuous with the social proof gallery above it. No animation on entry. The footer is a functional close — link columns, newsletter subscribe, social icons — rendered in the sage green field that signals the page's closing zone. The color itself provides the transitional energy: no additional motion is needed to communicate that the scroll journey has ended.

## Motion Principles

The motion philosophy is minimal, narrative-first, and contained. Standard section reveals (350ms, ease-out) are the base vocabulary, applied uniformly and without exception. The floating product benefits section is the single elaborate motion event — everything else exists to support and punctuate the user's journey through the rest of the page without competing with that central moment. The auto-scrolling gallery is the only continuous ambient motion, running at a pace slow enough to be atmospheric rather than demanding. No parallax, no spring physics, no element-level choreography beyond simple staggering. The design trusts the product photography and the typography to hold attention between motion events.

## Video Placements

Two sections of this site would be meaningfully served by ambient video:

**1. Hero Right Half — Abstract sphere ambient loop**
- Suggested file: `hero-spheres-ambient.mp4`
- Subject: A slow, barely-perceptible rotation or drift of large, soft, white globular forms — abstract 3D renders in warm off-white, lit from a single directional source; 10s loop, almost imperceptibly moving; the background temperature should match the warm off-white palette of the hero's right half
- Duration: 10s loop
- Why video: The hero's right half currently uses static abstract 3D sphere renders as background texture. A near-still ambient video of these forms very slowly rotating would add the temporal quality of the physical object — skin care is about living material — without disrupting the composition. The visitor might not perceive it as video at first, which is precisely the correct register.

**2. Product Benefits Section — Product in use ambient loop**
- Suggested file: `product-use-ambient.mp4`
- Subject: An extreme close-up, slow-motion loop of hands applying a skincare product — gentle spreading motion, skin texture visible, warm directional lighting; 8s loop, seamlessly looping; this plays in the background when the section first loads, before the pinned scroll actor animation begins
- Duration: 8s loop
- Why video: The floating media benefits section uses the product bottle as its scroll actor — a clinical, object-focused perspective. A very brief ambient video playing at the section's entry, before the bottle pins to center, would provide the human/material context that makes the benefits more persuasive: this is not just a bottle; it is a substance that does something to skin. The ambient loop gives way to the scroll interaction as soon as the bottle pins, so the two experiences are sequential rather than competing.
