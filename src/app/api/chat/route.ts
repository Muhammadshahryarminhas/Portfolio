import { GoogleGenerativeAI } from "@google/generative-ai";
import { chatSystemPrompt } from "@/config/knowledge";
import { faqFallbackAnswer } from "@/config/faq";

const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY = 10;

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json({ reply: faqFallbackAnswer });
    }

    const body = (await req.json()) as {
      message?: string;
      history?: ChatMessage[];
    };

    const message = body.message?.trim();
    if (!message) {
      return Response.json({ error: "Message required" }, { status: 400 });
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return Response.json({ error: "Message too long" }, { status: 400 });
    }

    const history = (body.history ?? [])
      .filter((m) => m.content?.trim() && (m.role === "user" || m.role === "assistant"))
      .slice(-MAX_HISTORY);

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: chatSystemPrompt,
    });

    const chat = model.startChat({
      history: history.map((m) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      })),
    });

    const result = await chat.sendMessage(message);
    const reply = result.response.text()?.trim();

    if (!reply) {
      return Response.json({ reply: faqFallbackAnswer });
    }

    return Response.json({ reply });
  } catch {
    return Response.json({ reply: faqFallbackAnswer });
  }
}
