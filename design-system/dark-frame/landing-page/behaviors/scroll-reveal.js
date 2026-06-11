/**
 * scroll-reveal.js — Dark Frame
 * GSAP + ScrollTrigger animations:
 *   - Letterbox clip-path reveal on image placeholders
 *   - Slow zoom (scale 1 → 1.08) on scroll enter
 *   - Fade-up on text blocks
 *   - Hero Ken Burns effect
 * All once:true — no repeat on scroll back
 * NEVER sets opacity:0 in CSS — gsap.set() handles initial state
 */

(function () {
  'use strict';

  // Guard — GSAP must be loaded
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('Dark Frame: GSAP or ScrollTrigger not loaded.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // ---- Hero: Slow Ken Burns zoom ---
  const heroPhoto = document.querySelector('.hero__photo');
  if (heroPhoto) {
    gsap.to(heroPhoto, {
      scale: 1.06,
      duration: 12,
      ease: 'none',
      repeat: -1,
      yoyo: true
    });
  }

  // Hero content fade-in on load
  const heroContent = document.querySelector('.hero__content');
  if (heroContent) {
    gsap.set(heroContent, { opacity: 0, y: 30 });
    gsap.to(heroContent, {
      opacity: 1,
      y: 0,
      duration: 1.1,
      ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
      delay: 0.3
    });
  }

  // ---- Letterbox reveal on image placeholders ----
  const letterboxTargets = document.querySelectorAll('[data-reveal="letterbox"]');

  letterboxTargets.forEach(function (el) {
    gsap.set(el, { clipPath: 'inset(20% 0 20% 0)' });

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: function () {
        gsap.to(el, {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.9,
          ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
      }
    });
  });

  // ---- Slow zoom on image wrappers ----
  const zoomTargets = document.querySelectorAll('[data-reveal="zoom"]');

  zoomTargets.forEach(function (el) {
    gsap.set(el, { scale: 1.0 });

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: function () {
        gsap.to(el, {
          scale: 1.08,
          duration: 0.8,
          ease: 'ease-out'
        });
      }
    });
  });

  // ---- Fade-up text blocks ----
  const fadeTargets = document.querySelectorAll('[data-reveal="fade-up"]');

  fadeTargets.forEach(function (el) {
    gsap.set(el, { opacity: 0, y: 40 });

    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: function () {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)'
        });
      }
    });
  });

  // ---- Staggered fade-up on groups ----
  const staggerGroups = document.querySelectorAll('[data-reveal="stagger"]');

  staggerGroups.forEach(function (group) {
    const children = group.children;
    gsap.set(children, { opacity: 0, y: 40 });

    ScrollTrigger.create({
      trigger: group,
      start: 'top 85%',
      once: true,
      onEnter: function () {
        gsap.to(children, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          stagger: 0.12
        });
      }
    });
  });

  // ---- Parallax on full-bleed sections ----
  const parallaxSections = document.querySelectorAll('[data-parallax]');

  parallaxSections.forEach(function (section) {
    const inner = section.querySelector('[data-parallax-inner]');
    if (!inner) return;

    gsap.to(inner, {
      yPercent: -15,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.8
      }
    });
  });

})();
