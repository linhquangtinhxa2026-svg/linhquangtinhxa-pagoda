import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface TimCotVaHinhPaginationProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export function TimCotVaHinhPagination({
  page,
  totalPages,
  onPrev,
  onNext,
}: TimCotVaHinhPaginationProps) {
  const { t } = useTranslation();

  return (
    <div className="mt-16 flex flex-col items-center justify-between gap-6 sm:flex-row">
      <div className="flex items-center gap-4">
        <div className="h-px w-8 bg-[#c4973a]/30" />
        <p
          className="text-xs tracking-[0.2em] uppercase font-medium text-[#2c1810]/40"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {t("timCotVaHinh.pageIndicator", { page, totalPages })}
        </p>
        <div className="h-px w-8 bg-[#c4973a]/30" />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          disabled={page <= 1}
          onClick={onPrev}
          className="group cursor-pointer flex items-center gap-3 px-6 py-3 border border-[#c4973a]/40 text-[#c4973a] text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-[#c4973a] hover:text-[#fdf8f0] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-20 disabled:hover:bg-transparent"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-1" />
          {t("timCotVaHinh.prev")}
        </button>
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={onNext}
          className="group cursor-pointer flex items-center gap-3 px-6 py-3 border border-[#c4973a]/40 text-[#c4973a] text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-[#c4973a] hover:text-[#fdf8f0] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-20 disabled:hover:bg-transparent"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {t("timCotVaHinh.next")}
          <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
