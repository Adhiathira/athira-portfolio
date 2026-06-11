/* ============================================================
   scroll-reveal.js — lead-weight / VERDURE
   Animation mode: ANIMATED
   Motion: editorial, precise. 0.7s primary, cubic-bezier(0.25,0.1,0.25,1.0)
   All ScrollTrigger instances use once: true.
   NEVER opacity:0 in CSS. gsap.set() owns initial invisible states.
   ============================================================ */
(function () {
  'use strict';

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  const EASE_PRIMARY = 'cubic-bezier(0.25,0.1,0.25,1.0)';
  const EASE_OUT     = 'power2.out';
  const DUR          = 0.7;
  const DUR_SLOW     = 0.9;
  const DUR_CLIP     = 1.0;

  /* ─────────────────────────────────────────────────────────
     SECTION 1 — Hero
     Entire above-fold zone: 400ms opacity fade on load.
     GSAP set → animate immediately (no scroll needed).
  ───────────────────────────────────────────────────────── */
  const heroAboveFold = document.querySelector('#hero-above-fold');
  if (heroAboveFold) {
    gsap.set(heroAboveFold, { opacity: 0 });
    gsap.to(heroAboveFold, {
      opacity: 1,
      duration: 0.6,
      ease: 'power1.out',
      delay: 0.1
    });
  }

  /* ─────────────────────────────────────────────────────────
     SECTION 2 — Editorial Intro
     h2: word-slide (translateY 30→0, 0.7s)
     Body paragraphs: stagger 0.12s apart, 0.5s duration
     Pattern differs from all other sections.
  ───────────────────────────────────────────────────────── */
  const editorialHeading = document.querySelector('#editorial-heading');
  if (editorialHeading) {
    gsap.set(editorialHeading, { y: 30, opacity: 0 });
    gsap.to(editorialHeading, {
      y: 0,
      opacity: 1,
      duration: DUR,
      ease: EASE_OUT,
      scrollTrigger: {
        trigger: editorialHeading,
        start: 'top 82%',
        once: true
      }
    });
  }

  const editorialParas = document.querySelectorAll('#editorial-body-group .editorial-body-para');
  if (editorialParas.length) {
    gsap.set(editorialParas, { y: 18, opacity: 0 });
    ScrollTrigger.create({
      trigger: '#editorial-body-group',
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(editorialParas, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: EASE_OUT,
          stagger: 0.12
        });
      }
    });
  }

  /* Eyebrow left col: subtle x-slide from left */
  const editorialEyebrowGroup = document.querySelector('#editorial-eyebrow-group');
  if (editorialEyebrowGroup) {
    gsap.set(editorialEyebrowGroup, { x: -24, opacity: 0 });
    gsap.to(editorialEyebrowGroup, {
      x: 0,
      opacity: 1,
      duration: DUR,
      ease: EASE_OUT,
      scrollTrigger: {
        trigger: editorialEyebrowGroup,
        start: 'top 85%',
        once: true
      }
    });
  }

  /* ─────────────────────────────────────────────────────────
     SECTION 3 — Specimen Library (dark)
     h2: clip-path inset wipe — left-to-right print reveal.
     Distinct pattern from Editorial word-slide.
  ───────────────────────────────────────────────────────── */
  const specimenHeading = document.querySelector('#specimen-heading');
  if (specimenHeading) {
    gsap.set(specimenHeading, { clipPath: 'inset(0 100% 0 0)' });
    gsap.to(specimenHeading, {
      clipPath: 'inset(0 0% 0 0)',
      duration: DUR_CLIP,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: specimenHeading,
        start: 'top 80%',
        once: true
      }
    });
  }

  /* Specimen body + CTA: fade in after heading */
  const specimenBody = document.querySelector('#specimen-body');
  const specimenCta  = document.querySelector('#specimen-cta');
  [specimenBody, specimenCta].forEach((el, i) => {
    if (!el) return;
    gsap.set(el, { opacity: 0, y: 16 });
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.55,
      ease: EASE_OUT,
      delay: 0.35 + i * 0.14,
      scrollTrigger: {
        trigger: '#specimen-library',
        start: 'top 72%',
        once: true
      }
    });
  });

  /* Specimen video panel: scale-in from slightly smaller */
  const specimenVideoFrame = document.querySelector('#specimen-video-frame');
  if (specimenVideoFrame) {
    gsap.set(specimenVideoFrame, { opacity: 0, scale: 0.97 });
    gsap.to(specimenVideoFrame, {
      opacity: 1,
      scale: 1,
      duration: DUR_SLOW,
      ease: EASE_OUT,
      scrollTrigger: {
        trigger: specimenVideoFrame,
        start: 'top 78%',
        once: true
      }
    });
  }

  /* ─────────────────────────────────────────────────────────
     SECTION 4 — Process Steps
     Each row: x:-60 sweep in from left. Stagger 0.15s.
     Distinct from Sections 2 and 3.
  ───────────────────────────────────────────────────────── */
  const processSteps = document.querySelectorAll('.process-step');
  processSteps.forEach((step, i) => {
    gsap.set(step, { x: -60, opacity: 0 });
    gsap.to(step, {
      x: 0,
      opacity: 1,
      duration: DUR,
      ease: EASE_OUT,
      delay: i * 0.15,
      scrollTrigger: {
        trigger: step,
        start: 'top 82%',
        once: true
      }
    });
  });

  /* Process section header */
  const processHeader = document.querySelector('#process-header');
  if (processHeader) {
    gsap.set(processHeader, { opacity: 0 });
    gsap.to(processHeader, {
      opacity: 1,
      duration: 0.5,
      ease: EASE_OUT,
      scrollTrigger: {
        trigger: processHeader,
        start: 'top 85%',
        once: true
      }
    });
  }

  /* ─────────────────────────────────────────────────────────
     SECTION 5 — Pull Quote
     Scale-rise: scale(0.97) y:20 + opacity → 1.0 y:0
     Distinct from all prior patterns.
  ───────────────────────────────────────────────────────── */
  const pullQuoteBlock = document.querySelector('#pull-quote-block');
  if (pullQuoteBlock) {
    gsap.set(pullQuoteBlock, { scale: 0.97, y: 20, opacity: 0 });
    gsap.to(pullQuoteBlock, {
      scale: 1,
      y: 0,
      opacity: 1,
      duration: DUR_SLOW,
      ease: EASE_OUT,
      scrollTrigger: {
        trigger: pullQuoteBlock,
        start: 'top 78%',
        once: true
      }
    });
  }

  /* Client list: stagger items by column */
  const clientItems = document.querySelectorAll('.client-item');
  if (clientItems.length) {
    gsap.set(clientItems, { opacity: 0, y: 14 });
    ScrollTrigger.create({
      trigger: '#client-list-grid',
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(clientItems, {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: EASE_OUT,
          stagger: 0.06
        });
      }
    });
  }

  /* ─────────────────────────────────────────────────────────
     SECTION 6 — Letterpress
     Divergent reveal: video x:+40 from right, text x:-40 from left.
     Both animate simultaneously on trigger.
  ───────────────────────────────────────────────────────── */
  const letterpressVideo = document.querySelector('#letterpress-video-col');
  const letterpressText  = document.querySelector('#letterpress-text-col');

  if (letterpressVideo) {
    gsap.set(letterpressVideo, { x: 40, opacity: 0 });
  }
  if (letterpressText) {
    gsap.set(letterpressText, { x: -40, opacity: 0 });
  }

  if (letterpressVideo || letterpressText) {
    ScrollTrigger.create({
      trigger: '#letterpress-inner',
      start: 'top 78%',
      once: true,
      onEnter: () => {
        if (letterpressVideo) {
          gsap.to(letterpressVideo, {
            x: 0,
            opacity: 1,
            duration: DUR,
            ease: EASE_OUT
          });
        }
        if (letterpressText) {
          gsap.to(letterpressText, {
            x: 0,
            opacity: 1,
            duration: DUR,
            ease: EASE_OUT
          });
        }
      }
    });
  }

  /* ─────────────────────────────────────────────────────────
     SECTION 7 — Footer
     No entrance animations per spec.
  ───────────────────────────────────────────────────────── */

  /* ─────────────────────────────────────────────────────────
     Nav scroll behavior — adds .nav--scrolled at 40px
  ───────────────────────────────────────────────────────── */
  const siteNav = document.querySelector('#site-nav');
  if (siteNav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        siteNav.classList.add('nav--scrolled');
      } else {
        siteNav.classList.remove('nav--scrolled');
      }
    }, { passive: true });
  }

  /* ─────────────────────────────────────────────────────────
     Mobile nav toggle
  ───────────────────────────────────────────────────────── */
  const mobileToggle = document.querySelector('.nav-mobile-toggle');
  const mobileMenu   = document.querySelector('#mobile-menu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('is-open');
      if (isOpen) {
        mobileMenu.classList.remove('is-open');
        siteNav.classList.remove('nav-mobile-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      } else {
        mobileMenu.classList.add('is-open');
        siteNav.classList.add('nav-mobile-open');
        mobileToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }
    });

    /* Close mobile menu on link click */
    mobileMenu.querySelectorAll('.nav-mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        siteNav.classList.remove('nav-mobile-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

})();
