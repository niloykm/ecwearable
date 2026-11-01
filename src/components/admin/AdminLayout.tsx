"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PackagePlus,
  ShoppingBag,
  Package,
  Layers,
  ArrowLeft,
  Moon,
  Sun,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCommerceStore } from "@/store/useCommerceStore";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { products, orders } = useCommerceStore();
  const [isDark, setIsDark] = useState<boolean>(false);

  const lowStockCount = products.filter((p) =>
    p.sizes.some((s) => s.stock < 5)
  ).length;

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
    <div className={cn("min-h-screen transition-colors duration-200", isDark ? "dark bg-[#0C0C0B] text-[#FAF8F5]" : "bg-canvas text-ink")}>
      {/* Top Admin Command Header */}
      <header className={cn("sticky top-0 z-40 border-b transition-colors px-6 py-3 flex items-center justify-between", isDark ? "bg-[#141413] border-[#2A2A27]" : "bg-canvas-elevated border-border-subtle")}>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-ink-muted hover:text-ink transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Storefront</span>
          </Link>
          <span className="text-border-subtle">|</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
            <span className="font-serif text-lg uppercase tracking-tight font-bold">
              Aurelia Command Center
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-[#181816] text-[#FAF8F5] uppercase">
              Admin v1.0
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {lowStockCount > 0 && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-[#9E4733]/15 text-[#9E4733] border border-[#9E4733]/30 text-[11px] font-mono">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{lowStockCount} Low-Stock SKUs</span>
            </div>
          )}

          {/* Obsidian Dark Mode Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle High-Contrast Obsidian Theme"
            className={cn(
              "p-2 rounded-full border transition-colors",
              isDark
                ? "bg-[#2A2A27] border-[#3E3E3A] text-[#FAF8F5]"
                : "bg-canvas border-border-subtle text-ink hover:bg-neutral-200"
            )}
          >
            {isDark ? <Sun className="w-4 h-4 text-[#C5A059]" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Admin Navigation Sub-Bar */}
      <nav className={cn("px-6 border-b transition-colors overflow-x-auto no-scrollbar", isDark ? "bg-[#161614] border-[#2A2A27]" : "bg-canvas border-border-subtle")}>
        <div className="max-w-7xl mx-auto flex items-center gap-2 py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-3.5 py-2 text-xs font-sans uppercase tracking-wider transition-all whitespace-nowrap border",
                  isActive
                    ? isDark
                      ? "bg-[#FAF8F5] text-[#0C0C0B] border-[#FAF8F5] font-semibold"
                      : "bg-[#181816] text-[#FAF8F5] border-[#181816] font-semibold"
                    : isDark
                    ? "border-transparent text-neutral-400 hover:text-white"
                    : "border-transparent text-ink-muted hover:text-ink hover:bg-canvas-elevated"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span
                    className={cn(
                      "text-[10px] font-mono px-1.5 py-0.2 rounded-full",
                      isActive
                        ? isDark
                          ? "bg-black text-white"
                          : "bg-white text-black"
                        : isDark
                        ? "bg-[#2A2A27] text-neutral-300"
                        : "bg-[#E5E0D8] text-ink"
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

      {/* Admin Main Body */}
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
