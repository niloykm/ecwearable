"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, ArrowRight } from "lucide-react";
import { useCommerceStore } from "@/store/useCommerceStore";
import { formatPrice } from "@/lib/utils";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";

export function SearchModal() {
  const { products, isSearchOpen, toggleSearch, currency } = useCommerceStore();
  const [query, setQuery] = useState("");

  if (!isSearchOpen) return null;

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
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => toggleSearch(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity"
      />

      <div className="min-h-full flex items-start justify-center p-4 sm:p-6 md:p-20">
        <div className="relative w-full max-w-2xl bg-canvas border border-border-subtle shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
          {/* Search Header */}
          <div className="flex items-center justify-between border-b border-border-subtle pb-4">
            <div className="flex items-center gap-3 flex-1">
              <Search className="w-5 h-5 text-ink-muted" />
              <input
                type="text"
                autoFocus
                placeholder="Search linen shirts, sarees, watches, loafers, fabrics..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none font-sans text-base sm:text-lg text-ink placeholder:text-ink-muted/60"
              />
            </div>
            <button
              onClick={() => toggleSearch(false)}
              className="p-1 text-ink-muted hover:text-ink hover:bg-canvas-elevated rounded-full transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2 pt-4 pb-2">
            <span className="text-[11px] font-mono uppercase text-ink-muted mr-1">Popular:</span>
            {["Linen Shirt", "Panjabi", "Saree", "Chronograph Watch", "Chelsea Boots", "Kids"].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-2.5 py-1 text-xs font-sans bg-canvas-elevated hover:bg-neutral-200 text-ink border border-border-subtle transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Search Results */}
          <div className="mt-4 max-h-[50vh] overflow-y-auto space-y-3">
            {query.trim() && filteredProducts.length === 0 && (
              <div className="py-8 text-center text-ink-muted text-sm font-sans">
                No garments or wearables found matching &quot;{query}&quot;
              </div>
            )}

            {filteredProducts.map((p) => {
              const img =
                p.colorVariants[0]?.images[0] ||
                "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80";

              return (
                <Link
                  key={p.id}
                  href={`/product/${p.slug}`}
                  onClick={() => toggleSearch(false)}
                  className="flex items-center justify-between p-2.5 hover:bg-canvas-elevated border border-transparent hover:border-border-subtle transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-14 bg-canvas-elevated overflow-hidden border border-border-subtle flex-shrink-0">
                      <Image
                        src={optimizeCloudinaryUrl(img, { width: 100, height: 120 })}
                        alt={p.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-sans text-xs uppercase font-medium text-ink group-hover:text-neutral-600 transition-colors">
                        {p.name}
                      </h4>
                      <p className="text-[11px] font-serif italic text-ink-muted">
                        {p.fabricType} • {p.dressType}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-medium text-ink">
                      {formatPrice(p.discountPrice || p.basePrice, currency)}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-ink-muted group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
