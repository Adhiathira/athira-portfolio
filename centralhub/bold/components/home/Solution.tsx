import { useEffect, useRef } from 'react';
import styles from './Solution.module.css';
import { useReveal } from '@/lib/useReveal';
import { gsap, ScrollTrigger, EASE_SETTLE, prefersReducedMotion } from '@/lib/gsap';
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin';

// Hub-and-spoke diagram: a CentralHub core sphere, five module spokes, and an AI
// layer (crisp hairline + slowly rotating dashed ring) wrapping all of them. Lines
// carry luminous teal pulses that travel from the core outward, staggered per edge.
// Depth comes from gradients, soft glows and layered node shadows — not flat hairlines.
const C = 300; // svg center
const R = 172; // spoke radius
const NODES = [
  { label: 'CRM', angle: -90 },
  { label: 'CDP', angle: -18 },
  { label: 'MAP', angle: 54 },
  { label: 'uCaaS', angle: 126 },
  { label: 'Website', angle: 198 },
].map((n) => {
  const rad = (n.angle * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return {
    ...n,
    cos,
    sin,
    x: +(C + R * cos).toFixed(1),
    y: +(C + R * sin).toFixed(1),
  };
});

// Perimeter chords — the modules are connected to each other, not only to the hub.
// A single closed path of gentle outward-bulging arcs (quadratic, control point
// pushed past the node ring) linking every adjacent pair: CRM–CDP–MAP–uCaaS–Website.
const PERIMETER_PATH = (() => {
  const RC = 210; // control-point radius; bows each arc gently outward past the nodes
  let d = `M ${NODES[0].x} ${NODES[0].y}`;
  for (let i = 0; i < NODES.length; i++) {
    const next = NODES[(i + 1) % NODES.length];
    const ma = ((NODES[i].angle + 36) * Math.PI) / 180; // bisector of the pair
    const cx = +(C + RC * Math.cos(ma)).toFixed(1);
    const cy = +(C + RC * Math.sin(ma)).toFixed(1);
    d += ` Q ${cx} ${cy} ${next.x} ${next.y}`;
  }
  return `${d} Z`;
})();

// Per-module line-art glyphs, drawn in a ~24px box centered on (0,0). Stroke colour,
// width and joins come from the .nodeIcon class so the stroke language stays uniform;
// small solid accents (browser dots) opt into .nodeIconDot. Purely decorative.
function NodeGlyph({ label }: { label: string }) {
  switch (label) {
    case 'CRM': // three-person contact group
      return (
        <>
          <circle cx={0} cy={-5} r={3} />
          <path d="M -5.5 6.5 C -5.5 1.5, 5.5 1.5, 5.5 6.5" />
          <circle cx={-8.5} cy={-3} r={2.3} />
          <path d="M -11.5 5.5 C -11.5 1, -5 1, -4.4 4" />
          <circle cx={8.5} cy={-3} r={2.3} />
          <path d="M 11.5 5.5 C 11.5 1, 5 1, 4.4 4" />
        </>
      );
    case 'CDP': // layered database
      return (
        <>
          <ellipse cx={0} cy={-7} rx={9} ry={3.2} />
          <path d="M -9 -7 L -9 7" />
          <path d="M 9 -7 L 9 7" />
          <path d="M -9 7 A 9 3.2 0 0 0 9 7" />
          <path d="M -9 -1 A 9 3.2 0 0 0 9 -1" />
          <path d="M -9 3 A 9 3.2 0 0 0 9 3" />
        </>
      );
    case 'MAP': // paper plane (send)
      return <path d="M -10 9 L 11 0 L -10 -9 L -10 -2 L 5 0 L -10 2 Z" />;
    case 'uCaaS': // phone handset
      return (
        <path d="M8 3.5 c-1.25 0-2.45-0.2-3.57-0.57 -0.35-0.11-0.74-0.03-1.02 0.24 l-2.2 2.2 c-2.83-1.44-5.15-3.75-6.59-6.59 l2.2-2.21 c0.28-0.26 0.36-0.65 0.25-1 C-3.3 -5.55 -3.5 -6.75 -3.5 -8 c0-0.55-0.45-1-1-1 H-8 c-0.55 0-1 0.45-1 1 0 9.39 7.61 17 17 17 0.55 0 1-0.45 1-1 v-3.5 c0-0.55-0.45-1-1-1 z" />
      );
    case 'Website': // browser window
      return (
        <>
          <rect x={-10} y={-8} width={20} height={16} rx={2.5} />
          <path d="M -10 -3.5 L 10 -3.5" />
          <circle cx={-7} cy={-5.9} r={0.85} className={styles.nodeIconDot} />
          <circle cx={-4.4} cy={-5.9} r={0.85} className={styles.nodeIconDot} />
          <circle cx={-1.8} cy={-5.9} r={0.85} className={styles.nodeIconDot} />
        </>
      );
    default:
      return null;
  }
}

// Definition cards placed in the vacant space around the ring (desktop) and as a
// legend list beneath the diagram (mobile). Each is joined to its node by a
// cinematic leader line: a diagonal off the rim (`rim` -> `elbow`), a rounded
// bend, then a straight run into the card's near edge (`elbow` -> `end`) at the
// card's vertical center. `end` sits at the card's inner edge, which CSS pins to
// the same fractional position, so line and card meet as the diagram scales.
type Pt = { x: number; y: number };
type CardDef = {
  label: string;
  def: string;
  pos: 'top' | 'left' | 'right';
  top?: string; // vertical center (fraction of stage) for left/right cards
  leftPct?: string; // horizontal center (fraction of stage) for the top card
  rim: Pt; // meets the node rim; the small teal dot sits here
  elbow: Pt; // the bend — always OUTSIDE the dashed AI ring (r 252 from center)
  end: Pt; // card near edge, at the card's vertical center
};
// Geometry: the diagonal leaves the node rim, crosses the dashed ring, and bends
// at an elbow that sits just outside it; a straight run then goes into the card
// (horizontal for side cards, vertical for the top card). CRM is routed to the
// top-left so its leader never crosses the AI pill (which sits above the CRM node).
const CARDS: CardDef[] = [
  {
    label: 'CRM',
    def: 'Customer relationship management. People, companies, deals, and tasks in one place.',
    pos: 'top',
    leftPct: '34.2%',
    rim: { x: 263.5, y: 100 },
    elbow: { x: 205, y: 55 },
    end: { x: 205, y: -18 },
  },
  {
    label: 'CDP',
    def: 'Customer data platform. Every customer interaction, unified.',
    pos: 'right',
    top: '29.2%',
    rim: { x: 494.3, y: 212.7 },
    elbow: { x: 528, y: 175 },
    end: { x: 618, y: 175 },
  },
  {
    label: 'MAP',
    def: 'Marketing automation. Campaigns created through conversation, with ROI tracking.',
    pos: 'right',
    top: '84.2%',
    rim: { x: 430.5, y: 474.4 },
    elbow: { x: 456, y: 505 },
    end: { x: 618, y: 505 },
  },
  {
    label: 'Website',
    def: 'Your site, edited through conversation, with saved checkpoints.',
    pos: 'left',
    top: '29.2%',
    rim: { x: 105.7, y: 212.7 },
    elbow: { x: 72, y: 175 },
    end: { x: -18, y: 175 },
  },
  {
    label: 'uCaaS',
    def: 'Unified communications. Calls, texts, IVR, and voicemail built in.',
    pos: 'left',
    top: '84.2%',
    rim: { x: 169.5, y: 474.4 },
    elbow: { x: 144, y: 505 },
    end: { x: -18, y: 505 },
  },
];

// Build the leader-line path with a small rounded corner at the elbow (a short
// quadratic arc between the two straight segments instead of a hard 90° spike).
function leaderPath(rim: Pt, elbow: Pt, end: Pt, r = 5): string {
  const unit = (a: Pt, b: Pt) => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    return { x: dx / len, y: dy / len };
  };
  const d1 = unit(rim, elbow);
  const d2 = unit(elbow, end);
  const p1 = { x: elbow.x - d1.x * r, y: elbow.y - d1.y * r };
  const p2 = { x: elbow.x + d2.x * r, y: elbow.y + d2.y * r };
  const f = (n: number) => +n.toFixed(1);
  return `M ${f(rim.x)} ${f(rim.y)} L ${f(p1.x)} ${f(p1.y)} Q ${f(elbow.x)} ${f(elbow.y)} ${f(p2.x)} ${f(p2.y)} L ${f(end.x)} ${f(end.y)}`;
}

function cardAnchorClass(pos: CardDef['pos'], styleMap: Record<string, string>) {
  if (pos === 'left') return styleMap.cardLeft;
  if (pos === 'right') return styleMap.cardRight;
  return styleMap.cardTop;
}

export default function Solution() {
  const ref = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  useReveal(ref);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || prefersReducedMotion()) return;

    gsap.registerPlugin(MotionPathPlugin);

    const ctx = gsap.context(() => {
      // Prime the spoke lines for a draw-on reveal.
      const lines = gsap.utils.toArray<SVGLineElement>('.' + styles.spokeLine);
      lines.forEach((line) => {
        const len = line.getTotalLength();
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
      });

      gsap.set('.' + styles.node, { opacity: 0, scale: 0.72, transformOrigin: 'center' });
      gsap.set('.' + styles.core, { opacity: 0, scale: 0.8, transformOrigin: 'center' });
      gsap.set('.' + styles.perimeter, { opacity: 0 });
      gsap.set('.' + styles.ringGroup, { opacity: 0 });
      gsap.set('.' + styles.aiLabel, { opacity: 0 });

      // Leader lines draw themselves on reveal; prime each with its full length.
      const conns = gsap.utils.toArray<SVGPathElement>('.' + styles.connector);
      conns.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.set('.' + styles.connectorDot, { opacity: 0 });

      // Definition cards live outside the SVG, so gather them from the wrapper.
      // In animated mode the full-text ghost (which reserves height + feeds screen
      // readers) is hidden and the definition is typed into an overlay instead.
      const cards = wrapRef.current
        ? gsap.utils.toArray<HTMLElement>(wrapRef.current.querySelectorAll('.' + styles.defCard))
        : [];
      gsap.set(cards, { opacity: 0, y: 10 });

      const tl = gsap.timeline({
        defaults: { ease: EASE_SETTLE },
        scrollTrigger: { trigger: svg, start: 'top 76%', once: true },
      });
      tl.to('.' + styles.core, { opacity: 1, scale: 1, duration: 0.5 })
        .to(lines, { strokeDashoffset: 0, duration: 0.6, stagger: 0.08 }, '-=0.2')
        .to('.' + styles.node, { opacity: 1, scale: 1, duration: 0.45, stagger: 0.07 }, '-=0.45')
        // Leader lines kick off as the nodes land; the ambient ring/perimeter/badge
        // finish in parallel instead of blocking the callouts. Each line draws fast,
        // its rim dot pops with it, and its card fades in as the line completes.
        .addLabel('leaders', '-=0.1')
        .to('.' + styles.perimeter, { opacity: 1, duration: 0.7 }, 'leaders')
        .to('.' + styles.ringGroup, { opacity: 1, duration: 0.8 }, 'leaders')
        .to('.' + styles.aiLabel, { opacity: 1, duration: 0.4 }, 'leaders+=0.25')
        .to(conns, { strokeDashoffset: 0, duration: 0.5, stagger: 0.08 }, 'leaders')
        .to('.' + styles.connectorDot, { opacity: 1, duration: 0.2, stagger: 0.08 }, 'leaders')
        .to(cards, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 }, 'leaders+=0.1');

      // Typewriter: once each card's leader line has drawn, type its definition
      // character-by-character into the overlay. The ghost has already reserved the
      // final height, so nothing reflows as characters appear.
      cards.forEach((card, i) => {
        const typedEl = card.querySelector<HTMLElement>('.' + styles.defTyped);
        const full = CARDS[i]?.def ?? '';
        if (!typedEl) return;
        typedEl.textContent = '';
        const proxy = { n: 0 };
        tl.to(
          proxy,
          {
            n: full.length,
            duration: Math.max(0.6, full.length * 0.03),
            ease: 'none',
            onUpdate: () => {
              typedEl.textContent = full.slice(0, Math.round(proxy.n));
            },
          },
          `leaders+=${(0.5 + i * 0.08).toFixed(2)}`,
        );
      });

      // Luminous pulses that travel each edge, core -> node, looping forever.
      // Staggered per edge so the diagram feels alive rather than synchronized.
      const pulses = gsap.utils.toArray<SVGGElement>('.' + styles.pulse);
      pulses.forEach((p, i) => {
        const n = NODES[i];
        const sx = C + 76 * n.cos;
        const sy = C + 76 * n.sin;
        const ex = C + 128 * n.cos;
        const ey = C + 128 * n.sin;
        gsap.set(p, { x: sx, y: sy, opacity: 0 });
        gsap
          .timeline({ repeat: -1, repeatDelay: 0.6, delay: 0.9 + i * 0.42 })
          .to(p, { x: ex, y: ey, duration: 1.7, ease: 'none' })
          .to(p, { opacity: 1, duration: 0.3 }, 0)
          .to(p, { opacity: 0, duration: 0.45 }, 1.25);
      });

      // Subtle pulses gliding the perimeter path — two of them, kept opposite so
      // the module-to-module ring reads as continuously active. Slower and fainter
      // than the core-spoke pulses so the hub links stay the primary read.
      const perimPath = svg.querySelector<SVGPathElement>('.' + styles.perimeter);
      const perimPulses = gsap.utils.toArray<SVGGElement>('.' + styles.perimeterPulse);
      if (perimPath) {
        const LOOP = 15;
        perimPulses.forEach((p, i) => {
          gsap.set(p, { opacity: 0.8 });
          gsap.to(p, {
            duration: LOOP,
            ease: 'none',
            repeat: -1,
            delay: (i * LOOP) / perimPulses.length,
            motionPath: { path: perimPath, start: 0, end: 1, alignOrigin: [0.5, 0.5] },
          });
        });
      }
    }, svg);

    const t = window.setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      window.clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <section id="solution" className={styles.solution} ref={ref}>
      <div id="solution-inner" className={styles.inner}>
        <div id="solution-head" className={styles.head} data-reveal-group>
          <p className={styles.titleLead} data-reveal>
            We built something different. Here&apos;s what fair looks like.
          </p>
          <h2 id="solution-heading" className={styles.heading} data-reveal>
            One platform for every customer conversation.
          </h2>
          <p id="solution-body" className={styles.body} data-reveal>
            CentralHub brings your CRM, customer data, marketing, phone system, and website into a single platform,
            powered by AI that works across all of it. Everything connected. Nothing duplicated.
          </p>
        </div>

        <div id="solution-diagram" className={styles.diagramWrap} ref={wrapRef}>
          <div className={styles.diagramStage}>
          <svg
            ref={svgRef}
            className={styles.diagram}
            viewBox="0 0 600 600"
            role="img"
            aria-label="CentralHub core connected to CRM, CDP, MAP, uCaaS, and Website modules, all wrapped by an AI layer"
          >
            <defs>
              <radialGradient id="ch-core" cx="0.36" cy="0.32" r="0.85">
                <stop offset="0" stopColor="#9ce0d7" />
                <stop offset="0.5" stopColor="#2b8a80" />
                <stop offset="1" stopColor="#1f6b63" />
              </radialGradient>
              <radialGradient id="ch-core-halo" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="#2b8a80" stopOpacity="0.32" />
                <stop offset="0.6" stopColor="#2b8a80" stopOpacity="0.1" />
                <stop offset="1" stopColor="#2b8a80" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="ch-node" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ffffff" />
                <stop offset="0.52" stopColor="#f7f9fb" />
                <stop offset="1" stopColor="#e8edf1" />
              </linearGradient>
              <radialGradient id="ch-line" cx={C} cy={C} r={R} gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#2b8a80" stopOpacity="0.95" />
                <stop offset="0.55" stopColor="#2b8a80" stopOpacity="0.5" />
                <stop offset="1" stopColor="#2b8a80" stopOpacity="0.06" />
              </radialGradient>
              <radialGradient id="ch-perimeter" cx={C} cy={C} r={230} gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#2b8a80" stopOpacity="0.32" />
                <stop offset="0.72" stopColor="#2b8a80" stopOpacity="0.24" />
                <stop offset="1" stopColor="#2b8a80" stopOpacity="0.08" />
              </radialGradient>
              <filter id="ch-shadow" x="-60%" y="-60%" width="220%" height="220%">
                <feDropShadow dx="0" dy="9" stdDeviation="12" floodColor="#1b2a3a" floodOpacity="0.16" />
                <feDropShadow dx="0" dy="2.5" stdDeviation="3.5" floodColor="#1b2a3a" floodOpacity="0.18" />
                <feDropShadow dx="0" dy="0.5" stdDeviation="0.5" floodColor="#1b2a3a" floodOpacity="0.14" />
              </filter>
              <filter id="ch-soft" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="6" />
              </filter>
              <filter id="ch-pulse-glow" x="-160%" y="-160%" width="420%" height="420%">
                <feGaussianBlur stdDeviation="3.4" />
              </filter>
            </defs>

            {/* Spoke connectors — teal near the core, fading toward each node */}
            {NODES.map((n) => (
              <line key={`l-${n.label}`} className={styles.spokeLine} x1={C} y1={C} x2={n.x} y2={n.y} />
            ))}

            {/* Card leader lines — cinematic callout style: a diagonal off the node
                rim, a rounded elbow, then a straight run into the card. Drawn under
                the diagram so they stay subtle; hidden on mobile where the
                definitions become a legend list. */}
            <g className={styles.connectors} aria-hidden="true">
              {CARDS.map((c) => (
                <path
                  key={`conn-${c.label}`}
                  className={styles.connector}
                  d={leaderPath(c.rim, c.elbow, c.end)}
                  fill="none"
                />
              ))}
            </g>

            {/* Perimeter — module-to-module connections (fainter than the spokes) */}
            <path className={styles.perimeter} d={PERIMETER_PATH} aria-hidden="true" />
            {[0, 1].map((i) => (
              <g key={`pp-${i}`} className={styles.perimeterPulse} aria-hidden="true">
                <circle r={5} className={styles.perimeterPulseGlow} />
                <circle r={2} className={styles.perimeterPulseCore} />
              </g>
            ))}

            {/* Traveling light pulses (decorative) */}
            {NODES.map((n) => (
              <g key={`p-${n.label}`} className={styles.pulse} aria-hidden="true">
                <circle r={7} className={styles.pulseGlow} />
                <circle r={2.6} className={styles.pulseCore} />
              </g>
            ))}

            {/* Spoke nodes — milled white discs: cool rim, inner highlight bevel,
                layered shadow, a line-art module icon above the label */}
            {NODES.map((n) => (
              <g key={`n-${n.label}`} className={styles.node}>
                <circle cx={n.x} cy={n.y} r={46} className={styles.nodeCircle} />
                <circle cx={n.x} cy={n.y} r={43.5} className={styles.nodeInner} aria-hidden="true" />
                <g className={styles.nodeIcon} transform={`translate(${n.x} ${n.y - 11})`} aria-hidden="true">
                  <NodeGlyph label={n.label} />
                </g>
                <text x={n.x} y={n.y + 15} className={styles.nodeLabel} textAnchor="middle" dominantBaseline="central">
                  {n.label}
                </text>
              </g>
            ))}

            {/* Leader-line rim dots — rendered above the discs so the join to each
                node reads clearly as a connection point */}
            <g className={styles.connectorDots} aria-hidden="true">
              {CARDS.map((c) => (
                <circle
                  key={`dot-${c.label}`}
                  className={styles.connectorDot}
                  cx={c.rim.x}
                  cy={c.rim.y}
                  r={3}
                />
              ))}
            </g>

            {/* Core sphere — halo, gradient fill, inner highlight */}
            <g className={styles.core}>
              <circle cx={C} cy={C} r={104} className={styles.coreHalo} aria-hidden="true" />
              <circle cx={C} cy={C} r={66} className={styles.coreCircle} />
              <ellipse cx={C - 15} cy={C - 22} rx={26} ry={17} className={styles.coreHighlight} aria-hidden="true" />
              <text x={C} y={C - 8} className={styles.coreLabel} textAnchor="middle" dominantBaseline="central">
                Central
              </text>
              <text x={C} y={C + 12} className={styles.coreLabel} textAnchor="middle" dominantBaseline="central">
                Hub
              </text>
            </g>

            {/* AI layer — crisp hairline ring + slowly rotating dashed ring */}
            <g className={styles.ringGroup} aria-hidden="true">
              <circle cx={C} cy={C} r={252} className={styles.aiRingBase} />
              <circle cx={C} cy={C} r={252} className={styles.aiRingDash} />
            </g>

            {/* AI badge sitting on the ring */}
            <g className={styles.aiLabel}>
              <rect x={C - 30} y={48 - 20} width={60} height={38} rx={19} className={styles.aiPillGlow} aria-hidden="true" />
              <rect x={C - 24} y={48 - 16} width={48} height={30} rx={15} className={styles.aiPill} />
              {/* sparkle glyph in place of the AI label */}
              <g
                transform={`translate(${C}, 48)`}
                className={styles.aiPillIcon}
                role="img"
                aria-label="AI layer"
              >
                <path
                  d="M0 -8 L2.1 -2.1 L8 0 L2.1 2.1 L0 8 L-2.1 2.1 L-8 0 L-2.1 -2.1 Z"
                  fill="#ffffff"
                />
                <path
                  d="M7.5 -8.5 L8.4 -6.1 L10.8 -5.2 L8.4 -4.3 L7.5 -1.9 L6.6 -4.3 L4.2 -5.2 L6.6 -6.1 Z"
                  fill="#ffffff"
                  opacity="0.85"
                />
              </g>
            </g>
          </svg>

            {/* Definition cards floating around the ring (desktop). The ghost holds
                the full text: it reserves the final height (so typing never reflows
                the card) and is the copy screen readers read. The overlay is the
                decorative typewriter target with a trailing caret. */}
            {CARDS.map((c) => (
              <div
                key={`card-${c.label}`}
                className={cardAnchorClass(c.pos, styles)}
                style={c.pos === 'top' ? { left: c.leftPct } : { top: c.top }}
              >
                <div className={styles.defCard}>
                  <span className={styles.defTerm}>{c.label}</span>
                  <div className={styles.defBodyWrap}>
                    <p className={styles.defBodyGhost} aria-hidden="true">{c.def}</p>
                    <p className={styles.defBodyType} aria-hidden="true">
                      <span className={styles.defTyped} />
                      <span className={styles.caret} />
                    </p>
                    <span className={styles.srOnly}>{c.def}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Same definitions as a legend list on narrow screens */}
          <ul className={styles.legend}>
            {CARDS.map((c) => (
              <li key={`leg-${c.label}`} className={styles.legendRow}>
                <span className={styles.legendTerm}>{c.label}</span>
                <span className={styles.legendBody}>{c.def}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
