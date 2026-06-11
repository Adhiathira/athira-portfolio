# TEST PLAN — Task 158: [hermes-vid][2/10] Implement mock auth API routes

> Tests that the two mock auth endpoints (`POST /api/auth/login` and `POST /api/auth/signup`) return the correct `{token, user}` shape under all documented input scenarios, including empty bodies.

## Prerequisites

- Node.js installed
- Start the backend server: `cd sites/hermes-video-gen/backend && node server.js`
- Confirm server is running (console should print: `Server running at http://localhost:3333`)
- `curl` available in the terminal

---

## Test Cases

### TC-001: Login with credentials returns token and user

**Method**: curl

**Steps**:
1. Use curl to POST a login payload with an email and password to `POST /api/auth/login`
2. Inspect the HTTP status code and response body

**Expected result**: HTTP 200 with JSON body `{"token":"mock-jwt-hermes-xyz","user":{"id":1,"email":"test@example.com","name":"Studio User"}}`

---

### TC-002: Login with empty body does not crash

**Method**: curl

**Steps**:
1. Use curl to POST an empty JSON object `{}` to `POST /api/auth/login`
2. Inspect the HTTP status code and response body

**Expected result**: HTTP 200 with JSON body containing `token` field set to `mock-jwt-hermes-xyz` and `user.email` set to the default `user@example.com` — no 500 error

---

### TC-003: Signup with credentials returns token and named user

**Method**: curl

**Steps**:
1. Use curl to POST a signup payload with `email` and `name` fields to `POST /api/auth/signup`
2. Inspect the HTTP status code and response body

**Expected result**: HTTP 200 with JSON body `{"token":"mock-jwt-hermes-xyz","user":{"id":1,"email":"new@example.com","name":"Jane"}}`

---

### TC-004: Signup with empty body uses defaults

**Method**: curl

**Steps**:
1. Use curl to POST an empty JSON object `{}` to `POST /api/auth/signup`
2. Inspect the HTTP status code and response body

**Expected result**: HTTP 200 with JSON body containing `token` field set to `mock-jwt-hermes-xyz` and `user.name` set to `Studio User` and `user.email` set to `user@example.com` — no 500 error

---

### TC-005: Previously-stubbed routes no longer return 501

**Method**: curl

**Steps**:
1. Use curl to POST any payload to `POST /api/auth/login`
2. Confirm the response is NOT `{"error":"Not implemented"}` and NOT HTTP 501

**Expected result**: Response status is 200, not 501, confirming the stub has been replaced by the real router
