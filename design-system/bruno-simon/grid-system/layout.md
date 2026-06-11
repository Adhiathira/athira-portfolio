`★ Insight ─────────────────────────────────────`
This task is pure text transformation — no code reading or tool use needed. The document uses a portfolio-specific 3D scene as its subject, but all the **layout structure, spatial relationships, and design vocabulary** (z-layers, off-center balance, free-form composition) are fully reusable and must be preserved verbatim.
`─────────────────────────────────────────────────`

# Layout Brief: Portfolio — Loading/Splash Screen

---

## 1. Overall Page Structure

This is a **single-screen splash/loading state** — not a scrollable page. The entire viewport is consumed by one immersive scene. There are no discrete sections or vertical content flow. Everything exists simultaneously in one spatial composition.

---

## 2. Header / Navigation

**Absent.** No navigation bar, logo lockup, or top-of-page chrome is visible. The interface has been stripped entirely — this is pre-navigation state. The user must complete an action (clicking) before any navigation structure becomes accessible.

---

## 3. Hero / Primary Scene (Full Viewport)

The entire screen *is* the hero. Key spatial relationships:

**Background layer:**
A dark near-black field fills 100% of the viewport. Overlaid on it is a **perspective grid of tinted cross marks** (+), arranged in a receding isometric pattern. The grid creates strong depth illusion — it converges toward the upper center, reinforcing the 3D world perspective. The crosses are small, regular, and low-contrast against the background, functioning as texture rather than UI.

**Focal island — center-weighted, slightly left of true center:**
A circular **glowing ring** demarcates the scene's "stage." This ring sits on the ground plane of the isometric world. Inside it: a warm ground tile that contrasts sharply with the cold dark surround. The island occupies roughly 35–40% of the viewport width and is positioned center-left — roughly 45% from left, 50% from top.

**3D scene objects (layered on the island):**
- A **hero object** dominates the island's right side — the object is the largest single element, with warm accent lighting
- A **tall organic element** (tree, structure, or similar vertical form) rises behind/left of the hero object, its form bleeding upward past the island into the dark background — it breaks the circular boundary vertically, creating organic silhouette contrast
- Smaller environmental props fill the left and background areas — these are tertiary in visual weight

**Spatial hierarchy:** Tall organic element → hero object → secondary props → ground ring → grid

---

## 4. Content Sections

None in the traditional sense. There is only one piece of UI content:

**Call-to-action label — floating, right of center:**
Primary CTA text appears in a **hand-drawn/sketch typeface** (all caps, light color, irregular letterforms). It floats in negative space to the right of the hero object — not contained in any box, card, or panel. A **curved arrow** (hand-drawn style, pointing left-downward toward the hero object) anchors the text to the scene. Below the text sits a small **contextual icon**, indicating supplementary behavior.

The CTA occupies roughly the right-center quadrant, positioned at about 60–70% from left, 25–45% from top. It feels deliberately informal — sketched onto the scene rather than designed as a UI overlay.

---

## 5. Footer

**Absent.** No footer, credits, or bottom chrome is present on this screen.

---

## 6. Notable Layout Patterns

**Full-bleed immersive canvas:**
The 3D render fills 100% of the viewport with no margins, padding, or safe zones. The grid pattern meets all four edges with no framing.

**Layered depth / overlapping elements:**
The scene uses multiple Z-layers — background grid → island ground → 3D objects → glowing ring overlay → floating UI text. The tall organic element overlaps both the island and the void, intentionally violating the circular boundary to suggest a living, expansive world rather than a confined diorama.

**Off-center compositional balance:**
The 3D scene is slightly left-of-center; the floating CTA text is right-of-center. This creates a diagonal visual tension that draws the eye across the full width — a classical compositional balance technique where mass (left) is counterweighted by whitespace + text (right).

**Hand-drawn UI language:**
The typography and arrow use sketch/handwriting aesthetics — zero UI polish, intentionally raw. This contrasts sharply with the sophisticated 3D rendering, creating personality and signaling "this is a personal, crafted thing" rather than a product interface.

**No grid, no columns, no cards:**
Layout is entirely free-form compositional placement. There is no underlying grid system governing UI element position — placement follows visual/spatial intuition, not structure.