import { createLogger } from '../lib/logger.js';

export const metadata = {
  name: 'Interaction States',
  description: 'Extracts hover, focus, active, disabled states from interactive components',
  version: '1.0.0',
  tag: 'interaction-states'
};

const log = createLogger('interaction-states');

const MAX_PER_CATEGORY = 5;
const STATE_TRANSITION_WAIT = 300; // ms

/**
 * Pass 1: Discover interactive elements and capture their default state
 */
async function discoverInteractiveElements(page) {
  return await page.evaluate(() => {
    // Helper: visibility check
    function isVisible(el) {
      const cs = getComputedStyle(el);
      return cs.display !== 'none' &&
             cs.visibility !== 'hidden' &&
             parseFloat(cs.opacity) > 0 &&
             el.offsetWidth > 0 &&
             el.offsetHeight > 0;
    }

    // Helper: pick most information-rich visible element
    function bestMatch(selector, maxCandidates = 10) {
      const candidates = [...document.querySelectorAll(selector)]
        .slice(0, maxCandidates)
        .filter(isVisible);
      // For interaction states, prioritize first visible (most prominent)
      return candidates[0] || null;
    }

    // Helper: extract relevant CSS properties for state comparison
    function extractRelevantStyles(cs) {
      const TRACKED_PROPS = [
        'backgroundColor', 'color', 'borderColor', 'borderWidth',
        'boxShadow', 'outlineColor', 'outlineWidth', 'outlineStyle',
        'opacity', 'transform', 'fontWeight', 'textDecoration',
        'cursor', 'pointerEvents', 'transition', 'filter',
        'backgroundImage', 'borderStyle', 'scale'
      ];

      const styles = {};
      for (const prop of TRACKED_PROPS) {
        const val = cs[prop];
        // Skip non-informative defaults
        if (!val || val === 'none' || val === 'normal' || val === 'auto' || val === 'rgba(0, 0, 0, 0)') continue;
        styles[prop] = val;
      }
      return styles;
    }

    // Helper: generate unique selector for Playwright to target
    function generateUniqueSelector(el) {
      if (el.id) return `#${CSS.escape(el.id)}`;

      const tagName = el.tagName.toLowerCase();
      const classes = [...el.classList].slice(0, 2).map(c => CSS.escape(c)).join('.');
      if (classes) return `${tagName}.${classes}`;

      // Fallback: nth-of-type
      const parent = el.parentElement;
      if (parent) {
        const siblings = [...parent.children].filter(e => e.tagName === el.tagName);
        const index = siblings.indexOf(el) + 1;
        return `${tagName}:nth-of-type(${index})`;
      }

      return tagName;
    }

    // Define selectors per category
    const categories = {
      buttons: ['button', '[role="button"]', '[class*="button"]', '[class*="btn"]'],
      inputs: [
        'input[type="text"]',
        'input[type="email"]',
        'input[type="search"]',
        'input[type="password"]',
        'input[type="tel"]',
        'input[type="url"]',
        'input[type="number"]',
        'input[type="date"]',
        'textarea',
        '[contenteditable="true"]'
      ],
      links: ['a[href]'],
      cards: ['[class*="card"]', 'article'],
      navigation: ['nav a', 'header a', '[role="navigation"] a']
    };

    // Map category names to element types
    const categoryToType = {
      buttons: 'button',
      inputs: 'input',
      links: 'link',
      cards: 'card',
      navigation: 'link' // Navigation items are links
    };

    const discovered = {};
    for (const [category, selectors] of Object.entries(categories)) {
      discovered[category] = [];
      const seenElements = new Set(); // Track by element reference, not selector

      for (const selector of selectors) {
        // Try to find multiple matches per selector type
        const candidates = [...document.querySelectorAll(selector)]
          .filter(isVisible)
          .slice(0, 10); // Check up to 10 candidates per selector

        for (const el of candidates) {
          // Stop if we already have enough elements for this category
          if (discovered[category].length >= 5) break;

          // Skip if we've already captured this exact element
          if (seenElements.has(el)) continue;
          seenElements.add(el);

          const uniqueSelector = generateUniqueSelector(el);

          // Calculate this element's index among all matches for its selector
          // This ensures we can reliably target it with .nth(index) in Pass 2
          const allMatches = [...document.querySelectorAll(uniqueSelector)];
          const selectorIndex = allMatches.indexOf(el);

          // Derive variant from classes (primary, secondary, etc.)
          const classList = [...el.classList];
          const variant = classList.find(c => /primary|secondary|tertiary|outline|ghost|text/.test(c)) || 'default';

          // Capture default state
          const cs = getComputedStyle(el);
          const defaultState = extractRelevantStyles(cs);

          discovered[category].push({
            selector: uniqueSelector,
            selectorIndex, // Index to use with .nth()
            variant,
            type: categoryToType[category],
            defaultState
          });
        }

        // Stop searching if we have enough elements
        if (discovered[category].length >= 5) break;
      }
    }

    return discovered;
  });
}

/**
 * Helper: compare two state objects for equality
 */
function areStatesIdentical(state1, state2) {
  return JSON.stringify(state1) === JSON.stringify(state2);
}

/**
 * Pass 2: Capture element states using Playwright interactions
 */
async function captureElementStates(page, element) {
  // Use .nth(selectorIndex) to target the exact element from Pass 1
  const locator = page.locator(element.selector).nth(element.selectorIndex);
  const states = {
    selector: element.selector,
    default: element.defaultState
  };

  try {
    // Verify element is still visible
    if (!(await locator.isVisible({ timeout: 1000 }))) {
      return states;
    }

    // Scroll element into view before interactions
    await locator.scrollIntoViewIfNeeded({ timeout: 5000 }).catch(() => {
      log.minor(`Could not scroll ${element.selector} into view`);
    });

    // Helper function for extracting styles from the exact locator element
    const extractStyles = async () => {
      return await locator.evaluate((el) => {
        const cs = getComputedStyle(el);
        const TRACKED_PROPS = [
          'backgroundColor', 'color', 'borderColor', 'borderWidth',
          'boxShadow', 'outlineColor', 'outlineWidth', 'outlineStyle',
          'opacity', 'transform', 'fontWeight', 'textDecoration',
          'cursor', 'pointerEvents', 'transition', 'filter',
          'backgroundImage', 'borderStyle', 'scale'
        ];
        const styles = {};
        for (const prop of TRACKED_PROPS) {
          const val = cs[prop];
          if (!val || val === 'none' || val === 'normal' || val === 'auto' || val === 'rgba(0, 0, 0, 0)') continue;
          styles[prop] = val;
        }
        return styles;
      });
    };

    // Hover state (buttons, links, cards)
    if (['button', 'link', 'card'].includes(element.type)) {
      await locator.hover({ force: true });
      await page.waitForTimeout(STATE_TRANSITION_WAIT);
      const hoverState = await extractStyles();

      if (!areStatesIdentical(states.default, hoverState)) {
        states.hover = hoverState;
      } else {
        log.debug(`Hover state identical to default for ${element.selector}`, { default: states.default, hover: hoverState });
      }
    }

    // Focus state (inputs)
    if (element.type === 'input') {
      await locator.focus();
      await page.waitForTimeout(STATE_TRANSITION_WAIT);
      const focusState = await extractStyles();

      if (!areStatesIdentical(states.default, focusState)) {
        states.focus = focusState;
      }

      // Blur to reset
      await page.evaluate(() => document.activeElement?.blur());
    }

    // Active state (buttons, links) - use real mouse with click prevention
    if (['button', 'link'].includes(element.type)) {
      try {
        // Install temporary event prevention for all pointer/mouse/click events
        // This prevents side effects from mousedown/pointerdown handlers during active state capture
        await page.evaluate(() => {
          window.__eventPreventer = (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
          };
          const events = ['pointerdown', 'pointerup', 'mousedown', 'mouseup', 'click'];
          events.forEach(event => {
            document.addEventListener(event, window.__eventPreventer, { capture: true });
          });
        });

        // Get element position and perform real mouse interaction
        const box = await locator.boundingBox();
        if (box) {
          const x = box.x + box.width / 2;
          const y = box.y + box.height / 2;

          // Wrap mouse down/up sequence in try/finally to guarantee cleanup
          try {
            // Move to element and press mouse down (triggers :active CSS)
            await page.mouse.move(x, y);
            await page.mouse.down();
            await page.waitForTimeout(50); // Brief delay for :active to apply

            // Read styles while mouse is down
            const activeState = await extractStyles();

            // Only record if different from default AND hover
            if (!areStatesIdentical(states.default, activeState) &&
                !areStatesIdentical(states.hover, activeState)) {
              states.active = activeState;
            }
          } finally {
            // Always release mouse, even if extraction failed
            await page.mouse.up().catch(() => {});
          }
        }
      } finally {
        // Always remove event prevention listeners
        await page.evaluate(() => {
          if (window.__eventPreventer) {
            const events = ['pointerdown', 'pointerup', 'mousedown', 'mouseup', 'click'];
            events.forEach(event => {
              document.removeEventListener(event, window.__eventPreventer, { capture: true });
            });
            delete window.__eventPreventer;
          }
        });
      }
    }

    // Disabled state detection
    if (['button', 'input'].includes(element.type)) {
      const isDisabled = await locator.evaluate(el => {
        return el.disabled ||
               el.hasAttribute('disabled') ||
               el.getAttribute('aria-disabled') === 'true';
      });

      if (isDisabled) {
        states.disabled = await extractStyles();
      }
    }

  } catch (err) {
    log.minor(`Failed to capture states for ${element.selector}`, { error: err.message });
  }

  return states;
}

export async function extract(page) {
  // Pass 1: Discover elements and capture default states
  const discovered = await discoverInteractiveElements(page);

  // Pass 2: Simulate interactions and capture state changes
  const interactions = {};

  for (const [category, elements] of Object.entries(discovered)) {
    if (elements.length === 0) {
      interactions[category] = {};
      continue;
    }

    interactions[category] = {};

    // Limit to MAX_PER_CATEGORY for performance
    for (let i = 0; i < Math.min(elements.length, MAX_PER_CATEGORY); i++) {
      const element = elements[i];
      const states = await captureElementStates(page, element);

      // Only include if we captured more than just default state
      if (Object.keys(states).length > 2) { // More than selector + default
        const label = `${element.variant}-${element.type}-${i + 1}`;
        interactions[category][label] = states;
      }
    }
  }

  return interactions;
}
