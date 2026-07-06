import { HeroSection } from "@/views/home/sections/hero-section";
import { SelectedSnapsSection } from "@/views/home/sections/selected-snaps-section";
import { ProjectsStackSection } from "@/views/home/sections/projects-stack-section";
import { ReviewsSection } from "@/views/home/sections/reviews-section";
import { ProfileSection } from "@/views/home/sections/profile-section";
import { PricingSection } from "@/views/home/sections/pricing-section";
import { FaqSection } from "@/views/home/sections/faq-section";
import {
  FOOTER_REVEAL_HEIGHT,
  FooterSection,
} from "@/views/home/sections/footer-section";

export function HomePage() {
  return (
    <>
      <div className="relative z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <HeroSection />
          <SelectedSnapsSection />
          <ProjectsStackSection />
          <ProfileSection />
          <ReviewsSection />
          <PricingSection />
          <FaqSection />
        </div>
        <div aria-hidden className="w-full" style={{ height: FOOTER_REVEAL_HEIGHT }} />
      </div>
      <FooterSection />
    </>
  );
}
