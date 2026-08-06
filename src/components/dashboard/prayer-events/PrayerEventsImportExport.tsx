"use client";

import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Download, FileSpreadsheet, Loader2, Upload } from "lucide-react";
import * as XLSX from "xlsx";

import { Button } from "@/components/ui/button";
import { formatSolarDate } from "@/lib/lunarCalendar";
import { useCeremonyTypesList } from "@/hooks/dashboard/useCeremonyTypes";
import { getPrayerEventsListService } from "@/services/prayerEvents";
import type { PrayerEvent } from "@/types/prayerEvent";
import type { CeremonyType } from "@/types/ceremonyType";
import { useBulkImportPrayerEvents } from "./usePrayerEvents";
import { PrayerEventsImportProgressDialog } from "./PrayerEventsImportProgressDialog";

const EXCEL_HEADERS = {
  type: "Loại Lễ",
  registrantName: "Họ Tên Người Đăng Ký",
  eventDate: "Ngày Làm Lễ",
  note: "Ghi Chú",
} as const;

const toExcelRow = (event: PrayerEvent, ceremonyTypes: CeremonyType[]) => ({
  [EXCEL_HEADERS.type]:
    ceremonyTypes.find((ceremonyType) => ceremonyType.value === event.type)?.label ?? "",
  [EXCEL_HEADERS.registrantName]: event.registrantName,
  [EXCEL_HEADERS.eventDate]: event.eventDate ? formatSolarDate(event.eventDate) : "",
  [EXCEL_HEADERS.note]: event.note,
});

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const DD_MM_YYYY_PATTERN = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;

const parseFlexibleDate = (value: unknown): string => {
  if (value instanceof Date && !isNaN(value.getTime())) {
    const y = value.getFullYear();
    const m = String(value.getMonth() + 1).padStart(2, "0");
    const d = String(value.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  const str = String(value ?? "").trim();
  if (ISO_DATE_PATTERN.test(str)) return str;
  const match = str.match(DD_MM_YYYY_PATTERN);
  if (match) {
    const [, d, m, y] = match;
    return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
  }
  return "";
};

const resolveType = (value: unknown, ceremonyTypes: CeremonyType[]): string => {
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  const normalized = raw.toLowerCase();
  const match = ceremonyTypes.find(
    (ceremonyType) =>
      ceremonyType.label.trim().toLowerCase() === normalized ||
      ceremonyType.value.trim().toLowerCase() === normalized
  );
  return match?.value ?? "";
};

const fromExcelRow = (
  row: Record<string, unknown>,
  ceremonyTypes: CeremonyType[]
): Partial<PrayerEvent> => ({
  type: resolveType(row[EXCEL_HEADERS.type] ?? row["type"], ceremonyTypes),
  registrantName: String(
    row[EXCEL_HEADERS.registrantName] ?? row["Tên Khách Hàng"] ?? row["registrantName"] ?? ""
  ).trim(),
  eventDate: parseFlexibleDate(
    row[EXCEL_HEADERS.eventDate] ?? row["Ngày Hẹn"] ?? row["eventDate"]
  ),
  note: String(
    row[EXCEL_HEADERS.note] ?? row["Ghi Chú Công Việc"] ?? row["note"] ?? ""
  ).trim(),
});

export function PrayerEventsImportExport() {
  const { t } = useTranslation();
  const { data: ceremonyTypes = [] } = useCeremonyTypesList();
  const [isExportingExcel, setIsExportingExcel] = useState(false);
  const [isExportingTxt, setIsExportingTxt] = useState(false);
  const txtInputRef = useRef<HTMLInputElement>(null);
  const excelInputRef = useRef<HTMLInputElement>(null);

  const { doImport, importProgress } = useBulkImportPrayerEvents();

  const handleExportExcel = async () => {
    setIsExportingExcel(true);
    try {
      const all = await getPrayerEventsListService();
      const worksheet = XLSX.utils.json_to_sheet(all.map((event) => toExcelRow(event, ceremonyTypes)));
      worksheet["!cols"] = [{ wch: 20 }, { wch: 30 }, { wch: 16 }, { wch: 40 }];
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Danh Sách Cầu An và Cầu Siêu");
      XLSX.writeFile(workbook, "danh-sach-cau-an-va-cau-sieu.xlsx");
    } finally {
      setIsExportingExcel(false);
    }
  };

  const handleExportTxt = async () => {
    setIsExportingTxt(true);
    try {
      const all = await getPrayerEventsListService();
      const blob = new Blob([JSON.stringify(all, null, 2)], { type: "text/plain;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "data-cau-an-va-cau-sieu.txt";
      link.click();
      URL.revokeObjectURL(link.href);
    } finally {
      setIsExportingTxt(false);
    }
  };

  const handleImportTxt = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (!Array.isArray(data)) return;
        if (!window.confirm(t("prayerEvents.importConfirm", { count: data.length }))) return;

        const records = data
          .map((row) => fromExcelRow(row, ceremonyTypes))
          .filter((record) => !!record.eventDate);
        doImport(records);
      } catch {
        // invalid file
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  };

  const handleImportExcel = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array", cellDates: true });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet);
        if (rows.length === 0) return;

        const records = rows
          .map((row) => fromExcelRow(row, ceremonyTypes))
          .filter((record) => !!record.eventDate);
        if (records.length === 0) return;
        if (!window.confirm(t("prayerEvents.importConfirm", { count: records.length }))) return;

        doImport(records);
      } catch {
        // invalid file
      }
    };
    reader.readAsArrayBuffer(file);
    event.target.value = "";
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          disabled={isExportingExcel}
          className="h-10 px-4 rounded-xl border-border bg-white text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all active:scale-[0.98]"
          onClick={handleExportExcel}
        >
          {isExportingExcel ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <FileSpreadsheet className="size-4" />
          )}
          <span className="hidden sm:inline">
            {isExportingExcel ? t("prayerEvents.exporting") : t("prayerEvents.exportExcel")}
          </span>
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={isExportingTxt}
          className="h-10 px-4 rounded-xl border-border bg-white text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all active:scale-[0.98]"
          onClick={handleExportTxt}
        >
          {isExportingTxt ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Download className="size-4" />
          )}
          <span className="hidden sm:inline">
            {isExportingTxt ? t("prayerEvents.exporting") : t("prayerEvents.exportTxt")}
          </span>
        </Button>
      </div>

      <div className="flex items-center gap-2 h-6 border-l border-border mx-1" />

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          disabled={!!importProgress}
          className="h-10 px-4 rounded-xl border-border bg-white text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all active:scale-[0.98]"
          onClick={() => excelInputRef.current?.click()}
        >
          <Upload className="size-4" />
          <span className="hidden sm:inline">{t("prayerEvents.importExcel")}</span>
        </Button>
        <input
          ref={excelInputRef}
          type="file"
          accept=".xlsx,.xls"
          className="hidden"
          onChange={handleImportExcel}
        />
        <Button
          type="button"
          variant="outline"
          disabled={!!importProgress}
          className="h-10 px-4 rounded-xl border-border bg-white text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all active:scale-[0.98]"
          onClick={() => txtInputRef.current?.click()}
        >
          <Upload className="size-4" />
          <span className="hidden sm:inline">{t("prayerEvents.importTxt")}</span>
        </Button>
        <input
          ref={txtInputRef}
          type="file"
          accept=".txt"
          className="hidden"
          onChange={handleImportTxt}
        />
      </div>

      <PrayerEventsImportProgressDialog progress={importProgress} />
    </div>
  );
}
