"use client";

import React from "react";
import Link from "next/link";
import {
  DollarSign,
  Package,
  Layers,
  AlertTriangle,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Clock,
  Sparkles,
} from "lucide-react";
import { useCommerceStore } from "@/store/useCommerceStore";
import { formatPrice } from "@/lib/utils";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/Badge";
import { OrderStatus } from "@/types/commerce";

export default function AdminDashboardPage() {
  const { products, orders, updateOrderStatus, currency } = useCommerceStore();

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const activeOrders = orders.filter(
    (o) => o.orderStatus !== "DELIVERED" && o.orderStatus !== "CANCELLED"
  );
  const garmentsCount = products.filter((p) => p.mainCategory === "GARMENTS").length;
  const wearablesCount = products.filter(
    (p) => p.mainCategory === "WEARABLES" || p.mainCategory === "FOOTWEAR"
  ).length;

  // Identify low-stock variants
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
          dressType: p.dressType,
        }))
    )
    .slice(0, 5);

  // Demographic revenue simulation
  const demographicRevenue = [
    { label: "Men's Sartorial", percent: 38, value: totalRevenue * 0.38, color: "bg-[#181816]" },
    { label: "Women's Atelier", percent: 34, value: totalRevenue * 0.34, color: "bg-[#9E4733]" },
    { label: "Timepieces & Footwear", percent: 20, value: totalRevenue * 0.2, color: "bg-[#C5A059]" },
    { label: "Children's Edit", percent: 8, value: totalRevenue * 0.08, color: "bg-[#2D4A3E]" },
  ];

  // Top fabrics
  const topFabrics = [
    { name: "Pure European Linen", share: "42%", count: "8 Styles" },
    { name: "100% GOTS Organic Cotton", share: "28%", count: "6 Styles" },
    { name: "Mulberry Silk & Dhakai Muslin", share: "18%", count: "2 Styles" },
    { name: "Full-Grain Italian Leather & 316L", share: "12%", count: "4 Styles" },
  ];

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#C5A059] block mb-1">
              Executive Cockpit
            </span>
            <h1 className="font-serif text-3xl font-light">
              Commerce & Fulfillment Overview
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/products/new"
              className="px-4 py-2.5 bg-[#181816] text-[#FAF8F5] text-xs font-sans uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Launch New SKU</span>
            </Link>
          </div>
        </div>

        {/* =========================================================
            KPI CARDS
           ========================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* KPI 1 */}
          <div className="p-5 border border-border-subtle bg-canvas-elevated">
            <div className="flex items-center justify-between text-ink-muted mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider">
                Gross Orders Volume
              </span>
              <DollarSign className="w-4 h-4 text-[#2D4A3E]" />
            </div>
            <div className="font-mono text-2xl font-bold text-ink">
              {formatPrice(totalRevenue, currency)}
            </div>
            <span className="text-[10px] font-mono text-[#2D4A3E] mt-1 block">
              ↑ 18.4% vs last cycle
            </span>
          </div>

          {/* KPI 2 */}
          <div className="p-5 border border-border-subtle bg-canvas-elevated">
            <div className="flex items-center justify-between text-ink-muted mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider">
                Active Fulfillment
              </span>
              <Package className="w-4 h-4 text-[#9E4733]" />
            </div>
            <div className="font-mono text-2xl font-bold text-ink">
              {activeOrders.length} Orders
            </div>
            <span className="text-[10px] font-mono text-ink-muted mt-1 block">
              In dispatch queue
            </span>
          </div>

          {/* KPI 3 */}
          <div className="p-5 border border-border-subtle bg-canvas-elevated">
            <div className="flex items-center justify-between text-ink-muted mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider">
                Live SKUs in Studio
              </span>
              <Layers className="w-4 h-4 text-[#C5A059]" />
            </div>
            <div className="font-mono text-2xl font-bold text-ink">
              {products.length} Styles
            </div>
            <span className="text-[10px] font-mono text-ink-muted mt-1 block">
              {garmentsCount} Garments • {wearablesCount} Wearables
            </span>
          </div>

          {/* KPI 4 */}
          <div className="p-5 border border-border-subtle bg-canvas-elevated">
            <div className="flex items-center justify-between text-ink-muted mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider">
                Low Inventory Alerts
              </span>
              <AlertTriangle className="w-4 h-4 text-[#9E4733]" />
            </div>
            <div className="font-mono text-2xl font-bold text-[#9E4733]">
              {lowStockItems.length} Sizes
            </div>
            <span className="text-[10px] font-mono text-ink-muted mt-1 block">
              Under 5 units remaining
            </span>
          </div>
        </div>

        {/* =========================================================
            VISUALIZATIONS: DEMOGRAPHIC REVENUE & TOP FABRICS
           ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Demographic Breakdown */}
          <div className="lg:col-span-7 p-6 border border-border-subtle bg-canvas-elevated space-y-4">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <h3 className="font-serif text-lg uppercase font-semibold text-ink">
                Revenue Contribution by Demographic
              </h3>
              <span className="text-xs font-mono text-ink-muted">Live Share</span>
            </div>

            {/* Visual Bar */}
            <div className="w-full h-4 rounded-none overflow-hidden flex bg-neutral-200">
              {demographicRevenue.map((d) => (
                <div
                  key={d.label}
                  className={`${d.color} h-full transition-all`}
                  style={{ width: `${d.percent}%` }}
                  title={`${d.label}: ${d.percent}%`}
                />
              ))}
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {demographicRevenue.map((d) => (
                <div key={d.label} className="flex items-start gap-2.5 text-xs font-sans">
                  <span className={`w-3 h-3 rounded-none mt-0.5 flex-shrink-0 ${d.color}`} />
                  <div>
                    <span className="font-medium text-ink block">{d.label}</span>
                    <span className="font-mono text-ink-muted text-[11px]">
                      {d.percent}% ({formatPrice(d.value, currency)})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Selling Fabrics */}
          <div className="lg:col-span-5 p-6 border border-border-subtle bg-canvas-elevated space-y-4">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <h3 className="font-serif text-lg uppercase font-semibold text-ink">
                Sartorial Fabric Share
              </h3>
              <span className="text-xs font-mono text-ink-muted">By Demand</span>
            </div>

            <div className="space-y-3">
              {topFabrics.map((f) => (
                <div key={f.name} className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-sans font-medium text-ink block">{f.name}</span>
                    <span className="text-[10px] font-mono text-ink-muted">{f.count}</span>
                  </div>
                  <span className="font-mono font-bold text-ink">{f.share}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================
            RECENT ORDERS & 1-CLICK STATUS WORKFLOW
           ========================================================= */}
        <div className="p-6 border border-border-subtle bg-canvas-elevated space-y-4">
          <div className="flex items-center justify-between border-b border-border-subtle pb-3">
            <div>
              <h3 className="font-serif text-lg uppercase font-semibold text-ink">
                Recent Fulfillment Queue
              </h3>
              <p className="text-xs font-sans text-ink-muted mt-0.5">
                Update status directly from dropdown—immediately syncs to the customer tracking page.
              </p>
            </div>

            <Link
              href="/admin/orders"
              className="text-xs font-sans uppercase tracking-wider text-ink hover:underline flex items-center gap-1"
            >
              <span>View All Orders</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border-subtle font-mono uppercase text-ink-muted">
                  <th className="py-2.5 px-3">Docket No</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Items / Size</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3">Fulfillment Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle font-sans">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-canvas transition-colors">
                    <td className="py-3 px-3 font-mono font-semibold text-ink">
                      {order.orderNumber}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-medium text-ink">{order.customer.fullName}</div>
                      <div className="text-[11px] text-ink-muted font-mono">{order.customer.city}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="text-ink font-medium truncate max-w-xs">
                        {order.items.map((i) => `${i.product.name} (${i.selectedSize.sizeLabel})`).join(", ")}
                      </div>
                      <span className="text-[10px] font-mono text-ink-muted">
                        {order.items.length} product(s)
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-ink">
                      {formatPrice(order.total, currency)}
                    </td>
                    <td className="py-3 px-3">
                      {/* 1-Click Status Dropdown */}
                      <select
                        value={order.orderStatus}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value as OrderStatus)
                        }
                        className="bg-canvas border border-border-subtle text-xs font-mono font-semibold px-2.5 py-1 text-ink outline-none cursor-pointer"
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
                        target="_blank"
                        className="text-xs font-mono text-ink hover:underline"
                      >
                        Inspect Docket ↗
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
