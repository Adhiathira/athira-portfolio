# Brand Name Website Layout Brief

## Overall Page Structure

The page is dominated by a two-layer modal stack — an underlying full-page promotional overlay (mailing list signup) sits beneath a cookie consent bar. The actual site content is blurred and pushed to the background, functioning purely as atmospheric context. This tells us the site prioritizes conversion/consent capture before any content engagement.

The background reveals a content area that appears to follow a **split-column editorial layout** — a large full-bleed image on the left, a lighter panel on the right.

---

## Modal / Overlay System (Primary Focus)

### Mailing List Modal
This is the dominant UI element and deserves full treatment:

- **Position:** Center-right of the viewport, approximately 60% width, anchored slightly right of center
- **Structure:** Two-column at the page level — left half is a full-bleed editorial photograph, right half is the form panel
- **Form panel proportions:** ~40% of viewport width, light background, generous internal padding (~40–48px on all sides)
- **Header typography:** All-caps, compressed tracking, bold serif/grotesque hybrid — very large at roughly 28–32px, stacked two lines. Creates immediate hierarchy dominance
- **Body copy:** Monospace or courier-style typeface, smaller weight, comfortable line-height — creates a deliberate editorial contrast against the heavy headline
- **Input field:** Full-width within the panel, minimal border styling, placeholder text in matching monospace
- **Checkbox group:** Three inline checkboxes (Category A / Category B / Category C) — tight horizontal rhythm, evenly spaced
- **Consent checkboxes:** Two stacked block-level items with small checkbox icons left-aligned, text wrapping right — standard GDPR layout pattern
- **Close button:** Top-right corner of the modal, minimal X icon, small and unobtrusive
- **Visual weight distribution:** Left image panel carries all visual mass; right form panel is deliberately sparse to direct eye toward fields

### Cookie Banner
- **Position:** Bottom-center, floating above the modal — creating an uncomfortable but intentional z-index stack
- **Width:** ~75% of viewport, centered
- **Structure:** Full-width text block above two stacked action buttons (Primary CTA / Secondary CTA)
- **Button hierarchy:** Primary CTA is dark/filled, Secondary CTA is text+icon (ghost)
- **Typography:** Same monospace/courier register as the modal — brand consistency at the type level

---

## Background Site Content (Partially Visible, Blurred)

### Navigation (barely visible through blur)
- Appears to be a **full-width top bar**, very thin, dark background
- Likely contains logo center or left with navigation items distributed across the bar
- The extreme thinness suggests a minimal nav strip rather than a tall header

### Hero / Main Content Area
- **Split composition:** Left two-thirds is a full-bleed editorial photograph (the same image used in the modal background — intentional visual echo)
- **Right third:** A lighter background panel — likely the actual content/product panel
- The split feels roughly **65/35** — image-heavy, content-secondary
- The image extends from top to bottom of the visible area without any margin — true full-bleed within its column

---

## Notable Layout Patterns

### Layered Modal Architecture
The most distinctive pattern here is the **deliberate stacking of interruption layers**: background content → darkening scrim → mailing list modal → cookie consent bar. Each layer has a distinct z-level and the visual blur on the background enforces depth. This is a sophisticated use of visual hierarchy to create forced sequential interaction.

### Monospace Typography as Brand Identity
Across all text elements — headlines, body, labels, form fields — the site uses a **monospace or courier typeface**. This creates an unusual typographic rhythm where every character occupies equal horizontal space, giving the layout a technical, industrial feel that contrasts with the brand's primary context. This is the brand's core tension: one positioning against another.

### Spatial Rhythm
- Padding is generous and consistent — the form panel breathes
- Line-height on body copy is open (~1.6–1.8), which slows reading and adds editorial quality
- The all-caps compressed headline against the loose monospace body creates a **tension in rhythm** that reads as intentional brand voice, not accident

### Proportional Asymmetry
The image/form split in the modal mirrors the image/content split in the background — the same compositional logic applied at two scales simultaneously. This kind of **nested proportional repetition** gives the page a coherent visual system even at a glance.

---

## Summary Assessment

This is an **editorial overlay-first layout** — the site's actual grid system is subordinate to its conversion capture strategy. The design language (monospace type, dark/light palette, blurred background, generous spacing) is consistent and deliberate. The layout hierarchy is: Cookie Banner > Mailing Modal > Site Content, with the site itself serving as wallpaper until consents are resolved.