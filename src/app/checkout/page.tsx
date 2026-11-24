"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  ArrowRight,
  ShoppingBag,
  Lock,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { useCommerceStore } from "@/store/useCommerceStore";
import {
  FREE_SHIPPING_THRESHOLD_BDT,
  SHIPPING_FEES_BDT,
  formatPrice,
  formatShippingThreshold,
} from "@/lib/utils";
import { OrderCustomer, PaymentMethod } from "@/types/commerce";
import { DEFAULT_PRODUCT_IMAGE, optimizeCloudinaryUrl } from "@/lib/cloudinary";
import { SafeImage } from "@/components/ui/SafeImage";
import { MOTION_EASE } from "@/components/motion/MotionPrimitives";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, currency, createOrder } = useCommerceStore();

  const [step, setStep] = useState<1 | 2>(1);
  const [formError, setFormError] = useState<string>("");

  const [formData, setFormData] = useState<OrderCustomer>({
    fullName: "Niloy Kumar",
    email: "niloy.kumar@ecwearable.io",
    phone: "+880 1712 345678",
    address: "House 18, Road 7, Sector 4, Uttara",
    city: "Dhaka",
    zone: "DHAKA_METRO",
    postalCode: "1230",
    deliveryNotes: "Leave with building reception if unreachable",
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("BKASH_NAGAD");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const subtotalBdt = cart.reduce(
    (sum, item) => sum + (item.product.discountPrice || item.product.basePrice) * item.quantity,
    0
  );

  const shippingFeeBdt =
    subtotalBdt >= FREE_SHIPPING_THRESHOLD_BDT
      ? 0
      : SHIPPING_FEES_BDT[formData.zone];

  const totalBdt = subtotalBdt + shippingFeeBdt;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormError("");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleContinueToPayment = () => {
    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim()
    ) {
      setFormError("Please complete all required delivery contact and address fields.");
      return;
    }
    setFormError("");
    setStep(2);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const order = createOrder({
        items: cart,
        customer: formData,
        subtotal: subtotalBdt,
        shippingFee: shippingFeeBdt,
        total: totalBdt,
        paymentMethod,
        paymentStatus: paymentMethod === "CASH_ON_DELIVERY" ? "PENDING" : "PAID",
        orderStatus: "CONFIRMED",
      });

      router.push(`/orders/${order.id}`);
    }, 500);
  };

  if (cart.length === 0) {
    return (
      <div className="w-full min-h-[70vh] bg-white dark:bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
        <ShoppingBag className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mb-4" />
        <h2 className="font-sans text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-950 dark:text-white">
          Your Bag is Empty
        </h2>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 mb-6 max-w-sm font-sans leading-relaxed">
          Add garments or wearables from our catalog to proceed with express checkout.
        </p>
        <Link
          href="/shop"
          className="px-6 py-3 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-sans uppercase tracking-wider font-semibold rounded-sm hover:bg-zinc-800 transition-colors"
        >
          Discover Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50">
      {/* Checkout Header */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 py-6 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Lock className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <h1 className="font-sans text-lg sm:text-xl tracking-tight uppercase font-black text-zinc-950 dark:text-white">
              ECWEARABLE Express Checkout
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span
              className={`px-2.5 py-1 border rounded-sm ${
                step === 1
                  ? "bg-zinc-950 text-white border-zinc-950 dark:bg-white dark:text-zinc-950 font-bold"
                  : "border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
              }`}
            >
              1. Delivery
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            <span
              className={`px-2.5 py-1 border rounded-sm ${
                step === 2
                  ? "bg-zinc-950 text-white border-zinc-950 dark:bg-white dark:text-zinc-950 font-bold"
                  : "border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
              }`}
            >
              2. Payment &amp; Review
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Step 1 / Step 2 */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="checkout-step-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.22, ease: MOTION_EASE }}
                className="space-y-6"
              >
                <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3 flex items-center justify-between">
                  <h2 className="font-sans text-xl font-bold uppercase tracking-tight text-zinc-950 dark:text-white">
                    1. Contact &amp; Delivery Address
                  </h2>
                  <span className="text-xs font-mono text-zinc-500">Step 1 of 2</span>
                </div>

                {formError && (
                  <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-sans flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                  <div className="sm:col-span-2">
                    <label htmlFor="checkout-fullName" className="block text-zinc-600 dark:text-zinc-400 uppercase font-mono text-[10px] font-semibold mb-1.5">
                      Full Name *
                    </label>
                    <input
                      id="checkout-fullName"
                      type="text"
                      required
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-sm p-3 text-zinc-950 dark:text-white text-sm outline-none focus:border-zinc-950 dark:focus:border-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="checkout-email" className="block text-zinc-600 dark:text-zinc-400 uppercase font-mono text-[10px] font-semibold mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="checkout-email"
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-sm p-3 text-zinc-950 dark:text-white text-sm outline-none focus:border-zinc-950 dark:focus:border-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="checkout-phone" className="block text-zinc-600 dark:text-zinc-400 uppercase font-mono text-[10px] font-semibold mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-sm p-3 text-zinc-950 dark:text-white text-sm outline-none focus:border-zinc-950 dark:focus:border-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="checkout-address" className="block text-zinc-600 dark:text-zinc-400 uppercase font-mono text-[10px] font-semibold mb-1.5">
                      Street Address &amp; Apartment *
                    </label>
                    <input
                      id="checkout-address"
                      type="text"
                      required
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-sm p-3 text-zinc-950 dark:text-white text-sm outline-none focus:border-zinc-950 dark:focus:border-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="checkout-zone" className="block text-zinc-600 dark:text-zinc-400 uppercase font-mono text-[10px] font-semibold mb-1.5">
                      Delivery Zone / Speed *
                    </label>
                    <select
                      id="checkout-zone"
                      name="zone"
                      value={formData.zone}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-sm p-3 text-zinc-950 dark:text-white text-sm outline-none focus:border-zinc-950 cursor-pointer"
                    >
                      <option value="DHAKA_METRO">Dhaka Metro (24h Express)</option>
                      <option value="NATIONWIDE">Nationwide Courier (2-3 Days)</option>
                      <option value="INTERNATIONAL">International Express (DHL / 5-7 Days)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="checkout-city" className="block text-zinc-600 dark:text-zinc-400 uppercase font-mono text-[10px] font-semibold mb-1.5">
                      City / Postal Code
                    </label>
                    <input
                      id="checkout-city"
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-sm p-3 text-zinc-950 dark:text-white text-sm outline-none focus:border-zinc-950 dark:focus:border-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="checkout-notes" className="block text-zinc-600 dark:text-zinc-400 uppercase font-mono text-[10px] font-semibold mb-1.5">
                      Delivery Notes / Instructions
                    </label>
                    <textarea
                      id="checkout-notes"
                      rows={2}
                      name="deliveryNotes"
                      value={formData.deliveryNotes}
                      onChange={handleInputChange}
                      placeholder="Gate instructions, convenient delivery hour..."
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-sm p-3 text-zinc-950 dark:text-white text-sm outline-none focus:border-zinc-950 dark:focus:border-white"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleContinueToPayment}
                    className="w-full py-4 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-sans uppercase tracking-wider font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Payment &amp; Review</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="checkout-step-2"
                onSubmit={handlePlaceOrder}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.22, ease: MOTION_EASE }}
                className="space-y-6"
              >
                <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3 flex items-center justify-between">
                  <h2 className="font-sans text-xl font-bold uppercase tracking-tight text-zinc-950 dark:text-white">
                    2. Payment Method &amp; Authorization
                  </h2>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-mono text-zinc-950 dark:text-white underline"
                  >
                    Edit Address
                  </button>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      id: "BKASH_NAGAD" as const,
                      title: "bKash / Nagad Instant Mobile Payment",
                      desc: "Simulated 1-click sandbox checkout with instant confirmation.",
                    },
                    {
                      id: "CASH_ON_DELIVERY" as const,
                      title: "Cash on Delivery (Pay Upon Unboxing)",
                      desc: "Inspect your garment packaging and pay courier upon arrival.",
                    },
                    {
                      id: "CREDIT_CARD" as const,
                      title: "Credit / Debit Card (Visa, Mastercard, Amex)",
                      desc: "256-bit encrypted checkout gateway.",
                    },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-start gap-3.5 p-4 border rounded-sm cursor-pointer transition-colors ${
                        paymentMethod === opt.id
                          ? "border-zinc-950 dark:border-white bg-zinc-50 dark:bg-zinc-900"
                          : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === opt.id}
                        onChange={() => setPaymentMethod(opt.id)}
                        className="mt-1 accent-zinc-950 dark:accent-white"
                      />
                      <div>
                        <span className="font-semibold text-zinc-950 dark:text-white text-sm block">
                          {opt.title}
                        </span>
                        <span className="text-xs text-zinc-600 dark:text-zinc-400 block mt-0.5">
                          {opt.desc}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-sans space-y-1">
                  <span className="text-zinc-500 uppercase font-mono text-[10px] block">
                    Delivering To
                  </span>
                  <p className="font-semibold text-zinc-950 dark:text-white">
                    {formData.fullName} ({formData.phone})
                  </p>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {formData.address}, {formData.city}
                  </p>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="py-4 px-6 border border-zinc-300 dark:border-zinc-700 text-xs font-sans uppercase tracking-wider font-semibold rounded-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-4 px-5 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-sans uppercase tracking-wider font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-sm transition-colors flex items-center justify-center gap-2 tabular-nums"
                  >
                    {isSubmitting ? (
                      <span className="font-mono">Processing Order Receipt...</span>
                    ) : (
                      <>
                        <span>Confirm &amp; Place Order ({formatPrice(totalBdt, currency)})</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 space-y-6 self-start">
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <h2 className="font-sans text-base uppercase font-bold tracking-tight text-zinc-950 dark:text-white">
              Bag Summary
            </h2>
            <span className="font-mono text-xs text-zinc-600 dark:text-zinc-400 tabular-nums">
              {cart.reduce((s, i) => s + i.quantity, 0)} Items
            </span>
          </div>

          <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-1">
            {cart.map((item) => {
              const img =
                item.selectedColor.images?.[0] ||
                item.product.colorVariants[0]?.images[0] ||
                DEFAULT_PRODUCT_IMAGE;
              const priceBdt = item.product.discountPrice || item.product.basePrice;

              return (
                <div key={item.id} className="flex gap-3.5 text-xs">
                  <div className="relative w-16 h-20 bg-white dark:bg-zinc-950 overflow-hidden border border-zinc-200 dark:border-zinc-800 flex-shrink-0">
                    <SafeImage
                      src={optimizeCloudinaryUrl(img, { width: 120, height: 150 })}
                      alt={item.product.name}
                      fill
                      sizes="64px"
                      className="object-cover object-top"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h3 className="font-sans font-semibold text-zinc-950 dark:text-white line-clamp-1">
                        {item.product.name}
                      </h3>
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-400 font-mono mt-0.5">
                        {item.selectedColor.colorName} · Size {item.selectedSize.sizeLabel}
                      </p>
                    </div>

                    <div className="flex items-center justify-between font-mono">
                      <span className="text-zinc-600 dark:text-zinc-400 tabular-nums">Qty: {item.quantity}</span>
                      <span className="font-bold text-zinc-950 dark:text-white tabular-nums">
                        {formatPrice(priceBdt * item.quantity, currency)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 space-y-2 text-xs font-sans">
            <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
              <span>Subtotal</span>
              <span className="font-mono font-semibold text-zinc-950 dark:text-white tabular-nums">
                {formatPrice(subtotalBdt, currency)}
              </span>
            </div>
            <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
              <span>Delivery ({formData.zone.replace("_", " ")})</span>
              <span className="font-mono font-semibold text-zinc-950 dark:text-white tabular-nums">
                {shippingFeeBdt === 0 ? "FREE" : formatPrice(shippingFeeBdt, currency)}
              </span>
            </div>
            <div className="flex justify-between text-sm font-bold text-zinc-950 dark:text-white pt-3 border-t border-zinc-200 dark:border-zinc-800">
              <span>Total Payable</span>
              <span className="font-mono text-base font-bold tabular-nums">
                {formatPrice(totalBdt, currency)}
              </span>
            </div>
          </div>

          <div className="p-3.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 flex items-start gap-2.5 leading-relaxed">
            <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>
              Free nationwide shipping on orders over {formatShippingThreshold(currency)}. Every shipment includes our 7-day doorstep sizing exchange guarantee.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
