## Scroll Opening

The page loads in silence. No entrance animation, no loading screen — the hero is present immediately, already occupying its full 192px vertical field. The first motion the viewer perceives is their own scroll: the fixed navigation crystallizing from transparent to white as the page descends, a 2.47-second opacity transition that is felt rather than noticed. This is a system that does not announce its arrival; it waits to be found.

## Hero Experience

The hero section earns ambient video rather than a still image because its whitespace is active — that 192px of silence is asking for something to move slowly within it. Not an action shot or a product reveal, but an atmospheric hold: the kind of footage that rewards extended attention. The hero background video should feel like a long-exposure photograph that never stops — soft, textural, unhurried.

**Hero background candidate:** A 10-second ambient loop of light shifting across a flat surface — paper stock, white limestone, or bleached linen — with no identifiable objects and no horizon. The motion should be perceptible only after 2–3 seconds of watching, matching the 2.47s primary transition duration of the motion system. Suggested asset filename: `hero-bg.mp4`. This placement is justified over a still because the long padding field demands temporal depth; a still image would feel frozen within it.

## Section Transitions

Sections arrive through scroll-triggered opacity and vertical position shifts — `y: 30, opacity: 0 → 0, 1` over 0.65 seconds (the secondary motion duration). No horizontal sweeps, no clip-path reveals. The transition reads as emergence rather than entry: content rising from below the visible threshold into legibility. Between sections, the white page background continues uninterrupted — no section dividers, no background color changes — so the transitions are purely typographic and positional, not chromatic.

## Content Rhythm

Individual content elements stagger at 0.1-second intervals within each grid row. Editorial splits (`2fr 1fr`) load left-column first, then right — respecting the reading direction. Feature grids (`1fr 1fr`) load both columns simultaneously with matched opacity but slight vertical offset (`y: 20` left, `y: 30` right) to prevent perfectly synchronized arrival. The effect is more like leaves settling than items checking in.

## Footer Approach

The footer arrives with no particular ceremony — a simple opacity fade over 0.65 seconds as the final section clears the viewport. There is no closing animation, no scroll-to-top gesture, no motion flourish. The page ends the way it began: typographically, quietly. The Raleway uppercase labels are the last thing to fully opacify, their letter-spacing becoming readable as the last act of the scroll.

## Motion Principles

The overall timing philosophy is **deliberate and pressbound**. The primary duration (2.47s) comes from a source that used opacity transitions for media blocks — slow reveals that imply the content has weight, that arrival is earned. The easing (`ease-in-out`) has no sharp entry or exit: it begins slowly, builds to full pace, then decelerates. Combined with the Playfair Display 800 heading weight, the system operates in a register that is more print than digital — it assumes the reader is not in a hurry, and it rewards that assumption.

No springy easings. No bounce. No motion that would feel at home in a mobile app. The system moves like a broadsheet page being turned.

## Video Placements

**1. Hero Background**
- Section role: Hero
- Asset filename: `hero-bg.mp4`
- Subject: Light diffusing across an uncoated paper surface — neither warm nor cool, the paper equivalent of silence. Subtle, barely-perceptible shift in illumination angle over 10 seconds. No objects, no hands, no text.
- Duration: 10 seconds, seamless loop
- Motion quality: Extremely slow drift — almost imperceptible without 3+ seconds of attention
- Why video over still: The 192px hero padding creates a white field that demands temporal depth, not spatial complexity. A still image inside that much whitespace would feel like a specimen in a case. A slow-motion light study breathes inside the silence without competing with the headline weight.

**2. Process / Craft Showcase**
- Section role: Product or editorial showcase (mid-page feature, `2fr 1fr` grid layout)
- Asset filename: `process-ambient.mp4`
- Subject: Close-up, macro-distance footage of a specific material process — ink being absorbed into uncoated stock, a fine-tipped tool making a precise mark, or pigment dispersing in water. Camera fixed or near-fixed. Subject fills frame.
- Duration: 5 seconds, loop
- Motion quality: Macro, slow — the kind of footage that shows process without showing a person
- Why video over still: The `2fr 1fr` editorial grid gives the left panel commanding width; a static image at that scale would read as decoration. Video at macro distance makes the material world legible at a different resolution — the opposite of ambient.

**3. Studio or Archive Environment**
- Section role: Brand story or philosophy section (lower on the page, likely single-column or `1fr 1fr`)
- Asset filename: `studio-interior.mp4`
- Subject: Interior space — a workshop, archive room, or printing studio — filmed at medium distance with a slight push-in (dolly or optical zoom, 5mm over 8 seconds). Natural light from a single window source. No people in frame.
- Duration: 8 seconds, loop
- Motion quality: Slow push-in, handheld steadied — enough movement to register depth without calling attention to the camera
- Why video over still: This section carries the brand's temporal logic — the idea that the work existed before the viewer arrived and will continue after. A still communicates presence; a slow push communicates duration.
