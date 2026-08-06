import Image from "next/image";
import Link from "next/link";
import type { News } from "@/types/news";
import { formatDate } from "@/lib/date";
import { ROUTES } from "@/constants/routes";

interface PostCardProps {
  post: News;
  variant?: "light" | "dark";
}

export function PostCard({ post, variant = "light" }: PostCardProps) {
  const isDark = variant === "dark";
  const category = post.expand?.category;

  return (
    <Link href={`${ROUTES.NEWS}/${post.slug}`} className="group block">
      <article>
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-[#1c0a0a]/0 group-hover:bg-[#1c0a0a]/30 transition-colors duration-300" />
          {category && (
            <span
              className="absolute top-3 left-3 px-3 py-1 text-xs font-medium tracking-widest uppercase"
              style={{ backgroundColor: category.backgroundColor, color: category.textColor }}
            >
              {category.label}
            </span>
          )}
        </div>

        <p
          className={`mt-4 text-xs tracking-widest uppercase ${isDark ? "text-[#e8d5c4]/40" : "text-[#2c1810]/40"}`}
        >
          {formatDate(post.publishedAt || post.created)}
        </p>
        <h3
          className={`mt-2 text-xl font-semibold leading-snug transition-colors duration-200 ${
            isDark ? "text-[#fdf8f0] group-hover:text-[#c4973a]" : "text-[#1c0a0a] group-hover:text-[#8b3a2e]"
          }`}
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {post.title}
        </h3>
        <p className={`mt-2 text-sm leading-relaxed ${isDark ? "text-[#e8d5c4]/50" : "text-[#2c1810]/60"}`}>
          {post.description}
        </p>
      </article>
    </Link>
  );
}
