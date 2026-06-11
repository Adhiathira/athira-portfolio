# Workshop Ambient — Bindery Workbench Timelapse

**File:** assets/subbrand-ambient.mp4
**Save to:** `landing-page/assets/subbrand-ambient.mp4`
**Type:** Video
**Aspect ratio:** 16:9
**Duration:** 10s
**AI Tool:** Kling 2.6
**Page:** process.html
**Section:** #workshop-section

## Context from code
- **Alt/title:** (no alt/title attribute — video element with no title)
- **Nearest heading:** "The bindery." (h2, id="workshop-heading")
- **Section purpose:** Full-bleed ambient video background for the workshop section, establishing the physical place and craft permanence of the Portland studio that has operated since 1994
- **Background:** Dark — #091f2c (deep blue-black nav scrolled background), section uses dark overlay (#workshop-overlay)

## Prompt

A worn wooden bookbindery workbench in a Portland studio, shot overhead on a virtual anamorphic locked-off wide, cool blue-grey morning light filtering from a north-facing window across the lower third of the frame — ++leather hides, archival tissue paper, spools of waxed linen thread, and brass finishing tools++ arranged deliberately in the lower third, the upper two-thirds open bench surface left uncluttered and breathing. Over 10 seconds, the light migrates across the objects in slow deliberate progression: cool dawn raking light reveals the grain of the leather and the fiber inclusions in the tissue, then warm diffused midday light renders the papers translucent and the bench surface pale ivory, then settles into amber tungsten pooled from a single overhead lamp as the workshop day ends. The brass tools glow warm and the deep plum shadow in the leather folds deepens to near-black as the lamp takes over, then holds in that final amber warmth. Camera holds completely still throughout — locked overhead, materials centered in lower third, empty bench above. Near-silence: faint creak of the old building settling, a distant low hiss as the tungsten lamp warms, the barely-audible shift of paper. Warm-to-amber color grade following the palette progression from cool grey-blue through creamy off-white into deep amber and near-black, slow reveal, deliberate pace.

## Negative Prompt

No text overlays, no logos, no watermarks, no jump cuts, no morphing objects, no human hands or figures, no overcrowded frame, no shaky distortion, no flickering, no camera movement, no sudden lighting changes, no props appearing mid-shot

## Applied
Mode:     text-to-video
Style:    cinematic (specified)
Duration: 10s (specified)
Aspect:   16:9 (specified)
Audio:    ambience (near-silence, building settle, lamp hiss, paper texture)

## Usage

Used in `process.html` inside `#workshop-section` as a full-bleed ambient background video establishing the Portland bindery studio — craft tools and materials on a workbench as light migrates across them over a working day, making visible the duration embedded in handmade objects.
HTML: `<video src="assets/subbrand-ambient.mp4" autoplay muted loop playsinline>`
