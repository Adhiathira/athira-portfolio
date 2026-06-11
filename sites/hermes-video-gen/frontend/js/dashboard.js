import { api } from './api.js';

// Auth guard — must be first
if (!sessionStorage.getItem('auth_token')) {
  window.location.href = '/auth.html';
  throw new Error('Not authenticated'); // halt module execution
}

// View switching
const navLinks = document.querySelectorAll('.dash-nav__link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(l => l.classList.remove('dash-nav__link--active'));
    link.classList.add('dash-nav__link--active');
    const target = link.dataset.view;
    document.querySelectorAll('.dash-view').forEach(v => {
      v.hidden = v.id !== `view-${target}`;
    });
  });
});

// Sign out
document.getElementById('btn-logout').addEventListener('click', () => {
  sessionStorage.removeItem('auth_token');
  sessionStorage.removeItem('auth_user');
  window.location.href = '/';
});

// Render video grid
async function loadVideos() {
  const videos = await api.get('/api/videos');
  renderGrid(videos);
}

function renderGrid(videos) {
  const grid = document.getElementById('video-grid');
  const empty = document.getElementById('empty-state');
  grid.innerHTML = '';
  if (videos.length === 0) {
    empty.hidden = false;
    return;
  }
  empty.hidden = true;
  videos.forEach(v => grid.appendChild(makeCard(v)));
  // GSAP stagger — gsap is available as a global via CDN script tag in dashboard.html
  gsap.from('.video-card', { opacity: 0, y: 16, duration: 0.4, stagger: 0.06, ease: 'power1.out' });
}

function makeCard(video) {
  const card = document.createElement('article');
  card.className = `video-card video-card--${video.status}`;
  card.dataset.id = video.id;

  // Thumbnail — validate URL protocol to block javascript:/data: URIs
  card.appendChild(makeThumbnail(video.thumbnailUrl));

  // Body — use textContent for user-supplied strings to prevent XSS
  const body = document.createElement('div');
  body.className = 'video-card__body';

  const promptEl = document.createElement('p');
  promptEl.className = 'video-card__prompt';
  promptEl.textContent = video.prompt.slice(0, 60) + (video.prompt.length > 60 ? '\u2026' : '');

  const meta = document.createElement('div');
  meta.className = 'video-card__meta';

  const statusEl = document.createElement('span');
  statusEl.className = 'video-card__status';
  statusEl.textContent = video.status === 'generating' ? 'Generating\u2026' : 'Done';

  const dateEl = document.createElement('time');
  dateEl.className = 'video-card__date';
  dateEl.textContent = formatDate(video.createdAt);

  meta.append(statusEl, dateEl);
  body.append(promptEl, meta);
  card.appendChild(body);

  // Click to open modal only when done (Task 10 will assign window.openVideoModal)
  if (video.status === 'done') {
    card.addEventListener('click', () => window.openVideoModal?.(video));
  }

  return card;
}

function makeThumbnail(url) {
  if (url) {
    try {
      const parsed = new URL(url, window.location.origin);
      if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
        const img = document.createElement('img');
        img.src = parsed.href;
        img.alt = '';
        img.className = 'video-card__thumb';
        return img;
      }
    } catch { /* fall through to placeholder */ }
  }
  const div = document.createElement('div');
  div.className = 'video-card__thumb video-card__thumb--placeholder';
  return div;
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Expose for Task 9 to call after a new video is added
window.refreshGrid = loadVideos;

loadVideos().catch(err => {
  if (err.status === 401) {
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_user');
    window.location.href = '/auth.html';
  } else {
    console.error(err);
  }
});
