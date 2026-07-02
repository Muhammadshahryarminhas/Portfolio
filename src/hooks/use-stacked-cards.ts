"use client";

import { useEffect, useRef, useState } from "react";

const STACK = {
  scaleStep: 0.05,
  rotateOdd: 2.01,
  rotateEven: -2.4,
} as const;

export type StackScrollState = {
  frontIndex: number;
  transitionT: number;
};

export function useStackedCards(cardCount: number, stepPx: number, headerOffset = 180) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<StackScrollState>({
    frontIndex: 0,
    transitionT: 0,
  });

  useEffect(() => {
    const update = () => {
      const container = containerRef.current;
      if (!container) return;

      const scrolled = window.scrollY - container.offsetTop - headerOffset;
      const intoStack = Math.max(0, scrolled);

      let frontIndex = 0;
      let transitionT = 0;

      for (let i = 0; i < cardCount - 1; i++) {
        const start = i * stepPx;
        const end = (i + 1) * stepPx;

        if (intoStack >= end) {
          frontIndex = i + 1;
          continue;
        }

        if (intoStack > start) {
          frontIndex = i;
          transitionT = (intoStack - start) / stepPx;
          break;
        }
      }

      setState({ frontIndex, transitionT });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [cardCount, stepPx, headerOffset]);

  return { containerRef, ...state };
}

export function getCardTransform(
  index: number,
  { frontIndex, transitionT }: StackScrollState
) {
  if (index > frontIndex + 1) {
    return { scale: 1, rotate: 0 };
  }

  if (index < frontIndex) {
    const depth = frontIndex - index;
    return {
      scale: 1 - depth * STACK.scaleStep,
      rotate: depth % 2 === 1 ? STACK.rotateOdd : STACK.rotateEven,
    };
  }

  if (index === frontIndex && transitionT > 0) {
    return {
      scale: 1 - transitionT * STACK.scaleStep,
      rotate: transitionT * (index % 2 === 0 ? STACK.rotateOdd : STACK.rotateEven),
    };
  }

  return { scale: 1, rotate: 0 };
}

export function getCardZIndex(index: number, { frontIndex, transitionT }: StackScrollState) {
  if (index < frontIndex) return 10 + index;
  if (index === frontIndex) return 20 + index;
  if (index === frontIndex + 1 && transitionT > 0) return 30 + index;
  return 10 + index;
}
