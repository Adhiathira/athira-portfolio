import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Roadmap.module.css';

const EYEBROW = "What's next for CentralHub";
const HEADING = 'More built in, same price';
const BODY =
  "We're adding native scheduling and e-signature to the platform. You're free to keep using your existing tools if you prefer, and your price won't change as these are added.";

const MARKERS = [
  'Native scheduling',
  'Native e-signature',
  'Optional alongside existing tools',
  'No price increase for new modules',
];

export default function Roadmap() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context((self) => {
      const q = self.selector!;
      const st = { trigger: q('[data-rail]')[0], start: 'top 80%', once: true };

      gsap.fromTo(
        q('[data-head]'),
        { y: 24, opacity: 0 },
        {
          scrollTrigger: { trigger: root.current, start: 'top 80%', once: true },
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.1,
        }
      );

      // The rail draws left to right — a measured baseline.
      gsap.fromTo(
        q('[data-line]'),
        { scaleX: 0 },
        { scrollTrigger: st, scaleX: 1, duration: 0.9, ease: 'power2.inOut' }
      );

      // Blue nodes settle onto the rail, then labels rise beneath.
      gsap.fromTo(
        q('[data-node]'),
        { scale: 0 },
        {
          scrollTrigger: st,
          scale: 1,
          transformOrigin: 'center center',
          duration: 0.45,
          ease: 'back.out(1.5)',
          stagger: 0.14,
          delay: 0.3,
        }
      );
      gsap.fromTo(
        q('[data-marker-copy]'),
        { y: 20, opacity: 0 },
        {
          scrollTrigger: st,
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.14,
          delay: 0.4,
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="roadmap" className={styles.section}>
      <div id="roadmap-inner" className={styles.inner}>
        <div id="roadmap-head" className={styles.head}>
          <div id="roadmap-head-left" className={styles.headLeft}>
            <span className={styles.eyebrow} data-head>
              {EYEBROW}
            </span>
            <h2 className={styles.heading} data-head>
              {HEADING}
            </h2>
          </div>
          <p id="roadmap-body" className={styles.body} data-head>
            {BODY}
          </p>
        </div>

        <div id="roadmap-rail" className={styles.rail} data-rail>
          <div className={styles.line} data-line aria-hidden="true" />
          <ol id="roadmap-markers" className={styles.markers}>
            {MARKERS.map((label, i) => (
              <li id={`roadmap-marker-${i + 1}`} key={label} className={styles.marker}>
                <span className={styles.node} data-node aria-hidden="true" />
                <div className={styles.markerCopy} data-marker-copy>
                  <p className={styles.markerLabel}>{label}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
