import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price according to currency
 */
export function formatPrice(amount: number, currency: 'BDT' | 'USD' = 'BDT'): string {
  if (currency === 'BDT') {
    return `৳${amount.toLocaleString('en-US')}`;
  }
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Precision unit conversion: Inches to Centimeters (1 in = 2.54 cm)
 */
export function inchToCm(inches: number): number {
  return Math.round(inches * 2.54 * 10) / 10;
}

/**
 * Precision unit conversion: Centimeters to Inches
 */
export function cmToInch(cm: number): number {
  return Math.round((cm / 2.54) * 10) / 10;
}

/**
 * Generate unique order tracking code
 */
export function generateOrderNumber(): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.floor(1000 + Math.random() * 9000);
  return `AUR-${year}${month}-${random}`;
}
