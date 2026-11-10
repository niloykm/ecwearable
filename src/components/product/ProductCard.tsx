"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Check, Plus } from "lucide-react";
import { Product, ColorVariant } from "@/types/commerce";
import { useCommerceStore } from "@/store/useCommerceStore";
import { formatPrice, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { isInWishlist, toggleWishlistProduct, addToCart, currency, toggleCart } = useCommerceStore();
  const isWishlisted = isInWishlist(product.id);

  // Active color swatch state
  const [activeColor, setActiveColor] = useState<ColorVariant>(
    product.colorVariants[0] || {
      colorName: product.primaryColor,
      colorHex: product.primaryColorHex,
      images: [],
    }
  );

  // Added animation notification state
  const [justAddedSize, setJustAddedSize] = useState<string | null>(null);

  const primaryImage =
    activeColor.images?.[0] ||
    product.colorVariants?.[0]?.images?.[0] ||
    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80";

  const hoverImage =
    activeColor.images?.[1] ||
    product.colorVariants?.[0]?.images?.[1] ||
    primaryImage;

  const handleQuickAdd = (e: React.MouseEvent, sizeLabel: string) => {
    e.preventDefault();
    e.stopPropagation();

    const selectedSize = product.sizes.find((s) => s.sizeLabel === sizeLabel) || product.sizes[0];
    addToCart(product, activeColor, selectedSize, 1);
    setJustAddedSize(sizeLabel);
    toggleCart(true);

    setTimeout(() => {
      setJustAddedSize(null);
    }, 1200);
  };

  const handleColorChange = (e: React.MouseEvent, color: ColorVariant) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveColor(color);
  };

  // Determine low stock or badge
  const totalStock = product.sizes.reduce((acc, s) => acc + s.stock, 0);
  const isLowStock = totalStock > 0 && totalStock <= 12;

  return (
    <div className="group relative flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 transition-all duration-300 hover:border-zinc-400 dark:hover:border-zinc-700">
      {/* Image Container with crisp aspect-[3/4] portrait ratio */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <Link href={`/product/${product.slug}`} className="block h-full w-full">
          {/* Primary Lookbook Image */}
          <Image
            src={optimizeCloudinaryUrl(primaryImage, { width: 800, height: 1067, quality: "auto:best" })}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            className="object-cover object-center transition-opacity duration-300 ease-out group-hover:opacity-0"
          />

          {/* Secondary Detail/Hover Image */}
          <Image
            src={optimizeCloudinaryUrl(hoverImage, { width: 800, height: 1067, quality: "auto:best" })}
            alt={`${product.name} alternate angle`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.badge ? (
            <span className="px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase font-semibold bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
              {product.badge}
            </span>
          ) : product.isNewCollection ? (
            <span className="px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase font-semibold bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
              NEW
            </span>
          ) : null}

          {isLowStock && (
            <span className="px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase font-semibold bg-orange-600 text-white">
              LOW STOCK
            </span>
          )}

          {product.fabricType.toLowerCase().includes("organic") && !product.badge && (
            <span className="px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase font-semibold bg-[#365314] text-white">
              ORGANIC COTTON
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlistProduct(product.id);
          }}
          aria-label="Save to Wishlist"
          className={cn(
            "absolute top-2.5 right-2.5 z-10 p-2 transition-all duration-200 border",
            isWishlisted
              ? "bg-zinc-900 text-white border-zinc-900"
              : "bg-white/90 text-zinc-800 border-zinc-200 hover:bg-zinc-900 hover:text-white dark:bg-zinc-900/90 dark:text-zinc-200 opacity-0 group-hover:opacity-100"
          )}
        >
          <Heart
            className={cn("w-3.5 h-3.5 transition-transform active:scale-75", isWishlisted && "fill-current text-red-500")}
          />
        </button>

        {/* Quick Size Selector Drawer - Slides up on card hover */}
        <div className="absolute inset-x-0 bottom-0 z-10 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 bg-zinc-950/95 backdrop-blur-md p-2.5 text-white border-t border-zinc-800">
          <div className="flex items-center justify-between px-1 mb-1.5">
            <span className="text-[10px] tracking-wider uppercase text-zinc-400 font-sans font-medium">
              Quick Add Size
            </span>
            <span className="text-[10px] font-mono text-zinc-400">
              {product.sizes.length} Sizes
            </span>
          </div>

          <div className="flex items-center justify-start gap-1 flex-wrap">
            {product.sizes.map((size) => {
              const isSelected = justAddedSize === size.sizeLabel;
              const isOutOfStock = size.stock === 0;

              return (
                <button
                  key={size.sizeLabel}
                  onClick={(e) => handleQuickAdd(e, size.sizeLabel)}
                  disabled={isOutOfStock}
                  className={cn(
                    "min-w-[32px] h-[28px] px-1.5 text-[10px] font-mono font-medium transition-all flex items-center justify-center border",
                    isOutOfStock
                      ? "border-zinc-800 text-zinc-600 line-through cursor-not-allowed bg-zinc-900/40"
                      : isSelected
                      ? "bg-emerald-600 border-emerald-600 text-white"
                      : "border-zinc-700 bg-zinc-900 hover:bg-white hover:text-black hover:border-white text-zinc-200"
                  )}
                  title={isOutOfStock ? `${size.sizeLabel} (Out of Stock)` : `${size.sizeLabel} (In Stock: ${size.stock})`}
                >
                  {isSelected ? <Check className="w-3 h-3 text-white" /> : size.sizeLabel}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="flex flex-col p-3">
        {/* Color Swatch Dots & Fabric Weight */}
        <div className="flex items-center justify-between mb-1.5">
          {product.colorVariants.length > 1 ? (
            <div className="flex items-center gap-1.5">
              {product.colorVariants.map((c) => (
                <button
                  key={c.colorName}
                  onClick={(e) => handleColorChange(e, c)}
                  onMouseEnter={(e) => handleColorChange(e, c)}
                  aria-label={`Select ${c.colorName}`}
                  title={c.colorName}
                  className={cn(
                    "w-3.5 h-3.5 rounded-full border transition-all",
                    activeColor.colorName === c.colorName
                      ? "ring-1 ring-offset-1 ring-zinc-900 dark:ring-zinc-100 scale-110 border-zinc-400"
                      : "opacity-70 hover:opacity-100 border-zinc-300 dark:border-zinc-700"
                  )}
                  style={{ backgroundColor: c.colorHex }}
                />
              ))}
            </div>
          ) : (
            <span className="text-[10px] tracking-wider uppercase text-zinc-500 font-sans font-medium">
              {product.primaryColor}
            </span>
          )}

          {product.fabricWeightGsm ? (
            <span className="text-[10px] font-mono text-zinc-500 tabular-nums">
              {product.fabricWeightGsm} GSM
            </span>
          ) : (
            <span className="text-[10px] font-mono text-zinc-500">
              {product.dressType}
            </span>
          )}
        </div>

        {/* Product Name */}
        <Link
          href={`/product/${product.slug}`}
          className="font-sans text-xs md:text-sm font-medium tracking-tight text-zinc-900 dark:text-zinc-50 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors line-clamp-1"
        >
          {product.name}
        </Link>

        {/* Subtitle / Fabric Callout */}
        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
          {product.subtitle}
        </p>

        {/* Pricing formatted with font-mono tabular-nums */}
        <div className="flex items-center gap-2 mt-2 pt-1 border-t border-zinc-100 dark:border-zinc-800">
          {product.discountPrice ? (
            <>
              <span className="font-mono text-xs md:text-sm font-semibold text-zinc-950 dark:text-zinc-50 tabular-nums">
                {formatPrice(product.discountPrice, currency)}
              </span>
              <span className="font-mono text-xs text-zinc-400 line-through tabular-nums">
                {formatPrice(product.basePrice, currency)}
              </span>
            </>
          ) : (
            <span className="font-mono text-xs md:text-sm font-medium text-zinc-950 dark:text-zinc-50 tabular-nums">
              {formatPrice(product.basePrice, currency)}
            </span>
          )}

          {product.discountPrice && (
            <span className="text-[9px] font-mono font-medium text-emerald-600 dark:text-emerald-400 ml-auto">
              SAVE {Math.round(((product.basePrice - product.discountPrice) / product.basePrice) * 100)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
