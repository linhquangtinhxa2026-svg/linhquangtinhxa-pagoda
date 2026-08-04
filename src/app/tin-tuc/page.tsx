import { Navbar } from "@/components/public/Navbar";
import { NewsContainer } from "@/components/public/news/NewsContainer";
import { Footer } from "@/components/public/Footer";
import { ZaloFloatButton } from "@/components/public/ZaloFloatButton";
import { getPublishedNewsListService } from "@/services/news";

export const revalidate = 0;

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
