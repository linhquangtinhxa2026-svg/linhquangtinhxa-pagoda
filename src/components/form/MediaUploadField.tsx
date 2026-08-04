"use client";

import { useMemo } from "react";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Upload, X } from "lucide-react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type MediaValue = File | string;

interface MediaUploadFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  multiple?: boolean;
  accept?: string;
  className?: string;
}

function isVideo(item: MediaValue): boolean {
  if (item instanceof File) return item.type.startsWith("video/");
  return /\.(mp4|webm|mov)$/i.test(item);
}

function previewSrc(item: MediaValue): string {
  return item instanceof File ? URL.createObjectURL(item) : item;
}

export function MediaUploadField<T extends FieldValues>({
  control,
  name,
  label,
  multiple = false,
  accept = "image/*,video/*",
  className,
}: MediaUploadFieldProps<T>) {
  const { t } = useTranslation();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const items: MediaValue[] = multiple
          ? ((field.value as MediaValue[] | undefined) ?? [])
          : field.value
            ? [field.value as MediaValue]
            : [];

        const handleSelect = (fileList: FileList | null) => {
          if (!fileList || fileList.length === 0) return;
          const files = Array.from(fileList);
          if (multiple) {
            field.onChange([...items, ...files]);
          } else {
            field.onChange(files[0]);
          }
        };

        const handleRemove = (index: number) => {
          if (multiple) {
            field.onChange(items.filter((_, i) => i !== index));
          } else {
            field.onChange(null);
          }
        };

        return (
          <div className={cn("space-y-2", className)}>
            <Label className="text-sm font-bold text-foreground/80 tracking-tight">{label}</Label>

            <div className="flex flex-wrap gap-3">
              {items.map((item, index) => (
                <MediaPreview key={index} item={item} onRemove={() => handleRemove(index)} />
              ))}

              {(multiple || items.length === 0) && (
                <label className="size-24 rounded-xl border-2 border-dashed border-border/60 hover:border-brand-gold/60 hover:bg-brand-gold/5 transition-colors flex flex-col items-center justify-center gap-1 cursor-pointer text-muted-foreground">
                  <Upload className="size-5" />
                  <span className="text-[10px] font-semibold uppercase tracking-wide">
                    {t("news.upload")}
                  </span>
                  <input
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    className="hidden"
                    onChange={(e) => {
                      handleSelect(e.target.files);
                      e.target.value = "";
                    }}
                  />
                </label>
              )}
            </div>

            {fieldState.error?.message && (
              <p className="text-xs text-red-600">{t(fieldState.error.message)}</p>
            )}
          </div>
        );
      }}
    />
  );
}

function MediaPreview({ item, onRemove }: { item: MediaValue; onRemove: () => void }) {
  const src = useMemo(() => previewSrc(item), [item]);

  return (
    <div className="relative size-24 rounded-xl overflow-hidden border border-border/60 bg-muted/10 group">
      {isVideo(item) ? (
         
        <video src={src} className="size-full object-cover" muted />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="size-full object-cover" />
      )}
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-1 right-1 size-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
}
