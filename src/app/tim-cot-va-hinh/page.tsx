import type { Metadata } from "next";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { TimCotVaHinhHero } from "@/components/public/tim-cot-va-hinh/TimCotVaHinhHero";
import { TimCotVaHinhContainer } from "@/components/public/tim-cot-va-hinh/TimCotVaHinhContainer";
import { ZaloFloatButton } from "@/components/public/ZaloFloatButton";

export const metadata: Metadata = {
  title: "Tìm Cốt và Hình",
  description:
    "Tra cứu thông tin lưu cốt và hình thờ tại Linh Quang Tịnh Xá để biết chính xác vị trí.",
  keywords: ["tìm cốt", "tra cứu hình thờ", "lưu cốt tịnh xá", "Linh Quang Tịnh Xá", "Tịnh Xá Linh Quang"],
};

export default function TimCotVaHinhPage() {
  return (
    <>
      <Navbar />
      <main>
        <TimCotVaHinhHero />
        <TimCotVaHinhContainer />
      </main>
      <Footer />
      <ZaloFloatButton />
    </>
  );
}
