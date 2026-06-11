import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Nav from '../components/Nav/Nav';

// ─── Types ───────────────────────────────────────────────────────────────────

interface TestimonialCard {
  author: string;
  quote: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const INFRASTRUCTURE_CARDS = [
  {
    title: 'Work Is Becoming Workflow-Based',
    body: 'AI transforms traditional job roles into dynamic workflows where execution, decision-making, and ownership matter more than static credentials.',
  },
  {
    title: 'Capability Is New Talent Metric',
    body: 'Companies are shifting from hiring individuals for roles to building internal capability systems. Continuous evaluation, learning, and feedback create a living model of talent growth and organizational strength.',
  },
  {
    title: 'Human Capital Becomes Infrastructure',
    body: 'AI talent needs its own infrastructure — one that verifies execution, builds capability, and connects people across research, industry, and mentorship.',
  },
  {
    title: 'Trust Must Be Verifiable',
    body: 'Hiring signals today rely on resumes, interviews, and static tests. In the AI era, organizations need traceable and auditable signals of real capability, grounded in real-world work and measurable delivery.',
  },
];

const ECOSYSTEM_CARDS = [
  {
    audience: 'For Businesses',
    body: 'To discover, evaluate, and develop AI-ready talent for the future.',
    cta: 'Learn More',
  },
  {
    audience: 'For Individuals',
    body: 'To grow faster in the AI era with mentorship, community, and incubation support.',
    cta: 'Learn More',
  },
  {
    audience: 'For Community',
    body: 'To collaborate on building a global ecosystem for AI innovation and growth.',
    cta: 'Learn More',
  },
];

const GRITME_TABS = [
  { label: '01 Talent outcomes', img: '/assets/gritme-tab-1.jpeg' },
  { label: '02 Outputs by multi-dimension', img: '/assets/gritme-tab-2.jpeg' },
  { label: '03 Simulates with real project', img: '/assets/gritme-tab-3.jpeg' },
];

const INCUBATION_FEATURES = [
  {
    title: 'Workflow-Based Skill Mapping',
    body: 'Map real-world workflows into structured skill graphs to identify capability gaps and learning priorities across roles.',
  },
  {
    title: 'Personalized Learning Roadmap',
    body: 'Generate personalized development paths that adapt to performance while aligning progress with defined skill benchmarks.',
  },
  {
    title: 'Talent Feedback Integration',
    body: 'Continuously incorporate feedback signals to improve skill development and learning outcomes.',
    cta: 'View Recommendations',
  },
];

const MENTORSHIP_PILLARS = [
  { step: 'Match', body: 'AI pairs mentees with the right mentors based on skills, goals, and experience.' },
  { step: 'Connect', body: 'Seamless scheduling, chat, and video calls keep mentorship accessible anywhere.' },
  { step: 'Grow', body: 'Achieve career milestones with personalized guidance and hand-on support.' },
  { step: 'Thrive', body: 'Join a global community, share experiences, and unlock long-term success.' },
];

const TESTIMONIALS: TestimonialCard[] = [
  {
    author: 'Sebastiaan Debrouwere — Senior engineer',
    quote: "The structure is so intuitive that even in demo form, I knew exactly where to go. It feels like they've anticipated friction points and designed around them for usability.",
  },
  {
    author: 'Krishna — University Professor',
    quote: "Turning research into product has always been a gap. If GritLab delivers on its promise, it could be a breakthrough for applied AI innovation.",
  },
  {
    author: 'Alon — Startup Founder',
    quote: "I was impressed seeing how mentors are showing interest so early on. It makes me confident that it will be vibrant.",
  },
  {
    author: 'Jono Bacon — Senior AI researcher',
    quote: "From what I've seen so far, this is shaping up to be a game-changer. The matching process feels promising, and the final product delivers on this, it could set a new bar for mentorship platforms. I'm excited to see how this turns out.",
  },
  {
    author: 'Dimitry Gershenson — Senior designer',
    quote: "GritHub looks like it could become the go-to AI community",
  },
  {
    author: 'Sri — Venture Capitalist',
    quote: "The model Griting is building feels like the missing piece in the AI ecosystem. The way they combine mentorship, innovation, and community has huge potential.",
  },
];

// ─── Missing-asset placeholder ───────────────────────────────────────────────

function AssetMissing({
  assetType,
  name,
  path,
  dark = true,
}: {
  assetType: 'image' | 'video';
  name: string;
  path: string;
  dark?: boolean;
}) {
  const bg = dark ? 'rgba(0,54,32,0.25)' : '#f0f2f0';
  const border = dark ? '1px dashed rgba(0,105,62,0.4)' : '1px dashed rgba(0,105,62,0.25)';
  const textColor = dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,54,32,0.4)';
  const icon = assetType === 'video' ? '\u25B6' : '\uD83D\uDDBC';

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        background: bg,
        border,
        borderRadius: '12px',
        color: textColor,
        fontFamily: 'var(--font-body)',
        fontSize: '12px',
        letterSpacing: '0.6px',
        textTransform: 'uppercase',
        padding: '32px',
        textAlign: 'center',
      }}
    >
      <span style={{ fontSize: '28px', opacity: 0.35 }}>{icon}</span>
      <span style={{ fontWeight: 600 }}>{name}</span>
      <span
        style={{
          fontSize: '10px',
          opacity: 0.5,
          fontFamily: 'monospace',
          textTransform: 'none',
          letterSpacing: 0,
        }}
      >
        {path}
      </span>
      <span style={{ fontSize: '11px', opacity: 0.4, textTransform: 'none', letterSpacing: 0, maxWidth: '240px' }}>
        Add this file to public/ and refresh
      </span>
    </div>
  );
}

// ─── FallbackImage — swaps to AssetMissing on load error ─────────────────────

function FallbackImage({
  src,
  alt,
  name,
  style: imgStyle,
  dark = true,
}: {
  src: string;
  alt: string;
  name: string;
  style?: React.CSSProperties;
  dark?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <AssetMissing assetType="image" name={name} path={src} dark={dark} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      style={imgStyle}
    />
  );
}

// ─── FallbackVideo — swaps to CSS terrain on load error ──────────────────────

function FallbackVideo({
  src,
  name,
  style: vidStyle,
  fallbackClassName,
}: {
  src: string;
  name: string;
  style?: React.CSSProperties;
  fallbackClassName?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={fallbackClassName}
        style={{ width: '100%', height: '100%', ...(!fallbackClassName ? { background: 'var(--color-bg-hero)' } : {}) }}
      >
        <AssetMissing assetType="video" name={name} path={src} dark />
      </div>
    );
  }

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      onError={() => setFailed(true)}
      style={vidStyle}
      src={src}
    />
  );
}

// ─── Testimonial card component ───────────────────────────────────────────────

function TestimonialCardComponent({ author, quote }: TestimonialCard) {
  return (
    <div
      style={{
        background: 'var(--color-surface-dark)',
        border: '1px solid var(--color-card-border-dark)',
        borderRadius: '14px',
        padding: '24px 28px',
        width: '340px',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          fontFamily: 'Georgia, serif',
          fontSize: '48px',
          lineHeight: 1,
          color: 'var(--color-brand-primary)',
          marginBottom: '12px',
          height: '40px',
          display: 'flex',
          alignItems: 'flex-start',
        }}
      >
        &ldquo;
      </div>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          lineHeight: 1.65,
          color: 'rgba(255,255,255,0.7)',
          marginBottom: '20px',
        }}
      >
        {quote}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          fontWeight: 600,
          color: 'rgba(255,255,255,0.45)',
          letterSpacing: '0.2px',
        }}
      >
        {author}
      </p>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const heroHeadlineRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const infraCardsRef = useRef<HTMLDivElement>(null);
  const ecosystemColsRef = useRef<HTMLDivElement>(null);
  const gritmeImageRef = useRef<HTMLDivElement>(null);
  const incubationImageRef = useRef<HTMLDivElement>(null);
  const expandingColsRef = useRef<HTMLDivElement>(null);
  const ctaBannerHeadRef = useRef<HTMLHeadingElement>(null);

  const [activeTab, setActiveTab] = useState(0);

  // ── GSAP animations ────────────────────────────────────────────────────────
  useEffect(() => {
    const initGsap = async () => {
      const gsapModule = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const gsap = gsapModule.default;

      gsap.registerPlugin(ScrollTrigger);

      const root = getComputedStyle(document.documentElement);
      const durationBase = parseFloat(root.getPropertyValue('--duration-base').trim()) || 0.3;
      const ease = 'power3.out';

      const ctx = gsap.context(() => {
        // 1. Hero entrance — transform only, NO opacity in from()
        if (heroHeadlineRef.current) {
          gsap.fromTo(
            heroHeadlineRef.current,
            { y: 40 },
            { y: 0, duration: durationBase * 2.5, ease, delay: 0.1 }
          );
        }
        if (heroSubRef.current) {
          gsap.fromTo(
            heroSubRef.current,
            { y: 30 },
            { y: 0, duration: durationBase * 2, ease, delay: 0.22 }
          );
        }
        if (heroCtaRef.current) {
          gsap.fromTo(
            heroCtaRef.current,
            { y: 30 },
            { y: 0, duration: durationBase * 2, ease, delay: 0.34 }
          );
        }

        // 2. Infrastructure cards: stagger y:50
        if (infraCardsRef.current) {
          const cards = infraCardsRef.current.querySelectorAll('[data-infra-card]');
          gsap.fromTo(
            cards,
            { y: 50 },
            {
              y: 0,
              duration: durationBase * 2.2,
              ease,
              stagger: 0.12,
              scrollTrigger: {
                trigger: infraCardsRef.current,
                start: 'top 80%',
              },
            }
          );
        }

        // 3. Ecosystem columns: stagger y:40
        if (ecosystemColsRef.current) {
          const cols = ecosystemColsRef.current.querySelectorAll('[data-eco-col]');
          gsap.fromTo(
            cols,
            { y: 40 },
            {
              y: 0,
              duration: durationBase * 2,
              ease,
              stagger: 0.14,
              scrollTrigger: {
                trigger: ecosystemColsRef.current,
                start: 'top 80%',
              },
            }
          );
        }

        // 4. GritMe auditable mockup: x:60 slide from right
        if (gritmeImageRef.current) {
          gsap.fromTo(
            gritmeImageRef.current,
            { x: 60 },
            {
              x: 0,
              duration: durationBase * 2.5,
              ease,
              scrollTrigger: {
                trigger: gritmeImageRef.current,
                start: 'top 75%',
              },
            }
          );
        }

        // 4b. GritMe incubation image: x:60 slide from right
        if (incubationImageRef.current) {
          gsap.fromTo(
            incubationImageRef.current,
            { x: 60 },
            {
              x: 0,
              duration: durationBase * 2.5,
              ease,
              scrollTrigger: {
                trigger: incubationImageRef.current,
                start: 'top 75%',
              },
            }
          );
        }

        // 5. Expanding ecosystem: clip-path wipe
        if (expandingColsRef.current) {
          const expandCols = expandingColsRef.current.querySelectorAll('[data-expand-col]');
          gsap.fromTo(
            expandCols,
            { clipPath: 'inset(0 100% 0 0)' },
            {
              clipPath: 'inset(0 0% 0 0)',
              duration: durationBase * 3,
              ease: 'power2.out',
              stagger: 0.2,
              scrollTrigger: {
                trigger: expandingColsRef.current,
                start: 'top 78%',
              },
            }
          );
        }

        // 7. CTA banner heading: y:30
        if (ctaBannerHeadRef.current) {
          gsap.fromTo(
            ctaBannerHeadRef.current,
            { y: 30 },
            {
              y: 0,
              duration: durationBase * 2,
              ease,
              scrollTrigger: {
                trigger: ctaBannerHeadRef.current,
                start: 'top 85%',
              },
            }
          );
        }
      });

      return () => ctx.revert();
    };

    const cleanup = initGsap();
    return () => {
      cleanup.then((fn) => fn && fn());
    };
  }, []);

  return (
    <>
      <Head>
        <title>Griting — Talent Trust and Readiness Infrastructure for the AI Capital</title>
        <meta
          name="description"
          content="We build products, foster community, and create opportunities that help you learn, grow, and make an impact."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Nav theme="dark" activePath="/" />

      <main style={{ fontFamily: 'var(--font-body)' }}>

        {/* ═══ SECTION 1 — HERO ═══════════════════════════════════════════════ */}
        <section
          id="hero"
          style={{
            position: 'relative',
            minHeight: '100vh',
            backgroundColor: 'var(--color-bg-hero)',
            display: 'flex',
            alignItems: 'flex-end',
            overflow: 'hidden',
            paddingTop: '72px',
          }}
        >
          {/* Video background */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <FallbackVideo
              src="/assets/hero-bg.mp4"
              name="Hero terrain grid"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.45,
              }}
              fallbackClassName="terrain-grid-bg"
            />
            {/* Green-tinted overlay — rgba only */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, rgba(0,54,32,0.92) 0%, rgba(0,54,32,0.4) 60%, rgba(0,54,32,0.15) 100%)',
              }}
            />
          </div>

          {/* Bottom-left text anchor — editorial print style */}
          <div
            className="section-inner"
            style={{
              position: 'relative',
              zIndex: 1,
              width: '100%',
              paddingBottom: 'clamp(64px, 8vw, 120px)',
              paddingTop: '80px',
            }}
          >
            <div style={{ maxWidth: '860px' }}>
              <h1
                ref={heroHeadlineRef}
                className="text-gradient-white"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--font-size-display)',
                  lineHeight: 'var(--line-height-display)',
                  letterSpacing: 'var(--tracking-display)',
                  fontWeight: 700,
                  marginBottom: 'clamp(20px, 2.5vw, 36px)',
                }}
              >
                Talent Trust and Readiness Infrastructure for the AI Capital
              </h1>

              <p
                ref={heroSubRef}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-section-body)',
                  lineHeight: 'var(--line-height-section-body)',
                  letterSpacing: 'var(--tracking-section-body)',
                  color: 'rgba(255,255,255,0.75)',
                  maxWidth: '580px',
                  marginBottom: 'clamp(32px, 4vw, 52px)',
                }}
              >
                We build products, foster community, and create opportunities that help you learn, grow, and make an impact.
              </p>

              <div
                ref={heroCtaRef}
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '12px',
                  alignItems: 'center',
                }}
              >
                <button className="btn-primary" style={{ padding: '18px 28px' }}>
                  Get in Touch
                </button>
                <button className="btn-outline" style={{ padding: '18px 28px' }}>
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ SECTION 2 — NEW INFRASTRUCTURE ════════════════════════════════ */}
        <section
          id="new-infrastructure"
          style={{
            backgroundColor: 'var(--color-section-bg-light)',
            padding: 'clamp(64px, 8vw, 120px) 0',
          }}
        >
          <div className="section-inner">
            <div style={{ maxWidth: '680px', marginBottom: 'clamp(40px, 5vw, 72px)' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--font-size-section-heading)',
                  lineHeight: 'var(--line-height-section-heading)',
                  letterSpacing: 'var(--tracking-section-heading)',
                  fontWeight: 700,
                  color: 'var(--color-text-heading)',
                  marginBottom: '20px',
                }}
              >
                A New Infrastructure for the AI Talent Era
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-section-body)',
                  lineHeight: 'var(--line-height-section-body)',
                  letterSpacing: 'var(--tracking-section-body)',
                  color: 'var(--color-text-body)',
                }}
              >
                AI is transforming work into workflows. Organizations need a new way to verify capability, develop talent, and build trusted human capital systems.
              </p>
            </div>

            <div
              ref={infraCardsRef}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '20px',
              }}
            >
              {INFRASTRUCTURE_CARDS.map((card, i) => (
                <div
                  key={i}
                  data-infra-card
                  style={{
                    background: 'var(--color-surface-dark)',
                    borderLeft: '3px solid var(--color-brand-primary)',
                    borderRadius: 'var(--opux-card-radius)',
                    padding: '32px 28px',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(18px, 1.8vw, 24px)',
                      fontWeight: 700,
                      letterSpacing: 'var(--tracking-card-heading)',
                      color: 'var(--color-text-on-dark)',
                      marginBottom: '14px',
                      lineHeight: 1.25,
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'clamp(14px, 1.1vw, 16px)',
                      lineHeight: 1.65,
                      color: 'var(--color-text-body-dark)',
                    }}
                  >
                    {card.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ SECTION 3 — ECOSYSTEM OVERVIEW ════════════════════════════════ */}
        <section
          id="ecosystem-overview"
          style={{
            background:
              'linear-gradient(160deg, var(--color-bg-hero) 0%, var(--color-surface-dark-deep) 50%, var(--color-bg-hero) 100%)',
            padding: 'clamp(64px, 8vw, 120px) 0',
          }}
        >
          <div className="section-inner">
            <div
              style={{
                textAlign: 'center',
                maxWidth: '700px',
                margin: '0 auto',
                marginBottom: 'clamp(48px, 5.5vw, 80px)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-eyebrow)',
                  letterSpacing: 'var(--tracking-eyebrow)',
                  textTransform: 'uppercase',
                  color: 'var(--color-brand-primary)',
                  marginBottom: '16px',
                  fontWeight: 600,
                }}
              >
                Platform
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--font-size-section-heading)',
                  lineHeight: 'var(--line-height-section-heading)',
                  letterSpacing: 'var(--tracking-section-heading)',
                  fontWeight: 700,
                  color: 'var(--color-text-on-dark)',
                  marginBottom: '20px',
                }}
              >
                Explore the Griting Ecosystem
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-section-body)',
                  lineHeight: 'var(--line-height-section-body)',
                  color: 'rgba(255,255,255,0.65)',
                }}
              >
                A platform designed to verify capability, develop talent, and connect the AI ecosystem across enterprise, research, and mentorship.
              </p>
            </div>

            <div
              ref={ecosystemColsRef}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px',
              }}
              className="ecosystem-grid"
            >
              {ECOSYSTEM_CARDS.map((card, i) => (
                <div
                  key={i}
                  data-eco-col
                  style={{
                    background: 'var(--color-surface-dark)',
                    border: '1px solid var(--color-card-border-dark)',
                    borderRadius: 'var(--opux-card-radius)',
                    padding: 'var(--opux-card-padding-top) var(--opux-card-padding-inline) var(--opux-card-padding-bottom)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--font-size-eyebrow)',
                      letterSpacing: 'var(--tracking-eyebrow)',
                      textTransform: 'uppercase',
                      color: 'var(--color-brand-primary)',
                      fontWeight: 600,
                    }}
                  >
                    {card.audience}
                  </span>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'clamp(15px, 1.2vw, 17px)',
                      lineHeight: 1.6,
                      color: 'var(--color-text-body-dark)',
                      flexGrow: 1,
                    }}
                  >
                    {card.body}
                  </p>
                  <button
                    className="btn-outline"
                    style={{ alignSelf: 'flex-start', padding: '12px 20px', fontSize: '15px' }}
                  >
                    {card.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* ═══ SECTION 4 — GRITME: AUDITABLE TALENT SYSTEM ═══════════════════ */}
        <section
          id="gritme-auditable-talent"
          style={{
            backgroundColor: 'var(--color-surface-dark-deep)',
            padding: 'clamp(64px, 8vw, 120px) 0',
            overflow: 'hidden',
          }}
        >
          <div className="section-inner">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'clamp(40px, 5vw, 80px)',
                alignItems: 'start',
              }}
              className="gritme-auditable-grid"
            >
              {/* Left — text + tabs */}
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-eyebrow)',
                    letterSpacing: 'var(--tracking-eyebrow)',
                    textTransform: 'uppercase',
                    color: 'var(--color-brand-primary)',
                    fontWeight: 600,
                    marginBottom: '16px',
                  }}
                >
                  GritMe
                </p>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--font-size-section-heading)',
                    lineHeight: 'var(--line-height-section-heading)',
                    letterSpacing: 'var(--tracking-section-heading)',
                    fontWeight: 700,
                    color: 'var(--color-text-on-dark)',
                    marginBottom: '20px',
                  }}
                >
                  GritMe: Auditable Talent System
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-section-body)',
                    lineHeight: 'var(--line-height-section-body)',
                    color: 'rgba(255,255,255,0.65)',
                    marginBottom: '40px',
                  }}
                >
                  An enterprise evidence-based talent evaluation system that provides structured assessments with traceable reasoning and auditable records.
                </p>

                {/* Tab buttons */}
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '36px' }}
                >
                  {GRITME_TABS.map((tab, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTab(i)}
                      style={{
                        background:
                          activeTab === i ? 'rgba(0,105,62,0.18)' : 'transparent',
                        border:
                          activeTab === i
                            ? '1px solid var(--color-brand-primary)'
                            : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '10px',
                        padding: '16px 20px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        color:
                          activeTab === i
                            ? 'var(--color-text-on-dark)'
                            : 'rgba(255,255,255,0.5)',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'clamp(14px, 1.2vw, 17px)',
                        fontWeight: activeTab === i ? 600 : 400,
                        letterSpacing: '-0.2px',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Feature card */}
                <div
                  style={{
                    background: 'rgba(0,105,62,0.1)',
                    border: '1px solid rgba(0,105,62,0.3)',
                    borderRadius: '12px',
                    padding: '24px',
                    marginBottom: '32px',
                  }}
                >
                  <h4
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(16px, 1.4vw, 20px)',
                      fontWeight: 700,
                      color: 'var(--color-text-on-dark)',
                      marginBottom: '10px',
                    }}
                  >
                    Evidence-Based Talent Evaluation
                  </h4>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '15px',
                      color: 'rgba(255,255,255,0.6)',
                      lineHeight: 1.6,
                      marginBottom: '16px',
                    }}
                  >
                    Access skills with observable evidence to produce auditable reports.
                  </p>
                  <button className="btn-primary" style={{ padding: '12px 20px', fontSize: '15px' }}>
                    Book Demo
                  </button>
                </div>

                <button className="btn-outline" style={{ padding: '16px 28px' }}>
                  Get in Touch
                </button>
              </div>

              {/* Right — tab panel image */}
              <div ref={gritmeImageRef}>
                <div
                  style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid var(--color-card-border-dark)',
                    background: 'var(--color-surface-dark)',
                    aspectRatio: '4/3',
                    display: 'flex',
                  }}
                >
                  <FallbackImage
                    key={activeTab}
                    src={GRITME_TABS[activeTab].img}
                    alt={GRITME_TABS[activeTab].label}
                    name={GRITME_TABS[activeTab].label}
                    dark
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* ═══ SECTION 5 — GRITME: AI INCUBATION SYSTEM ══════════════════════ */}
        <section
          id="gritme-incubation"
          style={{
            backgroundColor: 'var(--color-section-bg-light)',
            padding: 'clamp(64px, 8vw, 120px) 0',
            overflow: 'hidden',
          }}
        >
          <div className="section-inner">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'clamp(40px, 5vw, 80px)',
                alignItems: 'start',
              }}
              className="incubation-grid"
            >
              {/* Left */}
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-eyebrow)',
                    letterSpacing: 'var(--tracking-eyebrow)',
                    textTransform: 'uppercase',
                    color: 'var(--color-brand-primary)',
                    fontWeight: 600,
                    marginBottom: '16px',
                  }}
                >
                  GritMe
                </p>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--font-size-section-heading)',
                    lineHeight: 'var(--line-height-section-heading)',
                    letterSpacing: 'var(--tracking-section-heading)',
                    fontWeight: 700,
                    color: 'var(--color-text-heading)',
                    marginBottom: '20px',
                  }}
                >
                  GritMe: AI Incubation System
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-section-body)',
                    lineHeight: 'var(--line-height-section-body)',
                    color: 'var(--color-text-body)',
                    marginBottom: '40px',
                  }}
                >
                  An enterprise platform designed to develop talent through structured learning, real-world projects, and guided capability building.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '36px' }}>
                  {INCUBATION_FEATURES.map((feat, i) => (
                    <div
                      key={i}
                      style={{
                        paddingLeft: '20px',
                        borderLeft: '2px solid var(--color-brand-primary)',
                      }}
                    >
                      <h4
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(16px, 1.3vw, 19px)',
                          fontWeight: 700,
                          color: 'var(--color-text-heading)',
                          marginBottom: '8px',
                        }}
                      >
                        {feat.title}
                      </h4>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'clamp(14px, 1.1vw, 16px)',
                          color: 'var(--color-text-body)',
                          lineHeight: 1.65,
                        }}
                      >
                        {feat.body}
                      </p>
                      {feat.cta && (
                        <button
                          className="btn-outline"
                          style={{ alignSelf: 'flex-start', padding: '12px 20px', fontSize: '15px', marginTop: '10px' }}
                        >
                          {feat.cta}
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button className="btn-primary" style={{ padding: '16px 28px' }}>
                    Get in Touch
                  </button>
                  <button className="btn-outline-dark" style={{ padding: '16px 28px' }}>
                    Book Demo
                  </button>
                </div>
              </div>

              {/* Right — image */}
              <div
                ref={incubationImageRef}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid var(--color-card-border)',
                  background: '#f0f0f0',
                  aspectRatio: '4/3',
                  display: 'flex',
                }}
              >
                <FallbackImage
                  src="/assets/gritme-skill-graph.jpeg"
                  alt="GritMe Skill Graph"
                  name="GritMe Skill Graph"
                  dark={false}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          </div>

        </section>

        {/* ═══ SECTION 6 — GRITME: GLOBAL GROWTH MENTORSHIP ══════════════════ */}
        <section
          id="gritme-mentorship"
          style={{
            background: 'linear-gradient(180deg, var(--color-surface-dark) 0%, var(--color-bg-hero) 100%)',
            padding: 'clamp(64px, 8vw, 120px) 0',
            overflow: 'hidden',
          }}
        >
          <div className="section-inner">
            {/* Header row */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '32px',
                marginBottom: 'clamp(48px, 5.5vw, 80px)',
              }}
            >
              <div style={{ maxWidth: '600px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    background: 'rgba(0,105,62,0.2)',
                    border: '1px solid var(--color-brand-primary)',
                    borderRadius: '100px',
                    padding: '5px 14px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    color: 'var(--color-brand-primary)',
                    marginBottom: '20px',
                  }}
                >
                  Coming Soon
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--font-size-section-heading)',
                    lineHeight: 'var(--line-height-section-heading)',
                    letterSpacing: 'var(--tracking-section-heading)',
                    fontWeight: 700,
                    color: 'var(--color-text-on-dark)',
                    marginBottom: '20px',
                  }}
                >
                  GritMe: Global Growth Mentorship with Physical AI
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-section-body)',
                    lineHeight: 'var(--line-height-section-body)',
                    color: 'rgba(255,255,255,0.65)',
                  }}
                >
                  A mentorship-driven platform powered by a global mentor network and Physical AI to support talent growth.
                </p>
              </div>
              <button className="btn-primary" style={{ padding: '16px 28px', flexShrink: 0 }}>
                Try It Now
              </button>
            </div>

            {/* 4 pillars — horizontal step flow */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '2px',
                marginBottom: 'clamp(40px, 5vw, 64px)',
              }}
              className="pillars-grid"
            >
              {MENTORSHIP_PILLARS.map((pillar, i) => (
                <div
                  key={i}
                  style={{
                    background: 'var(--color-surface-dark)',
                    border: '1px solid var(--color-card-border-dark)',
                    borderRadius:
                      i === 0
                        ? '16px 0 0 16px'
                        : i === MENTORSHIP_PILLARS.length - 1
                        ? '0 16px 16px 0'
                        : '0',
                    padding: '32px 24px',
                    position: 'relative',
                  }}
                >
                  {i < MENTORSHIP_PILLARS.length - 1 && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '36px',
                        right: '-14px',
                        width: '28px',
                        height: '2px',
                        background: 'var(--color-brand-primary)',
                        zIndex: 1,
                      }}
                    />
                  )}
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'var(--color-brand-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#fff',
                      marginBottom: '16px',
                    }}
                  >
                    {i + 1}
                  </div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '20px',
                      fontWeight: 700,
                      color: 'var(--color-text-on-dark)',
                      marginBottom: '10px',
                    }}
                  >
                    {pillar.step}
                  </h4>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      lineHeight: 1.65,
                      color: 'var(--color-text-body-dark)',
                    }}
                  >
                    {pillar.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Mentorship image */}
            <div
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid var(--color-card-border-dark)',
                background: 'var(--color-surface-dark)',
                maxHeight: '420px',
                display: 'flex',
              }}
            >
              <FallbackImage
                src="/assets/gritme-mentorship.jpeg"
                alt="GritMe Global Growth Mentorship"
                name="GritMe Mentorship"
                dark
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '420px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
          </div>

        </section>

        {/* ═══ SECTION 7 — EXPANDING THE ECOSYSTEM ════════════════════════════ */}
        <section
          id="expanding-ecosystem"
          style={{
            backgroundColor: 'var(--color-surface-dark-deep)',
            padding: 'clamp(64px, 8vw, 120px) 0',
            overflow: 'hidden',
          }}
        >
          <div className="section-inner">
            <div
              style={{
                textAlign: 'center',
                maxWidth: '680px',
                margin: '0 auto',
                marginBottom: 'clamp(48px, 5.5vw, 80px)',
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--font-size-section-heading)',
                  lineHeight: 'var(--line-height-section-heading)',
                  letterSpacing: 'var(--tracking-section-heading)',
                  fontWeight: 700,
                  color: 'var(--color-text-on-dark)',
                  marginBottom: '20px',
                }}
              >
                Expanding the Ecosystem
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-section-body)',
                  lineHeight: 'var(--line-height-section-body)',
                  color: 'rgba(255,255,255,0.6)',
                }}
              >
                Research infrastructure and AI knowledge networks powering the next layer of the Griting platform.
              </p>
            </div>

            {/* Two columns + brand-green vertical rule */}
            <div
              ref={expandingColsRef}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 2px 1fr',
                gap: '0 40px',
                alignItems: 'stretch',
              }}
              className="expanding-grid"
            >
              <div
                data-expand-col
                style={{
                  background: 'var(--color-surface-dark)',
                  border: '1px solid var(--color-card-border-dark)',
                  borderRadius: 'var(--opux-card-radius)',
                  padding: '48px 40px',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-eyebrow)',
                    letterSpacing: 'var(--tracking-eyebrow)',
                    textTransform: 'uppercase',
                    color: 'var(--color-brand-primary)',
                    fontWeight: 600,
                    marginBottom: '16px',
                  }}
                >
                  GritLab
                </p>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(22px, 2vw, 30px)',
                    fontWeight: 700,
                    color: 'var(--color-text-on-dark)',
                    marginBottom: '16px',
                    lineHeight: 1.25,
                  }}
                >
                  GritLab: Research Lab and IP Engine
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(14px, 1.1vw, 16px)',
                    color: 'var(--color-text-body-dark)',
                    lineHeight: 1.65,
                    marginBottom: '32px',
                  }}
                >
                  An invite-only AI community in Silicon Valley that brings together top talents across research, engineering, and startups
                </p>
                <button className="btn-outline" style={{ padding: '14px 22px', fontSize: '15px' }}>
                  Join The waitlist
                </button>
              </div>

              {/* Vertical rule */}
              <div
                style={{
                  background: 'var(--color-brand-primary)',
                  borderRadius: '2px',
                  minHeight: '100%',
                  alignSelf: 'stretch',
                }}
              />

              <div
                data-expand-col
                style={{
                  background: 'var(--color-surface-dark)',
                  border: '1px solid var(--color-card-border-dark)',
                  borderRadius: 'var(--opux-card-radius)',
                  padding: '48px 40px',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-eyebrow)',
                    letterSpacing: 'var(--tracking-eyebrow)',
                    textTransform: 'uppercase',
                    color: 'var(--color-brand-primary)',
                    fontWeight: 600,
                    marginBottom: '16px',
                  }}
                >
                  GritHub
                </p>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(22px, 2vw, 30px)',
                    fontWeight: 700,
                    color: 'var(--color-text-on-dark)',
                    marginBottom: '16px',
                    lineHeight: 1.25,
                  }}
                >
                  GritHub: AI Knowledge & Signal Platform
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(14px, 1.1vw, 16px)',
                    color: 'var(--color-text-body-dark)',
                    lineHeight: 1.65,
                    marginBottom: '32px',
                  }}
                >
                  An invite-only AI community in Silicon Valley that brings together top talents across research, engineering, and startups
                </p>
                <button className="btn-outline" style={{ padding: '14px 22px', fontSize: '15px' }}>
                  Join The waitlist
                </button>
              </div>
            </div>
          </div>

        </section>

        {/* ═══ SECTION 8 — TESTIMONIALS (CSS marquee, no GSAP) ════════════════ */}
        <section
          id="testimonials"
          style={{
            backgroundColor: '#0a0f0d',
            padding: 'clamp(64px, 8vw, 120px) 0',
            overflow: 'hidden',
          }}
        >
          <div className="section-inner" style={{ marginBottom: 'clamp(40px, 5vw, 64px)' }}>
            <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-eyebrow)',
                  letterSpacing: 'var(--tracking-eyebrow)',
                  textTransform: 'uppercase',
                  color: 'var(--color-brand-primary)',
                  fontWeight: 600,
                  marginBottom: '16px',
                }}
              >
                Testimonials
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--font-size-section-heading)',
                  lineHeight: 'var(--line-height-section-heading)',
                  letterSpacing: 'var(--tracking-section-heading)',
                  fontWeight: 700,
                  color: 'var(--color-text-on-dark)',
                  marginBottom: '16px',
                }}
              >
                Words from those who trust us
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-section-body)',
                  lineHeight: 'var(--line-height-section-body)',
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                Trusted voices sharing their experiences with our platform and organization.
              </p>
            </div>
          </div>

          {/* Row 1 — scrolls left */}
          <div className="marquee-track" style={{ overflow: 'hidden', marginBottom: '16px' }}>
            <div
              className="marquee-left"
              style={{ display: 'flex', gap: '16px', width: 'max-content' }}
            >
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <TestimonialCardComponent key={`r1-${i}`} author={t.author} quote={t.quote} />
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls right (reversed) */}
          <div className="marquee-track" style={{ overflow: 'hidden' }}>
            <div
              className="marquee-right"
              style={{ display: 'flex', gap: '16px', width: 'max-content' }}
            >
              {[...[...TESTIMONIALS].reverse(), ...[...TESTIMONIALS].reverse()].map((t, i) => (
                <TestimonialCardComponent key={`r2-${i}`} author={t.author} quote={t.quote} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══ SECTION 9 — CTA BANNER ══════════════════════════════════════════ */}
        <section
          id="cta-banner"
          style={{
            background:
              'linear-gradient(135deg, var(--color-bg-hero) 0%, var(--color-brand-primary) 100%)',
            padding: 'clamp(72px, 9vw, 128px) 0',
            overflow: 'hidden',
          }}
        >
          <div className="section-inner" style={{ textAlign: 'center' }}>
            <h2
              ref={ctaBannerHeadRef}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--font-size-section-heading)',
                lineHeight: 'var(--line-height-section-heading)',
                letterSpacing: 'var(--tracking-section-heading)',
                fontWeight: 700,
                color: 'var(--color-text-on-dark)',
                maxWidth: '700px',
                margin: '0 auto',
                marginBottom: '40px',
              }}
            >
              Ready to build connections that shape your future?
            </h2>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '14px',
              }}
            >
              <button className="btn-primary" style={{ padding: '18px 32px' }}>
                Explore GritMe
              </button>
              <button
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.4)',
                  borderRadius: 'var(--btn-border-radius)',
                  color: '#ffffff',
                  fontFamily: 'var(--font-body)',
                  fontSize: '17px',
                  fontWeight: 500,
                  padding: '18px 32px',
                  cursor: 'pointer',
                  transition: 'background var(--duration-fast) var(--ease-primary)',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.14)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                }}
              >
                Contact Us
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ═══ FOOTER ═══════════════════════════════════════════════════════════ */}
      <footer
        id="site-footer"
        style={{
          backgroundColor: '#001a0f',
          padding:
            'var(--opux-footer-padding-top) var(--opux-footer-padding-inline) var(--opux-footer-padding-bottom)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Footer terrain video at 30% opacity */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
            opacity: 0.3,
          }}
        >
          <FallbackVideo
            src="/assets/footer-terrain.mp4"
            name="Footer terrain texture"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            fallbackClassName="terrain-grid-bg"
          />
        </div>

        <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr 1.5fr',
              gap: '40px',
              marginBottom: '48px',
            }}
            className="footer-grid"
          >
            {/* Col 1 — Logo + tagline */}
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
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#00693e',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '16px',
                    flexShrink: 0,
                  }}
                >
                  G
                </span>
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: '28px',
                    letterSpacing: '-1.61px',
                    color: '#ffffff',
                    lineHeight: 1,
                  }}
                >
                  riting
                </span>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: 'rgba(255,255,255,0.45)',
                  maxWidth: '240px',
                }}
              >
                Talent trust and readiness infrastructure for the AI capital.
              </p>
            </div>

            {/* Col 2 — Product */}
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.35)',
                  marginBottom: '16px',
                }}
              >
                Product
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['Product', 'About', 'Partners', 'Blog'].map((label) => (
                  <a
                    key={label}
                    href={`/${label.toLowerCase()}`}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.55)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.color = '#fff'; }}
                    onMouseOut={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Col 3 — Company */}
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.35)',
                  marginBottom: '16px',
                }}
              >
                Company
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['Contact', 'About'].map((label) => (
                  <a
                    key={label}
                    href={`/${label.toLowerCase()}`}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.55)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.color = '#fff'; }}
                    onMouseOut={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Col 4 — Social */}
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.35)',
                  marginBottom: '16px',
                }}
              >
                Social
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { label: 'LinkedIn', href: 'https://linkedin.com' },
                  { label: 'Twitter / X', href: 'https://twitter.com' },
                  { label: 'GitHub', href: 'https://github.com' },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.55)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.color = '#fff'; }}
                    onMouseOut={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Col 5 — Stay Updated */}
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.35)',
                  marginBottom: '16px',
                }}
              >
                Stay Updated
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.5,
                  marginBottom: '14px',
                }}
              >
                Join our community and stay ahead of the AI talent revolution.
              </p>
              <button
                className="btn-primary"
                style={{ padding: '12px 18px', fontSize: '14px', width: '100%' }}
              >
                Join Waitlist
              </button>
            </div>
          </div>

          {/* Copyright bar */}
          <div
            style={{
              borderTop: '1px solid rgba(255,255,255,0.08)',
              paddingTop: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.3)',
              }}
            >
              &copy; 2025 Griting. All rights reserved.
            </span>
            <div style={{ display: 'flex', gap: '20px' }}>
              {['Privacy Policy', 'Terms of Service'].map((label) => (
                <a
                  key={label}
                  href="#"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.3)',
                    textDecoration: 'none',
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

      </footer>
    </>
  );
}
