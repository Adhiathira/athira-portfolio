const BASE_URL = '';  // same origin — Express serves everything from port 3333

function getToken() {
  return sessionStorage.getItem('auth_token');
}

function authHeaders(extra = {}) {
  const token = getToken();
  return token
    ? { Authorization: `Bearer ${token}`, ...extra }
    : { ...extra };
}

async function handleResponse(res) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }));
    throw Object.assign(new Error(body.error || res.statusText), { status: res.status });
  }
  return res.json();
}

export const api = {
  /** JSON POST */
  async post(path, body) {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(body),
    });
    return handleResponse(res);
  },

  /** multipart/form-data POST — pass a FormData instance */
  async postForm(path, formData) {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: authHeaders(),   // do NOT set Content-Type — browser sets it with boundary
      body: formData,
    });
    return handleResponse(res);
  },

  /** JSON GET */
  async get(path) {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: authHeaders(),
    });
    return handleResponse(res);
  },
};
