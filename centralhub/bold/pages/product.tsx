import { Fragment, useEffect } from 'react';
import Head from 'next/head';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ProductHero from '@/components/product/ProductHero';
import FeatureDeepDive, { FeatureDeepDiveProps } from '@/components/product/FeatureDeepDive';
import OneSystem from '@/components/product/OneSystem';
import SquiggleDivider, { type SquiggleIntensity } from '@/components/common/SquiggleDivider';
import HumanInLoop from '@/components/product/HumanInLoop';
import ProductCta from '@/components/product/ProductCta';

// Section grounds, so a divider can be coloured with the ground it flows into.
const GROUND = { light: '#ffffff', panel: '#f0f0f4', dark: '#1b1b37' } as const;
const ddGround = (dd: FeatureDeepDiveProps) => (dd.surface ? GROUND.panel : GROUND.light);

// Rotate squiggle intensity between the feature rows so the page reads hand-composed.
const FDD_INTENSITY: SquiggleIntensity[] = ['medium', 'bold', 'gentle'];
const FDD_FLIP = [true, false, true];

/* ── Verbatim content (diplomatic-signup.json → slug "product") ── */
const HERO = {
  eyebrow: 'The platform',
  heading: 'Everything your business runs on, in one place',
  body: 'CentralHub brings CRM, customer data, marketing, telephony, and your website together as a single connected system, with AI woven through every layer.',
};

const DEEP_DIVES: FeatureDeepDiveProps[] = [
  {
    id: 'crm',
    heading: 'A CRM built around your business, not a template',
    body: "CentralHub's CRM is built on flexible primitives: people, companies, deals, activities, events, tasks. They adapt to how your business actually operates, with AI helping tailor objects and fields to your workflow.",
    items: ['AI-personalized objects & fields', 'Flexible across industries', 'Grows with your business'],
    media: {
      kind: 'image',
      src: '/assets/hero-dashboard.jpeg',
      alt: 'CentralHub CRM board showing people, companies and deals in a clean light interface',
    },
    flip: false,
    surface: true,
    mediaReveal: 'clip-right',
  },
  {
    id: 'ai-agent',
    heading: 'AI that works across your whole platform',
    body: "CentralHub's AI supports every part of your business, from enriching leads and drafting communications to handling calls and suggesting marketing strategies, always with you in control of what actually happens.",
    items: [
      'Lead enrichment & email drafting',
      'Call handling & summarization',
      'Marketing strategy suggestions',
      'Human-confirmed actions',
    ],
    media: {
      kind: 'image',
      src: '/assets/product-ai-agent.jpeg',
      alt: 'CentralHub AI drafting an email reply inside the CRM, shown in a light interface',
    },
    flip: true,
    surface: false,
    mediaReveal: 'clip-left',
  },
  {
    id: 'cdp-map',
    heading: 'Understand your customers. Act on it automatically.',
    body: "CentralHub's CDP keeps all customer activity in one place, while AI surfaces insights and helps you launch marketing campaigns through simple conversation, complete with return-on-spend tracking for every campaign you run.",
    items: [
      'Unified customer data platform',
      'AI-driven insights',
      'Conversational campaign creation',
      'Campaign ROI tracking',
    ],
    media: {
      kind: 'video',
      src: '/assets/product-marketing.mp4',
      alt: 'CentralHub launching a marketing campaign through conversation, with spend tracking',
    },
    flip: false,
    surface: true,
    mediaReveal: 'parallax',
  },
  {
    id: 'ucaas-website',
    heading: 'Your phone system and website, finally connected',
    body: 'CentralHub includes built-in telephony, SMS, IVR, and call routing, all linked to your CRM, along with a website builder you can update through simple conversation and easily revert using saved checkpoints.',
    items: [
      'Built-in VOIP/SIP telephony & SMS',
      'Calls transcribed & summarized into CRM',
      'Conversational website editing',
      'Checkpoint-based version history',
    ],
    media: {
      kind: 'image',
      src: '/assets/product-website.jpeg',
      alt: 'CentralHub website builder with conversational editing and saved version checkpoints',
    },
    flip: true,
    surface: false,
    mediaReveal: 'scale',
  },
];

const ONE_SYSTEM = {
  heading: 'One system means one source of truth',
  body: 'Because every module shares the same foundation, your data stays in one place, your AI works with full context, and your team works out of a single tab.',
};

const TRUST = {
  eyebrow: "You're always in control",
  heading: 'AI that drafts. You decide.',
  body: "CentralHub's AI proposes changes, whether it's a CRM update from a call, a marketing campaign, or a website edit, but nothing takes effect until you approve it. Every website change is also saved as a checkpoint, so you can always go back.",
  items: [
    'Draft-first AI actions',
    'Simple confirm or reject flow',
    'Reversible website checkpoints',
    'Transcripts alongside every summary',
  ],
};

const CTA = {
  heading: 'One platform for every customer conversation.',
  body: 'See how CentralHub can bring your CRM, marketing, phones, and website together, in a live demo built around your business.',
  cta: 'Get a demo',
  ctaSecondary: 'See pricing',
};

export default function ProductPage() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cleanup: (() => void) | undefined;

    (async () => {
      try {
        const gsapMod = await import('gsap');
        const stMod = await import('gsap/dist/ScrollTrigger');
        const gsap = (gsapMod as any).gsap ?? (gsapMod as any).default;
        const ScrollTrigger = (stMod as any).ScrollTrigger ?? (stMod as any).default;
        gsap.registerPlugin(ScrollTrigger);

        // Motion tokens: entrances decelerate (power3.out), durations run calm/long.
        const cs = getComputedStyle(document.documentElement);
        const tokenDur = parseFloat(cs.getPropertyValue('--ds-duration-slow'));
        const REVEAL = Math.max(Number.isFinite(tokenDur) ? tokenDur : 0.7, 0.72);
        const EASE = 'power3.out';

        const ctx = gsap.context(() => {
          // Hero — entrance sequence, runs on load (fires immediately, opacity safe).
          gsap.set('[data-hero-item]', { opacity: 0, y: 22 });
          gsap.to('[data-hero-item]', {
            opacity: 1,
            y: 0,
            duration: REVEAL,
            ease: EASE,
            stagger: 0.12,
            delay: 0.1,
          });

          // Generic reveals — transform + opacity, owned entirely by gsap.set.
          gsap.utils.toArray('[data-reveal]').forEach((el: HTMLElement) => {
            gsap.set(el, { opacity: 0, y: 28 });
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: REVEAL,
              ease: EASE,
              scrollTrigger: { trigger: el, start: 'top 85%', once: true },
            });
          });

          // Feature rows — staggered within each group.
          gsap.utils.toArray('[data-stagger-group]').forEach((group: HTMLElement) => {
            const items = group.querySelectorAll('[data-stagger-item]');
            gsap.set(items, { opacity: 0, y: 16 });
            gsap.to(items, {
              opacity: 1,
              y: 0,
              duration: REVEAL,
              ease: EASE,
              stagger: 0.08,
              scrollTrigger: { trigger: group, start: 'top 85%', once: true },
            });
          });

          // Media frames — a distinct reveal per section for variety.
          gsap.utils.toArray('[data-media-reveal]').forEach((frame: HTMLElement) => {
            const kind = frame.getAttribute('data-media-reveal');
            const st = { trigger: frame, start: 'top 82%', once: true } as const;
            if (kind === 'clip-right') {
              gsap.fromTo(frame, { clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0 0 0%)', duration: 1, ease: EASE, scrollTrigger: st });
            } else if (kind === 'clip-left') {
              gsap.fromTo(frame, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: EASE, scrollTrigger: st });
            } else if (kind === 'scale') {
              gsap.fromTo(frame, { scale: 1.06 }, { scale: 1, duration: 1.1, ease: EASE, scrollTrigger: st });
            } else if (kind === 'parallax') {
              gsap.fromTo(frame, { scale: 1.04 }, { scale: 1, duration: 1.1, ease: EASE, scrollTrigger: st });
              const media = frame.querySelector('video, img');
              if (media) {
                gsap.fromTo(
                  media,
                  { yPercent: -6 },
                  { yPercent: 6, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: 1.5 } }
                );
              }
            }
          });

          // CTA button row — animated as a single aligned unit.
          gsap.utils.toArray('[data-reveal-group]').forEach((group: HTMLElement) => {
            gsap.set(group, { opacity: 0, y: 18 });
            gsap.to(group, {
              opacity: 1,
              y: 0,
              duration: REVEAL,
              ease: EASE,
              scrollTrigger: { trigger: group, start: 'top 90%', once: true },
            });
          });
        });

        cleanup = () => ctx.revert();
      } catch {
        // GSAP failed to load — content is already visible (no CSS opacity:0). No-op.
      }
    })();

    return () => cleanup?.();
  }, []);

  return (
    <>
      <Head>
        <title>Product | CentralHub</title>
        <meta
          name="description"
          content="CentralHub brings your CRM, customer data, marketing, phones, and website together as one connected system, with AI woven through every layer and you in control of every action."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Nav activePage="product" />

      <main id="product-main">
        <ProductHero eyebrow={HERO.eyebrow} heading={HERO.heading} body={HERO.body} />

        <SquiggleDivider bg="#ffffff" fill="#f0f0f4" intensity="gentle" />
        {DEEP_DIVES.map((dd, i) => (
          <Fragment key={dd.id}>
            {i > 0 && (
              <SquiggleDivider
                bg={ddGround(DEEP_DIVES[i - 1])}
                fill={ddGround(dd)}
                intensity={FDD_INTENSITY[(i - 1) % FDD_INTENSITY.length]}
                flip={FDD_FLIP[(i - 1) % FDD_FLIP.length]}
              />
            )}
            <FeatureDeepDive {...dd} />
          </Fragment>
        ))}

        {/* Last feature row is white; OneSystem is panel — a real ground change. */}
        <SquiggleDivider bg="#ffffff" fill="#f0f0f4" intensity="medium" />
        <OneSystem heading={ONE_SYSTEM.heading} body={ONE_SYSTEM.body} />

        <SquiggleDivider bg="#f0f0f4" fill="#ffffff" intensity="bold" flip />
        <HumanInLoop
          eyebrow={TRUST.eyebrow}
          heading={TRUST.heading}
          body={TRUST.body}
          items={TRUST.items}
        />

        <SquiggleDivider bg="#ffffff" fill="#1b1b37" intensity="gentle" />
        <ProductCta
          heading={CTA.heading}
          body={CTA.body}
          cta={CTA.cta}
          ctaSecondary={CTA.ctaSecondary}
        />
      </main>

      <Footer />
    </>
  );
}
