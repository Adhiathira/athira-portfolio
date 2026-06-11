# griting-opux — Layout Structure

> **Merge note:** Griting content is the baseline and appears verbatim. Opux additions are clearly labeled under "Supplemental Opux Layout Patterns."

---

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

---

# Supplemental Opux Layout Patterns

> These patterns are drawn from the Opux design system. They do not override griting's core column/gutter/max-width values. Use as named layout variants when building opux-derived compositions.

## Overall Page Philosophy (Opux)

The Opux page flows through approximately 8 major sections unified by a persistent dark background that transitions across the full scroll. The aesthetic is cinematic and immersive — a continuous dark environment (deep dark-to-charcoal gradient with animated wireframe terrain) rather than discrete white-box sections. Sections feel like acts in a presentation, not separate pages.

## opux-promo-banner

A fixed, full-width announcement strip (1728×48px) sits above the nav. Single row, centered content (1280px wide, inset 224px from each edge). A close button is pinned absolutely to the right edge at x=1424px. Acts as a dismissible system-level announcement layer.

## opux-nav-split-left-right

A fixed, transparent navigation bar (1728×81px, inset 56px). Logo anchored far left (177×32px at x=56px). CTA group (ghost button + terracotta filled button, 304px wide, 24px gap) anchored far right at x=1368px. Nothing in center. Nav is fully transparent — no background fill, reading directly over the hero.

## opux-hero-centered-column

Full-viewport-height, full-bleed. Content column is centered and approximately 50% of viewport width (1280px container, inset 224px). Stacked vertically: eyebrow label → headline → overlapping italic/script display text (a different font, rotated or offset, creating a typographic collision effect) → body paragraph → two CTA buttons side-by-side. Background is an animated 3D wireframe terrain tinted grid mesh filling the entire viewport with large ghost-lettering rendered at massive scale as atmospheric texture.

## opux-three-feature-cards

A three-column equal-width card grid (flex row, 16px gap). Cards use frosted/semi-transparent dark backgrounds. No icons — pure type hierarchy. Cards float visually on the full-bleed terrain background, not contained in a section box.

## opux-asymmetric-audience-split

Asymmetric two-column layout (flex row, 96px gap, space-between). Content is 1400px wide inset 162px from each edge. Left column (~420px): large display headline. Right column (~884px): stacked list of audience segments — each with icon, label, problem statement, and key differentiator paragraph. Segments separated by generous vertical spacing, not card-boxed.

## opux-how-it-works-steps

The "how it works" section (733px tall) uses a two-column flex row (96px gap) at 1400px content width inset 162px. Left: large section heading (~420px). Right: stacked numbered step items (~884px wide, 48px between items) — each step is a flex row with 24px gap between icon/number and text.

## opux-floating-product-screenshot

A centered product screenshot mockup (900×542px, inset 412px from each edge). Presented inside a browser-frame rounded-rect (852×542px). The mockup appears to break its section boundary, overlapping adjacent content — depth/parallax suggestion without actual parallax. Section uses flex column with 64px gap.

## opux-pricing-two-column

Symmetric two-column pricing layout (grid, 2 columns of 434px, 32px gap, 900px container inset 412px). One card is visually elevated (featured badge, stronger border treatment). Monthly/Yearly toggle pill (284×55px) is centered above the cards. Each card is flex column with 24px gap.

## opux-faq-accordion

Centered accordion stack (1024px section max-width, 800px container inset 462px). Each FAQ item is 800px wide, rounded-rect, 97px tall. Question text on left, chevron on right. Items separated by 16px gap. Frosted/transparent background on each item. 5 items total.

## opux-footer-three-column

Three-column footer (grid, 3 columns, 60px gap, 1280px container inset 222px). Left column (580px): logo + copyright. Center column: Legal links (Privacy Policy, Terms of Service). Right column: Support links (Sign In, Contact). Dark background, no decorative elements.

---

## Notable Opux Layout Patterns

**Full-bleed continuous environment:** The wireframe terrain background runs the entire page height — sections do not have individual backgrounds. Sections are content regions floating within one continuous environment.

**Typographic layering in hero:** Two different type treatments (clean sans headline + oblique/script display type) deliberately collide and overlap — a compositional choice creating visual tension and energy, not an alignment error.

**Floating product screenshot:** The demo mockup appears to break its section boundary, creating overlap with adjacent content — a depth suggestion without actual parallax.

**Transparent/glass cards:** Feature cards and FAQ items use frosted translucency rather than opaque fills, preserving visual continuity with the terrain background.

**Centered spine:** Almost every section uses a centered content column (varying widths: ~40% for text, 60–80% for cards/pricing). The page has a strong vertical centerline with no persistent sidebar or off-center anchoring.

**Top announcement bar + nav layering:** Two persistent top elements — announcement strip + navigation — create a layered header zone. The nav is transparent, pulling the hero visually upward to fill the full viewport.
