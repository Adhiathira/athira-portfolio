# TEST PLAN — Task 163: [hermes-vid][7/10] Build auth page (login/signup)

> Tests the auth page (`auth.html`) — a centered login/signup card that toggles between two forms, submits to mock backend auth endpoints, stores the returned token in `sessionStorage`, and redirects to the dashboard.

## Prerequisites

- Backend running: `cd sites/hermes-video-gen/backend && node server.js` (serves on port 3333)
- Navigate to `http://localhost:3333/auth.html` to load the auth page
- DevTools open, Application → Session Storage → `http://localhost:3333` visible for token inspection

---

## Test Cases

### TC-001: Auth page loads correctly

**Method**: Playwright MCP (browser)

**Steps**:
1. Use Playwright MCP to navigate to `http://localhost:3333/auth.html`
2. Take a snapshot and inspect the page structure

**Expected result**: Page renders with a centered white card containing the "Atelier" heading, two tab buttons ("Login" and "Sign Up"), and a visible login form with Email and Password fields and an "Enter" submit button. The "← Atelier" back link is visible in the top-left corner.

---

### TC-002: Login tab is active by default

**Method**: Playwright MCP (browser)

**Steps**:
1. Use Playwright MCP to navigate to `http://localhost:3333/auth.html`
2. Inspect the tab buttons for active state indicators

**Expected result**: The "Login" tab has a bottom-border underline (active state). The "Sign Up" tab has no underline. The login form (Email, Password, "Enter" button) is visible. The signup form is hidden.

---

### TC-003: Tab toggle shows signup form

**Method**: Playwright MCP (browser)

**Steps**:
1. Use Playwright MCP to navigate to `http://localhost:3333/auth.html`
2. Click the "Sign Up" tab button
3. Inspect the page state

**Expected result**: The signup form becomes visible with Name, Email, and Password fields and a "Create Account" button. The login form is hidden. The "Sign Up" tab shows the active underline; the "Login" tab loses it.

---

### TC-004: Tab toggle back to login

**Method**: Playwright MCP (browser)

**Steps**:
1. Use Playwright MCP to navigate to `http://localhost:3333/auth.html`
2. Click "Sign Up" tab
3. Click "Login" tab

**Expected result**: Login form is visible again. Signup form is hidden. "Login" tab has the active underline.

---

### TC-005: Login form submits and redirects with token

**Method**: Playwright MCP (browser)

**Steps**:
1. Use Playwright MCP to navigate to `http://localhost:3333/auth.html`
2. Fill the Email field with any value (e.g. `test@example.com`)
3. Fill the Password field with any value (e.g. `password123`)
4. Click the "Enter" submit button
5. Check the resulting URL and sessionStorage

**Expected result**: Page redirects to `/dashboard.html`. In DevTools Application → Session Storage, `auth_token` key is present with a non-empty value (mock token, e.g. `"mock-jwt-hermes-xyz"`).

---

### TC-006: Signup form submits and redirects with token

**Method**: Playwright MCP (browser)

**Steps**:
1. Use Playwright MCP to navigate to `http://localhost:3333/auth.html`
2. Clear sessionStorage first (to start fresh)
3. Click the "Sign Up" tab
4. Fill Name, Email, Password fields with any values
5. Click "Create Account"
6. Check the resulting URL and sessionStorage

**Expected result**: Page redirects to `/dashboard.html`. `auth_token` is set in sessionStorage.

---

### TC-007: Back link returns to landing page

**Method**: Playwright MCP (browser)

**Steps**:
1. Use Playwright MCP to navigate to `http://localhost:3333/auth.html`
2. Click the "← Atelier" link in the top-left

**Expected result**: Browser navigates to `http://localhost:3333/` (the landing page).

---

### TC-008: Auth page does NOT auto-redirect when token exists

**Method**: Playwright MCP (browser)

**Steps**:
1. Use Playwright MCP to navigate to `http://localhost:3333/auth.html`
2. Use browser evaluate to set `sessionStorage.setItem('auth_token', 'existing-token')`
3. Reload `http://localhost:3333/auth.html`

**Expected result**: Auth page stays on `auth.html` — it does NOT redirect to `/dashboard.html`. The login/signup card is displayed normally.

---

### TC-009: Visual design check

**Method**: Playwright MCP (browser)

**Steps**:
1. Use Playwright MCP to navigate to `http://localhost:3333/auth.html`
2. Take a screenshot of the full viewport

**Expected result**:
- Warm off-white background (`#f7f7f5`)
- White card centered vertically and horizontally, max-width ~400px
- "Atelier" in serif font, uppercase, centered
- Field labels are small, uppercase, muted grey
- Form inputs have a light grey 1px border, no border-radius (sharp edges per design system)
- Submit button spans the full card width, dark background, uppercase text
