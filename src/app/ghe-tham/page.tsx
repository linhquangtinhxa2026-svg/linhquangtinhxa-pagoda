import { Navbar } from "@/components/public/Navbar";
import { VisitHero } from "@/components/public/visit/VisitHero";
import { PracticalInfo } from "@/components/public/visit/PracticalInfo";
import { VisitMap } from "@/components/public/visit/VisitMap";
import { VisitActivities } from "@/components/public/visit/VisitActivities";
import { VisitDailySchedule } from "@/components/public/visit/VisitDailySchedule";
import { VisitRecurringActivities } from "@/components/public/visit/VisitRecurringActivities";
import { VisitEtiquette } from "@/components/public/visit/VisitEtiquette";
import { VisitGallery } from "@/components/public/visit/VisitGallery";
import { VisitCta } from "@/components/public/visit/VisitCta";
import { Footer } from "@/components/public/Footer";
import { ZaloFloatButton } from "@/components/public/ZaloFloatButton";

export default function GheThamPage() {
  return (
    <>
      <Navbar />
      <main>
        <VisitHero />
        <PracticalInfo />
        <VisitMap />
        <VisitActivities />
        <VisitDailySchedule />
        <VisitRecurringActivities />
        <VisitEtiquette />
        <VisitGallery />
        <VisitCta />
      </main>
      <Footer />
      <ZaloFloatButton />
    </>
  );
}
