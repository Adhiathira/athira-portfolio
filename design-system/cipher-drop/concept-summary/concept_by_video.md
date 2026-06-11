# cipher-drop — Concept by Video

## Motion Identity

The motion language of cipher-drop is built around one metaphor: data arriving. Every animation simulates the experience of information being transmitted, decoded, and rendered on a phosphor screen.

## Hero Sequence

**Opening state:** Pure black screen. A cursor blinks in the top-left corner — Share Tech Mono, green, 1s step-start blink.

**Matrix rain:** Characters cascade from top to bottom across the hero background — a CSS grid of spans, each running matrix-rain-char animation at staggered delays. The effect: a waterfall of green code filling the darkness.

**Headline appearance:** The h1 text scrambles into existence — characters randomize through the ASCII table 5 times before resolving to the actual text. Duration 1.2s total, character delay 20ms stagger. This is GSAP ScrambleText.

**Subhead:** Revealed via data-reveal keyframe — clip-path sweeps left to right in 4 discrete steps. 0.15s total.

**CTA buttons:** Appear with flicker animation — opacity snaps through 0.6→1→0.8→1 in 0.15s. Machine power-on.

## Scroll Animations

**Feature cards:** Stagger into view with GSAP fromTo y:16→0, once:true. Not smooth ease — each card snaps in with step-start easing. They arrive, not glide.

**Stats section:** Numbers count up in monospace format — 000→final value, formatted with leading zeros or binary padding. GSAP Counter with custom formatter.

**How it works steps:** Each hex step (0x01, 0x02, 0x03) data-reveals in sequence. The accompanying text flickers on 0.1s after.

**Testimonials (system logs):** Timestamps type in first (Share Tech Mono, small, green), then message text types character by character. Simulates reading a live log stream.

## Ambient Loops

**Matrix rain background:** Continuous loop throughout the hero — green characters cascade at varying speeds and delays. Leading characters at full #00ff41 brightness, trailing characters fade to #008f11 then #004d08.

**Scanline overlay:** A repeating-linear-gradient of semi-transparent black lines sweeps downward continuously via the scanline keyframe. Simulates CRT phosphor refresh.

**Nav border pulse:** The bottom border of the navigation subtly brightens and dims on a 3s loop when idle — a system heartbeat.

## Interaction Motion

**Hover on cards:** Immediate border color step to #00ff41 full brightness. 0.05s step-start. No tween. State flip.

**Hover on buttons (primary):** Reverse video — background goes black, text goes green with glow. Instant. Binary.

**Hover on nav links:** Text-shadow glow appears: 0 0 8px rgba(0,255,65,0.5). Step-start. 0.05s.

**Hover on any heading:** glitch-shift plays once — 0.15s horizontal jitter.

## Video Placement Recommendations

1. **Hero background:** Matrix digital rain video — real-time rendered, 30fps, green characters on black, varying speeds and brightness levels. Aspect ratio: full viewport.
2. **Features section divider:** Short loop of binary data stream — 01001101 0x4D patterns scrolling horizontally, 4s loop.
3. **About page hero:** Terminal boot sequence — POST messages, memory check, system initialization, cursor blink, login prompt. Black/green only. 8s loop.
4. **Contact page:** Network packet visualization — data packets moving across a dark field with green trail effects. Abstract, not literal.

## Generation Prompts (Kling)

> **Matrix rain:** photorealistic rendering of cascading green binary/ascii characters on pure black background, single bright leading character fading to dark green trail, depth of field slight, CRT phosphor aesthetic, no faces, no real objects, pure abstract digital rain, seamless loop, 1080x1920 vertical

> **Boot sequence:** black terminal screen, white monospace text appearing line by line — POST system check, memory count, hardware detection, then green blinking cursor, then [SYSTEM READY] in bright green, CRT scanline effect, 8 second loop
