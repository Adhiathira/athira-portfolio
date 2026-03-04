# TEST PLAN — Task 162: [hermes-vid][6/10] Build landing page

> Tests verify that the public-facing landing page renders correctly with the Hermès aesthetic: warm off-white background, serif hero heading, three feature callouts in a grid, wordmark-only footer, and a single GSAP page-load fade-in animation.

## Prerequisites

- Start the Express server: `cd sites/hermes-video-gen/backend && node server.js`
- Server should be listening on `http://localhost:3333`
- Ensure a modern browser is available (Chrome or Firefox recommended)

---

## Test Cases

### TC-001: Landing page loads at root URL

**Method**: Playwright MCP (browser)

**Steps**:
1. Use Playwright MCP to navigate to `http://localhost:3333/`
2. Take a screenshot of the full page after load settles

**Expected result**: Page loads with HTTP 200. The page has a warm off-white background (`#f7f7f5`). No error messages, no blank screen, no 404.

---

### TC-002: Nav renders wordmark and Enter CTA

**Method**: Playwright MCP (browser)

**Steps**:
1. Use Playwright MCP to navigate to `http://localhost:3333/`
2. Check the accessibility snapshot or DOM for nav content

**Expected result**: Nav contains the text "Atelier" on the left and an "Enter" button/link on the right. The "Enter" link points to `/auth.html`.

---

### TC-003: Hero section content and heading size

**Method**: Playwright MCP (browser)

**Steps**:
1. Use Playwright MCP to navigate to `http://localhost:3333/`
2. Inspect the hero heading text and verify the eyebrow label
3. Verify the "Begin" CTA is present below the sub-copy

**Expected result**: Eyebrow reads "AI Video Generation". Heading reads "Your prompt. Your vision. Moving." (across three lines). "Begin" link is present and points to `/auth.html`. Heading is visually large (serif, prominent — larger than body text).

---

### TC-004: Three feature callouts in 3-column grid (desktop)

**Method**: Playwright MCP (browser)

**Steps**:
1. Use Playwright MCP to navigate to `http://localhost:3333/` at 1440px viewport width
2. Capture a screenshot or snapshot of the features section

**Expected result**: Three feature cards are visible side by side in a single row. Each card shows a numbered label (01, 02, 03), a title ("Prompt to Video", "Image Reference", "Your Library"), and a short description. No horizontal overflow.

---

### TC-005: Footer shows wordmark only

**Method**: Playwright MCP (browser)

**Steps**:
1. Use Playwright MCP to navigate to `http://localhost:3333/`
2. Scroll to the bottom of the page and inspect the footer

**Expected result**: Footer contains only the word "Atelier" (as wordmark text). No links, no copyright line, no social icons.

---

### TC-006: GSAP fade-in animation on page load

**Method**: Playwright MCP (browser)

**Steps**:
1. Use Playwright MCP to navigate to `http://localhost:3333/`
2. Immediately after navigation begins, check whether the page is initially invisible/faded
3. Wait ~1 second and verify the page becomes fully visible

**Expected result**: GSAP script tag is present in the page source (CDN URL for gsap.min.js). The inline script calls `gsap.from('body', { opacity: 0, duration: 0.6, ease: 'power1.out' })`. After load, body is fully opaque (opacity: 1 or no opacity style).

---

### TC-007: Responsive layout — feature grid stacks at 768px

**Method**: Playwright MCP (browser)

**Steps**:
1. Use Playwright MCP to navigate to `http://localhost:3333/` at 768px viewport width
2. Capture a screenshot of the features section

**Expected result**: Feature cards stack vertically (single column). Hero heading is smaller than desktop size. No horizontal scrollbar appears.

---

### TC-008: No horizontal scrollbar at 1440px viewport

**Method**: Playwright MCP (browser)

**Steps**:
1. Use Playwright MCP to set viewport to 1440px wide
2. Navigate to `http://localhost:3333/`
3. Use Playwright MCP to evaluate `document.documentElement.scrollWidth > window.innerWidth`

**Expected result**: `scrollWidth > innerWidth` evaluates to `false`. No horizontal overflow exists at 1440px.
