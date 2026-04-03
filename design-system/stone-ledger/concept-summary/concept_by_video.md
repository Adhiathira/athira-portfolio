## Motion Director Brief — Stone Ledger

This brief defines the motion language for a site built on the Stone Ledger design system. The visual system is achromatic with single-color punctuation; the motion system must match — nearly imperceptible durations, no animation for animation's sake, every movement in service of reading order and institutional gravity.

### Scroll Opening

Page load state: the viewport is pure off-white (`#f2efe9`), empty. The firm name enters first — a 4px upward translate plus opacity fade over 900ms ease, no overshoot, no spring. The founding jurisdiction line or tagline follows 200ms later on the same curve. The navigation bar is present and fully opaque from the first frame; there is no hero-background transparency trick here. Gravity begins immediately. No loading screen, no splash, no particle field — the warm off-white field is the opening statement.

### Hero Experience

The hero section is a **video background candidate**. Behind the firm name lockup, an ambient loop plays at reduced opacity (approximately 0.18–0.22 over a dark overlay): a slow exterior drift along the Kerala High Court's colonnaded verandah at early morning light. The columns pass at approximately one column per four seconds, suggesting the measured pace of institutional time rather than the quick cut of commercial video. Text sits in front of the video in the upper-left quadrant on a narrow content container; the columns move behind and below. The video never autoplay-pauses, never shows controls, never draws a cursor. It is atmosphere, not content.

**Asset:** `hero-bg.mp4` — 10s ambient loop, 3840×2160 preferred, 1920×1080 minimum. Subject: Kerala High Court exterior colonnaded walkway, dawn light, slow leftward drift at roughly 0.3× real-time playback speed. Mood: stone, shadow, the weight of precedent.

### Section Transitions

Transitions between sections follow the same logic as the achromatic palette: differentiation through surface, not drama. As the user scrolls from the hero into the first content section (practice areas), the video opacity fades to zero over a 200px scroll window and the background resolves to solid `#f2efe9`. No clip-path wipe, no parallax distortion — the video simply recedes as a surface beneath the type, and the type becomes the only thing left. Subsequent section boundaries are straight horizontal cuts; the shift from warm-gray sections to white sections reads as the page changing weight, not changing scene.

### Content Rhythm

Individual elements enter the viewport with the same 4px translate-up plus opacity fade used in the hero, but at 600ms duration rather than 900ms — the page has already introduced itself, the pace can quicken slightly. Stagger between sibling elements (practice area cards, attorney profiles) is 80ms per item. No bounce, no elastic easing, no scale — these belong to consumer products, not chambers. Headlines enter first; body copy follows after a 120ms delay. This mirrors the reading order without calling attention to the mechanism.

### Footer Approach

The footer is not a termination event; it is a continuation of the page surface. It enters with no animation at all — it is simply there when the user arrives, as fixed in place as a closing paragraph of a judgment. The only motion: the contact CTA gains a `0.2 opacity` increase on hover over 150ms ease. No translation, no scale change. The footer carries the firm's registered address, Bar Council numbers, and a one-line practice statement; all in muted gray at 12px, matching the `small` type token.

### Motion Principles

All durations: 600–900ms for primary reveals, 150–300ms for interactive states. All easings: ease or cubic-bezier(0.4, 0, 0.6, 1) — no spring, no bounce. Maximum translate on any reveal animation: 8px. No rotation animations anywhere in the system. No scale animations on text. The rule of thumb: if the motion would read as "effect" rather than "transition," remove it. The system's restraint is its authority.

### Video Placements

**1. Hero background — `hero-bg.mp4`**
Section role: establishes institutional identity before a single line of copy is read.
What it shows: the exterior colonnade of the Kerala High Court in Ernakulam, early morning — columns in warm sandstone light, long shadows, no people in frame, slow lateral camera drift. The building is recognizable to any Kerala High Court practitioner.
Duration: 10s loop with seamless cut.
Why video serves this section: a still photograph of the same colonnade would establish place but not time or atmosphere. The slow drift communicates that the institution moves at its own pace — unhurried, permanent. No still can convey measured forward motion.

**2. Legal library texture section — `library-ambient.mp4`**
Section role: transitions the page from exterior (High Court) to interior (the firm's competence), used as a background for the "Our Approach" or "About" section.
What it shows: extreme close-up drift across the spines of law reports — All India Reporter, Kerala Law Times, Supreme Court Cases — shelf after shelf, very slow rightward movement, warm tungsten light from below frame. No hands, no faces, no motion other than the camera drift.
Duration: 8s loop.
Why video serves this section: the visual vocabulary of the legal library communicates accumulated precedent and domain depth in a way that illustration or iconography cannot. The materiality of cloth-bound volumes, gilt spine lettering, and aged paper communicates the weight of the practice across decades. A still would show the library; the drift implies the inexhaustible depth of it.

**3. High Court courtroom — `courtroom-dawn.mp4`**
Section role: used in the contact or engagement section at the base of the page, reinforcing the arena where the firm operates before the user submits an enquiry.
What it shows: interior of a Kerala High Court courtroom — wood benches, high ceiling, morning light entering through tall windows at a steep angle, dust motes visible in the light shafts. No occupants. Camera is entirely static; the only motion is the slow movement of light across the bench over the 5-second loop.
Duration: 5s tight ambient loop.
Why video serves this section: a static courtroom photograph would serve the same recognition function but would read as decorative. The movement of light — slow, inevitable, indifferent — communicates that the institution proceeds regardless of any individual case. It is the correct final note before a potential client submits their matter for consideration.
