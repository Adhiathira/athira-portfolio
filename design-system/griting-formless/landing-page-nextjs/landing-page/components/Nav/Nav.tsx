import Link from 'next/link';

interface NavProps {
  /** 'dark' = transparent bg, white text (hero/dark sections)
   *  'light' = white bg, #455451 text, bottom border */
  theme?: 'dark' | 'light';
  /** Current page path — e.g. '/', '/about', '/blog' */
  activePath?: string;
}

const NAV_LINKS = [
  { label: 'Product', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Partners', href: '/partners' },
  { label: 'Blog', href: '/blog' },
];

export default function Nav({ theme = 'dark', activePath = '' }: NavProps) {
  const isDark = theme === 'dark';

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 'var(--nav-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingInline: 'var(--grid-gutter)',
        background: isDark ? 'transparent' : '#ffffff',
        borderBottom: isDark ? 'none' : '1px solid var(--color-nav-border)',
        /* NO backdropFilter — ever */
      }}
    >
      {/* Logo — left */}
      <Link
        href="/"
        style={{
          fontFamily: 'var(--font-logo)',
          fontSize: 'var(--font-size-logo)',
          fontWeight: 700,
          letterSpacing: 'var(--tracking-logo)',
          color: isDark ? '#ffffff' : 'var(--color-logo-on-light)',
          textDecoration: 'none',
          lineHeight: 1,
        }}
      >
        griting
      </Link>

      {/* Nav links — right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--nav-gap)' }}>
        {NAV_LINKS.map(({ label, href }) => {
          const isActive = activePath === href;
          return (
            <Link
              key={href}
              href={href}
              className={`nav-link-fade${isActive ? ' nav-link--active' : ''}`}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-nav)',
                fontWeight: 400,
                color: isDark ? '#ffffff' : 'var(--color-text-body)',
                textDecoration: 'none',
              }}
            >
              {label}
            </Link>
          );
        })}

        <Link
          href="/#contact"
          className="btn-primary"
          style={{ fontSize: 'var(--font-size-nav)', padding: '10px 20px' }}
        >
          Get in Touch
        </Link>
      </div>
    </nav>
  );
}
