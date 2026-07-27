// Centralized GSAP setup for the even-keel (CentralHub) build.
// ScrollTrigger is registered once here so every component imports a ready instance.
// Motion register: calm, deliberate (durations 0.26-0.39s, gentle deceleration) —
// matched to motion.json timing tokens and the "languid analog settle" concept brief.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Shared timing tokens — the whole site advances at one quiet cadence.
export const DUR = 0.36;
export const DUR_LONG = 0.52;
export const EASE = 'power2.out';
export const EASE_SETTLE = 'power3.out';
export const STAGGER = 0.08;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export { gsap, ScrollTrigger };
