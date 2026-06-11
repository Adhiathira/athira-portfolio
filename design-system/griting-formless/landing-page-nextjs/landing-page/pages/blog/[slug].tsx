import Head from 'next/head';
import Link from 'next/link';
import Nav from '@/components/Nav/Nav';

interface BlogPostPageProps {
  slug: string;
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: 'the-first-agentic-career-mentorship-system' } }],
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  return { props: { slug: params.slug } };
}

export default function BlogPostPage({ slug: _slug }: BlogPostPageProps) {
  return (
    <>
      <Head>
        <title>The First Agentic Career Mentorship System from Silicon Valley — Griting</title>
        <meta
          name="description"
          content="Every idea begins with a spark, a question that refuses to fade. That's why we built Griting, the first Agentic Career Mentorship Platform born in Silicon Valley."
        />
      </Head>

      <div style={{ background: '#ffffff', minHeight: '100vh' }}>
        <Nav theme="light" activePath="/blog" />

        {/* ── 1. Blog Post Header ── */}
        <section
          id="blog-post-header"
          style={{
            paddingTop: '72px',
            paddingBottom: '48px',
            paddingInline: 'var(--grid-gutter)',
            background: '#ffffff',
          }}
        >
          <div style={{ maxWidth: 'var(--grid-max-width)', margin: '0 auto' }}>
            {/* Inner constrained content column */}
            <div style={{ maxWidth: '780px', margin: '0 auto' }}>

              {/* Back link */}
              <div style={{ marginBottom: '32px', marginTop: '32px' }}>
                <Link
                  href="/blog"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--font-size-meta)',
                    fontWeight: 500,
                    color: 'var(--color-text-body)',
                    textDecoration: 'none',
                    letterSpacing: 'var(--tracking-meta)',
                    opacity: 1,
                    transition: 'opacity var(--duration-base) var(--ease-primary)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                  className="nav-link-fade"
                >
                  ← All Post
                </Link>
              </div>

              {/* Category pill */}
              <div style={{ marginBottom: '20px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    fontWeight: 500,
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-body)',
                    border: '1px solid var(--color-filter-pill-border)',
                    borderRadius: '9999px',
                    padding: '4px 14px',
                  }}
                >
                  Mentorship
                </span>
              </div>

              {/* Main headline */}
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                  fontWeight: 500,
                  lineHeight: 1.13,
                  letterSpacing: '-1.2px',
                  color: 'var(--color-text-heading)',
                  marginBottom: '36px',
                }}
              >
                The First Agentic Career Mentorship System from Silicon Valley.
              </h1>

              {/* Meta row + share row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '20px',
                  paddingBottom: '32px',
                  borderBottom: '1px solid var(--color-divider)',
                }}
              >
                {/* Left: author + date + read time */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  {/* Avatar */}
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--color-avatar-gradient-start), var(--color-avatar-gradient-end))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#ffffff',
                        letterSpacing: '0.5px',
                      }}
                    >
                      JZ
                    </span>
                  </div>

                  {/* Author info + meta */}
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--font-size-meta)',
                        fontWeight: 600,
                        color: 'var(--color-text-heading)',
                        letterSpacing: 'var(--tracking-meta)',
                        lineHeight: 1.4,
                      }}
                    >
                      Jie Zhang
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '12px',
                        color: 'var(--color-text-meta)',
                        letterSpacing: 'var(--tracking-meta)',
                        lineHeight: 1.4,
                      }}
                    >
                      CEO / Founder
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginTop: '4px',
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
                        16 October 2025
                      </span>
                      <span
                        aria-hidden="true"
                        style={{ color: 'var(--color-divider)', fontSize: '12px' }}
                      >
                        ·
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '12px',
                          color: 'var(--color-text-date)',
                          letterSpacing: 'var(--tracking-meta)',
                        }}
                      >
                        3 minute read
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: share row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                      color: 'var(--color-text-meta)',
                      letterSpacing: 'var(--tracking-meta)',
                      marginRight: '4px',
                    }}
                  >
                    Share this article
                  </span>

                  {/* Twitter/X */}
                  <button
                    aria-label="Share on X (Twitter)"
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      background: 'var(--color-share-btn-bg)',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background var(--duration-fast) var(--ease-primary)',
                    }}
                    onClick={() =>
                      window.open(
                        'https://twitter.com/intent/tweet?text=The%20First%20Agentic%20Career%20Mentorship%20System%20from%20Silicon%20Valley%20—%20@griting_ai',
                        '_blank',
                      )
                    }
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z"
                        fill="var(--color-text-body)"
                      />
                    </svg>
                  </button>

                  {/* LinkedIn */}
                  <button
                    aria-label="Share on LinkedIn"
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      background: 'var(--color-share-btn-bg)',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background var(--duration-fast) var(--ease-primary)',
                    }}
                    onClick={() =>
                      window.open(
                        'https://www.linkedin.com/sharing/share-offsite/?url=' +
                          encodeURIComponent(
                            'https://griting.ai/blog/the-first-agentic-career-mentorship-system',
                          ),
                        '_blank',
                      )
                    }
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                        fill="var(--color-text-body)"
                      />
                    </svg>
                  </button>

                  {/* Copy link */}
                  <button
                    aria-label="Copy link to article"
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      background: 'var(--color-share-btn-bg)',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background var(--duration-fast) var(--ease-primary)',
                    }}
                    onClick={() => {
                      navigator.clipboard.writeText(
                        'https://griting.ai/blog/the-first-agentic-career-mentorship-system',
                      );
                    }}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"
                        stroke="var(--color-text-body)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"
                        stroke="var(--color-text-body)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. Blog Post Article Image ── */}
        <section
          id="blog-post-article-image"
          style={{
            paddingBlock: '48px',
            paddingInline: 'var(--grid-gutter)',
            background: '#ffffff',
          }}
        >
          <div className="site-container" style={{ maxWidth: 'var(--grid-max-width)', margin: '0 auto' }}>
            {/* Dark-framed decorative panel */}
            <div
              style={{
                background: '#18181b',
                border: '1px solid #27272a',
                borderRadius: '14px',
                height: '500px',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Ambient glow layer */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,105,62,0.28) 0%, rgba(0,41,24,0.18) 55%, transparent 100%)',
                  pointerEvents: 'none',
                }}
              />

              {/* SVG Network / Node Visualization */}
              <svg
                aria-hidden="true"
                viewBox="0 0 900 500"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  opacity: 0.55,
                }}
              >
                {/* Connection lines */}
                <line x1="450" y1="250" x2="200" y2="140" stroke="#00693e" strokeWidth="1" strokeOpacity="0.5" />
                <line x1="450" y1="250" x2="700" y2="140" stroke="#00693e" strokeWidth="1" strokeOpacity="0.5" />
                <line x1="450" y1="250" x2="150" y2="320" stroke="#00693e" strokeWidth="1" strokeOpacity="0.4" />
                <line x1="450" y1="250" x2="750" y2="330" stroke="#00693e" strokeWidth="1" strokeOpacity="0.4" />
                <line x1="450" y1="250" x2="380" y2="400" stroke="#00693e" strokeWidth="1" strokeOpacity="0.35" />
                <line x1="450" y1="250" x2="560" y2="390" stroke="#00693e" strokeWidth="1" strokeOpacity="0.35" />
                <line x1="200" y1="140" x2="100" y2="80" stroke="#00995e" strokeWidth="0.8" strokeOpacity="0.3" />
                <line x1="200" y1="140" x2="290" y2="70" stroke="#00995e" strokeWidth="0.8" strokeOpacity="0.3" />
                <line x1="700" y1="140" x2="800" y2="75" stroke="#00995e" strokeWidth="0.8" strokeOpacity="0.3" />
                <line x1="700" y1="140" x2="620" y2="65" stroke="#00995e" strokeWidth="0.8" strokeOpacity="0.3" />
                <line x1="150" y1="320" x2="60" y2="400" stroke="#00693e" strokeWidth="0.8" strokeOpacity="0.25" />
                <line x1="750" y1="330" x2="840" y2="420" stroke="#00693e" strokeWidth="0.8" strokeOpacity="0.25" />
                <line x1="380" y1="400" x2="300" y2="460" stroke="#00693e" strokeWidth="0.8" strokeOpacity="0.2" />
                <line x1="560" y1="390" x2="640" y2="455" stroke="#00693e" strokeWidth="0.8" strokeOpacity="0.2" />

                {/* Outer satellite nodes */}
                <circle cx="100" cy="80" r="5" fill="#00693e" opacity="0.5" />
                <circle cx="290" cy="70" r="5" fill="#00693e" opacity="0.5" />
                <circle cx="620" cy="65" r="5" fill="#00693e" opacity="0.5" />
                <circle cx="800" cy="75" r="5" fill="#00693e" opacity="0.5" />
                <circle cx="60" cy="400" r="5" fill="#00693e" opacity="0.4" />
                <circle cx="840" cy="420" r="5" fill="#00693e" opacity="0.4" />
                <circle cx="300" cy="460" r="5" fill="#00693e" opacity="0.35" />
                <circle cx="640" cy="455" r="5" fill="#00693e" opacity="0.35" />

                {/* Mid-tier nodes */}
                <circle cx="200" cy="140" r="9" fill="#00693e" opacity="0.65" />
                <circle cx="700" cy="140" r="9" fill="#00693e" opacity="0.65" />
                <circle cx="150" cy="320" r="8" fill="#00693e" opacity="0.55" />
                <circle cx="750" cy="330" r="8" fill="#00693e" opacity="0.55" />
                <circle cx="380" cy="400" r="7" fill="#00995e" opacity="0.5" />
                <circle cx="560" cy="390" r="7" fill="#00995e" opacity="0.5" />

                {/* Glow rings on center node */}
                <circle cx="450" cy="250" r="48" fill="none" stroke="#00693e" strokeWidth="1" opacity="0.15" />
                <circle cx="450" cy="250" r="30" fill="none" stroke="#00693e" strokeWidth="1.5" opacity="0.25" />
                {/* Center hub */}
                <circle cx="450" cy="250" r="16" fill="#00693e" opacity="0.85" />
                <circle cx="450" cy="250" r="10" fill="#00995e" opacity="1" />
              </svg>

              {/* Phone mockup — CSS-drawn, centered */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  width: '140px',
                  height: '280px',
                  background: '#0d1f17',
                  border: '2px solid rgba(0,105,62,0.6)',
                  borderRadius: '22px',
                  boxShadow:
                    '0 0 40px rgba(0,105,62,0.4), 0 0 80px rgba(0,105,62,0.15), inset 0 1px 0 rgba(0,105,62,0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  padding: '24px 16px',
                }}
              >
                {/* Phone top notch */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '40px',
                    height: '6px',
                    background: 'rgba(0,105,62,0.4)',
                    borderRadius: '3px',
                  }}
                />

                {/* App icon area */}
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    background: 'var(--color-brand-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '26px',
                      fontWeight: 700,
                      color: '#ffffff',
                      letterSpacing: '-1px',
                    }}
                  >
                    G
                  </span>
                </div>

                {/* App label */}
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--color-brand-primary)',
                    letterSpacing: '0.5px',
                    textAlign: 'center',
                  }}
                >
                  GritMe
                </div>

                {/* Simulated UI lines */}
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
                  {[80, 60, 70, 50].map((w, i) => (
                    <div
                      key={i}
                      style={{
                        height: '5px',
                        width: `${w}%`,
                        background: 'rgba(0,105,62,0.35)',
                        borderRadius: '3px',
                        margin: '0 auto',
                      }}
                    />
                  ))}
                </div>

                {/* Mentorship label chip */}
                <div
                  style={{
                    marginTop: '4px',
                    background: 'rgba(0,105,62,0.18)',
                    border: '1px solid rgba(0,105,62,0.4)',
                    borderRadius: '9999px',
                    padding: '3px 10px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '9px',
                      fontWeight: 500,
                      letterSpacing: '0.4px',
                      color: 'var(--color-brand-primary)',
                    }}
                  >
                    Mentorship
                  </span>
                </div>

                {/* Bottom home indicator */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '36px',
                    height: '4px',
                    background: 'rgba(0,105,62,0.4)',
                    borderRadius: '2px',
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. Blog Post Body ── */}
        <section
          id="blog-post-body"
          style={{
            paddingBlock: '64px',
            paddingInline: 'var(--grid-gutter)',
            background: '#ffffff',
          }}
        >
          <div
            style={{
              maxWidth: '680px',
              margin: '0 auto',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-body)',
              lineHeight: 'var(--line-height-body)',
              letterSpacing: 'var(--tracking-body)',
              color: 'var(--color-text-body)',
            }}
          >
            <p style={{ marginBottom: '24px' }}>
              Every idea begins with a spark, a question that refuses to fade.
            </p>
            <p style={{ marginBottom: '24px' }}>
              For us, it began when we stepped away from our comfort zones and realized how hard it is to find real guidance.
            </p>
            <p style={{ marginBottom: '24px' }}>
              The AI era is reshaping how we live, work, and grow.
            </p>
            <p style={{ marginBottom: '24px' }}>
              Skills expire faster, careers shift overnight, and for many, confidence has become fragile.
            </p>
            <p style={{ marginBottom: '24px' }}>
              But one truth remains, we all need human wisdom to guide us forward in our careers.
            </p>
            <p style={{ marginBottom: '24px' }}>
              We all crave guidance and clarity rooted in experience, empathy, and purpose.
            </p>
            <p style={{ marginBottom: '24px' }}>
              That&rsquo;s why we built Griting, the first Agentic Career Mentorship Platform born in Silicon Valley, powered by high-density human mentors in the AI era.
            </p>
            <p style={{ marginBottom: '24px' }}>
              A place where mentorship evolves into something more structured: a path, a graph, a network, a living ecosystem of growth that belongs to you.
            </p>
            <p style={{ marginBottom: '24px' }}>
              We believe career growth should never be lonely or confusing. In this new world, growth belongs to everyone.
            </p>
            <p>
              If you&rsquo;re curious to see what&rsquo;s next, visit{' '}
              <a
                href="https://griting.ai"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--color-brand-primary)',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                  transition: 'opacity var(--duration-base) var(--ease-primary)',
                }}
                className="nav-link-fade"
              >
                griting.ai
              </a>{' '}
              and join our waitlist. You&rsquo;ll be among the first to experience what&rsquo;s coming.
            </p>
          </div>
        </section>

        {/* ── 4. Blog Post CTA ── */}
        <section
          id="blog-post-cta"
          style={{
            background: 'var(--color-brand-primary)',
            paddingBlock: '120px',
            paddingInline: 'var(--grid-gutter)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle depth overlay */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(ellipse 80% 70% at 50% 60%, rgba(0,54,32,0.35) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2
              className="text-section-heading"
              style={{
                color: '#ffffff',
                maxWidth: '720px',
                margin: '0 auto 48px',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
                fontWeight: 500,
                lineHeight: 1.18,
                letterSpacing: '-1px',
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
              {/* Primary CTA */}
              <Link
                href="/#contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 28px',
                  background: '#ffffff',
                  color: 'var(--color-brand-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-btn-primary)',
                  fontWeight: 600,
                  letterSpacing: 'var(--tracking-btn)',
                  borderRadius: 'var(--btn-border-radius)',
                  border: '1px solid rgba(255,255,255,0.9)',
                  textDecoration: 'none',
                  transition: 'background var(--duration-fast) var(--ease-primary), color var(--duration-fast) var(--ease-primary)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
                }}
              >
                Explore GritMe
              </Link>

              {/* Secondary CTA */}
              <Link
                href="/#contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 28px',
                  background: 'rgba(255,255,255,0.08)',
                  color: '#ffffff',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-btn-secondary)',
                  fontWeight: 500,
                  letterSpacing: 'var(--tracking-btn)',
                  borderRadius: 'var(--btn-border-radius)',
                  border: '1px solid rgba(255,255,255,0.35)',
                  textDecoration: 'none',
                  transition: 'background var(--duration-base) var(--ease-primary)',
                }}
              >
                Contact Us
              </Link>
            </div>
          </div>
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
