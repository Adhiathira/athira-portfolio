/* canvas-folio — Text Clip Component
 *
 * Creates a paper clipping on the canvas — a snippet of text
 * pinned to the board with a terracotta pushpin.
 * Each text clip has:
 *   - Light paper background (surface-light)
 *   - Headline text in Caveat handwriting (bold)
 *   - Optional annotation text below (lighter, italic feel)
 *   - Terracotta pushpin at top center
 *   - GSAP tilt-jiggle entrance animation
 *
 * Usage:
 *   const clip = new TextClip({
 *     x: 1400, y: 600, rotate: 2,
 *     headline: 'Typography first.',
 *     annotation: '— from Brand Review, March'
 *   });
 *   clip.mount(document.getElementById('canvas')).animate(0.2);
 */

class TextClip {
  /**
   * @param {Object} opts
   * @param {number}  opts.x              — Left position on canvas (px)
   * @param {number}  opts.y              — Top position on canvas (px)
   * @param {number}  [opts.rotate=0]     — Rotation in degrees
   * @param {string}  [opts.headline]     — Bold headline text
   * @param {string}  [opts.annotation]   — Lighter annotation text below
   * @param {number}  [opts.width=220]    — Max width in px
   * @param {HTMLElement} [opts.content]  — DOM element for custom content
   */
  constructor(opts = {}) {
    this.opts = {
      x: 0,
      y: 0,
      rotate: 0,
      headline: '',
      annotation: '',
      width: 220,
      content: null,
      ...opts
    };

    this.el = null;
    this._built = false;
  }

  /** Build the DOM structure and return the root element. */
  _build() {
    const { x, y, rotate, headline, annotation, width, content } = this.opts;

    const root = document.createElement('div');
    root.className = 'canvas-item item-clip';
    root.style.left = x + 'px';
    root.style.top = y + 'px';
    root.style.transform = 'rotate(' + rotate + 'deg)';

    if (width !== 220) {
      root.style.maxWidth = width + 'px';
    }

    // Headline
    if (headline) {
      const h = document.createElement('h3');
      h.className = 'clip-headline';
      h.textContent = headline;
      root.appendChild(h);
    }

    // Annotation
    if (annotation) {
      const a = document.createElement('p');
      a.className = 'clip-annotation';
      a.textContent = annotation;
      root.appendChild(a);
    }

    // Custom content slot
    if (content instanceof HTMLElement) {
      const slot = document.createElement('div');
      slot.className = 'clip-content';
      slot.appendChild(content);
      root.appendChild(slot);
    }

    this.el = root;
    this._built = true;
    return root;
  }

  /**
   * Mount the text clip onto a parent element.
   * @param {HTMLElement} parent
   * @returns {TextClip} this
   */
  mount(parent) {
    if (!this._built) this._build();
    parent.appendChild(this.el);
    return this;
  }

  /**
   * Remove the text clip from the DOM.
   * @returns {TextClip} this
   */
  unmount() {
    if (this.el && this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
    }
    return this;
  }

  /**
   * GSAP entrance — tilt-jiggle: card tilts and settles with a wobble,
   * like being placed on the board and adjusting.
   * @param {number} [delay=0]
   * @returns {TextClip} this
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
        duration: 0.6,
        delay: delay,
        ease: 'elastic.out(1, 0.5)'
      }
    );

    return this;
  }

  /**
   * Update the headline text.
   * @param {string} text
   * @returns {TextClip} this
   */
  setHeadline(text) {
    if (!this.el) return this;
    const h = this.el.querySelector('.clip-headline');
    if (h) h.textContent = text;
    return this;
  }

  /**
   * Update the annotation text.
   * @param {string} text
   * @returns {TextClip} this
   */
  setAnnotation(text) {
    if (!this.el) return this;
    const a = this.el.querySelector('.clip-annotation');
    if (a) a.textContent = text;
    return this;
  }

  /**
   * Update the content slot with a DOM element.
   * @param {HTMLElement} content
   * @returns {TextClip} this
   */
  setContent(content) {
    if (!this.el || !(content instanceof HTMLElement)) return this;
    let slot = this.el.querySelector('.clip-content');
    if (!slot) {
      slot = document.createElement('div');
      slot.className = 'clip-content';
      this.el.appendChild(slot);
    }
    slot.textContent = '';
    slot.appendChild(content);
    return this;
  }

  /**
   * Move the clip to a new position.
   * @param {number} x
   * @param {number} y
   * @param {boolean} [animated=false]
   * @returns {TextClip} this
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
  window.TextClip = TextClip;
}
