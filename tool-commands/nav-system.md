# nav-system

Navigation system extractor. Extracts design tokens specific to the navigation bar: geometry (height, padding, item spacing), hover animations (including pseudo-element `::after` underline effects), scroll transition mechanics, dropdown behavior, and typographic style.

Does **not** extract colors — those are handled by `color-system`.

## Run

```
node runner.js --only nav-system
```

## Output

Written to `design-system/<site-name>/nav-system/nav.json`.

Key fields:
- `geometry` — height, paddingInline, position, itemSpacing, logoWidth, logoHeight, heightScrolled
- `background` — backdropFilter, borderBottom, boxShadow (default and scrolled states)
- `typography` — fontFamily, fontSize, fontWeight, letterSpacing, textTransform
- `linkHover` — hover state changes including `underline.animation` for pseudo-element effects
- `linkActive` — selector and indicator for current/active nav items
- `scrollTransition` — mechanism (class-toggle), triggerClass, propertiesChanged, colorInversion
- `dropdown` — presence, trigger, geometry, animation
- `characterDescription` — 1-2 sentence semantic summary of nav personality
