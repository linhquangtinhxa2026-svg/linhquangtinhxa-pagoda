import type { Metadata } from "next";
import { Navbar } from "@/components/public/Navbar";
import { HistoryHero } from "@/components/public/history/HistoryHero";
import { HistoryTimeline } from "@/components/public/history/HistoryTimeline";
import { HistoryGallery } from "@/components/public/history/HistoryGallery";
import { Footer } from "@/components/public/Footer";
import { ZaloFloatButton } from "@/components/public/ZaloFloatButton";

export const metadata: Metadata = {
  title: "Về Chúng Tôi",
  description:
    "Lịch sử hình thành và phát triển Linh Quang Tịnh Xá từ năm 1953 đến nay, cùng những dấu mốc quan trọng qua các thời kỳ.",
  keywords: ["lịch sử Linh Quang Tịnh Xá", "lịch sử Tịnh Xá Linh Quang", "về chúng tôi", "chùa Quận 4 lịch sử"],
};

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
