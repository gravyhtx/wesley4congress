import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Calculate days until a specific date.
 * @param targetDate - The date you want to count down to.
 * @param expiredMessage - Optional message to display if the date has passed.
 * @returns The number of days left or the expired message.
 */
export function daysUntil(targetDate: Date, expiredMessage?: string): string | number {
  const now = new Date();
  const timeDiff = targetDate.getTime() - now.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

  if (daysLeft < 0 && expiredMessage) {
    return expiredMessage;
  }

  return daysLeft;
}