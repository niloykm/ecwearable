"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  Sliders,
  PackagePlus,
  Layers,
  Ruler,
  BookOpen,
} from "lucide-react";
import { useCommerceStore } from "@/store/useCommerceStore";
import { cn, formatPrice, formatShippingThreshold } from "@/lib/utils";
import { DEFAULT_PRODUCT_IMAGE, getGarmentObjectPosition, optimizeCloudinaryUrl } from "@/lib/cloudinary";
import { SafeImage } from "@/components/ui/SafeImage";
import { MOTION_EASE, SPRING_INDICATOR } from "@/components/motion/MotionPrimitives";

const NAV_LINKS = [
  { label: "Men", href: "/shop?gender=MALE", match: { path: "/shop", key: "gender", value: "MALE" } },
  { label: "Women", href: "/shop?gender=FEMALE", match: { path: "/shop", key: "gender", value: "FEMALE" } },
  { label: "Outerwear", href: "/shop?category=OUTERWEAR", match: { path: "/shop", key: "category", value: "OUTERWEAR" } },
  { label: "Basics", href: "/shop?category=BASICS", match: { path: "/shop", key: "category", value: "BASICS" } },
  { label: "Accessories", href: "/shop?category=ACCESSORIES", match: { path: "/shop", key: "category", value: "ACCESSORIES" } },
  { label: "Fabric Guide", href: "/fabric-guide", match: { path: "/fabric-guide", key: null, value: null } },
] as const;

const TRENDING_SEARCHES = [
  { label: "Heavyweight Boxy Tee", query: "Heavyweight Boxy Tee" },
  { label: "Ripstop Cargo Pant", query: "Cargo" },
  { label: "Storm Shell Windbreaker", query: "Windbreaker" },
  { label: "Merino Wool Crewneck", query: "Merino" },
  { label: "Cordura Daypack", query: "Cordura" },
];

function DesktopNavLinks() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <nav className="hidden lg:flex items-center gap-4 xl:gap-5" aria-label="Primary categories">
      {NAV_LINKS.map((link) => {
        const isActive =
          link.match.key === null
            ? pathname === link.match.path
            : pathname === link.match.path && searchParams.get(link.match.key) === link.match.value;

        return (
          <Link
            key={link.label}
            href={link.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "relative text-[12px] uppercase tracking-wider font-sans font-medium transition-colors duration-200 py-1.5 whitespace-nowrap",
              isActive
                ? "text-zinc-950 dark:text-white font-semibold"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
            )}
          >
            <span>{link.label}</span>
            {isActive && (
              <motion.span
                layoutId="desktop-nav-underline"
                transition={SPRING_INDICATOR}
                className="absolute inset-x-0 bottom-0 h-[2px] bg-zinc-950 dark:bg-white"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export function Header() {
  const router = useRouter();
  const {
    products,
    cart,
    wishlist,
    unit,
    setUnit,
    currency,
    setCurrency,
    toggleCart,
    toggleWishlist,
    toggleSearch,
  } = useCommerceStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const adminDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (adminDropdownRef.current && !adminDropdownRef.current.contains(event.target as Node)) {
        setAdminMenuOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setAdminMenuOpen(false);
        setSearchFocused(false);
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalWishlistCount = wishlist.length;
  const thresholdLabel = formatShippingThreshold(currency);

  const matchingProducts = searchQuery.trim()
    ? products
        .filter((p) => {
          const q = searchQuery.toLowerCase();
          return (
            p.name.toLowerCase().includes(q) ||
            p.dressType.toLowerCase().includes(q) ||
            p.fabricType.toLowerCase().includes(q) ||
            p.primaryColor.toLowerCase().includes(q) ||
            p.mainCategory.toLowerCase().includes(q)
          );
        })
        .slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchFocused(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-200">
      {/* Top Utility Announcement Bar */}
      <div className="bg-zinc-950 text-white text-[11px] font-sans py-2 px-4 sm:px-8 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" aria-hidden="true" />
            <p className="hidden sm:block tracking-wide uppercase font-medium text-zinc-200 truncate tabular-nums">
              <span>Free nationwide shipping on orders over {thresholdLabel}</span>
              <span className="text-zinc-500 mx-2" aria-hidden="true"> · </span>
              <span>7-Day Hassle-Free Size Exchanges</span>
            </p>
            <p className="sm:hidden text-[10px] tracking-wide uppercase font-medium text-zinc-200 truncate tabular-nums">
              <span>Free shipping over {thresholdLabel}</span>
              <span className="text-zinc-500 mx-1.5" aria-hidden="true"> · </span>
              <span>7-Day Size Exchanges</span>
            </p>
          </div>

          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            {/* IN / CM Segmented Control */}
            <div className="flex items-center gap-1.5">
              <Ruler className="w-3 h-3 text-zinc-400 flex-shrink-0" aria-hidden="true" />
              <div
                className="inline-flex items-center gap-0.5 bg-zinc-900 p-0.5 border border-zinc-700/80 text-[10px] font-mono rounded-sm"
                role="group"
                aria-label="Measurement unit"
              >
                {([
                  { value: "INCH", label: "IN" },
                  { value: "CM", label: "CM" },
                ] as const).map((u) => {
                  const active = unit === u.value;
                  return (
                    <button
                      key={u.value}
                      type="button"
                      onClick={() => setUnit(u.value)}
                      aria-pressed={active}
                      aria-label={`Use ${u.value === "INCH" ? "inches" : "centimeters"}`}
                      className={cn(
                        "relative px-2 py-0.5 rounded-[2px] transition-colors duration-200 whitespace-nowrap",
                        active ? "text-zinc-950 font-bold" : "text-zinc-300 hover:text-white"
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="header-unit-pill"
                          transition={SPRING_INDICATOR}
                          className="absolute inset-0 bg-white rounded-[2px]"
                        />
                      )}
                      <span className="relative z-10">{u.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <span className="h-3.5 w-px bg-zinc-800 flex-shrink-0" aria-hidden="true" />

            {/* Currency Segmented Control */}
            <div
              className="inline-flex items-center gap-0.5 bg-zinc-900 p-0.5 border border-zinc-700/80 text-[10px] font-mono rounded-sm"
              role="group"
              aria-label="Display currency"
            >
              {([
                { code: "BDT", label: "৳ BDT" },
                { code: "USD", label: "$ USD" },
              ] as const).map((c) => {
                const active = currency === c.code;
                return (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => setCurrency(c.code)}
                    aria-pressed={active}
                    className={cn(
                      "relative px-2 py-0.5 rounded-[2px] transition-colors duration-200 whitespace-nowrap",
                      active ? "text-zinc-950 font-bold" : "text-zinc-300 hover:text-white"
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="header-currency-pill"
                        transition={SPRING_INDICATOR}
                        className="absolute inset-0 bg-white rounded-[2px]"
                      />
                    )}
                    <span className="relative z-10">{c.label}</span>
                  </button>
                );
              })}
            </div>

            <span className="h-3.5 w-px bg-zinc-800 flex-shrink-0" aria-hidden="true" />

            {/* Store Admin & Lab Dropdown */}
            <div className="relative" ref={adminDropdownRef}>
              <button
                type="button"
                onClick={() => setAdminMenuOpen((prev) => !prev)}
                aria-expanded={adminMenuOpen}
                aria-haspopup="menu"
                className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider bg-zinc-900 text-zinc-200 hover:text-white hover:border-zinc-500 border border-zinc-700/80 rounded-sm transition-colors duration-200 whitespace-nowrap"
              >
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Store Admin</span>
                <ChevronDown
                  className={cn(
                    "w-3 h-3 text-zinc-400 transition-transform duration-200",
                    adminMenuOpen && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence>
                {adminMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: MOTION_EASE }}
                    role="menu"
                    className="absolute right-0 mt-1.5 w-60 bg-zinc-950 border border-zinc-800 shadow-2xl py-1.5 z-50 text-left rounded-sm"
                  >
                    <div className="px-3.5 py-1.5 border-b border-zinc-800">
                      <p className="text-[10px] font-mono uppercase text-zinc-400 font-semibold tracking-wider">
                        Operations &amp; Material Lab
                      </p>
                    </div>
                    <div className="py-1 text-xs font-sans">
                      <Link
                        href="/fabric-guide"
                        role="menuitem"
                        onClick={() => setAdminMenuOpen(false)}
                        className="flex items-center justify-between px-3.5 py-2 text-zinc-200 hover:bg-zinc-900 hover:text-white transition-colors border-b border-zinc-800/80 mb-1"
                      >
                        <span className="flex items-center gap-2">
                          <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Fabric Taxonomy &amp; Lab Specs</span>
                        </span>
                        <ArrowRight className="w-3 h-3 text-zinc-500" />
                      </Link>
                      <Link
                        href="/admin"
                        role="menuitem"
                        onClick={() => setAdminMenuOpen(false)}
                        className="flex items-center justify-between px-3.5 py-2 text-zinc-200 hover:bg-zinc-900 hover:text-white transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Command Dashboard</span>
                        </span>
                        <ArrowRight className="w-3 h-3 text-zinc-500" />
                      </Link>
                      <Link
                        href="/admin/products"
                        role="menuitem"
                        onClick={() => setAdminMenuOpen(false)}
                        className="flex items-center justify-between px-3.5 py-2 text-zinc-200 hover:bg-zinc-900 hover:text-white transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <Layers className="w-3.5 h-3.5 text-zinc-400" />
                          <span>SKU Catalog</span>
                        </span>
                        <ArrowRight className="w-3 h-3 text-zinc-500" />
                      </Link>
                      <Link
                        href="/admin/products/new"
                        role="menuitem"
                        onClick={() => setAdminMenuOpen(false)}
                        className="flex items-center justify-between px-3.5 py-2 text-zinc-200 hover:bg-zinc-900 hover:text-white transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <PackagePlus className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Add New Garment</span>
                        </span>
                        <ArrowRight className="w-3 h-3 text-zinc-500" />
                      </Link>
                      <Link
                        href="/admin/orders"
                        role="menuitem"
                        onClick={() => setAdminMenuOpen(false)}
                        className="flex items-center justify-between px-3.5 py-2 text-zinc-200 hover:bg-zinc-900 hover:text-white transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <Sliders className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Orders Fulfillment</span>
                        </span>
                        <ArrowRight className="w-3 h-3 text-zinc-500" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Main Global Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-8 py-3.5 flex items-center justify-between gap-2.5 sm:gap-6">
        {/* Left: Mobile Menu Trigger + Brand Identity */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-1.5 -ml-1 text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-sm transition-colors flex-shrink-0"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/" className="flex flex-col items-start gap-1 flex-shrink-0 group">
            <span className="font-sans text-[15px] sm:text-xl font-black tracking-tight uppercase text-zinc-950 dark:text-white leading-none whitespace-nowrap">
              ECWEARABLE
            </span>
            <span className="text-[9px] tracking-[0.14em] uppercase font-mono text-zinc-500 dark:text-zinc-400 leading-none hidden xl:block whitespace-nowrap">
              Engineered Garments &amp; Lab
            </span>
          </Link>
        </div>

        {/* Center: Desktop Category Navigation */}
        <Suspense fallback={<div className="hidden lg:flex items-center gap-5 h-6" />}>
          <DesktopNavLinks />
        </Suspense>

        {/* Right: Search, Wishlist & Bag */}
        <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
          {/* Mobile Search Modal Button */}
          <button
            type="button"
            onClick={() => toggleSearch(true)}
            className="md:hidden p-2 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-sm transition-colors"
            aria-label="Search catalog"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Desktop Inline Predictive Search */}
          <div className="relative hidden md:block w-48 xl:w-60" ref={searchContainerRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search 280 GSM, ripstop..."
                aria-label="Search garments and fabrics"
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchFocused(true);
                }}
                className="w-full pl-8 pr-7 py-2 text-xs font-sans bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-950 dark:focus:border-zinc-400 transition-colors"
              />
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search query"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            <AnimatePresence>
              {searchFocused && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18, ease: MOTION_EASE }}
                  className="absolute right-0 w-80 mt-1.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-xl z-50 p-3.5 rounded-sm"
                >
                  {searchQuery.trim() === "" ? (
                    <div>
                      <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider block mb-2">
                        Trending Searches
                      </span>
                      <div className="space-y-1">
                        {TRENDING_SEARCHES.map((item) => (
                          <button
                            key={item.label}
                            type="button"
                            onClick={() => {
                              setSearchQuery(item.query);
                              router.push(`/shop?query=${encodeURIComponent(item.query)}`);
                              setSearchFocused(false);
                            }}
                            className="w-full text-left px-2.5 py-1.5 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 flex items-center justify-between transition-colors rounded-sm"
                          >
                            <span>{item.label}</span>
                            <ArrowRight className="w-3 h-3 text-zinc-400" />
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider tabular-nums">
                          Matched SKUs ({matchingProducts.length})
                        </span>
                        <Link
                          href={`/shop?query=${encodeURIComponent(searchQuery)}`}
                          onClick={() => setSearchFocused(false)}
                          className="text-[10px] font-mono uppercase text-zinc-950 dark:text-zinc-100 font-semibold hover:underline"
                        >
                          View All
                        </Link>
                      </div>

                      {matchingProducts.length === 0 ? (
                        <p className="text-xs text-zinc-500 py-3 text-center">
                          No garments found matching &quot;{searchQuery}&quot;
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {matchingProducts.map((p) => {
                            const img = p.colorVariants[0]?.images[0] || DEFAULT_PRODUCT_IMAGE;
                            return (
                              <Link
                                key={p.id}
                                href={`/product/${p.slug}`}
                                onClick={() => setSearchFocused(false)}
                                className="flex items-center gap-3 p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors rounded-sm"
                              >
                                <div className="relative w-10 h-12 bg-zinc-100 dark:bg-zinc-900 overflow-hidden flex-shrink-0 border border-zinc-200 dark:border-zinc-800">
                                  <SafeImage
                                    src={optimizeCloudinaryUrl(img, { width: 80, height: 100 })}
                                    alt={p.name}
                                    fill
                                    sizes="40px"
                                    className={getGarmentObjectPosition(p.mainCategory)}
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100 truncate">
                                    {p.name}
                                  </p>
                                  <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 mt-0.5">
                                    <span className="truncate">{p.dressType}</span>
                                    <span aria-hidden="true">·</span>
                                    <span className="font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums whitespace-nowrap">
                                      {formatPrice(p.discountPrice || p.basePrice, currency)}
                                    </span>
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Wishlist Trigger (Cleanly separated from Bag button) */}
          <button
            type="button"
            onClick={() => toggleWishlist(true)}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 sm:py-2 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:border-zinc-950 dark:hover:border-white hover:text-zinc-950 dark:hover:text-white rounded-sm transition-colors duration-200"
            aria-label={`Open Wishlist (${totalWishlistCount} saved)`}
          >
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="text-[11px] sm:text-xs font-mono font-semibold tabular-nums leading-none">
              {totalWishlistCount}
            </span>
          </button>

          {/* Persistent Cart Trigger */}
          <button
            type="button"
            onClick={() => toggleCart(true)}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-[11px] sm:text-xs font-sans uppercase tracking-wider font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-[0.98] rounded-sm transition-all duration-200 shadow-sm whitespace-nowrap"
            aria-label={`Open Shopping Bag (${totalCartCount} items)`}
          >
            <ShoppingBag className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="font-mono tabular-nums">Bag ({totalCartCount})</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: MOTION_EASE }}
            className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 max-h-[75dvh] overflow-y-auto shadow-lg"
          >
            <div className="px-5 pt-4 pb-6 space-y-4">
              <nav className="flex flex-col" aria-label="Mobile navigation">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs uppercase tracking-wider font-medium text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-white py-2.5 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                  </Link>
                ))}
              </nav>

              {/* Mobile Unit & Currency Switchers */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500 uppercase">Measurements</span>
                  <div className="flex items-center gap-1.5" role="group" aria-label="Mobile measurement unit">
                    {([
                      { value: "INCH", label: "IN" },
                      { value: "CM", label: "CM" },
                    ] as const).map((u) => (
                      <button
                        key={u.value}
                        type="button"
                        onClick={() => setUnit(u.value)}
                        aria-pressed={unit === u.value}
                        className={cn(
                          "px-3 py-1 border rounded-sm transition-colors",
                          unit === u.value
                            ? "bg-zinc-950 text-white border-zinc-950 dark:bg-white dark:text-zinc-950 font-bold"
                            : "border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300"
                        )}
                      >
                        {u.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500 uppercase">Currency</span>
                  <div className="flex items-center gap-1.5" role="group" aria-label="Mobile currency">
                    {([
                      { code: "BDT", label: "৳ BDT" },
                      { code: "USD", label: "$ USD" },
                    ] as const).map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => setCurrency(c.code)}
                        aria-pressed={currency === c.code}
                        className={cn(
                          "px-3 py-1 border rounded-sm transition-colors",
                          currency === c.code
                            ? "bg-zinc-950 text-white border-zinc-950 dark:bg-white dark:text-zinc-950 font-bold"
                            : "border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300"
                        )}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile Store Admin Quick Links */}
              <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
                <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider block">
                  Store Admin
                </span>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-1.5 text-[11px] font-mono uppercase bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-sm"
                  >
                    Command Dashboard
                  </Link>
                  <Link
                    href="/admin/products"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-1.5 text-[11px] font-mono uppercase bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-sm"
                  >
                    SKU Catalog
                  </Link>
                  <Link
                    href="/admin/products/new"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-1.5 text-[11px] font-mono uppercase bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-sm"
                  >
                    Add New Garment
                  </Link>
                  <Link
                    href="/admin/orders"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-1.5 text-[11px] font-mono uppercase bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-sm"
                  >
                    Orders Fulfillment
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
