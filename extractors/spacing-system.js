export const metadata = { tag: 'spacing-system' };

const SPACING_VAR_KEYWORDS = ['space', 'spacing', 'gap', 'pad', 'margin', 'inset', 'radius', 'gutter'];

const SKIP_VALUES = new Set(['0px', 'normal', 'auto']);

export async function extract(page) {
  return await page.evaluate(({ keywords, skipValues }) => {
    function isSpacingVar(name) {
      const lower = name.toLowerCase();
      return keywords.some(k => lower.includes(k));
    }

    const skipSet = new Set(skipValues);
    const spacingProps = [
      'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
      'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
      'gap', 'rowGap', 'columnGap',
    ];

    // For class-based selectors, pick the most information-rich VISIBLE element among candidates
    function isVisible(el) {
      const cs = getComputedStyle(el);
      return cs.display !== 'none' && cs.visibility !== 'hidden' && parseFloat(cs.opacity) > 0;
    }

    function bestMatch(sel) {
      const candidates = [...document.querySelectorAll(sel)].slice(0, 10);
      let best = null, bestCount = 0;
      for (const el of candidates) {
        if (!isVisible(el)) continue;
        const cs = getComputedStyle(el);
        let count = spacingProps.filter(p => { const v = cs[p]; return v && !skipSet.has(v); }).length;
        const r = cs.borderTopLeftRadius;
        if (r && !skipSet.has(r)) count++;
        if (count > bestCount) { best = el; bestCount = count; }
      }
      return best;
    }

    // Pass 1: CSS custom properties from :root
    const cssVars = {};
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule.selectorText?.split(',').map(s => s.trim()).some(s => s === ':root' || s === 'html')) {
            for (const prop of rule.style) {
              if (!prop.startsWith('--')) continue;
              if (!isSpacingVar(prop)) continue;
              const val = rule.style.getPropertyValue(prop).trim();
              if (val) cssVars[prop.slice(2)] = val;
            }
          }
        }
      } catch (_) { /* cross-origin */ }
    }

    // Pass 2: computed element spacing
    // All selectors use bestMatch (picks richest of up to 10 candidates)
    const semanticSelectors = [
      ['header', 'header'], ['nav', 'nav'], ['section', 'section'], ['article', 'article'],
      ['main', 'main'], ['footer', 'footer'],
      ['button', 'button'], ['input', 'input:not([type="checkbox"]):not([type="radio"])'],
      ['p', 'p'], ['li', 'li'],
    ];
    const classSelectors = [
      ['container', '[class*="container"]'],
      ['wrapper',   '[class*="wrapper"]'],
      ['card',      '[class*="card"]'],
      ['hero',      '[class*="hero"]'],
      ['section',   '[class*="section"]'],
      ['content',   '[class*="content"]'],
      ['grid',      '[class*="grid"]'],
      ['row',       '[class*="row"]'],
      ['panel',     '[class*="panel"]'],
      ['sidebar',   '[class*="sidebar"]'],
    ];

    function extractEntry(el) {
      const cs = getComputedStyle(el);
      const entry = {};
      for (const prop of spacingProps) {
        const val = cs[prop];
        if (!val || skipSet.has(val)) continue;
        if (val.endsWith('px') && Math.abs(parseFloat(val)) > 800) continue; // animation artifact
        if (prop.startsWith('margin') && parseFloat(val) < 0) continue; // layout hack, not a spacing token
        entry[prop] = val;
      }
      const radius = cs.borderTopLeftRadius;
      if (radius && !skipSet.has(radius)) entry.borderRadius = radius;
      return entry;
    }

    const elements = {};
    const capturedEls = new Set();
    for (const [label, sel] of semanticSelectors) {
      const el = bestMatch(sel);
      if (!el) continue;
      const entry = extractEntry(el);
      if (Object.keys(entry).length > 0) { elements[label] = entry; capturedEls.add(el); }
    }
    for (const [label, sel] of classSelectors) {
      const el = bestMatch(sel);
      if (!el) continue;
      const entry = extractEntry(el);
      if (Object.keys(entry).length > 0) {
        if (!elements[label]) elements[label] = entry; // don't overwrite semantic selector result
        capturedEls.add(el);
      }
    }

    // Pass 3: framework-agnostic CTA scan (button + styled a[href])
    // Resolve the visually-styled element: <a> wrapper or its inner child (e.g. <a><span>label</span></a>)
    function ctaTarget(el) {
      const cs = getComputedStyle(el);
      if (parseFloat(cs.paddingLeft) > 0 || parseFloat(cs.paddingRight) > 0) return el;
      const inner = el.firstElementChild;
      if (!inner) return el;
      const ics = getComputedStyle(inner);
      return (parseFloat(ics.paddingLeft) > 0 || parseFloat(ics.paddingRight) > 0) ? inner : el;
    }

    const ctaCandidates = [
      ...[...document.querySelectorAll('button')],
      ...[...document.querySelectorAll('a[href]')],
    ].filter(el => {
      if (!isVisible(el)) return false;
      const target = ctaTarget(el);
      const cs = getComputedStyle(target);
      return parseFloat(cs.paddingLeft) >= 10 || parseFloat(cs.paddingRight) >= 10;
    });

    const ctaPaddingProps = ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'];
    let bestCta = null, bestCtaCount = 0;
    for (const el of ctaCandidates) {
      const target = ctaTarget(el);
      const cs = getComputedStyle(target);
      let count = ctaPaddingProps.filter(p => { const v = cs[p]; return v && !skipSet.has(v); }).length;
      const r = cs.borderTopLeftRadius;
      if (r && !skipSet.has(r)) count += 2; // weight radius higher — distinguishes pill CTAs from flat buttons
      if (count > bestCtaCount) { bestCta = target; bestCtaCount = count; }
    }
    if (bestCta) {
      const entry = extractEntry(bestCta);
      if (Object.keys(entry).length > 0) elements['cta'] = entry;
    }

    // Pass 4: structural scan — fall-through walk of <main> children (or <body>)
    // If a direct child has no spacing, descend into its children (max depth 2).
    // Catches layout sections on sites where a CMS/framework wraps content in an unstyled shell.
    const mainEl = document.querySelector('main') || document.body;

    function hasSpacing(el) {
      const cs = getComputedStyle(el);
      return spacingProps.some(p => { const v = cs[p]; return v && !skipSet.has(v); });
    }

    function deriveLabel(el, fallbackIdx) {
      let label = el.getAttribute('aria-label') || el.getAttribute('data-section');
      if (!label) {
        const heading = el.querySelector('h1, h2, h3');
        if (heading) {
          label = heading.textContent.trim().slice(0, 30)
            .toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        }
      }
      return label || `div-${fallbackIdx}`;
    }

    let divIdx = 0;
    for (const child of [...mainEl.children].slice(0, 8)) {
      if (capturedEls.has(child) || !isVisible(child)) continue;

      if (hasSpacing(child)) {
        const label = deriveLabel(child, ++divIdx);
        if (!elements[label]) {
          const entry = extractEntry(child);
          if (Object.keys(entry).length > 0) elements[label] = entry;
        }
      } else {
        // Shell wrapper with no spacing — descend one level
        for (const grandchild of [...child.children].slice(0, 6)) {
          if (capturedEls.has(grandchild) || !isVisible(grandchild)) continue;
          if (!hasSpacing(grandchild)) continue;
          const label = deriveLabel(grandchild, ++divIdx);
          if (!elements[label]) {
            const entry = extractEntry(grandchild);
            if (Object.keys(entry).length > 0) elements[label] = entry;
          }
        }
      }
    }

    return { cssVars, elements };
  }, { keywords: SPACING_VAR_KEYWORDS, skipValues: [...SKIP_VALUES] });
}
