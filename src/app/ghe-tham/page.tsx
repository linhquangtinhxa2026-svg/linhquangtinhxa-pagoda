import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Ghé Thăm",
  description:
    "Thông tin hướng dẫn ghé thăm Linh Quang Tịnh Xá: giờ mở cửa, lịch sinh hoạt, các hoạt động thường niên và quy tắc ứng xử khi viếng chùa.",
  keywords: ["ghé thăm chùa", "giờ mở cửa tịnh xá", "lịch sinh hoạt Phật sự", "Linh Quang Tịnh Xá", "Tịnh Xá Linh Quang"],
};

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
