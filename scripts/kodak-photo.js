/* canvas-folio — Kodak Photo Component
 *
 * Creates a classic Kodak camera print — a rectangular 3:2 landscape
 * photo with thin white border, rounded corners, warm vintage tone,
 * and an orange date stamp in the bottom-right corner.
 *
 * Visually distinct from the Polaroid component:
 *   - 3:2 landscape ratio (not 1:1 square)
 *   - Thin uniform border (not thick bottom gutter)
 *   - More rounded corners (6px vs 2px)
 *   - Orange date stamp overlay (film camera date burn)
 *   - No pin/tape — loose print lying on the board
 *
 * Usage:
 *   const kodak = new KodakPhoto({
 *     x: 400, y: 300, rotate: 2,
 *     initials: 'M K', date: "JUL '98"
 *   });
 *   kodak.mount(document.getElementById('canvas')).animate(0.5);
 */

class KodakPhoto {
  /**
   * @param {Object} opts
   * @param {number}  opts.x            — Left position on canvas (px)
   * @param {number}  opts.y            — Top position on canvas (px)
   * @param {number}  [opts.rotate=0]   — Rotation in degrees
   * @param {number}  [opts.width=220]  — Card width (px)
   * @param {string}  [opts.initials=''] — Initials inside image placeholder
   * @param {string}  [opts.date='']    — Date stamp text (e.g. "JUL '98")
   * @param {string}  [opts.portfolio=null] — Portfolio slug for data attribute
   */
  constructor(opts = {}) {
    this.opts = {
      x: 0,
      y: 0,
      rotate: 0,
      width: 220,
      initials: '',
      date: '',
      portfolio: null,
      ...opts
    };

    this.el = null;
    this._built = false;
  }

  /** Build the DOM structure and return the root element. */
  _build() {
    const { x, y, rotate, width, initials, date, portfolio } = this.opts;

    const root = document.createElement('div');
    root.className = 'canvas-item item-kodak';
    root.style.left = x + 'px';
    root.style.top = y + 'px';
    root.style.width = width + 'px';
    root.style.transform = 'rotate(' + rotate + 'deg)';

    if (portfolio) {
      root.setAttribute('data-portfolio', portfolio);
    }

    // Image area — 3:2 landscape placeholder
    const img = document.createElement('div');
    img.className = 'kodak-img';

    if (this.opts.video) {
      const vid = document.createElement('video');
      vid.className = 'kodak-video';
      vid.src = this.opts.video;
      vid.muted = true;
      vid.autoplay = true;
      vid.loop = true;
      vid.playsInline = true;
      vid.setAttribute('playsinline', '');
      img.appendChild(vid);
    } else if (this.opts.src) {
      const photo = document.createElement('img');
      photo.className = 'kodak-photo';
      photo.src = this.opts.src;
      photo.alt = this.opts.alt || 'Kodak photo';
      img.appendChild(photo);
    } else if (initials) {
      const init = document.createElement('span');
      init.className = 'kodak-initials';
      init.textContent = initials;
      img.appendChild(init);
    }

    root.appendChild(img);

    // Date stamp — orange overlay in bottom-right
    if (date) {
      const stamp = document.createElement('span');
      stamp.className = 'kodak-date';
      stamp.textContent = date;
      root.appendChild(stamp);
    }

    this.el = root;
    this._built = true;
    return root;
  }

  /**
   * Mount the Kodak photo onto a parent element.
   * @param {HTMLElement} parent
   * @returns {KodakPhoto} this
   */
  mount(parent) {
    if (!this._built) this._build();
    parent.appendChild(this.el);
    return this;
  }

  /**
   * Remove the Kodak photo from the DOM.
   * @returns {KodakPhoto} this
   */
  unmount() {
    if (this.el && this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
    }
    return this;
  }

  /**
   * GSAP entrance — fade in with slight scale.
   * @param {number} [delay=0]
   * @returns {KodakPhoto} this
   */
  animate(delay = 0) {
    if (!this.el || typeof gsap === 'undefined') return this;

    gsap.fromTo(this.el,
      { opacity: 0, scale: 0.92, y: 12 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        delay: delay,
        ease: 'power2.out'
      }
    );

    return this;
  }

  /**
   * Move the photo to a new position.
   * @param {number} x
   * @param {number} y
   * @param {boolean} [animated=false]
   * @returns {KodakPhoto} this
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
  window.KodakPhoto = KodakPhoto;
}
