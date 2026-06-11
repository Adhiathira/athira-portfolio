/* plane-cut — GSAP Scroll Reveal & Hero Animations */
/* All ScrollTrigger animations: once:true */
/* Initial states set via gsap.set() — NEVER opacity:0 in CSS */

(function () {
  'use strict';

  // Wait for GSAP to be available
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('plane-cut: GSAP or ScrollTrigger not loaded.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Respect reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Hero Layer Assembly ──────────────────────────────────────────
  // Layers rise from behind, background-to-foreground
  const heroLayers = document.querySelectorAll('.hero-layer');
  const heroContent = document.querySelector('.hero-content');
  const heroEyebrow = document.querySelector('.hero-eyebrow');
  const heroHeadline = document.querySelector('.hero-headline');
  const heroSubhead = document.querySelector('.hero-subhead');
  const heroActions = document.querySelector('.hero-actions');
  const heroTrust = document.querySelector('.hero-trust');

  if (!prefersReducedMotion) {
    // Set initial states on hero layers
    if (heroLayers.length) {
      gsap.set(heroLayers, { autoAlpha: 0, y: 30 });

      // Layer rise sequence: deepest first
      const layerOrder = [
        '.hero-layer--1',
        '.hero-layer--left-1',
        '.hero-layer--2',
        '.hero-layer--left-2',
        '.hero-layer--3',
        '.hero-layer--accent'
      ];

      const existingLayers = layerOrder
        .map(sel => document.querySelector(sel))
        .filter(Boolean);

      if (existingLayers.length) {
        gsap.to(existingLayers, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.1
        });
      }
    }

    // Set initial states on hero text elements
    const heroTextEls = [heroEyebrow, heroHeadline, heroSubhead, heroActions, heroTrust].filter(Boolean);
    if (heroTextEls.length) {
      gsap.set(heroTextEls, { autoAlpha: 0, y: 20 });
      gsap.to(heroTextEls, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.4
      });
    }
  }

  // ── Feature Cards: Layer Rise with Shadow Intensification ────────
  const featureCards = document.querySelectorAll('.feature-card');
  if (featureCards.length && !prefersReducedMotion) {
    gsap.set(featureCards, { autoAlpha: 0, y: 24 });

    ScrollTrigger.create({
      trigger: '.features',
      start: 'top 80%',
      once: true,
      onEnter: function () {
        gsap.to(featureCards, {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out'
        });
      }
    });
  }

  // ── Features Header ───────────────────────────────────────────────
  const featuresHeader = document.querySelector('.features-header');
  if (featuresHeader && !prefersReducedMotion) {
    gsap.set(featuresHeader, { autoAlpha: 0, y: 20 });
    ScrollTrigger.create({
      trigger: featuresHeader,
      start: 'top 85%',
      once: true,
      onEnter: function () {
        gsap.to(featuresHeader, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' });
      }
    });
  }

  // ── Feature Icons: Cut Reveal ─────────────────────────────────────
  const featureIcons = document.querySelectorAll('.feature-icon-shape');
  if (featureIcons.length && !prefersReducedMotion) {
    gsap.set(featureIcons, {
      clipPath: 'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)',
      autoAlpha: 1
    });

    ScrollTrigger.create({
      trigger: '.features',
      start: 'top 75%',
      once: true,
      onEnter: function () {
        gsap.to(featureIcons, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.inOut'
        });
      }
    });
  }

  // ── Step Items: Layer Rise ─────────────────────────────────────────
  const stepItems = document.querySelectorAll('.step-item');
  if (stepItems.length && !prefersReducedMotion) {
    gsap.set(stepItems, { autoAlpha: 0, y: 24 });
    ScrollTrigger.create({
      trigger: '.how-it-works',
      start: 'top 80%',
      once: true,
      onEnter: function () {
        gsap.to(stepItems, {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.12,
          ease: 'power2.out'
        });
      }
    });
  }

  // ── How-It-Works Header ───────────────────────────────────────────
  const howHeader = document.querySelector('.how-it-works-header');
  if (howHeader && !prefersReducedMotion) {
    gsap.set(howHeader, { autoAlpha: 0, y: 20 });
    ScrollTrigger.create({
      trigger: howHeader,
      start: 'top 85%',
      once: true,
      onEnter: function () {
        gsap.to(howHeader, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' });
      }
    });
  }

  // ── Step Icon Shapes: Cut Reveal ──────────────────────────────────
  const stepIconShapes = document.querySelectorAll('.step-icon-shape--cut, .step-icon-shape--output');
  if (stepIconShapes.length && !prefersReducedMotion) {
    gsap.set(stepIconShapes, {
      clipPath: 'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)',
      autoAlpha: 1
    });

    ScrollTrigger.create({
      trigger: '.how-it-works',
      start: 'top 70%',
      once: true,
      onEnter: function () {
        gsap.to(stepIconShapes, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 0.6,
          stagger: 0.2,
          ease: 'power2.inOut'
        });
      }
    });
  }

  // ── Testimonial Cards ─────────────────────────────────────────────
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  if (testimonialCards.length && !prefersReducedMotion) {
    gsap.set(testimonialCards, { autoAlpha: 0, y: 20 });
    ScrollTrigger.create({
      trigger: '.testimonials',
      start: 'top 80%',
      once: true,
      onEnter: function () {
        gsap.to(testimonialCards, {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out'
        });
      }
    });
  }

  // ── CTA Section ───────────────────────────────────────────────────
  const ctaContent = document.querySelector('.cta-content');
  const ctaDecorations = document.querySelectorAll('.cta-decoration');
  if (ctaContent && !prefersReducedMotion) {
    gsap.set(ctaContent, { autoAlpha: 0, y: 24 });
    if (ctaDecorations.length) {
      gsap.set(ctaDecorations, { autoAlpha: 0, scale: 0.8 });
    }

    ScrollTrigger.create({
      trigger: '.cta-section',
      start: 'top 80%',
      once: true,
      onEnter: function () {
        if (ctaDecorations.length) {
          gsap.to(ctaDecorations, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out'
          });
        }
        gsap.to(ctaContent, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          delay: 0.15,
          ease: 'power2.out'
        });
      }
    });
  }

  // ── Generic section-level reveals (about, work, contact, pricing) ─
  const revealSections = document.querySelectorAll(
    '.about-hero-content, .about-mission-inner, .team-grid, .values-grid, ' +
    '.work-hero-content, .projects-grid, ' +
    '.contact-hero-content, .contact-inner, ' +
    '.pricing-hero-content, .plans-grid, .faq-grid'
  );

  revealSections.forEach(function (el) {
    if (!prefersReducedMotion) {
      gsap.set(el, { autoAlpha: 0, y: 20 });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 82%',
        once: true,
        onEnter: function () {
          gsap.to(el, { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power2.out' });
        }
      });
    }
  });

  // ── Team / project cards stagger ─────────────────────────────────
  const cardGroups = [
    { selector: '.team-grid .team-card', parent: '.about-team' },
    { selector: '.projects-grid .project-card', parent: '.work-projects' },
    { selector: '.plans-grid .plan-card', parent: '.pricing-plans' },
    { selector: '.faq-grid .faq-item', parent: '.pricing-faq' },
    { selector: '.values-grid .value-item', parent: '.about-values' }
  ];

  cardGroups.forEach(function (group) {
    const cards = document.querySelectorAll(group.selector);
    const parentEl = document.querySelector(group.parent);
    if (cards.length && parentEl && !prefersReducedMotion) {
      gsap.set(cards, { autoAlpha: 0, y: 20 });
      ScrollTrigger.create({
        trigger: parentEl,
        start: 'top 80%',
        once: true,
        onEnter: function () {
          gsap.to(cards, {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out'
          });
        }
      });
    }
  });

})();
