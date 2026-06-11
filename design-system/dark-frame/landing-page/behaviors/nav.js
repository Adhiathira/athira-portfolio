/**
 * nav.js — Dark Frame
 * Nav scroll behavior + mobile toggle
 */

(function () {
  'use strict';

  const nav = document.querySelector('.site-nav');
  const toggle = document.querySelector('.site-nav__toggle');
  const linksMenu = document.querySelector('.site-nav__links');

  if (!nav) return;

  // --- Scroll state ---
  let ticking = false;

  function updateNav() {
    if (window.scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(updateNav);
      ticking = true;
    }
  }, { passive: true });

  // Run once on load in case page is pre-scrolled
  updateNav();

  // --- Mobile toggle ---
  if (toggle && linksMenu) {
    toggle.addEventListener('click', function () {
      const isOpen = linksMenu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && linksMenu.classList.contains('open')) {
        linksMenu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- Active link ---
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.site-nav__links a');

  navLinks.forEach(function (link) {
    const href = link.getAttribute('href') || '';
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();
