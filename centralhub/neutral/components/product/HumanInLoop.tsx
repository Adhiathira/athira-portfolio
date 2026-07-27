import styles from './HumanInLoop.module.css';

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

export interface HumanInLoopProps {
  eyebrow: string;
  heading: string;
  body: string;
  items: string[];
}

export default function HumanInLoop({ eyebrow, heading, body, items }: HumanInLoopProps) {
  return (
    <section id="human-in-the-loop" className={styles.section}>
      <div id="human-in-the-loop-inner" className={styles.inner}>
        <div id="human-in-the-loop-copy" className={styles.copy} data-reveal>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.body}>{body}</p>

          <ul id="human-in-the-loop-features" className={styles.features} data-stagger-group>
            {items.map((item) => (
              <li key={item} className={styles.feature} data-stagger-item>
                <CheckIcon />
                <span className={styles.featureText}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Draft-confirm-reject motif: an abstract affordance, not a product screenshot.
            No invented copy or data — only the flow the content describes. */}
        <div id="human-in-the-loop-motif" className={styles.motif} data-reveal aria-hidden="true">
          <div className={styles.card}>
            <div className={styles.cardHead}>
              <span className={styles.statusDot} />
              <span className={styles.statusLabel}>Draft</span>
            </div>
            <div className={styles.skeleton}>
              <span className={styles.line} />
              <span className={styles.line} />
              <span className={`${styles.line} ${styles.lineShort}`} />
            </div>
            <div className={styles.actions}>
              <span className={`${styles.action} ${styles.confirm}`}>Confirm</span>
              <span className={`${styles.action} ${styles.reject}`}>Reject</span>
            </div>
          </div>
          <div className={styles.checkpoints}>
            <span className={styles.tick} />
            <span className={styles.tick} />
            <span className={`${styles.tick} ${styles.tickActive}`} />
          </div>
        </div>
      </div>
    </section>
  );
}
