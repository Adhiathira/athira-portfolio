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
            A closer look at platform pricing
          </span>
          <h2 id="problem-heading" className={styles.heading} data-reveal>
            <span className={styles.headLead}>
              Most platforms charge for your growth,
            </span>{' '}
            <span className={styles.headCont}>not for their effort.</span>
          </h2>
        </div>

        <p id="problem-body" className={styles.body} data-reveal data-reveal-group>
          Most booking and CRM platforms take a cut of your revenue or charge for every seat, regardless of what
          it actually costs to serve you. As your business grows, your software bill grows with it, even when the
          work behind it stays the same.
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
