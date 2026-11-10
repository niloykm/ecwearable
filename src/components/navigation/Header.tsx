"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Menu,
  X,
  ArrowRight,
  MoreVertical,
  Sliders,
  PackagePlus,
  Layers,
  Sparkles,
} from "lucide-react";
import { useCommerceStore } from "@/store/useCommerceStore";
import { cn, formatPrice } from "@/lib/utils";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";

export function Header() {
  const pathname = usePathname();
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
  } = useCommerceStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const adminDropdownRef = useRef<HTMLDivElement>(null);

  // Close search and admin dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        adminDropdownRef.current &&
        !adminDropdownRef.current.contains(event.target as Node)
      ) {
        setAdminMenuOpen(false);
      }
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalWishlistCount = wishlist.length;

  // Clear category links requested in prompt:
  // Men, Women, Technical Outerwear, Everyday Basics, Accessories
  const navLinks = [
    { label: "Men", href: "/shop?gender=MALE" },
    { label: "Women", href: "/shop?gender=FEMALE" },
    { label: "Technical Outerwear", href: "/shop?category=OUTERWEAR" },
    { label: "Everyday Basics", href: "/shop?category=BASICS" },
    { label: "Accessories", href: "/shop?category=ACCESSORIES" },
    { label: "Fabric Guide", href: "/fabric-guide" },
  ];

  // Predictive search matching
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

  const trendingSearches = [
    { label: "Heavyweight Boxy Tee", query: "Heavyweight Boxy Tee" },
    { label: "Ripstop Cargo Pant", query: "Cargo Pant" },
    { label: "Storm Shell Windbreaker", query: "Windbreaker" },
    { label: "Merino Wool Crewneck", query: "Merino Wool" },
    { label: "Cordura Daypack", query: "Cordura" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchFocused(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-all">
      {/* Top Utility Announcement Bar */}
      <div className="bg-zinc-950 text-white text-[11px] font-sans py-2 px-4 sm:px-8 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <span className="tracking-wide uppercase font-medium text-zinc-200 truncate">
              Free nationwide shipping on orders over {currency === "BDT" ? "৳ 1,500" : "$50"} · 7-Day Hassle-Free Size Exchanges
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 flex-shrink-0">
            {/* INCH / CM Toggle */}
            <div className="flex items-center gap-1 bg-zinc-900 px-2 py-0.5 border border-zinc-800 text-[10px] font-mono">
              <span className="text-zinc-400 uppercase mr-1">Unit:</span>
              <button
                onClick={() => setUnit("INCH")}
                className={cn(
                  "px-1 transition-colors",
                  unit === "INCH" ? "text-white font-bold" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                INCH
              </button>
              <span className="text-zinc-700">|</span>
              <button
                onClick={() => setUnit("CM")}
                className={cn(
                  "px-1 transition-colors",
                  unit === "CM" ? "text-white font-bold" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                CM
              </button>
            </div>

            {/* Currency Selector */}
            <div className="flex items-center gap-1 bg-zinc-900 px-2 py-0.5 border border-zinc-800 text-[10px] font-mono">
              <button
                onClick={() => setCurrency("BDT")}
                className={cn(
                  "px-1 transition-colors",
                  currency === "BDT" ? "text-white font-bold" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                BDT (৳)
              </button>
              <span className="text-zinc-700">/</span>
              <button
                onClick={() => setCurrency("USD")}
                className={cn(
                  "px-1 transition-colors",
                  currency === "USD" ? "text-white font-bold" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                USD ($)
              </button>
            </div>

            {/* Admin Menu */}
            <div className="relative" ref={adminDropdownRef}>
              <button
                onClick={() => setAdminMenuOpen(!adminMenuOpen)}
                className="flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono uppercase bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
                title="Studio Options"
              >
                <MoreVertical className="w-3 h-3 text-zinc-400" />
                <span>Lab Tools</span>
              </button>

              {adminMenuOpen && (
                <div className="absolute right-0 mt-1 w-52 bg-zinc-950 border border-zinc-800 shadow-2xl py-1 z-50 text-left">
                  <div className="px-3 py-1.5 border-b border-zinc-800">
                    <p className="text-[10px] font-mono uppercase text-zinc-400 font-semibold tracking-wider">
                      Management & Inventory
                    </p>
                  </div>
                  <div className="py-1 text-xs font-sans">
                    <Link
                      href="/admin"
                      onClick={() => setAdminMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-1.5 text-zinc-300 hover:bg-zinc-900 hover:text-white"
                    >
                      <span className="flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Command Dashboard</span>
                      </span>
                      <ArrowRight className="w-3 h-3 text-zinc-500" />
                    </Link>
                    <Link
                      href="/admin/products"
                      onClick={() => setAdminMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-1.5 text-zinc-300 hover:bg-zinc-900 hover:text-white"
                    >
                      <span className="flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 text-zinc-400" />
                        <span>SKU Catalog</span>
                      </span>
                      <ArrowRight className="w-3 h-3 text-zinc-500" />
                    </Link>
                    <Link
                      href="/admin/products/new"
                      onClick={() => setAdminMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-1.5 text-zinc-300 hover:bg-zinc-900 hover:text-white"
                    >
                      <span className="flex items-center gap-2">
                        <PackagePlus className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Add New Garment</span>
                      </span>
                      <ArrowRight className="w-3 h-3 text-zinc-500" />
                    </Link>
                    <Link
                      href="/admin/orders"
                      onClick={() => setAdminMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-1.5 text-zinc-300 hover:bg-zinc-900 hover:text-white"
                    >
                      <span className="flex items-center gap-2">
                        <Sliders className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Orders Fulfillment</span>
                      </span>
                      <ArrowRight className="w-3 h-3 text-zinc-500" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Global Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 sm:gap-6">
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-1.5 text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-white"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Elevated Brand Identity */}
        <Link href="/" className="flex flex-col items-start">
          <span className="font-sans text-xl sm:text-2xl font-black tracking-tightest uppercase text-zinc-950 dark:text-white">
            ECWEARABLE
          </span>
          <span className="text-[9px] tracking-[0.2em] uppercase font-mono text-zinc-500 dark:text-zinc-400 -mt-0.5 hidden sm:block">
            Engineered Garments & Technical Lab
          </span>
        </Link>

        {/* Desktop Category Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href.includes("?") && pathname === "/shop");
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-[12px] uppercase tracking-wider font-sans font-medium transition-colors py-1 hover:text-zinc-950 dark:hover:text-white",
                  isActive
                    ? "text-zinc-950 dark:text-white font-semibold border-b border-zinc-950 dark:border-white"
                    : "text-zinc-600 dark:text-zinc-400"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Live Predictive Search Bar + Actions */}
        <div className="flex items-center gap-3 sm:gap-4 flex-1 lg:flex-initial justify-end">
          {/* Instant Search Input Container */}
          <div className="relative w-full max-w-xs" ref={searchContainerRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search garments, 280 GSM, ripstop..."
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchFocused(true);
                }}
                className="w-full pl-8 pr-3 py-1.5 text-xs font-sans bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors"
              />
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </form>

            {/* Live Predictive Dropdown */}
            {searchFocused && (
              <div className="absolute right-0 left-0 sm:left-auto sm:w-80 mt-1 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-xl z-50 p-3 animate-in fade-in zoom-in-95 duration-150">
                {searchQuery.trim() === "" ? (
                  <div>
                    <span className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider block mb-2">
                      Trending Searches
                    </span>
                    <div className="space-y-1">
                      {trendingSearches.map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => {
                            setSearchQuery(item.query);
                            router.push(`/shop?query=${encodeURIComponent(item.query)}`);
                            setSearchFocused(false);
                          }}
                          className="w-full text-left px-2 py-1.5 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 flex items-center justify-between transition-colors"
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
                      <span className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider">
                        Matched SKUs ({matchingProducts.length})
                      </span>
                      <Link
                        href={`/shop?query=${encodeURIComponent(searchQuery)}`}
                        onClick={() => setSearchFocused(false)}
                        className="text-[10px] font-mono uppercase text-zinc-900 dark:text-zinc-100 font-semibold hover:underline"
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
                          const img =
                            p.colorVariants[0]?.images[0] ||
                            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80";

                          return (
                            <Link
                              key={p.id}
                              href={`/product/${p.slug}`}
                              onClick={() => setSearchFocused(false)}
                              className="flex items-center gap-2.5 p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                            >
                              <div className="relative w-10 h-12 bg-zinc-100 dark:bg-zinc-900 overflow-hidden flex-shrink-0 border border-zinc-200 dark:border-zinc-800">
                                <Image
                                  src={optimizeCloudinaryUrl(img, { width: 80, height: 100 })}
                                  alt={p.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100 truncate">
                                  {p.name}
                                </p>
                                <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 mt-0.5">
                                  <span>{p.dressType}</span>
                                  <span>•</span>
                                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums">
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
              </div>
            )}
          </div>

          {/* Wishlist Trigger */}
          <button
            onClick={() => toggleWishlist(true)}
            className="relative p-2 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors"
            aria-label="Wishlist"
          >
            <Heart className="w-4 h-4" />
            {totalWishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 text-[9px] font-mono font-bold bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 flex items-center justify-center tabular-nums">
                {totalWishlistCount}
              </span>
            )}
          </button>

          {/* Persistent Cart Trigger with slide-over drawer */}
          <button
            onClick={() => toggleCart(true)}
            className="relative flex items-center gap-2 px-3 py-1.5 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-sans uppercase tracking-wider font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm"
            aria-label="Open Cart Drawer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="font-mono tabular-nums">Bag ({totalCartCount})</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-6 py-4 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs uppercase tracking-wider font-medium text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-white py-1.5 border-b border-zinc-100 dark:border-zinc-900"
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Currency & Unit Switcher */}
            <div className="flex items-center justify-between pt-3 text-xs font-mono">
              <span className="text-zinc-400 uppercase">Unit:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setUnit("INCH")}
                  className={cn("px-2 py-0.5 border", unit === "INCH" ? "bg-zinc-900 text-white" : "text-zinc-600")}
                >
                  INCH
                </button>
                <button
                  onClick={() => setUnit("CM")}
                  className={cn("px-2 py-0.5 border", unit === "CM" ? "bg-zinc-900 text-white" : "text-zinc-600")}
                >
                  CM
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs font-mono">
              <span className="text-zinc-400 uppercase">Currency:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrency("BDT")}
                  className={cn("px-2 py-0.5 border", currency === "BDT" ? "bg-zinc-900 text-white" : "text-zinc-600")}
                >
                  BDT (৳)
                </button>
                <button
                  onClick={() => setCurrency("USD")}
                  className={cn("px-2 py-0.5 border", currency === "USD" ? "bg-zinc-900 text-white" : "text-zinc-600")}
                >
                  USD ($)
                </button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
