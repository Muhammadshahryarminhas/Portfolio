export const projects = [
  {
    id: "brandpulse",
    logo: "/images/projects/brandpulse-logo.png",
    logoClassName: "h-12 w-[178px]",
    title: "Designing an AI Platform to Validate Ad Creatives Before Media Spend",
    tags: ["SaaS", "AI", "Web App", "Creative Testing"],
    description:
      "BrandPulse helps advertisers validate images, videos, text, and HTML5 banners with real audiences before launching campaigns — so marketers get data-backed insights instead of spending on assumptions.",
    mockup: "/images/projects/brandpulse-mockup.png",
    mockupClassName: "md:-bottom-14 md:-right-[185px] h-[601px] w-[665px]",
    href: "/work/brandpulse",
    locked: false,
  },
  {
    id: "palm-beaches",
    logo: "/images/projects/slide-2-logo.png",
    logoClassName: "h-[105px] w-[206px]",
    logoImageClassName: "object-contain object-left",
    title: "A Onboarding Increased Tourist Activity Bookings by 35%",
    tags: ["Social Exploring", "iOS & Android"],
    description:
      "A mobile experience that helps visitors discover local attractions, book activities, purchase event tickets, and explore everything Palm Beaches has to offer.",
    mockup: "/images/projects/mockup-2.png",
    mockupClassName: "bottom-0 -right-[185px] h-[601px] w-[665px]",
    href: "#projects",
    locked: true,
  },
  {
    id: "squadron",
    logo: "/images/projects/slide3-logo.png",
    logoClassName: "h-[110px] w-[206px]",
    title: "Reduced Administrative Workload by 40%",
    titleClassName: "tracking-[-2.2px] leading-[52px]",
    tags: ["NGO", "Web Based Dashboard"],
    description:
      "A comprehensive healthcare management platform that streamlines program administration, case management, service tracking, and performance reporting through a centralized dashboard.",
    mockup: "/images/projects/mockup-1.png",
    mockupClassName: "bottom-0 -right-[185px] h-[601px] w-[665px]",
    href: "#projects",
    locked: true,
  },
] as const;
