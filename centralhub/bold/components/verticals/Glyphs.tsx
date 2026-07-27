/*
  Even-keel vertical glyphs — refined hairline line-art motifs.
  One motif per vertical, drawn in ink/slate with a single blue accent stroke.
  No fills, no color explosions: the register stays Attio-grade.

  Every drawable path carries className "glyphStroke" so VerticalBlock's GSAP
  draw-in can stroke them on scroll. Accent strokes carry "glyphAccent" too.
*/
import styles from './Glyphs.module.css';

type GlyphProps = {
  /** Accessible label describing the motif. */
  title: string;
};

const VIEWBOX = '0 0 220 220';

/** Massage & Spa — a water droplet rising through three ribbons of steam. */
export function SpaGlyph({ title }: GlyphProps) {
  return (
    <svg
      className={styles.glyph}
      viewBox={VIEWBOX}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle className={styles.glyphRing} cx="110" cy="110" r="86" />
      {/* droplet */}
      <path
        className={styles.glyphStroke}
        d="M110 78 C128 104 140 120 140 138 A30 30 0 0 1 80 138 C80 120 92 104 110 78 Z"
      />
      {/* inner meniscus */}
      <path className={styles.glyphStroke} d="M92 138 A18 18 0 0 0 128 138" />
      {/* three steam ribbons */}
      <path className={styles.glyphStroke} d="M84 66 C74 56 74 46 84 36" />
      <path className={`${styles.glyphStroke} ${styles.glyphAccent}`} d="M110 60 C100 50 100 40 110 30" />
      <path className={styles.glyphStroke} d="M136 66 C146 56 146 46 136 36" />
    </svg>
  );
}

/** Tours & Travel — a compass rose over a plotted route. */
export function ToursGlyph({ title }: GlyphProps) {
  return (
    <svg
      className={styles.glyph}
      viewBox={VIEWBOX}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle className={styles.glyphRing} cx="110" cy="110" r="86" />
      <circle className={styles.glyphStroke} cx="110" cy="110" r="56" />
      {/* cardinal ticks */}
      <path className={styles.glyphStroke} d="M110 54 V44 M110 176 V166 M54 110 H44 M176 110 H166" />
      {/* needle — north half in accent */}
      <path className={`${styles.glyphStroke} ${styles.glyphAccent}`} d="M110 68 L124 110 L110 110 Z" />
      <path className={styles.glyphStroke} d="M110 152 L96 110 L110 110 Z" />
      {/* plotted route arcing across */}
      <path
        className={styles.glyphRoute}
        d="M40 158 C78 150 84 118 116 112 C150 106 158 78 190 74"
      />
      <circle className={styles.glyphStroke} cx="40" cy="158" r="4" />
      <circle className={`${styles.glyphStroke} ${styles.glyphAccentFill}`} cx="190" cy="74" r="4" />
    </svg>
  );
}

/** Real Estate — a house shell over a floor plan, with a blue locator pin. */
export function RealEstateGlyph({ title }: GlyphProps) {
  return (
    <svg
      className={styles.glyph}
      viewBox={VIEWBOX}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle className={styles.glyphRing} cx="110" cy="110" r="86" />
      {/* house shell */}
      <path className={styles.glyphStroke} d="M62 106 L110 66 L158 106" />
      <path className={styles.glyphStroke} d="M74 100 V158 H146 V100" />
      {/* floor-plan partitions */}
      <path className={styles.glyphStroke} d="M74 130 H110 M110 130 V158 M110 114 V130" />
      {/* locator pin in accent */}
      <path
        className={`${styles.glyphStroke} ${styles.glyphAccent}`}
        d="M132 118 A11 11 0 1 1 132 96 A11 11 0 0 1 132 118 Z M132 118 L132 138"
      />
      <circle className={`${styles.glyphAccentFill}`} cx="132" cy="107" r="3.5" />
    </svg>
  );
}

/** Something Else — modular primitives wired into one custom assembly. */
export function CustomGlyph({ title }: GlyphProps) {
  return (
    <svg
      className={styles.glyph}
      viewBox={VIEWBOX}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle className={styles.glyphRing} cx="110" cy="110" r="86" />
      {/* connective wiring */}
      <path className={styles.glyphStroke} d="M74 74 L146 74 M146 74 L146 146 M146 146 L74 146 M74 146 L74 74 M74 74 L146 146" />
      {/* node primitives */}
      <circle className={styles.glyphStroke} cx="74" cy="74" r="12" />
      <rect className={styles.glyphStroke} x="134" y="62" width="24" height="24" rx="3" />
      <path className={styles.glyphStroke} d="M74 134 L86 156 L62 156 Z" />
      {/* central accent plus — the primitive we build to fit */}
      <path
        className={`${styles.glyphStroke} ${styles.glyphAccent}`}
        d="M146 134 V158 M134 146 H158"
      />
      <circle className={styles.glyphRing} cx="146" cy="146" r="15" />
    </svg>
  );
}
