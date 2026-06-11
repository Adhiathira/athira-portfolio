/* Cursor Black — Typewriter Animation */
/* Characters appear one at a time. 30ms per character. Step-start mechanics. */

(function () {
  'use strict';

  /**
   * Type text into a target element character by character.
   * @param {HTMLElement} el - The element to type into
   * @param {string} text - The text to type
   * @param {number} speed - Ms per character (default 30)
   * @param {Function} onComplete - Callback when typing is done
   */
  function typewriter(el, text, speed, onComplete) {
    speed = speed || 30;
    let i = 0;
    el.textContent = '';

    function type() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        if (typeof onComplete === 'function') onComplete();
      }
    }

    type();
  }

  /**
   * Type a sequence of texts into multiple elements in order.
   * @param {Array} sequence - Array of { el, text, speed } objects
   * @param {number} delayBetween - Ms to wait between each sequence item
   */
  function typeSequence(sequence, delayBetween) {
    delayBetween = delayBetween || 80;
    let currentIndex = 0;

    function next() {
      if (currentIndex >= sequence.length) return;
      const { el, text, speed } = sequence[currentIndex];
      currentIndex++;
      typewriter(el, text, speed, () => {
        setTimeout(next, delayBetween);
      });
    }

    next();
  }

  /**
   * Glitch effect — briefly shifts element and adds color split.
   * @param {HTMLElement} el
   */
  function glitch(el) {
    el.classList.add('animate-glitch');
    setTimeout(() => {
      el.classList.remove('animate-glitch');
    }, 150);
  }

  // Expose to global
  window.CursorBlack = window.CursorBlack || {};
  window.CursorBlack.typewriter = typewriter;
  window.CursorBlack.typeSequence = typeSequence;
  window.CursorBlack.glitch = glitch;

  // ============================================================
  // Hero typewriter — runs on DOMContentLoaded
  // ============================================================
  document.addEventListener('DOMContentLoaded', function () {
    const heroTextEl = document.getElementById('hero-typewriter-text');
    const heroCursor = document.getElementById('hero-cursor');

    if (!heroTextEl) return;

    const heroText = heroTextEl.dataset.text || heroTextEl.textContent.trim();
    heroTextEl.textContent = '';

    // Small boot delay
    setTimeout(() => {
      typewriter(heroTextEl, heroText, 30, function () {
        // Glitch on completion
        if (heroCursor) {
          heroCursor.style.display = 'none';
        }
        glitch(heroTextEl);

        // Reveal description and CTA
        const heroDesc = document.querySelector('.hero-description');
        const heroActions = document.querySelector('.hero-actions');
        const heroTerminal = document.querySelector('.hero-terminal');

        if (heroDesc) {
          gsap.to(heroDesc, { autoAlpha: 1, duration: 0.08, ease: 'none', delay: 0.1 });
        }
        if (heroActions) {
          gsap.to(heroActions, { autoAlpha: 1, duration: 0.08, ease: 'none', delay: 0.2 });
        }
        if (heroTerminal) {
          gsap.to(heroTerminal, { autoAlpha: 1, duration: 0.08, ease: 'none', delay: 0.3, onComplete: runTerminalSim });
        }
      });
    }, 200);

    // ============================================================
    // Terminal simulation
    // ============================================================
    function runTerminalSim() {
      const simLines = document.querySelectorAll('.terminal-sim-line');
      if (!simLines.length) return;

      let lineIndex = 0;

      function showNextLine() {
        if (lineIndex >= simLines.length) return;
        const line = simLines[lineIndex];
        lineIndex++;

        line.style.display = 'flex';
        const isTyped = line.dataset.typed === 'true';
        const textEl = line.querySelector('.terminal-cmd, .terminal-output');

        if (isTyped && textEl) {
          const text = textEl.dataset.text || '';
          typewriter(textEl, text, 40, () => {
            setTimeout(showNextLine, 150);
          });
        } else {
          setTimeout(showNextLine, 100);
        }
      }

      showNextLine();
    }
  });
})();
