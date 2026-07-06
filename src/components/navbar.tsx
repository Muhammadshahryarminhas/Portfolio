"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BookCallButton } from "@/components/book-call-button";
import { assets } from "@/config/assets";
import { heroNavLinks, siteConfig } from "@/config/site";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 10;

function MenuIcon() {
  return (
    <Image src={assets.menuIcon} alt="" width={24} height={24} className="size-6" />
  );
}

type NavbarProps = {
  linkPrefix?: string;
};

export function Navbar({ linkPrefix = "" }: NavbarProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const isCompact = scrolled || !isDesktop;
  const showInlineNav = menuOpen || !isCompact;
  const showMenuIcon = isCompact && !showInlineNav;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
      if (!window.matchMedia("(min-width: 768px)").matches) {
        setMenuOpen(false);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (menuOpen && !headerRef.current?.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [menuOpen]);

  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      ref={headerRef}
      className={cn(
        "inset-x-0 top-0 z-50 flex flex-col items-center px-4 pt-5",
        scrolled ? "fixed" : "absolute"
      )}
      onMouseLeave={() => isCompact && closeMenu()}
    >
      <nav
        className={cn(
          "relative z-10 flex shrink-0",
          "border border-white/40 bg-white/30",
          "backdrop-blur-sm backdrop-saturate-150",
          isDesktop
            ? cn(
                "items-center min-h-[77px] rounded-full p-[18px]",
                "transition-[width] duration-500 ease-in-out",
                showInlineNav ? "w-[640px]" : "w-[320px]",
                "max-w-[calc(100%-2rem)]"
              )
            : cn(
                "w-full max-w-[calc(100vw-2rem)]",
                "transition-[padding,border-radius] duration-300 ease-in-out",
                showInlineNav
                  ? "flex-col items-stretch gap-4 rounded-3xl p-4 max-w-[min(100%,24rem)]"
                  : "items-center rounded-full p-3 min-h-[60px] max-w-[min(100%,20rem)] sm:max-w-[320px] sm:min-h-[77px] sm:p-[18px]"
              )
        )}
        onMouseEnter={() => isCompact && isDesktop && openMenu()}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-linear-to-br from-white/80 via-white/15 to-transparent opacity-35"
        />

        {isDesktop ? (
          <>
            <Link href="/" className="relative z-10 flex min-w-0 shrink-0 items-center gap-2.5">
              <div className="relative size-[56px] shrink-0 overflow-hidden rounded-full">
                <Image
                  src={assets.avatar}
                  alt={siteConfig.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate text-lg font-semibold leading-tight text-neutral-900">
                  {siteConfig.name}
                </p>
                <p className="truncate text-md text-neutral-500">{siteConfig.links.email}</p>
              </div>
            </Link>

            <div
              className={cn(
                "absolute top-1/2 right-[18px] z-10 flex w-auto -translate-y-1/2 items-center gap-5",
                "transition-opacity duration-200",
                showInlineNav
                  ? "pointer-events-auto opacity-100 delay-150"
                  : "pointer-events-none opacity-0"
              )}
            >
              <ul className="flex items-center gap-5">
                {heroNavLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={`${linkPrefix}${href}`}
                      onClick={closeMenu}
                      className="whitespace-nowrap text-lg font-medium text-neutral-900/70 transition-colors hover:text-neutral-900"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
              <BookCallButton variant="lime" size="pill-lg" className="h-14" onClick={closeMenu}>
                Book a call
              </BookCallButton>
            </div>

            <button
              type="button"
              className={cn(
                "absolute top-1/2 right-[18px] z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full",
                "transition-opacity duration-150",
                showMenuIcon
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0"
              )}
              onClick={openMenu}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              tabIndex={showMenuIcon ? 0 : -1}
            >
              <MenuIcon />
            </button>
          </>
        ) : (
          <>
            <div className="flex w-full items-center justify-between gap-2">
              <Link href="/" className="relative z-10 flex min-w-0 shrink items-center gap-2 sm:gap-2.5">
                <div className="relative size-10 shrink-0 overflow-hidden rounded-full sm:size-[56px]">
                  <Image
                    src={assets.avatar}
                    alt={siteConfig.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 40px, 56px"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-base font-semibold leading-tight text-neutral-900 sm:text-lg">
                    {siteConfig.name}
                  </p>
                  <p className="hidden truncate text-sm text-neutral-500 sm:block sm:text-md">
                    {siteConfig.links.email}
                  </p>
                </div>
              </Link>

              <button
                type="button"
                className={cn(
                  "relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full",
                  "transition-opacity duration-150",
                  showMenuIcon
                    ? "pointer-events-auto opacity-100"
                    : "pointer-events-none opacity-0"
                )}
                onClick={openMenu}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                tabIndex={showMenuIcon ? 0 : -1}
              >
                <MenuIcon />
              </button>
            </div>

            <div
              className={cn(
                "z-10 w-full transition-opacity duration-200",
                showInlineNav ? "flex flex-col items-center gap-4" : "hidden"
              )}
            >
              <ul className="flex flex-col items-center gap-3">
                {heroNavLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={`${linkPrefix}${href}`}
                      onClick={closeMenu}
                      className="whitespace-nowrap text-base font-medium text-neutral-900/70 transition-colors hover:text-neutral-900 sm:text-lg"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
              <BookCallButton
                variant="lime"
                size="pill-lg"
                className="h-11 w-full sm:h-12"
                onClick={closeMenu}
              >
                Book a call
              </BookCallButton>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
