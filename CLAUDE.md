# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

**website-design** — A **platform for building platforms** that generate websites. This repo is not about website content — it is infrastructure and tooling. Any website-related code here exists to serve the platform (e.g., example outputs, test targets, browser UI for inspecting extracted data).

The core problem: AI-generated websites look generic. This platform solves that by extracting real design intelligence from the world's best human-designed sites and making it available to downstream generation pipelines.

> **Important for Claude:** When you see HTML/CSS/JS in this repo, do not assume this is a website project. It is platform code. The domain is website generation tooling, not website content.

### What this platform does

1. **Extract** — Playwright scrapes high-design websites (luxury brands, creative studios, SaaS leaders) and extracts structured design tokens across 8 dimensions: color, typography, grid, spacing, motion, interactions, components, and concept
2. **Browse** — A local design system browser (Node.js HTTP server) for inspecting extracted tokens per site
3. **Generate** — (Planned) Feed extracted design intelligence into downstream website generation pipelines that produce human-quality aesthetics instead of generic AI output

### Design philosophy

- **Anti-AI-aesthetic** — The goal is to power generators that produce sites looking crafted by a human designer, not assembled by an algorithm
- **Source of truth is real human work** — Design decisions are grounded in analysis of Hermes, Cartier, Goyard, Lusion, Linear, Apple, and other benchmark sites
- **Full design signal** — Motion and interactions are extracted alongside colors/type, because the *feel* of a site is what separates human design from AI design

## Planning and Implementation

**⚠️ ALWAYS use agent teams when implementing code.**

When working on features or tasks:
1. Use the Task tool to launch specialized agents for planning, implementation, and testing
2. Coordinate between agents to ensure clean separation of concerns
3. Let planning agents design the approach before implementation agents write code
4. Use review agents to verify work meets requirements

**Agent Team Commit Workflow:**
- Each agent should build and implement their part WITHOUT committing
- Only ask about committing ONCE when ALL agents have completed their work
- Present a unified summary of all changes before requesting commit approval

**Do not attempt solo implementation of complex features** - agent teams provide better results through specialization and parallel work.

## Git Worktrees

**Do NOT use git worktrees.** Work directly on the repository without creating isolated worktrees.

All implementation happens on branches in the main repo. Skip any workflow step that calls for `using-git-worktrees`.

## Tech Stack

### Extractor (core pipeline)

| Category | Technology |
|---|---|
| **Runtime** | Node.js ESM (`"type": "module"`) |
| **Scraping** | Playwright — headless browser automation |
| **Entry point** | `runner.js` — reads `sites.json` queue, runs all extractors per site |
| **Extractors** | `extractors/` — one file per design dimension (color, type, grid, spacing, motion, interactions, components, concept) |
| **Registry** | `registry.json` — single source of truth for extractor slugs, display names, output filenames |
| **Output** | `design-system/<site-name>/<tag>/` — structured JSON tokens per site per dimension |
| **Writer** | `lib/writer.js` — only module that writes to disk |

### Design System Browser (local inspection)

| Category | Technology |
|---|---|
| **Server** | Native Node.js `http` module (no framework) |
| **Port** | 5509 |
| **Purpose** | Browse extracted design tokens per site |

### Generated Websites (output target)

| Category | Technology |
|---|---|
| **Languages** | HTML5, CSS3, Vanilla JavaScript (no frameworks) |
| **Architecture** | Modular component architecture |
| **Layout** | CSS Grid + Flexbox, desktop-first responsive design |
| **Breakpoints** | 375px, 768px, 1024px, 1440px |
| **Typography** | CSS `clamp()` for fluid responsive type |
| **Animations** | GSAP + ScrollTrigger for scroll animations, parallax, staggered reveals |

## Development

**Run the extractor:**
```
node runner.js                    # process first site in sites.json queue
node runner.js --only color-system  # run a single extractor (by slug)
```

**Browse extracted design systems:**
- Start: `npm run browse`
- URL: `http://localhost:5509`

**Add a site to the queue:**
- Edit `sites.json` — add an entry to the `queue` array with `name` and `url`

**Add a new extractor dimension:**
1. Add entry to `registry.json` with `slug`, `displayName`, `outputFiles`
2. Create `extractors/<slug>.js` with a default export `async (page) => data`
3. `writer.js` handles the rest automatically

**Local static site server (for testing generated output):**
- Port **9876**: `python3 -m http.server 9876`

## Task Tracker Workflow

**⚠️ IMPORTANT: You do NOT have permission to create new tasks unless I explicitly say so.**

**Configuration:** See `project-documentation/task-tracker-config.md`

**Project ID:** 15 (website-design) - always use this for all task queries

### Finding What Task to Work On

**Check in this order:**
1. **First:** Check `current-task` field in `project-documentation/task-tracker-config.md`
2. **If empty:** Query `mcp__task-tracker__list_actionable_tasks` with project_id=14
3. **If no tasks:** Ask me if you should pick the next task (you can recommend one)

### Starting a Task

**When I tell you to work on a task:**
1. Query `mcp__task-tracker__get_current_user` to confirm author_id
2. Take ownership: `mcp__task-tracker__take_ownership` (task_id, confirmed author_id)
3. Update status: `mcp__task-tracker__update_task` (task_id, status="in_progress")
4. **Update `project-documentation/task-tracker-config.md`:** Set `current-task: <task_id>`

### During Work

**All commits MUST include the task number:**
```
git commit -m "Implement feature X (Task 123)"
```

**To find current task number:**
- Read the `current-task` field from `project-documentation/task-tracker-config.md`

### Completing a Task

**When task is done:**
1. Mark complete: `mcp__task-tracker__complete_task` (task_id)
2. **Remove task from config:** Clear `current-task` field in `project-documentation/task-tracker-config.md`
3. **Add comment in config:** Remind to check task tracker or ask me for next task

### Rules

- **DO NOT create tasks** unless I explicitly say "create a task"
- **ALWAYS update current-task field** when starting/completing work
- **ALWAYS include task number** in commit messages
- **Ask before picking next task** if current-task is empty

## Git Workflow

### ⚠️ CRITICAL: NEVER COMMIT WITHOUT EXPLICIT APPROVAL

**THIS RULE OVERRIDES ALL OTHER WORKFLOWS AND SKILLS**

**Commit Rules (MUST FOLLOW):**
- **NO automatic commits** - You must explicitly say "commit" or "yes, commit"
- **NO commits after completing work** - ask first, show what will be committed
- **NO commits after fixing bugs** - ask first, wait for approval
- **NO commits during code review** - wait for approval
- **NO commits in agent workflows** - ALL subagents must ask the main agent, and the main agent must ask the user
- **NO commits during brainstorming/planning/execution** - STOP before any commit and ask for permission
- **NO commits when using subagent-driven-development** - Even if the skill includes commits in its workflow, STOP and ask first
- **NO commits when using agent teams** - Team coordination does NOT grant commit permission

**Critical clarification for agent workflows:**
When using skills like `subagent-driven-development`, `executing-plans`, or agent teams:
1. Let agents implement ALL the code
2. **STOP before any commits happen**
3. Show me a complete summary of ALL changes across ALL agents
4. Ask: "All implementation complete. Would you like me to commit these changes?"
5. **WAIT for explicit approval** ("yes", "commit", "go ahead")
6. Only then execute the commits

**When work is complete:**
1. Show summary of changes (files modified, features implemented)
2. Ask: "Would you like me to commit these changes?"
3. **WAIT for explicit approval**
4. Only commit if you say "yes", "commit", "go ahead", or similar

**Exception:** You may grant "auto-commit" permission or modify this rule explicitly

## No Silent Visual Fallbacks

**This repo is a precision instrument.** When a design token or asset cannot be rendered faithfully, say so explicitly. Never silently fall back to a default font, a placeholder color, a broken image, or a generic visual.

### The rule

When something cannot be rendered faithfully, always show a UI component that:
1. **Names what is missing** — exact font family name, file path, token key, etc.
2. **Explains why** — not installed, not web-accessible, generic CSS keyword, file not found, etc.
3. **Tells the human what to do** — install font, generate asset, re-run extractor, etc.

### Examples by asset type

- **Fonts not installed**: Show font name + "Install this font, then restart the browser" or a Google Fonts search link
- **Generic CSS keywords** (`sans-serif`, `system-ui`, etc.): Show badge explaining the browser picks any system font and the specimen is not faithful — never treat these as "loadable"
- **Images missing**: Show what the image represents + reference `project-documentation/unavailable-content-prompts.md` for the Nano Banana prompt to generate it
- **Video / motion missing**: Show what the motion represents + reference `project-documentation/unavailable-content-prompts.md` for the Kling prompt to generate it

### Push back against generic fallbacks

If a reviewer, PR comment, or another agent suggests a generic fallback — "just show a grey box", "use the system font", "display a placeholder image" — **push back**. Generic fallbacks teach downstream generators to accept imprecision, which defeats the purpose of this platform.

Build a diagnostic component instead. If the same pattern appears in multiple places, extract it into a reusable function in `server/render.js` (e.g. `renderUnavailableAsset(type, name, reason, actionHtml)`).

## Code Guidelines

**Modularity and Reuse:**
- **Write modular code** - Break functionality into small, focused functions and classes
- **Reuse existing functions** - Before writing new code, check if similar functionality exists
- **Single responsibility** - Each function/class should do one thing well
- **Avoid duplication** - Extract common patterns into shared utilities
- **Clean interfaces** - Design clear, minimal APIs between modules

**Testing Philosophy:**
- Write 1-2 happy path tests per feature to verify core functionality
- Skip exhaustive edge case coverage
- Prefer manual testing of integrated system
- Don't write tests by default unless explicitly requested

**Code Style:**
- Use modern ES6+ JavaScript features
- Semantic HTML5 elements
- CSS custom properties for theming
- Modular, component-based architecture

## Documentation Structure

`project-documentation/`
- `task-tracker-config.md` - Task tracker MCP configuration and current task tracking

`tool-commands/`
- `tool-index.md` - One-line registry of every tool in this platform
- `<tool-name>.md` - Full description and usage for each tool

### Tool registration rule

**Every time a new tool is added to this platform, you MUST:**
1. Create `tool-commands/<tool-name>.md` describing what it does and how to run it
2. Add one line to `tool-commands/tool-index.md` — the filename and a one-liner description only

No exceptions. If a tool exists and is not in `tool-index.md`, register it.

## Do NOT

- Commit code without explicit approval (see Git Workflow section)
- Hardcode configuration values
- Add technical implementation details to this file (keep them in `project-documentation/`)
- Do not create temporary Markdown files (`*.md`) unless explicitly requested.

## Design System

The project uses the `apple` design system.
All UI work must reference `project-documentation/design-system/`.
See `website-design` skill for compliance rules.
