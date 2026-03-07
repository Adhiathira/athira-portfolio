/**
 * nav.js — Kinetic-vid nav scroll class-toggle + auth state + dropdown
 *
 * nav.json scrollTransition:
 *   mechanism: "class-toggle"
 *   triggerClass: "fixed"
 *   threshold: 50px (geometry.height)
 */

(function () {
  'use strict';

  const nav = document.getElementById('site-nav');

  if (!nav) {
    console.debug('[nav] No #site-nav found — skipped.');
    return;
  }

  /* ── Sticky scroll class-toggle ───────────────────────────── */
  const SCROLL_THRESHOLD = 50;

  function onScroll() {
    const shouldBeFixed = window.scrollY > SCROLL_THRESHOLD;
    if (shouldBeFixed !== nav.classList.contains('fixed')) {
      nav.classList.toggle('fixed', shouldBeFixed);
    }
  }

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Auth state: is-logged-in ─────────────────────────────── */
  const authToken = localStorage.getItem('auth_token');
  if (authToken) {
    nav.classList.add('is-logged-in');
    const authLinks    = nav.querySelector('.nav-links--auth');
    const publicLinks  = nav.querySelector('.nav-links--public');
    const authActions  = nav.querySelector('.nav-actions--auth');
    const publicActions = nav.querySelector('.nav-actions--public');
    if (authLinks)     authLinks.removeAttribute('aria-hidden');
    if (publicLinks)   publicLinks.setAttribute('aria-hidden', 'true');
    if (authActions)   authActions.removeAttribute('aria-hidden');
    if (publicActions) publicActions.setAttribute('aria-hidden', 'true');
  }

  /* ── Logout ───────────────────────────────────────────────── */
  const logoutBtn = document.getElementById('nav-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function (e) {
      e.preventDefault();
      localStorage.removeItem('auth_token');
      window.location.reload();
    });
  }

  /* ── Avatar dropdown (hover desktop / click mobile) ──────── */
  const avatarWrap = nav.querySelector('.nav-avatar-wrap');
  if (avatarWrap) {
    avatarWrap.addEventListener('click', function () {
      const isOpen = avatarWrap.classList.toggle('is-open');
      avatarWrap.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', function (e) {
      if (!avatarWrap.contains(e.target)) {
        avatarWrap.classList.remove('is-open');
        avatarWrap.setAttribute('aria-expanded', 'false');
      }
    });

    avatarWrap.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        avatarWrap.classList.remove('is-open');
        avatarWrap.setAttribute('aria-expanded', 'false');
      } else if ((e.key === 'Enter' || e.key === ' ') && e.target === avatarWrap) {
        e.preventDefault();
        const isOpen = avatarWrap.classList.toggle('is-open');
        avatarWrap.setAttribute('aria-expanded', String(isOpen));
      }
    });
  }

  console.debug('[nav] initialised — threshold:', SCROLL_THRESHOLD, 'px');
}());
