/**
 * profile.js — caspers-vid
 * Public creator profile page logic.
 *
 * Responsibilities:
 *   - Populate DOM from mock creator data
 *   - Auth-gate: Follow button and fixed CTA both call interceptIfNeeded
 *   - Scroll trigger: IntersectionObserver on portfolio sentinel → reveals CTA
 *     (logged-out only; CTA removed from DOM for logged-in visitors)
 */

import { isLoggedIn, interceptIfNeeded } from '../auth.js';

// ---------------------------------------------------------------------------
// Mock creator data — single source of truth for this page
// ---------------------------------------------------------------------------
const creatorData = {
  name: 'Mira Solano',
  username: 'mira',
  role: 'Visual designer & motion artist',
  points: 847,
  avatar: 'creator-avatar.jpg',
  projects: [
    { title: 'Archipelago', preview: 'project-1-preview.mp4' },
    { title: 'Quiet Grid',  preview: 'project-2-preview.mp4' },
    { title: 'Threshold',   preview: 'project-3-preview.mp4' }
  ]
};

// ---------------------------------------------------------------------------
// DOM population helpers
// ---------------------------------------------------------------------------

/**
 * setText — safely set textContent on an element by id.
 * @param {string} id
 * @param {string} text
 */
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

/**
 * buildCard — creates and returns a portfolio card DOM node for a single
 * project. Each card shows a 16:9 placeholder with the filename label.
 *
 * No Silent Visual Fallbacks rule: placeholder always shows its filename,
 * never a silent grey box. All text set via textContent (no innerHTML).
 *
 * @param {{ title: string, preview: string }} project
 * @param {number} index
 * @returns {HTMLElement}
 */
function buildCard(project, index) {
  // <article class="portfolio-card" data-project-index="N">
  const article = document.createElement('article');
  article.className = 'portfolio-card';
  article.dataset.projectIndex = String(index);

  // <div class="card-media-placeholder" aria-label="Video placeholder: [filename]">
  const placeholder = document.createElement('div');
  placeholder.className = 'card-media-placeholder';
  placeholder.setAttribute('aria-label', `Video placeholder: [${project.preview}]`);

  // <span class="placeholder-label">[filename]</span>
  const label = document.createElement('span');
  label.className = 'placeholder-label';
  label.textContent = `[${project.preview}]`;

  placeholder.appendChild(label);

  // <div class="card-hover-overlay">
  const overlay = document.createElement('div');
  overlay.className = 'card-hover-overlay';

  // <span class="card-project-title">Title</span>
  const title = document.createElement('span');
  title.className = 'card-project-title';
  title.textContent = project.title;

  // <span class="card-view-prompt">▶ View project</span>
  const viewPrompt = document.createElement('span');
  viewPrompt.className = 'card-view-prompt';
  viewPrompt.textContent = '\u25B6 View project';

  overlay.appendChild(title);
  overlay.appendChild(viewPrompt);

  article.appendChild(placeholder);
  article.appendChild(overlay);

  return article;
}

/**
 * populateCreatorHeader — fills the identity section with creator data.
 */
function populateCreatorHeader() {
  setText('creator-name', creatorData.name);
  setText('creator-role', creatorData.role);
  setText('creator-points', `${creatorData.points} pts`);
  setText('creator-project-count', `${creatorData.projects.length} projects`);
}

/**
 * populatePortfolioGrid — inserts one card per project into the grid.
 */
function populatePortfolioGrid() {
  const grid = document.getElementById('portfolio-grid');
  if (!grid) return;

  creatorData.projects.forEach((project, index) => {
    grid.appendChild(buildCard(project, index));
  });
}

// ---------------------------------------------------------------------------
// Auth-gate: Follow button
// ---------------------------------------------------------------------------

function wireFollowButton() {
  const followBtn = document.getElementById('portfolio-follow-btn');
  if (!followBtn) return;

  followBtn.addEventListener('click', () => {
    interceptIfNeeded('follow', window.location.href, { creatorId: creatorData.username });
  });
}

// ---------------------------------------------------------------------------
// Auth-gate CTA + scroll depth trigger
// ---------------------------------------------------------------------------

/**
 * wireProfileCta — sets up the fixed bottom CTA for logged-out visitors.
 *
 * Logged-in: removes CTA from DOM entirely (no stub, no hidden element).
 * Logged-out: observes the portfolio sentinel and reveals CTA once it enters
 *   the viewport (one-shot; observer disconnects after first trigger).
 */
function wireProfileCta() {
  const cta = document.getElementById('profileCta');
  if (!cta) return;

  // Logged-in visitors never see the CTA — remove from DOM entirely
  if (isLoggedIn()) {
    cta.remove();
    return;
  }

  // Wire CTA click — redirect to sign-up and remember intended action
  cta.addEventListener('click', () => {
    interceptIfNeeded('create', '/app/studio.html');
  });

  // Scroll depth trigger at 70% of portfolio section.
  // Sentinel is positioned at 30% from the bottom (= 70% from the top).
  const sentinel = document.getElementById('portfolio-cta-sentinel');
  if (!sentinel) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        cta.classList.add('is-visible');
        cta.setAttribute('aria-hidden', 'false');
        // One-shot: fire once, stay visible — disconnect immediately
        observer.disconnect();
      }
    });
  }, { threshold: 0 });

  observer.observe(sentinel);
}

// ---------------------------------------------------------------------------
// Public entry point
// ---------------------------------------------------------------------------

export function initProfile() {
  document.addEventListener('DOMContentLoaded', () => {
    populateCreatorHeader();
    populatePortfolioGrid();
    wireFollowButton();
    wireProfileCta();
  });
}
