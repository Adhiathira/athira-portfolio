import { useEffect, useRef } from 'react';
import styles from './HeroParticles.module.css';

// Constellation sky behind the hero: a field of drifting, twinkling stars, with
// REAL constellations (Big Dipper, Orion, Cassiopeia, Cygnus, Lyra) forming at
// random spots — their stars brighten, the figure traces itself in, holds, and
// dissolves. Several can be alive at once. Canvas-rendered, brand teal, light
// register. Reduced-motion renders a static field with two traced figures.

type Star = {
  x: number;
  y: number;
  r: number;
  drift: number;
  born: number;
  life: number;
  twinklePhase: number;
  twinkleSpeed: number;
  bright: boolean;
};

type Pattern = {
  name: string;
  // normalized points in a unit box (y down), recognizable shapes
  points: [number, number][];
  // segments as index pairs
  segments: [number, number][];
};

// Approximate but recognizable figures of real constellations/asterisms.
const PATTERNS: Pattern[] = [
  {
    name: 'Big Dipper',
    points: [
      [0.0, 0.12], [0.16, 0.04], [0.32, 0.06], [0.46, 0.12],
      [0.52, 0.35], [0.72, 0.4], [0.68, 0.14],
    ],
    segments: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]],
  },
  {
    name: 'Orion',
    points: [
      [0.25, 0.05], [0.65, 0.08], [0.4, 0.45], [0.5, 0.48],
      [0.6, 0.51], [0.32, 0.9], [0.72, 0.88],
    ],
    segments: [[0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6]],
  },
  {
    name: 'Cassiopeia',
    points: [
      [0.0, 0.35], [0.22, 0.05], [0.45, 0.3], [0.7, 0.0], [0.95, 0.2],
    ],
    segments: [[0, 1], [1, 2], [2, 3], [3, 4]],
  },
  {
    name: 'Cygnus',
    points: [
      [0.5, 0.0], [0.5, 0.35], [0.15, 0.45], [0.85, 0.28], [0.5, 0.95],
    ],
    segments: [[0, 1], [1, 2], [1, 3], [1, 4]],
  },
  {
    name: 'Leo',
    points: [
      [0.62, 0.0], [0.5, 0.08], [0.42, 0.22], [0.5, 0.34], [0.62, 0.3],
      [0.2, 0.55], [0.0, 0.72], [0.28, 0.78], [0.62, 0.62],
    ],
    segments: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [3, 8], [8, 7], [7, 6], [6, 5], [5, 3]],
  },
  {
    name: 'Scorpius',
    points: [
      [0.0, 0.1], [0.08, 0.0], [0.1, 0.22], [0.22, 0.18], [0.38, 0.28],
      [0.5, 0.45], [0.55, 0.65], [0.65, 0.82], [0.82, 0.9], [0.97, 0.82], [0.93, 0.68],
    ],
    segments: [[0, 3], [1, 3], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10]],
  },
  {
    name: 'Pegasus',
    points: [
      [0.25, 0.2], [0.6, 0.15], [0.65, 0.5], [0.3, 0.55],
      [0.05, 0.05], [0.85, 0.0], [0.92, 0.75], [0.1, 0.85],
    ],
    segments: [[0, 1], [1, 2], [2, 3], [3, 0], [0, 4], [1, 5], [2, 6], [3, 7]],
  },
  {
    name: 'Aquila',
    points: [
      [0.5, 0.1], [0.5, 0.35], [0.15, 0.5], [0.85, 0.45], [0.42, 0.7], [0.58, 0.72], [0.5, 0.95],
    ],
    segments: [[0, 1], [1, 2], [1, 3], [1, 4], [1, 5], [4, 6], [5, 6]],
  },
  {
    name: 'Lyra',
    points: [
      [0.5, 0.0], [0.35, 0.25], [0.65, 0.22], [0.38, 0.65], [0.68, 0.6],
    ],
    segments: [[0, 1], [0, 2], [1, 2], [1, 3], [2, 4], [3, 4]],
  },
];

type Figure = {
  pattern: Pattern;
  // star positions in canvas px
  pts: { x: number; y: number }[];
  started: number;
  trace: number;
  hold: number;
  fade: number;
};

const STAR_COUNT = 60;
const FADE_IN = 1.6;
const FADE_OUT = 2.2;
const MAX_FIGURES = 6;
const LINE_ALPHA = 0.42;

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let figures: Figure[] = [];
    let nextFigureAt = 1.5;
    let recentPatterns: string[] = [];

    const now = () => performance.now() / 1000;

    const makeStar = (t: number, immediate = false): Star => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.8 + Math.random() * 1.6,
      drift: 2 + Math.random() * 5,
      born: immediate ? t - FADE_IN - Math.random() * 6 : t,
      life: 14 + Math.random() * 18,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.5 + Math.random() * 1.1,
      bright: Math.random() < 0.28,
    });

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const starAlpha = (s: Star, t: number) => {
      const age = t - s.born;
      if (age < 0) return 0;
      let envelope = 1;
      if (age < FADE_IN) envelope = age / FADE_IN;
      else if (age > s.life - FADE_OUT) envelope = Math.max(0, (s.life - age) / FADE_OUT);
      const twinkle = reduced ? 1 : 0.6 + 0.4 * Math.sin(s.twinklePhase + t * s.twinkleSpeed);
      const base = s.bright ? 0.5 : 0.26;
      return base * envelope * twinkle;
    };

    const spawnFigure = (t: number) => {
      // avoid immediately repeating the same figures
      const candidates = PATTERNS.filter((p) => !recentPatterns.includes(p.name));
      const pattern = candidates[Math.floor(Math.random() * candidates.length)] || PATTERNS[0];
      recentPatterns.push(pattern.name);
      if (recentPatterns.length > 3) recentPatterns.shift();

      const scale = Math.min(width, height) * (0.3 + Math.random() * 0.16);
      const rot = ((Math.random() * 50 - 25) * Math.PI) / 180;
      const cos = Math.cos(rot);
      const sin = Math.sin(rot);
      const cx = (0.12 + Math.random() * 0.76) * width;
      const cy = (0.12 + Math.random() * 0.6) * height;

      const pts = pattern.points.map(([px, py]) => {
        const ox = (px - 0.5) * scale;
        const oy = (py - 0.5) * scale;
        return { x: cx + ox * cos - oy * sin, y: cy + ox * sin + oy * cos };
      });
      // keep on canvas
      if (pts.some((p) => p.x < 8 || p.x > width - 8 || p.y < 8 || p.y > height - 8)) return;

      figures.push({
        pattern,
        pts,
        started: t,
        trace: 1.8, // brighten-in duration (no tracing)
        hold: 4.2,
        fade: 2.4,
      });
    };

    const drawFigure = (f: Figure, t: number) => {
      const age = t - f.started;
      const total = f.trace + f.hold + f.fade;
      if (age > total) return false;

      // No tracing: the whole figure brightens in, holds, then dims away.
      let envelope = 1;
      if (age < f.trace) {
        const u = age / f.trace;
        envelope = u * u * (3 - 2 * u); // smoothstep in
      } else if (age > f.trace + f.hold) {
        const u = (age - f.trace - f.hold) / f.fade;
        envelope = 1 - u * u * (3 - 2 * u); // smoothstep out
      }
      const alpha = LINE_ALPHA * envelope;

      const segs = f.pattern.segments;
      ctx.lineWidth = 1.25;
      ctx.lineCap = 'round';
      ctx.strokeStyle = `rgba(31, 107, 99, ${alpha})`;
      ctx.beginPath();
      for (let i = 0; i < segs.length; i++) {
        const a = f.pts[segs[i][0]];
        const b = f.pts[segs[i][1]];
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
      }
      ctx.stroke();

      // constellation stars: brighter than the field, with halos
      const starAlphaNow = envelope;
      for (const p of f.pts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(31, 107, 99, ${0.75 * starAlphaNow})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(43, 138, 128, ${0.16 * starAlphaNow})`;
        ctx.fill();
      }
      return true;
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        const alpha = starAlpha(s, t);
        if (alpha <= 0) continue;
        ctx.beginPath();
        ctx.arc(s.x * width, s.y * height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.bright
          ? `rgba(43, 138, 128, ${alpha})`
          : `rgba(100, 112, 126, ${alpha * 0.8})`;
        ctx.fill();
        if (s.bright && s.r > 1.5) {
          ctx.beginPath();
          ctx.arc(s.x * width, s.y * height, s.r * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(43, 138, 128, ${alpha * 0.12})`;
          ctx.fill();
        }
      }
      figures = figures.filter((f) => drawFigure(f, t));
    };

    let last = now();
    const tick = () => {
      const t = now();
      const dt = Math.min(t - last, 0.05);
      last = t;

      for (const s of stars) {
        s.x += (s.drift * dt) / width;
        if (s.x > 1.02) s.x = -0.02;
      }
      stars = stars.map((s) => (t - s.born > s.life ? makeStar(t) : s));

      if (t > nextFigureAt && figures.length < MAX_FIGURES) {
        spawnFigure(t);
        nextFigureAt = t + 1.4 + Math.random() * 2.2;
      }

      draw(t);
      raf = requestAnimationFrame(tick);
    };

    resize();
    const t0 = now();
    stars = Array.from({ length: STAR_COUNT }, () => makeStar(t0, true));

    if (reduced) {
      spawnFigure(t0);
      spawnFigure(t0);
      for (const f of figures) f.started = t0 - f.trace; // fully traced, static
      draw(t0 + 0.01);
    } else {
      raf = requestAnimationFrame(tick);
    }

    const onResize = () => {
      resize();
      draw(now());
    };
    window.addEventListener('resize', onResize);

    const onVisibility = () => {
      if (reduced) return;
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        last = now();
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
