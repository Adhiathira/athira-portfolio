`★ Insight ─────────────────────────────────────`
The extracted tokens reveal a warm light-register design with a single bold orange accent (#fb7339) against a cream ground (#f2efe9), a massive type scale (9rem h1 at weight 800), and generous downward-gravity spacing. The palette is earthy and analog — the kind of restraint that signals something handmade, precise, and grounded. The orange is too warm for fintech, too physical for SaaS. It belongs to something that works with material reality: tools, instruments, objects with physics.
`─────────────────────────────────────────────────`

---

## Product Concept: Lōmen

**Lōmen** is a precision acoustic modeling platform for recording engineers, architectural acousticians, and studio designers who need to understand how sound will behave in a physical space — before a single panel, baffle, or diffuser is installed.

The name is derived from the Latin *lumen* (threshold passage), reoriented to acoustic transmission: the point where sound crosses from one state to another.

**Tagline:** *Model the room. Before you build it.*

---

## Visual Identity

The palette is an uncompromising warm-cream ground (#f2efe9) with a single electric orange (#fb7339) as the only saturated hue — appearing only at CTA moments and data-highlight events, exactly as a signal frequency appears on a spectrogram. Body text in deep warm charcoal (#3d3930) sits at appropriate contrast against cream without the clinical coldness of pure black. The taupe surface (#a39b8b) functions as an elevated panel — the way a studio console sits slightly above the room floor. Typography is set in Plus Jakarta Sans weight 800 at the display scale (9.072rem h1, -0.04em tracking, 0.9 line-height), creating a compressed slab-like texture without using a slab font — type is the hero visualization. Body text in Inter weight 300 provides maximum contrast against the heavy headings.

---

## Hero Section

The hero occupies full viewport height over the cream page background. No background image or video — the headline IS the visual event. The primary heading "Model the room." runs at full 9.072rem, weight 800, deep charcoal (#3d3930), spanning nearly the full container width. The second line "Before you build it." renders at #a39b8b (warm taupe, approximately 60% luminance) — a luminance split within a single h1 creating visual emphasis modulation rather than a heading/subheading hierarchy. Below: a two-field input cluster (room width × room height) with bottom-border-only styling feeding into an orange "Run Analysis" CTA. A single 5-pointed asterisk glyph at small scale in the upper quadrant anchors the composition without ornamentation. The hero loads with a `translateY(40px) → 0` reveal at 0.88s `cubic-bezier(0.16, 1, 0.3, 1)`, per-character stagger on the headline.

---

## Content Sections

### Section 2 — Waveform Visualizer (dark contrast section)
Full-viewport-width section on the #1a1a14 (near-black) surface. An inline SVG path traces a frequency-response curve across the full width — the path strokes from left to right as the user scrolls, driven by ScrollTrigger `stroke-dashoffset` animation. Below the waveform: three stat columns (counter-animated on scroll) — room modes analyzed, dB accuracy range, surfaces calculated per second. Each stat uses the 3.110rem h3 weight 700 scale in cream (#f2efe9) against near-black. A single orange accent line (#fb7339) underscores the central stat column.

### Section 3 — Features (light surface, asymmetric)
Alternating 60/40 split-screen feature rows. Row 1 (text left, UI right): headline about RT60 analysis, body in Inter 300, orange "Learn more" text link. Row 2 (UI left, text right): room geometry wireframe CSS illustration on taupe surface (#a39b8b panel), text about modal frequency mapping. Each row uses a different GSAP entrance: Row 1 uses clip-path reveal (`inset(0 100% 0 0)` → `inset(0 0% 0 0)`); Row 2 uses scattered-element assembly (child elements enter from random x/y offsets with staggered spring timing).

### Section 4 — Process Steps (numbered, cream)
Single-column numbered step rows. Each row is a horizontal two-column grid (`52px 1fr`) — the number column displays 01, 02, 03, 04 in h4 scale at #c8c1b4 (muted), the content column holds a short heading + 2-line body. A vertical SVG line connects each step number, with `stroke-dashoffset` drawing progressively as the user scrolls. Grid layout and animation distinct from all other sections.

### Section 5 — Testimonials (warm taupe background)
Background: #a39b8b. Single wide testimonial in h3 scale at cream (#f2efe9), weight 300, italic. Client name and studio identifier in small caps below. Parallax depth: the quote text moves at 0.6× scroll speed relative to the taupe background, creating a floating sensation. Section transitions in/out via organic SVG wave dividers above and below.

### Section 6 — CTA (dark hero-background)
Background: #1a1a14. Centered composition. "Precision has a new address." in h2 scale, cream, with the last word ("address.") in orange. Single orange primary CTA button. Margin-top generous (downward gravity from spacing system).

---

## Footer Section

The footer is a large cream card (#f2efe9, 8px border-radius) floating on the near-black page background — geometrically contained rather than full-bleed. Five-column link grid: Lōmen wordmark column left, then Product, Resources, Company, Legal columns. All link text in #575349 at 0.875rem weight 300. An animated organic drip/wave SVG divider sits above the footer card — 4-5 teardrop protrusions drawn in the #1a1a14 background color that "drip" into the cream footer, creating a liquid-pour transition. The wordmark in the footer uses the orange (#fb7339) for the "ō" diacritic only. Copyright line centered below the grid in #c8c1b4.

---

## Design Principles

- **Warm luminance split within headlines** — the #3d3930/#a39b8b split within a single h1 is the primary typographic move, subordinating continuations without changing heading level
- **Orange is frequency** — #fb7339 appears only at data-highlight and action moments, like a single frequency spike on a spectrum analyzer
- **Downward-gravity spacing** — top padding is consistently less than bottom padding, making sections feel like they're landing rather than floating
- **Dark sections as measurement chambers** — the #1a1a14 surfaces feel like anechoic spaces, clinically precise contrast to the warm cream ground
- **Type scale as spatial architecture** — the 9.072rem → 3.110rem → 1.25rem → 0.875rem scale creates section hierarchy without background color changes

---

## Distinctive Qualities

The most singular choice is the **acoustic-waveform section divider concept**: each boundary between sections uses a different SVG organic shape — not decorative flourish but a visual metaphor for the interference pattern between two physical surfaces. The dividers are literally the product's subject matter rendered in CSS. The **counter-animated stat section on near-black** is the product's claim made visceral: watching numbers count up at high speed simulates watching an analysis render in real time. The asymmetric spacing (top padding 35% less than bottom) is the most invisible but most felt decision — the page has *weight*, it reads like something dropped onto a surface rather than floating above it.
