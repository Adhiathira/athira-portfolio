import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './AboutHero.module.css';

/**
 * AboutHero — compact editorial header for the most personal page.
 * Light register: white ground softened by a faint periwinkle wash, near-black
 * ink, a single blue signal. The heading is set in the serif (the emotional
 * register of this system). Motion runs on load since the header is above the
 * fold: a calm, decelerating settle — no scroll trigger.
 */
export default function AboutHero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from(`.${styles.eyebrow}`, { y: 14, opacity: 0, duration: 0.7 })
        .from(`.${styles.title}`, { y: 22, opacity: 0, duration: 1.0 }, '-=0.45')
        .from(`.${styles.lede}`, { y: 16, opacity: 0, duration: 0.9 }, '-=0.6');
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="about-hero" className={styles.section}>
      <div id="about-hero-wash" className={styles.wash} aria-hidden="true" />

      <div id="about-hero-inner" className={styles.inner}>
        <p id="about-hero-eyebrow" className={styles.eyebrow}>
          <span className={styles.tick} aria-hidden="true" />
          From the founder
        </p>

        <h1 id="about-hero-title" className={styles.title}>
          Why we&apos;re building CentralHub
        </h1>

        <p id="about-hero-lede" className={styles.lede}>
          We&apos;re early in this journey, and we&apos;re building it alongside the
          people who will use it every day.
        </p>
      </div>
    </section>
  );
}
