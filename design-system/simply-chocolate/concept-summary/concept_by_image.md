`★ Insight ─────────────────────────────────────`
The three screenshots all show the **same cookie consent modal** — this is not a multi-scroll page analysis. The "above-fold," "mid-page," and "footer" captures are identical modal states, with only subtle background content revealing itself behind the overlay. The design system being analyzed is primarily the modal's own design language, not a full page layout system.
`─────────────────────────────────────────────────`

---

# Design System Analysis

## Section Design Patterns

Only **one distinct section pattern** is visible: a **centered modal overlay with GDPR consent controls**. The background page is obscured and not analyzable. All three screenshots show this same component.

---

## 1. Internal Section Organization

The modal uses a **centered editorial, stacked-vertical layout** within a fixed-width card. Content is organized into four distinct vertical zones:

1. **Headline zone** — large serif-weight display text anchors the top
2. **Body text block** — three short paragraphs of editorial prose, left-aligned, generous line height
3. **Link cluster** — three underlined navigation links stacked vertically with consistent spacing
4. **Control zone** — primary CTA pair (two equal-width buttons) above a 4-column toggle grid

The layout is content-dense at the top, progressively shifting toward interaction affordances at the bottom. The card acts as a self-contained UI module — no bleeding outside its container.

---

## 2. Grid System and Spacing System

The modal card uses a **single-column layout** internally with consistent left/right inset padding (~40px per the `sidebar` spacing tokens). Content blocks are separated by consistent vertical breathing room.

The button row uses a **2-column equal-width grid** spanning the full card interior. The toggle section uses a **4-column equal-width grid** with bordered cell separators. These match the extracted grid tokens: `cookie-cta-buttons` (2-column-equal) and `cookie-consent-toggles` (4-column-equal).

Section padding on the card reads approximately 40–48px on all sides — consistent with the extracted `wrapper` tokens (`paddingTop: 40px`, `paddingRight: 40px`).

---

## 3. Media Composition and Art Direction

No photography or illustration is visible within the modal. The background behind the overlay shows a dark, atmospheric full-page composition — visible as a **dark near-black field** (`#1a1a0a` / `#3d2200` from the extracted hero-background token) suggesting a warm cinematic image, but it is intentionally suppressed by the overlay treatment.

The modal itself is **media-free** — the design prioritizes legibility and consent clarity over decorative content.

---

## 4. Visual Composition and Layout Intent

The modal operates as **structured grid UI** rather than editorial storytelling. All compositional weight is placed on the text hierarchy and control affordances. The background bleed of the atmospheric page content creates a **theatrical reveal context** — the user is aware a rich visual experience awaits consent, creating mild motivation to engage with the modal rather than dismiss it.

---

## 5. Background and Section Design Behavior

The modal uses a **solid off-white surface** (`#F9F8F8` — matching `scw-off-white` in the extracted CSS vars) set against a **full-viewport dark overlay** (the page background is rendered at reduced opacity or behind a scrim). The modal card has no visible drop shadow in the screenshots — separation is achieved purely through **background color contrast** between the white card and the dark overlay.

The bottom strip of the modal (cookie category toggles) uses a **slightly inset grid with bordered columns**, creating a visual section break within the card using borders rather than background color shifts.

---

## 6. Depth, Layering, and Visual Hierarchy

The interface uses **two clear depth layers**:
- **Layer 0**: Dark atmospheric background (obscured page content)
- **Layer 1**: White modal card (foreground)

No drop shadow is applied to the card — the contrast between white and near-black creates sufficient perceived elevation. The interface is **lightly layered** rather than strongly dimensional.

---

## 7. Component Styling

- **Buttons**: Filled solid style. Primary button (`ACCEPTER ALLE`) uses deep forest green (`#2C622C`) fill with white text. Secondary/decline button (`AFVIS ALLE`) uses light grey fill (`#f6f6f6`) with black text, with a visible `#888888` border — matching the extracted `secondary-cta` and `primary-cta` button tokens exactly.
- **Toggle switches**: Use a **pill-shaped track** with circular thumb. Active state (Nødvendige) shows a soft mint-green tint. Inactive states render in neutral grey. Borders between toggle cells are visible thin grey lines.
- **Links**: Standard underline treatment with the brand dark-green link color (`#234923`).
- **Card surface**: No border, no shadow — the off-white fill provides all separation.

---

## 8. Shape Language

**Predominantly sharp to slightly rounded** — consistent with the extracted `button-border-radius: 0.25rem` and `atlas-button-border-radius: 8px` tokens. Buttons use minimal rounding — closer to `3px` as seen in the extracted `cta.borderRadius: 3px`. Toggle switches are the only heavily rounded element (pill shape), creating a deliberate exception for interactive affordance clarity.

Shape language is **restrained and consistent** — no organic or decorative curves in the modal UI.

---

## 9. Section Divider Geometry

Within the modal, the toggle section is separated from the button row by a **straight horizontal rule** (thin grey border). Modal edges are straight — no curved or wave separators. The card floats as a rectangle on the overlay.

---

## Hero Section Analysis

The hero is **not accessible** — the modal fully obscures it. The background behind the modal reveals only:
- A **very dark, near-black warm field** (suggesting a full-bleed cinematic hero image or video, consistent with the extracted `hero-background` color `#3d2200`)
- Top-left corner shows the faint impression of a **transparent navigation bar** in the dark state

The nav background is in its **transparent dark state** — consistent with the extracted `navBackground: transparent` and `navText: #1c1c1c` tokens (though at scroll=0 with dark hero, the contrast inversion would use light text).

---

## Footer Section Analysis

**Not visible** — footer is fully obscured by the modal overlay. No footer analysis is possible from these screenshots.

---

## Navigation Bar Analysis

Partially visible at the top-left behind the overlay scrim. The nav appears to be in its **transparent/dark hero state**, consistent with:
- `navBackground: transparent`
- The extracted `atlas-font-family: Simply-ChocolateRegular` branding font for the wordmark

Full nav structure cannot be reliably analyzed given the overlay obscuring most of the bar.

---

## Color System and Visual Hierarchy

The modal's color palette is deliberately **restrained to 3 functional colors**:

| Role | Value | Usage |
|---|---|---|
| Surface | `#F9F8F8` | Modal card background |
| Primary action | `#2C622C` | Accept button fill |
| Action hover | `#234923` | Accept button hover (slightly darker) |
| Secondary | `#f6f6f6` | Decline button fill |
| Border | `#888888` | Decline button border |
| Body text | `#222` / `#1C1C1C` | All readable prose |
| Link | `#234923` | Underlined inline links |
| Toggle active | mint tint (~`#C8E6C9`) | Nødvendige toggle active state |

The deep forest green (`#2C622C`) functions as the **sole brand accent** in the modal — everything else is neutral. This creates strong CTA hierarchy: the green button draws the eye immediately.

---

## Typography System

From the extracted `type-system` tokens:

- **Headline** (`h1`): `Simply-ChocolateRegular`, 32px, weight 400, line-height 52.8px — a proprietary display typeface, soft and humanist in character
- **Body / paragraphs**: `Simply-ChocolateRegular`, 15–16px, weight 400, letter-spacing 0.48px
- **Buttons**: `Simply-ChocolateRegular`, 15px, weight 400 (rendered as `700` per the interaction-states data — bold at runtime)
- **Links**: `Simply-ChocolateRegular`, 15px, weight 600, underlined

`★ Insight ─────────────────────────────────────`
The brand uses its **proprietary typeface for every role** — headings, body, buttons, and links all use `Simply-ChocolateRegular` or its variants. This is unusual: most design systems differentiate display fonts from body fonts. Using one family throughout creates extreme typographic cohesion but requires careful weight variation (`Regular → Bold → COMPBold`) to establish hierarchy rather than family switching.
`─────────────────────────────────────────────────`

Note: `Simply-ChocolateRegular` is **proprietary and not web-accessible** (confirmed in the extracted `proprietaryFonts` array). Any faithful reproduction requires a fallback via the `get-fallback-font` skill.

---

## Visual Affordances

Interactive elements are clearly differentiated in the static state:

- **Primary CTA**: High-contrast filled green button — unmistakably actionable
- **Secondary CTA**: Grey fill with border — visually subordinate but clearly a button
- **Toggle switches**: Pill-track shape with circular thumb — industry-standard affordance for binary on/off control
- **Links**: Underlined green text — standard hyperlink affordance

Non-interactive text (paragraphs) has no underline, no color accent, and no border. The visual grammar is unambiguous.

---

## Notable UX/UI Design Observations

1. **Functional minimalism within brand identity**: The modal uses zero decorative elements — no illustrations, no photography, no iconography beyond the toggle switches. Yet it unmistakably carries brand identity through typography and the signature forest green accent. This is elegant restraint.

2. **Consent architecture as progressive disclosure**: The layout presents the **simplest choice first** (two full-width buttons: Decline All / Accept All), then reveals granular category controls below. This hierarchy respects users who want quick exit while serving power users who want control — without requiring a separate "Settings" expansion.

3. **Color as consent guidance**: The deep green (`#2C622C`) on the Accept button is a warm, organic, non-aggressive color — distinct from the typical blue of tech CTAs. It reads as inviting rather than pressuring, which softens the persuasion pattern typical of cookie consent banners.

4. **Background theater**: The dark atmospheric background visible behind the overlay is deliberate art direction — it hints at a visually rich experience awaiting the user, creating subtle intrinsic motivation to resolve the modal. This is a sophisticated UX technique: the background isn't hidden, it's **teased**.

5. **Toggle grid as a contained sub-system**: The 4-column toggle grid at the bottom of the modal uses bordered cell separators to create a **grid-within-card** pattern. The toggles are sized generously (approximately 52px wide per the extracted `atlas-toggle` sizing), ensuring tappability on mobile while maintaining visual order on desktop. The "Nødvendige" (necessary) toggle is locked active — shown in mint green — communicating non-negotiability without explanation text.