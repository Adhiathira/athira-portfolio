/* canvas-folio — Feature Card Component
 *
 * Creates a feature/info card on the canvas.
 * Light paper card with an icon circle, title, and body text,
 * attached with a tape strip at top center.
 *
 * Each feature card has:
 *   - Light surface background
 *   - Icon circle at top (emoji or text character)
 *   - Caveat title + Lora body text
 *   - Tape strip at top center (translucent yellow, rotated)
 *   - Paper shadow
 *   - GSAP tilt-jiggle entrance
 *
 * Usage:
 *   const card = new FeatureCard({
 *     x: 1800, y: 600, rotate: -1.5,
 *     icon: '✂',
 *     title: 'Clip from anywhere',
 *     body: 'Browser extension, mobile share sheet, drag-and-drop.'
 *   });
 *   card.mount(document.getElementById('canvas')).animate(0.15);
 */

class FeatureCard {
  /**
   * @param {Object} opts
   * @param {number}  opts.x            — Left position on canvas (px)
   * @param {number}  opts.y            — Top position on canvas (px)
   * @param {number}  [opts.rotate=0]   — Rotation in degrees
   * @param {string}  [opts.icon]       — Icon character (emoji or symbol)
   * @param {string}  [opts.title]      — Card title
   * @param {string}  [opts.body]       — Card body text
   * @param {number}  [opts.width=240]  — Card width in px
   * @param {HTMLElement} [opts.content] — DOM element for custom content
   */
  constructor(opts = {}) {
    this.opts = {
      x: 0,
      y: 0,
      rotate: 0,
      icon: '',
      title: '',
      body: '',
      width: 240,
      content: null,
      ...opts
    };

    this.el = null;
    this._built = false;
  }

  /** Build the DOM structure and return the root element. */
  _build() {
    const { x, y, rotate, icon, title, body, width, content } = this.opts;

    const root = document.createElement('div');
    root.className = 'canvas-item item-feature';
    root.style.left = x + 'px';
    root.style.top = y + 'px';
    root.style.transform = 'rotate(' + rotate + 'deg)';

    if (width !== 240) {
      root.style.width = width + 'px';
    }

    // Icon circle
    if (icon) {
      const iconEl = document.createElement('div');
      iconEl.className = 'feature-icon';
      iconEl.textContent = icon;
      root.appendChild(iconEl);
    }

    // Title
    if (title) {
      const h = document.createElement('h3');
      h.className = 'feature-title';
      h.textContent = title;
      root.appendChild(h);
    }

    // Body
    if (body) {
      const p = document.createElement('p');
      p.className = 'feature-body';
      p.textContent = body;
      root.appendChild(p);
    }

    // Custom content slot
    if (content instanceof HTMLElement) {
      const slot = document.createElement('div');
      slot.className = 'feature-content';
      slot.appendChild(content);
      root.appendChild(slot);
    }

    this.el = root;
    this._built = true;
    return root;
  }

  /**
   * Mount the feature card onto a parent element.
   * @param {HTMLElement} parent
   * @returns {FeatureCard} this
   */
  mount(parent) {
    if (!this._built) this._build();
    parent.appendChild(this.el);
    return this;
  }

  /**
   * Remove the feature card from the DOM.
   * @returns {FeatureCard} this
   */
  unmount() {
    if (this.el && this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
    }
    return this;
  }

  /**
   * GSAP entrance — tilt-jiggle: card tilts, wobbles, and settles,
   * like being placed on the board and adjusting.
   * @param {number} [delay=0]
   * @returns {FeatureCard} this
   */
  animate(delay = 0) {
    if (!this.el || typeof gsap === 'undefined') return this;

    const baseRotate = this.opts.rotate;

    gsap.fromTo(this.el,
      {
        rotation: baseRotate - 4,
        scale: 0.95,
        opacity: 0
      },
      {
        rotation: baseRotate,
        scale: 1,
        opacity: 1,
        duration: 0.7,
        delay: delay,
        ease: 'elastic.out(1, 0.5)'
      }
    );

    return this;
  }

  /**
   * Update the title text.
   * @param {string} text
   * @returns {FeatureCard} this
   */
  setTitle(text) {
    if (!this.el) return this;
    var h = this.el.querySelector('.feature-title');
    if (h) h.textContent = text;
    return this;
  }

  /**
   * Update the body text.
   * @param {string} text
   * @returns {FeatureCard} this
   */
  setBody(text) {
    if (!this.el) return this;
    var p = this.el.querySelector('.feature-body');
    if (p) p.textContent = text;
    return this;
  }

  /**
   * Update the content slot with a DOM element.
   * @param {HTMLElement} content
   * @returns {FeatureCard} this
   */
  setContent(content) {
    if (!this.el || !(content instanceof HTMLElement)) return this;
    let slot = this.el.querySelector('.feature-content');
    if (!slot) {
      slot = document.createElement('div');
      slot.className = 'feature-content';
      this.el.appendChild(slot);
    }
    slot.textContent = '';
    slot.appendChild(content);
    return this;
  }

  /**
   * Move the card to a new position.
   * @param {number} x
   * @param {number} y
   * @param {boolean} [animated=false]
   * @returns {FeatureCard} this
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
  window.FeatureCard = FeatureCard;
}
