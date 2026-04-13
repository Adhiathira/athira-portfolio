/* canvas-folio — Polaroid Component
 *
 * Creates a classic Polaroid-style card on the canvas.
 * Different from Postcard: white background, square image area,
 * thick bottom gutter for text, pushpin instead of tape.
 *
 * Each polaroid has:
 *   - White background with Polaroid proportions (thick bottom)
 *   - Square image placeholder area
 *   - Optional initials display (avatar substitute)
 *   - Quote/text in handwriting
 *   - Attribution name below
 *   - Terracotta pushpin at top center
 *   - GSAP pin-drop entrance animation
 *
 * Usage:
 *   const card = new Polaroid({
 *     x: 900, y: 1200, rotate: -2,
 *     initials: 'J W',
 *     quote: '"Finally a tool that gets how messy research is."',
 *     name: 'Juno W. — Visual Director'
 *   });
 *   card.mount(document.getElementById('canvas')).animate(0.2);
 */

class Polaroid {
  /**
   * @param {Object} opts
   * @param {number}  opts.x              — Left position on canvas (px)
   * @param {number}  opts.y              — Top position on canvas (px)
   * @param {number}  [opts.rotate=0]     — Rotation in degrees
   * @param {string}  [opts.initials]     — Avatar initials (e.g. 'J W')
   * @param {string}  [opts.quote]        — Quote or body text
   * @param {string}  [opts.name]         — Attribution name
   * @param {number}  [opts.width=240]    — Card width in px
   * @param {HTMLElement} [opts.content]  — DOM element for custom content
   */
  constructor(opts = {}) {
    this.opts = {
      x: 0,
      y: 0,
      rotate: 0,
      initials: '',
      quote: '',
      name: '',
      width: 240,
      content: null,
      portfolio: null,
      ...opts
    };

    this.el = null;
    this._built = false;
  }

  /** Build the DOM structure and return the root element. */
  _build() {
    const { x, y, rotate, initials, quote, name, width, content, portfolio } = this.opts;

    const root = document.createElement('div');
    root.className = 'canvas-item item-polaroid';
    root.style.left = x + 'px';
    root.style.top = y + 'px';
    root.style.transform = 'rotate(' + rotate + 'deg)';

    if (width !== 240) {
      root.style.width = width + 'px';
    }

    if (portfolio) {
      root.dataset.portfolio = portfolio;
    }

    // Image area — contains the photo and the handwritten overlay
    const img = document.createElement('div');
    img.className = 'polaroid-img';

    if (this.opts.src) {
      var isVideo = /\.(mp4|webm|mov)$/i.test(this.opts.src);
      if (isVideo) {
        const vid = document.createElement('video');
        vid.className = 'polaroid-photo';
        vid.src = this.opts.src;
        vid.autoplay = true;
        vid.muted = true;
        vid.loop = true;
        vid.playsInline = true;
        vid.setAttribute('playsinline', '');
        vid.setAttribute('muted', '');
        img.appendChild(vid);
        // Browsers block autoplay on dynamically added videos — force play once mounted
        vid.addEventListener('loadeddata', function() { vid.play().catch(function() {}); });
      } else {
        const photo = document.createElement('img');
        photo.className = 'polaroid-photo';
        photo.src = this.opts.src;
        photo.alt = this.opts.name || 'Polaroid photo';
        img.appendChild(photo);
      }
    } else if (initials) {
      const init = document.createElement('span');
      init.className = 'polaroid-initials';
      init.textContent = initials;
      img.appendChild(init);
    }

    // Handwritten overlay — text sits over the image with a gradient
    if (quote || name) {
      const overlay = document.createElement('div');
      overlay.className = 'polaroid-overlay';

      if (quote) {
        const q = document.createElement('p');
        q.className = 'polaroid-quote';
        q.textContent = quote;
        overlay.appendChild(q);
      }

      if (name) {
        const n = document.createElement('p');
        n.className = 'polaroid-name';
        n.textContent = name;
        overlay.appendChild(n);
      }

      root._overlay = overlay;
    }

    root.appendChild(img);

    // Append overlay after img so text sits in the white gutter
    if (root._overlay) {
      root.appendChild(root._overlay);
      delete root._overlay;
    }

    // Custom content slot
    if (content instanceof HTMLElement) {
      const slot = document.createElement('div');
      slot.className = 'polaroid-content';
      slot.appendChild(content);
      root.appendChild(slot);
    }

    this.el = root;
    this._built = true;
    return root;
  }

  /**
   * Mount the polaroid onto a parent element.
   * @param {HTMLElement} parent
   * @returns {Polaroid} this
   */
  mount(parent) {
    if (!this._built) this._build();
    parent.appendChild(this.el);
    return this;
  }

  /**
   * Remove the polaroid from the DOM.
   * @returns {Polaroid} this
   */
  unmount() {
    if (this.el && this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
    }
    return this;
  }

  /**
   * GSAP entrance — pin-drop: drops from above with a bounce,
   * like a photo being pinned to the board.
   * @param {number} [delay=0]
   * @returns {Polaroid} this
   */
  animate(delay = 0) {
    if (!this.el || typeof gsap === 'undefined') return this;

    const baseRotate = this.opts.rotate;

    gsap.fromTo(this.el,
      {
        y: -40,
        rotation: baseRotate - 3,
        opacity: 0
      },
      {
        y: 0,
        rotation: baseRotate,
        opacity: 1,
        duration: 0.7,
        delay: delay,
        ease: 'elastic.out(1, 0.5)'
      }
    );

    return this;
  }

  /**
   * Update the quote text.
   * @param {string} text
   * @returns {Polaroid} this
   */
  setQuote(text) {
    if (!this.el) return this;
    const q = this.el.querySelector('.polaroid-quote');
    if (q) q.textContent = text;
    return this;
  }

  /**
   * Update the name text.
   * @param {string} text
   * @returns {Polaroid} this
   */
  setName(text) {
    if (!this.el) return this;
    const n = this.el.querySelector('.polaroid-name');
    if (n) n.textContent = text;
    return this;
  }

  /**
   * Update the content slot with a DOM element.
   * @param {HTMLElement} content
   * @returns {Polaroid} this
   */
  setContent(content) {
    if (!this.el || !(content instanceof HTMLElement)) return this;
    let slot = this.el.querySelector('.polaroid-content');
    if (!slot) {
      slot = document.createElement('div');
      slot.className = 'polaroid-content';
      this.el.appendChild(slot);
    }
    slot.textContent = '';
    slot.appendChild(content);
    return this;
  }

  /**
   * Move the polaroid to a new position.
   * @param {number} x
   * @param {number} y
   * @param {boolean} [animated=false]
   * @returns {Polaroid} this
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
  window.Polaroid = Polaroid;
}
