import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Unified commerce pricing & shipping constants (base unit: BDT)
 * 1 USD = 120 BDT so ৳ 3,000 = $25.00 cleanly across every banner, drawer, and checkout step.
 */
export const BDT_PER_USD = 120;
export const FREE_SHIPPING_THRESHOLD_BDT = 3000;

export const SHIPPING_FEES_BDT = {
  DHAKA_METRO: 80,
  NATIONWIDE: 150,
  INTERNATIONAL: 1800,
} as const;

export function convertFromBdt(amountBdt: number, currency: "BDT" | "USD"): number {
  if (currency === "BDT") return Math.round(amountBdt);
  return Math.round((amountBdt / BDT_PER_USD) * 100) / 100;
}

/**
 * Format a BDT-denominated amount into the active storefront currency with consistent spacing.
 */
export function formatPrice(amountBdt: number, currency: "BDT" | "USD" = "BDT"): string {
  if (currency === "BDT") {
    return `৳ ${Math.round(amountBdt).toLocaleString("en-US")}`;
  }
  const usd = convertFromBdt(amountBdt, "USD");
  return `$${usd.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Consistent human-readable shipping threshold for banners and cards.
 */
export function formatShippingThreshold(currency: "BDT" | "USD" = "BDT"): string {
  if (currency === "BDT") {
    return `৳ ${FREE_SHIPPING_THRESHOLD_BDT.toLocaleString("en-US")}`;
  }
  const usd = FREE_SHIPPING_THRESHOLD_BDT / BDT_PER_USD;
  return Number.isInteger(usd) ? `$${usd}` : `$${usd.toFixed(2)}`;
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
 * Generate unique ECWEARABLE order tracking code
 */
export function generateOrderNumber(): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const random = Math.floor(1000 + Math.random() * 9000);
  return `ECW-${year}${month}-${random}`;
}
