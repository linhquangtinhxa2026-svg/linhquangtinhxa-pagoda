import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeWords(value: string) {
  return value.replace(/(^|\s)\S/g, (char) => char.toUpperCase())
}
