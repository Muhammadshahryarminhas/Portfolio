"use client";

import { useEffect, useState } from "react";
import { HomePage } from "@/views/home/home-page";

export default function Home() {
  const [hideOverlay, setHideOverlay] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    let done = false;
    let total = 0;
    let loadedAtDone = 0;
    let freezeTotalAtDone = 0;
    let doneAt = 0;
    const MAX_AFTER_LOAD_MS = 2000;

    const measureTotal = () => {
      total = Array.from(document.images).filter((img) => !img.hasAttribute("data-no-loader")).length;
    };

    // `complete` also becomes true for errored images; treat as "loaded" to avoid hanging.
    const isImageLoaded = (img: HTMLImageElement) => img.complete;

    measureTotal();

    const mo = new MutationObserver(() => measureTotal());
    mo.observe(document.documentElement, { subtree: true, childList: true, attributes: true });

    const markDone = () => {
      done = true;
      doneAt = performance.now();

      const imgs = Array.from(document.images).filter((img) => !img.hasAttribute("data-no-loader"));
      freezeTotalAtDone = imgs.length;
      loadedAtDone = imgs.reduce((acc, img) => acc + (isImageLoaded(img) ? 1 : 0), 0);
      mo.disconnect(); // stop inflating total after window load
    };

    if (document.readyState === "complete") markDone();
    else window.addEventListener("load", markDone, { once: true });

    const tick = () => {
      const imgs = Array.from(document.images).filter((img) => !img.hasAttribute("data-no-loader"));
      const currentTotal = done ? freezeTotalAtDone : Math.max(total, imgs.length);
      const loaded = imgs.reduce((acc, img) => acc + (isImageLoaded(img) ? 1 : 0), 0);

      const ratio = currentTotal > 0 ? loaded / currentTotal : 0;
      const next = done ? 100 : Math.min(99, Math.round(ratio * 100));
      setProgress((p) => (p === next ? p : next));

      if (
        done &&
        (loaded >= currentTotal ||
          loadedAtDone >= currentTotal ||
          performance.now() - doneAt >= MAX_AFTER_LOAD_MS)
      ) {
        setExiting(true);
        window.setTimeout(() => setHideOverlay(true), 520);
        return;
      }

      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("load", markDone);
      mo.disconnect();
    };
  }, []);

  const isLoading = !hideOverlay;

  return (
    <>
      <HomePage />

      {isLoading && (
        <div
          className="pointer-events-none fixed inset-0 z-9999 bg-white transition-transform duration-500 ease-out"
          style={exiting ? { transform: "translateY(48px)" } : { transform: "translateY(0px)" }}
        >
          <div className="absolute right-6 top-6 select-none text-[72px] font-semibold leading-none tracking-[-0.04em] text-black md:right-10 md:top-10 md:text-[96px]">
            {progress}%
          </div>
        </div>
      )}
    </>
  );
}
