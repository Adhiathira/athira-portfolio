# Motion Direction — Spun Loam

A creative brief for a motion director working within the Spun Loam design system. This is not a list of animations — it is a description of how this particular aesthetic breathes, what earns movement, and where stillness is the correct answer.

---

## Scroll Opening

The page loads to a state of arrested potential. The background field (`#f5f2ee`) is already present — it does not fade in. What arrives are the text elements: the wordmark arrives letter by letter from 8px above, each character delayed by 15ms. The easing is `ease-in-out` (the system's primary easing), not spring physics — no overshoot, no bounce. By the time the last character settles, the animation has lasted approximately 0.4s for a 15-character heading. GSAP implementation: `gsap.from('.heading .char', { y: 8, opacity: 0, duration: 0.35, stagger: 0.015, ease: 'power2.inOut' })` triggered after a 120ms page-load delay.

The body copy follows 200ms after the heading completes: `gsap.from('.subhead', { y: 6, opacity: 0, duration: 0.3, ease: 'power2.inOut', delay: 0.54 })`.

The CTA button arrives last, 350ms after the heading: opacity 0 → 1, duration 0.25s, no translation. It should feel like the stamp is pressed into the surface after the text is already set — a final registration, not a reveal.

---

## Hero Experience

The hero field (`#f5f2ee`) is static. Movement would dilute the material authority of the warm linen ground. The only motion in the hero is the arrival sequence described above.

However, in a variant layout that uses `hero-texture.mp4` as a background: the video should be composited behind the text layer using CSS `mix-blend-mode: multiply` on the text container, so the warm linen texture shows through the type at a subtly reduced opacity. The text should never appear to float above the background — it should appear to be part of it.

GSAP ScrollTrigger pin: the hero section is pinned for the first 15% of scroll depth, then releases. During the pin, the letterforms of the headline shift at 0.3× scroll speed using `gsap.to('.hero-text', { y: scrollDistance * 0.3, ease: 'none', scrollTrigger: { scrub: true } })` — barely perceptible parallax that communicates depth without announcing itself.

---

## Section Transitions

Sections arrive with a horizontal rule that draws across the viewport: a `<div class="section-rule">` with width animated from `0` to `100%` over `0.6s` at `ease-in-out` as the section enters the viewport at 80% scroll threshold. GSAP implementation: `gsap.from('.section-rule', { scaleX: 0, transformOrigin: 'left center', duration: 0.6, ease: 'power2.inOut', scrollTrigger: { trigger: section, start: 'top 80%' } })`.

The section heading enters 100ms after the rule completes. Body text follows 80ms after the heading. The sequence is: rule → heading → body — always this order, never simultaneous. The rule is the announcement; the heading is the subject; the body is the content. Motion follows grammar.

For grid sections (portfolio, archive), the grid cells enter in a column-by-column stagger: column 1 at 0ms, column 2 at 60ms, column 3 at 120ms, column 4 at 180ms. Within each column, items are staggered by 40ms from top to bottom. GSAP: `gsap.from(columnItems, { y: 16, opacity: 0, duration: 0.4, stagger: 0.04, ease: 'power2.inOut', delay: columnIndex * 0.06 })`.

---

## Content Rhythm

Individual content elements enter the viewport with positional settle rather than opacity fade: `translateY(12px)` → `translateY(0)`, duration 0.4s, `ease-in-out`. No blur. No scale. The element was not in position and now it is — the motion is declarative, not expressive.

Caption text and metadata elements in `--color-muted-text` (`#aaa59b`) enter 80ms after the primary element they annotate: they are always the last thing to arrive, confirming their informational hierarchy through sequencing rather than size. GSAP: `gsap.from('.meta, figcaption', { y: 8, opacity: 0, duration: 0.3, ease: 'power2.inOut', delay: parentArrivalTime + 0.08 })`.

For numeric counters (quantities, measurements, catalog numbers), a counting animation runs on viewport entry: `gsap.fromTo('.counter', { textContent: 0 }, { textContent: finalValue, duration: 1.2, ease: 'power2.out', snap: { textContent: 1 }, scrollTrigger: { trigger: '.counter', start: 'top 75%' } })`. The numbers count up in less than 1.2s — present themselves as data being calculated rather than data being revealed.

SVG decorative rules (horizontal section dividers) use stroke-dashoffset path drawing scrubbed by scroll: `svgPath.style.strokeDasharray = pathLength; gsap.fromTo(svgPath, { strokeDashoffset: pathLength }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: svgPath, start: 'top 90%', end: 'top 30%', scrub: 1 } })`. The line draws as the user scrolls through it — each section boundary earns its arrival.

---

## Footer Approach

The footer's 72px top padding gives adequate space for the user to settle before the footer content becomes visible. No reveal animation for the footer itself — the closing content should already be present and visible as the user scrolls to it. The footer is punctuation: it closes, it does not perform.

The single animation in the footer: a subtle magnetic hover effect on the primary CTA or contact link. `document.querySelectorAll('.footer-cta').forEach(el => { el.addEventListener('mousemove', (e) => { const rect = el.getBoundingClientRect(); const x = (e.clientX - rect.left - rect.width / 2) * 0.15; const y = (e.clientY - rect.top - rect.height / 2) * 0.15; gsap.to(el, { x, y, duration: 0.4, ease: 'power2.out' }); }); el.addEventListener('mouseleave', () => { gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' }); }); })`. The element follows the cursor at 15% amplitude and returns with an elastic ease that overshoots once — the only spring-physics moment in the entire system, reserved for this single closing gesture.

---

## Motion Principles

The system's timing philosophy is **deliberate and bilateral**. The primary duration for structural arrivals is 0.4s. The primary easing is `ease-in-out` (`cubic-bezier(0.4, 0, 0.2, 1)` as secondary variant) — symmetric, meaning nothing rushes in and nothing drags out. Elements accelerate gently and decelerate gently, the way a precision instrument reaches its registered position and holds it without oscillation.

All animations operate at a fixed 24px-or-less displacement amplitude. No element travels more than 24px during its entry animation — the motion describes settling into position, not arriving from afar. At 8–16px of Y-travel and 0.3–0.4s duration, the velocity is approximately 27–53px/s, which is below the threshold of "noticed motion" in peripheral vision. The animations are felt rather than watched.

GSAP ScrollTrigger is the primary scroll animation library. Splitting.js handles character-level splitting for heading arrivals. Lenis smooth scroll should be initialized before all GSAP ScrollTrigger instances to ensure consistent scroll position reporting.

Reduced motion: all entrance animations should check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` — if true, skip all `gsap.from()` transitions and render elements at their final positions immediately. The magnetic hover effect may also be disabled under reduced motion.

---

## Video Placements

Three sections earn ambient looping video over a static image, each for a distinct structural and atmospheric reason:

### 1. Hero — `hero-texture.mp4`
- **Section role:** Primary hero / entry screen
- **Filename:** `hero-texture.mp4`
- **Subject:** Extreme macro close-up of raw linen weave or unbleached rag paper grain. A single horizontal axis of slow drift — approximately 2–3mm/s apparent motion at macro focal length, which translates to a visually imperceptible drift over 10 seconds. Shot under diffused natural light with no hard shadows. No camera shake. The frame contains nothing identifiable — only woven or pressed fiber structure.
- **Motion quality:** Macro lens (minimum 100mm equivalent), ultra-slow lateral drift on a motorized slider, consistent exposure, no color grading (the warmth comes from the subject, not from a LUT)
- **Duration:** 10s loop — longer loop prevents the motion from cycling noticeably during above-fold dwell time
- **Why video over still:** A static texture image reads as a pattern — reproducible, decorative, surface-level. A video of slowly moving texture reads as a *surface with physical weight* — something that exists in space rather than being applied to it. The motion, barely perceptible, is what separates material presence from decorative treatment.

### 2. Process Section — `process-ambient.mp4`
- **Section role:** Features, methodology, or craft process section (mid-page)
- **Filename:** `process-ambient.mp4`
- **Subject:** Hands working at a wooden or stone work surface — adjusting, measuring, placing objects with deliberate precision. Not staged for camera. The action should be genuinely functional: adjusting a measurement tool, placing a specimen, aligning a document corner. Objects on the surface should belong to the product's domain. The frame should be approximately 80% hands and work surface, 20% ambient environment.
- **Motion quality:** Slow handheld at approximately 1/60s shutter — enough motion blur in the background to suggest depth without making the work area unreadable. Natural window light from camera left. No artificial lighting. Soft focus on background; sharp on the hands and the primary object.
- **Duration:** 8s loop — short enough to feel like a specific working moment, long enough to not feel rushed
- **Why video over still:** Still photography of a process implies a staged decision — someone posed for the photograph. Video of actual working motion communicates that something is genuinely being made, which is the same quality this design system communicates through its condensed precision and material warmth. The motion authenticates the work.

### 3. Archive / Catalog Grid — `material-field.mp4`
- **Section role:** Portfolio, archive, or product catalog grid (typically a 4-column bento grid section)
- **Filename:** `material-field.mp4`
- **Subject:** Overhead top-down shot of a flat-lay arrangement — paper documents, archival materials, precision tools, or specimens organized on a warm wooden or stone surface. The arrangement has the deliberate composition of a spread in a technical journal or field guide: items grouped by type, margins consistent, nothing decorative. The camera performs an extremely slow optical zoom out (focal length adjustment, not digital crop) over 10 seconds — barely perceptible, enough to create the spatial experience of surveying a working surface.
- **Motion quality:** Overhead tripod with leveled frame, slow optical zoom from approximately 85mm equivalent to 70mm equivalent over 10s (15mm change, extremely gradual), warm temperature correction only (no tonal grading), no movement besides the zoom
- **Duration:** 10s loop
- **Why video over still:** A static overhead flat-lay is editorial art direction — it demonstrates visual skill. A slowly receding overhead shot is spatial — it gives the viewer the experience of being above a working surface, looking down at organized knowledge, understanding the extent of what is there. The zoom creates a relationship between viewer and subject that no static composition can replicate: the sense that there is more, and that the camera is beginning to show it to you.
