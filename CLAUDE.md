# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

**website-design** - Parent company website for blankcanva.ai — a studio that builds AI-powered video creation tools. Single-page, dark cinematic theme inspired by museumofmoney.com. Modular component architecture, responsive design, coming soon branding. Built with native HTML, CSS, and JS.

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

| Category | Technology |
|---|---|
| **Languages** | HTML5, CSS3, Vanilla JavaScript (no frameworks) |
| **Architecture** | Modular component architecture (each component gets its own CSS/JS file) |
| **Layout** | CSS Grid + Flexbox, desktop-first responsive design |
| **Breakpoints** | 375px, 768px, 1024px, 1440px |
| **Typography** | CSS `clamp()` for fluid responsive type, Google Fonts (Inter/Manrope for body, Syne/Space Grotesk for headings) |
| **Animations** | GSAP + ScrollTrigger (via CDN) for scroll animations, parallax, and staggered reveals |
| **Icons** | Lucide Icons (via CDN) |
| **Theming** | CSS Custom Properties |
| **Design Reference** | museumofmoney.com (dark cinematic aesthetic, bold typography, generous spacing, scroll-driven storytelling) |
| **Hosting** | Vercel or Cloudflare Pages |

**External Dependencies:** GSAP, ScrollTrigger, Lucide Icons (all via CDN)

## Development

**Local Server:**
- Use port **9876** for local development (static site)
- Start server: `python3 -m http.server 9876`
- URL: `http://localhost:9876`

**Design System Browser:**
- Use port **5509**
- Start: `npm run browse`
- URL: `http://localhost:5509`

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

## Do NOT

- Commit code without explicit approval (see Git Workflow section)
- Hardcode configuration values
- Add technical implementation details to this file (keep them in `project-documentation/`)
- Do not create temporary Markdown files (`*.md`) unless explicitly requested.
