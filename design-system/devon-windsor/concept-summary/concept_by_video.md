# Devon Windsor — Concept by Video

## Scroll Opening

The page loads on the hero with a dark background video already running — subtle, low-contrast, atmospheric texture. The navigation bar is transparent over the hero, showing dark-colored text. The 3D product object is present at the center of the viewport, rotating slowly. The headline text sits behind the product in the Z-order. There is no entrance animation for the text or the object — they are present at full opacity from the first frame. The hero is a live composition from the moment the page arrives.

## Hero Experience

The hero's defining motion is the 3D product object — a continuously rotating beauty product, rendered and animated in real time. This is not a scroll-triggered animation; it runs independently at its own pace. The background video is an atmospheric loop — abstract, soft-focus, low motion — that runs beneath the 3D object. The headline is visible behind the product, creating a layered depth composition: video → text → product → CTA button (pill-shaped, accent color). The CTA button is the topmost layer. No entrance animation on the text; no scale reveal on the product. The hero is a live scene that the visitor enters.

## Section Transitions

The hero's content exits as the user scrolls, with the first content section sliding over it from below. The critical transition device is the organic drip divider at the bottom of each light informational section — an irregular liquid-spill shape with 3–4 large rounded drips descending into the dark zone below. This shape is static (it does not animate), but its presence makes each section boundary feel fluid rather than cut. The page alternates: light informational section (with drip bottom) → dark transitional section (centered headline in extreme whitespace) → light informational section (with drip bottom). Content sections use gentle fade-in and staggered slide-up reveals: headline animates first, then body copy, then CTA.

## Content Rhythm

The 3D product scroll actor is the defining motion element across the full scroll journey. After the hero, the product scales down and translates toward the right side of the screen, landing in the media column of the first split-media section. As the user scrolls further, the product moves downward, occasionally occluded behind media containers in sections where it passes through. The product's path through the page is the primary animation experience — it navigates negative space, appears in front of and behind content, and serves as a continuous visual thread between otherwise independent sections.

The product showcase section introduces the page's second major motion event: a media filmstrip column that scrolls independently within a fixed, masked, squircle container. While the text column holds fixed, the image strip scrolls past behind the rounded container mask, creating a scroll-within-scroll interaction. The horizontal media carousel breaks the vertical axis — vertical scrolling pauses while the user swipes through the gallery, which bleeds off the right edge to signal more content.

## Footer Approach

The footer is not fully shown in the recording, but based on the section structure: the page closes after the horizontal gallery with a final content section. The nav bar has been present throughout, glassmorphic with blur, lifting above the scroll content. The footer likely resides on a dark background, consistent with the page's alternating register.

## Motion Principles

The motion vocabulary is cinematic and compositional. The two primary motion events — the ambient background video (hero) and the 3D product scroll actor — are continuous and not scroll-triggered. They operate at their own pace, independent of the user's scroll speed. Scroll-triggered reveals (fade-up, stagger between headline/body/CTA) are gentle and short — they introduce content without drawing attention to themselves. The horizontal carousel is the one instance of scroll-axis control (vertical pause during horizontal interaction). The organic drip dividers are static but provide the visual energy of motion at section boundaries without requiring animation. No spring physics, no bounce, no parallax in the standard sense — the parallax feeling comes from the scroll actor's independent movement rather than background layer separation.

## Video Placements

Two video slots are designated in the current design:

**1. Hero Background — Atmospheric abstract ambient loop**
- Suggested file: `hero-bg-ambient.mp4`
- Subject: A slow, near-abstract close-range drift — skin texture, fabric, or soft surface form, shot in warm directional light with shallow depth of field; near-monochromatic warm tone matching the near-white/near-black palette; barely perceptible motion; 10s loop; the subject of the video should be unclear at first — material, texture, breath — before resolving into something recognizably human or tactile
- Duration: 10s loop
- Why video: The hero background video provides the atmospheric foundation on which the 3D product object floats. It needs to be subdued enough not to compete with the product or headline, but present enough to make the hero feel alive rather than empty. The abstract-texture approach solves this: low-contrast, warm, and ambiguous at first viewing.

**2. Split Media/Text Sections — Product in use lifestyle loop (optional)**
- Suggested file: `product-use-ambient.mp4`
- Subject: An extreme slow-motion close-up of a beauty application gesture — fingers on skin, a product opening, a single deliberate motion repeated in loop; 6s loop; consistent lighting with the hero; no face visible, only hands and product; seamlessly loopable
- Duration: 6s loop
- Why video: The split-media sections currently use static photography in the squircle media containers. One instance where the product is shown in use (as opposed to as a 3D object or a studio still) would add the tactile quality that beauty brands depend on — the sense of the product as something experienced on the body, not just observed as an object. The squircle container masks the video cleanly, preserving the established shape language.
