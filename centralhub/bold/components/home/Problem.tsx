import { useRef } from 'react';
import styles from './Problem.module.css';
import { useReveal } from '@/lib/useReveal';

// Editorial problem statement. Two-tone headline, body argument, three stat-style
// callouts naming the incumbent pricing tricks, and a lead-out line into the solution.
const CALLOUTS = ['6% revenue share', 'Per-seat CRM fees', 'Costs that scale with your success, not their effort'];

export default function Problem() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section id="problem" className={styles.problem} ref={ref}>
      <div id="problem-inner" className={styles.inner}>
        <div id="problem-lede" className={styles.lede} data-reveal-group>
          <span className={styles.eyebrow} data-reveal>
            Let&apos;s talk about the last decade
          </span>
          <h2 id="problem-heading" className={styles.heading} data-reveal>
            <span className={styles.headLead}>
              Why should a $500 helicopter ride cost the platform
            </span>{' '}
            <span className={styles.headCont}>10x more than a $50 kayak tour?</span>
          </h2>
        </div>

        <p id="problem-body" className={styles.body} data-reveal data-reveal-group>
          It shouldn&apos;t. But that&apos;s exactly how most booking and CRM platforms charge you: a cut of your
          revenue, or a tax per employee, regardless of how much work it actually takes to serve you. Your costs go
          up. Their effort doesn&apos;t. For a decade, the incumbents have called this &quot;standard pricing.&quot;
          We call it what it is.
        </p>

        <ul id="problem-callouts" className={styles.callouts} data-reveal-group>
          {CALLOUTS.map((text, i) => (
            <li key={text} className={styles.callout} data-reveal>
              <span className={styles.calloutIndex}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.calloutText}>{text}</span>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}
