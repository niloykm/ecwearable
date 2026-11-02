"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useCommerceStore } from "@/store/useCommerceStore";
import { formatPrice } from "@/lib/utils";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";

export function WishlistDrawer() {
  const {
    wishlist,
    products,
    isWishlistOpen,
    toggleWishlist,
    toggleWishlistProduct,
    moveToCartFromWishlist,
    currency,
  } = useCommerceStore();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => toggleWishlist(false)}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-canvas shadow-drawer flex flex-col justify-between border-l border-border-subtle animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-border-subtle flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#9E4733] fill-[#9E4733]" />
              <h2 className="font-serif text-xl tracking-tight uppercase font-semibold text-ink">
                Saved Wishlist
              </h2>
              <span className="text-xs font-mono text-ink-muted">
                ({wishlistedProducts.length})
              </span>
            </div>
            <button
              onClick={() => toggleWishlist(false)}
              className="p-2 text-ink-muted hover:text-ink hover:bg-canvas-elevated rounded-full transition-colors"
              aria-label="Close Wishlist"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Product Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {wishlistedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <Heart className="w-12 h-12 text-border-subtle stroke-1 mb-4" />
                <p className="font-serif text-lg text-ink">Your wishlist is empty</p>
                <p className="text-xs text-ink-muted mt-1 mb-6 max-w-xs font-sans">
                  Tap the heart icon on any garment or wearable to save it for future curation.
                </p>
                <button
                  onClick={() => toggleWishlist(false)}
                  className="px-6 py-2.5 bg-[#181816] text-[#FAF8F5] text-xs uppercase tracking-editorial font-sans hover:bg-neutral-800 transition-colors"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              wishlistedProducts.map((product) => {
                const primaryImg =
                  product.colorVariants[0]?.images[0] ||
                  "https://res.cloudinary.com/dg5gwims9/image/upload/v1793617661/aurelia_studio/img_1596755094514f87.jpg";

                return (
                  <div
                    key={product.id}
                    className="flex gap-4 pb-6 border-b border-border-subtle last:border-b-0"
                  >
                    <div className="relative w-20 h-26 flex-shrink-0 bg-canvas-elevated border border-border-subtle overflow-hidden">
                      <Image
                        src={optimizeCloudinaryUrl(primaryImg, { width: 160, height: 210 })}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <Link
                            href={`/product/${product.slug}`}
                            onClick={() => toggleWishlist(false)}
                            className="font-sans text-xs uppercase font-medium text-ink hover:text-ink-muted transition-colors line-clamp-1"
                          >
                            {product.name}
                          </Link>
                          <button
                            onClick={() => toggleWishlistProduct(product.id)}
                            className="text-ink-muted hover:text-[#9E4733] transition-colors p-1"
                            aria-label="Remove from wishlist"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-[11px] font-serif italic text-ink-muted mt-0.5">
                          {product.subtitle}
                        </p>

                        <div className="mt-1 font-mono text-xs font-semibold text-ink">
                          {formatPrice(product.discountPrice || product.basePrice, currency)}
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={() => {
                            moveToCartFromWishlist(product.id);
                          }}
                          className="w-full py-1.5 px-3 bg-[#181816] text-[#FAF8F5] text-[11px] font-sans uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-neutral-800 transition-colors"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Move to Bag</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
