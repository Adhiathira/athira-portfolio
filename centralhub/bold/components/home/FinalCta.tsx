import { useRef } from 'react';
import Link from 'next/link';
import styles from './FinalCta.module.css';
import { useReveal } from '@/lib/useReveal';
import { useDemoModal } from '@/components/common/DemoModalProvider';

// Closing conversion band — DARK beat, echoes the hero. SIGNUP mode: no form.
// Primary "Get a Demo" opens the demo request modal. Secondary routes to pricing.
export default function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const { openDemoModal } = useDemoModal();
  useReveal(ref);

  return (
    <section id="final-cta" className={styles.section} ref={ref}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner} data-reveal-group>
        <h2 className={styles.heading} data-reveal>
          One platform for every customer conversation.
        </h2>
        <p className={styles.body} data-reveal>
          See how CentralHub can bring your CRM, marketing, phones, and website together, in a live demo built around
          your business.
        </p>

        <div className={styles.actions} data-reveal>
          <button type="button" className={styles.primary} onClick={openDemoModal}>
            Get a demo
          </button>
          <Link href="/pricing" className={styles.secondary}>
            See pricing
          </Link>
        </div>

        <p className={styles.closing} data-reveal>
          No long-term contracts. No pricing surprises.
        </p>
      </div>
    </section>
  );
}
