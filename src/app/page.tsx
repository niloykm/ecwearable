"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Feather,
  Compass,
  ChevronRight,
  Sparkles,
  ShoppingBag,
  Check,
  X,
  Droplets,
  Wind,
  Layers,
} from "lucide-react";
import { useCommerceStore } from "@/store/useCommerceStore";
import { ProductCard } from "@/components/product/ProductCard";
import { formatPrice, cn } from "@/lib/utils";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";

export default function HomePage() {
  const { products, currency, addToCart, toggleCart } = useCommerceStore();
  const [activePin, setActivePin] = useState<string | null>(null);
  const [activeFabricTab, setActiveFabricTab] = useState<number>(0);

  // Curated collections
  const newArrivals = products.filter((p) => p.isNewCollection).slice(0, 8);
  const technicalOuterwear = products.filter(
    (p) => p.mainCategory === "OUTERWEAR" || p.dressType.includes("Windbreaker") || p.dressType.includes("Cargo")
  ).slice(0, 4);

  // Pin products for Hero Lookbook
  const pinProducts = {
    tee: products.find((p) => p.id === "prod-tech-heavyweight-tee") || products[0],
    cargo: products.find((p) => p.id === "prod-tech-ripstop-cargo") || products[1],
    daypack: products.find((p) => p.id === "prod-tech-cordura-daypack") || products[5],
  };

  const handleQuickAddPin = (e: React.MouseEvent, product: typeof pinProducts.tee) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.colorVariants[0], product.sizes[0], 1);
    toggleCart(true);
    setActivePin(null);
  };

  const fabricMatrix = [
    {
      name: "Heavyweight French Terry",
      spec: "280 GSM Combed Organic Cotton",
      feature: "Zero-Bacon Ribbed Tension Collar",
      desc: "Developed on high-gauge circular knitting machines with double-twisted yarn. Resists garment sagging, holds structural boxy drape, and provides breathable thermal balance across seasons.",
      metric: "42 CFM Airflow",
      icon: Feather,
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "DWR 3-Layer Ripstop",
      spec: "Hydrostatic 10,000mm Membrane",
      feature: "Fluorocarbon-Free Water Repellence",
      desc: "Micro-grid reinforced nylon shell bonded to a breathable monolithic membrane. Water beads and rolls off on contact while body vapor vents continuously through high-exertion transit.",
      metric: "10,000 g/m² Breathability",
      icon: Droplets,
      image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "18.5µ Australian Merino",
      spec: "Ultrafine Thermoregulating Knit",
      feature: "Natural Keratin Anti-Odor",
      desc: "Spun from long-staple 18.5-micron fleece. Naturally wicks moisture vapor in the fiber cortex before it condenses, ensuring zero-itch tactile comfort and weeks of wear between cold washes.",
      metric: "18.5 Micron Fineness",
      icon: Wind,
      image: "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Cordura® 500D Ballistic",
      spec: "Military-Spec Air-Textured Nylon",
      feature: "Fidlock® Magnetic Compatibility",
      desc: "High-tenacity filament nylon engineered to withstand severe friction, abrasion, and tropical rainfall. Finished with a weather-resistant polyurethane backing.",
      metric: "500 Denier Toughness",
      icon: Layers,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
    },
  ];

  return (
    <div className="w-full flex flex-col bg-white dark:bg-zinc-950">
      {/* =========================================================
          HERO SECTION: Asymmetric 2-Column Editorial Grid
         ========================================================= */}
      <section className="relative w-full border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[82vh]">
          {/* Left Text Column */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800">
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase font-semibold bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
                  SS26 TECHNICAL LAB
                </span>
                <span className="text-[11px] font-mono tracking-wider uppercase text-zinc-500">
                  SYSTEM RELEASE 04
                </span>
              </div>

              <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.08] tracking-tightest uppercase text-zinc-950 dark:text-white">
                Engineered Comfort. Zero Compromise.
              </h1>

              <p className="text-sm font-sans text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md">
                Heavyweight 280 GSM French Terry, water-repellent ripstop shells, and ergonomic activewear built for daily transit and training.
              </p>

              {/* Fabric Callouts Grid */}
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <div className="p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block">Density</span>
                  <span className="text-xs font-mono font-semibold text-zinc-900 dark:text-zinc-100">280 GSM French Terry</span>
                </div>
                <div className="p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block">Protection</span>
                  <span className="text-xs font-mono font-semibold text-zinc-900 dark:text-zinc-100">DWR 3-Layer Ripstop</span>
                </div>
                <div className="p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block">Thermal</span>
                  <span className="text-xs font-mono font-semibold text-zinc-900 dark:text-zinc-100">18.5µ Merino Wool</span>
                </div>
                <div className="p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block">Hardware</span>
                  <span className="text-xs font-mono font-semibold text-zinc-900 dark:text-zinc-100">Cordura® & Fidlock®</span>
                </div>
              </div>
            </div>

            <div className="pt-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/shop?collection=new"
                  className="px-6 py-3.5 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-sans uppercase tracking-wider font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all flex items-center gap-2 group shadow-sm"
                >
                  <span>Shop New Arrivals</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/shop?category=OUTERWEAR"
                  className="px-5 py-3.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs font-sans uppercase tracking-wider font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all"
                >
                  Explore Technical Outerwear
                </Link>
              </div>

              <div className="flex items-center gap-5 pt-3 text-[11px] font-mono text-zinc-500">
                <span>• 28+ Engineered SKUs</span>
                <span>• Dual [INCH | CM] Specs</span>
                <span>• Lab Tested</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Impact Lookbook with Subtle Interactive Tag Pins */}
          <div className="lg:col-span-7 relative min-h-[460px] lg:min-h-full bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1400&q=85"
              alt="ECWEARABLE Technical Apparel Transit Editorial"
              fill
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

            {/* Editorial Overlay Typography */}
            <div className="absolute top-6 left-6 z-10 pointer-events-none">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-300 block">
                FIELD TEST 04 // RAIN & TRANSIT
              </span>
              <p className="text-white text-xs font-sans font-medium">
                Tap garment pins to inspect technical specs
              </p>
            </div>

            {/* Tag Pin 1: Heavyweight Boxy Tee (Upper torso) */}
            <div className="absolute top-[34%] left-[45%] z-20">
              <button
                onClick={() => setActivePin(activePin === "tee" ? null : "tee")}
                className="relative group p-2 focus:outline-none"
                aria-label="View Heavyweight Boxy Tee details"
              >
                <span className="absolute inset-0 rounded-full bg-white/40 animate-ping" />
                <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-zinc-950 text-white border-2 border-white text-[10px] font-mono font-bold shadow-lg">
                  1
                </span>
              </button>

              {activePin === "tee" && (
                <div className="absolute left-8 top-0 w-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-3 z-30 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[9px] font-mono uppercase font-bold text-emerald-600 dark:text-emerald-400">
                      280 GSM FRENCH TERRY
                    </span>
                    <button onClick={() => setActivePin(null)} className="text-zinc-400 hover:text-black dark:hover:text-white">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h4 className="text-xs font-sans font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-1">
                    {pinProducts.tee.name}
                  </h4>
                  <p className="text-[10px] font-mono text-zinc-500 mt-0.5">
                    {formatPrice(pinProducts.tee.discountPrice || pinProducts.tee.basePrice, currency)}
                  </p>
                  <div className="flex gap-2 mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                    <button
                      onClick={(e) => handleQuickAddPin(e, pinProducts.tee)}
                      className="flex-1 py-1 px-2 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-[10px] font-sans font-medium uppercase tracking-wider text-center"
                    >
                      Quick Add
                    </button>
                    <Link
                      href={`/product/${pinProducts.tee.slug}`}
                      className="py-1 px-2 border border-zinc-300 dark:border-zinc-700 text-[10px] font-sans font-medium uppercase text-zinc-800 dark:text-zinc-200"
                    >
                      Inspect
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Tag Pin 2: Transit Ripstop Cargo (Legs) */}
            <div className="absolute top-[68%] left-[52%] z-20">
              <button
                onClick={() => setActivePin(activePin === "cargo" ? null : "cargo")}
                className="relative group p-2 focus:outline-none"
                aria-label="View Transit Ripstop Cargo details"
              >
                <span className="absolute inset-0 rounded-full bg-white/40 animate-ping" />
                <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-zinc-950 text-white border-2 border-white text-[10px] font-mono font-bold shadow-lg">
                  2
                </span>
              </button>

              {activePin === "cargo" && (
                <div className="absolute left-8 bottom-0 w-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-3 z-30 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[9px] font-mono uppercase font-bold text-blue-600 dark:text-blue-400">
                      DWR 3-LAYER RIPSTOP
                    </span>
                    <button onClick={() => setActivePin(null)} className="text-zinc-400 hover:text-black dark:hover:text-white">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h4 className="text-xs font-sans font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-1">
                    {pinProducts.cargo.name}
                  </h4>
                  <p className="text-[10px] font-mono text-zinc-500 mt-0.5">
                    {formatPrice(pinProducts.cargo.discountPrice || pinProducts.cargo.basePrice, currency)}
                  </p>
                  <div className="flex gap-2 mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                    <button
                      onClick={(e) => handleQuickAddPin(e, pinProducts.cargo)}
                      className="flex-1 py-1 px-2 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-[10px] font-sans font-medium uppercase tracking-wider text-center"
                    >
                      Quick Add
                    </button>
                    <Link
                      href={`/product/${pinProducts.cargo.slug}`}
                      className="py-1 px-2 border border-zinc-300 dark:border-zinc-700 text-[10px] font-sans font-medium uppercase text-zinc-800 dark:text-zinc-200"
                    >
                      Inspect
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Caption */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white text-xs font-sans">
              <span className="tracking-wider uppercase font-mono text-[11px] text-zinc-300">
                Modular Technical Uniform System
              </span>
              <Link
                href="/shop?collection=new"
                className="underline underline-offset-4 uppercase tracking-wider font-semibold text-white hover:text-zinc-300 flex items-center gap-1"
              >
                <span>View Complete Lookbook</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CURATED COLLECTION MARQUEE & CATEGORY RAIL
          (Heavyweight Tees, Cargo Pants & Joggers, Water-Resistant Windbreakers, Technical Bags & Caps)
         ========================================================= */}
      <section className="w-full py-8 sm:py-10 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between mb-5">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">
                CATALOG ARCHITECTURE
              </span>
              <h2 className="font-sans text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-950 dark:text-white">
                Core Uniform Categories
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-sans uppercase tracking-wider font-semibold text-zinc-900 dark:text-zinc-100 hover:text-zinc-500 transition-colors flex items-center gap-1"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {/* 1. Heavyweight Tees */}
            <Link
              href="/shop?dressType=Heavyweight%20Tee"
              className="group relative aspect-[4/5] bg-zinc-900 overflow-hidden border border-zinc-200 dark:border-zinc-800 flex flex-col justify-end p-4"
            >
              <Image
                src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80"
                alt="Heavyweight Tees"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="relative z-10 text-white">
                <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 block">280 GSM French Terry</span>
                <h3 className="font-sans text-sm sm:text-base font-bold uppercase tracking-tight mt-0.5">Heavyweight Tees</h3>
                <span className="text-[10px] font-mono text-zinc-300 mt-1 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Shop Category <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </Link>

            {/* 2. Cargo Pants & Joggers */}
            <Link
              href="/shop?dressType=Cargo%20Pant"
              className="group relative aspect-[4/5] bg-zinc-900 overflow-hidden border border-zinc-200 dark:border-zinc-800 flex flex-col justify-end p-4"
            >
              <Image
                src="https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=700&q=80"
                alt="Cargo Pants & Joggers"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="relative z-10 text-white">
                <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 block">Articulated Knee Shells</span>
                <h3 className="font-sans text-sm sm:text-base font-bold uppercase tracking-tight mt-0.5">Cargo Pants & Joggers</h3>
                <span className="text-[10px] font-mono text-zinc-300 mt-1 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Shop Category <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </Link>

            {/* 3. Water-Resistant Windbreakers */}
            <Link
              href="/shop?dressType=Technical%20Windbreaker"
              className="group relative aspect-[4/5] bg-zinc-900 overflow-hidden border border-zinc-200 dark:border-zinc-800 flex flex-col justify-end p-4"
            >
              <Image
                src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=700&q=80"
                alt="Water-Resistant Windbreakers"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="relative z-10 text-white">
                <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 block">10K Hydrostatic Shell</span>
                <h3 className="font-sans text-sm sm:text-base font-bold uppercase tracking-tight mt-0.5">Water-Resistant Windbreakers</h3>
                <span className="text-[10px] font-mono text-zinc-300 mt-1 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Shop Category <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </Link>

            {/* 4. Technical Bags & Caps */}
            <Link
              href="/shop?category=ACCESSORIES"
              className="group relative aspect-[4/5] bg-zinc-900 overflow-hidden border border-zinc-200 dark:border-zinc-800 flex flex-col justify-end p-4"
            >
              <Image
                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80"
                alt="Technical Bags & Caps"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="relative z-10 text-white">
                <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 block">500D Cordura® & Fidlock®</span>
                <h3 className="font-sans text-sm sm:text-base font-bold uppercase tracking-tight mt-0.5">Technical Bags & Caps</h3>
                <span className="text-[10px] font-mono text-zinc-300 mt-1 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Shop Category <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          FEATURED PRODUCT GRID WITH EDITORIAL RHYTHM
         ========================================================= */}
      <section className="w-full py-12 sm:py-16 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block mb-1">
                INVENTORY DEPLOYMENT
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-black uppercase tracking-tightest text-zinc-950 dark:text-white">
                Engineered Essentials
              </h2>
            </div>
            <Link
              href="/shop?collection=new"
              className="text-xs font-sans uppercase tracking-wider font-semibold text-zinc-900 dark:text-zinc-100 hover:text-zinc-500 transition-colors flex items-center gap-1.5 mt-2 sm:mt-0"
            >
              <span>Full Release Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 4-column product grid with 3/4 aspect ratio */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {newArrivals.slice(0, 4).map((product, idx) => (
              <ProductCard key={product.id} product={product} priority={idx < 2} />
            ))}
          </div>

          {/* Editorial Banner Interspersed between products */}
          <div className="my-8 sm:my-10 relative bg-zinc-900 text-white overflow-hidden border border-zinc-800 p-8 sm:p-12">
            <div className="relative z-10 max-w-xl space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                FABRIC CALIBRATION LAB
              </span>
              <h3 className="font-sans text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                Micro-climate thermoregulation for tropical moisture & urban transit.
              </h3>
              <p className="text-xs sm:text-sm font-sans text-zinc-400 leading-relaxed">
                Every seam is flatlocked or taped to prevent chafing during high-friction transit. We test hydrostatic head ratings in real monsoon downpours.
              </p>
              <div className="pt-2">
                <Link
                  href="/fabric-guide"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-zinc-950 text-xs font-sans uppercase font-bold tracking-wider hover:bg-zinc-200 transition-colors"
                >
                  <span>Explore Fabric Taxonomy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 hidden md:block">
              <Image
                src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80"
                alt="Technical fabric weave"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Remaining Curated Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {newArrivals.slice(4, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          TECHNICAL FABRIC MATRIX INTERACTIVE SECTION
         ========================================================= */}
      <section className="w-full py-14 sm:py-20 bg-zinc-50 dark:bg-zinc-900/40 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">
              MATERIAL ARCHITECTURE
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl font-black uppercase tracking-tightest text-zinc-950 dark:text-white">
              Tactile Fabric & Specs Matrix
            </h2>
            <p className="text-xs sm:text-sm font-sans text-zinc-600 dark:text-zinc-400 mt-2">
              Every fiber blend is engineered for tactile longevity, mechanical stretch, and moisture management.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center border-b border-zinc-200 dark:border-zinc-800 mb-8 overflow-x-auto no-scrollbar">
            {fabricMatrix.map((item, idx) => (
              <button
                key={item.name}
                onClick={() => setActiveFabricTab(idx)}
                className={cn(
                  "px-4 sm:px-6 py-3 text-xs font-sans uppercase tracking-wider font-semibold border-b-2 transition-all whitespace-nowrap",
                  activeFabricTab === idx
                    ? "border-zinc-950 text-zinc-950 dark:border-white dark:text-white"
                    : "border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
                )}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Active Tab Card */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-10 shadow-sm">
            <div className="md:col-span-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase font-bold bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
                  {fabricMatrix[activeFabricTab].spec}
                </span>
                <span className="text-[11px] font-mono text-zinc-500">
                  {fabricMatrix[activeFabricTab].metric}
                </span>
              </div>

              <h3 className="font-sans text-2xl font-bold uppercase tracking-tight text-zinc-950 dark:text-white">
                {fabricMatrix[activeFabricTab].name}
              </h3>

              <p className="text-xs sm:text-sm font-sans text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {fabricMatrix[activeFabricTab].desc}
              </p>

              <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <span className="text-[10px] font-mono uppercase text-zinc-400 block">Engineering Callout</span>
                <span className="text-xs font-mono font-semibold text-zinc-900 dark:text-zinc-100">
                  {fabricMatrix[activeFabricTab].feature}
                </span>
              </div>

              <div className="pt-2">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-wider font-bold text-zinc-950 dark:text-white hover:underline"
                >
                  <span>Shop garments in this fabric</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="md:col-span-6 relative aspect-[16/10] bg-zinc-100 dark:bg-zinc-900 overflow-hidden border border-zinc-200 dark:border-zinc-800">
              <Image
                src={fabricMatrix[activeFabricTab].image}
                alt={fabricMatrix[activeFabricTab].name}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TRUST & FRICTIONLESS CHECKOUT VALUE PROP
         ========================================================= */}
      <section className="w-full py-10 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />
            </div>
            <div>
              <h4 className="text-xs font-sans uppercase font-bold text-zinc-950 dark:text-white tracking-wide">
                7-Day Hassle-Free Sizing Exchanges
              </h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-relaxed">
                If the garment fit isn&apos;t exact, our courier swaps your size right at your doorstep.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex-shrink-0">
              <Compass className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />
            </div>
            <div>
              <h4 className="text-xs font-sans uppercase font-bold text-zinc-950 dark:text-white tracking-wide">
                Nationwide 24-48hr Rapid Dispatch
              </h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-relaxed">
                Complimentary delivery on orders over ৳ 1,500 / $50. Real-time courier SMS updates.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex-shrink-0">
              <Feather className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />
            </div>
            <div>
              <h4 className="text-xs font-sans uppercase font-bold text-zinc-950 dark:text-white tracking-wide">
                Pre-Shrunk Cold Dye Process
              </h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-relaxed">
                All cottons are pre-washed with enzymatic wash to eliminate shrinkage after repeated laundering.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
