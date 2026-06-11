/* scroll-reveal.js — Quiet Plinth GSAP ScrollTrigger reveal system */
/* Animation mode: ANIMATED | Motion: languid (0.9s primary, 0.45s interactions) */
(function () {
  'use strict';

  // Guard: only runs when GSAP + ScrollTrigger are available
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // ── Hero fade-up stagger (runs on load, not on scroll) ──
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    const heroEls = heroContent.querySelectorAll('.hero-label, .hero-heading, .hero-body, .hero-actions');
    gsap.set(heroEls, { opacity: 0, y: 20 });
    gsap.to(heroEls, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power2.out',
      stagger: 0.18,
      delay: 0.27
    });
  }

  // Hero image panel — fade in from opacity 0 at load
  const heroImage = document.querySelector('.hero-image');
  if (heroImage) {
    gsap.set(heroImage, { opacity: 0 });
    gsap.to(heroImage, { opacity: 1, duration: 0.9, ease: 'power1.out', delay: 0.1 });
  }

  // ── Generic scroll reveal: [data-reveal] ──
  // Elements use data-reveal="fade-up" | "fade-left" | "scale-rise" | "clip"
  document.querySelectorAll('[data-reveal]').forEach(el => {
    const type = el.getAttribute('data-reveal') || 'fade-up';
    const delay = parseFloat(el.getAttribute('data-reveal-delay') || '0');

    let fromVars = { opacity: 0, y: 30 };
    let toVars = { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', delay };

    if (type === 'fade-left') {
      fromVars = { opacity: 0, x: -50 };
      toVars = { opacity: 1, x: 0, duration: 0.9, ease: 'power2.out', delay };
    } else if (type === 'fade-right') {
      fromVars = { opacity: 0, x: 50 };
      toVars = { opacity: 1, x: 0, duration: 0.9, ease: 'power2.out', delay };
    } else if (type === 'scale-rise') {
      fromVars = { opacity: 0, scale: 0.94, y: 20 };
      toVars = { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: 'power2.out', delay };
    } else if (type === 'clip') {
      gsap.set(el, { clipPath: 'inset(0 100% 0 0)' });
      gsap.to(el, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.08,
        ease: 'power3.inOut',
        delay,
        scrollTrigger: { trigger: el, start: 'top 82%', once: true }
      });
      return;
    }

    gsap.set(el, fromVars);
    gsap.to(el, {
      ...toVars,
      scrollTrigger: { trigger: el, start: 'top 82%', once: true }
    });
  });

  // ── Staggered card groups: [data-stagger-group] ──
  document.querySelectorAll('[data-stagger-group]').forEach(group => {
    const cards = group.querySelectorAll('[data-stagger-item]');
    const type = group.getAttribute('data-stagger-group') || 'fade-up';
    let fromVars = { opacity: 0, y: 40 };
    let toVars = { opacity: 1, y: 0 };

    if (type === 'scale') {
      fromVars = { opacity: 0, scale: 0.94 };
      toVars = { opacity: 1, scale: 1 };
    } else if (type === 'rotate') {
      fromVars = { opacity: 0, rotation: 3, y: 40 };
      toVars = { opacity: 1, rotation: 0, y: 0 };
    } else if (type === 'sweep-left') {
      fromVars = { opacity: 0, x: -70 };
      toVars = { opacity: 1, x: 0 };
    }

    gsap.set(cards, fromVars);
    ScrollTrigger.create({
      trigger: group,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(cards, {
          ...toVars,
          duration: 0.9,
          ease: 'power2.out',
          stagger: 0.14
        });
      }
    });
  });

  // ── Section image reveals ──
  document.querySelectorAll('.section-image').forEach(img => {
    gsap.set(img, { opacity: 0 });
    gsap.to(img, {
      opacity: 1,
      duration: 0.9,
      ease: 'power1.out',
      scrollTrigger: { trigger: img, start: 'top 85%', once: true }
    });
  });

  // ── Footer copyright strip horizontal reveal ──
  const copyrightStrip = document.querySelector('.footer-copyright');
  if (copyrightStrip) {
    gsap.set(copyrightStrip, { clipPath: 'inset(0 100% 0 0)', opacity: 1 });
    gsap.to(copyrightStrip, {
      clipPath: 'inset(0 0% 0 0)',
      duration: 1.08,
      ease: 'power3.inOut',
      scrollTrigger: { trigger: copyrightStrip, start: 'top 95%', once: true }
    });
  }

})();
