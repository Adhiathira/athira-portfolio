/* canvas-folio — Postcard Component
 *
 * Creates a hand-drawn Polaroid-style card on the canvas.
 * Each postcard has:
 *   - 3 independently wobbling sketchy border lines (via SVG feTurbulence filters)
 *   - Tape piece at top center
 *   - White photo area with sketchy border
 *   - Optional heart doodle
 *   - Caption text in handwriting font
 *   - Optional content slot for text, CTAs, or any HTML
 *   - GSAP entrance animation
 *
 * Usage:
 *   const card = new Postcard({
 *     x: 1100, y: 800, rotate: -1.5,
 *     caption: 'Hello from Tokyo',
 *     heart: true,
 *     portfolio: 'tokyo-project'
 *   });
 *   card.mount(document.getElementById('canvas'));
 *
 *   // Add content after mounting
 *   const btn = document.createElement('button');
 *   btn.textContent = 'View Project';
 *   card.setContent(btn);
 */

class Postcard {
  /**
   * @param {Object} opts
   * @param {number}  opts.x        — Left position on canvas (px)
   * @param {number}  opts.y        — Top position on canvas (px)
   * @param {number}  [opts.rotate=0]  — Rotation in degrees
   * @param {string}  [opts.caption]   — Handwritten caption text
   * @param {boolean} [opts.heart=false] — Show heart doodle
   * @param {string}  [opts.portfolio]  — Portfolio slug (makes card clickable)
   * @param {HTMLElement} [opts.content] — DOM element for content slot
   * @param {number}  [opts.width=260]  — Card width in px
   */
  constructor(opts = {}) {
    this.opts = {
      x: 0,
      y: 0,
      rotate: 0,
      caption: '',
      heart: false,
      portfolio: null,
      content: null,
      width: 260,
      ...opts
    };

    this.el = null;
    this._built = false;
  }

  /** Build the DOM structure and return the root element. */
  _build() {
    const { x, y, rotate, caption, heart, portfolio, content, width } = this.opts;

    // Root element
    const root = document.createElement('div');
    root.className = 'canvas-item item-postcard';
    root.style.left = x + 'px';
    root.style.top = y + 'px';
    root.style.transform = 'rotate(' + rotate + 'deg)';

    if (width !== 260) {
      root.style.width = width + 'px';
    }

    if (portfolio) {
      root.dataset.portfolio = portfolio;
    }

    // Third sketchy border line (DOM element — needs its own filter)
    const sketch = document.createElement('div');
    sketch.className = 'postcard-sketch';
    root.appendChild(sketch);

    // Photo area
    const photo = document.createElement('div');
    photo.className = 'postcard-photo';
    root.appendChild(photo);

    // Caption
    if (caption) {
      const cap = document.createElement('div');
      cap.className = 'postcard-caption';
      cap.textContent = caption;
      root.appendChild(cap);
    }

    // Heart doodle
    if (heart) {
      const heartEl = document.createElement('div');
      heartEl.className = 'postcard-heart';
      root.appendChild(heartEl);
    }

    // Content slot — accepts a DOM element (text, CTAs, links)
    if (content instanceof HTMLElement) {
      const slot = document.createElement('div');
      slot.className = 'postcard-content';
      slot.appendChild(content);
      root.appendChild(slot);
    }

    this.el = root;
    this._built = true;
    return root;
  }

  /**
   * Mount the postcard onto a parent element (typically the canvas).
   * @param {HTMLElement} parent
   * @returns {Postcard} this (for chaining)
   */
  mount(parent) {
    if (!this._built) this._build();
    parent.appendChild(this.el);
    return this;
  }

  /**
   * Remove the postcard from the DOM.
   * @returns {Postcard} this
   */
  unmount() {
    if (this.el && this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
    }
    return this;
  }

  /**
   * GSAP entrance animation — card drops in with a spring bounce.
   * Requires GSAP to be loaded globally.
   * @param {number} [delay=0] — Delay in seconds before animation starts
   * @returns {Postcard} this
   */
  animate(delay = 0) {
    if (!this.el || typeof gsap === 'undefined') return this;

    // Pivot from the tape (top center) — card swings like it's pinned
    this.el.style.transformOrigin = 'top center';

    const baseRotate = this.opts.rotate;
    const swing = 3 + Math.random() * 2; // 3–5 deg wobble

    gsap.fromTo(this.el,
      { rotation: baseRotate + swing },
      {
        rotation: baseRotate,
        duration: 1.2,
        delay: delay,
        ease: 'elastic.out(1, 0.4)'
      }
    );

    return this;
  }

  /**
   * Update the caption text.
   * @param {string} text
   * @returns {Postcard} this
   */
  setCaption(text) {
    if (!this.el) return this;
    const cap = this.el.querySelector('.postcard-caption');
    if (cap) cap.textContent = text;
    return this;
  }

  /**
   * Update the content slot with a DOM element.
   * @param {HTMLElement} content
   * @returns {Postcard} this
   */
  setContent(content) {
    if (!this.el || !(content instanceof HTMLElement)) return this;
    let slot = this.el.querySelector('.postcard-content');
    if (!slot) {
      slot = document.createElement('div');
      slot.className = 'postcard-content';
      this.el.appendChild(slot);
    }
    slot.textContent = '';
    slot.appendChild(content);
    return this;
  }

  /**
   * Move the card to a new position on the canvas.
   * @param {number} x
   * @param {number} y
   * @param {boolean} [animated=false] — Use GSAP to animate the move
   * @returns {Postcard} this
   */
  moveTo(x, y, animated = false) {
    this.opts.x = x;
    this.opts.y = y;
    if (!this.el) return this;

    if (animated && typeof gsap !== 'undefined') {
      gsap.to(this.el, {
        left: x,
        top: y,
        duration: 0.5,
        ease: 'power2.out'
      });
    } else {
      this.el.style.left = x + 'px';
      this.el.style.top = y + 'px';
    }
    return this;
  }
}

// Attach to window for script tag usage
if (typeof window !== 'undefined') {
  window.Postcard = Postcard;
}
