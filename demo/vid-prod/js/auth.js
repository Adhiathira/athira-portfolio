/**
 * auth.js — vid-prod
 * Auth state simulation via localStorage.
 * localStorage persists across page navigation — appropriate for multi-page static demo.
 *
 * Exports: isLoggedIn, loginAs, logout, getUsername, routeCTA
 */

const AUTH_KEY = 'vid_auth';

/**
 * isLoggedIn — returns true if a session is stored in localStorage.
 * @returns {boolean}
 */
export function isLoggedIn() {
  return !!JSON.parse(localStorage.getItem(AUTH_KEY) || '{}').loggedIn;
}

/**
 * loginAs — persist a logged-in session for the given username.
 * @param {string} username
 */
export function loginAs(username) {
  localStorage.setItem(AUTH_KEY, JSON.stringify({ loggedIn: true, username }));
}

/**
 * logout — clear the stored session.
 */
export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

/**
 * getUsername — returns the stored username or undefined if not logged in.
 * @returns {string|undefined}
 */
export function getUsername() {
  return JSON.parse(localStorage.getItem(AUTH_KEY) || '{}').username;
}

/**
 * routeCTA — route a CTA click based on auth state.
 * Logged out → /signup.html
 * Logged in  → targetPath (default: /app/studio.html)
 *
 * @param {Event} e - the click event (will be prevented)
 * @param {string} [targetPath='/app/studio.html'] - destination when logged in
 */
export function routeCTA(e, targetPath = '/app/studio.html') {
  e.preventDefault();
  if (isLoggedIn()) {
    window.location.href = targetPath;
  } else {
    window.location.href = '/signup.html';
  }
}
