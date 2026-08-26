import type { Metadata } from "next";
import { Navbar } from "@/components/public/Navbar";
import { NewsContainer } from "@/components/public/news/NewsContainer";
import { Footer } from "@/components/public/Footer";
import { ZaloFloatButton } from "@/components/public/ZaloFloatButton";
import { getPublishedNewsListService } from "@/services/news";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Tin Tức",
  description: "Tin tức và các hoạt động Phật sự mới nhất tại Linh Quang Tịnh Xá.",
  keywords: ["tin tức Phật sự", "hoạt động tịnh xá", "Linh Quang Tịnh Xá", "Tịnh Xá Linh Quang"],
};

export default async function TinTucPage() {
  const news = await getPublishedNewsListService();

  return (
    <>
      <Navbar />
      <main>
        <NewsContainer news={news} />
      </main>
      <Footer />
      <ZaloFloatButton />
    </>
  );
}
