/* canvas-folio — Overlay Component
 *
 * Handles click-to-expand overlay for the mood board canvas.
 * When a user clicks a canvas item with a `data-portfolio` attribute,
 * a full-page overlay opens showing scrollable page content.
 *
 * Click/drag disambiguation: because the canvas is pannable, mousedown+mouseup
 * on a portfolio item could be a click (open overlay) or a drag (pan). We track
 * mouse displacement and only treat < 5px movement as a click.
 *
 * Accessibility: focus trapping inside the open panel, Escape to close,
 * aria-hidden toggling, and focus return to the trigger element on close.
 *
 * NOTE: innerHTML is used below with developer-controlled static content only
 * (the portfolioData object is hardcoded inside this IIFE). No user input is
 * interpolated, so there is no XSS risk.
 *
 * Assumes the overlay HTML structure already exists in the DOM:
 *   <div id="overlay" class="overlay" aria-hidden="true">
 *     <div class="overlay-backdrop"></div>
 *     <div class="overlay-panel">
 *       <button class="overlay-close" aria-label="Close">&times;</button>
 *       <div class="overlay-content"></div>
 *     </div>
 *   </div>
 */

(function() {
  'use strict';

  // ── Portfolio data ─────────────────────────────────────────────────────────
  var portfolioData = {
    'tokyo-project': {
      title: 'About Me',
      subtitle: 'Designer, maker, collector of things.',
      tags: ['Design', 'Identity', 'Curation'],
      heroImage: null, // placeholder — no real image
      body: '<p>I\u2019m a visual designer who believes the best digital work still feels like it was made by hand. My practice spans brand identity, editorial design, and interactive experiences - always grounded in typography, texture, and storytelling.</p>' +
        '<p>This board is a living mood board - a place where I pin ideas, references, and fragments of projects I care about. Some are polished, some are rough. That\u2019s the point.</p>' +
        '<div class="overlay-details">' +
          '<div class="overlay-detail"><span class="overlay-detail-label">Based in</span><span class="overlay-detail-value">Brooklyn, NY</span></div>' +
          '<div class="overlay-detail"><span class="overlay-detail-label">Experience</span><span class="overlay-detail-value">8 years</span></div>' +
          '<div class="overlay-detail"><span class="overlay-detail-label">Focus</span><span class="overlay-detail-value">Brand Identity, Editorial</span></div>' +
          '<div class="overlay-detail"><span class="overlay-detail-label">Currently</span><span class="overlay-detail-value">Open to freelance</span></div>' +
        '</div>' +
        '<h3 class="overlay-section-title">What I Do</h3>' +
        '<p>I help startups and creative studios build visual identities that feel genuine. From logo systems to full brand guidelines, I work at the intersection of strategy and craft.</p>' +
        '<p>My process starts with listening - understanding the story a brand wants to tell, then finding the visual language to tell it. I believe constraints breed creativity, and the best identities come from deep understanding, not decoration.</p>' +
        '<div class="overlay-img-grid">' +
          '<div class="overlay-img-half">workspace photo</div>' +
          '<div class="overlay-img-half">process snapshot</div>' +
        '</div>' +
        '<h3 class="overlay-section-title">Philosophy</h3>' +
        '<div class="overlay-callout"><p>\u201CDesign should feel inevitable - like the only possible answer to the question that was asked.\u201D</p></div>' +
        '<p>I draw inspiration from print design, architecture, and the imperfection of handmade things. Every project is an opportunity to make something that couldn\u2019t have been made by an algorithm.</p>' +
        '<hr class="overlay-divider">' +
        '<h3 class="overlay-section-title">Get in Touch</h3>' +
        '<p>Currently open for freelance projects and collaborations. I\u2019m especially interested in working with studios and founders who care deeply about craft. Drop me a note if you have something interesting.</p>',
      link: { text: 'Say hello \u2192', href: '#' }
    },
    'juno-testimonial': {
      cardTitle: 'cPGuard: Security Dashboard Experience',
      cardMeta: 'OpsShield \u00b7 2024',
      cardDescription: 'Led the redesign of CP Guard, a security monitoring platform for server administrators - improving usability, and streamlining workflows for critical threat monitoring and system management.',
      cardMetrics: ['100% Task Success Rate', '~30% Efficiency Improvement', '\u2193 Cognitive Load', 'Simplified Workflows'],
      title: 'cPGuard',
      subtitle: 'Revamp Server Security Management',
      tags: ['UX Design', 'Research', 'Dashboard', 'SaaS'],
      heroImage: 'images/cpguard-hero.jpg',
      body: '<p>Redesigning cPGuard to provide a centralized console to view and manage all your servers and accelerating user productivity.</p>' +

        // ── Details card ──
        '<div class="overlay-details">' +
          '<div class="overlay-detail"><span class="overlay-detail-label">Role</span><span class="overlay-detail-value">UX Designer</span></div>' +
          '<div class="overlay-detail"><span class="overlay-detail-label">Tools</span><span class="overlay-detail-value">Figma, Miro, Canva</span></div>' +
          '<div class="overlay-detail"><span class="overlay-detail-label">Responsibilities</span><span class="overlay-detail-value">Research, Ideation, Execution, Testing</span></div>' +
          '<div class="overlay-detail"><span class="overlay-detail-label">Collaborators</span><span class="overlay-detail-value">Lead Designer, Engineering, Business Partner</span></div>' +
        '</div>' +

        // ── Context ──
        '<h3 class="overlay-section-title">Context</h3>' +
        '<p>cPGuard is a flagship product by OPSSHIELD, a company specializing in security software for Linux web hosting servers. Designed as a SaaS platform, cPGuard helps server administrators safeguard their infrastructure against threats such as viruses, hacking, and phishing attacks.</p>' +
        '<p>While cPGuard provided robust security features, its user interface struggled to meet the needs of administrators managing multiple servers. The existing design was inconsistent and unintuitive, leading to inefficiencies in task execution and frustration among users.</p>' +

        // ── Problem ──
        '<h3 class="overlay-section-title">Problem</h3>' +
        '<div class="overlay-callout"><p>The challenge was to enhance the usability of cPGuard by simplifying its interface and removing its dependency on control panels.</p></div>' +

        // ── Research ──
        '<h3 class="overlay-section-title">Research</h3>' +
        '<p class="overlay-subtitle" style="text-align:left;margin-bottom:16px">Users wanted better organization of information.</p>' +
        '<p>Collaborating with Business Partners, I developed a research plan defining research goals and objectives. Using the research plan, we had conversations with the users.</p>' +

        '<h4 class="overlay-section-subtitle">Research Goals</h4>' +
        '<ul class="overlay-list">' +
          '<li>What are the main details they view in the portal?</li>' +
          '<li>What are the most used use cases?</li>' +
          '<li>How do users review alerts?</li>' +
        '</ul>' +

        '<h4 class="overlay-section-subtitle">Our Users</h4>' +
        '<div class="overlay-stats">' +
          '<div class="overlay-stat"><span class="overlay-stat-number">\uD83C\uDFE2</span><span class="overlay-stat-label">Hosting providers - Businesses offering web hosting services to clients rely on cPGuard to secure and monitor their server infrastructure.</span></div>' +
          '<div class="overlay-stat"><span class="overlay-stat-number">\uD83D\uDCBC</span><span class="overlay-stat-label">Small/medium business - Businesses running self-hosted applications and websites on Linux rely on cPGuard to ensure optimal performance.</span></div>' +
          '<div class="overlay-stat"><span class="overlay-stat-number">\u2699\uFE0F</span><span class="overlay-stat-label">Server administrators - IT professionals responsible for managing and maintaining Linux web hosting servers.</span></div>' +
        '</div>' +

        '<h4 class="overlay-section-subtitle">Key Takeaways from Users</h4>' +
        '<img class="overlay-img-full" src="images/cpguard-research.png" alt="Research findings">' +
        '<ul class="overlay-list">' +
          '<li>Ensuring real-time interactions without straining server capacity.</li>' +
          '<li>Providing notifications about recommended modules, alerts, and incidents.</li>' +
          '<li>Offering quick access to essential actions for efficiency.</li>' +
        '</ul>' +

        '<h4 class="overlay-section-subtitle">Key Takeaways from Current UI</h4>' +
        '<p>I reviewed all cPGuard screens to evaluate their strengths and weaknesses from a UI perspective. This included analyzing visual consistency, navigation flow, and overall usability. My goal was to identify areas that worked well, such as straightforward access to certain key features, and areas that needed improvement, such as inconsistent visual hierarchy, cluttered layouts, and confusing navigation.</p>' +
        '<div class="overlay-img-grid">' +
          '<img class="overlay-img-half" src="images/cpguard-old-ui-1.jpg" alt="Old UI screenshot 1">' +
          '<img class="overlay-img-half" src="images/cpguard-old-ui-2.jpg" alt="Old UI screenshot 2">' +
        '</div>' +

        // ── User Persona ──
        '<h3 class="overlay-section-title">User Persona</h3>' +
        '<div class="overlay-callout"><p>\u201CI need a security solution that saves me time, is intuitive, and gives me peace of mind knowing my servers and clients are protected.\u201D</p></div>' +
        '<img class="overlay-img-full" src="images/cpguard-persona.jpg" alt="User persona">' +

        // ── User Journey ──
        '<h3 class="overlay-section-title">User Journey</h3>' +
        '<p>To simplify complexity I outlined the User journey into four distinct phases.</p>' +
        '<img class="overlay-img-full" src="images/cpguard-journey.png" alt="User journey phases">' +

        // ── Strategy ──
        '<h3 class="overlay-section-title">Strategy</h3>' +
        '<div class="overlay-callout"><p>I understood my solution needed to be lightweight & streamlined so users could view and manage servers details.</p></div>' +

        '<hr class="overlay-divider">' +

        // ── From Vision to Reality ──
        '<h3 class="overlay-section-title">From Vision to Reality</h3>' +

        '<h4 class="overlay-section-subtitle">Phase 1: Dashboard Enhancements</h4>' +
        '<p>First, I focused on implementing minor enhancements to the existing dashboard, by adding quick access and graphical representation of key details.</p>' +
        '<h4 class="overlay-section-subtitle">Problem this solved</h4>' +
        '<p>Managing multiple servers can be a daunting task, especially when users are alerted to potential threats or issues. Without a centralized overview, users are forced to sift through individual server details to identify the root cause of the problem. This process not only consumes valuable time but also leads to inefficiencies, as critical issues may be delayed or overlooked.</p>' +
        '<h4 class="overlay-section-subtitle">Why this mattered</h4>' +
        '<p>By aligning the dashboard design with the user\u2019s behavior, primarily visiting when notified of a problem. The interface became more intuitive and practical. Providing a clear snapshot of server health allowed users to address potential threats proactively, saving time and ensuring that critical issues were resolved efficiently. This improvement enhanced usability and reinforced user trust in the platform.</p>' +
        '<img class="overlay-img-full" src="images/cpguard-phase1.jpg" alt="Dashboard enhancements">' +

        '<h4 class="overlay-section-subtitle">Phase 2: Information Organization</h4>' +
        '<p>Second, I identified and improved the organization of information within the dashboard, ensuring users can access relevant details without feeling overwhelmed.</p>' +
        '<h4 class="overlay-section-subtitle">Problem this solved</h4>' +
        '<p>By organizing information, the design allows users to focus on relevant data without unnecessary distractions. This segmentation ensures that detailed information, such as server health, protection, and settings, is only displayed when the user selects a specific server.</p>' +
        '<h4 class="overlay-section-subtitle">Why this mattered</h4>' +
        '<p>The result is a streamlined and intuitive experience, where users can quickly access critical insights and take action efficiently. This improvement not only reduces cognitive load but also enhances productivity and user satisfaction, ensuring the dashboard aligns better with their needs.</p>' +
        '<img class="overlay-img-full" src="images/cpguard-phase2.jpg" alt="Information organization">' +

        '<h4 class="overlay-section-subtitle">Phase 3: Server Setup Process</h4>' +
        '<p>Third, I improved the server setup process by introducing a guided popup with recommended settings and notification options.</p>' +
        '<h4 class="overlay-section-subtitle">Problem this solved</h4>' +
        '<p>By providing a popup with highlighted recommendations during server setup, users can now configure essential settings with clarity and confidence. Offering the option to enable notifications ensures that users stay informed about potential issues via email or other channels, allowing them to respond promptly.</p>' +
        '<h4 class="overlay-section-subtitle">Why this mattered</h4>' +
        '<p>This enhancement not only simplifies the setup process but also improves security and peace of mind for users, reinforcing trust in the platform\u2019s proactive approach to server management. By empowering users with timely notifications and clear guidance, it ensures they can address potential issues swiftly, minimizing downtime.</p>' +
        '<img class="overlay-img-full" src="images/cpguard-phase3.jpg" alt="Server setup process">' +

        '<hr class="overlay-divider">' +

        // ── Impact ──
        '<h3 class="overlay-section-title">Impact</h3>' +
        '<div class="overlay-callout"><p>A complex server management process that once required hours of manual effort was transformed into a clean, intuitive design, enabling users to manage servers and resolve issues efficiently with just a few clicks.</p></div>' +

        '<h4 class="overlay-section-subtitle">Usability Testing Highlights</h4>' +
        '<div class="overlay-stats">' +
          '<div class="overlay-stat"><span class="overlay-stat-number">5/5</span><span class="overlay-stat-label">users preferred new interface</span></div>' +
          '<div class="overlay-stat"><span class="overlay-stat-number">100%</span><span class="overlay-stat-label">task completion rate</span></div>' +
        '</div>' +

        // ── Design and UI Elements ──
        '<h3 class="overlay-section-title">Design and UI Elements</h3>' +
        '<p>I enhanced the cPGuard dashboard screens by improving whitespace for better readability and using blue as the primary color to evoke trust and stability, aligning with the product\u2019s cybersecurity focus.</p>' +
        '<p>I created a comprehensive style guide for OPSSHIELD to maintain brand consistency across products and screens, including standardized typography, a unified color palette, reusable components, and spacing rules.</p>' +
        '<p>The design was made fully responsive to address the challenge of displaying charts and graphs with varying levels of data. Some servers contained extensive details, while others had minimal data to showcase. To adapt, we implemented a dynamic design approach where charts and graphs automatically scale and adjust their layout based on the volume of information, ensuring a visually balanced and user-friendly experience across all use cases.</p>' +
        '<img class="overlay-img-full" src="images/cpguard-design-system.jpg" alt="Design system and UI elements">' +

        '<hr class="overlay-divider">' +

        // ── Lessons and Takeaways ──
        '<h3 class="overlay-section-title">Lessons and Takeaways</h3>' +
        '<div class="overlay-callout"><p>This project taught me that great design happens at the intersection of user needs, business goals, and technical feasibility.</p></div>' +

        '<h4 class="overlay-section-subtitle">Key Lessons</h4>' +
        '<ul class="overlay-list">' +
          '<li>The importance of early stakeholder collaboration to align goals and reduce conflicts.</li>' +
          '<li>It\u2019s very important to keep the technical team involved to ensure a clear understanding of all engineering constraints.</li>' +
          '<li>The value of balancing ambitious design ideas with technical and resource constraints.</li>' +
          '<li>How iterative testing and user feedback improves outcome.</li>' +
        '</ul>' +

        '<h4 class="overlay-section-subtitle">Connect to Future Challenges</h4>' +
        '<ul class="overlay-list">' +
          '<li>This experience honed my ability to work within constraints while delivering user-centered solutions.</li>' +
          '<li>Emphasize adaptability and collaboration as strengths I\u2019ll bring to future design challenges.</li>' +
        '</ul>' +

        '<hr class="overlay-divider">' +
        '<h3 class="overlay-section-title">Thank you for reading!</h3>',
      link: null
    },
    'rohan-testimonial': {
      title: 'Sable & Grain',
      subtitle: 'Editorial art direction for a specialty coffee brand.',
      tags: ['Art Direction', 'Editorial', 'Packaging', 'Photography'],
      heroImage: null, // placeholder — no real image
      body: '<div class="overlay-details">' +
          '<div class="overlay-detail"><span class="overlay-detail-label">Role</span><span class="overlay-detail-value">Art Director</span></div>' +
          '<div class="overlay-detail"><span class="overlay-detail-label">Timeline</span><span class="overlay-detail-value">12 weeks</span></div>' +
          '<div class="overlay-detail"><span class="overlay-detail-label">Tools</span><span class="overlay-detail-value">Figma, InDesign, Lightroom</span></div>' +
          '<div class="overlay-detail"><span class="overlay-detail-label">Scope</span><span class="overlay-detail-value">Packaging, Editorial, Web</span></div>' +
        '</div>' +
        '<h3 class="overlay-section-title">The Brief</h3>' +
        '<p>Sable & Grain is a single-origin coffee roaster based in Melbourne. They had outgrown their original farmer\u2019s-market branding and wanted packaging and editorial materials that felt more like an independent magazine than a product line.</p>' +
        '<p>The founder\u2019s vision was clear: every bag of coffee should tell a story. Not just origin and tasting notes - the farmer\u2019s philosophy, the landscape, the season.</p>' +
        '<div class="overlay-img-full">original packaging - before rebrand</div>' +
        '<h3 class="overlay-section-title">Visual Language</h3>' +
        '<p>I built the art direction around three principles: matte textures, warm earth tones, and editorial typography. The packaging system uses a restrained palette - uncoated kraft paper, a single accent color per origin, and large-format type that makes each bag feel like a poster.</p>' +
        '<div class="overlay-img-grid">' +
          '<div class="overlay-img-half">color palette - earth tones</div>' +
          '<div class="overlay-img-half">type specimens - editorial scale</div>' +
        '</div>' +
        '<div class="overlay-callout"><p>\u201CIt felt more like art than a brief. Every detail had intention behind it.\u201D</p><cite> - Rohan O., Freelance Art Director</cite></div>' +
        '<h3 class="overlay-section-title">The Packaging</h3>' +
        '<p>Each bag includes a small printed card with the farmer\u2019s story - designed to feel like a page torn from a journal. The cards use a different stock from the bag, creating a tactile contrast that customers notice and keep.</p>' +
        '<div class="overlay-img-grid">' +
          '<div class="overlay-img-half">bag front - Ethiopia Yirgacheffe</div>' +
          '<div class="overlay-img-half">bag back - story card detail</div>' +
        '</div>' +
        '<div class="overlay-img-full">full product line - six origins</div>' +
        '<h3 class="overlay-section-title">Editorial Extension</h3>' +
        '<p>Beyond packaging, I designed a quarterly zine called <em>Grounds</em> - a 24-page publication featuring origin stories, brewing guides, and profiles of the people behind each coffee. The zine ships with subscription orders and lives on cafe counters.</p>' +
        '<div class="overlay-comparison">' +
          '<div class="overlay-comparison-item"><div class="overlay-comparison-img">zine cover - Issue 01</div><span class="overlay-comparison-label">Issue 01: Origins</span></div>' +
          '<div class="overlay-comparison-item"><div class="overlay-comparison-img">zine spread - farmer profile</div><span class="overlay-comparison-label">Interior Spread</span></div>' +
        '</div>' +
        '<h3 class="overlay-section-title">Results</h3>' +
        '<div class="overlay-stats">' +
          '<div class="overlay-stat"><span class="overlay-stat-number">40%</span><span class="overlay-stat-label">sales increase</span></div>' +
          '<div class="overlay-stat"><span class="overlay-stat-number">12</span><span class="overlay-stat-label">new retail partners</span></div>' +
          '<div class="overlay-stat"><span class="overlay-stat-number">4</span><span class="overlay-stat-label">zine issues published</span></div>' +
        '</div>' +
        '<p>The rebrand helped Sable & Grain expand into specialty grocery stores across Australia. The packaging became a conversation starter - customers began collecting the story cards, and the zine developed its own following.</p>',
      link: { text: 'See the packaging \u2192', href: '#' }
    },
    'pickio-case-study': {
      cardTitle: 'Pickio: AI Restaurant Recommendation Experience',
      cardMeta: 'Personal Project \u00b7 2025',
      cardDescription: 'Designed an AI-powered restaurant recommendation app that simplifies group decision-making by reducing choice overload and helping users quickly align on where to eat.',
      cardMetrics: ['40% User Satisfaction', '90% Completion Rate'],
      title: 'Pickio',
      subtitle: 'Simplifying Dining Decisions & Bill Splitting with AI',
      tags: ['Product Design', 'Mobile App', 'AI', 'UX Research'],
      heroImage: 'images/pickio-hero.png',
      body: '<p>A mobile app that simplifies dining by intelligently selecting restaurants and enabling seamless bill splitting.</p>' +

        // ── Details card ──
        '<div class="overlay-details">' +
          '<div class="overlay-detail"><span class="overlay-detail-label">Role</span><span class="overlay-detail-value">Lead Product Designer</span></div>' +
          '<div class="overlay-detail"><span class="overlay-detail-label">Tools</span><span class="overlay-detail-value">Figma, Miro, Origami, Protopie</span></div>' +
          '<div class="overlay-detail"><span class="overlay-detail-label">Responsibilities</span><span class="overlay-detail-value">Research, Strategy, Execution, Testing</span></div>' +
          '<div class="overlay-detail"><span class="overlay-detail-label">Timeline</span><span class="overlay-detail-value">8 Weeks (ongoing)</span></div>' +
        '</div>' +

        // ── Overview ──
        '<h3 class="overlay-section-title">Overview</h3>' +
        '<p>Choosing where to eat can be surprisingly frustrating. With platforms like Yelp, Google, and DoorDash offering endless options, users often feel overwhelmed trying to make a decision. And when dining with friends, coordinating a place everyone agrees on only adds to the chaos.</p>' +
        '<p>Additionally, after dining with friends, splitting the bill remains a tedious process, requiring manual calculations or paid third-party apps like Splitwise, which have limitations on free usage.</p>' +

        // ── Problem ──
        '<h3 class="overlay-section-title">Problem</h3>' +
        '<div class="overlay-callout"><p>Group dining often turns into a frustrating experience due to the time-consuming process of choosing a restaurant that suits everyone\u2019s preferences and the awkwardness of splitting the bill, especially when dining with new or diverse groups.</p></div>' +

        // ── Research ──
        '<h3 class="overlay-section-title">Research</h3>' +
        '<p class="overlay-subtitle" style="text-align:left;margin-bottom:16px">The overwhelming choice dilemma & payment hassles.</p>' +

        '<h4 class="overlay-section-subtitle">Research Goals</h4>' +
        '<ul class="overlay-list">' +
          '<li>Identify gaps in existing solutions and position Pickio effectively</li>' +
          '<li>Validate design decisions through real user needs</li>' +
          '<li>Understand user frustrations with restaurant discovery and bill splitting</li>' +
        '</ul>' +

        '<h4 class="overlay-section-subtitle">Key Takeaways from Users</h4>' +
        '<div class="overlay-stats">' +
          '<div class="overlay-stat"><span class="overlay-stat-number">90%</span><span class="overlay-stat-label">of users check multiple apps before choosing a restaurant</span></div>' +
          '<div class="overlay-stat"><span class="overlay-stat-number">70%</span><span class="overlay-stat-label">manually calculate bills due to Splitwise\u2019s limitations</span></div>' +
          '<div class="overlay-stat"><span class="overlay-stat-number">86%</span><span class="overlay-stat-label">struggle to coordinate restaurant choices when dining in groups</span></div>' +
        '</div>' +

        // ── User Journey ──
        '<h3 class="overlay-section-title">User Journey</h3>' +
        '<img class="overlay-img-full" src="images/pickio-journey.png" alt="User journey map">' +

        '<hr class="overlay-divider">' +

        // ── Solution 1 ──
        '<h3 class="overlay-section-title">Solution 1: AI-Powered Restaurant Selection</h3>' +
        '<p>Users faced decision fatigue due to too many restaurant options across platforms, making selection overwhelming and time-consuming.</p>' +
        '<img class="overlay-img-full" src="images/pickio-ai-selection.jpg" alt="AI-powered restaurant selection">' +
        '<img class="overlay-img-full" src="images/pickio-screens.jpg" alt="App screens for restaurant selection">' +
        '<div class="overlay-callout"><p>By eliminating endless scrolling and manual filtering, the AI-driven selection ensures users can quickly find a dining option, making the process effortless.</p></div>' +

        // ── Solution 2 ──
        '<h3 class="overlay-section-title">Solution 2: Group Dining Coordination</h3>' +
        '<p>Coordinating restaurant choices for a group was inefficient, requiring multiple text exchanges and manual preference alignment.</p>' +
        '<img class="overlay-img-full" src="images/pickio-group.jpg" alt="Group dining coordination">' +
        '<div class="overlay-callout"><p>A streamlined group selection process eliminates confusion, ensuring everyone\u2019s preferences are considered without back-and-forth messaging.</p></div>' +

        // ── Solution 3 ──
        '<h3 class="overlay-section-title">Solution 3: Seamless Bill Splitting</h3>' +
        '<p>Splitting bills is a tedious, manual process, and existing apps restricted free usage, forcing users to pay for premium features.</p>' +
        '<img class="overlay-img-full" src="images/pickio-billing.jpg" alt="Seamless bill splitting">' +
        '<div class="overlay-callout"><p>A built-in, free bill-splitting solution ensures frictionless payments, making group dining more convenient without extra steps or hidden costs.</p></div>' +

        '<hr class="overlay-divider">' +

        // ── Usability Testing ──
        '<h3 class="overlay-section-title">Usability Testing</h3>' +
        '<div class="overlay-stats">' +
          '<div class="overlay-stat"><span class="overlay-stat-number">8</span><span class="overlay-stat-label">U.S.-based users tested</span></div>' +
          '<div class="overlay-stat"><span class="overlay-stat-number">\u2705</span><span class="overlay-stat-label">Moderated tests via Zoom with low-fi prototypes</span></div>' +
        '</div>' +

        '<h4 class="overlay-section-subtitle">Finding 1: Users Wanted More Control</h4>' +
        '<p>Some users hesitated when given just one AI-picked restaurant. We added a \u201CRe-roll\u201D button to let users cycle through 3 alternate recommendations.</p>' +
        '<img class="overlay-img-full" src="images/pickio-test1.jpg" alt="Testing finding 1 - re-roll feature">' +

        '<h4 class="overlay-section-subtitle">Finding 2: Group Flow Needed Better Visibility</h4>' +
        '<p>Friends had no option to like or dislike the AI-suggested place. We introduced a visual confirmation indicator showing all members\u2019 acceptance.</p>' +
        '<img class="overlay-img-full" src="images/pickio-test2.jpg" alt="Testing finding 2 - group confirmation">' +

        '<h4 class="overlay-section-subtitle">Finding 3: Bill Scanning Confusion</h4>' +
        '<p>Some users struggled switching between scanning vs. manual input. We redesigned the UI with a clear toggle for scan vs. manual.</p>' +
        '<img class="overlay-img-full" src="images/pickio-test3.jpg" alt="Testing finding 3 - bill scanning toggle">' +

        '<hr class="overlay-divider">' +

        // ── Learnings ──
        '<h3 class="overlay-section-title">Personal Growth & Learnings</h3>' +
        '<div class="overlay-callout"><p>A user-first approach, combined with automation & simplicity is a game changer.</p></div>' +
        '<ul class="overlay-list">' +
          '<li>Gathering user feedback, insights from mentors, and critiques from design experts helped refine the product in ways I wouldn\u2019t have anticipated.</li>' +
          '<li>Small design choices can make a huge impact on usability and user engagement.</li>' +
          '<li>Presenting my work, gathering feedback, and advocating for the user helped me understand how design drives business success.</li>' +
        '</ul>' +

        '<hr class="overlay-divider">' +
        '<h3 class="overlay-section-title">Thank you for reading!</h3>',
      link: null
    },
    'griting-design-system': {
      cardTitle: 'Griting: Design System & Product Foundation',
      cardMeta: 'Griting \u00b7 Founding Designer \u00b7 2025',
      cardDescription: 'Built a scalable design system from scratch to unify multiple products, reduce design inconsistencies, and improve engineering efficiency.',
      cardMetrics: ['\u2193 Fragmentation', '\u2191 Component Reuse', 'Multi-Product Ready'],
      title: 'Griting',
      subtitle: 'Design System & Product Foundation',
      tags: ['Design Systems', 'UX Design', 'Figma', 'Scalability'],
      heroImage: 'images/griting-hero.png',
      body: '<p>As the founding designer at Griting, I built a design system to support the transition from a single product to a growing multi-product ecosystem. The goal was to create a structured foundation that enables teams to design, build, and scale consistently without slowing down product velocity.</p>' +

        // ── Details card ──
        '<div class="overlay-details">' +
          '<div class="overlay-detail"><span class="overlay-detail-label">Role</span><span class="overlay-detail-value">Founding UX Designer</span></div>' +
          '<div class="overlay-detail"><span class="overlay-detail-label">Team</span><span class="overlay-detail-value">1 Designer, 3 Engineers</span></div>' +
          '<div class="overlay-detail"><span class="overlay-detail-label">Timeline</span><span class="overlay-detail-value">~2\u20133 weeks foundation + ongoing iteration</span></div>' +
          '<div class="overlay-detail"><span class="overlay-detail-label">Tools</span><span class="overlay-detail-value">Figma</span></div>' +
        '</div>' +

        // ── Impact Overview ──
        '<h3 class="overlay-section-title">Impact Overview</h3>' +
        '<ul class="overlay-list">' +
          '<li>Established a single design system supporting multiple products, creating a unified foundation across the ecosystem</li>' +
          '<li>Reduced duplicate and inconsistent components by ~50\u201370% (qualitative reduction), significantly improving UI cohesion</li>' +
          '<li>Increased engineering development speed by enabling reuse of implementation-ready components instead of recreating UI</li>' +
          '<li>Improved design-to-development handoff clarity, reducing back-and-forth and ambiguity during implementation</li>' +
          '<li>Enabled faster feature development by shifting from designing individual screens to assembling interfaces using system components</li>' +
          '<li>Established a scalable foundation to support future designers, features, and product expansion without increasing complexity</li>' +
        '</ul>' +

        // ── Context ──
        '<h3 class="overlay-section-title">Context</h3>' +
        '<p>Griting was an early-stage startup operating under tight timelines, where design focused on rapid feature delivery. As the product evolved into a multi-product ecosystem, complexity increased with parallel feature development, a growing need for consistency across experiences, and closer collaboration between design and engineering.</p>' +
        '<p>Design existed as isolated Figma files without shared structure, making it difficult to maintain alignment or scale effectively.</p>' +

        // ── Problem Framing ──
        '<h3 class="overlay-section-title">Problem Framing</h3>' +
        '<p>As the product scaled, design output became increasingly fragmented:</p>' +
        '<ul class="overlay-list">' +
          '<li>Inconsistent UI patterns across features</li>' +
          '<li>Repeated creation of similar components</li>' +
          '<li>Lack of clear usage guidelines</li>' +
          '<li>High effort required for small updates</li>' +
        '</ul>' +
        '<div class="overlay-callout"><p>This began to impact both speed and product quality.</p></div>' +

        // ── Why a Design System ──
        '<h3 class="overlay-section-title">Why a Design System</h3>' +
        '<p>Instead of addressing issues at the screen level, I identified the need for a system-level approach - introducing a design system to standardize patterns across products, reduce repetitive work, improve clarity between design and engineering, and support long-term scalability, ultimately enabling the product to scale efficiently beyond just visual improvements.</p>' +

        // ── Audit & System Diagnosis ──
        '<h3 class="overlay-section-title">Audit & System Diagnosis</h3>' +
        '<p>I conducted a full audit of existing designs and workflows:</p>' +
        '<ul class="overlay-list">' +
          '<li>Mapped all components across screens</li>' +
          '<li>Identified duplication and inconsistencies</li>' +
          '<li>Reviewed how engineers interpreted designs</li>' +
        '</ul>' +
        '<p>This helped prioritize which components needed restructuring first.</p>' +

        // ── Defining & Building the System ──
        '<h3 class="overlay-section-title">Defining & Building the System</h3>' +
        '<p>I established the foundation of the design system by defining a clear and scalable structure that could support both current product needs and future growth. This included setting up a consistent visual language - covering color, typography, and spacing - along with a well-defined component hierarchy and naming conventions to ensure clarity across design and engineering. I also created a clear separation between base components and their extensions, allowing the system to remain flexible while maintaining structure. This foundation ensured that every component built moving forward would be consistent, reusable, and easy to scale.</p>' +

        '<div class="overlay-img-full"><img src="images/griting-hero.png" alt="Griting Design System component library overview"></div>' +

        '<p>Building on this foundation, I developed the system directly in Figma, focusing on creating dynamic, reusable components rather than static UI elements. Frequently used UI patterns were converted into master components designed to be modular and adaptable across different use cases. Each component was built with real product scenarios in mind, ensuring practical usability rather than isolated visual perfection.</p>' +

        '<h4 class="overlay-section-subtitle">Typography Foundation</h4>' +
        '<div class="overlay-img-full"><img src="images/griting-typography.png" alt="Figma text styles and typography system"></div>' +

        '<h4 class="overlay-section-subtitle">Variants & Properties</h4>' +
        '<p>To reduce duplication and improve flexibility, I introduced variants and properties within components. Instead of creating multiple one-off versions, I consolidated them into single, scalable components capable of handling multiple states and configurations.</p>' +

        '<div class="overlay-callout"><p>Instead of 10 different buttons \u2192 1 button component with: size (sm / md / lg), type (primary / secondary / ghost), state (hover / disabled / loading)</p></div>' +

        '<div class="overlay-img-full"><img src="images/griting-components.png" alt="Figma component variants and layer structure"></div>' +

        '<p>Scalability was further ensured through thoughtful component architecture. Components were built using nested structures - such as icons, labels, and containers - allowing updates to be made centrally without breaking layouts. Consistency was maintained across all instances through controlled overrides, ensuring that flexibility did not compromise system integrity.</p>' +

        '<p>To support usability and adoption, I organized the system into clear categories, including foundations, components, and patterns. This created a navigable structure that made it easy for both designers and engineers to find and use elements efficiently.</p>' +

        '<p>This shift transformed the design process itself - from manually designing individual screens to assembling interfaces using systemized components. As a result, the team was able to work faster, reduce repetitive effort, and maintain consistency across the product as it scaled.</p>' +

        // ── Documentation & Adoption Strategy ──
        '<h3 class="overlay-section-title">Documentation & Adoption Strategy</h3>' +
        '<p>To ensure the system was usable beyond just design, I focused on making it easy to understand and apply across teams. I created clear usage guidelines for each component, defined when to use specific variants and patterns, and documented edge cases and behaviors. The goal was to move the system from a collection of components to a reliable, usable resource that designers and engineers could confidently depend on.</p>' +

        '<div class="overlay-img-full"><img src="images/griting-documentation.png" alt="Griting Design System documentation page"></div>' +

        // ── Design–Engineering Alignment ──
        '<h3 class="overlay-section-title">Design\u2013Engineering Alignment</h3>' +
        '<p>A key priority was ensuring that the design system translated seamlessly into implementation. I worked closely with engineers to align component structures with frontend architecture, ensuring that what was designed could be directly mapped to code. This reduced ambiguity during handoff and enabled engineers to implement components more efficiently, resulting in faster development and fewer inconsistencies between design and the final product.</p>' +

        // ── Governance & Evolution Model ──
        '<h3 class="overlay-section-title">Governance & Evolution Model</h3>' +
        '<p>To maintain long-term system quality, I introduced early governance practices. This included defining clear guidelines for adding new components, encouraging reuse before creating new patterns, and establishing shared ownership between design and engineering. These practices ensured the system could evolve as the product grew, without reintroducing fragmentation.</p>' +

        // ── System in Practice ──
        '<h3 class="overlay-section-title">System in Practice</h3>' +
        '<p>With the system in place, product development became more efficient and structured. New features were built using existing components, designers were able to assemble screens more quickly, and engineers could directly reuse components in code.</p>' +
        '<div class="overlay-callout"><p>The design process shifted from creating UI from scratch to composing interfaces using a well-defined system, improving both speed and consistency across the product.</p></div>' +

        // ── Impact (Detailed) ──
        '<h3 class="overlay-section-title">Impact</h3>' +
        '<ul class="overlay-list">' +
          '<li>Improved consistency across all product surfaces</li>' +
          '<li>Reduced redundant design work</li>' +
          '<li>Faster iteration cycles for both design and engineering</li>' +
          '<li>Improved collaboration and clarity across teams</li>' +
        '</ul>' +

        // ── Key Learnings ──
        '<hr class="overlay-divider">' +
        '<h3 class="overlay-section-title">Key Learnings</h3>' +
        '<div class="overlay-stats">' +
          '<div class="overlay-stat"><span class="overlay-stat-number">\uD83D\uDCA1</span><span class="overlay-stat-label">Systems thinking should start early</span></div>' +
          '<div class="overlay-stat"><span class="overlay-stat-number">\uD83E\uDD1D</span><span class="overlay-stat-label">Adoption matters as much as creation</span></div>' +
          '<div class="overlay-stat"><span class="overlay-stat-number">\u2699\uFE0F</span><span class="overlay-stat-label">Engineering collaboration is critical</span></div>' +
          '<div class="overlay-stat"><span class="overlay-stat-number">\uD83D\uDE80</span><span class="overlay-stat-label">Structure enables speed</span></div>' +
        '</div>' +
        '<p>I partnered closely with frontend engineers to ensure that system decisions translated directly into implementation.</p>',
      link: null
    },
    'griting-website': {
      cardTitle: 'Griting Website: Early Traction',
      cardMeta: 'Griting \u00b7 2024\u20132025',
      cardDescription: 'Drove early demand and inbound interest through a focused, waitlist-driven experience.',
      cardMetrics: ['200+ Waitlist Signups', '4\u20135 Customers', '12+ Inbound Requests'],
      title: 'Griting Website',
      subtitle: 'Early Traction',
      tags: ['Website Design', 'Conversion', 'Brand', 'AI Discoverability'],
      heroImage: 'images/griting-website-hero.png',
      body: '<p>Griting\u2019s website was designed to communicate a new category - AI-native talent infrastructure - while converting early interest into meaningful conversations. The goal was not just to build a website, but to translate a complex, evolving product into a clear, credible, and conversion-driven experience for multiple audiences including enterprises, universities, and early adopters.</p>' +

        // ── Impact Overview ──
        '<h3 class="overlay-section-title">Impact Overview</h3>' +
        '<div class="overlay-stats">' +
          '<div class="overlay-stat"><span class="overlay-stat-number">200+</span><span class="overlay-stat-label">Interest submissions validating early demand</span></div>' +
          '<div class="overlay-stat"><span class="overlay-stat-number">4\u20135</span><span class="overlay-stat-label">Customers onboarded post initial product launch</span></div>' +
          '<div class="overlay-stat"><span class="overlay-stat-number">12+</span><span class="overlay-stat-label">Qualified inbound leads from potential partners and enterprises</span></div>' +
          '<div class="overlay-stat"><span class="overlay-stat-number">\u2191</span><span class="overlay-stat-label">Improved conversion through a focused waitlist-driven experience</span></div>' +
          '<div class="overlay-stat"><span class="overlay-stat-number">\u2191</span><span class="overlay-stat-label">Increased discoverability via AI tools like ChatGPT, Claude, and Grok</span></div>' +
        '</div>' +

        // ── Context ──
        '<h3 class="overlay-section-title">Context</h3>' +
        '<p>Griting operates in a space that is inherently complex - combining AI, hiring, and infrastructure.</p>' +
        '<p>At the early stage:</p>' +
        '<ul class="overlay-list">' +
          '<li>There was no defined brand</li>' +
          '<li>The product started as a single AI mentoring platform</li>' +
          '<li>Over time, it evolved into multiple AI-native products</li>' +
          '<li>Messaging lacked clarity across different user groups</li>' +
        '</ul>' +
        '<p>This created a gap between what we were building and how it was understood externally.</p>' +

        // ── The Evolution of the Website ──
        '<h3 class="overlay-section-title">The Evolution of the Website</h3>' +
        '<p>The website evolved alongside the startup.</p>' +

        '<h4 class="overlay-section-subtitle">V1 - Mentoring Website</h4>' +
        '<ul class="overlay-list">' +
          '<li>Built quickly for a single product</li>' +
          '<li>Focused on early presence and basic communication</li>' +
        '</ul>' +

        '<h4 class="overlay-section-subtitle">V2 - Dark Themed Iteration</h4>' +
        '<ul class="overlay-list">' +
          '<li>Attempt to reflect a more technical, futuristic identity</li>' +
          '<li>Introduced visual direction but lacked clarity in communication</li>' +
        '</ul>' +
        '<div class="overlay-img-full"><img src="images/griting-website-v2.png" alt="Griting V2 dark themed website"></div>' +

        '<h4 class="overlay-section-subtitle">V3 - Brand-Aligned Multi-Product Website (Final Direction)</h4>' +
        '<ul class="overlay-list">' +
          '<li>Designed after brand and product ecosystem were defined</li>' +
          '<li>Focused on clarity, structure, and conversion</li>' +
          '<li>Supported multiple products without overwhelming the user</li>' +
        '</ul>' +
        '<div class="overlay-img-full"><img src="images/griting-website-v3.png" alt="Griting V3 brand-aligned website"></div>' +

        '<div class="overlay-callout"><p>This evolution reflects a shift from \u201Chaving a website\u201D \u2192 \u201Cusing the website as a strategic growth tool.\u201D</p></div>' +

        // ── Problem Framing ──
        '<h3 class="overlay-section-title">Problem Framing</h3>' +
        '<p>We identified key challenges early:</p>' +
        '<ul class="overlay-list">' +
          '<li>Users decide within seconds if a website is relevant</li>' +
          '<li>The product was complex and difficult to explain quickly</li>' +
          '<li>Multiple offerings created cognitive overload</li>' +
          '<li>No clear primary action for users</li>' +
        '</ul>' +
        '<div class="overlay-callout"><p>If users couldn\u2019t understand the value instantly, the website failed.</p></div>' +

        // ── Goals & Success Metrics ──
        '<h3 class="overlay-section-title">Goals & Success Metrics</h3>' +
        '<ul class="overlay-list">' +
          '<li>Communicate complex products in a simple, structured way</li>' +
          '<li>Drive users toward a single primary action \u2192 Join the waitlist</li>' +
          '<li>Build trust and credibility</li>' +
          '<li>Support multiple audiences without fragmentation</li>' +
          '<li>Improve discoverability (including AI-driven systems)</li>' +
        '</ul>' +

        // ── User & Conversion Strategy ──
        '<h3 class="overlay-section-title">User & Conversion Strategy</h3>' +
        '<p>We focused on clarity and intent.</p>' +
        '<p>Identified key users:</p>' +
        '<ul class="overlay-list">' +
          '<li>Enterprises</li>' +
          '<li>Universities</li>' +
          '<li>Early adopters</li>' +
        '</ul>' +
        '<p>Defined a single conversion goal: \u2192 Join the waitlist</p>' +
        '<p>Reduced friction:</p>' +
        '<ul class="overlay-list">' +
          '<li>Removed unnecessary navigation distractions</li>' +
          '<li>Guided users toward one clear action</li>' +
          '<li>Ensured information was easy to scan and understand</li>' +
        '</ul>' +

        // ── Information Architecture & Content Strategy ──
        '<h3 class="overlay-section-title">Information Architecture & Content Strategy</h3>' +
        '<p>To handle complexity, we simplified aggressively.</p>' +
        '<ul class="overlay-list">' +
          '<li>Broke down products into clear, digestible sections</li>' +
          '<li>Prioritized what users need to know first</li>' +
          '<li>Used structured content to improve readability</li>' +
          '<li>Avoided long, dense explanations</li>' +
        '</ul>' +
        '<div class="overlay-callout"><p>The focus was: Clarity over completeness.</p></div>' +

        // ── Designing for Conversion ──
        '<h3 class="overlay-section-title">Designing for Conversion</h3>' +
        '<p>Every design decision supported conversion.</p>' +
        '<ul class="overlay-list">' +
          '<li>Clear value proposition above the fold</li>' +
          '<li>Strong, visible CTAs (waitlist-focused)</li>' +
          '<li>Minimal, distraction-free layout</li>' +
          '<li>Structured flow guiding user attention</li>' +
          '<li>Reduced cognitive load</li>' +
        '</ul>' +
        '<div class="overlay-callout"><p>We designed the page so users could: Understand \u2192 Trust \u2192 Act</p></div>' +

        // ── Visual & Brand Alignment ──
        '<h3 class="overlay-section-title">Visual & Brand Alignment</h3>' +
        '<p>The visual system matured with the company.</p>' +
        '<ul class="overlay-list">' +
          '<li>Transitioned from no brand \u2192 defined identity</li>' +
          '<li>Moved away from purely aesthetic decisions (dark theme)</li>' +
          '<li>Designed a UI that reflects:<ul>' +
            '<li>Trust</li>' +
            '<li>Structure</li>' +
            '<li>Intelligence</li>' +
          '</ul></li>' +
        '</ul>' +
        '<div class="overlay-img-full"><img src="images/griting-website-brand.png" alt="Griting brand and logo exploration"></div>' +
        '<p>Consistency across pages helped reinforce credibility.</p>' +

        // ── Multi-Product Experience Design ──
        '<h3 class="overlay-section-title">Multi-Product Experience Design</h3>' +
        '<p>One of the biggest challenges was showcasing multiple products without overwhelming users.</p>' +
        '<p>We solved this by:</p>' +
        '<ul class="overlay-list">' +
          '<li>Creating modular sections for each product</li>' +
          '<li>Avoiding long, cluttered pages</li>' +
          '<li>Linking to deeper product-specific pages</li>' +
          '<li>Maintaining a balance between overview and depth</li>' +
        '</ul>' +

        // ── AI Discoverability (Forward-Thinking Design) ──
        '<h3 class="overlay-section-title">AI Discoverability (Forward-Thinking Design)</h3>' +
        '<p>We intentionally designed the website for AI-native discovery.</p>' +
        '<ul class="overlay-list">' +
          '<li>Structured content for semantic clarity</li>' +
          '<li>Ensured information could be easily parsed and surfaced</li>' +
        '</ul>' +
        '<p>As a result, Griting began appearing in responses from tools like:</p>' +
        '<ul class="overlay-list">' +
          '<li>ChatGPT</li>' +
          '<li>Claude</li>' +
          '<li>Grok</li>' +
        '</ul>' +
        '<div class="overlay-callout"><p>This positioned the website as: \uD83D\uDC49 A knowledge surface, not just a marketing page</p></div>' +

        // ── System Thinking & Scalability ──
        '<h3 class="overlay-section-title">System Thinking & Scalability</h3>' +
        '<p>The website was designed to scale with the product.</p>' +
        '<ul class="overlay-list">' +
          '<li>Reusable layout patterns and components</li>' +
          '<li>Flexible structure for adding new products</li>' +
          '<li>Faster iteration cycles for future updates</li>' +
        '</ul>',
      link: null
    }
  };

  // ── Experiment data ──────────────────────────────────────────────────────────
  var experimentData = {
    'jeep-rental': {
      title: 'Big Island Jeep Rental',
      subtitle: 'Website Redesign',
      description: 'A redesign of Big Island Jeep Rental\u2019s website focused on simplifying the booking flow and modernizing the visual design. The project involved restructuring information architecture, decluttering redundant content, and optimizing for mobile. A green color scheme reflects Hawaii\u2019s natural landscape, while ample white space keeps the interface clean and inviting.',
      tags: ['UI/UX Design', 'Usability Research'],
      screenshotTitle: 'Booking Flow',
      illustration: 'images/experiment-jeep-rental.svg',
      images: [
        { src: 'images/jeep-rentals.png', alt: 'Big Island Jeep Rental — Desktop view', type: 'desktop' },
        { src: 'images/jeep-phone-screen.png', alt: 'Big Island Jeep Rental — Phone mockup', type: 'phone' }
      ],
      screenshots: [
        { src: 'images/jeep-booking-accessories.png', alt: 'Booking flow — Add free accessories' },
        { src: 'images/jeep-booking-payment.png', alt: 'Booking flow — Payment & confirmation' },
        { src: 'images/jeep-booking-details.png', alt: 'Booking flow — Driver details & rental policies' },
        { src: 'images/jeep-booking-modal.png', alt: 'Booking flow — Jeep selection modal' }
      ]
    },
    'pathstitch': {
      title: 'Pathstitch',
      subtitle: 'EdTech Platform',
      description: 'A landing page for Pathstitch, an EdTech platform that transforms teacher feedback into targeted support for K-12 educators and school leaders. The design uses bold geometric photo frames with vibrant pink, teal, and blue accent shapes to convey energy and approachability. Content is structured around three audience segments — Teachers, Principals, and Districts — each with clear value propositions.',
      tags: ['UI/UX Design', 'Landing Page'],
      illustration: 'images/experiment-pathstitch.svg',
      screenshotTitle: 'Page Sections',
      images: [
        { src: 'images/pathstitch-hero.png', alt: 'Pathstitch — Hero section', type: 'desktop' }
      ],
      screenshots: [
        { src: 'images/pathstitch-community.png', alt: 'Teacher Growth Partnership section' },
        { src: 'images/pathstitch-audience.png', alt: 'Audience segments — Teachers, Principals, Districts' },
        { src: 'images/pathstitch-districts.png', alt: 'Districts value proposition' },
        { src: 'images/pathstitch-mission.png', alt: 'About — Mission and tools' }
      ]
    },
    'finedvance': {
      title: 'FinEdvance',
      subtitle: 'Financial Education Platform',
      description: 'A website for FinEdvance, a financial education platform that offers structured learning tracks for wealth-building — from beginner fundamentals to advanced investment strategies. The design uses a corporate navy-and-white palette with bold red accents, giving it a trust-forward, institutional feel. Course offerings are presented in a clean card grid with clear progression tiers.',
      tags: ['UI/UX Design', 'Website Design'],
      illustration: 'images/experiment-finedvance.svg',
      screenshotTitle: 'Page Sections',
      images: [
        { src: 'images/finedvance-hero.png', alt: 'FinEdvance — Hero section', type: 'desktop' }
      ],
      screenshots: [
        { src: 'images/finedvance-services.png', alt: 'Learn-Earn-Lead services overview' },
        { src: 'images/finedvance-courses.png', alt: 'Learning tracks — Foundation, NextGen, MasterMind' },
        { src: 'images/finedvance-features.png', alt: 'Platform features and approach' }
      ]
    },
    'intra-legem': {
      title: 'Intra Legem Lawyers',
      subtitle: 'Law Firm Website',
      description: 'A website for Intra Legem Lawyers, a Kerala-based law firm specializing in legal representation for Non-Resident Indians. The design pairs a dark, authoritative hero featuring scales of justice imagery with warm serif typography and cream-toned interior pages.',
      tags: ['UI/UX Design', 'Website Design'],
      illustration: 'images/experiment-intra-legem.svg',
      screenshotTitle: 'Page Sections',
      images: [
        { src: 'images/intra-legem-hero.png', alt: 'Intra Legem Lawyers — Hero section', type: 'desktop' }
      ],
      screenshots: [
        { src: 'images/intra-legem-nri-services.png', alt: 'NRI Legal Services overview' },
        { src: 'images/intra-legem-nri-detail.png', alt: 'NRI Legal Services — Detailed practice areas' },
        { src: 'images/intra-legem-contact.png', alt: 'Contact and consultation form' }
      ]
    }
  };

  var experimentSlugs = ['jeep-rental', 'pathstitch', 'finedvance', 'intra-legem'];

  // ── DOM references ─────────────────────────────────────────────────────────
  var overlay = document.getElementById('overlay');
  var backdrop = overlay.querySelector('.overlay-backdrop');
  var sheet = overlay.querySelector('.overlay-sheet');
  var panel = overlay.querySelector('.overlay-panel');
  var closeBtn = overlay.querySelector('.overlay-close');
  var content = overlay.querySelector('.overlay-content');
  var canvas = document.getElementById('canvas');

  var triggerEl = null;   // Element that opened the overlay (for focus return)
  var returnToGrid = false; // True when a case study was opened from the grid
  var returnToExperiments = false; // True when an experiment detail was opened from the experiments grid
  var downX = 0, downY = 0;
  var downTarget = null;

  // ── Case studies grid view ──────────────────────────────────────────────────
  // Opens an overlay with a card grid for each case study. Clicking a card
  // opens the full overlay for that slug via the existing openOverlay().
  //
  // NOTE: innerHTML is used below with developer-controlled static content only
  // (the portfolioData object is hardcoded inside this IIFE). No user input is
  // interpolated, so there is no XSS risk.

  var caseStudySlugs = ['juno-testimonial', 'pickio-case-study', 'griting-website', 'griting-design-system'];

  // Map case study slugs to their preview assets
  var casePreviewMap = {
    'juno-testimonial': 'images/cpguard-preview.png',
    'pickio-case-study': 'images/pickio-preview.mp4',
    'griting-design-system': 'images/griting-ds-preview.png',
    'griting-website': 'images/griting-website-preview.png'
  };

  function openCaseStudiesGrid() {
    // Build header
    var header = document.createElement('div');
    header.className = 'overlay-hero';
    var h2 = document.createElement('h2');
    h2.className = 'overlay-title';
    h2.textContent = 'Case Studies';
    var sub = document.createElement('p');
    sub.className = 'overlay-subtitle';
    sub.textContent = 'Selected product design work';
    header.appendChild(h2);
    header.appendChild(sub);

    // Build grid
    var grid = document.createElement('div');
    grid.className = 'case-studies-grid';

    caseStudySlugs.forEach(function(slug) {
      var data = portfolioData[slug];
      if (!data) return;

      // Build rich-text content for the Polaroid gutter
      var textEl = document.createElement('div');
      textEl.className = 'case-study-polaroid-text';

      var titleEl = document.createElement('h3');
      titleEl.className = 'case-study-card-title';
      titleEl.textContent = data.cardTitle || data.title;
      textEl.appendChild(titleEl);

      if (data.cardMeta) {
        var metaEl = document.createElement('p');
        metaEl.className = 'case-study-card-meta';
        metaEl.textContent = data.cardMeta;
        textEl.appendChild(metaEl);
      }

      var descEl = document.createElement('p');
      descEl.className = 'case-study-card-description';
      descEl.textContent = data.cardDescription || data.subtitle || '';
      textEl.appendChild(descEl);

      if (data.cardMetrics && data.cardMetrics.length) {
        var metricsEl = document.createElement('div');
        metricsEl.className = 'case-study-card-metrics';
        data.cardMetrics.forEach(function(metric) {
          var span = document.createElement('span');
          span.className = 'case-study-card-metric';
          span.textContent = metric;
          metricsEl.appendChild(span);
        });
        textEl.appendChild(metricsEl);
      }

      // Create Polaroid with preview asset and rich-text content
      var polaroid = new Polaroid({
        x: 0, y: 0, rotate: 0,
        src: casePreviewMap[slug],
        content: textEl
      });

      polaroid._build();
      var el = polaroid.el;
      el.dataset.caseSlug = slug;

      grid.appendChild(el);
    });

    // Clear overlay content and render
    content.textContent = '';
    content.appendChild(header);
    content.appendChild(grid);

    // Show overlay
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('overlay-open');
    panel.scrollTop = 0;
    closeBtn.focus();

    // Wire card clicks — each Polaroid opens the full case study
    returnToGrid = false;
    grid.querySelectorAll('.item-polaroid').forEach(function(card) {
      card.addEventListener('click', function() {
        var slug = card.dataset.caseSlug;
        if (slug && portfolioData[slug]) {
          returnToGrid = true;
          openOverlay(slug, card);
        }
      });
    });
  }

  // ── Experiments grid view ──────────────────────────────────────────────────
  function openExperimentsGrid() {
    var html = '<div class="overlay-hero"><h2 class="overlay-title">Experiments</h2>' +
      '<p class="overlay-subtitle">Quick explorations &amp; side projects</p></div>' +
      '<div class="experiments-grid">';

    experimentSlugs.forEach(function(slug) {
      var data = experimentData[slug];
      if (!data) return;

      html += '<div class="experiment-card" data-experiment-slug="' + slug + '">' +
        '<div class="experiment-card-illustration">' +
          '<img src="' + data.illustration + '" alt="' + data.title + '">' +
        '</div>' +
        '<div class="experiment-card-title">' + data.title + '</div>' +
        '<div class="experiment-card-subtitle">' + data.subtitle + '</div>' +
      '</div>';
    });

    html += '</div>';

    content.innerHTML = html;

    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('overlay-open');
    panel.scrollTop = 0;
    closeBtn.focus();

    returnToExperiments = false;
    content.querySelectorAll('.experiment-card').forEach(function(card) {
      card.addEventListener('click', function() {
        var slug = card.getAttribute('data-experiment-slug');
        if (slug && experimentData[slug]) {
          returnToExperiments = true;
          openExperimentDetail(slug);
        }
      });
    });
  }

  function openExperimentDetail(slug) {
    var data = experimentData[slug];
    if (!data) return;

    var html = '<div class="overlay-hero">' +
      '<h2 class="overlay-title">' + data.title + '</h2>' +
      '<p class="overlay-subtitle">' + data.subtitle + '</p>';

    if (data.tags && data.tags.length) {
      html += '<div class="overlay-tags">';
      data.tags.forEach(function(tag) {
        html += '<span class="overlay-tag">' + tag + '</span>';
      });
      html += '</div>';
    }

    html += '</div>';

    html += '<div class="overlay-body">' +
      '<p>' + data.description + '</p>' +
    '</div>';

    // Image collage — desktop + phone mockup
    if (data.images && data.images.length >= 2) {
      html += '<div class="experiment-detail-collage">';
      data.images.forEach(function(img) {
        html += '<div class="experiment-detail-collage-img experiment-detail-collage-img--' + img.type + '">' +
          '<img src="' + img.src + '" alt="' + img.alt + '">' +
        '</div>';
      });
      html += '</div>';
    }

    // Single hero image — no collage, just a full-width desktop shot
    if (data.images && data.images.length === 1) {
      html += '<div class="experiment-detail-hero-img">' +
        '<img src="' + data.images[0].src + '" alt="' + data.images[0].alt + '">' +
      '</div>';
    }

    // Additional screenshots — booking flow screens
    if (data.screenshots && data.screenshots.length) {
      html += '<div class="overlay-body"><h3 class="overlay-section-title">' + (data.screenshotTitle || 'Screenshots') + '</h3></div>';
      html += '<div class="overlay-img-grid">';
      data.screenshots.forEach(function(img) {
        html += '<img class="overlay-img-half" src="' + img.src + '" alt="' + img.alt + '">';
      });
      html += '</div>';
    }

    content.innerHTML = html;

    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('overlay-open');
    panel.scrollTop = 0;
    closeBtn.focus();
  }

  // ── Navbar: Case Studies click handler ────────────────────────────────────
  var navCaseStudies = document.getElementById('nav-case-studies');
  if (navCaseStudies) {
    navCaseStudies.addEventListener('click', function(e) {
      e.preventDefault();
      openCaseStudiesGrid();
    });
  }

  // ── Navbar: Experiments click handler ──────────────────────────────────────
  var navExperiments = document.getElementById('nav-experiments');
  if (navExperiments) {
    navExperiments.addEventListener('click', function(e) {
      e.preventDefault();
      openExperimentsGrid();
    });
  }

  // ── Navbar: Resume click handler ─────────────────────────────────────────
  var navResume = document.getElementById('nav-resume');
  if (navResume) {
    navResume.addEventListener('click', function(e) {
      e.preventDefault();
      openResume();
    });
  }

  function openResume() {
    var html = '<div class="overlay-hero">' +
      '<h2 class="overlay-title">Resume</h2>' +
      '<p class="overlay-subtitle">Athira Prakash - UX Designer</p>' +
      '<div style="margin-top:16px">' +
        '<a href="images/athira-resume.pdf" download="Athira-Prakash-Resume.pdf" class="resume-download-btn">' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>' +
            '<polyline points="7 10 12 15 17 10"/>' +
            '<line x1="12" y1="15" x2="12" y2="3"/>' +
          '</svg>' +
          'Download PDF' +
        '</a>' +
      '</div>' +
    '</div>' +

    '<div class="resume-note">' +
      '<div class="resume-note-inner">' +

        '<div class="resume-header">' +
          '<h2 class="resume-name">Athira Prakash</h2>' +
          '<p class="resume-contact">(650) 304-6293 \u00B7 athiraprakash282@gmail.com \u00B7 CA \u00B7 <a href="#">LinkedIn</a> \u00B7 <a href="#">Portfolio</a></p>' +
        '</div>' +

        '<div class="resume-section">' +
          '<h3 class="resume-section-title">Technical Skills</h3>' +
          '<p><strong>Tools:</strong> Figma, Framer, Miro, Adobe Suite, Protopie, Origami, Axure, Lovable, Google Analytics, Lottiefiles, Confluence</p>' +
          '<p><strong>Language & Methodologies:</strong> HTML/CSS, Javascript, Bootstrap, Agile, Lean, iOS & Android Design Systems</p>' +
          '<p><strong>UX Design:</strong> Information Architecture, Interaction Design, Prototyping, Visual Design</p>' +
          '<p><strong>UX Research:</strong> A/B Testing, Heuristic Evaluation, Usability Testing, Qualitative and Quantitative Research</p>' +
        '</div>' +

        '<div class="resume-section">' +
          '<h3 class="resume-section-title">Work Experience</h3>' +

          '<div class="resume-entry">' +
            '<div class="resume-entry-header">' +
              '<span class="resume-company">Griting.AI <span class="resume-role">\u00B7 Founding UX Designer \u00B7 California</span></span>' +
              '<span class="resume-date">Sep 2025 \u2013 Current</span>' +
            '</div>' +
            '<ul class="resume-bullets">' +
              '<li>Lead end-to-end UX for Griting\u2019s B2B and B2C AI products, including mentorship, auditable, and incubation platforms.</li>' +
              '<li>Define user journeys, information architecture, and interaction models from zero to one for the agentic mentoring platform.</li>' +
              '<li>Collaborated closely with founders and engineers to build the MVP from scratch, driving product decisions through user research, rapid prototyping, and early feedback loops.</li>' +
            '</ul>' +
          '</div>' +

          '<div class="resume-entry">' +
            '<div class="resume-entry-header">' +
              '<span class="resume-company">OpsShield <span class="resume-role">\u00B7 UX Designer \u00B7 California</span></span>' +
              '<span class="resume-date">Jan 2024 \u2013 Jul 2025</span>' +
            '</div>' +
            '<ul class="resume-bullets">' +
              '<li>Redesigned cPGuardX control panel workflows using Figma prototypes and user testing to streamline SSL setup and backup flows, reducing task completion time by 35%.</li>' +
              '<li>Collaborated with engineers and PM to integrate security dashboards and developer tools into a unified interface, enhancing feature discoverability by 28%.</li>' +
              '<li>Implemented user-centered design improvements across the web hosting and security suite, increasing website engagement by 18%.</li>' +
            '</ul>' +
          '</div>' +

          '<div class="resume-entry">' +
            '<div class="resume-entry-header">' +
              '<span class="resume-company">Oracle <span class="resume-role">\u00B7 UX Designer \u00B7 Bangalore</span></span>' +
              '<span class="resume-date">Jul 2021 \u2013 Jun 2023</span>' +
            '</div>' +
            '<ul class="resume-bullets">' +
              '<li>Redesigned Oracle CPQ quoting workflow using Redwood Design System, enabling sales reps to complete quotes 25% faster.</li>' +
              '<li>Conducted user research and usability testing with 20+ Oracle sales users, cutting approval delays by 30%.</li>' +
              '<li>Streamlined BI dashboard interfaces, reducing reporting errors by 35% and saving 200+ hours per month.</li>' +
            '</ul>' +
          '</div>' +

          '<div class="resume-entry">' +
            '<div class="resume-entry-header">' +
              '<span class="resume-company">Oracle <span class="resume-role">\u00B7 Business Analyst \u00B7 Bangalore</span></span>' +
              '<span class="resume-date">Jul 2018 \u2013 Jun 2021</span>' +
            '</div>' +
            '<ul class="resume-bullets">' +
              '<li>Optimized quote generation using Oracle CPQ with templated pricing logic and guided selling rules, reducing quote cycle time by 25\u201330%.</li>' +
              '<li>Analyzed key metrics around order store portal workflows to drive key product insights and reported to stakeholders.</li>' +
            '</ul>' +
          '</div>' +
        '</div>' +

        '<div class="resume-section">' +
          '<h3 class="resume-section-title">Education</h3>' +
          '<p class="resume-edu"><strong>University of California, Berkeley</strong> - UX/UI Design</p>' +
          '<p class="resume-edu"><strong>Alliance University</strong> - MBA (Business Analytics)</p>' +
          '<p class="resume-edu"><strong>St Claret College</strong> - BCA</p>' +
        '</div>' +

      '</div>' +
    '</div>';

    content.innerHTML = html;

    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('overlay-open');
    panel.scrollTop = 0;
    closeBtn.focus();
  }

  // ── Click/drag disambiguation ──────────────────────────────────────────────
  // Event delegation on the canvas: track mousedown position, compare on mouseup.
  // < 5px movement = click (open overlay); >= 5px = drag/pan (ignore).

  canvas.addEventListener('mousedown', function(e) {
    var item = e.target.closest('[data-portfolio]') || e.target.closest('[data-experiment]') || e.target.closest('[data-resume]');
    if (!item) return;
    downX = e.clientX;
    downY = e.clientY;
    downTarget = item;
  });

  window.addEventListener('mouseup', function(e) {
    if (!downTarget) return;
    var dx = e.clientX - downX;
    var dy = e.clientY - downY;
    var dist = Math.sqrt(dx * dx + dy * dy);
    var target = downTarget;
    downTarget = null;

    if (dist < 5) {
      var portfolioSlug = target.getAttribute('data-portfolio');
      var experimentSlug = target.getAttribute('data-experiment');
      if (portfolioSlug && portfolioData[portfolioSlug]) {
        openOverlay(portfolioSlug, target);
      } else if (experimentSlug && experimentData[experimentSlug]) {
        openExperimentDetail(experimentSlug);
      } else if (target.hasAttribute('data-resume')) {
        openResume();
      }
    }
  });

  // ── Open overlay ───────────────────────────────────────────────────────────
  function openOverlay(slug, el) {
    var data = portfolioData[slug];
    if (!data) return;

    triggerEl = el;

    // Build content HTML (all values come from the hardcoded portfolioData above)
    var html = '';

    // Build hero title/subtitle/tags markup
    var heroInner = '<h2 class="overlay-title">' + data.title + '</h2>';
    if (data.subtitle) {
      heroInner += '<p class="overlay-subtitle">' + data.subtitle + '</p>';
    }
    if (data.tags && data.tags.length) {
      heroInner += '<div class="overlay-tags">';
      data.tags.forEach(function(tag) {
        heroInner += '<span class="overlay-tag">' + tag + '</span>';
      });
      heroInner += '</div>';
    }

    if (data.heroImage) {
      // Split hero — text left, image right (like a case study hero)
      html += '<div class="overlay-hero-split">';
      html += '<div class="overlay-hero-text">' + heroInner;
      // Include the intro paragraph inside the hero text if body starts with <p>
      if (data.body.indexOf('<p>') === 0) {
        var firstPEnd = data.body.indexOf('</p>') + 4;
        html += '<p class="overlay-hero-intro">' + data.body.substring(3, firstPEnd - 4) + '</p>';
        data._bodyOffset = firstPEnd; // track how much body to skip
      }
      html += '</div>';
      html += '<div class="overlay-hero-image"><img src="' + data.heroImage + '" alt="' + data.title + ' hero"></div>';
      html += '</div>';
    } else {
      // No hero image — standard layout with title above body
      html += '<div class="overlay-hero">' + heroInner + '</div>';
    }

    // If the first <p> was pulled into the hero, skip it from the body
    var bodyContent = (data._bodyOffset) ? data.body.substring(data._bodyOffset) : data.body;
    delete data._bodyOffset;
    html += '<div class="overlay-body">' + bodyContent + '</div>';

    if (data.link) {
      html += '<a class="overlay-link" href="' + data.link.href + '">' + data.link.text + '</a>';
    }

    content.innerHTML = html; // Safe: static developer-controlled content only

    // Show overlay
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('overlay-open');

    // Scroll panel to top
    panel.scrollTop = 0;

    // Focus the close button
    closeBtn.focus();
  }

  // ── Close overlay ──────────────────────────────────────────────────────────
  function closeOverlay() {
    // If a case study was opened from the grid, go back to the grid
    if (returnToGrid) {
      returnToGrid = false;
      openCaseStudiesGrid();
      return;
    }
    if (returnToExperiments) {
      returnToExperiments = false;
      openExperimentsGrid();
      return;
    }

    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('overlay-open');

    // Return focus to the element that triggered the overlay
    if (triggerEl) {
      triggerEl.focus();
      triggerEl = null;
    }
  }

  // ── Close triggers ─────────────────────────────────────────────────────────

  // Close button click
  closeBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    closeOverlay();
  });

  // Backdrop click (only the backdrop itself, not the panel)
  backdrop.addEventListener('click', function() {
    closeOverlay();
  });

  // Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeOverlay();
    }
  });

  // ── Focus trapping ─────────────────────────────────────────────────────────
  // When the overlay is open, Tab cycles only within the panel.
  // Shift+Tab at first focusable wraps to last; Tab at last wraps to first.

  document.addEventListener('keydown', function(e) {
    if (e.key !== 'Tab' || !overlay.classList.contains('is-open')) return;

    var focusable = sheet.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // ── Prevent sheet clicks from closing ──────────────────────────────────────
  // Clicks inside the sheet (panel + close button) must not bubble to the backdrop.
  sheet.addEventListener('click', function(e) {
    e.stopPropagation();
  });

})();
