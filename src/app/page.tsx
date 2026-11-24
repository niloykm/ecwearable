"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Feather,
  Compass,
  ChevronRight,
  X,
  Droplets,
  Wind,
  Layers,
} from "lucide-react";
import { useCommerceStore } from "@/store/useCommerceStore";
import { ProductCard } from "@/components/product/ProductCard";
import { formatPrice, formatShippingThreshold, cn } from "@/lib/utils";
import { SafeImage } from "@/components/ui/SafeImage";
import {
  MOTION_EASE,
  SPRING_INDICATOR,
  ScrollReveal,
} from "@/components/motion/MotionPrimitives";

const FABRIC_MATRIX = [
  {
    name: "Heavyweight French Terry",
    spec: "280 GSM Combed Organic Cotton",
    feature: "Zero-Bacon Ribbed Tension Collar",
    desc: "Developed on high-gauge circular knitting machines with double-twisted yarn. Resists garment sagging, holds structural boxy drape, and provides breathable thermal balance across seasons.",
    metric: "42 CFM Airflow",
    shopQuery: "French Terry",
    icon: Feather,
    image: "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526181/ecwearable/editorial/fabric-french-terry.webp",
  },
  {
    name: "DWR 3-Layer Ripstop",
    spec: "Hydrostatic 10,000mm Membrane",
    feature: "Fluorocarbon-Free Water Repellence",
    desc: "Micro-grid reinforced nylon shell bonded to a breathable monolithic membrane. Water beads and rolls off on contact while body vapor vents continuously through high-exertion transit.",
    metric: "10,000 g/m² Breathability",
    shopQuery: "Ripstop",
    icon: Droplets,
    image: "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526181/ecwearable/editorial/fabric-dwr-ripstop.webp",
  },
  {
    name: "18.5µ Australian Merino",
    spec: "Ultrafine Thermoregulating Knit",
    feature: "Natural Keratin Anti-Odor",
    desc: "Spun from long-staple 18.5-micron fleece. Naturally wicks moisture vapor in the fiber cortex before it condenses, ensuring zero-itch tactile comfort and weeks of wear between cold washes.",
    metric: "18.5 Micron Fineness",
    shopQuery: "Merino",
    icon: Wind,
    image: "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526183/ecwearable/editorial/fabric-merino-wool.webp",
  },
  {
    name: "Cordura® 500D Ballistic",
    spec: "Military-Spec Air-Textured Nylon",
    feature: "Fidlock® Magnetic Compatibility",
    desc: "High-tenacity filament nylon engineered to withstand severe friction, abrasion, and tropical rainfall. Finished with a weather-resistant polyurethane backing.",
    metric: "500 Denier Toughness",
    shopQuery: "Cordura",
    icon: Layers,
    image: "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526181/ecwearable/editorial/fabric-cordura-ballistic.webp",
  },
] as const;

export default function HomePage() {
  const { products, currency, addToCart, toggleCart } = useCommerceStore();
  const [activePin, setActivePin] = useState<"tee" | "cargo" | "daypack" | null>(null);
  const [activeFabricTab, setActiveFabricTab] = useState<number>(0);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActivePin(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const newArrivals = products.filter((p) => p.isNewCollection).slice(0, 8);
  const thresholdLabel = formatShippingThreshold(currency);

  const pinEntries = [
    {
      id: "tee" as const,
      num: "1",
      tag: "280 GSM FRENCH TERRY",
      position: "top-[42%] left-[48%]",
      product: products.find((p) => p.id === "prod-tech-heavyweight-tee") || products[0],
    },
    {
      id: "cargo" as const,
      num: "2",
      tag: "DWR 3-LAYER RIPSTOP",
      position: "top-[78%] left-[48%]",
      product: products.find((p) => p.id === "prod-tech-ripstop-cargo") || products[1],
    },
    {
      id: "daypack" as const,
      num: "3",
      tag: "500D CORDURA® BALLISTIC",
      position: "top-[44%] left-[72%]",
      product: products.find((p) => p.id === "prod-tech-cordura-daypack") || products[5],
    },
  ];

  const activePinData = pinEntries.find((p) => p.id === activePin) || null;

  const handleQuickAddPin = (e: React.MouseEvent, product: (typeof pinEntries)[number]["product"]) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.colorVariants[0], product.sizes[0], 1);
    toggleCart(true);
    setActivePin(null);
  };

  const activeFabric = FABRIC_MATRIX[activeFabricTab];

  return (
    <div className="w-full flex flex-col bg-white dark:bg-zinc-950">
      {/* =========================================================
          HERO SECTION: Asymmetric 2-Column Editorial Grid
         ========================================================= */}
      <section className="relative w-full border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[78vh]">
          {/* Left Text Column */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase font-semibold bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
                  SS26 TECHNICAL LAB
                </span>
                <span className="text-zinc-300 dark:text-zinc-700" aria-hidden="true">/</span>
                <span className="text-[11px] font-mono tracking-wider uppercase text-zinc-600 dark:text-zinc-400">
                  SYSTEM RELEASE 04
                </span>
              </div>

              <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.08] tracking-tightest uppercase text-zinc-950 dark:text-white">
                Engineered Comfort. Zero Compromise.
              </h1>

              <p className="text-sm font-sans text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md">
                Heavyweight 280 GSM French Terry, water-repellent ripstop shells, and ergonomic activewear built for daily transit and training.
              </p>

              {/* Material Callouts Grid */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block">Density</span>
                  <span className="text-xs font-mono font-semibold text-zinc-950 dark:text-zinc-100 block">
                    280 GSM French Terry
                  </span>
                </div>
                <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block">Protection</span>
                  <span className="text-xs font-mono font-semibold text-zinc-950 dark:text-zinc-100 block">
                    DWR 3-Layer Ripstop
                  </span>
                </div>
                <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block">Thermal</span>
                  <span className="text-xs font-mono font-semibold text-zinc-950 dark:text-zinc-100 block">
                    18.5µ Merino Wool
                  </span>
                </div>
                <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block">Hardware</span>
                  <span className="text-xs font-mono font-semibold text-zinc-950 dark:text-zinc-100 block">
                    Cordura® &amp; Fidlock®
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-8 space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/shop?collection=new"
                  className="px-6 py-3.5 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-sans uppercase tracking-wider font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-[0.98] rounded-sm transition-all duration-200 flex items-center gap-2 group shadow-sm"
                >
                  <span>Shop New Arrivals</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>

                <Link
                  href="/shop?category=OUTERWEAR"
                  className="px-5 py-3.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-950 dark:text-zinc-100 text-xs font-sans uppercase tracking-wider font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-sm transition-colors duration-200"
                >
                  Explore Technical Outerwear
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-2 text-[11px] font-mono text-zinc-600 dark:text-zinc-400 tabular-nums">
                <span>{products.length} Engineered SKUs</span>
                <span className="text-zinc-300 dark:text-zinc-700" aria-hidden="true">·</span>
                <span>Dual INCH / CM Specs</span>
                <span className="text-zinc-300 dark:text-zinc-700" aria-hidden="true">·</span>
                <span>Lab Tested</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Lookbook with Viewport-Safe Interactive Garment Pins */}
          <div className="lg:col-span-7 relative min-h-[480px] sm:min-h-[580px] lg:min-h-full bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
            <SafeImage
              src="https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526182/ecwearable/editorial/hero-transit-editorial.webp"
              alt="ECWEARABLE Technical Apparel Transit Editorial — 280 GSM Heavyweight Tee, DWR Ripstop Cargo Pant, and 500D Cordura Daypack"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              priority
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/30 pointer-events-none" />

            {/* Top Editorial Label */}
            <div className="absolute top-5 left-5 right-5 z-10 pointer-events-none flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-200 block">
                  FIELD TEST 04 // RAIN &amp; TRANSIT
                </span>
                <p className="text-white text-xs font-sans font-medium">
                  Tap garment pins to inspect technical specs
                </p>
              </div>
            </div>

            {/* Interactive Garment Pins (All 3 Pins Keyboard & Touch Accessible) */}
            {pinEntries.map((pin) => {
              const isOpen = activePin === pin.id;
              return (
                <div key={pin.id} className={cn("absolute z-20 -translate-x-1/2 -translate-y-1/2", pin.position)}>
                  <button
                    type="button"
                    onClick={() => setActivePin(isOpen ? null : pin.id)}
                    aria-expanded={isOpen}
                    aria-controls="hero-pin-spec-card"
                    aria-label={`Inspect pin ${pin.num}: ${pin.product.name}`}
                    className="relative group p-2 focus-visible:outline-white rounded-full"
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-1 rounded-full transition-transform duration-300",
                        isOpen ? "bg-emerald-400/50 scale-125" : "bg-white/40 group-hover:scale-125"
                      )}
                    />
                    <span
                      className={cn(
                        "relative flex items-center justify-center w-7 h-7 rounded-full border-2 text-[11px] font-mono font-bold shadow-lg transition-colors duration-200",
                        isOpen
                          ? "bg-white text-zinc-950 border-zinc-950"
                          : "bg-zinc-950 text-white border-white group-hover:bg-white group-hover:text-zinc-950"
                      )}
                    >
                      {pin.num}
                    </span>
                  </button>
                </div>
              );
            })}

            {/* Viewport-Safe Anchored Spec Card (Never clips at 390px or 1440px) */}
            <AnimatePresence mode="wait">
              {activePinData && (
                <motion.div
                  id="hero-pin-spec-card"
                  key={activePinData.id}
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: MOTION_EASE }}
                  className="absolute bottom-14 left-4 right-4 sm:left-auto sm:right-6 sm:w-80 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-4 z-30 rounded-sm"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-emerald-700 dark:text-emerald-400">
                      PIN 0{activePinData.num} · {activePinData.tag}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActivePin(null)}
                      aria-label="Close technical spec card"
                      className="p-1 -mr-1 -mt-1 text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-sm font-sans font-bold text-zinc-950 dark:text-white leading-snug">
                    {activePinData.product.name}
                  </h3>

                  <div className="flex items-center justify-between gap-2 mt-1.5">
                    <span className="text-xs font-mono font-bold text-zinc-950 dark:text-zinc-100 tabular-nums">
                      {formatPrice(
                        activePinData.product.discountPrice || activePinData.product.basePrice,
                        currency
                      )}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-500">
                      {activePinData.product.fitType}
                    </span>
                  </div>

                  <div className="flex gap-2 mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                    <button
                      type="button"
                      onClick={(e) => handleQuickAddPin(e, activePinData.product)}
                      className="flex-1 py-2 px-3 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-[11px] font-sans font-semibold uppercase tracking-wider text-center rounded-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                    >
                      Quick Add
                    </button>
                    <Link
                      href={`/product/${activePinData.product.slug}`}
                      className="py-2 px-3 border border-zinc-300 dark:border-zinc-700 text-[11px] font-sans font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 rounded-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                    >
                      Inspect
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Caption */}
            <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between gap-4 text-white text-xs font-sans z-10">
              <span className="tracking-wider uppercase font-mono text-[11px] text-zinc-200 truncate">
                Modular Technical Uniform System
              </span>
              <Link
                href="/shop?collection=new"
                className="underline underline-offset-4 uppercase tracking-wider font-semibold text-white hover:text-zinc-200 flex items-center gap-1 whitespace-nowrap flex-shrink-0"
              >
                <span>View Complete Lookbook</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CORE UNIFORM CATEGORIES
         ========================================================= */}
      <section className="w-full py-10 sm:py-12 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 dark:text-zinc-400 block mb-1">
                CATALOG ARCHITECTURE
              </span>
              <h2 className="font-sans text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-950 dark:text-white">
                Core Uniform Categories
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-sans uppercase tracking-wider font-semibold text-zinc-950 dark:text-zinc-100 hover:text-zinc-600 transition-colors flex items-center gap-1 whitespace-nowrap"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5">
            {[
              {
                title: "Heavyweight Tees",
                spec: "280 GSM French Terry",
                href: "/shop?dressType=Heavyweight%20Tee",
                image: "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526181/ecwearable/editorial/cat-heavyweight-tees.webp",
                objectPosition: "object-top",
              },
              {
                title: "Cargo Pants & Joggers",
                spec: "Articulated Knee Shells",
                href: "/shop?query=Cargo",
                image: "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526180/ecwearable/editorial/cat-cargo-joggers.webp",
                objectPosition: "object-top",
              },
              {
                title: "Water-Resistant Windbreakers",
                spec: "10K Hydrostatic Shell",
                href: "/shop?dressType=Water-Resistant%20Windbreaker",
                image: "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526180/ecwearable/editorial/cat-windbreakers.webp",
                objectPosition: "object-top",
              },
              {
                title: "Technical Bags & Caps",
                spec: "500D Cordura® & Fidlock®",
                href: "/shop?category=ACCESSORIES",
                image: "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526181/ecwearable/editorial/cat-bags-caps.webp",
                objectPosition: "object-center",
              },
            ].map((cat, idx) => (
              <ScrollReveal key={cat.title} delay={idx * 0.05}>
                <Link
                  href={cat.href}
                  className="group relative aspect-[3/4] bg-zinc-900 overflow-hidden border border-zinc-200 dark:border-zinc-800 flex flex-col justify-end p-4 transition-all duration-200 hover:border-zinc-500"
                >
                  <SafeImage
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className={cn(
                      "object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100",
                      cat.objectPosition
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="relative z-10 text-white space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-300 block">
                      {cat.spec}
                    </span>
                    <h3 className="font-sans text-sm sm:text-base font-bold uppercase tracking-tight leading-snug">
                      {cat.title}
                    </h3>
                    <span className="text-[10px] font-mono text-zinc-200 pt-0.5 flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-200">
                      Shop Category <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FEATURED PRODUCT GRID WITH EDITORIAL RHYTHM
         ========================================================= */}
      <section className="w-full py-12 sm:py-16 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-semibold block mb-1">
                INVENTORY DEPLOYMENT
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-black uppercase tracking-tightest text-zinc-950 dark:text-white">
                Engineered Essentials
              </h2>
            </div>
            <Link
              href="/shop?collection=new"
              className="text-xs font-sans uppercase tracking-wider font-semibold text-zinc-950 dark:text-zinc-100 hover:text-zinc-600 transition-colors flex items-center gap-1.5"
            >
              <span>Full Release Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* First 4 Products */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6">
            {newArrivals.slice(0, 4).map((product, idx) => (
              <ScrollReveal key={product.id} delay={idx * 0.05}>
                <ProductCard product={product} priority={idx < 2} />
              </ScrollReveal>
            ))}
          </div>

          {/* Mid-Grid Editorial Banner */}
          <ScrollReveal className="my-10 sm:my-12">
            <div className="relative bg-zinc-950 text-white overflow-hidden border border-zinc-800 p-7 sm:p-12">
              <div className="relative z-10 max-w-xl space-y-3.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block">
                  FABRIC CALIBRATION LAB
                </span>
                <h3 className="font-sans text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight">
                  Micro-climate thermoregulation for tropical moisture &amp; urban transit.
                </h3>
                <p className="text-xs sm:text-sm font-sans text-zinc-300 leading-relaxed">
                  Every seam is flatlocked or taped to prevent chafing during high-friction transit. We test hydrostatic head ratings in real monsoon downpours.
                </p>
                <div className="pt-2">
                  <Link
                    href="/fabric-guide"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-white text-zinc-950 text-xs font-sans uppercase font-bold tracking-wider rounded-sm hover:bg-zinc-200 transition-colors"
                  >
                    <span>Explore Fabric Taxonomy</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-40 hidden md:block pointer-events-none">
                <SafeImage
                  src="https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526181/ecwearable/editorial/banner-monsoon-lab.webp"
                  alt="Hydrostatic waterproof ripstop membrane with taped seam detail"
                  fill
                  sizes="50vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Next 4 Products */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6">
            {newArrivals.slice(4, 8).map((product, idx) => (
              <ScrollReveal key={product.id} delay={idx * 0.05}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          TACTILE FABRIC & SPECS MATRIX (layoutId + AnimatePresence)
         ========================================================= */}
      <section className="w-full py-14 sm:py-20 bg-zinc-50 dark:bg-zinc-900/40 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 dark:text-zinc-400 block">
              MATERIAL ARCHITECTURE
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl font-black uppercase tracking-tightest text-zinc-950 dark:text-white">
              Tactile Fabric &amp; Specs Matrix
            </h2>
            <p className="text-xs sm:text-sm font-sans text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Every fiber blend is engineered for tactile longevity, mechanical stretch, and moisture management.
            </p>
          </div>

          {/* Animated Tab Bar with Shared Indicator */}
          <div
            role="tablist"
            aria-label="Technical fabric specifications"
            className="flex justify-start sm:justify-center border-b border-zinc-200 dark:border-zinc-800 mb-8 overflow-x-auto no-scrollbar gap-1"
          >
            {FABRIC_MATRIX.map((item, idx) => {
              const isSelected = activeFabricTab === idx;
              return (
                <button
                  key={item.name}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`fabric-panel-${idx}`}
                  id={`fabric-tab-${idx}`}
                  onClick={() => setActiveFabricTab(idx)}
                  className={cn(
                    "relative px-4 sm:px-6 py-3 text-xs font-sans uppercase tracking-wider font-semibold transition-colors duration-200 whitespace-nowrap",
                    isSelected
                      ? "text-zinc-950 dark:text-white"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-200"
                  )}
                >
                  <span>{item.name}</span>
                  {isSelected && (
                    <motion.span
                      layoutId="fabric-matrix-indicator"
                      transition={SPRING_INDICATOR}
                      className="absolute inset-x-0 bottom-0 h-[2px] bg-zinc-950 dark:bg-white"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Animated Active Fabric Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFabric.name}
              id={`fabric-panel-${activeFabricTab}`}
              role="tabpanel"
              aria-labelledby={`fabric-tab-${activeFabricTab}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.24, ease: MOTION_EASE }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-10 shadow-sm"
            >
              <div className="md:col-span-6 space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase font-bold bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
                    {activeFabric.spec}
                  </span>
                  <span className="text-zinc-300 dark:text-zinc-700" aria-hidden="true">·</span>
                  <span className="text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400 tabular-nums">
                    {activeFabric.metric}
                  </span>
                </div>

                <h3 className="font-sans text-2xl font-bold uppercase tracking-tight text-zinc-950 dark:text-white">
                  {activeFabric.name}
                </h3>

                <p className="text-xs sm:text-sm font-sans text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {activeFabric.desc}
                </p>

                <div className="p-3.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block">
                    Engineering Callout
                  </span>
                  <span className="text-xs font-mono font-semibold text-zinc-950 dark:text-zinc-100 block">
                    {activeFabric.feature}
                  </span>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/shop?query=${encodeURIComponent(activeFabric.shopQuery)}`}
                    className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-wider font-bold text-zinc-950 dark:text-white hover:underline"
                  >
                    <span>Shop garments in this fabric</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="md:col-span-6 relative aspect-[16/10] bg-zinc-100 dark:bg-zinc-900 overflow-hidden border border-zinc-200 dark:border-zinc-800">
                <SafeImage
                  src={activeFabric.image}
                  alt={activeFabric.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* =========================================================
          SERVICE & DISPATCH GUARANTEES
         ========================================================= */}
      <section className="w-full py-10 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />
            </div>
            <div>
              <h4 className="text-xs font-sans uppercase font-bold text-zinc-950 dark:text-white tracking-wide">
                7-Day Hassle-Free Sizing Exchanges
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                If the garment fit isn&apos;t exact, our courier swaps your size right at your doorstep.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex-shrink-0">
              <Compass className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />
            </div>
            <div>
              <h4 className="text-xs font-sans uppercase font-bold text-zinc-950 dark:text-white tracking-wide">
                Nationwide 24-48hr Rapid Dispatch
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed tabular-nums">
                Free nationwide shipping on orders over {thresholdLabel}. Real-time courier SMS updates.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex-shrink-0">
              <Feather className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />
            </div>
            <div>
              <h4 className="text-xs font-sans uppercase font-bold text-zinc-950 dark:text-white tracking-wide">
                Pre-Shrunk Cold Dye Process
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                All cottons are pre-washed with enzymatic wash to eliminate shrinkage after repeated laundering.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
