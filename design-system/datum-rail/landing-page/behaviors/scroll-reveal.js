/* ============================================================
   SCROLL REVEAL + COUNT-UP — Datum Rail
   GSAP + ScrollTrigger
   Rules:
   - NEVER opacity:0 in CSS — use gsap.set() only
   - All ScrollTrigger: once:true
   - Durations: 200ms for reveals, 1200ms for count-up
   - y: 8px only — no dramatic slides
   - Easing: cubic-bezier(0.4, 0, 0.2, 1) = "power1.inOut" approx
   ============================================================ */

(function () {
  'use strict';

  // Wait for GSAP + ScrollTrigger to load
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // ---- Reveal: section items (y:8px + opacity) ----
  // Different animation patterns per section to satisfy variety rule

  // Pattern A: staggered fade-up (features, how-it-works)
  document.querySelectorAll('.js-reveal-section').forEach(function (section) {
    var items = section.querySelectorAll('.js-reveal-item');
    if (items.length === 0) return;

    // Determine which pattern to use based on section content
    var isTestimonials = section.querySelector('.testimonial-card') !== null;
    var isFeatures = section.querySelector('.feature-card') !== null;
    var isHowSection = section.querySelector('.how-step') !== null;
    var isIntegrations = section.querySelector('.integration-card') !== null;

    if (isTestimonials) {
      // Pattern B: individual fade (no stagger — each testimonial reveals alone)
      items.forEach(function (item, i) {
        gsap.set(item, { opacity: 0, y: 8 });
        ScrollTrigger.create({
          trigger: item,
          start: 'top 88%',
          once: true,
          onEnter: function () {
            gsap.to(item, {
              opacity: 1,
              y: 0,
              duration: 0.2,
              ease: 'power1.inOut',
              delay: i * 0.08
            });
          }
        });
      });

    } else if (isIntegrations) {
      // Pattern C: grid wave — row by row stagger
      gsap.set(items, { opacity: 0, y: 8 });
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        once: true,
        onEnter: function () {
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.2,
            stagger: 0.05,
            ease: 'power1.inOut'
          });
        }
      });

    } else {
      // Pattern A: standard staggered reveal
      gsap.set(items, { opacity: 0, y: 8 });
      ScrollTrigger.create({
        trigger: section,
        start: 'top 82%',
        once: true,
        onEnter: function () {
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.2,
            stagger: 0.06,
            ease: 'power1.inOut'
          });
        }
      });
    }
  });

  // ---- Count-up animation for stats ----
  var statsTrigger = document.querySelector('.js-stats-trigger');
  if (statsTrigger) {
    var countItems = statsTrigger.querySelectorAll('.js-count');

    ScrollTrigger.create({
      trigger: statsTrigger,
      start: 'top 80%',
      once: true,
      onEnter: function () {
        countItems.forEach(function (el) {
          var target = parseFloat(el.getAttribute('data-target'));
          var suffix = el.getAttribute('data-suffix') || '';
          var isLarge = target >= 1000000;

          // For very large numbers, show abbreviated form
          var displayTarget = target;
          var displaySuffix = suffix;

          if (target >= 1000000000) {
            displayTarget = (target / 1000000000).toFixed(1);
            displaySuffix = 'B+';
          } else if (target >= 1000000) {
            displayTarget = (target / 1000000).toFixed(0);
            displaySuffix = 'M+';
          }

          var obj = { val: 0 };
          gsap.to(obj, {
            val: displayTarget,
            duration: 1.2,
            ease: 'power2.out',
            onUpdate: function () {
              var v = obj.val;
              var formatted;
              if (displayTarget % 1 !== 0) {
                formatted = v.toFixed(1);
              } else if (v >= 1000) {
                formatted = Math.round(v).toLocaleString();
              } else {
                formatted = Math.round(v).toString();
              }
              el.textContent = formatted + displaySuffix;
            }
          });
        });
      }
    });
  }

  // ---- Feature detail sections (product page) ----
  document.querySelectorAll('.js-reveal-section').forEach(function (section) {
    var detail = section.querySelector('.feature-detail-content');
    var visual = section.querySelector('.feature-detail-visual');
    if (detail && visual) {
      gsap.set([detail, visual], { opacity: 0, y: 8 });
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        once: true,
        onEnter: function () {
          gsap.to([detail, visual], {
            opacity: 1,
            y: 0,
            duration: 0.2,
            stagger: 0.07,
            ease: 'power1.inOut'
          });
        }
      });
    }
  });

  // ---- FAQ items ----
  var faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length > 0) {
    gsap.set(faqItems, { opacity: 0, y: 8 });
    ScrollTrigger.create({
      trigger: faqItems[0],
      start: 'top 85%',
      once: true,
      onEnter: function () {
        gsap.to(faqItems, {
          opacity: 1,
          y: 0,
          duration: 0.2,
          stagger: 0.04,
          ease: 'power1.inOut'
        });
      }
    });
  }

  // ---- Person cards (team page) ----
  var personCards = document.querySelectorAll('.person-card');
  if (personCards.length > 0) {
    gsap.set(personCards, { opacity: 0, y: 8 });
    ScrollTrigger.create({
      trigger: personCards[0],
      start: 'top 82%',
      once: true,
      onEnter: function () {
        gsap.to(personCards, {
          opacity: 1,
          y: 0,
          duration: 0.2,
          stagger: 0.05,
          ease: 'power1.inOut'
        });
      }
    });
  }

  // ---- Value items ----
  var valueItems = document.querySelectorAll('.value-item');
  if (valueItems.length > 0) {
    gsap.set(valueItems, { opacity: 0, y: 8 });
    ScrollTrigger.create({
      trigger: valueItems[0],
      start: 'top 85%',
      once: true,
      onEnter: function () {
        gsap.to(valueItems, {
          opacity: 1,
          y: 0,
          duration: 0.2,
          stagger: 0.06,
          ease: 'power1.inOut'
        });
      }
    });
  }

  // ---- Pricing cards ----
  var pricingCards = document.querySelectorAll('.pricing-card');
  if (pricingCards.length > 0) {
    gsap.set(pricingCards, { opacity: 0, y: 8 });
    ScrollTrigger.create({
      trigger: pricingCards[0],
      start: 'top 80%',
      once: true,
      onEnter: function () {
        gsap.to(pricingCards, {
          opacity: 1,
          y: 0,
          duration: 0.2,
          stagger: 0.08,
          ease: 'power1.inOut'
        });
      }
    });
  }

})();
