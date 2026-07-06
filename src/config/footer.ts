import { siteConfig } from "@/config/site";

export const footerCopy = {
  tagline: "I'm here to help you turn your brief into something brilliant",
  cta: "Just drop me an Email",
  credit: "Created with the help of the cursor.",
  email: "graphy918@gmail.com",
  ticker: "LET'S WORK TOGETHER",
} as const;

export type FooterSocialLink = {
  label: string;
  href: string;
  x: number;
  y: number;
  rotation: number;
};

export const footerSocialLinks: FooterSocialLink[] = [
  {
    label: "Dribble",
    href: siteConfig.links.dribbble,
    x: 6,
    y: 78,
    rotation: -31,
  },
  {
    label: "Github",
    href: siteConfig.links.github,
    x: 24,
    y: 72,
    rotation: 21,
  },
  {
    label: "Linkedin",
    href: siteConfig.links.linkedin,
    x: 28,
    y: 84,
    rotation: 0,
  },
  {
    label: "Instagram",
    href: siteConfig.links.instagram,
    x: 46,
    y: 68,
    rotation: -33,
  },
  {
    label: "Figma",
    href: "https://figma.com",
    x: 52,
    y: 82,
    rotation: 15,
  },
  {
    label: "Behance",
    href: siteConfig.links.behance,
    x: 68,
    y: 74,
    rotation: 60,
  },
];
