/**
 * main.js — folio-verge
 * GSAP + ScrollTrigger animations
 * Animations used: character scramble, clip-path bloom, scattered assembly,
 * counter tween, elastic magnetic hover, SVG path draw, parallax
 */

// ─── Lenis Smooth Scroll ──────────────────────────────────────────────────
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Connect GSAP ScrollTrigger to Lenis
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.lagSmoothing(0);

// ─── Nav Scroll Behavior ─────────────────────────────────────────────────
const nav = document.querySelector('.site-nav');
if (nav) {
  ScrollTrigger.create({
    start: 'top -60px',
    end: 'max',
    onUpdate: (self) => {
      if (self.progress > 0) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    },
  });
}

// ─── Hero Entrance ───────────────────────────────────────────────────────
const heroImage = document.querySelector('.hero-bg');
const heroEyebrow = document.querySelector('.hero-eyebrow');
const heroTitle = document.querySelector('.hero-title');
const heroSubtitle = document.querySelector('.hero-subtitle');
const heroCta = document.querySelector('.hero-cta-group');

if (heroImage || heroTitle) {
  const herTl = gsap.timeline({ delay: 0.3 });

  // Ken Burns push (z-axis scale + drift)
  if (heroImage) {
    herTl.fromTo(
      heroImage,
      { scale: 1.0, x: 0 },
      { scale: 1.04, x: -12, duration: 12, ease: 'none' },
      0
    );
  }

  if (heroEyebrow) {
    herTl.fromTo(
      heroEyebrow,
      { opacity: 0 },
      { opacity: 1, duration: 0.975, ease: 'power2.out' },
      0.2
    );
  }

  if (heroTitle) {
    herTl.fromTo(
      heroTitle,
      { opacity: 0 },
      { opacity: 1, duration: 0.975, ease: 'power2.out' },
      0.5
    );
  }

  if (heroSubtitle) {
    herTl.fromTo(
      heroSubtitle,
      { opacity: 0 },
      { opacity: 1, duration: 0.975, ease: 'power2.out' },
      0.85
    );
  }

  if (heroCta) {
    herTl.fromTo(
      heroCta,
      { opacity: 0 },
      { opacity: 1, duration: 0.975, ease: 'power2.out' },
      1.15
    );
  }
}

// ─── Character Scramble on Hero Title ────────────────────────────────────
// Uses Splitting.js if loaded
if (window.Splitting && heroTitle) {
  const result = Splitting({ target: heroTitle, by: 'chars' });
  const chars = result[0]?.chars || [];

  if (chars.length > 0) {
    // Override hero title opacity (Splitting sets each char independently)
    heroTitle.style.opacity = '1';

    gsap.from(chars, {
      x: () => gsap.utils.random(-200, 200),
      y: () => gsap.utils.random(-80, 80),
      rotation: () => gsap.utils.random(-35, 35),
      opacity: 0,
      stagger: 0.025,
      ease: 'back.out(1.7)',
      duration: 0.9,
      delay: 0.5,
    });
  }
}

// ─── Intro Section — Stagger Reveal ─────────────────────────────────────
const introLabel = document.querySelector('.intro-label');
const introHeading = document.querySelector('.intro-heading');
const introBody = document.querySelector('.intro-body');

if (introLabel || introHeading) {
  const introTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.section-intro',
      start: 'top 72%',
      once: true,
    },
  });

  if (introLabel) {
    introTl.to(introLabel, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0);
  }
  if (introHeading) {
    introTl.to(introHeading, { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' }, 0.15);
  }
  if (introBody) {
    introTl.to(introBody, { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' }, 0.3);
  }
}

// ─── Bento Grid — Scattered Assembly ─────────────────────────────────────
const bentoCells = gsap.utils.toArray('.bento-cell');

if (bentoCells.length > 0) {
  // Set random start positions
  gsap.set(bentoCells, {
    x: () => gsap.utils.random(-400, 400),
    y: () => gsap.utils.random(-200, 200),
    rotation: () => gsap.utils.random(-18, 18),
    opacity: 0,
  });

  ScrollTrigger.create({
    trigger: '.section-bento',
    start: 'top 68%',
    once: true,
    onEnter: () => {
      gsap.to(bentoCells, {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        duration: 0.9,
        stagger: { amount: 0.5, from: 'random' },
        ease: 'back.out(1.4)',
      });
    },
  });
}

// ─── Type Texture Section — Two-panel reveal ────────────────────────────
const textureLeft = document.querySelector('.type-texture-left .section-heading');
const textureRightPs = gsap.utils.toArray('.type-texture-right p');

if (textureLeft) {
  gsap.to(textureLeft, {
    opacity: 1,
    y: 0,
    duration: 0.75,
    ease: 'power2.out',
    scrollTrigger: { trigger: textureLeft, start: 'top 75%', once: true },
  });
}

if (textureRightPs.length > 0) {
  gsap.to(textureRightPs, {
    opacity: 1,
    y: 0,
    duration: 0.75,
    stagger: 0.12,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.type-texture-content', start: 'top 72%', once: true },
  });
}

// ─── SVG Path Draw (divider or decorative line) ───────────────────────────
const svgPaths = gsap.utils.toArray('.draw-path');
svgPaths.forEach((path) => {
  const len = path.getTotalLength ? path.getTotalLength() : 300;
  gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
  gsap.to(path, {
    strokeDashoffset: 0,
    duration: 1.5,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: path,
      start: 'top 80%',
      once: true,
    },
  });
});

// ─── Editorial Cards Reveal ───────────────────────────────────────────────
const editorialCards = gsap.utils.toArray('.editorial-card');
const editorialTitle = document.querySelector('.editorial-title');
const editorialAllLink = document.querySelector('.editorial-all-link');

if (editorialTitle) {
  gsap.to(editorialTitle, {
    opacity: 1,
    x: 0,
    duration: 0.75,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.editorial-header', start: 'top 78%', once: true },
  });
}

if (editorialAllLink) {
  gsap.to(editorialAllLink, {
    opacity: 1,
    duration: 0.75,
    delay: 0.2,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.editorial-header', start: 'top 78%', once: true },
  });
}

if (editorialCards.length > 0) {
  gsap.to(editorialCards, {
    opacity: 1,
    y: 0,
    duration: 0.75,
    stagger: { amount: 0.35, from: 'start' },
    ease: 'power2.out',
    scrollTrigger: { trigger: '.editorial-grid', start: 'top 72%', once: true },
  });
}

// ─── Counter Tween ────────────────────────────────────────────────────────
const statNumbers = gsap.utils.toArray('.stat-number[data-target]');
const statItems = gsap.utils.toArray('.stat-item');

if (statItems.length > 0) {
  gsap.to(statItems, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.section-stats', start: 'top 78%', once: true },
  });
}

statNumbers.forEach((el) => {
  const target = parseFloat(el.dataset.target || '0');
  const suffix = el.dataset.suffix || '';
  const obj = { val: 0 };

  gsap.to(obj, {
    val: target,
    duration: 1.8,
    ease: 'power2.out',
    onUpdate: () => {
      const rounded = target % 1 === 0 ? Math.round(obj.val) : obj.val.toFixed(1);
      el.textContent = rounded + suffix;
    },
    scrollTrigger: { trigger: '.section-stats', start: 'top 78%', once: true },
  });
});

// ─── Dark CTA — Clip-path Bloom ──────────────────────────────────────────
const darkCtaContent = document.querySelector('.dark-cta-content');
if (darkCtaContent) {
  gsap.fromTo(
    darkCtaContent,
    { clipPath: 'ellipse(0% 0% at 50% 50%)' },
    {
      clipPath: 'ellipse(150% 150% at 50% 50%)',
      duration: 1.05,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.section-dark-cta',
        start: 'top 62%',
        once: true,
      },
    }
  );
}

// ─── Overlap Card ─────────────────────────────────────────────────────────
const overlapCard = document.querySelector('.overlap-card');
if (overlapCard) {
  gsap.to(overlapCard, {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: 'power2.out',
    scrollTrigger: { trigger: overlapCard, start: 'top 75%', once: true },
  });
}

// ─── Parallax depth — 3 layers ────────────────────────────────────────────
const parallaxLayers = [
  { selector: '.parallax-slow', speed: 0.15 },
  { selector: '.parallax-mid',  speed: 0.3  },
  { selector: '.parallax-fast', speed: 0.55 },
];

parallaxLayers.forEach(({ selector, speed }) => {
  const els = gsap.utils.toArray(selector);
  els.forEach((el) => {
    gsap.to(el, {
      y: () => -(el.offsetHeight * speed),
      ease: 'none',
      scrollTrigger: {
        trigger: el.closest('.section') || el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
});

// ─── Elastic Magnetic Hover (CTA buttons) ─────────────────────────────────
const magneticTargets = gsap.utils.toArray('.btn-magnetic');
magneticTargets.forEach((btn) => {
  const onMove = (e) => {
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const threshold = 80;

    if (dist < threshold) {
      const strength = (threshold - dist) / threshold;
      gsap.to(btn, {
        x: dx * strength * 0.35,
        y: dy * strength * 0.35,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const onLeave = () => {
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
    });
  };

  document.addEventListener('mousemove', onMove);
  btn.addEventListener('mouseleave', onLeave);
});

// ─── Nav CTA Magnetic ────────────────────────────────────────────────────
const navCta = document.querySelector('.nav-cta');
if (navCta) {
  navCta.classList.add('btn-magnetic');
  const onMove = (e) => {
    const rect = navCta.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const threshold = 80;

    if (dist < threshold) {
      const strength = (threshold - dist) / threshold;
      gsap.to(navCta, {
        x: dx * strength * 0.35,
        y: dy * strength * 0.35,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const onLeave = () => {
    gsap.to(navCta, {
      x: 0, y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
    });
  };

  document.addEventListener('mousemove', onMove);
  navCta.addEventListener('mouseleave', onLeave);
}

// ─── Bento section title — word-by-word rotation (Splitting) ────────────
const bentoTitle = document.querySelector('.section-bento-title');
if (window.Splitting && bentoTitle) {
  const bResult = Splitting({ target: bentoTitle, by: 'words' });
  const words = bResult[0]?.words || [];

  if (words.length > 0) {
    bentoTitle.style.opacity = '1';

    gsap.from(words, {
      y: 40,
      opacity: 0,
      rotation: -5,
      duration: 0.75,
      stagger: 0.06,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: bentoTitle,
        start: 'top 78%',
        once: true,
      },
    });
  }
}
