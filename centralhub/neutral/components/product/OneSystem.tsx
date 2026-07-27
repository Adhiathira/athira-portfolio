import styles from './OneSystem.module.css';

export interface OneSystemProps {
  heading: string;
  body: string;
}

export default function OneSystem({ heading, body }: OneSystemProps) {
  return (
    <section id="one-system" className={styles.section} data-tidal>
      <div id="one-system-inner" className={styles.inner}>
        <h2 id="one-system-heading" className={styles.heading} data-reveal>
          {heading}
        </h2>
        <p id="one-system-body" className={styles.body} data-reveal>
          {body}
        </p>
      </div>
    </section>
  );
}
