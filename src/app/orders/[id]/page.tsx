"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CheckCircle,
  Package,
  Truck,
  Clock,
  Printer,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Calendar,
} from "lucide-react";
import { useCommerceStore } from "@/store/useCommerceStore";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";

export default function OrderTrackingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const { orders, currency, unit } = useCommerceStore();
  const order = orders.find(
    (o) => o.id === id || o.orderNumber.toLowerCase() === id.toLowerCase()
  );

  if (!order) {
    notFound();
  }

  const steps = [
    { status: "PENDING", label: "Order Received", icon: Clock },
    { status: "CONFIRMED", label: "Confirmed & Allocated", icon: CheckCircle },
    { status: "PACKED", label: "Atelier Packaging", icon: Package },
    { status: "SHIPPED", label: "Courier Dispatched", icon: Truck },
    { status: "DELIVERED", label: "Delivered", icon: ShieldCheck },
  ];

  const currentStepIndex = steps.findIndex((s) => s.status === order.orderStatus);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full min-h-screen bg-canvas py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-8">
        {/* Top Confirmation Banner */}
        <div className="bg-canvas-elevated border border-border-subtle p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#2D4A3E]/10 border border-[#2D4A3E]/30 flex items-center justify-center text-[#2D4A3E]">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#9E4733] block">
                Fulfillment Docket
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-light text-ink">
                Order Confirmed
              </h1>
              <p className="text-xs font-mono text-ink-muted mt-0.5">
                Docket No: <strong>{order.orderNumber}</strong> • Placed {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-canvas border border-border-subtle text-xs font-sans uppercase tracking-wider text-ink flex items-center gap-2 hover:bg-neutral-200 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Docket</span>
          </button>
        </div>

        {/* Live Status Stepper */}
        <div className="bg-canvas-elevated border border-border-subtle p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-border-subtle pb-3">
            <h3 className="font-serif text-lg uppercase font-semibold text-ink">
              Live Fulfillment Progression
            </h3>
            <Badge
              variant={
                order.orderStatus === "DELIVERED"
                  ? "cypress"
                  : order.orderStatus === "SHIPPED"
                  ? "brass"
                  : "terracotta"
              }
              size="md"
            >
              Current Status: {order.orderStatus}
            </Badge>
          </div>

          {/* Stepper Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
            {steps.map((stepItem, idx) => {
              const isPast = idx <= currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              const StepIcon = stepItem.icon;

              return (
                <div
                  key={stepItem.status}
                  className={`p-3 border flex flex-col justify-between min-h-[90px] transition-all ${
                    isCurrent
                      ? "bg-[#181816] text-[#FAF8F5] border-[#181816] shadow-subtle"
                      : isPast
                      ? "bg-canvas text-ink border-[#2D4A3E]/40"
                      : "bg-canvas-elevated text-ink-muted/50 border-border-subtle"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px]">0{idx + 1}</span>
                    <StepIcon
                      className={`w-4 h-4 ${
                        isCurrent
                          ? "text-[#C5A059]"
                          : isPast
                          ? "text-[#2D4A3E]"
                          : "text-neutral-400"
                      }`}
                    />
                  </div>

                  <div>
                    <span className="font-sans text-xs font-medium block leading-tight">
                      {stepItem.label}
                    </span>
                    {isCurrent && (
                      <span className="text-[9px] font-mono text-[#C5A059] uppercase block mt-1">
                        Active Stage
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Timeline Feed */}
          <div className="pt-4 border-t border-border-subtle space-y-3">
            <span className="text-xs font-mono uppercase text-ink-muted block">
              Event Log & Courier Notes:
            </span>
            <div className="space-y-2">
              {order.timeline.map((event, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 text-xs font-sans bg-canvas p-3 border border-border-subtle"
                >
                  <span className="w-2 h-2 rounded-full bg-[#181816] mt-1.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-ink font-medium">{event.note}</p>
                    <span className="text-[10px] font-mono text-ink-muted">
                      {new Date(event.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ordered Garments & Merchandising Specs */}
        <div className="bg-canvas-elevated border border-border-subtle p-6 sm:p-8 space-y-6">
          <h3 className="font-serif text-lg uppercase font-semibold text-ink border-b border-border-subtle pb-3">
            Garment Specifications & Atelier Receipt
          </h3>

          <div className="space-y-6 divide-y divide-border-subtle">
            {order.items.map((item) => {
              const img =
                item.selectedColor.images?.[0] ||
                item.product.colorVariants[0]?.images[0];
              const price = item.product.discountPrice || item.product.basePrice;
              const measurements =
                unit === "INCH"
                  ? item.selectedSize.measurementsInch
                  : item.selectedSize.measurementsCm;

              return (
                <div key={item.id} className="pt-6 first:pt-0 flex flex-col sm:flex-row gap-6">
                  <div className="relative w-24 h-32 bg-canvas overflow-hidden border border-border-subtle flex-shrink-0">
                    <Image
                      src={optimizeCloudinaryUrl(img, { width: 140, height: 190 })}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="font-sans text-sm uppercase font-semibold text-ink hover:underline"
                        >
                          {item.product.name}
                        </Link>
                        <span className="font-mono text-sm font-bold text-ink">
                          {formatPrice(price * item.quantity, currency)}
                        </span>
                      </div>

                      <p className="text-xs font-serif italic text-ink-muted mt-0.5">
                        {item.product.fabricType} ({item.product.fitType})
                      </p>

                      {/* Selected Attributes */}
                      <div className="flex flex-wrap items-center gap-3 mt-3 text-xs font-mono text-ink">
                        <span className="flex items-center gap-1.5">
                          <span
                            className="w-3 h-3 rounded-full border border-black/20"
                            style={{ backgroundColor: item.selectedColor.colorHex }}
                          />
                          {item.selectedColor.colorName}
                        </span>
                        <span>•</span>
                        <span>Size: <strong>{item.selectedSize.sizeLabel}</strong></span>
                        <span>•</span>
                        <span>Qty: {item.quantity}</span>
                      </div>

                      {/* Recorded Measurements */}
                      <div className="mt-3 p-2.5 bg-canvas border border-border-subtle text-[11px] font-mono grid grid-cols-2 sm:grid-cols-4 gap-2 text-ink-muted">
                        {measurements?.chest && (
                          <div>
                            Chest: <strong className="text-ink">{measurements.chest} {unit === "INCH" ? '"' : "cm"}</strong>
                          </div>
                        )}
                        {measurements?.waist && (
                          <div>
                            Waist: <strong className="text-ink">{measurements.waist} {unit === "INCH" ? '"' : "cm"}</strong>
                          </div>
                        )}
                        {measurements?.length && (
                          <div>
                            Length: <strong className="text-ink">{measurements.length} {unit === "INCH" ? '"' : "cm"}</strong>
                          </div>
                        )}
                        {measurements?.shoulder && (
                          <div>
                            Shoulder: <strong className="text-ink">{measurements.shoulder} {unit === "INCH" ? '"' : "cm"}</strong>
                          </div>
                        )}
                        {measurements?.footLength && (
                          <div>
                            Foot: <strong className="text-ink">{measurements.footLength} {unit === "INCH" ? '"' : "cm"}</strong>
                          </div>
                        )}
                        {measurements?.wristOrCase && (
                          <div>
                            Case: <strong className="text-ink">{measurements.wristOrCase} {unit === "INCH" ? '"' : "cm"}</strong>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Total Breakdown */}
          <div className="border-t border-border-subtle pt-6 space-y-2 text-xs font-sans max-w-xs ml-auto">
            <div className="flex justify-between text-ink-muted">
              <span>Subtotal</span>
              <span className="font-mono text-ink">{formatPrice(order.subtotal, currency)}</span>
            </div>
            <div className="flex justify-between text-ink-muted">
              <span>Courier Delivery</span>
              <span className="font-mono text-ink">
                {order.shippingFee === 0 ? "Complimentary" : formatPrice(order.shippingFee, currency)}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold text-ink pt-2 border-t border-border-subtle">
              <span>Total Paid</span>
              <span className="font-mono">{formatPrice(order.total, currency)}</span>
            </div>
          </div>
        </div>

        {/* Customer & Delivery Coordinates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 bg-canvas-elevated border border-border-subtle space-y-2 text-xs font-sans">
            <span className="font-mono uppercase text-[10px] text-ink-muted flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#9E4733]" />
              Shipping Destination
            </span>
            <p className="font-bold text-sm text-ink">{order.customer.fullName}</p>
            <p className="text-ink-muted">{order.customer.address}</p>
            <p className="text-ink-muted">{order.customer.city} ({order.customer.zone})</p>
            <p className="font-mono text-ink pt-1">{order.customer.phone}</p>
          </div>

          <div className="p-6 bg-canvas-elevated border border-border-subtle space-y-2 text-xs font-sans">
            <span className="font-mono uppercase text-[10px] text-ink-muted flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#2D4A3E]" />
              Estimated Delivery Window
            </span>
            <p className="font-bold text-sm text-ink">
              {new Date(order.estimatedDelivery).toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}
            </p>
            <p className="text-ink-muted">
              Payment: <strong>{order.paymentMethod.replace("_", " ")}</strong> (Status: {order.paymentStatus})
            </p>
            <p className="text-ink-muted">
              Fulfillment Partner: Dhaka Metro Atelier Express Courier
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
