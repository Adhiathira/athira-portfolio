# TEST PLAN — Task 161: [hermes-vid][5/10] Implement frontend API client module (api.js)

> Tests verify that `api.js` correctly wraps fetch, injects the Authorization header from sessionStorage, handles multipart FormData without manually setting Content-Type, and throws consistent errors for non-2xx responses.

## Prerequisites

- Express server running on port 3333: `cd sites/hermes-video-gen/backend && node server.js`
- Browser with DevTools open (Network + Console tabs)
- No prior `auth_token` in sessionStorage (open a fresh tab or clear storage)

---

## Test Cases

### TC-001: Module exports an `api` object with `get`, `post`, and `postForm` methods

**Method**: Playwright MCP (browser console evaluation)

**Steps**:
1. Use Playwright MCP to navigate to `http://localhost:3333`
2. Use Playwright MCP to evaluate in the page context:
   ```js
   const mod = await import('/js/api.js');
   return typeof mod.api.get + ',' + typeof mod.api.post + ',' + typeof mod.api.postForm;
   ```

**Expected result**: Evaluation returns `"function,function,function"` — confirming all three methods exist on the exported `api` object.

---

### TC-002: Unauthenticated GET throws error with `.status === 401`

**Method**: Playwright MCP (browser console evaluation)

**Steps**:
1. Use Playwright MCP to navigate to `http://localhost:3333`
2. Ensure sessionStorage has no `auth_token` (clear it if needed)
3. Use Playwright MCP to evaluate:
   ```js
   const { api } = await import('/js/api.js');
   try {
     await api.get('/api/videos');
     return 'no-error';
   } catch (e) {
     return e.status + ':' + e.message;
   }
   ```

**Expected result**: Evaluation returns a string starting with `"401:"` — confirms the module throws an error with `.status` set to 401 for unauthenticated requests.

---

### TC-003: Authenticated GET attaches Authorization header and returns data

**Method**: Playwright MCP (browser console evaluation + Network tab)

**Steps**:
1. Use Playwright MCP to navigate to `http://localhost:3333`
2. Use Playwright MCP to evaluate:
   ```js
   sessionStorage.setItem('auth_token', 'mock-jwt-hermes-xyz');
   const { api } = await import('/js/api.js');
   const result = await api.get('/api/videos');
   return Array.isArray(result) ? 'array:' + result.length : typeof result;
   ```
3. Use Playwright MCP to inspect the Network tab request for `/api/videos` and verify the `Authorization` header value

**Expected result**: Evaluation returns `"array:N"` where N ≥ 0. Network tab shows the request includes `Authorization: Bearer mock-jwt-hermes-xyz` header.

---

### TC-004: `postForm` does NOT manually set Content-Type — browser sets boundary

**Method**: Playwright MCP (browser console evaluation + Network tab)

**Steps**:
1. Use Playwright MCP to navigate to `http://localhost:3333`
2. Set a valid token in sessionStorage
3. Use Playwright MCP to evaluate:
   ```js
   sessionStorage.setItem('auth_token', 'mock-jwt-hermes-xyz');
   const { api } = await import('/js/api.js');
   const form = new FormData();
   form.append('prompt', 'Test video prompt');
   const result = await api.postForm('/api/videos/generate', form);
   return result.status;
   ```
4. Use Playwright MCP to inspect the Network tab request for `/api/videos/generate` and check the `Content-Type` request header

**Expected result**: Evaluation returns `"generating"` (or similar status string from the mock route). Network tab shows `Content-Type: multipart/form-data; boundary=----WebKit...` — the header is browser-set and includes a boundary parameter, NOT manually set to bare `multipart/form-data`.

---

### TC-005: Non-2xx response throws Error with `.status` property set to HTTP code

**Method**: Playwright MCP (browser console evaluation)

**Steps**:
1. Use Playwright MCP to navigate to `http://localhost:3333`
2. Use Playwright MCP to evaluate:
   ```js
   const { api } = await import('/js/api.js');
   try {
     await api.get('/api/nonexistent');
     return 'no-error';
   } catch (e) {
     return 'status:' + e.status + ' msg:' + (e.message ? 'present' : 'missing');
   }
   ```

**Expected result**: Evaluation returns a string containing `"status:404"` and `"msg:present"` — confirms thrown Error has both `.status` (numeric HTTP code) and `.message` populated.

> Note: `/api/auth/login` was not used here because the mock backend always returns 200 regardless of credentials. `/api/nonexistent` reliably returns a 404 from Express, which is sufficient to exercise the `handleResponse` error path.

---

### TC-006: `post` method sends JSON body with correct Content-Type

**Method**: Playwright MCP (browser console evaluation + Network tab)

**Steps**:
1. Use Playwright MCP to navigate to `http://localhost:3333`
2. Use Playwright MCP to evaluate:
   ```js
   const { api } = await import('/js/api.js');
   try {
     await api.post('/api/auth/login', { email: 'test@test.com', password: 'password123' });
     return 'success';
   } catch(e) {
     return 'error:' + e.status;
   }
   ```
3. Use Playwright MCP to inspect the Network tab request for `/api/auth/login` and check request headers and body

**Expected result**: Evaluation returns `"success"`. Network tab shows the request has `Content-Type: application/json` header and a JSON body `{"email":"test@test.com","password":"password123"}`, and the response is `{ token, user }` — the mock login route always returns success regardless of credentials.
