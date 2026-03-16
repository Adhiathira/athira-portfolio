import { useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Nav from '@/components/Nav/Nav';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function AboutPage() {
  const rootRef = useRef<HTMLDivElement>(null);

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
        <title>About — Griting</title>
        <meta name="description" content="Learn about Griting's mission to enable verifiable talent readiness in the AI era." />
      </Head>

      <div ref={rootRef}>
        <Nav theme="light" activePath="/about" />

        {/* ── 1. About Hero ── */}
        <section
          id="about-hero"
          style={{
            background: 'var(--color-section-bg-light)',
            paddingTop: 'calc(var(--nav-height) + 80px)',
            paddingBottom: '100px',
            paddingInline: 'var(--grid-gutter)',
          }}
        >
          <div style={{ maxWidth: 'var(--grid-max-width)', margin: '0 auto' }}>
            <h1
              className="text-display reveal-element"
              style={{
                color: 'var(--color-text-heading)',
                maxWidth: '900px',
                whiteSpace: 'pre-line',
              }}
            >
              {'Find your Path and Peace\nwith '}
              <span
                style={{
                  color: 'var(--color-brand-primary)',
                  position: 'relative',
                  display: 'inline-block',
                }}
              >
                Griting
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'var(--color-brand-primary)',
                    borderRadius: '2px',
                  }}
                />
              </span>
            </h1>
          </div>
        </section>

        {/* ── 2. About Photo Mosaic ── */}
        <section
          id="about-photo-mosaic"
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
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'auto',
              gap: '12px',
            }}
          >
            {/* Cell 1 — App Screenshot (tall, spans 2 rows) */}
            <div
              className="reveal-element"
              style={{
                background: 'var(--color-dark-green-bg)',
                gridColumn: '1',
                gridRow: '1 / span 2',
                borderRadius: '12px',
                minHeight: '480px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '32px',
              }}
            >
              <span
                style={{
                  fontSize: '13px',
                  fontFamily: 'var(--font-body)',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.5)',
                  marginBottom: '12px',
                }}
              >
                App Screenshot
              </span>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: 'var(--color-brand-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <rect x="4" y="8" width="24" height="3" rx="1.5" fill="rgba(255,255,255,0.8)" />
                  <rect x="4" y="15" width="18" height="3" rx="1.5" fill="rgba(255,255,255,0.6)" />
                  <rect x="4" y="22" width="12" height="3" rx="1.5" fill="rgba(255,255,255,0.4)" />
                </svg>
              </div>
            </div>

            {/* Cell 2 — Portrait */}
            <div
              className="reveal-element"
              style={{
                background: 'var(--color-section-bg-light)',
                gridColumn: '2',
                gridRow: '1',
                borderRadius: '12px',
                minHeight: '230px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
              }}
            >
              <span
                style={{
                  fontSize: '13px',
                  fontFamily: 'var(--font-body)',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-meta)',
                  marginBottom: '12px',
                }}
              >
                Portrait
              </span>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--color-avatar-gradient-start), var(--color-avatar-gradient-end))',
                }}
              />
            </div>

            {/* Cell 3 — Brand card (brand primary) */}
            <div
              className="reveal-element"
              style={{
                background: 'var(--color-brand-primary)',
                gridColumn: '3',
                gridRow: '1',
                borderRadius: '12px',
                minHeight: '230px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
              }}
            >
              <span
                style={{
                  fontSize: '13px',
                  fontFamily: 'var(--font-body)',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.75)',
                  marginBottom: '16px',
                }}
              >
                Brand Card
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '28px',
                  fontWeight: 700,
                  letterSpacing: '-1px',
                  color: '#ffffff',
                }}
              >
                griting
              </span>
            </div>

            {/* Cell 4 — Portrait 2 */}
            <div
              className="reveal-element"
              style={{
                background: 'var(--color-content-panel-bg)',
                gridColumn: '2',
                gridRow: '2',
                borderRadius: '12px',
                minHeight: '230px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
              }}
            >
              <span
                style={{
                  fontSize: '13px',
                  fontFamily: 'var(--font-body)',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                  marginBottom: '12px',
                }}
              >
                Portrait
              </span>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #00693e, #00995e)',
                }}
              />
            </div>

            {/* Cell 5 — Team Photo (spans full width of col 3 row 2) */}
            <div
              className="reveal-element"
              style={{
                background: 'var(--color-dark-green-bg)',
                gridColumn: '3',
                gridRow: '2',
                borderRadius: '12px',
                minHeight: '230px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
              }}
            >
              <span
                style={{
                  fontSize: '13px',
                  fontFamily: 'var(--font-body)',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.5)',
                  marginBottom: '12px',
                }}
              >
                Team Photo
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: i === 0
                        ? 'var(--color-brand-primary)'
                        : i === 1
                        ? 'rgba(255,255,255,0.2)'
                        : 'var(--color-brand-green-dark)',
                      border: '2px solid rgba(255,255,255,0.15)',
                      marginLeft: i > 0 ? '-8px' : '0',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. About Mission ── */}
        <section
          id="about-mission"
          style={{
            background: '#ffffff',
            paddingBlock: '120px',
            paddingInline: 'var(--grid-gutter)',
          }}
        >
          <div
            style={{
              maxWidth: '860px',
              margin: '0 auto',
              textAlign: 'center',
            }}
          >
            <h2
              className="text-section-heading reveal-element"
              style={{ marginBottom: '56px' }}
            >
              What would be possible if talent readiness could be verified, not guessed?
            </h2>

            <div
              className="reveal-element"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-section-body)',
                lineHeight: 'var(--line-height-section-body)',
                letterSpacing: 'var(--tracking-section-body)',
                color: 'var(--color-text-body)',
                textAlign: 'left',
                marginBottom: '56px',
              }}
            >
              <p style={{ marginBottom: '24px' }}>
                In every critical system of the modern economy, verification exists.
              </p>
              <p style={{ marginBottom: '24px' }}>
                Yet when it comes to talent, the most important resource in the AI era - readiness is still largely guessed.
              </p>
              <p>
                We are building systems that evaluate, incubate, and connect exceptional AI talent across the global innovation ecosystem.
              </p>
            </div>

            {/* Mission Accent */}
            <div
              className="reveal-element"
              style={{
                borderLeft: '3px solid var(--color-brand-primary)',
                paddingLeft: '28px',
                textAlign: 'left',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: 'var(--color-brand-primary)',
                  marginBottom: '12px',
                }}
              >
                Mission
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '26px',
                  fontWeight: 400,
                  lineHeight: '1.45',
                  letterSpacing: '-0.5px',
                  color: 'var(--color-brand-primary)',
                  fontStyle: 'italic',
                }}
              >
                Our mission is to enable a future where talent trust and readiness are measurable, transparent, and universally accessible.
              </p>
            </div>
          </div>
        </section>

        {/* ── 4. About Born to Create ── */}
        <section
          id="about-born-to-create"
          style={{
            background: 'var(--color-section-bg-light)',
            paddingBlock: '120px',
            paddingInline: 'var(--grid-gutter)',
          }}
        >
          <div
            style={{
              maxWidth: 'var(--grid-max-width)',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '80px',
              alignItems: 'start',
            }}
          >
            {/* Left: heading */}
            <div>
              <h2
                className="text-display reveal-element"
                style={{ color: 'var(--color-text-heading)' }}
              >
                Born to Create
              </h2>
            </div>

            {/* Right: body */}
            <div className="reveal-element">
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-section-body)',
                  lineHeight: 'var(--line-height-section-body)',
                  letterSpacing: 'var(--tracking-section-body)',
                  color: 'var(--color-text-body)',
                }}
              >
                <p style={{ marginBottom: '24px' }}>
                  Our team brings together deep experience across algorithms, systems, engineering, and go-to-market execution. We&rsquo;ve built and operated technology across startups, AI labs, and global organizations including Supermicro (SMCI), EY, and Oracle.
                </p>
                <p style={{ marginBottom: '24px' }}>
                  At Griting, we operate as a small, high-ownership team. Everyone works across the stack &mdash; from systems and infrastructure to product and ecosystem development. Every system we build and every interaction we design contributes to a larger mission: creating trusted infrastructure for talent readiness in the AI economy.
                </p>
                <p style={{ marginBottom: '36px' }}>
                  Our work is guided by three principles: humanity, clarity, and feedback.
                </p>
              </div>

              {/* Three principles inline row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  flexWrap: 'wrap',
                }}
              >
                {['humanity', 'clarity', 'feedback'].map((principle, index, arr) => (
                  <span key={principle} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '18px',
                        fontWeight: 500,
                        letterSpacing: '-0.3px',
                        color: 'var(--color-brand-primary)',
                      }}
                    >
                      {principle}
                    </span>
                    {index < arr.length - 1 && (
                      <span
                        aria-hidden="true"
                        style={{
                          fontSize: '18px',
                          color: 'var(--color-brand-primary)',
                          lineHeight: 1,
                        }}
                      >
                        &bull;
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. About CTA ── */}
        <section
          id="about-cta"
          style={{
            position: 'relative',
            background: 'var(--color-bg-hero)',
            paddingBlock: '160px',
            paddingInline: 'var(--grid-gutter)',
            overflow: 'hidden',
            textAlign: 'center',
          }}
        >
          {/* Decorative radial glow */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse 80% 60% at 50% 60%, rgba(0,105,62,0.55) 0%, rgba(0,41,24,0.4) 55%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* Animated pulse ring */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '600px',
              height: '600px',
              borderRadius: '50%',
              border: '1px solid rgba(0,105,62,0.18)',
              animation: 'ctaPulse 4s ease-in-out infinite',
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
              width: '420px',
              height: '420px',
              borderRadius: '50%',
              border: '1px solid rgba(0,105,62,0.25)',
              animation: 'ctaPulse 4s ease-in-out infinite 1.3s',
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
              width: '240px',
              height: '240px',
              borderRadius: '50%',
              border: '1px solid rgba(0,105,62,0.35)',
              animation: 'ctaPulse 4s ease-in-out infinite 2.6s',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2
              className="text-display reveal-element"
              style={{
                color: '#ffffff',
                maxWidth: '820px',
                margin: '0 auto',
                whiteSpace: 'pre-line',
              }}
            >
              {'Ready to build connections\nthat shape your future?'}
            </h2>
          </div>

          <style jsx>{`
            @keyframes ctaPulse {
              0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
              50% { transform: translate(-50%, -50%) scale(1.06); opacity: 1; }
            }
          `}</style>
        </section>

        {/* ── Footer ── */}
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
            {/* Top row: logo + links */}
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

              {/* Nav links */}
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

            {/* Bottom row: copyright */}
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
