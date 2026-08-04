"use client";

import { useTranslation } from "react-i18next";
import { Users, PhoneCall } from "lucide-react";
import { useMemorialRecordsStats } from "./useMemorialRecords";
import { Skeleton } from "@/components/ui/skeleton";
import { TypographyMuted, TypographyLarge } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

export function MemorialRecordsStatsCards() {
  const { t } = useTranslation();
  const { data, isLoading } = useMemorialRecordsStats();

  const cards = [
    {
      key: "total",
      label: t("memorialRecords.statTotal"),
      value: data?.total ?? 0,
      icon: Users,
      color: "bg-brand-gold/10 text-brand-gold",
    },
    {
      key: "withPhone",
      label: t("memorialRecords.statWithPhone"),
      value: data?.withPhone ?? 0,
      icon: PhoneCall,
      color: "bg-brand-burgundy/10 text-brand-burgundy",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-border shadow-sm p-6">
            <Skeleton className="h-3 w-24 mb-3" />
            <Skeleton className="h-8 w-16" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.key}
            className="bg-white rounded-xl border border-border shadow-sm p-6 flex items-center gap-5 transition-all hover:shadow-md hover:border-brand-gold/20 group"
          >
            <div
              className={cn(
                "p-3.5 rounded-xl transition-colors group-hover:scale-110 duration-300",
                card.color
              )}
            >
              <Icon className="size-6" />
            </div>
            <div>
              <TypographyMuted className="text-[10px] sm:text-xs uppercase tracking-widest font-bold !mt-0 text-muted-foreground/80">
                {card.label}
              </TypographyMuted>
              <TypographyLarge className="text-2xl sm:text-3xl font-bold text-foreground mt-0.5 tabular-nums">
                {card.value}
              </TypographyLarge>
            </div>
          </div>
        );
      })}
    </div>
  );
}
