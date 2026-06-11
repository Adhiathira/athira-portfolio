import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Nav from '@/components/Nav/Nav';

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
interface UseCaseCard {
  title: string;
  body: string;
  cta: string;
}

interface TabData {
  label: string;
  body: string;
  cta: string;
  useCases: UseCaseCard[];
}

/* ─────────────────────────────────────────
   Tab Data — verbatim content
───────────────────────────────────────── */
const TABS: TabData[] = [
  {
    label: 'Rapid-Growth Startups',
    body: 'AI, CS, Data, and Engineering departments\n\nPartner with us to bridge the gap between learning and real-world delivery. Measure, incubate, and showcase your students\u2019 AI capabilities with verifiable evidence employers trust.',
    cta: 'Join Program',
    useCases: [
      {
        title: 'Student Pilot Programs',
        body: 'Run 10\u201350 student pilots to measure AI readiness before graduation',
        cta: 'Start journey',
      },
      {
        title: 'Capstone + Incubation Track',
        body: 'Launch a capstone + incubation track co-designed with industry partners.',
        cta: 'Start journey',
      },
      {
        title: 'AI Readiness Reports',
        body: 'Provide every student with an auditable AI readiness report for employers',
        cta: 'Start journey',
      },
    ],
  },
  {
    label: 'AI-Transforming Companies',
    body: 'Tech and traditional enterprises building AI capabilities\n\nPartner with us to identify and elevate real AI delivery talent within your teams. Evaluate engineers, incubate high-performing AI squads, and align hiring, L&D, and project staffing with verifiable readiness data.',
    cta: 'Join Program',
    useCases: [
      {
        title: 'Engineer Readiness Evaluation',
        body: 'Evaluate internal engineers to identify who\u2019s ready for AI delivery roles.',
        cta: 'Start journey',
      },
      {
        title: 'AI Tiger Team Incubation',
        body: "Incubate a focused \u2018AI Tiger Team\u2019 through real, scoped projects.",
        cta: 'Start journey',
      },
      {
        title: 'Integrated AI Dashboards',
        body: 'Connect readiness data to HR, hiring, and L&D tools.',
        cta: 'Start journey',
      },
    ],
  },
  {
    label: 'Multi-Disciplinary Talent Organizations',
    body: 'Recruiting, staffing, outsourcing, and RPO teams\n\nWork with us to bring credibility and data-driven confidence to your placements. Use standardized audits and readiness reports to showcase candidates who are truly delivery-ready from day one.',
    cta: 'Join Program',
    useCases: [
      {
        title: 'AI Candidate Readiness Audit',
        body: 'Screen and score candidates on real AI delivery capability before placement.',
        cta: 'Start journey',
      },
      {
        title: 'Talent Certification Programs',
        body: 'Offer standardized readiness certificates to differentiate your talent pool.',
        cta: 'Start journey',
      },
      {
        title: 'RPO AI Readiness Integration',
        body: 'Embed Griting readiness data into your RPO workflow for smarter staffing.',
        cta: 'Start journey',
      },
    ],
  },
];

/* ─────────────────────────────────────────
   Numbered bullets data
───────────────────────────────────────── */
const FEATURE_BULLETS = [
  {
    num: '01',
    heading: 'Verify AI readiness and team fit',
    body: 'See skills proven through real project data. Align expectations before work even begins.',
  },
  {
    num: '02',
    heading: 'Define the talent scope & deliverables',
    body: 'Align expectations before work even begins.',
  },
  {
    num: '03',
    heading: 'Decide with dynamic - AI tasks evidence',
    body: 'Make faster calls backed by hands-on results.',
  },
  {
    num: '04',
    heading: 'Partner on a lasting, certifying AI-talent system',
    body: 'Grow with a system that validates skill over time.',
  },
];

/* ─────────────────────────────────────────
   API Bullets
───────────────────────────────────────── */
const API_BULLETS = [
  { label: 'Griting API', body: 'Access Griting readiness data programmatically.' },
  { label: 'Webhooks', body: 'Connect real-time updates to your existing tools.' },
  { label: 'SDK', body: 'Build natively with our developer libraries.' },
];

/* ─────────────────────────────────────────
   Sub-components
───────────────────────────────────────── */

/** Decorative faint network-graph SVG for hero background */
function NetworkGraphBg() {
  return (
    <svg
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
      viewBox="0 0 1440 800"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="netFade" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#00693e" stopOpacity="0.13" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1440" height="800" fill="url(#netFade)" />
      {/* Grid lines */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <line
          key={`v${i}`}
          x1={i * 180}
          y1="0"
          x2={i * 180}
          y2="800"
          stroke="#00693e"
          strokeOpacity="0.06"
          strokeWidth="1"
        />
      ))}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line
          key={`h${i}`}
          x1="0"
          y1={i * 160}
          x2="1440"
          y2={i * 160}
          stroke="#00693e"
          strokeOpacity="0.06"
          strokeWidth="1"
        />
      ))}
      {/* Network nodes */}
      {[
        [240, 200], [480, 120], [720, 280], [960, 160], [1200, 240],
        [360, 400], [600, 480], [840, 360], [1080, 440], [1320, 380],
        [180, 600], [420, 560], [660, 640], [900, 580], [1140, 620],
      ].map(([cx, cy], i) => (
        <circle
          key={`node${i}`}
          cx={cx}
          cy={cy}
          r="3"
          fill="#00693e"
          fillOpacity="0.22"
        />
      ))}
      {/* Network edges (selected connections) */}
      {[
        [[240, 200], [480, 120]], [[480, 120], [720, 280]], [[720, 280], [960, 160]],
        [[960, 160], [1200, 240]], [[360, 400], [600, 480]], [[600, 480], [840, 360]],
        [[840, 360], [1080, 440]], [[240, 200], [360, 400]], [[720, 280], [600, 480]],
        [[1200, 240], [1080, 440]], [[180, 600], [360, 400]], [[660, 640], [600, 480]],
        [[900, 580], [840, 360]], [[1140, 620], [1080, 440]],
      ].map(([[x1, y1], [x2, y2]], i) => (
        <line
          key={`edge${i}`}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="#00693e"
          strokeOpacity="0.09"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

/** Use-case card */
function UseCaseCard({ title, body, cta }: UseCaseCard) {
  return (
    <div
      style={{
        flex: '1 1 0',
        borderTop: '1.5px solid var(--color-brand-primary)',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '12px',
        padding: '28px 24px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-eyebrow)',
          letterSpacing: 'var(--tracking-label)',
          color: 'var(--color-brand-primary)',
          textTransform: 'uppercase',
        }}
      >
        Use case
      </span>
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '20px',
          fontWeight: 500,
          color: 'var(--color-text-primary-dark)',
          letterSpacing: '-0.2px',
          lineHeight: '1.35',
          margin: 0,
        }}
      >
        {title}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-body-dark)',
          color: 'var(--color-text-secondary-dark)',
          lineHeight: '1.55',
          flex: 1,
          margin: 0,
        }}
      >
        {body}
      </p>
      <a
        href="#"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '15px',
          color: 'var(--color-brand-primary)',
          textDecoration: 'none',
          fontWeight: 500,
          marginTop: '8px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          transition: 'opacity var(--duration-fast) var(--ease-primary)',
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.65')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
      >
        {cta} &rarr;
      </a>
    </div>
  );
}

/* ─────────────────────────────────────────
   Partners Page
───────────────────────────────────────── */
export default function PartnersPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [tabWidths, setTabWidths] = useState<number[]>([]);
  const [tabOffsets, setTabOffsets] = useState<number[]>([]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pageRef = useRef<HTMLDivElement>(null);

  /* Measure tab widths for the animated underline */
  useEffect(() => {
    const measure = () => {
      const widths: number[] = [];
      const offsets: number[] = [];
      tabRefs.current.forEach((el) => {
        if (el) {
          widths.push(el.offsetWidth);
          offsets.push(el.offsetLeft);
        }
      });
      setTabWidths(widths);
      setTabOffsets(offsets);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  /* GSAP scroll reveals */
  useEffect(() => {
    let ctx: { revert?: () => void } = {};
    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const elements = document.querySelectorAll('.reveal-element');
        elements.forEach((el) => {
          gsap.from(el, {
            y: 40,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          });
        });
      }, pageRef);
    })();

    return () => {
      if (ctx.revert) ctx.revert();
    };
  }, []);

  const currentTab = TABS[activeTab];

  /* Underline position */
  const underlineLeft = tabOffsets[activeTab] ?? 0;
  const underlineWidth = tabWidths[activeTab] ?? 0;

  return (
    <>
      <Head>
        <title>Partners — Griting</title>
        <meta name="description" content="AI-Era Talent Readiness & Incubation, into Your Business." />
      </Head>

      <div ref={pageRef} style={{ background: 'var(--color-page-bg-dark)', minHeight: '100vh' }}>

        {/* ── Nav — dark on black ── */}
        <Nav theme="dark" activePath="/partners" />

        {/* ══════════════════════════════════════
            Section 1: Partners Hero
        ══════════════════════════════════════ */}
        <section
          className="reveal-element"
          style={{
            position: 'relative',
            background: '#000000',
            paddingTop: '88px',
            paddingBottom: '120px',
            overflow: 'hidden',
          }}
        >
          <NetworkGraphBg />

          <div
            className="site-container"
            style={{ position: 'relative', zIndex: 1, maxWidth: '900px' }}
          >
            <h1
              className="text-display text-gradient"
              style={{ marginBottom: '28px', maxWidth: '860px' }}
            >
              AI-Era Talent Readiness &amp; Incubation, into Your Business.
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-section-body)',
                lineHeight: 'var(--line-height-section-body)',
                letterSpacing: 'var(--tracking-section-body)',
                color: 'var(--color-text-secondary-dark)',
                maxWidth: '680px',
                marginBottom: '44px',
              }}
            >
              We turn individual learning and AI executions into verifiable Day-1 AI readiness
              signals and help you incubate those people into real AI builders.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a href="#contact" className="btn-primary">
                Start a Pilot with Us
              </a>
              <a href="#report" className="btn-outline">
                Sample Readiness Report
              </a>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            Section 2: Feature Bullets (numbered)
        ══════════════════════════════════════ */}
        <section
          style={{
            background: '#000000',
            paddingTop: '80px',
            paddingBottom: '100px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="site-container" style={{ maxWidth: '860px' }}>
            <ol
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0',
              }}
            >
              {FEATURE_BULLETS.map((bullet, i) => (
                <li
                  key={bullet.num}
                  className="reveal-element"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '72px 1fr',
                    gap: '0 32px',
                    alignItems: 'start',
                    paddingTop: '36px',
                    paddingBottom: '36px',
                    borderBottom: i < FEATURE_BULLETS.length - 1
                      ? '1px solid rgba(255,255,255,0.07)'
                      : 'none',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--color-brand-primary)',
                      letterSpacing: '1.5px',
                      paddingTop: '4px',
                    }}
                  >
                    {bullet.num}
                  </span>
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '22px',
                        fontWeight: 500,
                        color: 'var(--color-text-primary-dark)',
                        letterSpacing: '-0.26px',
                        lineHeight: '1.35',
                        marginBottom: '8px',
                      }}
                    >
                      {bullet.heading}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '16px',
                        color: 'var(--color-text-secondary-dark)',
                        lineHeight: '1.6',
                      }}
                    >
                      {bullet.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ══════════════════════════════════════
            Section 3: Griting Partners Header
        ══════════════════════════════════════ */}
        <section
          className="reveal-element"
          style={{
            background: '#000000',
            paddingTop: '100px',
            paddingBottom: '80px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="site-container" style={{ maxWidth: '860px' }}>
            <h2
              className="text-section-heading"
              style={{
                color: 'var(--color-text-primary-dark)',
                marginBottom: '28px',
                fontFamily: 'var(--font-display)',
              }}
            >
              Griting Partners
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-section-body)',
                lineHeight: 'var(--line-height-section-body)',
                letterSpacing: 'var(--tracking-section-body)',
                color: 'var(--color-text-secondary-dark)',
                maxWidth: '780px',
              }}
            >
              Griting uses Agentic mentorship system to turn learning journal into verifiable
              evidence of real AI certifying to helping people quickly determine who has grown from
              learner to builder and who can deliver AI work now.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════
            Section 4: Tabs
        ══════════════════════════════════════ */}
        <section
          style={{
            background: '#000000',
            paddingBottom: '120px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="site-container">

            {/* Tab bar */}
            <div
              role="tablist"
              aria-label="Partner types"
              style={{
                position: 'relative',
                display: 'flex',
                gap: '0',
                marginBottom: '64px',
                paddingBottom: '0',
                overflowX: 'auto',
                msOverflowStyle: 'none',
              }}
            >
              {TABS.map((tab, i) => (
                <button
                  key={tab.label}
                  ref={(el) => { tabRefs.current[i] = el; }}
                  role="tab"
                  aria-selected={activeTab === i}
                  onClick={() => setActiveTab(i)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '24px 40px 28px 0',
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--font-size-tab)',
                    letterSpacing: 'var(--tracking-tab)',
                    fontWeight: 400,
                    color: activeTab === i
                      ? 'var(--color-text-primary-dark)'
                      : 'rgba(255,255,255,0.35)',
                    transition: 'color var(--duration-base) var(--ease-primary)',
                    whiteSpace: 'nowrap',
                    lineHeight: '1.2',
                    flexShrink: 0,
                  }}
                >
                  {tab.label}
                </button>
              ))}

              {/* Animated underline */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  height: '2px',
                  background: 'var(--color-brand-primary)',
                  borderRadius: '2px',
                  left: underlineLeft,
                  width: underlineWidth > 0 ? underlineWidth - 40 : 0,
                  transition: 'left var(--duration-slow) var(--ease-primary), width var(--duration-slow) var(--ease-primary)',
                  willChange: 'left, width',
                }}
              />

              {/* Full-width bottom border */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '1px',
                  background: 'rgba(255,255,255,0.08)',
                }}
              />
            </div>

            {/* Tab content */}
            <div
              role="tabpanel"
              key={activeTab}
              style={{ animation: 'fadeUp 0.35s cubic-bezier(0.4,0,0.2,1) both' }}
            >
              <style>{`
                @keyframes fadeUp {
                  from { transform: translateY(16px); }
                  to   { transform: translateY(0); }
                }
              `}</style>

              {/* Tab body + CTA */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '40px 80px',
                  alignItems: 'start',
                  marginBottom: '64px',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '20px',
                    color: 'var(--color-text-secondary-dark)',
                    lineHeight: '1.65',
                    whiteSpace: 'pre-line',
                    maxWidth: '680px',
                  }}
                >
                  {currentTab.body}
                </p>
                <div style={{ paddingTop: '8px', flexShrink: 0 }}>
                  <a href="#contact" className="btn-primary">
                    {currentTab.cta}
                  </a>
                </div>
              </div>

              {/* Use-case cards */}
              <div
                style={{
                  display: 'flex',
                  gap: '24px',
                  alignItems: 'stretch',
                  flexWrap: 'wrap',
                  marginBottom: '64px',
                }}
              >
                {currentTab.useCases.map((card) => (
                  <UseCaseCard key={card.title} {...card} />
                ))}
              </div>

              {/* Value row — Verify AI readiness signals (Tab 1 only) */}
              {activeTab === 0 && (
                <div
                  style={{
                    padding: '28px 32px',
                    borderRadius: '10px',
                    background: 'rgba(0,105,62,0.08)',
                    border: '1px solid rgba(0,105,62,0.22)',
                    marginBottom: '48px',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '16px',
                      color: 'var(--color-text-secondary-dark)',
                      lineHeight: '1.6',
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 600,
                        color: 'var(--color-brand-primary)',
                        marginRight: '8px',
                      }}
                    >
                      Verify AI readiness signals:
                    </span>
                    See skills proven through real project data.
                  </p>
                </div>
              )}

              {/* API Bullets */}
              <div
                style={{
                  padding: '36px 32px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-eyebrow)',
                    letterSpacing: 'var(--tracking-label)',
                    color: 'var(--color-brand-primary)',
                    textTransform: 'uppercase',
                    marginBottom: '20px',
                    fontWeight: 600,
                  }}
                >
                  Developer Access
                </p>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                  }}
                >
                  {API_BULLETS.map((item) => (
                    <div
                      key={item.label}
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '12px',
                      }}
                    >
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: 'var(--color-brand-primary)',
                          flexShrink: 0,
                          marginTop: '9px',
                          alignSelf: 'flex-start',
                        }}
                      />
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '16px',
                          color: 'var(--color-text-secondary-dark)',
                          lineHeight: '1.6',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 500,
                            color: 'var(--color-text-primary-dark)',
                            marginRight: '6px',
                          }}
                        >
                          {item.label}:
                        </span>
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            Footer
        ══════════════════════════════════════ */}
        <footer
          style={{
            background: 'var(--color-bg-hero)',
            paddingTop: '64px',
            paddingBottom: '40px',
          }}
        >
          <div
            className="site-container"
            style={{
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
              <nav aria-label="Footer navigation">
                <ul
                  style={{
                    listStyle: 'none',
                    margin: 0,
                    padding: 0,
                    display: 'flex',
                    gap: '36px',
                  }}
                >
                  {[
                    { label: 'Product', href: '/' },
                    { label: 'About', href: '/about' },
                    { label: 'Partners', href: '/partners' },
                    { label: 'Blog', href: '/blog' },
                  ].map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '15px',
                          color: 'rgba(255,255,255,0.7)',
                          textDecoration: 'none',
                          transition: 'color var(--duration-base) var(--ease-primary)',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.color = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)';
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
            <hr
              style={{
                border: 'none',
                borderTop: '1px solid rgba(255,255,255,0.12)',
                margin: 0,
              }}
            />

            {/* Bottom row: copyright */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'rgba(255,255,255,0.45)',
                lineHeight: '1',
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
