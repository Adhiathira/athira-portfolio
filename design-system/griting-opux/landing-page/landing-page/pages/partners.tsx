import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Nav from '../components/Nav/Nav';

// ── Types ──────────────────────────────────────────────────────────────────────

interface UseCaseCard {
  title: string;
  body: string;
  cta: string;
}

interface TabData {
  id: string;
  label: string;
  heading: string;
  subheading: string;
  body: string;
  cta: string;
  valueBullets?: string[];
  useCaseCards: UseCaseCard[];
  image: string;
}

// ── Static data ───────────────────────────────────────────────────────────────

const HERO_BULLETS = [
  {
    title: 'Verify AI readiness and team fit',
    body: 'See skills proven through real project data. Align expectations before work even begins.',
  },
  {
    title: 'Define the talent scope & deliverables',
    body: 'Align expectations before work even begins.',
  },
  {
    title: 'Decide with dynamic - AI tasks evidence',
    body: 'Make faster calls backed by hands-on results.',
  },
  {
    title: 'Partner on a lasting, certifying AI-talent system',
    body: 'Grow with a system that validates skill over time.',
  },
];

const TABS: TabData[] = [
  {
    id: 'rapid-growth-startups',
    label: 'Rapid-Growth Startups',
    heading: 'Rapid-Growth Startups',
    subheading: 'AI, CS, Data, and Engineering departments',
    body: 'Partner with us to bridge the gap between learning and real-world delivery. Measure, incubate, and showcase your students\u0027 AI capabilities with verifiable evidence employers trust.',
    cta: 'Join Program',
    useCaseCards: [
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
    image: 'assets/partners-tab-1.jpeg',
  },
  {
    id: 'ai-transforming-companies',
    label: 'AI-Transforming Companies',
    heading: 'Companies Undergoing\nAI Transformation',
    subheading: 'Tech and traditional enterprises building AI capabilities',
    body: 'Partner with us to identify and elevate real AI delivery talent within your teams. Evaluate engineers, incubate high-performing AI squads, and align hiring, L&D, and project staffing with verifiable readiness data.',
    cta: 'Join Program',
    valueBullets: [
      'Assess true AI readiness of candidates and internal engineers',
      'Identify who can deliver now vs. who needs incubation',
      'Design measurable upskilling paths with clear milestones and checkpoints',
    ],
    useCaseCards: [
      {
        title: 'Engineer Readiness Evaluation',
        body: 'Evaluate internal engineers to identify who\u0027s ready for AI delivery roles.',
        cta: 'Start journey',
      },
      {
        title: 'AI Tiger Team Incubation',
        body: 'Incubate a focused \u0027AI Tiger Team\u0027 through real, scoped projects.',
        cta: 'Start journey',
      },
      {
        title: 'Integrated AI Dashboards',
        body: 'Use dashboards and APIs to connect hiring, L&D, and project staffing efforts.',
        cta: 'Start journey',
      },
    ],
    image: 'assets/partners-tab-2.jpeg',
  },
  {
    id: 'multidisciplinary-talent',
    label: 'Multi-Disciplinary Talent Organizations',
    heading: 'Multi-Disciplinary\nTalent Organizations',
    subheading: 'Recruiting, staffing, outsourcing, and RPO teams',
    body: 'Work with us to bring credibility and data-driven confidence to your placements. Use standardized audits and readiness reports to showcase candidates who are truly delivery-ready from day one.',
    cta: 'Join Program',
    valueBullets: [
      'Evaluate candidates\u0027 AI skills through a unified, high-signal standard',
      'Prove to clients that candidates are ready to deliver from Day 1',
      'Reduce probation risk, failed placements, and early churn',
    ],
    useCaseCards: [
      {
        title: 'Pre-Assessment for Candidates',
        body: 'Pre-assess candidates before presenting them to clients.',
        cta: 'Start journey',
      },
      {
        title: 'Co-Branded Incubation Cohorts',
        body: 'Run co-branded incubation cohorts to elevate your candidate pool.',
        cta: 'Start journey',
      },
      {
        title: 'Verified Delivery Evidence',
        body: 'Offer clients not just resumes \u2014 but verifiable delivery evidence.',
        cta: 'Start journey',
      },
    ],
    image: 'assets/partners-tab-3.jpeg',
  },
];

const WHAT_WE_PROVIDE = [
  {
    title: 'Standardized Audit Units',
    body: 'AI-native, scenario-based assessments that evaluate technical clarity, communication, metacognition, and execution under real constraints \u2014 not just multiple-choice questions or toy projects.',
  },
  {
    title: 'Incubation Programs',
    body: 'For select university and enterprise partners, we offer cohort-based incubation tracks where participants work on real AI projects while our multi-agent engine tracks goals, feedback, and progress in real time.',
  },
  {
    title: 'Auditable Readiness Reports',
    body: 'Comprehensive, verifiable Day-1 AI readiness reports at both program and team levels, complete with traceable artifacts, evidence trails, and feedback loops instead of self-reported skills.',
  },
  {
    title: 'Dashboards & API Access',
    body: 'We provide real-time dashboards and API integrations so universities, companies, and talent partners can seamlessly connect our signals to:\n- Elevate students\u0027 Day-1 AI readiness for real-world roles\n- Use verifiable performance data to strengthen internship and placement\n- Demonstrate to employers that graduates are truly delivery-ready',
  },
];

// ── Check icon ─────────────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, marginTop: '2px' }}
    >
      <circle cx="10" cy="10" r="10" fill="#00995e" fillOpacity="0.18" />
      <path
        d="M6 10.5L8.5 13L14 7.5"
        stroke="#00995e"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Use case card ──────────────────────────────────────────────────────────────

function UseCaseCard({ title, body, cta }: UseCaseCard) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.09)',
        borderRadius: '12px',
        padding: '28px 28px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <p
        style={{
          color: '#f4f2f0',
          fontSize: '17px',
          fontWeight: 600,
          lineHeight: 1.3,
          letterSpacing: '-0.2px',
          margin: 0,
        }}
      >
        {title}
      </p>
      <p
        style={{
          color: '#cccccc',
          fontSize: '14px',
          lineHeight: 1.55,
          margin: 0,
          flex: 1,
        }}
      >
        {body}
      </p>
      <button
        style={{
          background: 'transparent',
          border: 'none',
          padding: 0,
          color: '#00995e',
          fontSize: '14px',
          fontWeight: 500,
          cursor: 'pointer',
          textAlign: 'left',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          width: 'fit-content',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {cta}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M2.5 7h9M8 3.5L11.5 7 8 10.5"
            stroke="#00995e"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

// ── Tab content panel ──────────────────────────────────────────────────────────

function TabPanel({ tab, visible }: { tab: TabData; visible: boolean }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible) return;
    let gsapMod: any;
    import('gsap').then(({ gsap }) => {
      gsapMod = gsap;
      gsap.fromTo(
        panelRef.current,
        { y: 20 },
        { y: 0, duration: 0.45, ease: 'power2.out' }
      );
    });
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={panelRef}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.35fr',
        gap: '64px',
        alignItems: 'start',
        paddingTop: '60px',
        paddingBottom: '60px',
      }}
      className="tab-panel-grid"
    >
      {/* Left col */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h2
          style={{
            color: '#f4f2f0',
            fontSize: 'clamp(28px, 2.8vw, 40px)',
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: '-1.2px',
            margin: 0,
            whiteSpace: 'pre-line',
          }}
        >
          {tab.heading}
        </h2>
        <p
          style={{
            color: '#00995e',
            fontSize: '14px',
            fontWeight: 500,
            letterSpacing: '0.6px',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          {tab.subheading}
        </p>
        <p
          style={{
            color: '#cccccc',
            fontSize: '16px',
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {tab.body}
        </p>

        {/* Value bullets if present */}
        {tab.valueBullets && tab.valueBullets.length > 0 && (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {tab.valueBullets.map((bullet, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  color: '#cccccc',
                  fontSize: '15px',
                  lineHeight: 1.5,
                }}
              >
                <CheckIcon />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Tab image */}
        <div
          style={{
            borderRadius: '12px',
            overflow: 'hidden',
            background: '#1e2623',
            aspectRatio: '16/9',
            position: 'relative',
          }}
        >
          <img
            src={tab.image}
            alt={tab.heading.replace('\n', ' ')}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={(e) => {
              const t = e.currentTarget as HTMLImageElement;
              t.style.display = 'none';
              const parent = t.parentElement;
              if (parent) {
                parent.style.display = 'flex';
                parent.style.alignItems = 'center';
                parent.style.justifyContent = 'center';
                parent.style.minHeight = '180px';
                const msg = document.createElement('p');
                msg.style.cssText = 'color:#cccccc;font-size:13px;text-align:center;padding:16px;';
                msg.textContent = `Image not found: ${tab.image}`;
                parent.appendChild(msg);
              }
            }}
          />
        </div>

        <button
          className="btn-primary"
          style={{
            width: 'fit-content',
            padding: '14px 32px',
            fontSize: '16px',
          }}
        >
          {tab.cta}
        </button>
      </div>

      {/* Right col — use case cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {tab.useCaseCards.map((card, i) => (
          <UseCaseCard key={i} {...card} />
        ))}
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────

export default function PartnersPage() {
  const [activeTab, setActiveTab] = useState(0);

  // Refs for GSAP targets
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  const heroBulletsRef = useRef<HTMLDivElement>(null);
  const whatWeProvideRef = useRef<HTMLDivElement>(null);
  const tabBarRef = useRef<HTMLDivElement>(null);

  // Hero heading slide on mount
  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      if (heroHeadingRef.current) {
        gsap.fromTo(
          heroHeadingRef.current,
          { y: 60 },
          { y: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 }
        );
      }
    });
  }, []);

  // Scroll-triggered animations
  useEffect(() => {
    let ctx: any;
    import('gsap').then(async ({ gsap }) => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        // Feature bullets stagger
        if (heroBulletsRef.current) {
          const bullets = heroBulletsRef.current.querySelectorAll('.hero-bullet');
          gsap.fromTo(
            bullets,
            { y: 30 },
            {
              y: 0,
              duration: 0.55,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: heroBulletsRef.current,
                start: 'top 85%',
                once: true,
              },
            }
          );
        }

        // What we provide — diagonal cascade
        if (whatWeProvideRef.current) {
          const cards = whatWeProvideRef.current.querySelectorAll('.provide-card');
          gsap.fromTo(
            cards,
            { y: 40 },
            {
              y: 0,
              duration: 0.6,
              stagger: { amount: 0.45, from: 'start' },
              ease: 'power2.out',
              scrollTrigger: {
                trigger: whatWeProvideRef.current,
                start: 'top 80%',
                once: true,
              },
            }
          );
        }
      });
    });

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  const progressWidth = ['33.33%', '66.66%', '100%'][activeTab];

  return (
    <>
      <Head>
        <title>Partners — Griting</title>
        <meta
          name="description"
          content="Partner with Griting to bridge AI readiness, incubate talent, and build verifiable delivery signals."
        />
      </Head>

      {/* ── Page root: black background ── */}
      <div
        style={{
          backgroundColor: '#000000',
          minHeight: '100vh',
          fontFamily: 'Inter Variable, Inter, sans-serif',
        }}
      >
        <Nav theme="partners" activePath="/partners" />

        {/* ════════════════════════════════════════════════
            SECTION 1 — Partners Hero
        ════════════════════════════════════════════════ */}
        <section
          id="partners-hero"
          style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: '88px',
            paddingBottom: '80px',
            overflow: 'hidden',
          }}
        >
          {/* Video background */}
          <video
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
              zIndex: 0,
            }}
            onError={(e) => {
              (e.currentTarget as HTMLVideoElement).style.display = 'none';
            }}
          >
            <source src="assets/partners-hero-bg.mp4" type="video/mp4" />
          </video>

          {/* Dark overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.80) 100%)',
              zIndex: 1,
            }}
          />

          {/* Hero content */}
          <div
            className="section-inner"
            style={{
              position: 'relative',
              zIndex: 2,
              paddingInline: 'var(--partners-page-margin)',
              maxWidth: '1440px',
              margin: '0 auto',
            }}
          >
            {/* Heading */}
            <div style={{ overflow: 'hidden', marginBottom: '28px' }}>
              <h1
                ref={heroHeadingRef}
                style={{
                  color: '#ffffff',
                  fontSize: 'clamp(38px, 4.4vw, 64px)',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: '-2.5px',
                  maxWidth: '820px',
                  margin: 0,
                }}
              >
                AI-Era Talent Readiness &amp; Incubation, into Your Business.
              </h1>
            </div>

            {/* Subheading */}
            <p
              style={{
                color: '#cccccc',
                fontSize: 'clamp(16px, 1.4vw, 20px)',
                lineHeight: 1.55,
                maxWidth: '620px',
                marginBottom: '40px',
              }}
            >
              We turn individual learning and AI executions into verifiable Day-1 AI readiness
              signals and help you incubate those people into real AI builders.
            </p>

            {/* CTA */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '72px' }}>
              <button
                className="btn-primary"
                style={{ padding: '16px 36px', fontSize: '17px' }}
              >
                Start a Pilot with Us
              </button>
            </div>

            {/* Feature bullets grid */}
            <div ref={heroBulletsRef}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '20px 40px',
                  maxWidth: '860px',
                }}
                className="hero-bullets-grid"
              >
                {HERO_BULLETS.map((bullet, i) => (
                  <div
                    key={i}
                    className="hero-bullet"
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                    }}
                  >
                    <CheckIcon />
                    <div>
                      <p
                        style={{
                          color: '#f4f2f0',
                          fontSize: '15px',
                          fontWeight: 600,
                          marginBottom: '4px',
                          lineHeight: 1.3,
                        }}
                      >
                        {bullet.title}
                      </p>
                      <p
                        style={{
                          color: 'rgba(255,255,255,0.55)',
                          fontSize: '13px',
                          lineHeight: 1.5,
                          margin: 0,
                        }}
                      >
                        {bullet.body}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Sample Readiness Report CTA */}
                <div
                  className="hero-bullet"
                  style={{
                    gridColumn: '1 / -1',
                    marginTop: '8px',
                  }}
                >
                  <button
                    className="btn-glass"
                    style={{
                      padding: '12px 28px',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M4 2h5.5L13 5.5V14H4V2z"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 2v4h4"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                      />
                      <path
                        d="M6 9h4M6 11.5h2.5"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                      />
                    </svg>
                    Sample Readiness Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 2 — Partners Description
        ════════════════════════════════════════════════ */}
        <section
          id="partners-description"
          style={{
            backgroundColor: '#000000',
            paddingBlock: '72px',
            paddingInline: 'var(--partners-page-margin)',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto', paddingInline: '114px' }}>
            {/* Top rule */}
            <div
              style={{
                height: '1px',
                background: '#00995e',
                marginBottom: '48px',
                width: '100%',
              }}
            />

            <div style={{ maxWidth: '800px' }}>
              <h2
                style={{
                  color: '#f4f2f0',
                  fontSize: 'clamp(26px, 2.6vw, 38px)',
                  fontWeight: 700,
                  letterSpacing: '-1px',
                  lineHeight: 1.2,
                  marginBottom: '20px',
                }}
              >
                Griting Partners
              </h2>
              <p
                style={{
                  color: '#cccccc',
                  fontSize: '17px',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                Griting uses Agentic mentorship system to turn learning journal into verifiable
                evidence of real AI certifying to helping people quickly determine who has grown
                from learner to builder and who can deliver AI work now.
              </p>
            </div>

            {/* Bottom rule */}
            <div
              style={{
                height: '1px',
                background: '#00995e',
                marginTop: '48px',
                width: '100%',
              }}
            />
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            TAB BAR — sticky below nav (top: 88px)
        ════════════════════════════════════════════════ */}
        <div
          ref={tabBarRef}
          id="partners-tab-bar"
          style={{
            position: 'sticky',
            top: '88px',
            zIndex: 50,
            backgroundColor: '#000000',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div
            style={{
              maxWidth: '1212px',
              margin: '0 auto',
              paddingInline: '114px',
              position: 'relative',
            }}
          >
            {/* Tab buttons row */}
            <div
              style={{
                display: 'flex',
                gap: '0',
                alignItems: 'stretch',
              }}
            >
              {TABS.map((tab, i) => {
                const isActive = activeTab === i;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(i)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      padding: '22px 28px 20px',
                      color: isActive ? '#ffffff' : 'rgba(255,255,255,0.55)',
                      fontWeight: isActive ? 600 : 500,
                      fontSize: '14px',
                      lineHeight: 1.3,
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      whiteSpace: 'nowrap',
                      transition: 'color 0.25s ease, font-weight 0.15s ease',
                      letterSpacing: isActive ? '-0.1px' : 'normal',
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Progress bar */}
            <div
              style={{
                height: '3px',
                background: '#c6c6c6',
                width: '100%',
                position: 'relative',
                borderRadius: '2px',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  width: progressWidth,
                  background: '#00995e',
                  borderRadius: '2px',
                  transition: 'width 0.35s cubic-bezier(0.4,0,0.2,1)',
                }}
              />
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════
            TAB CONTENT PANELS (sections 3-5)
        ════════════════════════════════════════════════ */}
        <div
          id="partners-tab-content"
          style={{
            backgroundColor: '#000000',
            paddingInline: '114px',
          }}
        >
          <div style={{ maxWidth: '1212px', margin: '0 auto' }}>
            {TABS.map((tab, i) => (
              <TabPanel key={tab.id} tab={tab} visible={activeTab === i} />
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════════════
            SECTION — What We Provide
        ════════════════════════════════════════════════ */}
        <section
          id="partners-what-we-provide"
          style={{
            backgroundColor: '#000000',
            paddingBlock: '96px',
            paddingInline: '114px',
          }}
        >
          <div style={{ maxWidth: '1212px', margin: '0 auto' }}>
            {/* Heading */}
            <div style={{ marginBottom: '16px' }}>
              <h2
                style={{
                  color: '#f4f2f0',
                  fontSize: 'clamp(28px, 3vw, 44px)',
                  fontWeight: 700,
                  letterSpacing: '-1.4px',
                  lineHeight: 1.15,
                  margin: 0,
                }}
              >
                What We Provide
              </h2>
            </div>
            <p
              style={{
                color: '#cccccc',
                fontSize: '17px',
                lineHeight: 1.55,
                maxWidth: '620px',
                marginBottom: '56px',
              }}
            >
              Evidence-based assessments, verifiable readiness, and incubation that turns
              potential into delivery.
            </p>

            {/* Cards grid */}
            <div
              ref={whatWeProvideRef}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '24px',
              }}
              className="provide-cards-grid"
            >
              {WHAT_WE_PROVIDE.map((item, i) => (
                <div
                  key={i}
                  className="provide-card"
                  style={{
                    background: '#1e2623',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '16px',
                    padding: '36px 32px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                  }}
                >
                  <h3
                    style={{
                      color: '#f4f2f0',
                      fontSize: '20px',
                      fontWeight: 600,
                      letterSpacing: '-0.3px',
                      lineHeight: 1.25,
                      margin: 0,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      color: '#cccccc',
                      fontSize: '15px',
                      lineHeight: 1.65,
                      margin: 0,
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            CTA BANNER
        ════════════════════════════════════════════════ */}
        <section
          id="partners-cta-banner"
          style={{
            backgroundColor: '#003620',
            paddingBlock: '96px',
            paddingInline: '114px',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <h2
              style={{
                color: '#ffffff',
                fontSize: 'clamp(28px, 3.2vw, 46px)',
                fontWeight: 700,
                letterSpacing: '-1.4px',
                lineHeight: 1.15,
                marginBottom: '40px',
              }}
            >
              Ready to build connections that shape your future?
            </h2>
            <div
              style={{
                display: 'flex',
                gap: '16px',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <button
                className="btn-primary"
                style={{ padding: '16px 36px', fontSize: '17px' }}
              >
                Explore GritMe
              </button>
              <button
                className="btn-outline"
                style={{ padding: '16px 36px', fontSize: '17px' }}
              >
                Contact Us
              </button>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            FOOTER
        ════════════════════════════════════════════════ */}
        <footer
          id="partners-footer"
          style={{
            backgroundColor: '#0a0a0a',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: '56px',
            paddingBottom: '37px',
            paddingInline: '86px',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
                gap: '48px',
                marginBottom: '48px',
              }}
              className="footer-grid"
            >
              {/* Brand */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginBottom: '16px',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      background: '#00693e',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '16px',
                    }}
                  >
                    G
                  </span>
                  <span
                    style={{
                      color: '#f4f2f0',
                      fontWeight: 600,
                      fontSize: '22px',
                      letterSpacing: '-1px',
                    }}
                  >
                    riting
                  </span>
                </div>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.45)',
                    fontSize: '13px',
                    lineHeight: 1.6,
                    maxWidth: '240px',
                    margin: 0,
                  }}
                >
                  AI-era talent readiness and incubation for the next generation of builders.
                </p>
              </div>

              {/* Product */}
              <div>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.35)',
                    fontSize: '12px',
                    fontWeight: 500,
                    letterSpacing: '0.8px',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                  }}
                >
                  Product
                </p>
                {['Features', 'GritMe', 'Pricing', 'Changelog'].map((link) => (
                  <p key={link} style={{ marginBottom: '10px' }}>
                    <a
                      href="#"
                      style={{
                        color: 'rgba(255,255,255,0.55)',
                        textDecoration: 'none',
                        fontSize: '14px',
                      }}
                    >
                      {link}
                    </a>
                  </p>
                ))}
              </div>

              {/* Company */}
              <div>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.35)',
                    fontSize: '12px',
                    fontWeight: 500,
                    letterSpacing: '0.8px',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                  }}
                >
                  Company
                </p>
                {['About', 'Partners', 'Blog', 'Careers'].map((link) => (
                  <p key={link} style={{ marginBottom: '10px' }}>
                    <a
                      href="#"
                      style={{
                        color: 'rgba(255,255,255,0.55)',
                        textDecoration: 'none',
                        fontSize: '14px',
                      }}
                    >
                      {link}
                    </a>
                  </p>
                ))}
              </div>

              {/* Legal */}
              <div>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.35)',
                    fontSize: '12px',
                    fontWeight: 500,
                    letterSpacing: '0.8px',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                  }}
                >
                  Legal
                </p>
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
                  <p key={link} style={{ marginBottom: '10px' }}>
                    <a
                      href="#"
                      style={{
                        color: 'rgba(255,255,255,0.55)',
                        textDecoration: 'none',
                        fontSize: '14px',
                      }}
                    >
                      {link}
                    </a>
                  </p>
                ))}
              </div>
            </div>

            {/* Footer bottom */}
            <div
              style={{
                borderTop: '1px solid rgba(255,255,255,0.06)',
                paddingTop: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <p
                style={{
                  color: 'rgba(255,255,255,0.3)',
                  fontSize: '13px',
                  margin: 0,
                }}
              >
                &copy; {new Date().getFullYear()} Griting. All rights reserved.
              </p>
              <p
                style={{
                  color: 'rgba(255,255,255,0.3)',
                  fontSize: '13px',
                  margin: 0,
                }}
              >
                Built for the AI era.
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* ── Responsive styles ── */}
      <style jsx global>{`
        @media (max-width: 900px) {
          .tab-panel-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .provide-cards-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-bullets-grid {
            grid-template-columns: 1fr !important;
          }
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          #partners-tab-bar > div {
            padding-inline: 24px !important;
            overflow-x: auto;
          }
          #partners-tab-bar button {
            white-space: nowrap;
            padding: 18px 20px 16px !important;
            font-size: 13px !important;
          }
          #partners-hero .section-inner,
          #partners-description > div,
          #partners-tab-content > div,
          #partners-what-we-provide > div,
          #partners-cta-banner > div {
            padding-inline: 24px !important;
          }
          #partners-description,
          #partners-tab-content,
          #partners-what-we-provide,
          #partners-cta-banner {
            padding-inline: 0 !important;
          }
          #partners-hero .section-inner {
            padding-inline: 24px !important;
          }
          #partners-footer {
            padding-inline: 24px !important;
          }
        }

        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
          #partners-tab-bar {
            overflow: hidden;
          }
          #partners-tab-bar > div {
            overflow-x: scroll;
            scrollbar-width: none;
          }
          #partners-tab-bar > div::-webkit-scrollbar {
            display: none;
          }
          .btn-primary,
          .btn-outline,
          .btn-glass {
            width: 100% !important;
          }
          #partners-cta-banner .flex {
            flex-direction: column !important;
          }
        }
      `}</style>
    </>
  );
}
