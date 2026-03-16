import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Nav from '../../components/Nav/Nav';

// ── Types ─────────────────────────────────────────────────────────────────────

interface BlogPostPageProps {
  slug: string;
}

// ── Static generation ─────────────────────────────────────────────────────────

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: 'the-first-agentic-mentorship' } }],
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  return {
    props: { slug: params.slug },
  };
}

// ── Body paragraphs (verbatim, split on \n\n) ──────────────────────────────────

interface BodyPara {
  text: string;
  link?: { phrase: string; href: string };
}

const BODY_PARAGRAPHS: BodyPara[] = [
  {
    text: 'Every idea begins with a spark, a question that refuses to fade.\nFor us, it began when we stepped away from our comfort zones and realized how hard it is to find real guidance.',
  },
  {
    text: 'The AI era is reshaping how we live, work, and grow.\nSkills expire faster, careers shift overnight, and for many, confidence has become fragile.',
  },
  {
    text: 'But one truth remains, we all need human wisdom to guide us forward in our careers.\nWe all crave guidance and clarity rooted in experience, empathy, and purpose.',
  },
  {
    text: "That's why we built Griting, the first Agentic Career Mentorship Platform born in Silicon Valley, powered by high-density human mentors in the AI era.\nA place where mentorship evolves into something more structured: a path, a graph, a network, a living ecosystem of growth that belongs to you.",
  },
  {
    text: "We believe career growth should never be lonely or confusing. In this new world, growth belongs to everyone.\nIf you're curious to see what's next, visit griting.ai and join our waitlist. You'll be among the first to experience what's coming.",
    link: { phrase: 'griting.ai', href: 'https://griting.ai' },
  },
];

// ── Share icon SVGs ────────────────────────────────────────────────────────────

function IconX() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconLink() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

// ── Hero image with diagnostic fallback (no innerHTML) ────────────────────────

function BlogHeroImage({ parallaxRef }: { parallaxRef: React.RefObject<HTMLDivElement> }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      style={{
        backgroundColor: 'var(--color-image-frame-bg)',
        border: '1px solid var(--color-image-frame-border)',
        borderRadius: '14px',
        overflow: 'hidden',
        lineHeight: 0,
      }}
    >
      <div
        ref={parallaxRef}
        style={{ willChange: 'transform' }}
      >
        {imageError ? (
          /* Diagnostic: image missing — no silent grey box */
          <div
            role="img"
            aria-label="Editorial image unavailable"
            style={{
              minHeight: '420px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '12px',
              padding: '40px',
              backgroundColor: 'var(--color-image-frame-bg)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-text-date)',
                lineHeight: 1.5,
              }}
            >
              Image unavailable
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                fontWeight: 500,
                color: '#ffffff',
                textAlign: 'center',
                maxWidth: '400px',
                lineHeight: 1.5,
              }}
            >
              blog-post-hero.jpeg not found at /public/assets/
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'var(--color-text-date)',
                textAlign: 'center',
                maxWidth: '380px',
                lineHeight: 1.6,
              }}
            >
              Place the editorial image at{' '}
              <code
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                }}
              >
                public/assets/blog-post-hero.jpeg
              </code>{' '}
              and reload the page.
            </span>
          </div>
        ) : (
          <img
            src="/assets/blog-post-hero.jpeg"
            alt="Griting mentorship platform visualization"
            onError={() => setImageError(true)}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              maxHeight: '600px',
              objectFit: 'cover',
            }}
          />
        )}
      </div>
    </div>
  );
}

// ── Paragraph renderer with optional inline brand link ─────────────────────────

function BodyParagraph({ text, link }: BodyPara) {
  if (!link) {
    return (
      <p style={{ whiteSpace: 'pre-line' }}>
        {text}
      </p>
    );
  }

  const parts = text.split(link.phrase);
  return (
    <p style={{ whiteSpace: 'pre-line' }}>
      {parts[0]}
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: 'var(--color-brand-primary)',
          textDecoration: 'underline',
          textUnderlineOffset: '2px',
          fontWeight: 500,
        }}
      >
        {link.phrase}
      </a>
      {parts[1]}
    </p>
  );
}

// ── Page component ─────────────────────────────────────────────────────────────

export default function BlogPostPage({ slug: _slug }: BlogPostPageProps) {
  const router = useRouter();

  const headlineRef = useRef<HTMLHeadingElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // ── GSAP animations ──────────────────────────────────────────────────────────
  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    const initGsap = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // 1. Headline: y:40 entrance on mount (transform-only, no opacity)
        if (headlineRef.current) {
          gsap.from(headlineRef.current, {
            y: 40,
            duration: 0.9,
            ease: 'power3.out',
            delay: 0.15,
          });
        }

        // 2. Hero image: parallax y:20 upward drift on scroll (scrub: 1)
        if (heroImageRef.current) {
          gsap.to(heroImageRef.current, {
            y: -20,
            ease: 'none',
            scrollTrigger: {
              trigger: heroImageRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }

        // 3. Body paragraphs: stagger y:20 on scroll enter (transform-only)
        if (bodyRef.current) {
          const paragraphs = bodyRef.current.querySelectorAll('p');
          gsap.from(paragraphs, {
            y: 20,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bodyRef.current,
              start: 'top 80%',
            },
          });
        }
      });
    };

    initGsap();
    return () => { ctx?.revert(); };
  }, []);

  return (
    <>
      <Head>
        <title>The First Agentic Career Mentorship System from Silicon Valley — Griting</title>
        <meta
          name="description"
          content="Griting is the first Agentic Career Mentorship Platform born in Silicon Valley, powered by high-density human mentors in the AI era."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Nav theme="dark" activePath="/blog" />

      <main style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 1 — Blog Post Header
            Dark-green compact editorial header (~50vh)
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          id="blog-post-header"
          style={{
            backgroundColor: 'var(--color-bg-hero)',
            minHeight: '50vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            paddingTop: 'calc(var(--nav-height) + 24px)',
            paddingBottom: '48px',
          }}
        >
          <div
            style={{
              maxWidth: '1100px',
              margin: '0 auto',
              paddingInline: '26px',
              width: '100%',
            }}
          >
            {/* ── Back link ── */}
            <button
              onClick={() => router.push('/blog')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.60)',
                fontSize: '14px',
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
                cursor: 'pointer',
                padding: 0,
                marginBottom: '32px',
                transition: 'color 0.2s ease',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.60)';
              }}
              aria-label="Back to all posts"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M8.5 2L3.5 7L8.5 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              All Posts
            </button>

            {/* ── Headline ── */}
            <h1
              ref={headlineRef}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 3.6vw, 52px)',
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-1.5px',
                color: 'var(--color-text-on-dark)',
                maxWidth: '820px',
                marginBottom: '32px',
              }}
            >
              The First Agentic Career Mentorship System from Silicon Valley.
            </h1>

            {/* ── Meta row: avatar + author + date/read-time ── */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                flexWrap: 'wrap',
              }}
            >
              {/* Author avatar — "JZ" teal gradient circle */}
              <div
                aria-label="Author: Jie Zhang"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background:
                    'linear-gradient(135deg, var(--color-avatar-gradient-start), var(--color-avatar-gradient-end))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: '13px',
                  fontWeight: 700,
                  fontFamily: 'var(--font-body)',
                  color: '#ffffff',
                  letterSpacing: '0.02em',
                }}
              >
                JZ
              </div>

              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  fontWeight: 500,
                  color: 'var(--color-text-on-dark)',
                }}
              >
                Jie Zhang — CEO / Founder
              </span>

              <span
                aria-hidden="true"
                style={{ color: 'var(--color-text-date)', fontSize: '14px' }}
              >
                ·
              </span>

              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: 'var(--color-text-date)',
                }}
              >
                16 October 2025 · 3 minute read
              </span>
            </div>

            {/* ── Share icons row ── */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '28px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.45)',
                  marginRight: '4px',
                }}
              >
                Share
              </span>

              {/* X / Twitter */}
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  'The First Agentic Career Mentorship System from Silicon Valley — Griting'
                )}&url=${encodeURIComponent(
                  'https://griting.ai/blog/the-first-agentic-mentorship'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on X"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '34px',
                  height: '34px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--color-share-btn-bg)',
                  color: 'var(--color-text-heading)',
                  transition: 'background-color 0.2s ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#e4e5e4';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                    'var(--color-share-btn-bg)';
                }}
              >
                <IconX />
              </a>

              {/* LinkedIn */}
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  'https://griting.ai/blog/the-first-agentic-mentorship'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '34px',
                  height: '34px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--color-share-btn-bg)',
                  color: 'var(--color-text-heading)',
                  transition: 'background-color 0.2s ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#e4e5e4';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                    'var(--color-share-btn-bg)';
                }}
              >
                <IconLinkedIn />
              </a>

              {/* Copy link */}
              <button
                aria-label="Copy link to this post"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    navigator.clipboard.writeText(window.location.href).catch(() => {});
                  }
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '34px',
                  height: '34px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--color-share-btn-bg)',
                  color: 'var(--color-text-heading)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#e4e5e4';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    'var(--color-share-btn-bg)';
                }}
              >
                <IconLink />
              </button>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 2 — Blog Post Image
            Full-width dark-framed panel, parallax on scroll
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          id="blog-post-image"
          style={{
            backgroundColor: 'var(--color-section-bg-light)',
            padding: '56px 26px',
            overflow: 'hidden',
          }}
        >
          <div style={{ maxWidth: '1100px', margin: '0 auto', overflow: 'hidden' }}>
            <BlogHeroImage parallaxRef={heroImageRef} />
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 3 — Blog Post Body
            Light bg, narrow 680px centered column, GSAP stagger on scroll
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          id="blog-post-body"
          style={{
            backgroundColor: 'var(--color-section-bg-light)',
            paddingTop: '8px',
            paddingBottom: '80px',
            paddingInline: '26px',
          }}
        >
          <div
            ref={bodyRef}
            style={{ maxWidth: '680px', margin: '0 auto' }}
          >
            {BODY_PARAGRAPHS.map((para, i) => (
              <BodyParagraph key={i} text={para.text} link={para.link} />
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SECTION 4 — Blog Post CTA
            Full-width dark-green CTA banner
        ══════════════════════════════════════════════════════════════════════ */}
        <section
          id="blog-post-cta"
          style={{
            backgroundColor: 'var(--color-bg-hero)',
            paddingBlock: '96px',
            paddingInline: '26px',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(26px, 3.2vw, 48px)',
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-1.2px',
                color: 'var(--color-text-on-dark)',
                marginBottom: '40px',
              }}
            >
              Ready to build connections that shape your future?
            </h2>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                flexWrap: 'wrap',
              }}
            >
              <Link href="/" style={{ textDecoration: 'none' }}>
                <button className="btn-primary" style={{ minWidth: '160px' }}>
                  Explore GritMe
                </button>
              </Link>

              <Link href="/contact" style={{ textDecoration: 'none' }}>
                <button className="btn-outline" style={{ minWidth: '140px' }}>
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            FOOTER — Dark footer consistent across all pages
        ══════════════════════════════════════════════════════════════════════ */}
        <footer
          id="site-footer"
          style={{
            backgroundColor: 'var(--color-bg-hero)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: 'var(--opux-footer-padding-top)',
            paddingBottom: 'var(--opux-footer-padding-bottom)',
            paddingInline: 'var(--opux-footer-padding-inline)',
          }}
        >
          <div
            style={{
              maxWidth: 'var(--grid-max-width)',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '32px',
            }}
          >
            {/* Logo + tagline */}
            <div style={{ maxWidth: '280px' }}>
              <Link
                href="/"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  textDecoration: 'none',
                  color: '#ffffff',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '28px',
                  letterSpacing: 'var(--tracking-logo)',
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
                    background: 'var(--color-brand-primary)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '15px',
                    flexShrink: 0,
                  }}
                >
                  G
                </span>
                <span>riting</span>
              </Link>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.50)',
                  lineHeight: 1.6,
                  marginTop: '10px',
                }}
              >
                The first Agentic Career Mentorship Platform from Silicon Valley.
              </p>
            </div>

            {/* Footer nav columns */}
            <div style={{ display: 'flex', gap: '56px', flexWrap: 'wrap' }}>
              {[
                {
                  heading: 'Product',
                  links: [
                    { label: 'Features', href: '/' },
                    { label: 'About', href: '/about' },
                    { label: 'Blog', href: '/blog' },
                  ],
                },
                {
                  heading: 'Company',
                  links: [
                    { label: 'Partners', href: '/partners' },
                    { label: 'Contact', href: '/contact' },
                  ],
                },
              ].map((col) => (
                <div key={col.heading}>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                      fontWeight: 600,
                      letterSpacing: 'var(--tracking-eyebrow)',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.35)',
                      marginBottom: '16px',
                    }}
                  >
                    {col.heading}
                  </p>
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    }}
                  >
                    {col.links.map((lnk) => (
                      <li key={lnk.href}>
                        <Link
                          href={lnk.href}
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '14px',
                            color: 'rgba(255,255,255,0.60)',
                            textDecoration: 'none',
                            transition: 'color 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff';
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLAnchorElement).style.color =
                              'rgba(255,255,255,0.60)';
                          }}
                        >
                          {lnk.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Footer bottom bar */}
          <div
            style={{
              maxWidth: 'var(--grid-max-width)',
              margin: '40px auto 0',
              paddingTop: '24px',
              borderTop: '1px solid rgba(255,255,255,0.08)',
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
              }}
            >
              {`© ${new Date().getFullYear()} Griting. All rights reserved.`}
            </p>
            <a
              href="https://griting.ai"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.35)',
                textDecoration: 'none',
              }}
            >
              griting.ai
            </a>
          </div>
        </footer>
      </main>

    </>
  );
}
