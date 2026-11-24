"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useCommerceStore } from "@/store/useCommerceStore";
import { formatPrice } from "@/lib/utils";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { OrderStatus } from "@/types/commerce";

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus, currency, unit } = useCommerceStore();
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  const filteredOrders = orders.filter((o) => {
    if (selectedStatus === "ALL") return true;
    return o.orderStatus === selectedStatus;
  });

  const statuses: OrderStatus[] = [
    "PENDING",
    "CONFIRMED",
    "PACKED",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-700 dark:text-emerald-400 font-semibold block mb-1">
              FULFILLMENT COMMAND CENTER
            </span>
            <h1 className="font-sans text-2xl sm:text-3xl font-black uppercase tracking-tight tabular-nums">
              Customer Orders &amp; Delivery CRM ({orders.length})
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="order-status-filter" className="text-xs font-mono text-zinc-500">
              Filter by Status:
            </label>
            <select
              id="order-status-filter"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-sm text-xs font-mono px-3 py-1.5 outline-none cursor-pointer"
            >
              <option value="ALL">All Statuses ({orders.length})</option>
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s} ({orders.filter((o) => o.orderStatus === s).length})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 font-mono uppercase text-zinc-500 bg-white dark:bg-zinc-950">
                <th className="py-3 px-4">Docket No / Date</th>
                <th className="py-3 px-3">Customer &amp; Address</th>
                <th className="py-3 px-3">Garments &amp; Size Specs</th>
                <th className="py-3 px-3">Payment</th>
                <th className="py-3 px-3">Fulfillment Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 font-sans">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-white dark:hover:bg-zinc-950 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-mono font-bold text-sm block tabular-nums">
                      {order.orderNumber}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 tabular-nums">
                      {new Date(order.createdAt).toLocaleDateString()} at{" "}
                      {new Date(order.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </td>

                  <td className="py-3 px-3">
                    <div className="font-semibold">{order.customer.fullName}</div>
                    <div className="text-[11px] text-zinc-500 font-mono">{order.customer.phone}</div>
                    <div className="text-[11px] text-zinc-500 truncate max-w-xs">
                      {order.customer.address}, {order.customer.city}
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <div className="space-y-1.5 max-w-sm">
                      {order.items.map((item) => {
                        const m =
                          unit === "INCH"
                            ? item.selectedSize.measurementsInch
                            : item.selectedSize.measurementsCm;

                        return (
                          <div key={item.id} className="text-xs">
                            <span className="font-semibold">{item.product.name}</span>
                            <div className="text-[10px] font-mono text-zinc-500 flex flex-wrap items-center gap-1.5">
                              <span>
                                Size: <strong>{item.selectedSize.sizeLabel}</strong>
                              </span>
                              <span aria-hidden="true">·</span>
                              <span>Color: {item.selectedColor.colorName}</span>
                              <span aria-hidden="true">·</span>
                              <span className="tabular-nums">Qty: {item.quantity}</span>
                            </div>
                            {m?.chest && (
                              <div className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 tabular-nums">
                                Chest: {m.chest} {unit === "INCH" ? '"' : "cm"}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </td>

                  <td className="py-3 px-3 space-y-1">
                    <div className="font-mono font-bold text-sm tabular-nums">
                      {formatPrice(order.total, currency)}
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                      {order.paymentMethod.replace(/_/g, " ")}
                    </span>
                    <span
                      className={`inline-block px-2 py-0.5 text-[10px] font-mono font-semibold uppercase ${
                        order.paymentStatus === "PAID"
                          ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                          : "bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>

                  <td className="py-3 px-3">
                    <select
                      aria-label={`Fulfillment status for ${order.orderNumber}`}
                      value={order.orderStatus}
                      onChange={(e) =>
                        updateOrderStatus(order.id, e.target.value as OrderStatus)
                      }
                      className="bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-sm text-xs font-mono font-bold px-2.5 py-1 outline-none cursor-pointer"
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/orders/${order.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-sm text-xs font-mono font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap"
                    >
                      <span>Customer Tracker</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
