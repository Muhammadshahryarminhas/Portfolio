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

const pillLinkClassName =
  "select-none rounded-full bg-white font-semibold tracking-[-0.02em] text-black shadow-[0_8px_32px_rgba(0,0,0,0.35)]";

function FooterTicker() {
  const phrase = footerCopy.ticker;

  return (
    <div className="relative w-full max-w-full shrink-0 overflow-hidden pt-8 pb-4 sm:pt-10 sm:pb-6 md:pt-16 md:pb-10">
      <div className="flex w-max max-w-none animate-footer-ticker items-center gap-4 sm:gap-6 md:gap-10">
        {[0, 1].map((set) => (
          <div
            key={set}
            className="flex items-center gap-4 sm:gap-6 md:gap-10"
            aria-hidden={set === 1}
          >
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={`${set}-${i}`} className="flex items-center gap-4 sm:gap-6 md:gap-10">
                <span className="whitespace-nowrap text-[clamp(2rem,10vw,12rem)] font-semibold tracking-[-0.02em] text-white">
                  {phrase}
                </span>
                <span className="size-7 shrink-0 rounded-full bg-lime sm:size-10 md:size-16" />
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
      className={cn("relative touch-none overflow-hidden", className)}
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
            pillLinkClassName,
            "px-4 py-2 text-lg sm:px-6 sm:py-3 sm:text-2xl md:px-12 md:py-6 md:text-5xl lg:px-14 lg:py-7 lg:text-6xl xl:text-7xl",
            "will-change-transform"
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
      className="pointer-events-auto fixed right-0 bottom-0 left-0 z-[1] flex h-svh w-full max-w-[100vw] flex-col overflow-hidden bg-black"
      aria-label="Footer"
    >
      <FooterTicker />

      <div className="relative flex min-h-0 w-full flex-1 flex-col overflow-hidden px-4 md:mx-auto md:max-w-7xl md:px-8">
        <div className="h-px w-full shrink-0 bg-white/15" />

        <div className="relative flex min-h-0 w-full flex-1 flex-col overflow-hidden py-6 sm:py-8 md:py-12">
          <div className="relative z-20 grid w-full shrink-0 gap-4 text-center text-sm leading-snug text-white sm:gap-5 sm:text-base md:grid-cols-3 md:gap-10 md:text-left md:text-lg">
            <p className="text-2xl leading-snug mx-auto max-w-md md:mx-0">{footerCopy.tagline}</p>
            <a
              href={`mailto:${footerCopy.email}`}
              className="relative z-30 text-2xl underline underline-offset-4 transition-opacity hover:opacity-80 md:text-center"
            >
              {footerCopy.cta}
            </a>
            <p className="text-2xl md:text-right">{footerCopy.credit}</p>
          </div>

          <div className="relative mt-6 flex min-h-[200px] w-full flex-1 flex-col justify-end overflow-hidden sm:min-h-[240px] md:mt-10 md:min-h-0">
            <p
              className="pointer-events-none absolute inset-x-0 bottom-0 z-0 overflow-hidden px-4 text-center text-[clamp(1.5rem,8vw,8rem)] font-semibold tracking-[-0.02em] text-ellipsis text-white/30 md:px-0 md:whitespace-nowrap"
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
