"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Briefcase } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookCallButton } from "@/components/book-call-button";
import { Button } from "@/components/ui/button";
import { projects } from "@/config/projects";
import { cn } from "@/lib/utils";

const MAX_CARD_HEIGHT = 797;
const GAP = 32;
const STACKED_SCALE = 0.92;
const STACKED_ROTATE = -5;
const STACK_PEEK = 52;
const FOLLOW_STEP = 0.5;
const SCROLL_PER_CARD = 0.65;
const RELEASE_SCROLL = 0.2;

function ProjectCard({
  project,
  height,
}: {
  project: (typeof projects)[number];
  height: number;
}) {
  return (
    <div
      className="relative w-full origin-top will-change-transform"
      style={{ height }}
    >
      <div
        className={cn(
          "relative h-full overflow-hidden rounded-2xl px-12 pt-12 pb-0 shadow-[0_-12px_50px_rgba(0,0,0,0.08)]"
        )}
      >
        <Image
          src="/images/projects/card-bg.png"
          alt=""
          fill
          className="object-cover"
          sizes="1024px"
          priority={false}
        />

        <div className="relative z-10 h-full">
          <div
            className="max-w-[750px] rounded-[32px] bg-white/20 p-12"
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
                  size="pill-lg"
                  className="h-auto gap-2 w-fit rounded-full pl-2 pr-5 py-2"
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
              "pointer-events-none absolute bottom-0 right-0 hidden md:block",
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
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [cardHeight, setCardHeight] = useState(MAX_CARD_HEIGHT);

  useLayoutEffect(() => {
    const peekOffset = STACK_PEEK * (projects.length - 1);

    const measure = () => {
      const stage = stageRef.current;
      const header = headerRef.current;
      if (!stage || !header) return;

      const available =
        stage.clientHeight > 0
          ? stage.clientHeight
          : window.innerHeight - header.offsetHeight;

      setCardHeight(
        Math.min(MAX_CARD_HEIGHT, Math.max(400, available - peekOffset))
      );
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (stageRef.current) ro.observe(stageRef.current);
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const pin = pinRef.current;
    const stage = stageRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!section || !pin || !stage || cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(cards, {
        clearProps: "all",
        transformOrigin: "top center",
      });

      cards.forEach((el, i) => {
        gsap.set(el, {
          position: "absolute",
          left: 0,
          right: 0,
          top: i * (cardHeight + GAP),
          zIndex: i + 1,
        });
      });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () =>
            `+=${((projects.length - 1) * SCROLL_PER_CARD + RELEASE_SCROLL) * window.innerHeight}`,
          scrub: true,
          pin,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      for (let i = 1; i < cards.length; i++) {
        const card = cards[i];
        const bringToTopY = -((cardHeight + GAP) * i - STACK_PEEK * i);
        const at = (i - 1) * FOLLOW_STEP;

        tl.to(
          card,
          {
            y: bringToTopY,
            zIndex: cards.length + i,
          },
          at
        );

        for (let j = 0; j < i; j++) {
          tl.to(
            cards[j],
            {
              scale: STACKED_SCALE,
              rotate: STACKED_ROTATE,
            },
            at
          );
        }

        tl.to(
          card,
          {
            scale: 1,
            rotate: 0,
          },
          at
        );
      }

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, section);

    return () => ctx.revert();
  }, [cardHeight]);

  return (
    <section ref={sectionRef} id="projects" className="bg-[#ffffff] pb-20 md:pb-32">
      <div ref={pinRef} className="flex h-screen flex-col overflow-hidden">
        <div
          ref={headerRef}
          className="mx-auto flex w-full max-w-7xl shrink-0 flex-row items-center justify-between gap-6 pb-8 pt-36"
        >
          <h2 className="text-2xl font-semibold leading-[1.2] tracking-[-1px] text-black">
            PROJECTS THAT HELPED TEAMS
            <br />
            LAUNCH, GROW, AND SHIP FASTER.
          </h2>
          <BookCallButton
            variant="lime"
            size="pill-lg"
            className="h-14 shrink-0 whitespace-nowrap"
          >
            BOOK A 30 MIN FREE STARTEGY CALL
          </BookCallButton>
        </div>

        <div
          ref={stageRef}
          className="relative mx-auto min-h-0 w-full max-w-7xl flex-1"
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
            >
              <ProjectCard project={project} height={cardHeight} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
