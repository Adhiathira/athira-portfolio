# Linen Verge — Motion Brief

## Scroll Opening

The page loads into white silence. No preloader, no splash — the viewport is already the page. The hero text enters with the 1.56s `scale` keyframe: opacity 0 → 1 with a subtle scale(1.015 → 1), the type seeming to settle into its margins rather than arrive from elsewhere. The sensation is of text coming into focus rather than transitioning into view. The asymmetric hero margin (268.8px left, 151.2px right) means the first text the eye meets is offset, compositionally deliberate — a book opened, not a screen unlocked.

## Hero Experience

The hero section is typographic and still. No video behind the heading — the white field IS the background, and the EB Garamond italic at 2.125rem with 0.06em tracking is the only event. If the product warrants ambient depth, the hero becomes a candidate for a 10s looping video: the subject would be a physical workspace — a paper archive, a printing press at rest, morning light crossing a drafting table — shot at extreme stillness with minimal motion. The video serves not as spectacle but as material texture behind the type, implying the analogue world from which the system's aesthetic descends.

**Hero video placement:** `hero-bg.mp4`
Subject: early morning light moving slowly across an empty drafting table or paper archive; 4K, locked-off shot, 10s loop; no people, no action — only light and surface
Why video: static white reads as empty; a near-still video with light movement gives the white ground a material quality — breath without spectacle

## Section Transitions

As sections enter the viewport, each uses the assembled 0.975s scale keyframe — slower than most product pages, giving each section the quality of a page turning rather than content loading. The timing communicates that each section deserves full arrival. No parallax, no pinned scroll effects: transitions are purely opacity + micro-scale entry, maintaining the typographic primacy of the system throughout the scroll.

## Content Rhythm

Individual elements enter with a 0.15s stagger between items in a column or row — enough to register as intentional sequencing without feeling choreographed. Headings enter first (EB Garamond italic), body text follows at 0.15s, call-to-action elements last at 0.30s. The entry direction is consistently upward (translateY 20px → 0), never lateral or downward — motion direction carries implicit meaning: content rises into legibility.

## Footer Approach

The footer arrives without announcement. The same 0.975s scale entry as content sections, no acceleration, no special choreography. The five-column navigation grid fades in as a unit with a 0.05s stagger between columns — subtle enough that the footer reads as having always been there, not as having loaded. The closing copyright line enters last at 0.2s delay after the columns. No closing animation, no upward sweep — the page simply ends, white on white at the bottom margin.

## Motion Principles

The timing philosophy is **considered over reactive**: all micro-interactions at 0.39s (not the industry-standard 0.3s), all entry animations at 0.975–1.56s, hover states at 0.55s. Nothing snaps; nothing rushes. The easing vocabulary is dominated by `cubic-bezier(0.455, 0.03, 0.515, 0.955)` — a curve that begins with moderate acceleration and settles gently, like turning a page. The overall feeling is of a product that does not compete for attention but expects it.

## Video Placements

**1. Hero background — `hero-bg.mp4`**
Section role: hero
Subject: A locked-off 4K shot of morning light traversing an empty drafting table or paper archive — slow enough that motion is only detectable over 5–8 seconds; surfaces include raw paper stock, thread-bound books, a T-square, or a typesetting compositor; no human presence
Motion quality: near-static, almost imperceptible drift; the light itself moves, not the objects
Duration: 10s loop with seamless crossfade
Why video: The pure white background in the static design risks reading as unconfigured; a near-still video of a material workspace gives the white ground texture and temporal depth — the page feels inhabited without being busy

**2. Product showcase — `process-ambient.mp4`**
Section role: mid-page feature or "how it works" section
Subject: A slow macro drift across paper surfaces — graph paper, carbon copy, index cards filled with handwritten notation; camera movement is 1–2cm over the duration, close enough to read character-level texture
Motion quality: macro, extremely slow horizontal drift, handheld but almost imperceptible; film grain is welcome
Duration: 5s loop
Why video: The system's material claim (letterpress, cotton paper) is asserted typographically but never shown; a macro paper ambient provides the visual correlate of the 0.06em letter-spacing — texture made visible

**3. Services or methodology section — `studio-interior.mp4`**
Section role: a "why" or philosophy section in the lower two-thirds of the page
Subject: An interior — a studio, print shop, or editorial room — at rest; shelves of reference books, a monitor with type on screen, a large-format print pinned to a wall; shot from one fixed angle, 5–8 meter depth of field
Motion quality: timelapse slowed to near-real-time; dust particles drift; the room breathes but does not perform
Duration: 10s loop
Why video: The Linen Verge system's design principle of "white as active substance" implies a surrounding context of material practice; showing a working room at rest anchors the typographic system in a world of made things — editorial direction made spatial
