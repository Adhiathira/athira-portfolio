// footer.js — Footer partial injector for goyard-vid
// Mirrors nav.js: fetches partials/footer.html and injects into #footer-container.

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('footer-container');
  if (!container) return;

  try {
    const response = await fetch('partials/footer.html');
    if (!response.ok) throw new Error(`footer partial fetch failed: ${response.status}`);
    const html = await response.text();
    // footer.html is a trusted first-party static partial — not user input
    container.innerHTML = html;
  } catch (err) {
    console.error('[footer.js]', err);
  }
});
