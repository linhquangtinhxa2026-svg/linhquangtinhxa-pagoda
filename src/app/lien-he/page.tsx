import { Navbar } from "@/components/public/Navbar";
import { ContactHero } from "@/components/public/contact/ContactHero";
import { MastersSection } from "@/components/public/contact/MastersSection";
import { BranchPagodasSection } from "@/components/public/contact/BranchPagodasSection";
import { PagodaGallery } from "@/components/public/contact/PagodaGallery";
import { ContactSection } from "@/components/public/contact/ContactSection";
import { Footer } from "@/components/public/Footer";
import { ZaloFloatButton } from "@/components/public/ZaloFloatButton";

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
