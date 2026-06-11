/* lens-noir — Scroll Reveal Animations */
/* GSAP 3.12.5 + ScrollTrigger — cinematic motion patterns */
/* IMPORTANT: All initial states set via gsap.set() — NEVER opacity:0 in CSS */

(function () {
  'use strict';

  // Guard — GSAP must be loaded
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('lens-noir: GSAP or ScrollTrigger not loaded');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // ── HERO — TITLE CARD SEQUENCE ──
  // Black screen held, then title fades in at 400ms delay over 800ms
  const heroEyebrow = document.querySelector('.hero__eyebrow');
  const heroTitle = document.querySelector('.hero__title');
  const heroSubtitle = document.querySelector('.hero__subtitle');
  const heroActions = document.querySelector('.hero__actions');
  const heroScroll = document.querySelector('.hero__scroll-indicator');

  if (heroEyebrow) {
    gsap.set(heroEyebrow, { autoAlpha: 0 });
    gsap.to(heroEyebrow, {
      autoAlpha: 1,
      delay: 0.2,
      duration: 0.6,
      ease: 'power2.out'
    });
  }

  if (heroTitle) {
    gsap.set(heroTitle, { autoAlpha: 0 });
    gsap.to(heroTitle, {
      autoAlpha: 1,
      delay: 0.4,
      duration: 0.8,
      ease: 'power3.out'
    });
  }

  if (heroSubtitle) {
    gsap.set(heroSubtitle, { autoAlpha: 0, y: 12 });
    gsap.to(heroSubtitle, {
      autoAlpha: 1,
      y: 0,
      delay: 0.9,
      duration: 0.8,
      ease: 'power2.out'
    });
  }

  if (heroActions) {
    gsap.set(heroActions, { autoAlpha: 0, y: 12 });
    gsap.to(heroActions, {
      autoAlpha: 1,
      y: 0,
      delay: 1.2,
      duration: 0.8,
      ease: 'power2.out'
    });
  }

  if (heroScroll) {
    gsap.set(heroScroll, { autoAlpha: 0 });
    gsap.to(heroScroll, {
      autoAlpha: 1,
      delay: 1.8,
      duration: 0.6,
      ease: 'power2.out'
    });
  }

  // ── SECTION HEADERS — LETTERBOX REVEAL ──
  // clip-path wipe from top to bottom as section enters viewport
  const sectionHeaders = document.querySelectorAll('.section__header, .films-section-header');
  sectionHeaders.forEach(function (el) {
    gsap.set(el, { clipPath: 'inset(0 0 100% 0)' });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: function () {
        gsap.to(el, {
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.0,
          ease: 'power2.inOut'
        });
      }
    });
  });

  // ── FILM CARDS — CINEMATIC DRIFT ──
  // x: 20 → 0, autoAlpha: 0 → 1, 1.2s, staggered
  const filmCards = document.querySelectorAll('.film-card, .testimonial-card');
  filmCards.forEach(function (el, index) {
    gsap.set(el, { autoAlpha: 0, x: 20 });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: function () {
        gsap.to(el, {
          autoAlpha: 1,
          x: 0,
          duration: 1.2,
          delay: (index % 3) * 0.12,
          ease: 'power1.out'
        });
      }
    });
  });

  // ── STATS — IRIS WIPE ──
  // circular clip-path expanding from center
  const statItems = document.querySelectorAll('.stat-item');
  statItems.forEach(function (el, index) {
    gsap.set(el, { clipPath: 'circle(0% at 50% 50%)', autoAlpha: 0 });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: function () {
        gsap.to(el, {
          clipPath: 'circle(80% at 50% 50%)',
          autoAlpha: 1,
          duration: 0.9,
          delay: index * 0.1,
          ease: 'power2.out'
        });
      }
    });
  });

  // ── ACT ITEMS — LETTERBOX REVEAL ──
  const actItems = document.querySelectorAll('.act-item');
  actItems.forEach(function (el, index) {
    gsap.set(el, { autoAlpha: 0, y: 24 });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: function () {
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'power2.out'
        });
      }
    });
  });

  // ── PRICING CARDS ──
  const pricingCards = document.querySelectorAll('.pricing-card');
  pricingCards.forEach(function (el, index) {
    gsap.set(el, { autoAlpha: 0, y: 32 });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: function () {
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.12,
          ease: 'power2.out'
        });
      }
    });
  });

  // ── TEAM CARDS ──
  const teamCards = document.querySelectorAll('.team-card');
  teamCards.forEach(function (el, index) {
    gsap.set(el, { autoAlpha: 0, x: 20 });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: function () {
        gsap.to(el, {
          autoAlpha: 1,
          x: 0,
          duration: 1.0,
          delay: (index % 4) * 0.1,
          ease: 'power1.out'
        });
      }
    });
  });

  // ── FOOTER CREDITS — ROLLING CREDITS ──
  const footerColumns = document.querySelectorAll('.footer__brand, .footer__column');
  footerColumns.forEach(function (el, index) {
    gsap.set(el, { autoAlpha: 0, y: 30 });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: function () {
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power2.out'
        });
      }
    });
  });

  // ── GENERIC REVEAL — any element with data-reveal ──
  const revealEls = document.querySelectorAll('[data-reveal]');
  revealEls.forEach(function (el) {
    const type = el.getAttribute('data-reveal') || 'fade';
    if (type === 'drift') {
      gsap.set(el, { autoAlpha: 0, x: 20 });
    } else if (type === 'rise') {
      gsap.set(el, { autoAlpha: 0, y: 24 });
    } else {
      gsap.set(el, { autoAlpha: 0 });
    }
    ScrollTrigger.create({
      trigger: el,
      start: 'top 82%',
      once: true,
      onEnter: function () {
        gsap.to(el, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        });
      }
    });
  });

  // ── FAQ ACCORDION (pricing page) ──
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-item__question');
    if (!question) return;
    question.addEventListener('click', function () {
      const wasOpen = item.classList.contains('open');
      faqItems.forEach(function (i) { i.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  });

})();
