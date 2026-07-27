import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './FounderLetter.module.css';

/**
 * FounderLetter — the emotional centerpiece. Source Serif 4 at reading size on a
 * ~65ch measure with generous leading, a blue hairline margin rule down the left
 * edge, and a signature device that names no person (no fabricated name/photo).
 * Motion is the page's calmest and longest: the blue rule draws down on scroll
 * entry, paragraphs settle in a slow stagger.
 */
export default function FounderLetter() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const st = { trigger: `.${styles.letter}`, start: 'top 78%', once: true };

      // Blue margin rule draws down from the top — the signature gesture.
      gsap.set(`.${styles.rule}`, { transformOrigin: 'top center', scaleY: 0 });
      gsap.to(`.${styles.rule}`, {
        scaleY: 1,
        duration: 1.4,
        ease: 'power3.inOut',
        scrollTrigger: st,
      });

      // Paragraphs + signature settle in a slow, decelerating stagger.
      gsap.set(`.${styles.reveal}`, { y: 26, opacity: 0 });
      gsap.to(`.${styles.reveal}`, {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.22,
        scrollTrigger: st,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="founder-letter" className={styles.section}>
      <div id="founder-letter-wash" className={styles.wash} aria-hidden="true" />

      <div id="founder-letter-inner" className={styles.inner}>
        <article id="founder-letter-body" className={styles.letter}>
          <span className={styles.rule} aria-hidden="true" />

          <div id="founder-letter-copy" className={styles.copy}>
            <p className={`${styles.para} ${styles.reveal}`}>
              Across the businesses I&apos;ve worked with, spas, tour operators, real
              estate teams, I kept seeing the same pattern: software pricing tied to
              revenue or headcount, not to the actual cost of serving them.
            </p>
            <p className={`${styles.para} ${styles.reveal}`}>
              CentralHub is our attempt to build something fairer, unified, and
              genuinely built around how these businesses operate.
            </p>

            <p className={`${styles.closing} ${styles.reveal}`}>
              We&apos;re early in this journey, and we&apos;re building it alongside the
              people who will use it every day.
            </p>

            <div id="founder-letter-signature" className={`${styles.signature} ${styles.reveal}`}>
              <span className={styles.signatureStroke} aria-hidden="true" />
              <span className={styles.signatureLabel}>From the founder</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
