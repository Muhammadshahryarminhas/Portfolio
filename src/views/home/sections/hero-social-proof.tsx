"use client";

import Image from "next/image";
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

  return (
    <div className="group relative shrink-0">
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

      <div
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-max max-w-[220px] -translate-x-1/2 rounded-lg bg-neutral-900 px-3 py-2 text-center text-md leading-snug text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100"
      >
        {tooltip}
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-900" />
      </div>
    </div>
  );
}

export function HeroSocialProof() {
  return (
    <div className="section-container flex flex-row items-center justify-between">
      <div className="flex shrink-0 items-center gap-3">
        <div className="flex items-center">
          {assets.clientLogos.map((src, i) => (
            <div
              key={src}
              className={`relative size-12 overflow-hidden rounded-full border border-white bg-white ${i > 0 ? "-ml-3.5" : ""}`}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="48px" />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="whitespace-nowrap text-sm text-[#373737]">Trusted by 20+ brands</p>
        </div>
      </div>

      <div className="hidden h-12 w-px shrink-0 bg-neutral-200 md:block" />

      <div className="flex w-full items-center justify-center overflow-x-auto md:w-auto md:overflow-visible">
        <div className="flex items-center gap-8 px-1">
          {assets.brands.map((brand) => (
            <BrandLogo key={brand.alt} {...brand} />
          ))}
        </div>
      </div>
    </div>
  );
}
