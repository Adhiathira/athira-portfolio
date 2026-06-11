/* plane-cut — Nav Behavior */

(function () {
  'use strict';

  const nav = document.querySelector('.site-nav');
  const mobileToggle = document.querySelector('.nav-mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Mobile menu toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.contains('is-open');
      navLinks.classList.toggle('is-open', !isOpen);
      mobileToggle.setAttribute('aria-expanded', String(!isOpen));
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target)) {
        navLinks.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Active link highlighting
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const allNavLinks = document.querySelectorAll('.nav-links a');

  allNavLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href && href.includes(currentPath)) {
      link.classList.add('active');
    }
  });

  // Scroll: add subtle shadow deepening on scroll (nav is already fixed)
  let lastScrollY = 0;
  window.addEventListener('scroll', function () {
    const scrollY = window.scrollY;
    if (scrollY > 20 && lastScrollY <= 20) {
      nav.style.boxShadow = '0 2px 16px rgba(26, 20, 16, 0.10)';
    } else if (scrollY <= 20 && lastScrollY > 20) {
      nav.style.boxShadow = '0 1px 0 rgba(26, 20, 16, 0.08)';
    }
    lastScrollY = scrollY;
  }, { passive: true });
})();
