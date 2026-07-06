"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookCallButton } from "@/components/book-call-button";
import { reviews } from "@/config/reviews";

function ReviewCard({ review }: { review: (typeof reviews)[number] }) {
  const [expanded, setExpanded] = useState(false);
  const canExpand = review.truncated && "preview" in review;
  const text =
    canExpand && !expanded ? review.preview : review.quote;

  return (
    <div className="flex w-[408px] shrink-0 flex-col gap-3 rounded-2xl bg-[#fafafa] p-12">
      <div className="flex items-start gap-2.5">
        <span className="relative size-[42px] shrink-0 overflow-hidden rounded-2xl border-[1.778px] border-white">
          <Image src={review.avatar} alt={review.name} fill className="object-cover" sizes="42px" />
        </span>
        <span className="flex min-w-0 flex-col justify-center gap-0.5">
          <span className="text-lg font-medium leading-[1.4] text-black">{review.name}</span>
          <span className="text-sm leading-[1.4] text-[#373737]">{review.role}</span>
        </span>
      </div>

      <div className="h-px w-full bg-[#ececec]" />

      <p className="whitespace-pre-line text-lg leading-[1.4] text-black">
        {text}
        {canExpand && (
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="text-[#717171] hover:text-black"
          >
            {expanded ? " .. Less" : " .. More"}
          </button>
        )}
      </p>
    </div>
  );
}

export function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    const headerRow = headerRowRef.current;

    if (!section || !pin || !track || !headerRow) return;

    let ctx: gsap.Context | undefined;
    let refreshTimer: ReturnType<typeof setTimeout>;

    const getDistance = () => {
      const lastCard = track.lastElementChild as HTMLElement | null;
      if (!lastCard) return 0;

      const currentX = (gsap.getProperty(track, "x") as number) || 0;
      const trackLeft0 = track.getBoundingClientRect().left - currentX;
      const cardRight0 = trackLeft0 + lastCard.offsetLeft + lastCard.offsetWidth;
      const targetRight = headerRow.getBoundingClientRect().right;

      return Math.max(cardRight0 - targetRight, 0);
    };

    const setup = () => {
      ctx?.revert();
      ctx = gsap.context(() => {
        gsap.set(track, { clearProps: "x" });

        gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            id: "reviews-horizontal",
            trigger: section,
            start: "top top",
            end: () => `+=${Math.max(getDistance(), 1)}`,
            scrub: true,
            pin,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }, section);
    };

    const scheduleSetup = () => {
      clearTimeout(refreshTimer);
      refreshTimer = setTimeout(() => {
        setup();
        ScrollTrigger.refresh();
      }, 80);
    };

    setup();
    scheduleSetup();

    const delays = [150, 500].map((ms) => setTimeout(scheduleSetup, ms));
    window.addEventListener("load", scheduleSetup);
    window.addEventListener("resize", scheduleSetup);

    return () => {
      clearTimeout(refreshTimer);
      delays.forEach(clearTimeout);
      window.removeEventListener("load", scheduleSetup);
      window.removeEventListener("resize", scheduleSetup);
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="reviews" className="bg-white">
      <div ref={pinRef} className="flex h-screen flex-col justify-center gap-14 overflow-hidden py-14">
        <div
          ref={headerRowRef}
          className="mx-auto flex w-full max-w-7xl shrink-0 items-center justify-between gap-6 px-4 md:px-8"
        >
          <h2 className="text-2xl font-semibold leading-[1.2] tracking-[-1px] text-black md:text-[32px]">
            Some words people says about me
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
          ref={trackRef}
          className="flex w-max shrink-0 items-stretch gap-4 pl-[calc(max((100vw-80rem)/2,0px)+1rem)] md:pl-[calc(max((100vw-80rem)/2,0px)+2rem)]"
        >
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
