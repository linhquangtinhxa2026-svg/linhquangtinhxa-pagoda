import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://linhquangtinhxa.org";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/trang-chu", "/dang-nhap"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
