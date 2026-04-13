/* canvas-folio — Tape Strip Component
 *
 * Places a decorative translucent tape strip on the canvas.
 * Purely visual — overlaps other items to "hold" them in place.
 *
 *   - Semi-transparent golden yellow (#ffd54f at 70%)
 *   - No text, no children, no shadow
 *   - pointer-events: none (CSS) — clicks pass through
 *   - z-index: 10 so tape always sits above other items
 *   - GSAP fade-in entrance with slight scale
 *
 * Usage:
 *   const tape = new TapeStrip({
 *     x: 300, y: 150, rotate: -5,
 *     width: 120
 *   });
 *   tape.mount(document.getElementById('canvas')).animate(0.1);
 */

class TapeStrip {
  /**
   * @param {Object} opts
   * @param {number}  opts.x            — Left position on canvas (px)
   * @param {number}  opts.y            — Top position on canvas (px)
   * @param {number}  [opts.rotate=0]   — Rotation in degrees
   * @param {number}  [opts.width=100]  — Strip width in px
   * @param {number}  [opts.height=26]  — Strip height in px
   */
  constructor(opts = {}) {
    this.opts = {
      x: 0,
      y: 0,
      rotate: 0,
      width: 100,
      height: 26,
      ...opts
    };

    this.el = null;
    this._built = false;
  }

  _build() {
    const { x, y, rotate, width, height } = this.opts;

    const root = document.createElement('div');
    root.className = 'canvas-item item-tape';
    root.style.left = x + 'px';
    root.style.top = y + 'px';
    root.style.transform = 'rotate(' + rotate + 'deg)';
    root.style.width = width + 'px';

    if (height !== 26) {
      root.style.height = height + 'px';
    }

    this.el = root;
    this._built = true;
    return root;
  }

  mount(parent) {
    if (!this._built) this._build();
    parent.appendChild(this.el);
    return this;
  }

  unmount() {
    if (this.el && this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
    }
    return this;
  }

  animate(delay = 0) {
    if (!this.el || typeof gsap === 'undefined') return this;

    gsap.fromTo(this.el,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.4, delay: delay, ease: 'power2.out' }
    );

    return this;
  }

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
  window.TapeStrip = TapeStrip;
}
