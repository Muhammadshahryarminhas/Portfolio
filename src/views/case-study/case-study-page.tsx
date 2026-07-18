"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dialog } from "@base-ui/react/dialog";
import {
  ArrowLeft,
  ArrowRight,
  Ban,
  ChevronsRight,
  Clock,
  Code2,
  Crop,
  ImageOff,
  Lock,
  Monitor,
  Smartphone,
  Sparkles,
  Wallet,
  X,
} from "lucide-react";
import {
  type CaseStudy,
  type CaseStudyBlock,
  type CaseStudyImage,
  type CaseStudySection,
} from "@/config/case-studies";
import { projects } from "@/config/projects";
import { cn } from "@/lib/utils";

function sectionById(study: CaseStudy, id: string) {
  return study.sections.find((s) => s.id === id);
}

const IMPACT_ICONS = [Smartphone, Wallet, Crop, Code2, Sparkles] as const;
const CONSTRAINT_ICONS = [Ban, Monitor, Wallet, ImageOff, Clock, Sparkles] as const;

function ImageLightbox({
  open,
  onOpenChange,
  src,
  alt,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  src: string;
  alt: string;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm transition-opacity duration-300 ease-out data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className="fixed inset-0 z-50 flex items-center justify-center outline-none transition-[opacity,transform] duration-300 ease-out data-[ending-style]:scale-[0.96] data-[ending-style]:opacity-0 data-[starting-style]:scale-[0.96] data-[starting-style]:opacity-0">
          <Dialog.Title className="sr-only">{alt}</Dialog.Title>
          <Dialog.Close
            className="absolute top-3 right-3 z-10 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:top-5 sm:right-5"
            aria-label="Close preview"
          >
            <X className="size-5" strokeWidth={1.75} />
          </Dialog.Close>
          <button
            type="button"
            className="absolute inset-0 cursor-zoom-out"
            aria-label="Close preview"
            onClick={() => onOpenChange(false)}
          />
          <div className="relative z-10 max-h-[90dvh] w-full max-w-[min(100%,1200px)] px-3 sm:px-6">
            <Image
              src={src}
              alt={alt}
              width={2400}
              height={1600}
              quality={95}
              className="mx-auto h-auto max-h-[90dvh] w-auto max-w-full object-contain"
              sizes="100vw"
            />
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function PlaceholderImage({
  image,
  framed,
  dark,
  className,
  priority,
}: {
  image: CaseStudyImage;
  framed?: boolean;
  dark?: boolean;
  className?: string;
  priority?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const natural = Boolean(image.src && image.fit === "contain");
  const aspect =
    image.aspect === "hero"
      ? "aspect-[16/10]"
      : image.aspect === "square"
        ? "aspect-square"
        : image.aspect === "portrait"
          ? "aspect-[4/5]"
          : "aspect-[16/9]";

  return (
    <figure className={cn("w-full", className)}>
      <div
        className={cn(
          framed && "rounded-[28px] p-4 md:p-8",
          framed &&
            (dark
              ? "bg-white/8"
              : "bg-[color-mix(in_srgb,var(--case-accent)_12%,white)]")
        )}
      >
        {image.src ? (
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`Preview image: ${image.alt}`}
            className={cn(
              "relative block w-full cursor-zoom-in overflow-hidden rounded-2xl text-left",
              !natural && aspect,
              dark && image.fit === "contain" && "bg-[#111111]"
            )}
          >
            {natural ? (
              <Image
                src={image.src}
                alt={image.alt}
                width={1600}
                height={2000}
                priority={priority}
                quality={90}
                className="h-auto w-full"
                sizes="(max-width: 768px) 100vw, (max-width: 1536px) 50vw, 700px"
              />
            ) : (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={priority}
                quality={90}
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, (max-width: 1536px) 90vw, 1400px"
              />
            )}
          </button>
        ) : (
          <div
            className={cn(
              "relative flex w-full items-center justify-center overflow-hidden rounded-2xl px-6 text-center",
              aspect,
              dark ? "bg-[#2A2A32]" : "bg-[#F3F3F5]"
            )}
          >
            <span className="max-w-sm text-sm leading-relaxed text-[#8B8B9A]">
              Image placeholder
            </span>
          </div>
        )}
      </div>
      <figcaption
        className={cn(
          "mt-3 line-clamp-2 px-1 text-center text-sm leading-relaxed sm:line-clamp-none",
          dark ? "text-[#9A9AA6]" : "text-[#7A7A86]"
        )}
      >
        {image.alt}
      </figcaption>
      {image.src && (
        <ImageLightbox
          open={open}
          onOpenChange={setOpen}
          src={image.src}
          alt={image.alt}
        />
      )}
    </figure>
  );
}

function SectionHeading({
  title,
  eyebrow,
  className,
}: {
  title: string;
  eyebrow?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {eyebrow && (
        <p
          className="text-sm font-semibold uppercase tracking-[0.14em]"
          style={{ color: "var(--case-accent)" }}
        >
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-semibold tracking-[-0.6px] text-[#111118] md:text-[32px] md:leading-[1.15]">
        {title}
      </h2>
    </div>
  );
}

function SplitSection({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <section className="grid gap-6 border-t border-[#F0F0F2] py-12 sm:py-14 lg:grid-cols-[minmax(200px,260px)_minmax(0,1fr)] lg:items-start lg:gap-12 lg:py-20">
      <div className="lg:sticky lg:top-20 lg:z-10 lg:self-start">
        <SectionHeading title={title} eyebrow={eyebrow} />
      </div>
      <div className="flex min-w-0 flex-col gap-6 sm:gap-8">{children}</div>
    </section>
  );
}

function SoftBox({
  children,
  className,
  tone = "cream",
}: {
  children: ReactNode;
  className?: string;
  tone?: "cream" | "mist" | "accent" | "warn";
}) {
  const tones = {
    cream: "bg-[#F7F8FF]",
    mist: "bg-[#FAFAFA]",
    accent: "bg-[color-mix(in_srgb,var(--case-accent)_10%,white)]",
    warn: "bg-[#FBECEC]",
  };

  return (
    <div className={cn("rounded-2xl p-5 md:p-6", tones[tone], className)}>{children}</div>
  );
}

function PhaseBlock({ block }: { block: CaseStudyBlock }) {
  const layout = block.layout ?? "stack";

  return (
    <div className="flex flex-col gap-5 border-t border-[#F0F0F2] pt-8 first:border-t-0 first:pt-0">
      <h3 className="text-xl font-semibold tracking-[-0.4px] text-[#111118] md:text-2xl">
        {block.title}
      </h3>

      {block.body?.map((p) => (
        <p key={p.slice(0, 48)} className="text-base leading-[1.7] text-[#3D3D48] md:text-lg">
          {p}
        </p>
      ))}

      {layout === "boxes" && block.cards && (
        <div className="grid gap-4 md:grid-cols-2">
          {block.cards.map((card, i) => (
            <SoftBox key={card.title} tone={i === 0 ? "cream" : "accent"} className="flex flex-col gap-3">
              <h4 className="text-base font-semibold text-[#111118]">{card.title}</h4>
              {card.body.map((p) => (
                <p key={p.slice(0, 40)} className="text-base leading-relaxed text-[#3D3D48]">
                  {p}
                </p>
              ))}
            </SoftBox>
          ))}
        </div>
      )}

      {layout === "split" && (block.bullets || block.images?.[0]) && (
        <div
          className={cn(
            "grid items-start gap-5 sm:gap-6 lg:gap-8",
            block.bullets && block.images?.[0] && "lg:grid-cols-2"
          )}
        >
          {block.bullets && (
            <SoftBox tone="mist">
              <ul className="flex list-disc flex-col gap-2 pl-4 text-base leading-relaxed text-[#2A2A32]">
                {block.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </SoftBox>
          )}
          {block.images?.[0] && <PlaceholderImage image={block.images[0]} />}
        </div>
      )}

      {layout === "stack" && block.bullets && (
        <ul className="flex list-disc flex-col gap-2 pl-5 text-base leading-[1.7] text-[#2A2A32]">
          {block.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}

      {(block.decision || block.decisionBullets) && (
        <SoftBox tone="accent" className="flex flex-col gap-3">
          <p
            className="text-sm font-semibold uppercase tracking-[0.12em]"
            style={{ color: "var(--case-accent)" }}
          >
            Design decision
          </p>
          {block.decision && (
            <p className="text-base leading-relaxed text-[#2A2A32]">{block.decision}</p>
          )}
          {block.decisionBullets && (
            <ul className="flex list-disc flex-col gap-1.5 pl-4 text-base leading-relaxed text-[#2A2A32]">
              {block.decisionBullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
        </SoftBox>
      )}

      {layout === "outcome" && block.cards && (
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10">
          {block.cards.map((card) => (
            <div key={card.title} className="flex flex-col gap-2.5 sm:gap-3">
              <h4
                className="text-lg font-semibold tracking-[-0.2px] md:text-xl"
                style={{ color: "var(--case-accent)" }}
              >
                {card.title}
              </h4>
              {card.body.map((p) => (
                <p key={p.slice(0, 40)} className="text-base leading-[1.65] text-[#3D3D48]">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}

      {layout !== "split" &&
        block.images?.map((image) => (
          <PlaceholderImage key={image.alt} image={image} />
        ))}
    </div>
  );
}

function PhaseSection({ section, eyebrow }: { section: CaseStudySection; eyebrow: string }) {
  const title = section.title.replace(/^Phase \d+ — /, "");

  return (
    <SplitSection title={title} eyebrow={eyebrow}>
      {section.body?.map((p) => (
        <p key={p.slice(0, 40)} className="text-base leading-[1.7] text-[#3D3D48] md:text-lg">
          {p}
        </p>
      ))}
      {section.blocks?.map((block) => (
        <PhaseBlock key={block.title} block={block} />
      ))}
    </SplitSection>
  );
}

function MoreWork() {
  const others = projects.filter((p) => p.id !== "brandpulse").slice(0, 2);

  return (
    <section className="border-t border-[#F0F0F2] py-16 md:py-20">
      <h2 className="mb-10 text-sm font-semibold uppercase tracking-[0.14em] text-[#7A7A86]">
        Check out more work
      </h2>
      <div className="grid gap-10 sm:grid-cols-2 sm:gap-6 lg:gap-10">
        {others.map((project) => {
          const locked = "locked" in project && project.locked;
          const content = (
            <>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#2C2C30]">
                <Image
                  src={project.mockup}
                  alt=""
                  fill
                  className="object-contain object-[right_bottom] transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-col gap-2.5 pt-4 sm:gap-3 sm:pt-5">
                <div className="relative h-7 w-36 sm:h-8 sm:w-40">
                  <Image
                    src={project.logo}
                    alt=""
                    fill
                    className={cn(
                      "object-contain object-left",
                      "logoImageClassName" in project && project.logoImageClassName
                    )}
                  />
                </div>
                <p className="text-sm text-[#7A7A86]">{project.tags.join(" · ")}</p>
                <h3 className="text-lg font-semibold tracking-[-0.4px] text-[#111118] sm:text-xl lg:text-2xl">
                  {project.title}
                </h3>
                <p className="line-clamp-3 text-sm leading-relaxed text-[#5C5C68] sm:text-base">
                  {project.description}
                </p>
                <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-[#111118]">
                  {locked ? (
                    <>
                      Coming soon
                      <Lock className="size-3.5" />
                    </>
                  ) : (
                    <>
                      View case study
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </span>
              </div>
            </>
          );

          if (locked) {
            return (
              <div key={project.id} className="group flex flex-col">
                {content}
              </div>
            );
          }

          return (
            <Link key={project.id} href={project.href} className="group flex flex-col">
              {content}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const impact = sectionById(study, "impact");
  const context = sectionById(study, "context");
  const problems = sectionById(study, "problems-solutions");
  const users = sectionById(study, "users");
  const team = sectionById(study, "team-role");
  const constraints = sectionById(study, "constraints");
  const decisions = sectionById(study, "key-decisions");
  const solution = sectionById(study, "design-solution");
  const phase1 = sectionById(study, "phase-1");
  const phase2 = sectionById(study, "phase-2");

  const meta = [
    { label: "Role", value: study.roleLine },
    {
      label: "Timeline",
      value: study.timelineLines?.length
        ? study.timelineLines
        : study.timeline.split(" · ").map((line) => line.trim()),
    },
    { label: "Team", value: study.teamMembers.join(", ") },
  ];

  return (
    <main
      className="min-h-dvh bg-white text-[#1A1A22]"
      style={{ ["--case-accent" as string]: study.heroAccent }}
    >
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md">
        <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:py-4 md:px-8">
          <Link
            href="/#projects"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#1A1A22] transition-opacity hover:opacity-70"
          >
            <ArrowLeft className="size-4" strokeWidth={1.75} />
            Back to works
          </Link>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        {/* Hero */}
        <header className="flex flex-col gap-5 pb-10 pt-2 sm:gap-6 sm:pt-4 md:gap-8 md:pb-14 md:pt-8">
          <h1 className="max-w-[20ch] text-[28px] font-semibold leading-[1.15] tracking-[-0.8px] text-[#111118] sm:max-w-none sm:text-[32px] sm:tracking-[-1px] md:text-[48px] md:tracking-[-1.4px]">
            {study.heading}
          </h1>

          <div className="flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#E0E0E6] px-3 py-1.5 text-sm text-[#3D3D48]"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-base leading-[1.7] text-[#3D3D48] md:text-lg">
            {study.shortDescription}
          </p>

          <PlaceholderImage priority image={study.heroImage} />

          <div className="grid gap-3 sm:grid-cols-3 sm:gap-4 md:gap-6">
            {meta.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-2 rounded-2xl border border-[#EFEFEF] bg-[#FCFCFC] p-4 sm:p-5 md:p-6"
              >
                <p className="text-sm text-[#7A7A86]">{item.label}</p>
                {Array.isArray(item.value) ? (
                  <div className="flex flex-col gap-1">
                    {item.value.map((line) => (
                      <p
                        key={line}
                        className="text-base font-semibold leading-snug text-[#111118]"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-base font-semibold leading-snug text-[#111118]">
                    {item.value}
                  </p>
                )}
              </div>
            ))}
          </div>
        </header>

        {/* Impact */}
        {impact && (
          <section className="border-t border-[#F0F0F2] py-14 md:py-20">
            <h2 className="mb-8 text-2xl font-semibold tracking-[-0.6px] text-[#111118] md:mb-10 md:text-[32px] md:leading-[1.2]">
              {impact.title}
            </h2>
            {impact.body?.map((p) => (
              <p
                key={p.slice(0, 40)}
                className="mb-8 max-w-3xl text-base leading-[1.7] text-[#3D3D48] md:mb-10 md:text-lg"
              >
                {p}
              </p>
            ))}
            <div className="flex flex-col gap-10 md:gap-12">
              <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
                {impact.items?.map((item, index) => {
                  const Icon = IMPACT_ICONS[index % IMPACT_ICONS.length];
                  return (
                    <li key={item.title} className="flex flex-col gap-2.5">
                      <Icon className="size-5 text-[#111118]" strokeWidth={1.75} />
                      <h3 className="text-lg font-semibold tracking-[-0.3px] text-[#111118]">
                        {item.title}
                      </h3>
                      <p className="text-base leading-[1.65] text-[#6B6B78]">{item.body}</p>
                    </li>
                  );
                })}
              </ul>
              {impact.images?.[0] && <PlaceholderImage image={impact.images[0]} />}
            </div>
          </section>
        )}

        {/* Context */}
        {context && (
          <section className="border-t border-[#F0F0F2] py-14 md:py-20">
            <h2 className="mb-8 text-2xl font-semibold tracking-[-0.6px] text-[#111118] md:mb-10 md:text-[32px] md:leading-[1.2]">
              {context.title}
            </h2>
            <div className="grid gap-4 md:grid-cols-2 md:gap-6">
              <SoftBox tone="mist">
                <h3 className="mb-2 text-base font-semibold text-[#111118]">The challenge</h3>
                <p className="text-base leading-relaxed text-[#3D3D48]">
                  {context.body?.[0]} {context.body?.[1]}
                </p>
              </SoftBox>
              <SoftBox tone="cream">
                <h3 className="mb-2 text-base font-semibold text-[#111118]">The opportunity</h3>
                <p className="text-base leading-relaxed text-[#3D3D48]">
                  {context.body?.[2]}
                </p>
              </SoftBox>
            </div>
          </section>
        )}

        {/* Problems & Solutions */}
        {problems && (
          <section className="border-t border-[#F0F0F2] py-14 md:py-20">
            <h2 className="mb-8 text-2xl font-semibold tracking-[-0.6px] text-[#111118] md:mb-10 md:text-[32px] md:leading-[1.2]">
              {problems.title}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {problems.items?.map((item, index) => (
                <SoftBox
                  key={item.title}
                  tone={index === 1 ? "cream" : "mist"}
                  className="flex flex-col gap-3 sm:col-span-1 sm:last:col-span-2 lg:last:col-span-1"
                >
                  <p
                    className="text-sm font-semibold uppercase tracking-[0.12em]"
                    style={{ color: "var(--case-accent)" }}
                  >
                    Problem {index + 1}
                  </p>
                  <h3 className="text-base font-semibold tracking-[-0.2px] text-[#111118]">
                    {item.title}
                  </h3>
                  <p className="text-base leading-relaxed text-[#3D3D48]">{item.body}</p>
                  {item.bullets && (
                    <div className="mt-auto flex flex-col gap-2 border-t border-black/5 pt-3">
                      <p
                        className="text-sm font-semibold uppercase tracking-[0.12em]"
                        style={{ color: "var(--case-accent)" }}
                      >
                        Solution
                      </p>
                      <ul className="flex list-disc flex-col gap-1.5 pl-4 text-base leading-relaxed text-[#2A2A32]">
                        {item.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </SoftBox>
              ))}
            </div>
          </section>
        )}

        {/* Users & Their Needs */}
        {users && (
          <section className="border-t border-[#F0F0F2] py-14 md:py-20">
            <h2 className="mb-8 text-2xl font-semibold tracking-[-0.6px] text-[#111118] md:mb-10 md:text-[32px] md:leading-[1.2]">
              {users.title}
            </h2>
            <div className="grid gap-4 md:grid-cols-2 md:gap-6">
              {users.items?.map((item, index) => (
                <SoftBox
                  key={item.title}
                  tone={index === 0 ? "cream" : "accent"}
                  className="flex flex-col gap-3"
                >
                  <h3 className="text-lg font-semibold tracking-[-0.3px] text-[#111118]">
                    {item.title}
                  </h3>
                  <p className="text-base leading-relaxed text-[#3D3D48]">{item.body}</p>
                  {item.bullets && (
                    <ul className="flex list-disc flex-col gap-1.5 pl-4 text-base leading-relaxed text-[#2A2A32]">
                      {item.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                </SoftBox>
              ))}
            </div>
          </section>
        )}

        {/* Team & My Role */}
        {team && (
          <section className="border-t border-[#F0F0F2] py-14 md:py-20">
            <h2 className="mb-8 text-2xl font-semibold tracking-[-0.6px] text-[#111118] md:mb-10 md:text-[32px] md:leading-[1.2]">
              {team.title}
            </h2>
            {team.body?.map((p) => (
              <p
                key={p.slice(0, 40)}
                className="mb-8 max-w-3xl text-base leading-[1.7] text-[#3D3D48] md:mb-10 md:text-lg"
              >
                {p}
              </p>
            ))}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              <SoftBox tone="mist" className="flex flex-col gap-3 sm:col-span-2 lg:col-span-1">
                <h3 className="text-base font-semibold text-[#111118]">Responsibilities</h3>
                <ul className="flex list-disc flex-col gap-2 pl-4 text-base leading-relaxed text-[#2A2A32]">
                  {team.bullets?.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </SoftBox>
              {team.items?.map((item) => (
                <SoftBox key={item.title} tone="cream" className="flex flex-col gap-3">
                  <h3 className="text-base font-semibold text-[#111118]">{item.title}</h3>
                  <p className="text-base text-[#3D3D48]">{item.body}</p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {item.bullets?.map((b) => (
                      <span
                        key={b}
                        className="rounded-full bg-white px-3 py-1 text-sm font-medium text-[#1A1A22]"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </SoftBox>
              ))}
            </div>
          </section>
        )}

        {/* Constraints */}
        {constraints && (
          <section className="border-t border-[#F0F0F2] py-14 md:py-20">
            <h2 className="mb-8 text-2xl font-semibold tracking-[-0.6px] text-[#111118] md:mb-10 md:text-[32px] md:leading-[1.2]">
              {constraints.title}
            </h2>
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
              {constraints.items?.map((item, index) => {
                const Icon = CONSTRAINT_ICONS[index % CONSTRAINT_ICONS.length];
                return (
                  <li key={item.title} className="flex flex-col gap-2.5">
                    <Icon className="size-5 text-[#111118]" strokeWidth={1.75} />
                    <h3 className="text-lg font-semibold tracking-[-0.3px] text-[#111118]">
                      {item.title}
                    </h3>
                    <p className="text-base leading-[1.65] text-[#6B6B78]">{item.body}</p>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {/* Key decisions */}
        {decisions && (
          <section className="border-t border-[#F0F0F2] py-14 md:py-20">
            <h2 className="mb-8 text-2xl font-semibold tracking-[-0.6px] text-[#111118] md:mb-10 md:text-[32px] md:leading-[1.2]">
              {decisions.title}
            </h2>
            <ul className="flex max-w-3xl flex-col gap-5 md:gap-6">
              {decisions.items?.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <ChevronsRight
                    className="mt-1 size-5 shrink-0"
                    style={{ color: "var(--case-accent)" }}
                    strokeWidth={2}
                  />
                  <p className="text-base leading-[1.65] text-[#3D3D48] md:text-lg">
                    <span className="font-semibold text-[#111118]">{item.title}</span>
                    {item.body ? ` ${item.body}` : null}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* Design solution — full-width black */}
      {solution && (
        <section className="w-full bg-[#0A0A0A] text-white">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-14 md:gap-14 md:px-8 md:py-20">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold tracking-[-0.6px] text-white md:text-[32px] md:leading-[1.2]">
                {solution.title}
              </h2>
              {solution.body?.map((p) => (
                <p
                  key={p.slice(0, 40)}
                  className="max-w-3xl text-base leading-[1.7] text-[#B0B0BA] md:text-lg"
                >
                  {p}
                </p>
              ))}
            </div>

            {solution.images?.[0] && (
              <PlaceholderImage dark image={solution.images[0]} />
            )}

            <div className="flex flex-col gap-12 md:gap-16">
              {solution.items?.map((item, index) => (
                <div
                  key={item.title}
                  className={cn(
                    "grid items-center gap-5 sm:gap-6 lg:grid-cols-2 lg:gap-10",
                    index % 2 === 1 && "lg:[&>*:first-child]:order-2"
                  )}
                >
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-semibold tracking-[-0.4px] text-white md:text-2xl">
                      {item.title}
                    </h3>
                    <p className="text-base leading-[1.7] text-[#B0B0BA] md:text-lg">
                      {item.body}
                    </p>
                  </div>
                  <PlaceholderImage
                    dark
                    className="w-full"
                    image={
                      item.image ?? {
                        alt: `${item.title} UI placeholder — BrandPulse case study visual`,
                        aspect: "portrait",
                      }
                    }
                  />
                </div>
              ))}
            </div>

            {solution.images?.[1] && (
              <PlaceholderImage dark image={solution.images[1]} />
            )}
          </div>
        </section>
      )}

      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        {/* Phase 1 */}
        {phase1 && <PhaseSection section={phase1} eyebrow="Phase 1" />}

        {/* Phase 2 */}
        {phase2 && <PhaseSection section={phase2} eyebrow="Phase 2" />}

        <MoreWork />
      </div>
    </main>
  );
}
