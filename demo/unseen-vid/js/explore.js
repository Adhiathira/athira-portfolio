// explore.js — Explore page gallery, filter chips, and scroll-depth CTA banner
// for unseen-vid.
// Depends on: shared.js (requireAuth, initNav)

// ── Dataset ───────────────────────────────────────────────────────────────────

var exploreData = [
  { username: 'maya_v',  displayName: 'Maya V.',  points: 1240, mediaType: 'video',     thumbnailSrc: null, videoPreviewSrc: null },
  { username: 'tomm_r',  displayName: 'Tomm R.',  points: 890,  mediaType: 'video',     thumbnailSrc: null, videoPreviewSrc: null },
  { username: 'lena_f',  displayName: 'Lena F.',  points: 3100, mediaType: 'video',     thumbnailSrc: null, videoPreviewSrc: null },
  { username: 'ade_k',   displayName: 'Ade K.',   points: 560,  mediaType: 'animation', thumbnailSrc: null, videoPreviewSrc: null },
  { username: 'sara_b',  displayName: 'Sara B.',  points: 2200, mediaType: 'video',     thumbnailSrc: null, videoPreviewSrc: null },
  { username: 'juno_x',  displayName: 'Juno X.',  points: 4500, mediaType: 'film',      thumbnailSrc: null, videoPreviewSrc: null },
  { username: 'petra_m', displayName: 'Petra M.', points: 780,  mediaType: 'video',     thumbnailSrc: null, videoPreviewSrc: null },
  { username: 'omar_h',  displayName: 'Omar H.',  points: 1890, mediaType: 'video',     thumbnailSrc: null, videoPreviewSrc: null },
  { username: 'cleo_r',  displayName: 'Cleo R.',  points: 3400, mediaType: 'animation', thumbnailSrc: null, videoPreviewSrc: null },
  { username: 'finn_a',  displayName: 'Finn A.',  points: 670,  mediaType: 'video',     thumbnailSrc: null, videoPreviewSrc: null },
  { username: 'yuki_t',  displayName: 'Yuki T.',  points: 2100, mediaType: 'video',     thumbnailSrc: null, videoPreviewSrc: null },
  { username: 'dom_b',   displayName: 'Dom B.',   points: 5200, mediaType: 'film',      thumbnailSrc: null, videoPreviewSrc: null },
];


// ── Utilities ─────────────────────────────────────────────────────────────────

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
  while (el.firstChild) { el.removeChild(el.firstChild); }
}

/**
 * buildPlaceholderDiv — returns a visible placeholder div for a missing thumbnail.
 * Displays the expected asset filename so the missing file is named explicitly.
 * Never uses an empty src or a silent grey box.
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
 * img element if thumbnailSrc is available; visible placeholder div otherwise.
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


// ── Card builder ──────────────────────────────────────────────────────────────

/**
 * buildExploreGalleryCard — returns a populated .gallery-card for the Explore page.
 *
 * Key difference from home.js buildGalleryCard:
 *   - Creator name in overlay is an <a> link to /creators/[username].html,
 *     not a bare <span>.
 *
 * Video preview hover swap fires only when videoPreviewSrc is set.
 */
function buildExploreGalleryCard(creator) {
  var card = document.createElement('div');
  card.className = 'gallery-card';
  card.setAttribute('data-username', creator.username);
  card.setAttribute('data-media-type', creator.mediaType);

  card.appendChild(buildBaseMedia(creator));

  // Hover overlay — opacity driven by CSS (.gallery-card:hover .gallery-card__overlay)
  var overlay = document.createElement('div');
  overlay.className = 'gallery-card__overlay';

  // Creator name as a link to the creator profile page
  var creatorLink = document.createElement('a');
  creatorLink.className = 'gallery-card__creator-link';
  creatorLink.href = '/creators/' + creator.username + '.html';
  creatorLink.textContent = creator.displayName;

  var pts = document.createElement('span');
  pts.className = 'gallery-card__points';
  pts.textContent = formatPoints(creator.points);

  overlay.appendChild(creatorLink);
  overlay.appendChild(pts);
  card.appendChild(overlay);

  // Video preview on hover — only if videoPreviewSrc is set
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
      if (existing) { card.replaceChild(video, existing); }
    });
    card.addEventListener('mouseleave', function () {
      var video = card.querySelector('video');
      if (video) { video.pause(); card.replaceChild(buildBaseMedia(creator), video); }
    });
  }

  return card;
}


// ── Scroll-depth CTA ──────────────────────────────────────────────────────────

/**
 * initScrollDepthCTA — attaches an IntersectionObserver to the sentinel element.
 * When the sentinel enters the viewport the CTA banner slides up from the bottom.
 * Observer fires once only; the banner remains visible after that.
 *
 * IMPORTANT: The banner must NOT be visible on page load. It only appears after
 * the sentinel is intersected.
 */
function initScrollDepthCTA(sentinel) {
  var ctaBanner = document.querySelector('.explore-cta-banner');
  if (!ctaBanner || !sentinel) { return; }

  // Use a scroll listener rather than IntersectionObserver.
  // IntersectionObserver fires on attachment with current state — if the sentinel
  // is already within the viewport (common on large screens with ≤8 cards), it
  // would trigger the banner before the user scrolls at all.
  // A scroll listener only fires after actual user input, correctly representing
  // "the user has demonstrated scroll intent past the 6th gallery card."
  var triggered = false;

  function checkScrollDepth() {
    if (triggered) { return; }
    var rect = sentinel.getBoundingClientRect();
    // Trigger when the top of the sentinel has passed the midpoint of the viewport
    if (rect.top < window.innerHeight * 0.75) {
      triggered = true;
      ctaBanner.classList.add('explore-cta-banner--visible');
      ctaBanner.removeAttribute('aria-hidden');
      window.removeEventListener('scroll', checkScrollDepth);
    }
  }

  window.addEventListener('scroll', checkScrollDepth, { passive: true });
}


// ── Gallery renderer ──────────────────────────────────────────────────────────

/**
 * renderExploreGallery — populates #explore-gallery-grid.
 *
 * Flow:
 *   1. Show skeleton cards immediately (count = min(filtered.length, 6) or 6).
 *   2. After 1200ms, replace with real cards.
 *   3. Insert the sentinel element inside the grid after the 6th card
 *      (grid-column: 1 / -1) and attach the IntersectionObserver via
 *      initScrollDepthCTA(). If fewer than 6 cards exist, sentinel goes at end.
 *
 * @param {string} [filter='video'] — mediaType value to show
 */
function renderExploreGallery(filter) {
  var grid = document.getElementById('explore-gallery-grid');
  if (!grid) { return; }

  var activeFilter = filter || 'video';
  var filtered = exploreData.filter(function (c) { return c.mediaType === activeFilter; });

  // Show skeletons immediately
  clearChildren(grid);
  var skeletonCount = Math.min(filtered.length || 6, 6);
  for (var i = 0; i < skeletonCount; i++) {
    var skel = document.createElement('div');
    skel.className = 'gallery-card gallery-card--skeleton';
    grid.appendChild(skel);
  }

  // Replace with real cards after simulated load delay
  setTimeout(function () {
    clearChildren(grid);

    if (filtered.length === 0) {
      // Empty state for "Coming Soon" filters
      var empty = document.createElement('p');
      empty.style.cssText = 'grid-column:1/-1;text-align:center;font-family:var(--font-primary);font-size:var(--type-body);color:var(--color-text-muted);padding:var(--space-header-h) 0;';
      empty.textContent = 'Coming soon.';
      grid.appendChild(empty);
    } else {
      filtered.forEach(function (creator, index) {
        grid.appendChild(buildExploreGalleryCard(creator));

        // Insert sentinel inside the grid after the 6th card (index 5)
        // so it spans all 3 columns and triggers the CTA at the right scroll depth
        if (index === 5) {
          var sentinel = document.createElement('div');
          sentinel.className = 'gallery-sentinel';
          sentinel.style.gridColumn = '1 / -1';
          sentinel.setAttribute('aria-hidden', 'true');
          grid.appendChild(sentinel);
          initScrollDepthCTA(sentinel);
        }
      });

      // Fewer than 6 cards — place sentinel at end of grid if not already inserted
      if (filtered.length < 6) {
        var sentinel = grid.querySelector('.gallery-sentinel');
        if (!sentinel) {
          sentinel = document.createElement('div');
          sentinel.className = 'gallery-sentinel';
          sentinel.style.gridColumn = '1 / -1';
          sentinel.setAttribute('aria-hidden', 'true');
          grid.appendChild(sentinel);
          initScrollDepthCTA(sentinel);
        }
      }
    }
  }, 1200);
}


// ── Filter chips ──────────────────────────────────────────────────────────────

/**
 * initExploreFilters — wires active filter chip click handlers.
 * Coming-soon chips are excluded via :not(.gallery-filter__chip--coming-soon).
 */
function initExploreFilters() {
  var chips = document.querySelectorAll('.gallery-filter__chip:not(.gallery-filter__chip--coming-soon)');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      // Update active chip state across all chips
      document.querySelectorAll('.gallery-filter__chip').forEach(function (c) {
        c.classList.remove('gallery-filter__chip--active');
        c.setAttribute('aria-selected', 'false');
      });
      chip.classList.add('gallery-filter__chip--active');
      chip.setAttribute('aria-selected', 'true');

      var filterValue = chip.getAttribute('data-filter') || 'video';
      renderExploreGallery(filterValue);
    });
  });
}


// ── Init ──────────────────────────────────────────────────────────────────────

(function initExplorePage() {
  function start() {
    renderExploreGallery('video');
    initExploreFilters();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
