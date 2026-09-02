"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { type CaseStudy } from "@/config/case-studies";
import { MoreWork } from "@/views/case-study/more-work";
import { cn } from "@/lib/utils";

const pb = (file: string) => `/images/CaseStudies/PalmBeaches/${file}`;

const IMG = {
  hero: pb("hero-phones.png"),
  login: pb("Login Page.png"),
  loginEmpty: pb("login-empty.png"),
  createProfile: pb("Create Profile info.png"),
  purpose: pb("Preferences (Optional).png"),
  destinations: pb("Preferences (Optional)-1.png"),
  activities: pb("Preferences (Optional)-2.png"),
  stay: pb("Preferences (Optional)-3.png"),
  interests: pb("Preferences (Optional)-4.png"),
  home: pb("Home.png"),
  stories: pb("Story.png"),
  explore: pb("Screen1-Explore.png"),
  deals: pb("Screen2-Offers.png"),
  dining: pb("Screen3-Dining.png"),
  event: pb("Screen4-EventDetails.png"),
} as const;

const ONBOARDING = [
  { src: IMG.purpose, alt: "Travel purpose", label: "Travel purpose" },
  { src: IMG.destinations, alt: "Destinations", label: "Destinations" },
  { src: IMG.activities, alt: "Activities", label: "Activities" },
  { src: IMG.stay, alt: "Preferred stay", label: "Preferred stay" },
  { src: IMG.interests, alt: "Special interests", label: "Special interests" },
] as const;

const AFTER_HOME = [
  {
    src: IMG.stories,
    alt: "Stories",
    label: "Stories",
    heading: "Stories keep it current",
    body: "Listings get stale. Stories sit next to them so the destination still feels like now.",
  },
  {
    src: IMG.explore,
    alt: "Explore",
    label: "Explore",
    heading: "Explore, Deals, Dining",
    body: "Explore is browse. Opening it shouldn't mean scrolling past a dozen attraction cards first.",
  },
  {
    src: IMG.deals,
    alt: "Deals",
    label: "Deals",
    heading: "Explore, Deals, Dining",
    body: "Deals is now-or-miss. A spa offer shouldn't sit behind lighthouse tours.",
  },
  {
    src: IMG.dining,
    alt: "Dining",
    label: "Dining",
    heading: "Explore, Deals, Dining",
    body: "Dining is standing outside deciding. Same chip filters as onboarding — nothing new to learn.",
  },
  {
    src: IMG.event,
    alt: "Event details",
    label: "Event page",
    heading: "Event page",
    body: "When, where, worth it — above the fold. Related events sit at the bottom, after they've confirmed this one.",
  },
] as const;

const SHOWCASE = [
  { src: IMG.login, alt: "Login" },
  { src: IMG.createProfile, alt: "Create profile" },
  { src: IMG.purpose, alt: "Travel purpose" },
  { src: IMG.destinations, alt: "Destinations" },
  { src: IMG.activities, alt: "Activities" },
  { src: IMG.stay, alt: "Preferred stay" },
  { src: IMG.home, alt: "Home" },
  { src: IMG.stories, alt: "Stories" },
  { src: IMG.explore, alt: "Explore" },
  { src: IMG.deals, alt: "Deals" },
  { src: IMG.dining, alt: "Dining" },
  { src: IMG.event, alt: "Event details" },
] as const;

function DesignCoverflow({
  items,
}: {
  items: readonly { src: string; alt: string }[];
}) {
  const n = items.length;
  const [active, setActive] = useState(0);
  const drag = useRef({ x: 0, from: 0, down: false });

  const go = (i: number) => setActive(((i % n) + n) % n);

  return (
    <div className="flex flex-col items-center gap-12 md:gap-16">
      <div
        className="relative h-[400px] w-full cursor-grab select-none overflow-hidden active:cursor-grabbing sm:h-[500px] md:h-[620px]"
        style={{ perspective: "1400px" }}
        onPointerDown={(e) => {
          drag.current = { x: e.clientX, from: active, down: true };
          (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
        }}
        onPointerUp={(e) => {
          if (!drag.current.down) return;
          const dx = e.clientX - drag.current.x;
          drag.current.down = false;
          if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
        }}
        onPointerCancel={() => {
          drag.current.down = false;
        }}
      >
        <div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {items.map((item, i) => {
            let offset = i - active;
            if (offset > n / 2) offset -= n;
            if (offset < -n / 2) offset += n;
            const abs = Math.abs(offset);
            if (abs > 5) return null;
            const x = offset * 16.5;
            const z = abs === 0 ? 40 : -abs * 70;
            const rotate = offset * -28;
            const scale = abs === 0 ? 1 : Math.max(0.7, 1 - abs * 0.08);
            return (
              <button
                key={item.src}
                type="button"
                aria-label={item.alt}
                onClick={() => setActive(i)}
                className="absolute top-1/2 left-1/2 w-[180px] origin-center sm:w-[220px] md:w-[280px]"
                style={{
                  transform: `translate(-50%, -50%) translateX(${x}vw) translateZ(${z}px) rotateY(${rotate}deg) scale(${scale})`,
                  zIndex: 30 - abs,
                  opacity: abs > 5 ? 0 : 1,
                  filter: abs === 0 ? "none" : "brightness(0.72)",
                  transition:
                    "transform 520ms cubic-bezier(.22,1,.36,1), opacity 400ms, filter 400ms",
                }}
              >
                <span className="relative block aspect-9/19">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="280px"
                    className="object-contain object-top"
                    draggable={false}
                  />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <p className="text-sm font-medium text-white md:text-base">
          {items[active]?.alt}
        </p>
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Previous screen"
            onClick={() => go(active - 1)}
            className="grid size-10 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
          >
            <ChevronLeft className="size-5" strokeWidth={1.75} />
          </button>
          <div className="flex gap-1.5">
            {items.map((item, i) => (
              <button
                key={item.src}
                type="button"
                aria-label={item.alt}
                onClick={() => setActive(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === active ? "w-6 bg-[#D4FFA0]" : "w-1.5 bg-white/25"
                )}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next screen"
            onClick={() => go(active + 1)}
            className="grid size-10 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
          >
            <ChevronRight className="size-5" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({ children }: { children: ReactNode }) {
  return (
    <section className="border-t border-[#F0F0F2] py-14 md:py-20">
      {children}
    </section>
  );
}

function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[32px] font-semibold leading-[1.1] tracking-[-1px] text-[#111118] md:text-[44px]">
      {children}
    </h2>
  );
}

function SegmentBar({
  count,
  active,
  dark,
}: {
  count: number;
  active: number;
  dark?: boolean;
}) {
  return (
    <div className="flex w-full gap-1.5 lg:hidden">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={cn(
            "h-[3px] flex-1 rounded-full transition-colors duration-300",
            i === active
              ? dark
                ? "bg-[#D4FFA0]"
                : "bg-[#111118]"
              : dark
                ? "bg-white/20"
                : "bg-[#111118]/15"
          )}
        />
      ))}
    </div>
  );
}

function StepRail({
  steps,
  active,
  dark,
}: {
  steps: readonly { label: string }[];
  active: number;
  dark?: boolean;
}) {
  return (
    <ol className="hidden flex-col gap-3 lg:flex">
      {steps.map((step, i) => (
        <li
          key={step.label}
          className={cn(
            "border-l-2 pl-4 text-lg transition-colors duration-300 md:text-xl",
            i === active
              ? dark
                ? "border-[#D4FFA0] font-semibold text-white"
                : "border-[#111118] font-semibold text-[#111118]"
              : dark
                ? "border-white/15 text-white/35"
                : "border-[#E0E0E6] text-[#B0B0BA]"
          )}
        >
          {step.label}
        </li>
      ))}
    </ol>
  );
}

function FiveQuestions() {
  const onboardingStart = 1;
  const homeIndex = onboardingStart + ONBOARDING.length;
  const afterStart = homeIndex + 1;
  const total = afterStart + AFTER_HOME.length;
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const isFlow = active === 0;
  const isOnboarding = active >= onboardingStart && active < homeIndex;
  const isHome = active === homeIndex;
  const isAfter = active >= afterStart;
  const onboardingIndex = active - onboardingStart;
  const afterIndex = active - afterStart;
  const afterStep = isAfter ? AFTER_HOME[afterIndex] : null;
  const isDark = isFlow || isHome || isAfter;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const totalScroll = root.offsetHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(0.999, scrolled / totalScroll));
      const i = Math.min(total - 1, Math.floor(p * total));
      setActive((prev) => (prev === i ? prev : i));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [total]);

  return (
    <div ref={rootRef} className="relative h-[960vh]">
      <div className="sticky top-0 z-20 flex h-dvh items-center overflow-hidden bg-[#F4F6F0]">
        <div
          className={cn(
            "pointer-events-none absolute inset-0 bg-[#164038] transition-opacity duration-500 ease-out",
            isFlow || isAfter ? "opacity-100" : "opacity-0"
          )}
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-0 bg-[#0A0A0A] transition-opacity duration-500 ease-out",
            isHome ? "opacity-100" : "opacity-0"
          )}
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-0 transition-opacity duration-500 ease-out",
            isOnboarding ? "opacity-100" : "opacity-0"
          )}
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 82% 50%, rgba(212,255,160,0.45), transparent 60%)",
          }}
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-0 transition-opacity duration-500 ease-out",
            isHome ? "opacity-100" : "opacity-0"
          )}
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 80% 50%, rgba(212,255,160,0.12), transparent 55%)",
          }}
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-0 transition-opacity duration-500 ease-out",
            isFlow || isAfter ? "opacity-100" : "opacity-0"
          )}
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 80% 50%, rgba(212,255,160,0.18), transparent 55%)",
          }}
        />

        <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col gap-5 overflow-y-auto px-4 pb-4 pt-24 sm:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-8 lg:overflow-x-visible lg:overflow-y-hidden lg:px-8 lg:pb-0 lg:pt-20">
          <div className="relative min-w-0 shrink-0">
            {isOnboarding || isAfter ? (
              <SegmentBar
                count={isAfter ? AFTER_HOME.length : ONBOARDING.length}
                active={isAfter ? afterIndex : onboardingIndex}
                dark={isAfter}
              />
            ) : null}
            <div
              className={cn(
                "relative min-w-0",
                (isOnboarding || isAfter) && "mt-6 lg:mt-0"
              )}
            >
              <div
                className={cn(
                  "flex flex-col gap-4 transition-opacity duration-500 ease-out md:gap-8",
                  isFlow
                    ? "relative opacity-100"
                    : "pointer-events-none absolute inset-x-0 top-0 opacity-0"
                )}
              >
                <h2 className="text-[32px] font-semibold leading-[1.1] tracking-[-1px] text-white md:text-[44px]">
                  Flow before screens
                </h2>
                <p className="max-w-[40ch] text-base leading-[1.7] text-white/70 md:text-lg">
                  I mapped signup, how many questions, where skip lives, and
                  what home does with those answers.
                </p>
                <ol className="flex flex-col gap-3">
                  {[
                    "Guest mode sits next to social and email signup. An account shouldn't block a look around.",
                    "The quiz is chips, not a form. Golf and food can both be true.",
                    "Skip exists. It's just not the default.",
                  ].map((line) => (
                    <li
                      key={line}
                      className="border-l-2 border-[#D4FFA0] pl-4 text-lg leading-[1.65] text-white/80 md:text-xl"
                    >
                      {line}
                    </li>
                  ))}
                </ol>
                <p className="text-sm leading-relaxed text-white/40">
                  I went straight to high-fidelity. A wireframe pass first
                  would&apos;ve been cheaper.
                </p>
              </div>

              <div
                className={cn(
                  "flex flex-col gap-4 transition-opacity duration-500 ease-out md:gap-8",
                  isOnboarding
                    ? "relative opacity-100"
                    : "pointer-events-none absolute inset-x-0 top-0 opacity-0"
                )}
              >
                <h2 className="max-w-[14ch] text-[32px] font-semibold leading-[1.1] tracking-[-1px] text-[#111118] md:text-[44px]">
                  Five questions
                </h2>
                <p className="max-w-[36ch] text-base leading-[1.7] text-[#3D3D48] md:text-lg">
                  Purpose, destinations, activities, stay, interests. Each step
                  is chips with a min and max — enough to personalize, not so
                  many that the answers blur.
                </p>
                <StepRail steps={ONBOARDING} active={onboardingIndex} />
              </div>

              <div
                className={cn(
                  "flex flex-col gap-4 transition-opacity duration-500 ease-out md:gap-8",
                  isHome
                    ? "relative opacity-100"
                    : "pointer-events-none absolute inset-x-0 top-0 opacity-0"
                )}
              >
                <p className="text-sm font-medium tabular-nums text-white/50">
                  After onboarding
                </p>
                <h2 className="max-w-[16ch] text-[32px] font-semibold leading-[1.1] tracking-[-1px] text-white md:text-[44px]">
                  Home follows the answers
                </h2>
                <p className="max-w-[38ch] text-base leading-[1.7] text-[#B0B0BA] md:text-lg">
                  Hero, bookings, stories, dining, activities, Plan Your Stay —
                  they all shift off onboarding. If home didn&apos;t change, the
                  quiz was just friction.
                </p>
                <div className="flex max-w-md flex-wrap gap-2">
                  {[
                    "Hero",
                    "Bookings",
                    "Stories",
                    "Dining",
                    "Activities",
                    "Plan Your Stay",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className={cn(
                  "flex flex-col gap-4 transition-opacity duration-500 ease-out md:gap-8",
                  isAfter
                    ? "relative opacity-100"
                    : "pointer-events-none absolute inset-x-0 top-0 opacity-0"
                )}
              >
                <h2 className="max-w-[16ch] text-[32px] font-semibold leading-[1.1] tracking-[-1px] text-white md:text-[44px]">
                  {afterStep?.heading}
                </h2>
                <p className="max-w-[38ch] text-base leading-[1.7] text-white/70 md:text-lg">
                  {afterStep?.body}
                </p>
                <StepRail steps={AFTER_HOME} active={afterIndex} dark />
              </div>
            </div>
          </div>

          <div className="relative mx-auto flex min-h-0 w-full flex-1 items-center justify-center lg:mx-0 lg:block lg:h-auto lg:w-max lg:flex-none">
            <div
              className={cn(
                "absolute inset-[8%] rounded-[2.5rem] blur-3xl transition-opacity duration-500 ease-out",
                isDark ? "bg-[#D4FFA0]/25" : "bg-[#D4FFA0]/50"
              )}
            />
            <div
              className={cn(
                "flex w-full max-w-full justify-center gap-3 px-1 transition-opacity duration-500 ease-out sm:gap-4 lg:h-auto lg:w-auto lg:px-0",
                isFlow
                  ? "relative opacity-100"
                  : "pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 opacity-0"
              )}
            >
              {[
                { src: IMG.loginEmpty, alt: "Login" },
                { src: IMG.createProfile, alt: "Create profile" },
              ].map((shot) => (
                <div
                  key={shot.src}
                  className="relative aspect-[9/19] h-auto w-[calc(50%-10px)] max-h-[min(48svh,420px)] shrink-0 drop-shadow-[0_24px_40px_rgba(0,0,0,0.28)] lg:aspect-auto lg:h-[min(78svh,720px)] lg:w-[calc(min(78svh,720px)*9/19)] lg:max-h-none"
                >
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(max-width: 1024px) 200px, 340px"
                    className="object-contain object-top"
                  />
                </div>
              ))}
            </div>
            <div
              className={cn(
                "relative aspect-[9/19] h-full w-auto drop-shadow-[0_24px_40px_rgba(0,0,0,0.18)] transition-opacity duration-500 ease-out lg:aspect-auto lg:h-[min(78svh,720px)] lg:w-[calc(min(78svh,720px)*9/19)]",
                isFlow
                  ? "pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 opacity-0"
                  : "opacity-100"
              )}
            >
              {ONBOARDING.map((step, i) => (
                <Image
                  key={step.src}
                  src={step.src}
                  alt={step.alt}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1024px) 240px, 380px"
                  className={cn(
                    "object-contain object-top transition-opacity duration-500 ease-out",
                    isOnboarding && i === onboardingIndex
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              ))}
              <Image
                src={IMG.home}
                alt="Personalized home after onboarding"
                fill
                sizes="(max-width: 1024px) 240px, 380px"
                className={cn(
                  "object-contain object-top transition-opacity duration-500 ease-out",
                  isHome ? "opacity-100" : "opacity-0"
                )}
              />
              {AFTER_HOME.map((step, i) => (
                <Image
                  key={step.src}
                  src={step.src}
                  alt={step.alt}
                  fill
                  sizes="(max-width: 1024px) 240px, 380px"
                  className={cn(
                    "object-contain object-top transition-opacity duration-500 ease-out",
                    isAfter && i === afterIndex ? "opacity-100" : "opacity-0"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PalmBeachesPage({ study }: { study: CaseStudy }) {
  return (
    <main className="min-h-dvh w-full max-w-full overflow-x-clip bg-white text-[#1A1A22]">
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md">
        <div className="mx-auto w-full min-w-0 max-w-7xl px-4 py-3 sm:py-4 md:px-8">
          <Link
            href="/#projects"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#1A1A22] transition-opacity hover:opacity-70"
          >
            <ArrowLeft className="size-4" strokeWidth={1.75} />
            Back to works
          </Link>
        </div>
      </div>

      <div className="mx-auto w-full min-w-0 max-w-7xl overflow-x-clip px-4 md:px-8">
        <header className="palm-hero-in grid min-w-0 items-center gap-8 pb-12 pt-2 md:gap-10 md:pb-16 md:pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,1fr)]">
          <div className="flex min-w-0 w-full flex-col gap-5 md:gap-6">
            <div className="relative h-10 w-[132px] sm:h-12 sm:w-[158px]">
              <Image
                src="/images/projects/slide-2-logo.png"
                alt="The Palm Beaches Florida"
                fill
                sizes="158px"
                className="object-contain object-left brightness-0"
              />
            </div>
            <h1 className="max-w-[22ch] text-[28px] font-semibold leading-[1.15] tracking-[-0.8px] text-[#111118] sm:max-w-[28ch] sm:text-[36px] md:text-[44px] md:tracking-[-1.2px]">
              {study.heading}
            </h1>
            <p className="text-base leading-[1.5] text-[#5C5C68] md:text-lg">
              A booking flow that had to leave the phone behind
            </p>
            <div className="flex w-full min-w-0 flex-wrap gap-2">
              {study.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#E0E0E6] px-3 py-1.5 text-sm text-[#3D3D48]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="w-full max-w-[40ch] text-sm leading-[1.7] text-[#3D3D48] sm:max-w-3xl sm:text-base sm:leading-[1.75] md:text-lg">
              {study.shortDescription}
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-[520px] overflow-hidden rounded-2xl lg:max-w-none">
            <Image
              src={IMG.hero}
              alt="Login, create profile, and profile created screens"
              width={1024}
              height={768}
              priority
              className="h-auto w-full object-cover"
            />
          </div>
        </header>

        <Section>
          <div className="relative min-w-0 overflow-hidden rounded-2xl">
            <Image
              src="/images/projects/card-bg.png"
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1536px) 100vw, 1280px"
            />
            <div className="relative z-10 flex min-w-0 flex-col gap-8 p-5 sm:p-8 md:gap-10 md:p-10 lg:p-12">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                <h2 className="text-2xl font-semibold tracking-[-0.5px] text-white md:text-[32px] md:leading-[1.2]">
                  Context
                </h2>
                <div className="flex flex-wrap gap-2">
                  {["Product Designer (Solo)", "Discovery-to-Handoff", "iOS & Android"].map(
                    (item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/20 px-3 py-1.5 text-sm text-white"
                      >
                        {item}
                      </span>
                    )
                  )}
                </div>
              </div>
              <p className="min-w-0 max-w-3xl border-l-2 border-[#D4FFA0] pl-5 text-lg font-semibold leading-[1.35] tracking-[-0.4px] text-white sm:text-xl md:pl-6 md:text-[28px] md:leading-[1.3]">
                If reception didn&apos;t pick up, the booking was gone.
              </p>
              <div className="grid gap-3 sm:gap-4 md:grid-cols-2 md:gap-5">
                <div className="rounded-2xl bg-white p-5 md:p-6">
                  <p className="mb-2 text-sm font-medium text-[#7A7A86]">
                    What we found
                  </p>
                  <p className="text-base leading-[1.7] text-[#111118] md:text-lg md:leading-[1.65]">
                    People found stays and activities online, then called to
                    book. Reception missed a lot of those calls.
                  </p>
                </div>
                <div className="rounded-2xl bg-white p-5 md:p-6">
                  <p className="mb-2 text-sm font-medium text-[#7A7A86]">
                    What this page covers
                  </p>
                  <p className="text-base leading-[1.7] text-[#111118] md:text-lg md:leading-[1.65]">
                    The client left after handoff, before development. No live
                    data — just the reasoning, and what I would&apos;ve
                    measured.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section>
          <H2>Two problems</H2>
          <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 md:gap-5">
            {[
              {
                title: "Booking lived on a phone call",
                body: "Explore happened on the web. Book happened only if someone answered. Missed call, lost booking.",
              },
              {
                title: "Same home for every trip",
                body: "A golf trip and a family weekend need different homes. One feed meant most of what people saw wasn't for them.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="relative overflow-hidden rounded-2xl bg-[#F4F6F0] p-6 md:p-8"
              >
                <div className="relative flex flex-col gap-4">
                  <h3 className="text-xl font-semibold tracking-[-0.4px] text-[#111118] md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="text-base leading-[1.7] text-[#3D3D48] md:text-lg">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <FiveQuestions />

      <section className="w-full overflow-x-clip bg-[#0A0A0A] text-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col px-4 pt-14 pb-12 md:px-8 md:pt-20 md:pb-16">
          <div className="flex max-w-3xl flex-col gap-5 md:gap-6">
            <h2 className="text-[32px] font-semibold leading-[1.1] tracking-[-1px] text-white md:text-[44px]">
              Design Solution
            </h2>
            <p className="text-base leading-[1.7] text-[#B0B0BA] md:text-lg">
              Signup through onboarding, then Explore, Deals, Dining.
            </p>
          </div>
        </div>
        <div className="w-full px-0 pb-14 md:pb-20">
          <DesignCoverflow items={SHOWCASE} />
        </div>
      </section>

      <section className="w-full bg-[#F4F6F0]">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-14 sm:px-6 md:grid-cols-3 md:gap-5 md:px-8 md:py-20">
          <article className="flex flex-col gap-5 rounded-2xl bg-white p-6 md:gap-6 md:p-8">
            <h2 className="text-xl font-semibold tracking-[-0.4px] text-[#111118] md:text-2xl">
              What I&apos;d have measured
            </h2>
            <p className="text-sm font-medium text-[#7A7A86]">
              The metric we agreed on
            </p>
            <p className="text-lg font-semibold leading-[1.35] tracking-[-0.3px] text-[#111118] md:text-xl">
              In-app activity bookings vs. bookings that used to need a phone
              call.
            </p>
            <p className="mt-auto text-base leading-[1.7] text-[#3D3D48]">
              No made-up conversion number. I don&apos;t have it — engagement
              ended before development.
            </p>
          </article>

          <article className="flex flex-col gap-5 rounded-2xl bg-white p-6 md:gap-6 md:p-8">
            <h2 className="text-xl font-semibold tracking-[-0.4px] text-[#111118] md:text-2xl">
              My role
            </h2>
            <p className="text-base leading-[1.7] text-[#3D3D48] md:text-lg">
              Solo product designer. Engagement ended at handoff.
            </p>
            <div className="mt-auto flex flex-wrap gap-2">
              {[
                "Discovery",
                "Onboarding",
                "Home",
                "Explore",
                "Deals",
                "Dining",
                "Handoff",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#E0E0E6] bg-[#F4F6F0] px-3 py-1.5 text-sm text-[#3D3D48]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>

          <article className="flex flex-col gap-5 rounded-2xl bg-white p-6 md:gap-6 md:p-8">
            <h2 className="text-xl font-semibold tracking-[-0.4px] text-[#111118] md:text-2xl">
              What I&apos;d do differently
            </h2>
            <ol className="flex flex-col gap-4">
              {[
                "A low-fi pass first — some chip details got over-designed because the structure wasn't locked.",
                "Log drop-off early, so if a client leaves mid-project there's still a number to talk about.",
              ].map((line) => (
                <li
                  key={line}
                  className="border-l-2 border-[#D4FFA0] pl-4 text-base leading-[1.65] text-[#3D3D48] md:text-lg"
                >
                  {line}
                </li>
              ))}
            </ol>
            <p className="mt-auto text-sm leading-relaxed text-[#7A7A86]">
              Discovery project. Client requirements, my design work. Ended
              after high-fidelity handoff, before development.
            </p>
          </article>
        </div>
      </section>

      <div className="mx-auto w-full min-w-0 max-w-7xl px-4 md:px-8">
        <MoreWork currentId={study.id} />
      </div>
    </main>
  );
}
