/* canvas-folio — Sticky Note Component
 *
 * Creates a yellow sticky note on the canvas.
 * Each sticky note has:
 *   - Yellow (#ffd54f) background with subtle shadow
 *   - Translucent tape strip at top (slightly rotated)
 *   - Caveat handwriting text
 *   - Optional fold corner (bottom-right dog-ear)
 *   - GSAP tape-reveal entrance animation
 *
 * Usage:
 *   const note = new StickyNote({
 *     x: 800, y: 400, rotate: -2,
 *     text: 'warm terracotta + sage\nworks every time'
 *   });
 *   note.mount(document.getElementById('canvas')).animate(0.1);
 */

class StickyNote {
  /**
   * @param {Object} opts
   * @param {number}  opts.x         — Left position on canvas (px)
   * @param {number}  opts.y         — Top position on canvas (px)
   * @param {number}  [opts.rotate=0]   — Rotation in degrees
   * @param {string}  [opts.text]       — Handwritten note text (newlines become <br>)
   * @param {number}  [opts.size=160]   — Width and height in px (square)
   * @param {boolean} [opts.fold=false] — Show dog-ear fold on bottom-right
   * @param {string}  [opts.color]      — Override sticky color (CSS value)
   * @param {HTMLElement} [opts.content] — DOM element for custom content
   */
  constructor(opts = {}) {
    this.opts = {
      x: 0,
      y: 0,
      rotate: 0,
      text: '',
      size: 160,
      fold: false,
      color: null,
      content: null,
      ...opts
    };

    this.el = null;
    this._built = false;
  }

  /**
   * Set text on an element using safe DOM methods (no innerHTML).
   * Newline characters in the string become <br> elements.
   */
  static _setTextWithBreaks(el, text) {
    el.textContent = '';
    var lines = text.split('\n');
    for (var i = 0; i < lines.length; i++) {
      if (i > 0) el.appendChild(document.createElement('br'));
      el.appendChild(document.createTextNode(lines[i]));
    }
  }

  /** Build the DOM structure and return the root element. */
  _build() {
    const { x, y, rotate, text, size, fold, color, content } = this.opts;

    const root = document.createElement('div');
    root.className = 'canvas-item item-sticky';
    root.style.left = x + 'px';
    root.style.top = y + 'px';
    root.style.transform = 'rotate(' + rotate + 'deg)';

    if (size !== 160) {
      root.style.width = size + 'px';
      root.style.height = size + 'px';
    }

    if (color) {
      root.style.setProperty('--sticky-color', color);
    }

    // Text content
    if (text) {
      const p = document.createElement('p');
      p.className = 'sticky-text';
      StickyNote._setTextWithBreaks(p, text);
      root.appendChild(p);
    }

    // Custom content slot
    if (content instanceof HTMLElement) {
      const slot = document.createElement('div');
      slot.className = 'sticky-content';
      slot.appendChild(content);
      root.appendChild(slot);
    }

    // Dog-ear fold
    if (fold) {
      root.classList.add('item-sticky--fold');
    }

    this.el = root;
    this._built = true;
    return root;
  }

  /**
   * Mount the sticky note onto a parent element.
   * @param {HTMLElement} parent
   * @returns {StickyNote} this
   */
  mount(parent) {
    if (!this._built) this._build();
    parent.appendChild(this.el);
    return this;
  }

  /**
   * Remove the sticky note from the DOM.
   * @returns {StickyNote} this
   */
  unmount() {
    if (this.el && this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
    }
    return this;
  }

  /**
   * GSAP entrance — tape-reveal: slides in from the left with a skew,
   * like peeling a sticky note off a pad.
   * @param {number} [delay=0]
   * @returns {StickyNote} this
   */
  animate(delay = 0) {
    if (!this.el || typeof gsap === 'undefined') return this;

    const baseRotate = this.opts.rotate;

    gsap.fromTo(this.el,
      {
        x: -30,
        rotation: baseRotate - 4,
        opacity: 0,
        skewX: -8
      },
      {
        x: 0,
        rotation: baseRotate,
        opacity: 1,
        skewX: 0,
        duration: 0.5,
        delay: delay,
        ease: 'power2.out'
      }
    );

    return this;
  }

  /**
   * Update the text content.
   * @param {string} text
   * @returns {StickyNote} this
   */
  setText(text) {
    if (!this.el) return this;
    const p = this.el.querySelector('.sticky-text');
    if (p) StickyNote._setTextWithBreaks(p, text);
    return this;
  }

  /**
   * Update the content slot with a DOM element.
   * @param {HTMLElement} content
   * @returns {StickyNote} this
   */
  setContent(content) {
    if (!this.el || !(content instanceof HTMLElement)) return this;
    let slot = this.el.querySelector('.sticky-content');
    if (!slot) {
      slot = document.createElement('div');
      slot.className = 'sticky-content';
      this.el.appendChild(slot);
    }
    slot.textContent = '';
    slot.appendChild(content);
    return this;
  }

  /**
   * Move the note to a new position.
   * @param {number} x
   * @param {number} y
   * @param {boolean} [animated=false]
   * @returns {StickyNote} this
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
  window.StickyNote = StickyNote;
}
