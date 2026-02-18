export const metadata = { tag: 'type-system' };

const TYPE_VAR_KEYWORDS = ['font', 'type', 'text', 'size', 'weight', 'line-height', 'letter', 'heading', 'body', 'caption'];

// Defaults that add no signal — skip these values
const SKIP_DEFAULTS = {
  letterSpacing: 'normal',
  wordSpacing: 'normal',
  textTransform: 'none',
  fontStyle: 'normal',
  textDecoration: 'none',
  fontFeatureSettings: 'normal',
};

export async function extract(page) {
  return await page.evaluate(({ keywords, skipDefaults }) => {
    function stripQuotes(s) {
      return s.replace(/['"]/g, '').trim();
    }
    function isTypeVar(name) {
      const lower = name.toLowerCase();
      return keywords.some(k => lower.includes(k));
    }

    // Pass 1: CSS custom properties from :root + @font-face declarations
    const cssVars = {};
    const fontFaces = [];
    const seenFaces = new Set();

    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          // CSS vars from :root / html
          if (rule.selectorText?.split(',').map(s => s.trim()).some(s => s === ':root' || s === 'html')) {
            for (const prop of rule.style) {
              if (!prop.startsWith('--')) continue;
              if (!isTypeVar(prop)) continue;
              const val = rule.style.getPropertyValue(prop).trim();
              if (val) cssVars[prop.slice(2)] = val;
            }
          }
          // @font-face
          if (rule.type === CSSRule.FONT_FACE_RULE) {
            const family = stripQuotes(rule.style.getPropertyValue('font-family'));
            const weight = rule.style.getPropertyValue('font-weight') || 'normal';
            const style  = rule.style.getPropertyValue('font-style')  || 'normal';
            const srcRaw = rule.style.getPropertyValue('src') || '';
            // Extract first url() value
            const srcMatch = srcRaw.match(/url\(['"]?([^'")\s]+)['"]?\)/);
            const src = srcMatch ? srcMatch[1] : srcRaw;
            const key = `${family}|${weight}|${style}`;
            if (family && !seenFaces.has(key)) {
              seenFaces.add(key);
              fontFaces.push({ family, weight, style, src });
            }
          }
        }
      } catch (_) { /* cross-origin sheet — skip */ }
    }

    // Pass 2: computed element styles on key selectors
    const selectors = [
      ['h1', 'h1'], ['h2', 'h2'], ['h3', 'h3'], ['h4', 'h4'],
      ['body', 'body'], ['button', 'button'], ['small', 'small'],
      ['link', 'a'], ['nav', 'nav a'],
    ];
    const props = [
      'fontFamily', 'fontSize', 'fontWeight', 'lineHeight',
      'letterSpacing', 'wordSpacing', 'textTransform', 'fontStyle',
      'textDecoration', 'fontFeatureSettings',
    ];

    const typeScale = {};
    for (const [label, sel] of selectors) {
      const el = document.querySelector(sel);
      if (!el) continue;
      const cs = getComputedStyle(el);
      const entry = {};
      for (const prop of props) {
        let val = cs[prop];
        if (!val) continue;
        if (skipDefaults[prop] && val === skipDefaults[prop]) continue;
        if (prop === 'fontFamily') val = stripQuotes(val);
        entry[prop] = val;
      }
      if (Object.keys(entry).length > 0) typeScale[label] = entry;
    }

    return { cssVars, fontFaces, typeScale };
  }, { keywords: TYPE_VAR_KEYWORDS, skipDefaults: SKIP_DEFAULTS });
}
