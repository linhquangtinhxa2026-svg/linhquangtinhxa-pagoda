import { useTranslation } from "react-i18next";
import type { MemorialRecord } from "@/types/memorialRecord";

interface TimCotVaHinhResultsTableProps {
  items: MemorialRecord[];
}

export function TimCotVaHinhResultsTable({ items }: TimCotVaHinhResultsTableProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Desktop / tablet view - Clean High-Contrast Table */}
      <div className="hidden md:block overflow-hidden bg-white border border-[#c4973a]/20 shadow-[0_2px_15px_-3px_rgba(28,10,10,0.03)]">
        <table className="w-full">
          <thead>
            <tr className="bg-[#fdf8f0]/80 border-b border-[#c4973a]/15">
              <th className="text-left px-8 py-5 text-[10px] tracking-[0.4em] uppercase font-bold text-[#c4973a]">
                {t("timCotVaHinh.colFullName")}
              </th>
              <th className="text-left px-4 py-5 text-[10px] tracking-[0.4em] uppercase font-bold text-[#c4973a] w-24">
                {t("timCotVaHinh.colAge")}
              </th>
              <th className="text-left px-6 py-5 text-[10px] tracking-[0.4em] uppercase font-bold text-[#c4973a]">
                {t("timCotVaHinh.colStorageLocation")}
              </th>
              <th className="text-left px-6 py-5 text-[10px] tracking-[0.4em] uppercase font-bold text-[#c4973a]">
                {t("timCotVaHinh.colDisplayLocation")}
              </th>
              <th className="text-left px-6 py-5 text-[10px] tracking-[0.4em] uppercase font-bold text-[#c4973a]">
                {t("timCotVaHinh.colNotes")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((record) => (
              <tr
                key={record.id}
                className="group hover:bg-slate-50/50 transition-colors duration-150"
              >
                <td className="px-8 py-7">
                  <span
                    className="block text-xl font-bold text-[#1c0a0a] group-hover:text-[#c4973a] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {record.full_name}
                  </span>
                </td>
                <td className="px-4 py-7">
                  <span
                    className="text-base font-medium text-[#5a463d] tabular-nums"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {record.age_at_death ?? "-"}
                  </span>
                </td>
                <td className="px-6 py-7">
                  <span
                    className="text-sm font-medium text-[#5a463d] leading-relaxed block max-w-[200px]"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {record.storage_location || "—"}
                  </span>
                </td>
                <td className="px-6 py-7">
                  <span
                    className="text-sm font-medium text-[#5a463d] leading-relaxed block max-w-[200px]"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {record.display_location || "—"}
                  </span>
                </td>
                <td className="px-6 py-7">
                  <span
                    className="text-sm font-medium text-[#5a463d] leading-relaxed block max-w-[220px] line-clamp-1 group-hover:line-clamp-none transition-all duration-300"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {record.private_info || "—"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view - Clear Cards */}
      <div className="flex flex-col gap-4 md:hidden">
        {items.map((record) => (
          <div
            key={record.id}
            className="bg-white border border-[#c4973a]/15 p-6 shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#c4973a]/20" />
            <div className="flex items-baseline justify-between mb-4">
              <p
                className="text-xl font-bold text-[#1c0a0a]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {record.full_name}
              </p>
              {record.age_at_death != null && (
                <span
                  className="text-xs font-bold text-[#c4973a] tabular-nums bg-[#c4973a]/10 px-2 py-0.5"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {record.age_at_death} {t("timCotVaHinh.colAge").toLowerCase()}
                </span>
              )}
            </div>
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="grid grid-cols-1 gap-1">
                <span
                  className="text-[10px] font-bold uppercase tracking-widest text-[#c4973a]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {t("timCotVaHinh.colStorageLocation")}
                </span>
                <span
                  className="text-sm font-medium text-[#5a463d]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {record.storage_location || "—"}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-1">
                <span
                  className="text-[10px] font-bold uppercase tracking-widest text-[#c4973a]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {t("timCotVaHinh.colDisplayLocation")}
                </span>
                <span
                  className="text-sm font-medium text-[#5a463d]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {record.display_location || "—"}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-1">
                <span
                  className="text-[10px] font-bold uppercase tracking-widest text-[#c4973a]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {t("timCotVaHinh.colNotes")}
                </span>
                <span
                  className="text-sm font-medium text-[#5a463d]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {record.private_info || "—"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
