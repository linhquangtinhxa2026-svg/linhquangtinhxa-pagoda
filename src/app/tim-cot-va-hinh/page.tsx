import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { TimCotVaHinhHero } from "@/components/public/tim-cot-va-hinh/TimCotVaHinhHero";
import { TimCotVaHinhContainer } from "@/components/public/tim-cot-va-hinh/TimCotVaHinhContainer";
import { ZaloFloatButton } from "@/components/public/ZaloFloatButton";

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
