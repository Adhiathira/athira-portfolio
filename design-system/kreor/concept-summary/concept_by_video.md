# Kreor — Concept by Video

## Scroll Opening

The page loads with a dark field and a 3D metallic geometric object already rotating at the center of the viewport — the rotation begins before the user's scroll, not as a response to it. The headline cluster is overlaid in the foreground, visible at full opacity. The animated liquid wave at the hero's bottom edge is already in motion, oscillating gently. No entrance animation on text or nav. The page is a live scene from the first frame.

## Hero Experience

The 3D object's continuous rotation is the hero's sole persistent animation — it operates on its own clock, independent of user input. The background is a flat dark field; all visual energy comes from the object's metallic rendering and dynamic lighting. The liquid wave at the hero's bottom boundary oscillates with a slow sinusoidal motion, creating the sense that the section is alive at its edges. The headline is centered and static, readable at full opacity against the dark background regardless of which face of the 3D object it is momentarily rendered over.

## Section Transitions

The page's defining motion event is the scroll-driven transition from hero to the first content section. As the user scrolls, the animated liquid wave shape travels upward across the viewport — the hero "drains away" while the 3D object simultaneously scales down, changes layer order, and recedes behind the incoming section's media. The 3D object is briefly visible behind the full-bleed video or image of the next section before disappearing entirely. This multi-layer Z-axis handoff — text > wave > 3D object > background > new section media — is the most technically complex motion sequence on the page.

All other section transitions are hard straight edges: media showcase ends, card grid begins; card grid ends, footer begins. The liquid geometry is reserved for the one narrative passage that earns it.

## Content Rhythm

Scroll-triggered reveals in content sections follow a standard fade-in and slide-up pattern. In the card grid, cards animate in with a slight top-to-bottom stagger, guiding the eye downward. Full-bleed media sections use a subtle parallax effect on the background image: the image moves slightly slower than the foreground text, reinforcing the depth layering already established by the hero's 3D object.

Card hover states use a glow or scale lift, providing interactive feedback without changing the fundamental dark aesthetic.

## Footer Approach

The terminal CTA section is a clean dark field with a large Montserrat headline and an orange-filled primary CTA button. No entrance animation beyond the standard fade-up. The footer arrives as a straight cut from the card grid above it.

## Motion Principles

Two motion registers operate at different tempos. The hero operates at its own pace — the 3D rotation and the wave oscillation run continuously and independently. Content sections operate at scroll tempo — reveals are short fade-ups, responsive to viewport entry. The scroll actor sequence (3D object receding through the liquid transition) is the one moment where both registers interact: scroll speed determines how quickly the object recedes and when the wave completes its passage. No spring physics, no scroll hijacking, no GSAP-style per-element orchestration in content sections. The premium feeling comes from the hero's continuous motion and the liquid transition, not from complex reveal choreography on static content.

## Video Placements

Two sections are designated for ambient video:

**1. Full-Width Media Showcase — Agency work process ambient loop**
- Suggested file: `showcase-ambient.mp4`
- Subject: A slow, overhead drift across an illuminated work surface — a monitor showing a 3D modeling application, hands at a keyboard, a tablet with UI wireframes — shot in cool, directional studio light; 10s loop; the camera moves slowly enough that individual screens are legible for 2–3 seconds before the drift continues; no faces visible; the studio environment communicates technical craft rather than lifestyle
- Duration: 10s loop
- Why video: The full-width media showcase section uses either static photography or video to fill the viewport. An agency work environment video in this position — showing the actual process rather than a rendered result — would give the showcase section a behind-the-scenes credibility that static imagery cannot. The dark studio environment matches the hero's color register, creating continuity between the hero's cinematic opening and the first content moment.

**2. Card Grid Section Background — Ambient studio texture loop**
- Suggested file: `studio-ambient.mp4`
- Subject: A near-static, extreme close-up of a glowing monitor screen showing code or a 3D wireframe model — shot at 1–2% motion, essentially a living still photograph; 12s loop; just enough movement that the screen content appears to breathe; warm dark studio background; the video is used as a section background behind the card grid, not as individual card media
- Duration: 12s loop
- Why video: The card grid section sits on a static dark background. A very slow ambient video — motion barely perceptible — used as the section background behind the grid would give the grid a sense of being embedded in an active studio environment rather than floating on a black surface. At near-zero motion, the video functions as texture rather than animation, preserving the grid's scannable character while adding depth.
