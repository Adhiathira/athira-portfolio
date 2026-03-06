/**
 * main.js — caspers-vid
 * Initializes Locomotive Scroll and handles page transition animations.
 * Source: motion.json (oldPage/newPage keyframes, ease-standard/ease-sweep tokens)
 */

import LocomotiveScroll from 'https://cdn.skypack.dev/locomotive-scroll';

// ---------------------------------------------------------------------------
// Locomotive Scroll init
// Requires [data-scroll-container] on the root scrollable element.
// Guard: not all pages (e.g. login, signup) use Locomotive Scroll.
// ---------------------------------------------------------------------------
const scrollEl = document.querySelector('[data-scroll-container]');
if (scrollEl) {
  new LocomotiveScroll({ el: scrollEl, smooth: true });
}

// ---------------------------------------------------------------------------
// Page transition — exit animation
// When an internal link is clicked: fire oldPage on body, then navigate.
// Duration matches --duration-cinematic (1s) from tokens.css, but exit
// is shortened to 0.4s (matches motion.json oldPage pattern — scale only,
// not full cinematic duration) per task spec.
// ---------------------------------------------------------------------------
document.querySelectorAll('a[href]').forEach(link => {
  link.addEventListener('click', (e) => {
    // Don't intercept modifier-key clicks (new tab/window intent), non-primary
    // buttons, blank targets, or download links.
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (link.target === '_blank' || link.hasAttribute('download')) return;
    const href = link.getAttribute('href');
    if (href && (href.startsWith('/') || href.startsWith('./'))) {
      e.preventDefault();
      document.body.style.animation = 'oldPage 0.4s var(--ease-standard) forwards';
      setTimeout(() => {
        window.location.href = href;
      }, 400);
    }
  });
});

// ---------------------------------------------------------------------------
// Page transition — entrance animation
// On every page load, fire newPage so the content rises into view.
// ---------------------------------------------------------------------------
window.addEventListener('DOMContentLoaded', () => {
  document.body.style.animation = 'newPage 0.5s var(--ease-standard) forwards';
});
