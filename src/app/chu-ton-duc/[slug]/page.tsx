import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { MasterHero } from "@/components/public/masters/MasterHero";
import { MasterBio } from "@/components/public/masters/MasterBio";
import { MasterJourney } from "@/components/public/masters/MasterJourney";
import { ZaloFloatButton } from "@/components/public/ZaloFloatButton";
import { MASTER_KEYS, MASTERS, getMasterKeyBySlug } from "@/data/mastersData";

export function generateStaticParams() {
  return MASTER_KEYS.map((key) => ({ slug: MASTERS[key].slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const masterKey = getMasterKeyBySlug(slug);

  if (!masterKey) {
    return { title: "Không Tìm Thấy" };
  }

  const master = MASTERS[masterKey];
  const description = `${master.name} (${master.years}) - Chư Tôn Đức Linh Quang Tịnh Xá.`;

  return {
    title: master.name,
    description,
    openGraph: {
      title: master.name,
      description,
      images: [{ url: master.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: master.name,
      description,
      images: [master.image],
    },
  };
}

export default async function MasterDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const masterKey = getMasterKeyBySlug(slug);

  if (!masterKey) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main>
        <MasterHero masterKey={masterKey} />
        <MasterBio masterKey={masterKey} />
        <MasterJourney masterKey={masterKey} />
      </main>
      <Footer />
      <ZaloFloatButton />
    </>
  );
}
