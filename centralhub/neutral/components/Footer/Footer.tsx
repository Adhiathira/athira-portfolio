import Link from 'next/link';
import styles from './Footer.module.css';

/**
 * Shared multi-column site footer — even-keel LIGHT (calm-enterprise).
 * Content is verbatim from the footer section of the CentralHub landing content
 * (diplomatic-signup.json): the tagline plus six navigation columns.
 * All destinations are plain "#" placeholders per the build brief.
 */

interface FooterColumn {
  heading: string;
  items: string[];
}

const TAGLINE = 'A unified, AI-powered platform for growing businesses.';

const COLUMNS: FooterColumn[] = [
  {
    heading: 'Product',
    items: ['CRM', 'CDP', 'Marketing automation', 'Phones & SMS (uCaaS)', 'Website builder', 'AI agent'],
  },
  {
    heading: 'Verticals',
    items: ['Massage & spa', 'Tours & travel', 'Real estate', 'Other industries'],
  },
  {
    heading: 'Company',
    items: ['About', "Founder's note", 'Careers', 'Contact'],
  },
  {
    heading: 'Resources',
    items: ['Pricing', 'Feature request portal', 'Roadmap', 'Help center'],
  },
  {
    heading: 'Partners',
    items: ['Affiliate program', 'Become a partner'],
  },
  {
    heading: 'Legal',
    items: ['Privacy policy', 'Terms of service', 'Security'],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brandBlock}>
            <span className={styles.brand}>CentralHu<span className={styles.brandB} aria-hidden="true">b</span></span>
            <p className={styles.tagline}>{TAGLINE}</p>
          </div>

          <nav className={styles.columns} aria-label="Footer">
            {COLUMNS.map((column) => (
              <div key={column.heading} className={styles.column}>
                <h2 className={styles.columnHeading}>{column.heading}</h2>
                <ul className={styles.columnList}>
                  {column.items.map((item) => (
                    <li key={item}>
                      <Link href="#" className={styles.columnLink}>
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className={styles.bottom}>
          <span className={styles.bottomBrand}>CentralHu<span className={styles.brandB} aria-hidden="true">b</span></span>
          <span className={styles.copyright}>© 2026 CentralHub</span>
        </div>
      </div>
    </footer>
  );
}
