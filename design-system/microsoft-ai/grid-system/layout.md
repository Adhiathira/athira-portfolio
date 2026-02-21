# Website Layout System Brief

## 1. Overall Page Structure

The page follows a **classic long-scroll narrative structure** with approximately 8-10 major sections stacked vertically. The design uses a **centered, contained content approach** with strategic full-width moments for visual impact. 

The rhythm alternates between:
- **Centered, symmetrical sections** (hero, product showcases, credibility)
- **Asymmetric split-screen layouts** (content features, testimonials)
- **Grid-based card systems** (offerings, category solutions)
- **Simple list structures** (FAQ)

Each section is generously spaced with substantial vertical padding, creating a luxurious, unhurried reading experience.

---

## 2. Header & Navigation Layout

**Announcement banner**: Full-width, primary brand color background, centered text with inline CTA link. Dismissible close button on far right.

**Main navigation**: Horizontal bar with white/light background
- **Left side**: Company logo + brand wordmark
- **Center**: Primary navigation links (Nav Item 1, Nav Item 2, Nav Item 3, Nav Item 4, Nav Item 5, Nav Item 6) - each with dropdown indicators
- **Right side**: User account icon
- Navigation items are evenly spaced, likely using flexbox justify-between pattern

---

## 3. Hero Section

**Split-screen asymmetric layout** (roughly 45/55 split):

**Left column**:
- Eyebrow text: "CATEGORY" in small caps, generous top spacing
- Large display heading (multi-line, likely 48-60px)
- Body paragraph (medium weight, ~18-20px, constrained width for readability)
- Two CTAs in horizontal arrangement:
  - Primary: Solid button with icon
  - Secondary: Outlined/ghost button
- All text left-aligned within the column

**Right column**:
- Large hero image with **rounded corners** (12-16px radius)
- Image contains embedded play button overlay (centered circular control with accent color)
- Video thumbnail shows professional business context

**Spatial relationship**: Columns sit on same baseline. Image slightly larger to create visual weight balance despite having less text content.

---

## 4. Content Sections

### Product Showcase Section

**Structure**: Centered header + multi-column card grid

**Header block** (centered):
- Eyebrow: "SECTION LABEL" in small caps with generous letterspacing
- Large heading (centered)
- Body paragraph (centered, max-width ~700px)

**Card grid**: 
- **2-column layout** on desktop
- Cards feature:
  - Full-bleed image at top (rounded corners)
  - White content area below
  - Heading + description text (left-aligned within card)
  - CTA link with arrow icon
- **Vertical rhythm**: Cards stack with equal gaps (~24-32px)
- **Aspect ratio**: Images appear to be 16:9 or 3:2

**Variation**: Some sections show 4 cards in 2x2 grid, maintaining consistent spacing

---

### Content Feature Section (Asymmetric Split)

**Two-column split** (~40/60 ratio):

**Left column**:
- "Section Title" eyebrow (smaller, colored accent text)
- Large heading
- Descriptive paragraph
- **Numbered list** (1-4) with clear vertical spacing between items
- Each list item is a clickable element/link

**Right column**:
- **Collage/grid of overlapping images** showing resource materials
- Images positioned in a scattered, organic grid (2x2 base grid with slight rotation/overlap)
- Creates visual interest while showing multiple content types

**Spatial relationship**: Text baseline aligns with top of image collage. Content sits side-by-side with generous gutter (~48-64px).

---

### Credibility Section

**Centered vertical flow**:

**Top block** (centered):
- Large heading
- Body paragraph (constrained width)
- Single CTA button (centered)

**Full-width visual divider**:
- Large abstract 3D visualization spanning full viewport width
- Creates visual break and brand moment

**Three-column card grid**:
- Equal-width columns with generous gutters
- Each card contains:
  - Abstract gradient image/visual at top
  - Heading
  - Body text
  - "Learn more" link with arrow
- Cards appear to have subtle borders or shadows
- Background uses light gradient/wash for depth

---

### Category Solutions Section

**Centered header** + **horizontal scrolling carousel**:

**Header** (centered):
- "CATEGORY LABEL" eyebrow
- Large heading
- Description paragraph
- CTA button

**Carousel**:
- **Horizontal scroll container** with multiple cards
- Cards show partial next card (peek pattern to indicate scrollability)
- Each card: Image top → Heading → Description → CTA
- **Navigation controls**: Left/right arrow buttons positioned bottom-left of section
- Cards maintain consistent width (~400-500px)
- Rounded corners throughout

---

### Content Hub Section

Similar carousel pattern:
- Centered section heading and description
- "View Content Hub" CTA button
- **Horizontal card carousel** below
- Cards feature:
  - Large full-bleed images
  - Headline overlaid or positioned below
  - "Read more" CTA
- **Notable**: Card sizes appear varied, not uniform - creating visual rhythm and hierarchy

---

### Testimonial Section

**Asymmetric header**:
- "Featured Stories" heading (left-aligned)
- "View All Stories" button (right-aligned)
- Creates horizontal tension and clear CTAs

**Featured story card** (large, prominent):
- **Split layout within card** (~35/65):
  - **Left column**: 
    - Client logo at top
    - Story headline (large, multi-line)
    - Description paragraph
    - Category badges/chips at bottom (pill-shaped, outlined)
  - **Right column**: 
    - Large featured image (presentation/conference scene)
- Card has rounded corners and subtle shadow/border
- **Logo carousel** below: Horizontal strip showing other client logos as tabs/navigation

---

## 5. Footer Layout

(Not fully visible in screenshots, but likely follows standard patterns):
- Multi-column link grid
- Legal/compliance links at bottom
- Newsletter signup possible
- Social media links

---

## 6. Notable Layout Patterns & Design System

### Spatial Rhythm
- **Generous vertical spacing** between sections (~80-120px)
- **Consistent internal padding** within cards and containers (~32-48px)
- **Breathing room** around headings and text blocks

### Rounded Corners
- **Consistent corner radius** across cards, images, buttons (~12-16px for large elements, ~8px for buttons)
- Creates softer, more approachable brand feel

### Centered vs. Asymmetric
- **Alternating rhythm**: Centered sections → Split layouts → Centered sections
- Creates visual interest while maintaining clear hierarchy

### Card Patterns
- **Three distinct card types**:
  1. Image-top vertical cards (product showcase)
  2. Horizontal split cards (testimonials)
  3. Icon/visual-top cards (credibility pillars)
- All maintain consistent corner radius and spacing

### Typography Hierarchy
- **Eyebrow text**: Small caps, letterspaced, often colored accent
- **Headings**: Large (48-72px hero, 32-48px section), bold weight
- **Body**: Medium size (~18-20px), generous line-height (1.6-1.8)
- **CTAs**: Clear visual weight with button backgrounds or bold links

### Color as Structure
- **Primary brand color** used strategically for:
  - Primary CTAs
  - Accent text
  - Interactive elements
  - Navigation highlights
- Creates visual hierarchy through color contrast

### Overlapping & Layering
- **Minimal use of overlapping** - design favors clean separation
- Where used (content collage), adds personality without chaos
- Generally prefers **clear containers and boundaries**

### Responsive Considerations (implied)
- Multi-column grids likely collapse to single column on mobile
- Horizontal carousels maintain on mobile with swipe gestures
- Split sections stack vertically on smaller screens
- Generous spacing scales proportionally

---

## Key Takeaways for Implementation

1. **Establish a clear vertical rhythm** with ~100px section spacing
2. **Use 12-column grid** for flexibility (2-col, 3-col, 4-col divisions)
3. **Maintain consistent card padding** (32-40px internal)
4. **Apply corner radius system**: 16px large, 12px medium, 8px small
5. **Center narrow text blocks** (~700px max-width for readability)
6. **Create visual breaks** with full-width imagery between sections
7. **Balance symmetry and asymmetry** to maintain interest across long scroll