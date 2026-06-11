// cipher-drop — matrix rain canvas — digital cascade background

(function () {
  'use strict';

  const CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホABCDEF0123456789><|{}[]';
  const GREEN_BRIGHT = '#00ff41';
  const GREEN_MID = '#008f11';
  const GREEN_DIM = '#004d08';
  const BLACK = '#000000';

  function initMatrixRain(canvas) {
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height, columns, drops;

    function resize() {
      width = canvas.clientWidth || canvas.parentElement.clientWidth;
      height = canvas.clientHeight || canvas.parentElement.clientHeight;
      canvas.width = width;
      canvas.height = height;
      columns = Math.floor(width / 16);
      drops = new Array(columns).fill(0).map(function () {
        return Math.random() * -50;
      });
    }

    // Defer initial sizing so CSS layout is fully settled
    requestAnimationFrame(function () {
      resize();
    });
    window.addEventListener('resize', resize);

    function draw() {
      // Fade trail
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = '14px "Share Tech Mono", monospace';

      for (var i = 0; i < drops.length; i++) {
        var char = CHARS[Math.floor(Math.random() * CHARS.length)];
        var y = drops[i] * 16;
        var x = i * 16;

        // Leading character: full bright green
        ctx.fillStyle = GREEN_BRIGHT;
        ctx.shadowColor = GREEN_BRIGHT;
        ctx.shadowBlur = 6;
        ctx.fillText(char, x, y);

        // Reset shadow for trailing chars
        ctx.shadowBlur = 0;

        // Trail: mid and dim characters above
        if (drops[i] > 2) {
          ctx.fillStyle = GREEN_MID;
          ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, y - 16);
        }
        if (drops[i] > 4) {
          ctx.fillStyle = GREEN_DIM;
          ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, y - 32);
        }

        // Advance drop; reset when past bottom
        drops[i] += 0.5 + Math.random() * 0.5;
        if (drops[i] * 16 > height && Math.random() > 0.975) {
          drops[i] = -Math.floor(Math.random() * 20);
        }
      }
    }

    return setInterval(draw, 50);
  }

  // Initialize on hero canvas
  document.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('matrix-canvas');
    if (canvas) {
      initMatrixRain(canvas);
    }
  });
})();
