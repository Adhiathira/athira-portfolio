# QA Report — Veridian Instruments / Copper Still

**Date:** 2026-04-04
**Server:** python3 -m http.server 9876
**Pages checked:** 5 (index, instruments, workshop, provenance, contact)
**Iterations:** 1 of 3

## Results

### index.html
- Status: PASS
- Console errors: 11 (all expected asset 404s — asset generation skipped per caller)
- JS errors: 0
- Nav links: all 4 resolve to valid pages
- GSAP: loaded, registered, animations initialised
- Hero section: renders correctly without video (placeholder absent — video src 404 is silent)
- All 5 sections + footer present
- CTA buttons link correctly to instruments.html and contact.html

### instruments.html
- Status: PASS
- Console errors: 6 (all expected asset 404s)
- JS errors: 0
- Active nav link (Instruments) visible with underline
- 6 instrument cards present
- Calibration section renders

### workshop.html
- Status: PASS
- Console errors: 10 (all expected asset 404s)
- JS errors: 0
- Active nav link (Workshop) visible
- 9 process steps present with CSS counter numbers
- People section renders

### provenance.html
- Status: PASS
- Console errors: 3 (all expected asset 404s)
- JS errors: 0
- Active nav link (Provenance) visible
- 4 history chapters present
- Dark manifesto pull-quote section renders

### contact.html
- Status: PASS
- Console errors: 0
- JS errors: 0
- Active nav link (Contact) visible with underline
- Form renders correctly: name, org, email, subject (dropdown), message, submit
- Contact info column present

## Asset Status

All image/video 404s are expected. Asset generation was explicitly skipped by caller (recommendations: "skip asset generation — do not run Steps 7-8").

**27 image slots** and **3 video slots** are ready to be filled by a future asset generation run (use-higgsfield, nanobana, or any image/video tool). All filenames are documented in `assembly-log.json`.

## Issues Found: 0

No functional, structural, or animation issues. QA: CLEAN.
