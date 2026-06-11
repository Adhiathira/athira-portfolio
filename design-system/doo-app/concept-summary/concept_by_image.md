# Doo App — Concept by Image

## Brand Premise

A lightweight consumer productivity tool — task management, to-do, or scheduling — built with an aesthetic of deliberate restraint. The site operates in a single register: white, airy, and typographically controlled. It does not use color for emotional framing (no hero background, no accent-filled CTA section). Instead, a single vibrant purple-blue accent is reserved exclusively for the primary CTA button, making it the only chromatically assertive element on the page. Everything else is white surface, neutral grays, and a clean humanist sans-serif held at light weight. The exception is the support page header — a soft pastel lavender-blue — which functions as a wayfinding device rather than a brand expression.

## Color Architecture

The color system is functionally minimal. White (#ffffff) is the page background throughout. Body text is a medium neutral gray (#6e6d7a). Headings are a dark gray-green (#383938) rather than pure black — slightly warm, not cold. Navigation text matches the body gray; nav links match the heading gray. A single vibrant purple-blue (inferred from the analysis) is the sole accent color, used only for the primary CTA button. The pastel lavender-blue support header is the one instance of background color variation outside white. The system contains no named color tokens in the extracted CSS variables — the palette is small enough to not require a formal naming convention.

## Typography System

Avenir Next (proprietary, not web-accessible) is the sole typeface. The headline weight is 400 — light for a display scale — applied at 65px with -2.6px letter spacing, producing an Apple-esque compressed-but-airy effect. Section subheadings follow the same weight at 39px with -1.56px tracking. Body paragraphs are 19.5px/400 with generous 35.1px line height. The combination of large type at light weight and extreme letter-tightening is the site's primary typographic character: generous, open, but not heavy. There is no bold-weight display moment anywhere in the system. Everything breathes.

## Spatial System

The page moves through four spatial modes. The hero is a centered single-column composition: large light-weight headline, short supporting text, one primary CTA button, and a full-width device mockup below showing the product across multiple hardware targets. Each content section below stacks a centered text block above its corresponding device mockup — a repeating vertical unit that creates a calm, documentary rhythm. A three-column grid section handles testimonials and short feature highlights — the only instance of horizontal density on the page. The support page introduces an asymmetric two-column layout for FAQ accordions, with a sticky left column acting as category navigation. All section boundaries are straight horizontal edges with generous whitespace; no divider geometry.

## Photography and Editorial Voice

Media is entirely device mockups — phone, laptop, watch — showing the product UI in various states. These images are foreground content rather than decorative illustration; each mockup corresponds directly to the feature text above it. No lifestyle photography, no abstract illustration. On the features page, small inline screenshots appear within the text flow to anchor specific UI details. The editorial voice is documentary: describe a feature, show the screen. The visual hierarchy is text-first, then image as evidence.

## Navigation and Wayfinding

The navigation bar is transparent throughout, remaining transparent even on scroll — consistent with the extracted tokens showing `navBackgroundScrolled: "transparent"`. Logo left, navigation links right-of-center, single CTA button far right. The nav becomes sticky on scroll with a subtle drop shadow appearing at its bottom edge (visual separation from content without a fill). The support page uses a sticky left navigation column within its content area as secondary wayfinding within a long documentation section.

## Overall Design Character

Doo App is a minimalism-as-product-statement site. The design makes an argument through restraint: if the product is simple and trustworthy, the site should be simple and trustworthy. Whitespace is the primary design tool — large vertical gaps between sections, generous internal padding, and a spacious type scale that never crowds itself. The purple-blue CTA is the design's one concession to visual call-to-action convention, and its singularity makes it land. The universal motion language — one gentle fade-and-slide for every element — is the animation equivalent of the Avenir Next weight choice: unified, unhurried, controlled.
