# Core User Flows — AI Video Production Platform

**Generated:** 2026-03-06

---

## 1. Primary Conversion Flow

*The cold visitor carried from discovery to creative urgency in a single session.*

```
Step 1: Home (/) → Hero split-screen delivers outcome proof without explanation —
        visitor sees what becomes possible before being told what the platform is

Step 2: Home (/) → Creator Gallery scroll — real community outputs dissolve AI
        quality skepticism organically, without a sales argument being made

Step 3: Home (/) → "Make your own" CTA fires at the peak of inspiration, not at
        the bottom of a feature list — desire triggers the conversion, not pitch logic

Step 4: /signup → Account created via email + password or OAuth — minimal fields,
        a threshold crossed rather than a form submitted

Step 5: /app/studio → Creation workspace loads immediately — the product promise
        delivered before the user has time to second-guess
```

---

## 2. Secondary Conversion Flows

### Flow A — The Witness Path (Explore-Led)

*The visitor who needs to see before they believe — depth before commitment.*

```
Step 1: Home (/) → Visitor exits the homepage for depth — navigates to Explore
        before making a decision

Step 2: /explore → Gallery browsing begins — media-type filtering exposes
        the community's range; creator reputations and points surface on hover,
        making the ecosystem feel earned rather than curated

Step 3: /explore → A specific piece of work catches — the visitor enters a private
        "I want that" moment that no marketing copy could have manufactured

Step 4: /explore → "Make your own" CTA fires from desire, not from persuasion

Step 5: /signup → Account created

Step 6: /app/studio → Entry — the Explore page's emotional momentum carries
        directly into the first creative session
```

---

### Flow B — The Commitment Calculus Path (Pricing-Led)

*The warm visitor who has already decided — the only remaining question is the cost.*

```
Step 1: Home (/) → Visitor intent is already formed — navigates to Pricing to
        resolve the financial question, not to be convinced

Step 2: /pricing → Plans reviewed — the hesitation at this stage is mathematical,
        not emotional; the page's job is arithmetic clarity, not persuasion

Step 3: /pricing → Plan selected — "Get started" clicked, decision confirmed

Step 4: /signup → Account created

Step 5: /app/studio → Entry — this visitor arrives with the cleanest intent
        and the least residual doubt of any path
```

---

### Flow C — The Conviction Path (About-Led)

*The skeptic who needs to understand the "why" before they trust the "what."*

```
Step 1: Home (/) → Visitor has intent but not conviction — navigates to About
        because the product case alone hasn't closed the question

Step 2: /about → The "Figma for AI video" manifesto and founding vision meet
        the skepticism directly — narrative either resolves or doesn't

Step 3: /about → "Join us" CTA fires from mission alignment — this visitor
        is not buying a tool, they are joining a project they believe in

Step 4: /signup → Account created

Step 5: /app/studio → Entry
```

---

### Flow D — The Proof-Before-Platform Path (Referral-Led)

*The visitor who understands the platform through one person's work before ever seeing a marketing page.*

```
Step 1: /creators/:username → Visitor arrives directly via a shared creator link —
        no prior platform awareness; the creator's portfolio IS the introduction

Step 2: /creators/:username → Portfolio viewed — the platform's existence is
        understood through a single creator's identity and output quality

Step 3: /creators/:username → "Make your own" CTA fires — the emotional transfer
        happens from the creator's identity to the visitor's own creative possibility;
        this is the highest-intent moment in the entire conversion architecture

Step 4: /signup → Account created

Step 5: /app/studio → Entry — referral-path visitors arrive with the most
        creative urgency and the clearest mental model of what they're entering
```

---

## 3. First-Time User Flow

*From the first wordless impression to publishing a first piece of creative work.*

```
Step 1: Home (/) → Visitor arrives with zero platform knowledge — the hero
        section answers the question before it's formed: not "what is this?"
        but "what becomes possible when you're in?"

Step 2: Home (/) → Creator Gallery scroll — the community's presence becomes
        undeniable; the internal visitor question shifts from "can AI make
        good video?" to "what could I make here?"

Step 3: Home (/) → How It Works (3-step) — a brief process scan confirms
        low barrier; the visitor learns the effort is accessible even when
        the output is professional

Step 4: Home (/) → Community Signals — creator cards and live platform stats
        make belonging feel achievable, not merely aspirational

Step 5: Home (/) → Final CTA Section — "What will you make?" lands as a
        creative challenge rather than a closing pitch; the "I want to make
        something right now" moment is reached

Step 6: /signup → Account created — email + password or OAuth; the gap
        between desire and entry is as small as the platform can make it

Step 7: /app/studio → First session opens — in-product tutorial surfaces
        immediately (first session only), guiding through tool basics without
        blocking creative access; the tutorial serves the creative desire,
        not the reverse

Step 8: /app/studio → First project initiated — the visitor becomes a creator

Step 9: /app/studio → "Publish" → First work published; the creator now has
        a public identity and a point of entry into the community's reputation
        system — the first-time loop closes
```

---

## 4. Returning User Flow

*Speed and directness — the platform recognises a member who already knows why they came back.*

```
Step 1: /login → User navigates directly from a bookmark or typed URL;
        credentials entered or OAuth completes

Step 2: /login → Authentication completes → redirect

Step 3: /app/community or /app/studio → Dashboard entry — user lands in
        the space appropriate to their session state

Step 4: /app/community → Peer activity reviewed — new collaboration
        opportunities surfaced, community points and standing updated

Step 5: /app/studio → Active project resumed or new project initiated

Step 6: /app/studio → Project published or saved — the session closes
        with an output or a saved state to return to
```

---

## 5. Gated Access Flow

Authentication exists. The following trigger points initiate the public-to-authenticated transition:

```
Public Interaction → Login/Signup Trigger → Auth → Redirect → Tool/Dashboard
```

**Trigger A — Creation Intent**
```
"Make your own" or "Start creating" CTA (Home, Explore, /creators/:username)
    → /signup (new visitor) or /login (returning member)
    → Authentication completes
    → Redirect to /app/studio
```

**Trigger B — Plan Purchase**
```
"Get started" on /pricing
    → /signup
    → Authentication completes
    → Redirect to /app/studio
```

**Trigger C — Community Interaction**
```
"Follow" or "Save" action attempted from /explore or /creators/:username
    → /signup or /login prompt
    → Authentication completes
    → Redirect to originating page with the interrupted action available to complete
```

**Fully gated destinations (no unauthenticated entry):**
- `/app/studio` — creation workspace
- `/app/community` — community feed
- `/app/profile` — own creator profile, points, and project history

---

## 6. Drop-Off Sensitive Points

*Where the sitemap's structure creates structural friction — independent of implementation quality.*

```
Home (/) — Creator Gallery
→ The gallery bears the primary trust-building weight but loads video-heavy
  content in a session where the visitor has committed nothing; if load
  performance degrades, trust collapses at the exact moment it should be
  forming — the gallery's job and its vulnerability are identical

Home (/) — "Make your own" CTA (post-gallery)
→ The CTA fires at the peak of creative desire but requires a full account
  before the visitor can act; the emotional distance between wanting to make
  something and being inside the studio is the platform's highest-stakes gap

/signup
→ The only mandatory gate between desire and the product; every field,
  error state, or friction introduced here compounds loss at the moment
  the visitor is most committed — the conversion architecture's most exposed point

/explore — Community interaction trigger
→ The page allows full browsing without login, but the moment a visitor
  attempts to follow or save (both signals of high engagement), they are
  interrupted mid-action by an auth requirement; the action they were
  completing does not auto-complete post-authentication — engagement
  intent is interrupted at its peak

/creators/:username
→ Referral-path visitors arrive with no platform context; this page must
  independently carry full conversion weight as the visitor's entire
  introduction to the platform — if the "Make your own" CTA does not
  surface at the right moment in this isolated context, the referral
  loop breaks at its most promising point

/login — Credential recovery
→ Returning users who cannot immediately authenticate have no smooth
  re-engagement path visible in the sitemap; the structural gap between
  "I can't get in" and "I remember why I wanted in" is where re-engagement
  intent quietly dies
```
