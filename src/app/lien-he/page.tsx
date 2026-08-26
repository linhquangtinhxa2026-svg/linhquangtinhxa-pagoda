import type { Metadata } from "next";
import { Navbar } from "@/components/public/Navbar";
import { ContactHero } from "@/components/public/contact/ContactHero";
import { MastersSection } from "@/components/public/contact/MastersSection";
import { BranchPagodasSection } from "@/components/public/contact/BranchPagodasSection";
import { PagodaGallery } from "@/components/public/contact/PagodaGallery";
import { ContactSection } from "@/components/public/contact/ContactSection";
import { Footer } from "@/components/public/Footer";
import { ZaloFloatButton } from "@/components/public/ZaloFloatButton";

export const metadata: Metadata = {
  title: "Liên Hệ",
  description:
    "Liên hệ Linh Quang Tịnh Xá: thông tin chư tôn đức, các tịnh xá chi nhánh, hình ảnh và biểu mẫu liên hệ.",
  keywords: ["liên hệ Linh Quang Tịnh Xá", "liên hệ Tịnh Xá Linh Quang", "chi nhánh tịnh xá", "địa chỉ chùa Quận 4"],
};

export default function LienHePage() {
  return (
    <>
      <Navbar />
      <main>
        <ContactHero />
        <MastersSection />
        <BranchPagodasSection />
        <PagodaGallery />
        <ContactSection />
      </main>
      <Footer />
      <ZaloFloatButton />
    </>
  );
}
