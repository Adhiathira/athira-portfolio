/* canvas-folio — Ghost Collaborative Cursor
 *
 * Spawns an autonomous Figma-style cursor that moves between items on
 * the canvas, simulating another person ("Athira") actively working on
 * the board. The cursor converts canvas-space coordinates to screen-space
 * using window.canvasState so it tracks correctly during pan/scroll.
 *
 * Human-like motion characteristics:
 *   - Curved arcs (not straight lines) via a random control point
 *   - Slow start / fast middle / ease into target
 *   - Slight overshoot then correction on arrival
 *   - Idle micro-drift while "reading" an item
 *   - Variable pauses (quick glances vs. long reads)
 *
 * Usage (in DOMContentLoaded):
 *   initGhostCursor({ name: 'Athira', color: '#d65ba8' });
 */

function initGhostCursor(opts) {
  opts = opts || {};
  var name  = opts.name  || 'Athira';
  var color = opts.color || '#d65ba8';
  var delay = opts.delay || 3;

  // ── Build the cursor element ─────────────────────────────────────────
  var el = document.createElement('div');
  el.className = 'collab-cursor';
  el.style.opacity = '0';
  el.style.transition = 'opacity 0.4s ease';

  var svgNS = 'http://www.w3.org/2000/svg';
  var svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('class', 'collab-cursor-arrow');
  svg.setAttribute('width', '16');
  svg.setAttribute('height', '20');
  svg.setAttribute('viewBox', '0 0 16 20');
  svg.setAttribute('fill', 'none');

  var path = document.createElementNS(svgNS, 'path');
  path.setAttribute('d', 'M0.5 0.5L15 11.5L8 12.5L5 19.5L0.5 0.5Z');
  path.setAttribute('fill', color);
  path.setAttribute('stroke', 'white');
  path.setAttribute('stroke-width', '1');
  svg.appendChild(path);

  var label = document.createElement('span');
  label.className = 'collab-cursor-label';
  label.style.background = color;

  var emojiMatch = name.match(/([\p{Emoji_Presentation}\p{Extended_Pictographic}])/u);
  if (emojiMatch) {
    var textPart = name.replace(emojiMatch[0], '').trim();
    label.textContent = textPart + ' ';
    var emojiSpan = document.createElement('span');
    emojiSpan.className = 'collab-cursor-emoji';
    emojiSpan.textContent = emojiMatch[0];
    label.appendChild(emojiSpan);
  } else {
    label.textContent = name;
  }

  el.appendChild(svg);
  el.appendChild(label);
  document.body.appendChild(el);

  // ── Waypoints — canvas-space coordinates of items to visit ───────────
  var waypoints = [
    { x: 2500, y: 1900 },   // bio postcard area
    { x: 2870, y: 1880 },   // sticky note
    { x: 1850, y: 1820 },   // cPGuard polaroid
    { x: 2850, y: 1600 },   // Rohan polaroid
    { x: 1650, y: 1600 },   // Kodak photo
    { x: 2200, y: 2360 },   // typography clip
    { x: 2700, y: 2220 },   // "less noise" clip
    { x: 2200, y: 2600 },   // pull quote
    { x: 2700, y: 2500 },   // feature card
    { x: 1550, y: 2100 },   // Pickio polaroid
    { x: 1830, y: 1700 },   // flip card
    { x: 3100, y: 2150 },   // Night Circus book
  ];

  // ── Canvas → screen coordinate conversion ────────────────────────────
  function toScreen(cx, cy) {
    var s = window.canvasState || { translateX: 0, translateY: 0, scale: 1 };
    return {
      x: cx * s.scale + s.translateX,
      y: cy * s.scale + s.translateY
    };
  }

  // ── Animation state ──────────────────────────────────────────────────
  var canvasX = waypoints[0].x;
  var canvasY = waypoints[0].y;
  var currentIndex = 0;
  var idleTween = null;

  // Sync element position to canvas coords every frame
  function syncPosition() {
    var screen = toScreen(canvasX, canvasY);
    el.style.transform = 'translate(' + screen.x + 'px, ' + screen.y + 'px)';
    requestAnimationFrame(syncPosition);
  }

  // ── Quadratic bezier interpolation ───────────────────────────────────
  // Returns a point on a quadratic bezier curve at parameter t (0–1).
  // p0 = start, p1 = control, p2 = end.
  function bezierPoint(p0x, p0y, p1x, p1y, p2x, p2y, t) {
    var inv = 1 - t;
    return {
      x: inv * inv * p0x + 2 * inv * t * p1x + t * t * p2x,
      y: inv * inv * p0y + 2 * inv * t * p1y + t * t * p2y
    };
  }

  // ── Idle drift — tiny movements while "reading" an item ──────────────
  function startIdleDrift() {
    var baseX = canvasX;
    var baseY = canvasY;

    function drift() {
      var ox = baseX + (Math.random() * 12 - 6);
      var oy = baseY + (Math.random() * 10 - 5);
      idleTween = gsap.to(
        { cx: canvasX, cy: canvasY },
        {
          cx: ox, cy: oy,
          duration: 0.6 + Math.random() * 0.8,
          ease: 'sine.inOut',
          onUpdate: function() {
            canvasX = this.targets()[0].cx;
            canvasY = this.targets()[0].cy;
          },
          onComplete: drift
        }
      );
    }
    drift();
  }

  function stopIdleDrift() {
    if (idleTween) {
      idleTween.kill();
      idleTween = null;
    }
  }

  // ── Move to next waypoint with curved, human-like motion ─────────────
  function moveToNext() {
    stopIdleDrift();

    currentIndex = (currentIndex + 1) % waypoints.length;
    var target = waypoints[currentIndex];

    // Add slight randomness to landing position (±25px)
    var tx = target.x + (Math.random() * 50 - 25);
    var ty = target.y + (Math.random() * 50 - 25);

    var startX = canvasX;
    var startY = canvasY;

    // ── Curved path via a random control point ─────────────────────────
    // Offset the control point perpendicular to the direct line.
    // This creates a natural arc rather than a straight line.
    var midX = (startX + tx) / 2;
    var midY = (startY + ty) / 2;
    var dx = tx - startX;
    var dy = ty - startY;
    var dist = Math.sqrt(dx * dx + dy * dy);

    // Perpendicular offset (30–60% of distance, random direction)
    var perpScale = (0.15 + Math.random() * 0.25) * (Math.random() < 0.5 ? -1 : 1);
    var ctrlX = midX + (-dy) * perpScale;
    var ctrlY = midY + dx * perpScale;

    // Duration: proportional to distance, but with a floor and ceiling
    var duration = Math.max(1.5, Math.min(3.8, dist / 350));

    // Pause before moving (reading/inspecting)
    var pause = 1.2 + Math.random() * 2.5;

    // Start idle drift during the pause
    startIdleDrift();

    var proxy = { t: 0 };

    gsap.to(proxy, {
      t: 1,
      duration: duration,
      delay: pause,
      ease: 'power3.inOut',
      onStart: function() {
        stopIdleDrift();
      },
      onUpdate: function() {
        var pt = bezierPoint(startX, startY, ctrlX, ctrlY, tx, ty, proxy.t);
        canvasX = pt.x;
        canvasY = pt.y;
      },
      onComplete: function() {
        // ── Slight overshoot then settle ────────────────────────────
        // 30% chance of overshoot for variety
        if (Math.random() < 0.3) {
          var overX = canvasX + (Math.random() * 20 - 10);
          var overY = canvasY + (Math.random() * 16 - 8);
          gsap.to(
            { cx: canvasX, cy: canvasY },
            {
              cx: overX, cy: overY,
              duration: 0.15,
              ease: 'power1.out',
              onUpdate: function() {
                canvasX = this.targets()[0].cx;
                canvasY = this.targets()[0].cy;
              },
              onComplete: function() {
                // Settle back
                gsap.to(
                  { cx: canvasX, cy: canvasY },
                  {
                    cx: tx, cy: ty,
                    duration: 0.25,
                    ease: 'power2.out',
                    onUpdate: function() {
                      canvasX = this.targets()[0].cx;
                      canvasY = this.targets()[0].cy;
                    },
                    onComplete: moveToNext
                  }
                );
              }
            }
          );
        } else {
          moveToNext();
        }
      }
    });
  }

  // ── Start after a delay (simulate "joining" the session) ─────────────
  setTimeout(function() {
    var start = toScreen(canvasX, canvasY);
    el.style.transform = 'translate(' + start.x + 'px, ' + start.y + 'px)';
    el.style.opacity = '1';

    syncPosition();
    setTimeout(moveToNext, 1500);
  }, delay * 1000);
}

if (typeof window !== 'undefined') {
  window.initGhostCursor = initGhostCursor;
}
