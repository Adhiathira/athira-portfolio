# Extractor

Scrapes a website from the `sites.json` queue and extracts structured design tokens across 8 dimensions (color, typography, grid, spacing, motion, interactions, concept, nav-system). Output is written to `design-system/<site-name>/`.

## Run

```bash
# Process the first site in the queue
node runner.js

# Run a single extractor dimension only
node runner.js --only <slug>
# e.g. node runner.js --only color-system
```

## Add a site

Edit `sites.json` and add to the `queue` array:

```json
{ "name": "site-slug", "url": "https://example.com" }
```

## Extractor dimensions (slugs)

| Slug | File |
|---|---|
| `color-system` | `extractors/color-system.js` |
| `type-system` | `extractors/type-system.js` |
| `grid-system` | `extractors/grid-system.js` |
| `spacing-system` | `extractors/spacing-system.js` |
| `motion-system` | `extractors/motion-system.js` |
| `interaction-states` | `extractors/interaction-states.js` |
| `concept-summary` | `extractors/concept-summary.js` |
| `nav-system` | `extractors/nav-system.js` |
