/**
 * prose-weight — Navigation Behavior
 * Mobile menu toggle.
 * Nav has backdrop-filter from CSS — no scroll changes needed.
 */

(function () {
  'use strict';

  function initNav() {
    const toggle = document.querySelector('.site-nav__mobile-toggle');
    const links = document.querySelector('.site-nav__links');

    if (toggle && links) {
      toggle.addEventListener('click', function () {
        const isOpen = links.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', isOpen.toString());
        toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      });

      // Close on outside click
      document.addEventListener('click', function (e) {
        if (!toggle.contains(e.target) && !links.contains(e.target)) {
          links.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });

      // Close on Escape
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          links.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.focus();
        }
      });
    }

    // Mark active nav link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.site-nav__links a');
    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('is-active');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav);
  } else {
    initNav();
  }
})();
