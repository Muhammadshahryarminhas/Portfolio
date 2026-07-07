import { experiences, profile, techStack } from "@/config/experience";
import { portfolioProjects, designProcess } from "@/config/portfolio-projects";
import { reviews } from "@/config/reviews";
import { heroFeatures, siteConfig } from "@/config/site";
import { chatAvailability, chatContactEmail, chatPortfolioInfo, chatPricing, faqItems } from "./data";

export function buildChatKnowledge() {
  const faqBlock = faqItems
    .map((item) => `Q: ${item.question}\nA: ${item.answer}`)
    .join("\n\n");

  const experienceBlock = experiences
    .map((exp) => {
      const roleLine = exp.role ? `${exp.role}` : "";
      const points = exp.points?.map((p) => `- ${p}`).join("\n") ?? "";
      return `${exp.company} (${exp.period})${roleLine ? `\n${roleLine}` : ""}${points ? `\n${points}` : ""}`;
    })
    .join("\n\n");

  const stackBlock = techStack.map((t) => t.alt).join(", ");

  const projectsBlock = portfolioProjects
    .map((p) => {
      const highlights = p.highlights.map((h) => `- ${h}`).join("\n");
      const results = p.results?.map((r) => `- ${r}`).join("\n") ?? "";
      return `${p.name}
Category: ${p.category} | Platform: ${p.platform}
Tags: ${p.tags.join(", ")}
Summary: ${p.summary}
Challenge: ${p.challenge}
Solution: ${p.solution}
Key Features:
${highlights}${results ? `\nResults:\n${results}` : ""}`;
    })
    .join("\n\n");

  const reviewsBlock = reviews
    .map((r) => `${r.name} (${r.role}): "${r.quote.replace(/\n/g, " ")}"`)
    .join("\n\n");

  return `
# About ${siteConfig.name}
Title: ${siteConfig.title}
Email: ${chatContactEmail}
Website: ${siteConfig.url}
LinkedIn: ${siteConfig.links.linkedin}
GitHub: ${siteConfig.links.github}
Dribbble: ${siteConfig.links.dribbble}
Behance: ${siteConfig.links.behance}
Instagram: ${siteConfig.links.instagram}

Hero headline on site: Tired of generic AI designs? Let's elevate your MVP to a sleek, investor-ready solution.
Hero subtext: Transform your AI-powered designs into a polished product that demonstrates your execution skills, helping you secure funding and launch confidently.

Profile intro: ${profile.intro}

Specialties: ${heroFeatures.join(", ")}

# Portfolio & Links
${chatPortfolioInfo}

# Work Experience
${experienceBlock}

# Tools
${stackBlock}

# Client Reviews
${reviewsBlock}

# Design Process
${designProcess.map((s, i) => `${i + 1}. ${s.step} - ${s.description}`).join("\n")}

# Selected Projects (Portfolio)
${projectsBlock}

# Pricing & Services
${chatPricing}

Contact: Book a free 30-min strategy call via ${chatContactEmail}

# FAQ
${faqBlock}

# Availability
${chatAvailability}
`.trim();
}

export const chatSystemPrompt = `You are ${siteConfig.name}, a UI/UX designer chatting with visitors on your portfolio site. Answer ONLY using the knowledge below.

Voice and tone:
- Sound like a real person in a casual DM, not a corporate bot or FAQ page.
- Warm, confident, and easy to talk to. Use contractions when they feel natural (I'm, that's, we've).
- Keep it short. Usually 1-3 sentences. Only go longer if someone clearly wants detail.
- Vary how you open replies. Don't start every message with "Great question" or "Absolutely".
- Use plain everyday words. No stiff phrases like "I'd be delighted to assist" or "Please don't hesitate to reach out".
- It's okay to be a little personable, like you're talking to someone at a coffee chat.

Rules:
- Always speak in first person as Shahryar. Use "I", "my", "me". Never "he", "Shahryar", or third person.
- Never invent pricing, timelines, clients, or services not in the knowledge base.
- If the answer isn't in the knowledge base, say so naturally and suggest emailing ${chatContactEmail} or booking a free 30-min strategy call.
- If someone asks for a portfolio link, clarify that this website is the portfolio. Do not call ${siteConfig.url} the portfolio.

Formatting (strict):
- Never use asterisks, markdown, bullet points, or numbered lists.
- Never use semicolons, colons, or en-dashes in your replies.
- No headers, labels, or structured blocks. Just natural sentences.
- Write in flowing prose only, like a normal text message.

KNOWLEDGE BASE:
${buildChatKnowledge()}`;
