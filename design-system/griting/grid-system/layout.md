# Griting Landing Page — Layout Structure

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

## Additional Screen Grid Contexts

### landing-page-auditable-section

This is the scroll-driven auditable section of the landing page, shown as a distinct Figma frame. It uses an asymmetric split layout within a rounded full-width card (1420x1031px, bg-[#f5f6f5], rounded-[20px]).

- **Tab bar**: 1146px wide pill (86px tall, rounded-[20px]) centered in the section. Three tabs: For Businesses / For Individuals / For Community. Active tab shown in brand green (#00693e); others in dark/black.
- **Left column (~33%)**: Numbered scroll-nav list — "01 Talent outcomes" (active), "02 Outputs by multi-dimension" (muted), "03 Simulates with real project" (muted). Active item has a 12px green square bullet marker.
- **Right panel (~60%)**: Rounded content card (866x640px, bg-[#d7e8d9], border-[#b8e7bc], radius 10px) containing heading and body text.
- **CTA group**: "Get in Touch" (solid green, 154px wide, 52px tall) and "Book Demo" (outline) buttons, right-aligned in the section header.
- The tab switching is scroll-driven: scrolling within the section switches tabs and changes the right panel content.

### partners-page-view-1 / view-2 / view-3

These three frames capture the same Griting Partners page with three different active tab states. The layout is a dark cinematic full-bleed 1440px design with 114px symmetric gutters (1212px content width).

**Gutter system:**

| Gutter | Value | Used by |
|--------|-------|---------|
| Primary container margin | 114px | Partners tab bar, partner content, use-case photo left, nav logo area |
| Secondary inset | 225px | What We Provide 2×2 grid |
| Nav logo left | 74px | Logo only |
| Section heading max-width | 745px | Partners heading |

**Tab states:**
- view-1: Tab 1 active — "Rapid-Growth Startups" (progress bar fill ~366px, left third)
- view-2: Tab 2 active — "AI-Transforming Companies" (progress bar fill centered)
- view-3: Tab 3 active — "Multi-Disciplinary Talent Organizations" (fill at left-[829px] w-[383px], right third)

**Section vertical rhythm:**

| y-position | Section / Element |
|------------|-------------------|
| 0 | Hero start |
| 24px | Nav logo top |
| 301.5px | Hero headline top |
| 436px | Hero subtitle top |
| ~499–540px | Hero CTAs |
| 1051px | Partners section start |
| 1166px | "Griting Partners" heading |
| 1463px | Partners tab progress bar |
| 1476px | Partners tab labels |
| 1600px | Partner content section |
| 2235px | API/Integration bullets |
| 2510px | Use Cases start |

**What We Provide grid (2×2):** Left column at 225px, right column at 735px. Card width 480px, card height 285px. Column gap and row gap both 30px. Icon circles 64px diameter with #9f9fa9 border. Total grid width 990px, inset 225px from both canvas edges.

**Use-case cards:** 3 stacked, each 900.514px wide × 311px tall, left-aligned at calc(37.5% + 24.26px) (~564px). Photo panels alternate sides: card 1 photo at right (~1091px), card 2 photo at left (114px).
