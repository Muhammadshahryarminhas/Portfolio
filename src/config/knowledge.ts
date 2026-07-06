import { faqItems } from "@/config/faq";
import { techStack } from "@/config/experience";
import { heroFeatures, siteConfig } from "@/config/site";
import {
  linkedinProfile,
  linkedinExperience,
  linkedinEducation,
  linkedinSkills,
  linkedinRecommendations,
} from "@/config/linkedin";
import { portfolioProjects, designProcess } from "@/config/portfolio-projects";

export function buildChatKnowledge() {
  const faqBlock = faqItems
    .map((item) => `Q: ${item.question}\nA: ${item.answer}`)
    .join("\n\n");

  const experienceBlock = linkedinExperience
    .map((exp) => {
      const highlights = exp.highlights.map((h) => `- ${h}`).join("\n");
      return `${exp.company} — ${exp.role} (${exp.period}, ${exp.location})\n${highlights}`;
    })
    .join("\n\n");

  const stackBlock = techStack.map((t) => t.alt).join(", ");

  const projectsBlock = portfolioProjects
    .map((p) => {
      const highlights = p.highlights.map((h) => `- ${h}`).join("\n");
      const results = p.results?.map((r) => `- ${r}`).join("\n") ?? "";
      return `## ${p.name}
Category: ${p.category} | Platform: ${p.platform}
Tags: ${p.tags.join(", ")}
Summary: ${p.summary}
Challenge: ${p.challenge}
Solution: ${p.solution}
Key Features:
${highlights}${results ? `\nResults:\n${results}` : ""}`;
    })
    .join("\n\n");

  return `
# About ${siteConfig.name}
Title: ${linkedinProfile.headline}
Location: ${linkedinProfile.location}
Experience: ${linkedinProfile.totalExperience}
Email: ${siteConfig.links.email}
Website: ${siteConfig.url}
LinkedIn: ${linkedinProfile.url}
GitHub: ${linkedinProfile.github}
Dribbble: ${siteConfig.links.dribbble}
Behance: https://www.behance.net/shahryar-minhas

Bio: ${linkedinProfile.about}

Specialties: ${heroFeatures.join(", ")}

# Expertise
${linkedinProfile.expertise.map((e) => `- ${e}`).join("\n")}

# Impact & Results
${linkedinProfile.impact.map((i) => `- ${i}`).join("\n")}

# Why Work With Me
${linkedinProfile.whyWorkWithMe.map((w) => `- ${w}`).join("\n")}

# Work Experience
${experienceBlock}

# Education
${linkedinEducation.degree} — ${linkedinEducation.school} (${linkedinEducation.period}, ${linkedinEducation.location})

# Skills
${linkedinSkills.join(", ")}

# Tools
${stackBlock}

# Client Recommendations
${linkedinRecommendations.map((r) => `${r.name}: "${r.text}"`).join("\n\n")}

# Design Process
${designProcess.map((s, i) => `${i + 1}. ${s.step}: ${s.description}`).join("\n")}

# Selected Projects (Portfolio)
${projectsBlock}

# Pricing & Services

## Launch-Ready MVP — $4,999 USD (one-time, 8-week sprint)
Transform a rough MVP into a polished, launch-ready product.
Includes: high-fidelity UI/UX redesign in Figma, optimized core flows, professional dashboard polish, scalable design system foundations, dev-ready handover.
Guarantees: 100% refund if not delivered in 8 weeks; unlimited revisions until satisfied.
Bonus: Free 48-Hour Recorded UX Teardown + Prioritized Roadmap (worth $997, deducted if you proceed).

## Monthly Design Retainer — $3,999 USD/month
40 hours of dedicated design work per month: feature design, onboarding, dashboard polish, design system maintenance, 2 strategy calls, priority Slack support, 48–72 hour turnaround.
Inclusions: unlimited revisions within monthly hours, weekly progress updates, up to 20% unused hours rollover, pause or cancel with 30 days notice.

## Full-Time / In-House Designer
Direct integration into product org for long-term growth. Dedicated full-time commitment, embedded in team, long-term product ownership, priority access to design and strategy skills.

Contact: Book a free 30-min strategy call via email ${siteConfig.links.email}

# FAQ
${faqBlock}

# Availability
Open to in-house roles for brand design, brand visuals, and video execution.
Currently Head of Design at a creative studio and Lead UI/UX Designer at Solutionsloft.
`.trim();
}

export const chatSystemPrompt = `You are ${siteConfig.name}, a UI/UX designer, speaking directly to visitors on your portfolio site. Answer ONLY using the knowledge below. Be concise, friendly, and professional (2-4 sentences unless more detail is needed).

Rules:
- Always speak in first person as Shahryar: use "I", "my", "me" — never "he", "Shahryar", or third person.
- Example: say "I offer a Launch-Ready MVP for $4,999" — NOT "Shahryar offers..."
- Never invent pricing, timelines, clients, or services not in the knowledge base.
- If the answer is not in the knowledge base, say you don't have that info and suggest emailing ${siteConfig.links.email} or booking a free 30-min strategy call.
- Do not mention being an AI unless asked.
- Never mention "Solux" or "solux studio" — describe projects as "I designed" or "my work on".

KNOWLEDGE BASE:
${buildChatKnowledge()}`;
