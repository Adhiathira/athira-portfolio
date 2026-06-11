import { useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Nav from '../components/Nav/Nav';

// ─── Type declarations for GSAP (avoid TS errors without @types/gsap) ───────
declare const gsap: any;
declare const ScrollTrigger: any;

export default function About() {
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  const mosaicRef = useRef<HTMLDivElement>(null);
  const missionHeadingRef = useRef<HTMLHeadingElement>(null);
  const missionBodyRef = useRef<HTMLDivElement>(null);
  const bornLeftRef = useRef<HTMLDivElement>(null);
  const bornRightRef = useRef<HTMLDivElement>(null);
  const ctaHeadingRef = useRef<HTMLHeadingElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically import GSAP and ScrollTrigger (Next.js SSR-safe pattern)
    const initGsap = async () => {
      const gsapModule = await import('gsap');
      const { gsap } = gsapModule;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        // ── 1. Hero heading: line-by-line stagger on mount (not scroll-triggered) ──
        if (heroHeadingRef.current) {
          const lines = heroHeadingRef.current.querySelectorAll('.hero-line');
          gsap.from(lines, {
            y: 50,
            duration: 1.0,
            stagger: 0.18,
            ease: 'power3.out',
            delay: 0.2,
          });
        }

        // ── 2. Photo mosaic: staggered scale entrance on scroll ──
        if (mosaicRef.current) {
          const images = mosaicRef.current.querySelectorAll('.mosaic-item');
          gsap.from(images, {
            scale: 0.88,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: mosaicRef.current,
              start: 'top 80%',
            },
          });
        }

        // ── 3. Mission heading ──
        if (missionHeadingRef.current) {
          gsap.from(missionHeadingRef.current, {
            y: 40,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: missionHeadingRef.current,
              start: 'top 82%',
            },
          });
        }

        // ── 3b. Mission body paragraphs stagger ──
        if (missionBodyRef.current) {
          const paras = missionBodyRef.current.querySelectorAll('.mission-para');
          gsap.from(paras, {
            y: 30,
            duration: 0.75,
            stagger: 0.14,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: missionBodyRef.current,
              start: 'top 82%',
            },
          });
        }

        // ── 4. Born-to-create: left + right columns with 150ms offset ──
        if (bornLeftRef.current) {
          gsap.from(bornLeftRef.current, {
            y: 40,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bornLeftRef.current,
              start: 'top 82%',
            },
          });
        }
        if (bornRightRef.current) {
          gsap.from(bornRightRef.current, {
            y: 40,
            duration: 0.85,
            delay: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bornRightRef.current,
              start: 'top 82%',
            },
          });
        }

        // ── 5. About-cta: heading y entrance ──
        if (ctaHeadingRef.current) {
          gsap.from(ctaHeadingRef.current, {
            y: 30,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ctaHeadingRef.current,
              start: 'top 80%',
            },
          });
        }
      });

      return () => ctx.revert();
    };

    const cleanup = initGsap();
    return () => {
      cleanup.then((fn) => fn && fn());
    };
  }, []);

  // ── Image error handler: swap src for inline placeholder ──
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>, label: string) => {
    const img = e.currentTarget;
    img.style.display = 'none';
    const placeholder = img.nextElementSibling as HTMLElement | null;
    if (placeholder) placeholder.style.display = 'flex';
  };

  return (
    <>
      <Head>
        <title>About — Griting</title>
        <meta name="description" content="Find your path and peace with Griting. Learn about our mission to verify talent readiness." />
      </Head>

      {/* ─────────────────────────────────────────────── */}
      {/* Nav                                            */}
      {/* ─────────────────────────────────────────────── */}
      <Nav theme="dark" activePath="/about" />

      <main style={{ backgroundColor: 'var(--color-bg-hero)', overflowX: 'hidden' }}>

        {/* ═══════════════════════════════════════════════ */}
        {/* SECTION 1 — about-hero (compact, NOT full-vh)  */}
        {/* ═══════════════════════════════════════════════ */}
        <section
          id="about-hero"
          style={{
            backgroundColor: 'var(--color-bg-hero)',
            paddingTop: 'calc(var(--nav-height) + 48px)',
            paddingBottom: '48px',
            paddingInline: 'var(--grid-gutter)',
            maxHeight: '20vh',
            minHeight: '200px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div className="section-inner" style={{ width: '100%' }}>
            <h1
              ref={heroHeadingRef}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--font-size-display)',
                lineHeight: 'var(--line-height-display)',
                letterSpacing: 'var(--tracking-display)',
                color: 'var(--color-text-on-dark)',
                fontWeight: 700,
                overflow: 'hidden',
              }}
            >
              <span
                className="hero-line"
                style={{ display: 'block', overflow: 'hidden' }}
              >
                Find your Path and Peace
              </span>
              <span
                className="hero-line"
                style={{ display: 'block', overflow: 'hidden' }}
              >
                with Griting
              </span>
            </h1>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════ */}
        {/* SECTION 2 — photo-mosaic (visual only)         */}
        {/* ═══════════════════════════════════════════════ */}
        <section
          id="photo-mosaic"
          style={{
            backgroundColor: 'var(--color-bg-hero)',
            paddingBlock: '60px',
            paddingInline: 'var(--grid-gutter)',
          }}
        >
          <div
            className="section-inner"
            ref={mosaicRef}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1.6fr',
              gridTemplateRows: 'auto auto',
              gap: '12px',
              alignItems: 'start',
            }}
          >
            {/* Col A — tall portrait, spans 2 rows */}
            <div
              className="mosaic-item"
              style={{
                gridColumn: '1',
                gridRow: '1 / 3',
                borderRadius: '12px',
                overflow: 'hidden',
                aspectRatio: '3/5',
                backgroundColor: 'var(--color-surface-dark)',
                position: 'relative',
              }}
            >
              <img
                src="/assets/about-app-screenshot.jpeg"
                alt="App screenshot"
                onError={(e) => handleImgError(e, 'App screenshot')}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <div
                style={{
                  display: 'none',
                  position: 'absolute',
                  inset: 0,
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'var(--color-surface-dark)',
                  color: 'rgba(255,255,255,0.5)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  textAlign: 'center',
                  padding: '16px',
                  gap: '8px',
                }}
              >
                <span style={{ fontSize: '24px', opacity: 0.4 }}>[ ]</span>
                <span>about-app-screenshot.jpeg</span>
                <span style={{ opacity: 0.5, fontSize: '11px' }}>Image not found</span>
              </div>
            </div>

            {/* Col B top — portrait 1 */}
            <div
              className="mosaic-item"
              style={{
                gridColumn: '2',
                gridRow: '1',
                borderRadius: '12px',
                overflow: 'hidden',
                aspectRatio: '3/4',
                backgroundColor: 'var(--color-surface-dark)',
                position: 'relative',
              }}
            >
              <img
                src="/assets/about-portrait-1.jpeg"
                alt="Portrait 1"
                onError={(e) => handleImgError(e, 'Portrait 1')}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <div
                style={{
                  display: 'none',
                  position: 'absolute',
                  inset: 0,
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'var(--color-surface-dark)',
                  color: 'rgba(255,255,255,0.5)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  textAlign: 'center',
                  padding: '16px',
                  gap: '8px',
                }}
              >
                <span style={{ fontSize: '24px', opacity: 0.4 }}>[ ]</span>
                <span>about-portrait-1.jpeg</span>
                <span style={{ opacity: 0.5, fontSize: '11px' }}>Image not found</span>
              </div>
            </div>

            {/* Col B bottom — portrait 2 */}
            <div
              className="mosaic-item"
              style={{
                gridColumn: '2',
                gridRow: '2',
                borderRadius: '12px',
                overflow: 'hidden',
                aspectRatio: '3/4',
                backgroundColor: 'var(--color-surface-dark)',
                position: 'relative',
              }}
            >
              <img
                src="/assets/about-portrait-2.jpeg"
                alt="Portrait 2"
                onError={(e) => handleImgError(e, 'Portrait 2')}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <div
                style={{
                  display: 'none',
                  position: 'absolute',
                  inset: 0,
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'var(--color-surface-dark)',
                  color: 'rgba(255,255,255,0.5)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  textAlign: 'center',
                  padding: '16px',
                  gap: '8px',
                }}
              >
                <span style={{ fontSize: '24px', opacity: 0.4 }}>[ ]</span>
                <span>about-portrait-2.jpeg</span>
                <span style={{ opacity: 0.5, fontSize: '11px' }}>Image not found</span>
              </div>
            </div>

            {/* Col C — wide team photo, spans 2 rows */}
            <div
              className="mosaic-item"
              style={{
                gridColumn: '3',
                gridRow: '1 / 3',
                borderRadius: '12px',
                overflow: 'hidden',
                aspectRatio: '16/10',
                backgroundColor: 'var(--color-surface-dark)',
                position: 'relative',
              }}
            >
              <img
                src="/assets/about-team-wide.jpeg"
                alt="Team wide"
                onError={(e) => handleImgError(e, 'Team wide')}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <div
                style={{
                  display: 'none',
                  position: 'absolute',
                  inset: 0,
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'var(--color-surface-dark)',
                  color: 'rgba(255,255,255,0.5)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  textAlign: 'center',
                  padding: '16px',
                  gap: '8px',
                }}
              >
                <span style={{ fontSize: '24px', opacity: 0.4 }}>[ ]</span>
                <span>about-team-wide.jpeg</span>
                <span style={{ opacity: 0.5, fontSize: '11px' }}>Image not found</span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════ */}
        {/* SECTION 3 — mission                            */}
        {/* ═══════════════════════════════════════════════ */}
        <section
          id="mission"
          style={{
            backgroundColor: 'var(--color-section-bg-light)',
            paddingBlock: 'var(--opux-section-padding-block)',
            paddingInline: 'var(--grid-gutter)',
          }}
        >
          <div
            className="section-inner"
            style={{
              maxWidth: '860px',
              margin: '0 auto',
            }}
          >
            <h2
              ref={missionHeadingRef}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--font-size-section-heading)',
                lineHeight: 'var(--line-height-section-heading)',
                letterSpacing: 'var(--tracking-section-heading)',
                color: 'var(--color-text-heading)',
                fontWeight: 700,
                marginBottom: '40px',
              }}
            >
              What would be possible if talent readiness could be verified, not guessed?
            </h2>

            <div ref={missionBodyRef}>
              <p
                className="mission-para"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-section-body)',
                  lineHeight: 'var(--line-height-section-body)',
                  letterSpacing: 'var(--tracking-section-body)',
                  color: 'var(--color-text-body)',
                  marginBottom: '24px',
                }}
              >
                In every critical system of the modern economy, verification exists.
              </p>

              <p
                className="mission-para"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-section-body)',
                  lineHeight: 'var(--line-height-section-body)',
                  letterSpacing: 'var(--tracking-section-body)',
                  color: 'var(--color-text-body)',
                  marginBottom: '24px',
                }}
              >
                Yet when it comes to talent, the most important resource in the AI era - readiness is still largely guessed.
              </p>

              <p
                className="mission-para"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-section-body)',
                  lineHeight: 'var(--line-height-section-body)',
                  letterSpacing: 'var(--tracking-section-body)',
                  color: 'var(--color-text-body)',
                  marginBottom: '40px',
                }}
              >
                We are building systems that evaluate, incubate, and connect exceptional AI talent across the global innovation ecosystem.
              </p>

              {/* Mission item — brand-green accent blockquote */}
              <div
                className="mission-para"
                style={{
                  borderLeft: '3px solid var(--color-brand-primary)',
                  backgroundColor: 'rgba(0,105,62,0.06)',
                  borderRadius: '0 8px 8px 0',
                  padding: '20px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-eyebrow)',
                    letterSpacing: 'var(--tracking-eyebrow)',
                    color: 'var(--color-brand-primary)',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}
                >
                  Mission
                </span>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(17px, 1.6vw, 20px)',
                    lineHeight: '1.55',
                    color: 'var(--color-text-heading)',
                    fontWeight: 500,
                    letterSpacing: '-0.2px',
                  }}
                >
                  Our mission is to enable a future where talent trust and readiness are measurable, transparent, and universally accessible.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════ */}
        {/* SECTION 4 — born-to-create                     */}
        {/* ═══════════════════════════════════════════════ */}
        <section
          id="born-to-create"
          style={{
            backgroundColor: 'var(--color-bg-hero)',
            paddingBlock: 'var(--opux-section-padding-block)',
            paddingInline: 'var(--grid-gutter)',
          }}
        >
          <div
            className="section-inner"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '64px',
              alignItems: 'start',
            }}
          >
            {/* Left column: heading + first paragraph */}
            <div ref={bornLeftRef}>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--font-size-section-heading)',
                  lineHeight: 'var(--line-height-section-heading)',
                  letterSpacing: 'var(--tracking-section-heading)',
                  color: 'var(--color-text-on-dark)',
                  fontWeight: 700,
                  marginBottom: '32px',
                }}
              >
                Born to Create
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-section-body)',
                  lineHeight: 'var(--line-height-section-body)',
                  letterSpacing: 'var(--tracking-section-body)',
                  color: 'rgba(255,255,255,0.75)',
                }}
              >
                Our team brings together deep experience across algorithms, systems, engineering, and go-to-market execution. We've built and operated technology across startups, AI labs, and global organizations including Supermicro (SMCI), EY, and Oracle.
              </p>
            </div>

            {/* Right column: remaining paragraphs + principles */}
            <div
              ref={bornRightRef}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-section-body)',
                  lineHeight: 'var(--line-height-section-body)',
                  letterSpacing: 'var(--tracking-section-body)',
                  color: 'rgba(255,255,255,0.75)',
                }}
              >
                At Griting, we operate as a small, high-ownership team. Everyone works across the stack — from systems and infrastructure to product and ecosystem development. Every system we build and every interaction we design contributes to a larger mission: creating trusted infrastructure for talent readiness in the AI economy.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-section-body)',
                  lineHeight: 'var(--line-height-section-body)',
                  letterSpacing: 'var(--tracking-section-body)',
                  color: 'rgba(255,255,255,0.75)',
                }}
              >
                Our work is guided by three principles:{' '}
                <span style={{ color: 'var(--color-brand-primary)', fontWeight: 600 }}>
                  humanity, clarity, and feedback.
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════ */}
        {/* SECTION 5 — about-cta                          */}
        {/* ═══════════════════════════════════════════════ */}
        <section
          id="about-cta"
          style={{
            backgroundColor: 'var(--color-bg-hero)',
            paddingBlock: '120px',
            paddingInline: 'var(--grid-gutter)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* CSS wireframe globe */}
          <div
            ref={globeRef}
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '440px',
              height: '440px',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          >
            {/* Globe styles are injected via a style tag below */}
            <div className="globe-container">
              <div className="globe-sphere" />
              <div className="globe-ring globe-ring--1" />
              <div className="globe-ring globe-ring--2" />
              <div className="globe-ring globe-ring--3" />
              <div className="globe-ring globe-ring--4" />
              <div className="globe-ring globe-ring--5" />
              <div className="globe-meridian globe-meridian--1" />
              <div className="globe-meridian globe-meridian--2" />
              <div className="globe-meridian globe-meridian--3" />
            </div>
          </div>

          {/* Content above globe */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '40px',
            }}
          >
            <h2
              ref={ctaHeadingRef}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--font-size-section-heading)',
                lineHeight: 'var(--line-height-section-heading)',
                letterSpacing: 'var(--tracking-section-heading)',
                color: 'var(--color-text-on-dark)',
                fontWeight: 700,
                maxWidth: '680px',
                whiteSpace: 'pre-line',
              }}
            >
              {`Ready to build connections\nthat shape your Future?`}
            </h2>

            <Link
              href="/contact"
              className="btn-primary"
              style={{
                display: 'inline-block',
                padding: '18px 40px',
                fontSize: 'var(--font-size-btn)',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                letterSpacing: 'var(--tracking-btn)',
                color: '#ffffff',
                textDecoration: 'none',
                borderRadius: 'var(--btn-border-radius)',
                backgroundColor: 'var(--color-brand-primary)',
                border: '1px solid var(--color-bg-hero)',
                boxShadow: '0px 1px 2px -1px rgba(9,6,63,0.4), 0px 0px 0px 1px var(--color-bg-hero), inset 0px 1px 0px 0px rgba(255,255,255,0.16)',
                transition: 'background-color 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#008050';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-brand-primary)';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
              }}
            >
              Contact Us
            </Link>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════ */}
        {/* FOOTER                                          */}
        {/* ═══════════════════════════════════════════════ */}
        <footer
          id="site-footer"
          style={{
            backgroundColor: 'var(--color-surface-dark)',
            paddingTop: 'var(--opux-footer-padding-top)',
            paddingBottom: 'var(--opux-footer-padding-bottom)',
            paddingInline: 'var(--opux-footer-padding-inline)',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div
            className="section-inner"
            style={{
              display: 'grid',
              gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr',
              gap: '32px',
              alignItems: 'start',
            }}
          >
            {/* Col 1 — Logo + tagline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  color: 'rgba(255,255,255,0.5)',
                  maxWidth: '220px',
                }}
              >
                Verified talent readiness for the AI economy.
              </p>
            </div>

            {/* Col 2 — Product */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.35)',
                  fontWeight: 600,
                }}
              >
                Product
              </span>
              {['Features', 'Pricing', 'Changelog', 'Roadmap'].map((item) => (
                <Link
                  key={item}
                  href="#"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#ffffff')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.6)')}
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* Col 3 — Company */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.35)',
                  fontWeight: 600,
                }}
              >
                Company
              </span>
              {['About', 'Blog', 'Partners', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={item === 'About' ? '/about' : item === 'Blog' ? '/blog' : item === 'Partners' ? '/partners' : '#'}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#ffffff')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.6)')}
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* Col 4 — Social */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.35)',
                  fontWeight: 600,
                }}
              >
                Social
              </span>
              {['LinkedIn', 'Twitter / X', 'GitHub'].map((item) => (
                <Link
                  key={item}
                  href="#"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#ffffff')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.6)')}
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* Col 5 — Legal / copyright */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.35)',
                  fontWeight: 600,
                }}
              >
                Legal
              </span>
              {['Privacy Policy', 'Terms of Service'].map((item) => (
                <Link
                  key={item}
                  href="#"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#ffffff')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.6)')}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Footer bottom bar */}
          <div
            className="section-inner"
            style={{
              marginTop: '48px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.35)',
              }}
            >
              © 2025 Griting. All rights reserved.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.25)',
              }}
            >
              Trusted infrastructure for the AI economy.
            </p>
          </div>
        </footer>
      </main>

    </>
  );
}
