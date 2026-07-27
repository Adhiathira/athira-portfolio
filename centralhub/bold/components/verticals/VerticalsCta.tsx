import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './VerticalsCta.module.css';
import { useDemoModal } from '@/components/common/DemoModalProvider';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const HEADING = 'One platform for every customer conversation.';
const BODY =
  'See how CentralHub can bring your CRM, marketing, phones, and website together, in a live demo built around your business.';
const CTA = { label: 'Get a demo' };
const CTA_SECONDARY = { label: 'See pricing', href: '/pricing' };

export default function VerticalsCta() {
  const rootRef = useRef<HTMLElement>(null);
  const { openDemoModal } = useDemoModal();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from(`.${styles.reveal}`, {
        y: 22,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: root, start: 'top 80%', once: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="verticals-cta" className={styles.cta}>
      {/* Asymmetric divider — the one high-contrast section boundary on the page.
          The fill is the dark section's own color, so it reads as cut out of the
          band above. */}
      <div className={styles.divider} aria-hidden="true">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path
            className={styles.dividerPath}
            d="M0,44 C220,14 430,72 660,52 C880,33 1010,6 1230,30 C1330,41 1390,58 1440,50 L1440,90 L0,90 Z"
          />
        </svg>
      </div>

      <div className={styles.inner}>
        <h2 className={`${styles.heading} ${styles.reveal}`}>{HEADING}</h2>
        <p className={`${styles.body} ${styles.reveal}`}>{BODY}</p>
        <div className={`${styles.actions} ${styles.reveal}`}>
          <button type="button" className={styles.primary} onClick={openDemoModal}>
            {CTA.label}
          </button>
          <Link href={CTA_SECONDARY.href} className={styles.secondary}>
            {CTA_SECONDARY.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
