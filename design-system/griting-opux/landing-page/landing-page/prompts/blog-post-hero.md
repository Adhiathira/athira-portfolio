# Blog Post Hero Image

**File:** assets/blog-post-hero.jpeg
**Save to:** `landing-page/assets/blog-post-hero.jpeg`
**Type:** Image
**Dimensions:** 1100×600
**Aspect ratio:** 16:9
**AI Tool:** Higgsfield Nano Banana Pro
**Page:** pages/blog/[slug].tsx
**Section:** blog-post-image

## Context from code
- **Alt text:** "Griting mentorship platform visualization"
- **Nearest heading:** "The First Agentic Career Mentorship System from Silicon Valley."
- **Section purpose:** Full-width editorial image panel immediately below the blog post header. Displayed inside a dark-framed panel (backgroundColor #18181b, border 1px solid #27272a, borderRadius 14px). Subject is the Griting mentorship product — a phone held in hand showing a "Mentorship" app screen with the "G" brand logo, surrounded by a glowing teal/green node-and-network visualization. Parallax scroll effect drifts the image 20px upward. maxHeight 600px, objectFit cover.
- **Background:** Dark — image frame is #18181b with #27272a border; section background is the light off-white page tone

## Prompt
A close-up editorial product photograph of a modern smartphone held in one hand against a near-dark (#18181b) studio background. The phone screen displays a clean mentorship app interface labeled "Mentorship" with a bold circular "G" logo — typography is white on deep green. Surrounding the phone, a dense luminous node-and-network graph floats in the air, rendered in glowing electric teal (#00693e to cyan), with fine connecting lines and bright node clusters that pulse with soft radial light. The composition is slightly off-center, hand entering from the lower left, phone tilted at a natural 8-degree angle. The network visualization wraps around the phone as if the digital ecosystem is physically present. Color palette: near-black background (#18181b), brand green (#00693e), electric teal accent, clean white UI chrome. Lighting is entirely motivated by the screen glow and the network luminance — no harsh external light sources. Shallow depth of field blurs the far edges of the network into soft bokeh halations.

## Usage
Used in `pages/blog/[slug].tsx` inside `#blog-post-image`.
HTML: `<img src="/assets/blog-post-hero.jpeg" alt="Griting mentorship platform visualization">`
The image renders at 100% width inside a dark-framed container (maxWidth 1100px, borderRadius 14px, backgroundColor #18181b, border 1px solid #27272a), maxHeight 600px, objectFit cover. A GSAP parallax animation drifts the image y:-20px on scroll (scrub: 1).
