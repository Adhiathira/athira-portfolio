import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Nav from '../../components/Nav/Nav';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// ── Types ──────────────────────────────────────────────────────────────────

interface ArticleCard {
  slug: string;
  title: string;
  category: string;
  date: string;
  rawDate: string;
}

// ── Data ───────────────────────────────────────────────────────────────────

const ARTICLE_CARDS: ArticleCard[] = [
  {
    slug: 'the-first-agentic-mentorship',
    title: 'The First Agentic Mentorship',
    category: 'Company',
    date: '16 Oct',
    rawDate: '2024-10-16',
  },
  {
    slug: 'interview-with-tencent',
    title: 'Interview with Tencent',
    category: 'Company',
    date: '18 Oct',
    rawDate: '2024-10-18',
  },
  {
    slug: 'agentic-system',
    title: 'Agentic System',
    category: 'Developers',
    date: '28 Oct',
    rawDate: '2024-10-28',
  },
];

const FILTER_OPTIONS = ['All', 'Product', 'Company', 'Developers'] as const;
type FilterOption = (typeof FILTER_OPTIONS)[number];

// ── Blog Index Page ────────────────────────────────────────────────────────

export default function BlogIndex() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('All');

  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // GSAP animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Featured post entrance — y:40, transform-only, no opacity
    if (heroRef.current) {
      gsap.from(heroRef.current, {
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.1,
      });
    }

    // Article cards stagger on scroll enter — y:30, transform-only
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll<HTMLElement>('[data-card]');
      if (cards.length > 0) {
        gsap.from(cards, {
          y: 30,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 82%',
            once: true,
          },
        });
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const filteredCards =
    activeFilter === 'All'
      ? ARTICLE_CARDS
      : ARTICLE_CARDS.filter((c) => c.category === activeFilter);

  return (
    <>
      <Head>
        <title>Blog — Griting</title>
        <meta
          name="description"
          content="Insights, stories, and updates from the Griting team."
        />
      </Head>

      <Nav theme="dark" activePath="/blog" />

      <main
        style={{
          fontFamily: 'var(--font-body)',
          backgroundColor: 'var(--color-section-bg-light)',
          minHeight: '100vh',
        }}
      >
        {/* ── Section 1: blog-featured-post ─────────────────────────────── */}
        <section
          id="blog-featured-post"
          style={{
            backgroundColor: 'var(--color-bg-hero)',
            position: 'relative',
            overflow: 'hidden',
            minHeight: '55vh',
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          {/* Background image overlay */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(/assets/blog-hero-bg.jpeg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 0,
            }}
          />
          {/* Gradient overlay for legibility */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to right, rgba(0,54,32,0.92) 55%, rgba(0,54,32,0.45) 100%)',
              zIndex: 1,
            }}
          />

          {/* Hero content */}
          <div
            ref={heroRef}
            className="section-inner"
            style={{
              position: 'relative',
              zIndex: 2,
              width: '100%',
              paddingTop: 'calc(var(--nav-height) + 64px)',
              paddingBottom: '72px',
            }}
          >
            {/* Eyebrow */}
            <span
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: 'var(--tracking-eyebrow)',
                textTransform: 'uppercase',
                color: 'var(--color-brand-primary)',
                marginBottom: '20px',
              }}
            >
              Blog
            </span>

            {/* Headline + author — 60/40 editorial split */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '60% 40%',
                gap: '40px',
                alignItems: 'flex-end',
                maxWidth: '1100px',
              }}
              className="blog-hero-grid"
            >
              {/* Headline */}
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(32px, 4.2vw, 60px)',
                  fontWeight: 700,
                  lineHeight: 1.08,
                  letterSpacing: '-2px',
                  color: 'var(--color-text-on-dark)',
                  margin: 0,
                }}
              >
                The First Agentic Career Mentorship System from Silicon Valley.
              </h1>

              {/* Author meta block */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  paddingBottom: '4px',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '1px',
                    backgroundColor: 'var(--color-brand-primary)',
                    marginBottom: '8px',
                  }}
                />
                <span
                  style={{
                    fontSize: '12px',
                    letterSpacing: 'var(--tracking-eyebrow)',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.55)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Author
                </span>
                <span
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'var(--color-text-on-dark)',
                    fontFamily: 'var(--font-body)',
                    letterSpacing: '-0.2px',
                  }}
                >
                  Jie Zhang
                </span>
              </div>
            </div>
          </div>

        </section>

        {/* ── Section 2: blog-list ──────────────────────────────────────── */}
        <section
          id="blog-list"
          style={{
            backgroundColor: 'var(--color-section-bg-light)',
            paddingBlock: '64px 80px',
          }}
        >
          <div className="section-inner">
            {/* Filter pill row */}
            <FilterPills
              activeFilter={activeFilter}
              onSelect={setActiveFilter}
            />

            {/* Article card grid */}
            <div
              ref={cardsRef}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '24px',
                marginTop: '40px',
              }}
              className="blog-cards-grid"
            >
              {filteredCards.length === 0 ? (
                <p
                  style={{
                    gridColumn: '1 / -1',
                    color: 'var(--color-text-body)',
                    fontSize: '16px',
                    padding: '24px 0',
                  }}
                >
                  No articles in this category yet.
                </p>
              ) : (
                filteredCards.map((card) => (
                  <BlogCard key={card.slug} card={card} />
                ))
              )}
            </div>

          </div>
        </section>

        {/* ── Section 3: blog-cta-banner ────────────────────────────────── */}
        <CtaBanner />

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <SiteFooter />
      </main>
    </>
  );
}

// ── FilterPills ────────────────────────────────────────────────────────────

interface FilterPillsProps {
  activeFilter: FilterOption;
  onSelect: (f: FilterOption) => void;
}

function FilterPills({ activeFilter, onSelect }: FilterPillsProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
      }}
    >
      {FILTER_OPTIONS.map((label) => {
        const isActive = activeFilter === label;
        return (
          <button
            key={label}
            onClick={() => onSelect(label)}
            aria-pressed={isActive}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              height: '36px',
              paddingInline: '16px',
              borderRadius: '100px',
              border: isActive
                ? '1px solid var(--color-brand-primary)'
                : '1px solid var(--color-filter-pill-border)',
              backgroundColor: isActive ? 'var(--color-brand-primary)' : 'transparent',
              color: isActive ? '#ffffff' : 'var(--color-text-body)',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: isActive ? 600 : 400,
              letterSpacing: '-0.1px',
              cursor: 'pointer',
              transition:
                'background-color var(--duration-fast) var(--ease-primary), color var(--duration-fast) var(--ease-primary), border-color var(--duration-fast) var(--ease-primary)',
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

// ── BlogCard ───────────────────────────────────────────────────────────────

interface BlogCardProps {
  card: ArticleCard;
}

function BlogCard({ card }: BlogCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      data-card
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: '12px',
        border: '1px solid var(--color-card-border)',
        padding: '28px 24px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'box-shadow var(--duration-base) var(--ease-primary)',
        boxShadow: hovered
          ? '0 4px 20px rgba(0,105,62,0.08)'
          : '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      {/* Top accent border — draws in on hover */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          backgroundColor: 'var(--color-brand-primary)',
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left center',
          transition: 'transform 0.35s var(--ease-primary)',
          borderRadius: '12px 12px 0 0',
        }}
      />

      {/* Category eyebrow */}
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: 'var(--tracking-eyebrow)',
          textTransform: 'uppercase',
          color: 'var(--color-brand-primary)',
        }}
      >
        {card.category}
      </span>

      {/* Title */}
      <Link
        href={`/blog/${card.slug}`}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '18px',
          fontWeight: 600,
          letterSpacing: '-0.44px',
          lineHeight: 1.35,
          color: 'var(--color-text-heading)',
          textDecoration: hovered ? 'underline' : 'none',
          textUnderlineOffset: '3px',
          textDecorationColor: 'var(--color-brand-primary)',
          transition: 'text-decoration var(--duration-fast) var(--ease-primary)',
        }}
      >
        {card.title}
      </Link>

      {/* Date / category meta */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          fontWeight: 400,
          color: 'var(--color-text-date)',
          letterSpacing: '-0.1px',
          marginTop: 'auto',
        }}
      >
        {card.category} · {card.date}
      </p>
    </article>
  );
}

// ── CtaBanner ──────────────────────────────────────────────────────────────

function CtaBanner() {
  return (
    <section
      id="blog-cta-banner"
      style={{
        backgroundColor: 'var(--color-bg-hero)',
        paddingBlock: '80px',
        textAlign: 'center',
      }}
    >
      <div
        className="section-inner"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '32px',
          maxWidth: '680px',
          margin: '0 auto',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 3.5vw, 48px)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-1.8px',
            color: 'var(--color-text-on-dark)',
            margin: 0,
          }}
        >
          Ready to build connections that shape your future?
        </h2>

        <div
          style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              height: 'var(--btn-height)',
              paddingInline: '28px',
              borderRadius: 'var(--btn-border-radius)',
              backgroundColor: 'var(--color-brand-primary)',
              color: '#ffffff',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-btn)',
              fontWeight: 500,
              letterSpacing: 'var(--tracking-btn)',
              textDecoration: 'none',
              border: '1px solid rgba(0,105,62,0.6)',
              boxShadow:
                '0px 1px 2px -1px rgba(9,6,63,0.4), inset 0px 1px 0px 0px rgba(255,255,255,0.16)',
              transition:
                'background-color var(--duration-fast) var(--ease-primary), transform var(--duration-fast) var(--ease-primary)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#008050';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                'var(--color-brand-primary)';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
            }}
          >
            Explore GritMe
          </Link>

          <Link
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              height: 'var(--btn-height)',
              paddingInline: '28px',
              borderRadius: 'var(--btn-border-radius)',
              backgroundColor: 'var(--color-btn-outline-bg)',
              color: '#ffffff',
              fontFamily: 'var(--font-body)',
              fontSize: '17px',
              fontWeight: 500,
              letterSpacing: 'var(--tracking-btn)',
              textDecoration: 'none',
              border: '1px solid var(--color-brand-primary)',
              boxShadow: '1px 2px 8px 0px rgba(0,0,0,0.02)',
              transition:
                'background-color var(--duration-fast) var(--ease-primary), transform var(--duration-fast) var(--ease-primary)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                'rgba(0,105,62,0.12)';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                'var(--color-btn-outline-bg)';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
            }}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── SiteFooter ─────────────────────────────────────────────────────────────

function SiteFooter() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'Product', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Partners', href: '/partners' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-surface-dark)',
        paddingBlock: 'var(--opux-footer-padding-top) var(--opux-footer-padding-bottom)',
        paddingInline: 'var(--opux-footer-padding-inline)',
        marginTop: 0,
      }}
    >
      <div
        style={{
          maxWidth: 'var(--grid-max-width)',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
        }}
      >
        {/* Top row: logo + nav */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              textDecoration: 'none',
              color: '#ffffff',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '28px',
              letterSpacing: '-1.61px',
              lineHeight: 1,
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: '#00693e',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '14px',
                flexShrink: 0,
              }}
            >
              G
            </span>
            <span>riting</span>
          </Link>

          {/* Footer nav links */}
          <nav aria-label="Footer navigation">
            <ul
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '32px',
                listStyle: 'none',
                margin: 0,
                padding: 0,
              }}
            >
              {footerLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    style={{
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 400,
                      transition: 'color var(--duration-fast) var(--ease-primary)',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        'rgba(255,255,255,0.6)';
                    }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            backgroundColor: 'rgba(255,255,255,0.08)',
          }}
        />

        {/* Bottom row: copyright */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.35)',
              margin: 0,
            }}
          >
            &copy; {currentYear} Griting. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.35)',
              margin: 0,
            }}
          >
            Built for the future of career mentorship.
          </p>
        </div>
      </div>
    </footer>
  );
}
