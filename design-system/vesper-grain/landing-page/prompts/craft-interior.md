# Craft Atelier Interior

**File:** assets/craft-interior.jpeg
**Save to:** `landing-page/assets/craft-interior.jpeg`
**Type:** Image
**Dimensions:** 1200×900
**Aspect ratio:** 4:3
**AI Tool:** Higgsfield Nano Banana Pro
**Page:** index.html
**Section:** section-craft

## Context from code
- **Alt text:** "The atelier interior — hands sealing preservation jars by candlelight"
- **Nearest heading:** "The Discipline of Slowness" (h2 #craft-headline)
- **Section purpose:** Split-panel craft/process section; image fills the left half of a two-column grid (`grid-template-columns: 1fr 1fr`, `min-height: 680px`); `object-fit: cover; object-position: center`; a gradient overlay fades the right edge of the image to #19191c where the text panel begins (`linear-gradient(to right, transparent 70%, var(--color-page-bg) 100%)`); body copy references the garde-manger tradition, patience, slowness, the sea, the season, and the artisan's hand
- **Background:** #19191c page background; right edge fades to page background via gradient overlay

## Prompt

Close-up editorial shot of a craftsperson's hands in a dark Parisian atelier, sealing a glass preservation jar with deep red wax beside a single tall candle. The workspace surface is worn oak or dark slate, with several sealed jars and small copper tools arranged behind the working hands. The candlelight is the only visible source — warm amber flame casting long directional shadows across the surface and the hands, rimming the jar's shoulder with a fine highlight. The composition is portrait-oriented within the frame's left portion, leaving the right side of the image to dissolve gradually into deep shadow. Color palette: near-black #19191c dominant, warm amber from candle, dark glass jars with translucent amber contents, deep red wax seal, weathered oak surface tones. Mood: unhurried, material, cinematic — the image embodies the brand manifesto of change held in suspension, of attending rather than accelerating. Camera: close-medium distance, slightly elevated, focus on the hands and the jar with shallow depth-of-field softening the background jars.

## Usage

Used in `index.html` inside `#section-craft` → `#craft-image-panel` as the left-column craft process image in the split-panel layout.
HTML: `<img src="../assets/craft-interior.jpeg" alt="The atelier interior — hands sealing preservation jars by candlelight">`
