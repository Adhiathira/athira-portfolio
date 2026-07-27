# Product Marketing — Conversational Campaign + ROI (Video)

**File:** assets/product-marketing.mp4
**Save to:** `landing-page/assets/product-marketing.mp4`
**Type:** Video
**Aspect ratio:** 16:9
**Duration:** 5s
**AI Tool:** Kling 2.6
**Page:** pages/product.tsx
**Section:** #cdp-map (FeatureDeepDive 03 / CDP + Marketing, media reveal parallax)

## Context from code
- **Alt/title:** "CentralHub launching a marketing campaign through conversation, with spend tracking"
- **Nearest heading:** "Understand Your Customers. Act on It Automatically."
- **Section purpose:** Product-page deep-dive for CDP + Marketing. Copy stresses unified customer data, AI-driven insights, conversational campaign creation, and campaign ROI tracking. The media is a looping video in a parallax-revealed frame (with a scrub-driven vertical parallax on the video element itself).
- **Background:** Light — white `#ffffff` section ground.

## Prompt

A calm, brightly lit light-UI motion piece on a crisp white ground, with deep teal (`#2b8a80`) as the single accent color. The entire clip contains ZERO readable text: every label, value, axis tick, and caption is only a soft-focus blurred abstract mark — never a letter, digit, word, or character. On the left, a chat-style panel builds gently: rounded message bubbles appear one by one in a slow sequence, their contents shown only as soft blurred horizontal bars far beyond legibility — pure shapes, no letterforms — and a small rounded deep-teal (`#2b8a80`) send control gives one soft pulse. Attention then shifts to the right, where a clean spend and return-on-spend chart animates upward: pale neutral bars rise in quick succession from the baseline while a single thin deep-teal (`#2b8a80`) line draws itself left to right and settles like a needle coming to rest. The chart has NO axis numbers, NO tick labels, and NO digits of any kind — the axes are bare clean lines with, at most, faint plain gridlines; there is absolutely no text, no numerals, and no scale markings anywhere on or around the chart. The camera holds in a steady, locked screen-capture framing with a whisper of a push-in as the chart resolves, then holds completely still. Calm, precise, unhurried; light surface panels with hairline borders, soft navy-gray abstract UI chrome on white, generous margins, one motion at a time. Everything soft, premium, and completely text-free.

## Negative Prompt

readable text, legible text, letters, words, numbers, digits, typography, captions, text labels, pseudo-text, fake text, garbled lettering, gibberish letterforms, Greek, Cyrillic, Chinese, Japanese, Korean, Arabic, any non-Latin script, foreign-language text, green accents, green, blue accents, blue, mint, pink or magenta, dark background, logos, watermarks, people, hands, glare, flicker, hard cuts, jump cuts, morphing objects, shaky distortion

## Applied
Mode:     text-to-video
Style:    product (specified)
Duration: 5s (specified)
Aspect:   16:9 (specified)
Audio:    sfx (soft UI keystrokes, single click, counter tick), near-silence

## Usage

Used in `pages/product.tsx` inside `#cdp-map` as the CDP + Marketing motion — a campaign composed conversationally, then a spend/ROI chart animating up.
HTML: `<video src="/assets/product-marketing.mp4" autoplay muted loop playsinline>`
