# Dashboard UI Video

**File name:** dashboard-ui.mp4
**Save to:** `pale-ledger/assets/dashboard-ui.mp4`
**Type:** Video
**Dimensions:** 1200x800
**Duration:** 6–10 seconds, seamless loop
**AI Tool:** Kling 2.6

## Prompt

A screen recording-style cinematic video of a financial analytics dashboard on a dark navy (#091f2c) background. The camera holds perfectly still — no movement — while the interface comes alive with restrained, data-driven motion: a multi-line candlestick chart in #0067b8 Microsoft blue draws itself left to right with fluid precision, a risk exposure heatmap fades in with a cream-to-navy gradient wash, and position cards in the sidebar update their values with a subtle numerical tick. Typography is editorial and precise — refined serif headings, clean sans-serif data. The pacing is slow and authoritative, never frantic. Grid lines appear with hairline precision. The overall feeling is of a living instrument, not a demo — data breathing quietly at institutional scale. No transitions, no loading spinners, no UI chrome appearing. Only the content animating in its natural rhythm.

## Usage

Used in `landing-page/index.html` as the product showcase section video in the 40% right column of the asymmetric 60/40 grid split. Falls back to `dashboard-ui.jpg` if video cannot play.
HTML: `<video autoplay muted loop playsinline><source src="../assets/dashboard-ui.mp4" type="video/mp4"></video>`
