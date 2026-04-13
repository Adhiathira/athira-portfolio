/* canvas-folio — Book Cover Component
 *
 * Places a book cover image on the canvas with realistic styling:
 *   - Spine shadow on the left edge
 *   - Paper shadow underneath
 *   - Optional slight perspective tilt
 *   - GSAP slide-in entrance
 *
 * Usage:
 *   const book = new BookCover({
 *     x: 400, y: 600, rotate: 3,
 *     src: 'images/book-1.jpg',
 *     width: 160
 *   });
 *   book.mount(document.getElementById('canvas')).animate(0.2);
 */

class BookCover {
  /**
   * @param {Object} opts
   * @param {number}  opts.x            — Left position on canvas (px)
   * @param {number}  opts.y            — Top position on canvas (px)
   * @param {number}  [opts.rotate=0]   — Rotation in degrees
   * @param {string}  opts.src          — Image source path
   * @param {string}  [opts.alt='']     — Alt text for image
   * @param {number}  [opts.width=160]  — Display width in px (height auto)
   */
  constructor(opts = {}) {
    this.opts = {
      x: 0,
      y: 0,
      rotate: 0,
      src: '',
      alt: '',
      width: 160,
      ...opts
    };

    this.el = null;
    this._built = false;
  }

  _build() {
    const { x, y, rotate, src, alt, width } = this.opts;

    const root = document.createElement('div');
    root.className = 'canvas-item item-book';
    root.style.left = x + 'px';
    root.style.top = y + 'px';
    root.style.transform = 'rotate(' + rotate + 'deg)';
    root.style.width = width + 'px';

    const img = document.createElement('img');
    img.className = 'book-img';
    img.src = src;
    img.alt = alt;
    img.draggable = false;
    root.appendChild(img);

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

    var baseRotate = this.opts.rotate;

    gsap.fromTo(this.el,
      { x: -20, rotation: baseRotate + 4, opacity: 0 },
      { x: 0, rotation: baseRotate, opacity: 1, duration: 0.6, delay: delay, ease: 'power2.out' }
    );

    return this;
  }

  moveTo(x, y, animated) {
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
  window.BookCover = BookCover;
}
