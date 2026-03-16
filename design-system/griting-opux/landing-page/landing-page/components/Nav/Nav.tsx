import Link from 'next/link';
import { useEffect, useRef } from 'react';

type NavTheme = 'dark' | 'light' | 'partners';

interface NavProps {
  theme: NavTheme;
  activePath: string;
}

/**
 * Canonical Nav for griting-opux.
 *
 * nav.json spec:
 *   - geometry.height: 72px (88px for partners variant)
 *   - geometry.alignment: "right" → logo left, links right
 *   - background.backdropFilter: null → NO blur ever (not even on scroll)
 *   - background.color: transparent (dark/partners) | #ffffff (light)
 *   - items: ["Product", "About", "Contact", "Blog"]
 *
 * Theme variants:
 *   - "dark"     → transparent bg, white links, 72px, no border
 *   - "light"    → white bg, #455451 links, 72px, 1px solid #f3f4f6 border-bottom
 *   - "partners" → transparent bg over black, 88px, white links, ghost-glass CTA, "Partners" nav item
 */

const NAV_LINKS_DEFAULT = [
  { label: 'Product', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Partners', href: '/partners' },
  { label: 'Blog', href: '/blog' },
];

const themeStyles: Record<NavTheme, {
  navBg: string;
  linkColor: string;
  logoColor: string;
  borderBottom: string;
  height: string;
  paddingInline: string;
}> = {
  dark: {
    navBg: 'transparent',
    linkColor: '#ffffff',
    logoColor: '#ffffff',
    borderBottom: 'none',
    height: '72px',
    paddingInline: '26px',
  },
  light: {
    navBg: '#ffffff',
    linkColor: '#455451',
    logoColor: '#000000',
    borderBottom: '1px solid #f3f4f6',
    height: '72px',
    paddingInline: '26px',
  },
  partners: {
    navBg: 'transparent',
    linkColor: '#ffffff',
    logoColor: '#f4f2f0',
    borderBottom: 'none',
    height: '88px',
    paddingInline: '74px',
  },
};

export default function Nav({ theme, activePath }: NavProps) {
  const s = themeStyles[theme];
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!navRef.current) return;
    // No backdrop filter ever (nav.json backdropFilter: null).
    // No scroll-based state changes for dark/partners — nav stays transparent.
    // Light pages start stuck (no transparent flash over white content).
    return () => {};
  }, [theme]);

  return (
    <nav
      id="site-nav"
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: s.height,
        paddingInline: s.paddingInline,
        backgroundColor: s.navBg,
        borderBottom: s.borderBottom,
      }}
    >
      {/* Logo — G-icon + "riting" wordmark */}
      <Link
        href="/"
        id="nav-logo"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          textDecoration: 'none',
          color: s.logoColor,
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fontSize: theme === 'partners' ? '32px' : '36px',
          letterSpacing: '-1.61px',
          lineHeight: 1,
        }}
      >
        <span
          id="nav-logo-mark"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: theme === 'partners' ? '30px' : '34px',
            height: theme === 'partners' ? '30px' : '34px',
            borderRadius: '50%',
            background: '#00693e',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: theme === 'partners' ? '16px' : '18px',
            letterSpacing: 0,
            flexShrink: 0,
          }}
        >
          G
        </span>
        <span id="nav-logo-text">riting</span>
      </Link>

      {/* Nav links — right-aligned per nav.json alignment: "right" */}
      <div
        id="nav-links"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '45px',
        }}
      >
        {NAV_LINKS_DEFAULT.map(({ label, href }) => {
          const isActive = activePath === href || (href !== '/' && activePath.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              id={`nav-link-${label.toLowerCase()}`}
              className={isActive ? 'nav-link--active' : ''}
              style={{
                color: s.linkColor,
                textDecoration: 'none',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: theme === 'partners' ? '14px' : '16px',
                letterSpacing: 'normal',
                transition: 'opacity 0.2s ease',
                opacity: isActive ? 0.45 : 1,
                pointerEvents: isActive ? 'none' : 'auto',
              }}
            >
              {label}
            </Link>
          );
        })}

        {/* Partners page: ghost-glass CTA button */}
        {theme === 'partners' && (
          <button
            id="nav-cta-partners"
            className="btn-glass"
            style={{
              padding: '10px 20px',
              fontSize: '14px',
            }}
          >
            Join waitlist
          </button>
        )}
      </div>
    </nav>
  );
}
