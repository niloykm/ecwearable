"use client";

import React, { useState, use, useMemo, useEffect, useRef } from "react";
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
  UserCheck,
  Droplets,
  Wind,
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
    toggleCart,
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

  // Active preview image
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  // Active size
  const [selectedSize, setSelectedSize] = useState<SizeMeasurement>(
    product.sizes[0]
  );

  // Quantity
  const [quantity, setQuantity] = useState<number>(1);

  // Sizing guide modal
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);

  // Accordion collapses
  const [expandedSection, setExpandedSection] = useState<string>("specs");

  // Feedback on added
  const [isAddedToast, setIsAddedToast] = useState<boolean>(false);

  // Sticky mobile bar visibility trigger
  const mainCtaRef = useRef<HTMLDivElement>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (mainCtaRef.current) {
        const rect = mainCtaRef.current.getBoundingClientRect();
        setShowStickyBar(rect.bottom < 0);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isWishlisted = isInWishlist(product.id);

  // Complete the Look: find 3 complementary products
  const completeTheLookProducts = useMemo(() => {
    return products
      .filter((p) => p.id !== product.id)
      .slice(0, 3);
  }, [products, product]);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    setIsAddedToast(true);
    toggleCart(true);
    setTimeout(() => setIsAddedToast(false), 2500);
  };

  const currentMeasurements =
    unit === "INCH" ? selectedSize.measurementsInch : selectedSize.measurementsCm;

  const unitLabel = unit === "INCH" ? 'in (")' : "cm";

  const allImages =
    selectedColor.images && selectedColor.images.length > 0
      ? selectedColor.images
      : product.colorVariants[0]?.images || [];

  const activeImage = allImages[activeImageIndex] || allImages[0] || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80";

  const modelRef = product.modelReference || 'Model is 6\'1" (185 cm) wearing size L / Regular Fit';

  return (
    <div className="w-full min-h-screen bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 pb-20 sm:pb-0">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 border-b border-zinc-200 dark:border-zinc-800 text-xs font-sans text-zinc-500 flex items-center gap-2">
        <Link href="/" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
          Catalog
        </Link>
        <span>/</span>
        <span className="uppercase tracking-wider text-zinc-400">{product.dressType}</span>
        <span>/</span>
        <span className="text-zinc-900 dark:text-white font-medium truncate">{product.name}</span>
      </div>

      {/* Main PDP Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Display */}
            <div className="relative aspect-[3/4] w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden">
              <Image
                src={optimizeCloudinaryUrl(activeImage, { width: 1200, height: 1600, quality: "auto:best" })}
                alt={product.name}
                fill
                priority
                className="object-cover object-center"
              />

              {/* Status Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10 pointer-events-none">
                {product.badge && (
                  <span className="px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase font-bold bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
                    {product.badge}
                  </span>
                )}
                {product.isNewCollection && !product.badge && (
                  <span className="px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase font-bold bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
                    NEW RELEASE
                  </span>
                )}
                {product.fabricWeightGsm && (
                  <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-white/90 dark:bg-zinc-900/90 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800">
                    {product.fabricWeightGsm} GSM
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlistProduct(product.id)}
                className="absolute top-4 right-4 z-10 p-2.5 bg-white/90 dark:bg-zinc-900/90 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-950 hover:text-white transition-colors"
                aria-label="Wishlist"
              >
                <Heart
                  className={cn("w-4 h-4", isWishlisted && "fill-current text-red-500")}
                />
              </button>
            </div>

            {/* Thumbnail Strip */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={cn(
                      "relative aspect-[3/4] bg-zinc-100 dark:bg-zinc-900 border overflow-hidden transition-all",
                      activeImageIndex === idx
                        ? "border-zinc-950 dark:border-white ring-1 ring-zinc-950 dark:ring-white"
                        : "border-zinc-200 dark:border-zinc-800 opacity-70 hover:opacity-100"
                    )}
                  >
                    <Image
                      src={optimizeCloudinaryUrl(img, { width: 300, height: 400 })}
                      alt={`${product.name} angle ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Garment Specs, Sizing & Actions */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category & Status */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
                  {product.mainCategory} // {product.dressType}
                </span>
                <span className="text-zinc-300 dark:text-zinc-700">•</span>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                  In Stock & Ready to Dispatch
                </span>
              </div>

              {/* Title */}
              <h1 className="font-sans text-2xl sm:text-3xl font-black uppercase tracking-tightest text-zinc-950 dark:text-white">
                {product.name}
              </h1>

              {/* Subtitle / Fabric Hook */}
              <p className="text-xs sm:text-sm font-sans text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {product.subtitle}
              </p>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 pt-1 border-t border-zinc-100 dark:border-zinc-800">
                {product.discountPrice ? (
                  <>
                    <span className="font-mono text-2xl font-bold text-zinc-950 dark:text-white tabular-nums">
                      {formatPrice(product.discountPrice, currency)}
                    </span>
                    <span className="font-mono text-sm text-zinc-400 line-through tabular-nums">
                      {formatPrice(product.basePrice, currency)}
                    </span>
                    <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 ml-auto">
                      Save {Math.round(((product.basePrice - product.discountPrice) / product.basePrice) * 100)}%
                    </span>
                  </>
                ) : (
                  <span className="font-mono text-2xl font-bold text-zinc-950 dark:text-white tabular-nums">
                    {formatPrice(product.basePrice, currency)}
                  </span>
                )}
              </div>

              {/* Editorial Model Reference Callout */}
              <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center gap-2.5 text-xs font-sans text-zinc-700 dark:text-zinc-300">
                <UserCheck className="w-4 h-4 text-zinc-900 dark:text-zinc-100 flex-shrink-0" />
                <span>
                  <strong className="font-semibold text-zinc-950 dark:text-white">Fit Note: </strong>
                  {modelRef}
                </span>
              </div>

              {/* Color Swatch Selection */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs font-sans mb-2">
                  <span className="uppercase text-zinc-500 tracking-wider">
                    Color: <strong className="text-zinc-950 dark:text-white font-semibold">{selectedColor.colorName}</strong>
                  </span>
                  <span className="font-mono text-[11px] text-zinc-500">
                    {product.colorVariants.length} Palette Choices
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {product.colorVariants.map((c) => (
                    <button
                      key={c.colorName}
                      onClick={() => {
                        setSelectedColor(c);
                        setActiveImageIndex(0);
                      }}
                      className={cn(
                        "w-8 h-8 rounded-full border-2 transition-all p-0.5",
                        selectedColor.colorName === c.colorName
                          ? "border-zinc-950 dark:border-white scale-110"
                          : "border-transparent opacity-70 hover:opacity-100"
                      )}
                      title={c.colorName}
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
                  <span className="text-xs font-sans uppercase text-zinc-500 tracking-wider font-semibold">
                    Select Size
                  </span>

                  {/* INCH / CM Toggle + Size Guide Modal Trigger */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-0.5 text-[10px] font-mono">
                      <button
                        onClick={() => setUnit("INCH")}
                        className={cn(
                          "px-2 py-0.5 transition-colors",
                          unit === "INCH"
                            ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-bold"
                            : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                        )}
                      >
                        INCH
                      </button>
                      <button
                        onClick={() => setUnit("CM")}
                        className={cn(
                          "px-2 py-0.5 transition-colors",
                          unit === "CM"
                            ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-bold"
                            : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                        )}
                      >
                        CM
                      </button>
                    </div>

                    <button
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="text-xs font-sans uppercase tracking-wider text-zinc-950 dark:text-white underline underline-offset-4 flex items-center gap-1 hover:text-zinc-600 dark:hover:text-zinc-300 font-semibold"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>Interactive Size Guide</span>
                    </button>
                  </div>
                </div>

                {/* Size Grid Buttons */}
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {product.sizes.map((s) => {
                    const isSelected = selectedSize.sizeLabel === s.sizeLabel;
                    const isOutOfStock = s.stock === 0;

                    return (
                      <button
                        key={s.sizeLabel}
                        disabled={isOutOfStock}
                        onClick={() => setSelectedSize(s)}
                        className={cn(
                          "py-2.5 px-2 text-xs font-mono border transition-all text-center flex flex-col items-center justify-center gap-0.5",
                          isOutOfStock
                            ? "border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-zinc-400 line-through cursor-not-allowed"
                            : isSelected
                            ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 border-zinc-950 dark:border-white shadow-sm font-bold"
                            : "bg-white dark:bg-zinc-900 hover:border-zinc-400 text-zinc-900 dark:text-zinc-100 border-zinc-200 dark:border-zinc-800"
                        )}
                      >
                        <span>{s.sizeLabel}</span>
                        <span className="text-[9px] opacity-70">
                          {isOutOfStock ? "Out" : `${s.stock} left`}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Dynamic Flat Measurements for Selected Size */}
                <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono space-y-1">
                  <div className="flex items-center justify-between text-zinc-500 pb-1 border-b border-zinc-200 dark:border-zinc-800">
                    <span className="text-[10px] uppercase font-sans tracking-wider">
                      Flat Dimensions for Size {selectedSize.sizeLabel} ({unitLabel}):
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                      {product.fitType}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-1 text-[11px]">
                    {currentMeasurements?.chest && (
                      <div>
                        <span className="text-zinc-400 block text-[10px]">Chest:</span>
                        <span className="font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">
                          {currentMeasurements.chest} {unit === "INCH" ? '"' : "cm"}
                        </span>
                      </div>
                    )}
                    {currentMeasurements?.waist && (
                      <div>
                        <span className="text-zinc-400 block text-[10px]">Waist:</span>
                        <span className="font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">
                          {currentMeasurements.waist} {unit === "INCH" ? '"' : "cm"}
                        </span>
                      </div>
                    )}
                    {currentMeasurements?.length && (
                      <div>
                        <span className="text-zinc-400 block text-[10px]">Length:</span>
                        <span className="font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">
                          {currentMeasurements.length} {unit === "INCH" ? '"' : "cm"}
                        </span>
                      </div>
                    )}
                    {currentMeasurements?.shoulder && (
                      <div>
                        <span className="text-zinc-400 block text-[10px]">Shoulder:</span>
                        <span className="font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">
                          {currentMeasurements.shoulder} {unit === "INCH" ? '"' : "cm"}
                        </span>
                      </div>
                    )}
                    {currentMeasurements?.sleeve && (
                      <div>
                        <span className="text-zinc-400 block text-[10px]">Sleeve:</span>
                        <span className="font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">
                          {currentMeasurements.sleeve} {unit === "INCH" ? '"' : "cm"}
                        </span>
                      </div>
                    )}
                    {currentMeasurements?.inseam && (
                      <div>
                        <span className="text-zinc-400 block text-[10px]">Inseam:</span>
                        <span className="font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">
                          {currentMeasurements.inseam} {unit === "INCH" ? '"' : "cm"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Main CTA Container (Observed by ref for sticky bar) */}
              <div ref={mainCtaRef} className="pt-4 space-y-3">
                <div className="flex gap-3">
                  {/* Quantity */}
                  <div className="flex items-center border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-sm"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-3 font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-sm"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Bag CTA */}
                  <button
                    onClick={handleAddToCart}
                    disabled={selectedSize.stock === 0}
                    className={cn(
                      "flex-1 py-4 px-6 text-xs font-sans uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all shadow-sm",
                      selectedSize.stock === 0
                        ? "bg-zinc-300 dark:bg-zinc-800 text-zinc-500 cursor-not-allowed"
                        : "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 active:scale-[0.99]"
                    )}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>
                      {selectedSize.stock === 0 ? "Out of Stock" : "Add To Bag"}
                    </span>
                  </button>
                </div>

                {isAddedToast && (
                  <div className="p-3 bg-emerald-600 text-white text-xs font-sans flex items-center justify-between animate-in fade-in slide-in-from-top-1">
                    <span className="flex items-center gap-2 font-medium">
                      <Check className="w-4 h-4" />
                      Added {quantity}x ({selectedSize.sizeLabel}) to your bag
                    </span>
                    <button onClick={() => toggleCart(true)} className="underline font-mono uppercase text-[11px] font-bold">
                      View Bag
                    </button>
                  </div>
                )}
              </div>

              {/* Fabric & Technical Specs Accordion */}
              <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6 space-y-3 text-xs font-sans">
                {/* 1. Technical Specs & Fabric Engineering */}
                <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3">
                  <button
                    onClick={() =>
                      setExpandedSection(expandedSection === "specs" ? "" : "specs")
                    }
                    className="w-full flex items-center justify-between font-bold uppercase tracking-wider text-zinc-950 dark:text-white py-1"
                  >
                    <span className="flex items-center gap-2">
                      <Droplets className="w-3.5 h-3.5 text-zinc-500" />
                      <span>Fabric Engineering & Technical Specs</span>
                    </span>
                    {expandedSection === "specs" ? (
                      <ChevronUp className="w-4 h-4 text-zinc-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-500" />
                    )}
                  </button>

                  {expandedSection === "specs" && (
                    <div className="pt-3 space-y-3 text-zinc-600 dark:text-zinc-400">
                      <div className="grid grid-cols-2 gap-3 font-mono text-[11px]">
                        <div className="p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                          <span className="text-zinc-400 block text-[10px]">Fabric Blend:</span>
                          <span className="font-semibold text-zinc-900 dark:text-zinc-100">{product.fabricType}</span>
                        </div>
                        {product.fabricWeightGsm && (
                          <div className="p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                            <span className="text-zinc-400 block text-[10px]">Fabric Weight:</span>
                            <span className="font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums">
                              {product.fabricWeightGsm} GSM
                            </span>
                          </div>
                        )}
                        {product.breathabilityRating && (
                          <div className="p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 col-span-2">
                            <span className="text-zinc-400 block text-[10px]">Airflow / Hydrostatic Rating:</span>
                            <span className="font-semibold text-zinc-900 dark:text-zinc-100">{product.breathabilityRating}</span>
                          </div>
                        )}
                      </div>

                      <div className="pt-1">
                        <span className="text-zinc-900 dark:text-white font-semibold block mb-1">
                          Care & Maintenance:
                        </span>
                        <p className="leading-relaxed">{product.careInstructions}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Construction Highlights */}
                <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3">
                  <button
                    onClick={() =>
                      setExpandedSection(expandedSection === "desc" ? "" : "desc")
                    }
                    className="w-full flex items-center justify-between font-bold uppercase tracking-wider text-zinc-950 dark:text-white py-1"
                  >
                    <span>Garment Silhouette & Construction</span>
                    {expandedSection === "desc" ? (
                      <ChevronUp className="w-4 h-4 text-zinc-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-500" />
                    )}
                  </button>

                  {expandedSection === "desc" && (
                    <div className="pt-2 text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-2">
                      <p>{product.description}</p>
                      {product.editorialHighlights && (
                        <ul className="list-disc pl-4 space-y-1 pt-1 font-mono text-[11px] text-zinc-900 dark:text-zinc-200">
                          {product.editorialHighlights.map((h, i) => (
                            <li key={i}>{h}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>

                {/* 3. Delivery & Exchanges */}
                <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3">
                  <button
                    onClick={() =>
                      setExpandedSection(expandedSection === "delivery" ? "" : "delivery")
                    }
                    className="w-full flex items-center justify-between font-bold uppercase tracking-wider text-zinc-950 dark:text-white py-1"
                  >
                    <span>Express Dispatch & 7-Day Exchange</span>
                    {expandedSection === "delivery" ? (
                      <ChevronUp className="w-4 h-4 text-zinc-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-500" />
                    )}
                  </button>

                  {expandedSection === "delivery" && (
                    <div className="pt-2 text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-1">
                      <p>
                        • <strong>Free Nationwide Shipping:</strong> On all orders over ৳ 1,500 / $50.
                      </p>
                      <p>
                        • <strong>Rapid Dispatch:</strong> 24 hours within Dhaka Metro, 48 hours nationwide.
                      </p>
                      <p>
                        • <strong>7-Day Sizing Guarantee:</strong> Instant courier doorstep swap for size adjustments.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          "COMPLETE THE LOOK" CROSS-SELL MODULE
         ========================================================= */}
      <section className="w-full py-14 bg-zinc-50 dark:bg-zinc-900/40 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-600 dark:text-emerald-400 block mb-1">
                TACTICAL PAIRINGS
              </span>
              <h2 className="font-sans text-2xl font-bold uppercase tracking-tight text-zinc-950 dark:text-white">
                Complete The Uniform
              </h2>
            </div>
            <p className="text-xs font-sans text-zinc-500 max-w-sm mt-1 sm:mt-0">
              Field-tested technical pairings engineered for modular everyday transit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {completeTheLookProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          STICKY MOBILE PURCHASE BAR (Bottom-docked on mobile)
         ========================================================= */}
      <div
        className={cn(
          "sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 p-3 shadow-2xl transition-all duration-300",
          showStickyBar ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-sans font-bold uppercase text-zinc-950 dark:text-white truncate">
              {product.name}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-mono text-xs font-bold text-zinc-950 dark:text-white tabular-nums">
                {formatPrice(product.discountPrice || product.basePrice, currency)}
              </span>
              <span className="text-[10px] font-mono text-zinc-500">
                Size: {selectedSize.sizeLabel}
              </span>
            </div>
          </div>

          {/* Mobile Size Dropdown */}
          <select
            value={selectedSize.sizeLabel}
            onChange={(e) => {
              const s = product.sizes.find((item) => item.sizeLabel === e.target.value);
              if (s) setSelectedSize(s);
            }}
            className="px-2 py-2 text-xs font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none"
          >
            {product.sizes.map((s) => (
              <option key={s.sizeLabel} value={s.sizeLabel} disabled={s.stock === 0}>
                {s.sizeLabel} {s.stock === 0 ? "(Sold)" : ""}
              </option>
            ))}
          </select>

          {/* Add to Bag Button */}
          <button
            onClick={handleAddToCart}
            disabled={selectedSize.stock === 0}
            className="px-4 py-2.5 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-sans uppercase font-bold tracking-wider hover:bg-zinc-800 transition-colors flex-shrink-0"
          >
            Add
          </button>
        </div>
      </div>

      {/* Interactive Size Guide Modal */}
      <SizeGuideModal
        product={product}
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>
  );
}
