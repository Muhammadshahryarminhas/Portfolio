export const profile = {
  heading: "From junior screens to leading product design across teams.",
  intro:
    "I started as a junior graphic and UI designer in 2020. Since then I've worked across SaaS, fintech, e-commerce, Web3, and enterprise, from branding and interfaces to research, prototypes, and shipping with engineers. Today I lead design at Solux and Solutionloft, setting direction, mentoring designers, and building products that have to work for real users and real business goals. These days I also lean on Claude, Cursor, and fast prototypes so we can explore more options before locking a direction.",
  photo: "/images/profile/myphoto.png",
} as const;

export type Experience = {
  company: string;
  logo: string;
  period: string;
  role?: string;
  points?: string[];
};

export const experiences: Experience[] = [
  {
    company: "Solux Design Studio",
    logo: "/images/experience/solux.png",
    period: "Nov 2024 - Present",
    role: "Lead Designer • Full Time",
    points: [
      "Lead design strategy and team direction across multiple high-impact projects in SaaS, Web3, and enterprise domains",
      "Oversee end-to-end design processes from initial research through final delivery, ensuring alignment with both business goals and user needs",
      "Establish design standards and review processes that maintain consistency and quality across all project deliverables",
    ],
  },
  {
    company: "Solutionloft",
    logo: "/images/experience/solutionloft.png",
    period: "Feb 2023 – Present",
    role: "Lead UIUX Designer • Full Time",
    points: [
      "Led a team of 3 designers, working closely with developers to create smooth design-to-dev workflows.",
      "Designed SaaS and mobile products for industries like AI/ML, Web3, fintech, automotive, NGOs, and more.",
      "Built scalable UX strategies tied to business goals and growth plans.",
      "Ran user research and multiple tests to guide product improvements.",
      "Designed an AR-based onboarding app for 250K+ employees with an admin panel for content control.",
      "Improved UX for an EV charger app, making navigation easier and boosting user retention.",
      "Worked with product managers and engineers to define goals and ship user-first solutions.",
    ],
  },
  {
    company: "Abacus",
    logo: "/images/experience/abacus.png",
    period: "Jul 2022 - Sep 2023",
    role: "UI/UX Consultant • Contract",
    points: [
      "Collaborated with leadership teams to shape design strategies that aligned with business goals and user needs.",
      "Led user research and usability testing to craft intuitive, customer-focused experiences.",
      "Designed end-to-end UI/UX for e-commerce, developer tools, and fintech platforms—enhancing flow, accessibility, and engagement.",
    ],
  },
  {
    company: "OpenMenu",
    logo: "/images/experience/openmenu.png",
    period: "Jan 2022 - Jan 2023",
    role: "Sr. UI/UX & Brand Designer • Full Time",
    points: [
      "Led content design across platforms, keeping brand visuals consistent and impactful.",
      "Designed POS presentations and decks that were visually strong and clear in messaging.",
      "Created user-friendly interfaces for web and mobile products.",
      "Carried out research and usability testing to shape better product decisions.",
      "Built wireframes, prototypes, and high-fidelity screens to communicate ideas clearly.",
      "Partnered with dev teams to ensure clean handoff and implementation.",
      "Managed branding—from strategy to final design—across all digital touchpoints.",
      "Iterated on feedback to improve user flow and overall design.",
    ],
  },
  {
    company: "Rich Technologies",
    logo: "/images/experience/rich.png",
    period: "Sep 2021 - Jan 2023",
    role: "Sr. UI/UX & Brand Designer • Full Time",
    points: [
      "Designed the UI and branding for OpenMenu.pk's platform to boost user engagement.",
      "Crafted the full experience for HomeAuctions, improving bidding flow and navigation.",
      "Led the AutoBid UI revamp, creating a stronger visual identity for the auto market.",
      "Built Rich Technologies' brand from scratch—including logo, website, and style guide.",
      "Unified the design experience across all Rich Technologies products, balancing ease-of-use with business goals.",
    ],
  },
  {
    company: "MavenUp",
    logo: "/images/experience/mavenup.png",
    period: "Aug 2020 - Sep 2021",
    role: "Jr. Graphic & UI Designer • Full Time",
    points: [
      "Designed clean, user-focused UIs for web and mobile platforms.",
      "Created marketing visuals, social media content, and promotional designs.",
      "Kept design work aligned with brand identity and messaging.",
      "Developed WordPress and Shopify templates tailored to client needs.",
      "Prioritized usability and clarity to improve user experience and ROI.",
      "Ran content strategies for social media, boosting brand reach.",
      "Designed logos and branding materials that matched each client's market position.",
    ],
  },
];

export type StackLogo = {
  src: string;
  alt: string;
  size?: number;
};

export const techStack: StackLogo[] = [
  { src: "/images/stack/figma.svg", alt: "Figma", size: 41 },
  { src: "/images/stack/higgsfield.png", alt: "Higgsfield", size: 41 },
  { src: "/images/stack/spline.png", alt: "Spline", size: 41 },
  { src: "/images/stack/framer.png", alt: "Framer", size: 41 },
  { src: "/images/stack/protopie.png", alt: "ProtoPie", size: 44 },
  { src: "/images/stack/jira.png", alt: "Jira", size: 44 },
  { src: "/images/stack/notion.png", alt: "Notion", size: 44 },
  { src: "/images/stack/affinity.png", alt: "Affinity", size: 44 },
  { src: "/images/stack/adobe.png", alt: "Adobe", size: 44 },
  { src: "/images/stack/sketch.png", alt: "Sketch", size: 44 },
];
