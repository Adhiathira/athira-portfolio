# Website Page Behavioral Blueprint — AI Video Production Platform

**Generated:** 2026-03-06

---

## Section 1 — Page-Level Behavioral Blueprint

---

```
Page: Home (/)
Page Objective: Carry every visitor — regardless of prior intent level — to a state of
  creative urgency sufficient to trigger account creation in a single session.
What the user must understand within 5–10 seconds: Real people make real videos here
  together, and the output is better than anything they could produce alone.
Primary action the user must take: Click "Start creating" or "Make your own" —
  initiating account creation
Secondary action (if applicable): Navigate to Explore for deeper proof before committing
Emotional state to reinforce: Creative urgency — "I want to make something right now,"
  not passive inspiration or casual curiosity
Critical friction risk: The creator gallery is simultaneously the primary trust mechanism
  and the heaviest asset load; if video performance degrades at the exact moment trust
  should be forming, the conversion chain breaks at its most critical and irreplaceable link
```

---

```
Page: Explore (/explore)
Page Objective: Convert passive witnessing into active creative identification — the
  precise moment a visitor stops watching others' work and starts imagining their own.
What the user must understand within 5–10 seconds: This community produces real, diverse,
  high-quality work across multiple creative registers — and they could be part of it.
Primary action the user must take: Click "Make your own" after encountering specific
  creator output that triggers personal creative desire
Secondary action (if applicable): Navigate to a creator's public profile (/creators/:username)
Emotional state to reinforce: Specific creative envy — "I want that" — which converts
  more reliably than general inspiration because it is object-directed
Critical friction risk: When a visitor attempts to follow or save (their highest-engagement
  action on this page), the auth interruption breaks the action mid-stream and the
  interrupted action does not auto-complete post-login — engagement intent evaporates
  at the exact peak of its expression
```

---

```
Page: Pricing (/pricing)
Page Objective: Remove the last obstacle — cost — from a visitor who has already
  emotionally committed to joining and is now resolving arithmetic, not conviction.
What the user must understand within 5–10 seconds: The financial commitment required
  to start is clear, accessible, and smaller than expected.
Primary action the user must take: Click "Get started" on their chosen plan
Secondary action (if applicable): Click "Talk to us" for team or enterprise consideration
Emotional state to reinforce: Confident clarity — this visitor has already made the
  creative decision; the emotional state needed is permission-to-act, not persuasion
Critical friction risk: Plan differentiation that is too complex or comparative forces
  cognitive work at the wrong moment — when this visitor wants to act, not analyze;
  complexity at this stage reintroduces doubt that was already resolved
```

---

```
Page: About (/about)
Page Objective: Transform intellectual skepticism into mission alignment — converting
  the visitor who needs to understand "why" before they can trust "what."
What the user must understand within 5–10 seconds: This platform was built with a
  specific and serious vision — democratizing video production the way Figma democratized
  design — and the founding team is credible enough to pursue it.
Primary action the user must take: Click "Join us" after reading the founding narrative
Secondary action (if applicable): Click "Explore what's been made" to bridge narrative
  conviction with empirical evidence
Emotional state to reinforce: Belief — the sense of joining a project worth being part
  of, not just a tool worth using
Critical friction risk: If the manifesto reads as generic mission statement rather than
  earned, specific conviction, the skeptic this page was built for will exit unconvinced;
  generic mission language is the same trust-failure as generic AI output
```

---

```
Page: Login (/login)
Page Objective: Authenticate returning members without introducing friction that makes
  re-entry feel like re-evaluation of a decision already made.
What the user must understand within 5–10 seconds: Getting back in is fast and the
  work they were doing is waiting for them.
Primary action the user must take: Submit credentials or complete OAuth flow
Secondary action (if applicable): Click "Create an account" — for visitors who arrived
  at /login before encountering the marketing site
Emotional state to reinforce: Continuity — the returning member should feel they never
  left, not that they are beginning again
Critical friction risk: No visible recovery or re-engagement path for users who cannot
  immediately authenticate; "I can't get in" quietly collapses the re-engagement intent
  that brought them back — the structural gap between failed login and remembered motivation
  is where returning users are permanently lost
```

---

```
Page: Sign Up (/signup)
Page Objective: Close the distance between desire and access — the gap between "I want
  to make something" and "I am inside the workspace" must be measured in seconds, not steps.
What the user must understand within 5–10 seconds: This is the last step before
  full access; it is minimal and the thing waiting on the other side is worth it.
Primary action the user must take: Submit account creation via email + password or OAuth
Secondary action (if applicable): Switch to OAuth if email form introduces friction
Emotional state to reinforce: Threshold — this is a gate worth crossing, not a form
  worth completing; the framing must carry access-granting weight, not administrative weight
Critical friction risk: Every field, error state, and validation message here is not
  merely friction — it is an opportunity for creative urgency (the most perishable
  conversion emotion) to dissipate before the visitor reaches the tool; this page's
  danger is not complexity but latency
```

---

```
Page: Workspace — Studio (/app/studio)
Page Objective: Deliver the product promise — the creation experience that every page
  before this one built the anticipation for.
What the user must understand within 5–10 seconds: The tool is accessible, immediately
  productive, and already working in service of their creative intent.
Primary action the user must take: Publish or share a completed project
Secondary action (if applicable): Complete first-session in-product tutorial
Emotional state to reinforce: Creative momentum — the feeling of being inside a tool
  that is amplifying their capability, not managing their learning curve
Critical friction risk: A first-session tutorial that arrives as a prerequisite rather
  than a service; it must surface in support of creative desire already in motion —
  if it gates the tool, it breaks the product promise at the moment of delivery
```

---

```
Page: Workspace — Community Feed (/app/community)
Page Objective: Convert solo creators into active community participants by making
  collaboration opportunities and reputation signals visible and personally relevant.
What the user must understand within 5–10 seconds: Real projects are here that they
  could join, and real creators are building reputations worth following and emulating.
Primary action the user must take: Click "Join this project" or "Start a new project"
Secondary action (if applicable): Follow a creator
Emotional state to reinforce: Belonging — the sense that this community has a specific
  place for them, not just a feed for creators in general
Critical friction risk: A community feed populated with activity that does not match
  the user's creative interests creates a sense of irrelevance — weakening the retention
  layer that is the platform's core competitive moat
```

---

```
Page: Workspace — Creator Profile (/app/profile)
Page Objective: Make the logged-in user's creative identity visible and accumulating —
  transforming platform participation into a reputation worth protecting and growing.
What the user must understand within 5–10 seconds: What they have built here is real,
  public, and compounding in value with every project published.
Primary action the user must take: Click "Start a new project"
Secondary action (if applicable): Click "Share my profile" — converting creative identity
  into a referral channel and seeding Flow D (referral-led conversion) for new visitors
Emotional state to reinforce: Creative ownership — the user sees themselves as a creator
  with a presence and standing, not a user with a login
Critical friction risk: A profile that feels empty or undervalidated in early stages —
  before the user has built history — creates a sense of creative poverty that is the
  exact opposite of the ownership emotion this page must reinforce; early-state profile
  design must make even a thin portfolio feel like the beginning of something
```

---

```
Page: Public Creator Profile (/creators/:username)
Page Objective: Let a single creator's body of work carry the entire platform
  introduction for a referral visitor who arrives with no prior context and no
  marketing frame — the portfolio IS the pitch.
What the user must understand within 5–10 seconds: A real person made this on this
  platform — and the platform that made this possible is worth entering.
Primary action the user must take: Click "Make your own" — from creative identification
  with the creator's output, not from a sales argument
Secondary action (if applicable): Browse individual project detail within the portfolio
Emotional state to reinforce: "I could do that here" — the specific transfer of creative
  ambition from the creator's identity to the visitor's own creative possibility
Critical friction risk: This page is the entire referral conversion loop's single point
  of failure; if "Make your own" does not surface at the right moment in a page the
  visitor arrived at with no platform context, the referral breaks at its most promising
  and highest-intent entry point; there is no fallback path if this page does not convert
```

---

## Section 2 — Scroll Logic Structure (Per Key Page)

---

**Home (/) — Scroll Progression**

```
Section 1: The Proof Before the Promise
  Behavioral purpose: Deliver outcome evidence wordlessly through the split-screen hero;
  visitor understanding arrives before a sales argument exists; cold visitors discover
  what becomes possible, warm visitors confirm what they already suspected

Section 2: The Community Witnessed
  Behavioral purpose: Full-width creator gallery makes the creative ecosystem tangible
  and populated; real work from real people dissolves AI quality skepticism without
  a claim being made — evidence does the persuasion that marketing copy cannot

Section 3: The Mechanism Named
  Behavioral purpose: 3-step process section gives the process-curious visitor the
  process reassurance they need without slowing the visitor who has already decided;
  serves as a toll gate for the anxiety that blocks action, not as a feature explanation

Section 4: The People Behind the Work
  Behavioral purpose: Creator cards and community stats make belonging feel achieved
  and proximate, not aspirational and distant; the platform feels alive with peers doing
  work adjacent to the visitor's own creative intent

Section 5: The Horizon Shown
  Behavioral purpose: Platform roadmap teaser reframes signup as founding membership,
  not product trial; Video → Animation → Film progression signals this is infrastructure
  the visitor is joining early — before the full vision is realized

Section 6: The Creative Dare
  Behavioral purpose: Distinct emotional gear shift — darker register, bolder type, kinetic
  energy — releases the creative urgency accumulated across the full scroll; "What will you
  make?" lands as a personal creative challenge, not a closing sales beat; the emotional
  state produced here (not the copy) is what drives action
```

---

**Explore (/explore) — Scroll Progression**

```
Section 1: The Full Field Revealed
  Behavioral purpose: Filter bar and immediate gallery exposure present the community's
  creative range at full scale before any CTA exists; the session begins as discovery,
  not conversion — this is intentional; premature CTAs would interrupt the trust-forming
  browse behavior that makes "Make your own" fire with genuine desire

Section 2: The Depth Available
  Behavioral purpose: Media type filtering activates the visitor's agency; each filter
  choice is a micro-commitment to engagement and a signal of their creative interest
  direction; the platform's range becomes personally navigable rather than generically large

Section 3: The Human Behind the Work
  Behavioral purpose: Creator hover states reveal names, community points, and profile
  access; the ecosystem's reputation layer becomes visible — and desirable; visitors begin
  to see not just outputs but creative identities they could join or emulate

Section 4: The "I Want That" Moment
  Behavioral purpose: Scroll depth triggers the persistent "Make your own" CTA at the
  point where creative identification is statistically most likely; the trigger condition
  is demonstrated engagement, not page arrival — the CTA fires from desire, not from pitch
```

---

**Pricing (/pricing) — Scroll Progression**

```
Section 1: The Positioning Framed
  Behavioral purpose: Brief opening statement anchors the cost conversation in value
  rather than price; this visitor has already decided they want in — the first section
  confirms that the decision they made is the right framing for what follows

Section 2: The Plans Laid Clear
  Behavioral purpose: Plan cards presented in clean comparative structure; the cognitive
  work is arithmetic (which plan fits my situation), not evaluation (should I sign up);
  clarity serves this visitor more than persuasion because the persuasion was already
  completed on the pages before this one

Section 3: The Team Path Acknowledged
  Behavioral purpose: Enterprise or team inquiry option presents an alternative commitment
  path without competing with the primary individual CTA; brief, non-distracting, present
  for the visitor who needs it without creating noise for the individual who doesn't

Section 4: The Final Permission
  Behavioral purpose: "Get started" reiteration at page bottom for the visitor who reads
  everything before acting; the scroll to this point is not hesitation — it is thoroughness;
  this CTA gives the thorough visitor immediate action availability at the end of their read
```

---

**About (/about) — Scroll Progression**

```
Section 1: The Audacity Named
  Behavioral purpose: The "Figma for AI video" manifesto opens without hedging; the
  platform's positioning is stated, not suggested or softened; skeptics who reject the
  frame self-select out immediately — this page has no conversion value for someone who
  fundamentally disagrees with the premise, and trying to hedge for them weakens the
  conviction that converts the right visitor

Section 2: The Problem Earned
  Behavioral purpose: Video production for the ordinary person today — slow, solo,
  inaccessible — grounds the platform's origin in a recognizable experience; the visitor
  sees themselves in the problem before they see themselves in the solution

Section 3: The Vision Grounded
  Behavioral purpose: Founding team and their credibility; the roadmap showing the
  expansion arc (Video → Animation → Film → beyond); this is a long-term creative
  infrastructure play — the visitor is being invited to understand the bet before joining it

Section 4: The Evidence Offered
  Behavioral purpose: Real community outputs and creator names bridge from narrative
  conviction to empirical proof; the "Explore what's been made" path offers the
  empirically-minded skeptic a way to verify the manifesto claims through real output

Section 5: The Invitation Extended
  Behavioral purpose: "Join us" CTA in context of the full mission narrative; by this
  scroll depth, the visitor is either converted by conviction or not convertible by this
  page; the CTA frames joining as mission alignment, not product adoption
```

---

**Public Creator Profile (/creators/:username) — Scroll Progression**

```
Section 1: The Creator Introduced
  Behavioral purpose: Name, profile image, community standing, and points establish
  the human identity before the creative output; the visitor understands they are
  looking at a specific person's creative identity, not a portfolio template

Section 2: The Work Exhibited
  Behavioral purpose: Project portfolio at full quality; video output plays on hover;
  the platform's capabilities are demonstrated entirely through the creator's creative
  identity — no feature claims, no marketing overlay; the work speaks for the platform

Section 3: The Platform Surfaced
  Behavioral purpose: Brief contextual "made on [Platform]" framing answers the
  implicit question "how did they make this?" without presenting a feature list;
  the platform earns its mention through the quality of the work that preceded it

Section 4: The Invitation Timed
  Behavioral purpose: "Make your own" surfaces at scroll depth where the portfolio
  has been sufficiently witnessed; for logged-out visitors only; timed to fire at the
  moment creative identification — "I could do that here" — is most fully formed
```

---

## Section 3 — CTA Placement Logic

---

**Home (/)**

```
Primary CTA: "Start creating"
  Location: Hero section, below split-screen proof
  Trigger condition: Page load — fires for warm visitors who arrive with intent already
  formed; they act before scrolling; this is the fast path for the visitor who does
  not need to be convinced

Secondary CTA: "Make your own"
  Location: Immediately post-creator gallery, before the "How It Works" section
  Trigger condition: Gallery has been witnessed; creative desire is at its freshest
  and AI skepticism has just been dissolved by real outputs — this is the highest-
  conversion moment in the homepage scroll for cold visitors

Urgency/pressure point: Final CTA section — "What will you make?"
  Location: Page bottom, distinct visual register
  Trigger condition: Visitor has experienced the full emotional arc of the homepage
  scroll; the urgency here is not scarcity-manufactured — it is the release of
  possibility accumulated across every section above

Login/signup trigger: Any "Start creating" or "Make your own" click
  Routes new visitors to /signup, returning visitors to /login
  The creative intent triggers the authentication; the authentication does not gate
  the creative intent — the sequencing matters behaviorally
```

---

**Explore (/explore)**

```
Primary CTA: "Make your own"
  Location: Persistent element appearing after approximately 50% of gallery scroll depth
  Trigger condition: Visitor has demonstrated active engagement through scroll behavior,
  not merely page arrival; depth is the proxy for desire

Secondary CTA: Creator profile links
  Location: Available on hover of any gallery card
  Trigger condition: Always available; visitor follows creative curiosity rather than
  being redirected by the platform; deepens engagement before conversion

Urgency/pressure point: None
  Rationale: This page's conversion logic is patience-based; pressure would interrupt
  the organic "I want that" moment this page is designed to cultivate; any urgency
  mechanism here would work against the page's primary behavioral function

Login/signup trigger: "Make your own" click → /signup (new) or /login (returning)
  Also fires on Follow or Save attempt — auth intercept appears in context without
  page redirect; return path must bring the visitor back to the originating gallery
  card with the interrupted action immediately retriable
```

---

**Pricing (/pricing)**

```
Primary CTA: "Get started"
  Location: Within each plan card, immediately adjacent to price and plan specifics
  Trigger condition: Visitor has read their chosen plan; decision already made, action
  immediately available without requiring navigation or additional scroll

Secondary CTA: "Talk to us"
  Location: Below plan section, not competing with plan cards
  Trigger condition: Visitor has scrolled past all plans without clicking "Get started";
  presents an alternative commitment path for the team or enterprise consideration case

Urgency/pressure point: None
  Rationale: This visitor does not need urgency — they need clarity; urgency would
  reintroduce doubt in a visitor who has already resolved their commitment; this is
  the page where pressure is most counterproductive

Login/signup trigger: "Get started" click → /signup
  Plan selection should be preserved through auth completion; this visitor should
  not be required to re-choose after completing signup
```

---

**About (/about)**

```
Primary CTA: "Join us"
  Location: End of manifesto/vision section, after founding narrative and platform roadmap
  Trigger condition: Mission alignment has been established through the scroll; this CTA
  fires from conviction, not from feature evaluation; the visitor is joining something,
  not signing up for something

Secondary CTA: "Explore what's been made"
  Location: Mid-page, after problem/vision section, before team section
  Trigger condition: Visitor has absorbed the narrative but wants empirical verification
  before mission alignment is complete; this CTA gives the evidence-first visitor a path
  to proof without abandoning the conversion flow

Urgency/pressure point: None

Login/signup trigger: "Join us" → /signup
  This visitor may be the most considered and intentional signup in the entire funnel;
  high lifetime value probability given the depth of conviction required to reach this CTA
```

---

**Public Creator Profile (/creators/:username)**

```
Primary CTA: "Make your own"
  Location: Below portfolio section, visible after portfolio scroll
  Trigger condition: Logged-out visitors only; fires after visitor has witnessed at
  least one complete project in the portfolio; timed to creative identification peak,
  not to page load

Secondary CTA: View project detail (within portfolio)
  Location: Available on each project card
  Trigger condition: Always available; leads deeper into the creator's specific work;
  the extended depth of engagement increases creative identification and ultimately
  increases "Make your own" conversion probability

Urgency/pressure point: None

Login/signup trigger: "Make your own" click → /signup
  Referral path visitors arrive via personal recommendation and act from direct creative
  desire — this is the highest-intent trigger moment in the full conversion architecture;
  the auth gate here must be as frictionless as the platform can make it
```

---

## Section 4 — Engagement & Trigger Mapping

The sitemap includes pre-login interaction (Explore allows full gallery browsing, gates social interaction), gated tools (Studio, Community Feed, Creator Profile), onboarding (Studio first session), and creation flows (Studio). All four conditions are present.

---

```
Trigger: Creation Intent — Primary Gate
Exact trigger moment: Visitor clicks "Start creating" or "Make your own" on any
  public page (Home, Explore, /creators/:username)
What happens when user attempts to proceed: Authentication gate activates; creative
  urgency — the most perishable conversion emotion — is the resource being protected
  by minimizing the steps between desire and the tool; new visitors route to /signup,
  returning visitors route to /login
Authentication intercept location: CTA button click on Home (/), Explore (/explore),
  or Public Creator Profile (/creators/:username)
Redirect after authentication: /app/studio — direct, no intermediate confirmation
  or orientation landing; the product promise is delivered before second-guessing forms
```

---

```
Trigger: Community Interaction — Mid-Engagement Gate
Exact trigger moment: Visitor attempts to follow a creator or save a project while
  browsing /explore or /creators/:username
What happens when user attempts to proceed: Auth intercept fires mid-action; this
  is the most structurally dangerous trigger point in the conversion architecture —
  the visitor is at their highest engagement when interrupted; the action they were
  completing does not auto-complete after authentication unless the platform explicitly
  handles this state; unhandled, the intent evaporates
Authentication intercept location: Follow button or Save action on /explore gallery
  cards and /creators/:username
Redirect after authentication: Returns to originating page (/explore or
  /creators/:username) with the interrupted action immediately available to retry;
  the return must surface the action without requiring the visitor to remember what
  they were attempting — the system must remember it for them
```

---

```
Trigger: Plan Purchase — Pricing Gate
Exact trigger moment: Visitor clicks "Get started" on a specific plan card on /pricing
What happens when user attempts to proceed: Auth gate activates for new visitors;
  plan selection should be preserved through auth completion — the visitor must not
  re-choose their plan after signing up; plan context carried through the auth flow
Authentication intercept location: "Get started" button within plan card on /pricing
Redirect after authentication: /app/studio with plan activation confirmed; this
  visitor's intent is the most defined in the entire funnel — the redirect must confirm
  what they are entering, not present a new decision
```

---

```
Trigger: First-Session Onboarding — Post-Auth In-Product
Exact trigger moment: New user's first entry into /app/studio after completing /signup
What happens when user attempts to proceed: In-product tutorial surfaces contextually
  within the studio; tutorial is available but not mandatory — it serves the creative
  desire already in motion, it does not gate tool access; returning users see no tutorial
  on subsequent sessions
Authentication intercept location: Not applicable — user is already authenticated;
  this trigger is post-auth, first-session only
Redirect after authentication: Not applicable
```

---

## Section 5 — Conversion Alignment Check

---

```
Flow: Primary Conversion Flow
Entry page: Home (/)
Decision point: Creator Gallery — "Make your own" CTA fires post-gallery at peak
  creative desire; warm visitors may convert at hero "Start creating" before gallery
Conversion action: "Start creating" or "Make your own" clicked → /signup account created
Success state page: /app/studio
```

---

```
Flow: Flow A — The Witness Path (Explore-Led)
Entry page: Home (/) → Explore (/explore)
Decision point: /explore — a specific creator's output triggers personal "I want that"
  creative identification; scroll depth determines when "Make your own" surfaces
Conversion action: "Make your own" clicked → /signup account created
Success state page: /app/studio
```

---

```
Flow: Flow B — The Commitment Calculus Path (Pricing-Led)
Entry page: Home (/) → Pricing (/pricing)
Decision point: /pricing — plan selected, cost resolved; visitor was already decided
  before arriving at this page; the decision point here is mathematical, not emotional
Conversion action: "Get started" clicked on chosen plan → /signup account created
Success state page: /app/studio
```

---

```
Flow: Flow C — The Conviction Path (About-Led)
Entry page: Home (/) → About (/about)
Decision point: /about — founding manifesto and "Figma for AI video" positioning either
  resolves skepticism through narrative alignment or does not; no intermediate state
Conversion action: "Join us" clicked → /signup account created
Success state page: /app/studio
```

---

```
Flow: Flow D — The Proof-Before-Platform Path (Referral-Led)
Entry page: /creators/:username (direct arrival, no prior platform context)
Decision point: /creators/:username — portfolio witnessed; "Make your own" surfaces
  at scroll depth where creative identification is highest; the creator's identity
  carries the full platform introduction independently
Conversion action: "Make your own" clicked → /signup account created
Success state page: /app/studio
```

---

```
Flow: First-Time User Flow
Entry page: Home (/)
Decision point: Final CTA Section — "What will you make?" functions as creative dare
  that releases accumulated urgency from the full homepage scroll
Conversion action: "Start creating" → /signup completed → /app/studio first session
  opens with in-product tutorial active; first project initiated; "Publish" converts
  visitor to creator with public identity and community standing
Success state page: /app/studio (first project published — the loop closes)
```

---

```
Flow: Returning User Flow
Entry page: /login
Decision point: Credential submission or OAuth completion — authentication
Conversion action: Login completes; redirect to /app/community or /app/studio based
  on session state
Success state page: /app/community or /app/studio
```

---

```
Flow: Gated Access Flow
Entry page: Any public page with a creation or interaction CTA
Decision point: Auth intercept — new visitor vs. returning member routing; the
  behavioral architecture must distinguish between the two states and route appropriately
Conversion action: /signup completed (new visitor) or /login completed (returning member)
Success state page: /app/studio (for creation intent triggers); originating page with
  interrupted action retriable (for community interaction triggers)
```
