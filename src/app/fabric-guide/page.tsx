import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Droplets, Feather, ShieldCheck, Wind, Layers } from "lucide-react";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";

export const metadata = {
  title: "Tactile Fabric Taxonomy & Technical Specs — ECWEARABLE",
  description:
    "A technical and sensory exploration of 280 GSM French Terry, DWR 3-Layer Ripstop, 18.5µ Merino Wool, and 500D Ballistic Cordura.",
};

const FABRIC_CATALOG = [
  {
    title: "Heavyweight French Terry (280 GSM)",
    gsm: "280 GSM",
    origin: "Long-Staple Combed Organic Cotton",
    weave: "Dual-Interlock Circular Knit",
    breathability: "42 CFM Balanced Airflow",
    feel: "Substantial, structured boxy drape with soft unbrushed looped interior",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    description:
      "Knitted on high-density circular gauge machines from double-twisted organic cotton yarn. The 280 GSM weight creates a silhouette that never clings or sags, anchored by a twin-needle reinforced tension collar that maintains form through hundreds of wash cycles.",
    bestFor: "Heavyweight boxy tees, transit crewnecks, structural everyday layers",
  },
  {
    title: "DWR 3-Layer Micro-Ripstop",
    gsm: "190 – 240 GSM",
    origin: "High-Tenacity Nylon Matrix",
    weave: "Cross-Grid Reinforced Ripstop with Hydrostatic Membrane",
    breathability: "10,000mm Hydrostatic / 10,000 g/m² Vapor Venting",
    feel: "Matte, quiet crinkle with hydrophobic surface bead tension",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
    description:
      "Constructed with a micro-grid lattice that stops tears and abrasions from spreading. Bonded to a monolithic waterproof membrane with fluorocarbon-free DWR coating. Fully compatible with taped seam engineering for storm-ready city transit.",
    bestFor: "All-weather windbreakers, transit cargo trousers, tactical storm parkas",
  },
  {
    title: "18.5-Micron Ultrafine Merino Wool",
    gsm: "220 GSM",
    origin: "Certified Australian Merino Fleece",
    weave: "Single Jersey Thermal Knit",
    breathability: "Dynamic Micro-Climate Equilibrium",
    feel: "Zero-itch ultra-soft handfeel, naturally elastic and temperature adaptive",
    image: "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&w=800&q=80",
    description:
      "Spun from 18.5-micron fine fibers that bend against skin without microscopic pricking. The natural keratin structure binds and neutralizes odor-causing bacteria while absorbing up to 35% of its weight in vapor before feeling damp.",
    bestFor: "Thermal transit crewnecks, base-layers, year-round travel tops",
  },
  {
    title: "Cordura® 500D Ballistic Nylon",
    gsm: "500 Denier Toughness",
    origin: "Invista Military-Spec High-Tenacity Polyamide",
    weave: "Air-Textured Dense Canvas with PU Back-Coating",
    breathability: "Weatherproof Barrier Membrane",
    feel: "Indestructible, textured tactile grip with extreme tear threshold",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    description:
      "Engineered to survive heavy abrasion, concrete scrape, and monsoon rainfall. Coated with a dual-pass polyurethane internal film and finished with Fidlock® magnetic compatibility.",
    bestFor: "Ballistic utility daypacks, field bags, modular strap hardware",
  },
];

export default function FabricGuidePage() {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50">
      {/* Header Banner */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 py-12 sm:py-16 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase font-bold bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 inline-block mb-3">
            TECHNICAL ATELIER PROTOCOL
          </span>
          <h1 className="font-sans text-3xl sm:text-5xl font-black uppercase tracking-tightest text-zinc-950 dark:text-white">
            Fabric Taxonomy & Specs Matrix
          </h1>
          <p className="text-xs sm:text-sm font-sans text-zinc-600 dark:text-zinc-400 mt-3 max-w-2xl mx-auto leading-relaxed">
            A technical guide to fabric weight (GSM), hydrostatic head ratings, yarn twist, and zero-compromise tactile comfort.
          </p>
        </div>
      </div>

      {/* Guide Cards */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 space-y-16">
        {FABRIC_CATALOG.map((f, idx) => (
          <div
            key={f.title}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-12 border-b border-zinc-200 dark:border-zinc-800 last:border-b-0 ${
              idx % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div className={`lg:col-span-5 relative aspect-[4/3] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden ${
              idx % 2 === 1 ? "lg:order-2" : ""
            }`}>
              <Image
                src={optimizeCloudinaryUrl(f.image, { width: 800, height: 600 })}
                alt={f.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-3 left-3 bg-zinc-950/90 text-white px-2 py-0.5 text-[10px] font-mono font-bold">
                {f.gsm}
              </div>
            </div>

            {/* Content */}
            <div className={`lg:col-span-7 space-y-4 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-semibold">
                  {f.origin}
                </span>
                <h2 className="font-sans text-2xl font-black uppercase tracking-tight text-zinc-950 dark:text-white mt-0.5">
                  {f.title}
                </h2>
              </div>

              <p className="text-xs sm:text-sm font-sans text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {f.description}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono">
                <div className="p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-[10px] uppercase text-zinc-400 block">Weave Structure:</span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">{f.weave}</span>
                </div>
                <div className="p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-[10px] uppercase text-zinc-400 block">Breathability / Rating:</span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">{f.breathability}</span>
                </div>
              </div>

              <div className="p-2.5 bg-zinc-100 dark:bg-zinc-900 text-xs font-sans text-zinc-600 dark:text-zinc-400">
                <span className="font-semibold text-zinc-950 dark:text-white">Recommended Garments: </span>
                <span>{f.bestFor}</span>
              </div>

              <div className="pt-2">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-1.5 text-xs font-sans uppercase font-bold tracking-wider text-zinc-950 dark:text-white hover:underline"
                >
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
