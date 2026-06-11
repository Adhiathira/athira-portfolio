# griting.ai — Site Architecture

**Generated:** 2026-03-09
**Source:** project-documentation/goal.md

---

## 1. High-Level Sitemap Overview

```
Public
 ├── / (Homepage)
 ├── /partners/gritme-auditable
 │   └── [contact form → confirmation state]
 └── /partners/gritme-incubation
     └── [contact form → confirmation state]

External Destinations (linked from homepage, not hosted on domain)
 ├── Gritme Mentorship → [external URL, opens new tab]
 ├── Grithub → [coming soon — no link, in development]
 └── Grit Lab → [coming soon — no link, in development]
```

**Authentication area:** None. No login, no sign-up, no account system on this domain. All pages are publicly accessible.

---

## 2. Access Control Structure

**Public Access Pages**
- `/` — Homepage: all visitors, no restriction
- `/partners/gritme-auditable` — Auditable partner page: all visitors, no restriction
- `/partners/gritme-incubation` — Incubation partner page: all visitors, no restriction

**Engagement Without Login**
Not applicable. No login mechanism exists on this domain. Form submission requires no account — name, company, email, product interest, and message only.

**Trigger Points That Require Login**
None. The contact form is the conversion point; depth comes in the follow-up. No content is withheld behind authentication.

**Fully Gated Tools / Features**
None at launch. The site is a lead-generation and B2C routing instrument — a gateless architecture is the correct call at this stage.

---

## 3. Page Purpose Breakdown

### Homepage — `/`

| Field | Value |
|---|---|
| **Primary goal** | Orient cold visitors to Griting's company identity and route each audience type — enterprise partners and individual builders — to their respective track |
| **Target user segment** | Cold visitors: enterprise decision-makers (CHROs, CTOs, Operations leads at mid-size organizations) and individuals building AI careers |
| **Primary CTA** | "Talk to us about Gritme Auditable" / "Talk to us about Gritme Incubation" — B2B, visually dominant, appears only in the second half of the page |
| **Secondary CTA** | "Visit Gritme Mentorship" — B2C, directional, opens external site in new tab |
| **Login required** | No |

---

### Gritme Auditable Partner Page — `/partners/gritme-auditable`

| Field | Value |
|---|---|
| **Primary goal** | Create sufficient clarity and institutional credibility about the Auditable system to make contact form submission the visitor's natural next step — not to fully explain the product |
| **Target user segment** | Enterprise decision-makers evaluating AI talent verification and accountability infrastructure for their organization |
| **Primary CTA** | "Send your inquiry" — contact form submission, with "We respond within 24 hours" adjacent to submit |
| **Secondary CTA** | None — single-conversion-point page by design |
| **Login required** | No |

---

### Gritme Incubation Partner Page — `/partners/gritme-incubation`

| Field | Value |
|---|---|
| **Primary goal** | Create sufficient clarity and institutional credibility about the Incubation system to make contact form submission the visitor's natural next step |
| **Target user segment** | Enterprise decision-makers building or scaling internal AI capability programs |
| **Primary CTA** | "Send your inquiry" — contact form submission, with "We respond within 24 hours" adjacent to submit |
| **Secondary CTA** | None — single-conversion-point page by design |
| **Login required** | No |

---

## 4. Navigation Structure

**Top Navigation (Public)**
- Griting wordmark — links to `/`
- "For Partners" — anchor to the partner product section on the homepage
- "For Individuals" — anchor to the individual product section on the homepage
- No CTA in the navigation bar — consistent with the first-half CTA-free rule on the homepage

**Logged-In Navigation**
Not applicable — no authenticated state exists on this domain.

**Footer Navigation**
- Partners: Gritme Auditable (`/partners/gritme-auditable`) · Gritme Incubation (`/partners/gritme-incubation`)
- Individuals: Gritme Mentorship (external link) · Grithub (labeled "In development") · Grit Lab (labeled "In development")
- Company: contact email address

**Utility Navigation**
None — no login, sign-up, dashboard, or account management on this domain. The utility layer is deliberately absent; wayfinding is purely audience-track-based.

---

## 5. Conversion Flow Mapping

**Primary — B2B, Gritme Auditable:**
```
Homepage (cold arrival)
  → Company identity + infrastructure framing [no CTA]
  → Track Fork — visitor self-selects "For Partners"
  → Gritme Auditable card: "Talk to us about Gritme Auditable"
  → /partners/gritme-auditable
  → Contact form submission
  → Confirmation state: "Got it. We'll be in touch within 24 hours."
```

**Primary — B2B, Gritme Incubation:**
```
Homepage (cold arrival)
  → Company identity + infrastructure framing [no CTA]
  → Track Fork — visitor self-selects "For Partners"
  → Gritme Incubation card: "Talk to us about Gritme Incubation"
  → /partners/gritme-incubation
  → Contact form submission
  → Confirmation state: "Got it. We'll be in touch within 24 hours."
```

**Secondary — B2C, Gritme Mentorship:**
```
Homepage (cold arrival)
  → Company identity + infrastructure framing [no CTA]
  → Track Fork — visitor self-selects "For Individuals"
  → Gritme Mentorship card: "Visit Gritme Mentorship"
  → [External site opens in new tab]
```

**Dead-end flows (by design):**
```
Homepage → Grithub card → "In development" [no action, no link, intentional]
Homepage → Grit Lab card → "In development" [no action, no link, intentional]
```

**Direct navigation (returning or referred visitor):**
```
/partners/gritme-auditable → Contact form → Confirmation state
/partners/gritme-incubation → Contact form → Confirmation state
```

---

## 6. Homepage Section Architecture

Ordered sections, each with purpose. Zero CTAs in sections 1–4.

```
1. Navigation
   Purpose: Persistent audience-track orientation — logo, "For Partners", "For Individuals" only.
   No CTA. Sets wayfinding language before visitor reads a word of body copy.

2. Identity Field
   Purpose: Company name + exact positioning claim ("Talent trust and readiness infrastructure
   for the AI capital") + bridge sub-line ("For organizations building AI teams. For individuals
   building AI careers."). Particle canvas animation behind. Text renders before particles complete.
   No CTA. The full weight of the brand identity lands here before any ask is made.

3. Infrastructure Diagnosis
   Purpose: 1–2 sentences naming the fragmentation problem the visitor already lives with,
   followed immediately by Griting as the consolidation answer. Not a "pain section" —
   a positioning bridge. No CTA. Earns the right to present products.

4. Track Fork
   Purpose: Visual and structural separation of "For Partners" and "For Individuals" tracks.
   Frames the next section as a visitor-made choice, not a product catalog.
   No CTA. Visitor chooses their path before any product is named.

5. Partner Products
   Purpose: Gritme Auditable + Gritme Incubation — each card using the fixed template:
   product name + one-sentence description + three specific capability statements +
   "who this is not for" + CTA. B2B track receives visual hierarchy advantage.
   First CTA appearance on the page.

6. Individual Products
   Purpose: Gritme Mentorship (live, external CTA) + Grithub (coming soon) + Grit Lab (coming soon).
   Coming-soon cards carry "In development" label and one forward-looking description sentence.
   No CTA on coming-soon cards — no waitlist, no email capture.

7. Commitment Statement
   Purpose: One declarative sentence naming what Griting is building toward. No urgency language.
   No CTA. The restraint is the signal — this is the emotional close that produces quiet confidence.

8. Footer
   Purpose: Company name, partner page links, individual product links, contact.
   Nothing decorative. The precision of the footer is consistent with the precision of the site.
```
