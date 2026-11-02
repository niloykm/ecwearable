"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Feather, Shield, Compass, ChevronRight } from "lucide-react";
import { useCommerceStore } from "@/store/useCommerceStore";
import { ProductCard } from "@/components/product/ProductCard";
import { Badge } from "@/components/ui/Badge";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";

export default function HomePage() {
  const { products } = useCommerceStore();
  const [activeFabricTab, setActiveFabricTab] = useState<number>(0);

  const newCollectionProducts = products.filter((p) => p.isNewCollection).slice(0, 4);
  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 4);
  const wearableProducts = products.filter((p) => p.mainCategory === "WEARABLES" || p.mainCategory === "FOOTWEAR").slice(0, 4);

  const fabrics = [
    {
      name: "Pure European Linen",
      origin: "Normandy, France",
      gsm: "180–210 GSM",
      desc: "Cultivated along the breezy Atlantic coast, Normandy flax produces naturally hollow fibers that conduct heat away from the body 5x faster than wool and 19x faster than silk. Air-washed for instant drape.",
      image: "https://res.cloudinary.com/dg5gwims9/image/upload/v1793640620/aurelia_studio/prod-men-linen-shirt-1_8830.jpg",
      tag: "Natural Thermoregulation",
    },
    {
      name: "Dhakai Muslin & Mulberry Silk",
      origin: "Dhaka & Rajshahi, Bangladesh",
      gsm: "110–145 GSM",
      desc: "Woven on pit looms by generational artisan families using high-count yarn, floating featherweight over the skin with lustrous mulberry silk wefts and antique hand-spun zari borders.",
      image: "https://res.cloudinary.com/dg5gwims9/image/upload/v1793617621/aurelia_studio/img_161003046998398e.jpg",
      tag: "Heritage Pit-Loom Weave",
    },
    {
      name: "100% GOTS Organic Cotton",
      origin: "Egyptian Giza & Organic Deltas",
      gsm: "140–240 GSM",
      desc: "Grown without synthetic pesticides or defoliants, our long-staple combed cotton is double-twisted for dense pill resistance, baby-soft tactile feel, and non-allergenic comfort in tropical heat.",
      image: "https://res.cloudinary.com/dg5gwims9/image/upload/v1793617611/aurelia_studio/img_1581655353564df1.jpg",
      tag: "Chemical-Free Touch",
    },
    {
      name: "Full-Grain Leather & 316L Horology Steel",
      origin: "Tuscany, Italy & Swiss Horology",
      gsm: "Solid Density",
      desc: "Vegetable-tanned Tuscan calfskin that deepens in patina over decades, married to surgical marine-grade 316L steel chronographs with sapphire exhibition crystals.",
      image: "https://res.cloudinary.com/dg5gwims9/image/upload/v1793640635/aurelia_studio/prod-wear-chronograph-40mm-1_5575.jpg",
      tag: "Enduring Heirloom",
    },
  ];

  return (
    <div className="w-full flex flex-col">
      {/* =========================================================
          HERO SECTION: Split Editorial Lookbook
         ========================================================= */}
      <section className="relative w-full border-b border-border-subtle bg-canvas">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[82vh]">
          {/* Left Text Column */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 sm:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-border-subtle">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Badge variant="terracotta">SS26 Runway Edition</Badge>
                <span className="text-[11px] font-mono tracking-widest uppercase text-ink-muted">
                  Collection 04
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.08] tracking-tight text-ink">
                Quiet tactile architecture for everyday ceremony.
              </h1>

              <p className="text-sm sm:text-base font-sans text-ink-muted leading-relaxed max-w-md">
                Aurelia Studio reconciles Parisian and Dhakai sartorial heritage.
                Breathable Normandy flax, hand-smocked silk, and Swiss-inspired horology crafted for tactile longevity.
              </p>
            </div>

            <div className="pt-8 sm:pt-12 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/shop?collection=new"
                  className="px-7 py-3.5 bg-[#181816] text-[#FAF8F5] text-xs font-sans uppercase tracking-editorial font-medium hover:bg-neutral-800 transition-all flex items-center gap-2 group shadow-subtle"
                >
                  <span>Explore New Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/shop"
                  className="px-6 py-3.5 bg-canvas-elevated border border-border-subtle text-ink text-xs font-sans uppercase tracking-editorial font-medium hover:bg-[#E5E0D8] transition-all"
                >
                  Full Catalog
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-4 text-xs font-mono text-ink-muted">
                <span>• 20 Curated SKUs</span>
                <span>• Dual [INCH | CM] Specs</span>
                <span>• 100% Traceable</span>
              </div>
            </div>
          </div>

          {/* Right Dual Lookbook Display */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 bg-canvas-elevated">
            {/* Image 1: Apparel */}
            <div className="relative group overflow-hidden border-b sm:border-b-0 sm:border-r border-border-subtle min-h-[380px] lg:min-h-full">
              <Image
                src={optimizeCloudinaryUrl(
                  "https://res.cloudinary.com/dg5gwims9/image/upload/v1793617661/aurelia_studio/img_1596755094514f87.jpg",
                  { width: 900, height: 1200 }
                )}
                alt="European Linen Lookbook"
                fill
                priority
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5DEC9]">
                  Mens & Womens Atelier
                </span>
                <h3 className="font-serif text-2xl font-normal mt-1 mb-2">
                  Normandy Linen & Festive Panjabis
                </h3>
                <Link
                  href="/shop?category=GARMENTS"
                  className="text-xs uppercase font-sans tracking-editorial underline underline-offset-4 flex items-center gap-1.5 hover:text-[#C5A059] transition-colors"
                >
                  <span>Discover Garments</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Image 2: Horology & Wearables */}
            <div className="relative group overflow-hidden min-h-[380px] lg:min-h-full">
              <Image
                src={optimizeCloudinaryUrl(
                  "https://res.cloudinary.com/dg5gwims9/image/upload/v1793617662/aurelia_studio/img_1523275335684378.jpg",
                  { width: 900, height: 1200 }
                )}
                alt="Horology and Fine Wearables"
                fill
                priority
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059]">
                  Horology & Fine Leather
                </span>
                <h3 className="font-serif text-2xl font-normal mt-1 mb-2">
                  Chronographs & Italian Boots
                </h3>
                <Link
                  href="/shop?category=WEARABLES"
                  className="text-xs uppercase font-sans tracking-editorial underline underline-offset-4 flex items-center gap-1.5 hover:text-[#C5A059] transition-colors"
                >
                  <span>Discover Wearables</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          DEMOGRAPHIC & CATEGORY BENTO
         ========================================================= */}
      <section className="w-full py-16 sm:py-20 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-border-subtle">
          <div>
            <span className="text-[10px] font-mono tracking-editorial uppercase text-[#9E4733] block mb-1">
              Curated Wardrobe Architecture
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-ink">
              Explore by Atelier Department
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-sans uppercase tracking-editorial text-ink hover:text-ink-muted transition-colors flex items-center gap-1.5 mt-2 sm:mt-0"
          >
            <span>View All Departments</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Bento Item 1: Men's */}
          <Link
            href="/shop?gender=MALE"
            className="md:col-span-6 relative aspect-[16/11] bg-canvas-elevated overflow-hidden group border border-border-subtle"
          >
            <Image
              src={optimizeCloudinaryUrl(
                "https://res.cloudinary.com/dg5gwims9/image/upload/v1793617604/aurelia_studio/img_161713798409574e.jpg",
                { width: 800, height: 550 }
              )}
              alt="Men's Sartorial Edit"
              fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6 sm:p-8 flex flex-col justify-end text-white">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5DEC9]">
                01 / Menswear
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light mt-1">
                Men&apos;s Sartorial Atelier
              </h3>
              <p className="text-xs font-sans text-neutral-300 mt-1 max-w-md">
                Air-washed linen shirts, festive embroidered panjabis, and pleated chino trousers.
              </p>
            </div>
          </Link>

          {/* Bento Item 2: Women's */}
          <Link
            href="/shop?gender=FEMALE"
            className="md:col-span-6 relative aspect-[16/11] bg-canvas-elevated overflow-hidden group border border-border-subtle"
          >
            <Image
              src={optimizeCloudinaryUrl(
                "https://res.cloudinary.com/dg5gwims9/image/upload/v1793617626/aurelia_studio/img_159577745758395e.jpg",
                { width: 800, height: 550 }
              )}
              alt="Women's Atelier Collection"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6 sm:p-8 flex flex-col justify-end text-white">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5DEC9]">
                02 / Womenswear
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light mt-1">
                Women&apos;s Atelier Collection
              </h3>
              <p className="text-xs font-sans text-neutral-300 mt-1 max-w-md">
                Handloom Dhakai muslin sarees, belted linen midi dresses, and tailored co-ord sets.
              </p>
            </div>
          </Link>

          {/* Bento Item 3: Children's */}
          <Link
            href="/shop?ageGroup=CHILDREN"
            className="md:col-span-5 relative aspect-[4/3] bg-canvas-elevated overflow-hidden group border border-border-subtle"
          >
            <Image
              src={optimizeCloudinaryUrl(
                "https://res.cloudinary.com/dg5gwims9/image/upload/v1793617664/aurelia_studio/img_1518831959646742.jpg",
                { width: 700, height: 525 }
              )}
              alt="Children's Edit"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6 flex flex-col justify-end text-white">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5DEC9]">
                03 / Children
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-light mt-1">
                Children&apos;s Organic Edit
              </h3>
              <p className="text-xs font-sans text-neutral-300 mt-1">
                Hypoallergenic cotton panjabi sets, smocked linen frocks, and rompers.
              </p>
            </div>
          </Link>

          {/* Bento Item 4: Wearables, Horology & Footwear */}
          <Link
            href="/shop?category=WEARABLES"
            className="md:col-span-7 relative aspect-[16/10] bg-canvas-elevated overflow-hidden group border border-border-subtle"
          >
            <Image
              src={optimizeCloudinaryUrl(
                "https://res.cloudinary.com/dg5gwims9/image/upload/v1793617650/aurelia_studio/img_1524805444758089.jpg",
                { width: 900, height: 560 }
              )}
              alt="Watches, Leather Footwear & Bracelets"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6 sm:p-8 flex flex-col justify-end text-white">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059]">
                04 / Horology & Footwear
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light mt-1">
                Timepieces, Footwear & Bracelets
              </h3>
              <p className="text-xs font-sans text-neutral-300 mt-1 max-w-lg">
                40mm automatic mechanical chronographs, Italian Blake-stitched Chelsea boots, and sterling silver cuffs.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* =========================================================
          NEW ARRIVALS: Interactive Product Grid
         ========================================================= */}
      <section className="w-full py-16 bg-canvas-elevated border-y border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#9E4733]" />
                <span className="text-[10px] font-mono tracking-editorial uppercase text-[#9E4733]">
                  Just In From The Studio
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-ink">
                New Collection
              </h2>
            </div>

            <Link
              href="/shop?collection=new"
              className="text-xs font-sans uppercase tracking-editorial text-ink hover:text-ink-muted transition-colors flex items-center gap-1.5 mt-2 sm:mt-0"
            >
              <span>Shop All New Arrivals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newCollectionProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} priority={idx < 2} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          TACTILE FABRIC STORY SECTION
         ========================================================= */}
      <section className="w-full py-20 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-mono tracking-editorial uppercase text-[#2D4A3E] block mb-2">
            Material Sourcing Integrity
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-ink">
            The Tactile Fabric Story
          </h2>
          <p className="text-xs sm:text-sm font-sans text-ink-muted mt-2">
            Every garment begins with natural fiber provenance. We reject synthetic polyesters in favor of breathable flax, organic cotton, and pit-loom weaves.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto pb-4 no-scrollbar">
          {fabrics.map((fabric, idx) => (
            <button
              key={fabric.name}
              onClick={() => setActiveFabricTab(idx)}
              className={`px-4 py-2 text-xs font-sans uppercase tracking-wider transition-all whitespace-nowrap border ${
                activeFabricTab === idx
                  ? "bg-[#181816] text-[#FAF8F5] border-[#181816]"
                  : "bg-canvas-elevated text-ink-muted hover:text-ink border-border-subtle"
              }`}
            >
              {fabric.name.split(" ")[0]} {fabric.name.split(" ")[1] || ""}
            </button>
          ))}
        </div>

        {/* Active Fabric Display */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 bg-canvas-elevated border border-border-subtle overflow-hidden">
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-[420px]">
            <Image
              src={optimizeCloudinaryUrl(fabrics[activeFabricTab].image, { width: 700, height: 600 })}
              alt={fabrics[activeFabricTab].name}
              fill
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant="cypress">{fabrics[activeFabricTab].tag}</Badge>
                <span className="font-mono text-xs text-ink-muted">
                  {fabrics[activeFabricTab].gsm}
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-light text-ink">
                {fabrics[activeFabricTab].name}
              </h3>

              <div className="flex items-center gap-2 text-xs font-mono text-[#9E4733]">
                <Compass className="w-3.5 h-3.5" />
                <span>Harvest Provenance: {fabrics[activeFabricTab].origin}</span>
              </div>

              <p className="text-sm font-sans text-ink-muted leading-relaxed pt-2">
                {fabrics[activeFabricTab].desc}
              </p>
            </div>

            <div className="pt-8 border-t border-border-subtle flex items-center justify-between">
              <Link
                href="/fabric-guide"
                className="text-xs uppercase font-sans tracking-editorial font-medium text-ink hover:text-ink-muted transition-colors flex items-center gap-1.5"
              >
                <span>Read Full Fabric Taxonomy Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TRENDING NOW & WEARABLES GRID
         ========================================================= */}
      <section className="w-full py-16 bg-canvas border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                <span className="text-[10px] font-mono tracking-editorial uppercase text-[#C5A059]">
                  Patron Favorites
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-ink">
                Trending Now & Wearables
              </h2>
            </div>

            <Link
              href="/shop?collection=trending"
              className="text-xs font-sans uppercase tracking-editorial text-ink hover:text-ink-muted transition-colors flex items-center gap-1.5 mt-2 sm:mt-0"
            >
              <span>Explore Trending</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          EDITORIAL LOOKBOOK GALLERY: High-Fashion Visual Showcase
         ========================================================= */}
      <section className="w-full py-20 bg-canvas-elevated border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="space-y-2 max-w-xl">
              <span className="text-[10px] font-mono tracking-editorial uppercase text-[#9E4733]">
                Visual Journal — SS26
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ink">
                The Atelier Editorial Lookbook
              </h2>
              <p className="text-xs sm:text-sm font-sans text-ink-muted leading-relaxed">
                A visual inquiry into silhouettes, textures, and unconstrained drapery photographed in raw natural morning light.
              </p>
            </div>

            <Link
              href="/shop"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-sans uppercase tracking-editorial font-medium text-ink hover:text-ink-muted transition-colors"
            >
              <span>View Full Lookbook Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Architectural Drape & Raw Flax",
                subtitle: "Normandy Flax / SS26 Runway",
                image: "https://res.cloudinary.com/dg5gwims9/image/upload/v1793644722/aurelia_studio/editorial_lookbook_1.jpg",
                aspect: "aspect-[4/5]",
                category: "Linen & Suiting",
                href: "/shop?fabric=linen"
              },
              {
                title: "Oversized Silhouette & Airflow",
                subtitle: "Relaxed Cut / Botanical Weave",
                image: "https://res.cloudinary.com/dg5gwims9/image/upload/v1793644724/aurelia_studio/editorial_lookbook_2.jpg",
                aspect: "aspect-[4/5]",
                category: "Modern Casual",
                href: "/shop?collection=new"
              },
              {
                title: "Autumnal Cashmere & Wool Overcoat",
                subtitle: "Hand-Stitched Lapel / Tuscan Horn",
                image: "https://res.cloudinary.com/dg5gwims9/image/upload/v1793644725/aurelia_studio/editorial_lookbook_3.jpg",
                aspect: "aspect-[4/5]",
                category: "Outerwear",
                href: "/shop?category=GARMENTS"
              },
              {
                title: "Monochrome Sartorial Discipline",
                subtitle: "Pure Giza Combed Cotton",
                image: "https://res.cloudinary.com/dg5gwims9/image/upload/v1793644727/aurelia_studio/editorial_lookbook_4.jpg",
                aspect: "aspect-[4/5]",
                category: "Monochrome Edit",
                href: "/shop?color=Obsidian"
              },
              {
                title: "Bespoke Evening Tailoring",
                subtitle: "Dhakai Muslin & Mulberry Silk Accents",
                image: "https://res.cloudinary.com/dg5gwims9/image/upload/v1793644729/aurelia_studio/editorial_lookbook_5.jpg",
                aspect: "aspect-[4/5]",
                category: "Festive & Ceremonial",
                href: "/shop?collection=trending"
              },
              {
                title: "Subtle Tactile Horology & Hide",
                subtitle: "Blake-Stitched Leather & 316L Chronograph",
                image: "https://res.cloudinary.com/dg5gwims9/image/upload/v1793644731/aurelia_studio/editorial_lookbook_6.jpg",
                aspect: "aspect-[4/5]",
                category: "Wearables & Timepieces",
                href: "/shop?category=WEARABLES"
              }
            ].map((look, idx) => (
              <Link
                key={idx}
                href={look.href}
                className="group relative overflow-hidden bg-white border border-border-subtle block"
              >
                <div className={`relative w-full ${look.aspect} overflow-hidden bg-neutral-100`}>
                  <Image
                    src={optimizeCloudinaryUrl(look.image, { width: 900, height: 1125 })}
                    alt={look.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-mono uppercase tracking-wider text-black">
                      {look.category}
                    </span>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="text-[10px] font-mono tracking-wider uppercase text-neutral-300 block mb-1">
                      {look.subtitle}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-normal leading-snug group-hover:underline underline-offset-4 decoration-white/60">
                      {look.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          EDITORIAL TRUST PILLARS
         ========================================================= */}
      <section className="w-full py-12 bg-canvas-elevated border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <Feather className="w-5 h-5 text-[#2D4A3E] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-sans text-xs uppercase tracking-wider font-semibold text-ink">
                Artisan Crafted
              </h4>
              <p className="text-[11px] font-sans text-ink-muted mt-1 leading-normal">
                Hand-smocked linen, Dhakai pit-loom muslin & bench-made Blake boots.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Shield className="w-5 h-5 text-[#C5A059] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-sans text-xs uppercase tracking-wider font-semibold text-ink">
                Dual [INCH | CM] Specs
              </h4>
              <p className="text-[11px] font-sans text-ink-muted mt-1 leading-normal">
                Precise flat-laid measurements dynamically convertible for zero-guess sizing.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Sparkles className="w-5 h-5 text-[#9E4733] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-sans text-xs uppercase tracking-wider font-semibold text-ink">
                Zero Plastic Packaging
              </h4>
              <p className="text-[11px] font-sans text-ink-muted mt-1 leading-normal">
                Shipped in unbleached cotton garment pouches and keepsake boxes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Compass className="w-5 h-5 text-ink flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-sans text-xs uppercase tracking-wider font-semibold text-ink">
                Express Fulfillment
              </h4>
              <p className="text-[11px] font-sans text-ink-muted mt-1 leading-normal">
                Same-day dispatch across Dhaka Metro and expedited courier nationwide.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
