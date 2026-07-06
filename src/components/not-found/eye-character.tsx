"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const PUPIL_MAX = 55;

function useEyeBlink(
  eyeRef: React.RefObject<HTMLDivElement | null>,
  pupilRef: React.RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    const eye = eyeRef.current;
    const pupil = pupilRef.current;
    if (!eye || !pupil) return;

    gsap.set([eye, pupil], { transformOrigin: "center center" });

    const blink = gsap.timeline({ repeat: -1, repeatDelay: 2.94 });
    blink
      .to([eye, pupil], { scaleY: 0.238, duration: 0.04, ease: "none" })
      .to([eye, pupil], { scaleY: 0.05, duration: 0.02, ease: "none" })
      .to([eye, pupil], { scaleY: 1, duration: 0.01, ease: "none" });

    return () => {
      blink.kill();
    };
  }, [eyeRef, pupilRef]);
}

function useEyePairTracking(
  leftEyeRef: React.RefObject<HTMLDivElement | null>,
  leftPupilRef: React.RefObject<HTMLDivElement | null>,
  rightEyeRef: React.RefObject<HTMLDivElement | null>,
  rightPupilRef: React.RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    const leftEye = leftEyeRef.current;
    const leftPupil = leftPupilRef.current;
    const rightEye = rightEyeRef.current;
    const rightPupil = rightPupilRef.current;
    if (!leftEye || !leftPupil || !rightEye || !rightPupil) return;

    const setLeftX = gsap.quickTo(leftPupil, "x", { duration: 0.18, ease: "power3.out" });
    const setLeftY = gsap.quickTo(leftPupil, "y", { duration: 0.18, ease: "power3.out" });
    const setRightX = gsap.quickTo(rightPupil, "x", { duration: 0.18, ease: "power3.out" });
    const setRightY = gsap.quickTo(rightPupil, "y", { duration: 0.18, ease: "power3.out" });

    const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

    const onMove = (e: MouseEvent) => {
      const lr = leftEye.getBoundingClientRect();
      const rr = rightEye.getBoundingClientRect();
      if (lr.width === 0 || rr.width === 0) return;

      const bounds = {
        left: Math.min(lr.left, rr.left),
        top: Math.min(lr.top, rr.top),
        right: Math.max(lr.right, rr.right),
        bottom: Math.max(lr.bottom, rr.bottom),
      };
      const cx = (bounds.left + bounds.right) / 2;
      const cy = (bounds.top + bounds.bottom) / 2;
      const halfW = (bounds.right - bounds.left) / 2;
      const halfH = (bounds.bottom - bounds.top) / 2;

      const normX = clamp((e.clientX - cx) / halfW, -1, 1);
      const normY = clamp((e.clientY - cy) / halfH, -1, 1);

      const leftMax = Math.min(PUPIL_MAX, Math.min(lr.width, lr.height) * 0.14);
      const rightMax = Math.min(PUPIL_MAX, Math.min(rr.width, rr.height) * 0.14);

      setLeftX(normX * leftMax);
      setLeftY(normY * leftMax);
      setRightX(normX * rightMax);
      setRightY(normY * rightMax);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [leftEyeRef, leftPupilRef, rightEyeRef, rightPupilRef]);
}

function Eye({
  eyeRef,
  pupilRef,
  eyeSrc,
  pupilSrc,
  className,
  pupilClassName,
}: {
  eyeRef: React.RefObject<HTMLDivElement | null>;
  pupilRef: React.RefObject<HTMLDivElement | null>;
  eyeSrc: string;
  pupilSrc: string;
  className?: string;
  pupilClassName?: string;
}) {
  useEyeBlink(eyeRef, pupilRef);

  return (
    <div className={className}>
      <div ref={eyeRef} className="absolute inset-0">
        <Image src={eyeSrc} alt="" fill className="object-contain" sizes="236px" />
      </div>
      <div
        ref={pupilRef}
        className={pupilClassName ?? "absolute top-[36%] left-1/2 size-[39%] -translate-x-1/2"}
      >
        <Image src={pupilSrc} alt="" fill className="object-contain" sizes="93px" />
      </div>
    </div>
  );
}

function EyePair({
  leftClassName,
  rightClassName,
  pupilClassName,
}: {
  leftClassName?: string;
  rightClassName?: string;
  pupilClassName?: string;
}) {
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const leftPupilRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);
  const rightPupilRef = useRef<HTMLDivElement>(null);

  useEyePairTracking(leftEyeRef, leftPupilRef, rightEyeRef, rightPupilRef);

  return (
    <>
      <Eye
        eyeRef={leftEyeRef}
        pupilRef={leftPupilRef}
        eyeSrc="/images/404/eye-left.svg"
        pupilSrc="/images/404/pupil-left.svg"
        className={leftClassName}
        pupilClassName={pupilClassName}
      />
      <Eye
        eyeRef={rightEyeRef}
        pupilRef={rightPupilRef}
        eyeSrc="/images/404/eye-right.svg"
        pupilSrc="/images/404/pupil-right.svg"
        className={rightClassName}
        pupilClassName={pupilClassName}
      />
    </>
  );
}

export function EyeCharacter() {
  const mobileDomeRef = useRef<HTMLDivElement>(null);
  const desktopDomeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mobile = mobileDomeRef.current;
    const desktop = desktopDomeRef.current;
    if (!mobile && !desktop) return;

    const setMobileX = mobile ? gsap.quickTo(mobile, "x", { duration: 0.25, ease: "power3.out" }) : null;
    const setMobileY = mobile ? gsap.quickTo(mobile, "y", { duration: 0.25, ease: "power3.out" }) : null;
    const setDesktopX = desktop ? gsap.quickTo(desktop, "x", { duration: 0.25, ease: "power3.out" }) : null;
    const setDesktopY = desktop ? gsap.quickTo(desktop, "y", { duration: 0.25, ease: "power3.out" }) : null;

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;

      const amp = 12; // subtle dome drift
      const x = nx * amp;
      const y = ny * amp;

      setMobileX?.(x);
      setMobileY?.(y);
      setDesktopX?.(x);
      setDesktopY?.(y);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <p
        aria-hidden
        className="pointer-events-none absolute left-1/2 z-[2] -translate-x-1/2 select-none text-[clamp(9rem,55vw,15rem)] font-semibold leading-none tracking-[-0.03em] text-black/[0.02] top-[71.5%] md:hidden"
      >
        404
      </p>

      <p
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 hidden items-center justify-center -translate-y-[8%] select-none text-[clamp(8rem,42vw,48rem)] font-bold leading-none tracking-tighter text-black/[0.02] md:flex"
      >
        404
      </p>

      <div
        ref={mobileDomeRef}
        className="pointer-events-none absolute left-1/2 top-[60.5%] z-[5] aspect-[822/624] w-[191vw] -translate-x-1/2 md:hidden"
      >
        <Image
          src="/images/404/dome.svg"
          alt=""
          width={822}
          height={624}
          className="size-full object-contain"
          priority
        />

        <EyePair
          leftClassName="absolute top-[9%] left-[40.9%] h-[20.6%] w-[11.4%] -translate-x-1/2"
          rightClassName="absolute top-[9%] left-[59%] h-[20.6%] w-[11.4%] -translate-x-1/2"
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 -bottom-90 hidden justify-center overflow-hidden md:flex">
        <div ref={desktopDomeRef} className="relative w-[110vw]">
          <Image
            src="/images/404/dome.svg"
            alt=""
            width={1991}
            height={1511}
            className="h-auto w-full translate-y-[50%]"
            priority
          />
          <div className="absolute inset-x-0 bottom-[25%] flex items-end justify-center gap-[10vw]">
            <EyePair
              leftClassName="relative h-[240px] w-[176px] lg:h-[324px] lg:w-[236px]"
              rightClassName="relative h-[240px] w-[176px] lg:h-[324px] lg:w-[236px]"
              pupilClassName="absolute top-[36%] left-1/2 size-[54px] -translate-x-1/2 lg:size-[93px]"
            />
          </div>
        </div>
      </div>
    </>
  );
}
