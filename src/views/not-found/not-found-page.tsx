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
    <div className="relative flex h-svh flex-col overflow-hidden bg-[#bee5f8]">
      <Image
        src="/images/404/bg-texture.png"
        alt=""
        fill
        className="object-cover opacity-10"
        sizes="100vw"
        priority
      />

      <Navbar linkPrefix="/" />

      <main className="relative z-10 mx-auto flex w-full max-w-[396px] flex-1 -translate-y-35 flex-col items-center justify-center gap-8 px-4 text-center md:max-w-[874px] md:translate-y-0 md:gap-8 md:px-8 md:pb-[42vh]">
        <h1 className="w-full text-[32px] font-semibold leading-[1.2] tracking-[-1px] text-black md:text-5xl md:leading-tight md:tracking-tight">
          Oh sure, I bet you&apos;re searching for something that doesn&apos;t even exist.
        </h1>

        <div className="flex w-full flex-col gap-2.5 md:max-w-none md:flex-row md:flex-wrap md:items-center md:justify-center">
          <Button render={<Link href="/" />} variant="lime" size="pill-lg" className="h-14 w-full md:w-auto">
            GO TO HOME PAGE
          </Button>
          <Button
            render={<a href={`mailto:${siteConfig.links.email}`} />}
            variant="hero-dark"
            size="pill-lg"
            className="h-14 w-full md:w-auto md:whitespace-nowrap"
          >
            SEND ME AN EMAIL TO DISCUSS
          </Button>
        </div>

        <p className="w-full text-[21px] leading-[1.2] tracking-tight text-black">
          <span className="font-bold">Today&apos;s Motivation</span>{" "}
          <span className="font-normal">&ldquo;{motivation}&rdquo;</span>
        </p>
      </main>

      <EyeCharacter />
    </div>
  );
}
