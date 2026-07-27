import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './Beliefs.module.css';

/**
 * Beliefs — the four pricing commitments as a proof ledger. Hairline-ruled rows
 * on the faint surface tone (the page's one light contrast beat), each led by the
 * site's standard teal circled checkmark. Motion: rows rise in a calm stagger — a
 * different grid and animation from the founder letter above.
 */

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

const COMMITMENTS = [
  'Flat platform pricing, not per seat',
  'No revenue-share model',
  'AI and telephony usage billed at cost + 20%',
  'Your price at signup is locked in, even as we release new features',
];

export default function Beliefs() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const st = { trigger: `.${styles.rows}`, start: 'top 82%', once: true };

      gsap.set(`.${styles.row}`, { y: 34, opacity: 0 });
      gsap.to(`.${styles.row}`, {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.13,
        scrollTrigger: st,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="beliefs" className={styles.section}>
      <div id="beliefs-inner" className={styles.inner}>
        <header id="beliefs-header" className={styles.header}>
          <h2 className={styles.title}>The commitments behind the platform</h2>
        </header>

        <ol id="beliefs-rows" className={styles.rows}>
          {COMMITMENTS.map((text) => (
            <li key={text} className={styles.row}>
              <CheckIcon />
              <span className={styles.text}>{text}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
