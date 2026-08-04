"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface SingleSelectOption {
  value: string;
  label: string;
}

interface SingleSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SingleSelectOption[];
  className?: string;
  triggerClassName?: string;
}

export function SingleSelect({
  value,
  onValueChange,
  options,
  className,
  triggerClassName,
}: SingleSelectProps) {
  return (
    <Select value={value} onValueChange={(next) => next !== null && onValueChange(next)}>
      <SelectTrigger
        className={cn(
          "h-10 w-full rounded-xl border-border/60 bg-muted/5 text-sm focus-visible:ring-brand-gold/20 focus-visible:border-brand-gold",
          triggerClassName
        )}
      >
        <SelectValue>
          {(val: string) => options.find((option) => option.value === val)?.label}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className={className}>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
