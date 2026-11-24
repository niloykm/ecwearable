"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useCommerceStore } from "@/store/useCommerceStore";
import { formatPrice } from "@/lib/utils";
import { DEFAULT_PRODUCT_IMAGE, optimizeCloudinaryUrl } from "@/lib/cloudinary";
import { SafeImage } from "@/components/ui/SafeImage";
import { MOTION_EASE } from "@/components/motion/MotionPrimitives";

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

  useEffect(() => {
    if (!isWishlistOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") toggleWishlist(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isWishlistOpen, toggleWishlist]);

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Saved Wishlist">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: MOTION_EASE }}
            onClick={() => toggleWishlist(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

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
                  <Heart className="w-4 h-4 text-red-600 fill-red-600" />
                  <h2 className="font-sans text-sm sm:text-base tracking-tight uppercase font-bold text-zinc-950 dark:text-zinc-100">
                    Saved Wishlist
                  </h2>
                  <span className="text-xs font-mono text-zinc-500 tabular-nums">
                    ({wishlistedProducts.length})
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => toggleWishlist(false)}
                  className="p-1.5 text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-sm transition-colors"
                  aria-label="Close Wishlist"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6 space-y-5">
                {wishlistedProducts.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <Heart className="w-12 h-12 text-zinc-300 dark:text-zinc-700 stroke-1 mb-3" />
                    <p className="font-sans font-semibold text-base text-zinc-950 dark:text-zinc-100">
                      Your wishlist is empty
                    </p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 mb-6 max-w-xs font-sans leading-relaxed">
                      Tap the heart icon on any garment or wearable to bookmark it for quick sizing and checkout.
                    </p>
                    <Link
                      href="/shop"
                      onClick={() => toggleWishlist(false)}
                      className="px-6 py-2.5 bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 text-xs uppercase tracking-wider font-sans font-semibold hover:bg-zinc-800 rounded-sm transition-colors"
                    >
                      Explore Catalog
                    </Link>
                  </div>
                ) : (
                  wishlistedProducts.map((product) => {
                    const primaryImg = product.colorVariants[0]?.images[0] || DEFAULT_PRODUCT_IMAGE;

                    return (
                      <div
                        key={product.id}
                        className="flex gap-4 pb-5 border-b border-zinc-100 dark:border-zinc-800 last:border-b-0"
                      >
                        <div className="relative w-20 h-24 flex-shrink-0 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                          <SafeImage
                            src={optimizeCloudinaryUrl(primaryImg, { width: 160, height: 210 })}
                            alt={product.name}
                            fill
                            sizes="80px"
                            className="object-cover object-top"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              <Link
                                href={`/product/${product.slug}`}
                                onClick={() => toggleWishlist(false)}
                                className="font-sans text-xs font-semibold text-zinc-950 dark:text-zinc-100 hover:text-zinc-600 transition-colors line-clamp-1"
                              >
                                {product.name}
                              </Link>
                              <button
                                type="button"
                                onClick={() => toggleWishlistProduct(product.id)}
                                className="text-zinc-500 hover:text-red-600 transition-colors p-1 -mr-1 -mt-1"
                                aria-label={`Remove ${product.name} from wishlist`}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-0.5 line-clamp-1">
                              {product.subtitle}
                            </p>

                            <div className="mt-1.5 font-mono text-xs font-bold text-zinc-950 dark:text-zinc-100 tabular-nums">
                              {formatPrice(product.discountPrice || product.basePrice, currency)}
                            </div>
                          </div>

                          <div className="pt-2.5">
                            <button
                              type="button"
                              onClick={() => {
                                moveToCartFromWishlist(product.id);
                                toggleWishlist(false);
                              }}
                              className="w-full py-2 px-3 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-[11px] font-sans uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-sm transition-colors"
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
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
