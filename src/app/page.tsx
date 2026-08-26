import type { Metadata } from "next";
import { Navbar } from "@/components/public/Navbar";
import { HeroSection } from "@/components/public/HeroSection";
import { AboutSection } from "@/components/public/AboutSection";
import { ActivitiesSection } from "@/components/public/ActivitiesSection";
import { MastersTeaser } from "@/components/public/MastersTeaser";
import { GalleryPreview } from "@/components/public/GalleryPreview";
import { VisitTeaser } from "@/components/public/VisitTeaser";
import { Footer } from "@/components/public/Footer";
import { ZaloFloatButton } from "@/components/public/ZaloFloatButton";

export const metadata: Metadata = {
  title: "Trang Chủ",
  description:
    "Linh Quang Tịnh Xá - chốn thanh tịnh tu học Phật pháp tại Quận 4, TP. Hồ Chí Minh, thành lập năm 1953. Tìm hiểu về lịch sử, chư tôn đức và các hoạt động Phật sự.",
  keywords: ["Linh Quang Tịnh Xá", "Tịnh Xá Linh Quang", "chùa Quận 4", "tu học Phật pháp", "Phật giáo TP.HCM"],
};

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
