/* nav.js — Quiet Plinth nav behavior */
/* Scroll class toggle + mobile menu */
(function () {
  'use strict';

  const nav = document.getElementById('site-nav');
  const mobileMenu = document.getElementById('nav-mobile-menu');
  const toggle = nav ? nav.querySelector('.nav-mobile-toggle') : null;

  // Scroll → add .scrolled class for background-color transition
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run on load
  }

  // Mobile menu toggle
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('is-open');
      nav.classList.toggle('nav-mobile-open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on overlay link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        nav.classList.remove('nav-mobile-open');
        document.body.style.overflow = '';
      });
    });
  }

  // Mark active nav link based on current page
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#site-nav .nav-links a, #nav-mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentFile || (currentFile === '' && href === 'index.html')) {
      a.classList.add('nav-link--active');
    }
  });
})();
