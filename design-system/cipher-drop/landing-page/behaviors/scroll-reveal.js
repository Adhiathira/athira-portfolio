// cipher-drop — scroll reveal — GSAP animations with scramble text

(function () {
  'use strict';

  if (typeof gsap === 'undefined') {
    console.warn('[cipher-drop] GSAP not loaded — animations disabled');
    return;
  }

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // === SCRAMBLE TEXT UTILITY ===
  var SCRAMBLE_CHARS = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*<>[]{}';

  function scrambleText(el, finalText, duration, onComplete) {
    var iterations = 0;
    var totalIterations = Math.ceil(duration / 40);
    var interval = setInterval(function () {
      el.textContent = finalText.split('').map(function (char, index) {
        if (char === ' ') return ' ';
        if (index < Math.floor((iterations / totalIterations) * finalText.length)) {
          return char;
        }
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }).join('');
      iterations++;
      if (iterations >= totalIterations) {
        clearInterval(interval);
        el.textContent = finalText;
        if (onComplete) onComplete();
      }
    }, 40);
  }

  // === HERO ANIMATIONS ===
  function initHero() {
    var heroHeadline = document.querySelector('.hero__headline');
    var heroSubhead = document.querySelector('.hero__subhead');
    var heroActions = document.querySelector('.hero__actions');
    var heroStatus = document.querySelector('.hero__status-line');
    var heroEyebrow = document.querySelector('.hero__eyebrow');

    if (!heroHeadline) return;

    var finalText = heroHeadline.dataset.text || heroHeadline.textContent;
    heroHeadline.textContent = '';

    var tl = gsap.timeline({ delay: 0.2 });

    // Eyebrow flicker in
    if (heroEyebrow) {
      gsap.set(heroEyebrow, { autoAlpha: 0 });
      tl.to(heroEyebrow, {
        autoAlpha: 1,
        duration: 0.15,
        ease: 'steps(1)'
      });
    }

    // Headline scramble
    tl.add(function () {
      scrambleText(heroHeadline, finalText, 1200);
    }, '-=0.05');

    // Subhead data-reveal
    if (heroSubhead) {
      gsap.set(heroSubhead, { autoAlpha: 0 });
      tl.to(heroSubhead, {
        autoAlpha: 1,
        duration: 0.15,
        ease: 'steps(1)'
      }, '+=0.8');
    }

    // CTA buttons flicker in
    if (heroActions) {
      gsap.set(heroActions, { autoAlpha: 0 });
      tl.to(heroActions, {
        autoAlpha: 1,
        duration: 0.15,
        ease: 'steps(1)'
      }, '+=0.15');
    }

    // Status line
    if (heroStatus) {
      gsap.set(heroStatus, { autoAlpha: 0 });
      tl.to(heroStatus, {
        autoAlpha: 1,
        duration: 0.15,
        ease: 'steps(1)'
      }, '+=0.1');
    }
  }

  // === FEATURE CARDS STAGGER ===
  function initFeatureCards() {
    var cards = document.querySelectorAll('.feature-card');
    if (!cards.length) return;

    gsap.set(cards, { autoAlpha: 0, y: 16 });

    ScrollTrigger.create({
      trigger: '.features',
      start: 'top 80%',
      once: true,
      onEnter: function () {
        gsap.to(cards, {
          autoAlpha: 1,
          y: 0,
          duration: 0.15,
          stagger: 0.05,
          ease: 'steps(2)'
        });
      }
    });
  }

  // === STATS COUNT-UP ===
  function initStats() {
    var statValues = document.querySelectorAll('.stat-item__value');
    if (!statValues.length) return;

    ScrollTrigger.create({
      trigger: '.stats',
      start: 'top 80%',
      once: true,
      onEnter: function () {
        statValues.forEach(function (el) {
          var target = parseFloat(el.dataset.value) || 0;
          var suffix = el.dataset.suffix || '';
          var prefix = el.dataset.prefix || '';
          var decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
          var duration = 1.5;
          var start = 0;
          var startTime = null;

          function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            var current = start + (target - start) * progress;
            var formatted = current.toFixed(decimals);
            // Pad with leading zeros for monospace counter effect
            if (el.dataset.pad) {
              var padLen = parseInt(el.dataset.pad);
              formatted = formatted.toString().padStart(padLen, '0');
            }
            el.textContent = prefix + formatted + suffix;
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              el.textContent = prefix + target.toFixed(decimals) + suffix;
            }
          }
          requestAnimationFrame(animate);
        });
      }
    });
  }

  // === HOW IT WORKS STEPS ===
  function initSteps() {
    var steps = document.querySelectorAll('.step-item');
    if (!steps.length) return;

    gsap.set(steps, { autoAlpha: 0, y: 16 });

    ScrollTrigger.create({
      trigger: '.how-it-works',
      start: 'top 75%',
      once: true,
      onEnter: function () {
        gsap.to(steps, {
          autoAlpha: 1,
          y: 0,
          duration: 0.15,
          stagger: 0.08,
          ease: 'steps(2)'
        });
      }
    });
  }

  // === TESTIMONIAL LOGS ===
  function initLogs() {
    var logs = document.querySelectorAll('.log-entry');
    if (!logs.length) return;

    gsap.set(logs, { autoAlpha: 0, y: 16 });

    ScrollTrigger.create({
      trigger: '.testimonials',
      start: 'top 80%',
      once: true,
      onEnter: function () {
        gsap.to(logs, {
          autoAlpha: 1,
          y: 0,
          duration: 0.15,
          stagger: 0.06,
          ease: 'steps(2)'
        });
      }
    });
  }

  // === GLITCH HOVER ON HEADINGS ===
  function initGlitchHover() {
    document.querySelectorAll('h1, h2, h3, .hero__headline').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        el.classList.add('animate-glitch');
        setTimeout(function () {
          el.classList.remove('animate-glitch');
        }, 200);
      });
    });
  }

  // === INIT ===
  document.addEventListener('DOMContentLoaded', function () {
    initHero();
    initFeatureCards();
    initStats();
    initSteps();
    initLogs();
    initGlitchHover();
  });
})();
