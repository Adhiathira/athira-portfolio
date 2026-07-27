import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Nav.module.css';
import { useDemoModal } from '@/components/common/DemoModalProvider';

type PageSlug = 'index' | 'product' | 'verticals' | 'pricing' | 'about';

interface NavLinkDef {
  label: string;
  href: string;
  slug: PageSlug;
}

const NAV_LINKS: NavLinkDef[] = [
  { label: 'Home', href: '/', slug: 'index' },
  { label: 'Product', href: '/product', slug: 'product' },
  { label: 'Verticals', href: '/verticals', slug: 'verticals' },
  { label: 'Pricing', href: '/pricing', slug: 'pricing' },
  { label: 'About', href: '/about', slug: 'about' },
];

const CTA = { label: 'Get a demo' };

interface NavProps {
  /** The current page slug; controls which link renders in the active (blue) state. */
  activePage?: PageSlug;
}

export default function Nav({ activePage = 'index' }: NavProps) {
  const scrolled = false;
  const [menuOpen, setMenuOpen] = useState(false);
  const { openDemoModal } = useDemoModal();


  // Lock background scroll while the mobile overlay is open.
  useEffect(() => {
    document.body.classList.toggle('nav-scroll-lock', menuOpen);
    return () => document.body.classList.remove('nav-scroll-lock');
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="CentralHub home" onClick={closeMenu}>
          CentralHu<span className={styles.brandB} aria-hidden="true">b</span>
        </Link>

        <div className={styles.links}>
          {NAV_LINKS.map((item) => (
            <Link
              key={item.slug}
              href={item.href}
              className={`${styles.link} ${activePage === item.slug ? styles.linkActive : ''}`}
              aria-current={activePage === item.slug ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.cta} onClick={openDemoModal}>
            {CTA.label}
          </button>
        </div>

        <button
          type="button"
          className={`${styles.toggle} ${menuOpen ? styles.toggleOpen : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        {NAV_LINKS.map((item) => (
          <Link
            key={item.slug}
            href={item.href}
            className={`${styles.mobileLink} ${activePage === item.slug ? styles.mobileLinkActive : ''}`}
            aria-current={activePage === item.slug ? 'page' : undefined}
            onClick={closeMenu}
          >
            {item.label}
          </Link>
        ))}
        <button
          type="button"
          className={`${styles.cta} ${styles.mobileCta}`}
          onClick={() => {
            closeMenu();
            openDemoModal();
          }}
        >
          {CTA.label}
        </button>
      </div>
    </nav>
  );
}
