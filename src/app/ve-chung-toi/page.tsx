import { Navbar } from "@/components/public/Navbar";
import { HistoryHero } from "@/components/public/history/HistoryHero";
import { HistoryTimeline } from "@/components/public/history/HistoryTimeline";
import { HistoryGallery } from "@/components/public/history/HistoryGallery";
import { Footer } from "@/components/public/Footer";
import { ZaloFloatButton } from "@/components/public/ZaloFloatButton";

export default function VeChungToiPage() {
  return (
    <>
      <Navbar />
      <main>
        <HistoryHero />
        <HistoryTimeline />
        <HistoryGallery />
      </main>
      <Footer />
      <ZaloFloatButton />
    </>
  );
}
