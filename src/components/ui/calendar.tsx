"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  getMonthGridDays,
  toDateKey,
  MONTH_LABELS_VI,
  WEEKDAY_LABELS_VI,
  type CalendarGridDay,
} from "@/lib/calendarGrid"

interface CalendarProps {
  selected?: Date
  onSelect: (date: Date) => void
  renderDaySubLabel?: (day: CalendarGridDay) => React.ReactNode
  className?: string
}

function Calendar({ selected, onSelect, renderDaySubLabel, className }: CalendarProps) {
  const initial = selected ?? new Date()
  const [viewYear, setViewYear] = React.useState(initial.getFullYear())
  const [viewMonth, setViewMonth] = React.useState(initial.getMonth() + 1)

  const days = getMonthGridDays(viewYear, viewMonth)
  const selectedKey = selected ? toDateKey(selected) : null

  const goToPrevMonth = () => {
    if (viewMonth === 1) {
      setViewYear((y) => y - 1)
      setViewMonth(12)
    } else {
      setViewMonth((m) => m - 1)
    }
  }

  const goToNextMonth = () => {
    if (viewMonth === 12) {
      setViewYear((y) => y + 1)
      setViewMonth(1)
    } else {
      setViewMonth((m) => m + 1)
    }
  }

  return (
    <div className={cn("p-3", className)} data-slot="calendar">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-bold text-foreground">
          {MONTH_LABELS_VI[viewMonth - 1]}, {viewYear}
        </p>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-7 rounded-lg border-border/60 bg-white text-muted-foreground hover:bg-muted/50"
            onClick={goToPrevMonth}
          >
            <ChevronLeft className="size-3.5" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-7 rounded-lg border-border/60 bg-white text-muted-foreground hover:bg-muted/50"
            onClick={goToNextMonth}
          >
            <ChevronRight className="size-3.5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {WEEKDAY_LABELS_VI.map((label) => (
          <div
            key={label}
            className="text-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 py-1"
          >
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const isSelected = day.dateKey === selectedKey
          return (
            <button
              key={day.dateKey}
              type="button"
              onClick={() => onSelect(day.date)}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 aspect-square rounded-lg text-xs transition-all duration-150 cursor-pointer",
                day.isCurrentMonth ? "text-foreground" : "text-muted-foreground/30",
                isSelected
                  ? "bg-brand-gold text-white shadow-sm shadow-brand-gold/20"
                  : day.isToday
                    ? "bg-brand-gold/10 text-brand-gold font-bold"
                    : "hover:bg-muted/60"
              )}
            >
              <span className="font-semibold">{day.day}</span>
              {renderDaySubLabel && (
                <span
                  className={cn(
                    "text-[9px] leading-none",
                    isSelected ? "text-white/80" : "text-muted-foreground/50"
                  )}
                >
                  {renderDaySubLabel(day)}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export { Calendar }
