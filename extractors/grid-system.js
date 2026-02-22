export const metadata = { tag: 'grid-system' };

import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { createLogger } from '../lib/logger.js';

const log = createLogger('grid-system');

const GRID_VAR_KEYWORDS = [
  'grid', 'column', 'columns', 'container', 'layout', 'gap', 'gutter', 'max-width', 'maxwidth',
];

const GRID_LLM_PROMPT = `You are analyzing screenshots of a website to understand its grid and layout system.
For each screenshot, identify:
- Section boundaries (where one section ends and another begins)
- Layout splits (2-column, 3-column, full-width, sidebar+content, etc.)
- The hero section structure (is it split left/right? full-width? overlapping text on image?)
- Card or feature grids (how many columns? equal or varied widths?)
- Any notable layout asymmetry or visual hierarchy
Describe only what is visible — no opinions, no solutions.
Return ONLY a JSON array (no markdown, no explanation):
[{ "section": "short-slug", "layout": "layout-type", "description": "1 sentence" }]`;

export async function extract(page, { outputDir, screenshotsDir } = {}) {
  const browserData = await page.evaluate(({ keywords }) => {

    // ─── Helpers ────────────────────────────────────────────────────────────────

    function isGridVar(name) {
      const lower = name.toLowerCase();
      return keywords.some(k => lower.includes(k));
    }

    function isVisible(el) {
      const cs = getComputedStyle(el);
      return cs.display !== 'none' && cs.visibility !== 'hidden' && parseFloat(cs.opacity) > 0;
    }

    // Counts space-separated track tokens in a computed grid-template-columns value.
    // Uses depth tracking to correctly skip spaces inside function arguments
    // like minmax(0px, 1fr) or repeat(3, 200px).
    function parseTrackCount(val) {
      if (!val || val === 'none' || val === 'subgrid') return 0;
      let depth = 0, count = 0, inToken = false;
      for (const ch of val) {
        if (ch === '(') depth++;
        else if (ch === ')') depth--;
        else if (ch === ' ' && depth === 0) {
          if (inToken) { count++; inToken = false; }
        } else {
          inToken = true;
        }
      }
      if (inToken) count++;
      return count;
    }

    // Builds a human-readable, object-key-safe label from element context.
    function deriveLabel(el, idx) {
      let label =
        el.getAttribute('aria-label') ||
        el.getAttribute('data-section') ||
        el.getAttribute('id') ||
        null;

      if (!label) {
        const heading = el.querySelector('h1, h2, h3');
        if (heading) {
          const text = heading.textContent.trim().slice(0, 30)
            .toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
          if (text) label = text;
        }
      }

      if (!label) {
        const cls = [...el.classList].find(
          c => c.length > 2 && c.length < 32 && /^[a-z]/i.test(c) && !/^js-/.test(c)
        );
        if (cls) label = cls;
      }

      const raw = (label || `grid-${idx}`).slice(0, 40);
      return raw.replace(/[^a-z0-9-_]/gi, '-').replace(/^-+|-+$/g, '') || `grid-${idx}`;
    }

    // Appends -2, -3, ... suffix to prevent key collisions.
    function uniqueKey(base, obj) {
      if (!obj[base]) return base;
      let i = 2;
      while (obj[`${base}-${i}`]) i++;
      return `${base}-${i}`;
    }

    // ─── Pass 1: CSS custom properties from :root ──────────────────────────────

    const cssVars = {};

    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (!rule.selectorText) continue;
          const isRoot = rule.selectorText.split(',').map(s => s.trim())
            .some(s => s === ':root' || s === 'html');
          if (!isRoot) continue;
          for (const prop of rule.style) {
            if (!prop.startsWith('--') || !isGridVar(prop)) continue;
            const val = rule.style.getPropertyValue(prop).trim();
            if (val) cssVars[prop.slice(2)] = val;
          }
        }
      } catch (_) { /* cross-origin sheet — skip */ }
    }

    // ─── Pass 2: Container detection ────────────────────────────────────────────
    //   Identifies the primary max-width constrained layout wrapper.
    //   getComputedStyle resolves `margin: auto` into actual pixel offsets, so
    //   centering is inferred from marginLeft ≈ marginRight (both > 0).

    const containerSelectors = [
      '[class*="container"]',
      '[class*="wrapper"]',
      '[class*="content-wrap"]',
      '[class*="page-wrap"]',
      '[class*="inner"]',
      '[class*="layout"]',
      'main',
      '[role="main"]',
    ];

    let bestContainer = null;
    let bestScore = -1;

    for (const sel of containerSelectors) {
      for (const el of [...document.querySelectorAll(sel)].slice(0, 15)) {
        if (!isVisible(el)) continue;
        const cs = getComputedStyle(el);
        const maxW = parseFloat(cs.maxWidth);
        if (!maxW || maxW < 320 || maxW > 2560) continue;

        let score = 10;
        const ml = parseFloat(cs.marginLeft) || 0;
        const mr = parseFloat(cs.marginRight) || 0;
        if (ml > 0 && mr > 0 && Math.abs(ml - mr) < 8) score += 5;
        if ((parseFloat(cs.paddingLeft) || 0) > 0 || (parseFloat(cs.paddingRight) || 0) > 0) score += 2;
        score += Math.min(3, Math.floor(maxW / 400));

        if (score > bestScore) { bestScore = score; bestContainer = el; }
      }
    }

    const container = {};
    if (bestContainer) {
      const cs = getComputedStyle(bestContainer);
      if (cs.maxWidth && cs.maxWidth !== 'none') container.maxWidth = cs.maxWidth;
      if (cs.paddingLeft && cs.paddingLeft !== '0px') container.paddingLeft = cs.paddingLeft;
      if (cs.paddingRight && cs.paddingRight !== '0px') container.paddingRight = cs.paddingRight;
    }

    // ─── Pass 3: Grid and flex layout inventory ──────────────────────────────────
    //   Flex rows require a non-zero gap to exclude inline navs and text-flow elements.
    //   Single-column grids are excluded — they carry no layout-pattern signal.

    const SKIP_GAP = new Set(['0px', 'normal', 'auto', '']);

    const layoutSelectors = [
      'header', 'nav', 'main', 'section', 'article', 'aside', 'footer',
      '[class*="grid"]',
      '[class*="row"]',
      '[class*="layout"]',
      '[class*="columns"]',
      '[class*="cards"]',
      '[class*="features"]',
      '[class*="pricing"]',
      '[class*="team"]',
      '[class*="services"]',
      '[class*="flex"]',
    ];

    const MAX_GRIDS = 15;
    const grids = {};
    const seenEls = new Set();
    let gridIdx = 0;

    // Returns the label of the nearest semantic ancestor section/article/header/footer.
    // Provides context for nested grids — e.g., a 3-col card grid "inside hero" vs
    // a standalone 3-col card grid are structurally identical but contextually different.
    const SECTION_TAGS = new Set(['section', 'article', 'aside', 'header', 'footer', 'nav']);
    function getNearestSectionLabel(el) {
      let cur = el.parentElement;
      while (cur && cur !== document.body) {
        if (SECTION_TAGS.has(cur.tagName.toLowerCase())) {
          return cur.getAttribute('aria-label') ||
                 cur.getAttribute('data-section') ||
                 cur.getAttribute('id') ||
                 cur.tagName.toLowerCase();
        }
        cur = cur.parentElement;
      }
      return null;
    }

    function captureGrid(el) {
      if (seenEls.has(el) || Object.keys(grids).length >= MAX_GRIDS) return;
      if (!isVisible(el)) return;

      const cs = getComputedStyle(el);
      const display = cs.display;

      if (display === 'grid' || display === 'inline-grid') {
        const templateCols = cs.gridTemplateColumns;
        if (!templateCols || templateCols === 'none' || templateCols === 'subgrid') return;
        const colCount = parseTrackCount(templateCols);
        if (colCount < 2) return;

        const entry = {
          display: 'grid',
          templateColumns: templateCols,
          columnCount: String(colCount),
        };

        const templateRows = cs.gridTemplateRows;
        if (templateRows && templateRows !== 'auto' && templateRows !== 'none') {
          entry.templateRows = templateRows;
        }

        const gap = cs.gap;
        if (gap && !SKIP_GAP.has(gap)) {
          entry.gap = gap;
        } else {
          const cg = cs.columnGap;
          const rg = cs.rowGap;
          if (cg && !SKIP_GAP.has(cg)) entry.columnGap = cg;
          if (rg && !SKIP_GAP.has(rg)) entry.rowGap = rg;
        }

        const childCount = [...el.children].filter(isVisible).length;
        if (childCount > 0) entry.childCount = String(childCount);

        const parentSection = getNearestSectionLabel(el);
        if (parentSection) entry.parentSection = parentSection;

        const label = uniqueKey(deriveLabel(el, ++gridIdx), grids);
        grids[label] = entry;
        seenEls.add(el);

      } else if (display === 'flex' || display === 'inline-flex') {
        const flexDir = cs.flexDirection;
        if (flexDir !== 'row' && flexDir !== 'row-reverse') return;

        const visibleChildren = [...el.children].filter(isVisible);
        if (visibleChildren.length < 2) return;

        const gap = cs.gap;
        if (!gap || SKIP_GAP.has(gap)) return;

        const entry = { display: 'flex', flexDirection: flexDir, gap };

        const flexWrap = cs.flexWrap;
        if (flexWrap && flexWrap !== 'nowrap') entry.flexWrap = flexWrap;

        const justifyContent = cs.justifyContent;
        if (justifyContent && justifyContent !== 'normal' && justifyContent !== 'flex-start') {
          entry.justifyContent = justifyContent;
        }

        const alignItems = cs.alignItems;
        if (alignItems && alignItems !== 'normal' && alignItems !== 'stretch') {
          entry.alignItems = alignItems;
        }

        entry.childCount = String(visibleChildren.length);

        const parentSection = getNearestSectionLabel(el);
        if (parentSection) entry.parentSection = parentSection;

        const label = uniqueKey(deriveLabel(el, ++gridIdx), grids);
        grids[label] = entry;
        seenEls.add(el);
      }
    }

    for (const sel of layoutSelectors) {
      if (Object.keys(grids).length >= MAX_GRIDS) break;
      for (const el of [...document.querySelectorAll(sel)].slice(0, 20)) {
        captureGrid(el);
        if (Object.keys(grids).length >= MAX_GRIDS) break;
      }
    }

    // Recursive DOM walk — finds grids at any nesting depth (e.g., hero section
    // with display:block whose inner div.hero__grid has display:grid).
    // Depth-limited to 5 levels to stay fast; caps at MAX_GRIDS.
    function walkNested(el, depth) {
      if (depth > 5 || Object.keys(grids).length >= MAX_GRIDS) return;
      captureGrid(el);
      for (const child of [...el.children].slice(0, 15)) {
        walkNested(child, depth + 1);
      }
    }
    if (Object.keys(grids).length < MAX_GRIDS) {
      const root = document.querySelector('main') || document.body;
      walkNested(root, 0);
    }

    // ─── Pass 4: Responsive breakpoint scan ─────────────────────────────────────

    const LAYOUT_PROPS = new Set([
      'grid-template-columns', 'grid-template-rows', 'display',
      'max-width', 'flex-direction', 'gap', 'column-gap', 'row-gap', 'flex-wrap',
    ]);

    const MAX_BREAKPOINTS = 8;
    const bpMap = {};

    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule.type !== CSSRule.MEDIA_RULE) continue;
          const conditionText = rule.conditionText || rule.media?.mediaText || '';
          const bpMatch = conditionText.match(/(\d+)px/);
          if (!bpMatch) continue;
          const bpPx = parseInt(bpMatch[1]);
          if (bpPx < 240 || bpPx > 3000) continue;

          const layoutChanges = {};
          for (const innerRule of rule.cssRules) {
            if (innerRule.type !== CSSRule.STYLE_RULE) continue;
            for (const prop of innerRule.style) {
              if (!LAYOUT_PROPS.has(prop)) continue;
              const val = innerRule.style.getPropertyValue(prop).trim();
              if (!val) continue;
              const camelKey = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
              if (!layoutChanges[camelKey]) layoutChanges[camelKey] = val;
            }
          }

          if (Object.keys(layoutChanges).length === 0) continue;

          const bpKey = `bp-${bpPx}px`;
          if (!bpMap[bpKey]) {
            bpMap[bpKey] = { query: conditionText, ...layoutChanges };
          } else {
            for (const [k, v] of Object.entries(layoutChanges)) {
              if (!bpMap[bpKey][k]) bpMap[bpKey][k] = v;
            }
          }
        }
      } catch (_) { /* cross-origin sheet — skip */ }
    }

    const responsive = {};
    for (const [key, val] of Object.entries(bpMap)
      .sort(([a], [b]) => parseInt(a.replace('bp-', '')) - parseInt(b.replace('bp-', '')))
      .slice(0, MAX_BREAKPOINTS)) {
      responsive[key] = val;
    }

    return { cssVars, container, grids, responsive };

  }, { keywords: GRID_VAR_KEYWORDS });

  // ─── Pass 5: Vision pass — LLM layout analysis from screenshots ─────────────
  // Reads existing screenshots from the shared site-level screenshotsDir.
  // Falls back to taking new screenshots if none are found (standalone run).
  // `visual` is an array → writer.js skips it for CSS, appears in grid.json only.

  let visual = [];

  let screenshotFiles = [];
  if (screenshotsDir && fs.existsSync(screenshotsDir)) {
    screenshotFiles = fs.readdirSync(screenshotsDir)
      .filter(f => f.startsWith('segment-') && f.endsWith('.png'))
      .sort()
      .map(f => path.join(screenshotsDir, f));
  }

  // Fallback: take screenshots now if none from color-system
  if (screenshotFiles.length === 0) {
    const { viewportHeight, scrollHeight } = await page.evaluate(() => ({
      viewportHeight: document.documentElement.clientHeight,
      scrollHeight: document.body.scrollHeight,
    }));
    const numSegments = Math.min(Math.ceil(scrollHeight / viewportHeight), 10);
    const tmpDir = screenshotsDir ?? path.join(outputDir ?? '.', 'screenshots');
    fs.mkdirSync(tmpDir, { recursive: true });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);
    for (let i = 0; i < numSegments; i++) {
      const filePath = path.join(tmpDir, `segment-${String(i + 1).padStart(2, '0')}.png`);
      await page.screenshot({ path: filePath });
      screenshotFiles.push(filePath);
      if (i < numSegments - 1) {
        await page.evaluate(h => window.scrollBy(0, h), Math.round(viewportHeight * 1.15));
        await page.waitForTimeout(1000);
      }
    }
  }

  if (screenshotFiles.length > 0) {
    const imageContent = screenshotFiles.map(f => ({
      type: 'image',
      source: { type: 'base64', media_type: 'image/png', data: fs.readFileSync(f).toString('base64') },
    }));
    const msg = JSON.stringify({
      type: 'user',
      message: {
        role: 'user',
        content: [...imageContent, { type: 'text', text: GRID_LLM_PROMPT }],
      },
    });
    const result = spawnSync(
      'claude',
      ['-p', '--input-format', 'stream-json', '--output-format', 'stream-json', '--verbose', '--allowedTools', ''],
      { input: msg, encoding: 'utf8', timeout: 180000, maxBuffer: 50 * 1024 * 1024 }
    );
    if (result.error || result.status !== 0) {
      log.minor('Vision pass failed', { error: result.error?.message ?? `exit ${result.status}` });
    } else {
      try {
        const resultLine = result.stdout?.split('\n').find(l => l.includes('"type":"result"'));
        const claudeResult = resultLine ? JSON.parse(resultLine) : null;
        if (claudeResult?.is_error) {
          log.minor('Vision pass API error', { result: claudeResult.result });
        } else {
          const rawOutput = claudeResult?.result ?? '';
          for (const match of rawOutput.matchAll(/\[[\s\S]*?\]/g)) {
            try {
              const parsed = JSON.parse(match[0]);
              if (Array.isArray(parsed) && parsed.length > 0) { visual = parsed; break; }
            } catch (_) { /* not valid JSON, try next */ }
          }
          if (visual.length === 0) log.minor('Vision pass returned no JSON array, ignoring');
        }
      } catch (_) {
        log.minor('Vision pass returned unparseable output, ignoring');
      }
    }
  }

  // ─── Pass 6: Layout tree — bounding boxes for wireframe reconstruction ─────
  // Captures document-relative pixel positions via getBoundingClientRect().
  // Page is at scrollY=0 (newPage() scrolls back to top), so viewport coords
  // equal document coords. Classifies each node's visual shape.
  // Written directly to outputDir/layout-tree.json (not via writer.js).

  const layoutTree = await page.evaluate(() => {

    function parseTrackCountForTree(val) {
      if (!val || val === 'none' || val === 'subgrid') return 0;
      let depth = 0, count = 0, inToken = false;
      for (const ch of val) {
        if (ch === '(') depth++;
        else if (ch === ')') depth--;
        else if (ch === ' ' && depth === 0) {
          if (inToken) { count++; inToken = false; }
        } else { inToken = true; }
      }
      if (inToken) count++;
      return count;
    }

    function classifyShape(el, cs, rect) {
      const br = parseFloat(cs.borderRadius) || 0;
      const minDim = Math.min(rect.width, rect.height);
      if (br >= minDim / 2 - 2 && minDim > 0) return 'circle';
      if (br > 4) return 'rounded-rect';
      return 'rect';
    }

    function safeKey(raw, idx) {
      const k = (raw || `node-${idx}`).slice(0, 30).replace(/[^a-z0-9-_]/gi, '-').replace(/^-+|-+$/g, '');
      return k || `node-${idx}`;
    }

    function usedKeys(obj) {
      return key => {
        if (!obj[key]) return key;
        let i = 2; while (obj[`${key}-${i}`]) i++;
        return `${key}-${i}`;
      };
    }

    function buildNode(el, depth) {
      if (depth > 4) return null;
      const rect = el.getBoundingClientRect();
      if (rect.width < 10 || rect.height < 10) return null;
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0) return null;

      const node = {
        type: el.tagName.toLowerCase(),
        bounds: { x: Math.round(rect.left), y: Math.round(rect.top), w: Math.round(rect.width), h: Math.round(rect.height) },
        shape: classifyShape(el, cs, rect),
      };

      // Layout info for grid/flex containers
      const display = cs.display;
      if (display === 'grid' || display === 'inline-grid') {
        const cols = parseTrackCountForTree(cs.gridTemplateColumns);
        node.layout = { display: 'grid', ...(cols > 0 && { columns: cols }) };
        const gap = cs.gap;
        if (gap && gap !== 'normal' && gap !== '0px') node.layout.gap = gap;
      } else if (display === 'flex' || display === 'inline-flex') {
        node.layout = { display: 'flex', direction: cs.flexDirection };
        const gap = cs.gap;
        if (gap && gap !== 'normal' && gap !== '0px') node.layout.gap = gap;
      }

      // Stacking context / positioning
      const pos = cs.position;
      if (pos === 'fixed' || pos === 'sticky' || pos === 'absolute') node.position = pos;

      // Recurse into significant children (not too many, not too small)
      const significantChildren = [...el.children].filter(c => {
        const cr = c.getBoundingClientRect();
        const ccs = getComputedStyle(c);
        return cr.width >= 20 && cr.height >= 20 && ccs.display !== 'none';
      });

      if (significantChildren.length > 0 && significantChildren.length <= 20) {
        const children = {};
        const makeKey = usedKeys(children);
        significantChildren.forEach((child, i) => {
          const childNode = buildNode(child, depth + 1);
          if (!childNode) return;
          const rawKey = child.getAttribute('id') ||
            child.getAttribute('aria-label') ||
            [...child.classList].find(c => c.length > 2 && c.length < 32) ||
            `${child.tagName.toLowerCase()}-${i + 1}`;
          const key = makeKey(safeKey(rawKey, i + 1));
          children[key] = childNode;
        });
        if (Object.keys(children).length > 0) node.children = children;
      }

      return node;
    }

    // Capture top-level structural elements
    const root = {};
    const makeRootKey = usedKeys(root);
    const topLevelEls = [
      ...document.querySelectorAll('body > header, body > nav, body > main, body > footer, body > div'),
      ...document.querySelectorAll('header, nav:not(header nav), main, footer'),
    ];
    const seen = new Set();
    [...topLevelEls].slice(0, 20).forEach((el, i) => {
      if (seen.has(el)) return;
      seen.add(el);
      const node = buildNode(el, 0);
      if (!node) return;
      const rawKey = el.getAttribute('id') || el.getAttribute('aria-label') ||
        [...el.classList].find(c => c.length > 2 && c.length < 32) || el.tagName.toLowerCase();
      root[makeRootKey(safeKey(rawKey, i + 1))] = node;
    });

    return root;
  });

  // Write layout-tree.json directly (not via writer.js)
  if (outputDir) {
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(path.join(outputDir, 'layout-tree.json'), JSON.stringify(layoutTree, null, 2), 'utf8');
  }

  // ─── Pass 7: Markdown design brief ──────────────────────────────────────────
  // Sends screenshots to Claude with a designer-brief prompt.
  // Writes layout.md directly to outputDir.
  // Graceful fallback: skip if no screenshots or CLI fails.

  const MARKDOWN_PROMPT = `You are a senior UX designer describing a website's layout system to your team.
Analyze these screenshots and write a detailed, plain-English layout brief covering:
1. Overall page structure (how many major sections, general flow)
2. Header/navigation layout
3. Hero section (full-width? split columns? overlapping elements? floating boxes?)
4. Each content section below the hero (grid, two-column, cards, asymmetric, etc.)
5. Footer layout
6. Any notable layout patterns: sticky elements, full-bleed images, overlapping layers, floating elements
Write as a designer: describe visual relationships, proportions, spatial rhythm, and hierarchy.
No code, no CSS. Write in clear markdown with section headers.`;

  let layoutMd = '';
  if (screenshotFiles.length > 0) {
    const imageContent = screenshotFiles.map(f => ({
      type: 'image',
      source: { type: 'base64', media_type: 'image/png', data: fs.readFileSync(f).toString('base64') },
    }));
    const mdMsg = JSON.stringify({
      type: 'user',
      message: {
        role: 'user',
        content: [...imageContent, { type: 'text', text: MARKDOWN_PROMPT }],
      },
    });
    const mdResult = spawnSync(
      'claude',
      ['-p', '--input-format', 'stream-json', '--output-format', 'stream-json', '--verbose', '--allowedTools', ''],
      { input: mdMsg, encoding: 'utf8', timeout: 180000, maxBuffer: 50 * 1024 * 1024 }
    );
    if (mdResult.error || mdResult.status !== 0) {
      log.minor('Markdown brief failed', { error: mdResult.error?.message ?? `exit ${mdResult.status}` });
    } else {
      try {
        const resultLine = mdResult.stdout?.split('\n').find(l => l.includes('"type":"result"'));
        const claudeResult = resultLine ? JSON.parse(resultLine) : null;
        if (claudeResult && !claudeResult.is_error) layoutMd = claudeResult.result ?? '';
      } catch (_) {
        log.minor('Markdown brief output unparseable, skipping');
      }
    }
  }

  // ─── Pass 8: Genericize layout markdown ────────────────────────────────────
  // Strips site-specific content (brand names, industry jargon, product features)
  // and replaces with generic placeholders while preserving layout structure descriptions.
  // Graceful fallback: returns original markdown if genericization fails.

  if (outputDir && layoutMd) {
    const genericMd = await genericizeLayoutMarkdown(layoutMd);
    fs.writeFileSync(path.join(outputDir, 'layout.md'), genericMd, 'utf8');
  }

  return { ...browserData, visual };
}

// ─── Helper: Genericize Layout Markdown ─────────────────────────────────────

const GENERICIZE_PROMPT = `You are editing a design brief to make it reusable across projects.

TASK: Remove all site-specific content from this markdown document while preserving ALL layout and design structure descriptions.

REMOVE (replace with generic placeholders):
- Brand names → "Brand Name", "Product Name", "Company"
- Industry jargon → generic equivalents (e.g., "fertilizer" → "product", "crops" → "target audience")
- Product features → "Feature A", "Feature B", "key differentiator"
- Specific statistics → "[Stat]", "[Number]", or omit entirely if not structural
- CTAs with specific text → "Primary CTA", "Secondary CTA", "Action Button"
- Named products/services → "Product 1", "Product 2", "Service A"
- Industry-specific terminology → generic business terms

PRESERVE EXACTLY (do not change):
- Layout structure descriptions: "2-column split", "asymmetric", "full-bleed", "floating card"
- Spatial measurements: "40% width", "60% height", "30/70 split"
- Design pattern names: "hero section", "sticky header", "grid layout"
- Visual hierarchy terms: "generous padding", "negative space", "overlapping elements"
- Layout techniques: "z-index layering", "parallax", "fixed positioning"
- Typographic scale references: "large display heading", "body copy"
- Color role references (keep generic): "dark background", "light panel" (but remove "olive green" → "dark background")

OUTPUT: Return ONLY the genericized markdown. No explanations, no preamble, no code fences.`;

async function genericizeLayoutMarkdown(layoutMd) {
  if (!layoutMd || layoutMd.trim().length === 0) {
    return layoutMd; // nothing to genericize
  }

  const msg = JSON.stringify({
    type: 'user',
    message: {
      role: 'user',
      content: [
        { type: 'text', text: GENERICIZE_PROMPT },
        { type: 'text', text: '\n\n---LAYOUT MARKDOWN TO GENERICIZE---\n\n' + layoutMd },
      ],
    },
  });

  const result = spawnSync(
    'claude',
    ['-p', '--input-format', 'stream-json', '--output-format', 'stream-json', '--verbose', '--allowedTools', ''],
    { input: msg, encoding: 'utf8', timeout: 180000, maxBuffer: 50 * 1024 * 1024 }
  );

  if (result.error || result.status !== 0) {
    log.minor('Pass 8 genericization failed', { error: result.error?.message ?? `exit ${result.status}` });
    return layoutMd; // FALLBACK: return original
  }

  try {
    const resultLine = result.stdout?.split('\n').find(l => l.includes('"type":"result"'));
    const claudeResult = resultLine ? JSON.parse(resultLine) : null;

    if (claudeResult?.is_error) {
      log.minor('Pass 8 API error', { result: claudeResult.result });
      return layoutMd; // FALLBACK
    }

    const genericized = claudeResult?.result?.trim() ?? '';

    if (genericized.length < 100) {
      // Suspiciously short response, likely failed
      log.minor('Pass 8 returned suspiciously short output, using original');
      return layoutMd;
    }

    return genericized;

  } catch (err) {
    log.minor('Pass 8 output unparseable', { error: err.message });
    return layoutMd; // FALLBACK
  }
}
