/**
 * auth.js
 * CTA routing — connects signup and login CTA clicks to their destinations.
 *
 * From blueprint.md > Section 3 — CTA Placement Logic:
 *   "Any 'Start creating' or 'Make your own' click routes new visitors to /signup,
 *    returning visitors to /login."
 *
 * From goal.md > Factor 6 — Conversion Friction:
 *   "The creative intent triggers the authentication; the authentication does not
 *    gate the creative intent — the sequencing matters behaviourally."
 *
 * This stub logs the routing action. In production, check auth state via
 * session storage or a lightweight auth check, then redirect accordingly.
 *
 * Selectors used:
 *   [data-cta="signup"]  — primary creation CTAs ("Start creating", "Make your own")
 *   [data-cta="login"]   — login links ("Log in", "Sign in")
 *   [data-cta="join"]    — nav "Join" button (maps to signup for new visitors)
 */

(function () {
  'use strict';

  // In production: check auth state (session, cookie, or lightweight endpoint).
  // Returning users route to /login; new users route to /signup.
  function isReturningUser() {
    // Stub: check localStorage for a returning-user signal
    return localStorage.getItem('kv_returning_user') === 'true';
  }

  function routeToAuth(cta) {
    const returning = isReturningUser();
    const destination = returning ? '/login' : '/signup';
    console.info('[auth] CTA clicked:', cta, '— routing to:', destination, '| returning:', returning);
    // In production: window.location.href = destination;
  }

  document.addEventListener('click', function (e) {
    // Signup / creation CTAs
    const signupTarget = e.target.closest('[data-cta="signup"]');
    if (signupTarget) {
      e.preventDefault();
      console.debug('[auth] signup CTA clicked — element:', signupTarget.textContent.trim());
      routeToAuth('signup');
      return;
    }

    // Login CTA
    const loginTarget = e.target.closest('[data-cta="login"]');
    if (loginTarget) {
      e.preventDefault();
      console.debug('[auth] login CTA clicked — element:', loginTarget.textContent.trim());
      console.info('[auth] routing directly to /login');
      // In production: window.location.href = '/login';
      return;
    }

    // Join CTA (nav) — equivalent to signup for new visitors
    const joinTarget = e.target.closest('[data-cta="join"]');
    if (joinTarget) {
      e.preventDefault();
      console.debug('[auth] join CTA clicked — element:', joinTarget.textContent.trim());
      routeToAuth('join');
      return;
    }
  });

  console.debug('[auth] CTA routing initialised.');
}());
