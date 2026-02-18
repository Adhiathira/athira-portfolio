# Design System Extractor — Design Document

**Date:** 2026-02-17
**Status:** Approved

---

## Overview

A toolkit to extract design system information (colors, typography, etc.) from websites using browser automation. Extracted data is stored in a structured folder hierarchy per website and per design-tag. A nomenclature registry enforces consistent naming conventions before any new design-tag code is written.

---

## Architecture: Extractor Registry Pattern

- One `runner.js` entry point opens a Playwright browser and iterates extractors
- Each extractor is a module with a standard `{ metadata, extract(page) }` interface
- `registry.json` is the **nomenclature source of truth** — no new design-tag exists without a registry entry
- `lib/writer.js` is the **only** code that writes output files — extractors return data, they never write directly

---

## Folder Structure

```
design-system/
├── .env                          # Playwright config (headless, timeout, etc.)
├── package.json
├── sites.json                    # Website queue: { queue: [...], done: [...] }
├── registry.json                 # Nomenclature: slug, displayName, outputFiles, description
├── runner.js                     # Entry point
├── lib/
│   ├── writer.js                 # Formal write system (JSON + CSS output)
│   └── browser.js                # Playwright session management
├── extractors/
│   ├── color-system.js
│   └── type-system.js
└── design-system/                # Output root
    └── <website-name>/
        └── <design-tag>/
            ├── <tag>.json
            └── <tag>.css
```

---

## Key Files

### sites.json

Website processing queue at project root.

```json
{
  "queue": [
    { "name": "microsoft-ai", "url": "https://microsoft.com/ai" }
  ],
  "done": []
}
```

The runner picks the first item from `queue`, processes it, then moves it to `done`.

### registry.json

Nomenclature source of truth. Every design-tag must be registered here before its extractor is built.

```json
{
  "color-system": {
    "slug": "color-system",
    "displayName": "Color System",
    "outputFiles": ["colors.json", "colors.css"],
    "description": "Brand colors, background/foreground palettes, semantic color tokens"
  },
  "type-system": {
    "slug": "type-system",
    "displayName": "Type System",
    "outputFiles": ["typography.json", "typography.css"],
    "description": "Font families, sizes, weights, line heights, letter spacing"
  }
}
```

### Extractor Interface

```js
// extractors/color-system.js
export const metadata = { tag: 'color-system' }  // must match registry key

export async function extract(page) {
  // page is a live Playwright page, freshly loaded at the target URL
  // return plain data object — no file I/O here
  return { ... }
}
```

### lib/writer.js

The formal write system. Accepts `(websiteName, tag, data)`:
- Looks up `registry.json` for output filenames
- Creates `design-system/<websiteName>/<tag>/` directory if needed
- Writes JSON file (raw extracted data)
- Generates CSS custom properties file from JSON
- **All file writes go through this one module**

---

## Runner Flow

1. Read `sites.json`, pick first item from `queue`
2. Open Playwright browser via `lib/browser.js`
3. For each entry in `registry.json`:
   - Dynamically `import()` matching extractor from `extractors/<slug>.js`
   - Open **new page**, navigate to site URL, wait for `networkidle`
   - Call `extract(page)` — fresh page load per extractor to avoid state contamination
   - Pass result to `writer.js`
4. Close browser
5. Move processed site from `queue` → `done` in `sites.json`

---

## Nomenclature Rule

When a new design-tag concept is introduced, the following must be defined before any extractor code is written:

| Field | Description | Example |
|-------|-------------|---------|
| `slug` | Folder name and extractor filename (kebab-case) | `spacing-system` |
| `displayName` | Human-readable label | `Spacing System` |
| `outputFiles` | Array of filenames generated in the output folder | `["spacing.json", "spacing.css"]` |
| `description` | What the tag captures | `Margin, padding, gap, and layout spacing tokens` |

---

## Tech Stack

| Concern | Choice |
|---------|--------|
| Language | Node.js (ESM modules) |
| Browser automation | Playwright |
| Config | `.env` file |
| Output formats | JSON (source of truth) + CSS custom properties |

---

## Verification

1. Add a test site to `sites.json` queue
2. Run `node runner.js`
3. Verify `design-system/<name>/color-system/colors.json` and `colors.css` are created with data
4. Verify `design-system/<name>/type-system/typography.json` and `typography.css` are created with data
5. Verify `sites.json` shows the site in `done`, not `queue`
6. Verify no extractor wrote files directly (all output came from `writer.js`)
