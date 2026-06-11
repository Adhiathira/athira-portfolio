/**
 * ink-burst — Nav Behavior
 * Marks active nav link based on current page.
 * Handles mobile hamburger menu toggle.
 */

(function () {
  'use strict';

  function initNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');

    // Mark active link
    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      if (!href) return;

      const linkPath = href.replace(/^\.\//, '/').replace(/index\.html$/, '');
      const normalizedCurrent = currentPath.replace(/index\.html$/, '');

      if (
        href === currentPath ||
        (normalizedCurrent !== '/' && normalizedCurrent.includes(linkPath) && linkPath !== '/') ||
        (currentPath.endsWith(href)) ||
        (currentPath.endsWith('/' + href))
      ) {
        link.classList.add('is-active');
      }
    });

    // Hamburger menu (mobile)
    const hamburger = document.querySelector('.nav-hamburger');
    const navLinksList = document.querySelector('.nav-links');
    const navCtaEl = document.querySelector('.nav-cta');

    if (hamburger && navLinksList) {
      hamburger.addEventListener('click', function () {
        const isOpen = navLinksList.classList.contains('is-open');

        if (isOpen) {
          navLinksList.classList.remove('is-open');
          navLinksList.style.display = '';
          if (navCtaEl) navCtaEl.style.display = '';
        } else {
          navLinksList.classList.add('is-open');
          navLinksList.style.display = 'flex';
          navLinksList.style.flexDirection = 'column';
          navLinksList.style.position = 'absolute';
          navLinksList.style.top = 'var(--nav-height)';
          navLinksList.style.left = '0';
          navLinksList.style.right = '0';
          navLinksList.style.backgroundColor = 'var(--color-comic-yellow)';
          navLinksList.style.borderBottom = 'var(--border-ink)';
          navLinksList.style.padding = '16px 32px';
          navLinksList.style.gap = '16px';
          navLinksList.style.zIndex = '999';
        }
      });

      // Close on nav link click
      navLinksList.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          navLinksList.classList.remove('is-open');
          navLinksList.style.display = '';
        });
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav);
  } else {
    initNav();
  }
})();
