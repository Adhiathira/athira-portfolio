# Layout Brief: Cookie Consent Modal Overlay

## Important Observation

All nine screenshots show the **same view**: a cookie consent modal dialog blocking the underlying page. The modal appears to be from a website with a consent-first UX pattern (text reads something to the effect of "You decide about your data"). The background page is only partially visible and progressively reveals more content across the sequence as the page appears to load or scroll beneath the locked modal.

---

## 1. Overall Page Structure

What's visible is severely constrained by the modal overlay. The background page — barely perceptible — appears to be a **dark-themed, full-bleed visual experience**, likely a marketing or editorial site. As the sequence progresses, glimpses of rich imagery (appears to be a gallery or product photography site) emerge behind the darkened modal backdrop. The actual page structure cannot be fully assessed.

---

## 2. The Modal System

The consent dialog dominates the composition and follows a classic **centered floating card** pattern:

- **Positioning:** Perfectly centered both horizontally and vertically on the viewport
- **Proportions:** Roughly 30% of viewport width, approximately 80% of viewport height — tall and narrow, reading almost like a portrait card
- **Background treatment:** The modal sits on a semi-transparent dark overlay (roughly 60–70% opacity) that dims the full page behind it. The overlay is not blurred — it darkens without abstracting the background
- **Card surface:** The modal itself uses a very light off-white / warm white background, contrasting sharply against the dark overlay

---

## 3. Modal Internal Layout

The modal card has a clear **single-column, top-to-bottom hierarchy**:

### Header Zone (top ~40% of card)
- Large, bold heading — left-aligned, generous weight, approximately `h2` scale
- Three paragraphs of body copy below it — readable, medium weight, comfortable line-height
- Three inline text links — each on its own line, underlined, accent color. These are stacked vertically with generous breathing room between them

### Action Zone (middle ~20% of card)
- Two full-width CTA buttons stacked side by side (actually **side-by-side, full row**):
  - Left: Secondary CTA — outlined/ghost style, dark border, light fill
  - Right: Primary CTA — solid accent fill, light text
  - Both buttons are equal width, sharing the card width in a **50/50 two-column split**
  - Strong visual hierarchy: the filled button draws the eye as the primary action

### Toggle Zone (bottom ~25% of card)
- Four category toggles in a **four-column equal-width grid**:
  - Category A
  - Category B
  - Category C
  - Category D
- Each toggle has a label above and a toggle switch below, centered within its column
- The first toggle shows a slightly activated/lighter state (pre-checked, non-optional)
- The other three appear in their off/disabled state — dark grey
- A thin dividing line separates each column
- Attribution branding sits in the bottom-right corner, small and subordinate

---

## 4. Background Page (Partially Visible)

Across the sequence, the background page loads progressively:

- **Header strip:** A very thin, dark navigation bar is just barely visible at the top — appears to be a minimal, dark-background nav with a small logo or wordmark on the left
- **Body:** As the sequence progresses, increasingly vivid full-bleed photography appears — rich warm tones, dark backgrounds
- The imagery appears to be a **large-scale, full-viewport hero** or scrolling gallery beneath the lock

No footer is visible.

---

## 5. Notable Layout Patterns

- **Modal-as-gate:** The modal functions as a hard gate — it does not float beside content, it *replaces* the experience until resolved. This is an intentional UX pattern that prioritizes a required action over content access.
- **Dimming without blurring:** The overlay dims but doesn't blur, creating a sense of the real page existing "behind" without fully teasing it — a restrained approach.
- **Spatial rhythm inside modal:** There's a consistent internal margin (~24–32px equivalent) creating breathing room between all zones. The toggle grid at the bottom is the densest zone, but still feels open.
- **Color hierarchy:** The only color in the entire composition is the accent color of the primary CTA button and the link text. Everything else is monochromatic — making the primary action unmissable.

---

## Summary

This is fundamentally a **modal-interrupted page layout analysis**. The underlying site appears to be a dark, immersive, photography-forward experience — likely editorial or premium product territory — but the modal prevents full assessment. The modal itself is a textbook example of **centered floating card** gate UI: single-column reading flow, clear two-tier CTA with primary/secondary distinction, and a four-column toggle grid at the base.