/** Pure date-grid generation helpers for a month-view calendar (Monday-first weeks). */

export interface CalendarGridDay {
  date: Date;
  day: number;
  month: number; // 1-12
  year: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  dateKey: string; // YYYY-MM-DD, local time
}

export const toDateKey = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

/** Monday=0 ... Sunday=6 */
const mondayFirstDayIndex = (date: Date): number => (date.getDay() + 6) % 7;

/**
 * Builds the full set of day cells for a month view, padded with leading/trailing
 * days from adjacent months so every week row has 7 days (Monday-first).
 */
export function getMonthGridDays(year: number, month: number): CalendarGridDay[] {
  const today = new Date();
  const todayKey = toDateKey(today);

  const firstOfMonth = new Date(year, month - 1, 1);
  const lastOfMonth = new Date(year, month, 0);

  const leadingCount = mondayFirstDayIndex(firstOfMonth);
  const trailingCount = 6 - mondayFirstDayIndex(lastOfMonth);

  const start = new Date(year, month - 1, 1 - leadingCount);
  const totalDays = leadingCount + lastOfMonth.getDate() + trailingCount;

  const days: CalendarGridDay[] = [];
  for (let i = 0; i < totalDays; i++) {
    const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
    const dateKey = toDateKey(date);
    days.push({
      date,
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      isCurrentMonth: date.getMonth() + 1 === month && date.getFullYear() === year,
      isToday: dateKey === todayKey,
      dateKey,
    });
  }
  return days;
}

export const WEEKDAY_LABELS_VI = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

export const MONTH_LABELS_VI = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];
