## Scroll Video Analysis

---

### Scroll Opening

The page loads into pure white — not a flash or a fade, but the near-white ground already present, as though the page is a sheet of uncoated stock placed on a light table. The navigation resolves at full opacity without animation, already positioned at the top edge. What animates is the type: the large EB Garamond display headline enters as a single mass, the weight-700 letterforms dropping into position from just above their resting baseline — a vertical translate of roughly 16px over 520ms with ease-in-out timing. The effect is typographic gravity rather than digital construction. The body copy and supporting labels fade in at staggered intervals of 80ms after the headline settles, the IBM Plex Sans text resolving from 0 to full opacity without movement.

---

### Hero Experience

The hero is white-ground with no background image — the typography is the visual event. The display headline is a candidate for video background treatment, but the treatment here inverts the convention: rather than video behind text, the text enters before any image resolves. A documentary-style macro video of a typeface being set in lead type — close on the compositor's hands, the slug sliding into the form, morning light raking across the metal surface — could occupy a full-bleed zone below the headline, entering on a delayed fade as the user's attention arrives at mid-page. The video should establish material weight for a product that operates in the world of documents and precision language.

Suggested asset: `hero-compositor.mp4` — 10 seconds, slow push into a compositor setting metal type, macro lens, shallow depth of field, morning side-light, no color grade beyond natural warmth of the metal. Why video: the motion of hands and type establishes tactile credibility that a still photograph cannot — the product deals in documents, and the hero should feel earned by physical precedent.

---

### Section Transitions

Scrolling between sections is unmarked by wipes or dissolves — the near-white background holds continuous throughout, and sections transition by content type rather than visual boundary. The one exception is the manifesto section, where the oversized headline moves at 1.05× the scroll speed — a slight parallax differential amplifying its typographic mass, making the display text feel anchored in front of the page plane. The 0.39s ease-in-out timing means this effect is perceptible but not dramatic: the headline arrives slightly before its surrounding content, establishing precedence. Between sections, product feature images translate up by 20px and fade in with a 120ms stagger between columns — the entry feels measured and deliberate.

---

### Content Rhythm

Elements across the product and feature sections enter with a vertical reveal stagger: first column fades and translates up 20px, second column follows 80ms later, third 160ms after that. This creates the impression of the page composing itself incrementally — consistent with the editorial metaphor of type being set one element at a time. Body copy enters as a block on a single fade without translation. CTA elements and labels enter last, after the surrounding content has settled, which directs attention toward the action after context has been established. The 0.08em letter-spacing on tracked headings and nav links means each word arrives with air around it — the inter-character spacing feels like deliberate breath in the text.

---

### Footer Approach

The footer enters as the scroll position reaches it — no animation distinguishes it from the preceding content section. Both share the near-white ground, and the footer's three-column text grid fades in at full opacity from zero without translation. The typographic restraint of the footer — small IBM Plex Sans at weight 400, tracked at 0.08em — is consistent with the system's convention that utility navigation recedes. No closing animation, no scroll-to-top indicator with motion decoration; the page terminates cleanly, the white ground continuing below the last copyright line.

---

### Motion Principles

The overall timing philosophy is **measured and deliberate, with typographic gravity as the primary metaphor**. The 0.26s fast / 0.39s base / 0.52s transform scale creates a motion system that is unhurried without being languid. Ease-in-out timing removes abruptness from both entry and exit, so transitions feel considered rather than mechanical. The system does not use bounce or spring easings — there is no physical overshoot — because the metaphor is print, not physics. Paper does not bounce. Metal type does not spring. Motion here is an editorial tool: it sequences attention, not spectacle.

---

### Motion Principles — Summary

| Property | Character |
|---|---|
| Primary easing | ease-in-out — smooth, bilateral, typographically neutral |
| Duration range | 260–520ms for reveals, 260ms for hover states |
| Scroll trigger behavior | Vertical translate 20px + opacity fade, 80ms stagger per column |
| Parallax | Subtle — display headlines at 1.05× scroll speed only |
| Overall register | Editorial, composed, typographic gravity — not reactive or performative |

---

### Video Placements

**1. Hero Compositor — `hero-compositor.mp4`**
- Section role: hero sub-visual (enters below display headline on delay)
- What the video shows: macro close-up of a compositor setting lead type by hand, a single line of metal slugs sliding into a compositing form; slow push, shallow depth of field, natural morning window light raking across the metal surface; no digital color grade
- Duration: 10 seconds, designed as a single-play (not loop) that ends on the composed form held still
- Why video: the product premise requires material credibility — a static photograph of type equipment reads as decor; the motion of hands and metal establishes that documents have physical precedent, grounding an otherwise abstract software product in earned materiality

**2. Feature Showcase — `feature-document-flow.mp4`**
- Section role: product feature demonstration section, right column
- What the video shows: overhead fixed camera of a printed proof being annotated by hand — red pen corrections, margin notes, a ruler aligning columns; the hands move slowly and precisely; the paper is cream, the desk surface dark oak
- Duration: 5 seconds, seamless ambient loop
- Why video: the feature section describes the product's document intelligence capabilities; video of the physical act of editing communicates the problem space — the friction and labor the product replaces — without requiring a software screenshot

**3. Studio Interior — `studio-interior.mp4`**
- Section role: about/team section background
- What the video shows: slow drift across an editorial studio interior — drafting tables, pinned proof sheets, light from a north-facing window raking across surface; 0.5 m/s lateral drift, handheld at the slowest stabilized speed, slight film grain
- Duration: 10 seconds, seamless loop
- Why video: the about section establishes the human context behind the product; a slow studio drift implies the work environment without showing faces, communicating craft culture and spatial intelligence that a still photograph holds in suspension but cannot convey through temporal quality
