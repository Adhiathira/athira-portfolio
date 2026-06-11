# Doo App — Concept by Video

## Scroll Opening

The page loads completely static: white background, centered headline at full opacity, device mockup below the fold. The navigation bar is transparent over the white hero — barely visible. No entrance animation on load. The hero composition is a pre-formed still: the space is designed, not arrived at.

## Hero Experience

The hero is composed around a single device mockup below the text cluster. As the user begins scrolling, the mockup fades and slides upward into view — a gentle animation that confirms the scroll is working rather than performing a dramatic entrance. There is no visual complexity in the hero: no layering, no video, no floating elements. The headline's large light-weight type at -2.6px letter-spacing is the hero's entire statement. The CTA button, in purple-blue, is the only color event in an otherwise achromatic opening.

## Section Transitions

The page transitions between sections through whitespace alone — large vertical gaps between each centered text block and its corresponding media. There are no divider shapes, no background color changes (except the support page header), no overlap or layer reveals. Each feature section ends, and the next begins, separated by negative space. The absence of transition devices is itself a design decision: the rhythm is the rhythm of patience.

## Content Rhythm

Elements enter the viewport with a subtle fade-in and short-distance slide-up — the same animation applied to every content element on every page. Headlines arrive slightly before their supporting text or media, establishing a fractional top-down reading order. The animation is never the event; it is the delivery mechanism. The three-column grid section animates as a group, not with card-level stagger. The FAQ accordions are static on enter; the expand/collapse interaction uses a standard chevron rotation.

## Footer Approach

The footer arrives as a straight cut from the last content section. No animated closer, no color change. The structure is functional and static.

## Motion Principles

One animation pattern, applied universally: gentle fade-in + short upward slide on viewport entry. Duration is slow and unhurried — matching the spacious type scale and generous whitespace rhythm. The left navigation column on the features page becomes sticky at a point, scrolling the right column's content beneath it — the page's one interaction that involves relative layer movement. No GSAP-level orchestration, no parallax, no hero video, no scroll actors. Motion is the same everywhere so that the product, not the site, is what the user remembers.

## Video Placements

Two sections would gain from ambient video in a restrained implementation:

**1. Hero Device Area — In-app task flow ambient loop**
- Suggested file: `hero-device-ambient.mp4`
- Subject: A close, slow-motion capture of a hand using a mobile device — creating a task, checking it off, seeing a completion state — on a clean white or light surface; 8s loop; the gesture is deliberate and satisfying; no face visible; the surrounding environment should be calm (desk surface, soft natural light); the phone's screen content is the visual anchor
- Duration: 8s loop
- Why video: The hero device mockup shows a single UI state. A video replacing that static image — showing the core interaction at a slow, comfortable pace — would make the hero feel lived-in rather than illustrated. The white background and light-weight type register make a slow, human interaction video the ideal media choice: present but not competing.

**2. Feature Stacked Section — Product UI ambient loop**
- Suggested file: `feature-ui-ambient.mp4`
- Subject: A tight, overhead recording of a tablet or phone screen showing the app organizing a set of tasks — grouping, reordering, completing — in a 10-second loop; clean device on a light wooden surface; no extraneous elements; slow and purposeful motion; seamlessly loopable
- Duration: 10s loop
- Why video: The stacked editorial sections use static device mockups to illustrate each feature. One of these — the feature showing task organization or the completion interaction — is most effectively shown in motion. A 10s loop replacing the static mockup in one section would demonstrate the interaction's fluidity without disrupting the page's meditative rhythm. All other sections retain static imagery; this is the page's one kinetic proof point.
