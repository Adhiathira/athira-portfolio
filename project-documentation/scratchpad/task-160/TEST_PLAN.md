# TEST PLAN — Task 160: [hermes-vid][4/10] Build Hermès CSS design system (tokens and base styles)

> Verify that `tokens.css` correctly defines all Hermès design tokens and that `base.css` imports them, applies the CSS reset, sets body defaults, heading styles, and renders `.btn-primary` / `.btn-ghost` button utilities correctly.

## Prerequisites

- The Express server must be running: `cd sites/hermes-video-gen/backend && node server.js`
- Server serves static frontend files from `../frontend/` on port 3333
- A minimal test HTML page exists at `sites/hermes-video-gen/frontend/test.html` (created as part of this task)
- Navigate to `http://localhost:3333/test.html` in the browser

---

## Test Cases

### TC-001: Page background and text colors

**Method**: Playwright MCP (browser)

**Steps**:
1. Use Playwright MCP to navigate to `http://localhost:3333/test.html`
2. Take a screenshot of the page
3. Evaluate `getComputedStyle(document.body).backgroundColor` via browser evaluate

**Expected result**: Background color computes to `rgb(247, 247, 245)` (the `#f7f7f5` warm off-white). The page is visibly off-white, not pure white and not grey.

---

### TC-002: Heading typography — serif font and normal weight

**Method**: Playwright MCP (browser)

**Steps**:
1. Navigate to `http://localhost:3333/test.html`
2. Evaluate `getComputedStyle(document.querySelector('h1')).fontFamily` and `getComputedStyle(document.querySelector('h1')).fontWeight`

**Expected result**: `fontFamily` begins with `Georgia` (or falls back to `Times New Roman`). `fontWeight` is `400` (not bold/700).

---

### TC-003: Body text uses system sans-serif

**Method**: Playwright MCP (browser)

**Steps**:
1. Navigate to `http://localhost:3333/test.html`
2. Evaluate `getComputedStyle(document.querySelector('p')).fontFamily`

**Expected result**: `fontFamily` contains a system sans-serif stack (e.g., starts with `-apple-system`, `BlinkMacSystemFont`, or `Segoe UI`).

---

### TC-004: `.btn-primary` renders correctly

**Method**: Playwright MCP (browser)

**Steps**:
1. Navigate to `http://localhost:3333/test.html`
2. Locate the `.btn-primary` button element
3. Evaluate its `backgroundColor`, `color`, and `textTransform` via `getComputedStyle`

**Expected result**: `backgroundColor` is `rgb(26, 26, 26)` (near-black `#1a1a1a`). `color` is `rgb(247, 247, 245)` (off-white). `textTransform` is `uppercase`. No blue (`#3b82f6` / `rgb(59, 130, 246)`) appears.

---

### TC-005: `.btn-ghost` renders correctly

**Method**: Playwright MCP (browser)

**Steps**:
1. Navigate to `http://localhost:3333/test.html`
2. Locate the `.btn-ghost` button element
3. Evaluate its `backgroundColor`, `borderColor`, `color`, and `textTransform` via `getComputedStyle`

**Expected result**: `backgroundColor` is transparent (or `rgba(0, 0, 0, 0)`). `borderColor` is `rgb(208, 208, 208)` (`#d0d0d0`). `color` is `rgb(26, 26, 26)`. `textTransform` is `uppercase`.

---

### TC-006: CSS custom properties are defined on `:root`

**Method**: Playwright MCP (browser)

**Steps**:
1. Navigate to `http://localhost:3333/test.html`
2. Evaluate `getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim()` and `getComputedStyle(document.documentElement).getPropertyValue('--font-serif').trim()`

**Expected result**: `--color-bg` returns `#f7f7f5`. `--font-serif` contains `Georgia`.

---

### TC-007: Box-sizing reset applied

**Method**: Playwright MCP (browser)

**Steps**:
1. Navigate to `http://localhost:3333/test.html`
2. Evaluate `getComputedStyle(document.querySelector('h1')).boxSizing`

**Expected result**: Returns `border-box`.

---

### TC-008: No blue action color anywhere on the page

**Method**: Playwright MCP (browser)

**Steps**:
1. Navigate to `http://localhost:3333/test.html`
2. Take a full-page screenshot and visually inspect
3. Evaluate button background colors for any element matching `rgb(59, 130, 246)`

**Expected result**: No element has `#3b82f6` as background, border, or text color. All interactive elements use near-black or transparent styling.
