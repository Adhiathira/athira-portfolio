import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './PricingCta.module.css';
import { useDemoModal } from '@/components/common/DemoModalProvider';

const HEADING = 'One platform for every customer conversation.';
const BODY =
  'See how CentralHub can bring your CRM, marketing, phones, and website together, in a live demo built around your business.';
const CLOSING = 'No long-term contracts. No pricing surprises.';

export default function PricingCta() {
  const root = useRef<HTMLElement>(null);
  const { openDemoModal } = useDemoModal();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context((self) => {
      const q = self.selector!;
      const st = { trigger: root.current, start: 'top 78%', once: true };

      gsap.fromTo(
        q('[data-copy]'),
        { y: 28, opacity: 0 },
        {
          scrollTrigger: st,
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
        }
      );

      // A single blue rule draws across beneath the heading — the one signal.
      gsap.fromTo(
        q('[data-rule]'),
        { scaleX: 0 },
        {
          scrollTrigger: st,
          scaleX: 1,
          transformOrigin: 'left center',
          duration: 0.7,
          ease: 'power2.inOut',
          delay: 0.25,
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="pricing-cta" className={styles.section}>
      <div id="pricing-cta-inner" className={styles.inner}>
        <h2 id="pricing-cta-heading" className={styles.heading} data-copy>
          {HEADING}
        </h2>
        <div id="pricing-cta-rule" className={styles.rule} data-rule aria-hidden="true" />
        <p id="pricing-cta-body" className={styles.body} data-copy>
          {BODY}
        </p>
        <div id="pricing-cta-actions" className={styles.actions} data-copy>
          <button type="button" className={`${styles.cta} ${styles.ctaPrimary}`} onClick={openDemoModal}>
            Get a demo
          </button>
          <Link href="#pricing-tiers" className={`${styles.cta} ${styles.ctaGhost}`}>
            See pricing
          </Link>
        </div>
        <p id="pricing-cta-closing" className={styles.closing} data-copy>
          {CLOSING}
        </p>
      </div>
    </section>
  );
}
