(function() {
  'use strict';

  const CANVAS_W = 3400;
  const CANVAS_H = 2800;
  const viewport = document.getElementById('viewport');
  const canvas = document.getElementById('canvas');

  const state = {
    isDragging: false,
    startX: 0,
    startY: 0,
    translateX: 0,
    translateY: 0,
    scale: 1
  };

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  // Bounds keep the canvas within the viewport edges
  function getBounds() {
    const scaledW = CANVAS_W * state.scale;
    const scaledH = CANVAS_H * state.scale;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    var minX, maxX, minY, maxY;

    if (scaledW <= vw) {
      // Canvas fits in viewport — allow centering
      minX = 0;
      maxX = vw - scaledW;
    } else {
      minX = -(scaledW - vw);
      maxX = 0;
    }

    if (scaledH <= vh) {
      minY = 0;
      maxY = vh - scaledH;
    } else {
      minY = -(scaledH - vh);
      maxY = 0;
    }

    return { minX: minX, maxX: maxX, minY: minY, maxY: maxY };
  }

  function applyTransform() {
    canvas.style.transform =
      'translate(' + state.translateX + 'px, ' + state.translateY + 'px) scale(' + state.scale + ')';
  }

  // Center viewport on the postcard (2310, 1700, width 500, ~600px tall)
  var FOCUS_X = 1800;
  var FOCUS_Y = 1500;

  function centerCanvas() {
    state.translateX = (window.innerWidth / 2) - (FOCUS_X * state.scale);
    state.translateY = (window.innerHeight / 2) - (FOCUS_Y * state.scale);

    var bounds = getBounds();
    state.translateX = clamp(state.translateX, bounds.minX, bounds.maxX);
    state.translateY = clamp(state.translateY, bounds.minY, bounds.maxY);
    applyTransform();
  }

  function startDrag(x, y) {
    state.isDragging = true;
    state.startX = x - state.translateX;
    state.startY = y - state.translateY;
    viewport.classList.add('is-dragging');
  }

  function moveDrag(x, y) {
    if (!state.isDragging) return;
    if (document.body.classList.contains('overlay-open')) return;

    var bounds = getBounds();
    state.translateX = clamp(x - state.startX, bounds.minX, bounds.maxX);
    state.translateY = clamp(y - state.startY, bounds.minY, bounds.maxY);
    applyTransform();
  }

  function endDrag() {
    state.isDragging = false;
    viewport.classList.remove('is-dragging');
  }

  // ── Scroll to pan ────────────────────────────────────────────────────────
  viewport.addEventListener('wheel', function(e) {
    e.preventDefault();
    if (document.body.classList.contains('overlay-open')) return;

    var bounds = getBounds();
    state.translateX = clamp(state.translateX - e.deltaX, bounds.minX, bounds.maxX);
    state.translateY = clamp(state.translateY - e.deltaY, bounds.minY, bounds.maxY);
    applyTransform();
  }, { passive: false });

  // ── Mouse events ─────────────────────────────────────────────────────────
  viewport.addEventListener('mousedown', function(e) {
    startDrag(e.clientX, e.clientY);
  });

  window.addEventListener('mousemove', function(e) {
    moveDrag(e.clientX, e.clientY);
  });

  window.addEventListener('mouseup', function() {
    endDrag();
  });

  // ── Touch events (pan only) ──────────────────────────────────────────────
  viewport.addEventListener('touchstart', function(e) {
    if (e.touches.length === 1) {
      startDrag(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  viewport.addEventListener('touchmove', function(e) {
    e.preventDefault();
    if (e.touches.length === 1) {
      moveDrag(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: false });

  viewport.addEventListener('touchend', function(e) {
    if (e.touches.length === 0) endDrag();
  });

  // ── Resize ───────────────────────────────────────────────────────────────
  window.addEventListener('resize', function() {
    var bounds = getBounds();
    state.translateX = clamp(state.translateX, bounds.minX, bounds.maxX);
    state.translateY = clamp(state.translateY, bounds.minY, bounds.maxY);
    applyTransform();
  });

  // Initialize
  centerCanvas();

  // Expose state for other scripts
  window.canvasState = state;

  // ── Debug coordinate overlay (toggle with Shift+D) ──────────────────────
  var coordEl = document.createElement('div');
  coordEl.id = 'coord-debug';
  coordEl.style.cssText = 'position:fixed;top:12px;left:12px;z-index:9999;' +
    'background:rgba(0,0,0,0.75);color:#0f0;font:13px/1.4 monospace;' +
    'padding:6px 10px;border-radius:6px;pointer-events:none;display:none;';
  document.body.appendChild(coordEl);

  var coordVisible = false;
  window.addEventListener('keydown', function(e) {
    if (e.shiftKey && e.key === 'D') {
      coordVisible = !coordVisible;
      coordEl.style.display = coordVisible ? 'block' : 'none';
    }
  });

  window.addEventListener('mousemove', function(e) {
    if (!coordVisible) return;
    var rect = canvas.getBoundingClientRect();
    var scaleX = rect.width / canvas.offsetWidth;
    var cx = Math.round((e.clientX - rect.left) / scaleX);
    var cy = Math.round((e.clientY - rect.top) / scaleX);
    coordEl.textContent = 'x: ' + cx + '  y: ' + cy +
      '  |  tx: ' + Math.round(state.translateX) +
      '  ty: ' + Math.round(state.translateY) +
      '  rect.top: ' + Math.round(rect.top) +
      '  offsetH: ' + canvas.offsetHeight;
  });
})();
