# Motion and Temporal Design — Still Voltage

## Scroll Opening

This interface refuses the scroll before the visitor can attempt it. The page load state is consequently the entire motion budget — there is no later, no second act triggered by downward gesture. What the load sequence must accomplish is extraordinary in ambition and compressed in duration: black resolves into the deep navy field, the `×` grid crosses materialize out of the background as though the coordinate plane of the world is being drawn in real time, and then the 3D isometric island assembles itself into view at center-left. This is not a hero image loading — it is a scene booting. The sequence carries the narrative weight that most sites distribute across six to eight scroll sections. Every millisecond of the load animation is load-bearing, and the motion director must treat it accordingly: no default fade-ins, no generic opacity ramp. Each layer of the depth stack — background field, grid overlay, island scene, UI callout — should enter at a distinct temporal offset, making the four-layer hierarchy legible through sequencing before it is legible through visual contrast alone.

## Hero Experience

The hero is the 3D scene at rest, and its idle state is the longest-running animation on the site. Once loaded, the island does not hold still: the cherry blossom tree — the composition's vertical dominant, bleeding past the viewport top — cycles through a slow ambient petal-fall, branches tracing micro-arcs against the dark field. The monster truck and low-poly architectural props sit rigid by contrast, their geometric stillness making the organic tree motion feel more alive by opposition. This section is a strong video background candidate. The suggested approach: a pre-rendered ambient loop of the full island scene in slow idle — cherry petals drifting, the neon ring cycling through a subtle pulse, the headlights casting a warm flicker across the sandy platform. The subject is the island at rest, shot from the same isometric overview angle as the design, in a 10-second loop with no perceptible cut point. The "CLICK TO START" callout and hand-drawn arrow should not animate continuously — they should arrive once, after the scene has settled, and then hold still. The instruction's stillness against the living scene behind it is the tension that makes the whole composition breathe.

**Hero video:** `hero-idle-loop.mp4` — isometric island scene, slow ambient cycle, cherry petals falling, neon ring pulse, 10s loop, no camera move.

## Section Transitions

There are no section transitions in the scrolling sense. The single threshold this interface crosses is the click — the gesture that converts observer into participant. The transition from the cinematic overview state to the interactive world-navigation state is the highest-stakes motion moment on the entire site, and it must be treated as a scene cut rather than a page transition. Camera motion is the mechanism: the viewpoint compresses forward and downward into the scene, eliminating the safe isometric overview and placing the visitor inside the environment. The motion director should plan this as a single continuous camera move — not a cross-dissolve, not a fade-to-black — so that the spatial continuity between the title-screen world and the navigable world is preserved. The grid background should scale or recede rather than disappear, confirming that the coordinate plane the visitor saw from the outside is the same plane they now occupy from within.

## Content Rhythm

Because no content enters through scroll-triggered reveals, the content rhythm is entirely spatial — governed by the distance between objects in the 3D world and the pace at which ambient animations cycle. Each element in the scene operates on its own asynchronous loop: petal fall rate, neon ring pulse period, headlight flicker interval. The accumulation of these overlapping cycles creates the impression of organic life rather than choreographed sequence. For any secondary surfaces on the site — a portfolio grid that appears post-click, a project detail overlay — the recommended entry is a single unified fade rather than staggered reveals. Staggering implies sequence; this design implies simultaneity, a world that was already present rather than one that assembles itself for the viewer. If individual project cards must enter, they should do so as a group, at the same moment, the way a landscape appears when a curtain rises rather than the way a list populates.

## Footer Approach

No footer appears and none should. The experience ends when the visitor exits the interactive 3D world, not when the page runs out of content. If a closing state exists — a return to the title screen after the portfolio has been explored — it should reverse the opening camera move: the viewpoint pulls back and upward until the isometric overview is restored, the island receding to its original compositional scale, the "CLICK TO START" instruction fading back in. This reverse transition functions as the closest analog to a footer: a spatial beat signaling that the experience is available to be re-entered, not concluded. The motion director should plan for this return path even if the brief does not require it — the temporal grammar of the site demands a reciprocal closing gesture to match the opening reveal.

## Motion Principles

The timing philosophy is **ambient persistence over triggered response**. Animations do not begin and end in reply to user events — they run continuously, cyclically, at low energy, constituting a living environment that exists independent of whether anyone is watching. This is not the snappy micro-interaction school, where every state change resolves in under 200ms. Nor is it the languid scroll-cinema school, where reveals are paced to scroll velocity. The rhythm here is biological: the scene breathes on its own schedule, and the visitor enters a temporal current that was already flowing. The single exception to this ambient logic is the click-to-enter transition — a high-energy camera move that must feel mechanical and purposeful precisely because everything around it has been so continuous and low-key. Easing curves throughout should favor gentle ease-in-out for ambient cycles and a sharp ease-in with long ease-out tail for the click transition, emphasizing the decisive commitment of the entry gesture against the soft ongoing world it leads into.

## Video Placements

**1. Hero — Title Screen Island**
- Section role: Full-viewport hero, the entire interface in its pre-click state
- Asset filename: `hero-idle-loop.mp4`
- Subject: Isometric island scene at rest — cherry blossom petals falling in slow drift, neon ring pulsing at low amplitude (~3px radius oscillation), truck headlights casting warm amber flicker across the sandy platform. Camera is locked at the fixed overview angle. Motion quality: macro-ambient, slow drift, no camera move. Mood: inhabited stillness, a world waiting.
- Duration: 10s loop with imperceptible cut point
- Why video over still: The design's entire aesthetic argument depends on the distinction between the living scene and the static instruction text. A still image collapses this argument — the tension between "CLICK TO START" (frozen) and the island (in motion) is the composition. Without the ambient video loop, the scene reads as an illustration; with it, it reads as a world.

**2. World-Navigation Ambient — Interactive Environment Layer**
- Section role: Background environment layer during active portfolio navigation (post-click state)
- Asset filename: `world-ambient.mp4`
- Subject: Low-altitude drift across the island surface — close enough to see the ground platform texture and the shadow patterns cast by the blossom tree, far enough to read the architectural props and truck as landscape elements. Motion quality: slow handheld drift (simulated camera micro-movement), ambient petal fall continuing through frame. Mood: immersive diorama, the world persisting beneath the work being examined.
- Duration: 10s loop
- Why video over still: During portfolio navigation, the world must feel active and inhabited to maintain the fiction that the visitor is inside a place, not navigating a conventional grid. A still background breaks the spatial contract established at load; a looping ambient video sustains it through the entire interaction session.

**3. Scene Transition — Click-to-Enter Camera Move**
- Section role: The threshold between title-screen observer state and interactive participant state
- Asset filename: `enter-transition.mp4`
- Subject: Single continuous camera push — starting from the locked isometric overview, compressing forward and downward into the scene, passing through the neon ring perimeter, arriving at ground-level within the island. Motion quality: deliberate mechanical push, not a fly-through — the speed should feel like a decision rather than an accident. Mood: crossing a threshold, the spatial grammar of entering.
- Duration: 5s, non-looping (plays once on click, then transitions to interactive state)
- Why video over animation: The enter transition is the site's highest-stakes motion moment and must read as cinematic rather than programmatic. A CSS or JS-driven camera move carries the telltale smoothness of interpolation; a pre-rendered video move can be art-directed frame by frame, with the exact pacing, depth-of-field shift, and lighting change that the moment demands.
