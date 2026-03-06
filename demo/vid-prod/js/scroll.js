/**
 * scroll.js — vid-prod
 * Detect-scroll behavior for navbar.
 * Source: motion.json cssAnimations.animatedElements — #navigation-menu with detect-scroll animation.
 * Adds .navbar--scrolled class when scrollY > 10, which triggers box-shadow in components.css.
 */

const navbar = document.querySelector('.navbar');

if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('navbar--scrolled', window.scrollY > 10);
  }, { passive: true });
}
