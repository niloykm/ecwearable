"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, RotateCcw, Check, ArrowUpDown } from "lucide-react";
import { useCommerceStore } from "@/store/useCommerceStore";
import { ProductCard } from "@/components/product/ProductCard";
import { Product, TargetGender, AgeGroup, MainCategory } from "@/types/commerce";
import { formatPrice } from "@/lib/utils";

function ShopContent() {
  const searchParams = useSearchParams();
  const { products, currency } = useCommerceStore();

  // URL query params initialization
  const initialCategory = searchParams.get("category");
  const initialGender = searchParams.get("gender") as TargetGender | null;
  const initialAgeGroup = searchParams.get("ageGroup") as AgeGroup | null;
  const initialCollection = searchParams.get("collection");

  // Filters State
  const [selectedCollection, setSelectedCollection] = useState<string>(
    initialCollection || "all"
  );
  const [selectedDemographic, setSelectedDemographic] = useState<string>(
    initialAgeGroup || "all"
  );
  const [selectedGender, setSelectedGender] = useState<string>(
    initialGender || "all"
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || "all"
  );
  const [selectedDressType, setSelectedDressType] = useState<string>("all");
  const [selectedFabric, setSelectedFabric] = useState<string>("all");
  const [selectedColor, setSelectedColor] = useState<string>("all");
  const [selectedSize, setSelectedSize] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Extract unique filter options from live products
  const filterOptions = useMemo(() => {
    const dressTypes = Array.from(new Set(products.map((p) => p.dressType)));
    const fabrics = Array.from(new Set(products.map((p) => p.fabricType)));
    const colors = Array.from(
      new Map(
        products.map((p) => [p.primaryColor, { name: p.primaryColor, hex: p.primaryColorHex }])
      ).values()
    );
    const sizes = Array.from(
      new Set(products.flatMap((p) => p.sizes.map((s) => s.sizeLabel)))
    );

    return { dressTypes, fabrics, colors, sizes };
  }, [products]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Collection
        if (selectedCollection === "new" && !p.isNewCollection) return false;
        if (selectedCollection === "trending" && !p.isTrending) return false;

        // Demographic / Age Group
        if (selectedDemographic !== "all" && p.ageGroup !== selectedDemographic)
          return false;

        // Gender
        if (selectedGender !== "all" && p.gender !== selectedGender) return false;

        // Main Category
        if (selectedCategory !== "all" && p.mainCategory !== selectedCategory)
          return false;

        // Dress Type
        if (selectedDressType !== "all" && p.dressType !== selectedDressType)
          return false;

        // Fabric / Material
        if (
          selectedFabric !== "all" &&
          !p.fabricType.toLowerCase().includes(selectedFabric.toLowerCase())
        )
          return false;

        // Primary Color
        if (selectedColor !== "all" && p.primaryColor !== selectedColor)
          return false;

        // Size
        if (
          selectedSize !== "all" &&
          !p.sizes.some((s) => s.sizeLabel === selectedSize)
        )
          return false;

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
    selectedCollection,
    selectedDemographic,
    selectedGender,
    selectedCategory,
    selectedDressType,
    selectedFabric,
    selectedColor,
    selectedSize,
    sortBy,
  ]);

  const resetFilters = () => {
    setSelectedCollection("all");
    setSelectedDemographic("all");
    setSelectedGender("all");
    setSelectedCategory("all");
    setSelectedDressType("all");
    setSelectedFabric("all");
    setSelectedColor("all");
    setSelectedSize("all");
    setSortBy("featured");
  };

  const hasActiveFilters =
    selectedCollection !== "all" ||
    selectedDemographic !== "all" ||
    selectedGender !== "all" ||
    selectedCategory !== "all" ||
    selectedDressType !== "all" ||
    selectedFabric !== "all" ||
    selectedColor !== "all" ||
    selectedSize !== "all";

  return (
    <div className="w-full min-h-screen bg-canvas">
      {/* Top Banner */}
      <div className="border-b border-border-subtle bg-canvas-elevated py-8 sm:py-12 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono tracking-editorial uppercase text-[#9E4733] block mb-1">
              Atelier Discovery
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ink">
              The Curated Catalog
            </h1>
            <p className="text-xs sm:text-sm font-sans text-ink-muted mt-2 max-w-xl">
              Filter by natural fabric origin, dual [INCH | CM] measurements, gender, and dress typology.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-ink-muted">
              Showing {filteredProducts.length} of {products.length} SKUs
            </span>

            {/* Mobile Filter Trigger */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden px-4 py-2 bg-[#181816] text-[#FAF8F5] text-xs font-sans uppercase tracking-wider flex items-center gap-2"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* =========================================================
            DESKTOP FILTER SIDEBAR
           ========================================================= */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
            <span className="text-xs font-sans uppercase tracking-editorial font-semibold text-ink">
              Refine Matrix
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-[11px] font-mono text-[#9E4733] hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All</span>
              </button>
            )}
          </div>

          {/* Collection Filter */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-ink-muted">
              Collection Flags
            </h4>
            <div className="flex flex-col gap-1 text-xs font-sans">
              {[
                { id: "all", label: "All Items" },
                { id: "new", label: "✨ New Collection" },
                { id: "trending", label: "🔥 Trending Now" },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCollection(c.id)}
                  className={`text-left py-1 px-2 transition-colors ${
                    selectedCollection === c.id
                      ? "bg-[#181816] text-[#FAF8F5] font-medium"
                      : "text-ink hover:bg-canvas-elevated"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Demographic & Gender */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-ink-muted">
              Demographic & Gender
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: "all", label: "All" },
                { id: "MALE", label: "Men" },
                { id: "FEMALE", label: "Women" },
                { id: "KIDS_BOY", label: "Kids (Boy)" },
                { id: "KIDS_GIRL", label: "Kids (Girl)" },
                { id: "UNISEX", label: "Unisex" },
              ].map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGender(g.id)}
                  className={`px-2.5 py-1 text-[11px] font-sans uppercase border transition-colors ${
                    selectedGender === g.id
                      ? "bg-[#181816] text-[#FAF8F5] border-[#181816]"
                      : "bg-canvas-elevated text-ink border-border-subtle hover:border-neutral-400"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Category */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-ink-muted">
              Department
            </h4>
            <div className="flex flex-col gap-1 text-xs font-sans">
              {[
                { id: "all", label: "All Departments" },
                { id: "GARMENTS", label: "Apparel & Garments" },
                { id: "WEARABLES", label: "Watches & Accessories" },
                { id: "FOOTWEAR", label: "Handcrafted Footwear" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-left py-1 px-2 transition-colors ${
                    selectedCategory === cat.id
                      ? "bg-[#181816] text-[#FAF8F5] font-medium"
                      : "text-ink hover:bg-canvas-elevated"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dress Typology */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-ink-muted">
              Dress Typology
            </h4>
            <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedDressType("all")}
                className={`px-2 py-1 text-[10px] font-mono uppercase border ${
                  selectedDressType === "all"
                    ? "bg-[#181816] text-white border-[#181816]"
                    : "bg-canvas-elevated text-ink border-border-subtle"
                }`}
              >
                All
              </button>
              {filterOptions.dressTypes.map((dt) => (
                <button
                  key={dt}
                  onClick={() => setSelectedDressType(dt)}
                  className={`px-2 py-1 text-[10px] font-mono uppercase border ${
                    selectedDressType === dt
                      ? "bg-[#181816] text-white border-[#181816]"
                      : "bg-canvas-elevated text-ink border-border-subtle hover:border-neutral-400"
                  }`}
                >
                  {dt}
                </button>
              ))}
            </div>
          </div>

          {/* Fabric Taxonomy */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-ink-muted">
              Fabric & Material
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {["all", "Linen", "Cotton", "Silk", "Muslin", "Leather", "Steel", "Wool"].map(
                (fab) => (
                  <button
                    key={fab}
                    onClick={() => setSelectedFabric(fab)}
                    className={`px-2 py-1 text-[11px] font-sans capitalize border ${
                      selectedFabric === fab
                        ? "bg-[#2D4A3E] text-white border-[#2D4A3E]"
                        : "bg-canvas-elevated text-ink border-border-subtle hover:border-neutral-400"
                    }`}
                  >
                    {fab === "all" ? "All Fabrics" : fab}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Primary Color Swatches */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-ink-muted">
              Primary Color Swatches
            </h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedColor("all")}
                className={`text-[10px] font-mono px-2 py-1 border ${
                  selectedColor === "all"
                    ? "bg-[#181816] text-white border-[#181816]"
                    : "bg-canvas-elevated text-ink border-border-subtle"
                }`}
              >
                ALL
              </button>
              {filterOptions.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  title={c.name}
                  className={`w-6 h-6 rounded-full border transition-all ${
                    selectedColor === c.name
                      ? "ring-2 ring-offset-2 ring-[#181816] scale-110"
                      : "opacity-80 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* Size Pills */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-ink-muted">
              Size Matrix
            </h4>
            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedSize("all")}
                className={`px-2 py-1 text-[10px] font-mono border ${
                  selectedSize === "all"
                    ? "bg-[#181816] text-white border-[#181816]"
                    : "bg-canvas-elevated text-ink border-border-subtle"
                }`}
              >
                All
              </button>
              {filterOptions.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`px-2 py-1 text-[10px] font-mono border ${
                    selectedSize === s
                      ? "bg-[#181816] text-white border-[#181816]"
                      : "bg-canvas-elevated text-ink border-border-subtle hover:border-neutral-400"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* =========================================================
            PRODUCT GRID & SORT BAR
           ========================================================= */}
        <div className="lg:col-span-9 space-y-6">
          {/* Top Sort & Active Filter Pills Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border-subtle">
            {/* Active Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {hasActiveFilters && (
                <span className="text-[11px] font-mono uppercase text-ink-muted mr-1">
                  Active:
                </span>
              )}
              {selectedCollection !== "all" && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono bg-[#181816] text-white">
                  Collection: {selectedCollection}
                  <button onClick={() => setSelectedCollection("all")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedGender !== "all" && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono bg-[#181816] text-white">
                  Gender: {selectedGender}
                  <button onClick={() => setSelectedGender("all")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedCategory !== "all" && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono bg-[#181816] text-white">
                  Dept: {selectedCategory}
                  <button onClick={() => setSelectedCategory("all")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedFabric !== "all" && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono bg-[#2D4A3E] text-white">
                  Fabric: {selectedFabric}
                  <button onClick={() => setSelectedFabric("all")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedColor !== "all" && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono bg-[#181816] text-white">
                  Color: {selectedColor}
                  <button onClick={() => setSelectedColor("all")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs font-sans text-ink-muted uppercase">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-canvas-elevated border border-border-subtle text-xs font-sans px-3 py-1.5 text-ink outline-none cursor-pointer"
              >
                <option value="featured">Featured Atelier Curation</option>
                <option value="newest">Newest Collection First</option>
                <option value="trending">Trending & Best Sellers</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-canvas-elevated border border-border-subtle p-8">
              <h3 className="font-serif text-2xl text-ink">No Garments Match Selected Refinements</h3>
              <p className="text-xs text-ink-muted mt-2 max-w-sm mx-auto font-sans">
                Try widening your fabric, color, or demographic filters to view the full atelier collection.
              </p>
              <button
                onClick={resetFilters}
                className="mt-6 px-6 py-2.5 bg-[#181816] text-[#FAF8F5] text-xs font-sans uppercase tracking-editorial hover:bg-neutral-800 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* =========================================================
          MOBILE FILTER MODAL
         ========================================================= */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            onClick={() => setMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-canvas shadow-drawer flex flex-col justify-between p-6 overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
                <span className="font-serif text-lg uppercase font-semibold text-ink">
                  Refine Catalog
                </span>
                <button onClick={() => setMobileFilterOpen(false)}>
                  <X className="w-5 h-5 text-ink" />
                </button>
              </div>

              <div className="space-y-6 py-6">
                <div>
                  <h4 className="text-xs font-mono uppercase text-ink-muted mb-2">
                    Demographic
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {["all", "MALE", "FEMALE", "CHILDREN"].map((d) => (
                      <button
                        key={d}
                        onClick={() => setSelectedGender(d)}
                        className={`px-3 py-1 text-xs border ${
                          selectedGender === d ? "bg-[#181816] text-white" : "border"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase text-ink-muted mb-2">
                    Department
                  </h4>
                  <div className="flex flex-col gap-1 text-xs">
                    {["all", "GARMENTS", "WEARABLES", "FOOTWEAR"].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`text-left p-1.5 ${
                          selectedCategory === cat ? "bg-[#181816] text-white" : ""
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border-subtle flex gap-2">
                <button
                  onClick={resetFilters}
                  className="flex-1 py-2.5 border border-border-subtle text-xs uppercase"
                >
                  Reset
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 py-2.5 bg-[#181816] text-white text-xs uppercase"
                >
                  Show Results
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
    <Suspense fallback={<div className="p-12 text-center font-mono">Loading Atelier Catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
