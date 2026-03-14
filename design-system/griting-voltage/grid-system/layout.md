# Griting-Voltage — Layout Structure

## Page Width

The page is designed at 1440px canvas width. Most content sections use a 1420px inner width, leaving a small 10px inset on each side. The navigation and footer span the full 1440px. Horizontal padding on the outermost container is approximately 22px (derived from the logo's left inset of ~1.56% of 1430px).

## Navigation

The nav bar is a flex row spanning the full 1440px width at 72px tall. It has three logical zones: the logo anchored to the left (~22px from the left edge), a centered spacer, and nav links pushed to the right side. The nav links group is 383px wide with 26px horizontal padding and 45px gap between items.

## Hero Section

The hero is full-bleed at 1420x980px with a dark green background (#003620). It uses a single-column grid — no horizontal split. The headline and CTA buttons are positioned at the bottom-left quadrant of the section, overlaying the full dark background. This is a purely typographic layout with no image or video column dividing the space.

## Feature Sections (GritMe)

Three GritMe feature sections (Auditable Talent System, AI Incubation System, Mentorship) each use a two-column asymmetric split grid at ~1420px wide. The left column carries text content (heading, description, feature list) at roughly 40% of the width. The right column displays a product screenshot or feature card group at roughly 60% of the width. These sections alternate background treatments between off-white and dark.

## Ecosystem and Card Grid Sections

The "Explore Griting Ecosystem" section is 1440px full-bleed with a dark background. The heading and subheading are centered. Below them, three cards (Businesses, Individuals, Community) are arranged in a 3-column equal-width grid.

A separate "New Infrastructure" section earlier in the page uses a 4-column card grid to present four feature pillars side by side.

The "Expanding Ecosystem" section uses a 2-column layout presenting two product cards (GritLab, GritHub) side by side.

## Testimonials

The testimonials section sits on a white background at 1440px wide and 1265px tall. Cards are arranged in a 3-column equal-width grid. The cards vary in height, giving the section a masonry-like visual rhythm even if the underlying grid is uniform.

## CTA Banner

A full-bleed dark section with centered heading and a horizontal group of CTA buttons. No column subdivisions — purely centered single-column content.

## Footer

The footer is full-bleed at 1440x565px with a dark background. It uses a 5-column equal-width grid: logo/brand column, Product links, Company links, Contact links, and a Support/CTA column on the far right.

---

## Additional Layout Variants (from still-voltage integration)

The following layout patterns from still-voltage are incorporated as supplementary variants. They do not override any griting layout — they extend the vocabulary for sections where the new combined site warrants them.

### Header Nav Row (Centered Flex)
A three-item centered flex row with 56px gap between items. Useful for a simplified nav or a sub-header row that centers its content rather than splitting left/right.

### Feature Grid 2×2
A 2-column, 2-row equal grid for presenting four feature tiles in a compact square formation. Each tile contains a headline, short description, and product screenshot card. Complements griting's existing 3-column and 4-column card patterns by adding a square-format variant.

### Hero Product Asymmetric Split (65/35)
A 2-column asymmetric split at 65fr/35fr for sections where a primary product UI screenshot dominates the left area and a secondary supporting image anchors the right. This is distinct from griting's 40/60 GritMe split — it is more image-dominant and suited to showcase panels rather than feature explanations.

### Tablet Responsive Breakpoint (810px–1399px)
A uniform 63px row-gap and column-gap applied to multi-column grids at the 810px–1399px tablet range. Griting did not define this breakpoint explicitly; still-voltage's gap discipline at this size is layered in to give card grids and the testimonials section comfortable breathing room at tablet widths.
