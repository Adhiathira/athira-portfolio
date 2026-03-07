import { LLMRouter, ClaudeCliProvider } from '../lib/llm/index.js';
import { createLogger } from '../lib/logger.js';

const router = new LLMRouter({
  providers: { 'claude-cli': new ClaudeCliProvider() },
  maxAttempts: 2,
});

export const metadata = { tag: 'nav-system' };

const log = createLogger('nav-system');

const SYSTEM_PROMPT = `You are a precision design intelligence extractor specializing in navigation systems. Extract structured design tokens from CSS source and computed geometry data. Be precise and literal — extract only what the CSS explicitly declares. Do NOT extract colors (they are handled by a separate extractor). Return valid JSON only, no markdown fences, no prose.`;

export async function extract(page, opts = {}) {
  // ── Pass 1: CSS Filter ──────────────────────────────────────────────────────
  const filteredCSS = await page.evaluate(() => {
    const NAV_SELECTORS = [
      'nav', '.nav', '#nav', '[role="navigation"]',
      'header', '.header', '.navbar', '.menu', '.navigation',
    ];
    const GENERIC_ONLY = new Set(['body', '*', 'html', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

    function resolveVars(cssText, rootStyle) {
      return cssText.replace(/var\((--[^,)]+)(?:,\s*[^)]+)?\)/g, (match, prop) => {
        const resolved = rootStyle.getPropertyValue(prop.trim()).trim();
        return resolved || match;
      });
    }

    function findKeyframes(animationName, allSheets) {
      for (const sheet of allSheets) {
        try {
          const rules = sheet.cssRules || sheet.rules;
          if (!rules) continue;
          for (const rule of rules) {
            if (rule.type === 7 && rule.name === animationName) {
              return rule.cssText;
            }
          }
        } catch (_) { /* cross-origin */ }
      }
      return null;
    }

    // Boundary-aware match for bare element tokens like "nav" and "header".
    // Prevents ".card-header" and ".canvas-navy" from matching "header" / "nav".
    // Class/id/attribute tokens already carry a boundary character (. # [) so they
    // use simple substring matching.
    function tokenBounded(lower, token) {
      const esc = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return new RegExp(`(?:^|[\\s,>+~])${esc}(?=[\\s,>+~:.#\\[{]|$)`).test(lower);
    }

    function matchesNavSelector(selectorText) {
      const lower = selectorText.toLowerCase();
      // State tokens (:hover, .active, etc.) are context-free — they match any element.
      // Only include a rule when a nav-context token is present in the selector.
      // Rules like "nav:hover" or "header.scrolled" already contain nav tokens and are
      // caught here; state-only selectors like ".active" or "p::after" are excluded.
      for (const s of NAV_SELECTORS) {
        if (s[0] === '.' || s[0] === '#' || s[0] === '[') {
          // Class/id/attribute tokens: prefix char already limits false positives
          if (lower.includes(s)) return true;
        } else {
          // Element tokens ("nav", "header"): require word boundary
          if (tokenBounded(lower, s)) return true;
        }
      }
      return false;
    }

    function isGenericOnly(selectorText) {
      const trimmed = selectorText.trim();
      return GENERIC_ONLY.has(trimmed.toLowerCase());
    }

    const rootStyle = getComputedStyle(document.documentElement);
    const allSheets = Array.from(document.styleSheets);
    const collectedKeyframeNames = new Set();
    const parts = [];

    function processRules(rules) {
      if (!rules) return;
      for (const rule of rules) {
        // Recurse into any grouping at-rule (@media, @supports, @layer, etc.)
        // type 1 = style rule (no children), type 7 = @keyframes (handled separately)
        if (rule.type !== 1 && rule.type !== 7 && (rule.cssRules || rule.rules)) {
          processRules(rule.cssRules || rule.rules);
          continue;
        }

        // Only process style rules (type 1)
        if (rule.type !== 1) continue;

        const selectorText = rule.selectorText || '';
        if (isGenericOnly(selectorText)) continue;
        if (!matchesNavSelector(selectorText)) continue;

        let cssText = rule.cssText;

        // Resolve var(--...) references
        if (cssText.includes('var(--')) {
          cssText = resolveVars(cssText, rootStyle);
        }

        parts.push(cssText);

        // If this rule has animation-name, pull the keyframes block(s) too.
        // animation-name can be comma-separated ("fadeIn, slideUp") — process each.
        if (rule.style && rule.style.animationName && rule.style.animationName !== 'none') {
          for (const animName of rule.style.animationName.split(',').map(n => n.trim())) {
            if (!animName || animName === 'none') continue;
            if (!collectedKeyframeNames.has(animName)) {
              collectedKeyframeNames.add(animName);
              const kf = findKeyframes(animName, allSheets);
              if (kf) parts.push(kf);
            }
          }
        }
      }
    }

    for (const sheet of allSheets) {
      try {
        const rules = sheet.cssRules || sheet.rules;
        processRules(rules);
      } catch (_) { /* cross-origin stylesheet — skip */ }
    }

    return parts.join('\n\n');
  });

  // ── Pass 2: Geometry Computed-Style ────────────────────────────────────────
  const geometry = await page.evaluate(() => {
    // Find the first *visible* nav element. Hidden elements (e.g. a mobile drawer that is
    // display:none on desktop) return height=0 from getBoundingClientRect, producing wrong
    // geometry. Candidates are tried in priority order; the first with a non-zero rect wins.
    function firstVisible(selectors) {
      for (const sel of selectors) {
        const all = Array.from(document.querySelectorAll(sel));
        for (const el of all) {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && r.height > 0) return el;
        }
      }
      // Nothing visible — return first match of any kind as a last resort
      for (const sel of selectors) {
        const el = document.querySelector(sel);
        if (el) return el;
      }
      return null;
    }
    const navEl = firstVisible(['nav', '[role="navigation"]', 'header']);
    if (!navEl) return {};

    const rect = navEl.getBoundingClientRect();
    const cs = getComputedStyle(navEl);

    const paddingLeft = parseFloat(cs.paddingLeft) || 0;
    const paddingRight = parseFloat(cs.paddingRight) || 0;
    const paddingInline = (paddingLeft + paddingRight) / 2;
    const position = cs.position;
    const height = rect.height;

    // Visible nav links sorted left to right
    const links = [...navEl.querySelectorAll('a')].filter(a => {
      const r = a.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    });
    links.sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left);

    // Gaps between adjacent link right-edge → next link left-edge
    const gaps = [];
    for (let i = 0; i < links.length - 1; i++) {
      const rA = links[i].getBoundingClientRect();
      const rB = links[i + 1].getBoundingClientRect();
      const gap = rB.left - rA.right;
      if (gap >= 0) gaps.push(gap);
    }

    let itemSpacing = null;
    if (gaps.length > 0) {
      const sorted = [...gaps].sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      itemSpacing = sorted.length % 2 === 0
        ? (sorted[mid - 1] + sorted[mid]) / 2
        : sorted[mid];
    }

    // Logo
    const logoEl = navEl.querySelector('img, svg, [class*="logo"], [class*="Logo"]');
    let logoWidth = null;
    let logoHeight = null;
    if (logoEl) {
      const lr = logoEl.getBoundingClientRect();
      if (lr.width > 0) logoWidth = lr.width;
      if (lr.height > 0) logoHeight = lr.height;
    }

    const result = { height, paddingInline, position };
    if (itemSpacing !== null) result.itemSpacing = itemSpacing;
    if (logoWidth !== null) result.logoWidth = logoWidth;
    if (logoHeight !== null) result.logoHeight = logoHeight;

    return result;
  });

  // Scroll transition detection (runs in Node.js context, outside page.evaluate)
  await page.evaluate(() => window.scrollTo(0, 80));
  await page.waitForTimeout(400);
  const heightScrolled = await page.evaluate(() => {
    const el = document.querySelector('nav, [role="navigation"]') ||
               document.querySelector('header');
    return el ? el.getBoundingClientRect().height : null;
  });
  await page.evaluate(() => window.scrollTo(0, 0));
  if (heightScrolled !== null && heightScrolled !== geometry.height) {
    geometry.heightScrolled = heightScrolled;
  }

  // ── Pass 3: LLM Analysis ───────────────────────────────────────────────────
  let llmResult = {};
  try {
    const userMessage = `Analyze this navigation CSS and geometry data and return a structured JSON object describing the navigation design system.

<CSS_SOURCE>
${filteredCSS}
</CSS_SOURCE>

<COMPUTED_GEOMETRY>
${JSON.stringify(geometry, null, 2)}
</COMPUTED_GEOMETRY>

Return a single JSON object with these keys (omit any key you cannot determine from the source):
{
  "geometry": {
    "height": "number (px)",
    "heightScrolled": "number (px) — only if different from height",
    "position": "fixed | sticky | absolute | static",
    "paddingInline": "number (px)",
    "itemSpacing": "number (px)",
    "logoPosition": "left | center | right",
    "alignment": "left | center | right — text/link alignment"
  },
  "background": {
    "backdropFilter": "string or null",
    "backdropFilterScrolled": "string or null",
    "borderBottom": "string or null",
    "borderBottomScrolled": "string or null",
    "boxShadow": "string or null",
    "boxShadowScrolled": "string or null",
    "transition": "string or null"
  },
  "typography": {
    "fontFamily": "string",
    "fontSize": "string",
    "fontWeight": "string or number",
    "letterSpacing": "string",
    "textTransform": "string",
    "lineHeight": "string"
  },
  "linkHover": {
    "fontWeight": "string or number — if changes on hover",
    "letterSpacing": "string — if changes on hover",
    "opacity": "number — if changes on hover",
    "backgroundPill": "boolean — true if hover shows a pill background",
    "backgroundPillBorderRadius": "string — if backgroundPill is true",
    "transition": "string",
    "underline": {
      "type": "none | border | pseudo-element | text-decoration",
      "thickness": "string",
      "offset": "string",
      "animation": {
        "property": "transform | width | opacity",
        "from": "string — e.g. scaleX(0)",
        "to": "string — e.g. scaleX(1)",
        "origin": "string — e.g. left, center",
        "duration": "string",
        "easing": "string"
      }
    }
  },
  "linkActive": {
    "selector": "string — the CSS selector used for active/current state",
    "fontWeight": "string or number",
    "indicator": "string — e.g. underline, dot, bold"
  },
  "scrollTransition": {
    "mechanism": "class-toggle | inline-style | none",
    "triggerClass": "string — the class added on scroll",
    "propertiesChanged": ["array of CSS property names that change"],
    "duration": "string",
    "easing": "string",
    "colorInversion": "boolean — true if nav inverts dark/light on scroll"
  },
  "dropdown": {
    "present": "boolean",
    "trigger": "hover | click",
    "borderRadius": "string",
    "boxShadow": "string",
    "padding": "string",
    "itemPadding": "string",
    "animation": "string"
  },
  "characterDescription": "1-2 sentence semantic summary of this navigation's personality and design intent"
}

Do NOT include any color hex values (#rrggbb or rgb/rgba) anywhere in the output — colors are handled by a separate extractor. Return only the JSON object, no markdown, no explanation.`;

    const rawOutput = await router.complete(
      [{ role: 'user', content: userMessage }],
      { systemPrompt: SYSTEM_PROMPT, timeout: 120000 }
    );

    const cleaned = rawOutput
      .replace(/^```(?:json)?\n?/m, '')
      .replace(/\n?```$/m, '')
      .trim();
    llmResult = JSON.parse(cleaned);
  } catch (err) {
    log.minor('LLM analysis failed', { error: err instanceof Error ? err.message : String(err) });
  }

  // Always nest computed geometry under a "geometry" key so the output shape is
  // consistently sectioned. Flat primitives from the computed pass would be invisible
  // to the renderer, which only renders object-valued top-level keys.
  // LLM geometry (semantic labels like logoPosition, alignment) supplements/overrides
  // the computed pixel values.
  return { ...llmResult, geometry: { ...geometry, ...(llmResult.geometry || {}) } };
}
