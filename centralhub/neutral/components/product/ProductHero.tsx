import styles from './ProductHero.module.css';

export interface ProductHeroProps {
  eyebrow: string;
  heading: string;
  body: string;
}

export default function ProductHero({ eyebrow, heading, body }: ProductHeroProps) {
  return (
    <section id="product-hero" className={styles.hero}>
      <div id="product-hero-wash" className={styles.wash} aria-hidden="true" />
      <div id="product-hero-inner" className={styles.inner}>
        <div id="product-hero-content" className={styles.content} data-hero-seq>
          <span className={styles.eyebrow} data-hero-item>
            {eyebrow}
          </span>
          <h1 className={styles.heading} data-hero-item>
            {heading}
          </h1>
          <p className={styles.body} data-hero-item>
            {body}
          </p>
        </div>
      </div>
    </section>
  );
}
