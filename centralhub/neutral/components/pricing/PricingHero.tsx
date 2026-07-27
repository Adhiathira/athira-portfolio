import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './PricingHero.module.css';

// The site's standard proof marker: a teal circled checkmark, identical to the
// one used in the verticals VerticalBlock and the home feature lists.
function CheckIcon() {
  return (
    <svg className={styles.check} viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="9" className={styles.checkRing} />
      <path d="M6 10.4l2.6 2.6L14 7.6" className={styles.checkTick} />
    </svg>
  );
}

const EYEBROW = 'Our pricing philosophy';
const HEADING = 'Priced for how you actually use it';
const BODY =
  'We charge a flat price for the platform itself, with a small additional fee per extra seat. The parts of the platform with real variable cost, AI usage and telephony, are billed at cost plus a transparent 20%, and nothing beyond that.';

const COMMITMENTS = [
  'Flat platform pricing, not per seat',
  'No revenue-share model',
  'AI and telephony usage billed at cost + 20%',
  'Your price at signup is locked in, even as we release new features',
];

export default function PricingHero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context((self) => {
      const q = self.selector!;

      // Intro copy resolves on load — calm, already-in-motion settle.
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        q('[data-hero-copy]'),
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }
      ).fromTo(
        q('[data-heading]'),
        { letterSpacing: '0.02em' },
        { letterSpacing: '-0.015em', duration: 0.9, ease: 'power2.out' },
        '<'
      );

      // Commitment rows layer in on scroll — hairline rules settle one after another.
      gsap.fromTo(
        q('[data-row]'),
        { y: 22, opacity: 0 },
        {
          scrollTrigger: { trigger: q('[data-commitments]')[0], start: 'top 82%', once: true },
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.12,
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="pricing-hero" className={styles.section}>
      <div id="pricing-hero-wash" className={styles.wash} aria-hidden="true" />
      <div id="pricing-hero-inner" className={styles.inner}>
        <header id="pricing-hero-intro" className={styles.intro}>
          <div id="pricing-hero-heading-group" className={styles.headingGroup}>
            <span id="pricing-hero-eyebrow" className={styles.eyebrow} data-hero-copy>
              {EYEBROW}
            </span>
            <h1 id="pricing-hero-heading" className={styles.heading} data-hero-copy data-heading>
              {HEADING}
            </h1>
          </div>
          <p id="pricing-hero-body" className={styles.body} data-hero-copy>
            {BODY}
          </p>
        </header>

        <div id="pricing-hero-commitments" className={styles.commitments} data-commitments>
          {COMMITMENTS.map((text, i) => (
            <div id={`pricing-commit-${i + 1}`} className={styles.row} key={text} data-row>
              <CheckIcon />
              <p className={styles.rowText}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
