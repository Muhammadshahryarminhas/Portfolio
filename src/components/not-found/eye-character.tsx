"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const EYE_LOOK_X = 30;
const PUPIL_LOOK_X = 55;

function useEyeAnimation(
  eyeRef: React.RefObject<HTMLDivElement | null>,
  pupilRef: React.RefObject<HTMLDivElement | null>,
  pupilOffset: number
) {
  useEffect(() => {
    const eye = eyeRef.current;
    const pupil = pupilRef.current;
    if (!eye || !pupil) return;

    gsap.set([eye, pupil], { transformOrigin: "center center" });

    const tl = gsap.timeline({ repeat: -1, duration: 2 });

    tl.to(eye, { x: -EYE_LOOK_X, duration: 0.5, ease: "power2.inOut" }, 0)
      .to(pupil, { x: -pupilOffset, duration: 0.5, ease: "power2.inOut" }, 0)
      .to(eye, { x: EYE_LOOK_X, duration: 0.35, ease: "power2.inOut" }, 0.5)
      .to(pupil, { x: pupilOffset, duration: 0.35, ease: "power2.inOut" }, 0.5)
      .to(eye, { x: 0, duration: 0.3, ease: "power2.inOut" }, 1.2)
      .to(pupil, { x: 0, duration: 0.3, ease: "power2.inOut" }, 1.2)
      .to(eye, { scaleY: 0.238, duration: 0.04, ease: "none" }, 1.95)
      .to(pupil, { scaleY: 0.238, duration: 0.04, ease: "none" }, 1.95)
      .to(eye, { scaleY: 0.05, duration: 0.02, ease: "none" }, 1.99)
      .to(pupil, { scaleY: 0.05, duration: 0.02, ease: "none" }, 1.99)
      .to(eye, { scaleY: 1, duration: 0.01, ease: "none" }, 2)
      .to(pupil, { scaleY: 1, duration: 0.01, ease: "none" }, 2);

    return () => {
      tl.kill();
    };
  }, [eyeRef, pupilRef, pupilOffset]);
}

function Eye({
  eyeSrc,
  pupilSrc,
  pupilOffset,
}: {
  eyeSrc: string;
  pupilSrc: string;
  pupilOffset: number;
}) {
  const eyeRef = useRef<HTMLDivElement>(null);
  const pupilRef = useRef<HTMLDivElement>(null);

  useEyeAnimation(eyeRef, pupilRef, pupilOffset);

  return (
    <div className="relative h-[120px] w-[88px] sm:h-[180px] sm:w-[132px] md:h-[240px] md:w-[176px] lg:h-[324px] lg:w-[236px]">
      <div ref={eyeRef} className="absolute inset-0">
        <Image src={eyeSrc} alt="" fill className="object-contain" sizes="236px" />
      </div>
      <div
        ref={pupilRef}
        className="absolute top-[36%] left-1/2 size-[28px] -translate-x-1/2 sm:size-[40px] md:size-[54px] lg:size-[93px]"
      >
        <Image src={pupilSrc} alt="" fill className="object-contain" sizes="93px" />
      </div>
    </div>
  );
}

export function EyeCharacter() {
  return (
    <div className="pointer-events-none absolute inset-x-0 -bottom-50 flex justify-center overflow-hidden md:-bottom-90">
      <div className="relative w-[110vw]">
        <Image
          src="/images/404/dome.svg"
          alt=""
          width={1991}
          height={1511}
          className="h-auto w-full translate-y-[50%]"
          priority
        />
        <div className="absolute inset-x-0 bottom-[25%] flex items-end justify-center gap-[6vw] sm:gap-[8vw] md:gap-[10vw]">
          <Eye
            eyeSrc="/images/404/eye-left.svg"
            pupilSrc="/images/404/pupil-left.svg"
            pupilOffset={PUPIL_LOOK_X}
          />
          <Eye
            eyeSrc="/images/404/eye-right.svg"
            pupilSrc="/images/404/pupil-right.svg"
            pupilOffset={PUPIL_LOOK_X}
          />
        </div>
      </div>
    </div>
  );
}
