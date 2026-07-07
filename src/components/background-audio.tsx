"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const VIDEO_ID = "jrFI71IonJ0";
const YT_SCRIPT_ID = "youtube-iframe-api";
const CROSSFADE_MS = 1400;
const CROP_END_SEC = 1;
const POLL_MS = 120;

type YTPlayer = {
  mute: () => void;
  unMute: () => void;
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  setVolume: (volume: number) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  destroy: () => void;
};

type YTPlayerEvent = { target: YTPlayer };

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string,
        config: {
          height?: string;
          width?: string;
          videoId: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: (event: YTPlayerEvent) => void;
          };
        }
      ) => YTPlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

function applyVolumes(players: [YTPlayer | null, YTPlayer | null], active: number, muted: boolean) {
  players.forEach((player, i) => {
    if (!player) return;
    if (muted) {
      player.mute();
      return;
    }
    player.unMute();
    player.setVolume(i === active ? 100 : 0);
  });
}

export function BackgroundAudio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const playersRef = useRef<[YTPlayer | null, YTPlayer | null]>([null, null]);
  const activeRef = useRef(0);
  const crossfadingRef = useRef(false);
  const mutedRef = useRef(false);
  const [muted, setMuted] = useState(false);
  const [ready, setReady] = useState(false);

  const startCrossfade = useCallback(() => {
    if (crossfadingRef.current) return;

    const currentIdx = activeRef.current;
    const nextIdx = 1 - currentIdx;
    const current = playersRef.current[currentIdx];
    const next = playersRef.current[nextIdx];
    if (!current || !next) return;

    crossfadingRef.current = true;
    next.seekTo(0, true);
    next.setVolume(0);
    next.playVideo();

    const start = performance.now();

    const fade = (now: number) => {
      const t = Math.min(1, (now - start) / CROSSFADE_MS);
      const outVol = Math.round(100 * (1 - t));
      const inVol = Math.round(100 * t);

      if (!mutedRef.current) {
        current.setVolume(outVol);
        next.setVolume(inVol);
      }

      if (t < 1) {
        requestAnimationFrame(fade);
        return;
      }

      current.pauseVideo();
      current.setVolume(0);
      if (!mutedRef.current) next.setVolume(100);
      activeRef.current = nextIdx;
      crossfadingRef.current = false;
    };

    requestAnimationFrame(fade);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let readyCount = 0;

    const onPlayerReady = (index: 0 | 1, player: YTPlayer) => {
      if (cancelled) return;

      playersRef.current[index] = player;
      readyCount += 1;

      if (readyCount < 2) return;

      applyVolumes(playersRef.current, 0, mutedRef.current);
      playersRef.current[0]?.playVideo();
      playersRef.current[1]?.pauseVideo();
      setReady(true);
    };

    const createPlayers = () => {
      if (cancelled || !window.YT || !containerRef.current) return;
      if (playersRef.current[0] || playersRef.current[1]) return;

      (["a", "b"] as const).forEach((suffix, index) => {
        const mount = document.createElement("div");
        mount.id = `yt-bg-player-${suffix}`;
        containerRef.current!.appendChild(mount);

        new window.YT!.Player(`yt-bg-player-${suffix}`, {
          height: "1",
          width: "1",
          videoId: VIDEO_ID,
          playerVars: {
            autoplay: index === 0 ? 1 : 0,
            controls: 0,
            disablekb: 1,
            enablejsapi: 1,
            fs: 0,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
          },
          events: {
            onReady: (event) => onPlayerReady(index as 0 | 1, event.target),
          },
        });
      });
    };

    if (window.YT?.Player) {
      createPlayers();
    } else {
      const prevReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prevReady?.();
        createPlayers();
      };

      if (!document.getElementById(YT_SCRIPT_ID)) {
        const script = document.createElement("script");
        script.id = YT_SCRIPT_ID;
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        document.body.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
      playersRef.current.forEach((player) => player?.destroy());
      playersRef.current = [null, null];
    };
  }, []);

  useEffect(() => {
    if (!ready) return;

    const tick = () => {
      if (crossfadingRef.current) return;

      const active = playersRef.current[activeRef.current];
      if (!active) return;

      const duration = active.getDuration();
      const current = active.getCurrentTime();
      if (!duration || duration <= 0) return;

      const effectiveEnd = duration - CROP_END_SEC;
      if (effectiveEnd - current <= CROSSFADE_MS / 1000 + 0.05) {
        startCrossfade();
      }
    };

    const id = window.setInterval(tick, POLL_MS);
    return () => window.clearInterval(id);
  }, [ready, startCrossfade]);

  useEffect(() => {
    if (!ready) return;

    const resumeOnInteraction = () => {
      applyVolumes(playersRef.current, activeRef.current, mutedRef.current);
      playersRef.current[activeRef.current]?.playVideo();
    };

    window.addEventListener("pointerdown", resumeOnInteraction, { once: true });
    return () => window.removeEventListener("pointerdown", resumeOnInteraction);
  }, [ready]);

  const toggleMute = () => {
    if (!ready) return;

    const next = !muted;
    mutedRef.current = next;
    setMuted(next);
    applyVolumes(playersRef.current, activeRef.current, next);
    if (!next) playersRef.current[activeRef.current]?.playVideo();
  };

  return (
    <>
      <div
        ref={containerRef}
        className="pointer-events-none fixed left-[-9999px] h-px w-px overflow-hidden opacity-0"
        aria-hidden
      />

      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? "Unmute background audio" : "Mute background audio"}
        className="fixed bottom-6 left-6 z-50 flex size-12 items-center justify-center rounded-full bg-white text-black shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.16)]"
      >
        {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
      </button>
    </>
  );
}
