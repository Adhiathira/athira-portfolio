/* canvas-folio — Tile Mosaic Texture Generator
 *
 * Generates an orange cutting-mat / mosaic tile background where each
 * square has a slightly different shade of orange, separated by thin
 * lighter "grout" lines. The texture is rendered to an offscreen
 * <canvas>, converted to a data URL, and applied as a repeating
 * background-image on #canvas and #viewport.
 *
 * The tile pattern repeats seamlessly because we generate a grid of
 * NxN tiles as a single bitmap tile.
 */

(function generateTileTexture() {
  const TILE    = 28;    // px per tile (smaller = denser grid like reference)
  const GAP     = 1;     // grout line width
  const COLS    = 18;    // tiles across the repeating swatch
  const ROWS    = 18;    // tiles down the repeating swatch
  const W       = COLS * TILE;
  const H       = ROWS * TILE;

  // Base orange HSL: ~28°, 87%, 56%  (#f08a2e)
  const BASE_H  = 28;
  const BASE_S  = 87;
  const BASE_L  = 56;

  const c = document.createElement('canvas');
  c.width  = W;
  c.height = H;
  const ctx = c.getContext('2d');

  // Fill each tile with a random shade
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const x = col * TILE;
      const y = row * TILE;

      // Random lightness offset: -2.2 to +1.8 around base (very subtle)
      const lOff = (Math.random() * 4) - 2.2;
      // Slight saturation jitter: -1.5 to +1
      const sOff = (Math.random() * 2.5) - 1.5;
      // Tiny hue jitter: -0.8 to +0.8
      const hOff = (Math.random() * 1.6) - 0.8;

      const h = BASE_H + hOff;
      const s = Math.min(100, Math.max(0, BASE_S + sOff));
      const l = Math.min(100, Math.max(0, BASE_L + lOff));

      ctx.fillStyle = 'hsl(' + h + ',' + s + '%,' + l + '%)';
      ctx.fillRect(x, y, TILE, TILE);
    }
  }

  // Draw grout lines — very subtle lighter orange
  ctx.fillStyle = 'rgba(255, 200, 120, 0.18)';

  // Vertical grout lines
  for (let col = 1; col < COLS; col++) {
    ctx.fillRect(col * TILE - GAP, 0, GAP, H);
  }
  // Horizontal grout lines
  for (let row = 1; row < ROWS; row++) {
    ctx.fillRect(0, row * TILE - GAP, W, GAP);
  }

  // Apply as repeating background
  const url = c.toDataURL('image/png');
  const canvasEl   = document.getElementById('canvas');
  const viewportEl = document.getElementById('viewport');

  if (canvasEl)   canvasEl.style.backgroundImage   = 'url(' + url + ')';
  if (viewportEl) viewportEl.style.backgroundImage = 'url(' + url + ')';
})();
