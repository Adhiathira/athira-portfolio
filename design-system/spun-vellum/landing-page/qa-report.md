# QA Report — Spun Vellum / Kesslar & Vane
Generated: 2026-04-04

## Summary
- Pages verified: 5 / 5
- QA iterations: 1
- Issues requiring repair: 0
- Asset 404 errors (expected — ASSET_MODE=generated, Steps 7–8 skipped): 20 total

## Page Results

### index.html — PASS
- Console errors: 5 (all asset 404s — hero-bg.mp4, work-hero.jpeg, instruments-*.jpeg, process-workshop.jpeg)
- Nav: Logo "Kesslar & Vane" renders correctly, no active link text (homepage — logo is indicator)
- Hero: 100vh, Cormorant Garamond weight 800 "Kesslar & Vane" heading, instrument number bottom-right
- Sections: Manifesto, Instruments grid (1.4fr/1fr), Process split (3fr/2fr), Legacy dark, Commissions (3-col)
- GSAP: ScrollTrigger animations registered, opacity:0 not used in scroll triggers
- onerror fallbacks: all asset placeholders show correctly

### work.html — PASS
- Console errors: 6 (all asset 404s — work-hero.jpeg, instrument-*.jpeg ×4, product-ambient.mp4)
- Nav: "WORK" active (underlined, 0.45 opacity, pointer-events none) ✓
- Hero: 40–60vh product archetype
- Filter bar: ALL/THEODOLITES/LEVELS/MICROMETERS/SPECTROMETERS tabs rendered
- Feature rows: 4 full-width rows visible
- Video section: onerror fallback → assets/product-ambient.mp4

### process.html — PASS
- Console errors: 4 (all asset 404s — process-*.jpeg ×4)
- Nav: "PROCESS" active ✓
- Hero: compact 20vh "The Process / Four stages. No shortcuts."
- Stages: 4 numbered stages with 52px/1fr grid layout
- Timeline stats band: renders at bottom

### studio.html — PASS
- Console errors: 4 (all asset 404s — studio-interior.mp4, team-*.jpeg ×3)
- Nav: "STUDIO" active (underlined) ✓
- Hero: compact 20vh "14 Grassmarket / Edinburgh. The same address since 1887."
- Video section: dark contrast beat visible, onerror fallback → assets/studio-interior.mp4
- About section: 3fr/2fr bento layout with facts sidebar
- Team grid: masonry with margin-top stagger on 3rd card

### contact.html — PASS
- Console errors: 1 (contact-workshop.jpeg asset 404)
- Nav: "CONTACT" active ✓
- Hero: minimal 15vh "Begin a Commission"
- Form: full commission form with name/org/email/instrument-type/intended-use/timeline fields
- Contact details: post address, email, phone rendered
- Image band: onerror fallback → assets/contact-workshop.jpeg

## Unresolved Issues
None. All errors are expected asset 404s due to ASSET_MODE=generated with Steps 7–8 skipped per caller recommendations.

## Notes
- All pages use onerror pattern on <img> and <video> — graceful degradation confirmed
- Fonts loading: Cormorant Garamond weight 800 confirmed rendering in hero headings
- Active nav link: correct per-page, opacity 0.45 with underline (contact.css uses underline pseudo-element)
- GSAP: all scroll-triggered animations use transform-only (y/x/scale/clipPath) — no opacity:0 bug
