# Ibotta — Concept by Video

## Scroll Opening

The page loads with the hero fully rendered — pink background at full opacity, headline centered, floating product photography already placed and visible. No entrance animations on load. The nav bar is transparent over the pink background, showing dark text. The floating QR code element is not yet present; it fades and slides in from the right edge of the viewport shortly after the user begins scrolling.

## Hero Experience

The hero's defining composition is the asymmetric arrangement of floating product photography — cut-out product shots placed freely in the negative space around the central text block, each carrying a soft drop shadow to lift it off the pink surface. These images are static; they do not animate on load or in response to scroll. The hero is a live scene from first frame: headline, supporting copy, app store buttons, and floating images all present at full opacity. The primary experiential moment is the curved arc at the hero's bottom edge — a single smooth concave shape where the pink surface ends and the white section begins.

## Section Transitions

The dominant transition event is the pink-to-white cut mediated by the curved arc divider. As the user scrolls, the smooth arc at the hero's bottom acts as a soft visual finish line rather than a hard edge. The first white section arrives below this arc. All subsequent white-to-white section transitions are straight horizontal cuts with generous whitespace gaps. The page closes with a second curved arc at the top of the final CTA section — pink returns — mirroring the opening. The sequence is: pink (hero) → arc → white (features) → arc → pink (CTA) → straight cut → dark (footer).

## Content Rhythm

Scroll-triggered content reveals are gentle: elements fade in and slide up a short distance as they enter the viewport. Entire content blocks animate together rather than with individual element stagger. The section headline arrives slightly before the supporting elements, establishing a subtle top-down reading sequence. The numbered feature sections use pink circular step indicators (numbers 1–n) that provide visual beat markers within the otherwise neutral white content.

The floating QR code element — a persistent scroll actor — materializes in the bottom-right corner of the viewport after the user clears the hero. It maintains a fixed position throughout the rest of the scroll journey and disappears on the blog page. It does not transform or animate in place; it holds its position as a conversion anchor.

## Footer Approach

The footer arrives on a dark background (#1c1f24), a clean cut from the preceding content. The multi-column link structure is static. No footer entrance animation.

## Motion Principles

The motion vocabulary is light and functional. Scroll reveals use a gentle fade-and-rise pattern — short duration, no spring or bounce. The floating product images in the hero are compositional, not animated. The curved arc dividers are static geometry. Hover states on nav links produce a pink underline. Hover on the logo carousel reveals arrow buttons. The floating QR code is the site's one persistent motion element — not animated in itself, but persistent in the viewport. No parallax, no GSAP-style orchestration, no scroll hijacking.

## Video Placements

Two sections would benefit from ambient video:

**1. Hero Background — Product lifestyle ambient loop**
- Suggested file: `hero-bg-ambient.mp4`
- Subject: A slow, overhead drift across a table surface showing diverse everyday products — a grocery item, a coffee cup, a phone showing a cashback notification, a receipt — arranged loosely; warm, direct lighting; 10s loop; the motion is a slow horizontal drift from one side to the other, as if the camera is floating above; no hands visible; the objects should feel real and tactile, not staged
- Duration: 10s loop
- Why video: The hero's floating product photography is static and decorative. An ambient video of actual products on a real surface — shot in the same warm, approachable register as the brand — would add texture and human scale to the hero without obscuring the central text. The pink background could be maintained as a tinted overlay at 40–60% opacity over the video, preserving the brand color while gaining the temporal quality of lived experience.

**2. App Feature Showcase Card — UI walkthrough ambient loop**
- Suggested file: `feature-showcase-ambient.mp4`
- Subject: A slow, close-up screen capture of the app's cashback flow — browsing offers, tapping to save, seeing a cash total update; 8s loop; the motion is deliberate and satisfying, showing the core interaction rhythm; no voice, no UI chrome outside the app content; the pace should feel calm and confident
- Duration: 8s loop
- Why video: The app showcase card uses static phone mockups showing single UI states. A looping video of the actual app flow — the moment when a user saves a deal and sees a cash amount update — communicates the reward mechanism kinetically rather than through static description. This is the page's most product-specific section, and video is the appropriate medium for showing an interaction, not a state.
