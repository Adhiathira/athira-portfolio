# Motion Brief: Pale Orison

## Scroll Opening

The page arrives without announcement. No entrance animation on the nav — it simply exists at the top, static and certain, uppercase letters already in place. The hero text materializes on a warm off-white field not through a fade but through a slide that originates below — 20px of vertical travel over 0.351 seconds, a motion that feels more like settling than appearing. The floating UI mockup panel beneath the headline arrives half a beat later, as though the text summoned it. The overall register at page-top is: composed, already complete.

## Hero Experience

The hero functions as an editorial statement rather than a cinematic reveal. The background is static warm off-white — no ambient video behind the headline, no gradient sweep, no depth of field. The hero earns its gravity through **scale and letter spacing**: Montserrat at 88px with 0.08em tracking creates a physical sensation of weight without requiring motion to establish it. If the product concept calls for human presence — a workspace, a studio, a maker's hand — the appropriate motion here is restraint: the UI panel below the headline can animate through a slow parallax drift (0.1× scroll rate), making it feel like a floating object rather than a flat screen. Nothing else moves in the hero at rest.

## Section Transitions

Transitions between sections are managed through whitespace expansion rather than animated dividers. As the user scrolls from the off-white hero into the saturated gradient feature cards, the transition is spatial — the card's top edge appears at the viewport boundary and slides up at normal scroll rate, no animation easing applied to the cards themselves. The contrast of entering a saturated color field after the neutral hero registers as a rhythm shift without any mechanical transition. Returning to off-white from the gradient cards follows the same logic: the page breathes out. The dark application panel section, when it appears, is the most abrupt shift — it arrives at scroll velocity, demanding visual attention through contrast alone.

## Content Rhythm

Individual elements enter the viewport using the slide-up keyframe (translateY 20px → 0, opacity 0 → 1) at 0.351 seconds with ease-in-out timing. Feature cards within a row stagger by 0.1 seconds each — enough to register as sequential without feeling mechanical. Heading text leads; body text follows at the next stagger interval. The overall rhythm is unhurried: the 1.3× duration scale applied throughout means nothing snaps — elements arrive the way objects settle on a table surface, with a slight natural deceleration at rest.

## Footer Approach

The footer arrives without ceremony. No wipe animation, no gradient fade from the final content section. The hairline that separates footer from body (if present) is the only structural signal. Social icons and legal links are already at resting opacity — there is no entrance animation for the footer. The page has said what it needs to say; the footer simply closes the document.

## Motion Principles

**Timing philosophy:** Measured. The 1.3× duration scale across all tokens means the system's fastest transition (0.234s) is still perceptible — it is not instantaneous. The system does not snap; it settles. The slow timing token (1.17s) is reserved for accordions and overlays — large structural changes that deserve deliberate pacing.

**Easing character:** Standard ease-in-out for opacity and position transitions. The decelerate curve (cubic-bezier(0.68, 0, 0.23, 1)) is reserved for transform transitions — things that physically arrive at a resting place. Nothing uses spring or bounce easing; the aesthetic register is restraint over expressiveness.

**Reduced motion:** Full support — all animations reduce to 0.01ms duration, meaning the page reads identically in layout and content, only losing the temporal dimension of arrival.

## Video Placements

**1. Product Dashboard — Section: Feature Showcase (hero-bg.mp4)**
- Role: The floating UI mockup panel in the hero section
- Suggested filename: `hero-product-ambient.mp4`
- What the video shows: A slow pan across a live application dashboard — task cards rippling subtly as data updates in real time, user avatars blinking into presence in a multiplayer session, cursor trails visible in the periphery. Motion quality: macro + handheld-steady, like a documentary cinematographer watching a workspace in quiet operation. Mood: focused stillness punctuated by small live events.
- Duration: 10s loop — the temporal quality of waiting for something to happen, then watching it happen, is what justifies video here over a static screenshot. A still image shows the UI; the loop shows that it is alive.
- Why video: A static product screenshot is evidence; a looping ambient capture is presence. The hero must communicate that this is not archived software — it is running right now.

**2. Dark App Panel — Section: Full-Width Dark Media Anchor (product-dark.mp4)**
- Role: The full-width dark application interface section
- Suggested filename: `product-dark-ambient.mp4`
- What the video shows: A calendar week view in dark mode, with events appearing one by one in slow succession — as though the week is being planned in real time. Cursor moves deliberately between time slots. One event block changes color mid-loop. Motion quality: timelapse-adjacent but at human speed, not accelerated. Mood: concentrated, methodical, the feeling of a day being organized.
- Duration: 10s loop — the narrative of a week filling up requires time to register; a 5s loop would feel incomplete.
- Why video: The dark panel section exists to demonstrate the product at depth and scale. A still image shows a calendar; video shows someone using a calendar — the difference between seeing a tool and understanding how a tool feels in use.

**3. Feature Cards — Section: Floating Gradient Showcase (features-ambient.mp4)**
- Role: Background ambient for one of the saturated gradient feature cards
- Suggested filename: `features-ambient.mp4`
- What the video shows: An extreme close-up of a physical keyboard surface, backlit, fingers in the near distance — soft focus, barely present. The card's gradient sits above it as a color overlay. Motion quality: slow drift, almost imperceptible, like watching light shift on a matte surface. Mood: material presence, the suggestion of making.
- Duration: 5s loop — tight ambient, meant to give the card surface a sense of depth without becoming the thing you look at.
- Why video: The gradient cards are high-saturation design moments; a looping textural substrate behind the gradient prevents the card from reading as flat. The physical material reference (keyboard, workspace) ties the abstract color to a specific kind of human work.
