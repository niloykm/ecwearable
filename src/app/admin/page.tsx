"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import {
  DollarSign,
  Package,
  Layers,
  AlertTriangle,
  ChevronRight,
  PackagePlus,
} from "lucide-react";
import { useCommerceStore } from "@/store/useCommerceStore";
import { formatPrice } from "@/lib/utils";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { OrderStatus } from "@/types/commerce";

export default function AdminDashboardPage() {
  const { products, orders, updateOrderStatus, currency } = useCommerceStore();

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const activeOrders = orders.filter(
    (o) => o.orderStatus !== "DELIVERED" && o.orderStatus !== "CANCELLED"
  );

  const apparelCount = products.filter((p) =>
    ["GARMENTS", "OUTERWEAR", "BASICS"].includes(p.mainCategory)
  ).length;
  const gearCount = products.filter((p) =>
    ["ACCESSORIES", "WEARABLES", "FOOTWEAR"].includes(p.mainCategory)
  ).length;

  const lowStockItems = products
    .flatMap((p) =>
      p.sizes
        .filter((s) => s.stock < 5)
        .map((s) => ({
          productId: p.id,
          productName: p.name,
          slug: p.slug,
          sizeLabel: s.sizeLabel,
          stock: s.stock,
        }))
    )
    .slice(0, 6);

  const categoryBreakdown = useMemo(() => {
    const groups = [
      {
        label: "Technical Outerwear & Basics",
        count: products.filter((p) => p.mainCategory === "OUTERWEAR" || p.mainCategory === "BASICS").length,
        color: "bg-zinc-950 dark:bg-white",
      },
      {
        label: "Men's & Women's Garments",
        count: products.filter((p) => p.mainCategory === "GARMENTS").length,
        color: "bg-emerald-700",
      },
      {
        label: "Accessories & Wearables",
        count: products.filter((p) => p.mainCategory === "ACCESSORIES" || p.mainCategory === "WEARABLES").length,
        color: "bg-zinc-500",
      },
      {
        label: "Footwear",
        count: products.filter((p) => p.mainCategory === "FOOTWEAR").length,
        color: "bg-orange-600",
      },
    ];
    const total = Math.max(1, products.length);
    return groups.map((g) => ({
      ...g,
      percent: Math.round((g.count / total) * 100),
    }));
  }, [products]);

  const topFabrics = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of products) {
      counts.set(p.fabricType, (counts.get(p.fabricType) || 0) + 1);
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([name, count]) => ({
        name,
        count,
        share: `${Math.round((count / Math.max(1, products.length)) * 100)}%`,
      }));
  }, [products]);

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-700 dark:text-emerald-400 font-semibold block mb-1">
              EXECUTIVE COCKPIT
            </span>
            <h1 className="font-sans text-2xl sm:text-3xl font-black uppercase tracking-tight">
              Commerce &amp; Fulfillment Overview
            </h1>
          </div>

          <Link
            href="/admin/products/new"
            className="px-4 py-2.5 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-sans uppercase tracking-wider font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-sm transition-colors flex items-center gap-2 self-start sm:self-auto"
          >
            <PackagePlus className="w-3.5 h-3.5" />
            <span>Launch New SKU</span>
          </Link>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
            <div className="flex items-center justify-between text-zinc-500 mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider">Gross Orders Volume</span>
              <DollarSign className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            </div>
            <div className="font-mono text-2xl font-bold tabular-nums">
              {formatPrice(totalRevenue, currency)}
            </div>
            <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 mt-1 block tabular-nums">
              {orders.length} recorded orders
            </span>
          </div>

          <div className="p-5 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
            <div className="flex items-center justify-between text-zinc-500 mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider">Active Fulfillment</span>
              <Package className="w-4 h-4 text-orange-600" />
            </div>
            <div className="font-mono text-2xl font-bold tabular-nums">
              {activeOrders.length} Orders
            </div>
            <span className="text-[11px] font-mono text-zinc-500 mt-1 block">In dispatch queue</span>
          </div>

          <div className="p-5 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
            <div className="flex items-center justify-between text-zinc-500 mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider">Live SKUs in Catalog</span>
              <Layers className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
            </div>
            <div className="font-mono text-2xl font-bold tabular-nums">{products.length} Styles</div>
            <span className="text-[11px] font-mono text-zinc-500 mt-1 block tabular-nums">
              {apparelCount} Apparel · {gearCount} Gear
            </span>
          </div>

          <div className="p-5 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
            <div className="flex items-center justify-between text-zinc-500 mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider">Low Inventory Alerts</span>
              <AlertTriangle className="w-4 h-4 text-orange-600" />
            </div>
            <div className="font-mono text-2xl font-bold text-orange-600 tabular-nums">
              {lowStockItems.length} Sizes
            </div>
            <span className="text-[11px] font-mono text-zinc-500 mt-1 block">Under 5 units remaining</span>
          </div>
        </div>

        {/* Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 p-6 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <h2 className="font-sans text-sm uppercase font-bold">Catalog Department Mix</h2>
              <span className="text-xs font-mono text-zinc-500">Live Inventory</span>
            </div>

            <div className="w-full h-3.5 overflow-hidden flex bg-zinc-200 dark:bg-zinc-800">
              {categoryBreakdown.map((d) => (
                <div
                  key={d.label}
                  className={`${d.color} h-full transition-all`}
                  style={{ width: `${d.percent}%` }}
                  title={`${d.label}: ${d.percent}%`}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              {categoryBreakdown.map((d) => (
                <div key={d.label} className="flex items-start gap-2.5 text-xs font-sans">
                  <span className={`w-3 h-3 mt-0.5 flex-shrink-0 ${d.color}`} />
                  <div>
                    <span className="font-semibold block">{d.label}</span>
                    <span className="font-mono text-zinc-500 text-[11px] tabular-nums">
                      {d.percent}% ({d.count} SKUs)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 p-6 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <h2 className="font-sans text-sm uppercase font-bold">Top Fabric Allocation</h2>
              <span className="text-xs font-mono text-zinc-500">By SKU Count</span>
            </div>

            <div className="space-y-3">
              {topFabrics.map((f) => (
                <div key={f.name} className="flex items-center justify-between text-xs gap-3">
                  <div className="min-w-0">
                    <span className="font-sans font-semibold block truncate">{f.name}</span>
                    <span className="text-[11px] font-mono text-zinc-500 tabular-nums">
                      {f.count} {f.count === 1 ? "style" : "styles"}
                    </span>
                  </div>
                  <span className="font-mono font-bold tabular-nums">{f.share}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Fulfillment Queue */}
        <div className="p-6 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <div>
              <h2 className="font-sans text-sm uppercase font-bold">Recent Fulfillment Queue</h2>
              <p className="text-xs font-sans text-zinc-500 mt-0.5">
                Update status directly to sync with the customer tracking docket.
              </p>
            </div>

            <Link
              href="/admin/orders"
              className="text-xs font-sans uppercase tracking-wider font-semibold hover:underline flex items-center gap-1"
            >
              <span>View All Orders</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 font-mono uppercase text-zinc-500">
                  <th className="py-2.5 px-3">Docket No</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Items / Size</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3">Fulfillment Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 font-sans">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-white dark:hover:bg-zinc-950 transition-colors">
                    <td className="py-3 px-3 font-mono font-semibold tabular-nums">
                      {order.orderNumber}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-semibold">{order.customer.fullName}</div>
                      <div className="text-[11px] text-zinc-500 font-mono">{order.customer.city}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-medium truncate max-w-xs">
                        {order.items.map((i) => `${i.product.name} (${i.selectedSize.sizeLabel})`).join(", ")}
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500 tabular-nums">
                        {order.items.length} product(s)
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold tabular-nums">
                      {formatPrice(order.total, currency)}
                    </td>
                    <td className="py-3 px-3">
                      <select
                        aria-label={`Order status for ${order.orderNumber}`}
                        value={order.orderStatus}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className="bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-sm text-xs font-mono font-semibold px-2.5 py-1 outline-none cursor-pointer"
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="PACKED">PACKED</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Link
                        href={`/orders/${order.id}`}
                        className="text-xs font-mono font-semibold hover:underline whitespace-nowrap"
                      >
                        Inspect Docket
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
