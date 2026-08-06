"use client";

import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Download, FileSpreadsheet, Loader2, Trash2, Upload } from "lucide-react";
import * as XLSX from "xlsx";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getAllMemorialRecordsService } from "@/services/memorialRecords";
import type { MemorialRecord } from "@/types/memorialRecord";
import { useBulkImportMemorialRecords } from "./useMemorialRecords";
import { WipeAllMemorialRecordsDialog } from "./WipeAllMemorialRecordsDialog";
import { ArchiveSelectedMemorialRecordsDialog } from "./ArchiveSelectedMemorialRecordsDialog";
import { ImportProgressDialog } from "./ImportProgressDialog";

const EXCEL_HEADERS = {
  full_name: "Họ và Tên Đầy Đủ",
  age_at_death: "Tuổi Mất",
  phone: "Số Điện Thoại",
  storage_location: "Vị Trí Lưu Cốt",
  display_location: "Vị Trí Trưng Bày Hình",
  private_info: "Thông Tin Riêng",
} as const;

const toExcelRow = (r: MemorialRecord) => ({
  [EXCEL_HEADERS.full_name]: r.full_name,
  [EXCEL_HEADERS.age_at_death]: r.age_at_death ?? "",
  [EXCEL_HEADERS.phone]: r.phone || "",
  [EXCEL_HEADERS.storage_location]: r.storage_location || "",
  [EXCEL_HEADERS.display_location]: r.display_location || "",
  [EXCEL_HEADERS.private_info]: r.private_info || "",
});

const fromExcelRow = (row: Record<string, unknown>): Partial<MemorialRecord> => ({
  full_name: String(row[EXCEL_HEADERS.full_name] ?? row["full_name"] ?? "").trim(),
  age_at_death: (() => {
    const raw = row[EXCEL_HEADERS.age_at_death] ?? row["age_at_death"];
    const parsed = parseInt(String(raw ?? ""), 10);
    return isNaN(parsed) ? null : parsed;
  })(),
  phone: (() => {
    const raw = String(row[EXCEL_HEADERS.phone] ?? row["phone"] ?? "").trim();
    return raw === "-" ? "" : raw;
  })(),
  storage_location: String(
    row[EXCEL_HEADERS.storage_location] ?? row["storage_location"] ?? ""
  ).trim(),
  display_location: String(
    row[EXCEL_HEADERS.display_location] ?? row["display_location"] ?? ""
  ).trim(),
  private_info: String(row[EXCEL_HEADERS.private_info] ?? row["private_info"] ?? "").trim(),
});

interface MemorialRecordsImportExportProps {
  selectedIds: string[];
  onClearSelection: () => void;
}

export function MemorialRecordsImportExport({
  selectedIds,
  onClearSelection,
}: MemorialRecordsImportExportProps) {
  const { t } = useTranslation();
  const [isWipeOpen, setIsWipeOpen] = useState(false);
  const [isArchiveSelectedOpen, setIsArchiveSelectedOpen] = useState(false);
  const [isExportingExcel, setIsExportingExcel] = useState(false);
  const [isExportingTxt, setIsExportingTxt] = useState(false);
  const txtInputRef = useRef<HTMLInputElement>(null);
  const excelInputRef = useRef<HTMLInputElement>(null);

  const { doImport, importProgress } = useBulkImportMemorialRecords();

  const handleExportExcel = async () => {
    setIsExportingExcel(true);
    try {
      const all = await getAllMemorialRecordsService();
      const worksheet = XLSX.utils.json_to_sheet(all.map(toExcelRow));
      worksheet["!cols"] = [
        { wch: 30 },
        { wch: 10 },
        { wch: 18 },
        { wch: 24 },
        { wch: 24 },
        { wch: 40 },
      ];
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Danh Sách Cốt và Hình");
      XLSX.writeFile(workbook, "danh-sach-quan-ly-cot-va-hinh.xlsx");
    } finally {
      setIsExportingExcel(false);
    }
  };

  const handleExportTxt = async () => {
    setIsExportingTxt(true);
    try {
      const all = await getAllMemorialRecordsService();
      const blob = new Blob([JSON.stringify(all, null, 2)], { type: "text/plain;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "data-quan-ly-cot-va-hinh.txt";
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
        if (!window.confirm(t("memorialRecords.importConfirm", { count: data.length }))) return;

        const records: Partial<MemorialRecord>[] = data.map((row) => ({
          full_name: row.full_name ?? row.fullName ?? "",
          age_at_death:
            row.age_at_death ?? (row.ageOfDeath ? parseInt(row.ageOfDeath, 10) || null : null),
          phone: row.phone === "-" ? "" : (row.phone ?? ""),
          storage_location: row.storage_location ?? "",
          display_location: row.display_location ?? "",
          private_info:
            row.private_info ?? (row.privateInfo === "-" ? "" : (row.privateInfo ?? "")),
        }));
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
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet);
        if (rows.length === 0) return;
        if (!window.confirm(t("memorialRecords.importConfirm", { count: rows.length }))) return;

        doImport(rows.map(fromExcelRow));
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
            {isExportingExcel ? t("memorialRecords.exporting") : t("memorialRecords.exportExcel")}
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
            {isExportingTxt ? t("memorialRecords.exporting") : t("memorialRecords.exportTxt")}
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
          <span className="hidden sm:inline">{t("memorialRecords.importExcel")}</span>
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
          <span className="hidden sm:inline">{t("memorialRecords.importTxt")}</span>
        </Button>
        <input
          ref={txtInputRef}
          type="file"
          accept=".txt"
          className="hidden"
          onChange={handleImportTxt}
        />
      </div>

      <div className="flex-1 min-w-[20px]" />

      <div className="flex items-center gap-2 ml-auto">
        {selectedIds.length > 0 && (
          <Button
            type="button"
            className="h-10 px-4 rounded-xl bg-destructive hover:bg-destructive/90 text-white shadow-sm shadow-destructive/20 active:scale-[0.98] transition-all"
            onClick={() => setIsArchiveSelectedOpen(true)}
          >
            <Trash2 className="size-4" />
            <span className="hidden sm:inline">
              {t("memorialRecords.archiveSelected", { count: selectedIds.length })}
            </span>
          </Button>
        )}
        <Button
          type="button"
          variant="ghost"
          className={cn(
            "h-10 px-4 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive active:scale-[0.98] transition-all"
          )}
          onClick={() => setIsWipeOpen(true)}
        >
          <Trash2 className="size-4" />
          <span className="hidden sm:inline">{t("memorialRecords.wipeAll")}</span>
        </Button>
      </div>

      <WipeAllMemorialRecordsDialog open={isWipeOpen} onOpenChange={setIsWipeOpen} />
      <ArchiveSelectedMemorialRecordsDialog
        selectedIds={selectedIds}
        open={isArchiveSelectedOpen}
        onOpenChange={setIsArchiveSelectedOpen}
        onArchived={onClearSelection}
      />
      <ImportProgressDialog progress={importProgress} />
    </div>
  );
}
