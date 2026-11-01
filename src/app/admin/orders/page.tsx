"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  ExternalLink,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  Truck,
  Filter,
} from "lucide-react";
import { useCommerceStore } from "@/store/useCommerceStore";
import { formatPrice } from "@/lib/utils";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/Badge";
import { OrderStatus } from "@/types/commerce";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus, currency, unit } = useCommerceStore();
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [activeModalOrder, setActiveModalOrder] = useState<string | null>(null);

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
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#C5A059] block mb-1">
              Fulfillment Command Center
            </span>
            <h1 className="font-serif text-3xl font-light">
              Customer Orders & Delivery CRM ({orders.length})
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-ink-muted">Filter by Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-canvas-elevated border border-border-subtle text-xs font-mono px-3 py-1.5 text-ink outline-none cursor-pointer"
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

        {/* Orders Table */}
        <div className="border border-border-subtle bg-canvas-elevated overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border-subtle font-mono uppercase text-ink-muted bg-canvas">
                <th className="py-3 px-4">Docket No / Date</th>
                <th className="py-3 px-3">Customer & Address</th>
                <th className="py-3 px-3">Garments & Size Specs</th>
                <th className="py-3 px-3">Payment</th>
                <th className="py-3 px-3">Fulfillment Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle font-sans">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-canvas transition-colors">
                  {/* Order Number */}
                  <td className="py-3 px-4">
                    <span className="font-mono font-bold text-sm block text-ink">
                      {order.orderNumber}
                    </span>
                    <span className="text-[10px] font-mono text-ink-muted">
                      {new Date(order.createdAt).toLocaleDateString()} at{" "}
                      {new Date(order.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </td>

                  {/* Customer */}
                  <td className="py-3 px-3">
                    <div className="font-semibold text-ink">{order.customer.fullName}</div>
                    <div className="text-[11px] text-ink-muted font-mono">{order.customer.phone}</div>
                    <div className="text-[11px] text-ink-muted truncate max-w-xs">
                      {order.customer.address}, {order.customer.city}
                    </div>
                  </td>

                  {/* Items */}
                  <td className="py-3 px-3">
                    <div className="space-y-1.5 max-w-sm">
                      {order.items.map((item) => {
                        const m =
                          unit === "INCH"
                            ? item.selectedSize.measurementsInch
                            : item.selectedSize.measurementsCm;

                        return (
                          <div key={item.id} className="text-xs">
                            <span className="font-medium text-ink">
                              {item.product.name}
                            </span>
                            <div className="text-[10px] font-mono text-ink-muted flex items-center gap-1.5">
                              <span>Size: <strong>{item.selectedSize.sizeLabel}</strong></span>
                              <span>•</span>
                              <span>Color: {item.selectedColor.colorName}</span>
                              <span>•</span>
                              <span>Qty: {item.quantity}</span>
                            </div>
                            {m?.chest && (
                              <div className="text-[9px] font-mono text-[#2D4A3E]">
                                Chest: {m.chest} {unit === "INCH" ? '"' : "cm"}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </td>

                  {/* Payment */}
                  <td className="py-3 px-3">
                    <div className="font-mono font-bold text-sm text-ink">
                      {formatPrice(order.total, currency)}
                    </div>
                    <span className="text-[10px] font-mono text-ink-muted uppercase block">
                      {order.paymentMethod.replace("_", " ")}
                    </span>
                    <Badge
                      variant={order.paymentStatus === "PAID" ? "cypress" : "terracotta"}
                      size="sm"
                    >
                      {order.paymentStatus}
                    </Badge>
                  </td>

                  {/* Status Dropdown */}
                  <td className="py-3 px-3">
                    <select
                      value={order.orderStatus}
                      onChange={(e) =>
                        updateOrderStatus(order.id, e.target.value as OrderStatus)
                      }
                      className="bg-canvas border border-border-subtle text-xs font-mono font-bold px-2.5 py-1 text-ink outline-none cursor-pointer"
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Action */}
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/orders/${order.id}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 px-3 py-1 bg-canvas border border-border-subtle text-xs font-mono text-ink hover:bg-neutral-200 transition-colors"
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
