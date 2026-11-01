"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, ShoppingBag, ShieldCheck, Menu, X, ArrowRight } from "lucide-react";
import { useCommerceStore } from "@/store/useCommerceStore";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const {
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

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalWishlistCount = wishlist.length;

  const navLinks = [
    { label: "New Collection", href: "/shop?collection=new", highlight: true },
    { label: "Trending", href: "/shop?collection=trending" },
    { label: "Men", href: "/shop?gender=MALE" },
    { label: "Women", href: "/shop?gender=FEMALE" },
    { label: "Children", href: "/shop?ageGroup=CHILDREN" },
    { label: "Watches & Wearables", href: "/shop?category=WEARABLES" },
    { label: "Fabric Guide", href: "/fabric-guide" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-canvas/95 backdrop-blur-md border-b border-border-subtle transition-all">
      {/* Top Utility Bar */}
      <div className="hidden sm:flex items-center justify-between px-6 py-1.5 text-[11px] font-sans border-b border-border-subtle text-ink-muted">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 tracking-wider uppercase text-ink">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2D4A3E] animate-pulse" />
            Complimentary Dhaka Metro Delivery on orders over ৳5,000
          </span>
        </div>

        <div className="flex items-center gap-5">
          {/* INCH / CM Toggle */}
          <div className="flex items-center gap-1 bg-canvas-elevated px-2 py-0.5 rounded-none border border-border-subtle">
            <span className="text-[10px] uppercase font-mono tracking-wider mr-1">Unit:</span>
            <button
              onClick={() => setUnit("INCH")}
              className={cn(
                "px-1.5 py-0.2 text-[10px] font-mono transition-colors",
                unit === "INCH"
                  ? "bg-[#181816] text-[#FAF8F5] font-semibold"
                  : "text-ink-muted hover:text-ink"
              )}
            >
              INCH
            </button>
            <span className="text-border-subtle">|</span>
            <button
              onClick={() => setUnit("CM")}
              className={cn(
                "px-1.5 py-0.2 text-[10px] font-mono transition-colors",
                unit === "CM"
                  ? "bg-[#181816] text-[#FAF8F5] font-semibold"
                  : "text-ink-muted hover:text-ink"
              )}
            >
              CM
            </button>
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center gap-1 bg-canvas-elevated px-2 py-0.5 rounded-none border border-border-subtle">
            <button
              onClick={() => setCurrency("BDT")}
              className={cn(
                "px-1 text-[10px] font-mono transition-colors",
                currency === "BDT" ? "text-ink font-bold" : "text-ink-muted hover:text-ink"
              )}
            >
              BDT (৳)
            </button>
            <span className="text-border-subtle">/</span>
            <button
              onClick={() => setCurrency("USD")}
              className={cn(
                "px-1 text-[10px] font-mono transition-colors",
                currency === "USD" ? "text-ink font-bold" : "text-ink-muted hover:text-ink"
              )}
            >
              USD ($)
            </button>
          </div>

          {/* Admin Studio Quick Switcher */}
          <Link
            href="/admin"
            className="flex items-center gap-1.5 px-2.5 py-0.5 bg-[#181816] text-[#FAF8F5] text-[10px] tracking-editorial uppercase hover:bg-neutral-800 transition-colors"
          >
            <ShieldCheck className="w-3 h-3 text-[#C5A059]" />
            <span>Admin Studio</span>
          </Link>
        </div>
      </div>

      {/* Main Editorial Header */}
      <div className="px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-1.5 text-ink hover:text-ink-muted"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Brand Logo */}
        <Link href="/" className="flex flex-col items-start sm:items-center">
          <span className="font-serif text-2xl sm:text-3xl tracking-tightest font-semibold uppercase text-ink">
            AURELIA
          </span>
          <span className="text-[9px] tracking-[0.35em] uppercase font-sans text-ink-muted -mt-1">
            Studio Vêtements
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href.split("?")[0]);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-[12px] uppercase tracking-[0.14em] font-sans font-medium transition-all relative py-1",
                  link.highlight
                    ? "text-[#9E4733] hover:text-[#7A3626]"
                    : "text-ink hover:text-ink-muted",
                  isActive && "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#181816]"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile Admin Link */}
          <Link
            href="/admin"
            className="sm:hidden p-1.5 text-xs text-[#C5A059] bg-[#181816] px-2 py-1 font-mono uppercase"
          >
            Admin
          </Link>

          {/* Search Trigger */}
          <button
            onClick={() => toggleSearch(true)}
            aria-label="Search Catalog"
            className="p-2 text-ink hover:text-ink-muted transition-colors rounded-full hover:bg-canvas-elevated"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Wishlist Trigger */}
          <button
            onClick={() => toggleWishlist(true)}
            aria-label="View Saved Wishlist"
            className="relative p-2 text-ink hover:text-ink-muted transition-colors rounded-full hover:bg-canvas-elevated"
          >
            <Heart className="w-4 h-4" />
            {totalWishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#9E4733] text-white text-[9px] font-mono flex items-center justify-center font-bold">
                {totalWishlistCount}
              </span>
            )}
          </button>

          {/* Cart Bag Trigger */}
          <button
            onClick={() => toggleCart(true)}
            aria-label="View Shopping Bag"
            className="relative flex items-center gap-2 px-3 py-1.5 bg-[#181816] text-[#FAF8F5] text-xs font-sans uppercase tracking-wider hover:bg-neutral-800 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px] font-medium tracking-editorial">Bag</span>
            <span className="w-4 h-4 rounded-full bg-[#FAF8F5] text-[#181816] text-[10px] font-mono flex items-center justify-center font-bold">
              {totalCartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border-subtle bg-canvas px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3 pb-4 border-b border-border-subtle">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "text-sm uppercase tracking-wider font-sans font-medium flex items-center justify-between py-1",
                  link.highlight ? "text-[#9E4733]" : "text-ink"
                )}
              >
                <span>{link.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-ink-muted" />
              </Link>
            ))}
          </div>

          {/* Mobile Unit & Currency Settings */}
          <div className="flex items-center justify-between pt-2 text-xs">
            <span className="font-sans text-ink-muted uppercase">Measurement Unit:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setUnit("INCH")}
                className={cn(
                  "px-2 py-1 text-xs font-mono",
                  unit === "INCH" ? "bg-[#181816] text-white" : "border"
                )}
              >
                INCH
              </button>
              <button
                onClick={() => setUnit("CM")}
                className={cn(
                  "px-2 py-1 text-xs font-mono",
                  unit === "CM" ? "bg-[#181816] text-white" : "border"
                )}
              >
                CM
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
