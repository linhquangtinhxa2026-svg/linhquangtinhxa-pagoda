import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { PostDetail } from "@/components/public/news/PostDetail";
import { ZaloFloatButton } from "@/components/public/ZaloFloatButton";
import { ROUTES } from "@/constants/routes";
import { getNewsBySlugService, getPublishedNewsListService } from "@/services/news";

async function getSiteUrl(): Promise<string> {
  const headersList = await headers();
  const host = headersList.get("host") ?? "localhost:3000";
  const protocol = headersList.get("x-forwarded-proto") ?? "http";
  return `${protocol}://${host}`;
}

export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsBySlugService(slug);

  if (!post) {
    return { title: "Không Tìm Thấy Bài Viết" };
  }

  const url = `${await getSiteUrl()}${ROUTES.NEWS}/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url,
      images: post.coverImageUrl ? [{ url: post.coverImageUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.coverImageUrl ? [post.coverImageUrl] : undefined,
    },
  };
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getNewsBySlugService(slug);

  if (!post) {
    notFound();
  }

  const allPublished = await getPublishedNewsListService();
  const relatedPosts = allPublished.filter((item) => item.slug !== post.slug).slice(0, 3);
  const shareUrl = `${await getSiteUrl()}${ROUTES.NEWS}/${post.slug}`;

  return (
    <>
      <Navbar />
      <main>
        <PostDetail post={post} relatedPosts={relatedPosts} shareUrl={shareUrl} />
      </main>
      <Footer />
      <ZaloFloatButton />
    </>
  );
}
