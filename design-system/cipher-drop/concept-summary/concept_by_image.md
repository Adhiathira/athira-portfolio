# cipher-drop — Concept by Image

## Visual Identity

cipher-drop is built on a single foundational image: a phosphor CRT terminal in a dark room, the screen filled with cascading green characters — the Matrix digital rain. Every design decision flows from this image.

**The ground:** Pure black #000000 — not dark gray, not near-black. The absence of light. The void of space before the signal arrives.

**The signal:** Matrix green #00ff41 — the specific phosphor frequency of a P1 green CRT display. Not lime, not neon, not chartreuse. The exact green of a VT100 terminal running at full brightness.

**The body:** Dark green #008f11 — the same phosphor dimmed by half. Text that exists but recedes. The secondary voice of the machine.

**The surface:** #0d1a0d — a black screen with the faintest green backwash. Surface panels absorb the signal.

## Typographic Character

Every character is monospaced. No exceptions. Share Tech Mono for headings — it carries the retro terminal character of a 1980s system font. Space Mono for body — hacker-readable at 0.8125rem. There is no proportional type. The grid of characters IS the design.

Headers are all-caps with 0.05–0.15em tracking. The uppercase forces a command-line authority. Letters do not curve — they transmit.

## Component Vocabulary

Components are terminal panels — bordered rectangles with 1px solid rgba(0,255,65,0.4). No border-radius. No box-shadow. No gradients. The border is the panel. The content is the data.

Buttons are two states: matrix green on black (primary) or black with green border (ghost). Hover triggers reverse video — the terminal selection state. This is not a UI animation; it is a state flip.

## Spatial Language

The grid is tight: 16px gutters, 20px container padding, 48px section spacing. Terminal density — more data per screen, less whitespace. The screen real estate belongs to information, not breathing room.

## Decorative Language

- Digital rain characters as background texture
- CRT scanline overlay via repeating-linear-gradient
- Hex prefixes (0x01, 0x02) as numbering
- Binary strings as ornamental text
- Code comment prefixes (// ) for descriptive text
- Timestamp formatting for testimonials / log entries
- Blinking cursor character as motion accent

## Aesthetic Position

This is not a design system that tries to look like a hacker movie. It is a design system that looks like what actual terminal interfaces looked like — and what they still look like in the imaginations of every developer who has ever opened a shell at 2am. It is specific, referential, and unapologetic. Pure signal, zero noise.
