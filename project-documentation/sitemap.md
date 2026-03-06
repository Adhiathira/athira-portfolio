# Sitemap — AI Video Production Platform

---

## 1. High-Level Sitemap Overview

```
Public
 ├── Home (/)
 ├── Explore (/explore)
 ├── Pricing (/pricing)
 └── About (/about)

Authentication
 ├── Login (/login)
 └── Sign Up (/signup)

In-Product (Logged-In)
 └── Workspace (/app)
     ├── Studio (/app/studio)            ← creation tools
     ├── Community Feed (/app/community) ← peer activity, projects
     └── Creator Profile (/app/profile)  ← own profile, points, history
```

Public creator profiles (read-only) are accessible without login at `/creators/:username`.

---

## 2. Access Control Structure

**Public Access Pages**
- Home (`/`)
- Explore (`/explore`) — browse-only, no interaction
- Pricing (`/pricing`)
- About (`/about`)
- Login (`/login`)
- Sign Up (`/signup`)
- Public creator profiles (`/creators/:username`) — portfolio view only

**Engagement Without Login**
- Explore page allows full gallery browsing and media-type filtering without login
- Gallery hover states (video preview, creator name, community points) are visible
- Strategically justified: letting visitors see real work and real creator reputations is the primary trust mechanism — gating this would break the conversion logic

**Trigger Points That Require Login**
- Clicking "Make your own" or "Start creating" CTAs anywhere on the site
- Attempting to follow a creator or save a project from the Explore page
- Clicking "Get started" on the Pricing page

**Fully Gated Tools / Features**
- Studio creation workspace (`/app/studio`)
- Community feed (`/app/community`)
- Own creator profile, points, and project history (`/app/profile`)
- Submitting or publishing work
- Collaborating on another creator's project

---

## 3. Page Purpose Breakdown

### Home (`/`)
- **Primary goal:** Drive signups by moving visitors from cold discovery through trust to action in a single session
- **Target user segment:** Cold visitors from ads; warm visitors from search; returning unconverted visitors
- **Primary CTA:** "Start creating" (hero, post-gallery, closing section)
- **Secondary CTA:** "Explore" (nav, mid-page) / "Join" (persistent nav)
- **Login required:** No

---

### Explore (`/explore`)
- **Primary goal:** Let visitors witness the creative output of the community firsthand — converting passive browsers into platform believers
- **Target user segment:** Visitors who need proof before committing; creators evaluating community quality
- **Primary CTA:** "Make your own" (persistent, triggered after scroll depth)
- **Secondary CTA:** Creator profile links → `/creators/:username`
- **Login required:** No (browse only); Yes (interact, follow, save)

---

### Pricing (`/pricing`)
- **Primary goal:** Resolve commitment hesitation for warm visitors who have decided they want in but need to understand the cost
- **Target user segment:** Warm comparison shoppers; returning visitors in final decision stage
- **Primary CTA:** "Get started" (per plan)
- **Secondary CTA:** "Talk to us" (for enterprise or team queries)
- **Login required:** No (view); Yes (initiating a plan purchase)

---

### About (`/about`)
- **Primary goal:** Convert skeptics and mission-aligned visitors by articulating the founding vision, the "Figma for AI video" positioning, and the platform roadmap
- **Target user segment:** Skeptics needing narrative conviction; professionals evaluating the long-term platform bet; journalists and potential partners
- **Primary CTA:** "Join us"
- **Secondary CTA:** "Explore what's been made"
- **Login required:** No

---

### Login (`/login`)
- **Primary goal:** Authenticate returning users with zero friction
- **Target user segment:** Existing members
- **Primary CTA:** "Continue" (form submit)
- **Secondary CTA:** "Create an account" (for visitors who landed here first)
- **Login required:** No (it is the login page)

---

### Sign Up (`/signup`)
- **Primary goal:** Complete account creation with minimal friction, immediately unlocking the workspace
- **Target user segment:** New visitors completing the conversion funnel
- **Primary CTA:** "Start creating" (form submit)
- **Secondary CTA:** OAuth options (Google, GitHub)
- **Login required:** No

---

### Workspace — Studio (`/app/studio`)
- **Primary goal:** Deliver the creation experience — the product promise fulfilled
- **Target user segment:** All logged-in users at all skill levels
- **Primary CTA:** "Publish" / "Collaborate"
- **Secondary CTA:** In-product tutorial prompts (first session only)
- **Login required:** Yes

---

### Workspace — Community Feed (`/app/community`)
- **Primary goal:** Surface peer activity, collaborative opportunities, and reputation signals to drive ongoing engagement
- **Target user segment:** Active platform members; users seeking collaborators
- **Primary CTA:** "Join this project" / "Start a new project"
- **Secondary CTA:** Follow creator
- **Login required:** Yes

---

### Workspace — Creator Profile (`/app/profile`)
- **Primary goal:** Show the logged-in user their own creative identity — work published, points earned, community standing
- **Target user segment:** All logged-in users
- **Primary CTA:** "Start a new project"
- **Secondary CTA:** "Share my profile"
- **Login required:** Yes

---

### Public Creator Profile (`/creators/:username`)
- **Primary goal:** Showcase a specific creator's portfolio to drive inspiration-to-signup conversion among visitors who arrive via referral links or shared work
- **Target user segment:** Referred visitors; community members viewing peers
- **Primary CTA:** "Make your own" (for logged-out visitors) / "Follow" (for logged-in visitors)
- **Secondary CTA:** View individual project detail
- **Login required:** No (view); Yes (follow, collaborate)

---

## 4. Navigation Structure

**Top Navigation — Public**
- Create
- Explore
- Pricing
- About

**Utility Navigation — Public (right-aligned)**
- Log in
- Join (primary accent button)

**Top Navigation — Logged-In**
- Create
- Explore
- Community

**Utility Navigation — Logged-In (right-aligned)**
- Creator avatar → dropdown (Profile, Settings, Log out)

**Footer Navigation**
- Platform: Explore · Pricing · About
- Vision: Roadmap · Blog
- Legal: Privacy · Terms
- Social: (platform social links)

---

## 5. Conversion Flow Mapping

**Primary — Cold visitor reaching action**
```
Ad / Search → Home (hero) → Gallery scroll → "Make your own" CTA → Sign Up → /app/studio
```

**Primary — Warm visitor fast path**
```
Search → Home (hero) → "Start creating" CTA (hero) → Sign Up → /app/studio
```

**Secondary — Explore-led conversion**
```
Home → Explore → Creator gallery browse → specific creator output inspires → "Make your own" → Sign Up → /app/studio
```

**Secondary — Pricing-led conversion**
```
Home → Pricing → Plan decision made → "Get started" → Sign Up → /app/studio
```

**Secondary — About-led conversion**
```
Home → About → Mission resonates → "Join us" → Sign Up → /app/studio
```

**Secondary — Referral-led conversion**
```
Shared creator video link → /creators/:username → work inspires → "Make your own" → Sign Up → /app/studio
```

**Returning User**
```
Log in → /app/community or /app/studio → Resume or start project
```

---

## 6. Homepage Section Architecture

```
Navigation Bar
– Establishes creator vocabulary positioning before a word of marketing is read

Hero — Split-Screen, No Traditional Headline
– Delivers outcome proof wordlessly; cold visitors discover what is possible; warm visitors confirm intent

Creator Gallery — Full-Width UGC Showcase
– Resolves AI quality skepticism through real outputs; filterable by media type; community points visible on hover

How It Works — 3-Step, Icon-Led
– Provides process reassurance for visitors who need it without slowing committed visitors

Community Signals — Creator Cards + Live Platform Stat
– Makes the community feel real, active, and meritocratic; converts "tool interest" into "belonging interest"

Platform Roadmap Teaser — Coming Attractions
– Signals long-term vision; creates anticipation; rewards early adopters with a sense of founding membership

Final CTA Section — Distinct Emotional Gear Shift
– Tonally and visually separate from everything above; produces the "I want to make something right now" emotional exit that drives return visits and referrals
```
