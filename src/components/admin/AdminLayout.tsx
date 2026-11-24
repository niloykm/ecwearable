"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PackagePlus,
  ShoppingBag,
  Layers,
  ArrowLeft,
  Moon,
  Sun,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCommerceStore } from "@/store/useCommerceStore";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { products, orders } = useCommerceStore();
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    return () => {
      root.classList.remove("dark");
    };
  }, [isDark]);

  const lowStockCount = products.filter((p) => p.sizes.some((s) => s.stock < 5)).length;
  const activeOrdersCount = orders.filter(
    (o) => o.orderStatus !== "DELIVERED" && o.orderStatus !== "CANCELLED"
  ).length;

  const navItems = [
    { label: "Executive Overview", href: "/admin", icon: LayoutDashboard },
    { label: "All SKUs & Catalog", href: "/admin/products", icon: Layers, badge: products.length },
    { label: "New Product Studio", href: "/admin/products/new", icon: PackagePlus },
    { label: "Fulfillment & CRM", href: "/admin/orders", icon: ShoppingBag, badge: activeOrdersCount },
  ];

  return (
    <div
      className={cn(
        "min-h-screen transition-colors duration-200",
        isDark ? "dark bg-zinc-950 text-zinc-50" : "bg-white text-zinc-950"
      )}
    >
      {/* Top Admin Command Header */}
      <div
        className={cn(
          "border-b transition-colors px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3",
          isDark ? "bg-zinc-900 border-zinc-800" : "bg-zinc-50 border-zinc-200"
        )}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Storefront</span>
          </Link>
          <span className="text-zinc-300 dark:text-zinc-700" aria-hidden="true">|</span>
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" aria-hidden="true" />
            <span className="font-sans text-sm sm:text-base uppercase tracking-tight font-black">
              ECWEARABLE Command Center
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 uppercase font-semibold">
              Admin v2.0
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {lowStockCount > 0 && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800 text-[11px] font-mono tabular-nums">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{lowStockCount} Low-Stock SKUs</span>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle Admin Dark Mode"
            aria-pressed={isDark}
            className={cn(
              "p-2 rounded-sm border transition-colors",
              isDark
                ? "bg-zinc-800 border-zinc-700 text-zinc-100 hover:bg-zinc-700"
                : "bg-white border-zinc-300 text-zinc-900 hover:bg-zinc-100"
            )}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Admin Navigation Sub-Bar */}
      <nav
        aria-label="Admin sections"
        className={cn(
          "px-4 sm:px-6 border-b transition-colors overflow-x-auto no-scrollbar",
          isDark ? "bg-zinc-950 border-zinc-800" : "bg-white border-zinc-200"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center gap-2 py-2.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2 px-3.5 py-2 text-xs font-sans uppercase tracking-wider rounded-sm transition-colors whitespace-nowrap border",
                  isActive
                    ? isDark
                      ? "bg-white text-zinc-950 border-white font-semibold"
                      : "bg-zinc-950 text-white border-zinc-950 font-semibold"
                    : isDark
                    ? "border-transparent text-zinc-400 hover:text-white hover:bg-zinc-900"
                    : "border-transparent text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span
                    className={cn(
                      "text-[10px] font-mono px-1.5 py-0.5 rounded-sm tabular-nums",
                      isActive
                        ? isDark
                          ? "bg-zinc-950 text-white"
                          : "bg-white text-zinc-950"
                        : isDark
                        ? "bg-zinc-800 text-zinc-300"
                        : "bg-zinc-200 text-zinc-900"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">{children}</div>
    </div>
  );
}
