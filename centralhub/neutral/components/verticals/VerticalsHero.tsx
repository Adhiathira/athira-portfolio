import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SpaGlyph, ToursGlyph, RealEstateGlyph, CustomGlyph } from './Glyphs';
import styles from './VerticalsHero.module.css';

const EYEBROW = 'One foundation, endless flexibility';
const HEADING = 'Shaped around your business';
const BODY =
  "CentralHub starts with the same flexible foundation for every business, then adapts to how you actually operate, whether that's an existing vertical we support or one we haven't built out yet.";

const MOTIFS = [
  { label: 'Massage and spa', Glyph: SpaGlyph, name: 'Massage & spa', img: '/assets/vertical-spa.jpeg' },
  { label: 'Tours and travel', Glyph: ToursGlyph, name: 'Tours & travel', img: '/assets/vertical-tours.jpeg' },
  { label: 'Real estate teams', Glyph: RealEstateGlyph, name: 'Real estate', img: '/assets/vertical-realestate.jpeg' },
  { label: 'A vertical we build with you', Glyph: CustomGlyph, name: 'Something else', img: '/assets/vertical-other.jpeg' },
];

export default function VerticalsHero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from(`.${styles.eyebrow}`, { y: 14, opacity: 0, duration: 0.7 })
        .from(`.${styles.heading}`, { y: 22, opacity: 0, duration: 0.95 }, '-=0.45')
        .from(`.${styles.body}`, { y: 16, opacity: 0, duration: 0.8 }, '-=0.6')
        .from(
          `.${styles.motif}`,
          { y: 18, opacity: 0, duration: 0.7, stagger: 0.09 },
          '-=0.55',
        )
        ;
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <header ref={rootRef} id="verticals-hero" className={styles.hero}>
      <div className={styles.wash} aria-hidden="true" />
      <div className={styles.inner}>
        <div id="verticals-hero-copy" className={styles.copy}>
          <p className={styles.eyebrow}>{EYEBROW}</p>
          <h1 className={styles.heading}>{HEADING}</h1>
          <p className={styles.body}>{BODY}</p>
        </div>

        <ul id="verticals-hero-motifs" className={styles.motifs}>
          {MOTIFS.map(({ label, Glyph, name, img }, i) => (
            <li key={name} className={styles.motif}>
              <a
                href={`#vertical-${i + 1}`}
                className={styles.motifLink}
                aria-label={`Jump to ${name} details`}
              >
                <span className={styles.motifFrame}>
                  <img
                    className={styles.motifImg}
                    src={img}
                    alt={label}
                    onError={(e) => {
                      const el = e.currentTarget;
                      el.style.display = 'none';
                      const fallback = el.nextElementSibling as HTMLElement | null;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <span className={styles.motifGlyphFallback} aria-hidden="true">
                    <Glyph title={label} />
                  </span>
                </span>
                <span className={styles.motifName}>{name}</span>
              </a>
            </li>
          ))}
        </ul>

      </div>
    </header>
  );
}
