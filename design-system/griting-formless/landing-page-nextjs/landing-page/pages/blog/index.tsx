import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Nav from '@/components/Nav/Nav';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// ── Data ──────────────────────────────────────────────────────────────────────

const FILTER_CATEGORIES = ['All', 'Mentorship', 'AI', 'Product', 'Community', 'Research'];

const ARTICLE_CARDS = [
  {
    id: 1,
    title: 'Building Verifiable AI Skills in the Modern Workforce',
    date: '10 October 2025',
    category: 'AI',
    excerpt:
      'How organizations are shifting from credential-based hiring to evidence-based capability verification.',
    href: '#',
  },
  {
    id: 2,
    title: 'The Role of Human Mentorship in an AI-Driven Era',
    date: '5 October 2025',
    category: 'Mentorship',
    excerpt:
      'Why human wisdom remains irreplaceable even as AI transforms career development.',
    href: '#',
  },
  {
    id: 3,
    title: 'GritLab: Where Silicon Valley Research Meets Real Builders',
    date: '28 September 2025',
    category: 'Community',
    excerpt:
      'Inside the invite-only AI community building the next generation of the Griting ecosystem.',
    href: '#',
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

/** Dark image placeholder box with brand-green gradient fill */
function ImagePlaceholder({
  aspectRatio = '16/9',
  borderRadius = 14,
}: {
  aspectRatio?: string;
  borderRadius?: number;
}) {
  return (
    <div
      style={{
        width: '100%',
        aspectRatio,
        background: 'var(--color-image-frame-bg)',
        border: '1px solid var(--color-image-frame-border)',
        borderRadius: `${borderRadius}px`,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Brand-green decorative gradient fill */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 40% 60%, rgba(0,105,62,0.45) 0%, rgba(0,41,24,0.6) 60%, rgba(0,26,13,0.85) 100%)',
        }}
      />
      {/* Subtle grid lines — purely decorative */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(0,105,62,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,105,62,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
}

/** Author avatar — circular, initials on teal gradient */
function Avatar({ initials }: { initials: string }) {
  return (
    <div
      style={{
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        background:
          'linear-gradient(135deg, var(--color-avatar-gradient-start), var(--color-avatar-gradient-end))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          fontWeight: 600,
          color: '#ffffff',
          letterSpacing: '0.3px',
        }}
      >
        {initials}
      </span>
    </div>
  );
}

/** Category tag chip */
function CategoryTag({
  label,
  variant = 'default',
}: {
  label: string;
  variant?: 'default' | 'featured';
}) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 10px',
        borderRadius: '9999px',
        background:
          variant === 'featured'
            ? 'rgba(0,105,62,0.12)'
            : 'rgba(0,105,62,0.08)',
        border: '1px solid rgba(0,105,62,0.22)',
        fontFamily: 'var(--font-body)',
        fontSize: '12px',
        fontWeight: 500,
        letterSpacing: '0.3px',
        color: 'var(--color-brand-primary)',
      }}
    >
      {label}
    </span>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BlogIndexPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.utils.toArray<HTMLElement>('.reveal-element').forEach((el) => {
        gsap.from(el, {
          y: 40,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Head>
        <title>Blog — Griting</title>
        <meta
          name="description"
          content="Insights on mentorship, AI, and career development from the Griting team."
        />
      </Head>

      <div ref={rootRef}>
        <Nav theme="light" activePath="/blog" />

        {/* ── 1. Blog Featured Post ─────────────────────────────────────── */}
        <section
          id="blog-featured-post"
          className="pt-[72px]"
          style={{
            background: '#ffffff',
            paddingBottom: '80px',
            paddingInline: 'var(--grid-gutter)',
          }}
        >
          <div
            style={{
              maxWidth: 'var(--grid-max-width)',
              margin: '0 auto',
              paddingTop: '64px',
            }}
          >
            {/* Section eyebrow */}
            <p
              className="reveal-element"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-eyebrow)',
                fontWeight: 600,
                letterSpacing: 'var(--tracking-eyebrow)',
                textTransform: 'uppercase',
                color: 'var(--color-brand-primary)',
                marginBottom: '32px',
              }}
            >
              Featured Article
            </p>

            {/* Featured post two-column grid */}
            <div
              className="reveal-element"
              style={{
                display: 'grid',
                gridTemplateColumns: '60fr 40fr',
                gap: '60px',
                alignItems: 'start',
              }}
            >
              {/* Left column — large image */}
              <Link
                href="/blog/the-first-agentic-career-mentorship-system"
                style={{ textDecoration: 'none', display: 'block' }}
                aria-label="Read: The First Agentic Career Mentorship System from Silicon Valley."
              >
                <ImagePlaceholder aspectRatio="4/3" borderRadius={14} />
              </Link>

              {/* Right column — article metadata */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  paddingTop: '8px',
                  gap: '20px',
                }}
              >
                {/* Date + read time */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-meta)',
                      color: 'var(--color-text-date)',
                      letterSpacing: 'var(--tracking-meta)',
                    }}
                  >
                    16 October 2025
                  </span>
                  <span
                    aria-hidden="true"
                    style={{ color: 'var(--color-text-date)', fontSize: '10px' }}
                  >
                    &bull;
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-meta)',
                      color: 'var(--color-text-date)',
                      letterSpacing: 'var(--tracking-meta)',
                    }}
                  >
                    3 minute read
                  </span>
                </div>

                {/* Category tag */}
                <CategoryTag label="Mentorship" variant="featured" />

                {/* Heading */}
                <Link
                  href="/blog/the-first-agentic-career-mentorship-system"
                  style={{ textDecoration: 'none' }}
                >
                  <h1
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--font-size-card-heading)',
                      fontWeight: 500,
                      lineHeight: '1.22',
                      letterSpacing: 'var(--tracking-card-heading)',
                      color: 'var(--color-text-heading)',
                      transition: 'color var(--duration-fast) var(--ease-primary)',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        'var(--color-brand-primary)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        'var(--color-text-heading)';
                    }}
                  >
                    The First Agentic Career Mentorship System from Silicon Valley.
                  </h1>
                </Link>

                {/* Divider */}
                <div
                  style={{
                    height: '1px',
                    background: 'var(--color-divider)',
                    width: '100%',
                  }}
                />

                {/* Author byline */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Avatar initials="JZ" />
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-meta)',
                        fontWeight: 600,
                        color: 'var(--color-text-ui)',
                        letterSpacing: 'var(--tracking-meta)',
                        marginBottom: '2px',
                      }}
                    >
                      Jie Zhang
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '12px',
                        color: 'var(--color-text-meta)',
                        letterSpacing: 'var(--tracking-meta)',
                      }}
                    >
                      CEO / Founder
                    </p>
                  </div>

                  {/* Read more arrow */}
                  <Link
                    href="/blog/the-first-agentic-career-mentorship-system"
                    className="nav-link-fade"
                    style={{
                      marginLeft: 'auto',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-meta)',
                      fontWeight: 500,
                      color: 'var(--color-brand-primary)',
                      textDecoration: 'none',
                      letterSpacing: 'var(--tracking-meta)',
                    }}
                  >
                    Read article
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 7h10M8 3l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. Blog Filter Bar ────────────────────────────────────────── */}
        <section
          id="blog-filter-bar"
          style={{
            background: '#ffffff',
            borderTop: '1px solid var(--color-nav-border)',
            borderBottom: '1px solid var(--color-nav-border)',
            paddingBlock: '18px',
            paddingInline: 'var(--grid-gutter)',
            position: 'sticky',
            top: 'var(--nav-height)',
            zIndex: 10,
          }}
        >
          <div
            style={{
              maxWidth: 'var(--grid-max-width)',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
            }}
          >
            {/* Filter pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              {FILTER_CATEGORIES.map((cat) => {
                const isActive = activeFilter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '8px 16px',
                      borderRadius: '9999px',
                      border: isActive
                        ? '1px solid var(--color-brand-primary)'
                        : '1px solid var(--color-filter-pill-border)',
                      background: isActive ? 'var(--color-brand-primary)' : 'transparent',
                      color: isActive ? '#ffffff' : 'var(--color-text-body)',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-meta)',
                      fontWeight: isActive ? 500 : 400,
                      letterSpacing: 'var(--tracking-meta)',
                      cursor: 'pointer',
                      transition: 'all var(--duration-fast) var(--ease-primary)',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          'var(--color-brand-primary)';
                        (e.currentTarget as HTMLElement).style.color =
                          'var(--color-brand-primary)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          'var(--color-filter-pill-border)';
                        (e.currentTarget as HTMLElement).style.color =
                          'var(--color-text-body)';
                      }
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search bar — decorative */}
            <div
              style={{
                position: 'relative',
                flexShrink: 0,
                width: '220px',
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-search-placeholder)',
                }}
              >
                <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.25" />
                <path
                  d="M9.5 9.5L12 12"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                />
              </svg>
              <input
                type="search"
                placeholder="Search articles..."
                aria-label="Search articles"
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 34px',
                  borderRadius: '10px',
                  border: '1px solid var(--color-filter-pill-border)',
                  background: 'var(--color-section-bg-light)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-meta)',
                  color: 'var(--color-text-ui)',
                  outline: 'none',
                  transition: 'border-color var(--duration-fast) var(--ease-primary)',
                }}
                onFocus={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    'var(--color-brand-primary)';
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    'var(--color-filter-pill-border)';
                }}
              />
            </div>
          </div>
        </section>

        {/* ── 3. Blog Article List ──────────────────────────────────────── */}
        <section
          id="blog-article-list"
          style={{
            background: '#ffffff',
            paddingBlock: '80px',
            paddingInline: 'var(--grid-gutter)',
          }}
        >
          <div
            style={{
              maxWidth: 'var(--grid-max-width)',
              margin: '0 auto',
            }}
          >
            {/* Section label */}
            <p
              className="reveal-element"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-eyebrow)',
                fontWeight: 600,
                letterSpacing: 'var(--tracking-eyebrow)',
                textTransform: 'uppercase',
                color: 'var(--color-text-meta)',
                marginBottom: '40px',
              }}
            >
              Latest Articles
            </p>

            {/* 3-column card grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '32px',
              }}
            >
              {ARTICLE_CARDS.map((article) => (
                <article
                  key={article.id}
                  className="reveal-element"
                  style={{
                    background: 'var(--color-card-bg)',
                    border: '1px solid var(--color-card-border)',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'box-shadow var(--duration-base) var(--ease-primary), transform var(--duration-base) var(--ease-primary)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      '0 8px 32px rgba(0,105,62,0.1)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}
                >
                  {/* Card image placeholder */}
                  <Link href={article.href} style={{ display: 'block', textDecoration: 'none' }}>
                    <ImagePlaceholder aspectRatio="16/9" borderRadius={0} />
                  </Link>

                  {/* Card body */}
                  <div
                    style={{
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '14px',
                      flex: 1,
                    }}
                  >
                    {/* Date + category row */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '12px',
                          color: 'var(--color-text-date)',
                          letterSpacing: 'var(--tracking-meta)',
                        }}
                      >
                        {article.date}
                      </span>
                      <span
                        aria-hidden="true"
                        style={{ color: 'var(--color-text-date)', fontSize: '10px' }}
                      >
                        &bull;
                      </span>
                      <CategoryTag label={article.category} />
                    </div>

                    {/* Heading */}
                    <Link href={article.href} style={{ textDecoration: 'none' }}>
                      <h2
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'var(--font-size-feature-heading)',
                          fontWeight: 500,
                          lineHeight: '1.3',
                          letterSpacing: 'var(--tracking-feature-title)',
                          color: 'var(--color-text-heading)',
                          transition: 'color var(--duration-fast) var(--ease-primary)',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.color =
                            'var(--color-brand-primary)';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.color =
                            'var(--color-text-heading)';
                        }}
                      >
                        {article.title}
                      </h2>
                    </Link>

                    {/* Excerpt */}
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-meta)',
                        lineHeight: '1.6',
                        color: 'var(--color-text-body)',
                        letterSpacing: 'var(--tracking-meta)',
                        flex: 1,
                      }}
                    >
                      {article.excerpt}
                    </p>

                    {/* Divider */}
                    <div
                      style={{
                        height: '1px',
                        background: 'var(--color-nav-border)',
                      }}
                    />

                    {/* Author byline row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Avatar initials="JZ" />
                      <div style={{ flex: 1 }}>
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '12px',
                            fontWeight: 500,
                            color: 'var(--color-text-ui)',
                            letterSpacing: 'var(--tracking-meta)',
                          }}
                        >
                          Jie Zhang
                        </p>
                      </div>
                      <Link
                        href={article.href}
                        className="nav-link-fade"
                        aria-label={`Read: ${article.title}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          border: '1px solid var(--color-filter-pill-border)',
                          color: 'var(--color-brand-primary)',
                          textDecoration: 'none',
                          flexShrink: 0,
                        }}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M2 6h8M7 2.5L10.5 6 7 9.5"
                            stroke="currentColor"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. Trusted Voices ─────────────────────────────────────────── */}
        <section
          id="blog-trusted-voices"
          style={{
            background: 'var(--color-section-bg-light)',
            paddingBlock: '80px',
            paddingInline: 'var(--grid-gutter)',
          }}
        >
          <div
            style={{
              maxWidth: 'var(--grid-max-width)',
              margin: '0 auto',
            }}
          >
            <p
              className="reveal-element"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-eyebrow)',
                fontWeight: 600,
                letterSpacing: 'var(--tracking-eyebrow)',
                textTransform: 'uppercase',
                color: 'var(--color-text-meta)',
                marginBottom: '40px',
                textAlign: 'center',
              }}
            >
              Trusted voices sharing their experiences
            </p>
          </div>
        </section>

        {/* ── 5. Blog CTA Banner ────────────────────────────────────────── */}
        <section
          id="blog-cta-banner"
          style={{
            position: 'relative',
            background: 'var(--color-brand-primary)',
            paddingBlock: '140px',
            paddingInline: 'var(--grid-gutter)',
            overflow: 'hidden',
            textAlign: 'center',
          }}
        >
          {/* Depth glow overlay */}
          <div
            aria-hidden="true"
            className="depth-glow-footer"
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
            }}
          />

          {/* Animated pulse rings */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '560px',
              height: '560px',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.1)',
              animation: 'ctaBannerPulse 4s ease-in-out infinite',
              pointerEvents: 'none',
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '380px',
              height: '380px',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.14)',
              animation: 'ctaBannerPulse 4s ease-in-out infinite 1.3s',
              pointerEvents: 'none',
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.2)',
              animation: 'ctaBannerPulse 4s ease-in-out infinite 2.6s',
              pointerEvents: 'none',
            }}
          />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2
              className="text-display reveal-element"
              style={{
                color: '#ffffff',
                maxWidth: '820px',
                margin: '0 auto 48px',
              }}
            >
              Ready to build connections that shape your future?
            </h2>

            <div
              className="reveal-element"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                flexWrap: 'wrap',
              }}
            >
              <Link
                href="/"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '18px 32px',
                  borderRadius: 'var(--btn-border-radius)',
                  background: '#ffffff',
                  color: 'var(--color-brand-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-btn-primary)',
                  fontWeight: 600,
                  letterSpacing: 'var(--tracking-btn)',
                  textDecoration: 'none',
                  transition: 'background var(--duration-fast) var(--ease-primary), color var(--duration-fast) var(--ease-primary)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.9)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = '#ffffff';
                }}
              >
                Explore GritMe
              </Link>

              <Link
                href="/#contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '18px 32px',
                  borderRadius: 'var(--btn-border-radius)',
                  background: 'transparent',
                  color: '#ffffff',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-btn-primary)',
                  fontWeight: 500,
                  letterSpacing: 'var(--tracking-btn)',
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.45)',
                  transition: 'border-color var(--duration-fast) var(--ease-primary), background var(--duration-fast) var(--ease-primary)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.8)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.45)';
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
              >
                Contact Us
              </Link>
            </div>
          </div>

          <style jsx>{`
            @keyframes ctaBannerPulse {
              0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
              50% { transform: translate(-50%, -50%) scale(1.06); opacity: 1; }
            }
          `}</style>
        </section>

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <footer
          style={{
            background: 'var(--color-bg-hero)',
            paddingBlock: '60px',
            paddingInline: 'var(--grid-gutter)',
          }}
        >
          <div
            style={{
              maxWidth: 'var(--grid-max-width)',
              margin: '0 auto',
            }}
          >
            {/* Top row: logo + nav links */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '40px',
              }}
            >
              {/* Logo */}
              <Link
                href="/"
                style={{
                  fontFamily: 'var(--font-logo)',
                  fontSize: 'var(--font-size-logo)',
                  fontWeight: 700,
                  letterSpacing: 'var(--tracking-logo)',
                  color: '#ffffff',
                  textDecoration: 'none',
                  lineHeight: 1,
                }}
              >
                griting
              </Link>

              {/* Footer nav links */}
              <nav aria-label="Footer navigation">
                <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
                  {[
                    { label: 'Product', href: '/' },
                    { label: 'About', href: '/about' },
                    { label: 'Partners', href: '/partners' },
                    { label: 'Blog', href: '/blog' },
                  ].map(({ label, href }) => (
                    <Link
                      key={href}
                      href={href}
                      className="nav-link-fade"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-nav)',
                        fontWeight: 400,
                        color: '#ffffff',
                        textDecoration: 'none',
                      }}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </nav>
            </div>

            {/* Divider */}
            <div
              style={{
                height: '1px',
                background: 'rgba(255,255,255,0.1)',
                marginBottom: '24px',
              }}
            />

            {/* Copyright */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-meta)',
                color: 'rgba(255,255,255,0.45)',
                letterSpacing: 'var(--tracking-meta)',
              }}
            >
              &copy; 2025 Griting. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
