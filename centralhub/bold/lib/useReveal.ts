import { useEffect, RefObject } from 'react';
import { gsap, ScrollTrigger, DUR_LONG, EASE, STAGGER, prefersReducedMotion } from './gsap';

/**
 * Shared quiet reveal. Animates every [data-reveal] descendant of `ref` up into place
 * on scroll — a gentle transform-only rise (no opacity kept in CSS, so content is never
 * stranded invisible if scripting is disabled). Elements sharing a [data-reveal-group]
 * animate together as one staggered batch keyed off the group's trigger.
 *
 * Opt an element out of the generic pass with [data-reveal-skip] when it owns a
 * dedicated animation (hub diagram draw, counters, headline split, etc.).
 */
export function useReveal(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = Array.from(
      root.querySelectorAll<HTMLElement>('[data-reveal]')
    ).filter((el) => el.getAttribute('data-reveal-skip') === null);

    if (prefersReducedMotion() || targets.length === 0) return;

    const ctx = gsap.context(() => {
      // Group elements by their nearest [data-reveal-group] so aligned siblings
      // (card rows, button pairs) travel together rather than independently.
      const groups = new Map<Element | null, HTMLElement[]>();
      targets.forEach((el) => {
        const key = el.closest('[data-reveal-group]');
        const bucket = groups.get(key) ?? [];
        bucket.push(el);
        groups.set(key, bucket);
      });

      groups.forEach((els, key) => {
        const trigger = (key as HTMLElement) ?? els[0];
        gsap.set(els, { y: 26, opacity: 0 });
        gsap.to(els, {
          y: 0,
          opacity: 1,
          duration: DUR_LONG,
          ease: EASE,
          stagger: STAGGER,
          scrollTrigger: { trigger, start: 'top 82%', once: true },
        });
      });
    }, root);

    // Recalculate once fonts/images settle so triggers sit at true positions.
    const refresh = () => ScrollTrigger.refresh();
    const t = window.setTimeout(refresh, 300);

    return () => {
      window.clearTimeout(t);
      ctx.revert();
    };
  }, [ref]);
}
