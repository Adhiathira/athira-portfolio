/**
 * scroll-nav.js
 * Handles fixed nav scroll state transition + mobile menu toggle.
 * Reusable across html-stack generated sites.
 * Pattern: add/remove .scrolled class on #site-nav based on scroll position.
 */

(function initScrollNav() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;

  // Scroll state
  function handleScroll() {
    if (window.scrollY > 30) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // init on load

  // Mobile toggle — toggles .is-open on .nav-mobile-menu and .nav-mobile-open on nav
  const toggle = document.querySelector('.nav-mobile-toggle');
  const mobileMenu = document.querySelector('.nav-mobile-menu');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.contains('is-open');
      if (isOpen) {
        mobileMenu.classList.remove('is-open');
        nav.classList.remove('nav-mobile-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      } else {
        mobileMenu.classList.add('is-open');
        nav.classList.add('nav-mobile-open');
        toggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }
    });

    // Close on any link click inside mobile menu
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('is-open');
        nav.classList.remove('nav-mobile-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }
})();
