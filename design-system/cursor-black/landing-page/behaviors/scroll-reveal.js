/* Cursor Black — GSAP ScrollTrigger Animations */
/* Mechanical, step-based entrances. No smooth organic easing. */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // ============================================================
    // Features section — 3 cards, y:20 stagger
    // ============================================================
    const featureCards = gsap.utils.toArray('.feature-card');
    if (featureCards.length) {
      gsap.set(featureCards, { autoAlpha: 0, y: 20 });

      ScrollTrigger.create({
        trigger: '.features-grid',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(featureCards, {
            autoAlpha: 1,
            y: 0,
            duration: 0.15,
            stagger: 0.1,
            ease: 'steps(4, end)'
          });
        }
      });
    }

    // ============================================================
    // How it works — steps slide from x:-16
    // ============================================================
    const stepItems = gsap.utils.toArray('.step-item');
    if (stepItems.length) {
      gsap.set(stepItems, { autoAlpha: 0, x: -16 });

      ScrollTrigger.create({
        trigger: '.steps-list',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(stepItems, {
            autoAlpha: 1,
            x: 0,
            duration: 0.12,
            stagger: 0.08,
            ease: 'steps(2, end)'
          });
        }
      });
    }

    // ============================================================
    // Testimonials — terminal output reveal
    // ============================================================
    const testimonialBlocks = gsap.utils.toArray('.testimonial-block');
    if (testimonialBlocks.length) {
      gsap.set(testimonialBlocks, { autoAlpha: 0 });

      ScrollTrigger.create({
        trigger: '.testimonials-grid',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(testimonialBlocks, {
            autoAlpha: 1,
            duration: 0.1,
            stagger: 0.2,
            ease: 'none'
          });
        }
      });
    }

    // ============================================================
    // Pricing cards — clip-path data-reveal stagger
    // ============================================================
    const pricingCards = gsap.utils.toArray('.pricing-card');
    if (pricingCards.length) {
      gsap.set(pricingCards, { autoAlpha: 0, clipPath: 'inset(0 100% 0 0)' });

      ScrollTrigger.create({
        trigger: '.pricing-grid',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(pricingCards, {
            autoAlpha: 1,
            clipPath: 'inset(0 0% 0 0)',
            duration: 0.15,
            stagger: 0.12,
            ease: 'steps(4, end)'
          });
        }
      });
    }

    // ============================================================
    // Section titles — glitch-on-enter
    // ============================================================
    const sectionTitles = gsap.utils.toArray('.section-title');
    sectionTitles.forEach(title => {
      gsap.set(title, { autoAlpha: 0 });

      ScrollTrigger.create({
        trigger: title,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(title, {
            autoAlpha: 1,
            duration: 0.08,
            ease: 'none',
            onComplete: () => {
              if (window.CursorBlack && window.CursorBlack.glitch) {
                window.CursorBlack.glitch(title);
              }
            }
          });
        }
      });
    });

    // ============================================================
    // Generic scroll-reveal for .reveal elements
    // ============================================================
    const revealEls = gsap.utils.toArray('.reveal');
    if (revealEls.length) {
      gsap.set(revealEls, { autoAlpha: 0 });

      revealEls.forEach(el => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(el, { autoAlpha: 1, duration: 0.1, ease: 'none' });
          }
        });
      });
    }

    // ============================================================
    // Team cards
    // ============================================================
    const teamCards = gsap.utils.toArray('.team-card');
    if (teamCards.length) {
      gsap.set(teamCards, { autoAlpha: 0, y: 20 });

      ScrollTrigger.create({
        trigger: '.team-grid',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(teamCards, {
            autoAlpha: 1,
            y: 0,
            duration: 0.15,
            stagger: 0.08,
            ease: 'steps(4, end)'
          });
        }
      });
    }

    // ============================================================
    // Footer reveal
    // ============================================================
    const footer = document.querySelector('.site-footer');
    if (footer) {
      const footerChildren = footer.querySelectorAll('.footer-col, .footer-brand');
      if (footerChildren.length) {
        gsap.set(footerChildren, { autoAlpha: 0 });

        ScrollTrigger.create({
          trigger: footer,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.to(footerChildren, {
              autoAlpha: 1,
              duration: 0.1,
              stagger: 0.05,
              ease: 'none'
            });
          }
        });
      }
    }
  });
})();
