export function initNav() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;

  // Hero height threshold — nav transforms after scrolling past hero
  const heroEl = document.querySelector('.section-hero');
  const threshold = heroEl ? heroEl.offsetHeight * 0.3 : 200;

  function applyScrolled(y) {
    nav.classList.toggle('scrolled', y > threshold);
  }

  // Locomotive Scroll (smooth: true) intercepts native scroll — window.scrollY
  // stays 0 and the native 'scroll' event never fires. main.js re-emits the
  // Locomotive scroll position as a 'loco-scroll' CustomEvent on window.
  window.addEventListener('loco-scroll', (e) => applyScrolled(e.detail.scrollY));

  // Fallback for pages that do not use Locomotive (login, signup, etc.) where
  // native scroll still works.
  window.addEventListener('scroll', () => applyScrolled(window.scrollY));
}
