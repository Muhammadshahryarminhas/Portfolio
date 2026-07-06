"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  profile,
  experiences,
  techStack,
  type Experience,
  type StackLogo,
} from "@/config/experience";
import { cn } from "@/lib/utils";

const DEFAULT_VISIBLE = 3;

function ExperienceItem({
  item,
  open,
  onToggle,
}: {
  item: Experience;
  open: boolean;
  onToggle: () => void;
}) {
  const hasDetails = Boolean(item.role || item.points?.length);

  return (
    <div className="w-full rounded-2xl bg-[#fafafa]">
      <button
        type="button"
        onClick={onToggle}
        disabled={!hasDetails}
        className="flex w-full flex-col gap-2 py-3.5 pl-4 pr-4 text-left md:flex-row md:items-center md:justify-between md:gap-4 md:py-4 md:pr-6"
      >
        <span className="flex min-w-0 items-start gap-2.5 md:items-center">
          <span className="relative size-[42px] shrink-0 overflow-hidden rounded-2xl border-[1.778px] border-white">
            <Image src={item.logo} alt={item.company} fill className="object-cover" />
          </span>
          <span className="flex min-w-0 flex-1 flex-col gap-1 md:gap-0.5">
            <span className="flex items-start justify-between gap-2 md:block">
              <span className="text-base font-medium leading-snug text-black md:text-lg">
                {item.company}
              </span>
              {hasDetails && (
                <ChevronDown
                  className={cn(
                    "size-4 shrink-0 text-[#373737] transition-transform duration-300 md:hidden",
                    open && "rotate-180"
                  )}
                />
              )}
            </span>
            {item.role && (
              <span className="text-sm leading-snug text-[#373737] md:text-base">{item.role}</span>
            )}
            <span className="text-sm text-[#373737] md:hidden">{item.period}</span>
          </span>
        </span>
        <span className="hidden shrink-0 items-center gap-2.5 md:flex">
          <span className="whitespace-nowrap text-base text-[#373737]">{item.period}</span>
          {hasDetails && (
            <ChevronDown
              className={cn(
                "size-4 text-[#373737] transition-transform duration-300",
                open && "rotate-180"
              )}
            />
          )}
        </span>
      </button>

      {hasDetails && (
        <div
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="flex flex-col gap-3 pb-4 pl-[58px] pr-4 text-sm leading-relaxed text-[#373737] md:gap-4 md:pl-4 md:pr-6 md:text-base">
              {item.points?.length ? (
                <ul className="list-disc space-y-1 pl-4 md:space-y-0 md:pl-6">
                  {item.points.map((point) => (
                    <li key={point} className="leading-[1.4]">
                      {point}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StackLogoItem({ logo, index }: { logo: StackLogo; index: number }) {
  return (
    <div
      className={cn(
        "group relative size-[73px] shrink-0 rounded-full border border-[#f6f6f6] bg-white p-px",
        "transition-transform duration-300 ease-out hover:z-20 hover:-translate-y-3 hover:scale-105",
        index > 0 && "md:ml-[-10px]"
      )}
    >
      <div className="flex size-full items-center justify-center">
        <div
          className="relative"
          style={{ width: logo.size ?? 41, height: logo.size ?? 41 }}
        >
          <Image src={logo.src} alt={logo.alt} fill className="object-contain" />
        </div>
      </div>
      <span className="pointer-events-none absolute -top-9 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-md bg-black px-2.5 py-1 text-xs font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {logo.alt}
      </span>
    </div>
  );
}

export function ProfileSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [expanded, setExpanded] = useState(false);

  const canExpand = experiences.length > DEFAULT_VISIBLE;
  const toggleOpen = (index: number) =>
    setOpenIndex((prev) => (prev === index ? null : index));

  return (
    <section id="profile" className="bg-black px-4 py-8 md:px-8 md:py-48">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 rounded-[32px] bg-white p-6 md:flex-row md:gap-8 md:p-8">
        <div className="flex shrink-0 justify-center md:w-[321px] md:justify-start">
          <div className="relative h-[340px] w-[300px]">
            <Image
              src={profile.photo}
              alt="Portrait"
              fill
              className="object-contain"
              sizes="300px"
              priority
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <p className="text-2xl font-semibold leading-[31.2px] tracking-[-0.72px] text-black">
            {profile.heading}
          </p>
          <p className="text-md leading-[1.4] text-[#373737]">{profile.intro}</p>

          <div className="flex flex-col items-center gap-2 py-4">
            {experiences.slice(0, DEFAULT_VISIBLE).map((item, index) => (
              <ExperienceItem
                key={item.company}
                item={item}
                open={openIndex === index}
                onToggle={() => toggleOpen(index)}
              />
            ))}

            {canExpand && (
              <div
                className={cn(
                  "grid w-full transition-all duration-500 ease-in-out",
                  expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-col gap-2">
                    {experiences.slice(DEFAULT_VISIBLE).map((item, i) => (
                      <ExperienceItem
                        key={item.company}
                        item={item}
                        open={openIndex === DEFAULT_VISIBLE + i}
                        onToggle={() => toggleOpen(DEFAULT_VISIBLE + i)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {canExpand && (
              <Button
                variant="outline"
                size="pill-lg"
                onClick={() => {
                  setExpanded((prev) => !prev);
                  setOpenIndex(null);
                }}
                className="mt-2 h-14 gap-3 rounded-full border-[#dcdcdc] bg-white pl-4 pr-3 text-black shadow-[inset_0px_-3px_4px_0px_rgba(0,0,0,0.07),inset_0px_3px_6.6px_0px_rgba(255,255,255,0.25)] hover:bg-white"
              >
                {expanded ? "VIEW LESS" : "SHOW MORE"}
                <ChevronDown
                  className={cn("size-4 transition-transform duration-300", expanded && "rotate-180")}
                />
              </Button>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-2xl font-semibold leading-[31.2px] tracking-[-0.72px] text-black">
              My Tech Stack
            </p>
            <div className="grid grid-cols-4 gap-2 md:flex md:items-center">
              {techStack.map((logo, index) => (
                <StackLogoItem key={logo.alt} logo={logo} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
