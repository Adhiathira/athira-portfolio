# TEST PLAN — Task 157: [hermes-vid][1/10] Set up Express server with static serving and in-memory store

> Verifies that the Express foundation is correctly wired: the server starts, serves static files from `frontend/`, mounts API stubs under `/api/*`, rejects unauthenticated requests with 401, and exports exactly 6 seeded video entries from `store.js`.

## Prerequisites

- Node.js >= 18 installed
- From the project root, the directory `sites/hermes-video-gen/backend/` must exist
- Run `npm install` in `sites/hermes-video-gen/backend/` before any test
- Start the server: `node server.js` from `sites/hermes-video-gen/backend/` — expect `Server running at http://localhost:3333` in the terminal

---

## Test Cases

### TC-001: Server starts and responds on port 3333

**Method**: curl

**Steps**:
1. Use curl to send a GET request to `http://localhost:3333/`
2. Observe the HTTP response status code and body

**Expected result**: Server returns any HTTP response (200 with HTML/empty body, or 404 page) — no connection refused error. The important signal is that something is listening on port 3333.

---

### TC-002: Assets directory is served at `/assets`

**Method**: curl

**Steps**:
1. Use curl to send a GET request to `http://localhost:3333/assets/placeholder.mp4`
2. Observe the HTTP response

**Expected result**: Server returns 404 (file not yet present — that's expected at this stage) rather than a connection error. This confirms the `/assets` static mount is configured and responding.

---

### TC-003: Auth middleware rejects unauthenticated requests with 401

**Method**: curl

**Steps**:
1. Use curl to send a GET request to `http://localhost:3333/api/videos` with no `Authorization` header
2. Observe the HTTP status code and response body

**Expected result**: HTTP 401 response with JSON body `{"error":"Unauthorized"}`.

---

### TC-004: Auth middleware allows requests with a Bearer token

**Method**: curl

**Steps**:
1. Use curl to send a GET request to `http://localhost:3333/api/videos` with header `Authorization: Bearer anytoken`
2. Observe the HTTP status code

**Expected result**: HTTP status is NOT 401 — either 501 (stub not implemented) or 200 with data. The key is that the auth check passes and the request proceeds past the middleware.

---

### TC-005: In-memory store has exactly 6 seed entries

**Method**: curl

**Steps**:
1. Temporarily add a debug route to `server.js`: `app.get('/debug/store', (req, res) => res.json(videos))` (importing `videos` from `./store.js`)
2. Restart the server
3. Use curl to GET `http://localhost:3333/debug/store`
4. Count the entries in the returned JSON array
5. Remove the debug route after verification

**Expected result**: JSON array with exactly 6 objects. Each object contains `id`, `prompt` (non-empty string), `status: "done"`, `videoUrl: "/assets/placeholder.mp4"`, `thumbnailUrl: null`, `imageUsed` (boolean), and `createdAt` (ISO date string). Dates should span the past 2–14 days.

---

### TC-006: store.js exports a mutable array (not frozen)

**Method**: curl + temporary debug route

**Steps**:
1. Add a temporary route to `server.js` that pushes a test entry to the `videos` array and returns the new length: `app.get('/debug/mutate', (req, res) => { videos.push({ id: 'test' }); res.json({ length: videos.length }); })`
2. Restart the server
3. Use curl to GET `http://localhost:3333/debug/mutate`
4. Remove the debug route after verification

**Expected result**: Response JSON shows `{"length": 7}` — confirming the array accepted a push (i.e., it is mutable, not frozen or a copy).
