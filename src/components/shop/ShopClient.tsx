"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, RotateCcw, Check, Search, Filter } from "lucide-react";
import { useCommerceStore } from "@/store/useCommerceStore";
import { ProductCard } from "@/components/product/ProductCard";
import { TargetGender } from "@/types/commerce";
import { formatPrice, cn } from "@/lib/utils";
import {
  BACKDROP_TRANSITION,
  DRAWER_TRANSITION,
  PANEL_TRANSITION,
  SPRING_INDICATOR,
} from "@/components/motion/MotionPrimitives";

const CATEGORY_OPTIONS = [
  { label: "All Items", val: "all" },
  { label: "Technical Outerwear", val: "OUTERWEAR" },
  { label: "Everyday Basics", val: "BASICS" },
  { label: "Accessories & Bags", val: "ACCESSORIES" },
  { label: "Artisan Garments", val: "GARMENTS" },
  { label: "Horology & Wearables", val: "WEARABLES" },
  { label: "Footwear", val: "FOOTWEAR" },
] as const;

const GENDER_OPTIONS = [
  { label: "All", val: "all" },
  { label: "Men", val: "MALE" },
  { label: "Women", val: "FEMALE" },
  { label: "Unisex", val: "UNISEX" },
] as const;

export interface ShopInitialParams {
  query?: string;
  collection?: string;
  gender?: string;
  category?: string;
  dressType?: string;
}

interface ShopFilterControlsProps {
  idPrefix: "desktop" | "mobile";
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  selectedGender: string;
  setSelectedGender: (v: string) => void;
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  setSelectedDressType: (v: string) => void;
  selectedSize: string;
  setSelectedSize: (v: string) => void;
  selectedColor: string;
  setSelectedColor: (v: string) => void;
  selectedFitType: string;
  setSelectedFitType: (v: string) => void;
  inStockOnly: boolean;
  setInStockOnly: (v: boolean) => void;
  maxPrice: number;
  setMaxPrice: (v: number) => void;
  maxProductPrice: number;
  currency: "BDT" | "USD";
  filterOptions: {
    dressTypes: string[];
    fitTypes: string[];
    colors: { name: string; hex: string }[];
    sizes: string[];
  };
}

function ShopFilterControls({
  idPrefix,
  searchQuery,
  setSearchQuery,
  selectedGender,
  setSelectedGender,
  selectedCategory,
  setSelectedCategory,
  setSelectedDressType,
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
  selectedFitType,
  setSelectedFitType,
  inStockOnly,
  setInStockOnly,
  maxPrice,
  setMaxPrice,
  maxProductPrice,
  currency,
  filterOptions,
}: ShopFilterControlsProps) {
  return (
    <div className="space-y-6">
      {/* Inline Catalog Search */}
      <div className="space-y-2">
        <label
          htmlFor={`${idPrefix}-keyword-filter`}
          className="text-[11px] uppercase font-mono tracking-wider font-semibold text-zinc-950 dark:text-white block"
        >
          Keyword Filter
        </label>
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id={`${idPrefix}-keyword-filter`}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="280 GSM, Ripstop, Merino..."
            className="w-full pl-8 pr-7 py-2 text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-sm text-zinc-950 dark:text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-950 dark:focus:border-zinc-400 transition-colors duration-200"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Clear keyword"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors duration-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Department Filter */}
      <div className="space-y-2.5 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <span className="text-[11px] uppercase font-mono tracking-wider font-semibold text-zinc-950 dark:text-white block">
          Department
        </span>
        <div className="grid grid-cols-2 gap-1.5" role="group" aria-label="Department filter">
          {GENDER_OPTIONS.map((g, idx) => {
            const active = selectedGender === g.val;
            return (
              <React.Fragment key={g.val}>
                {idx > 0 && " "}
                <button
                  type="button"
                  onClick={() => setSelectedGender(g.val)}
                  aria-pressed={active}
                  className={cn(
                    "relative py-1.5 px-2.5 text-xs font-mono border rounded-sm text-center transition-colors duration-200 overflow-hidden",
                    active
                      ? "text-white dark:text-zinc-950 border-zinc-950 dark:border-white font-bold"
                      : "border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId={`${idPrefix}-shop-gender-pill`}
                      transition={SPRING_INDICATOR}
                      className="absolute inset-0 bg-zinc-950 dark:bg-white"
                    />
                  )}
                  <span className="relative z-10">{g.label}</span>
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Category Filter */}
      <div className="space-y-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <span className="text-[11px] uppercase font-mono tracking-wider font-semibold text-zinc-950 dark:text-white block">
          Category
        </span>
        <div className="space-y-1" role="group" aria-label="Category filter">
          {CATEGORY_OPTIONS.map((cat, idx) => {
            const active = selectedCategory === cat.val;
            return (
              <React.Fragment key={cat.val}>
                {idx > 0 && " "}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.val);
                    setSelectedDressType("all");
                  }}
                  aria-pressed={active}
                  className={cn(
                    "relative w-full text-left px-2.5 py-1.5 text-xs rounded-sm transition-colors duration-200 flex items-center justify-between overflow-hidden",
                    active
                      ? "text-white dark:text-zinc-950 font-semibold"
                      : "text-zinc-700 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-950 dark:hover:text-white"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId={`${idPrefix}-shop-category-pill`}
                      transition={SPRING_INDICATOR}
                      className="absolute inset-0 bg-zinc-950 dark:bg-white rounded-sm"
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                  {active && <Check className="w-3.5 h-3.5 relative z-10" />}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Size Filter */}
      <div className="space-y-2.5 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <span className="text-[11px] uppercase font-mono tracking-wider font-semibold text-zinc-950 dark:text-white block">
          Garment Size
        </span>
        <div className="grid grid-cols-3 gap-1.5" role="group" aria-label="Garment size filter">
          {["all", ...filterOptions.sizes.slice(0, 14)].map((s, idx) => {
            const active = selectedSize === s;
            const label = s === "all" ? "All" : s;
            return (
              <React.Fragment key={s}>
                {idx > 0 && " "}
                <button
                  type="button"
                  onClick={() => setSelectedSize(s)}
                  aria-pressed={active}
                  className={cn(
                    "relative py-1.5 px-1.5 text-[11px] font-mono font-medium border rounded-sm text-center truncate transition-colors duration-200 overflow-hidden",
                    active
                      ? "text-white dark:text-zinc-950 border-zinc-950 dark:border-white font-bold"
                      : "border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400"
                  )}
                  title={label}
                >
                  {active && (
                    <motion.span
                      layoutId={`${idPrefix}-shop-size-pill`}
                      transition={SPRING_INDICATOR}
                      className="absolute inset-0 bg-zinc-950 dark:bg-white"
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Color Swatches */}
      <div className="space-y-2.5 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex justify-between items-center">
          <span className="text-[11px] uppercase font-mono tracking-wider font-semibold text-zinc-950 dark:text-white">
            Color Palette
          </span>
          {selectedColor !== "all" && (
            <button
              type="button"
              onClick={() => setSelectedColor("all")}
              className="text-[10px] font-mono text-zinc-500 hover:text-zinc-950 dark:hover:text-white hover:underline transition-colors duration-200"
            >
              Reset
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {filterOptions.colors.map((c, idx) => (
            <React.Fragment key={c.name}>
              {idx > 0 && " "}
              <button
                type="button"
                onClick={() => setSelectedColor(selectedColor === c.name ? "all" : c.name)}
                title={c.name}
                aria-label={`Filter by color ${c.name}`}
                aria-pressed={selectedColor === c.name}
                className={cn(
                  "w-6 h-6 rounded-full border-2 transition-all duration-200 ease-editorial p-0.5",
                  selectedColor === c.name
                    ? "border-zinc-950 dark:border-white scale-110 ring-1 ring-zinc-400"
                    : "border-transparent opacity-80 hover:opacity-100 hover:scale-105"
                )}
              >
                <div
                  className="w-full h-full rounded-full border border-black/15"
                  style={{ backgroundColor: c.hex }}
                />
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Max Price Slider */}
      <div className="space-y-2.5 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex justify-between items-center text-xs font-sans">
          <label
            htmlFor={`${idPrefix}-max-price`}
            className="text-[11px] uppercase font-mono tracking-wider font-semibold text-zinc-950 dark:text-white"
          >
            Max Price
          </label>{" "}
          <span className="font-mono font-bold text-zinc-950 dark:text-white tabular-nums">
            {formatPrice(maxPrice, currency)}
          </span>
        </div>
        <input
          id={`${idPrefix}-max-price`}
          type="range"
          aria-label="Maximum price filter"
          min="1000"
          max={maxProductPrice}
          step="250"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-zinc-950 dark:accent-white cursor-pointer"
        />
      </div>

      {/* In-Stock Toggle */}
      <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-xs font-sans text-zinc-800 dark:text-zinc-200 font-medium">
            In-Stock Items Only
          </span>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="w-4 h-4 accent-zinc-950 dark:accent-white cursor-pointer"
          />
        </label>
      </div>

      {/* Fit Silhouette */}
      <div className="space-y-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <span className="text-[11px] uppercase font-mono tracking-wider font-semibold text-zinc-950 dark:text-white block">
          Garment Fit Silhouette
        </span>
        <div className="space-y-1" role="group" aria-label="Garment fit silhouette">
          {["all", ...filterOptions.fitTypes].map((fit, idx) => {
            const active = selectedFitType === fit;
            return (
              <React.Fragment key={fit}>
                {idx > 0 && " "}
                <button
                  type="button"
                  onClick={() => setSelectedFitType(fit)}
                  aria-pressed={active}
                  className={cn(
                    "relative w-full text-left px-2.5 py-1.5 text-xs rounded-sm transition-colors duration-200 flex items-center justify-between overflow-hidden",
                    active
                      ? "text-zinc-950 dark:text-white font-bold"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId={`${idPrefix}-shop-fit-pill`}
                      transition={SPRING_INDICATOR}
                      className="absolute inset-0 bg-zinc-100 dark:bg-zinc-900 rounded-sm"
                    />
                  )}
                  <span className="relative z-10">{fit === "all" ? "All Silhouettes" : fit}</span>
                  {active && <Check className="w-3.5 h-3.5 relative z-10" />}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ShopUrlParamsSync({
  onSync,
}: {
  onSync: (params: {
    query: string;
    collection: string;
    gender: string;
    category: string;
    dressType: string;
  }) => void;
}) {
  const searchParams = useSearchParams();
  const paramString = searchParams.toString();

  useEffect(() => {
    const params = new URLSearchParams(paramString);
    onSync({
      query: params.get("query") || "",
      collection: params.get("collection") || "all",
      gender: params.get("gender") || "all",
      category: params.get("category") || "all",
      dressType: params.get("dressType") || "all",
    });
  }, [paramString, onSync]);

  return null;
}

export function ShopClient({ initialParams = {} }: { initialParams?: ShopInitialParams }) {
  const router = useRouter();
  const { products, currency } = useCommerceStore();

  const maxProductPrice = useMemo(() => {
    return Math.max(...products.map((p) => p.discountPrice || p.basePrice), 6000);
  }, [products]);

  const [searchQuery, setSearchQuery] = useState<string>(initialParams.query || "");
  const [selectedCollection, setSelectedCollection] = useState<string>(
    initialParams.collection || "all"
  );
  const [selectedGender, setSelectedGender] = useState<string>(
    (initialParams.gender as TargetGender | undefined) || "all"
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialParams.category || "all"
  );
  const [selectedDressType, setSelectedDressType] = useState<string>(
    initialParams.dressType || "all"
  );
  const [selectedFitType, setSelectedFitType] = useState<string>("all");
  const [selectedColor, setSelectedColor] = useState<string>("all");
  const [selectedSize, setSelectedSize] = useState<string>("all");
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>(maxProductPrice);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Sync server-provided initialParams whenever route props update
  useEffect(() => {
    setSearchQuery(initialParams.query || "");
    setSelectedCollection(initialParams.collection || "all");
    setSelectedGender(initialParams.gender || "all");
    setSelectedCategory(initialParams.category || "all");
    setSelectedDressType(initialParams.dressType || "all");
  }, [
    initialParams.query,
    initialParams.collection,
    initialParams.gender,
    initialParams.category,
    initialParams.dressType,
  ]);

  const handleUrlSync = React.useCallback(
    (params: {
      query: string;
      collection: string;
      gender: string;
      category: string;
      dressType: string;
    }) => {
      setSearchQuery(params.query);
      setSelectedCollection(params.collection);
      setSelectedGender(params.gender);
      setSelectedCategory(params.category);
      setSelectedDressType(params.dressType);
    },
    []
  );

  useEffect(() => {
    if (!mobileFilterOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileFilterOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileFilterOpen]);

  const filterOptions = useMemo(() => {
    const dressTypes = Array.from(new Set(products.map((p) => p.dressType)));
    const fitTypes = Array.from(new Set(products.map((p) => p.fitType).filter(Boolean)));
    const colors = Array.from(
      new Map(
        products.map((p) => [p.primaryColor, { name: p.primaryColor, hex: p.primaryColorHex }])
      ).values()
    );
    const standardSizesOrder = ["XS", "S", "M", "L", "XL", "XXL", "22L", "OSFA"];
    const allSizes = Array.from(new Set(products.flatMap((p) => p.sizes.map((s) => s.sizeLabel))));
    const sortedSizes = allSizes.sort((a, b) => {
      const idxA = standardSizesOrder.indexOf(a);
      const idxB = standardSizesOrder.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });

    return { dressTypes, fitTypes, colors, sizes: sortedSizes };
  }, [products]);

  const visibleDressTypes = useMemo(() => {
    const scoped = products.filter((p) => {
      if (selectedGender !== "all") {
        if (selectedGender === "UNISEX") {
          if (p.gender !== "UNISEX") return false;
        } else if (p.gender !== selectedGender && p.gender !== "UNISEX") {
          return false;
        }
      }
      if (selectedCategory !== "all") {
        if (
          selectedCategory === "OUTERWEAR" &&
          p.mainCategory !== "OUTERWEAR" &&
          !p.dressType.includes("Windbreaker") &&
          !p.dressType.includes("Cargo")
        )
          return false;
        if (
          selectedCategory === "BASICS" &&
          p.mainCategory !== "BASICS" &&
          !p.dressType.includes("Tee") &&
          !p.dressType.includes("Crewneck") &&
          !p.dressType.includes("Polo")
        )
          return false;
        if (
          selectedCategory === "ACCESSORIES" &&
          p.mainCategory !== "ACCESSORIES" &&
          p.mainCategory !== "WEARABLES" &&
          !p.dressType.includes("Bag") &&
          !p.dressType.includes("Cap")
        )
          return false;
        if (
          selectedCategory !== "OUTERWEAR" &&
          selectedCategory !== "BASICS" &&
          selectedCategory !== "ACCESSORIES" &&
          p.mainCategory !== selectedCategory
        )
          return false;
      }
      return true;
    });

    const types = Array.from(new Set(scoped.map((p) => p.dressType))).slice(0, 12);
    if (selectedDressType !== "all" && !types.includes(selectedDressType)) {
      types.unshift(selectedDressType);
    }
    return types;
  }, [products, selectedGender, selectedCategory, selectedDressType]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCollection !== "all") count++;
    if (selectedGender !== "all") count++;
    if (selectedCategory !== "all") count++;
    if (selectedDressType !== "all") count++;
    if (selectedFitType !== "all") count++;
    if (selectedColor !== "all") count++;
    if (selectedSize !== "all") count++;
    if (inStockOnly) count++;
    if (maxPrice < maxProductPrice) count++;
    if (searchQuery.trim() !== "") count++;
    return count;
  }, [
    selectedCollection,
    selectedGender,
    selectedCategory,
    selectedDressType,
    selectedFitType,
    selectedColor,
    selectedSize,
    inStockOnly,
    maxPrice,
    maxProductPrice,
    searchQuery,
  ]);

  const handleResetFilters = () => {
    setSelectedCollection("all");
    setSelectedGender("all");
    setSelectedCategory("all");
    setSelectedDressType("all");
    setSelectedFitType("all");
    setSelectedColor("all");
    setSelectedSize("all");
    setInStockOnly(false);
    setMaxPrice(maxProductPrice);
    setSearchQuery("");
    router.replace("/shop", { scroll: false });
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matches =
            p.name.toLowerCase().includes(q) ||
            p.subtitle.toLowerCase().includes(q) ||
            p.dressType.toLowerCase().includes(q) ||
            p.fabricType.toLowerCase().includes(q) ||
            p.primaryColor.toLowerCase().includes(q) ||
            (p.badge && p.badge.toLowerCase().includes(q));
          if (!matches) return false;
        }

        if (selectedCollection === "new" && !p.isNewCollection) return false;
        if (selectedCollection === "trending" && !p.isTrending) return false;

        if (selectedGender !== "all") {
          if (selectedGender === "UNISEX") {
            if (p.gender !== "UNISEX") return false;
          } else if (p.gender !== selectedGender && p.gender !== "UNISEX") {
            return false;
          }
        }

        if (selectedCategory !== "all") {
          if (
            selectedCategory === "OUTERWEAR" &&
            p.mainCategory !== "OUTERWEAR" &&
            !p.dressType.includes("Windbreaker") &&
            !p.dressType.includes("Cargo")
          )
            return false;
          if (
            selectedCategory === "BASICS" &&
            p.mainCategory !== "BASICS" &&
            !p.dressType.includes("Tee") &&
            !p.dressType.includes("Crewneck") &&
            !p.dressType.includes("Polo")
          )
            return false;
          if (
            selectedCategory === "ACCESSORIES" &&
            p.mainCategory !== "ACCESSORIES" &&
            p.mainCategory !== "WEARABLES" &&
            !p.dressType.includes("Bag") &&
            !p.dressType.includes("Cap")
          )
            return false;
          if (
            selectedCategory !== "OUTERWEAR" &&
            selectedCategory !== "BASICS" &&
            selectedCategory !== "ACCESSORIES" &&
            p.mainCategory !== selectedCategory
          )
            return false;
        }

        if (selectedDressType !== "all") {
          const matchExact = p.dressType.toLowerCase() === selectedDressType.toLowerCase();
          const matchPartial = p.dressType.toLowerCase().includes(selectedDressType.toLowerCase());
          if (!matchExact && !matchPartial) return false;
        }

        if (selectedFitType !== "all" && p.fitType !== selectedFitType) return false;
        if (selectedColor !== "all" && p.primaryColor !== selectedColor) return false;

        if (
          selectedSize !== "all" &&
          !p.sizes.some((s) => s.sizeLabel === selectedSize && s.stock > 0)
        )
          return false;

        if (inStockOnly) {
          const totalStock = p.sizes.reduce((acc, s) => acc + s.stock, 0);
          if (totalStock === 0) return false;
        }

        const effectivePrice = p.discountPrice || p.basePrice;
        if (effectivePrice > maxPrice) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price_asc") {
          return (a.discountPrice || a.basePrice) - (b.discountPrice || b.basePrice);
        }
        if (sortBy === "price_desc") {
          return (b.discountPrice || b.basePrice) - (a.discountPrice || a.basePrice);
        }
        if (sortBy === "newest") {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (sortBy === "trending") {
          return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
        }
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [
    products,
    searchQuery,
    selectedCollection,
    selectedGender,
    selectedCategory,
    selectedDressType,
    selectedFitType,
    selectedColor,
    selectedSize,
    inStockOnly,
    maxPrice,
    sortBy,
  ]);

  const gridTransitionKey = `${selectedCollection}|${selectedGender}|${selectedCategory}|${selectedDressType}|${selectedFitType}|${selectedColor}|${selectedSize}|${inStockOnly}|${sortBy}|${filteredProducts.length === 0 ? "empty" : "list"}`;

  const sharedFilterProps = {
    searchQuery,
    setSearchQuery,
    selectedGender,
    setSelectedGender,
    selectedCategory,
    setSelectedCategory,
    setSelectedDressType,
    selectedSize,
    setSelectedSize,
    selectedColor,
    setSelectedColor,
    selectedFitType,
    setSelectedFitType,
    inStockOnly,
    setInStockOnly,
    maxPrice,
    setMaxPrice,
    maxProductPrice,
    currency,
    filterOptions,
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50">
      <Suspense fallback={null}>
        <ShopUrlParamsSync onSync={handleUrlSync} />
      </Suspense>

      {/* Header Banner */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block">
              SYSTEM CATALOG // RELEASE 04
            </span>
            <h1 className="font-sans text-3xl sm:text-4xl font-black uppercase tracking-tightest text-zinc-950 dark:text-white">
              Tactical Garments &amp; Gear
            </h1>
            <p className="text-xs sm:text-sm font-sans text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed">
              Engineered everyday basics, DWR ripstop outerwear, and technical activewear built with precision sizing.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400 tabular-nums">
              Showing {filteredProducts.length} of {products.length} Items
            </span>
            {activeFilterCount > 0 && (
              <>
                {" "}
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-3 py-1.5 text-xs font-mono uppercase bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-300 dark:hover:bg-zinc-700 active:scale-[0.98] rounded-sm transition-all duration-200 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset ({activeFilterCount})</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Catalog Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Mobile Controls */}
        <div className="lg:hidden flex items-center justify-between gap-3 mb-5 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-sans uppercase tracking-wider font-semibold rounded-sm active:scale-[0.98] transition-all duration-200"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ""}</span>
          </button>

          <div className="flex items-center gap-2">
            <label htmlFor="mobile-sort" className="text-xs font-mono text-zinc-600 hidden sm:inline">
              Sort:
            </label>
            <select
              id="mobile-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-sans bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 py-2 px-2.5 rounded-sm text-zinc-950 dark:text-zinc-100 focus:outline-none transition-colors duration-200"
            >
              <option value="featured">Featured First</option>
              <option value="newest">Newest Releases</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="trending">Trending Status</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Desktop Sticky Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 space-y-5 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 no-scrollbar">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-zinc-950 dark:text-white flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Filter Catalog</span>
                </span>
                {activeFilterCount > 0 && (
                  <>
                    {" "}
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="text-[11px] font-mono text-zinc-600 hover:text-zinc-950 dark:hover:text-zinc-200 underline transition-colors duration-200"
                    >
                      Clear All
                    </button>
                  </>
                )}
              </div>
              <ShopFilterControls idPrefix="desktop" {...sharedFilterProps} />
            </div>
          </aside>

          {/* Product Grid */}
          <div className="lg:col-span-9 space-y-5">
            {/* Garment Type (dressType) Quick Filter Ribbon with Shared Indicator */}
            <div
              className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1"
              role="tablist"
              aria-label="Garment type filter"
            >
              {["all", ...visibleDressTypes].map((dtype, idx) => {
                const active =
                  dtype === "all"
                    ? selectedDressType === "all"
                    : selectedDressType.toLowerCase() === dtype.toLowerCase();
                return (
                  <React.Fragment key={dtype}>
                    {idx > 0 && " "}
                    <button
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setSelectedDressType(dtype)}
                      className={cn(
                        "relative px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider border rounded-sm whitespace-nowrap transition-colors duration-200 flex-shrink-0 overflow-hidden",
                        active
                          ? "text-white dark:text-zinc-950 border-zinc-950 dark:border-white font-bold"
                          : "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="shop-dresstype-pill"
                          transition={SPRING_INDICATOR}
                          className="absolute inset-0 bg-zinc-950 dark:bg-white"
                        />
                      )}
                      <span className="relative z-10">{dtype === "all" ? "All Types" : dtype}</span>
                    </button>
                  </React.Fragment>
                );
              })}
            </div>

            {/* Desktop Criteria & Sort */}
            <div className="hidden lg:flex items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono uppercase text-zinc-500">Active Criteria:</span>
                {selectedGender !== "all" && (
                  <>
                    {" "}
                    <button
                      type="button"
                      onClick={() => setSelectedGender("all")}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 hover:border-zinc-950 dark:hover:border-white rounded-sm transition-colors duration-200"
                    >
                      <span>Dept: {selectedGender}</span>
                      <X className="w-3 h-3" />
                    </button>
                  </>
                )}
                {selectedCategory !== "all" && (
                  <>
                    {" "}
                    <button
                      type="button"
                      onClick={() => setSelectedCategory("all")}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 hover:border-zinc-950 dark:hover:border-white rounded-sm transition-colors duration-200"
                    >
                      <span>Category: {selectedCategory}</span>
                      <X className="w-3 h-3" />
                    </button>
                  </>
                )}
                {selectedDressType !== "all" && (
                  <>
                    {" "}
                    <button
                      type="button"
                      onClick={() => setSelectedDressType("all")}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 hover:border-zinc-950 dark:hover:border-white rounded-sm transition-colors duration-200"
                    >
                      <span>Type: {selectedDressType}</span>
                      <X className="w-3 h-3" />
                    </button>
                  </>
                )}
                {selectedCollection !== "all" && (
                  <>
                    {" "}
                    <button
                      type="button"
                      onClick={() => setSelectedCollection("all")}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 hover:border-zinc-950 dark:hover:border-white rounded-sm transition-colors duration-200"
                    >
                      <span>Collection: {selectedCollection}</span>
                      <X className="w-3 h-3" />
                    </button>
                  </>
                )}
                {selectedSize !== "all" && (
                  <>
                    {" "}
                    <button
                      type="button"
                      onClick={() => setSelectedSize("all")}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 hover:border-zinc-950 dark:hover:border-white rounded-sm transition-colors duration-200"
                    >
                      <span>Size: {selectedSize}</span>
                      <X className="w-3 h-3" />
                    </button>
                  </>
                )}
                {searchQuery && (
                  <>
                    {" "}
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 hover:border-zinc-950 dark:hover:border-white rounded-sm transition-colors duration-200"
                    >
                      <span>&quot;{searchQuery}&quot;</span>
                      <X className="w-3 h-3" />
                    </button>
                  </>
                )}
                {activeFilterCount === 0 && (
                  <>
                    {" "}
                    <span className="text-xs font-mono text-zinc-500">All Catalog Items</span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs flex-shrink-0">
                <label htmlFor="desktop-sort" className="font-mono text-zinc-600 uppercase">
                  Sort By:
                </label>
                <select
                  id="desktop-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 py-1.5 px-2.5 rounded-sm text-zinc-950 dark:text-zinc-100 focus:outline-none font-sans transition-colors duration-200"
                >
                  <option value="featured">Featured First</option>
                  <option value="newest">Newest First</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="trending">Trending Status</option>
                </select>
              </div>
            </div>

            {/* Smoothly Transitioning Filtered Grid */}
            <AnimatePresence mode="wait">
              {filteredProducts.length === 0 ? (
                <motion.div
                  key={gridTransitionKey}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={PANEL_TRANSITION}
                  className="py-20 px-6 text-center space-y-3 border border-dashed border-zinc-300 dark:border-zinc-800"
                >
                  <p className="font-sans font-bold text-lg text-zinc-950 dark:text-white">
                    No garments match the current criteria
                  </p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
                    Try widening your price range, clearing size filters, or resetting search criteria.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="px-5 py-2.5 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-sans uppercase font-bold tracking-wider hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-[0.98] rounded-sm transition-all duration-200"
                  >
                    Reset All Filters
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key={gridTransitionKey}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={PANEL_TRANSITION}
                  className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-5"
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <div
            className="fixed inset-0 z-50 overflow-hidden lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Filter Garments"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={BACKDROP_TRANSITION}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />
            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 pointer-events-none">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={DRAWER_TRANSITION}
                className="pointer-events-auto w-screen max-w-xs bg-white dark:bg-zinc-950 p-5 flex flex-col justify-between border-l border-zinc-200 dark:border-zinc-800"
              >
                <div className="flex items-center justify-between pb-3.5 border-b border-zinc-200 dark:border-zinc-800">
                  <h3 className="text-sm font-sans uppercase font-bold text-zinc-950 dark:text-white">
                    Filter Garments
                  </h3>
                  <button
                    type="button"
                    onClick={() => setMobileFilterOpen(false)}
                    aria-label="Close Filters"
                    className="p-1 text-zinc-600 hover:text-zinc-950 dark:hover:text-white transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto py-4 pr-1">
                  <ShopFilterControls idPrefix="mobile" {...sharedFilterProps} />
                </div>

                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex gap-2">
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="flex-1 py-2.5 border border-zinc-300 dark:border-zinc-700 text-xs font-sans uppercase font-bold rounded-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors duration-200"
                  >
                    Reset
                  </button>{" "}
                  <button
                    type="button"
                    onClick={() => setMobileFilterOpen(false)}
                    className="flex-1 py-2.5 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-sans uppercase font-bold rounded-sm tabular-nums active:scale-[0.98] transition-all duration-200"
                  >
                    Apply ({filteredProducts.length})
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
