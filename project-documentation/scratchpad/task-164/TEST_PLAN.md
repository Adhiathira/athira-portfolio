# TEST PLAN — Task 164: [hermes-vid][8/10] Build dashboard shell and My Videos view

> Verifies the dashboard shell renders correctly with auth guard, nav view switching, video grid with GSAP stagger, and sign out flow.

## Prerequisites

1. Backend running: `cd sites/hermes-video-gen/backend && node server.js` (listens on port 3333)
2. Frontend served from project root or via backend static serving at `http://localhost:3333`
3. Seed data seeded — backend should return 6 video objects from `GET /api/videos`
4. No valid `auth_token` in sessionStorage for auth guard tests (use incognito or clear storage)

---

## Test Cases

### TC-001: Auth guard redirects unauthenticated users

**Method**: Playwright MCP (browser)

**Steps**:
1. Use Playwright MCP to open a fresh browser context with no sessionStorage
2. Navigate to `http://localhost:3333/dashboard.html`
3. Wait briefly for any redirect to complete

**Expected result**: Browser URL changes to `/auth.html` — the dashboard page is never shown to unauthenticated visitors

---

### TC-002: Video grid renders 6 cards after login

**Method**: Playwright MCP (browser)

**Steps**:
1. Navigate to `http://localhost:3333/auth.html` (any same-origin page that won't redirect)
2. Via browser evaluate, set `sessionStorage.setItem('auth_token', 'mock-jwt-hermes-xyz')`
3. Navigate to `http://localhost:3333/dashboard.html`
4. Wait for the `#video-grid` to populate
5. Count the rendered `.video-card` elements

**Expected result**: 6 video cards are visible in the grid; each card shows a thumbnail area, truncated prompt text (≤60 chars), a status label ("Done" or "Generating…"), and a date string

---

### TC-003: "My Videos" nav link is active by default

**Method**: Playwright MCP (browser)

**Steps**:
1. With `auth_token` set, navigate to `http://localhost:3333/dashboard.html`
2. Snapshot or evaluate the nav link classes

**Expected result**: The "My Videos" button has class `dash-nav__link--active`; the "Create" button does not

---

### TC-004: View switching — clicking Create shows #view-create

**Method**: Playwright MCP (browser)

**Steps**:
1. With `auth_token` set, navigate to `http://localhost:3333/dashboard.html`
2. Click the "Create" nav button
3. Observe which sections are visible

**Expected result**: `#view-create` becomes visible (hidden attribute removed); `#view-videos` becomes hidden; "Create" button gets `dash-nav__link--active` class; "My Videos" loses it

---

### TC-005: View switching — clicking My Videos restores grid

**Method**: Playwright MCP (browser)

**Steps**:
1. From TC-004 state (Create view active), click "My Videos" nav button

**Expected result**: `#view-videos` becomes visible again; `#view-create` is hidden; "My Videos" gets `dash-nav__link--active`

---

### TC-006: Sign Out clears sessionStorage and redirects

**Method**: Playwright MCP (browser)

**Steps**:
1. With `auth_token` set, navigate to `http://localhost:3333/dashboard.html`
2. Click the "Sign Out" button
3. Observe the URL
4. Navigate to `http://localhost:3333/dashboard.html` again

**Expected result**: After clicking Sign Out, browser redirects to `/` (landing page); sessionStorage no longer contains `auth_token`; navigating back to `/dashboard.html` redirects again to `/auth.html`

---

### TC-007: Generating cards show shimmer and default cursor

**Method**: Playwright MCP (browser)

**Steps**:
1. With `auth_token` set, navigate to `http://localhost:3333/dashboard.html`
2. Wait for `#video-grid` to populate
3. Via browser evaluate, inject a mock generating card into the grid:
   ```js
   const card = document.createElement('article');
   card.className = 'video-card video-card--generating';
   const thumb = document.createElement('div');
   thumb.className = 'video-card__thumb video-card__thumb--placeholder';
   card.appendChild(thumb);
   document.getElementById('video-grid').prepend(card);
   ```
4. Evaluate computed styles on the injected card and its thumbnail:
   ```js
   const card = document.querySelector('.video-card--generating');
   const thumb = card.querySelector('.video-card__thumb--placeholder');
   const cardStyles = getComputedStyle(card);
   const thumbStyles = getComputedStyle(thumb);
   return {
     opacity: cardStyles.opacity,
     cursor: cardStyles.cursor,
     animationName: thumbStyles.animationName,
     backgroundSize: thumbStyles.backgroundSize,
   };
   ```

**Expected result**: `opacity` is `"0.7"`, `cursor` is `"default"`, `animationName` is `"shimmer"`, `backgroundSize` is `"200% 100%"`

---

### TC-008: Done cards trigger window.openVideoModal on click

**Method**: Playwright MCP (browser)

**Steps**:
1. With `auth_token` set, navigate to `http://localhost:3333/dashboard.html`
2. Via browser evaluate, assign `window.openVideoModal = (v) => window.__modalCalled = v`
3. Click a card with status `done`
4. Evaluate `window.__modalCalled`

**Expected result**: `window.__modalCalled` is set to the video object for that card (contains `id`, `prompt`, `status`, etc.)

---

### TC-009: GSAP stagger animation fires on load

**Method**: Playwright MCP (browser)

**Steps**:
1. With `auth_token` set, navigate to `http://localhost:3333/dashboard.html`
2. Immediately after page load, capture a screenshot or observe cards
3. Wait ~500ms and observe again

**Expected result**: Cards are not all simultaneously at full opacity on initial render; they stagger in sequentially with a slight upward motion — each card animates ~60ms after the previous one
