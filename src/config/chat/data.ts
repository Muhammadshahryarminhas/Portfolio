import { siteConfig } from "@/config/site";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
};

export const chatContactEmail = "graphy918@gmail.com";

export const faqItems: FaqItem[] = [
  {
    id: "process",
    question: "What's your design process?",
    answer:
      "I start with a discovery call to understand your product, users, and goals. Then I move through research, wireframes, high-fidelity UI in Figma, and dev-ready handoff with specs and assets. You get regular check-ins and unlimited revisions until you're fully satisfied.",
    keywords: ["process", "workflow", "how do you work", "approach", "method"],
  },
  {
    id: "timeline",
    question: "How long does a project take?",
    answer:
      "The Launch-Ready MVP sprint runs up to 8 weeks with on-time delivery guaranteed. Retainer work moves in 48 to 72 hour turnaround cycles. For full-time or in-house roles, timing depends on interview and notice periods.",
    keywords: ["timeline", "how long", "duration", "weeks", "deadline", "turnaround"],
  },
  {
    id: "startup",
    question: "Do you work with early-stage startups?",
    answer:
      "Yes, that's my sweet spot. I've shipped consumer and B2B products used by millions, and I specialize in turning rough MVPs into polished, investor-ready products that users understand in under 60 seconds.",
    keywords: ["startup", "mvp", "early stage", "founder", "seed", "pre-seed"],
  },
  {
    id: "retainer",
    question: "What's included in the monthly retainer?",
    answer:
      "40 hours of dedicated design work each month including feature design, onboarding improvements, dashboard polish, design system maintenance, 2 strategy calls, and priority Slack support. Unused hours roll over up to 20%, and you can pause or cancel with 30 days notice.",
    keywords: ["retainer", "monthly", "800", "hours", "included", "subscription"],
  },
  {
    id: "in-house",
    question: "Are you open to full-time or in-house roles?",
    answer:
      "Yes. I offer full-time hire and dedicated in-house designer engagements for teams that want long-term product ownership. You can schedule an interview to explore fit.",
    keywords: ["full-time", "full time", "in-house", "in house", "hire", "join", "team", "interview"],
  },
  {
    id: "tools",
    question: "What tools do you use?",
    answer:
      "Figma is my main tool, along with Framer, ProtoPie, Spline, Higgsfield, Jira, Notion, Affinity, Adobe, and Sketch. I also use AI-augmented workflows with Claude and Cursor to move faster and test more ideas in less time.",
    keywords: ["tools", "figma", "software", "stack", "tech"],
  },
  {
    id: "pricing",
    question: "How much does it cost?",
    answer:
      "Launch-Ready MVP is $1,499 flat for an up to 8-week sprint. The monthly retainer is $800 per month for 40 dedicated hours. Full-time or in-house roles are scoped individually after an interview.",
    keywords: ["price", "cost", "pricing", "budget", "rate", "1499", "800", "how much"],
  },
  {
    id: "start",
    question: "How do I get started?",
    answer:
      "Book a free 30-minute strategy call. We'll talk through your product, timeline, and goals with no pressure. If it's a fit, I'll send a scoped proposal within 48 hours.",
    keywords: ["start", "begin", "get started", "book", "contact", "hire you"],
  },
  {
    id: "portfolio-link",
    question: "What is your portfolio link?",
    answer:
      "You're already on my portfolio — this website is it. https://shahryarminhas.com is my personal site, not my portfolio. For more work you can check my Behance, Dribbble, or scroll to the case studies on this site.",
    keywords: [
      "portfolio link",
      "portfolio url",
      "portfolio website",
      "where is your portfolio",
      "shahryarminhas.com",
      "case studies",
      "behance",
      "dribbble",
      "work link",
    ],
  },
];

export const faqSuggestions = [
  "Tell me about your Aramco project",
  "How did you use gamification in enterprise onboarding?",
  "What's your design process?",
  "How much does it cost?",
];

export const faqFallbackAnswer =
  "Hmm, I'm not totally sure on that one. Shoot me an email or book a free 30-min call and we can figure it out. I usually reply within a day.";

export const chatPricing = `Launch-Ready MVP — $1,499 USD flat (one-time, up to 8-week sprint)
Transform your rough MVP into a polished, launch-ready product users instantly understand and investors take seriously.
Includes complete high-fidelity UI/UX redesign in Figma, optimized core flows (onboarding, value prop and key actions), instant clarity so users understand your product in under 30-60 seconds, professional dashboard and data visualization polish, scalable design system foundations (2x faster future iterations), and full dev-ready handover with clean files, specs and assets.
Guarantees include 100% refund if not delivered in 8 weeks and unlimited revisions until you are fully satisfied.
Bonus includes a free 48-Hour Recorded UX Teardown and Prioritized Roadmap worth $997, fully deducted if you proceed with the revamp.
CTA on site is Book Free 30-Min Strategy Call.

Monthly Design Retainer — $800 USD per month (most popular)
Best for founders who want consistent design momentum without hiring a full-time designer.
Includes 40 hours of dedicated design work, full feature design and onboarding improvements, dashboard and product polish, design system maintenance and updates, 2 strategy calls plus priority Slack support, and fast priority turnaround in 48-72 hours.
Also includes unlimited revisions within monthly hours, weekly progress updates, up to 20% unused hours rollover, and easy pause or cancel with 30 days notice.
CTA on site is Book Free 30-Min Strategy Call.

Full-Time Hire / Dedicated In-House Designer
Direct integration into your product organization for long-term growth and high-impact scaling.
Benefits include dedicated full-time commitment, embedded in your team and culture, long-term product ownership and consistency, priority access to all design and strategy skills, seamless handoff and onboarding support, and direct access via Slack and daily standups.
CTA on site is Schedule an Interview. Pricing is scoped individually.`;

export const chatAvailability = `Currently Lead Designer at Solux Design Studio (Nov 2024 to Present) and Lead UI/UX Designer at Solutionloft (Feb 2023 to Present).
Open to full-time hire and dedicated in-house designer roles.
Book a free 30-min strategy call or email ${chatContactEmail} to get started.`;

export const chatPortfolioInfo = `This website the visitor is on right now IS the portfolio.
${siteConfig.url} is my personal website, NOT my portfolio.
For more work, visitors can browse case studies in the Work section on this site (#projects), or check Behance (${siteConfig.links.behance}) and Dribbble (${siteConfig.links.dribbble}).`;

export function findFaqMatch(input: string): FaqItem | null {
  const normalized = input.toLowerCase().trim();
  if (!normalized) return null;

  let best: FaqItem | null = null;
  let bestScore = 0;

  for (const item of faqItems) {
    let score = 0;
    if (normalized.includes(item.question.toLowerCase())) score += 10;
    for (const keyword of item.keywords) {
      if (normalized.includes(keyword)) score += keyword.split(" ").length;
    }
    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  }

  return bestScore > 0 ? best : null;
}
