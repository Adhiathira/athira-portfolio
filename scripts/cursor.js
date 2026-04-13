/* canvas-folio — Custom Collaborative Cursor
 *
 * Replaces the default mouse cursor with a Figma-style collaborative
 * cursor: a small pointer arrow with an orange pill-shaped name label.
 * The label reads "Anonymous turtle" (or any configured name).
 *
 * Usage:
 *   initCursor({ name: 'Anonymous turtle', color: '#e8752a' });
 */

function initCursor(opts) {
  opts = opts || {};
  var name = opts.name || 'Anonymous turtle';
  var color = opts.color || '#e8752a';

  var viewport = document.getElementById('viewport');
  if (!viewport) return;

  // ── Build cursor element via DOM API ──────────────────────────────────
  var el = document.createElement('div');
  el.className = 'collab-cursor';
  el.style.setProperty('--cursor-color', color);

  // SVG pointer arrow (top-left)
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

  // Name label pill
  var label = document.createElement('span');
  label.className = 'collab-cursor-label';
  label.style.background = color;
  // Split emoji from text so we can size the emoji independently
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

  // ── Hide default cursor on the viewport ───────────────────────────────
  viewport.style.cursor = 'none';

  // ── Track mouse movement ──────────────────────────────────────────────
  var visible = false;

  viewport.addEventListener('mousemove', function (e) {
    if (!visible) {
      el.style.opacity = '1';
      visible = true;
    }
    el.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
  });

  viewport.addEventListener('mouseleave', function () {
    el.style.opacity = '0';
    visible = false;
  });

  viewport.addEventListener('mouseenter', function () {
    el.style.opacity = '1';
    visible = true;
  });
}

if (typeof window !== 'undefined') {
  window.initCursor = initCursor;
}
