export type PortfolioProject = {
  id: string;
  name: string;
  category: string;
  platform: string;
  summary: string;
  challenge: string;
  solution: string;
  highlights: string[];
  results?: string[];
  tags: string[];
};

export const designProcess = [
  { step: "Discover", description: "Research, user interviews, and competitor analysis to understand the problem." },
  { step: "Define", description: "User personas, user journeys, and information architecture to plan the solution." },
  { step: "Ideate", description: "Wireframes, user flows, and low-fidelity prototypes." },
  { step: "Design", description: "High-fidelity UI, UI kits, and scalable design systems." },
  { step: "Test", description: "Usability testing and iterative improvements based on feedback." },
] as const;

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "aramco-ctzn",
    name: "Aramco CTZN — Digital Employee Onboarding Platform",
    category: "Enterprise / Government",
    platform: "Mobile App",
    summary:
      "Led end-to-end UX strategy and product design for a next-generation employee onboarding platform for one of the world's largest enterprise organizations — transforming fragmented manual onboarding into an immersive digital journey with gamification, guided learning, and metaverse-inspired exploration.",
    challenge:
      "Onboarding relied on disconnected systems, PDFs, manual HR follow-ups, emails, and had no centralized progress tracking. New employees felt overwhelmed — unclear what to do first, what was pending, where to find information, or how much progress they'd made.",
    solution:
      "As Design Lead, I defined the product vision and designed a guided digital experience — not a checklist app. Built interconnected 'experience islands' (Dashboard, Training, Awareness, Library, Tasks, Events, Rewards, Wallet, AI Assistant, Store) connected by a central lobby. Combined enterprise usability with gamification, immersive navigation, and scalable design systems.",
    highlights: [
      "Led UX strategy, discovery workshops, IA, and experience architecture end-to-end",
      "Designed information architecture and created user flows for every major feature",
      "Designed complete mobile UI across all platform screens",
      "Built scalable enterprise design system with reusable components",
      "Worked closely with developers to ensure implementation quality",
      "Presented design concepts and product direction to stakeholders",
      "Secure auth: phone OTP, biometric login, enterprise-grade security",
      "First-time UX: cinematic intros, contextual guidance, progressive onboarding",
      "Metaverse-inspired navigation through experience spaces instead of flat menus",
      "Personal dashboard: progress, profile, PDP journey, tasks, events, achievements",
      "Stage-based tasks: Preboarding, First Day, First Week, First Month",
      "Timeline events: workshops, bootcamps, PDP sessions, company activities",
      "Interactive training modules replacing static PDFs",
      "Awareness Island: company history, org structure, culture, internal resources",
      "Gamification: progress tracking, rewards, points, achievements, leaderboards",
      "Integrated AI assistant for onboarding, company info, and navigation help",
      "Wallet & rewards system tied to learning progress and task completion",
    ],
    results: [
      "Transformed manual onboarding into a unified digital experience",
      "Business: Reduced onboarding complexity",
      "Business: Centralized employee onboarding",
      "Business: Improved employee engagement",
      "Business: Reduced dependency on HR teams",
      "Business: Increased onboarding visibility",
      "Business: Created scalable onboarding architecture",
      "Business: Simplified enterprise navigation",
      "Business: Improved employee learning experience",
      "UX: Reduced cognitive load",
      "UX: Clear onboarding journey",
      "UX: Better discoverability",
      "UX: Higher motivation using gamification",
      "UX: Easier navigation using island architecture",
    ],
    tags: [
      "Enterprise UX",
      "Mobile App",
      "Design Lead",
      "Gamification",
      "Onboarding",
      "Design Systems",
      "AI",
      "Metaverse",
      "Government",
      "Information Architecture",
    ],
  },
  {
    id: "ezvoltz",
    name: "ezVOLTz — EV Navigation App",
    category: "Automotive / EV",
    platform: "iOS & Android",
    summary:
      "Brand-agnostic EV charging station locator and trip planner for drivers across the USA.",
    challenge:
      "No universal app to find charging stations independent of vehicle brand. Long-distance trip planning lacked reliable route charging data.",
    solution:
      "Designed full mobile UI/UX: nationwide charging map, smart filters, trip route planning, Range Halo™ zones, turn-by-turn navigation, and in-app payments across 80+ networks.",
    highlights: [
      "Nationwide charging directory with real-time availability",
      "Smart filters: connector, speed, network, vehicle compatibility",
      "Route planner with optimal charging stops",
      "Range Halo™ visual recharge zones on map",
      "Nearby amenities while waiting to charge",
      "In-app session start/stop and secure payments",
    ],
    results: [
      "Hassle-free long-distance trips up to 1000+ miles",
      "Drivers confirm station status before arrival",
      "Seamless multi-network payment integration",
    ],
    tags: ["Mobile App", "Automotive", "EV", "Navigation"],
  },
  {
    id: "dents-co",
    name: "Dents.co — Auto Body Damage Measurement",
    category: "Automotive / Collision Repair",
    platform: "iPhone & iPad (LiDAR)",
    summary:
      "AI-powered app measuring auto body damage via LiDAR with shareable repair reports for shops and insurers.",
    challenge:
      "Collision shops faced inconsistent damage assessment and slow insurance negotiations without standardized remote measurement.",
    solution:
      "End-to-end mobile UI/UX: onboarding, LiDAR scan flow, damage selection, 3D depth maps, repair time recommendations, PDF/image/link report sharing.",
    highlights: [
      "LiDAR + AI damage measurement",
      "3D depth map visualization",
      "Scan → Confirm damage → Share report flow",
      "Repair time recommendations",
      "Export as PDF, image, or shareable link",
    ],
    results: [
      "Standardized quoting for body shops and insurers",
      "Faster remote repair negotiations",
      "Sub-centimeter accuracy in controlled testing",
    ],
    tags: ["Mobile App", "Automotive", "AI", "LiDAR", "B2B"],
  },
  {
    id: "leader-of-design",
    name: "The Leader of Design — Portfolio Presentation",
    category: "Branding / Portfolio",
    platform: "Presentation Deck",
    summary:
      "Comprehensive design portfolio deck showcasing services, 5-step design process, and selected case studies across fintech, travel, fitness, Web3, and enterprise.",
    challenge:
      "Present a wide range of design capabilities and process in one cohesive, professional narrative for potential clients and employers.",
    solution:
      "Built a full presentation covering UI/UX services, discovery-to-test workflow, and curated project highlights with consistent visual storytelling.",
    highlights: [
      "Services overview: UI/UX, web, mobile, branding, product strategy",
      "5-step process: Discover, Define, Ideate, Design, Test",
      "Multi-industry case study showcase",
      "Client testimonials and engagement models",
    ],
    tags: ["Portfolio", "Branding", "Design Leadership", "Presentation"],
  },
  {
    id: "elite-studio",
    name: "Elite Studio — Interior Design Studio",
    category: "Interior Design / Branding",
    platform: "Web",
    summary:
      "Website and brand presence for an interior design studio — elegant visuals showcasing spaces, services, and portfolio work.",
    challenge:
      "Interior design brands need a digital presence that feels premium and lets the visual work speak for itself.",
    solution:
      "Designed a refined web experience with spacious layouts, project galleries, and service sections tailored to high-end interior design clients.",
    highlights: [
      "Premium interior design web layout",
      "Project and space gallery showcase",
      "Service and studio introduction sections",
      "Elegant typography and visual hierarchy",
    ],
    tags: ["Web Design", "Interior Design", "Branding"],
  },
  {
    id: "graphy-agency",
    name: "Graphy Agency — Brand & Web",
    category: "Agency Branding",
    platform: "Web",
    summary:
      "Full agency brand identity and website design for a creative design agency offering UI/UX and digital services.",
    challenge:
      "A design agency needs its own brand to demonstrate creative capability and attract client trust before showing client work.",
    solution:
      "Developed agency branding, visual identity, and website UI showcasing services, process, and creative positioning.",
    highlights: [
      "Agency brand identity system",
      "Service showcase website",
      "Creative agency visual language",
      "Client-facing portfolio presentation",
    ],
    tags: ["Agency", "Branding", "Web Design", "UI/UX"],
  },
  {
    id: "leader-homes",
    name: "Leader Homes",
    category: "Real Estate",
    platform: "Web",
    summary:
      "Real estate web design for a property brand — listings, property details, and lead-focused layout.",
    challenge:
      "Real estate brands need to present properties clearly and convert visitors into inquiries.",
    solution:
      "Designed property listing pages, detail views, and a lead-focused homepage for a real estate brand.",
    highlights: [
      "Property listing layouts",
      "Property detail pages",
      "Lead-focused homepage design",
      "Real estate brand visual identity",
    ],
    tags: ["Real Estate", "Web Design", "Property"],
  },
  {
    id: "social-media-portfolio",
    name: "Social Media Portfolio",
    category: "Social Media / Marketing",
    platform: "Digital",
    summary:
      "Collection of social media creatives, post designs, and campaign visuals for brand marketing.",
    challenge:
      "Brands need consistent, scroll-stopping social content that aligns with their identity across platforms.",
    solution:
      "Designed social media post templates, campaign creatives, and promotional visuals across multiple brand styles.",
    highlights: [
      "Social post and story designs",
      "Campaign promotional creatives",
      "Multi-platform content templates",
      "Brand-consistent visual content",
    ],
    tags: ["Social Media", "Graphic Design", "Marketing"],
  },
  {
    id: "technology-website",
    name: "Technology Website",
    category: "Technology / SaaS",
    platform: "Web",
    summary:
      "Modern technology company website with product-focused sections, features, and clean SaaS-style layout.",
    challenge:
      "Tech companies need websites that communicate product value quickly without overwhelming visitors.",
    solution:
      "Designed a clean technology website with hero, feature sections, and product-focused layout using modern SaaS patterns.",
    highlights: [
      "Product-focused hero and features",
      "Clean SaaS-style web layout",
      "Technology brand presentation",
      "Conversion-oriented page structure",
    ],
    tags: ["Web Design", "Technology", "SaaS"],
  },
  {
    id: "rideshare-driver-network",
    name: "Rideshare Driver Network",
    category: "Transportation / Rideshare",
    platform: "Web",
    summary:
      "Website design for a rideshare driver network — onboarding drivers, showcasing benefits, and recruitment-focused UX.",
    challenge:
      "Rideshare platforms need to attract and onboard drivers with clear value propositions and simple signup paths.",
    solution:
      "Designed a driver-focused website with benefit highlights, how-it-works sections, and recruitment-oriented call-to-actions.",
    highlights: [
      "Driver recruitment landing page",
      "Benefits and how-it-works sections",
      "Signup-focused call-to-actions",
      "Transportation network brand UI",
    ],
    tags: ["Web Design", "Rideshare", "Transportation"],
  },
  {
    id: "trend-emergence",
    name: "Trend Emergence",
    category: "Branding / Visual Design",
    platform: "Digital",
    summary:
      "Visual design project exploring emerging design trends — experimental layouts, typography, and contemporary brand aesthetics.",
    challenge:
      "Explore and visualize current design trends in a way that feels fresh without sacrificing usability principles.",
    solution:
      "Created an experimental visual design piece applying contemporary typography, color, and layout trends.",
    highlights: [
      "Trend-forward visual exploration",
      "Experimental typography and layout",
      "Contemporary brand aesthetics",
      "Design trend case study",
    ],
    tags: ["Visual Design", "Branding", "Experimental"],
  },
  {
    id: "moc-cultural-universe",
    name: "MOC — Cultural Universe & Founding Village",
    category: "Government / Web3 & Metaverse",
    platform: "Web, Mobile & VR",
    summary:
      "Immersive cultural experience for Saudi Arabia's Ministry of Culture — a game-style app helping Gen Z explore history and heritage through interactive 3D environments, avatar customization, and token rewards.",
    challenge:
      "Make Saudi history and culture engaging for Gen Z through a modern digital experience that works across web, mobile, and immersive VR — not feel like a dry educational portal.",
    solution:
      "Designed the Cultural Universe Map, History Walk, Founding Village, and Heritage Commission modules with modern UI and history-inspired aesthetics. Built custom components, Effra typography system, avatar customization with traditional Saudi attire, 3D immersive hallway environments, and a token-based marketplace (MOC Tokens).",
    highlights: [
      "Cultural Universe Welcome Hub — immersive heritage adventure",
      "History Walk — milestone-based exploration of Saudi history",
      "Founding Village — interactive stations with MOC Token rewards",
      "Heritage Commission & Culinary Arts Commission experiences",
      "Cross-platform: web dashboard, mobile app, and VR/AR environments",
      "Avatar customization with traditional Saudi attire (thobe, ghutra)",
      "Magic Qaleen marketplace — physical products for 500 tokens",
      "Effra type system (Regular, Medium, Semibold, Bold)",
      "Gesture controls: tap, voice, pinch-to-zoom, navigation modes",
      "Custom-built design system with history-inspired visual language",
    ],
    tags: ["Government", "Web3", "Metaverse", "VR", "Mobile", "Web", "Cultural"],
  },
  {
    id: "onit",
    name: "ONIT — Household Services App",
    category: "On-Demand Services",
    platform: "Mobile App (iOS & Android)",
    summary:
      "On-demand app connecting households with local service professionals — plumbers, electricians, and tradespeople — with community chat, map discovery, and real-time job coordination.",
    challenge:
      "Service marketplaces need to feel trustworthy and make it easy for both customers and professionals to find each other, coordinate jobs, and communicate in real time.",
    solution:
      "Full brand identity and mobile UI/UX: green wordmark logo (location pin + person icon), Open Sans typography, map-based provider discovery, business profiles with ratings, community groups (e.g. Electric Community), group chat for job coordination, mobile verification, and voice/group call interfaces.",
    highlights: [
      "Clean modern brand identity with green color palette",
      "Logo: stylized 'o' as location pin + speech bubble with person icon",
      "Open Sans typography system (Regular → ExtraBold)",
      "Map view with nearby service provider pins",
      "Professional/business profiles with ratings and contact info",
      "Community group chat for job coordination (e.g. 'Anyone free for a job in Gulberg?')",
      "Mobile number verification onboarding",
      "Voice and group call interfaces",
      "Brand applied to merch: caps, tags, social media mockups",
      "Facebook and app store marketing creatives",
    ],
    tags: ["Mobile App", "On-Demand", "Services", "Branding", "Marketplace"],
  },
  {
    id: "solutionsloft-social-media",
    name: "Solutionsloft — Social Media Design",
    category: "Social Media / Brand Marketing",
    platform: "Instagram & Digital",
    summary:
      "Social media design system and content for a bespoke software development firm — positioning, messaging, and visual consistency across Instagram and digital channels.",
    challenge:
      "A tech consultancy needed a stronger digital footprint with scroll-stopping, on-brand social content that communicates expertise without feeling corporate or dry.",
    solution:
      "Developed brand strategy, visual templates, and a full Instagram feed (@solutionsloftofficial) with consistent blue-and-white aesthetic, 3D illustrations, and educational tech content.",
    highlights: [
      "Brand strategy: positioning, messaging, visual consistency",
      "Instagram feed design with professional blue/white palette",
      "Educational post series: MVP Development for Startups",
      "AI content: Agentic AI, Vision AI, Data Analytics, ChatGPT vs DeepSeek",
      "DevOps metrics and React Native MVP posts",
      "Workflow automation and business growth content",
      "Community posts: Local Partners, International Women's Day",
      "Modern 3D illustration style across all posts",
    ],
    tags: ["Social Media", "Branding", "Technology", "Marketing", "Instagram"],
  },
];
