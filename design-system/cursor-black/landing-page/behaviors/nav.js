/* Cursor Black — Navigation Behavior */

(function () {
  'use strict';

  const nav = document.getElementById('site-nav');
  const mobileToggle = document.querySelector('.nav-mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const SCROLLED_CLASS = 'scrolled';
  const OPEN_CLASS = 'is-open';

  // Scroll behavior
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 40) {
        nav.classList.add(SCROLLED_CLASS);
      } else {
        nav.classList.remove(SCROLLED_CLASS);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile menu toggle
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle(OPEN_CLASS);
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on link click
    mobileMenu.querySelectorAll('.nav-mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove(OPEN_CLASS);
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains(OPEN_CLASS)) {
        mobileMenu.classList.remove(OPEN_CLASS);
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.focus();
      }
    });
  }

  // Active link detection
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    }
  });
})();
