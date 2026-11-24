"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import { useCommerceStore } from "@/store/useCommerceStore";
import { formatPrice } from "@/lib/utils";
import { DEFAULT_PRODUCT_IMAGE, getGarmentObjectPosition, optimizeCloudinaryUrl } from "@/lib/cloudinary";
import { SafeImage } from "@/components/ui/SafeImage";
import {
  BACKDROP_TRANSITION,
  DRAWER_TRANSITION,
  PANEL_TRANSITION,
} from "@/components/motion/MotionPrimitives";

const POPULAR_TAGS = [
  "Heavyweight Tee",
  "Cargo",
  "Windbreaker",
  "Merino",
  "Panjabi",
  "Linen Shirt",
];

export function SearchModal() {
  const { products, isSearchOpen, toggleSearch, currency } = useCommerceStore();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!isSearchOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") toggleSearch(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isSearchOpen, toggleSearch]);

  const filteredProducts = query.trim()
    ? products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.dressType.toLowerCase().includes(q) ||
          p.fabricType.toLowerCase().includes(q) ||
          p.primaryColor.toLowerCase().includes(q) ||
          p.gender.toLowerCase().includes(q) ||
          p.mainCategory.toLowerCase().includes(q)
        );
      })
    : [];

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" aria-label="Search Catalog">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={BACKDROP_TRANSITION}
            onClick={() => toggleSearch(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <div className="min-h-full flex items-start justify-center p-4 sm:p-6 md:p-20">
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.985 }}
              transition={DRAWER_TRANSITION}
              className="relative w-full max-w-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-5 sm:p-7 rounded-sm"
            >
              {/* Search Header */}
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3.5">
                <div className="flex items-center gap-3 flex-1">
                  <Search className="w-5 h-5 text-zinc-500 flex-shrink-0" />
                  <input
                    type="text"
                    autoFocus
                    placeholder="Search 280 GSM tees, ripstop cargo, merino, panjabi..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-transparent border-none outline-none font-sans text-sm sm:text-base text-zinc-950 dark:text-white placeholder:text-zinc-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => toggleSearch(false)}
                  aria-label="Close search modal"
                  className="p-1.5 text-zinc-500 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-sm transition-colors ml-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap items-center gap-2 pt-4 pb-2">
                <span className="text-[11px] font-mono uppercase text-zinc-500 mr-1">Popular:</span>
                {POPULAR_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 text-xs font-sans bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 rounded-sm transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Results */}
              <div className="mt-4 max-h-[50vh] overflow-y-auto">
                <AnimatePresence mode="wait">
                  {query.trim() && filteredProducts.length === 0 ? (
                    <motion.div
                      key="search-empty"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={PANEL_TRANSITION}
                      className="py-8 text-center text-zinc-500 text-sm font-sans"
                    >
                      No garments or wearables found matching &quot;{query}&quot;
                    </motion.div>
                  ) : filteredProducts.length > 0 ? (
                    <motion.div
                      key={`search-results-${query.trim().toLowerCase()}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={PANEL_TRANSITION}
                      className="space-y-2.5"
                    >
                      {filteredProducts.map((p) => {
                        const img = p.colorVariants[0]?.images[0] || DEFAULT_PRODUCT_IMAGE;

                        return (
                          <Link
                            key={p.id}
                            href={`/product/${p.slug}`}
                            onClick={() => toggleSearch(false)}
                            className="flex items-center justify-between gap-3 p-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 rounded-sm transition-all duration-200 group"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="relative w-12 h-14 bg-zinc-100 dark:bg-zinc-900 overflow-hidden border border-zinc-200 dark:border-zinc-800 flex-shrink-0">
                                <SafeImage
                                  src={optimizeCloudinaryUrl(img, { width: 100, height: 120 })}
                                  alt={p.name}
                                  fill
                                  sizes="48px"
                                  className={getGarmentObjectPosition(p.mainCategory)}
                                />
                              </div>
                              <div className="min-w-0">
                                <h4 className="font-sans text-xs font-semibold text-zinc-950 dark:text-zinc-100 truncate">
                                  {p.name}
                                </h4>
                                <p className="text-[11px] font-mono text-zinc-500 truncate mt-0.5">
                                  {p.fabricType} · {p.dressType}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 flex-shrink-0">
                              <span className="font-mono text-xs font-bold text-zinc-950 dark:text-zinc-100 tabular-nums">
                                {formatPrice(p.discountPrice || p.basePrice, currency)}
                              </span>
                              <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-1 transition-transform duration-200 ease-editorial" />
                            </div>
                          </Link>
                        );
                      })}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
