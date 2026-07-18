export type CaseStudyImage = {
  alt: string;
  src?: string;
  aspect?: "hero" | "wide" | "square" | "portrait";
  fit?: "cover" | "contain";
};

export type CaseStudyBlock = {
  title: string;
  body?: string[];
  bullets?: string[];
  decision?: string;
  decisionBullets?: string[];
  cards?: { title: string; body: string[] }[];
  images?: CaseStudyImage[];
  layout?: "stack" | "split" | "boxes" | "outcome";
};

export type CaseStudySection = {
  id: string;
  title: string;
  body?: string[];
  bullets?: string[];
  items?: { title: string; body: string; bullets?: string[]; image?: CaseStudyImage }[];
  flow?: string[];
  images?: CaseStudyImage[];
  blocks?: CaseStudyBlock[];
};

export type CaseStudy = {
  id: string;
  brand: string;
  heading: string;
  timeline: string;
  timelineLines?: string[];
  heroAccent: string;
  heroImage: CaseStudyImage;
  tags: string[];
  shortDescription: string;
  intro: string[];
  roleLine: string;
  teamMembers: string[];
  sections: CaseStudySection[];
};

export const caseStudies: Record<string, CaseStudy> = {
  brandpulse: {
    id: "brandpulse",
    brand: "BrandPulse",
    heading: "Designing an AI-powered platform that helps marketers validate ad creatives before investing in media spend.",
    timeline: "Phase 1 — 2 Weeks · Phase 2 — 1 Month · Phase 3 — Continuous",
    timelineLines: [
      "Phase 1 — 2 Weeks",
      "Phase 2 — 1 Month",
      "Phase 3 — Continuous",
    ],
    heroAccent: "#1A7FED",
    heroImage: {
      src: "/images/CaseStudies/Brandpulse/Hero-image.png",
      alt: "BrandPulse product hero — analytics dashboard, HTML5 banner testing, and creative upload flow",
      aspect: "hero",
    },
    tags: ["SaaS", "AI", "Web App", "Creative Testing"],
    shortDescription:
      "BrandPulse helps advertisers validate images, videos, text, and HTML5 banners with real audiences before launching campaigns — so marketers get data-backed insights instead of spending on assumptions.",
    intro: [
      "BrandPulse is a creative testing platform that enables advertisers to validate images, videos, text, and HTML5 banners before launching campaigns. Instead of relying on assumptions, marketers receive data-backed insights that help identify which creative is most likely to capture audience attention.",
      "As the sole Product Designer, I led the product design from discovery through multiple iterations, collaborating closely with business stakeholders, developers, QA, and product leadership to transform an MVP into a scalable product.",
    ],
    roleLine: "Product Designer (End-to-End)",
    teamMembers: [
      "Discovery Lead",
      "Business Development",
      "Product Manager",
      "Developers",
      "QA Engineers",
    ],
    sections: [
      {
        id: "impact",
        title: "Impact",
        body: [
          "The iterative design approach helped evolve BrandPulse from an investor-focused MVP into a more mature product.",
        ],
        items: [
          {
            title: "Mobile-first product shift",
            body: "Moved BrandPulse from a desktop-only MVP to a mobile-first experience after analytics showed most users accessed the platform on mobile browsers.",
          },
          {
            title: "Flexible credit pricing",
            body: "Increased adoption of the credit-based subscription model and reduced checkout drop-offs by supporting bundles alongside one-time payments.",
          },
          {
            title: "In-product creative prep",
            body: "Eliminated third-party editing by integrating image cropping, so users could fix dimensions without leaving BrandPulse.",
          },
          {
            title: "Broader creative formats",
            body: "Expanded testing beyond static ads with HTML5 banner support, ZIP/HTML uploads, and a lightweight live code editor.",
          },
          {
            title: "AI-assisted operations",
            body: "Reduced manual campaign processing with AI-assisted workflows and clearer reports that helped marketers decide faster.",
          },
        ],
        images: [
          {
            src: "/images/CaseStudies/Brandpulse/impact-image.png",
            alt: "BrandPulse impact — mobile HTML upload, credit pricing plans, and in-app image cropping",
            aspect: "wide",
          },
        ],
      },
      {
        id: "context",
        title: "Context",
        body: [
          "Companies spend thousands of dollars every month on Google Ads without knowing which creative will actually perform best.",
          "Traditional research is expensive, time-consuming, and often happens after marketing budgets have already been spent.",
          "The client wanted a platform where advertisers could upload multiple creative variations, test them with real audiences through the Google network, and receive actionable insights before launching campaigns.",
        ],
      },
      {
        id: "problems-solutions",
        title: "Problems & Solutions",
        items: [
          {
            title: "Mobile access vs desktop-first MVP",
            body: "Usage data showed many customers accessed BrandPulse through mobile browsers, even though the product was designed for desktop.",
            bullets: [
              "Redesigned key workflows for smaller screens",
              "Mobile-first layouts and responsive dashboard",
              "Simplified navigation and improved touch interactions",
            ],
          },
          {
            title: "High payment drop-offs at checkout",
            body: "Users hesitated to pay a relatively high one-time fee for testing a single advertisement.",
            bullets: [
              "Introduced a flexible credit system alongside one-time payments",
              "Users could purchase credit bundles and reuse them across campaigns",
              "Aligned pricing with different customer behaviors and encouraged repeat usage",
            ],
          },
          {
            title: "Upload friction from wrong media dimensions",
            body: "Users frequently uploaded media that didn’t match required dimensions and were redirected to an external image editor — many abandoned the flow.",
            bullets: [
              "Designed an integrated image cropping experience inside BrandPulse",
              "Users could prepare creatives without leaving the platform",
            ],
          },
        ],
      },
      {
        id: "users",
        title: "Users & Their Needs",
        items: [
          {
            title: "Startup Marketers",
            body: "Small teams launching their first campaigns who needed confidence before investing in advertising.",
            bullets: [
              "Validate creatives quickly",
              "Reduce wasted budget",
              "Understand which ad would perform better",
            ],
          },
          {
            title: "Enterprise Marketing Teams",
            body: "Organizations managing multiple campaigns simultaneously.",
            bullets: [
              "Compare multiple creative versions",
              "Make data-driven campaign decisions",
              "Standardize creative evaluation",
            ],
          },
        ],
      },
      {
        id: "team-role",
        title: "Team & My Role",
        body: [
          "I was the sole Product Designer, owning the experience end-to-end — from discovery and research through UI, prototyping, handoff, and report design.",
        ],
        bullets: [
          "Product Discovery, UX Research, Competitive Analysis",
          "User Flows, Wireframing, UI Design, Responsive Design",
          "Feature Prioritization, Prototyping, Developer Handoff, Report Design",
        ],
        items: [
          {
            title: "Team",
            body: "Collaborated across a multidisciplinary group.",
            bullets: [
              "Discovery Lead",
              "Business Development",
              "Product Manager",
              "Developers",
              "QA Engineers",
            ],
          },
          {
            title: "Tools",
            body: "Design and exploration toolkit.",
            bullets: ["Figma", "Pen & Paper"],
          },
        ],
      },
      {
        id: "constraints",
        title: "Constraints & Roadblocks",
        items: [
          {
            title: "Investor-driven MVP scope",
            body: "The initial objective was securing investor interest, so scope had to stay tightly focused on a lean MVP instead of a fully featured platform.",
          },
          {
            title: "Desktop-only first release",
            body: "Shipping desktop first delayed mobile readiness even though real usage patterns later showed many customers accessed BrandPulse on mobile browsers.",
          },
          {
            title: "High one-time pricing",
            body: "A relatively high fee for testing a single ad created checkout hesitation before a more flexible credit model existed.",
          },
          {
            title: "External image editor",
            body: "When creatives didn't match required dimensions, users were sent to a third-party editor — breaking flow continuity and causing drop-offs.",
          },
          {
            title: "Manual campaign processing",
            body: "Every campaign was handled manually by the internal team, which limited operational scale as adoption grew.",
          },
          {
            title: "Long multi-step setup",
            body: "Campaign creation required many targeting steps, so users risked losing progress without a drafts experience.",
          },
        ],
      },
      {
        id: "key-decisions",
        title: "Key Decisions",
        items: [
          {
            title: "MVP over feature breadth",
            body: "Limited the first release to desktop users and the core testing workflow so the product vision could be validated without delaying development.",
          },
          {
            title: "Credits instead of one pricing model",
            body: "Replaced a single high one-time fee path with flexible credit bundles while still allowing one-time payments.",
          },
          {
            title: "Mobile-first redesign",
            body: "Rather than squeezing desktop screens onto phones, I redesigned key workflows specifically for smaller screens.",
          },
          {
            title: "In-product cropping",
            body: "Brought creative preparation into BrandPulse instead of sending users to a third-party editor.",
          },
          {
            title: "AI-assisted operations",
            body: "Shifted campaign analysis from fully manual review to AI processing with human validation before report delivery.",
          },
        ],
      },
      {
        id: "design-solution",
        title: "Design Solution",
        body: [
          "After aligning business goals with user needs, we defined a focused experience around the core creative testing journey.",
        ],
        items: [
          {
            title: "HTML5 banner testing",
            body: "Extended the platform beyond image and video with a lightweight code editor, ZIP/HTML uploads, and live banner previews.",
            image: {
              src: "/images/CaseStudies/Brandpulse/html5.png",
              alt: "BrandPulse HTML5 banner testing — upload HTML step and Write Code editor for live banner preview",
              aspect: "portrait",
              fit: "contain",
            },
          },
          {
            title: "Drafts",
            body: "Users could save incomplete campaigns and continue exactly where they left off.",
            image: {
              src: "/images/CaseStudies/Brandpulse/draft.png",
              alt: "BrandPulse drafts — draft campaigns list and Life Events targeting saved as draft",
              aspect: "portrait",
              fit: "contain",
            },
          },
          {
            title: "Wallet experience",
            body: "After credits launched, users needed visibility into available credits, history, package details, and upgrade flow.",
            image: {
              src: "/images/CaseStudies/Brandpulse/wallet.png",
              alt: "BrandPulse wallet — credit balance, selected plan, transaction history, and buy credits flow",
              aspect: "portrait",
              fit: "contain",
            },
          },
        ],
        images: [
          {
            src: "/images/CaseStudies/Brandpulse/preview-design-file.png",
            alt: "BrandPulse end-to-end UX flow map — dashboard, drafts, notifications, credits, and subscription plans",
            aspect: "wide",
            fit: "cover",
          },
          {
            src: "/images/CaseStudies/Brandpulse/pricing-wallet.png",
            alt: "BrandPulse pricing and wallet — Silver, Gold, Platinum plans, payment options, and test created confirmation",
            aspect: "wide",
            fit: "cover",
          },
        ],
      },
      {
        id: "phase-1",
        title: "Phase 1 — Discovery & MVP Design",
        body: [
          "Phase 1 focused on understanding why the product needed to exist, defining a lean MVP for investors, and shipping a focused desktop experience.",
        ],
        blocks: [
          {
            title: "Understanding the Business Problem",
            body: [
              "The project started with a series of discovery workshops alongside the client and internal stakeholders. Rather than jumping directly into designing screens, our goal was to understand why the product needed to exist.",
              "The client explained a common problem faced by advertisers: businesses invest thousands of dollars into Google Ads without knowing whether their creatives will actually perform. Most campaigns are launched based on assumptions, and meaningful insights only become available after a significant advertising budget has already been spent.",
              "The vision was to build a platform that could help marketers validate their creatives before launching campaigns, allowing them to make informed decisions while spending only a fraction of their advertising budget.",
            ],
            images: [
              {
                src: "/images/CaseStudies/Brandpulse/discovery-image.png",
                alt: "BrandPulse discovery workshop board — problem, pain points, quotes, root causes, vision, and success metrics",
                aspect: "wide",
                fit: "cover",
              },
            ],
          },
          {
            title: "Defining the MVP",
            body: [
              "Since the client's immediate goal was to demonstrate the product to potential investors, we decided to focus on building a lean MVP rather than a fully featured platform.",
              "To keep development fast and focused, we intentionally limited the first release. Everything outside these essential features was postponed for future iterations.",
              "This approach allowed us to validate the business idea quickly without overbuilding the product.",
            ],
            bullets: [
              "Desktop experience only",
              "Core campaign creation workflow",
              "Creative upload",
              "Audience targeting",
              "Report generation",
            ],
            layout: "split",
            images: [
              {
                src: "/images/CaseStudies/Brandpulse/mvp-image.png",
                alt: "MVP scope board — desktop-only campaign creation, upload, targeting, and reports",
                aspect: "wide",
                fit: "cover",
              },
            ],
          },
          {
            title: "Research & Competitive Analysis",
            body: [
              "Before designing the experience, I explored how digital advertising platforms currently operate.",
              "One clear insight emerged: advertisers had plenty of tools to measure campaign performance after launch, but very few solutions helped them evaluate creatives before spending their marketing budget.",
              "This insight became the foundation of BrandPulse.",
            ],
            bullets: [
              "Understanding the Google Ads ecosystem",
              "Analyzing creative testing platforms",
              "Reviewing competitor workflows",
              "Identifying gaps in the current user experience",
            ],
            layout: "split",
          },
          {
            title: "Understanding the Users",
            layout: "boxes",
            body: [
              "During discovery, we identified two primary user groups.",
            ],
            cards: [
              {
                title: "Startup Businesses",
                body: [
                  "Small businesses and startups preparing to launch their first campaigns often lacked confidence in deciding which creative would perform best.",
                  "They needed a quick and affordable way to validate ideas before investing in advertising.",
                ],
              },
              {
                title: "Enterprise Marketing Teams",
                body: [
                  "Large organizations frequently manage multiple campaigns with several creative variations.",
                  "Their challenge wasn't creating ads—it was identifying which version deserved the advertising budget.",
                ],
              },
            ],
          },
          {
            title: "Designing the Core Experience",
            body: [
              "After defining the business goals and user needs, I mapped the primary workflow around a simple principle: Upload → Configure → Test → Analyze.",
              "The objective wasn't to overwhelm users with features but to help them complete a campaign in the fewest possible steps.",
            ],
            bullets: [
              "Choose creative type",
              "Upload creatives",
              "Configure audience attributes",
              "Select targeting options",
              "Submit campaign",
              "Receive performance report",
            ],
            images: [
              {
                src: "/images/CaseStudies/Brandpulse/Designing-the-Core-Experience.png",
                alt: "Phase 1 core experience — nine-step campaign flow from upload through summary",
                aspect: "wide",
                fit: "cover",
              },
            ],
          },
          {
            title: "Phase 1 Outcome",
            layout: "outcome",
            cards: [
              {
                title: "Lean MVP shipped",
                body: [
                  "Designed and launched a focused desktop MVP that validated the product concept for investors without overbuilding the platform.",
                ],
              },
              {
                title: "Core campaign flow",
                body: [
                  "Users could upload creatives, configure audience targeting, submit campaigns for testing, and receive performance insights before spending ad budget.",
                ],
              },
              {
                title: "Real behavior to learn from",
                body: [
                  "Most importantly, the MVP gave us real user signals—insights that shaped the next stage of the product instead of assumptions.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "phase-2",
        title: "Phase 2 — Learning from Real Users",
        body: [
          "Launching the MVP was only the beginning. Instead of assuming the product was complete, we analyzed user behavior, gathered feedback, and identified the biggest points of friction across the customer journey.",
          "These findings guided the next phase of design improvements.",
        ],
        blocks: [
          {
            title: "Insight 1 — Users Preferred Mobile",
            body: [
              "Although the MVP had been designed exclusively for desktop, product analytics showed that a large portion of users were actually accessing BrandPulse through mobile browsers.",
              "This meant the original experience no longer matched real user behavior.",
            ],
            decision:
              "I redesigned the experience using a mobile-first approach, simplifying layouts, improving navigation, and ensuring every core workflow worked naturally on smaller screens. Rather than adapting desktop screens, the mobile experience became the primary design direction.",
            images: [
              {
                src: "/images/CaseStudies/Brandpulse/mvp2-mobilefirst.png",
                alt: "Mobile-first BrandPulse redesign — simplified navigation and core campaign workflows",
                aspect: "wide",
                fit: "cover",
              },
            ],
          },
          {
            title: "Insight 2 — High Payment Drop-offs",
            body: [
              "Another major issue appeared during checkout. Many users abandoned the purchase flow when they encountered a relatively high one-time fee for testing a single advertisement.",
              "While the pricing made sense from a business perspective, it didn't match how many marketers actually worked. Agencies and businesses often run multiple campaigns, making repeated one-time payments feel expensive.",
            ],
            decision:
              "Instead of replacing the existing pricing model, I introduced a more flexible credit-based system. This created a pricing experience that better served both occasional users and frequent advertisers.",
            decisionBullets: [
              "Purchase bundles of credits",
              "Reuse those credits across multiple campaigns",
              "Continue using the one-time payment option if they preferred",
            ],
            images: [
              {
                src: "/images/CaseStudies/Brandpulse/dynamic-payment.png",
                alt: "Credit-based checkout and pricing options — bundles alongside one-time payments",
                fit: "cover",
                aspect: "wide",
              },
            ],
          },
          {
            title: "Insight 3 — Upload Experience Was Too Disruptive",
            body: [
              "The upload process revealed another usability issue. Whenever uploaded creatives didn't meet the required dimensions, users were shown an error and redirected to an external image editing tool.",
              "Many users never returned to complete their campaign.",
            ],
            decision:
              "To remove this friction, I designed an integrated image cropping experience directly inside BrandPulse. Users could now resize and adjust creatives without leaving the platform, creating a much smoother upload process.",
            images: [
              {
                src: "/images/CaseStudies/Brandpulse/cropping.png",
                alt: "In-app image cropping flow replacing the external editor redirect",
                fit: "cover",
                aspect: "wide",
              },
            ],
          },
          {
            title: "Expanding Product Features",
            body: [
              "As user adoption increased, the platform also evolved. To support more advertising formats, I designed additional testing capabilities that allowed marketers to validate interactive display advertisements alongside traditional creatives.",
            ],
            bullets: [
              "HTML5 Banner Testing",
              "ZIP/HTML uploads",
              "Lightweight live code editor",
            ],
            layout: "split",
            images: [
              {
                src: "/images/CaseStudies/Brandpulse/html5-editor.jpg",
                alt: "HTML5 banner testing — ZIP/HTML upload and live code editor preview",
                aspect: "wide",
                fit: "cover",
              },
            ],
          },
          {
            title: "Supporting Longer Workflows",
            body: [
              "Creating campaigns required multiple targeting selections, uploads, and configuration steps. Many users weren't able to finish everything in one session.",
            ],
            decision:
              "I introduced a Drafts feature that allowed users to save incomplete campaigns and continue later without losing progress.",
            images: [
              {
                src: "/images/CaseStudies/Brandpulse/draftMV2.png",
                alt: "Drafts feature — save incomplete campaigns and resume later",
                fit: "cover",
                aspect: "wide",
              },
            ],
          },
          {
            title: "Introducing the Wallet Experience",
            body: [
              "With the introduction of credits, users needed greater visibility into how those credits were being used. This made subscription management much clearer while increasing confidence in the credit system.",
            ],
            decisionBullets: [
              "View available credits",
              "Track transaction history",
              "Review purchased packages",
              "Upgrade to larger plans",
            ],
            images: [
              {
                src: "/images/CaseStudies/Brandpulse/walletMV2.png",
                alt: "Wallet experience — credits balance, history, packages, and upgrades",
                fit: "cover",
                aspect: "wide",
              },
            ],
          },
          {
            title: "Phase 2 Outcome",
            layout: "outcome",
            body: [
              "By the end of Phase 2, BrandPulse had evolved significantly beyond its original MVP.",
              "The product became more accessible through a mobile-first experience, reduced friction during payment and creative uploads, introduced flexible subscription options, and expanded its capabilities to support more advanced advertising formats.",
              "Most importantly, every improvement was driven by real user behavior, ensuring the product evolved based on evidence rather than assumptions.",
            ],
          },
        ],
      },
    ],
  },
};

export function getCaseStudy(id: string | undefined) {
  if (!id) return null;
  return caseStudies[id] ?? null;
}
