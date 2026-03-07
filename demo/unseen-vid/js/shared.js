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
