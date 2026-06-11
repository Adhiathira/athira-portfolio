import fs from 'fs';
import os from 'os';
import path from 'path';
import { LLMRouter, ClaudeCliProvider, OpenRouterProvider } from '../lib/llm/index.js';
import { createLogger } from '../lib/logger.js';

export const metadata = { tag: 'concept-summary' };

const log = createLogger('concept-summary');

const router = new LLMRouter({
  providers: {
    'claude-cli': new ClaudeCliProvider(),
    'openrouter': new OpenRouterProvider(),
  },
  // defaultProvider reads from LLM_DEFAULT_PROVIDER env var, falls back to 'claude-cli'
  maxAttempts: 2,
});

const CONCEPT_PROMPT = `You are a **senior UX designer and frontend interaction analyst**.

Analyze the attached **screenshots of a website captured at different scroll positions** — above-fold (hero), mid-page (content sections), and bottom (footer) — and produce a **deep technical breakdown of the visual design system, layout behavior, media composition strategies, and structural UX patterns observed across the interface**.

Your response should be written in **clear English using professional UX/UI and frontend interaction terminology commonly used by product designers and frontend engineers**.

The goal is **not to describe the page sequentially**, but to **reverse-engineer the design patterns and layout systems used across the interface** so that a designer could understand how the design system and layout grammar work.

---

# Important Instructions

* Do **NOT generate code** (HTML, CSS, JavaScript, CSS properties, etc.).
* Do **NOT provide implementation snippets or technical code examples**.
* Do **NOT describe animations, scroll effects, hover states, or any dynamic behavior** — you are analyzing static screenshots only.
* Focus only on **visual structure, layout patterns, media composition, typographic hierarchy, color system, and design system characteristics** visible in the screenshots.
* Do **NOT mention the brand name, company name, product name, or any identifying information about the website**.
* Do **NOT speculate about the company, product, or industry behind the website**.

Refer to the interface only using neutral terms such as "the page", "the interface", "the layout", "the navigation bar", "the hero section", "the section", "the component".

---

# Analysis Instructions

You are provided **3 screenshots**: above-fold, mid-page, and footer. Do not analyze them in order — instead:

* Identify **distinct section design patterns** visible across all three
* Group **visually similar sections together**
* Treat repeated patterns as **a single reusable pattern**
* Focus on **how sections differ from each other visually and structurally**

The objective is to **extract the reusable layout modules and visual patterns** used throughout the interface.

---

# Section Design Pattern Extraction

Identify the **distinct section design patterns** visible across the screenshots.

Examples include: hero storytelling sections, split media-text sections, feature grids, card grid sections, testimonial sections, CTA conversion sections, newsletter or form sections, footer sections, editorial storytelling sections.

If the same design pattern appears multiple times, **treat it as one pattern**.

For each pattern, analyze the following:

---

# 1. Internal Section Organization

Describe how content is structured **within the section**.

Identify layout zones: headline area, supporting text block, media area, card grid, CTA cluster, form inputs, background decorative layer, overlay text container.

Explain whether the section uses: split screen, centered editorial, stacked vertical, card grid, asymmetric, media-dominant, or layered background composition.

Describe whether the layout feels grid-driven, composition-driven, media-driven, editorial, content-dense, or minimal.

---

# 2. Grid System and Spacing System

Analyze the **underlying grid structure and spacing rhythm**.

Describe: whether elements align to consistent columns, whether the layout is container-based or full-width, whether margins and gutters are consistent, and whether spacing follows a modular scale.

Observe: internal padding inside cards, vertical spacing between content blocks, and spacing rhythm between sections.

Explain how spacing contributes to readability, visual hierarchy, and layout clarity.

---

# 3. Media Composition and Art Direction

Identify all static visual media visible in the screenshots (photography, illustration, 3D renders, decorative graphics, background imagery).

Describe: whether media is foreground content or background layer, whether it spans full width or sits in containers, and whether imagery appears art-directed to support the layout.

Look for: subjects positioned off-center, large negative space reserved for text, simplified background regions designed as **text-safe zones**, and imagery that anchors the layout rather than merely decorating it.

---

# 4. Visual Composition and Layout Intent

Analyze how **visual composition influences UI placement**.

Look for: text placed in visually quiet image areas, imagery acting as layout anchors, full-width imagery with embedded UI, and layered compositions where text floats above media.

Explain whether the layout behaves as editorial storytelling, image-driven narrative design, structured grid UI, or composition-driven interface design.

---

# 5. Background and Section Design Behavior

Analyze how section backgrounds behave across the screenshots.

Describe whether backgrounds use solid colors, gradients, photography, textures, or decorative shapes. Observe whether background colors alternate between sections, whether light-to-dark or dark-to-light transitions occur, and whether graphic motifs repeat.

Explain how backgrounds create visual separation, pacing, and narrative transitions across the page.

---

# 6. Depth, Layering, and Visual Hierarchy

Analyze whether the interface uses **depth cues**: shadows, floating elements, overlapping content, layered graphics, foreground vs background separation.

Explain whether the interface feels flat, lightly layered, or strongly dimensional.

---

# 7. Component Styling (Borders, Surfaces, Elevation)

Observe how UI components are styled: visible borders, thin or thick outlines, subtle separators, background contrast, elevation shadows.

Observe whether visual separation relies primarily on borders, shadows, whitespace, or color contrast. Explain whether component styling changes across section patterns.

---

# 8. Shape Language

Analyze the **corner radius and geometric style**: sharp corners, slightly rounded corners, heavily rounded shapes, pill-shaped buttons or inputs.

Explain whether shape language is consistent across components or varies by section.

---

# 9. Section Divider Geometry

Analyze how sections are visually separated: straight horizontal edges, curved shapes, wave-like separators, diagonal transitions, layered background graphics.

Explain how section dividers influence visual flow and pacing.

---

# Hero Section Analysis (Above-Fold Screenshot)

Analyze the above-fold screenshot in detail:

* Background type: full-bleed image, static color, gradient, or dark/light field
* Viewport coverage: full-height or partial
* Text placement: centered, left-aligned, bottom-anchored, or overlaid on media
* Headline scale and contrast relative to body text
* CTA count and button style: ghost, filled, pill, or underlined link
* Scroll indicator presence and type (if visible as a static element)
* Navigation bar visual state at top of page: transparent, solid, blurred, or colored

---

# Footer Section Analysis (Bottom Screenshot)

Analyze the footer screenshot in detail:

* Column count and link grouping structure
* Typographic treatment relative to body: smaller scale, lower weight, uppercase or lowercase
* Logo or wordmark presence
* Newsletter form or CTA presence
* Social link treatment
* Legal and copyright text style
* Overall visual weight: dark, light, brand color, or neutral

---

# Navigation Bar Analysis

From whichever screenshot shows the navigation most clearly:

* Layout zones: logo position, link alignment, CTA placement
* Number and style of navigation items (short labels vs descriptive phrases)
* Visual differentiation between navigation links and CTA buttons
* Background treatment: transparent, solid, blurred, or colored
* Whether it appears fixed, floating, or inline with page content

---

# Section Differentiation Analysis

For each section pattern identified, explain **how it differs visually and structurally from the sections around it**.

Focus on: background style changes, layout structure shifts, media density changes, typography scale changes, color palette changes, spacing rhythm variations, and introduction of new UI components.

---

# Design System Signals Across Sections

Analyze whether design system elements remain consistent across the interface.

Observe consistency in: button styles, card styles, border styles, corner radius, spacing scale, typography hierarchy, color usage, and component reuse.

Explain where **consistency is maintained** and where **deliberate variation appears**.

---

# Color System and Visual Hierarchy

Analyze the color system across the screenshots.

Describe: dominant background colors, accent colors, CTA colors, and contrast levels between text and backgrounds. Use specific color values from the extracted design tokens where available.

Explain how color supports emphasis, hierarchy, and grouping.

---

# Typography System

Analyze the typography hierarchy visible in the screenshots.

Describe: headline scale, subheading scale, body text scale, label and caption scale, and any decorative or display typography. Use specific font names and sizes from the extracted design tokens where available.

Explain how typography supports readability, hierarchy, and visual identity.

---

# Visual Affordances

Identify how the interface visually signals **interactive elements** in the static screenshots.

Look for: button visual style (filled, outlined, pill), card border or shadow suggesting clickability, underlined or colored links, form input styling, and any visual differentiation between interactive and non-interactive elements.

---

# Section Transitions

Analyze how the interface visually transitions between sections visible across the screenshots.

Look for: background color shifts, media density changes, typography scale changes, decorative separators, overlapping sections, whitespace expansion or contraction.

---

# Notable UX/UI Design Observations

Identify **3–5 distinctive design patterns** present across the interface.

Examples: art-directed hero compositions, editorial storytelling layouts, image-safe typography zones, composition-driven UI placement, creative section dividers, distinctive grid systems, unusual typographic scale contrasts, strong use of negative space.

Explain **why these patterns are notable from a UX/UI design perspective**.`;

/**
 * Safely read and parse a JSON file. Returns null on any error.
 */
function loadJson(siteDir, slug, filename) {
  const filePath = path.join(siteDir, slug, filename);
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    if (err.code !== 'ENOENT') {
      log.minor(`Failed to load ${filePath}`, { error: err.message });
    }
    return null;
  }
}

export async function extract(page, { outputDir, screenshotsDir } = {}) {
  // Step 1: Load sibling extractor data
  const siteDir = outputDir ? path.join(outputDir, '..') : null;

  const siblingData = {};
  if (siteDir) {
    const siblings = [
      { slug: 'color-system',       file: 'colors.json' },
      { slug: 'type-system',        file: 'typography.json' },
      { slug: 'spacing-system',     file: 'spacing.json' },
      { slug: 'grid-system',        file: 'grid.json' },
{ slug: 'interaction-states', file: 'interactions.json' },
    ];
    for (const { slug, file } of siblings) {
      const data = loadJson(siteDir, slug, file);
      if (data !== null) siblingData[slug] = data;
    }
  }

  // Step 2: Capture above-fold and mid-page screenshots
  const screenshotDir = screenshotsDir ?? (outputDir ? path.join(outputDir, 'screenshots') : os.tmpdir());
  const persistScreenshots = !!(screenshotsDir || outputDir);
  if (persistScreenshots) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const screenshotFiles = [];

  // Above-fold screenshot (position 0)
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);
  const aboveFoldPath = path.join(screenshotDir, 'concept-above-fold.jpg');
  await page.screenshot({ path: aboveFoldPath, type: 'jpeg', quality: 80 });
  screenshotFiles.push(aboveFoldPath);

  // Mid-page screenshot (~50% scroll)
  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  const viewportHeight = await page.evaluate(() => document.documentElement.clientHeight);
  const midScrollY = Math.max(0, Math.floor((pageHeight - viewportHeight) * 0.5));
  await page.evaluate(y => window.scrollTo(0, y), midScrollY);
  await page.waitForTimeout(1000);
  const midPagePath = path.join(screenshotDir, 'concept-mid-page.jpg');
  await page.screenshot({ path: midPagePath, type: 'jpeg', quality: 80 });
  screenshotFiles.push(midPagePath);

  // Bottom-of-page screenshot (footer)
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  const footerPath = path.join(screenshotDir, 'concept-footer.jpg');
  await page.screenshot({ path: footerPath, type: 'jpeg', quality: 80 });
  screenshotFiles.push(footerPath);

  // Read screenshots as base64
  const imageContent = screenshotFiles.map(f => ({
    type: 'image',
    source: { type: 'base64', media_type: 'image/jpeg', data: fs.readFileSync(f).toString('base64') },
  }));

  // Clean up temp screenshots only if not persisting
  if (!persistScreenshots) {
    for (const f of screenshotFiles) {
      try { fs.unlinkSync(f); } catch (_) {}
    }
  }

  // Step 3: Build prompt text with all sibling JSON data
  const dataBlocks = Object.entries(siblingData)
    .map(([slug, data]) => `### ${slug}\n\`\`\`json\n${JSON.stringify(data, null, 2)}\n\`\`\``)
    .join('\n\n');

  const promptText = dataBlocks.length > 0
    ? `The following design tokens were extracted from this website:\n\n${dataBlocks}\n\n---\n\n${CONCEPT_PROMPT}`
    : CONCEPT_PROMPT;

  // Step 4: Build LLMRouter content blocks and call the router.
  // Convert imageContent (which uses the Anthropic stream-json shape) to the
  // internal ImageBlock shape that LLMRouter expects: { type, data, mimeType }.
  const imageBlocks = imageContent.map(img => ({
    type: /** @type {'image'} */ ('image'),
    data: img.source.data,
    mimeType: /** @type {'image/png'} */ (img.source.media_type),
  }));

  const userContent = [
    ...imageBlocks,
    { type: /** @type {'text'} */ ('text'), text: promptText },
  ];

  let markdownOutput = '';
  try {
    log.debug('Calling LLMRouter for concept summary', { imageCount: imageBlocks.length });
    markdownOutput = await router.complete(
      [{ role: 'user', content: userContent }],
      { timeout: 180000 }
    );
    log.debug('Concept summary generation complete', { chars: markdownOutput.length });
  } catch (err) {
    log.major('Concept summary generation failed', { error: err instanceof Error ? err.message : String(err) });
    throw err;
  }

  // Step 5: Return the markdown string directly.
  return markdownOutput;
}
