// ──────────────────────────────────────────────────────────────────────────────
// shared.js — Auth state, nav, and redirect utilities
// Used by all unseen-vid pages
// ──────────────────────────────────────────────────────────────────────────────

// Auth state — read once on load
window.__auth = null;

(function initAuth() {
  try {
    const stored = localStorage.getItem('user');
    window.__auth = stored ? JSON.parse(stored) : null;
  } catch (e) {
    window.__auth = null;
  }
})();

/**
 * requireAuth — call from any CTA click handler
 * If authenticated: navigate to redirectPath
 * If not: store intended destination and redirect to signup
 *
 * @param {string} [redirectPath='/app/studio.html'] - Where to go after auth
 */
function requireAuth(redirectPath) {
  const dest = redirectPath || '/app/studio.html';
  if (window.__auth) {
    window.location.href = dest;
  } else {
    try {
      sessionStorage.setItem('redirectAfterAuth', dest);
    } catch (e) {
      // Storage unavailable (private mode, restricted context) — proceed without storing
    }
    window.location.href = '/signup.html';
  }
}

/**
 * initNav — toggle navbar auth state based on window.__auth
 * Call on DOMContentLoaded for every page (auto-invoked below).
 *
 * When authenticated:
 *   - Adds "navbar--authed" class to .navbar
 *   - Hides .navbar__auth--public
 *   - Shows .navbar__auth--authed (removes hidden attribute, sets display flex)
 *   - Hides Pricing and About nav links (replaced by Community in authed slot)
 */
function initNav() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;

  if (window.__auth) {
    nav.classList.add('navbar--authed');

    const publicAuth = nav.querySelector('.navbar__auth--public');
    const authedAuth = nav.querySelector('.navbar__auth--authed');

    if (publicAuth) publicAuth.style.display = 'none';
    if (authedAuth) {
      authedAuth.removeAttribute('hidden');
      authedAuth.style.display = 'flex';
    }

    // Hide Pricing and About links — these are surfaced in the authed Community slot
    const links = nav.querySelectorAll('.navbar__links .nav-item');
    links.forEach(function (link) {
      const label = link.textContent.trim();
      if (label === 'Pricing' || label === 'About') {
        link.style.display = 'none';
      }
    });
  }
}

// Auto-init nav on load — works whether script loads before or after DOM parse
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNav);
} else {
  initNav();
}

// ──────────────────────────────────────────────────────────────────────────────
// Auth form handlers — used by login.html and signup.html
// ──────────────────────────────────────────────────────────────────────────────

/**
 * handleSignup — form submit handler for signup.html
 * Writes user to localStorage, sets window.__auth, redirects.
 * Redirect target: sessionStorage.redirectAfterAuth || '/app/studio.html'
 */
function handleSignup(event) {
  event.preventDefault();
  const form = event.target;
  const email = form.email.value;
  const user = {
    id: Date.now().toString(),
    email: email,
    name: email.split('@')[0],
    communityPoints: 0,
    isLoggedIn: true
  };
  localStorage.setItem('user', JSON.stringify(user));
  window.__auth = user;
  const redirect = sessionStorage.getItem('redirectAfterAuth') || '/app/studio.html';
  sessionStorage.removeItem('redirectAfterAuth');
  window.location.href = redirect;
}

/**
 * handleLogin — form submit handler for login.html
 * Accepts any credentials (mock — no real backend).
 * Writes user to localStorage with communityPoints: 1240 (returning creator).
 * Redirect target: sessionStorage.redirectAfterAuth || '/app/studio.html'
 */
function handleLogin(event) {
  event.preventDefault();
  const form = event.target;
  const email = form.email.value;
  const user = {
    id: Date.now().toString(),
    email: email,
    name: email.split('@')[0],
    communityPoints: 1240,
    isLoggedIn: true
  };
  localStorage.setItem('user', JSON.stringify(user));
  window.__auth = user;
  const redirect = sessionStorage.getItem('redirectAfterAuth') || '/app/studio.html';
  sessionStorage.removeItem('redirectAfterAuth');
  window.location.href = redirect;
}

/**
 * handleOAuthMock — simulates immediate OAuth success for Google / GitHub.
 * No real OAuth — mock only. Writes user to localStorage and redirects.
 *
 * @param {string} provider - 'google' | 'github'
 */
function handleOAuthMock(provider) {
  const user = {
    id: Date.now().toString(),
    email: 'user@' + provider + '.mock',
    name: 'Creator',
    communityPoints: 0,
    isLoggedIn: true
  };
  localStorage.setItem('user', JSON.stringify(user));
  window.__auth = user;
  const redirect = sessionStorage.getItem('redirectAfterAuth') || '/app/studio.html';
  sessionStorage.removeItem('redirectAfterAuth');
  window.location.href = redirect;
}

/**
 * guardPage — call as first script action on any gated workspace page.
 * Redirects unauthenticated visitors to /login.html immediately.
 * Stores current path in sessionStorage so auth pages can redirect back.
 *
 * Usage: guardPage(); // call before any DOM access or rendering
 */
function guardPage() {
  if (!window.__auth) {
    try {
      sessionStorage.setItem('redirectAfterAuth', window.location.pathname);
    } catch (e) {
      // Storage unavailable — proceed without storing
    }
    window.location.href = '/login.html';
  }
}
