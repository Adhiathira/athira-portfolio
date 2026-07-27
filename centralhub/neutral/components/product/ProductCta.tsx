import Link from 'next/link';
import styles from './ProductCta.module.css';
import { useDemoModal } from '@/components/common/DemoModalProvider';

export interface ProductCtaProps {
  heading: string;
  body: string;
  cta: string;
  ctaSecondary: string;
}

export default function ProductCta({ heading, body, cta, ctaSecondary }: ProductCtaProps) {
  const { openDemoModal } = useDemoModal();
  return (
    <section id="product-cta" className={styles.section}>
      <div id="product-cta-wash" className={styles.wash} aria-hidden="true" />
      <div id="product-cta-inner" className={styles.inner}>
        <div id="product-cta-content" className={styles.content} data-reveal>
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.body}>{body}</p>
          <div id="product-cta-actions" className={styles.actions} data-reveal-group>
            <button type="button" className={`${styles.btn} ${styles.primary}`} onClick={openDemoModal}>
              {cta}
            </button>
            <Link href="/pricing" className={`${styles.btn} ${styles.ghost}`}>
              {ctaSecondary}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
