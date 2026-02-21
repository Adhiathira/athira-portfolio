import fs from 'fs';
import path from 'path';

export const metadata = { tag: 'consistency-notes' };

// ============================================================================
// HELPER UTILITIES
// ============================================================================

/**
 * Safely read and parse a JSON file. Returns null on any error.
 * @param {string} siteDir - Absolute or relative path to the site's output directory
 * @param {string} slug    - Sibling extractor slug (subdirectory name)
 * @param {string} filename - JSON filename inside that subdirectory
 */
function loadJson(siteDir, slug, filename) {
  const filePath = path.join(siteDir, slug, filename);
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.warn(`[consistency-notes] Failed to load ${filePath}: ${err.message}`);
    }
    return null;
  }
}

/**
 * Parse a CSS pixel value string to a number.
 * Returns null for non-pixel units (vw, rem, em, %) or unparseable strings.
 * @param {string} str - e.g. "128px", "0px", "1.5rem"
 * @returns {number|null}
 */
function parsePixelValue(str) {
  if (typeof str !== 'string') return null;
  const trimmed = str.trim();
  // Only accept bare-px values; skip viewport/font-relative units
  const match = trimmed.match(/^(-?\d+(?:\.\d+)?)px$/);
  if (!match) return null;
  const val = parseFloat(match[1]);
  return Number.isFinite(val) ? val : null;
}

/**
 * From spacing cssVars object { name: valueStr }, collect all parseable
 * pixel values into a Set<number>.
 * @param {Object} cssVars
 * @returns {Set<number>}
 */
function extractNumericSpacingScale(cssVars) {
  const scale = new Set();
  if (!cssVars || typeof cssVars !== 'object') return scale;
  for (const val of Object.values(cssVars)) {
    const n = parsePixelValue(val);
    if (n !== null && n > 0) scale.add(n);
  }
  return scale;
}

/**
 * Collect all numeric spacing values from the spacing elements map.
 * Walks every element's property values and parses pixel strings.
 * @param {Object} elements - spacing.elements
 * @returns {number[]}
 */
function collectElementSpacingValues(elements) {
  if (!elements || typeof elements !== 'object') return [];
  const values = [];
  const spacingProps = [
    'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
    'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
    'gap', 'rowGap', 'columnGap', 'borderRadius',
  ];
  for (const elementData of Object.values(elements)) {
    if (!elementData || typeof elementData !== 'object') continue;
    for (const prop of spacingProps) {
      const n = parsePixelValue(elementData[prop]);
      if (n !== null && n > 0) values.push(n);
    }
  }
  return values;
}

/**
 * Check whether a pixel value is within 1px of any value in the scale set.
 * @param {number} val
 * @param {Set<number>} scale
 * @returns {boolean}
 */
function isOnScale(val, scale) {
  for (const scaleVal of scale) {
    if (Math.abs(val - scaleVal) <= 1) return true;
  }
  return false;
}

// ============================================================================
// ANALYSIS PASSES
// ============================================================================

/**
 * Pass 2: Color consistency analysis
 */
function analyzeColors(colors, standardized, inconsistencies, hierarchy) {
  if (!colors) {
    inconsistencies.push({
      area: 'color',
      severity: 'low',
      observation: 'Color system data could not be loaded; no color analysis available.',
    });
    return;
  }

  const visual = Array.isArray(colors.visual) ? colors.visual : [];
  const cssVars = colors.cssVars && typeof colors.cssVars === 'object' ? colors.cssVars : {};
  const elements = colors.elements && typeof colors.elements === 'object' ? colors.elements : {};

  // Detect duplicate hex values across different roles in visual[]
  const hexToRoles = {};
  for (const entry of visual) {
    if (!entry || !entry.hex || !entry.role) continue;
    const hex = entry.hex.toLowerCase();
    if (!hexToRoles[hex]) hexToRoles[hex] = new Set();
    hexToRoles[hex].add(entry.role);
  }
  const duplicates = Object.entries(hexToRoles).filter(([, roles]) => roles.size > 1);
  if (duplicates.length > 0) {
    const examples = duplicates.slice(0, 2)
      .map(([hex, roles]) => `${hex} (${[...roles].join(', ')})`)
      .join('; ');
    inconsistencies.push({
      area: 'color',
      severity: 'medium',
      observation: `${duplicates.length} hex value(s) shared across multiple roles: ${examples}. This may indicate missing semantic token separation.`,
    });
  }

  // Flag weak token set (fewer than 3 visual roles)
  const distinctRoles = new Set(visual.map(e => e?.role).filter(Boolean));
  if (distinctRoles.size < 3 && visual.length > 0) {
    inconsistencies.push({
      area: 'color',
      severity: 'low',
      observation: `Only ${distinctRoles.size} distinct color role(s) identified in the visual pass. A minimal design system typically covers at least 3 roles (background, text, action).`,
    });
  }

  // Check CSS var naming prefix uniformity
  const varNames = Object.keys(cssVars);
  if (varNames.length > 0) {
    const prefixCounts = {};
    for (const name of varNames) {
      // prefix = everything before the first hyphen, or the full name
      const prefix = name.split('-')[0] || name;
      prefixCounts[prefix] = (prefixCounts[prefix] || 0) + 1;
    }
    const prefixCount = Object.keys(prefixCounts).length;
    if (prefixCount > 3) {
      inconsistencies.push({
        area: 'color',
        severity: 'low',
        observation: `${prefixCount} distinct CSS variable prefixes detected (${Object.keys(prefixCounts).slice(0, 4).join(', ')}...). This suggests multiple naming systems may be in use.`,
      });
    } else if (prefixCount <= 2) {
      standardized.push({
        area: 'color',
        observation: `CSS color variables use a consistent naming convention (${prefixCount} prefix group(s): ${Object.keys(prefixCounts).join(', ')}).`,
      });
    }
  }

  // Check for raw black/white in element map (may indicate missing token usage)
  const rawExact = ['#000000', '#ffffff'];
  const rawElements = Object.entries(elements)
    .filter(([, hex]) => rawExact.includes(typeof hex === 'string' ? hex.toLowerCase() : ''))
    .map(([role]) => role);
  if (rawElements.length > 0) {
    inconsistencies.push({
      area: 'color',
      severity: 'low',
      observation: `Pure #000000 or #ffffff values appear in computed output for (${rawElements.join(', ')}). These resolve to raw extremes; whether they originate from design tokens or hardcoded values cannot be determined from computed styles alone.`,
    });
  }

  // Note well-defined token set
  if (distinctRoles.size >= 5) {
    standardized.push({
      area: 'color',
      observation: `${distinctRoles.size} distinct color roles defined in the visual pass, indicating a well-developed token vocabulary (${[...distinctRoles].slice(0, 5).join(', ')}${distinctRoles.size > 5 ? ', ...' : ''}).`,
    });
  }

  // Semantic tokens: success/error/warning
  const semanticRoles = ['success', 'error', 'warning'];
  const foundSemantic = semanticRoles.filter(r => distinctRoles.has(r));
  if (foundSemantic.length > 0) {
    standardized.push({
      area: 'color',
      observation: `Semantic color roles present (${foundSemantic.join(', ')}), indicating the system communicates state through color conventions.`,
    });
  }

  // Hierarchy: heading vs body contrast
  const headingColor = elements.headingText;
  const bodyColor = elements.bodyText;
  if (headingColor && bodyColor) {
    if (headingColor === bodyColor) {
      hierarchy.push({
        area: 'color',
        clarity: 'partial',
        observation: 'Heading and body text share the same computed color, which reduces typographic hierarchy through color contrast.',
      });
    } else {
      hierarchy.push({
        area: 'color',
        clarity: 'clear',
        observation: 'Heading and body text use distinct computed colors, supporting visual hierarchy through color.',
      });
    }
  } else if (!headingColor && !bodyColor) {
    hierarchy.push({
      area: 'color',
      clarity: 'unclear',
      observation: 'Neither heading nor body element colors were captured; color hierarchy cannot be assessed.',
    });
  }
}

/**
 * Pass 3: Typography consistency analysis
 */
function analyzeTypography(typography, standardized, inconsistencies, hierarchy) {
  if (!typography) {
    inconsistencies.push({
      area: 'typography',
      severity: 'low',
      observation: 'Typography system data could not be loaded; no type analysis available.',
    });
    return;
  }

  const typeScale = typography.typeScale && typeof typography.typeScale === 'object'
    ? typography.typeScale
    : {};

  const headingLevels = ['h1', 'h2', 'h3', 'h4'];
  const headingEntries = headingLevels
    .filter(k => typeScale[k])
    .map(k => ({ level: k, data: typeScale[k] }));

  const bodyData = typeScale.body || typeScale.link || typeScale.nav;
  const headingFamilies = new Set(
    headingEntries
      .map(e => e.data?.fontFamily)
      .filter(Boolean)
  );
  const bodyFamily = bodyData?.fontFamily || null;

  // Multiple font families across headings
  if (headingFamilies.size > 1) {
    inconsistencies.push({
      area: 'typography',
      severity: 'medium',
      observation: `Headings use ${headingFamilies.size} different font families (${[...headingFamilies].join(', ')}). A consistent system typically uses one heading family.`,
    });
  }

  // 2-family system (body/nav/link share one, headings share another)
  const bodyRoles = ['body', 'link', 'nav'];
  const bodyFamilies = new Set(
    bodyRoles
      .filter(k => typeScale[k]?.fontFamily)
      .map(k => typeScale[k].fontFamily)
  );
  if (headingFamilies.size === 1 && bodyFamilies.size === 1) {
    const hf = [...headingFamilies][0];
    const bf = [...bodyFamilies][0];
    if (hf !== bf) {
      standardized.push({
        area: 'typography',
        observation: `Classic 2-family type system: headings use "${hf}" and body/nav/link use "${bf}". This pairing is a well-established design pattern.`,
      });
    } else {
      // Same family for heading and body
      inconsistencies.push({
        area: 'typography',
        severity: 'low',
        observation: `Headings and body text share the same font family ("${hf}"). Without typographic contrast, hierarchy relies entirely on size and weight.`,
      });
    }
  }

  // Heading size hierarchy check
  const headingSizes = headingEntries.map(e => ({
    level: e.level,
    size: parseFloat(e.data?.fontSize),
  })).filter(e => Number.isFinite(e.size));

  if (headingSizes.length >= 2) {
    let hierarchyViolations = 0;
    for (let i = 0; i < headingSizes.length - 1; i++) {
      // Each level should be strictly smaller than its parent
      if (headingSizes[i].size <= headingSizes[i + 1].size) {
        hierarchyViolations++;
        inconsistencies.push({
          area: 'typography',
          severity: 'medium',
          observation: `${headingSizes[i].level} (${headingSizes[i].size}px) is not larger than ${headingSizes[i + 1].level} (${headingSizes[i + 1].size}px), breaking the expected size hierarchy.`,
        });
      }
    }

    if (hierarchyViolations === 0) {
      hierarchy.push({
        area: 'typography',
        clarity: 'clear',
        observation: `Heading sizes decrease correctly from ${headingSizes[0].level} (${headingSizes[0].size}px) down to ${headingSizes[headingSizes.length - 1].level} (${headingSizes[headingSizes.length - 1].size}px), establishing clear visual hierarchy.`,
      });
    } else {
      hierarchy.push({
        area: 'typography',
        clarity: 'partial',
        observation: `${hierarchyViolations} heading level(s) violate the expected descending size order, resulting in a partially inconsistent typographic hierarchy.`,
      });
    }
  } else if (headingSizes.length === 0) {
    hierarchy.push({
      area: 'typography',
      clarity: 'unclear',
      observation: 'No heading sizes were extracted; typographic hierarchy cannot be assessed.',
    });
  }

  // Font faces as evidence of explicit loading
  const fontFaces = Array.isArray(typography.fontFaces) ? typography.fontFaces : [];
  if (fontFaces.length > 0) {
    standardized.push({
      area: 'typography',
      observation: `${fontFaces.length} @font-face declaration(s) found (${[...new Set(fontFaces.map(f => f.family))].join(', ')}), indicating explicit font loading control.`,
    });
  }
}

/**
 * Pass 4: Spacing consistency analysis
 */
function analyzeSpacing(spacing, standardized, inconsistencies) {
  if (!spacing) {
    inconsistencies.push({
      area: 'spacing',
      severity: 'low',
      observation: 'Spacing system data could not be loaded; no spacing analysis available.',
    });
    return;
  }

  const cssVars = spacing.cssVars && typeof spacing.cssVars === 'object' ? spacing.cssVars : {};
  const elements = spacing.elements && typeof spacing.elements === 'object' ? spacing.elements : {};

  const scale = extractNumericSpacingScale(cssVars);
  const elementValues = collectElementSpacingValues(elements);

  if (scale.size === 0 && elementValues.length === 0) {
    inconsistencies.push({
      area: 'spacing',
      severity: 'low',
      observation: 'No spacing CSS variables or measurable element spacing values were found; the spacing system may be entirely ad-hoc.',
    });
    return;
  }

  if (scale.size > 0 && elementValues.length > 0) {
    const onScaleCount = elementValues.filter(v => isOnScale(v, scale)).length;
    const ratio = onScaleCount / elementValues.length;
    const pct = Math.round(ratio * 100);

    if (ratio >= 0.7) {
      standardized.push({
        area: 'spacing',
        observation: `${pct}% of measured element spacing values align with the CSS variable scale (${scale.size} scale tokens), indicating strong token adoption.`,
      });
    } else if (ratio < 0.4) {
      inconsistencies.push({
        area: 'spacing',
        severity: 'medium',
        observation: `Only ${pct}% of element spacing values match the CSS token scale. Many elements appear to use arbitrary spacing rather than defined tokens.`,
      });
    } else {
      inconsistencies.push({
        area: 'spacing',
        severity: 'low',
        observation: `${pct}% of element spacing values align with the CSS token scale — partial adoption. Some elements deviate from the defined spacing system.`,
      });
    }
  } else if (scale.size === 0 && elementValues.length > 0) {
    inconsistencies.push({
      area: 'spacing',
      severity: 'medium',
      observation: `${elementValues.length} spacing values measured on elements but no spacing CSS variables found in :root. Spacing appears to be hardcoded rather than token-driven.`,
    });
  } else if (scale.size > 0 && elementValues.length === 0) {
    standardized.push({
      area: 'spacing',
      observation: `${scale.size} spacing CSS variable(s) defined but no element measurements captured. Token infrastructure exists even if adoption cannot be confirmed.`,
    });
  }
}

/**
 * Pass 5: Motion consistency analysis
 */
function analyzeMotion(motion, standardized, inconsistencies) {
  if (!motion) {
    // Motion data missing is not critical — many sites have little motion
    return;
  }

  const timingTokens = motion?.cssAnimations?.timingTokens;
  if (!timingTokens) return;

  const durations = Array.isArray(timingTokens.durations) ? timingTokens.durations : [];
  const easings = Array.isArray(timingTokens.easings) ? timingTokens.easings : [];

  // Duration consistency
  const uniqueDurations = new Set(durations);
  if (uniqueDurations.size <= 2 && uniqueDurations.size > 0) {
    standardized.push({
      area: 'motion',
      observation: `Only ${uniqueDurations.size} unique animation duration(s) in use (${[...uniqueDurations].join(', ')}), indicating consistent timing across the site.`,
    });
  } else if (uniqueDurations.size >= 4) {
    inconsistencies.push({
      area: 'motion',
      severity: 'low',
      observation: `${uniqueDurations.size} different animation durations detected (${[...uniqueDurations].slice(0, 4).join(', ')}${uniqueDurations.size > 4 ? ', ...' : ''}). Consolidating to 2-3 tokens would improve motion cohesion.`,
    });
  }

  // Easing consistency
  const uniqueEasings = new Set(easings);
  if (uniqueEasings.size === 1) {
    standardized.push({
      area: 'motion',
      observation: `A single easing function is used across all animations ("${[...uniqueEasings][0]}"), creating a unified motion feel.`,
    });
  } else if (uniqueEasings.size >= 3) {
    inconsistencies.push({
      area: 'motion',
      severity: 'low',
      observation: `${uniqueEasings.size} different easing functions detected, which can make motion feel inconsistent across interactions.`,
    });
  }
}

/**
 * Pass 6: Cross-system coherence analysis
 */
function analyzeCrossSystem(colors, components, interactions, standardized, inconsistencies) {
  const visual = colors ? (Array.isArray(colors.visual) ? colors.visual : []) : [];
  const distinctRoles = new Set(visual.map(e => e?.role).filter(Boolean));

  // Components exist but interactions are empty/missing
  const hasComponents = components && typeof components === 'object' && Object.keys(components).length > 0;
  const hasInteractions = interactions && typeof interactions === 'object' &&
    Object.values(interactions).some(group => group && Object.keys(group).length > 0);

  if (hasComponents && !hasInteractions) {
    inconsistencies.push({
      area: 'cross-system',
      severity: 'medium',
      observation: 'Component library data was captured but no interaction state definitions were found. Interactive components should have explicit hover, focus, and active state tokens.',
    });
  } else if (hasComponents && hasInteractions) {
    standardized.push({
      area: 'cross-system',
      observation: 'Both component definitions and interaction state data are present, suggesting the system addresses both structure and behavior.',
    });
  }

  // Semantic color roles present but check for form components
  const semanticRoles = ['success', 'error', 'warning'];
  const foundSemantic = semanticRoles.filter(r => distinctRoles.has(r));

  // Check for form-like components in components.json
  const componentKeys = hasComponents ? Object.keys(components) : [];
  const hasFormComponents = componentKeys.some(k =>
    /input|form|field|checkbox|radio|select|textarea/i.test(k)
  );

  if (hasFormComponents && foundSemantic.length === 0) {
    inconsistencies.push({
      area: 'cross-system',
      severity: 'medium',
      observation: 'Form components are present but no semantic color roles (success, error, warning) were identified. Form validation states may lack dedicated color tokens.',
    });
  } else if (hasComponents && !hasFormComponents && foundSemantic.length > 0) {
    inconsistencies.push({
      area: 'cross-system',
      severity: 'low',
      observation: `Semantic color roles (${foundSemantic.join(', ')}) are defined but no matching form components were found. Ensure semantic tokens are actually wired to components.`,
    });
  }

  // No data at all
  if (!hasComponents && !hasInteractions) {
    inconsistencies.push({
      area: 'cross-system',
      severity: 'low',
      observation: 'Neither component library nor interaction state data is available. Cross-system coherence cannot be assessed.',
    });
  }
}

// ============================================================================
// MAIN EXTRACT FUNCTION
// ============================================================================

export async function extract(page, { outputDir } = {}) {
  // Graceful degradation when outputDir is missing
  if (!outputDir) {
    return {
      standardized: [],
      inconsistencies: [{
        area: 'general',
        severity: 'high',
        observation: 'No outputDir was provided to the consistency-notes extractor; sibling data cannot be loaded.',
      }],
      hierarchy: [],
    };
  }

  // Pass 1: Derive siteDir and load all sibling JSON files
  // outputDir is relative (e.g. "design-system/siteName/consistency-notes")
  // Going up one level gives us "design-system/siteName/"
  const siteDir = path.join(outputDir, '..');

  const colors      = loadJson(siteDir, 'color-system',      'colors.json');
  const typography  = loadJson(siteDir, 'type-system',       'typography.json');
  const spacing     = loadJson(siteDir, 'spacing-system',    'spacing.json');
  const grid        = loadJson(siteDir, 'grid-system',       'grid.json');
  const components  = loadJson(siteDir, 'component-library', 'components.json');
  const interactions = loadJson(siteDir, 'interaction-states', 'interactions.json');
  const motion      = loadJson(siteDir, 'motion-system',     'motion.json');

  const standardized = [];
  const inconsistencies = [];
  const hierarchy = [];

  // Pass 2: Color consistency
  analyzeColors(colors, standardized, inconsistencies, hierarchy);

  // Pass 3: Typography consistency
  analyzeTypography(typography, standardized, inconsistencies, hierarchy);

  // Pass 4: Spacing consistency
  analyzeSpacing(spacing, standardized, inconsistencies);

  // Pass 5: Motion consistency
  analyzeMotion(motion, standardized, inconsistencies);

  // Pass 6: Cross-system coherence
  analyzeCrossSystem(colors, components, interactions, standardized, inconsistencies);

  // Grid note: provide a minimal observation if grid data was loaded
  if (grid) {
    const containers = Array.isArray(grid.containers) ? grid.containers : grid.container ? [grid.container] : [];
    if (containers.length > 0) {
      const maxWidths = [...new Set(containers.map(c => c.maxWidth).filter(Boolean))];
      if (maxWidths.length === 1) {
        standardized.push({
          area: 'layout',
          observation: `A single container max-width (${maxWidths[0]}) is used consistently across the grid system.`,
        });
      } else if (maxWidths.length > 1) {
        inconsistencies.push({
          area: 'layout',
          severity: 'low',
          observation: `${maxWidths.length} different container max-widths detected (${maxWidths.join(', ')}). Multiple container widths can create inconsistent page rhythm.`,
        });
      }
    }
  }

  // Ensure at least one entry in each array so callers always get structured output
  if (standardized.length === 0) {
    standardized.push({
      area: 'general',
      observation: 'No clearly standardized patterns were identified from the available data.',
    });
  }
  if (inconsistencies.length === 0) {
    inconsistencies.push({
      area: 'general',
      severity: 'low',
      observation: 'No obvious inconsistencies were detected from the available data.',
    });
  }
  if (hierarchy.length === 0) {
    hierarchy.push({
      area: 'general',
      clarity: 'unclear',
      observation: 'Insufficient data to assess design hierarchy across systems.',
    });
  }

  return { standardized, inconsistencies, hierarchy };
}
