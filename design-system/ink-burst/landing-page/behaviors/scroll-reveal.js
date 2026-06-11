/**
 * ink-burst — Scroll Reveal & Animation Behavior
 * GSAP 3.12.5 + ScrollTrigger
 *
 * Animation patterns:
 * - zapIn: hero headline, badges, speech bubbles
 * - panelSlam: feature cards entering viewport (from left)
 * - staggerReveal: grid of cards entering viewport
 * - panelFlip: stat panels reveal
 * - slideInBold: section headers
 * - Counter: stat numbers count up
 *
 * All ScrollTrigger: once: true
 * NEVER set opacity: 0 in CSS — use gsap.set()
 */

(function () {
  'use strict';

  const SPRING = 'back.out(2.5)';
  const SPRING_EASING = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

  function initAnimations() {
    if (typeof gsap === 'undefined') {
      console.warn('ink-burst: GSAP not loaded');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // =========================================================
    // HERO ANIMATIONS (index page)
    // =========================================================
    const heroBadge = document.querySelector('.hero-badge');
    const heroHeadline = document.querySelector('.hero-headline');
    const heroSub = document.querySelector('.hero-sub');
    const heroActions = document.querySelector('.hero-actions');
    const speechBubble = document.querySelector('.speech-bubble');
    const heroPanel = document.querySelector('.hero-panel');
    const zapBadge = document.querySelector('.zap-badge');

    if (heroHeadline) {
      // Set initial states — NEVER in CSS
      const heroElements = [heroBadge, heroHeadline, heroSub, heroActions, speechBubble, heroPanel, zapBadge].filter(Boolean);
      gsap.set(heroElements, { opacity: 0 });

      // ZAP sequence
      const tl = gsap.timeline({ delay: 0.1 });

      if (heroBadge) {
        tl.to(heroBadge, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.25,
          ease: SPRING,
          clearProps: 'transform'
        }, 0);
        gsap.set(heroBadge, { scale: 0, rotation: 8 });
      }

      tl.to(heroHeadline, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.35,
        ease: 'back.out(2)',
        clearProps: 'transform'
      }, 0.1);
      gsap.set(heroHeadline, { scale: 0, rotation: 5 });

      if (heroSub) {
        gsap.set(heroSub, { x: -40 });
        tl.to(heroSub, {
          opacity: 1,
          x: 0,
          duration: 0.4,
          ease: SPRING_EASING
        }, 0.25);
      }

      if (heroActions) {
        gsap.set(heroActions, { y: 24 });
        tl.to(heroActions, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: SPRING_EASING
        }, 0.35);
      }

      if (heroPanel) {
        gsap.set(heroPanel, { x: 60, rotation: 3 });
        tl.to(heroPanel, {
          opacity: 1,
          x: 0,
          rotation: 0,
          duration: 0.5,
          ease: 'back.out(1.8)',
          clearProps: 'transform'
        }, 0.2);
      }

      if (zapBadge) {
        gsap.set(zapBadge, { scale: 0, rotation: 20 });
        tl.to(zapBadge, {
          opacity: 1,
          scale: 1,
          rotation: 8,
          duration: 0.3,
          ease: 'back.out(3)'
        }, 0.55);
      }

      if (speechBubble) {
        gsap.set(speechBubble, { scale: 0, y: 12 });
        tl.to(speechBubble, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: 'back.out(2.5)'
        }, 0.45);
      }
    }

    // =========================================================
    // SECTION HEADERS
    // =========================================================
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(function (el) {
      gsap.set(el, { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: function () {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: SPRING_EASING
          });
        }
      });
    });

    // Section eyebrows
    const eyebrows = document.querySelectorAll('.eyebrow');
    eyebrows.forEach(function (el) {
      gsap.set(el, { opacity: 0, x: -20 });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: function () {
          gsap.to(el, {
            opacity: 1,
            x: 0,
            duration: 0.3,
            ease: SPRING_EASING
          });
        }
      });
    });

    // =========================================================
    // FEATURE CARDS — Panel Slam stagger
    // =========================================================
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length) {
      gsap.set(featureCards, { opacity: 0, x: -80, scale: 0.9 });
      ScrollTrigger.create({
        trigger: featureCards[0],
        start: 'top 80%',
        once: true,
        onEnter: function () {
          gsap.to(featureCards, {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: 'back.out(2)',
            clearProps: 'transform'
          });
        }
      });
    }

    // =========================================================
    // STAT PANELS — Panel Flip
    // =========================================================
    const statPanels = document.querySelectorAll('.stat-panel');
    if (statPanels.length) {
      gsap.set(statPanels, { opacity: 0, rotationY: 90, transformPerspective: 800 });
      ScrollTrigger.create({
        trigger: statPanels[0],
        start: 'top 80%',
        once: true,
        onEnter: function () {
          gsap.to(statPanels, {
            opacity: 1,
            rotationY: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: 'back.out(1.5)',
            clearProps: 'transform'
          });
        }
      });
    }

    // =========================================================
    // STAT NUMBERS — Counter
    // =========================================================
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    statNumbers.forEach(function (el) {
      const target = parseFloat(el.getAttribute('data-count'));
      const suffix = el.getAttribute('data-suffix') || '';
      const prefix = el.getAttribute('data-prefix') || '';
      const obj = { val: 0 };

      gsap.set(el, { opacity: 0 });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        once: true,
        onEnter: function () {
          gsap.to(el, { opacity: 1, duration: 0.3 });
          gsap.to(obj, {
            val: target,
            duration: 1.2,
            ease: 'power2.out',
            onUpdate: function () {
              const display = target % 1 === 0
                ? Math.round(obj.val)
                : obj.val.toFixed(1);
              el.textContent = prefix + display + suffix;
            }
          });
        }
      });
    });

    // =========================================================
    // HOW IT WORKS PANELS
    // =========================================================
    const howPanels = document.querySelectorAll('.how-panel');
    if (howPanels.length) {
      howPanels.forEach(function (panel, i) {
        const rotation = i % 2 === 0 ? -2 : 2;
        gsap.set(panel, { opacity: 0, x: -60, rotation: rotation });
        ScrollTrigger.create({
          trigger: panel,
          start: 'top 82%',
          once: true,
          onEnter: function () {
            gsap.to(panel, {
              opacity: 1,
              x: 0,
              rotation: 0,
              duration: 0.4,
              delay: i * 0.1,
              ease: 'back.out(2)',
              clearProps: 'transform'
            });
          }
        });
      });
    }

    // =========================================================
    // TESTIMONIAL BUBBLES — ZAP in
    // =========================================================
    const testimonialBubbles = document.querySelectorAll('.testimonial-bubble');
    if (testimonialBubbles.length) {
      gsap.set(testimonialBubbles, { opacity: 0, scale: 0.85, y: 20 });
      ScrollTrigger.create({
        trigger: testimonialBubbles[0],
        start: 'top 82%',
        once: true,
        onEnter: function () {
          gsap.to(testimonialBubbles, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.1,
            ease: 'back.out(2.5)',
            clearProps: 'transform'
          });
        }
      });
    }

    // =========================================================
    // PRICING CARDS
    // =========================================================
    const pricingCards = document.querySelectorAll('.pricing-card');
    if (pricingCards.length) {
      gsap.set(pricingCards, { opacity: 0, y: 40, scale: 0.92 });
      ScrollTrigger.create({
        trigger: pricingCards[0],
        start: 'top 80%',
        once: true,
        onEnter: function () {
          gsap.to(pricingCards, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: 'back.out(2)',
            clearProps: 'transform'
          });
        }
      });
    }

    // =========================================================
    // TEAM CARDS
    // =========================================================
    const teamCards = document.querySelectorAll('.team-card');
    if (teamCards.length) {
      gsap.set(teamCards, { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: teamCards[0],
        start: 'top 82%',
        once: true,
        onEnter: function () {
          gsap.to(teamCards, {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.07,
            ease: SPRING_EASING
          });
        }
      });
    }

    // =========================================================
    // FEATURE DETAIL sections (features page)
    // =========================================================
    const featureDetails = document.querySelectorAll('.feature-detail-visual');
    featureDetails.forEach(function (el, i) {
      const dir = i % 2 === 0 ? -50 : 50;
      gsap.set(el, { opacity: 0, x: dir });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        once: true,
        onEnter: function () {
          gsap.to(el, {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: 'back.out(1.5)',
            clearProps: 'transform'
          });
        }
      });
    });

    const featureContents = document.querySelectorAll('.feature-detail-content');
    featureContents.forEach(function (el, i) {
      const dir = i % 2 === 0 ? 50 : -50;
      gsap.set(el, { opacity: 0, x: dir });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        once: true,
        onEnter: function () {
          gsap.to(el, {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: SPRING_EASING
          });
        }
      });
    });

    // =========================================================
    // GENERIC REVEAL (catch-all for value items, FAQ, etc.)
    // =========================================================
    const genericReveal = document.querySelectorAll('.value-item, .faq-item, .contact-info-item, .how-arrow');
    genericReveal.forEach(function (el, i) {
      gsap.set(el, { opacity: 0, y: 20 });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: function () {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            delay: (i % 4) * 0.05,
            ease: SPRING_EASING
          });
        }
      });
    });
  }

  // Wait for GSAP to load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }
})();
