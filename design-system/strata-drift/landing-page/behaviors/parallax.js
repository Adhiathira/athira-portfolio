/* strata-drift — parallax scroll behavior */
/* GSAP + ScrollTrigger: crafted depth parallax system */
/* Three distinct scroll speeds physicalize z-depth */

(function () {
  'use strict';

  function initParallax() {
    // Guard: require GSAP + ScrollTrigger
    if (typeof gsap === 'undefined') {
      console.warn('strata-drift: GSAP not loaded — parallax disabled');
      return;
    }
    if (typeof ScrollTrigger === 'undefined') {
      console.warn('strata-drift: ScrollTrigger not loaded — parallax disabled');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const hero = document.querySelector('.hero');
    if (!hero) return;

    // -------- PARALLAX LAYERS --------
    // Background elements — slowest (creates ground plane)
    const bgElements = document.querySelectorAll('.parallax-bg');
    if (bgElements.length > 0) {
      gsap.to(bgElements, {
        y: '-20%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5
        }
      });
    }

    // Mid-ground elements — medium speed
    const midElements = document.querySelectorAll('.parallax-mid');
    if (midElements.length > 0) {
      gsap.to(midElements, {
        y: '-10%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
    }

    // Foreground elements — nearly locked to viewer
    const nearElements = document.querySelectorAll('.parallax-near');
    if (nearElements.length > 0) {
      gsap.to(nearElements, {
        y: '-3%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5
        }
      });
    }

    // -------- HERO ENTRY ANIMATION --------
    // Layers materialize front-to-back on load
    const heroContent = document.querySelector('.hero-content');
    const heroEyebrow = document.querySelector('.hero-eyebrow');
    const heroHeadline = document.querySelector('.hero-headline');
    const heroBody = document.querySelector('.hero-body');
    const heroActions = document.querySelector('.hero-actions');
    const heroBgElements = document.querySelectorAll('.parallax-bg');
    const heroMidElements = document.querySelectorAll('.parallax-mid');

    // Set initial invisible states
    if (heroBgElements.length > 0) gsap.set(heroBgElements, { autoAlpha: 0, y: 30 });
    if (heroMidElements.length > 0) gsap.set(heroMidElements, { autoAlpha: 0, y: 20 });
    if (heroEyebrow) gsap.set(heroEyebrow, { autoAlpha: 0, y: 16 });
    if (heroHeadline) gsap.set(heroHeadline, { autoAlpha: 0, y: 24 });
    if (heroBody) gsap.set(heroBody, { autoAlpha: 0, y: 16 });
    if (heroActions) gsap.set(heroActions, { autoAlpha: 0, y: 12 });

    const tl = gsap.timeline({ delay: 0.1 });

    if (heroBgElements.length > 0) {
      tl.to(heroBgElements, { autoAlpha: 1, y: 0, duration: 1.5, ease: 'power2.out' }, 0);
    }
    if (heroMidElements.length > 0) {
      tl.to(heroMidElements, { autoAlpha: 1, y: 0, duration: 1.2, ease: 'power2.out' }, 0.3);
    }
    if (heroEyebrow) {
      tl.to(heroEyebrow, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0.6);
    }
    if (heroHeadline) {
      tl.to(heroHeadline, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.75);
    }
    if (heroBody) {
      tl.to(heroBody, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0.9);
    }
    if (heroActions) {
      tl.to(heroActions, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 1.05);
    }

    // -------- SCROLL REVEAL ANIMATIONS --------
    // Feature cards — staggered upward reveal
    const featureCards = document.querySelectorAll('.features-grid .card');
    if (featureCards.length > 0) {
      gsap.set(featureCards, { autoAlpha: 0, y: 40 });
      gsap.to(featureCards, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.features-grid',
          start: 'top 80%',
          once: true
        }
      });
    }

    // Stats section — count reveal
    const statItems = document.querySelectorAll('.stat-item');
    if (statItems.length > 0) {
      gsap.set(statItems, { autoAlpha: 0, y: 30 });
      gsap.to(statItems, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.stats-section',
          start: 'top 75%',
          once: true
        }
      });
    }

    // Steps — sequential reveal
    const stepItems = document.querySelectorAll('.step-item');
    if (stepItems.length > 0) {
      gsap.set(stepItems, { autoAlpha: 0, y: 30 });
      gsap.to(stepItems, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.steps-grid',
          start: 'top 78%',
          once: true
        }
      });
    }

    // Testimonials
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    if (testimonialCards.length > 0) {
      gsap.set(testimonialCards, { autoAlpha: 0, y: 24 });
      gsap.to(testimonialCards, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: '.testimonials-grid',
          start: 'top 80%',
          once: true
        }
      });
    }

    // Section headers — fade up
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(function (header) {
      gsap.set(header, { autoAlpha: 0, y: 24 });
      gsap.to(header, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 82%',
          once: true
        }
      });
    });

    // CTA band
    const ctaBand = document.querySelector('.cta-band-inner');
    if (ctaBand) {
      gsap.set(ctaBand, { autoAlpha: 0, y: 24 });
      gsap.to(ctaBand, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.cta-band',
          start: 'top 78%',
          once: true
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initParallax);
  } else {
    initParallax();
  }
})();
