// nav.js — Navigation partial injector and active link highlighter for goyard-vid

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('nav-container');
  if (!container) return;

  try {
    const response = await fetch('partials/nav.html');
    if (!response.ok) throw new Error(`nav partial fetch failed: ${response.status}`);
    const html = await response.text();
    // nav.html is a trusted first-party static partial — not user input
    container.innerHTML = html;
    highlightActiveLink();
  } catch (err) {
    console.error('[nav.js]', err);
  }
});

function highlightActiveLink() {
  // Use basename comparison so active highlighting works regardless of server root.
  // window.location.pathname includes the full path from server root, e.g.
  // /demo/goyard-vid/explore.html when served from repo root — direct href
  // comparison would never match. Basename strips the prefix on both sides.
  const currentFile = window.location.pathname.split('/').pop();
  const links = document.querySelectorAll('.nav-link');

  links.forEach(link => {
    const href = link.getAttribute('href');
    const linkFile = href.split('/').pop();
    // Treat bare directory ('') and 'index.html' as the same page (Create)
    const isRoot = currentFile === '' || currentFile === 'index.html';
    const isCreate = linkFile === 'index.html';

    if (isRoot && isCreate) {
      link.classList.add('nav-link--active');
    } else if (!isRoot && linkFile === currentFile) {
      // Basename match for explore.html, pricing.html, about.html, etc.
      link.classList.add('nav-link--active');
    }
  });
}
