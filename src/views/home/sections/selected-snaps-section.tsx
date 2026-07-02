"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { assets } from "@/config/assets";

function SnapCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-[280px] w-[min(72vw,524px)] shrink-0 overflow-hidden rounded-[22px] bg-[#f4f4f4] sm:h-[360px] md:h-[449px] md:w-[524px]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-top"
        sizes="(max-width: 768px) 72vw, 524px"
      />
    </div>
  );
}

function MarqueeRow({
  images,
  direction,
}: {
  images: readonly string[];
  direction: "left-to-right" | "right-to-left";
}) {
  return (
    <div className="h-[280px] w-full overflow-hidden sm:h-[360px] md:h-[449px]">
      <div
        className={cn(
          "flex w-max gap-3",
          direction === "left-to-right" ? "animate-marquee-right" : "animate-marquee-left"
        )}
      >
        {[0, 1].map((set) => (
          <div key={set} className="flex gap-3" aria-hidden={set === 1}>
            {images.map((src) => (
              <SnapCard key={`${set}-${src}`} src={src} alt="Project snap" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SelectedSnapsSection() {
  return (
    <section id="selected-snaps" className="w-full bg-white pt-8 pb-14">
      <div className="section-container">
        <div className="w-full pt-4 pb-8">
          <p className="text-left text-2xl font-semibold leading-[1.3] text-[#373737]">
            Selected Snaps
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col gap-3">
        <MarqueeRow images={assets.snaps.rowOne} direction="left-to-right" />
        <MarqueeRow images={assets.snaps.rowTwo} direction="right-to-left" />
      </div>
    </section>
  );
}
