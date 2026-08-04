"use client";

import { useTranslation } from "react-i18next";
import { PageHero } from "@/components/public/PageHero";
import { PostCard } from "@/components/public/news/PostCard";
import type { News } from "@/types/news";

interface NewsContainerProps {
  news: News[];
}

export function NewsContainer({ news }: NewsContainerProps) {
  const { t } = useTranslation();

  return (
    <>
      <PageHero
        image="/images/tin-tuc/hero-banner.jpg"
        eyebrow={t("newsPage.eyebrow")}
        title={t("newsPage.title")}
        titleEmphasis={t("newsPage.titleEmphasis")}
        subtitle={t("newsPage.subtitle")}
      />

      <section className="py-20 bg-[#fdf8f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {news.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
