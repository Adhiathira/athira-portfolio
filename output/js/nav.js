/**
 * nav.js
 * Sticky nav scroll class-toggle.
 *
 * Implements the Hermes/Goyard-style scroll class-toggle from nav.json:
 *   scrollTransition.mechanism = "class-toggle"
 *   scrollTransition.triggerClass = "opaque-nav-sections" (mapped to .is-scrolled here)
 *   scrollTransition.duration = "1s"
 *   scrollTransition.easing = "ease-in"
 *
 * nav.json > background.transition = "1s" — CSS handles the animation,
 * JS only toggles the class. This keeps the JS minimal and the CSS authoritative.
 *
 * nav.json > geometry:
 *   height = 49.9765625px → trigger fires at scrollY > 50 (approx nav height)
 *   position = "absolute" → nav starts above content (not in flow)
 *
 * CSS transition on .is-scrolled is defined in components.css:
 *   background-color: transition 1s ease-in (var(--motion-nav-duration) var(--motion-nav-easing))
 *
 * nav.json > linkHover.transition = "color 0.15s ease-in-out"
 * (CSS already applies this via nav a { transition: var(--motion-nav-link) })
 */

(function () {
  'use strict';

  const nav = document.querySelector('nav');

  if (!nav) {
    console.debug('[nav] No <nav> element found — scroll toggle skipped.');
    return;
  }

  // Trigger threshold: nav.json geometry.height ≈ 50px
  const SCROLL_THRESHOLD = 50;

  // Scroll handler — passive listener for performance
  function onScroll() {
    const isScrolled = window.scrollY > SCROLL_THRESHOLD;

    if (isScrolled !== nav.classList.contains('is-scrolled')) {
      nav.classList.toggle('is-scrolled', isScrolled);
      console.debug('[nav] scroll state changed — is-scrolled:', isScrolled, '| scrollY:', window.scrollY);
    }
  }

  // Set initial state without triggering unnecessary class toggling
  onScroll();

  window.addEventListener('scroll', onScroll, { passive: true });

  console.debug('[nav] scroll class-toggle initialised — threshold:', SCROLL_THRESHOLD, 'px');
}());
