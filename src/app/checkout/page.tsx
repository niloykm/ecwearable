"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  CheckCircle,
  ArrowRight,
  ShoppingBag,
  Lock,
} from "lucide-react";
import { useCommerceStore } from "@/store/useCommerceStore";
import { formatPrice } from "@/lib/utils";
import { OrderCustomer, PaymentMethod } from "@/types/commerce";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, currency, unit, createOrder } = useCommerceStore();

  const [step, setStep] = useState<1 | 2>(1);

  // Form State
  const [formData, setFormData] = useState<OrderCustomer>({
    fullName: "Niloy Kumar",
    email: "niloy.kumar@studio.io",
    phone: "+880 1712 345678",
    address: "House 18, Road 7, Sector 4, Uttara",
    city: "Dhaka",
    zone: "DHAKA_METRO",
    postalCode: "1230",
    deliveryNotes: "Leave with building reception if unreachable",
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("BKASH_NAGAD");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const subtotal = cart.reduce(
    (sum, item) =>
      sum + (item.product.discountPrice || item.product.basePrice) * item.quantity,
    0
  );

  const shippingFee =
    formData.zone === "DHAKA_METRO"
      ? subtotal > (currency === "BDT" ? 5000 : 50)
        ? 0
        : 80
      : formData.zone === "NATIONWIDE"
      ? 150
      : 1200;

  const total = subtotal + shippingFee;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const order = createOrder({
        items: cart,
        customer: formData,
        subtotal,
        shippingFee,
        total,
        paymentMethod,
        paymentStatus: paymentMethod === "CASH_ON_DELIVERY" ? "PENDING" : "PAID",
        orderStatus: "CONFIRMED",
      });

      router.push(`/orders/${order.id}`);
    }, 800);
  };

  if (cart.length === 0) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <ShoppingBag className="w-12 h-12 text-border-subtle mb-4" />
        <h2 className="font-serif text-3xl font-light text-ink">Your Bag is Empty</h2>
        <p className="text-xs text-ink-muted mt-2 mb-6 max-w-sm font-sans">
          Add items from our garment and horology collection to proceed with express atelier checkout.
        </p>
        <Link
          href="/shop"
          className="px-6 py-3 bg-[#181816] text-[#FAF8F5] text-xs font-sans uppercase tracking-editorial"
        >
          Discover Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-canvas">
      {/* Checkout Header */}
      <div className="border-b border-border-subtle bg-canvas-elevated py-6 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Lock className="w-4 h-4 text-[#2D4A3E]" />
            <span className="font-serif text-xl tracking-tight uppercase font-semibold text-ink">
              Express Atelier Checkout
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span
              className={`px-2 py-0.5 border ${
                step === 1 ? "bg-[#181816] text-white" : "text-ink-muted"
              }`}
            >
              1. Delivery
            </span>
            <span className="text-border-subtle">➔</span>
            <span
              className={`px-2 py-0.5 border ${
                step === 2 ? "bg-[#181816] text-white" : "text-ink-muted"
              }`}
            >
              2. Payment & Confirmation
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* =========================================================
            LEFT COLUMN: Step 1 or Step 2 Form
           ========================================================= */}
        <div className="lg:col-span-7 space-y-8">
          {step === 1 ? (
            <div className="space-y-6">
              <div className="border-b border-border-subtle pb-3 flex items-center justify-between">
                <h3 className="font-serif text-2xl font-light text-ink">
                  1. Contact & Delivery Address
                </h3>
                <span className="text-xs font-mono text-ink-muted">
                  Step 1 of 2
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                <div className="sm:col-span-2">
                  <label className="block text-ink-muted uppercase font-mono text-[10px] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-canvas-elevated border border-border-subtle p-3 text-ink text-sm outline-none focus:border-ink"
                  />
                </div>

                <div>
                  <label className="block text-ink-muted uppercase font-mono text-[10px] mb-1">
                    Email Address (For Order Tracking) *
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-canvas-elevated border border-border-subtle p-3 text-ink text-sm outline-none focus:border-ink"
                  />
                </div>

                <div>
                  <label className="block text-ink-muted uppercase font-mono text-[10px] mb-1">
                    Phone Number (Active for Delivery) *
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-canvas-elevated border border-border-subtle p-3 text-ink text-sm outline-none focus:border-ink"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-ink-muted uppercase font-mono text-[10px] mb-1">
                    Street Address & Apartment Details *
                  </label>
                  <input
                    type="text"
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-canvas-elevated border border-border-subtle p-3 text-ink text-sm outline-none focus:border-ink"
                  />
                </div>

                <div>
                  <label className="block text-ink-muted uppercase font-mono text-[10px] mb-1">
                    Delivery Zone / Speed *
                  </label>
                  <select
                    name="zone"
                    value={formData.zone}
                    onChange={handleInputChange}
                    className="w-full bg-canvas-elevated border border-border-subtle p-3 text-ink text-sm outline-none focus:border-ink cursor-pointer"
                  >
                    <option value="DHAKA_METRO">Dhaka Metro (24h Express)</option>
                    <option value="NATIONWIDE">Nationwide Courier (2-3 Days)</option>
                    <option value="INTERNATIONAL">International Express (DHL / 5-7 Days)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-ink-muted uppercase font-mono text-[10px] mb-1">
                    City / Postal Code
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-canvas-elevated border border-border-subtle p-3 text-ink text-sm outline-none focus:border-ink"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-ink-muted uppercase font-mono text-[10px] mb-1">
                    Delivery Notes / Special Instructions
                  </label>
                  <textarea
                    rows={2}
                    name="deliveryNotes"
                    value={formData.deliveryNotes}
                    onChange={handleInputChange}
                    placeholder="Gate instructions, convenient delivery hour..."
                    className="w-full bg-canvas-elevated border border-border-subtle p-3 text-ink text-sm outline-none focus:border-ink"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-4 bg-[#181816] text-[#FAF8F5] text-xs font-sans uppercase tracking-editorial font-medium hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Proceed to Payment & Review</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* STEP 2: PAYMENT METHOD */
            <div className="space-y-6">
              <div className="border-b border-border-subtle pb-3 flex items-center justify-between">
                <h3 className="font-serif text-2xl font-light text-ink">
                  2. Payment Method & Authorization
                </h3>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-mono text-ink underline"
                >
                  Edit Address
                </button>
              </div>

              <div className="space-y-3">
                {/* Option 1: bKash / Nagad */}
                <label
                  className={`flex items-start gap-4 p-4 border cursor-pointer transition-colors ${
                    paymentMethod === "BKASH_NAGAD"
                      ? "border-[#181816] bg-canvas-elevated"
                      : "border-border-subtle hover:bg-canvas-elevated"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "BKASH_NAGAD"}
                    onChange={() => setPaymentMethod("BKASH_NAGAD")}
                    className="mt-1"
                  />
                  <div>
                    <span className="font-semibold text-ink text-sm block">
                      bKash / Nagad Instant Mobile Payment
                    </span>
                    <span className="text-xs text-ink-muted block mt-0.5">
                      Simulated 1-click sandbox checkout. Seamless verification.
                    </span>
                  </div>
                </label>

                {/* Option 2: Cash on Delivery */}
                <label
                  className={`flex items-start gap-4 p-4 border cursor-pointer transition-colors ${
                    paymentMethod === "CASH_ON_DELIVERY"
                      ? "border-[#181816] bg-canvas-elevated"
                      : "border-border-subtle hover:bg-canvas-elevated"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "CASH_ON_DELIVERY"}
                    onChange={() => setPaymentMethod("CASH_ON_DELIVERY")}
                    className="mt-1"
                  />
                  <div>
                    <span className="font-semibold text-ink text-sm block">
                      Cash on Delivery (Pay Upon Unboxing)
                    </span>
                    <span className="text-xs text-ink-muted block mt-0.5">
                      Inspect your garment packaging and pay courier upon delivery.
                    </span>
                  </div>
                </label>

                {/* Option 3: Card */}
                <label
                  className={`flex items-start gap-4 p-4 border cursor-pointer transition-colors ${
                    paymentMethod === "CREDIT_CARD"
                      ? "border-[#181816] bg-canvas-elevated"
                      : "border-border-subtle hover:bg-canvas-elevated"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "CREDIT_CARD"}
                    onChange={() => setPaymentMethod("CREDIT_CARD")}
                    className="mt-1"
                  />
                  <div>
                    <span className="font-semibold text-ink text-sm block">
                      Credit / Debit Card (Visa, Mastercard, Amex)
                    </span>
                    <span className="text-xs text-ink-muted block mt-0.5">
                      256-bit encrypted checkout gateway.
                    </span>
                  </div>
                </label>
              </div>

              {/* Review Deliver-To Box */}
              <div className="p-4 bg-canvas-elevated border border-border-subtle text-xs font-sans space-y-1">
                <span className="text-ink-muted uppercase font-mono text-[10px] block">
                  Delivering To:
                </span>
                <p className="font-medium text-ink">
                  {formData.fullName} ({formData.phone})
                </p>
                <p className="text-ink-muted">
                  {formData.address}, {formData.city}
                </p>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-4 px-6 border border-border-subtle text-xs font-sans uppercase tracking-editorial"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting}
                  className="flex-1 py-4 bg-[#181816] text-[#FAF8F5] text-xs font-sans uppercase tracking-editorial font-medium hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span className="font-mono">Processing Order Receipt...</span>
                  ) : (
                    <>
                      <span>Confirm & Place Atelier Order ({formatPrice(total, currency)})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* =========================================================
            RIGHT COLUMN: Order Summary Matrix
           ========================================================= */}
        <div className="lg:col-span-5 bg-canvas-elevated border border-border-subtle p-6 sm:p-8 space-y-6 self-start">
          <div className="flex items-center justify-between border-b border-border-subtle pb-3">
            <h3 className="font-serif text-lg uppercase font-semibold text-ink">
              Bag Summary
            </h3>
            <span className="font-mono text-xs text-ink-muted">
              {cart.reduce((s, i) => s + i.quantity, 0)} Items
            </span>
          </div>

          {/* Items */}
          <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-1">
            {cart.map((item) => {
              const img =
                item.selectedColor.images?.[0] ||
                item.product.colorVariants[0]?.images[0];
              const price = item.product.discountPrice || item.product.basePrice;

              return (
                <div key={item.id} className="flex gap-3 text-xs">
                  <div className="relative w-14 h-18 bg-white overflow-hidden border border-border-subtle flex-shrink-0">
                    <Image
                      src={optimizeCloudinaryUrl(img, { width: 100, height: 130 })}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-sans uppercase font-medium text-ink line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-ink-muted font-mono mt-0.5">
                        {item.selectedColor.colorName} • Size: {item.selectedSize.sizeLabel}
                      </p>
                    </div>

                    <div className="flex items-center justify-between font-mono">
                      <span className="text-ink-muted">Qty: {item.quantity}</span>
                      <span className="font-medium text-ink">
                        {formatPrice(price * item.quantity, currency)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pricing Calculation */}
          <div className="border-t border-border-subtle pt-4 space-y-2 text-xs font-sans">
            <div className="flex justify-between text-ink-muted">
              <span>Subtotal</span>
              <span className="font-mono text-ink">{formatPrice(subtotal, currency)}</span>
            </div>
            <div className="flex justify-between text-ink-muted">
              <span>Delivery ({formData.zone})</span>
              <span className="font-mono text-ink">
                {shippingFee === 0 ? "Complimentary" : formatPrice(shippingFee, currency)}
              </span>
            </div>
            <div className="flex justify-between text-sm font-semibold text-ink pt-3 border-t border-border-subtle">
              <span>Total Payable</span>
              <span className="font-mono text-base font-bold">
                {formatPrice(total, currency)}
              </span>
            </div>
          </div>

          <div className="p-3 bg-canvas border border-border-subtle text-[11px] text-ink-muted flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-[#2D4A3E] flex-shrink-0 mt-0.5" />
            <span>
              All shipments include an embossed authenticity card, fabric inspection guarantee, and plastic-free unbleached cotton storage bag.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
