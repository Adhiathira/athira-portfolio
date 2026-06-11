# Motion & Scroll Experience Analysis — Noir Register

## The Opening Frame

The page loads without ceremony. There is no fade-in, no gradual revelation of color. The electric amber field — #FFD600 — is present at **frame zero**, the way the bare bulb in an interrogation room is already on when you walk in. It is not turned on for you. It was always on.

The nav bar elements are already in position. No staggered entry, no choreographed arrival sequence. What loads is the full environment, assembled and waiting. A declaration, not an introduction.

The film does not begin. You arrive in the middle of it.

---

## Video Placement: Hero Background

**Venetian blind light shaft falling across a dark surface.**

Behind the 3D object — or as a secondary layer beneath the amber field in a dark-mode variant — venetian blind light shafts fall at a shallow angle across a flat surface. The slats of light are wide, the gaps between them wider. The bands do not move except through the almost imperceptible drift of a camera that is not quite still. The surface beneath could be concrete, could be lacquered black, could be the hood of something.

The light shafts repeat the geometry of the headline: **horizontal, overflowing, cutting across the frame**. The display type and the light bars are both too large for their containers. Both extend past the edge. Both announce themselves before you are ready.

This placement functions as the **ambient atmosphere of the hero** — not the foreground, not the focal point, but the environmental condition that tells you what kind of world you are in. The amber brand color above and the light shaft texture below are the same value in different registers: a single-source warm light against infinite dark.

Motion spec: drift only, no hard movement. The light shifts approximately 3% of frame width over 8 seconds on a loop. The ease is linear. Nothing accelerates. Nothing stops. It just continues.

---

## Hero Experience

The primary motion event is the **typographic metamorphosis**.

The display headline does not simply arrive. It transforms. The grotesque block-weight characters shift — through scroll progress, not autoplay — into the combined grotesque-plus-script display state. Individual letterforms transition between their two available identities: the structural weight and the expressive cursive form coexisting within a single font family, and the headline moves between them as the scroll position advances.

This is not a text swap. This is a **character revelation** — the formal surface of the word giving way to its expressive interior, or vice versa, depending on the direction of travel. The timing is scroll-driven: 0% scroll position shows the full grotesque-weight headline; as the user descends, the script forms emerge. The transition reads like fate being gradually spelled out in a language the reader only partially knows.

The 3D rendered object enters with a single settling motion: a slow Y-axis rotation from approximately 25 degrees off its final pose to its resting tilt (~15–20° pitch). The entrance duration is **1.4 to 1.8 seconds**, ease-out, decelerating smoothly into stillness. The motion character is weighted — the object has apparent mass. It does not snap into position. It arrives.

After the entrance, the object may continue on a **very slow ambient rotation** — a single full orbit over 40–60 seconds, so gradual it reads more as breathing than animation. Like something that is alive but not threatening. Or threatening but not rushing.

The subheading copy in the lower-left quadrant enters with a short upward translate and fade — approximately 300–500ms after the 3D object begins its entrance. It is subordinate in the entry sequence, arriving after the thing that matters.

---

## Video Placement: Atmospheric Section

**Rain on a dark window at night.**

In any section that transitions below the hero — a product page, a feature deep-dive, a context-setting passage — the background carries a **rain-on-glass video** as its texture layer. The rain falls diagonally, left-to-right, against a window that looks out on nothing. The scene beyond the glass is not visible — only darkness, and the amber catch of a distant streetlight that never gets closer. The rain tracks are elongated, rapid, and dense at the upper frame before dispersing and slowing near the lower edge.

The overlay sits at approximately 15–20% opacity above the near-black section background (#101010). It is not meant to be the primary visual event. It is the **condition of the room** — the kind of detail that tells you what time of night it is and what the weather is outside and how long the person sitting here has been sitting.

Motion spec: the rain plays on a 6-second seamless loop. The diagonal angle of the streaks is 70–75 degrees from vertical. Individual drops are not isolated; this is sheet rain, city rain, rain that has been falling all night and will continue until the scene is over. The streetlight reflection in the lower-right of the window glass does not move.

This placement is not decorative. It establishes **temporal context**: this page exists at a specific moment (night, rain, amber light) that the static color system only implies. The video says the hour.

---

## Section Transitions

Given that the visible structure of this design is a **single hero composition** with no conventional scroll-revealed sections, section transitions are concentrated within the hero viewport itself.

What scrolls is not the usual sequence of feature blocks arriving from below. What scrolls is a single layered composition that transforms in place:

- The **background field** is static — the amber holds
- The **typography layer** transforms through scroll-driven weight changes — block to script, declaration to inflection
- The **media layer** (the 3D object) may carry a subtle parallax differential, drifting upward at 0.85x the scroll speed of the typography, creating depth without any section boundary being crossed

The headline — already extending past the right viewport edge — may also **track horizontally** at a different rate than the 3D object during scroll, creating a lateral parallax pull. The type moves left slightly as the object moves right slightly. They separate. They do not look at each other as they part.

---

## Content Rhythm

There is no stagger of arriving cards. No sequence of feature rows entering from below. The rhythm is concentrated entirely in the **three-layer hero system**: background (static), typography (scroll-driven transformation), media object (weighted entrance, possible slow orbit).

The motion logic follows the composition logic: **restrained in quantity, deliberate in weight**. Two or three carefully timed events, each given enough duration to register as intentional. Nothing rapid, nothing casual.

Easing: ease-out throughout. The design does not accelerate; it decelerates. Everything is already in motion when you arrive. You witness the settling, not the launch.

---

## Video Placement: Product Detail

**Hands under a single bare bulb light.**

For any product close-up, component reveal, or detail callout section: the background or supporting visual carries a **hands-under-a-bulb composition**. Two hands — close-cropped, well-lit only at the center — hold or examine a small machined object. The light source is a single exposed incandescent bulb, directly above the frame. Everything beyond approximately 8 inches from the hands dissolves into darkness. The shadows on the backs of the hands are deep and directional. The object the hands hold is either the same 3D-rendered product from the hero, or an abstraction of it — a fragment of its circuit geometry, a single panel, a corner.

The video has minimal motion: a very slow rotation of the held object — not the camera, but the object itself being turned between the hands. Approximately 1 revolution per 12 seconds. The hands are still. Only the object turns.

This placement functions as **the proof-of-object** — the moment in the story where the thing is examined, handled, assessed. It is intimate in scale and extreme in contrast. The hero showed the object floating in amber space. This shows it held in human hands, under a light that does not flatter anything.

Motion spec: the rotation is continuous, seamless loop. The hands do not shift. The bulb does not swing. Only the object moves.

---

## Footer Approach

The utility bar does not approach. It is already there.

Fixed to the viewport bottom at frame zero, dark-surfaced and watching, it persists through every scroll state unchanged. Its appearance is immediate. Its motion is zero. The dark strip and its paired pill CTAs do not enter; they were there when you arrived and they will be there when you leave.

If dismissed — consent accepted or declined — it **slides down out of the viewport** over approximately 250ms, ease-in. Not a fade; a departure. It does not vanish. It leaves. And the viewport without it is slightly more empty, slightly more exposed.

The hard edge where dark bar meets amber hero above it is not softened. It is a cut, held in place.

---

## Motion Principles

The motion system for oxide-night is built on a **single organizing principle**: weight before speed.

Animations in this system are not used to introduce content progressively, to communicate loading states, or to reward interaction with delight. Motion is concentrated in one high-value moment — the typographic transformation — and one weighted arrival — the 3D object's entrance. Everything else is static or near-static.

This concentration of animation energy means:

- **Duration is generous** — the 3D object entrance takes 1.4–1.8 seconds. The typographic transformation plays across the full scroll range. Nothing rushes.
- **Easing curves lean toward deceleration** — ease-out everywhere. Custom deceleration on the 3D object. The system never accelerates into an end state; it slows into it.
- **Nothing bounces** — no elastic physics, no spring simulations, no overshooting keyframes. The motion character is closer to a heavy door swinging closed than a ball returning to rest.
- **The ambient loops are slow enough to forget** — the possible 3D object orbit, the venetian blind drift, the rain texture loop — all operate on cycles of 8 to 60 seconds, far below the threshold of consciously perceived repetition.

The overall motion character is a **luxury print house that has been convinced to let its work move**. Each motion event is deliberate, significant, and brief enough to let the static composition reassert itself before the next thing happens.

Nothing snaps. Everything arrives. And when it has arrived, it is simply there — occupying the frame with the same indifference the dark field occupies the viewport.

That indifference is the design.
