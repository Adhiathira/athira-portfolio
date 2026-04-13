/* canvas-folio — Split-Flap Flip Card Component
 *
 * Creates a split-flap (departure board) card that cycles through strings.
 * The card is visually split at the horizontal midline — a flap hinged at
 * that midline folds downward to reveal the next string, just like a
 * classic airport departure board.
 *
 * Flip sequence ("Hello" → "Hola"):
 *   1. Flap front shows "Hello" top half, resting flat over the upper panel.
 *   2. Flap rotates downward (transform-origin: center bottom at midline).
 *   3. At 90° (edge-on): swap static upper & lower panels to "Hola".
 *   4. Past 90°: flap back face revealed — shows "Hola" bottom half.
 *   5. At 180°: flap flat over lower panel. Reset flap to 0° instantly.
 *      Card is now at rest with "Hola".
 *
 * Each flip card has:
 *   - Yellow (#ffd54f) sticky-note card background
 *   - Split-flap panels with subtle panel background + divider line
 *   - GSAP-powered two-phase flip animation with 3D perspective
 *   - Automatic cycling through the string list with looping
 *   - Tape strip at top (CSS ::before, unchanged from original)
 *
 * Usage:
 *   const flip = new FlipCard({
 *     x: 600, y: 350, rotate: -1,
 *     strings: ['Hello', 'Hola', 'Bonjour', 'Ciao'],
 *     interval: 2500
 *   });
 *   flip.mount(document.getElementById('canvas')).animate(0.1);
 */

class FlipCard {
  /**
   * @param {Object} opts
   * @param {number}  opts.x            — Left position on canvas (px)
   * @param {number}  opts.y            — Top position on canvas (px)
   * @param {number}  [opts.rotate=0]   — Rotation in degrees
   * @param {string[]} [opts.strings=[]] — Array of strings to cycle through
   * @param {number}  [opts.interval=2500] — Pause on each string (ms)
   * @param {number}  [opts.width=null] — Optional fixed width (px)
   */
  constructor(opts = {}) {
    this.opts = {
      x: 0,
      y: 0,
      rotate: 0,
      strings: [],
      colors: [],
      interval: 2500,
      width: null,
      ...opts
    };

    this.el = null;
    this._built = false;
    this._currentIndex = 0;
    this._timer = null;
    this._flipping = false;

    // DOM refs for split-flap panels
    this._upper = null;
    this._lower = null;
    this._upperText = null;
    this._lowerText = null;
    this._flapCard = null;
    this._flapFront = null;
    this._flapBack = null;
    this._flapFrontText = null;
    this._flapBackText = null;
  }

  /** Build the split-flap DOM structure and return the root element. */
  _build() {
    const { x, y, rotate, strings, width } = this.opts;
    const initial = strings.length > 0 ? strings[0] : '';

    // ── Root card element ──────────────────────────────────────────────
    const root = document.createElement('div');
    root.className = 'canvas-item item-flip';
    root.style.left = x + 'px';
    root.style.top = y + 'px';
    root.style.transform = 'rotate(' + rotate + 'deg)';

    if (width !== null) {
      root.style.width = width + 'px';
    }

    // Apply initial background color if provided
    if (this.opts.colors.length > 0) {
      root.style.backgroundColor = this.opts.colors[0];
    }

    // ── Split-flap display container ───────────────────────────────────
    const display = document.createElement('div');
    display.className = 'flap-display';

    // Static upper half — clipped to show upper portion of text
    const upper = document.createElement('div');
    upper.className = 'flap-half flap-upper';
    const upperText = document.createElement('span');
    upperText.className = 'flap-text';
    upperText.textContent = initial;
    upper.appendChild(upperText);

    // Static lower half — clipped to show lower portion of text
    const lower = document.createElement('div');
    lower.className = 'flap-half flap-lower';
    const lowerText = document.createElement('span');
    lowerText.className = 'flap-text';
    lowerText.textContent = initial;
    lower.appendChild(lowerText);

    // Animated flap — same height as one half, hinged at the midline
    const flapCard = document.createElement('div');
    flapCard.className = 'flap-card';

    // Front face: top half of OLD text (visible at rest, peels away)
    const flapFront = document.createElement('div');
    flapFront.className = 'flap-face flap-front';
    const flapFrontText = document.createElement('span');
    flapFrontText.className = 'flap-text';
    flapFrontText.textContent = initial;
    flapFront.appendChild(flapFrontText);

    // Back face: bottom half of NEW text (revealed past 90°)
    const flapBack = document.createElement('div');
    flapBack.className = 'flap-face flap-back';
    const flapBackText = document.createElement('span');
    flapBackText.className = 'flap-text';
    flapBackText.textContent = initial;
    flapBack.appendChild(flapBackText);

    flapCard.appendChild(flapFront);
    flapCard.appendChild(flapBack);

    display.appendChild(upper);
    display.appendChild(lower);
    display.appendChild(flapCard);
    root.appendChild(display);

    // Store DOM refs
    this._upper = upper;
    this._lower = lower;
    this._upperText = upperText;
    this._lowerText = lowerText;
    this._flapCard = flapCard;
    this._flapFront = flapFront;
    this._flapBack = flapBack;
    this._flapFrontText = flapFrontText;
    this._flapBackText = flapBackText;
    this.el = root;
    this._built = true;
    return root;
  }

  /**
   * Split-flap flip: a two-phase GSAP timeline.
   *
   * Phase 1 (0° → −90°, ease-in): front face folds away from the top.
   *   At −90° the flap is edge-on — swap both static panels to new text.
   *
   * Phase 2 (−90° → −180°, ease-out): back face folds down to the bottom.
   *   On complete: reset flap to 0° instantly, update flap front text.
   *
   * @param {string} newStr — The next string to reveal
   */
  _flipTo(newStr) {
    if (typeof gsap === 'undefined' || this._flipping) return;

    var self = this;
    this._flipping = true;

    var hasColors = self.opts.colors.length > 0;
    var newColor = hasColors ? self.opts.colors[self._currentIndex % self.opts.colors.length] : null;
    var oldColor = hasColors ? self.el.style.backgroundColor : null;

    // Prepare flap faces: front = current text (old color), back = new text (new color)
    self._flapFrontText.textContent = self._upperText.textContent;
    self._flapBackText.textContent = newStr;

    var tl = gsap.timeline({
      onComplete: function () {
        gsap.set(self._flapCard, { rotateX: 0 });
        self._flapFrontText.textContent = newStr;
        self._flipping = false;
      }
    });

    // Phase 1: front face folds away (0 → −90)
    tl.to(self._flapCard, {
      rotateX: -90,
      transformPerspective: 400,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: function () {
        // Flap is edge-on (invisible) — swap text and color together
        self._upperText.textContent = newStr;
        self._lowerText.textContent = newStr;
        if (hasColors) {
          self.el.style.backgroundColor = newColor;
        }
      }
    });

    // Phase 2: back face folds down (−90 → −180)
    tl.to(self._flapCard, {
      rotateX: -180,
      transformPerspective: 400,
      duration: 0.3,
      ease: 'power2.out'
    });
  }

  /** Start the automatic cycling interval. */
  _startCycle() {
    if (this.opts.strings.length < 2) return;

    var self = this;
    this._timer = setInterval(function () {
      self._currentIndex = (self._currentIndex + 1) % self.opts.strings.length;
      self._flipTo(self.opts.strings[self._currentIndex]);
    }, this.opts.interval);
  }

  /** Stop the automatic cycling interval. */
  _stopCycle() {
    if (this._timer !== null) {
      clearInterval(this._timer);
      this._timer = null;
    }
  }

  /**
   * Mount the flip card onto a parent element.
   * @param {HTMLElement} parent
   * @returns {FlipCard} this
   */
  mount(parent) {
    if (!this._built) this._build();
    parent.appendChild(this.el);
    return this;
  }

  /**
   * Remove the flip card from the DOM and stop cycling.
   * @returns {FlipCard} this
   */
  unmount() {
    this._stopCycle();
    if (this.el && this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
    }
    return this;
  }

  /**
   * GSAP entrance — fade in with slight scale, then start the cycle.
   * @param {number} [delay=0]
   * @returns {FlipCard} this
   */
  animate(delay = 0) {
    if (!this.el || typeof gsap === 'undefined') return this;

    var self = this;

    gsap.fromTo(this.el,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        delay: delay,
        ease: 'power2.out',
        onComplete: function () {
          self._startCycle();
        }
      }
    );

    return this;
  }

  /**
   * Move the card to a new position.
   * @param {number} x
   * @param {number} y
   * @param {boolean} [animated=false]
   * @returns {FlipCard} this
   */
  moveTo(x, y, animated = false) {
    this.opts.x = x;
    this.opts.y = y;
    if (!this.el) return this;

    if (animated && typeof gsap !== 'undefined') {
      gsap.to(this.el, { left: x, top: y, duration: 0.5, ease: 'power2.out' });
    } else {
      this.el.style.left = x + 'px';
      this.el.style.top = y + 'px';
    }
    return this;
  }
}

if (typeof window !== 'undefined') {
  window.FlipCard = FlipCard;
}
