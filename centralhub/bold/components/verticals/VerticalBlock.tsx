import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './VerticalBlock.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface VerticalBlockProps {
  id: string;
  index: number;
  heading: string;
  body: string;
  items: string[];
  glyph: ReactNode;
  /** Scene image shown in the panel; the glyph renders only as its fallback. */
  img?: string;
  imgAlt?: string;
  /** When true, the glyph panel sits on the left and copy on the right. */
  reverse?: boolean;
  /** Accent tone gives the custom/"Something Else" block its soft blue panel. */
  tone?: 'default' | 'accent';
}

// The site's standard proof marker: a teal circled checkmark, identical to the
// one used in the home feature list. Every proof row across every block uses it.
function CheckIcon() {
  return (
    <svg className={styles.check} viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="9" className={styles.checkRing} />
      <path d="M6 10.4l2.6 2.6L14 7.6" className={styles.checkTick} />
    </svg>
  );
}

export default function VerticalBlock({
  id,
  index,
  heading,
  body,
  items,
  glyph, img, imgAlt,
  reverse = false,
  tone = 'default',
}: VerticalBlockProps) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const q = gsap.utils.selector(root);
    const trigger = { trigger: root, start: 'top 78%', once: true };

    const ctx = gsap.context(() => {
      // Copy always rises; the intensity of the visual side varies per block.
      gsap.from(q(`.${styles.copyReveal}`), {
        y: 22,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: trigger,
      });

      const panel = q(`.${styles.panel}`);

      switch (index % 4) {
        case 0: {
          // Draw the motif strokes on, like a ruled line being inked.
          const strokes = q(`.${styles.panel} path, .${styles.panel} circle, .${styles.panel} rect`);
          strokes.forEach((el) => {
            const path = el as unknown as SVGGeometryElement;
            if (typeof path.getTotalLength !== 'function') return;
            const len = path.getTotalLength();
            if (!len) return;
            gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
            gsap.to(path, {
              strokeDashoffset: 0,
              duration: 1.4,
              ease: 'power2.out',
              stagger: 0.05,
              scrollTrigger: trigger,
            });
          });
          break;
        }
        case 1: {
          // Panel slides in from the outer edge — a case closing around it.
          gsap.from(panel, {
            x: reverse ? -44 : 44,
            opacity: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: trigger,
          });
          break;
        }
        case 2: {
          // Motif settles from center; the reading is arrived at, not thrown.
          gsap.from(panel, {
            scale: 0.94,
            opacity: 0,
            duration: 1.0,
            ease: 'power3.out',
            transformOrigin: 'center center',
            scrollTrigger: trigger,
          });
          break;
        }
        default: {
          // The custom block assembles: primitives stagger into place.
          gsap.from(q(`.${styles.panel} > *`), {
            scale: 0.9,
            opacity: 0,
            duration: 0.9,
            ease: 'back.out(1.3)',
            transformOrigin: 'center center',
            scrollTrigger: trigger,
          });
        }
      }

      // Proof rows reveal after the copy, always transform-only.
      gsap.from(q(`.${styles.proofRow}`), {
        y: 14,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.08,
        scrollTrigger: { trigger: q(`.${styles.proof}`)[0] ?? root, start: 'top 82%', once: true },
      });
    }, root);

    return () => ctx.revert();
  }, [index, reverse]);

  return (
    <section
      ref={rootRef}
      id={id}
      className={`${styles.block} ${reverse ? styles.reverse : ''} ${index % 2 === 0 ? styles.tint : ''}`}
    >
      <div className={styles.inner}>
        <div className={styles.copy}>
          <div className={styles.copyReveal}>
            <h2 className={styles.heading}>{heading}</h2>
          </div>
          <p className={`${styles.body} ${styles.copyReveal}`}>{body}</p>

          <ul className={styles.proof}>
            {items.map((item) => (
              <li key={item} className={styles.proofRow}>
                <CheckIcon />
                <span className={styles.proofText}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.visual}>
          <div className={`${styles.panel} ${tone === 'accent' ? styles.panelAccent : ''}`}>
            {img ? (
              <>
                <img
                  className={styles.panelImg}
                  src={img}
                  alt={imgAlt ?? ''}
                  onError={(e) => {
                    const el = e.currentTarget;
                    el.style.display = 'none';
                    const fb = el.nextElementSibling as HTMLElement | null;
                    if (fb) fb.style.display = 'flex';
                  }}
                />
                <span className={styles.panelGlyphFallback} aria-hidden="true">
                  {glyph}
                </span>
              </>
            ) : (
              glyph
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
