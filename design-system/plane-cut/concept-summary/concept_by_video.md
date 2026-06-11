# plane-cut — Concept by Video

## Motion Concept: Paper Assembly and Layer Rise

The plane-cut motion system treats every scroll-triggered animation as a **physical paper assembly** — layers do not simply fade in; they rise from beneath, casting shadows as they ascend.

## Key Animation Sequences

### Hero: Layer Assembly on Load
On page load, the background paper layers assemble from back to front. The deepest layer (#d5c9bc) appears first, then layer 2 (#e8dfd3), then layer 1 (#f0ebe3), then the white surface, finally the headline text. Each layer translates from y:30 to y:0 with a 0.1s stagger. Box-shadow intensifies during the rise. Duration: 0.6s each, power2.out easing.

**Video placement:** Hero assembly sequence. Camera starts on empty warm background, layers slide up from below frame in sequence, headline snaps into position last.

### Scroll: Section Overlap Effect
As the user scrolls down, each new section slides under the previous one (sections use negative margin-bottom). The effect in motion: the page feels like flipping through a layered paper folio, each sheet revealing what was beneath.

**Video placement:** Continuous scroll reveal showing one section's bottom edge sliding under the next section's top edge, with a 1px shadow line visible at the overlap.

### Feature Cards: Layer Rise with Shadow Intensification
Feature cards animate in with a staggered layer-rise pattern. Each card enters from y:20 with box-shadow starting at 0 2px 8px and arriving at 0 8px 32px by the time the animation completes. The shadow growth is synchronized with the upward translation — as the card "lifts," its shadow deepens.

**Video placement:** Three-card feature grid. Cards enter left to right, 0.1s stagger between each.

### How-It-Works Icons: Cut Reveal
The clip-path icon shapes open using a cut-reveal animation — starting from a narrow vertical slit (polygon: 50% 0% 50% 0% 50% 100% 50% 100%) and opening to full width. This mimics a craft knife making a cut through paper and the two sides spreading apart.

**Video placement:** Close-up of three step icons opening in sequence with 0.2s stagger.

### Card Hover: Paper Lift
On hover, cards float upward 8px and their box-shadow jumps from layerMd to layerHover intensity. This feels like picking up a physical card from the table. Duration: 0.35s ease-out.

**Video placement:** Single card hover demonstration, showing shadow expanding beneath as card lifts.

## Timing Reference

| Animation | Duration | Easing | Stagger |
|---|---|---|---|
| Hero layer assembly | 0.6s | power2.out | 0.1s |
| Section rise | 0.5s | power2.out | — |
| Card grid entrance | 0.5s | power2.out | 0.1s |
| Cut reveal icon | 0.6s | power2.inOut | 0.2s |
| Card hover float | 0.35s | ease-out | — |

## Reduced Motion

All scroll animations collapse to instant appearance with no translation. Hover effects retain only color transitions (no transform, no shadow animation).
