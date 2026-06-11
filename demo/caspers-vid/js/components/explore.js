/**
 * explore.js — caspers-vid
 * Responsibilities:
 *   1. Auth return path — check for pending follow/save action on page load
 *   2. Scroll depth listener — reveal persistent CTA after 50% gallery scroll
 *   3. Filter tab click handler — toggle .active + show/hide .card-group
 */

import { interceptIfNeeded, getIntendedAction, clearIntendedAction, SITE_ROOT } from '../auth.js';

// ── 1. Auth return path ───────────────────────────────────────────────────────
const pending = getIntendedAction();
if (pending && (pending.type === 'follow' || pending.type === 'save')) {
  const cardId = pending.payload?.cardId;
  if (cardId) {
    const card = document.querySelector(`[data-card-id="${cardId}"]`);
    if (card) {
      // If the card lives in a hidden group, activate its filter tab first
      const group = card.closest('.card-group');
      if (group && group.hidden) {
        const groupType = group.dataset.type;
        document.querySelectorAll('.card-group').forEach(g => {
          g.hidden = g.dataset.type !== groupType;
        });
        document.querySelectorAll('.filter-tab').forEach(t => {
          t.classList.toggle('active', t.dataset.type === groupType);
        });
      }
      card.classList.add('action-pending');
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
  clearIntendedAction();
}

// ── 2. Scroll depth → persistent CTA ─────────────────────────────────────────
const galleryEl = document.querySelector('.explore-gallery');
const ctaEl = document.getElementById('exploreCta');

function checkScrollDepth() {
  if (!galleryEl || !ctaEl) return;
  const threshold = galleryEl.offsetTop + galleryEl.offsetHeight * 0.5;
  if (window.scrollY >= threshold) {
    ctaEl.classList.add('is-visible');
    ctaEl.setAttribute('aria-hidden', 'false');
    window.removeEventListener('scroll', checkScrollDepth);
  }
}

window.addEventListener('scroll', checkScrollDepth, { passive: true });

// ── 3. Filter tab handler ─────────────────────────────────────────────────────
document.querySelectorAll('.filter-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const type = tab.dataset.type;
    document.querySelectorAll('.card-group').forEach(group => {
      group.hidden = group.dataset.type !== type;
    });
  });
});

// ── 4. CTA button intercept ───────────────────────────────────────────────────
const ctaBtn = document.querySelector('.cta-make-your-own');
if (ctaBtn) {
  ctaBtn.addEventListener('click', () => {
    if (!interceptIfNeeded('create', new URL('app/studio.html', SITE_ROOT).href)) {
      window.location.href = new URL('app/studio.html', SITE_ROOT).href;
    }
  });
}
