/* canvas-folio — Split-Flap Departure Board Card Component
 *
 * Creates a split-flap departure board card that cycles through strings
 * with a two-phase sequential flip animation. Unlike FlipCard (which uses
 * a single hinged flap), this component uses 4 layers per flip:
 *
 *   1. Static top half    — NEW text, NEW color (revealed after old top folds away)
 *   2. Static bottom half — OLD text, OLD color (visible until new bottom covers it)
 *   3. Animated top flap  — OLD text, OLD color (folds away: rotateX 0° → −90°)
 *   4. Animated bottom flap — NEW text, NEW color (folds in: rotateX 90° → 0°)
 *
 * The two animation phases are sequential (not overlapping):
 *   Phase 1: Top flap folds away from view (0.28s, power2.in)
 *   Phase 2: Bottom flap folds into place (0.28s, power2.out)
 *
 * After both phases complete, the display resets to a clean 2-layer static
 * state showing the new text and new color.
 *
 * Colors are applied per-layer — the outer card wrapper stays neutral.
 * Old layers carry the departing color, new layers carry the arriving color.
 *
 * Usage:
 *   const sf = new SplitFlapCard({
 *     x: 400, y: 200, rotate: 1,
 *     strings: ['Tokyo', 'Osaka', 'Kyoto', 'Nara'],
 *     colors: ['#1a1a2e', '#16213e', '#0f3460', '#533483'],
 *     interval: 3000
 *   });
 *   sf.mount(document.getElementById('canvas')).animate(0.2);
 */

class SplitFlapCard {
  /**
   * @param {Object} opts
   * @param {number}   opts.x             — Left position on canvas (px)
   * @param {number}   opts.y             — Top position on canvas (px)
   * @param {number}   [opts.rotate=0]    — Rotation in degrees
   * @param {string[]} [opts.strings=[]]  — Array of strings to cycle through
   * @param {string[]} [opts.colors=[]]   — Array of background colors (one per string)
   * @param {number}   [opts.interval=2500] — Pause on each string (ms)
   * @param {number}   [opts.width=null]  — Optional fixed width (px)
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

    // DOM ref for the display container
    this._display = null;
  }

  // ── Shared inline style strings ──────────────────────────────────────
  // Centralised here so _render() and _flipTo() produce identical styling.

  /** Base styles shared by every .sf-half element. */
  _halfBase() {
    return 'position:absolute;left:0;right:0;height:50%;overflow:hidden;box-sizing:border-box;' +
      'backface-visibility:hidden;' +
      "font-family:'Noto Sans','Noto Sans Devanagari','Noto Sans Malayalam'," +
      "'Noto Sans Tamil','Noto Sans Kannada','Noto Sans Korean'," +
      "'Noto Sans Arabic',system-ui,sans-serif;" +
      'font-size:2.5rem;font-weight:700;color:#d65ba8;' +
      'text-align:center;white-space:nowrap;';
  }

  /** Extra styles for a top-positioned half. */
  _topStyle() {
    return 'top:0;' +
      'line-height:var(--sf-h,200px);';
  }

  /** Extra styles for a bottom-positioned half. */
  _botStyle() {
    return 'bottom:-1px;height:calc(50% + 1px);' +
      'line-height:var(--sf-h,200px);' +
      'display:flex;align-items:flex-start;justify-content:center;';
  }

  /**
   * Wrap text in a span that shifts up by 50% of full display height,
   * so only the bottom portion of glyphs is visible in the bottom half.
   */
  _setBotText(el, str) {
    el.textContent = '';
    var span = document.createElement('span');
    span.style.cssText = 'display:block;transform:translateY(-50%);line-height:var(--sf-h,200px);';
    span.textContent = str;
    el.appendChild(span);
  }

  // ── DOM construction ─────────────────────────────────────────────────

  /** Build the card DOM structure and return the root element. */
  _build() {
    var x = this.opts.x;
    var y = this.opts.y;
    var rotate = this.opts.rotate;
    var strings = this.opts.strings;
    var width = this.opts.width;
    var initial = strings.length > 0 ? strings[0] : '';
    var initialColor = this.opts.colors.length > 0
      ? this.opts.colors[0]
      : '#1a1a1a';

    // ── Root card element ────────────────────────────────────────────
    var root = document.createElement('div');
    root.className = 'canvas-item item-splitflap';
    root.style.cssText =
      'position:absolute;' +
      'left:' + x + 'px;' +
      'top:' + y + 'px;' +
      'transform:rotate(' + rotate + 'deg);' +
      'padding:0;' +
      'border-radius:10px;' +
      'box-shadow:2px 2px 6px rgba(0,0,0,0.10);';

    if (width !== null) {
      root.style.width = width + 'px';
    }

    // ── Split-flap display container ─────────────────────────────────
    var display = document.createElement('div');
    display.className = 'sf-display';
    display.style.cssText =
      'position:relative;' +
      'width:100%;' +
      'height:var(--sf-h,200px);' +
      'perspective:800px;' +
      'border-radius:10px;' +
      'overflow:hidden;';

    root.appendChild(display);

    // Store DOM refs
    this._display = display;
    this.el = root;
    this._built = true;

    // Render initial static state
    this._render(initial, initialColor);

    return root;
  }

  // ── Static render ────────────────────────────────────────────────────

  /**
   * Render the resting (no-animation) state — just two halves showing
   * the same text and same background color.
   *
   * @param {string} str   — Text to display
   * @param {string} color — Background color for both halves
   */
  _render(str, color) {
    // Clear previous content
    this._display.textContent = '';

    // Top half — line-height equals full cell height so text baseline
    // sits at the bottom edge; overflow:hidden clips the lower portion.
    var topEl = document.createElement('div');
    topEl.className = 'sf-half sf-top';
    topEl.style.cssText = this._halfBase() + this._topStyle() +
      'background:' + color + ';';
    topEl.textContent = str;

    // Bottom half — text shifted up by 50% so only the lower portion
    // of glyphs is visible inside the clipped area.
    var botEl = document.createElement('div');
    botEl.className = 'sf-half sf-bot';
    botEl.style.cssText = this._halfBase() + this._botStyle() +
      'background:' + color + ';';
    this._setBotText(botEl, str);

    this._display.appendChild(topEl);
    this._display.appendChild(botEl);
  }

  // ── Flip animation ──────────────────────────────────────────────────

  /**
   * Two-phase sequential flip from the current text to newStr.
   *
   * Builds 4 layers inside the display container:
   *   - Static top:    NEW text / NEW color  (revealed behind departing flap)
   *   - Static bottom: OLD text / OLD color  (visible until arriving flap covers)
   *   - Anim top flap: OLD text / OLD color  (folds away: rotateX 0 → −90)
   *   - Anim bot flap: NEW text / NEW color  (folds in: rotateX 90 → 0)
   *
   * After both phases complete (~580ms), resets to clean static state.
   *
   * @param {string} newStr — The next string to reveal
   */
  _flipTo(newStr) {
    if (typeof gsap === 'undefined' || this._flipping) return;

    var self = this;
    this._flipping = true;

    // ── Determine old / new colors ────────────────────────────────────
    var hasColors = self.opts.colors.length > 0;

    // _startCycle increments _currentIndex BEFORE calling _flipTo, so
    // the "old" index is the one before the current.
    var prevIndex = (self._currentIndex - 1 + self.opts.strings.length) % self.opts.strings.length;
    var oldColor = hasColors ? self.opts.colors[prevIndex % self.opts.colors.length] : '#1a1a1a';
    var newColor = hasColors ? self.opts.colors[self._currentIndex % self.opts.colors.length] : '#1a1a1a';

    // Grab old text from the current static top half before we replace it
    var oldTopEl = self._display.querySelector('.sf-top');
    var oldStr = oldTopEl ? oldTopEl.textContent : '';

    // ── Build 4 layers via DOM elements ───────────────────────────────
    // Clear previous content
    self._display.textContent = '';

    var base = self._halfBase();
    var top = self._topStyle();
    var bot = self._botStyle();

    // Layer 1: Static top — NEW text, NEW color (z-index: 1)
    var staticTop = document.createElement('div');
    staticTop.className = 'sf-half sf-top';
    staticTop.style.cssText = base + top +
      'background:' + newColor + ';z-index:1;';
    staticTop.textContent = newStr;

    // Layer 2: Static bottom — OLD text, OLD color (z-index: 1)
    var staticBot = document.createElement('div');
    staticBot.className = 'sf-half sf-bot';
    staticBot.style.cssText = base + bot +
      'background:' + oldColor + ';z-index:1;';
    self._setBotText(staticBot, oldStr);

    // Layer 3: Animated top flap — OLD text, OLD color (z-index: 3)
    var animTop = document.createElement('div');
    animTop.className = 'sf-half sf-top sf-top-anim';
    animTop.style.cssText = base + top +
      'background:' + oldColor + ';' +
      'z-index:3;' +
      'transform-origin:bottom;' +
      'box-shadow:0 6px 10px -3px rgba(0,0,0,0.5);';
    animTop.textContent = oldStr;

    // Layer 4: Animated bottom flap — NEW text, NEW color (z-index: 3)
    var animBot = document.createElement('div');
    animBot.className = 'sf-half sf-bot sf-bot-anim';
    animBot.style.cssText = base + bot +
      'background:' + newColor + ';' +
      'z-index:3;' +
      'transform-origin:top;';
    self._setBotText(animBot, newStr);

    self._display.appendChild(staticTop);
    self._display.appendChild(staticBot);
    self._display.appendChild(animTop);
    self._display.appendChild(animBot);

    // Start the bottom flap hidden (rotated 90° away from view)
    gsap.set(animBot, { rotateX: 90 });

    // ── GSAP timeline: two sequential phases ──────────────────────────
    var tl = gsap.timeline({
      onComplete: function () {
        self._flipping = false;
        // Reset to clean static state with new text and new color
        self._render(newStr, newColor);
      }
    });

    // Phase 1: Top flap folds away (rotateX 0 → −90°)
    tl.to(animTop, {
      rotateX: -90,
      duration: 0.28,
      ease: 'power2.in'
    });

    // Phase 2: Bottom flap folds into place (rotateX 90° → 0°)
    tl.to(animBot, {
      rotateX: 0,
      duration: 0.28,
      ease: 'power2.out'
    });
  }

  // ── Cycling ──────────────────────────────────────────────────────────

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

  // ── Public API ───────────────────────────────────────────────────────

  /**
   * Mount the split-flap card onto a parent element.
   * @param {HTMLElement} parent
   * @returns {SplitFlapCard} this
   */
  mount(parent) {
    if (!this._built) this._build();
    parent.appendChild(this.el);
    return this;
  }

  /**
   * Remove the split-flap card from the DOM and stop cycling.
   * @returns {SplitFlapCard} this
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
   * @returns {SplitFlapCard} this
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
   * @returns {SplitFlapCard} this
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
  window.SplitFlapCard = SplitFlapCard;
}
