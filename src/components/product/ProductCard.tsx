"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Check } from "lucide-react";
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
  const { isInWishlist, toggleWishlistProduct, addToCart, currency } = useCommerceStore();
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
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80";

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

    setTimeout(() => {
      setJustAddedSize(null);
    }, 1500);
  };

  const handleColorChange = (e: React.MouseEvent, color: ColorVariant) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveColor(color);
  };

  return (
    <div className="group relative flex flex-col bg-canvas transition-all duration-300">
      {/* Image Container with aspect-[3/4] portrait editorial ratio */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-canvas-elevated">
        <Link href={`/product/${product.slug}`} className="block h-full w-full">
          {/* Primary Lookbook Image */}
          <Image
            src={optimizeCloudinaryUrl(primaryImage, { width: 800, height: 1067, quality: "auto:best" })}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={priority}
            className="object-cover object-center transition-all duration-500 group-hover:opacity-0 group-hover:scale-105"
          />

          {/* Secondary Detail/Hover Image */}
          <Image
            src={optimizeCloudinaryUrl(hoverImage, { width: 800, height: 1067, quality: "auto:best" })}
            alt={`${product.name} detail view`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-center opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isNewCollection && (
            <Badge variant="terracotta">New Collection</Badge>
          )}
          {product.isTrending && !product.isNewCollection && (
            <Badge variant="terracotta">Trending</Badge>
          )}
          {product.fabricType.includes("Organic") && (
            <Badge variant="cypress">100% Organic</Badge>
          )}
          {product.mainCategory === "WEARABLES" && (
            <Badge variant="brass">Atelier Wearable</Badge>
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
            "absolute top-3 right-3 z-10 p-2.5 rounded-full transition-all duration-300",
            isWishlisted
              ? "bg-[#181816] text-[#FAF8F5]"
              : "bg-white/80 backdrop-blur-md text-[#141413] hover:bg-[#181816] hover:text-[#FAF8F5] opacity-0 group-hover:opacity-100"
          )}
        >
          <Heart
            className={cn("w-4 h-4 transition-transform active:scale-75", isWishlisted && "fill-current text-[#9E4733]")}
          />
        </button>

        {/* Quick Add Size Strip - Slides up on card hover */}
        <div className="absolute inset-x-0 bottom-0 z-10 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 bg-[#181816]/90 backdrop-blur-md p-2 text-white">
          <div className="flex items-center justify-between px-2 mb-1">
            <span className="text-[10px] tracking-editorial uppercase text-neutral-300 font-sans">
              Quick Add To Bag
            </span>
            <span className="text-[10px] font-mono text-[#C5A059]">
              {product.dressType}
            </span>
          </div>

          <div className="flex items-center justify-center gap-1.5 flex-wrap">
            {product.sizes.map((size) => {
              const isSelected = justAddedSize === size.sizeLabel;
              return (
                <button
                  key={size.sizeLabel}
                  onClick={(e) => handleQuickAdd(e, size.sizeLabel)}
                  disabled={size.stock === 0}
                  className={cn(
                    "min-w-[34px] h-[30px] px-1.5 text-[11px] font-mono font-medium border transition-all flex items-center justify-center",
                    size.stock === 0
                      ? "border-neutral-700 text-neutral-600 line-through cursor-not-allowed"
                      : isSelected
                      ? "bg-[#2D4A3E] border-[#2D4A3E] text-white"
                      : "border-neutral-700 bg-neutral-900/60 hover:bg-white hover:text-black hover:border-white text-neutral-200"
                  )}
                  title={`${size.sizeLabel} (Stock: ${size.stock})`}
                >
                  {isSelected ? <Check className="w-3 h-3 text-white" /> : size.sizeLabel}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="flex flex-col pt-3 pb-1">
        {/* Color Swatch Dots & Fabric Weight */}
        <div className="flex items-center justify-between mb-1.5">
          {product.colorVariants.length > 1 ? (
            <div className="flex items-center gap-1.5">
              {product.colorVariants.map((c) => (
                <button
                  key={c.colorName}
                  onClick={(e) => handleColorChange(e, c)}
                  aria-label={`Select ${c.colorName}`}
                  className={cn(
                    "w-3.5 h-3.5 rounded-full border transition-all",
                    activeColor.colorName === c.colorName
                      ? "ring-1 ring-offset-1 ring-[#181816] scale-110"
                      : "opacity-75 hover:opacity-100"
                  )}
                  style={{ backgroundColor: c.colorHex }}
                />
              ))}
            </div>
          ) : (
            <span className="text-[11px] tracking-wider uppercase text-ink-muted font-sans">
              {product.primaryColor}
            </span>
          )}

          {product.fabricWeightGsm ? (
            <span className="text-[11px] font-mono text-ink-muted">
              {product.fabricWeightGsm} GSM
            </span>
          ) : (
            <span className="text-[11px] font-mono text-ink-muted">
              {product.ageGroup === "CHILDREN" ? "Kids" : "Adult"}
            </span>
          )}
        </div>

        {/* Product Name */}
        <Link
          href={`/product/${product.slug}`}
          className="group/title font-sans text-xs md:text-[13px] uppercase tracking-[0.08em] font-medium text-ink hover:text-ink-muted transition-colors line-clamp-1"
        >
          {product.name}
        </Link>

        {/* Subtitle / Fabric description */}
        <p className="text-[11px] text-ink-muted line-clamp-1 font-serif italic mt-0.5">
          {product.subtitle}
        </p>

        {/* Pricing */}
        <div className="flex items-center gap-2 mt-2">
          {product.discountPrice ? (
            <>
              <span className="font-mono text-xs md:text-sm font-semibold text-ink">
                {formatPrice(product.discountPrice, currency)}
              </span>
              <span className="font-mono text-xs text-ink-muted line-through">
                {formatPrice(product.basePrice, currency)}
              </span>
            </>
          ) : (
            <span className="font-mono text-xs md:text-sm font-medium text-ink">
              {formatPrice(product.basePrice, currency)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
