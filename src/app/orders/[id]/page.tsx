"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CheckCircle,
  Package,
  Truck,
  Clock,
  Printer,
  ShieldCheck,
  MapPin,
  Calendar,
} from "lucide-react";
import { useCommerceStore } from "@/store/useCommerceStore";
import { formatPrice } from "@/lib/utils";
import { DEFAULT_PRODUCT_IMAGE, optimizeCloudinaryUrl } from "@/lib/cloudinary";
import { SafeImage } from "@/components/ui/SafeImage";

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
    { status: "PACKED", label: "Quality Inspection & Pack", icon: Package },
    { status: "SHIPPED", label: "Courier Dispatched", icon: Truck },
    { status: "DELIVERED", label: "Delivered", icon: ShieldCheck },
  ];

  const currentStepIndex = steps.findIndex((s) => s.status === order.orderStatus);

  return (
    <div className="w-full min-h-screen bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Top Confirmation Banner */}
        <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-sm bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-400 flex-shrink-0">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-700 dark:text-emerald-400 font-semibold block">
                FULFILLMENT DOCKET
              </span>
              <h1 className="font-sans text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950 dark:text-white">
                Order Confirmed
              </h1>
              <p className="text-xs font-mono text-zinc-600 dark:text-zinc-400 mt-0.5 tabular-nums">
                Docket No: <strong className="text-zinc-950 dark:text-white">{order.orderNumber}</strong> · Placed{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 text-xs font-sans uppercase tracking-wider font-semibold text-zinc-950 dark:text-white flex items-center gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-sm transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Docket</span>
          </button>
        </div>

        {/* Live Status Stepper */}
        <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <h2 className="font-sans text-base uppercase font-bold text-zinc-950 dark:text-white">
              Live Fulfillment Progression
            </h2>
            <span className="px-2.5 py-1 text-[11px] font-mono uppercase font-bold bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
              Status: {order.orderStatus}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
            {steps.map((stepItem, idx) => {
              const isPast = idx <= currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              const StepIcon = stepItem.icon;

              return (
                <div
                  key={stepItem.status}
                  className={`p-3 border flex flex-col justify-between min-h-[88px] transition-all ${
                    isCurrent
                      ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 border-zinc-950 dark:border-white"
                      : isPast
                      ? "bg-white dark:bg-zinc-950 text-zinc-950 dark:text-white border-emerald-600/50"
                      : "bg-zinc-100 dark:bg-zinc-900/40 text-zinc-500 border-zinc-200 dark:border-zinc-800"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tabular-nums">0{idx + 1}</span>
                    <StepIcon className="w-4 h-4" />
                  </div>

                  <div>
                    <span className="font-sans text-xs font-semibold block leading-tight">
                      {stepItem.label}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] font-mono uppercase block mt-1 opacity-80">
                        Active Stage
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
            <span className="text-xs font-mono uppercase text-zinc-500 block">
              Event Log &amp; Courier Notes
            </span>
            <div className="space-y-2">
              {order.timeline.map((event, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 text-xs font-sans bg-white dark:bg-zinc-950 p-3 border border-zinc-200 dark:border-zinc-800"
                >
                  <span className="w-2 h-2 rounded-full bg-zinc-950 dark:bg-white mt-1.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-zinc-950 dark:text-white font-medium">{event.note}</p>
                    <span className="text-[10px] font-mono text-zinc-500 tabular-nums">
                      {new Date(event.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ordered Items */}
        <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 space-y-6">
          <h2 className="font-sans text-base uppercase font-bold text-zinc-950 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-3">
            Garment Specifications &amp; Receipt
          </h2>

          <div className="space-y-6 divide-y divide-zinc-200 dark:divide-zinc-800">
            {order.items.map((item) => {
              const img =
                item.selectedColor.images?.[0] ||
                item.product.colorVariants[0]?.images[0] ||
                DEFAULT_PRODUCT_IMAGE;
              const priceBdt = item.product.discountPrice || item.product.basePrice;
              const measurements =
                unit === "INCH"
                  ? item.selectedSize.measurementsInch
                  : item.selectedSize.measurementsCm;

              return (
                <div key={item.id} className="pt-6 first:pt-0 flex flex-col sm:flex-row gap-5">
                  <div className="relative w-24 h-32 bg-white dark:bg-zinc-950 overflow-hidden border border-zinc-200 dark:border-zinc-800 flex-shrink-0">
                    <SafeImage
                      src={optimizeCloudinaryUrl(img, { width: 140, height: 190 })}
                      alt={item.product.name}
                      fill
                      sizes="96px"
                      className="object-cover object-top"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="font-sans text-sm uppercase font-bold text-zinc-950 dark:text-white hover:underline"
                      >
                        {item.product.name}
                      </Link>
                      <span className="font-mono text-sm font-bold text-zinc-950 dark:text-white tabular-nums">
                        {formatPrice(priceBdt * item.quantity, currency)}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      {item.product.fabricType} ({item.product.fitType})
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-900 dark:text-zinc-100">
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-3 h-3 rounded-full border border-black/20"
                          style={{ backgroundColor: item.selectedColor.colorHex }}
                        />
                        {item.selectedColor.colorName}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>
                        Size: <strong>{item.selectedSize.sizeLabel}</strong>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">Qty: {item.quantity}</span>
                    </div>

                    {measurements && Object.keys(measurements).length > 0 && (
                      <div className="mt-2 p-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono grid grid-cols-2 sm:grid-cols-4 gap-2 text-zinc-600 dark:text-zinc-400 tabular-nums">
                        {measurements.chest && (
                          <div>
                            Chest: <strong className="text-zinc-950 dark:text-white">{measurements.chest}{unit === "INCH" ? '"' : " cm"}</strong>
                          </div>
                        )}
                        {measurements.waist && (
                          <div>
                            Waist: <strong className="text-zinc-950 dark:text-white">{measurements.waist}{unit === "INCH" ? '"' : " cm"}</strong>
                          </div>
                        )}
                        {measurements.length && (
                          <div>
                            Length: <strong className="text-zinc-950 dark:text-white">{measurements.length}{unit === "INCH" ? '"' : " cm"}</strong>
                          </div>
                        )}
                        {measurements.shoulder && (
                          <div>
                            Shoulder: <strong className="text-zinc-950 dark:text-white">{measurements.shoulder}{unit === "INCH" ? '"' : " cm"}</strong>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-5 space-y-2 text-xs font-sans max-w-xs ml-auto">
            <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
              <span>Subtotal</span>
              <span className="font-mono font-semibold text-zinc-950 dark:text-white tabular-nums">
                {formatPrice(order.subtotal, currency)}
              </span>
            </div>
            <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
              <span>Courier Delivery</span>
              <span className="font-mono font-semibold text-zinc-950 dark:text-white tabular-nums">
                {order.shippingFee === 0 ? "FREE" : formatPrice(order.shippingFee, currency)}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold text-zinc-950 dark:text-white pt-2 border-t border-zinc-200 dark:border-zinc-800">
              <span>Total Payable</span>
              <span className="font-mono tabular-nums">{formatPrice(order.total, currency)}</span>
            </div>
          </div>
        </div>

        {/* Shipping & Delivery Window */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs font-sans">
            <span className="font-mono uppercase text-[10px] text-zinc-500 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-100" />
              Shipping Destination
            </span>
            <p className="font-bold text-sm text-zinc-950 dark:text-white">{order.customer.fullName}</p>
            <p className="text-zinc-600 dark:text-zinc-400">{order.customer.address}</p>
            <p className="text-zinc-600 dark:text-zinc-400">
              {order.customer.city} ({order.customer.zone.replace("_", " ")})
            </p>
            <p className="font-mono text-zinc-950 dark:text-white pt-1">{order.customer.phone}</p>
          </div>

          <div className="p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs font-sans">
            <span className="font-mono uppercase text-[10px] text-zinc-500 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              Estimated Delivery Window
            </span>
            <p className="font-bold text-sm text-zinc-950 dark:text-white">
              {new Date(order.estimatedDelivery).toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}
            </p>
            <p className="text-zinc-600 dark:text-zinc-400">
              Payment: <strong className="text-zinc-950 dark:text-white">{order.paymentMethod.replace(/_/g, " ")}</strong> ({order.paymentStatus})
            </p>
            <p className="text-zinc-600 dark:text-zinc-400">
              Fulfillment Partner: ECWEARABLE Express Logistics
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
