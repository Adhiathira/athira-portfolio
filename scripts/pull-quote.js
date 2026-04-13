/* canvas-folio — Pull Quote Component
 *
 * Creates an editorial pull quote on the canvas.
 * Sits directly on the board surface with no attachment —
 * as if printed on the paper itself.
 *
 * Each pull quote has:
 *   - Giant decorative quote mark (faded terracotta)
 *   - Editorial italic text (Playfair Display)
 *   - Handwritten attribution with accent-colored dashes
 *   - Mid-tone paper background
 *   - GSAP fade + scale entrance
 *
 * Usage:
 *   const quote = new PullQuote({
 *     x: 1600, y: 2000, rotate: 0,
 *     text: 'The board finally looks like something I made.',
 *     attribution: 'Maris T. — Brand Designer'
 *   });
 *   quote.mount(document.getElementById('canvas')).animate(0.3);
 */

class PullQuote {
  /**
   * @param {Object} opts
   * @param {number}  opts.x                — Left position on canvas (px)
   * @param {number}  opts.y                — Top position on canvas (px)
   * @param {number}  [opts.rotate=0]       — Rotation in degrees
   * @param {string}  [opts.text]           — Quote text
   * @param {string}  [opts.attribution]    — Author attribution
   * @param {number}  [opts.width=400]      — Max width in px
   */
  constructor(opts = {}) {
    this.opts = {
      x: 0,
      y: 0,
      rotate: 0,
      text: '',
      attribution: '',
      width: 400,
      ...opts
    };

    this.el = null;
    this._built = false;
  }

  /** Build the DOM structure and return the root element. */
  _build() {
    const { x, y, rotate, text, attribution, width } = this.opts;

    const root = document.createElement('div');
    root.className = 'canvas-item item-pullquote';
    root.style.left = x + 'px';
    root.style.top = y + 'px';
    root.style.transform = 'rotate(' + rotate + 'deg)';

    if (width !== 400) {
      root.style.maxWidth = width + 'px';
    }

    // Giant quote mark
    const mark = document.createElement('span');
    mark.className = 'pullquote-mark';
    mark.setAttribute('aria-hidden', 'true');
    mark.textContent = '\u201C';
    root.appendChild(mark);

    // Quote text
    if (text) {
      const p = document.createElement('p');
      p.className = 'pullquote-text';
      p.textContent = text;
      root.appendChild(p);
    }

    // Attribution
    if (attribution) {
      const attr = document.createElement('p');
      attr.className = 'pullquote-attribution';
      attr.textContent = attribution;
      root.appendChild(attr);
    }

    this.el = root;
    this._built = true;
    return root;
  }

  /**
   * Mount the pull quote onto a parent element.
   * @param {HTMLElement} parent
   * @returns {PullQuote} this
   */
  mount(parent) {
    if (!this._built) this._build();
    parent.appendChild(this.el);
    return this;
  }

  /**
   * Remove the pull quote from the DOM.
   * @returns {PullQuote} this
   */
  unmount() {
    if (this.el && this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
    }
    return this;
  }

  /**
   * GSAP entrance — quote mark scales up first, then text fades in.
   * @param {number} [delay=0]
   * @returns {PullQuote} this
   */
  animate(delay = 0) {
    if (!this.el || typeof gsap === 'undefined') return this;

    var mark = this.el.querySelector('.pullquote-mark');
    var textEl = this.el.querySelector('.pullquote-text');
    var attr = this.el.querySelector('.pullquote-attribution');

    // Fade in the whole card
    gsap.fromTo(this.el,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, delay: delay, ease: 'power2.out' }
    );

    // Scale up the quote mark
    if (mark) {
      gsap.fromTo(mark,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, delay: delay + 0.1, ease: 'elastic.out(1, 0.6)' }
      );
    }

    // Fade in text slightly after
    if (textEl) {
      gsap.fromTo(textEl,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, delay: delay + 0.25, ease: 'power2.out' }
      );
    }

    // Attribution last
    if (attr) {
      gsap.fromTo(attr,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, delay: delay + 0.4, ease: 'power2.out' }
      );
    }

    return this;
  }

  /**
   * Update the quote text.
   * @param {string} text
   * @returns {PullQuote} this
   */
  setText(text) {
    if (!this.el) return this;
    var p = this.el.querySelector('.pullquote-text');
    if (p) p.textContent = text;
    return this;
  }

  /**
   * Update the attribution.
   * @param {string} text
   * @returns {PullQuote} this
   */
  setAttribution(text) {
    if (!this.el) return this;
    var a = this.el.querySelector('.pullquote-attribution');
    if (a) a.textContent = text;
    return this;
  }

  /**
   * Move the pull quote to a new position.
   * @param {number} x
   * @param {number} y
   * @param {boolean} [animated=false]
   * @returns {PullQuote} this
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
  window.PullQuote = PullQuote;
}
