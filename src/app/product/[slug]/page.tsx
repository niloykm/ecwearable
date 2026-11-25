"use client";

import React, { useState, use, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ShoppingBag,
  Ruler,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Droplets,
  ZoomIn,
  ZoomOut,
  X,
  Maximize2,
} from "lucide-react";
import { useCommerceStore } from "@/store/useCommerceStore";
import { formatPrice, formatShippingThreshold, cn } from "@/lib/utils";
import { ProductCard } from "@/components/product/ProductCard";
import { SizeGuideModal } from "@/components/product/SizeGuideModal";
import { ColorVariant, SizeMeasurement } from "@/types/commerce";
import { DEFAULT_PRODUCT_IMAGE, optimizeCloudinaryUrl } from "@/lib/cloudinary";
import { SafeImage } from "@/components/ui/SafeImage";
import {
  BACKDROP_TRANSITION,
  DRAWER_TRANSITION,
  MOTION_EASE,
  PANEL_TRANSITION,
  SPRING_INDICATOR,
  ScrollReveal,
} from "@/components/motion/MotionPrimitives";

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

  const [selectedColor, setSelectedColor] = useState<ColorVariant>(
    product.colorVariants[0] || {
      colorName: product.primaryColor,
      colorHex: product.primaryColorHex,
      images: [],
    }
  );
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<SizeMeasurement>(product.sizes[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [expandedSection, setExpandedSection] = useState<string>("specs");
  const [isAddedToast, setIsAddedToast] = useState<boolean>(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [zoomOrigin, setZoomOrigin] = useState<{ x: number; y: number }>({ x: 50, y: 50 });

  const mainCtaRef = useRef<HTMLDivElement>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Sync local selection when navigating between products
  useEffect(() => {
    setSelectedColor(
      product.colorVariants[0] || {
        colorName: product.primaryColor,
        colorHex: product.primaryColorHex,
        images: [],
      }
    );
    setSelectedSize(product.sizes[0]);
    setActiveImageIndex(0);
    setQuantity(1);
    setIsLightboxOpen(false);
    setIsZoomed(false);
  }, [product]);

  const allImages =
    selectedColor.images && selectedColor.images.length > 0
      ? selectedColor.images
      : product.colorVariants[0]?.images || [];

  const getAngleLabel = (idx: number, total: number): string => {
    if (idx === 0) return "Front";
    if (idx === 1) return total >= 3 ? "Fit / Angle" : "Alternate View";
    if (idx === 2) return "Fabric & Seam Detail";
    return `Detail ${idx + 1}`;
  };

  useEffect(() => {
    if (!isLightboxOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
        setIsZoomed(false);
      } else if (e.key === "ArrowRight" && allImages.length > 1) {
        setActiveImageIndex((prev) => (prev + 1) % allImages.length);
        setIsZoomed(false);
      } else if (e.key === "ArrowLeft" && allImages.length > 1) {
        setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
        setIsZoomed(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isLightboxOpen, allImages.length]);

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
  const thresholdLabel = formatShippingThreshold(currency);

  const completeTheLookProducts = useMemo(() => {
    return products.filter((p) => p.id !== product.id).slice(0, 3);
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

  const activeImage = allImages[activeImageIndex] || allImages[0] || DEFAULT_PRODUCT_IMAGE;
  const isObjectItem =
    product.mainCategory === "ACCESSORIES" ||
    product.mainCategory === "WEARABLES" ||
    product.mainCategory === "FOOTWEAR";
  const isDetailShot = activeImageIndex >= 2;
  const mainImagePositionClass =
    isObjectItem || isDetailShot ? "object-cover object-center" : "object-cover object-top";
  const modelRef =
    product.modelReference || 'Model is 6\'1" (185 cm) wearing size L / Regular Fit';

  const savingsPercent =
    product.discountPrice && product.discountPrice < product.basePrice
      ? Math.round(((product.basePrice - product.discountPrice) / product.basePrice) * 100)
      : 0;

  return (
    <div className="w-full min-h-screen bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 pb-20 sm:pb-0">
      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 border-b border-zinc-200 dark:border-zinc-800 text-xs font-sans text-zinc-600 dark:text-zinc-400 flex items-center gap-2 overflow-hidden"
      >
        <Link href="/" className="hover:text-zinc-950 dark:hover:text-white transition-colors whitespace-nowrap">
          Home
        </Link>{" "}
        <span aria-hidden="true">/</span>{" "}
        <Link href="/shop" className="hover:text-zinc-950 dark:hover:text-white transition-colors whitespace-nowrap">
          Catalog
        </Link>{" "}
        <span aria-hidden="true">/</span>{" "}
        <span className="uppercase tracking-wider text-zinc-500 whitespace-nowrap">{product.dressType}</span>{" "}
        <span aria-hidden="true">/</span>{" "}
        <span className="text-zinc-950 dark:text-white font-semibold truncate">{product.name}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          {/* Left Column: Multi-Angle Gallery + Lightbox Trigger */}
          <div className="lg:col-span-7 space-y-4">
            {/* Multi-Angle Segmented Switcher (Front / Fit / Fabric & Seam Detail) */}
            {allImages.length > 1 && (
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div
                  role="tablist"
                  aria-label="Garment inspection angles"
                  className="inline-flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-1 rounded-sm overflow-x-auto max-w-full"
                >
                  {allImages.map((_, idx) => {
                    const isSelected = activeImageIndex === idx;
                    const label = getAngleLabel(idx, allImages.length);
                    return (
                      <React.Fragment key={`${selectedColor.colorName}-tab-${idx}`}>
                        {idx > 0 && " "}
                        <button
                          type="button"
                          role="tab"
                          aria-selected={isSelected}
                          onClick={() => setActiveImageIndex(idx)}
                          className={cn(
                            "relative px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider rounded-[2px] transition-colors duration-200 whitespace-nowrap",
                            isSelected
                              ? "text-white dark:text-zinc-950 font-bold"
                              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                          )}
                        >
                          {isSelected && (
                            <motion.span
                              layoutId="pdp-angle-indicator"
                              transition={SPRING_INDICATOR}
                              className="absolute inset-0 bg-zinc-950 dark:bg-white rounded-[2px]"
                            />
                          )}
                          <span className="relative z-10">{label}</span>
                        </button>
                      </React.Fragment>
                    );
                  })}
                </div>
                {" "}
                <span className="text-[11px] font-mono text-zinc-500 tabular-nums">
                  {String(activeImageIndex + 1).padStart(2, "0")} / {String(allImages.length).padStart(2, "0")}
                </span>
              </div>
            )}

            <div className="relative aspect-[3/4] w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden group">
              <button
                type="button"
                onClick={() => {
                  setIsLightboxOpen(true);
                  setIsZoomed(false);
                }}
                aria-label={`Inspect ${product.name} (${getAngleLabel(activeImageIndex, allImages.length)}) in full-screen zoom`}
                className="relative block w-full h-full cursor-zoom-in text-left"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedColor.colorName}-${activeImageIndex}-${activeImage}`}
                    initial={{ opacity: 0, scale: 1.015 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.26, ease: MOTION_EASE }}
                    className="absolute inset-0"
                  >
                    <SafeImage
                      src={optimizeCloudinaryUrl(activeImage, { width: 1200, height: 1600, quality: "auto:best" })}
                      alt={`${product.name} — ${getAngleLabel(activeImageIndex, allImages.length)}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      priority
                      className={cn(
                        mainImagePositionClass,
                        "transition-transform duration-280 ease-editorial group-hover:scale-[1.018]"
                      )}
                    />
                  </motion.div>
                </AnimatePresence>
              </button>

              {/* Status Badge */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10 pointer-events-none">
                {product.badge ? (
                  <span className="px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase font-bold bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
                    {product.badge}
                  </span>
                ) : product.isNewCollection ? (
                  <span className="px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase font-bold bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
                    NEW RELEASE
                  </span>
                ) : null}
                {product.fabricWeightGsm && (
                  <span className="px-2.5 py-1 text-[10px] font-mono font-semibold bg-white/95 dark:bg-zinc-900/95 text-zinc-950 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 tabular-nums">
                    {product.fabricWeightGsm} GSM
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => toggleWishlistProduct(product.id)}
                className="absolute top-4 right-4 z-10 p-2.5 bg-white/95 dark:bg-zinc-900/95 text-zinc-950 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-950 hover:text-white rounded-sm transition-colors"
                aria-label={isWishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
                aria-pressed={isWishlisted}
              >
                <Heart className={cn("w-4 h-4", isWishlisted && "fill-current text-red-500")} />
              </button>

              {/* Bottom Controls: Prev/Next Arrows & Zoom Inspect Pill */}
              {allImages.length > 1 && (
                <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
                    }
                    aria-label="Previous garment angle"
                    className="p-2 bg-white/95 dark:bg-zinc-950/90 text-zinc-950 dark:text-white border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-950 hover:text-white dark:hover:bg-white dark:hover:text-zinc-950 rounded-sm transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveImageIndex((prev) => (prev + 1) % allImages.length)}
                    aria-label="Next garment angle"
                    className="p-2 bg-white/95 dark:bg-zinc-950/90 text-zinc-950 dark:text-white border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-950 hover:text-white dark:hover:bg-white dark:hover:text-zinc-950 rounded-sm transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  setIsLightboxOpen(true);
                  setIsZoomed(false);
                }}
                aria-label="Open full-screen inspection zoom"
                className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-1.5 px-3 py-2 bg-white/95 dark:bg-zinc-950/90 text-zinc-950 dark:text-white border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-950 hover:text-white dark:hover:bg-white dark:hover:text-zinc-950 text-[11px] font-mono uppercase tracking-wider font-semibold rounded-sm transition-colors shadow-sm"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Inspect / Zoom</span>
              </button>
            </div>

            {allImages.length > 1 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {allImages.map((img, idx) => {
                  const isActiveThumb = activeImageIndex === idx;
                  const label = getAngleLabel(idx, allImages.length);
                  const thumbPos = isObjectItem || idx >= 2 ? "object-cover object-center" : "object-cover object-top";
                  return (
                    <React.Fragment key={`${selectedColor.colorName}-thumb-${idx}`}>
                      {idx > 0 && " "}
                      <button
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        aria-label={`Select ${label}`}
                        aria-pressed={isActiveThumb}
                        className={cn(
                          "group/thumb relative flex flex-col bg-zinc-100 dark:bg-zinc-900 border overflow-hidden transition-all duration-240 ease-editorial rounded-sm text-left",
                          isActiveThumb
                            ? "border-zinc-950 dark:border-white ring-1 ring-zinc-950 dark:ring-white"
                            : "border-zinc-200 dark:border-zinc-800 opacity-80 hover:opacity-100 hover:border-zinc-400"
                        )}
                      >
                        <div className="relative aspect-[3/4] w-full overflow-hidden">
                          <SafeImage
                            src={optimizeCloudinaryUrl(img, { width: 320, height: 426 })}
                            alt={`${product.name} — ${label}`}
                            fill
                            sizes="(max-width: 640px) 33vw, 18vw"
                            className={cn(
                              thumbPos,
                              "transition-transform duration-260 ease-editorial group-hover/thumb:scale-[1.03]"
                            )}
                          />
                        </div>
                        <span
                          className={cn(
                            "px-2 py-1 text-[10px] font-mono uppercase tracking-wider truncate w-full border-t transition-colors",
                            isActiveThumb
                              ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 border-zinc-950 dark:border-white font-semibold"
                              : "bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800"
                          )}
                        >
                          {label}
                        </span>
                      </button>
                    </React.Fragment>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Specs, Sizing & Purchase */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                  {product.mainCategory} // {product.dressType}
                </span>{" "}
                <span className="text-zinc-300 dark:text-zinc-700" aria-hidden="true">
                  ·
                </span>{" "}
                <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                  In Stock &amp; Ready to Dispatch
                </span>
              </div>

              <h1 className="font-sans text-2xl sm:text-3xl font-black uppercase tracking-tightest text-zinc-950 dark:text-white leading-tight">
                {product.name}
              </h1>

              <p className="text-sm font-sans text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {product.subtitle}
              </p>

              {/* Pricing */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-2xl font-bold text-zinc-950 dark:text-white tabular-nums">
                    {formatPrice(product.discountPrice || product.basePrice, currency)}
                  </span>
                  {product.discountPrice && product.discountPrice < product.basePrice && (
                    <>
                      {" "}
                      <span className="font-mono text-sm text-zinc-500 line-through tabular-nums">
                        {formatPrice(product.basePrice, currency)}
                      </span>
                    </>
                  )}
                </div>

                {savingsPercent > 0 && (
                  <>
                    {" "}
                    <span className="px-2 py-0.5 text-xs font-mono font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 tabular-nums">
                      SAVE {savingsPercent}%
                    </span>
                  </>
                )}
              </div>

              {/* Fit Note */}
              <div className="p-3.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center gap-2.5 text-xs font-sans text-zinc-700 dark:text-zinc-300">
                <UserCheck className="w-4 h-4 text-zinc-900 dark:text-zinc-100 flex-shrink-0" />
                <span>
                  <strong className="font-semibold text-zinc-950 dark:text-white">Fit Note: </strong>
                  {modelRef}
                </span>
              </div>

              {/* Color Swatches */}
              <div className="pt-2 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="uppercase text-zinc-600 dark:text-zinc-400 tracking-wider flex items-center gap-1.5">
                    <span>Color:</span>{" "}
                    <AnimatePresence mode="wait">
                      <motion.strong
                        key={selectedColor.colorName}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2, ease: MOTION_EASE }}
                        className="text-zinc-950 dark:text-white font-semibold inline-block"
                      >
                        {selectedColor.colorName}
                      </motion.strong>
                    </AnimatePresence>
                  </span>{" "}
                  <span className="font-mono text-[11px] text-zinc-500 tabular-nums">
                    {product.colorVariants.length} {product.colorVariants.length === 1 ? "Colorway" : "Colorways"}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  {product.colorVariants.map((c, idx) => {
                    const isColorSelected = selectedColor.colorName === c.colorName;
                    return (
                      <React.Fragment key={c.colorName}>
                        {idx > 0 && " "}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedColor(c);
                            setActiveImageIndex(0);
                          }}
                          aria-label={`Select color ${c.colorName}`}
                          aria-pressed={isColorSelected}
                          className={cn(
                            "relative w-8 h-8 rounded-full p-1 transition-transform duration-240 ease-editorial active:scale-95",
                            isColorSelected ? "scale-105" : "opacity-80 hover:opacity-100 hover:scale-105"
                          )}
                          title={c.colorName}
                        >
                          {isColorSelected && (
                            <motion.span
                              layoutId="pdp-swatch-ring"
                              transition={SPRING_INDICATOR}
                              className="absolute inset-0 rounded-full border-2 border-zinc-950 dark:border-white"
                            />
                          )}
                          <div
                            className="relative z-10 w-full h-full rounded-full border border-black/15"
                            style={{ backgroundColor: c.colorHex }}
                          />
                        </button>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Size Selector + Live INCH/CM Toggle */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-sans uppercase text-zinc-600 dark:text-zinc-400 tracking-wider font-semibold">
                    Select Size
                  </span>{" "}
                  <div className="flex items-center gap-3">
                    <div
                      className="flex items-center gap-0.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-0.5 text-[10px] font-mono rounded-sm"
                      role="group"
                      aria-label="Measurement unit"
                    >
                      {([
                        { value: "INCH", label: "IN" },
                        { value: "CM", label: "CM" },
                      ] as const).map((u, idx) => {
                        const active = unit === u.value;
                        return (
                          <React.Fragment key={u.value}>
                            {idx > 0 && " "}
                            <button
                              type="button"
                              onClick={() => setUnit(u.value)}
                              aria-pressed={active}
                              className={cn(
                                "relative px-2.5 py-0.5 transition-colors rounded-[2px]",
                                active
                                  ? "text-white dark:text-zinc-950 font-bold"
                                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100"
                              )}
                            >
                              {active && (
                                <motion.span
                                  layoutId="pdp-unit-pill"
                                  transition={SPRING_INDICATOR}
                                  className="absolute inset-0 bg-zinc-950 dark:bg-white rounded-[2px]"
                                />
                              )}
                              <span className="relative z-10">{u.label}</span>
                            </button>
                          </React.Fragment>
                        );
                      })}
                    </div>
                    {" "}
                    <button
                      type="button"
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="text-xs font-sans uppercase tracking-wider text-zinc-950 dark:text-white underline underline-offset-4 flex items-center gap-1 hover:text-zinc-600 dark:hover:text-zinc-300 font-semibold"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>Size Guide</span>
                    </button>
                  </div>
                </div>

                {/* Size Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {product.sizes.map((s, idx) => {
                    const isSelected = selectedSize.sizeLabel === s.sizeLabel;
                    const isOutOfStock = s.stock === 0;

                    return (
                      <React.Fragment key={s.sizeLabel}>
                        {idx > 0 && " "}
                        <button
                          type="button"
                          disabled={isOutOfStock}
                          onClick={() => setSelectedSize(s)}
                          aria-pressed={isSelected}
                          className={cn(
                            "relative py-2.5 px-2 text-xs font-mono border rounded-sm transition-colors duration-200 text-center flex flex-col items-center justify-center gap-0.5 overflow-hidden",
                            isOutOfStock
                              ? "border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-zinc-400 line-through cursor-not-allowed"
                              : isSelected
                              ? "text-white dark:text-zinc-950 border-zinc-950 dark:border-white shadow-sm font-bold"
                              : "bg-white dark:bg-zinc-900 hover:border-zinc-500 text-zinc-950 dark:text-zinc-100 border-zinc-200 dark:border-zinc-800"
                          )}
                        >
                          {isSelected && !isOutOfStock && (
                            <motion.span
                              layoutId="pdp-size-pill"
                              transition={SPRING_INDICATOR}
                              className="absolute inset-0 bg-zinc-950 dark:bg-white"
                            />
                          )}
                          <span className="relative z-10">{s.sizeLabel}</span>{" "}
                          <span className="relative z-10 text-[10px] opacity-80 tabular-nums">
                            {isOutOfStock ? "Out" : `${s.stock} left`}
                          </span>
                        </button>
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* Dynamic Flat Measurements */}
                <div className="p-3.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-zinc-600 dark:text-zinc-400 pb-2 border-b border-zinc-200 dark:border-zinc-800">
                    <span className="text-[10px] uppercase font-sans tracking-wider font-semibold">
                      Flat Dimensions — Size {selectedSize.sizeLabel} ({unitLabel})
                    </span>{" "}
                    <span className="text-emerald-700 dark:text-emerald-400 font-semibold text-[11px]">
                      {product.fitType}
                    </span>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${selectedSize.sizeLabel}-${unit}`}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={PANEL_TRANSITION}
                      className="grid grid-cols-3 gap-3 pt-0.5 text-[11px]"
                    >
                    {currentMeasurements?.chest && (
                      <div>
                        <span className="text-zinc-500 block text-[10px]">Chest</span>{" "}
                        <span className="font-bold text-zinc-950 dark:text-zinc-100 tabular-nums">
                          {currentMeasurements.chest} {unit === "INCH" ? '"' : "cm"}
                        </span>
                      </div>
                    )}
                    {currentMeasurements?.waist && (
                      <div>
                        <span className="text-zinc-500 block text-[10px]">Waist</span>{" "}
                        <span className="font-bold text-zinc-950 dark:text-zinc-100 tabular-nums">
                          {currentMeasurements.waist} {unit === "INCH" ? '"' : "cm"}
                        </span>
                      </div>
                    )}
                    {currentMeasurements?.length && (
                      <div>
                        <span className="text-zinc-500 block text-[10px]">Length</span>{" "}
                        <span className="font-bold text-zinc-950 dark:text-zinc-100 tabular-nums">
                          {currentMeasurements.length} {unit === "INCH" ? '"' : "cm"}
                        </span>
                      </div>
                    )}
                    {currentMeasurements?.shoulder && (
                      <div>
                        <span className="text-zinc-500 block text-[10px]">Shoulder</span>{" "}
                        <span className="font-bold text-zinc-950 dark:text-zinc-100 tabular-nums">
                          {currentMeasurements.shoulder} {unit === "INCH" ? '"' : "cm"}
                        </span>
                      </div>
                    )}
                    {currentMeasurements?.sleeve && (
                      <div>
                        <span className="text-zinc-500 block text-[10px]">Sleeve</span>{" "}
                        <span className="font-bold text-zinc-950 dark:text-zinc-100 tabular-nums">
                          {currentMeasurements.sleeve} {unit === "INCH" ? '"' : "cm"}
                        </span>
                      </div>
                    )}
                    {currentMeasurements?.inseam && (
                      <div>
                        <span className="text-zinc-500 block text-[10px]">Inseam</span>{" "}
                        <span className="font-bold text-zinc-950 dark:text-zinc-100 tabular-nums">
                          {currentMeasurements.inseam} {unit === "INCH" ? '"' : "cm"}
                        </span>
                      </div>
                    )}
                    {currentMeasurements?.footLength && (
                      <div>
                        <span className="text-zinc-500 block text-[10px]">Foot Length</span>{" "}
                        <span className="font-bold text-zinc-950 dark:text-zinc-100 tabular-nums">
                          {currentMeasurements.footLength} {unit === "INCH" ? '"' : "cm"}
                        </span>
                      </div>
                    )}
                    {currentMeasurements?.wristOrCase && (
                      <div>
                        <span className="text-zinc-500 block text-[10px]">Case / Fit</span>{" "}
                        <span className="font-bold text-zinc-950 dark:text-zinc-100 tabular-nums">
                          {currentMeasurements.wristOrCase} {unit === "INCH" ? '"' : "cm"}
                        </span>
                      </div>
                    )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Quantity & Add to Bag CTA */}
              <div ref={mainCtaRef} className="pt-3 space-y-3">
                <div className="flex gap-3">
                  <div className="flex items-center border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 rounded-sm">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 py-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-sm font-mono font-bold"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-3 font-mono text-sm font-bold text-zinc-950 dark:text-zinc-100 tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3.5 py-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-sm font-mono font-bold"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={selectedSize.stock === 0}
                    className={cn(
                      "flex-1 py-4 px-6 text-xs font-sans uppercase tracking-wider font-semibold flex items-center justify-center gap-2 rounded-sm transition-all duration-200 shadow-sm",
                      selectedSize.stock === 0
                        ? "bg-zinc-300 dark:bg-zinc-800 text-zinc-600 cursor-not-allowed"
                        : "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-[0.98]"
                    )}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{selectedSize.stock === 0 ? "Out of Stock" : "Add To Bag"}</span>
                  </button>
                </div>

                <AnimatePresence>
                  {isAddedToast && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2, ease: MOTION_EASE }}
                      className="p-3 bg-emerald-700 text-white text-xs font-sans flex items-center justify-between rounded-sm"
                    >
                      <span className="flex items-center gap-2 font-medium">
                        <Check className="w-4 h-4" />
                        Added {quantity}x ({selectedSize.sizeLabel}) to your bag
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleCart(true)}
                        className="underline font-mono uppercase text-[11px] font-bold"
                      >
                        View Bag
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Animated Accordions */}
              <div className="border-t border-zinc-200 dark:border-zinc-800 pt-5 space-y-2 text-xs font-sans">
                {[
                  {
                    id: "specs",
                    title: "Fabric Engineering & Technical Specs",
                    icon: Droplets,
                    content: (
                      <div className="pt-3 pb-2 space-y-3 text-zinc-600 dark:text-zinc-400">
                        <div className="grid grid-cols-2 gap-3 font-mono text-[11px]">
                          <div className="p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                            <span className="text-zinc-500 block text-[10px]">Fabric Blend</span>
                            <span className="font-semibold text-zinc-950 dark:text-zinc-100">
                              {product.fabricType}
                            </span>
                          </div>
                          {product.fabricWeightGsm && (
                            <div className="p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                              <span className="text-zinc-500 block text-[10px]">Fabric Weight</span>
                              <span className="font-semibold text-zinc-950 dark:text-zinc-100 tabular-nums">
                                {product.fabricWeightGsm} GSM
                              </span>
                            </div>
                          )}
                          {product.breathabilityRating && (
                            <div className="p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 col-span-2">
                              <span className="text-zinc-500 block text-[10px]">
                                Airflow / Hydrostatic Rating
                              </span>
                              <span className="font-semibold text-zinc-950 dark:text-zinc-100">
                                {product.breathabilityRating}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="pt-1">
                          <span className="text-zinc-950 dark:text-white font-semibold block mb-1">
                            Care &amp; Maintenance
                          </span>
                          <p className="leading-relaxed">{product.careInstructions}</p>
                        </div>
                      </div>
                    ),
                  },
                  {
                    id: "desc",
                    title: "Garment Silhouette & Construction",
                    content: (
                      <div className="pt-2.5 pb-2 text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-2">
                        <p>{product.description}</p>
                        {product.editorialHighlights && (
                          <ul className="list-disc pl-4 space-y-1 pt-1 font-mono text-[11px] text-zinc-900 dark:text-zinc-200">
                            {product.editorialHighlights.map((h, i) => (
                              <li key={i}>{h}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ),
                  },
                  {
                    id: "delivery",
                    title: "Express Dispatch & 7-Day Exchange",
                    content: (
                      <div className="pt-2.5 pb-2 text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-1.5 tabular-nums">
                        <p>
                          <strong className="text-zinc-950 dark:text-zinc-100">Free Nationwide Shipping:</strong>{" "}
                          On all orders over {thresholdLabel}.
                        </p>
                        <p>
                          <strong className="text-zinc-950 dark:text-zinc-100">Rapid Dispatch:</strong>{" "}
                          24 hours within Dhaka Metro, 48 hours nationwide.
                        </p>
                        <p>
                          <strong className="text-zinc-950 dark:text-zinc-100">7-Day Sizing Guarantee:</strong>{" "}
                          Instant courier doorstep swap for size adjustments.
                        </p>
                      </div>
                    ),
                  },
                ].map((section) => {
                  const isOpen = expandedSection === section.id;
                  const Icon = section.icon;
                  return (
                    <div key={section.id} className="border-b border-zinc-200 dark:border-zinc-800 pb-3">
                      <button
                        type="button"
                        onClick={() => setExpandedSection(isOpen ? "" : section.id)}
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between font-bold uppercase tracking-wider text-zinc-950 dark:text-white py-1.5 text-left"
                      >
                        <span className="flex items-center gap-2">
                          {Icon && <Icon className="w-3.5 h-3.5 text-zinc-500" />}
                          <span>{section.title}</span>
                        </span>
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 text-zinc-500 transition-transform duration-200",
                            isOpen && "rotate-180"
                          )}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.24, ease: MOTION_EASE }}
                            className="overflow-hidden"
                          >
                            {section.content}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Complete The Uniform */}
      <section className="w-full py-14 bg-zinc-50 dark:bg-zinc-900/40 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-8">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-700 dark:text-emerald-400 font-semibold block mb-1">
                TACTICAL PAIRINGS
              </span>
              <h2 className="font-sans text-2xl font-bold uppercase tracking-tight text-zinc-950 dark:text-white">
                Complete The Uniform
              </h2>
            </div>
            <p className="text-xs font-sans text-zinc-600 dark:text-zinc-400 max-w-sm">
              Field-tested technical pairings engineered for modular everyday transit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {completeTheLookProducts.map((p, idx) => (
              <ScrollReveal key={p.id} delay={idx * 0.06}>
                <ProductCard product={p} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Mobile Purchase Bar */}
      <div
        className={cn(
          "sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 p-3 shadow-2xl transition-all duration-250 ease-editorial",
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

          <select
            aria-label="Select size"
            value={selectedSize.sizeLabel}
            onChange={(e) => {
              const s = product.sizes.find((item) => item.sizeLabel === e.target.value);
              if (s) setSelectedSize(s);
            }}
            className="px-2 py-2 text-xs font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-sm text-zinc-950 dark:text-zinc-100 focus:outline-none"
          >
            {product.sizes.map((s) => (
              <option key={s.sizeLabel} value={s.sizeLabel} disabled={s.stock === 0}>
                {s.sizeLabel} {s.stock === 0 ? "(Sold)" : ""}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={selectedSize.stock === 0}
            className="px-4 py-2.5 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-sans uppercase font-bold tracking-wider rounded-sm hover:bg-zinc-800 transition-colors flex-shrink-0"
          >
            Add
          </button>
        </div>
      </div>

      <SizeGuideModal
        product={product}
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      {/* Full-Screen Inspection & Zoom Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${product.name} image inspection lightbox`}
            className="fixed inset-0 z-50 flex flex-col"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={BACKDROP_TRANSITION}
              onClick={() => {
                setIsLightboxOpen(false);
                setIsZoomed(false);
              }}
              className="fixed inset-0 bg-zinc-950/95 backdrop-blur-md"
            />

            {/* Lightbox Stage */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={DRAWER_TRANSITION}
              className="relative z-10 flex-1 flex flex-col justify-between p-4 sm:p-6"
            >
              {/* Lightbox Top Bar */}
              <div className="flex items-center justify-between gap-4 text-white border-b border-zinc-800 pb-3">
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-sans font-bold uppercase tracking-tight truncate">
                    {product.name} — {selectedColor.colorName}
                  </p>
                  <p className="text-[11px] font-mono text-zinc-400 tabular-nums">
                    {String(activeImageIndex + 1).padStart(2, "0")} / {String(allImages.length).padStart(2, "0")} ·{" "}
                    {getAngleLabel(activeImageIndex, allImages.length)} · Use ← / → or click image to zoom
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsZoomed((prev) => !prev)}
                    aria-label={isZoomed ? "Zoom out" : "Zoom in 2x"}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border border-zinc-700 hover:border-white text-zinc-100 text-[11px] font-mono uppercase rounded-sm transition-colors duration-200 active:scale-[0.98]"
                  >
                    {isZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
                    <span>{isZoomed ? "1x Fit" : "2x Zoom"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsLightboxOpen(false);
                      setIsZoomed(false);
                    }}
                    aria-label="Close inspection lightbox"
                    className="p-2 bg-zinc-900 border border-zinc-700 hover:border-white text-zinc-100 rounded-sm transition-colors duration-200 active:scale-[0.98]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Lightbox Center Stage */}
              <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden select-none">
                {allImages.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
                      setIsZoomed(false);
                    }}
                    aria-label="Previous image"
                    className="absolute left-2 sm:left-4 z-20 p-2.5 bg-zinc-900/90 border border-zinc-700 hover:border-white text-white rounded-sm transition-all duration-200 active:scale-95"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}

                <div
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    setZoomOrigin({ x, y });
                    setIsZoomed((prev) => !prev);
                  }}
                  onMouseMove={(e) => {
                    if (!isZoomed) return;
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
                    setZoomOrigin({ x, y });
                  }}
                  className={cn(
                    "relative w-full max-w-2xl h-full max-h-[72vh] aspect-[3/4] overflow-hidden bg-zinc-900 border border-zinc-800",
                    isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                  )}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`lightbox-${activeImageIndex}-${activeImage}`}
                      initial={{ opacity: 0, scale: 0.985 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.985 }}
                      transition={{ duration: 0.26, ease: MOTION_EASE }}
                      className="absolute inset-0"
                    >
                      <SafeImage
                        src={optimizeCloudinaryUrl(activeImage, { width: 1600, height: 2133, quality: "auto:best" })}
                        alt={`${product.name} — ${getAngleLabel(activeImageIndex, allImages.length)}`}
                        fill
                        sizes="(max-width: 768px) 95vw, 720px"
                        className="object-contain"
                        style={{
                          transform: isZoomed ? "scale(2.1)" : "scale(1)",
                          transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                          transition: "transform 260ms cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {allImages.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveImageIndex((prev) => (prev + 1) % allImages.length);
                      setIsZoomed(false);
                    }}
                    aria-label="Next image"
                    className="absolute right-2 sm:right-4 z-20 p-2.5 bg-zinc-900/90 border border-zinc-700 hover:border-white text-white rounded-sm transition-all duration-200 active:scale-95"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Lightbox Bottom Angle Switcher */}
              {allImages.length > 1 && (
                <div className="flex items-center justify-center gap-2 overflow-x-auto pt-2 border-t border-zinc-800">
                  {allImages.map((img, idx) => {
                    const isActive = activeImageIndex === idx;
                    return (
                      <button
                        key={`lb-thumb-${idx}`}
                        type="button"
                        onClick={() => {
                          setActiveImageIndex(idx);
                          setIsZoomed(false);
                        }}
                        className={cn(
                          "relative flex items-center gap-2 px-2.5 py-1.5 border rounded-sm text-[11px] font-mono uppercase transition-colors duration-200 whitespace-nowrap overflow-hidden",
                          isActive
                            ? "text-zinc-950 border-white font-bold"
                            : "bg-zinc-900 text-zinc-300 border-zinc-700 hover:border-zinc-500"
                        )}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="pdp-lightbox-angle-pill"
                            transition={SPRING_INDICATOR}
                            className="absolute inset-0 bg-white"
                          />
                        )}
                        <span className="relative z-10 w-6 h-8 overflow-hidden bg-zinc-800 flex-shrink-0">
                          <SafeImage
                            src={optimizeCloudinaryUrl(img, { width: 64, height: 86 })}
                            alt=""
                            fill
                            sizes="24px"
                            className="object-cover object-top"
                          />
                        </span>
                        <span className="relative z-10">{getAngleLabel(idx, allImages.length)}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
