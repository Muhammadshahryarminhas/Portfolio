import { HeroSection } from "@/views/home/sections/hero-section";
import { SelectedSnapsSection } from "@/views/home/sections/selected-snaps-section";
import { ProjectsStackSection } from "@/views/home/sections/projects-stack-section";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <SelectedSnapsSection />
      <ProjectsStackSection />
    </>
  );
}
