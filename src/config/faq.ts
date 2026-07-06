export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
};

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
      "The Launch-Ready MVP sprint runs 8 weeks with a guaranteed on-time delivery. Retainer work moves in 48–72 hour turnaround cycles. For full-time or in-house roles, I can start within 2–4 weeks depending on notice periods.",
    keywords: ["timeline", "how long", "duration", "weeks", "deadline", "turnaround"],
  },
  {
    id: "startup",
    question: "Do you work with early-stage startups?",
    answer:
      "Yes — that's my sweet spot. I've shipped consumer and B2B products used by millions, and I specialize in turning rough MVPs into polished, investor-ready products that users understand in under 60 seconds.",
    keywords: ["startup", "mvp", "early stage", "founder", "seed", "pre-seed"],
  },
  {
    id: "retainer",
    question: "What's included in the monthly retainer?",
    answer:
      "40 hours of dedicated design work each month: feature design, onboarding improvements, dashboard polish, design system maintenance, 2 strategy calls, and priority Slack support. Unused hours roll over up to 20%, and you can pause or cancel with 30 days notice.",
    keywords: ["retainer", "monthly", "3999", "hours", "included", "subscription"],
  },
  {
    id: "in-house",
    question: "Are you open to full-time or in-house roles?",
    answer:
      "Absolutely. I'm currently open to in-house roles where I can own brand design, brand visuals, and video execution. I work best embedded in cross-functional teams solving complex product and business problems.",
    keywords: ["full-time", "full time", "in-house", "in house", "hire", "join", "team"],
  },
  {
    id: "tools",
    question: "What tools do you use?",
    answer:
      "Figma is my primary design tool, alongside Framer, ProtoPie, and Spline for prototyping and motion. I also use AI-augmented workflows with Claude and Cursor to move faster and test more ideas in less time.",
    keywords: ["tools", "figma", "software", "stack", "tech"],
  },
  {
    id: "pricing",
    question: "How much does it cost?",
    answer:
      "Launch-Ready MVP is $4,999 flat for an 8-week sprint. The monthly retainer is $3,999/month for 40 dedicated hours. Full-time or in-house engagements are scoped individually — book a free 30-min strategy call and we'll find the right fit.",
    keywords: ["price", "cost", "pricing", "budget", "rate", "4999", "how much"],
  },
  {
    id: "start",
    question: "How do I get started?",
    answer:
      "Book a free 30-minute strategy call. We'll talk through your product, timeline, and goals — no pressure. If it's a fit, I'll send a scoped proposal within 48 hours.",
    keywords: ["start", "begin", "get started", "book", "contact", "hire you"],
  },
];

export const faqSuggestions = [
  "Tell me about your Aramco project",
  "How did you use gamification in enterprise onboarding?",
  "What's your design process?",
  "How much does it cost?",
];

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

export const faqFallbackAnswer =
  "Great question! I don't have a specific answer for that here, but I'd love to discuss it on a call. Send me an email or book a free 30-min strategy call — I typically reply within 24 hours.";
