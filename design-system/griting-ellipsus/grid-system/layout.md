# Griting-Ellipsus Landing Page — Layout Structure

## Page Width

The page is designed at 1440px canvas width. Most content sections use a 1420px inner width, leaving a small 10px inset on each side. The navigation and footer span the full 1440px. Horizontal padding on the outermost container is approximately 22px (derived from the logo's left inset of ~1.56% of 1430px).

## Navigation

The nav bar is a flex row spanning the full 1440px width at 72px tall. It has three logical zones: the logo anchored to the left (~22px from the left edge), a centered spacer, and nav links pushed to the right side. The nav links group is 383px wide with 26px horizontal padding and 45px gap between items. Two CTA buttons (Log in outlined, Sign up filled) sit in the right zone.

## Hero Section

The hero is full-bleed at 1420x980px with the brand's dark green background (#003620). It uses a single-column grid — no horizontal split. The headline and CTA buttons are positioned at the bottom-left quadrant of the section, overlaying the full dark background. This is a primarily typographic layout.

**Floating typographic scatter (enriched from ellipsus):** Individual lowercase letters may drift at low opacity across the hero canvas — scattered at varying positions and sizes — adding immense spatial depth as an ambient background texture without any imagery. This pattern is optional but consistent with the griting brand concept of layered information density.

## Feature Sections (GritMe)

Three GritMe feature sections (Auditable Talent System, AI Incubation System, Mentorship) each use a two-column asymmetric split grid at ~1420px wide. The left column carries text content (heading, description, feature list) at roughly 40% of the width. The right column displays a product screenshot or feature card group at roughly 60% of the width. These sections alternate background treatments between off-white and dark.

## Ecosystem and Card Grid Sections

The "Explore Griting Ecosystem" section is 1440px full-bleed with a dark background. The heading and subheading are centered. Below them, three cards (Businesses, Individuals, Community) are arranged in a 3-column equal-width grid.

A separate "New Infrastructure" section earlier in the page uses a 4-column card grid to present four feature pillars side by side.

The "Expanding Ecosystem" section uses a 2-column layout presenting two product cards (GritLab, GritHub) side by side.

## Manifesto Editorial Section (enriched from ellipsus)

A light background section in the asymmetric editorial style. Large display text spanning roughly 60% of the viewport width, left-aligned — not centered, but weighted left. The right side of the section holds floating decorative illustration elements positioned to frame the text loosely. Key phrases within the text may use italic styling or the griting accent color for emphasis. The overall tone is literary and typographically expressive, consistent with griting's mission-driven copy style.

Annotated callout arrows pointing to brand value statements are an optional decoration layer. The illustrations are hand-drawn or line-art style, floating freely without column constraints.

## Version / Feature Cards Section (enriched from ellipsus)

Three equal-width tall cards displayed side by side at approximately 30% viewport width each. Cards may be slightly cut off at left and right edges, implying additional cards outside the viewport (carousel pattern). The cards partially emerge from the bottom of the preceding dark section as a teaser. Background colors follow griting's dark-green brand palette.

## Testimonials

The testimonials section sits on a white background at 1440px wide and 1265px tall. Cards are arranged in a 3-column equal-width grid. The cards vary in height, giving the section a masonry-like visual rhythm even if the underlying grid is uniform.

## CTA Banner

A full-bleed dark section with centered heading and a horizontal group of CTA buttons. No column subdivisions — purely centered single-column content.

## Pre-Footer CTA Dark Panel (enriched from ellipsus)

A transitional dark background section before the footer. Left side (~55% width): final action-oriented headline with a secondary CTA button below. Right side (~45% width): a large illustration element — line-art or conceptual graphic consistent with griting's visual language. The bottom edge of this dark panel uses a smooth SVG wave divider that flows organically into the footer, giving the section transition a hand-crafted quality rather than a hard line.

## Footer

The footer is full-bleed at 1440x565px with a dark background. It uses a 5-column equal-width grid: logo/brand column, Product links, Company links, Contact links, and a Support/CTA column on the far right.

## Section Rhythm

The page alternates dramatically between dark (griting brand green #003620) and light (off-white) backgrounds. This alternation is the primary rhythm driver — it creates a push-pull tension that keeps the reader moving. The sequence is:

1. Hero (dark)
2. New Infrastructure (light)
3. Ecosystem (dark)
4. GritMe features (alternating)
5. Manifesto editorial (light)
6. Version cards / Expanding ecosystem (light-to-dark transition)
7. Testimonials (light)
8. CTA banner (dark)
9. Pre-footer CTA (dark)
10. Footer (dark)

Every major section is full-viewport-width — background color is the primary section indicator.

## Notable Layout Patterns

### Organic Wave Dividers (from ellipsus)
Section transitions between dark and light may be handled with smooth SVG wave curves rather than hard horizontal lines. This gives the page an organic, hand-crafted quality. The pre-footer-to-footer transition uses this pattern.

### Full-Bleed Section Alternation
Every major section is 100vw. The alternation between dark green and off-white backgrounds does all the section work. No cards, boxes, or containers divide the page vertically; background color is the section indicator.

### Floating Illustrative Elements (from ellipsus)
In the manifesto editorial and pre-footer sections, hand-drawn or line-art illustrations appear to float freely — not contained within columns or cards. They overlap text zones, bleed toward edges, and create the sense of objects scattered on a studio desk. These always follow the griting dark-green color scheme.

### Asymmetric Split Grids
The dominant layout pattern for feature content is the 40/60 or 60/40 split — text column + visual column. This is griting's core feature presentation mechanism.

### Typographic Annotation System (from ellipsus)
Inline text emphasis via color, underline, or hand-drawn stroke marks key phrases. Combined with handwritten callout text and arrow illustrations, this creates an informal annotation layer that sits above the primary copy hierarchy. Used in the manifesto section.

### Three-Zone Navigation
Logo | centered spacer | links + CTA. Consistent across all pages at 72px height.

### Responsive Gap System (from ellipsus)
At 780px+: row-gap and column-gap of 1.5rem for card grids.
At 820px+: row-gap and column-gap step up to 2.5rem.
Desktop (1440px): griting's native spacing takes over.
