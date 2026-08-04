import { Navbar } from "@/components/public/Navbar";
import { HeroSection } from "@/components/public/HeroSection";
import { AboutSection } from "@/components/public/AboutSection";
import { ActivitiesSection } from "@/components/public/ActivitiesSection";
import { MastersTeaser } from "@/components/public/MastersTeaser";
import { GalleryPreview } from "@/components/public/GalleryPreview";
import { VisitTeaser } from "@/components/public/VisitTeaser";
import { Footer } from "@/components/public/Footer";
import { ZaloFloatButton } from "@/components/public/ZaloFloatButton";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ActivitiesSection />
        <MastersTeaser />
        <GalleryPreview />
        <VisitTeaser />
      </main>
      <Footer />
      <ZaloFloatButton />
    </>
  );
}
