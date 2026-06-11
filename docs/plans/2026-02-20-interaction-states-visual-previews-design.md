# Design: Visual Previews for Interaction States

**Date:** 2026-02-20
**Author:** Claude
**Status:** Approved

## Overview

Add realistic visual previews to the interaction states section of the design preview browser. Instead of showing only data tables, users will see actual HTML elements (buttons, inputs, links) styled with extracted CSS properties, making it easy to visualize state changes at a glance.

## Problem Statement

Currently, interaction states are displayed as data tables showing CSS property values:
- Element name + selector
- State names (default, hover, focus, active, disabled)
- Property values in table rows
- Color swatches and change highlighting

While this shows the data accurately, it requires users to mentally visualize what the states actually look like. A visual preview would make differences immediately apparent.

## User Requirements

1. **Before/after comparison** - Show default state vs. states with visual changes
2. **Show all significant changes** - If multiple states differ (hover + active), show all of them
3. **Realistic element previews** - Render elements that look like actual buttons/inputs/links, not abstract boxes
4. **Preserve existing data** - Keep the detailed property table for users who need exact values
5. **Visual difference detection** - Show any state where visual properties differ from default

## Approach

**Selected: Actual HTML elements with CSS isolation**

Render real `<button>`, `<input>`, `<a>` elements server-side with:
- CSS reset for isolation (`all: unset`)
- Inline styles from extracted properties
- Type-specific sizing and styling
- No user interaction (`pointer-events: none`)

**Why this approach:**
- Most realistic representation of actual elements
- Directly applies extracted CSS data
- Server-side rendering (no client-side JavaScript needed)
- Clean integration with existing `/server/render.js`

**Alternatives considered:**
- CSS-only styled divs: Simpler but less realistic
- SVG rendering: Overkill for simple property visualization
- Shadow DOM: Not available server-side

## Architecture

### Component Structure

```
┌─────────────────────────────────┐
│ Element Name                     │
│ selector                         │
│ ┌─────────────────────────────┐ │
│ │ Visual Preview (NEW)        │ │
│ │ [button] [button] [button]  │ │
│ │ default   hover    active    │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ Property Table (existing)   │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

### Code Integration

**File:** `/server/render.js`

**New functions:**
1. `renderStatePreview(category, stateName, stateData)` - Generate single preview element
2. `shouldShowStatePreview(defaultState, compareState)` - Detect visual differences

**Modified functions:**
1. `renderInteractionElement(name, element)` - Add preview section before table

### Element Type Mapping

```javascript
{
  'buttons': '<button type="button">',
  'inputs': '<input type="text" disabled>',
  'links': '<a href="#">Link</a>',
  'cards': '<div>',
  'navigation': '<div>'
}
```

## Rendering Logic

### 1. State Detection

```javascript
function shouldShowStatePreview(defaultState, compareState) {
  const visualProps = [
    'color', 'backgroundColor', 'borderColor', 'borderWidth',
    'opacity', 'boxShadow', 'outlineColor', 'outlineWidth'
  ];

  return visualProps.some(prop =>
    defaultState[prop] !== compareState[prop]
  );
}
```

### 2. Preview Generation

```javascript
function renderStatePreview(category, stateName, stateData) {
  // 1. Determine element type
  const elementType = { buttons: 'button', inputs: 'input', ... }[category];

  // 2. Build CSS reset + extracted styles
  const styles = [
    'all: unset',
    'display: inline-block',
    'box-sizing: border-box',
    `background-color: ${stateData.backgroundColor}`,
    `color: ${stateData.color}`,
    `border: ${stateData.borderWidth} solid ${stateData.borderColor}`,
    // ... all visual properties
  ].join('; ');

  // 3. Generate HTML element
  return `<div class="preview-item">
    <${elementType} class="interaction-preview" data-type="${category}" style="${styles}">
      ${getElementContent(category)}
    </${elementType}>
    <div class="preview-state-label">${stateName}</div>
  </div>`;
}
```

### 3. Integration into renderInteractionElement

```javascript
// After extracting states
const statesToShow = Object.keys(states).filter(stateName =>
  shouldShowStatePreview(states.default, states[stateName])
);

if (statesToShow.length > 1) { // More than just default
  html += '<div class="interaction-preview-section">';
  html += '<div class="preview-label">Visual Preview</div>';
  html += '<div class="preview-row">';

  for (const stateName of statesToShow) {
    html += renderStatePreview(category, stateName, states[stateName]);
  }

  html += '</div></div>';
}

// Then render existing property table
```

## Styling

### CSS Classes

```css
/* Container */
.interaction-preview-section {
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

/* Preview grid */
.preview-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: flex-start;
}

/* Individual preview */
.preview-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

/* Element isolation & reset */
.interaction-preview {
  all: unset;
  display: inline-block;
  box-sizing: border-box;
  pointer-events: none;
  cursor: default;
  min-width: 80px;
  min-height: 32px;
  padding: 8px 16px;
}

/* Type-specific sizing */
.interaction-preview[data-type="button"] {
  min-width: 100px;
  min-height: 36px;
  border-radius: 6px;
}

.interaction-preview[data-type="input"] {
  min-width: 180px;
  min-height: 36px;
  border-radius: 4px;
}

.interaction-preview[data-type="link"] {
  min-width: 60px;
  min-height: 20px;
  padding: 4px 8px;
  text-decoration: underline;
}
```

## Data Flow

```
User clicks "Interaction States" tab
  ↓
renderSectionContent('interaction-states', data)
  ↓
renderInteractionStatesSection(data)
  ↓
For each category (buttons, inputs, links, cards, navigation)
  ↓
For each element in category
  ↓
renderInteractionElement(name, element)
  ↓
Extract states: { selector, ...states }
  ↓
Detect states with visual differences
  ↓
IF differences found:
  Render preview section with actual HTML elements
  ↓
Render property table (existing code)
```

## Edge Cases

1. **No visual differences** - Show only default preview (no comparison)
2. **Missing default state** - Use first available state as baseline
3. **Empty states** - Skip preview section entirely
4. **All states identical** - Show single default preview
5. **Many states** - Preview row wraps with `flex-wrap: wrap`

## Testing Strategy

1. **Visual verification**
   - Test with lightweight-info (inputs + links)
   - Test with tailwindcss (buttons + inputs)
   - Test with hackathon-pump-fun (verify all element types)

2. **Edge case testing**
   - Site with no interaction states data
   - Element with only default state
   - Element with many states (5+ states)

3. **Layout testing**
   - Responsive wrapping with many previews
   - Preview alignment and spacing
   - Integration with existing property table

4. **Browser compatibility**
   - CSS reset effectiveness
   - Inline style application
   - Preview element rendering

## Success Criteria

- ✅ Visual previews render for all element types (buttons, inputs, links, cards, navigation)
- ✅ Realistic element shapes and sizing
- ✅ Extracted CSS properties correctly applied
- ✅ States with visual differences automatically detected
- ✅ Clean layout with labels
- ✅ No interaction on preview elements
- ✅ Existing property table preserved below previews
- ✅ No console errors
- ✅ Works across all test sites

## Implementation Notes

- All changes in single file: `/server/render.js`
- Estimated ~150 lines of code (60 CSS, 90 JavaScript)
- No changes to extractors or data structure
- No client-side JavaScript needed
- Compatible with existing rendering infrastructure

## Future Enhancements

- Hover tooltips showing exact property values
- Toggle to hide/show preview section
- Accessibility improvements (ARIA labels)
- Export preview as image
