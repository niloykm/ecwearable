"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Check, ShieldCheck } from "lucide-react";
import { useCommerceStore } from "@/store/useCommerceStore";
import {
  FREE_SHIPPING_THRESHOLD_BDT,
  SHIPPING_FEES_BDT,
  formatPrice,
} from "@/lib/utils";
import { DEFAULT_PRODUCT_IMAGE, optimizeCloudinaryUrl } from "@/lib/cloudinary";
import { SafeImage } from "@/components/ui/SafeImage";
import { MOTION_EASE } from "@/components/motion/MotionPrimitives";

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    toggleCart,
    removeFromCart,
    updateCartQuantity,
    currency,
    unit,
  } = useCommerceStore();

  useEffect(() => {
    if (!isCartOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") toggleCart(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isCartOpen, toggleCart]);

  const itemCount = cart.reduce((total, i) => total + i.quantity, 0);
  const subtotalBdt = cart.reduce(
    (sum, item) => sum + (item.product.discountPrice || item.product.basePrice) * item.quantity,
    0
  );

  const amountRemainingBdt = Math.max(0, FREE_SHIPPING_THRESHOLD_BDT - subtotalBdt);
  const progressPercent = Math.min(100, (subtotalBdt / FREE_SHIPPING_THRESHOLD_BDT) * 100);
  const estimatedDeliveryBdt = amountRemainingBdt === 0 ? 0 : SHIPPING_FEES_BDT.NATIONWIDE;
  const totalBdt = subtotalBdt + estimatedDeliveryBdt;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Shopping Bag">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: MOTION_EASE }}
            onClick={() => toggleCart(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Slide-over Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-8 sm:pl-10 pointer-events-none">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: MOTION_EASE }}
              className="pointer-events-auto w-screen max-w-md bg-white dark:bg-zinc-950 shadow-2xl flex flex-col justify-between border-l border-zinc-200 dark:border-zinc-800"
            >
              {/* Header */}
              <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-4 h-4 text-zinc-950 dark:text-zinc-100" />
                  <h2 className="font-sans text-sm sm:text-base tracking-tight uppercase font-bold text-zinc-950 dark:text-zinc-100">
                    Your Bag
                  </h2>
                  <span className="text-xs font-mono text-zinc-500 tabular-nums">
                    ({itemCount} {itemCount === 1 ? "item" : "items"})
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => toggleCart(false)}
                  className="p-1.5 text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-sm transition-colors"
                  aria-label="Close Shopping Bag"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Free Shipping Progress Indicator */}
              <div className="px-5 py-3.5 sm:px-6 bg-zinc-50 dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex justify-between items-center gap-2 text-xs font-sans mb-2">
                  <span className="text-zinc-800 dark:text-zinc-200 font-medium">
                    {amountRemainingBdt > 0 ? (
                      <>
                        Add{" "}
                        <span className="font-mono font-bold text-zinc-950 dark:text-white tabular-nums">
                          {formatPrice(amountRemainingBdt, currency)}
                        </span>{" "}
                        more to unlock{" "}
                        <strong className="font-semibold text-emerald-700 dark:text-emerald-400">
                          Free Express Delivery
                        </strong>
                      </>
                    ) : (
                      <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5" />
                        <span>Free Nationwide Express Delivery Unlocked</span>
                      </span>
                    )}
                  </span>
                  <span className="text-[11px] font-mono font-semibold text-zinc-600 dark:text-zinc-400 tabular-nums flex-shrink-0">
                    {Math.round(progressPercent)}%
                  </span>
                </div>
                <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 overflow-hidden">
                  <div
                    className="bg-zinc-950 dark:bg-zinc-100 h-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Item List */}
              <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <ShoppingBag className="w-12 h-12 text-zinc-300 dark:text-zinc-700 stroke-1 mb-3" />
                    <p className="font-sans font-semibold text-base text-zinc-950 dark:text-zinc-100">
                      Your bag is currently empty
                    </p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 mb-5 max-w-xs font-sans leading-relaxed">
                      Explore our technical ripstop outerwear, heavyweight 280 GSM essentials, and utility gear.
                    </p>
                    <Link
                      href="/shop?collection=new"
                      onClick={() => toggleCart(false)}
                      className="px-6 py-2.5 bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 text-xs uppercase tracking-wider font-sans font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-sm transition-colors"
                    >
                      Shop New Arrivals
                    </Link>
                  </div>
                ) : (
                  cart.map((item) => {
                    const itemPriceBdt = item.product.discountPrice || item.product.basePrice;
                    const imageSrc =
                      item.selectedColor.images?.[0] ||
                      item.product.colorVariants[0]?.images?.[0] ||
                      DEFAULT_PRODUCT_IMAGE;

                    return (
                      <div
                        key={item.id}
                        className="flex gap-3.5 pb-4 border-b border-zinc-100 dark:border-zinc-800 last:border-b-0"
                      >
                        {/* Thumbnail */}
                        <div className="relative w-20 h-24 flex-shrink-0 bg-zinc-100 dark:bg-zinc-900 overflow-hidden border border-zinc-200 dark:border-zinc-800">
                          <SafeImage
                            src={optimizeCloudinaryUrl(imageSrc, { width: 160, height: 200 })}
                            alt={item.product.name}
                            fill
                            sizes="80px"
                            className="object-cover object-top"
                          />
                        </div>

                        {/* Meta */}
                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              <Link
                                href={`/product/${item.product.slug}`}
                                onClick={() => toggleCart(false)}
                                className="font-sans text-xs font-semibold text-zinc-950 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors line-clamp-1"
                              >
                                {item.product.name}
                              </Link>
                              <button
                                type="button"
                                onClick={() => removeFromCart(item.id)}
                                className="text-zinc-500 hover:text-red-600 transition-colors p-1 -mr-1 -mt-1"
                                aria-label={`Remove ${item.product.name}`}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-zinc-600 dark:text-zinc-400 font-sans">
                              <span className="flex items-center gap-1.5">
                                <span
                                  className="w-2.5 h-2.5 rounded-full border border-zinc-300 dark:border-zinc-600"
                                  style={{ backgroundColor: item.selectedColor.colorHex }}
                                />
                                {item.selectedColor.colorName}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span className="font-mono font-semibold text-zinc-950 dark:text-zinc-100">
                                Size: {item.selectedSize.sizeLabel}
                              </span>
                            </div>

                            {unit === "INCH" && item.selectedSize.measurementsInch?.chest && (
                              <span className="text-[10px] font-mono text-zinc-500 block mt-0.5 tabular-nums">
                                Chest: {item.selectedSize.measurementsInch.chest}&quot;
                              </span>
                            )}
                            {unit === "CM" && item.selectedSize.measurementsCm?.chest && (
                              <span className="text-[10px] font-mono text-zinc-500 block mt-0.5 tabular-nums">
                                Chest: {item.selectedSize.measurementsCm.chest} cm
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between pt-2.5">
                            <div className="flex items-center border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 rounded-sm">
                              <button
                                type="button"
                                onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2.5 text-xs font-mono font-semibold tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="font-mono text-xs font-bold text-zinc-950 dark:text-zinc-100 tabular-nums">
                              {formatPrice(itemPriceBdt * item.quantity, currency)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer Checkout Module */}
              {cart.length > 0 && (
                <div className="p-5 sm:p-6 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
                  <div className="space-y-1.5 text-xs font-sans">
                    <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                      <span>Subtotal</span>
                      <span className="font-mono text-zinc-950 dark:text-zinc-100 font-semibold tabular-nums">
                        {formatPrice(subtotalBdt, currency)}
                      </span>
                    </div>
                    <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                      <span>Estimated Delivery</span>
                      <span className="font-mono text-zinc-950 dark:text-zinc-100 font-semibold tabular-nums">
                        {estimatedDeliveryBdt === 0 ? "FREE" : formatPrice(estimatedDeliveryBdt, currency)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-zinc-950 dark:text-zinc-100 pt-2.5 border-t border-zinc-200 dark:border-zinc-800">
                      <span>Order Total</span>
                      <span className="font-mono text-base font-bold tabular-nums">
                        {formatPrice(totalBdt, currency)}
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    onClick={() => toggleCart(false)}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs uppercase tracking-wider font-sans font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-sm transition-colors shadow-sm"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <div className="pt-1 text-center">
                    <div className="flex items-center justify-center gap-1.5 text-[10px] uppercase font-mono tracking-wider text-zinc-500 mb-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                      <span>Encrypted 256-Bit SSL Checkout</span>
                    </div>
                    <div className="flex items-center justify-center gap-1.5 flex-wrap">
                      <span className="px-2 py-1 text-[10px] font-mono font-bold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[#B80F58] dark:text-pink-400">
                        bKash
                      </span>
                      <span className="px-2 py-1 text-[10px] font-mono font-bold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[#B86200] dark:text-amber-400">
                        Nagad
                      </span>
                      <span className="px-2 py-1 text-[10px] font-mono font-bold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[#1A1F71] dark:text-blue-400">
                        VISA
                      </span>
                      <span className="px-2 py-1 text-[10px] font-mono font-bold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[#C40017] dark:text-red-400">
                        Mastercard
                      </span>
                      <span className="px-2 py-1 text-[10px] font-mono font-semibold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300">
                        Cash on Delivery
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
