"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { projects } from "@/config/projects";
import { cn } from "@/lib/utils";

export function MoreWork({ currentId }: { currentId: string }) {
  const others = projects.filter((p) => p.id !== currentId).slice(0, 2);

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
