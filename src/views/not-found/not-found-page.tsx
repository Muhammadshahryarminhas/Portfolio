import Image from "next/image";
import Link from "next/link";
import { EyeCharacter } from "@/components/not-found/eye-character";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { getDailyMotivation } from "@/lib/daily-motivation";

export async function NotFoundPage() {
  const motivation = await getDailyMotivation();

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#bee5f8]">
      <Image
        src="/images/404/bg-texture.png"
        alt=""
        fill
        className="object-cover opacity-10"
        sizes="100vw"
        priority
      />

      <p
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center -translate-y-[8%] select-none text-[clamp(12rem,40vw,48rem)] font-bold leading-none tracking-tighter text-black/[0.02]"
      >
        404
      </p>

      <Navbar linkPrefix="/" />

      <main className="relative z-10 mx-auto flex w-full max-w-[874px] flex-1 flex-col items-center gap-8 px-4 pt-32 pb-[42vh] text-center md:pt-40">
        <h1 className="text-3xl font-semibold leading-tight tracking-tight text-black md:text-5xl">
          Oh sure, I bet you&apos;re searching for something that doesn&apos;t even exist.
        </h1>



        <p className="text-xl tracking-tight text-black md:text-[28px]">
          <span className="font-bold">Todays Motivation</span>{" "}
          <span className="font-normal">&ldquo;{motivation}&rdquo;</span>
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <Button render={<Link href="/" />} variant="lime" size="pill-lg" className="h-14">
            Go to Home Page
          </Button>
          <Button
            render={<a href={`mailto:${siteConfig.links.email}`} />}
            variant="hero-dark"
            size="pill-lg"
            className="h-14"
          >
            Send me an Email to discuss
          </Button>
        </div>
      </main>

      <EyeCharacter />
    </div>
  );
}
