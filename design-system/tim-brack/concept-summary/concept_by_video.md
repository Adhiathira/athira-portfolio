# Tim Brack — Concept by Video

## Scroll Opening

The page loads into the typographic intro section: a large block of Grotesk-Bold text fills the viewport, left-aligned, white background. Some words are rendered in a lighter gray rather than full black — these words transition to black as the user begins to scroll, creating a typographic color-fill animation that draws the eye downward. This animation is the page's opening motion event, and it requires scroll to resolve — the user must engage to see the full text settle into black. There is no autoplay video, no ambient animation, no loading sequence.

## Hero Experience

The typographic intro section has no media — it is a full-viewport text block. The "hero experience" is the act of reading this text while it fills with color on scroll, followed by the reveal of the first showcase module below. The showcase modules become the visual punctuation: when the first large image and its 206px title come into view, this is the site's first moment of visual complexity, and the parallax effect on the title (slower scroll rate than the page) gives it a subtle depth and kinetic presence. The "hero" is typographic, and the first image is the reveal.

## Section Transitions

All section transitions are hard straight-edge horizontal cuts. The rhythm of the page is governed by the consistent vertical whitespace between repeating showcase modules — a measured pause between projects that functions as white-page breathing room. The single significant transition event is the color inversion from the white showcase area to the dark gray CTA footer: the background shifts hard from white to dark, and the typography inverts from black-on-white to white-on-dark. This is the page's only color event, deployed with maximum impact as the closing statement.

## Content Rhythm

Motion is applied at two scales. On the main page: the typographic color-fill in the intro section, and the parallax scroll offset on showcase titles (titles scroll at a slower rate than the page, creating a layered depth effect with their associated images). On detail pages: standard fade-and-slide-up reveals for gallery images as they enter the viewport. There is no stagger in the gallery — each image reveals independently as it crosses the viewport threshold. No GSAP orchestration, no scroll actors, no continuous ambient motion.

## Footer Approach

The dark gray CTA section arrives as a hard color cut after the final white showcase module. Large centered white title, supporting body text above it. No entrance animation — the section is static. The color inversion is the announcement: the page's only significant tonal shift does the work that animation would do elsewhere.

## Motion Principles

The motion vocabulary is minimal and purposeful. The typographic color-fill on scroll is the site's signature motion — it uses the act of scrolling itself as the trigger for text to become fully legible, creating a physical sense of the reader's engagement completing the content. The parallax offset on showcase titles gives the composition a subtle dimensional quality without requiring explicit depth effects. Detail page gallery reveals are functional and understated. There is no ambient motion, no continuous animation, and no visual complexity beyond what these three techniques contribute.

## Video Placements

**1. Showcase Module Background — Motion media integration**
- Suggested file: `project-showcase-clip.mp4`
- Subject: A short, looping video clip of one of the portfolio projects in motion — a design concept animating, a product being used, a space being traversed — treated as a media asset that can occupy the same position as a static image in one of the showcase modules; the clip should be designed to include a clear text-safe zone (a region of low contrast or negative space) where the 206px overlapping title remains readable; 4–6s loop; the aesthetic of the clip should be consistent with the monochromatic, high-contrast visual register of the page
- Duration: 4–6s loop
- Why video: The showcase sections use static photography as their primary media. Introducing one video clip — in the same position and at the same scale as the other images — would give the portfolio a temporal dimension that static images cannot provide. For the right project (a product in use, a space animated, a motion design piece), a looping clip communicates the work's nature more directly than a still frame. The challenge is that the 206px title must remain legible over the moving content.

**2. Typographic Intro Section — Very subtle background texture**
- Suggested file: `intro-texture-ambient.mp4`
- Subject: An extremely slow, barely-visible movement over a white or near-white textured surface — fine paper grain, a linen weave, or a wall in raking light — so subtle that the section reads as a white background at a glance but reveals slight motion on sustained attention; 15s loop; the video must be nearly imperceptible, functioning only to give the white ground a material quality rather than a digital void
- Duration: 15s loop
- Why video: The typographic intro section is a pure white field with large black text. A near-still ambient background video would give this section a physical quality — a white page rather than a white screen — consistent with the print-editorial register of the site's design language. This placement only earns its existence if the motion is so subtle as to be subthreshold at a glance.
