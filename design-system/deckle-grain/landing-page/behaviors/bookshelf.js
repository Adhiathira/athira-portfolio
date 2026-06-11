/* bookshelf.js — Full-page bookshelf navigation system
   Handles both bookshelf view (index.html) and open-book view (sub-pages).
   On the bookshelf view, clicking a spine triggers a GSAP pull-out animation
   then navigates to the target page. On sub-pages with .open-book-layout,
   side spines provide navigation with entrance/exit transitions.
   A mobile menu fallback handles narrow viewports on all pages. */
(function initBookshelf() {
  'use strict';

  /* ── Book registry ── */
  var BOOKS = [
    { id: 'home', href: 'index.html', label: 'Deckle & Thread' },
    { id: 'editions', href: 'editions.html', label: 'Editions' },
    { id: 'process', href: 'process.html', label: 'Process' },
    { id: 'commissions', href: 'commissions.html', label: 'Commissions' },
    { id: 'about', href: 'about.html', label: 'About' }
  ];

  var currentFile = window.location.pathname.split('/').pop() || 'index.html';
  var isBookshelfView = (currentFile === 'index.html' || currentFile === '');
  var hasGSAP = (typeof gsap !== 'undefined');

  /* ── Bookshelf View (index.html) ── */
  if (isBookshelfView && document.getElementById('bookshelf')) {
    initBookshelfView();
  }

  /* ── Open Book View (sub-pages) ── */
  if (document.querySelector('.open-book-layout')) {
    initOpenBookView();
  }

  /* ── Mobile menu (all pages) ── */
  initMobileMenu();

  /* ═══════════════════════════════════════════
     BOOKSHELF VIEW — index.html
     ═══════════════════════════════════════════ */
  function initBookshelfView() {
    var spines = document.querySelectorAll('#bookshelf .bookshelf-spine');
    var homeLayout = document.getElementById('home-open-book');
    var bookshelfEl = document.getElementById('bookshelf');

    spines.forEach(function(spine) {
      /* Hover: tilt spine forward */
      if (hasGSAP) {
        spine.addEventListener('mouseenter', function() {
          gsap.to(spine, {
            rotateY: -8,
            z: 20,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
        spine.addEventListener('mouseleave', function() {
          gsap.to(spine, {
            rotateY: 0,
            z: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      }

      /* Click: open book */
      spine.addEventListener('click', function() {
        var bookId = spine.getAttribute('data-book');
        var href = spine.getAttribute('data-href');
        openBookFromShelf(spine, spines, bookId, href, bookshelfEl, homeLayout);
      });
    });
  }

  function openBookFromShelf(clickedSpine, allSpines, bookId, href, bookshelfEl, homeLayout) {
    if (!hasGSAP) {
      /* No GSAP: instant navigation */
      if (bookId === 'home' && homeLayout) {
        bookshelfEl.style.display = 'none';
        homeLayout.style.display = '';
        window.scrollTo(0, 0);
        if (typeof window._initBookFlipPin === 'function') {
          window._initBookFlipPin();
          window._initBookFlipPin = null;
        }
        if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
        repositionEmbeddedNav();
      } else {
        window.location.href = href;
      }
      return;
    }

    var idx = BOOKS.findIndex(function(b) { return b.id === bookId; });
    var tl = gsap.timeline();

    /* Phase 1: Pull clicked spine forward */
    tl.to(clickedSpine, {
      scale: 1.08,
      z: 60,
      boxShadow: '4px 8px 32px rgba(0,0,0,0.35)',
      duration: 0.35,
      ease: 'power2.out'
    });

    /* Phase 2: Split other spines left/right + fade */
    allSpines.forEach(function(spine) {
      if (spine === clickedSpine) return;
      var spineBookId = spine.getAttribute('data-book');
      var spineIdx = BOOKS.findIndex(function(b) { return b.id === spineBookId; });
      var direction = spineIdx < idx ? -1 : 1;

      tl.to(spine, {
        x: direction * 150,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.inOut'
      }, '<0.05');
    });

    /* Phase 3: Expand clicked spine + fade out */
    tl.to(clickedSpine, {
      scaleX: 3,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.inOut'
    }, '-=0.15');

    /* Phase 4: Navigate or reveal */
    tl.call(function() {
      if (bookId === 'home' && homeLayout) {
        /* In-place reveal of homepage open-book layout */
        bookshelfEl.style.display = 'none';
        homeLayout.style.display = '';
        window.scrollTo(0, 0);
        /* Play entrance animation: book settles, side spines slide in */
        var ob = homeLayout.querySelector('.open-book');
        var rs = homeLayout.querySelector('.open-book-right-spines');
        gsap.set(ob, { opacity: 0, scale: 0.95 });
        if (rs) gsap.set(rs.children, { x: 80, opacity: 0 });
        var entrance = gsap.timeline();
        entrance.to(ob, { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' });
        if (rs && rs.children.length) {
          entrance.to(rs.children, { x: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out' }, '-=0.3');
        }
        entrance.call(function() {
          /* Clear GSAP's residual transforms — they create a containing
             block that breaks position:fixed for ScrollTrigger pins
             and bookmark overlays inside .open-book */
          gsap.set(ob, { clearProps: 'transform,translate,rotate,scale' });
          if (rs) gsap.set(rs.children, { clearProps: 'transform,translate,x' });
          /* Create the ScrollTrigger pin now that the layout is visible.
             book-flip.js deferred this via window._initBookFlipPin because
             ScrollTrigger can't measure a display:none element. */
          if (typeof window._initBookFlipPin === 'function') {
            window._initBookFlipPin();
            window._initBookFlipPin = null;
          }
          if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
          repositionEmbeddedNav();
        });
      } else {
        /* Store animation state for receiving page */
        try {
          sessionStorage.setItem('bookshelf-transition', bookId);
        } catch(e) { /* ignore */ }
        window.location.href = href;
      }
    });
  }

  /* ═══════════════════════════════════════════
     OPEN BOOK VIEW — sub-pages
     ═══════════════════════════════════════════ */
  function initOpenBookView() {
    var sideSpines = document.querySelectorAll('.open-book-layout .bookshelf-spine');
    var transition = null;

    /* Check if we arrived via bookshelf animation */
    try {
      transition = sessionStorage.getItem('bookshelf-transition');
      if (transition) {
        sessionStorage.removeItem('bookshelf-transition');
      }
    } catch(e) { /* ignore */ }

    /* Entrance animation if arrived from bookshelf */
    if (hasGSAP && transition) {
      var openBook = document.querySelector('.open-book');
      var leftSpines = document.querySelector('.open-book-left-spines');
      var rightSpines = document.querySelector('.open-book-right-spines');

      gsap.set(openBook, { opacity: 0, scale: 0.95 });
      if (leftSpines) gsap.set(leftSpines.children, { x: -80, opacity: 0 });
      if (rightSpines) gsap.set(rightSpines.children, { x: 80, opacity: 0 });

      var tl = gsap.timeline({ delay: 0.1 });

      tl.to(openBook, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out'
      });

      if (leftSpines && leftSpines.children.length) {
        tl.to(leftSpines.children, {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: 'power2.out'
        }, '-=0.3');
      }

      if (rightSpines && rightSpines.children.length) {
        tl.to(rightSpines.children, {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: 'power2.out'
        }, '-=0.4');
      }

      /* Clear GSAP's residual transforms after entrance —
         they create a containing block that breaks position:fixed
         for ScrollTrigger pins and bookmark overlays */
      tl.call(function() {
        gsap.set(openBook, { clearProps: 'transform,translate,rotate,scale' });
        if (leftSpines) gsap.set(leftSpines.children, { clearProps: 'transform,translate,x' });
        if (rightSpines) gsap.set(rightSpines.children, { clearProps: 'transform,translate,x' });
        if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
      });
    }

    /* Position bookmarks/progress as fixed overlays (sub-pages only).
       On index.html the bookshelf is shown first; repositionEmbeddedNav
       is called from the D&T entrance animation instead. */
    if (!isBookshelfView) {
      repositionEmbeddedNav();
    }

    /* Side spine interactions */
    sideSpines.forEach(function(spine) {
      spine.addEventListener('click', function() {
        var href = spine.getAttribute('data-href');
        if (!hasGSAP) {
          window.location.href = href;
          return;
        }

        /* Animate spine pull-out then navigate */
        gsap.timeline({
          onComplete: function() {
            try {
              sessionStorage.setItem('bookshelf-transition', spine.getAttribute('data-book'));
            } catch(e) { /* ignore */ }
            window.location.href = href;
          }
        })
        .to(spine, {
          rotateY: -15,
          z: 30,
          scale: 1.05,
          duration: 0.25,
          ease: 'power2.out'
        })
        .to(spine, {
          opacity: 0,
          z: 60,
          duration: 0.2,
          ease: 'power2.in'
        });
      });

      /* Hover effects */
      if (hasGSAP) {
        spine.addEventListener('mouseenter', function() {
          gsap.to(spine, {
            rotateY: -6,
            z: 10,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
        spine.addEventListener('mouseleave', function() {
          gsap.to(spine, {
            rotateY: 0,
            z: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      }
    });
  }

  /* ═══════════════════════════════════════════
     EMBEDDED NAV POSITIONING
     ═══════════════════════════════════════════ */
  function repositionEmbeddedNav() {
    var contentEl = document.querySelector('.open-book-content');
    var bookmarks = document.getElementById('book-bookmarks');
    var progress  = document.getElementById('book-progress');
    if (!contentEl || (!bookmarks && !progress)) return;

    /* Move bookmarks/progress to <body> so position:fixed isn't broken
       by ancestor transforms (GSAP sets transform on .open-book) */
    if (bookmarks && bookmarks.closest('.open-book')) document.body.appendChild(bookmarks);
    if (progress  && progress.closest('.open-book'))  document.body.appendChild(progress);

    /* Vertical anchor: match the sticky cover/gutter/spines at --bookshelf-padding-y */
    var padY = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--bookshelf-padding-y')) || 80;

    function update() {
      var r = contentEl.getBoundingClientRect();
      if (r.width === 0) return;

      /* Only show when content area overlaps viewport */
      var visible = r.bottom > padY && r.top < window.innerHeight;

      if (bookmarks) {
        bookmarks.style.position   = 'fixed';
        /* Tabs protrude from the page edge — anchor so most of the
           32px-wide tab extends past the content's right border */
        bookmarks.style.right      = (window.innerWidth - r.right - 20) + 'px';
        bookmarks.style.top        = padY + 'px';
        bookmarks.style.zIndex     = '30';
        bookmarks.style.visibility = visible ? '' : 'hidden';
      }

      if (progress) {
        progress.style.position   = 'fixed';
        /* Center horizontally within the content area */
        var centerX = r.left + r.width / 2;
        progress.style.left       = centerX + 'px';
        progress.style.transform  = 'translateX(-50%)';
        progress.style.right      = 'auto';
        progress.style.bottom     = '24px';
        progress.style.zIndex     = '30';
        progress.style.visibility = visible ? '' : 'hidden';
      }
    }

    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update);

    /* Expose for re-call after layout changes (e.g. home open-book entrance) */
    window._repositionEmbeddedNav = update;
  }

  /* ═══════════════════════════════════════════
     MOBILE MENU
     ═══════════════════════════════════════════ */
  function initMobileMenu() {
    var toggle = document.getElementById('bookshelf-mobile-toggle');
    var menu = document.getElementById('bookshelf-mobile-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', function() {
      var isOpen = menu.classList.contains('is-open');
      if (isOpen) {
        menu.classList.remove('is-open');
        document.body.style.overflow = '';
      } else {
        menu.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      }
    });

    /* Mark active link */
    menu.querySelectorAll('a').forEach(function(link) {
      var linkHref = link.getAttribute('href');
      if (linkHref === currentFile) {
        link.classList.add('is-active');
      }
    });
  }

})();
