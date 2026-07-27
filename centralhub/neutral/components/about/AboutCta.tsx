import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './AboutCta.module.css';
import { useDemoModal } from '@/components/common/DemoModalProvider';

/**
 * AboutCta — calm SIGNUP close. A centered serif line over a periwinkle wash that
 * bookends the hero, a solid blue "Get a Demo" and a ghost "See Pricing". Motion
 * is low-key: the content group settles as one unit (buttons stay aligned).
 */
export default function AboutCta() {
  const root = useRef<HTMLElement>(null);
  const { openDemoModal } = useDemoModal();

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(`.${styles.group}`, { y: 24, opacity: 0 });
      gsap.to(`.${styles.group}`, {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%', once: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="about-cta" className={styles.section}>
      <div id="about-cta-wash" className={styles.wash} aria-hidden="true" />

      <div id="about-cta-inner" className={styles.inner}>
        <div id="about-cta-group" className={styles.group}>
          <h2 id="about-cta-title" className={styles.title}>
            See what we&apos;ve built.
          </h2>

          <div id="about-cta-actions" className={styles.actions}>
            <button type="button" className={styles.primary} onClick={openDemoModal}>
              Get a demo
            </button>
            <Link href="/pricing" className={styles.secondary}>
              See pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
