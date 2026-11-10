"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SlidersHorizontal, X, RotateCcw, Check, ArrowUpDown, Search, Filter } from "lucide-react";
import { useCommerceStore } from "@/store/useCommerceStore";
import { ProductCard } from "@/components/product/ProductCard";
import { Product, TargetGender, AgeGroup, MainCategory } from "@/types/commerce";
import { formatPrice, cn } from "@/lib/utils";

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { products, currency } = useCommerceStore();

  // URL query params
  const initialCategory = searchParams.get("category");
  const initialGender = searchParams.get("gender") as TargetGender | null;
  const initialAgeGroup = searchParams.get("ageGroup") as AgeGroup | null;
  const initialCollection = searchParams.get("collection");
  const initialQuery = searchParams.get("query") || "";
  const initialDressType = searchParams.get("dressType");

  // Filters State
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [selectedCollection, setSelectedCollection] = useState<string>(
    initialCollection || "all"
  );
  const [selectedGender, setSelectedGender] = useState<string>(
    initialGender || "all"
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || "all"
  );
  const [selectedDressType, setSelectedDressType] = useState<string>(
    initialDressType || "all"
  );
  const [selectedFitType, setSelectedFitType] = useState<string>("all");
  const [selectedColor, setSelectedColor] = useState<string>("all");
  const [selectedSize, setSelectedSize] = useState<string>("all");
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  // Price range slider state
  const maxProductPrice = useMemo(() => {
    return Math.max(...products.map((p) => p.discountPrice || p.basePrice), 6000);
  }, [products]);
  const [maxPrice, setMaxPrice] = useState<number>(maxProductPrice);

  const [sortBy, setSortBy] = useState<string>("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Extract unique filter options from catalog
  const filterOptions = useMemo(() => {
    const dressTypes = Array.from(new Set(products.map((p) => p.dressType)));
    const fitTypes = Array.from(new Set(products.map((p) => p.fitType).filter(Boolean)));
    const fabrics = Array.from(new Set(products.map((p) => p.fabricType)));
    const colors = Array.from(
      new Map(
        products.map((p) => [p.primaryColor, { name: p.primaryColor, hex: p.primaryColorHex }])
      ).values()
    );
    // Standard sizes sorted logically
    const standardSizesOrder = ["XS", "S", "M", "L", "XL", "XXL", "22L", "OSFA"];
    const allSizes = Array.from(
      new Set(products.flatMap((p) => p.sizes.map((s) => s.sizeLabel)))
    );
    const sortedSizes = allSizes.sort((a, b) => {
      const idxA = standardSizesOrder.indexOf(a);
      const idxB = standardSizesOrder.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });

    return { dressTypes, fitTypes, fabrics, colors, sizes: sortedSizes };
  }, [products]);

  // Active filter count calculation
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
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Text Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matches =
            p.name.toLowerCase().includes(q) ||
            p.dressType.toLowerCase().includes(q) ||
            p.fabricType.toLowerCase().includes(q) ||
            p.primaryColor.toLowerCase().includes(q) ||
            (p.badge && p.badge.toLowerCase().includes(q));
          if (!matches) return false;
        }

        // Collection
        if (selectedCollection === "new" && !p.isNewCollection) return false;
        if (selectedCollection === "trending" && !p.isTrending) return false;

        // Gender
        if (selectedGender !== "all" && p.gender !== selectedGender && p.gender !== "UNISEX")
          return false;

        // Main Category
        if (selectedCategory !== "all") {
          if (selectedCategory === "OUTERWEAR" && p.mainCategory !== "OUTERWEAR" && !p.dressType.includes("Windbreaker") && !p.dressType.includes("Cargo"))
            return false;
          if (selectedCategory === "BASICS" && p.mainCategory !== "BASICS" && !p.dressType.includes("Tee") && !p.dressType.includes("Crewneck") && !p.dressType.includes("Polo"))
            return false;
          if (selectedCategory === "ACCESSORIES" && p.mainCategory !== "ACCESSORIES" && p.mainCategory !== "WEARABLES" && !p.dressType.includes("Bag") && !p.dressType.includes("Cap"))
            return false;
          if (selectedCategory !== "OUTERWEAR" && selectedCategory !== "BASICS" && selectedCategory !== "ACCESSORIES" && p.mainCategory !== selectedCategory)
            return false;
        }

        // Dress Type
        if (selectedDressType !== "all" && p.dressType !== selectedDressType)
          return false;

        // Fit Type
        if (selectedFitType !== "all" && p.fitType !== selectedFitType)
          return false;

        // Primary Color
        if (selectedColor !== "all" && p.primaryColor !== selectedColor)
          return false;

        // Size
        if (
          selectedSize !== "all" &&
          !p.sizes.some((s) => s.sizeLabel === selectedSize && s.stock > 0)
        )
          return false;

        // In Stock Only
        if (inStockOnly) {
          const totalStock = p.sizes.reduce((acc, s) => acc + s.stock, 0);
          if (totalStock === 0) return false;
        }

        // Max Price Slider
        const effectivePrice = p.discountPrice || p.basePrice;
        if (effectivePrice > maxPrice) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price_asc") {
          const priceA = a.discountPrice || a.basePrice;
          const priceB = b.discountPrice || b.basePrice;
          return priceA - priceB;
        }
        if (sortBy === "price_desc") {
          const priceA = a.discountPrice || a.basePrice;
          const priceB = b.discountPrice || b.basePrice;
          return priceB - priceA;
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

  return (
    <div className="w-full min-h-screen bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50">
      {/* Header Banner */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block mb-1">
              SYSTEM CATALOG // RELEASE 04
            </span>
            <h1 className="font-sans text-3xl sm:text-4xl font-black uppercase tracking-tightest text-zinc-950 dark:text-white">
              Tactical Garments & Gear
            </h1>
            <p className="text-xs sm:text-sm font-sans text-zinc-600 dark:text-zinc-400 mt-1 max-w-xl">
              Engineered everyday basics, DWR ripstop outerwear, and technical activewear built with military-grade precision.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-zinc-500 tabular-nums">
              Showing {filteredProducts.length} of {products.length} Items
            </span>
            {activeFilterCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="px-2.5 py-1 text-xs font-mono uppercase bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset ({activeFilterCount})</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Catalog View: Sticky Sidebar Filters + 4-Column Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Mobile Filter Bar & Sort Controls */}
        <div className="lg:hidden flex items-center justify-between gap-3 mb-6 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-sans uppercase tracking-wider font-semibold"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Garments {activeFilterCount > 0 ? `(${activeFilterCount})` : ""}</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-500 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-sans bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 py-2 px-2.5 text-zinc-900 dark:text-zinc-100 focus:outline-none"
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
          {/* Desktop Left Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="sticky top-24 space-y-6 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2 no-scrollbar">
              {/* Header with Clear button */}
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-zinc-950 dark:text-white flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  Filter Catalog
                </span>
                {activeFilterCount > 0 && (
                  <button
                    onClick={handleResetFilters}
                    className="text-[11px] font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 underline"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* 1. Size Filter (Chips XS to XXL) */}
              <div className="space-y-2.5">
                <label className="text-[11px] uppercase font-mono tracking-wider font-semibold text-zinc-950 dark:text-white block">
                  Garment Size
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  <button
                    onClick={() => setSelectedSize("all")}
                    className={cn(
                      "py-1.5 px-2 text-[11px] font-mono font-medium border text-center transition-colors",
                      selectedSize === "all"
                        ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 border-zinc-950 dark:border-white font-bold"
                        : "border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400"
                    )}
                  >
                    All
                  </button>
                  {filterOptions.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={cn(
                        "py-1.5 px-2 text-[11px] font-mono font-medium border text-center transition-colors",
                        selectedSize === s
                          ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 border-zinc-950 dark:border-white font-bold"
                          : "border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Color Swatches Filter */}
              <div className="space-y-2.5 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <div className="flex justify-between items-center">
                  <label className="text-[11px] uppercase font-mono tracking-wider font-semibold text-zinc-950 dark:text-white">
                    Color Palette
                  </label>
                  {selectedColor !== "all" && (
                    <button
                      onClick={() => setSelectedColor("all")}
                      className="text-[10px] font-mono text-zinc-400 hover:underline"
                    >
                      Reset
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {filterOptions.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(selectedColor === c.name ? "all" : c.name)}
                      title={c.name}
                      aria-label={`Filter by ${c.name}`}
                      className={cn(
                        "w-6 h-6 rounded-full border-2 transition-all p-0.5 relative group",
                        selectedColor === c.name
                          ? "border-zinc-950 dark:border-white scale-110 ring-1 ring-zinc-400"
                          : "border-transparent opacity-80 hover:opacity-100"
                      )}
                    >
                      <div
                        className="w-full h-full rounded-full border border-black/15"
                        style={{ backgroundColor: c.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Price Range Slider */}
              <div className="space-y-2.5 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <div className="flex justify-between items-center text-xs font-sans">
                  <label className="text-[11px] uppercase font-mono tracking-wider font-semibold text-zinc-950 dark:text-white">
                    Max Price
                  </label>
                  <span className="font-mono font-bold text-zinc-900 dark:text-white tabular-nums">
                    {formatPrice(maxPrice, currency)}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max={maxProductPrice}
                  step="250"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-zinc-950 dark:accent-white cursor-pointer"
                />
              </div>

              {/* 4. In-Stock Only Toggle */}
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

              {/* 5. Fit Type Filter */}
              <div className="space-y-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <label className="text-[11px] uppercase font-mono tracking-wider font-semibold text-zinc-950 dark:text-white block">
                  Garment Fit Silhouette
                </label>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedFitType("all")}
                    className={cn(
                      "w-full text-left px-2 py-1 text-xs transition-colors flex items-center justify-between",
                      selectedFitType === "all"
                        ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-950 dark:text-white font-bold"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                    )}
                  >
                    <span>All Silhouettes</span>
                    {selectedFitType === "all" && <Check className="w-3.5 h-3.5" />}
                  </button>
                  {filterOptions.fitTypes.map((fit) => (
                    <button
                      key={fit}
                      onClick={() => setSelectedFitType(fit)}
                      className={cn(
                        "w-full text-left px-2 py-1 text-xs transition-colors flex items-center justify-between",
                        selectedFitType === fit
                          ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-950 dark:text-white font-bold"
                          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                      )}
                    >
                      <span>{fit}</span>
                      {selectedFitType === fit && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* 6. Main Category Filter */}
              <div className="space-y-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <label className="text-[11px] uppercase font-mono tracking-wider font-semibold text-zinc-950 dark:text-white block">
                  Category
                </label>
                <div className="space-y-1">
                  {[
                    { label: "All Items", val: "all" },
                    { label: "Technical Outerwear", val: "OUTERWEAR" },
                    { label: "Everyday Basics", val: "BASICS" },
                    { label: "Accessories & Bags", val: "ACCESSORIES" },
                    { label: "Artisan Garments", val: "GARMENTS" },
                    { label: "Horology & Wearables", val: "WEARABLES" },
                  ].map((cat) => (
                    <button
                      key={cat.val}
                      onClick={() => setSelectedCategory(cat.val)}
                      className={cn(
                        "w-full text-left px-2 py-1 text-xs transition-colors flex items-center justify-between",
                        selectedCategory === cat.val
                          ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-950 dark:text-white font-bold"
                          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                      )}
                    >
                      <span>{cat.label}</span>
                      {selectedCategory === cat.val && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Catalog Grid Area */}
          <main className="lg:col-span-9 space-y-6">
            {/* Desktop Sort Controls & Search Query Display */}
            <div className="hidden lg:flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase text-zinc-500">Active Criteria:</span>
                {selectedCategory !== "all" && (
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700">
                    Category: {selectedCategory}
                  </span>
                )}
                {selectedSize !== "all" && (
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700">
                    Size: {selectedSize}
                  </span>
                )}
                {selectedFitType !== "all" && (
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700">
                    Fit: {selectedFitType}
                  </span>
                )}
                {searchQuery && (
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700">
                    &quot;{searchQuery}&quot;
                  </span>
                )}
              </div>

              {/* Sort By */}
              <div className="flex items-center gap-2 text-xs">
                <span className="font-mono text-zinc-500 uppercase">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 py-1 px-2 text-zinc-900 dark:text-zinc-100 focus:outline-none font-sans"
                >
                  <option value="featured">Featured First</option>
                  <option value="newest">Newest First</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="trending">Trending Status</option>
                </select>
              </div>
            </div>

            {/* Zero State */}
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center space-y-3 border border-dashed border-zinc-300 dark:border-zinc-800">
                <p className="font-sans font-bold text-lg text-zinc-950 dark:text-white">
                  No garments match the current criteria
                </p>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                  Try widening your price range, clearing size filters, or resetting search tags.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-sans uppercase font-bold tracking-wider hover:bg-zinc-800 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              /* Balanced 4-Column Catalog Grid (2 cols mobile at 390px, 3 tablet at 768px, 4 desktop at 1440px) */
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Slide-Over Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            onClick={() => setMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-white dark:bg-zinc-950 p-6 flex flex-col justify-between border-l border-zinc-200 dark:border-zinc-800 animate-in slide-in-from-right duration-200">
              <div className="space-y-6 overflow-y-auto pr-1">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
                  <h3 className="text-sm font-sans uppercase font-bold text-zinc-950 dark:text-white">
                    Filter Garments
                  </h3>
                  <button onClick={() => setMobileFilterOpen(false)} className="p-1">
                    <X className="w-4 h-4 text-zinc-500" />
                  </button>
                </div>

                {/* Size */}
                <div className="space-y-2">
                  <label className="text-[11px] uppercase font-mono tracking-wider font-semibold text-zinc-950 dark:text-white block">
                    Size
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      onClick={() => setSelectedSize("all")}
                      className={cn(
                        "py-1 text-xs font-mono border",
                        selectedSize === "all" ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950" : "border-zinc-200 dark:border-zinc-800"
                      )}
                    >
                      All
                    </button>
                    {filterOptions.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={cn(
                          "py-1 text-xs font-mono border",
                          selectedSize === s ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950" : "border-zinc-200 dark:border-zinc-800"
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Max Price */}
                <div className="space-y-2 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                  <div className="flex justify-between text-xs font-mono">
                    <span>Max: {formatPrice(maxPrice, currency)}</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max={maxProductPrice}
                    step="250"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-zinc-950 dark:accent-white"
                  />
                </div>

                {/* In Stock */}
                <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800">
                  <label className="flex items-center justify-between text-xs font-sans">
                    <span>In-Stock Only</span>
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="w-4 h-4 accent-zinc-950 dark:accent-white"
                    />
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex gap-2">
                <button
                  onClick={handleResetFilters}
                  className="flex-1 py-2.5 border border-zinc-300 dark:border-zinc-700 text-xs font-sans uppercase font-bold"
                >
                  Reset
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 py-2.5 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-sans uppercase font-bold"
                >
                  Apply ({filteredProducts.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs font-mono">Loading technical catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
