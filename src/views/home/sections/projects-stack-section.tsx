"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/config/projects";
import { siteConfig } from "@/config/site";
import {
  getCardTransform,
  getCardZIndex,
  useStackedCards,
} from "@/hooks/use-stacked-cards";
import { cn } from "@/lib/utils";

const CARD_HEIGHT = 797;
const SCROLL_STEP = 520;
const STACK_PEEK = 52;
const HEADER_RELEASE = 400;
const FALLBACK_HEADER_HEIGHT = 160;

function ProjectCard({
  project,
  index,
  stackState,
}: {
  project: (typeof projects)[number];
  index: number;
  stackState: ReturnType<typeof useStackedCards>;
}) {
  const { scale, rotate } = getCardTransform(index, stackState);
  const zIndex = getCardZIndex(index, stackState);
  const isFront =
    index === stackState.frontIndex &&
    (stackState.transitionT === 0 || index === projects.length - 1);

  return (
    <div
      className="relative h-[797px] w-full origin-top will-change-transform"
      style={{
        transform: `scale(${scale}) rotate(${rotate}deg)`,
        zIndex,
      }}
    >
      <div
        className={cn(
          "relative h-full overflow-hidden rounded-2xl p-12",
          isFront && "shadow-[0_-12px_50px_rgba(0,0,0,0.08)]"
        )}
      >
        <Image
          src="/images/projects/card-bg.png"
          alt=""
          fill
          className="object-cover"
          sizes="1024px"
          priority={index === 0}
        />

        <div className="relative z-10 h-full">
          <div
            className="max-w-[800px] rounded-[32px] bg-linear-to-r from-white/20 to-white/20 p-12"
          >
            <div className="flex flex-col gap-8">
              <div className={cn("relative overflow-hidden", project.logoClassName)}>
                <Image
                  src={project.logo}
                  alt=""
                  fill
                  className={cn(
                    "logoImageClassName" in project
                      ? project.logoImageClassName
                      : "object-contain object-left"
                  )}
                />
              </div>

              <div className="flex max-w-[640px] flex-col gap-4">
                <h3
                  className={cn(
                    "text-[48px] font-semibold leading-[1.2] tracking-[-1px] text-white",
                    "titleClassName" in project && project.titleClassName
                  )}
                >
                  {project.title}
                </h3>

                <div className="h-px w-full bg-white/20" />

                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/12 px-[17px] py-[9px] text-lg text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="max-w-[641px] text-lg leading-[25.2px] text-white">
                  {project.description}
                </p>

                <Button
                  render={<Link href={project.href} />}
                  variant="lime"
                  className="h-14 rounded-full pl-1 pr-5 text-base"
                >
                  <span className="flex size-12 items-center justify-center rounded-full bg-white">
                    <Briefcase className="size-5 text-black" />
                  </span>
                  View Case Study
                </Button>
              </div>
            </div>
          </div>

          <div
            className={cn(
              "pointer-events-none absolute hidden md:block",
              project.mockupClassName
            )}
          >
            <Image src={project.mockup} alt="" fill className="object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectsStackSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(FALLBACK_HEADER_HEIGHT);
  const stackState = useStackedCards(projects.length, SCROLL_STEP, headerHeight);
  const { containerRef } = stackState;

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const update = () => setHeaderHeight(header.offsetHeight);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(header);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const stackScrollHeight =
    (projects.length - 1) * (SCROLL_STEP + CARD_HEIGHT - STACK_PEEK) +
    CARD_HEIGHT +
    HEADER_RELEASE;

  return (
    <section id="projects" className="bg-[#fbfbfb]">
      <div ref={containerRef} className="relative" style={{ height: stackScrollHeight }}>
        <div
          ref={headerRef}
          className="sticky top-0"
        >
          {/* heading row */}
          <div className="section-container flex flex-row items-center justify-between gap-6 pb-8 pt-8">
              <h2 className="text-2xl font-semibold leading-[1.2] tracking-[-1px] text-black">
                PROJECTS THAT HELPED TEAMS
                <br />
                LAUNCH, GROW, AND SHIP FASTER.
              </h2>
              <Button
                render={<a href={`mailto:${siteConfig.links.email}`} />}
                variant="lime"
                size="pill"
                className="shrink-0 whitespace-nowrap"
              >
                BOOK A 30 MIN FREE STARTEGY CALL
              </Button>
            </div>
        </div>

        {/* projects grid */}
        <div className="section-container relative">
          {projects.map((project, index) => {
            const isLast = index === projects.length - 1;
            const overlap = CARD_HEIGHT - STACK_PEEK;
            const wrapperHeight = isLast ? CARD_HEIGHT : SCROLL_STEP + overlap;

            return (
              <div
                key={project.id}
                className="relative"
                style={{
                  height: wrapperHeight,
                  marginBottom: isLast ? 0 : -overlap,
                }}
              >
                <div className="sticky" style={{ top: headerHeight }}>
                  <ProjectCard project={project} index={index} stackState={stackState} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
