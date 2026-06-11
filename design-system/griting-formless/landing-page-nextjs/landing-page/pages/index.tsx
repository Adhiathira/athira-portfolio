import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav/Nav';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      // Generic reveal elements
      gsap.utils.toArray<HTMLElement>('.reveal-element').forEach((el) => {
        gsap.from(el, {
          y: 40,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        });
      });

      // Hero headline
      gsap.from('.hero-headline', {
        y: 60,
        duration: 1.0,
        ease: 'power2.out',
        delay: 0.2,
      });

      // Hero subheading
      gsap.from('.hero-subheading', {
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.45,
      });

      // Hero CTAs
      gsap.from('.hero-ctas', {
        y: 30,
        duration: 0.7,
        ease: 'power2.out',
        delay: 0.65,
      });

      // New infrastructure cards stagger
      gsap.from('.card-item', {
        y: 30,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.cards-section', start: 'top 80%' },
      });

      // Ecosystem columns stagger
      gsap.from('.ecosystem-col', {
        y: 30,
        duration: 0.6,
        stagger: 0.14,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.ecosystem-section', start: 'top 80%' },
      });

      // Pillars stagger
      gsap.from('.pillar-item', {
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.mentorship-section', start: 'top 80%' },
      });

      // Expanding ecosystem cards
      gsap.from('.expand-card', {
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.expanding-section', start: 'top 80%' },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} style={{ overflowX: 'hidden' }}>
      <Nav theme="dark" activePath="/" />

      {/* ─────────────────────────────────────────────────────
          1. HERO
      ───────────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          background: '#003620',
          display: 'flex',
          alignItems: 'center',
          paddingTop: 72,
        }}
      >
        {/* Video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          src="/videos/hero-bg.mp4"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        />
        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,54,32,0.72)',
            zIndex: 1,
          }}
        />

        {/* Content */}
        <div className="site-container" style={{ position: 'relative', zIndex: 2, width: '100%', paddingBlock: '120px 140px' }}>
          <h1
            className="text-display text-gradient hero-headline"
            style={{ maxWidth: 920, marginBottom: 32 }}
          >
            Talent Trust and Readiness Infrastructure for the{' '}
            <span style={{ color: 'var(--color-brand-primary)', WebkitTextFillColor: 'var(--color-brand-primary)' }}>
              AI Capital
            </span>
          </h1>

          <p
            className="font-body hero-subheading"
            style={{
              color: 'rgba(255,255,255,0.82)',
              fontSize: 'var(--font-size-section-body)',
              lineHeight: 'var(--line-height-section-body)',
              letterSpacing: 'var(--tracking-section-body)',
              maxWidth: 660,
              marginBottom: 48,
            }}
          >
            We build products, foster community, and create opportunities that help you learn, grow, and make an impact.
          </p>

          <div className="hero-ctas" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Link href="/#contact" className="btn-primary">
              Get in Touch
            </Link>
            <Link href="/#learn-more" className="btn-outline">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          2. NEW INFRASTRUCTURE (card grid)
      ───────────────────────────────────────────────────── */}
      <section
        className="cards-section"
        style={{
          background: '#000000',
          paddingBlock: '120px',
        }}
      >
        <div className="site-container">
          {/* Intro text */}
          <div style={{ marginBottom: 64 }}>
            <h2
              className="text-section-heading reveal-element font-display"
              style={{ color: '#ffffff', marginBottom: 20 }}
            >
              A New Infrastructure for the AI Talent Era
            </h2>
            <p
              className="font-body reveal-element"
              style={{
                color: 'rgba(255,255,255,0.65)',
                fontSize: 'var(--font-size-section-body)',
                lineHeight: 'var(--line-height-section-body)',
                letterSpacing: 'var(--tracking-section-body)',
                maxWidth: 740,
              }}
            >
              AI is transforming work into workflows. Organizations need a new way to verify capability, develop talent, and build trusted human capital systems.
            </p>
          </div>

          {/* 2x2 card grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '24px',
            }}
          >
            {[
              {
                num: '01',
                title: 'Work Is Becoming Workflow-Based',
                body: 'AI transforms traditional job roles into dynamic workflows where execution, decision-making, and ownership matter more than static credentials.',
              },
              {
                num: '02',
                title: 'Capability Is New Talent Metric',
                body: 'Companies are shifting from hiring individuals for roles to building internal capability systems. Continuous evaluation, learning, and feedback create a living model of talent growth and organizational strength.',
              },
              {
                num: '03',
                title: 'Human Capital Becomes Infrastructure',
                body: 'AI talent needs its own infrastructure — one that verifies execution, builds capability, and connects people across research, industry, and mentorship.',
              },
              {
                num: '04',
                title: 'Trust Must Be Verifiable',
                body: 'Hiring signals today rely on resumes, interviews, and static tests. In the AI era, organizations need traceable and auditable signals of real capability, grounded in real-world work and measurable delivery.',
              },
            ].map(({ num, title, body }) => (
              <div
                key={num}
                className="card-item"
                style={{
                  background: 'var(--color-image-frame-bg)',
                  border: '1px solid var(--color-image-frame-border)',
                  borderRadius: 12,
                  padding: '40px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  transition: 'border-color var(--duration-base) var(--ease-primary)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-brand-primary)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-image-frame-border)';
                }}
              >
                <span
                  className="font-body"
                  style={{
                    color: 'var(--color-brand-primary)',
                    fontSize: 'var(--font-size-label-small)',
                    fontWeight: 600,
                    letterSpacing: 'var(--tracking-label)',
                    textTransform: 'uppercase',
                  }}
                >
                  {num}
                </span>
                <h3
                  className="font-display"
                  style={{
                    color: '#ffffff',
                    fontSize: 'var(--font-size-card-heading)',
                    fontWeight: 500,
                    letterSpacing: 'var(--tracking-card-heading)',
                    lineHeight: 1.2,
                  }}
                >
                  {title}
                </h3>
                <p
                  className="font-body"
                  style={{
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: 'var(--font-size-body-dark)',
                    lineHeight: '23.8px',
                    letterSpacing: '-0.09px',
                  }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          3. ECOSYSTEM OVERVIEW (3-col split)
      ───────────────────────────────────────────────────── */}
      <section
        className="ecosystem-section"
        style={{
          background: 'var(--color-section-bg-light)',
          paddingBlock: '120px',
        }}
      >
        <div className="site-container">
          {/* Heading block */}
          <div style={{ marginBottom: 64 }}>
            <h2
              className="text-section-heading reveal-element font-display"
              style={{ marginBottom: 16 }}
            >
              Explore the Griting Ecosystem
            </h2>
            <p
              className="font-body reveal-element"
              style={{
                color: 'var(--color-text-body)',
                fontSize: 'var(--font-size-section-body)',
                lineHeight: 'var(--line-height-section-body)',
                letterSpacing: 'var(--tracking-section-body)',
                maxWidth: 720,
              }}
            >
              A platform designed to verify capability, develop talent, and connect the AI ecosystem across enterprise, research, and mentorship.
            </p>
          </div>

          {/* 3-col split */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              borderTop: '1px solid var(--color-divider)',
            }}
          >
            {[
              {
                title: 'For Businesses',
                body: 'To discover, evaluate, and develop AI-ready talent for the future.',
                cta: 'Learn More',
              },
              {
                title: 'For Individuals',
                body: 'To grow faster in the AI era with mentorship, community, and incubation support.',
                cta: 'Learn More',
              },
              {
                title: 'For Community',
                body: 'To collaborate on building a global ecosystem for AI innovation and growth.',
                cta: 'Learn More',
              },
            ].map(({ title, body, cta }, i) => (
              <div
                key={title}
                className="ecosystem-col"
                style={{
                  padding: '48px 40px 48px 0',
                  borderRight: i < 2 ? '1px solid var(--color-divider)' : 'none',
                  paddingLeft: i === 0 ? 0 : 40,
                }}
              >
                <h3
                  className="font-display"
                  style={{
                    color: 'var(--color-brand-primary)',
                    fontSize: 'var(--font-size-feature-heading)',
                    fontWeight: 600,
                    letterSpacing: 'var(--tracking-feature-title)',
                    marginBottom: 16,
                  }}
                >
                  {title}
                </h3>
                <p
                  className="font-body"
                  style={{
                    color: 'var(--color-text-body)',
                    fontSize: 'var(--font-size-body)',
                    lineHeight: 'var(--line-height-body)',
                    letterSpacing: 'var(--tracking-body)',
                    marginBottom: 28,
                  }}
                >
                  {body}
                </p>
                <Link
                  href="/#learn-more"
                  className="font-body"
                  style={{
                    color: 'var(--color-brand-primary)',
                    fontSize: 'var(--font-size-body)',
                    fontWeight: 500,
                    textDecoration: 'underline',
                    textUnderlineOffset: 3,
                    transition: 'opacity var(--duration-base) var(--ease-primary)',
                  }}
                >
                  {cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          4. GRITME: AUDITABLE TALENT (split)
      ───────────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          background: '#000000',
          paddingBlock: '120px',
          overflow: 'hidden',
        }}
      >
        {/* Ambient video background */}
        <video
          src="/videos/gritme-ambient.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.3,
            zIndex: 0,
          }}
        />

        <div className="site-container" style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '40fr 60fr',
              gap: 80,
              alignItems: 'start',
            }}
          >
            {/* Left */}
            <div>
              <h2
                className="text-section-heading reveal-element font-display"
                style={{ color: '#ffffff', marginBottom: 20 }}
              >
                GritMe: Auditable Talent System
              </h2>
              <p
                className="font-body reveal-element"
                style={{
                  color: 'rgba(255,255,255,0.65)',
                  fontSize: 'var(--font-size-section-body)',
                  lineHeight: 'var(--line-height-section-body)',
                  letterSpacing: 'var(--tracking-section-body)',
                  marginBottom: 40,
                }}
              >
                An enterprise evidence-based talent evaluation system that provides structured assessments with traceable reasoning and auditable records.
              </p>

              {/* Tab navigation */}
              <div
                className="reveal-element"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0,
                  marginBottom: 36,
                  border: '1px solid var(--color-image-frame-border)',
                  borderRadius: 10,
                  overflow: 'hidden',
                }}
              >
                {['01 Talent outcomes', '02 Outputs by multi-dimension', '03 Simulates with real project'].map(
                  (tab, i) => (
                    <div
                      key={tab}
                      style={{
                        padding: '16px 24px',
                        borderBottom: i < 2 ? '1px solid var(--color-image-frame-border)' : 'none',
                        background:
                          i === 0 ? 'var(--color-brand-primary)' : 'var(--color-image-frame-bg)',
                        color: i === 0 ? '#ffffff' : 'rgba(255,255,255,0.55)',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-body)',
                        fontWeight: i === 0 ? 500 : 400,
                        cursor: 'pointer',
                        transition: 'background var(--duration-base) var(--ease-primary)',
                      }}
                    >
                      {tab}
                    </div>
                  )
                )}
              </div>

              {/* Feature card */}
              <div
                className="reveal-element"
                style={{
                  background: 'var(--color-image-frame-bg)',
                  border: '1px solid var(--color-image-frame-border)',
                  borderRadius: 10,
                  padding: '28px',
                  marginBottom: 32,
                }}
              >
                <h4
                  className="font-display"
                  style={{
                    color: '#ffffff',
                    fontSize: 'var(--font-size-feature-heading)',
                    fontWeight: 500,
                    letterSpacing: 'var(--tracking-feature-title)',
                    marginBottom: 10,
                  }}
                >
                  Evidence-Based Talent Evaluation
                </h4>
                <p
                  className="font-body"
                  style={{
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: 'var(--font-size-body-dark)',
                    lineHeight: '23.8px',
                  }}
                >
                  Access skills with observable evidence to produce auditable reports.
                </p>
              </div>

              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <Link href="/#contact" className="btn-primary">
                  Get in Touch
                </Link>
                <Link href="/#demo" className="btn-outline">
                  Book Demo
                </Link>
              </div>
            </div>

            {/* Right — decorative mockup panel */}
            <div
              className="reveal-element"
              style={{
                background: 'var(--color-image-frame-bg)',
                border: '1px solid var(--color-image-frame-border)',
                borderRadius: 16,
                padding: '36px',
                minHeight: 480,
              }}
            >
              {/* Candidate eval header */}
              <div style={{ marginBottom: 28, display: 'flex', alignItems: 'center', gap: 14 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgb(0,212,146), rgb(0,187,167))',
                  }}
                />
                <div>
                  <div
                    className="font-body"
                    style={{ color: '#ffffff', fontWeight: 500, fontSize: 16, marginBottom: 4 }}
                  >
                    Candidate Evaluation
                  </div>
                  <div
                    className="font-body"
                    style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13 }}
                  >
                    AI Capability Assessment
                  </div>
                </div>
                <div
                  style={{
                    marginLeft: 'auto',
                    background: 'var(--color-brand-primary)',
                    color: '#ffffff',
                    fontSize: 12,
                    fontWeight: 600,
                    padding: '4px 12px',
                    borderRadius: 999,
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  Active
                </div>
              </div>

              {/* Skill bars */}
              {[
                { label: 'ML Engineering', score: 88 },
                { label: 'System Design', score: 74 },
                { label: 'Data Engineering', score: 92 },
                { label: 'Research Execution', score: 67 },
                { label: 'Product Thinking', score: 81 },
              ].map(({ label, score }) => (
                <div key={label} style={{ marginBottom: 18 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 6,
                    }}
                  >
                    <span
                      className="font-body"
                      style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14 }}
                    >
                      {label}
                    </span>
                    <span
                      className="font-body"
                      style={{ color: 'var(--color-brand-primary)', fontSize: 14, fontWeight: 600 }}
                    >
                      {score}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: 6,
                      background: 'var(--color-image-frame-border)',
                      borderRadius: 999,
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${score}%`,
                        background: 'var(--color-brand-primary)',
                        borderRadius: 999,
                      }}
                    />
                  </div>
                </div>
              ))}

              {/* Audit log snippet */}
              <div
                style={{
                  marginTop: 28,
                  background: '#0d1a14',
                  border: '1px solid rgba(0,105,62,0.3)',
                  borderRadius: 8,
                  padding: '16px',
                }}
              >
                <div
                  className="font-body"
                  style={{ color: 'var(--color-code-highlight)', fontSize: 12, lineHeight: 1.7 }}
                >
                  <div>{'// Auditable record generated'}</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)' }}>{'timestamp: 2025-01-14T09:22:11Z'}</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)' }}>{'assessor: AI-v3.2 | human-reviewed'}</div>
                  <div style={{ color: 'var(--color-brand-primary)' }}>{'status: verified ✓'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          5. GRITME: INCUBATION (split)
      ───────────────────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--color-dark-green-bg)',
          paddingBlock: '120px',
        }}
      >
        <div className="site-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 80,
              alignItems: 'start',
            }}
          >
            {/* Left */}
            <div>
              <h2
                className="text-section-heading reveal-element font-display"
                style={{ color: '#ffffff', marginBottom: 20 }}
              >
                GritMe: AI Incubation System
              </h2>
              <p
                className="font-body reveal-element"
                style={{
                  color: 'rgba(255,255,255,0.65)',
                  fontSize: 'var(--font-size-section-body)',
                  lineHeight: 'var(--line-height-section-body)',
                  letterSpacing: 'var(--tracking-section-body)',
                  marginBottom: 40,
                }}
              >
                An enterprise platform designed to develop talent through structured learning, real-world projects, and guided capability building.
              </p>

              <div style={{ display: 'flex', gap: 16, marginBottom: 48 }}>
                <Link href="/#contact" className="btn-primary">
                  Get in Touch
                </Link>
              </div>

              {/* Feature items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  {
                    title: 'Workflow-Based Skill Mapping',
                    body: 'Map real-world workflows into structured skill graphs to identify capability gaps and learning priorities across roles.',
                    cta: null,
                  },
                  {
                    title: 'Personalized Learning Roadmap',
                    body: 'Generate personalized development paths that adapt to performance while aligning progress with defined skill benchmarks.',
                    cta: null,
                  },
                  {
                    title: 'Talent Feedback Integration',
                    body: 'Continuously incorporate feedback signals to improve skill development and learning outcomes.',
                    cta: 'View Recommendations',
                  },
                ].map(({ title, body, cta }, i) => (
                  <div
                    key={title}
                    className="reveal-element"
                    style={{
                      borderTop: '1px solid rgba(255,255,255,0.1)',
                      padding: '28px 0',
                    }}
                  >
                    <h4
                      className="font-display"
                      style={{
                        color: '#ffffff',
                        fontSize: 'var(--font-size-feature-heading)',
                        fontWeight: 500,
                        letterSpacing: 'var(--tracking-feature-title)',
                        marginBottom: 8,
                      }}
                    >
                      {title}
                    </h4>
                    <p
                      className="font-body"
                      style={{
                        color: 'rgba(255,255,255,0.6)',
                        fontSize: 'var(--font-size-body-dark)',
                        lineHeight: '23.8px',
                        marginBottom: cta ? 14 : 0,
                      }}
                    >
                      {body}
                    </p>
                    {cta && (
                      <Link
                        href="/#recommendations"
                        className="font-body"
                        style={{
                          color: 'var(--color-brand-primary)',
                          fontSize: 'var(--font-size-body)',
                          fontWeight: 500,
                          textDecoration: 'underline',
                          textUnderlineOffset: 3,
                        }}
                      >
                        {cta}
                      </Link>
                    )}
                  </div>
                ))}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }} />
              </div>
            </div>

            {/* Right — skill graph visualization */}
            <div className="reveal-element" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg
                width="420"
                height="420"
                viewBox="0 0 420 420"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ maxWidth: '100%' }}
              >
                {/* Background circle */}
                <circle cx="210" cy="210" r="200" fill="rgba(0,105,62,0.05)" stroke="rgba(0,105,62,0.15)" strokeWidth="1" />

                {/* Connecting lines */}
                <line x1="210" y1="210" x2="210" y2="60" stroke="rgba(0,105,62,0.4)" strokeWidth="1.5" />
                <line x1="210" y1="210" x2="80" y2="300" stroke="rgba(0,105,62,0.4)" strokeWidth="1.5" />
                <line x1="210" y1="210" x2="340" y2="300" stroke="rgba(0,105,62,0.4)" strokeWidth="1.5" />
                <line x1="210" y1="210" x2="60" y2="140" stroke="rgba(0,105,62,0.25)" strokeWidth="1" />
                <line x1="210" y1="210" x2="360" y2="140" stroke="rgba(0,105,62,0.25)" strokeWidth="1" />

                {/* Cross lines between nodes */}
                <line x1="210" y1="60" x2="80" y2="300" stroke="rgba(0,105,62,0.15)" strokeWidth="1" />
                <line x1="210" y1="60" x2="340" y2="300" stroke="rgba(0,105,62,0.15)" strokeWidth="1" />
                <line x1="80" y1="300" x2="340" y2="300" stroke="rgba(0,105,62,0.15)" strokeWidth="1" />

                {/* Central node — candidate */}
                <circle cx="210" cy="210" r="28" fill="var(--color-brand-primary)" />
                <circle cx="210" cy="210" r="36" fill="none" stroke="rgba(0,105,62,0.4)" strokeWidth="1.5" />

                {/* Outer nodes */}
                <circle cx="210" cy="60" r="18" fill="#003620" stroke="var(--color-brand-primary)" strokeWidth="2" />
                <circle cx="80" cy="300" r="18" fill="#003620" stroke="var(--color-brand-primary)" strokeWidth="2" />
                <circle cx="340" cy="300" r="18" fill="#003620" stroke="var(--color-brand-primary)" strokeWidth="2" />
                <circle cx="60" cy="140" r="12" fill="#003620" stroke="rgba(0,105,62,0.5)" strokeWidth="1.5" />
                <circle cx="360" cy="140" r="12" fill="#003620" stroke="rgba(0,105,62,0.5)" strokeWidth="1.5" />

                {/* Labels */}
                <text x="210" y="32" textAnchor="middle" fill="white" fontSize="14" fontFamily="Inter, sans-serif" fontWeight="500">
                  ML / Systems
                </text>
                <text x="42" y="318" textAnchor="middle" fill="white" fontSize="14" fontFamily="Inter, sans-serif" fontWeight="500">
                  Data Eng.
                </text>
                <text x="378" y="318" textAnchor="middle" fill="white" fontSize="14" fontFamily="Inter, sans-serif" fontWeight="500">
                  Research
                </text>
                <text x="210" y="218" textAnchor="middle" fill="white" fontSize="12" fontFamily="Inter, sans-serif" fontWeight="600">
                  Candidate
                </text>

                {/* Pulse rings */}
                <circle cx="210" cy="210" r="50" fill="none" stroke="rgba(0,105,62,0.2)" strokeWidth="1">
                  <animate attributeName="r" values="36;80;36" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite" />
                </circle>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          6. GRITME: MENTORSHIP (split)
      ───────────────────────────────────────────────────── */}
      <section
        className="mentorship-section"
        style={{
          background: 'linear-gradient(135deg, #003620 0%, #00693e 50%, #003620 100%)',
          paddingBlock: '120px',
        }}
      >
        <div className="site-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 80,
              alignItems: 'start',
            }}
          >
            {/* Left */}
            <div>
              <h2
                className="text-section-heading reveal-element font-display"
                style={{ color: '#ffffff', marginBottom: 20 }}
              >
                GritMe: Global Growth Mentorship with Physical AI
              </h2>
              <p
                className="font-body reveal-element"
                style={{
                  color: 'rgba(255,255,255,0.75)',
                  fontSize: 'var(--font-size-section-body)',
                  lineHeight: 'var(--line-height-section-body)',
                  letterSpacing: 'var(--tracking-section-body)',
                  marginBottom: 36,
                }}
              >
                A mentorship-driven platform powered by a global mentor network and Physical AI to support talent growth.
              </p>

              <div style={{ marginBottom: 56 }}>
                <Link href="/#try" className="btn-primary" style={{ background: '#ffffff', color: '#003620', border: '1px solid rgba(255,255,255,0.3)' }}>
                  Try It Now
                </Link>
              </div>

              {/* 2x2 pillar grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 24,
                }}
              >
                {[
                  {
                    title: 'Match',
                    body: 'AI pairs mentees with the right mentors based on skills, goals, and experience.',
                  },
                  {
                    title: 'Connect',
                    body: 'Seamless scheduling, chat, and video calls keep mentorship accessible anywhere.',
                  },
                  {
                    title: 'Grow',
                    body: 'Achieve career milestones with personalized guidance and hand-on support.',
                  },
                  {
                    title: 'Thrive',
                    body: 'Join a global community, share experiences, and unlock long-term success.',
                  },
                ].map(({ title, body }) => (
                  <div
                    key={title}
                    className="pillar-item"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: 12,
                      padding: '24px',
                    }}
                  >
                    <h4
                      className="font-display"
                      style={{
                        color: '#ffffff',
                        fontSize: 'var(--font-size-feature-heading)',
                        fontWeight: 600,
                        marginBottom: 10,
                      }}
                    >
                      {title}
                    </h4>
                    <p
                      className="font-body"
                      style={{
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: 'var(--font-size-body-dark)',
                        lineHeight: '23.8px',
                      }}
                    >
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — mentor card mockup + COMING SOON */}
            <div className="reveal-element" style={{ position: 'relative' }}>
              {/* Mentor card stack */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { name: 'Sarah Chen', role: 'ML Research Lead @ DeepMind', exp: '8 yrs', rating: 4.9 },
                  { name: 'Marcus Johnson', role: 'AI Product Director @ OpenAI', exp: '11 yrs', rating: 4.8 },
                  { name: 'Priya Nair', role: 'Data Science Manager @ Google', exp: '6 yrs', rating: 5.0 },
                ].map(({ name, role, exp, rating }, i) => (
                  <div
                    key={name}
                    style={{
                      background: 'rgba(0,54,32,0.85)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: 12,
                      padding: '20px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      transform: i === 1 ? 'translateX(16px)' : 'none',
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, hsl(${140 + i * 30}, 70%, 45%), hsl(${160 + i * 30}, 80%, 35%))`,
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: 18,
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {name[0]}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        className="font-body"
                        style={{ color: '#ffffff', fontWeight: 600, fontSize: 15, marginBottom: 3 }}
                      >
                        {name}
                      </div>
                      <div
                        className="font-body"
                        style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13 }}
                      >
                        {role}
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                      <span
                        style={{
                          background: 'var(--color-brand-primary)',
                          color: '#ffffff',
                          fontSize: 11,
                          fontWeight: 600,
                          padding: '3px 10px',
                          borderRadius: 999,
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        {exp}
                      </span>
                      <span
                        className="font-body"
                        style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                      >
                        ★ {rating}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* COMING SOON diagonal badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%) rotate(-25deg)',
                  background: 'rgba(0,54,32,0.92)',
                  border: '2px solid var(--color-brand-primary)',
                  color: '#ffffff',
                  fontFamily: 'var(--font-display)',
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: 3,
                  padding: '12px 32px',
                  borderRadius: 4,
                  whiteSpace: 'nowrap',
                  zIndex: 10,
                  pointerEvents: 'none',
                }}
              >
                COMING SOON
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          7. EXPANDING THE ECOSYSTEM (2 large cards)
      ───────────────────────────────────────────────────── */}
      <section
        className="expanding-section"
        style={{
          background: '#000000',
          paddingBlock: '120px',
        }}
      >
        <div className="site-container">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2
              className="text-section-heading reveal-element font-display"
              style={{ color: '#ffffff', marginBottom: 16 }}
            >
              Expanding the Ecosystem
            </h2>
            <p
              className="font-body reveal-element"
              style={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: 'var(--font-size-section-body)',
                lineHeight: 'var(--line-height-section-body)',
                letterSpacing: 'var(--tracking-section-body)',
                maxWidth: 640,
                margin: '0 auto',
              }}
            >
              Research infrastructure and AI knowledge networks powering the next layer of the Griting platform.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {[
              {
                title: 'GritLab: Research Lab and IP Engine',
                body: 'An invite-only AI community in Silicon Valley that brings together top talents across research, engineering, and startups',
                cta: 'Join The waitlist',
              },
              {
                title: 'GritHub: AI Knowledge & Signal Platform',
                body: 'An invite-only AI community in Silicon Valley that brings together top talents across research, engineering, and startups',
                cta: 'Join The waitlist',
              },
            ].map(({ title, body, cta }) => (
              <div
                key={title}
                className="expand-card"
                style={{
                  background: 'var(--color-image-frame-bg)',
                  border: '1px solid var(--color-image-frame-border)',
                  borderRadius: 16,
                  padding: '48px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 20,
                  transition: 'border-color var(--duration-base) var(--ease-primary), box-shadow var(--duration-base) var(--ease-primary)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = 'var(--color-brand-primary)';
                  el.style.boxShadow = '0 0 40px rgba(0,105,62,0.2)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = 'var(--color-image-frame-border)';
                  el.style.boxShadow = 'none';
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    background: 'rgba(0,105,62,0.15)',
                    border: '1px solid rgba(0,105,62,0.3)',
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-brand-primary)',
                    fontSize: 22,
                  }}
                >
                  ◈
                </div>
                <h3
                  className="font-display"
                  style={{
                    color: '#ffffff',
                    fontSize: 'var(--font-size-card-heading)',
                    fontWeight: 500,
                    letterSpacing: 'var(--tracking-card-heading)',
                    lineHeight: 1.25,
                  }}
                >
                  {title}
                </h3>
                <p
                  className="font-body"
                  style={{
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: 'var(--font-size-body-dark)',
                    lineHeight: '23.8px',
                    flex: 1,
                  }}
                >
                  {body}
                </p>
                <Link
                  href="/#waitlist"
                  className="font-body"
                  style={{
                    color: 'var(--color-brand-primary)',
                    fontSize: 'var(--font-size-body)',
                    fontWeight: 500,
                    textDecoration: 'underline',
                    textUnderlineOffset: 3,
                    transition: 'opacity var(--duration-base) var(--ease-primary)',
                    alignSelf: 'flex-start',
                  }}
                >
                  {cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          8. TESTIMONIALS (marquee carousel)
      ───────────────────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--color-section-bg-light)',
          paddingBlock: '120px',
          overflow: 'hidden',
        }}
      >
        <div className="site-container" style={{ marginBottom: 56 }}>
          <h2
            className="text-section-heading reveal-element font-display"
            style={{ marginBottom: 12 }}
          >
            Words from those who trust us
          </h2>
          <p
            className="font-body reveal-element"
            style={{
              color: 'var(--color-text-body)',
              fontSize: 'var(--font-size-section-body)',
              lineHeight: 'var(--line-height-section-body)',
              letterSpacing: 'var(--tracking-section-body)',
              maxWidth: 600,
            }}
          >
            Trusted voices sharing their experiences with our platform and organization.
          </p>
        </div>

        {/* Marquee track */}
        <div
          style={{
            display: 'flex',
            overflow: 'hidden',
            maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 24,
              animation: 'marquee 36s linear infinite',
              whiteSpace: 'nowrap',
            }}
          >
            {[
              {
                name: 'Sebastiaan Debrouwere',
                title: 'Senior engineer',
                quote:
                  'The structure is so intuitive that even in demo form, I knew exactly where to go. It feels like they\'ve anticipated friction points and designed around them for usability.',
              },
              {
                name: 'Krishna',
                title: 'University Professor',
                quote:
                  'Turning research into product has always been a gap. If GritLab delivers on its promise, it could be a breakthrough for applied AI innovation.',
              },
              {
                name: 'Alon',
                title: 'Startup Founder',
                quote:
                  'I was impressed seeing how mentors are showing interest so early on. It makes me confident that it will be vibrant.',
              },
              {
                name: 'Jono Bacon',
                title: 'Senior AI researcher',
                quote:
                  'From what I\'ve seen so far, this is shaping up to be a game-changer. The matching process feels promising, and the final product delivers on this, it could set a new bar for mentorship platforms. I\'m excited to see how this turns out.',
              },
              {
                name: 'Dimitry Gershenson',
                title: 'Senior designer',
                quote: 'GritHub looks like it could become the go-to AI community',
              },
              {
                name: 'Sri',
                title: 'Venture Capitalist',
                quote:
                  'The model Griting is building feels like the missing piece in the AI ecosystem. The way they combine mentorship, innovation, and community has huge potential.',
              },
            ]
              .concat([
                // duplicate for seamless loop
                {
                  name: 'Sebastiaan Debrouwere',
                  title: 'Senior engineer',
                  quote:
                    'The structure is so intuitive that even in demo form, I knew exactly where to go. It feels like they\'ve anticipated friction points and designed around them for usability.',
                },
                {
                  name: 'Krishna',
                  title: 'University Professor',
                  quote:
                    'Turning research into product has always been a gap. If GritLab delivers on its promise, it could be a breakthrough for applied AI innovation.',
                },
                {
                  name: 'Alon',
                  title: 'Startup Founder',
                  quote:
                    'I was impressed seeing how mentors are showing interest so early on. It makes me confident that it will be vibrant.',
                },
              ])
              .map(({ name, title, quote }, i) => (
                <div
                  key={`${name}-${i}`}
                  style={{
                    background: '#ffffff',
                    border: '1px solid var(--color-card-border)',
                    borderRadius: 12,
                    padding: '32px',
                    minWidth: 360,
                    maxWidth: 360,
                    display: 'inline-flex',
                    flexDirection: 'column',
                    gap: 16,
                    flexShrink: 0,
                    whiteSpace: 'normal',
                    verticalAlign: 'top',
                    alignSelf: i % 2 === 0 ? 'flex-start' : 'flex-end',
                  }}
                >
                  <span
                    style={{
                      color: 'var(--color-brand-primary)',
                      fontSize: 48,
                      lineHeight: 1,
                      fontFamily: 'serif',
                    }}
                  >
                    &ldquo;
                  </span>
                  <p
                    className="font-body"
                    style={{
                      color: 'var(--color-text-heading)',
                      fontSize: 'var(--font-size-body)',
                      lineHeight: 'var(--line-height-body)',
                      letterSpacing: 'var(--tracking-body)',
                      flex: 1,
                    }}
                  >
                    {quote}
                  </p>
                  <div>
                    <div
                      className="font-body"
                      style={{ color: 'var(--color-text-heading)', fontWeight: 600, fontSize: 15 }}
                    >
                      {name}
                    </div>
                    <div
                      className="font-body"
                      style={{ color: 'var(--color-text-meta)', fontSize: 13 }}
                    >
                      {title}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Marquee keyframes */}
        <style>{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* ─────────────────────────────────────────────────────
          9. CTA BANNER
      ───────────────────────────────────────────────────── */}
      <section
        id="contact"
        style={{
          position: 'relative',
          background: 'var(--color-brand-primary)',
          paddingBlock: '120px',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        <div className="depth-glow-footer" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

        <div className="site-container" style={{ position: 'relative', zIndex: 1 }}>
          <h2
            className="text-section-heading reveal-element font-display"
            style={{ color: '#ffffff', marginBottom: 48, maxWidth: 820, margin: '0 auto 48px' }}
          >
            Ready to build connections that shape your future?
          </h2>

          <div
            style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link
              href="/#gritme"
              className="btn-primary"
              style={{ background: '#ffffff', color: '#003620', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              Explore GritMe
            </Link>
            <Link
              href="/#contact-us"
              className="btn-outline"
              style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#ffffff' }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          FOOTER
      ───────────────────────────────────────────────────── */}
      <footer
        style={{
          position: 'relative',
          background: '#003620',
          overflow: 'hidden',
        }}
      >
        {/* Ambient video */}
        <video
          src="/videos/footer-ambient.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.2,
            zIndex: 0,
          }}
        />

        <div className="site-container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Top row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBlock: '48px',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
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
              }}
            >
              griting
            </Link>

            {/* Nav links */}
            <nav style={{ display: 'flex', gap: 36 }}>
              {['Product', 'About', 'Partners', 'Blog'].map((label) => (
                <Link
                  key={label}
                  href={`/${label.toLowerCase()}`}
                  className="font-body nav-link-fade"
                  style={{
                    color: 'rgba(255,255,255,0.65)',
                    fontSize: 'var(--font-size-body)',
                    textDecoration: 'none',
                  }}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Bottom row */}
          <div style={{ paddingBlock: '24px' }}>
            <p
              className="font-body"
              style={{
                color: 'rgba(255,255,255,0.4)',
                fontSize: 'var(--font-size-meta)',
                letterSpacing: 'var(--tracking-meta)',
              }}
            >
              &copy; 2025 Griting. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
