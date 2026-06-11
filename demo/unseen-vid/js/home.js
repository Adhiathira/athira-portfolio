// home.js — Hero sub-headline word reveal
// Triggers the translateY(100%) → translateY(0) animation per .hero__word span
// Transition is defined in home.css; this script only sets delay and triggers the reveal.

(function initHeroReveal() {
  function reveal() {
    var words = document.querySelectorAll('.hero__word');
    words.forEach(function (word) {
      var index = parseInt(word.getAttribute('data-word-index') || '0', 10);
      word.style.transitionDelay = (index * 80) + 'ms';
      word.style.transform = 'translateY(0)';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', reveal);
  } else {
    reveal();
  }
})();

// ── Gallery: The Community Witnessed ─────────────────────────────────────────

var galleryData = [
  { username: 'maya_v',  displayName: 'Maya V.',  points: 1240, mediaType: 'video',     thumbnailSrc: null, videoPreviewSrc: null },
  { username: 'tomm_r',  displayName: 'Tomm R.',  points: 890,  mediaType: 'video',     thumbnailSrc: null, videoPreviewSrc: null },
  { username: 'lena_f',  displayName: 'Lena F.',  points: 3100, mediaType: 'video',     thumbnailSrc: null, videoPreviewSrc: null },
  { username: 'ade_k',   displayName: 'Ade K.',   points: 560,  mediaType: 'animation', thumbnailSrc: null, videoPreviewSrc: null },
  { username: 'sara_b',  displayName: 'Sara B.',  points: 2200, mediaType: 'video',     thumbnailSrc: null, videoPreviewSrc: null },
  { username: 'juno_x',  displayName: 'Juno X.',  points: 4500, mediaType: 'film',      thumbnailSrc: null, videoPreviewSrc: null },
];

/**
 * formatPoints — formats integer to "1,240 pts"
 */
function formatPoints(n) {
  return n.toLocaleString('en-US') + ' pts';
}

/**
 * clearChildren — safely removes all child nodes from an element
 */
function clearChildren(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

/**
 * buildPlaceholderDiv — returns a visible placeholder div for a missing thumbnail
 * Never uses src="" — always a visible div with the asset filename shown.
 */
function buildPlaceholderDiv(username) {
  var div = document.createElement('div');
  div.className = 'gallery-card__placeholder';
  div.style.cssText = [
    'width:100%',
    'height:100%',
    'background:var(--color-text-body)',
    'display:flex',
    'align-items:center',
    'justify-content:center',
    'color:var(--color-bg)',
    'font-family:var(--font-primary)',
    'font-size:var(--type-button)',
  ].join(';');
  div.textContent = '[' + username + '-thumb.jpg]';
  return div;
}

/**
 * buildBaseMedia — returns the base media node for a creator card.
 * img element if thumbnailSrc is available, visible placeholder div otherwise.
 * Used for both initial render and hover-out restore.
 */
function buildBaseMedia(creator) {
  if (creator.thumbnailSrc) {
    var img = document.createElement('img');
    img.className = 'gallery-card__media';
    img.src = creator.thumbnailSrc;
    img.alt = creator.displayName + ' creation';
    return img;
  }
  return buildPlaceholderDiv(creator.username);
}

/**
 * buildGalleryCard — returns a real populated .gallery-card element
 * Never uses src="" — always a visible placeholder div if thumbnailSrc is null.
 */
function buildGalleryCard(creator) {
  var card = document.createElement('div');
  card.className = 'gallery-card';
  card.setAttribute('data-username', creator.username);
  card.setAttribute('data-media-type', creator.mediaType);

  card.appendChild(buildBaseMedia(creator));

  // Hover overlay (opacity driven by CSS — no JS needed)
  var overlay = document.createElement('div');
  overlay.className = 'gallery-card__overlay';

  var creatorName = document.createElement('span');
  creatorName.className = 'gallery-card__creator';
  creatorName.textContent = creator.displayName;

  var pts = document.createElement('span');
  pts.className = 'gallery-card__points';
  pts.textContent = formatPoints(creator.points);

  overlay.appendChild(creatorName);
  overlay.appendChild(pts);
  card.appendChild(overlay);

  // Video preview on hover (only if videoPreviewSrc is set)
  if (creator.videoPreviewSrc) {
    card.addEventListener('mouseenter', function () {
      var video = document.createElement('video');
      video.className = 'gallery-card__media';
      video.src = creator.videoPreviewSrc;
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      var existing = card.querySelector('.gallery-card__media, .gallery-card__placeholder');
      if (existing) {
        card.replaceChild(video, existing);
      }
    });
    card.addEventListener('mouseleave', function () {
      var video = card.querySelector('video');
      if (video) {
        video.pause();
        card.replaceChild(buildBaseMedia(creator), video);
      }
    });
  }

  return card;
}

/**
 * renderGallery — populates #gallery-grid
 * Shows skeletons first, then replaces with real cards after 1200ms.
 * @param {string} [filter='video'] — mediaType to show ('video' initially)
 */
function renderGallery(filter) {
  var grid = document.getElementById('gallery-grid');
  if (!grid) { return; }

  var activeFilter = filter || 'video';
  var filtered = galleryData.filter(function (c) { return c.mediaType === activeFilter; });

  // Show 6 skeleton cards while "loading"
  clearChildren(grid);
  var skeletonCount = 6;
  for (var i = 0; i < skeletonCount; i++) {
    var skel = document.createElement('div');
    skel.className = 'gallery-card gallery-card--skeleton';
    grid.appendChild(skel);
  }

  // After 1200ms, replace skeletons with real cards
  setTimeout(function () {
    clearChildren(grid);
    if (filtered.length === 0) {
      // No cards for this filter — show empty state (coming soon)
      var empty = document.createElement('p');
      empty.style.cssText = 'grid-column:1/-1;text-align:center;font-family:var(--font-primary);font-size:var(--type-body);color:var(--color-text-muted);padding:var(--space-header-h) 0;';
      empty.textContent = 'Coming soon.';
      grid.appendChild(empty);
    } else {
      filtered.forEach(function (creator) {
        grid.appendChild(buildGalleryCard(creator));
      });
    }
  }, 1200);
}

/**
 * initGalleryFilters — wires up active filter chip click handlers
 */
function initGalleryFilters() {
  var chips = document.querySelectorAll('.gallery-filter__chip:not(.gallery-filter__chip--coming-soon)');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      // Update active chip state
      document.querySelectorAll('.gallery-filter__chip').forEach(function (c) {
        c.classList.remove('gallery-filter__chip--active');
        c.setAttribute('aria-selected', 'false');
      });
      chip.classList.add('gallery-filter__chip--active');
      chip.setAttribute('aria-selected', 'true');

      // Re-render with new filter
      var filterValue = chip.getAttribute('data-filter') || 'video';
      renderGallery(filterValue);
    });
  });
}

// Init gallery on DOMContentLoaded
(function initGallery() {
  function start() {
    renderGallery('video');
    initGalleryFilters();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();


// ── Community counter animation ───────────────────────────────────────────────
// Fires once when .community-stat__number scrolls into view.
// Easing matches --ease-reveal: cubic-bezier(0.16, 1, 0.3, 1) from motion.json.
// Duration matches --duration-reveal: 1s from tokens.css.

(function initCounterAnimation() {
  var counterEl = document.querySelector('.community-stat__number');
  if (!counterEl) { return; }

  var target = parseInt(counterEl.getAttribute('data-target'), 10);
  var duration = 1000; // 1s — matches --duration-reveal

  // Cubic bezier solver for cubic-bezier(0.16, 1, 0.3, 1) from motion.json.
  // This is the same easing used for kinetic span reveals (--ease-reveal).
  // Implements the standard cubic bezier parametric formula:
  //   P(t) = (1-t)^3*P0 + 3*(1-t)^2*t*P1 + 3*(1-t)*t^2*P2 + t^3*P3
  // where P0=(0,0), P1=(0.16,1), P2=(0.3,1), P3=(1,1) for the Y axis,
  // and   P0=(0,0), P1=(0.16,0), P2=(0.3,0), P3=(1,1) for the X axis.
  // We solve X(t)=progress iteratively to find t, then evaluate Y(t).
  var P1x = 0.16, P1y = 1.0;
  var P2x = 0.30, P2y = 1.0;

  function cubicBezierX(t) {
    var mt = 1 - t;
    return 3 * mt * mt * t * P1x + 3 * mt * t * t * P2x + t * t * t;
  }

  function cubicBezierY(t) {
    var mt = 1 - t;
    return 3 * mt * mt * t * P1y + 3 * mt * t * t * P2y + t * t * t;
  }

  // Newton-Raphson solve for t given x — converges quickly for well-behaved curves
  function solveBezierT(x) {
    var t = x; // initial guess
    for (var i = 0; i < 8; i++) {
      var xCurrent = cubicBezierX(t) - x;
      var mt = 1 - t;
      var slope = 3 * mt * mt * P1x + 6 * mt * t * P2x + 3 * t * t;
      if (Math.abs(slope) < 1e-6) { break; }
      t -= xCurrent / slope;
    }
    return Math.max(0, Math.min(1, t));
  }

  function easeReveal(progress) {
    if (progress <= 0) { return 0; }
    if (progress >= 1) { return 1; }
    return cubicBezierY(solveBezierT(progress));
  }

  var announceEl = document.querySelector('.community-stat__announce');
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var started = false;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !started) {
        started = true;

        var finalText = target.toLocaleString('en-US');

        if (prefersReduced) {
          counterEl.textContent = finalText;
          if (announceEl) { announceEl.textContent = finalText + ' creators making things today'; }
          observer.unobserve(entry.target);
          return;
        }

        var startTime = performance.now();

        function tick(now) {
          var elapsed = now - startTime;
          var progress = Math.min(elapsed / duration, 1);
          var eased = easeReveal(progress);
          counterEl.textContent = Math.round(eased * target).toLocaleString('en-US');
          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            counterEl.textContent = finalText;
            if (announceEl) { announceEl.textContent = finalText + ' creators making things today'; }
          }
        }

        requestAnimationFrame(tick);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(counterEl);
})();
