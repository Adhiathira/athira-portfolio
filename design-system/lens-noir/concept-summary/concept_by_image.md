# lens-noir — Concept by Image

## Visual Identity

Cinematic film noir aesthetic — the visual language of A24 films, Criterion Collection covers, and the arthouse cinema tradition. Every design decision references the physical and emotional grammar of cinema.

## Color Register: Dark

Near-black surfaces (**#0c0c0e**) dominate with the completeness of a darkened theatre. Selective illumination through warm near-white text (**#f0ece4**) creates the feel of projected light on screen. Film-red (**#e63946**) is the only chromatic break in the monochrome palette — used as sparingly as a single color accent in a black-and-white film. Amber (**#f4a261**) marks numerals and data points, like a warm tungsten practical light cutting through shadow.

## Typography

**Bebas Neue** — the archetypal film poster font — commands all display roles at widths that match letterbox proportions. All-caps, generous tracking (0.08em), compressed line-height (0.95) mimics a title card printed at the full width of the frame. **Libre Baskerville** handles all body roles: its warm serifs recall newspaper film criticism, Criterion liner notes, and literary screenplays. The contrast between these two families — monumental sans vs. refined serif — is the typographic tension that defines the aesthetic.

## Layout Geometry

Sections are letterboxed — wide horizontal proportions, black bars top and bottom on the hero (80px each). The 2.35:1 cinematic aspect ratio governs the primary viewport. Container padding at 80px echoes the projection margin of a wide-format screen. Cards have no border-radius (cinema is rectangular: the frame, the screen, the credits card).

## Surface Treatment

Film grain texture overlay via CSS **::after** pseudo-element — a repeating noise pattern animated at irregular intervals, opacity 0.04. Invisible when scanning but felt as warmth and texture when the eye settles. Film-frame borders: **box-shadow: 0 0 0 1px rgba(255,255,255,0.08)** — the thinnest possible light-edge, like the light-leak at the edge of a projected frame.

## Accent Usage

Red is used exactly where a director uses color in a noir film: the detail that shouldn't be there, the thing that changes everything. Links turn red on hover. The one CTA button is red. The quote mark in a testimonial is red. Nothing else. Amber is the runner-up — statistical data only.

## A24 / Criterion Restraint

No gradients. No shadows other than the frame-edge glow. No decorative elements other than the film roll divider (repeating CSS squares in the footer). No border-radius. Emptiness is composition. The dark space between elements is as designed as the elements themselves.
