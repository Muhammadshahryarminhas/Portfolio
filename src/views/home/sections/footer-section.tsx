"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { cn } from "@/lib/utils";
import {
  footerCopy,
  footerSocialLinks,
} from "@/config/footer";

export const FOOTER_REVEAL_HEIGHT = "100svh";

function FooterTicker() {
  const phrase = footerCopy.ticker;

  return (
    <div className="relative overflow-hidden pt-10 pb-6 md:pt-16 md:pb-10">
      <div className="flex w-max animate-footer-ticker items-center gap-6 md:gap-10">
        {[0, 1].map((set) => (
          <div
            key={set}
            className="flex items-center gap-6 md:gap-10"
            aria-hidden={set === 1}
          >
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={`${set}-${i}`} className="flex items-center gap-6 md:gap-10">
                <span className="whitespace-nowrap text-[clamp(3.5rem,14vw,12rem)] font-semibold tracking-[-0.02em] text-white">
                  {phrase}
                </span>
                <span className="size-10 shrink-0 rounded-full bg-lime md:size-16" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function FooterPills({ className }: { className?: string }) {
  const areaRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(Draggable, InertiaPlugin);

    const area = areaRef.current;
    const pills = pillRefs.current.filter(Boolean) as HTMLAnchorElement[];
    if (!area || !pills.length) return;

    const placePills = () => {
      const width = area.offsetWidth;
      const height = area.offsetHeight;

      pills.forEach((pill, index) => {
        const link = footerSocialLinks[index];
        if (!link) return;

        gsap.set(pill, {
          x: (link.x / 100) * width,
          y: (link.y / 100) * height,
          rotation: link.rotation,
        });
      });
    };

    placePills();

    const draggables = Draggable.create(pills, {
      type: "x,y",
      bounds: area,
      inertia: true,
      dragClickables: true,
      edgeResistance: 0.8,
      throwResistance: 2500,
      minimumMovement: 6,
      zIndexBoost: true,
      onPress() {
        gsap.to(this.target, {
          scale: 1.05,
          duration: 0.15,
          ease: "power2.out",
        });
      },
      onRelease() {
        gsap.to(this.target, {
          scale: 1,
          duration: 0.25,
          ease: "power2.out",
        });
      },
    });

    const resizeObserver = new ResizeObserver(() => {
      placePills();
      draggables.forEach((instance) => instance.update(true));
    });
    resizeObserver.observe(area);

    return () => {
      resizeObserver.disconnect();
      draggables.forEach((instance) => instance.kill());
    };
  }, []);

  return (
    <div
      ref={areaRef}
      className={cn("relative touch-none", className)}
    >
      {footerSocialLinks.map((link, index) => (
        <a
          key={link.label}
          ref={(element) => {
            pillRefs.current[index] = element;
          }}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "footer-pill absolute top-0 left-0 cursor-grab active:cursor-grabbing",
            "select-none rounded-full bg-white px-8 py-4 md:px-12 md:py-6 lg:px-14 lg:py-7",
            "text-3xl font-semibold tracking-[-0.02em] text-black md:text-5xl lg:text-6xl xl:text-7xl",
            "shadow-[0_8px_32px_rgba(0,0,0,0.35)] will-change-transform"
          )}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

export function FooterSection() {
  return (
    <footer
      className="pointer-events-auto fixed inset-x-0 bottom-0 z-[1] flex h-svh min-h-[720px] flex-col overflow-hidden bg-black"
      aria-label="Footer"
    >
      <FooterTicker />

      <div className="section-container relative flex flex-1 flex-col">
        <div className="h-px w-full bg-white/15" />

        <div className="relative flex min-h-0 flex-1 flex-col py-8 md:py-12">
          <div className="relative z-20 shrink-0 grid gap-6 text-base leading-snug text-white md:grid-cols-3 md:gap-10 md:text-lg">
            <p className="max-w-md leading-snug">{footerCopy.tagline}</p>
            <a
              href={`mailto:${footerCopy.email}`}
              className="relative z-30 underline underline-offset-4 transition-opacity hover:opacity-80 md:text-center"
            >
              {footerCopy.cta}
            </a>
            <p className="md:text-right">{footerCopy.credit}</p>
          </div>

          <div className="relative mt-8 min-h-0 flex-1 md:mt-10">
            <p
              className="pointer-events-none absolute inset-x-0 bottom-0 z-0 text-center text-[clamp(3rem,18vw,8rem)] font-semibold tracking-[-0.02em] whitespace-nowrap text-white/30"
              aria-hidden
            >
              {footerCopy.email}
            </p>

            <FooterPills className="absolute inset-0 z-10" />
          </div>
        </div>
      </div>
    </footer>
  );
}
