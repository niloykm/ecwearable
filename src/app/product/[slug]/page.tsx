"use client";

import React, { useState, use, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Heart,
  ShoppingBag,
  Ruler,
  Check,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Share2,
} from "lucide-react";
import { useCommerceStore } from "@/store/useCommerceStore";
import { formatPrice, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { ProductCard } from "@/components/product/ProductCard";
import { SizeGuideModal } from "@/components/product/SizeGuideModal";
import { ColorVariant, SizeMeasurement } from "@/types/commerce";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const {
    products,
    addToCart,
    isInWishlist,
    toggleWishlistProduct,
    currency,
    unit,
    setUnit,
  } = useCommerceStore();

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Active color variant
  const [selectedColor, setSelectedColor] = useState<ColorVariant>(
    product.colorVariants[0] || {
      colorName: product.primaryColor,
      colorHex: product.primaryColorHex,
      images: [],
    }
  );

  // Active size
  const [selectedSize, setSelectedSize] = useState<SizeMeasurement>(
    product.sizes[0]
  );

  // Quantity
  const [quantity, setQuantity] = useState<number>(1);

  // Sizing guide modal
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);

  // Accordion collapses
  const [expandedSection, setExpandedSection] = useState<string>("fabric");

  // Feedback on added
  const [isAddedToast, setIsAddedToast] = useState<boolean>(false);

  const isWishlisted = isInWishlist(product.id);

  // Complete the Look: find 3 complementary products
  const completeTheLookProducts = useMemo(() => {
    if (product.mainCategory === "GARMENTS") {
      // Recommend wearables and footwear
      return products
        .filter((p) => p.id !== product.id && (p.mainCategory === "WEARABLES" || p.mainCategory === "FOOTWEAR"))
        .slice(0, 3);
    } else {
      // Recommend luxury garments
      return products
        .filter((p) => p.id !== product.id && p.mainCategory === "GARMENTS")
        .slice(0, 3);
    }
  }, [products, product]);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    setIsAddedToast(true);
    setTimeout(() => setIsAddedToast(false), 2500);
  };

  const currentMeasurements =
    unit === "INCH" ? selectedSize.measurementsInch : selectedSize.measurementsCm;

  const unitLabel = unit === "INCH" ? 'in (")' : "cm";

  return (
    <div className="w-full min-h-screen bg-canvas">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4 border-b border-border-subtle text-xs font-sans text-ink-muted flex items-center gap-2">
        <Link href="/" className="hover:text-ink transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-ink transition-colors">
          {product.mainCategory}
        </Link>
        <span>/</span>
        <span className="text-ink uppercase tracking-wider">{product.dressType}</span>
        <span>/</span>
        <span className="text-ink truncate">{product.name}</span>
      </div>

      {/* Main Split Layout */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
        {/* =========================================================
            LEFT COLUMN: Multi-Angle Editorial Gallery
           ========================================================= */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {selectedColor.images.length > 0 ? (
              selectedColor.images.map((img, idx) => (
                <div
                  key={idx}
                  className={`relative aspect-[3/4] bg-canvas-elevated overflow-hidden border border-border-subtle ${
                    idx === 0 ? "sm:col-span-2" : ""
                  }`}
                >
                  <Image
                    src={optimizeCloudinaryUrl(img, { width: 1200, height: 1600, quality: "auto:best" })}
                    alt={`${product.name} view ${idx + 1}`}
                    fill
                    priority={idx === 0}
                    className="object-cover object-center hover:scale-105 transition-transform duration-700"
                  />
                  {idx === 0 && (
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.isNewCollection && (
                        <Badge variant="terracotta">New Collection</Badge>
                      )}
                      {product.fabricType.includes("Organic") && (
                        <Badge variant="cypress">100% GOTS Certified</Badge>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="relative aspect-[3/4] bg-canvas-elevated flex items-center justify-center">
                <span className="font-mono text-xs text-ink-muted">No Image Available</span>
              </div>
            )}
          </div>
        </div>

        {/* =========================================================
            RIGHT COLUMN: Sticky Merchandising & Sizing Architecture
           ========================================================= */}
        <div className="lg:col-span-5 relative">
          <div className="lg:sticky lg:top-24 space-y-6">
            {/* Title & Department */}
            <div className="border-b border-border-subtle pb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#9E4733]">
                  {product.gender} • {product.dressType}
                </span>

                <button
                  onClick={() => toggleWishlistProduct(product.id)}
                  className={cn(
                    "p-2 rounded-full border transition-colors",
                    isWishlisted
                      ? "bg-[#181816] text-[#FAF8F5] border-[#181816]"
                      : "border-border-subtle text-ink hover:bg-canvas-elevated"
                  )}
                  aria-label="Save to Wishlist"
                >
                  <Heart
                    className={cn("w-4 h-4", isWishlisted && "fill-current text-[#9E4733]")}
                  />
                </button>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-ink">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm font-serif italic text-ink-muted mt-1">
                {product.subtitle}
              </p>

              {/* Price */}
              <div className="flex items-center gap-3 mt-4">
                {product.discountPrice ? (
                  <>
                    <span className="font-mono text-xl sm:text-2xl font-bold text-ink">
                      {formatPrice(product.discountPrice, currency)}
                    </span>
                    <span className="font-mono text-sm sm:text-base text-ink-muted line-through">
                      {formatPrice(product.basePrice, currency)}
                    </span>
                    <Badge variant="terracotta">Sale</Badge>
                  </>
                ) : (
                  <span className="font-mono text-xl sm:text-2xl font-semibold text-ink">
                    {formatPrice(product.basePrice, currency)}
                  </span>
                )}
              </div>
            </div>

            {/* Color Swatch Selection */}
            <div>
              <div className="flex items-center justify-between text-xs font-sans mb-2">
                <span className="uppercase text-ink-muted tracking-wider">
                  Color:{" "}
                  <strong className="text-ink font-medium">
                    {selectedColor.colorName}
                  </strong>
                </span>
                <span className="font-mono text-[11px] text-ink-muted">
                  {product.colorVariants.length} Variations
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                {product.colorVariants.map((c) => (
                  <button
                    key={c.colorName}
                    onClick={() => setSelectedColor(c)}
                    className={cn(
                      "w-8 h-8 rounded-full border-2 transition-all p-0.5",
                      selectedColor.colorName === c.colorName
                        ? "border-[#181816] scale-110"
                        : "border-transparent opacity-80 hover:opacity-100"
                    )}
                  >
                    <div
                      className="w-full h-full rounded-full border border-black/10"
                      style={{ backgroundColor: c.colorHex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector with Live INCH/CM Toggle */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-sans uppercase text-ink-muted tracking-wider">
                  Select Size
                </span>

                {/* INCH / CM Toggle */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-canvas-elevated border border-border-subtle p-0.5">
                    <button
                      onClick={() => setUnit("INCH")}
                      className={cn(
                        "px-2 py-0.5 text-[10px] font-mono transition-colors",
                        unit === "INCH"
                          ? "bg-[#181816] text-[#FAF8F5] font-bold"
                          : "text-ink-muted hover:text-ink"
                      )}
                    >
                      INCH
                    </button>
                    <button
                      onClick={() => setUnit("CM")}
                      className={cn(
                        "px-2 py-0.5 text-[10px] font-mono transition-colors",
                        unit === "CM"
                          ? "bg-[#181816] text-[#FAF8F5] font-bold"
                          : "text-ink-muted hover:text-ink"
                      )}
                    >
                      CM
                    </button>
                  </div>

                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-xs font-sans uppercase tracking-wider text-ink underline underline-offset-4 flex items-center gap-1 hover:text-ink-muted"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size Matrix</span>
                  </button>
                </div>
              </div>

              {/* Size Buttons */}
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((s) => {
                  const isSelected = selectedSize.sizeLabel === s.sizeLabel;
                  const isOutOfStock = s.stock === 0;

                  return (
                    <button
                      key={s.sizeLabel}
                      disabled={isOutOfStock}
                      onClick={() => setSelectedSize(s)}
                      className={cn(
                        "py-3 px-2 text-xs font-mono border transition-all text-center flex flex-col items-center justify-center gap-0.5",
                        isOutOfStock
                          ? "border-border-subtle bg-canvas-elevated text-ink-muted/50 cursor-not-allowed line-through"
                          : isSelected
                          ? "bg-[#181816] text-[#FAF8F5] border-[#181816] shadow-subtle"
                          : "bg-canvas hover:border-ink text-ink border-border-subtle"
                      )}
                    >
                      <span className="font-semibold">{s.sizeLabel}</span>
                      <span className="text-[10px] opacity-75">
                        {isOutOfStock ? "Sold" : `${s.stock} left`}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Measurement Snapshot for Selected Size */}
              <div className="p-3 bg-canvas-elevated border border-border-subtle text-xs font-mono space-y-1">
                <div className="flex items-center justify-between text-ink-muted pb-1 border-b border-border-subtle/60">
                  <span className="text-[10px] uppercase font-sans tracking-wider">
                    Dimensions for size {selectedSize.sizeLabel} ({unitLabel}):
                  </span>
                  <span className="text-[#2D4A3E] font-medium text-[11px]">
                    {product.fitType}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1 text-[11px]">
                  {currentMeasurements?.chest && (
                    <div>
                      <span className="text-ink-muted block text-[10px]">Chest:</span>
                      <span className="font-bold text-ink">
                        {currentMeasurements.chest} {unit === "INCH" ? '"' : "cm"}
                      </span>
                    </div>
                  )}
                  {currentMeasurements?.waist && (
                    <div>
                      <span className="text-ink-muted block text-[10px]">Waist:</span>
                      <span className="font-bold text-ink">
                        {currentMeasurements.waist} {unit === "INCH" ? '"' : "cm"}
                      </span>
                    </div>
                  )}
                  {currentMeasurements?.length && (
                    <div>
                      <span className="text-ink-muted block text-[10px]">Length:</span>
                      <span className="font-bold text-ink">
                        {currentMeasurements.length} {unit === "INCH" ? '"' : "cm"}
                      </span>
                    </div>
                  )}
                  {currentMeasurements?.shoulder && (
                    <div>
                      <span className="text-ink-muted block text-[10px]">Shoulder:</span>
                      <span className="font-bold text-ink">
                        {currentMeasurements.shoulder} {unit === "INCH" ? '"' : "cm"}
                      </span>
                    </div>
                  )}
                  {currentMeasurements?.sleeve && (
                    <div>
                      <span className="text-ink-muted block text-[10px]">Sleeve:</span>
                      <span className="font-bold text-ink">
                        {currentMeasurements.sleeve} {unit === "INCH" ? '"' : "cm"}
                      </span>
                    </div>
                  )}
                  {currentMeasurements?.footLength && (
                    <div>
                      <span className="text-ink-muted block text-[10px]">Foot Length:</span>
                      <span className="font-bold text-ink">
                        {currentMeasurements.footLength} {unit === "INCH" ? '"' : "cm"}
                      </span>
                    </div>
                  )}
                  {currentMeasurements?.wristOrCase && (
                    <div>
                      <span className="text-ink-muted block text-[10px]">Case/Wrist:</span>
                      <span className="font-bold text-ink">
                        {currentMeasurements.wristOrCase} {unit === "INCH" ? '"' : "cm"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quantity & Add to Cart Action */}
            <div className="pt-4 space-y-3">
              <div className="flex gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-border-subtle bg-canvas-elevated">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-3 hover:bg-neutral-200 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 font-mono text-sm font-semibold text-ink">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-3 hover:bg-neutral-200 transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag CTA */}
                <button
                  onClick={handleAddToCart}
                  disabled={selectedSize.stock === 0}
                  className={cn(
                    "flex-1 py-4 px-6 text-xs font-sans uppercase tracking-editorial font-medium flex items-center justify-center gap-2 transition-all shadow-subtle",
                    selectedSize.stock === 0
                      ? "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                      : "bg-[#181816] text-[#FAF8F5] hover:bg-neutral-800 active:scale-[0.99]"
                  )}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {selectedSize.stock === 0 ? "Out of Stock" : "Add To Shopping Bag"}
                  </span>
                </button>
              </div>

              {isAddedToast && (
                <div className="p-3 bg-[#2D4A3E] text-white text-xs font-sans flex items-center justify-between animate-in fade-in slide-in-from-top-1">
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Added to your shopping bag
                  </span>
                  <Link href="/checkout" className="underline font-mono uppercase text-[11px]">
                    Checkout Now
                  </Link>
                </div>
              )}
            </div>

            {/* Accordions: Fabric Engineering & Care */}
            <div className="border-t border-border-subtle pt-6 space-y-3 text-xs font-sans">
              {/* Description & Highlights */}
              <div className="border-b border-border-subtle pb-3">
                <button
                  onClick={() =>
                    setExpandedSection(expandedSection === "desc" ? "" : "desc")
                  }
                  className="w-full flex items-center justify-between font-medium uppercase tracking-wider text-ink py-1"
                >
                  <span>Atelier Overview & Silhouette</span>
                  {expandedSection === "desc" ? (
                    <ChevronUp className="w-4 h-4 text-ink-muted" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-ink-muted" />
                  )}
                </button>

                {expandedSection === "desc" && (
                  <div className="pt-2 text-ink-muted leading-relaxed space-y-2">
                    <p>{product.description}</p>
                    {product.editorialHighlights && (
                      <ul className="list-disc pl-4 space-y-1 pt-1 font-mono text-[11px] text-ink">
                        {product.editorialHighlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              {/* Fabric & Material Details */}
              <div className="border-b border-border-subtle pb-3">
                <button
                  onClick={() =>
                    setExpandedSection(expandedSection === "fabric" ? "" : "fabric")
                  }
                  className="w-full flex items-center justify-between font-medium uppercase tracking-wider text-ink py-1"
                >
                  <span>Fabric Taxonomy & Care</span>
                  {expandedSection === "fabric" ? (
                    <ChevronUp className="w-4 h-4 text-ink-muted" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-ink-muted" />
                  )}
                </button>

                {expandedSection === "fabric" && (
                  <div className="pt-2 space-y-2 text-ink-muted">
                    <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                      <div>
                        <span className="text-ink-muted block text-[10px]">Fiber:</span>
                        <span className="font-semibold text-ink">{product.fabricType}</span>
                      </div>
                      {product.fabricWeightGsm && (
                        <div>
                          <span className="text-ink-muted block text-[10px]">Weight:</span>
                          <span className="font-semibold text-ink">
                            {product.fabricWeightGsm} GSM
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="pt-2">
                      <span className="text-ink font-semibold block mb-0.5">
                        Care Instructions:
                      </span>
                      <p>{product.careInstructions}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Delivery & Returns */}
              <div className="border-b border-border-subtle pb-3">
                <button
                  onClick={() =>
                    setExpandedSection(expandedSection === "delivery" ? "" : "delivery")
                  }
                  className="w-full flex items-center justify-between font-medium uppercase tracking-wider text-ink py-1"
                >
                  <span>Complimentary Delivery & Exchanges</span>
                  {expandedSection === "delivery" ? (
                    <ChevronUp className="w-4 h-4 text-ink-muted" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-ink-muted" />
                  )}
                </button>

                {expandedSection === "delivery" && (
                  <div className="pt-2 text-ink-muted leading-relaxed space-y-1">
                    <p>
                      • <strong>Dhaka Metro Express:</strong> 24-48 hours delivery.
                    </p>
                    <p>
                      • <strong>Nationwide Courier:</strong> 2-3 business days.
                    </p>
                    <p>
                      • <strong>Atelier Guarantee:</strong> 14-day unworn exchange service.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          "COMPLETE THE LOOK" CROSS-SELL MODULE
         ========================================================= */}
      <section className="w-full py-16 bg-canvas-elevated border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <span className="text-[10px] font-mono tracking-editorial uppercase text-[#C5A059] block mb-1">
                Curated Ensemble
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-ink">
                Complete The Look
              </h2>
            </div>
            <p className="text-xs font-sans text-ink-muted max-w-sm">
              Our stylists paired this piece with complementary horology, fine leather footwear, or tailored garments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {completeTheLookProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Size Guide Modal */}
      <SizeGuideModal
        product={product}
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>
  );
}
