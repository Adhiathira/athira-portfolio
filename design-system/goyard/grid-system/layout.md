`★ Insight ─────────────────────────────────────`
The genericization task here is essentially a semantic transformation — the layout grammar (structural tokens) must be preserved while the brand vocabulary (semantic tokens) gets replaced. This mirrors how design systems work: structure is reusable, content is context-specific.
`─────────────────────────────────────────────────`

# Website Layout Brief

## 1. Overall Page Structure

The page flows through approximately **8–9 distinct sections**, each with its own background tone and spatial logic. The rhythm alternates between dark and light sections, creating a breathing cadence that feels deliberate and editorial. The overall flow is:

1. Sticky dual-bar navigation
2. Full-bleed hero video
3. Product carousel (light)
4. Editorial split section — "Explore" (light, asymmetric)
5. Split editorial — "Feature A" (light, image-dominant)
6. Stacked editorial blocks — "Feature B" (light, image bleeds)
7. 3-up product grid — "Product Collection" (light)
8. Newsletter signup with image (light, split)
9. Secondary carousel (dark)
10. Footer (dark)

---

## 2. Header / Navigation Layout

The navigation is **split into two horizontal bars**, both sticky:

- **Top bar** — Very narrow. Left: location pin + search icon. Center: Brand Name wordmark with small tagline label beneath. Right: account/login icon. This bar is dark with light type.
- **Secondary bar** — Slightly narrower than the first. Contains only centered, widely-spaced navigation labels: Primary Nav Item · Primary Nav Item · Primary Nav Item · Primary Nav Item. Same dark background, smaller spaced-caps type.

The dual-bar structure separates brand identity from navigation — a convention that prevents crowding the wordmark with links. The entire nav system is tight in vertical height, taking up no more than ~60px total, which maximizes content real estate below.

---

## 3. Hero Section

**Full-bleed video hero**, 100% viewport width and height. The video content bleeds to all edges with no letterboxing or container inset.

Centered headline typography floats over the video in three stacked lines — large, widely-spaced serif caps: "PRIMARY / BRAND / MESSAGE." The type is light and sits roughly at the vertical midpoint, slightly favoring the center-left.

Beneath the headline, a small Primary CTA link is underlined with a fine line, rendered in a light accent color against the video.

Bottom-left corner: minimal video controls (pause + mute icons). Bottom-right corner: a small illustrated brand mascot floats as a persistent decorative element, adding brand personality without disrupting the editorial tone.

The hero communicates total visual immersion — no white space, no padding, just brand world.

---

## 4. Content Sections

### Product Carousel — "Feature A"
Light background. Three product images arranged in a **horizontal triptych**, each with equal column width and generous vertical breathing room. Products are transparent/cutout images floating on the background — no box shadows or cards. Captions below each image use spaced-caps sans-serif, small scale. The layout is centered within a contained inner column, with substantial margin on both sides.

### Explore Section
**Asymmetric two-column layout.** Left column holds a taller portrait-ratio image (~60% width). Right column holds a second portrait image (~40% width, slightly shorter, slightly lower vertical start). The two images are not aligned to a shared baseline — there's a deliberate offset that creates visual tension and depth. Below the left image: a social media handle with icon, underlined in an accent color. The section header is a centered, full-width headline that spans above both columns, acting as a section title bridge.

### Feature A Editorial
**Split editorial — left text, right image.** Left half is light with centered, stacked headline copy in large dark serif, with secondary body line and a small spaced-caps CTA link beneath. Right half is a full-height product photograph that bleeds to the right edge of the viewport. The split is approximately 30/70 — text takes less than a third of the width, image dominates. The image extends all the way to the top and bottom of the section without visible padding.

### Feature B (below Feature A)
Another **full-bleed image block** that bleeds to both edges. The image appears to be a subject photograph cropped to show partial figure. Overlaid headline text in light serif caps appears mid-image, anchored to lower center. This section transitions directly into the next without a clear dividing line — the images bleed into each other vertically, creating a seamless scroll moment.

### Product Collection
Back to light background. A centered section headline above a **3-column product grid** — each column holds one product image (transparent/cutout), equal-width, equally spaced. No card containers. Caption text below each image in small spaced-caps. The grid has generous top and bottom padding, giving it an editorial, unhurried quality.

### Newsletter Signup
**Two-column split.** Left column: centered headline, body paragraph, and email input field with submit. Right column: a large illustrated/editorial image. The split is roughly 50/50. The input field is minimal — hairline border, no fill, with placeholder text.

### Secondary Carousel
The background shifts to **dark** — a full visual reset. The section contains a **horizontal carousel** of images. The active/center slide is larger and framed with a light stroke border, while adjacent slides are partially cropped at screen edges, implying scroll/drag. Below the center image: a name in spaced-caps and supporting detail text. A subtle Secondary CTA with an underline rule sits centered below. Left/right chevron arrows flank the carousel at mid-height.

---

## 5. Footer

**Four-column link grid** on the same dark background as the preceding section — there's no visual break; the footer flows directly from the carousel, separated only by a thin horizontal rule in the background color.

Column headers: Service Category · Company Info · Legal Information · Accessibility. Each column has 4–6 link items in regular-weight serif, left-aligned within the column, all columns centered as a group within the page.

Below the column grid: a large brand monogram or crest centered, then the full brand wordmark in spaced-caps. Below that: a horizontal row of circular social icons.

Bottom bar: country/language selector bottom-left, copyright statement bottom-right.

The footer also contains a secondary brand mascot illustration anchored to the bottom-left corner — a recurring motif that appears at both hero and footer, creating bookend personality.

---

## 6. Notable Layout Patterns

**Sticky dual-bar nav** — Both bars scroll with the user throughout the entire page, maintaining constant brand presence.

**Full-bleed alternation** — The page alternates between contained/padded grid sections and full-bleed image sections. This rhythm prevents the page from feeling like a traditional product grid and instead gives it editorial magazine quality.

**Transparent product images** — Products sit directly on light backgrounds without any card container or shadow, which feels elevated and clean.

**Vertical offset in image pairs** — The explore section's two-column image layout uses deliberate vertical misalignment (one image starts higher than the other), a compositional choice that creates depth without using shadows or z-layers.

**Image-dominant splits** — Multiple sections use a ~25–35% text / ~65–75% image proportion in horizontal splits. Text columns never feel like primary containers; they function as captions to the imagery.

**Persistent brand mascots** — An illustrated brand figure appears bottom-right in the hero and bottom-left in the footer, acting as a floating decorative anchor that reinforces brand personality across the full scroll journey.

**Color blocking as section dividers** — Rather than using dividing lines or cards, the page uses full-width background color changes (light → dark) as section delimiters. This is a structural device that doubles as a tonal/emotional signal.