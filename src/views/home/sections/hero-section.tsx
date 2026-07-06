import Image from "next/image";
import { BookCallButton } from "@/components/book-call-button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import { HeroSocialProof } from "@/views/home/sections/hero-social-proof";
import { assets } from "@/config/assets";
import { heroFeatures, siteConfig } from "@/config/site";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden">
      <Image
        src="/images/hero-bg.jpeg"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      <Navbar />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pt-28 pb-16 text-center sm:pt-32 md:px-8 md:py-32">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 sm:gap-5 md:gap-6">
          <p className="text-base font-normal text-neutral-800 sm:text-lg md:text-xl">
            👋 Hey, I&apos;m <span className="font-semibold">{siteConfig.shortName}</span>
          </p>

          <h1 className="text-2xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-3xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.15]">
            Tired of generic AI designs? Let&apos;s elevate your MVP to a sleek,
            investor-ready solution.
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-[#373737] sm:text-lg md:text-xl">
            Transform your AI-powered designs into a polished product that demonstrates
            your execution skills, helping you secure funding and launch confidently.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {heroFeatures.map((feature) => (
              <Badge
                key={feature}
                variant="outline"
                className="gap-1 rounded-md border-[#F2F2F2] bg-white/50 px-3 py-3 text-sm font-medium text-[#373737] sm:gap-1.5 sm:px-4 sm:py-4 sm:text-md md:py-6"
              >
                <Image
                  src={assets.tick}
                  alt=""
                  width={18}
                  height={18}
                  className="size-4 shrink-0 sm:size-[18px]"
                />
                {feature}
              </Badge>
            ))}
          </div>

          <div className="flex w-full max-w-sm flex-col items-stretch gap-2.5 pt-2 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3">
            <BookCallButton variant="hero-dark" size="pill-lg" className="h-14">
              LET&apos;S START PROJECT DISCUSSION
            </BookCallButton>
            <Button render={<a href="#projects" />} variant="lime" size="pill-lg" className="h-14">
              VIEW PROJECTS
            </Button>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-full overflow-hidden pb-8 md:pb-12">
        <HeroSocialProof />
      </div>
    </section>
  );
}
