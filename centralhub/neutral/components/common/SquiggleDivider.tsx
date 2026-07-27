import styles from './SquiggleDivider.module.css';

/*
  SquiggleDivider — the one boundary shape this system uses everywhere. A smooth,
  organic, hand-drawn wave built entirely from cubic beziers: rounded crests and
  troughs, zero sharp vertices (never a zigzag, sawtooth, triangle, or straight
  diagonal). The filled region sits along the BOTTOM of the box, so `fill` is the
  NEXT section's ground and the wrapper `bg` is the PREVIOUS section's ground: the
  incoming section appears to flow up into the one above it.

  `intensity` sets how squiggly the wave is — gentle (low amplitude, long broad
  humps), medium, or bold (large amplitude, tighter humps). Bold means BIGGER
  waves, never pointier ones. Rotate intensities down a page so no two adjacent
  boundaries match and the page reads hand-composed. `flip` mirrors horizontally
  for extra variety. Colours are plain CSS values (solid grounds or a gradient's
  starting colour). aria-hidden — purely decorative.
*/

export type SquiggleIntensity = 'gentle' | 'medium' | 'bold';

export interface SquiggleDividerProps {
  /** Colour of the incoming (next) section's ground — fills the wave body. */
  fill: string;
  /** Colour of the outgoing (previous) section's ground — sits above the wave. */
  bg?: string;
  intensity?: SquiggleIntensity;
  /** Mirror the curve horizontally for variety between adjacent dividers. */
  flip?: boolean;
  className?: string;
}

const VIEW_BOX = '0 0 1440 120';

// All paths: viewBox 120 tall, filled to the bottom edge. Every anchor sits at a
// crest or trough with a HORIZONTAL tangent, and the two control points flanking
// each anchor are colinear through it — so segment junctions are tangent-continuous
// (C1): no cusps, kinks, or flat shelves, just one confident flowing line. These
// are calm, long-wavelength swells: low amplitude, a few broad humps. Amplitude
// varies gently within a variant and grows gentle -> medium -> bold across them.
const PATHS: Record<SquiggleIntensity, string> = {
  gentle:
    'M0,53 C202,53 278,68 480,68 C682,68 758,52 960,52 C1162,52 1238,67 1440,67 L1440,120 L0,120 Z',
  medium:
    'M0,46 C151,46 209,74 360,74 C511,74 569,45 720,45 C871,45 929,75 1080,75 C1231,75 1289,47 1440,47 L1440,120 L0,120 Z',
  bold: 'M0,38 C151,38 209,84 360,84 C511,84 569,37 720,37 C871,37 929,82 1080,82 C1231,82 1289,40 1440,40 L1440,120 L0,120 Z',
};

export default function SquiggleDivider({
  fill,
  bg = 'transparent',
  intensity = 'medium',
  flip = false,
  className,
}: SquiggleDividerProps) {
  return (
    <div
      className={`${styles.divider} ${styles[intensity]}${className ? ` ${className}` : ''}`}
      style={{ background: bg }}
      aria-hidden="true"
    >
      <svg
        className={flip ? styles.flip : undefined}
        viewBox={VIEW_BOX}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={PATHS[intensity]} fill={fill} />
      </svg>
    </div>
  );
}
