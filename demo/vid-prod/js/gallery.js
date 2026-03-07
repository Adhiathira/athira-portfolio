/**
 * gallery.js — vid-prod
 * Reusable creator gallery module.
 *
 * Renders a filtered, skeleton-loaded grid of creator cards.
 * All styling is handled by gallery.css — no inline styles written here.
 *
 * Public API:
 *   initGallery(containerEl, data, options)
 *     containerEl {HTMLElement} — wrapper element to render into
 *     data        {Array}       — array of creator objects (see data/creators.js for shape)
 *     options     {Object}      — {
 *       showFilters:      boolean        (default: true)
 *       filtersContainer: HTMLElement    (optional) — render filter bar into this element
 *                                                     instead of prepending to containerEl
 *       onCardClick:      Function       (optional) — called with creator object on card click
 *     }
 */

import { isLoggedIn } from './auth.js';

// ---------------------------------------------------------------------------
// Badge class mapping
// ---------------------------------------------------------------------------

/** @type {Record<string, string>} */
const BADGE_CLASS = {
  Video:     'gallery-card__badge--video',
  Animation: 'gallery-card__badge--animation',
  Film:      'gallery-card__badge--film',
};

// ---------------------------------------------------------------------------
// clearElement
// ---------------------------------------------------------------------------

/**
 * Removes all child nodes from an element without using innerHTML.
 *
 * @param {HTMLElement} el
 */
function clearElement(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

// ---------------------------------------------------------------------------
// renderSkeletons
// ---------------------------------------------------------------------------

/**
 * Renders placeholder skeleton cards into containerEl while real data loads.
 *
 * Creates a `.gallery-grid` div, appends `count` skeleton cards to it,
 * then appends the grid to containerEl.
 *
 * @param {HTMLElement} containerEl
 * @param {number}      count
 */
function renderSkeletons(containerEl, count) {
  const grid = document.createElement('div');
  grid.className = 'gallery-grid';

  for (let i = 0; i < count; i++) {
    const skeleton = document.createElement('div');
    skeleton.className = 'gallery-card gallery-card--skeleton';
    grid.appendChild(skeleton);
  }

  containerEl.appendChild(grid);
}

// ---------------------------------------------------------------------------
// renderCards
// ---------------------------------------------------------------------------

/**
 * Builds a single creator card element from a creator data object.
 *
 * @param {Object}        creator
 * @param {string}        creator.username
 * @param {string}        creator.displayName
 * @param {number}        creator.communityPoints
 * @param {string}        creator.mediaType
 * @param {string|null}   creator.videoSrc
 * @param {Function|null} [onCardClick]  — optional click handler, called with creator object
 * @returns {HTMLElement}
 */
function buildCard(creator, onCardClick) {
  const { username, displayName, communityPoints, mediaType, videoSrc } = creator;

  const article = document.createElement('article');
  article.className = 'gallery-card';
  article.dataset.mediaType = mediaType;

  // Media region
  const mediaDiv = document.createElement('div');
  mediaDiv.className = 'gallery-card__media';

  const placeholder = document.createElement('div');
  placeholder.className = 'gallery-card__placeholder';
  placeholder.textContent = `[${username}-thumb.mp4]`;

  mediaDiv.appendChild(placeholder);

  // Overlay: left group (name + points) and follow button on the right
  const overlay = document.createElement('div');
  overlay.className = 'gallery-card__overlay';

  const nameSpan = document.createElement('span');
  nameSpan.className = 'gallery-card__name';
  nameSpan.textContent = displayName;

  const pointsSpan = document.createElement('span');
  pointsSpan.className = 'gallery-card__points';
  pointsSpan.textContent = `${communityPoints.toLocaleString()} pts`;

  // Left group: name stacked above points
  const leftGroup = document.createElement('div');
  leftGroup.className = 'gallery-card__overlay-left';
  leftGroup.appendChild(nameSpan);
  leftGroup.appendChild(pointsSpan);

  // Follow button
  const followBtn = document.createElement('button');
  followBtn.className = 'gallery-card__follow';
  followBtn.textContent = 'Follow';

  followBtn.addEventListener('click', (e) => {
    e.stopPropagation();

    if (isLoggedIn()) {
      followBtn.textContent = 'Following!';
      followBtn.disabled = true;
      followBtn.classList.add('gallery-card__follow--following');
      setTimeout(() => {
        followBtn.textContent = 'Follow';
        followBtn.disabled = false;
        followBtn.classList.remove('gallery-card__follow--following');
      }, 1500);
    } else {
      window.location.href = '/login.html?returnTo=' + encodeURIComponent(window.location.pathname);
    }
  });

  overlay.appendChild(leftGroup);
  overlay.appendChild(followBtn);

  // Badge
  const badgeClass = BADGE_CLASS[mediaType] || 'gallery-card__badge--video';
  const badge = document.createElement('span');
  badge.className = `gallery-card__badge ${badgeClass}`;
  badge.textContent = mediaType;

  article.appendChild(mediaDiv);
  article.appendChild(overlay);
  article.appendChild(badge);

  // Optional card-level click handler
  if (typeof onCardClick === 'function') {
    article.addEventListener('click', () => {
      onCardClick(creator);
    });
  }

  // Attach hover/video behaviour (handles null gracefully)
  attachVideoHover(article, videoSrc);

  return article;
}

/**
 * Clears the existing `.gallery-grid` inside containerEl and renders real
 * creator cards in its place.
 *
 * @param {HTMLElement}   containerEl
 * @param {Array}         data
 * @param {Function|null} [onCardClick]  — optional click handler passed through to buildCard
 */
function renderCards(containerEl, data, onCardClick) {
  const existingGrid = containerEl.querySelector('.gallery-grid');
  const grid = existingGrid || document.createElement('div');
  grid.className = 'gallery-grid';

  // Remove all skeleton nodes
  clearElement(grid);

  data.forEach((creator) => {
    const card = buildCard(creator, onCardClick);
    grid.appendChild(card);
  });

  // If the grid was freshly created (no skeletons were rendered), attach it
  if (!existingGrid) {
    containerEl.appendChild(grid);
  }
}

// ---------------------------------------------------------------------------
// applyFilter
// ---------------------------------------------------------------------------

/**
 * Filters the `.gallery-grid` inside containerEl by mediaType.
 * Cards matching filterValue are shown; all others are hidden.
 *
 * @param {HTMLElement} containerEl
 * @param {string}      filterValue  — e.g. "Video"
 */
function applyFilter(containerEl, filterValue) {
  const grid = containerEl.querySelector('.gallery-grid');
  if (!grid) return;

  grid.querySelectorAll('.gallery-card').forEach((card) => {
    card.style.display =
      card.dataset.mediaType === filterValue ? '' : 'none';
  });
}

// ---------------------------------------------------------------------------
// initFilters
// ---------------------------------------------------------------------------

/**
 * Creates a `.gallery-filters` bar and mounts it.
 *
 * If `filtersEl` is provided, the bar is appended to it (Explore page pattern,
 * where filters live in a separate section outside the gallery container).
 * If `filtersEl` is omitted/null, the bar is prepended to `containerEl`
 * (homepage pattern — existing behaviour, unchanged).
 *
 * Filter buttons:
 *   Video     — active, filters cards to mediaType "Video"
 *   Animation — disabled, coming soon
 *   Film      — disabled, coming soon
 *
 * @param {HTMLElement}       containerEl
 * @param {Array}             data        — kept for potential future use; filtering reads live DOM
 * @param {HTMLElement|null}  [filtersEl] — optional separate mount target for the filter bar
 */
function initFilters(containerEl, data, filtersEl) {
  const filtersDiv = document.createElement('div');
  filtersDiv.className = 'gallery-filters';

  // --- Video button (active) ---
  const videoBtn = document.createElement('button');
  videoBtn.className = 'filter-btn filter-btn--active';
  videoBtn.dataset.filter = 'Video';
  videoBtn.textContent = 'Video';

  videoBtn.addEventListener('click', () => {
    applyFilter(containerEl, videoBtn.dataset.filter);

    // Toggle active state across all filter buttons
    filtersDiv.querySelectorAll('.filter-btn').forEach((btn) => {
      btn.classList.remove('filter-btn--active');
    });
    videoBtn.classList.add('filter-btn--active');
  });

  // --- Animation button (disabled, coming soon) ---
  const animationBtn = document.createElement('button');
  animationBtn.className = 'filter-btn filter-btn--disabled';
  animationBtn.dataset.filter = 'Animation';
  animationBtn.disabled = true;

  const animationLabel = document.createTextNode('Animation ');
  const animationBadge = document.createElement('span');
  animationBadge.className = 'coming-soon';
  animationBadge.textContent = 'Coming Soon';

  animationBtn.appendChild(animationLabel);
  animationBtn.appendChild(animationBadge);

  // --- Film button (disabled, coming soon) ---
  const filmBtn = document.createElement('button');
  filmBtn.className = 'filter-btn filter-btn--disabled';
  filmBtn.dataset.filter = 'Film';
  filmBtn.disabled = true;

  const filmLabel = document.createTextNode('Film ');
  const filmBadge = document.createElement('span');
  filmBadge.className = 'coming-soon';
  filmBadge.textContent = 'Coming Soon';

  filmBtn.appendChild(filmLabel);
  filmBtn.appendChild(filmBadge);

  filtersDiv.appendChild(videoBtn);
  filtersDiv.appendChild(animationBtn);
  filtersDiv.appendChild(filmBtn);

  // Mount: use the dedicated filtersEl if provided, otherwise prepend to containerEl
  if (filtersEl) {
    filtersEl.appendChild(filtersDiv);
  } else {
    containerEl.prepend(filtersDiv);
  }
}

// ---------------------------------------------------------------------------
// attachVideoHover
// ---------------------------------------------------------------------------

/**
 * Wires hover-to-play behaviour on a card element.
 *
 * When videoSrc is null (all current placeholder cards) the function returns
 * immediately — no video element is created and no event listeners are added.
 *
 * When videoSrc is provided (future cards with real media):
 *   mouseenter → video.play()
 *   mouseleave → video.pause(), reset currentTime to 0
 *
 * @param {HTMLElement}  cardEl
 * @param {string|null}  videoSrc
 */
function attachVideoHover(cardEl, videoSrc) {
  if (!videoSrc) return;

  const video = document.createElement('video');
  video.src = videoSrc;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.className = 'gallery-card__video';

  const mediaDiv = cardEl.querySelector('.gallery-card__media');
  if (mediaDiv) {
    mediaDiv.appendChild(video);
  }

  cardEl.addEventListener('mouseenter', () => {
    video.play().catch(() => {
      // Autoplay may be blocked in some browsers — fail silently
    });
  });

  cardEl.addEventListener('mouseleave', () => {
    video.pause();
    video.currentTime = 0;
  });
}

// ---------------------------------------------------------------------------
// initGallery — public API
// ---------------------------------------------------------------------------

/**
 * Initialises the creator gallery inside the given container element.
 *
 * Sequence:
 *   1. Render skeleton cards immediately (count = data.length)
 *   2. After 300 ms, swap skeletons for real creator cards
 *   3. If options.showFilters !== false, mount the filter bar
 *
 * @param {HTMLElement} containerEl
 * @param {Array}       data         - creator objects (see data/creators.js)
 * @param {Object}      [options={}]
 * @param {boolean}     [options.showFilters=true]
 * @param {HTMLElement} [options.filtersContainer] — if provided, filter bar is appended here
 *                                                   instead of prepended to containerEl
 * @param {Function}    [options.onCardClick]      — called with creator object when a card is clicked
 */
export function initGallery(containerEl, data, options = {}) {
  renderSkeletons(containerEl, data.length);

  setTimeout(() => {
    renderCards(containerEl, data, options.onCardClick);

    if (options.showFilters !== false) {
      initFilters(containerEl, data, options.filtersContainer || null);
    }

    // Apply the default active filter so initial render matches the UI state.
    // All current seed data is Video; Film/Animation cards are hidden immediately.
    applyFilter(containerEl, 'Video');
  }, 300);
}
