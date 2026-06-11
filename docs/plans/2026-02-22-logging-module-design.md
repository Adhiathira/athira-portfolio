# Logging Module Design

**Status:** Implemented
**Date:** 2026-02-22

## Overview

Portable logging module for the design-system extractor. Zero dependencies, built on Node.js built-ins.

## Files

| File | Purpose |
|---|---|
| `lib/log-writer.js` | File stream + rotation (internal) |
| `lib/logger.js` | `createLogger(module)` public API |
| `lib/progress.js` | `createProgress(name, opts)` terminal bars |

## Levels

`critical > major > minor > info > debug` (numeric: 5 > 4 > 3 > 2 > 1)

| Level | Maps from | Use case |
|---|---|---|
| critical | `console.error` + exit | App crash, unrecoverable |
| major | `console.error` | Operation failed, app continues |
| minor | `console.warn` | Non-fatal warning |
| info | `console.log` | Normal operation |
| debug | `console.log` (verbose) | Development detail |

## Configuration (.env)

```
LOG_LEVEL_STDOUT=info      # threshold for terminal output
LOG_LEVEL_FILE=debug       # threshold for file output (can be more verbose)
LOG_DIR=./logs             # log directory (created if missing)
LOG_APP_NAME=design-system # base filename: design-system.log
LOG_ROTATE_HOURS=24        # rotate every N hours
LOG_ROTATE_KEEP_FILES=7    # keep last N rotated files
LOG_SILENT=false           # suppress all output (tests/CI)
```

## Progress Bars

Terminal-only. File log only receives bookend entries:
- `start()` → `[INFO] [progress] Starting: N items`
- `done()` → `[INFO] [progress] Completed N/N in Xs`

Bars are cleared from terminal before each log write via `registerProgressRenderer` hook.

## Portability

Extract to `packages/logger/` and publish as `@blankcanva/logger` — no API changes needed.
