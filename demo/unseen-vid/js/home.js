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
