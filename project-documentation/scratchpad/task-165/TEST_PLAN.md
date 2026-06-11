# TEST PLAN — Task 165: [hermes-vid][9/10] Build Create view and generation polling flow

> Tests the Create Video form: prompt input, image upload zone, form submission flow, view-switch to My Videos, and the 2-second polling loop that flips a generating card to done.

## Prerequisites

- Start the backend server: `cd sites/hermes-video-gen/backend && node server.js`
- Navigate to `http://localhost:3333/auth.html` and log in (any credentials accepted in mock mode)
- After login, the browser redirects to `dashboard.html`
- The dashboard must show the "Create" nav link (requires Task 8 complete)

---

## Test Cases

### TC-001: Create view renders the form

**Method**: Playwright MCP (browser)

**Steps**:
1. Use Playwright MCP to navigate to `http://localhost:3333/dashboard.html`
2. Locate and click the "Create" nav button (`data-view="create"`)
3. Verify the view is now visible

**Expected result**: The Create panel shows a textarea labeled "Prompt", a dashed upload zone with "Drop an image or click to upload" text, and a "Generate" button. No other view is visible.

---

### TC-002: Empty prompt guard — Generate does nothing

**Method**: Playwright MCP (browser)

**Steps**:
1. Navigate to the Create view (click "Create" in nav)
2. Leave the prompt textarea empty
3. Click the "Generate" button

**Expected result**: No network request is made to `/api/videos/generate`. The button remains enabled and no view switch occurs.

---

### TC-003: Basic generation flow (prompt only)

**Method**: Playwright MCP (browser)

**Steps**:
1. Navigate to the Create view
2. Type a prompt into the textarea (e.g. "Morning mist over cobblestones")
3. Click "Generate"
4. Observe the view that appears

**Expected result**:
- The view switches to "My Videos" immediately after clicking Generate
- A new video card appears at the top of the grid with shimmer animation and status "Generating…"
- After approximately 4–5 seconds, the card updates in place: shimmer disappears, status shows "Done"
- No page reload occurs during the transition

---

### TC-004: Generate button disabled during request

**Method**: Playwright MCP (browser)

**Steps**:
1. Navigate to the Create view
2. Enter a prompt
3. Click "Generate" and immediately inspect the button state before the response resolves

**Expected result**: The "Generate" button shows "Generating…" text and is disabled while the request is in flight. After the request completes, the button returns to "Generate" and is re-enabled.

---

### TC-005: Form resets after successful generation

**Method**: Playwright MCP (browser)

**Steps**:
1. Navigate to the Create view
2. Enter a prompt and click "Generate"
3. After the view switches to "My Videos", navigate back to "Create"

**Expected result**: The textarea is empty. The upload zone shows the default placeholder state (arrow icon and instruction text, no image preview).

---

### TC-006: Image upload — click to select file

**Method**: Playwright MCP (browser)

**Steps**:
1. Navigate to the Create view
2. Click the dashed upload zone
3. Use the file chooser to select any image file from the filesystem

**Expected result**: An image preview appears inside the upload zone (the dashed border area is replaced by the image thumbnail). A "Remove" button appears in the top-right corner of the zone.

---

### TC-007: Image upload — Remove clears the preview

**Method**: Playwright MCP (browser)

**Steps**:
1. Navigate to the Create view and upload an image (as in TC-006)
2. Click the "Remove" button that appears over the image preview

**Expected result**: The image preview disappears. The upload zone returns to its default state with the arrow icon and "Drop an image or click to upload" text. The "Remove" button is hidden.

---

### TC-008: Drag-and-drop image onto upload zone

**Method**: Playwright MCP (browser)

**Steps**:
1. Navigate to the Create view
2. Use Playwright MCP to simulate dragging an image file over the upload zone (dragover event)
3. Then simulate dropping the file onto the zone (drop event)

**Expected result**: During dragover, the upload zone border darkens and the background tints (upload-zone--drag class applied). On drop, the image preview appears inside the zone.

---

### TC-009: Generation with image — multipart request sent

**Method**: Playwright MCP (browser) + browser network inspection

**Steps**:
1. Navigate to the Create view
2. Enter a prompt and upload an image via the zone
3. Click "Generate"
4. Inspect the network request to `/api/videos/generate`

**Expected result**: The POST request to `/api/videos/generate` uses `Content-Type: multipart/form-data` and includes both the `prompt` field and an `image` file field.

---

### TC-010: Polling stops after status reaches "done"

**Method**: Playwright MCP (browser) + browser network inspection

**Steps**:
1. Submit a generation request (as in TC-003)
2. After the card flips to "Done", monitor the network tab for further requests to `/api/videos/:id`

**Expected result**: Once the card status shows "Done", no further polling requests to `/api/videos/:id` are made (the interval is cleared).
