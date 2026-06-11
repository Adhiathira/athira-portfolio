/**
 * prose-weight — Scroll Reveal Animations (GSAP + ScrollTrigger)
 * Reading-paced animations. All ScrollTrigger: once:true.
 * NEVER set opacity:0 in CSS — use gsap.set() here.
 *
 * Animations:
 * - Chapter number: fade up y:12, 400ms
 * - Heading: letter-spacing from 0.5em → natural, 800ms
 * - Paragraph / body text: fade up y:16, 500ms, stagger 0.1s
 * - Pull quote: scale 0.97→1 + fade, 600ms
 * - Annotation: slide in from x:16, 400ms
 * - Feature cards: fade up y:16, stagger 0.12s
 * - Testimonials: fade up y:12, stagger 0.15s
 * - Stat numbers: count up via textContent, 1200ms ease-out
 * - Footer links: fade up, stagger 0.1s
 */

(function () {
  'use strict';

  function initScrollReveal() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // GSAP must be loaded
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('[prose-weight] GSAP or ScrollTrigger not loaded.');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // ===== CHAPTER NUMBERS =====
    const chapterNumbers = document.querySelectorAll('.chapter-number, .hero__chapter-number, .section__chapter-number, .how-step__number, .feature-card__chapter-num');
    chapterNumbers.forEach(function (el) {
      gsap.set(el, { opacity: 0, y: 12 });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: function () {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out'
          });
        }
      });
    });

    // ===== HEADINGS — letter-spacing-in =====
    const headings = document.querySelectorAll('.hero__headline, .section__title, .how-step__title, .feature-card__title');
    headings.forEach(function (el) {
      // Capture computed letter-spacing as target
      const naturalLS = getComputedStyle(el).letterSpacing;
      gsap.set(el, { opacity: 0, letterSpacing: '0.4em' });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: function () {
          gsap.to(el, {
            opacity: 1,
            letterSpacing: naturalLS,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.1
          });
        }
      });
    });

    // ===== BODY PARAGRAPHS — staggered fade up =====
    const bodyGroups = document.querySelectorAll(
      '.hero__body, .how-step__body, .feature-card__body, .section__body'
    );
    bodyGroups.forEach(function (el) {
      gsap.set(el, { opacity: 0, y: 16 });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        once: true,
        onEnter: function () {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            delay: 0.2
          });
        }
      });
    });

    // ===== PULL QUOTES — scale + fade =====
    const pullQuotes = document.querySelectorAll('.hero__pull-quote, .how-pull-quote, .pull-quote-block');
    pullQuotes.forEach(function (el) {
      gsap.set(el, { opacity: 0, scale: 0.97 });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: function () {
          gsap.to(el, {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out'
          });
        }
      });
    });

    // ===== ANNOTATIONS — slide in from right =====
    const annotations = document.querySelectorAll('.annotation-block, .annotation');
    annotations.forEach(function (el) {
      gsap.set(el, { opacity: 0, x: 16 });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        once: true,
        onEnter: function () {
          gsap.to(el, {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: 'power2.out'
          });
        }
      });
    });

    // ===== FEATURE CARDS — staggered fade up =====
    const featureGrids = document.querySelectorAll('.features-grid');
    featureGrids.forEach(function (grid) {
      const cards = grid.querySelectorAll('.feature-card');
      gsap.set(cards, { opacity: 0, y: 16 });
      ScrollTrigger.create({
        trigger: grid,
        start: 'top 85%',
        once: true,
        onEnter: function () {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.12
          });
        }
      });
    });

    // ===== HOW-IT-WORKS STEPS =====
    const howSteps = document.querySelectorAll('.how-step');
    howSteps.forEach(function (step, i) {
      gsap.set(step, { opacity: 0, y: 16 });
      ScrollTrigger.create({
        trigger: step,
        start: 'top 87%',
        once: true,
        onEnter: function () {
          gsap.to(step, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out'
          });
        }
      });
    });

    // ===== TESTIMONIALS =====
    const testimonialGrids = document.querySelectorAll('.testimonials-grid');
    testimonialGrids.forEach(function (grid) {
      const cards = grid.querySelectorAll('.testimonial-card');

      // Quote marks appear first
      const marks = grid.querySelectorAll('.testimonial-card__mark');
      gsap.set(marks, { opacity: 0, y: 8 });

      gsap.set(cards, { opacity: 0, y: 12 });
      ScrollTrigger.create({
        trigger: grid,
        start: 'top 85%',
        once: true,
        onEnter: function () {
          gsap.to(marks, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
            stagger: 0.15
          });
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.15,
            delay: 0.05
          });
        }
      });
    });

    // ===== STATS — count up =====
    const statNumbers = document.querySelectorAll('.stat-item__number[data-count]');
    statNumbers.forEach(function (el) {
      const target = parseFloat(el.getAttribute('data-count'));
      const suffix = el.getAttribute('data-suffix') || '';
      const isFloat = String(target).includes('.');
      gsap.set(el, { opacity: 0 });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: function () {
          gsap.to({ val: 0 }, {
            val: target,
            duration: 1.2,
            ease: 'power2.out',
            onUpdate: function () {
              const v = this.targets()[0].val;
              el.textContent = (isFloat ? v.toFixed(1) : Math.round(v)) + suffix;
            },
            onComplete: function () {
              el.textContent = target + suffix;
            }
          });
          gsap.to(el, { opacity: 1, duration: 0.4, ease: 'power2.out' });
        }
      });
    });

    // Stat labels
    const statLabels = document.querySelectorAll('.stat-item__label');
    statLabels.forEach(function (el) {
      gsap.set(el, { opacity: 0, y: 8 });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: function () {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
            delay: 0.6
          });
        }
      });
    });

    // ===== FOOTER =====
    const footerBrand = document.querySelector('.site-footer__brand');
    const footerCols = document.querySelectorAll('.site-footer__col');
    const footerBottom = document.querySelector('.site-footer__bottom');

    if (footerBrand) {
      const footerEls = [footerBrand, ...footerCols, footerBottom].filter(Boolean);
      gsap.set(footerEls, { opacity: 0, y: 12 });
      ScrollTrigger.create({
        trigger: '.site-footer',
        start: 'top 90%',
        once: true,
        onEnter: function () {
          gsap.to(footerEls, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
            stagger: 0.1
          });
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollReveal);
  } else {
    initScrollReveal();
  }
})();
