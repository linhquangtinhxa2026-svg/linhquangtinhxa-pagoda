"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import type { News } from "@/types/news";
import { PageHero } from "@/components/public/PageHero";
import { PostCard } from "@/components/public/news/PostCard";
import { NewsGallery } from "@/components/public/news/NewsGallery";
import { PostContent } from "@/components/public/news/PostContent";
import { PostShareBar } from "@/components/public/news/PostShareBar";
import { formatDate } from "@/lib/date";
import { ROUTES } from "@/constants/routes";

interface PostDetailProps {
  post: News;
  relatedPosts: News[];
  shareUrl: string;
}

export function PostDetail({ post, relatedPosts, shareUrl }: PostDetailProps) {
  const { t } = useTranslation();

  return (
    <>
      <PageHero
        image={post.coverImageUrl}
        eyebrow={post.expand?.category?.label ?? ""}
        title={post.title}
        subtitle={formatDate(post.publishedAt || post.created)}
      />

      <section className="py-20 bg-[#fdf8f0]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={ROUTES.NEWS}
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-semibold text-[#c4973a] hover:text-[#8b3a2e] transition-colors duration-200"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {t("newsPage.backToNews")}
          </Link>

          <PostContent html={post.content} />
          <PostShareBar shareUrl={shareUrl} />
        </div>
      </section>

      <NewsGallery gallery={post.gallery} />

      {relatedPosts.length > 0 && (
        <section className="py-20 bg-[#1c0a0a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-2xl sm:text-3xl font-semibold text-[#fdf8f0] mb-10"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {t("newsPage.relatedPosts")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {relatedPosts.map((relatedPost) => (
                <PostCard key={relatedPost.slug} post={relatedPost} variant="dark" />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
