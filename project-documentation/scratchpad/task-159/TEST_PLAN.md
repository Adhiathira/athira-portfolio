# TEST PLAN — Task 159: [hermes-vid][3/10] Implement video API routes with async generation and multer

> Tests verify three video API endpoints: list, fetch-by-id, and generate (with async status flip after 4 s). The placeholder `.mp4` asset must also be present and servable.

## Prerequisites

- Start the backend server: `cd sites/hermes-video-gen/backend && node server.js`
- Server should log `Server running at http://localhost:3333`
- No env vars required — auth uses a hardcoded mock Bearer token: `mock-jwt-hermes-xyz`
- `curl` must be available in the terminal

---

## Test Cases

### TC-001: List videos — authenticated

**Method**: curl

**Steps**:
1. Use curl to GET `http://localhost:3333/api/videos` with header `Authorization: Bearer mock-jwt-hermes-xyz`

**Expected result**: HTTP 200 with a JSON array of exactly 6 video objects. The first object's `createdAt` value is the most recent (largest) date among all 6.

---

### TC-002: List videos — unauthenticated

**Method**: curl

**Steps**:
1. Use curl to GET `http://localhost:3333/api/videos` with no `Authorization` header

**Expected result**: HTTP 401 with JSON body containing `"error": "Unauthorized"` (or equivalent 401 response).

---

### TC-003: Generate a video — happy path, prompt only

**Method**: curl

**Steps**:
1. Use curl to POST `http://localhost:3333/api/videos/generate` with header `Authorization: Bearer mock-jwt-hermes-xyz` and multipart field `prompt` set to any non-empty string (e.g. `"Silk threads caught in morning light"`)
2. Note the `id` field from the response body

**Expected result**: HTTP 202 with a JSON object containing `status: "generating"`, `imageUsed: false`, `videoUrl: null`, and a valid UUID as `id`.

---

### TC-004: Poll for completion after generate

**Method**: curl

**Steps**:
1. Run TC-003 and capture the returned `id`
2. Immediately use curl to GET `http://localhost:3333/api/videos/<id>` with header `Authorization: Bearer mock-jwt-hermes-xyz`
3. Wait 5 seconds
4. Use curl to GET the same URL again

**Expected result**:
- Step 2 response: `status` is `"generating"` and `videoUrl` is `null`
- Step 4 response: `status` is `"done"` and `videoUrl` is `"/assets/placeholder.mp4"`

---

### TC-005: Generate with optional image attachment

**Method**: curl

**Steps**:
1. Use curl to POST `http://localhost:3333/api/videos/generate` with header `Authorization: Bearer mock-jwt-hermes-xyz`, multipart field `prompt` set to any string, and multipart field `image` pointing to any local image file (e.g. a `.jpg` or `.png`)

**Expected result**: HTTP 202 with a JSON object where `imageUsed` is `true`.

---

### TC-006: Generate — missing prompt

**Method**: curl

**Steps**:
1. Use curl to POST `http://localhost:3333/api/videos/generate` with header `Authorization: Bearer mock-jwt-hermes-xyz` and a multipart body that does NOT include a `prompt` field (e.g. include only an unrelated field like `x=noprompt`)

**Expected result**: HTTP 400 with JSON body containing `"error": "prompt is required"`.

---

### TC-007: Fetch video by ID — not found

**Method**: curl

**Steps**:
1. Use curl to GET `http://localhost:3333/api/videos/nonexistent-id-xyz` with header `Authorization: Bearer mock-jwt-hermes-xyz`

**Expected result**: HTTP 404 with JSON body containing an `"error"` field (e.g. `"Not found"`).

---

### TC-008: Placeholder video asset is served

**Method**: Playwright MCP (browser)

**Steps**:
1. Use Playwright MCP to navigate to `http://localhost:3333/assets/placeholder.mp4`

**Expected result**: The browser either plays the video inline or initiates a download — confirming the `.mp4` file exists and is a valid video file served by the static asset middleware. No 404 or error page.

---
