/* ═══════════════════════════════════════════════════
   BOOK-FLIP — Curved diagonal page-turn system
   ═══════════════════════════════════════════════════
   Pages are absolutely stacked inside a pinned container.
   Scroll drives a curved clip-path that peels each page
   from top-right to bottom-left, like turning a real book
   page from its free edge toward the spine. The fold-back
   overlay shows the paper's reverse side with texture
   and shadow.
   ═══════════════════════════════════════════════════ */

(function initBookFlip() {
  'use strict';

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('[book-flip] GSAP or ScrollTrigger not loaded.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const pages = gsap.utils.toArray('.book-page');
  const progressDots = gsap.utils.toArray('.book-progress-dot');
  const bookmarks = gsap.utils.toArray('.book-bookmark');
  const bookPages = document.querySelector('.book-pages');

  if (!pages.length || !bookPages) return;

  /* ── Embedded mode: open-book-layout provides its own spine/edge ── */
  var isEmbedded = !!document.querySelector('.open-book-layout');
  if (isEmbedded) {
    var standaloneSpine = document.getElementById('book-spine');
    var standaloneEdge = document.getElementById('book-edge');
    if (standaloneSpine) standaloneSpine.style.display = 'none';
    if (standaloneEdge) standaloneEdge.style.display = 'none';
  }

  const totalPages = pages.length;
  const totalTurns = totalPages - 1;

  /* ── Z-index stacking: first page on top ────────── */
  pages.forEach((page, i) => {
    page.style.zIndex = totalPages - i;
  });

  /* ── Lift fold overlays OUT of clipped pages ─────── */
  /* Fold-backs must be siblings (not children) of .book-page
     because clip-path on the page clips ALL children.
     The fold-back needs to render in the turned-away area,
     which is exactly the area the parent clips off. */
  const foldOverlays = [];
  pages.forEach((page, i) => {
    if (i >= totalTurns) {
      // Last page never turns — remove its fold if present
      const lastFold = page.querySelector('.book-fold');
      if (lastFold) lastFold.remove();
      return;
    }
    const fold = page.querySelector('.book-fold');
    if (fold) {
      // Move from inside the clipped page to the container
      bookPages.appendChild(fold);
      // z-index same as page — later in DOM order renders on top
      fold.style.zIndex = totalPages - i;
      // Set fold colors from page data attributes
      // --fold-bg: solid opaque back-of-page color (same paper)
      // --fold-color-start / --fold-color-end: shading gradient for fold depth
      const pageBg = page.dataset.pageBg || '#f5f0e8';
      const foldColor = page.dataset.foldColor || '#e8e2d9';
      const nextPage = pages[i + 1];
      const nextBg = nextPage ? (nextPage.dataset.pageBg || '#f5f0e8') : '#f5f0e8';
      fold.style.setProperty('--fold-bg', pageBg);
      fold.style.setProperty('--fold-color-start', foldColor);
      fold.style.setProperty('--fold-color-end', nextBg);
    }
    foldOverlays[i] = fold || null;
  });

  /* ── Active page indicator ──────────────────────── */
  let currentPage = 0;
  function setActivePage(idx) {
    if (currentPage === idx) return;
    currentPage = idx;
    progressDots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
    bookmarks.forEach((b, i) => b.classList.toggle('is-active', i === idx));
  }
  setActivePage(0);

  /* ═══════════════════════════════════════════════════
     FOLD GEOMETRY
     ═══════════════════════════════════════════════════
     The fold sweeps diagonally from the top-right corner
     to the bottom-left — like turning a real book page
     from its free edge (right) toward the spine (left).
     Two anchor points trace the page edges:
       Anchor A: top edge RIGHT→LEFT (t: 0 → 0.5)
                 then left edge TOP→BOTTOM (t: 0.5 → 1)
       Anchor B: right edge TOP→BOTTOM (t: 0 → 0.5)
                 then bottom edge RIGHT→LEFT (t: 0.5 → 1)
     A quadratic Bezier curve between A and B creates
     the organic fold line.
     ═══════════════════════════════════════════════════ */

  function getFoldAnchors(t) {
    let ax, ay, bx, by;

    if (t <= 0.5) {
      // A sweeps across top edge RIGHT → LEFT: (1,0) → (0,0)
      ax = 1 - t * 2;
      ay = 0;
      // B sweeps down right edge TOP → BOTTOM: (1,0) → (1,1)
      bx = 1;
      by = t * 2;
    } else {
      // A sweeps down left edge TOP → BOTTOM: (0,0) → (0,1)
      ax = 0;
      ay = (t - 0.5) * 2;
      // B sweeps across bottom edge RIGHT → LEFT: (1,1) → (0,1)
      bx = 1 - (t - 0.5) * 2;
      by = 1;
    }

    // Bezier control point: midpoint pushed toward visible side
    const midX = (ax + bx) / 2;
    const midY = (ay + by) / 2;

    // Curvature peaks at t=0.5 (fold crosses full diagonal)
    const curvature = 0.10 * Math.sin(t * Math.PI);

    // Normal pointing toward bottom-left (visible side)
    const dx = bx - ax;
    const dy = by - ay;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    // CCW perpendicular = (-dy, dx) — points toward bottom-left
    const nx = -dy / len;
    const ny = dx / len;

    const ctrlX = midX + nx * curvature;
    const ctrlY = midY + ny * curvature;

    return { ax, ay, bx, by, ctrlX, ctrlY };
  }

  /* ── Bezier point helper ─────────────────────────── */
  function bezierPt(u, sx, sy, cx, cy, ex, ey) {
    const inv = 1 - u;
    return {
      x: inv * inv * sx + 2 * inv * u * cx + u * u * ex,
      y: inv * inv * sy + 2 * inv * u * cy + u * u * ey
    };
  }

  function pct(v) {
    return (v * 100).toFixed(2) + '%';
  }

  /* ── Build the VISIBLE area clip-path ────────────── */
  function buildFoldClip(t) {
    if (t <= 0.002) return null; // no clip = full page
    if (t >= 0.998) return 'polygon(0% 0%, 0% 0%, 0% 0%)';

    const { ax, ay, bx, by, ctrlX, ctrlY } = getFoldAnchors(t);
    const N = 24; // curve smoothness

    // Cross product: negative = hidden side (top-right), positive = visible (bottom-left)
    const cross = (px, py) => (bx - ax) * (py - ay) - (by - ay) * (px - ax);

    // Check which corners are on the visible side (cross > 0)
    const corners = [
      { x: 0, y: 0 },  // top-left
      { x: 0, y: 1 },  // bottom-left
      { x: 1, y: 1 },  // bottom-right
    ];

    const visCorners = corners.filter(c => {
      if (cross(c.x, c.y) <= 0.001) return false;
      // Skip if coincident with anchor
      if (Math.abs(c.x - ax) < 0.02 && Math.abs(c.y - ay) < 0.02) return false;
      if (Math.abs(c.x - bx) < 0.02 && Math.abs(c.y - by) < 0.02) return false;
      return true;
    });

    // Build polygon: A → visible corners CW → B → curve B→A
    const poly = [];

    // Start at anchor A
    poly.push(pct(ax) + ' ' + pct(ay));

    // Add visible corners (CW order: TL → BL → BR)
    visCorners.forEach(c => poly.push((c.x * 100) + '% ' + (c.y * 100) + '%'));

    // Anchor B
    poly.push(pct(bx) + ' ' + pct(by));

    // Curve from B back to A (closing the polygon)
    for (let i = 1; i <= N; i++) {
      const u = i / N;
      const pt = bezierPt(u, bx, by, ctrlX, ctrlY, ax, ay);
      poly.push(pct(pt.x) + ' ' + pct(pt.y));
    }

    return 'polygon(' + poly.join(', ') + ')';
  }

  /* ── Build the fold-back (hidden side) clip-path ── */
  /* The fold-back is a narrow crescent strip along the fold
     crease — NOT the entire hidden half of the page. It shows
     only the curled-over paper, so the next page is visible
     in the rest of the turned-away area. */
  function buildFoldBackClip(t) {
    if (t <= 0.005) return 'polygon(100% 0%, 100% 0%, 100% 0%)';
    if (t >= 0.995) return 'polygon(0% 0%, 0% 0%, 0% 0%)';

    const { ax, ay, bx, by, ctrlX, ctrlY } = getFoldAnchors(t);
    const N = 24;

    // Strip width: peaks mid-turn, narrow at start/end
    var maxWidth = 0.18;
    var foldWidth = maxWidth * Math.sin(t * Math.PI);

    // Perpendicular toward hidden side (CW = top-right quadrant)
    var dx = bx - ax;
    var dy = by - ay;
    var len = Math.sqrt(dx * dx + dy * dy) || 1;
    var hnx = dy / len;
    var hny = -dx / len;

    // Build crescent: fold curve A→B, then offset curve B→A
    var poly = [];

    // Forward: A → B along fold curve
    for (var i = 0; i <= N; i++) {
      var u = i / N;
      var pt = bezierPt(u, ax, ay, ctrlX, ctrlY, bx, by);
      poly.push(pct(pt.x) + ' ' + pct(pt.y));
    }

    // Backward: B → A along offset curve (shifted toward hidden side)
    for (var j = N; j >= 0; j--) {
      var u2 = j / N;
      var pt2 = bezierPt(u2, ax, ay, ctrlX, ctrlY, bx, by);
      // Width tapers near anchor ends, wider in the middle of the curve
      var edgeFactor = Math.sin(u2 * Math.PI);
      var localWidth = foldWidth * (0.35 + 0.65 * edgeFactor);
      var ox = Math.max(0, Math.min(1, pt2.x + hnx * localWidth));
      var oy = Math.max(0, Math.min(1, pt2.y + hny * localWidth));
      poly.push(pct(ox) + ' ' + pct(oy));
    }

    return 'polygon(' + poly.join(', ') + ')';
  }

  /* ═══════════════════════════════════════════════════
     SCROLL TRIGGER — Pinned book with page turns
     ═══════════════════════════════════════════════════ */

  const pageHeight = window.innerHeight;
  const totalScroll = pageHeight * totalTurns;

  /* In embedded mode, pin the entire open-book-layout (cover, spines,
     gutter, content) so nothing visibly scrolls — the scroll only
     drives the fold animation. In standalone mode, pin .book-pages. */
  var pinTarget = isEmbedded
    ? document.querySelector('.open-book-layout')
    : bookPages;

  function createScrollPin() {
    /* Zero out layout padding before ScrollTrigger measures the element.
       The --bookshelf-padding-y spacing is already baked into the sticky
       elements' top values and spine heights, so removing the layout
       padding doesn't change the visual appearance while pinned —
       but it prevents the spacer from adding extra post-pin scroll. */
    if (isEmbedded) {
      pinTarget.style.paddingTop = '0';
    }

    ScrollTrigger.create({
      trigger: pinTarget,
      start: 'top top',
      end: '+=' + totalScroll,
      pin: true,
      pinSpacing: true,
      onUpdate: function (self) {
        var progress = self.progress; // 0 → 1

        pages.forEach(function (page, i) {
          if (i >= totalTurns) return; // last page never turns

          // Local progress for this page's turn
          var pageStart = i / totalTurns;
          var pageEnd = (i + 1) / totalTurns;
          var t;

          if (progress <= pageStart) t = 0;
          else if (progress >= pageEnd) t = 1;
          else t = (progress - pageStart) / (pageEnd - pageStart);

          // Apply main clip-path (visible area shrinks as page turns)
          var clip = buildFoldClip(t);
          if (clip) {
            page.style.clipPath = clip;
            page.classList.add('is-turning');
          } else {
            page.style.clipPath = '';
            page.classList.remove('is-turning');
          }

          // Fold-back overlay (now a sibling, not a child)
          var foldEl = foldOverlays[i];
          if (foldEl) {
            if (t > 0.01 && t < 0.99) {
              var anchors = getFoldAnchors(t);
              var foldClip = buildFoldBackClip(t);
              foldEl.style.clipPath = foldClip;
              // Opacity: ramps up quickly and stays solid through the turn
              // The back of a page is opaque paper — it fades in/out only
              // at the very start/end to avoid a hard pop
              var foldOpacity = Math.min(1, Math.sin(t * Math.PI) * 3);
              foldEl.style.opacity = foldOpacity.toFixed(3);

              // Dynamic gradient angle: perpendicular to fold crease
              var creaseAngle = Math.atan2(anchors.by - anchors.ay, anchors.bx - anchors.ax) * (180 / Math.PI);
              var gradAngle = (creaseAngle + 90).toFixed(1);
              var foldInner = foldEl.querySelector('.book-fold-inner');
              if (foldInner) {
                // Solid paper back + fold-shadow shading on top
                // The back of a page is opaque — never transparent
                foldInner.style.background =
                  'linear-gradient(' + gradAngle + 'deg, ' +
                  'rgba(0,0,0,0.10) 0%, ' +       // shadow near fold crease
                  'rgba(0,0,0,0.03) 20%, ' +       // fades quickly
                  'transparent 45%, ' +             // paper color shows through
                  'rgba(255,255,255,0.06) 80%), ' + // subtle highlight far edge
                  'var(--fold-bg, #f5f0e8)';        // solid opaque paper base
              }
            } else {
              foldEl.style.opacity = '0';
              foldEl.style.clipPath = '';
            }
          }
        });

        // Update active page indicator
        var activePage = Math.min(
          Math.floor(progress * totalTurns + 0.5),
          totalTurns
        );
        setActivePage(activePage);
      }
    });
  }

  /* On the bookshelf page (index.html), the open-book-layout starts
     hidden (display:none). ScrollTrigger cannot measure a hidden element,
     so defer creation until bookshelf.js reveals the layout.
     On sub-pages the layout is visible immediately — create now. */
  if (isEmbedded && !pinTarget.offsetParent) {
    window._initBookFlipPin = createScrollPin;
  } else {
    createScrollPin();
  }

  /* ═══════════════════════════════════════════════════
     NAVIGATION — Bookmark & dot click
     ═══════════════════════════════════════════════════ */

  function scrollToPage(idx) {
    var st = ScrollTrigger.getAll().find(function(s) { return s.trigger === pinTarget; });
    var pinStart = st ? st.start : 0;
    var target = pinStart + idx * pageHeight;
    window.scrollTo({ top: target, behavior: 'smooth' });
  }

  bookmarks.forEach(function (tab, i) {
    tab.addEventListener('click', function () {
      scrollToPage(i);
    });
  });

  progressDots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      scrollToPage(i);
    });
  });

})();
