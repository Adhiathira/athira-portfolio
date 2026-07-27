# Hero Ambient — Calm Particle Drift Loop (Video)

**File:** assets/hero-ambient.mp4
**Save to:** `landing-page/assets/hero-ambient.mp4`
**Type:** Video
**Aspect ratio:** 16:9
**Resolution:** 1080p
**Duration:** 10s (seamless loop)
**AI Tool:** Seedance 2.0
**Page:** pages/index.tsx (via components/home/Hero.tsx)
**Section:** #hero (ambient background layer behind the hero content)

## Context from code
- **Alt/title:** "Calm ambient particle field behind the CentralHub hero"
- **Nearest heading:** "The Incumbents Have Had Their Decade. This Is Ours."
- **Section purpose:** A nearly-subliminal ambient motion layer that sits behind the hero copy and dashboard frame, giving the light hero a quiet sense of life without competing with the content. Referenced by the hero as a looping background video.
- **Background:** Light — soft white / off-white field, green `#23945f` accent only as a very faint edge gradient.

## Prompt

A calm, brightly lit ambient background loop on a soft white / off-white field, enterprise-calm and nearly subliminal. A very faint green (`#23945f`) gradient glows softly at one edge of the frame, brightening and dimming in a slow, seamless cycle like light shifting across a wall. Across the field, sparse tiny particles and specks — some green (`#23945f`), some pale gray — drift very slowly on an upward-diagonal path, slightly out of focus, with gentle depth-of-field blur so they read as soft motes rather than sharp dots. Think dust motes suspended in bright morning light: unhurried, soft, sub-pixel calm, only a handful visible at once. The camera is completely locked and still; the entire motion is the slow particle drift and the faint edge gradient gently glowing. Airy, minimal, premium, restful — the field should feel almost empty, a quiet luminous white space with the faintest hint of green. Designed to loop seamlessly with no visible seam, cut, or reset.

## Negative Prompt

No text, no letters, no logos, no watermarks, no objects, no products, no UI, no people, no hands, no dark background, no black, no blue, no green, no aqua, no light-mint or pale-mint, no pink or magenta, no fast motion, no swirling vortex, no lens flare, no sharp in-focus particles, no heavy bokeh balls, no color banding, no flicker, no hard cuts, no camera movement, no visible loop seam

## Applied
Mode:     text-to-video
Style:    ambient / abstract (light register)
Duration: 10s (specified, seamless loop)
Aspect:   16:9 (specified)
Resolution: 1080p (specified)
Audio:    none / silent ambient

## Usage

Used in `pages/index.tsx` (via `components/home/Hero.tsx`) as the hero's ambient background motion layer — a calm green-on-white particle drift.
HTML: `<video src="/assets/hero-ambient.mp4" autoplay muted loop playsinline>`
