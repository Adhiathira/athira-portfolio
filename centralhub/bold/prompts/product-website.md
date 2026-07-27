# Product Website — Builder with Chat Edit + Checkpoints

**File:** assets/product-website.jpeg
**Save to:** `landing-page/assets/product-website.jpeg`
**Type:** Image
**Dimensions:** 1200×800
**Aspect ratio:** 3:2
**AI Tool:** GPT Image 2
**Page:** pages/product.tsx
**Section:** #ucaas-website (FeatureDeepDive 04 / Phones + Website, media reveal scale, surface panel)

## Context from code
- **Alt text:** "CentralHub website builder with conversational editing and saved version checkpoints"
- **Nearest heading:** "Your Phone System and Website, Finally Connected"
- **Section purpose:** Product-page deep-dive for the website builder. Copy stresses conversational website editing and checkpoint-based version history (revert to any saved checkpoint). Media panel sits on a faint surface panel, revealed via a subtle scale-in.
- **Background:** Light — white `#ffffff` section on a light surface panel `#f0f0f4`.

## Prompt

A clean enterprise-SaaS screenshot for CentralHub's website builder on a bright white ground (`#ffffff`), composed of three clear regions. In the center, a live page-preview canvas shows a simple website being built — a hero block with a heading placeholder, a nav bar, and an image block — rendered as a light, tidy mockup within the mockup. On the left, a conversational edit panel: soft chat bubbles where a user requests a change and the assistant confirms it, with a deep teal (`#2b8a80`) send button, making the "edit by conversation" idea explicit. On the right, a vertical version-checkpoint timeline: stacked timestamped entries connected by a thin rail, small revert affordances, and one entry highlighted as the current checkpoint with a deep teal dot. Build from light surface panels (`#f0f0f4`) with hairline borders (`#cccce1`), navy ink text (`#1b1b37`) for headings, slate gray (`#7d8794`) for timestamps and labels, and reserve deep teal — not blue — only for the send button, the active checkpoint dot, and one selected control. Render all chat text, canvas copy, and timeline labels as blurred illegible, softly blurred lines — clearly a chat, a web page, and a version list, yet unreadable. Flat, evenly-lit straight-on UI render, generous white margins, calm and precise — a viewer should recognize a website builder edited by chat with a saved checkpoint history. Avoid blue accent buttons entirely — the only accent color is deep teal (`#2b8a80`); no green or mint accents, no blue, no pink or magenta, no dark backgrounds.

## Usage

Used in `pages/product.tsx` inside `#ucaas-website` as the website-builder visual — conversational editing with a version-checkpoint timeline.
HTML: `<img src="/assets/product-website.jpeg" alt="CentralHub website builder with conversational editing and saved version checkpoints">`
