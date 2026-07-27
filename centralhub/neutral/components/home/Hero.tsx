import { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './Hero.module.css';
import HeroParticles from './HeroParticles';
import { gsap, DUR_LONG, EASE_SETTLE, prefersReducedMotion } from '@/lib/gsap';

// HOME hero — light-dominant, full viewport. Editorial two-tone headline (ink lead
// clause + slate continuation) over the faint periwinkle wash, product dashboard
// mockup at right. The one high-intensity entrance beat on the page: it fires on
// load (above the fold) so opacity in the timeline is safe here.
export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: EASE_SETTLE } });
      tl.from('[data-hero-line]', { y: 22, opacity: 0, duration: DUR_LONG, stagger: 0.1 })
        .from('[data-hero-body]', { y: 16, opacity: 0, duration: DUR_LONG }, '-=0.3')
        .from('[data-hero-actions]', { y: 16, opacity: 0, duration: DUR_LONG }, '-=0.28')
        .from('[data-hero-media]', { y: 34, opacity: 0, duration: 0.7 }, '-=0.55');
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" className={styles.hero} ref={rootRef}>
      <HeroParticles />
      <div id="hero-inner" className={styles.inner}>
        <div id="hero-copy" className={styles.copy}>
          <h1 id="hero-headline" className={styles.headline}>
            <span className={styles.headLead} data-hero-line>
              Everything your business runs on,
            </span>{' '}
            <span className={styles.headCont} data-hero-line>
              in one place.
            </span>
          </h1>

          <p id="hero-body" className={styles.body} data-hero-body>
            One AI-native platform that brings your CRM, marketing tools, phone system, and website together,
            with pricing that stays fair as you grow. Founding members lock in their rate.
          </p>

          <div id="hero-actions" className={styles.actions} data-hero-actions>
            <Link href="#final-cta" className={styles.btnPrimary}>
              Get a demo
            </Link>
            <Link href="#solution" className={styles.btnGhost}>
              Explore the platform
            </Link>
          </div>
        </div>

        <div id="hero-media" className={styles.media} data-hero-media>
          <div id="hero-frame" className={styles.frame}>
            <div className={styles.frameBar} aria-hidden="true">
              <span className={styles.frameDot} />
              <span className={styles.frameDot} />
              <span className={styles.frameDot} />
            </div>
            <div className={styles.frameBody}>
              <img
                id="hero-dashboard-img"
                className={styles.dashImg}
                src="/assets/product-crm-board.jpeg"
                alt="CentralHub dashboard bringing CRM, marketing, phone, and website into a single view"
                onError={(e) => {
                  const el = e.currentTarget;
                  el.style.display = 'none';
                  (el.nextElementSibling as HTMLElement).style.display = 'flex';
                }}
              />
              <div className={styles.dashPlaceholder} aria-hidden="true">
                <span className={styles.placeholderLabel}>/assets/product-crm-board.jpeg</span>
                <span className={styles.placeholderHint}>
                  One dashboard, replacing five separate tool logins
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
