# Manifesto Ambient Video

**File:** assets/manifesto-ambient.mp4
**Save to:** `landing-page/assets/manifesto-ambient.mp4`
**Type:** Video
**Aspect ratio:** 16:9
**Duration:** 10s
**AI Tool:** Kling 2.6
**Page:** index.html
**Section:** #manifesto

## Context from code
- **Alt/title:** aria-hidden (decorative background)
- **Nearest heading:** "Atlantic. Cold. Singular." (h2 .manifesto-headline)
- **Section purpose:** Full-bleed background for the brand manifesto/provenance section (min-height 80vh). Video sits behind a 55% black scrim and a bottom-to-top gradient overlay. The section carries the brand's philosophical statement about Basque coast provenance.
- **Background:** dark #1a1a18 warm charcoal — video must read nearly as dark as the page background itself

## Prompt

A cold Atlantic tidal surface fills nearly the entire frame, filmed from low angle just above the water — ++dark near-black water++ the color of #1a1a18 warm charcoal, desaturated to near-monochrome, faint silver-greige highlights in the #b1ada7 range catching the only available dusk light across the slow-moving surface. No horizon line visible; the top edge of frame holds only the faintest suggestion of a lightless sky. The water drifts in a slow lateral pull from right to left — tidal, inevitable, indistinguishable from a camera slide — no waves, no chop, only the cold geological patience of open water moving as it has always moved, then continuing to drift and hold through the full duration. Camera holds completely still; all motion belongs to the water. The audio is near-silence: a low, barely-audible tidal breath — deep subsonic water movement and the faintest ambient cold air — then holds in heavy stillness. Desaturated, muted palette, no saturation, no warmth in the light — solitude, cold, the Basque coast at the edge of visibility.

## Negative Prompt

No text overlays, no logos, no watermarks, no jump cuts, no morphing objects, no shaky distortion, no flickering, no waves or surf, no visible horizon line, no sunlight, no color saturation, no warm golden tones, no people, no boats, no overcrowded frame

## Applied

Mode:     text-to-video
Style:    cinematic (specified)
Duration: 10s (specified)
Aspect:   16:9 (specified)
Audio:    ambience (subsonic tidal breath, cold air stillness)

## Usage

Used in `index.html` inside `#manifesto` as a full-bleed background video behind the brand provenance manifesto ("Atlantic. Cold. Singular.").
HTML: `<video src="assets/manifesto-ambient.mp4" autoplay muted loop playsinline>`
