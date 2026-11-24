"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Check } from "lucide-react";
import { Product, ColorVariant } from "@/types/commerce";
import { useCommerceStore } from "@/store/useCommerceStore";
import { formatPrice, cn } from "@/lib/utils";
import { DEFAULT_PRODUCT_IMAGE, optimizeCloudinaryUrl } from "@/lib/cloudinary";
import { SafeImage } from "@/components/ui/SafeImage";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { isInWishlist, toggleWishlistProduct, addToCart, currency, toggleCart } = useCommerceStore();
  const isWishlisted = isInWishlist(product.id);

  const [activeColor, setActiveColor] = useState<ColorVariant>(
    product.colorVariants[0] || {
      colorName: product.primaryColor,
      colorHex: product.primaryColorHex,
      images: [],
    }
  );

  const [justAddedSize, setJustAddedSize] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const primaryImage =
    activeColor.images?.[0] ||
    product.colorVariants?.[0]?.images?.[0] ||
    DEFAULT_PRODUCT_IMAGE;

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

  const totalStock = product.sizes.reduce((acc, s) => acc + s.stock, 0);
  const isLowStock = totalStock > 0 && totalStock <= 12;

  // Single concise badge (prevents badge stacking clutter)
  const primaryBadge = isLowStock
    ? { label: "LOW STOCK", tone: "bg-orange-600 text-white" }
    : product.badge
    ? { label: product.badge, tone: "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950" }
    : product.isNewCollection
    ? { label: "NEW", tone: "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950" }
    : null;

  const savingsPercent =
    product.discountPrice && product.discountPrice < product.basePrice
      ? Math.round(((product.basePrice - product.discountPrice) / product.basePrice) * 100)
      : 0;

  return (
    <article className="group relative flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all duration-200 hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-sm">
      {/* Aspect 3:4 Image Frame */}
      <div
        className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={`/product/${product.slug}`} className="block h-full w-full">
          <SafeImage
            src={optimizeCloudinaryUrl(
              isHovered && hoverImage !== primaryImage ? hoverImage : primaryImage,
              { width: 800, height: 1067, quality: "auto:best" }
            )}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            className="object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.02]"
          />
        </Link>

        {/* Single Primary Badge */}
        {primaryBadge && (
          <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
            <span
              className={cn(
                "inline-block px-2 py-0.5 text-[10px] font-mono tracking-wider uppercase font-semibold",
                primaryBadge.tone
              )}
            >
              {primaryBadge.label}
            </span>
          </div>
        )}

        {/* Wishlist Toggle */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlistProduct(product.id);
          }}
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          aria-pressed={isWishlisted}
          className={cn(
            "absolute top-2.5 right-2.5 z-10 p-2 transition-all duration-200 border rounded-sm",
            isWishlisted
              ? "bg-zinc-950 text-white border-zinc-950"
              : "bg-white/95 text-zinc-800 border-zinc-200 hover:bg-zinc-950 hover:text-white dark:bg-zinc-900/90 dark:text-zinc-200 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
          )}
        >
          <Heart
            className={cn(
              "w-3.5 h-3.5 transition-transform duration-200 active:scale-75",
              isWishlisted && "fill-current text-red-500"
            )}
          />
        </button>

        {/* Quick Add Size Drawer (Reveals smoothly on hover & keyboard focus-within) */}
        <div className="absolute inset-x-0 bottom-0 z-10 translate-y-full transition-transform duration-250 ease-out group-hover:translate-y-0 group-focus-within:translate-y-0 bg-zinc-950/95 backdrop-blur-md p-3 text-white border-t border-zinc-800">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] tracking-wider uppercase text-zinc-300 font-sans font-semibold">
              Quick Add Size
            </span>
            <span className="text-[10px] font-mono text-zinc-400 tabular-nums">
              {product.sizes.length} {product.sizes.length === 1 ? "Size" : "Sizes"}
            </span>
          </div>

          <div className="flex items-center justify-start gap-1.5 flex-wrap">
            {product.sizes.map((size) => {
              const isSelected = justAddedSize === size.sizeLabel;
              const isOutOfStock = size.stock === 0;

              return (
                <button
                  key={size.sizeLabel}
                  type="button"
                  onClick={(e) => handleQuickAdd(e, size.sizeLabel)}
                  disabled={isOutOfStock}
                  className={cn(
                    "min-w-[34px] h-7 px-2 text-[10px] font-mono font-semibold transition-colors duration-200 flex items-center justify-center border rounded-[2px]",
                    isOutOfStock
                      ? "border-zinc-800 text-zinc-500 line-through cursor-not-allowed bg-zinc-900/60"
                      : isSelected
                      ? "bg-emerald-600 border-emerald-600 text-white"
                      : "border-zinc-700 bg-zinc-900 hover:bg-white hover:text-zinc-950 hover:border-white text-zinc-100"
                  )}
                  title={
                    isOutOfStock
                      ? `${size.sizeLabel} (Out of Stock)`
                      : `Quick add ${size.sizeLabel} (${size.stock} in stock)`
                  }
                >
                  {isSelected ? <Check className="w-3 h-3 text-white" /> : size.sizeLabel}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Product Info Footer */}
      <div className="flex-1 flex flex-col justify-between p-3.5 sm:p-4 gap-2">
        <div className="space-y-1.5">
          {/* Swatches & Fabric Spec */}
          <div className="flex items-center justify-between gap-2">
            {product.colorVariants.length > 1 ? (
              <div className="flex items-center gap-1.5" role="group" aria-label="Color variants">
                {product.colorVariants.map((c) => (
                  <button
                    key={c.colorName}
                    type="button"
                    onClick={(e) => handleColorChange(e, c)}
                    onMouseEnter={(e) => handleColorChange(e, c)}
                    aria-label={`Select color ${c.colorName}`}
                    title={c.colorName}
                    className={cn(
                      "w-3.5 h-3.5 rounded-full border transition-all duration-200",
                      activeColor.colorName === c.colorName
                        ? "ring-1 ring-offset-1 ring-zinc-950 dark:ring-zinc-100 scale-110 border-zinc-400"
                        : "opacity-75 hover:opacity-100 border-zinc-300 dark:border-zinc-700"
                    )}
                    style={{ backgroundColor: c.colorHex }}
                  />
                ))}
              </div>
            ) : (
              <span className="text-[10px] tracking-wider uppercase text-zinc-600 dark:text-zinc-400 font-sans font-medium truncate">
                {product.primaryColor}
              </span>
            )}

            <span className="text-[10px] font-mono text-zinc-600 dark:text-zinc-400 tabular-nums whitespace-nowrap">
              {product.fabricWeightGsm ? `${product.fabricWeightGsm} GSM` : product.dressType}
            </span>
          </div>

          {/* Product Title */}
          <Link
            href={`/product/${product.slug}`}
            className="block font-sans text-xs sm:text-sm font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors line-clamp-1"
          >
            {product.name}
          </Link>

          {/* Subtitle */}
          <p className="text-[11px] text-zinc-600 dark:text-zinc-400 line-clamp-1 leading-snug">
            {product.subtitle}
          </p>
        </div>

        {/* Cleanly Spaced Pricing Row */}
        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 pt-2.5 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-mono text-xs sm:text-sm font-bold text-zinc-950 dark:text-zinc-50 tabular-nums whitespace-nowrap">
              {formatPrice(product.discountPrice || product.basePrice, currency)}
            </span>

            {product.discountPrice && product.discountPrice < product.basePrice && (
              <span className="font-mono text-[11px] text-zinc-500 line-through tabular-nums whitespace-nowrap">
                {formatPrice(product.basePrice, currency)}
              </span>
            )}
          </div>

          {savingsPercent > 0 && (
            <span className="px-1.5 py-0.5 text-[10px] font-mono font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 tabular-nums whitespace-nowrap">
              SAVE {savingsPercent}%
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
