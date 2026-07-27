import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './PricingTiers.module.css';
import { useDemoModal } from '@/components/common/DemoModalProvider';

type Tier = {
  id: string;
  name: string;
  body: string;
  cta: string;
  featured?: boolean;
};

const EYEBROW = 'Simple, transparent tiers';
const HEADING = 'Choose the plan that fits your business';

const TIERS: Tier[] = [
  {
    id: 'smb',
    name: 'SMB',
    body: 'Built for solo operators and small teams.',
    cta: 'Get a demo',
  },
  {
    id: 'growth',
    name: 'Growth',
    body: 'For teams managing multiple locations or channels.',
    cta: 'Get a demo',
    featured: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    body: 'For larger or multi-location businesses, with custom support.',
    cta: 'Talk to sales',
  },
];

export default function PricingTiers() {
  const root = useRef<HTMLElement>(null);
  const { openDemoModal } = useDemoModal();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context((self) => {
      const q = self.selector!;

      gsap.fromTo(
        q('[data-head]'),
        { y: 26, opacity: 0 },
        {
          scrollTrigger: { trigger: root.current, start: 'top 80%', once: true },
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.1,
        }
      );

      // Cards settle upward with a soft shadow bloom — lifted from the panel.
      q('[data-card]').forEach((card: Element, i: number) => {
        const el = card as HTMLElement;
        const rest = getComputedStyle(el).boxShadow;
        gsap.fromTo(
          el,
          { y: 44, opacity: 0, boxShadow: '0 1px 2px rgba(26, 28, 32, 0.04)' },
          {
            scrollTrigger: { trigger: q('[data-grid]')[0], start: 'top 82%', once: true },
            y: 0,
            opacity: 1,
            boxShadow: rest,
            duration: 0.7,
            ease: 'power3.out',
            delay: i * 0.1,
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="pricing-tiers" className={styles.section}>
      <div id="pricing-tiers-inner" className={styles.inner}>
        <div id="pricing-tiers-head" className={styles.head}>
          <span className={styles.eyebrow} data-head>
            {EYEBROW}
          </span>
          <h2 className={styles.heading} data-head>
            {HEADING}
          </h2>
        </div>

        <div id="pricing-tiers-grid" className={styles.grid} data-grid>
          {TIERS.map((tier) => (
            <article
              id={`tier-${tier.id}`}
              key={tier.id}
              className={`${styles.card} ${tier.featured ? styles.cardFeatured : ''}`}
              data-card
            >
              {tier.featured && (
                <span className={styles.keyline} aria-hidden="true" />
              )}
              <h3 className={styles.tierName}>{tier.name}</h3>
              <div className={styles.rule} aria-hidden="true" />
              <p className={styles.tierBody}>{tier.body}</p>
              <button
                type="button"
                className={`${styles.cta} ${tier.featured ? styles.ctaPrimary : styles.ctaGhost}`}
                onClick={openDemoModal}
              >
                {tier.cta}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
