import type { MetadataRoute } from "next";
import { getPublishedNewsListService } from "@/services/news";
import { MASTER_KEYS, MASTERS } from "@/data/mastersData";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://linhquangtinhxa.org";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/ve-chung-toi`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/tim-cot-va-hinh`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/tin-tuc`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/ghe-tham`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/lien-he`, changeFrequency: "yearly", priority: 0.5 },
  ];

  const masterRoutes: MetadataRoute.Sitemap = MASTER_KEYS.map((key) => ({
    url: `${SITE_URL}/chu-ton-duc/${MASTERS[key].slug}`,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const news = await getPublishedNewsListService();
  const newsRoutes: MetadataRoute.Sitemap = news.map((item) => ({
    url: `${SITE_URL}/tin-tuc/${item.slug}`,
    lastModified: new Date(item.publishedAt || item.updated),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...masterRoutes, ...newsRoutes];
}
