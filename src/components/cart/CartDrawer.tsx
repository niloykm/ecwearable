"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Check } from "lucide-react";
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

  const FREE_SHIPPING_THRESHOLD = currency === "BDT" ? 5000 : 50;
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
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-canvas shadow-drawer flex flex-col justify-between border-l border-border-subtle animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-border-subtle flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-ink" />
              <h2 className="font-serif text-xl tracking-tight uppercase font-semibold text-ink">
                Shopping Bag
              </h2>
              <span className="text-xs font-mono text-ink-muted">
                ({cart.reduce((total, i) => total + i.quantity, 0)})
              </span>
            </div>
            <button
              onClick={() => toggleCart(false)}
              className="p-2 text-ink-muted hover:text-ink hover:bg-canvas-elevated rounded-full transition-colors"
              aria-label="Close Shopping Bag"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3 bg-canvas-elevated border-b border-border-subtle">
            <div className="flex justify-between text-xs font-sans mb-1.5">
              <span className="text-ink font-medium">
                {amountRemaining > 0 ? (
                  <>
                    Add{" "}
                    <span className="font-mono font-bold text-[#9E4733]">
                      {formatPrice(amountRemaining, currency)}
                    </span>{" "}
                    more for complimentary delivery
                  </>
                ) : (
                  <span className="text-[#2D4A3E] font-medium flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Complimentary express delivery unlocked</span>
                  </span>
                )}
              </span>
              <span className="text-[10px] font-mono text-ink-muted">
                {Math.round(progressPercent)}%
              </span>
            </div>
            <div className="w-full bg-[#E5E0D8] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#181816] h-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <ShoppingBag className="w-12 h-12 text-border-subtle stroke-1 mb-4" />
                <p className="font-serif text-lg text-ink">Your bag is currently empty</p>
                <p className="text-xs text-ink-muted mt-1 mb-6 max-w-xs font-sans">
                  Discover our new season garments tailored from Normandy linen, Dhaka muslin, and luxury horology.
                </p>
                <button
                  onClick={() => toggleCart(false)}
                  className="px-6 py-2.5 bg-[#181816] text-[#FAF8F5] text-xs uppercase tracking-editorial font-sans hover:bg-neutral-800 transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemPrice = item.product.discountPrice || item.product.basePrice;
                const imageSrc =
                  item.selectedColor.images?.[0] ||
                  item.product.colorVariants[0]?.images?.[0];

                return (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-6 border-b border-border-subtle last:border-b-0"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-20 h-26 flex-shrink-0 bg-canvas-elevated overflow-hidden border border-border-subtle">
                      <Image
                        src={optimizeCloudinaryUrl(imageSrc, { width: 160, height: 210 })}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Meta */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <Link
                            href={`/product/${item.product.slug}`}
                            onClick={() => toggleCart(false)}
                            className="font-sans text-xs uppercase font-medium text-ink hover:text-ink-muted transition-colors line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-ink-muted hover:text-[#9E4733] transition-colors p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Selected Specs */}
                        <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-ink-muted font-sans">
                          <span className="flex items-center gap-1">
                            <span
                              className="w-2.5 h-2.5 rounded-full border"
                              style={{ backgroundColor: item.selectedColor.colorHex }}
                            />
                            {item.selectedColor.colorName}
                          </span>
                          <span>•</span>
                          <span className="font-mono font-medium text-ink">
                            Size: {item.selectedSize.sizeLabel}
                          </span>
                        </div>

                        {/* Measurements quick spec */}
                        {unit === "INCH" && item.selectedSize.measurementsInch?.chest && (
                          <span className="text-[10px] font-mono text-ink-muted block mt-0.5">
                            Chest: {item.selectedSize.measurementsInch.chest}&quot;
                          </span>
                        )}
                        {unit === "CM" && item.selectedSize.measurementsCm?.chest && (
                          <span className="text-[10px] font-mono text-ink-muted block mt-0.5">
                            Chest: {item.selectedSize.measurementsCm.chest} cm
                          </span>
                        )}
                      </div>

                      {/* Quantity & Item Subtotal */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-border-subtle bg-canvas-elevated">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-neutral-200 text-ink transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-mono font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-neutral-200 text-ink transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-mono text-xs font-semibold text-ink">
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
            <div className="p-6 bg-canvas-elevated border-t border-border-subtle space-y-4">
              <div className="space-y-1.5 text-xs font-sans">
                <div className="flex justify-between text-ink-muted">
                  <span>Subtotal</span>
                  <span className="font-mono text-ink font-medium">
                    {formatPrice(subtotal, currency)}
                  </span>
                </div>
                <div className="flex justify-between text-ink-muted">
                  <span>Delivery Estimate</span>
                  <span className="font-mono text-ink font-medium">
                    {amountRemaining === 0 ? "Complimentary" : formatPrice(120, currency)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-ink pt-2 border-t border-border-subtle">
                  <span>Total</span>
                  <span className="font-mono text-base font-bold">
                    {formatPrice(
                      subtotal + (amountRemaining === 0 ? 0 : 120),
                      currency
                    )}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                onClick={() => toggleCart(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#181816] text-[#FAF8F5] text-xs uppercase tracking-editorial font-medium hover:bg-neutral-800 transition-colors"
              >
                <span>Proceed to Express Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
