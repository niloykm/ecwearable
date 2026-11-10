"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Check, ShieldCheck } from "lucide-react";
import { useCommerceStore } from "@/store/useCommerceStore";
import { formatPrice } from "@/lib/utils";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";

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

  if (!isCartOpen) return null;

  // Threshold: ৳ 1,500 / $50 as specified in prompt
  const FREE_SHIPPING_THRESHOLD = currency === "BDT" ? 1500 : 50;
  const subtotal = cart.reduce(
    (sum, item) =>
      sum + (item.product.discountPrice || item.product.basePrice) * item.quantity,
    0
  );

  const amountRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => toggleCart(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-8 sm:pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-zinc-950 shadow-2xl flex flex-col justify-between border-l border-zinc-200 dark:border-zinc-800 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
              <h2 className="font-sans text-sm sm:text-base tracking-tight uppercase font-semibold text-zinc-900 dark:text-zinc-100">
                Your Bag
              </h2>
              <span className="text-xs font-mono text-zinc-500 tabular-nums">
                ({cart.reduce((total, i) => total + i.quantity, 0)} {cart.reduce((total, i) => total + i.quantity, 0) === 1 ? 'item' : 'items'})
              </span>
            </div>
            <button
              onClick={() => toggleCart(false)}
              className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Close Shopping Bag"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3 sm:px-6 bg-zinc-50 dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex justify-between items-center text-xs font-sans mb-1.5">
              <span className="text-zinc-800 dark:text-zinc-200 font-medium">
                {amountRemaining > 0 ? (
                  <>
                    Add{" "}
                    <span className="font-mono font-bold text-zinc-900 dark:text-white tabular-nums">
                      {formatPrice(amountRemaining, currency)}
                    </span>{" "}
                    more to unlock <strong className="font-semibold text-emerald-600 dark:text-emerald-400">Free Express Delivery</strong>
                  </>
                ) : (
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>Free Nationwide Express Delivery Unlocked!</span>
                  </span>
                )}
              </span>
              <span className="text-[10px] font-mono font-semibold text-zinc-500 tabular-nums ml-2">
                {Math.round(progressPercent)}%
              </span>
            </div>
            <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 overflow-hidden">
              <div
                className="bg-zinc-900 dark:bg-zinc-100 h-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <ShoppingBag className="w-12 h-12 text-zinc-300 dark:text-zinc-700 stroke-1 mb-3" />
                <p className="font-sans font-medium text-base text-zinc-900 dark:text-zinc-100">Your bag is currently empty</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 mb-5 max-w-xs font-sans">
                  Explore our technical ripstop outerwear, heavyweight 280 GSM essentials, and utility gear.
                </p>
                <button
                  onClick={() => toggleCart(false)}
                  className="px-6 py-2.5 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs uppercase tracking-wider font-sans font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                >
                  Shop New Arrivals
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemPrice = item.product.discountPrice || item.product.basePrice;
                const imageSrc =
                  item.selectedColor.images?.[0] ||
                  item.product.colorVariants[0]?.images?.[0] ||
                  "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80";

                return (
                  <div
                    key={item.id}
                    className="flex gap-3.5 pb-4 border-b border-zinc-100 dark:border-zinc-800 last:border-b-0"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-20 h-24 flex-shrink-0 bg-zinc-100 dark:bg-zinc-900 overflow-hidden border border-zinc-200 dark:border-zinc-800">
                      <Image
                        src={optimizeCloudinaryUrl(imageSrc, { width: 160, height: 200 })}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Meta */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <Link
                            href={`/product/${item.product.slug}`}
                            onClick={() => toggleCart(false)}
                            className="font-sans text-xs font-medium text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-zinc-400 hover:text-red-500 transition-colors p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Selected Specs */}
                        <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-zinc-500 dark:text-zinc-400 font-sans">
                          <span className="flex items-center gap-1.5">
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-zinc-300 dark:border-zinc-600"
                              style={{ backgroundColor: item.selectedColor.colorHex }}
                            />
                            {item.selectedColor.colorName}
                          </span>
                          <span>•</span>
                          <span className="font-mono font-medium text-zinc-900 dark:text-zinc-100">
                            Size: {item.selectedSize.sizeLabel}
                          </span>
                        </div>

                        {/* Measurements quick spec */}
                        {unit === "INCH" && item.selectedSize.measurementsInch?.chest && (
                          <span className="text-[10px] font-mono text-zinc-400 block mt-0.5 tabular-nums">
                            Chest: {item.selectedSize.measurementsInch.chest}&quot;
                          </span>
                        )}
                        {unit === "CM" && item.selectedSize.measurementsCm?.chest && (
                          <span className="text-[10px] font-mono text-zinc-400 block mt-0.5 tabular-nums">
                            Chest: {item.selectedSize.measurementsCm.chest} cm
                          </span>
                        )}
                      </div>

                      {/* Quantity & Item Subtotal */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono font-medium tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums">
                          {formatPrice(itemPrice * item.quantity, currency)}
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
                <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-zinc-900 dark:text-zinc-100 font-medium tabular-nums">
                    {formatPrice(subtotal, currency)}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                  <span>Estimated Delivery</span>
                  <span className="font-mono text-zinc-900 dark:text-zinc-100 font-medium tabular-nums">
                    {amountRemaining === 0 ? "FREE" : formatPrice(currency === "BDT" ? 120 : 10, currency)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-zinc-900 dark:text-zinc-100 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                  <span>Order Total</span>
                  <span className="font-mono text-base font-bold tabular-nums">
                    {formatPrice(
                      subtotal + (amountRemaining === 0 ? 0 : currency === "BDT" ? 120 : 10),
                      currency
                    )}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Link
                href="/checkout"
                onClick={() => toggleCart(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs uppercase tracking-wider font-sans font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Accepted Payment Badges */}
              <div className="pt-2 text-center">
                <div className="flex items-center justify-center gap-1.5 text-[10px] uppercase font-mono tracking-wider text-zinc-400 mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Encrypted 256-Bit SSL Checkout</span>
                </div>
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <span className="px-2 py-1 text-[10px] font-mono font-bold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[#E2136E]">
                    bKash
                  </span>
                  <span className="px-2 py-1 text-[10px] font-mono font-bold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[#F7941D]">
                    Nagad
                  </span>
                  <span className="px-2 py-1 text-[10px] font-mono font-bold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[#1A1F71] dark:text-blue-400">
                    VISA
                  </span>
                  <span className="px-2 py-1 text-[10px] font-mono font-bold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[#EB001B]">
                    Mastercard
                  </span>
                  <span className="px-2 py-1 text-[10px] font-mono font-semibold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300">
                    Cash on Delivery
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
