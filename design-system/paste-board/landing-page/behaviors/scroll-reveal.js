/* paste-board — Scroll Reveal + Collage Animations (GSAP 3.12.5) */

(function () {
  'use strict';

  // Wait for GSAP + ScrollTrigger
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('[paste-board] GSAP or ScrollTrigger not loaded. Animations skipped.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Spring easing token
  const SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

  // ── Hero pinboard assembly ──
  // Cards are initially hidden and positioned off-screen via gsap.set
  const heroCards = document.querySelectorAll('.hero__card');
  if (heroCards.length) {
    heroCards.forEach((card, i) => {
      const finalRotation = parseFloat(card.dataset.rotate || 0);
      gsap.set(card, {
        y: -60,
        rotation: finalRotation - 6,
        autoAlpha: 0,
        scale: 0.9,
      });

      gsap.to(card, {
        y: 0,
        rotation: finalRotation,
        autoAlpha: 1,
        scale: 1,
        duration: 0.55,
        delay: 0.15 + i * 0.11,
        ease: SPRING,
      });
    });
  }

  // ── Hero text entrance ──
  const heroHeadline = document.querySelector('.hero__headline');
  const heroSub = document.querySelector('.hero__subline');
  const heroActions = document.querySelector('.hero__actions');
  const heroEyebrow = document.querySelector('.hero__eyebrow');

  [heroEyebrow, heroHeadline, heroSub, heroActions].forEach((el, i) => {
    if (!el) return;
    gsap.set(el, { y: 20, autoAlpha: 0 });
    gsap.to(el, {
      y: 0,
      autoAlpha: 1,
      duration: 0.5,
      delay: 0.1 + i * 0.1,
      ease: SPRING,
    });
  });

  // ── Feature cards — tilt-jiggle on scroll ──
  const featureCards = document.querySelectorAll('.feature-card');
  if (featureCards.length) {
    featureCards.forEach((card, i) => {
      const targetRotation = parseFloat(card.dataset.rotate || 0);

      gsap.set(card, {
        y: 30,
        rotation: targetRotation - 6,
        autoAlpha: 0,
        scale: 0.95,
      });

      ScrollTrigger.create({
        trigger: card,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(card, {
            y: 0,
            rotation: targetRotation,
            autoAlpha: 1,
            scale: 1,
            duration: 0.5,
            delay: i * 0.08,
            ease: SPRING,
          });
        },
      });
    });
  }

  // ── Sticky note steps — tape-reveal slide ──
  const stickyNotes = document.querySelectorAll('.step-sticky');
  if (stickyNotes.length) {
    stickyNotes.forEach((note, i) => {
      const targetRotation = parseFloat(note.dataset.rotate || 0);

      gsap.set(note, {
        x: -40,
        skewX: -8,
        autoAlpha: 0,
        rotation: targetRotation - 2,
      });

      ScrollTrigger.create({
        trigger: note,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(note, {
            x: 0,
            skewX: 0,
            autoAlpha: 1,
            rotation: targetRotation,
            duration: 0.45,
            delay: i * 0.12,
            ease: 'power2.out',
          });
        },
      });
    });
  }

  // ── Pull quote ──
  const quoteMark = document.querySelector('.pull-quote-mark');
  const quoteText = document.querySelector('.pull-quote__text');
  const quoteAnnotation = document.querySelector('.pull-quote__annotation');

  [quoteMark, quoteText, quoteAnnotation].forEach((el, i) => {
    if (!el) return;
    gsap.set(el, { y: 16, autoAlpha: 0 });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 86%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          delay: i * 0.12,
          ease: 'power2.out',
        });
      },
    });
  });

  // ── Polaroid testimonials — pin drop ──
  const polaroids = document.querySelectorAll('.polaroid-card');
  if (polaroids.length) {
    polaroids.forEach((card, i) => {
      const targetRotation = parseFloat(card.dataset.rotate || 0);

      gsap.set(card, {
        y: -50,
        rotation: targetRotation - 4,
        autoAlpha: 0,
      });

      ScrollTrigger.create({
        trigger: card,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(card, {
            y: 0,
            rotation: targetRotation,
            autoAlpha: 1,
            duration: 0.55,
            delay: i * 0.1,
            ease: SPRING,
          });
        },
      });
    });
  }

  // ── Collage cards (gallery / features) ──
  const collageTiles = document.querySelectorAll('.gallery-tile, .collage-item');
  if (collageTiles.length) {
    collageTiles.forEach((tile, i) => {
      gsap.set(tile, { y: 24, autoAlpha: 0 });
      ScrollTrigger.create({
        trigger: tile,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to(tile, {
            y: 0,
            autoAlpha: 1,
            duration: 0.45,
            delay: (i % 3) * 0.08,
            ease: SPRING,
          });
        },
      });
    });
  }

  // ── Section titles ──
  document.querySelectorAll('.section__title, .section__eyebrow, .section__subtitle').forEach((el, i) => {
    gsap.set(el, { y: 18, autoAlpha: 0 });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          y: 0,
          autoAlpha: 1,
          duration: 0.45,
          delay: i * 0.06,
          ease: 'power2.out',
        });
      },
    });
  });

  // ── Pricing cards ──
  const pricingCards = document.querySelectorAll('.pricing-card');
  if (pricingCards.length) {
    pricingCards.forEach((card, i) => {
      const targetRotation = parseFloat(card.dataset.rotate || 0);
      gsap.set(card, { y: 30, autoAlpha: 0, rotation: targetRotation - 3 });
      ScrollTrigger.create({
        trigger: card,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(card, {
            y: 0,
            autoAlpha: 1,
            rotation: targetRotation,
            duration: 0.5,
            delay: i * 0.1,
            ease: SPRING,
          });
        },
      });
    });
  }

  // ── FAQ accordion ──
  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('open');
    });
  });

}());
