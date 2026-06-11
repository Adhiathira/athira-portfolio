# TEST PLAN — Task 166: [hermes-vid][10/10] Build video playback modal

> Tests the video playback modal triggered by clicking "Done" video cards on the dashboard. Verifies open/close interactions, video playback behavior, and that "Generating" cards remain non-interactive.

## Prerequisites

- Start the backend server: `cd sites/hermes-video-gen/backend && node server.js`
- Open a browser and navigate to `http://localhost:9876/auth.html`
- Log in with valid credentials
- Navigate to `http://localhost:9876/dashboard.html` — confirm at least one "Done" video card is visible (seed data provides 6)

---

## Test Cases

### TC-001: Open modal by clicking a "Done" video card

**Method**: Playwright MCP (browser)

**Steps**:
1. Use Playwright MCP to navigate to `http://localhost:9876/dashboard.html`
2. Use Playwright MCP to take a snapshot and identify a video card with "Done" status (not a shimmer/generating card)
3. Use Playwright MCP to click that card

**Expected result**: A dark full-screen overlay appears. A video player element is visible inside the modal box. The placeholder video begins playing (muted). A prompt text string is displayed below the video in italic style. A close button (✕) is visible in the top-right corner of the modal box. Body scroll is locked (page does not scroll when attempting to scroll).

---

### TC-002: Close modal with the ✕ button

**Method**: Playwright MCP (browser)

**Steps**:
1. Open the modal by clicking a "Done" card (see TC-001 setup)
2. Use Playwright MCP to click the ✕ close button inside the modal

**Expected result**: The modal overlay disappears. The dashboard grid is visible again. Body scroll is restored (page scrolls normally). The video element is no longer audible or playing.

---

### TC-003: Close modal by clicking the overlay background

**Method**: Playwright MCP (browser)

**Steps**:
1. Open the modal by clicking a "Done" card (see TC-001 setup)
2. Use Playwright MCP to click directly on the dark overlay area — outside the modal box, not on the video or prompt

**Expected result**: The modal overlay disappears. Same result as TC-002.

---

### TC-004: Close modal with the Escape key

**Method**: Playwright MCP (browser)

**Steps**:
1. Open the modal by clicking a "Done" card (see TC-001 setup)
2. Use Playwright MCP to press the Escape key

**Expected result**: The modal overlay disappears. Same result as TC-002.

---

### TC-005: Prompt text matches the card that was clicked

**Method**: Playwright MCP (browser)

**Steps**:
1. Use Playwright MCP to navigate to the dashboard and take a snapshot
2. Note the prompt text visible on a specific "Done" card thumbnail/label
3. Click that card to open the modal
4. Read the modal's prompt paragraph text

**Expected result**: The text in the modal's `.modal__prompt` paragraph matches the prompt shown on the card that was clicked.

---

### TC-006: "Generating" card does not open the modal

**Method**: Playwright MCP (browser)

**Steps**:
1. Use Playwright MCP to navigate to `http://localhost:9876/create.html` (or the Create tab in the dashboard)
2. Submit a new video generation request
3. Immediately return to the dashboard before the card transitions to "Done"
4. Use Playwright MCP to click on the shimmer/generating card

**Expected result**: The modal overlay does not appear. Nothing happens. The card cursor is `default` (not `pointer`).

---

### TC-007: Video src is cleared after modal close

**Method**: Playwright MCP (browser)

**Steps**:
1. Open the modal by clicking a "Done" card
2. Confirm video is playing (snapshot shows video element)
3. Close the modal using the ✕ button
4. Use Playwright MCP to evaluate `document.getElementById('modal-video').src` in the browser console

**Expected result**: The `src` attribute is empty string or `''` — not a URL — confirming the video resource has been released.
