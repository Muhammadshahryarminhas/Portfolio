"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { assets } from "@/config/assets";
import {
  faqFallbackAnswer,
  faqSuggestions,
} from "@/config/faq";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hey! Ask me anything about my process, pricing, timelines, or availability — or pick a suggestion below.",
};

function ChatBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex gap-2.5", isUser && "flex-row-reverse")}>
      {!isUser && (
        <span className="relative mt-0.5 size-8 shrink-0 overflow-hidden rounded-full border border-white">
          <Image
            src={assets.avatar}
            alt={siteConfig.shortName}
            fill
            className="object-cover"
            sizes="32px"
          />
        </span>
      )}
      <div
        className={cn(
          "type-body max-w-[85%] rounded-2xl px-4 py-3",
          isUser
            ? "rounded-tr-md bg-[#1a1a1a] text-white"
            : "rounded-tl-md bg-[#fafafa] text-[#373737]"
        )}
      >
        {message.content}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-2.5">
      <span className="relative mt-0.5 size-8 shrink-0 overflow-hidden rounded-full border border-white">
        <Image
          src={assets.avatar}
          alt=""
          fill
          className="object-cover"
          sizes="32px"
        />
      </span>
      <div className="flex items-center gap-1 rounded-2xl rounded-tl-md bg-[#fafafa] px-4 py-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="size-1.5 animate-bounce rounded-full bg-[#999]"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

export function FaqSection() {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const respond = async (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || typing) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    const history = messages
      .filter((m) => m.id !== "welcome")
      .map((m) => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
      });

      const data = (await res.json()) as { reply?: string };
      const answer = data.reply?.trim() || faqFallbackAnswer;

      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: answer },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: faqFallbackAnswer },
      ]);
    } finally {
      setTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    respond(input);
  };

  return (
    <section id="faq" className="bg-white px-4 py-40 md:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <h2 className="text-2xl font-semibold uppercase leading-[31.2px] tracking-[-0.72px] text-black md:text-[32px] md:leading-[1.2] md:tracking-[-1px]">
          QUESTIONS? JUST ASK.
        </h2>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
          <div className="relative flex-1 rounded-[33px] p-px shadow-[0_0_24px_rgba(191,219,254,0.45),0_0_48px_rgba(221,214,254,0.25)]">
            <div
              aria-hidden
              className="ai-chat-glow pointer-events-none absolute inset-0 rounded-[33px]"
            />
            <div className="relative flex min-h-[580px] max-h-[780px] flex-col overflow-hidden rounded-[32px] bg-white">
            <div className="flex shrink-0 items-center gap-3 border-b border-[#ececec] px-6 py-4">
              <span className="relative size-10 shrink-0 overflow-hidden rounded-full border border-white">
                <Image
                  src={assets.avatar}
                  alt={siteConfig.shortName}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </span>
              <div className="flex flex-col">
                <p className="type-body font-semibold text-black">{siteConfig.shortName}</p>
                <p className="type-caption text-[#666]">Get response within second</p>
              </div>
            </div>

            <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
              <div className="flex flex-col gap-4">
              {messages.map((msg) => (
                <ChatBubble key={msg.id} message={msg} />
              ))}
              {typing && <TypingIndicator />}
              </div>
            </div>

            {messages.length <= 1 && (
              <div className="flex shrink-0 flex-wrap gap-2 px-6 pb-3">
                {faqSuggestions.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => respond(q)}
                    className="type-caption rounded-full border border-[#ececec] bg-[#fafafa] px-3.5 py-1.5 text-left transition-colors hover:border-[#1f85ff] hover:text-black"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="flex shrink-0 items-center gap-2 border-t border-[#ececec] px-4 py-4"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                disabled={typing}
                className="type-body h-14 flex-1 rounded-full border border-[#ececec] bg-[#fafafa] px-4 text-black outline-none placeholder:text-[#999] focus:border-[#1f85ff] disabled:opacity-50 md:h-11"
              />
              <Button
                type="submit"
                variant="hero-dark"
                size="icon"
                disabled={!input.trim() || typing}
                className="size-14 shrink-0 rounded-full md:size-11"
              >
                <Send className="size-4" />
              </Button>
            </form>
            </div>
          </div>

          <div className="lg:sticky lg:top-8 lg:w-[480px] lg:shrink-0">
            <div className="flex h-auto flex-col gap-4 rounded-[32px] border border-[#f1f1f1] bg-[#f4f4f4] p-8">
              <span className="relative size-14 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-sm">
                <Image
                  src={assets.avatar}
                  alt={siteConfig.shortName}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </span>

              <h3 className="type-h3 text-[#373737]">
                Looking for a{" "}
                <span className="text-[#ff6b4a]">strategic addition</span> to your creative
                team?
              </h3>

              <p className="type-body">
                I&apos;m currently open to in-house roles where I can own brand design, brand
                visuals and video execution. If your team needs someone who can do one or both,
                let&apos;s talk.
              </p>

              <Button
                render={<a href="mailto:graphy918@gmail.com" />}
                variant="hero-dark"
                size="pill-lg"
                className="h-14 w-fit gap-2"
              >
                <MessageCircle className="size-4" />
                EMAIL ME
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
