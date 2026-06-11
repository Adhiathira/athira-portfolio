/**
 * book-flip.js — Deckle & Thread
 *
 * GSAP ScrollTrigger page-flip engine.
 * Scroll-hijacks inside a pinned .book container.
 * Each scroll gesture turns a page via CSS clip-path fold geometry.
 *
 * Enhanced: dynamic fold-back colors based on next page,
 * bigger paper curl bulge, wider fold shadow.
 *
 * Dependencies: GSAP 3.12+, ScrollTrigger, ScrollToPlugin
 */
(function() {
  'use strict';

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('[book-flip] GSAP or ScrollTrigger not found');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Check reduced motion preference
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    // Fall back to normal scroll — pages are already styled to stack vertically
    return;
  }

  // ── Gather elements ──
  var book = document.querySelector('.book');
  if (!book) return;

  var stage = book.querySelector('.book-stage');
  var pages = gsap.utils.toArray('.book-page');
  var bookmarkTabs = gsap.utils.toArray('.bookmark-tab');
  var progressDots = gsap.utils.toArray('.book-progress__dot');
  var numPages = pages.length;

  if (numPages < 2) return;

  // ── Collect page background colors ──
  // Uses data-page-bg attribute if present, otherwise reads computed background-color
  var pageBgColors = pages.map(function(page) {
    var dataBg = page.getAttribute('data-page-bg');
    if (dataBg) return dataBg;

    // Try to read computed style
    var computed = window.getComputedStyle(page).backgroundColor;
    if (computed && computed !== 'rgba(0, 0, 0, 0)' && computed !== 'transparent') {
      return rgbToHex(computed);
    }

    // Dark sections get a dark default
    if (page.classList.contains('dark-section')) {
      return '#282a30';
    }

    return '#fdfdfd';
  });

  // ── State ──
  var currentPageIndex = 0;

  // ── Initialize page visibility ──
  pages.forEach(function(page, i) {
    if (i === 0) {
      page.classList.add('is-current');
    } else {
      page.classList.add('is-ahead');
    }
  });

  /**
   * rgbToHex — Convert rgb(r, g, b) or rgba(r, g, b, a) string to hex
   */
  function rgbToHex(rgb) {
    var match = rgb.match(/\d+/g);
    if (!match || match.length < 3) return '#fdfdfd';
    var r = parseInt(match[0], 10);
    var g = parseInt(match[1], 10);
    var b = parseInt(match[2], 10);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  /**
   * lightenColor — Lighten a hex color by a given amount (0..1)
   * Used to create the paper-back effect on fold-back
   */
  function lightenColor(hex, amount) {
    hex = hex.replace('#', '');
    // Handle shorthand hex
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);
    r = Math.min(255, Math.round(r + (255 - r) * amount));
    g = Math.min(255, Math.round(g + (255 - g) * amount));
    b = Math.min(255, Math.round(b + (255 - b) * amount));
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  /**
   * computeFoldGeometry(t)
   *
   * Given fold progress t (0 = flat, 1 = fully turned):
   * Returns clip-path polygon strings for the turning page and fold-back overlay.
   *
   * The fold line sweeps from top-right corner diagonally toward bottom-left.
   * A sine-based curve bulge creates the visible paper BEND effect.
   * Enhanced: bulge increased from 12 to 20 for more dramatic curl.
   *
   * @param {number} t — fold progress 0..1
   * @returns {{ pageClip: string, foldClip: string, shadowAngle: number }}
   */
  function computeFoldGeometry(t) {
    // Fold line endpoints sweep from top-right to bottom-left
    // Top point moves from right edge leftward
    var topX = 100 - (t * 110); // goes past 0 to fully close
    topX = Math.max(-10, topX);

    // Right point moves from top edge downward
    var rightY = Math.min(t * 140, 100);
    rightY = Math.min(100, rightY);

    // Curve bulge — maximum at mid-turn, creates paper bend
    // Increased from 12 to 20 for more dramatic curl
    var bulge = Math.sin(t * Math.PI) * 20;

    // Mid-point of fold line (where the curve peaks)
    var midX = (topX + 100) / 2 + bulge * 0.6;
    var midY = (0 + rightY) / 2 - bulge * 0.4;

    // Clamp values
    midX = Math.max(0, Math.min(100, midX));
    midY = Math.max(0, Math.min(100, midY));

    // The TURNING PAGE is clipped to show only the part that hasn't folded yet.
    // Polygon: covers from fold line to top-left and bottom-left.
    var pageClip;
    if (t < 0.01) {
      // Fully flat — show entire page
      pageClip = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
    } else if (t > 0.99) {
      // Fully turned — hide page
      pageClip = 'polygon(0% 0%, 0% 0%, 0% 0%)';
    } else {
      // The fold line cuts diagonally. The visible part is BELOW/LEFT of the fold.
      pageClip = 'polygon(' +
        '0% 0%, ' +                          // top-left corner
        topX + '% 0%, ' +                     // where fold hits top edge
        midX + '% ' + midY + '%, ' +          // curve bulge point
        '100% ' + rightY + '%, ' +            // where fold hits right edge
        '100% 100%, ' +                       // bottom-right
        '0% 100%' +                           // bottom-left
      ')';
    }

    // The FOLD-BACK is the triangular flap visible above/right of the fold line.
    // It shows the "back" of the page (paper texture + dynamic color).
    var foldClip;
    if (t < 0.01 || t > 0.99) {
      foldClip = 'polygon(0% 0%, 0% 0%, 0% 0%)';
    } else {
      // Mirror the fold geometry — the flap that curls back
      // The fold-back appears between the fold line and where the page corner was
      var flapCornerX = Math.min(100, topX + (100 - topX) * 0.6);
      var flapCornerY = Math.max(0, rightY * 0.4);

      foldClip = 'polygon(' +
        topX + '% 0%, ' +                    // fold meets top edge
        '100% 0%, ' +                        // top-right corner (original position)
        '100% ' + rightY + '%, ' +           // fold meets right edge
        midX + '% ' + midY + '%, ' +         // curve bulge
        flapCornerX + '% ' + flapCornerY + '%' + // flap interior
      ')';
    }

    // Shadow angle follows the fold line direction
    var shadowAngle = Math.atan2(rightY, 100 - topX) * (180 / Math.PI);

    return {
      pageClip: pageClip,
      foldClip: foldClip,
      shadowAngle: shadowAngle
    };
  }

  /**
   * applyFold — Apply fold geometry to a page and its overlay elements.
   * Enhanced: sets dynamic fold-back colors based on the next page's background,
   * and uses a wider, more pronounced fold shadow.
   *
   * @param {Element} pageEl — the .book-page element being turned
   * @param {number} progress — fold progress 0..1
   * @param {number} turningIndex — index of the page being turned
   */
  function applyFold(pageEl, progress, turningIndex) {
    var foldBack = pageEl.querySelector('.book-page__fold-back');
    var foldShadow = pageEl.querySelector('.book-page__fold-shadow');
    var geo = computeFoldGeometry(progress);

    // Clip the turning page
    pageEl.style.clipPath = geo.pageClip;
    pageEl.style.webkitClipPath = geo.pageClip;

    // Show fold-back overlay with dynamic colors
    if (foldBack) {
      foldBack.style.clipPath = geo.foldClip;
      foldBack.style.webkitClipPath = geo.foldClip;

      // Set fold colors based on next page's background
      var nextIndex = Math.min(turningIndex + 1, numPages - 1);
      var nextBg = pageBgColors[nextIndex];
      var currentBg = pageBgColors[turningIndex];

      // The fold-back shows the BACK of the current page turning over.
      // As it turns, the fold transitions from the paper-back color to hint at the next page.
      foldBack.style.setProperty('--fold-color-start', lightenColor(currentBg, 0.05));
      foldBack.style.setProperty('--fold-color-end', nextBg);

      if (progress > 0.01 && progress < 0.99) {
        foldBack.classList.add('is-visible');
      } else {
        foldBack.classList.remove('is-visible');
      }
    }

    // Enhanced fold shadow — wider, more pronounced
    if (foldShadow) {
      if (progress > 0.02 && progress < 0.98) {
        foldShadow.classList.add('is-visible');
        var angle = geo.shadowAngle + 90;
        var intensity = Math.sin(progress * Math.PI) * 0.2; // increased from 0.15
        var spread = 8; // wider shadow band
        foldShadow.style.background =
          'linear-gradient(' + angle + 'deg, ' +
          'transparent ' + (50 - spread * 2) + '%, ' +
          'rgba(45, 47, 52, ' + (intensity * 0.3) + ') ' + (50 - spread) + '%, ' +
          'rgba(45, 47, 52, ' + intensity + ') ' + (50 - 1) + '%, ' +
          'rgba(45, 47, 52, ' + (intensity * 1.5) + ') 50%, ' +
          'rgba(45, 47, 52, ' + intensity + ') ' + (50 + 1) + '%, ' +
          'rgba(45, 47, 52, ' + (intensity * 0.3) + ') ' + (50 + spread) + '%, ' +
          'transparent ' + (50 + spread * 2) + '%)';
      } else {
        foldShadow.classList.remove('is-visible');
        foldShadow.style.background = '';
      }
    }
  }

  /**
   * updatePageVisibility — Manage z-index and state classes
   */
  function updatePageVisibility(activeIndex, foldProgress) {
    pages.forEach(function(page, i) {
      // Remove all state classes
      page.classList.remove('is-current', 'is-turning', 'is-behind', 'is-turned', 'is-ahead');

      if (i < activeIndex) {
        // Already fully turned
        page.classList.add('is-turned');
        page.style.clipPath = 'polygon(0% 0%, 0% 0%, 0% 0%)';
        page.style.webkitClipPath = 'polygon(0% 0%, 0% 0%, 0% 0%)';
      } else if (i === activeIndex) {
        // Currently turning
        page.classList.add('is-turning');
        // clip-path is managed by applyFold
      } else if (i === activeIndex + 1) {
        // Visible underneath the turning page
        page.classList.add('is-behind');
        page.style.clipPath = '';
        page.style.webkitClipPath = '';
      } else {
        // Future pages
        page.classList.add('is-ahead');
        page.style.clipPath = '';
        page.style.webkitClipPath = '';
      }
    });

    // If we're between turns (foldProgress near 0), mark the current as "is-current" instead
    if (foldProgress < 0.005) {
      pages[activeIndex].classList.remove('is-turning');
      pages[activeIndex].classList.add('is-current');
      pages[activeIndex].style.clipPath = '';
      pages[activeIndex].style.webkitClipPath = '';
    }
  }

  /**
   * updateBookmarks — Highlight the active bookmark tab
   */
  function updateBookmarks(pageIndex) {
    bookmarkTabs.forEach(function(tab, i) {
      if (i === pageIndex) {
        tab.classList.add('is-active');
      } else {
        tab.classList.remove('is-active');
      }
    });
  }

  /**
   * updateProgress — Update the dot indicator at the bottom
   */
  function updateProgress(pageIndex) {
    progressDots.forEach(function(dot, i) {
      if (i === pageIndex) {
        dot.classList.add('is-active');
      } else {
        dot.classList.remove('is-active');
      }
    });
  }

  // ── Main ScrollTrigger ──
  // Pin the book container and map scroll position to page turns
  var totalScrollDistance = (numPages - 1) * window.innerHeight;

  ScrollTrigger.create({
    trigger: book,
    start: 'top top',
    end: '+=' + totalScrollDistance,
    pin: true,
    scrub: 1.5,
    onUpdate: function(self) {
      var progress = self.progress; // 0..1 across entire scroll distance
      var totalTurns = numPages - 1;
      var scaledProgress = progress * totalTurns;

      // Which page is currently turning
      var turningIndex = Math.floor(scaledProgress);
      turningIndex = Math.min(turningIndex, totalTurns - 1);

      // How far through this particular turn (0..1)
      var turnProgress = scaledProgress - turningIndex;
      turnProgress = Math.max(0, Math.min(1, turnProgress));

      // Update visibility and fold — pass turningIndex for dynamic color lookup
      updatePageVisibility(turningIndex, turnProgress);
      applyFold(pages[turningIndex], turnProgress, turningIndex);

      // Determine which page the viewer is "on" for UI purposes
      var viewingPage = turnProgress > 0.5 ? turningIndex + 1 : turningIndex;
      viewingPage = Math.min(viewingPage, numPages - 1);

      if (viewingPage !== currentPageIndex) {
        currentPageIndex = viewingPage;
        updateBookmarks(currentPageIndex);
        updateProgress(currentPageIndex);
      }
    }
  });

  // ── Bookmark click navigation ──
  bookmarkTabs.forEach(function(tab, i) {
    tab.addEventListener('click', function(e) {
      e.preventDefault();

      // If this is a link to another HTML page, navigate normally
      var href = tab.getAttribute('href');
      if (href && href !== '#' && !tab.hasAttribute('data-page-index')) {
        window.location.href = href;
        return;
      }

      // Otherwise, scroll to the correct page within this document
      var pageIndex = parseInt(tab.getAttribute('data-page-index') || i, 10);
      var targetProgress = pageIndex / (numPages - 1);
      var targetScroll = targetProgress * totalScrollDistance;

      // Find the pinned scroll start position
      var pinStart = ScrollTrigger.getAll()[0];
      if (pinStart) {
        var actualTarget = pinStart.start + targetScroll;
        gsap.to(window, {
          scrollTo: { y: actualTarget },
          duration: 1.2,
          ease: 'power2.inOut'
        });
      }
    });
  });

  // ── Keyboard navigation ──
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      var nextIndex = Math.min(currentPageIndex + 1, numPages - 1);
      navigateToPage(nextIndex);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      var prevIndex = Math.max(currentPageIndex - 1, 0);
      navigateToPage(prevIndex);
    }
  });

  function navigateToPage(pageIndex) {
    var targetProgress = pageIndex / (numPages - 1);
    var targetScroll = targetProgress * totalScrollDistance;
    var triggers = ScrollTrigger.getAll();
    if (triggers.length > 0) {
      var actualTarget = triggers[0].start + targetScroll;
      gsap.to(window, {
        scrollTo: { y: actualTarget },
        duration: 1.2,
        ease: 'power2.inOut'
      });
    }
  }

  // ── Handle internal scrollable content ──
  // For pages with .book-page-content--scrollable,
  // allow wheel events to scroll internally first
  var scrollableContents = document.querySelectorAll('.book-page-content--scrollable');
  scrollableContents.forEach(function(el) {
    el.addEventListener('wheel', function(e) {
      var atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 2;
      var atTop = el.scrollTop < 2;

      if (e.deltaY > 0 && !atBottom) {
        // Scrolling down but not at bottom — consume the event
        e.stopPropagation();
      } else if (e.deltaY < 0 && !atTop) {
        // Scrolling up but not at top — consume the event
        e.stopPropagation();
      }
      // Otherwise let it propagate to trigger page turn
    }, { passive: true });
  });

  // ── Initial state ──
  updateBookmarks(0);
  updateProgress(0);

  // Refresh on resize
  window.addEventListener('resize', function() {
    totalScrollDistance = (numPages - 1) * window.innerHeight;
    ScrollTrigger.refresh();
  });

})();
