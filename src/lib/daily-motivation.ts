import { GoogleGenerativeAI } from "@google/generative-ai";
import { unstable_cache } from "next/cache";

const FALLBACK_QUOTES = [
  "Not all who wander are lost — but this URL definitely is.",
  "Every dead end is just a redirect waiting to happen.",
  "Even the best designers sketch a few wrong lines first.",
  "404 today, featured case study tomorrow.",
  "The path less traveled still needs a working link.",
  "Great ideas start where the map runs out.",
  "You're not lost — you're exploring the unbuilt pages.",
  "Some pages are meant to be found. This one wasn't.",
] as const;

function getDateKey() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "UTC" });
}

function getFallbackQuote(dateKey: string) {
  const seed = dateKey.split("-").reduce((acc, part) => acc + Number(part), 0);
  return FALLBACK_QUOTES[seed % FALLBACK_QUOTES.length];
}

async function generateMotivation(dateKey: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return getFallbackQuote(dateKey);

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite" });
    const result = await model.generateContent(
      `Today is ${dateKey}. Write ONE short witty motivational quote (max 100 characters) for a designer's portfolio 404 page. Be playful and creative. Return ONLY the quote text, no author or explanation.`
    );
    const text = result.response.text()?.trim().replace(/^["'“”]|["'“”]$/g, "");
    if (text) return text;
  } catch {
    // fall through
  }

  return getFallbackQuote(dateKey);
}

export async function getDailyMotivation() {
  const dateKey = getDateKey();
  return unstable_cache(() => generateMotivation(dateKey), ["daily-motivation", dateKey], {
    revalidate: 86400,
    tags: [`motivation-${dateKey}`],
  })();
}
