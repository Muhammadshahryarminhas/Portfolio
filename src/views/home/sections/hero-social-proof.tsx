"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Star } from "lucide-react";
import { assets } from "@/config/assets";

type BrandLogoProps = {
  gray: string;
  color: string;
  alt: string;
  tooltip: string;
  width: number;
  height: number;
  scale: number;
};

function BrandLogo({ gray, color, alt, tooltip, width, height, scale }: BrandLogoProps) {
  const displayWidth = Math.round(width * scale);
  const displayHeight = Math.round(height * scale);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipId = useId();
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePos = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({
      top: rect.top - 8,
      left: rect.left + rect.width / 2,
    });
  }, []);

  const show = () => {
    updatePos();
    setOpen(true);
  };

  const hide = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onScroll = () => updatePos();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [open, updatePos]);

  return (
    <div
      ref={triggerRef}
      className="group relative shrink-0"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <div className="relative" style={{ width: displayWidth, height: displayHeight }}>
        <Image
          src={gray}
          alt={alt}
          width={displayWidth}
          height={displayHeight}
          className="h-full w-full object-contain object-center transition-opacity duration-300 group-hover:opacity-0"
        />
        <Image
          src={color}
          alt={alt}
          width={displayWidth}
          height={displayHeight}
          className="absolute inset-0 h-full w-full object-contain object-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </div>

      {mounted &&
        open &&
        createPortal(
          <div
            id={tooltipId}
            role="tooltip"
            className="pointer-events-none fixed z-9999 w-max max-w-[220px] -translate-x-1/2 -translate-y-full rounded-lg bg-neutral-900 px-3 py-2 text-center text-md leading-snug text-white shadow-lg"
            style={{ top: pos.top, left: pos.left }}
          >
            {tooltip}
            <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-900" />
          </div>,
          document.body
        )}
    </div>
  );
}

function BrandTicker() {
  return (
    <div className="w-full overflow-hidden">
      <div className="flex w-max animate-brand-ticker items-center gap-8">
        {[0, 1].map((set) => (
          <div
            key={set}
            className="flex items-center gap-8"
            aria-hidden={set === 1}
          >
            {assets.brands.map((brand) => (
              <BrandLogo key={`${set}-${brand.alt}`} {...brand} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroSocialProof() {
  return (
    <div className="section-container flex flex-col items-center gap-5 md:flex-row md:items-center md:justify-between md:gap-0">
      <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
        <div className="flex items-center">
          {assets.clientLogos.map((src, i) => (
            <div
              key={src}
              className={`relative size-9 overflow-hidden rounded-full border border-white bg-white sm:size-12 ${i > 0 ? "-ml-2.5 sm:-ml-3.5" : ""}`}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="48px" />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-3 fill-amber-400 text-amber-400 sm:size-3.5" />
            ))}
          </div>
          <p className="whitespace-nowrap text-sm text-[#373737] sm:text-md">
            Trusted by 20+ brands
          </p>
        </div>
      </div>

      <div className="hidden h-12 w-px shrink-0 bg-neutral-200 md:block" />

      <div className="w-full max-w-full overflow-hidden md:hidden">
        <BrandTicker />
      </div>

      <div className="hidden items-center justify-center gap-8 md:flex">
        {assets.brands.map((brand) => (
          <BrandLogo key={brand.alt} {...brand} />
        ))}
      </div>
    </div>
  );
}
