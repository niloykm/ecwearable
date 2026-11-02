import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, CheckCircle2, Feather, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";

export const metadata = {
  title: "Tactile Fabric Guide & Provenance — AURELIA STUDIO",
  description:
    "An editorial taxonomy of European flax, Dhakai pit-loom muslin, Giza organic cotton, and vegetable-tanned leather.",
};

const FABRIC_CATALOG = [
  {
    title: "Pure European Linen",
    gsm: "180 – 210 GSM",
    origin: "Normandy & Flanders Coast",
    weave: "Plain Weave & Herringbone",
    breathability: "Exceptional (98/100)",
    feel: "Crisp initially, develops fluid buttery drape with wash cycles",
    image: "https://res.cloudinary.com/dg5gwims9/image/upload/v1793617599/aurelia_studio/img_1596755094514f87.jpg",
    description:
      "Cultivated along the oceanic mist belt between northern France and Belgium. Flax requires zero artificial irrigation and creates long, hollow bast fibers that rapidly wick perspiration and conduct heat away from the body.",
    bestFor: "Warm-weather shirts, summer blazers, tailored relaxed trousers, midi dresses",
  },
  {
    title: "Dhakai Jamdani & Handloom Muslin",
    gsm: "95 – 120 GSM",
    origin: "Shitalakshya River Basin, Narayanganj",
    weave: "Discontinuous Weft Handloom (Pit Loom)",
    breathability: "Ultra-Lightweight Airflow (100/100)",
    feel: "Featherlight, floating, translucent with tactile zari relief",
    image: "https://res.cloudinary.com/dg5gwims9/image/upload/v1793617621/aurelia_studio/img_161003046998398e.jpg",
    description:
      "A UNESCO-recognized intangible cultural heritage craft. Spun with gossamer cotton and fine mulberry silk, woven in pit-loom darkness where ambient river humidity keeps delicate fibers pliable during weaving.",
    bestFor: "Festive celebration sarees, heirloom drapes, ceremonial dupattas",
  },
  {
    title: "100% GOTS Extra-Long Staple Cotton",
    gsm: "140 – 220 GSM",
    origin: "Egyptian Nile Delta (Giza 87) & Organic Cultivars",
    weave: "Interlock Pique, Fine Poplin & Double Gauze",
    breathability: "High (90/100)",
    feel: "Silky, hypoallergenic, dense yet cool to touch",
    image: "https://res.cloudinary.com/dg5gwims9/image/upload/v1793617611/aurelia_studio/img_1581655353564df1.jpg",
    description:
      "Extra-long staple fibers yield twice the tensile strength of standard commercial cotton. Spun into double-twisted yarns that resist pilling over years of regular laundry while offering unmatched comfort next to bare skin.",
    bestFor: "Tailored polos, kurtis, kids festive panjabi sets, infant rompers",
  },
  {
    title: "Full-Grain Italian Calfskin Leather",
    gsm: "Solid Density (1.4 – 1.6mm)",
    origin: "Tuscany, Italy",
    weave: "Vegetable Pit-Tanned Hide",
    breathability: "Natural Porous Membrane",
    feel: "Firm structure that molds to the wearer's feet and wrist",
    image: "https://res.cloudinary.com/dg5gwims9/image/upload/v1793617654/aurelia_studio/img_1638247025967b4e.jpg",
    description:
      "Tanned using natural tree barks and chestnut extracts over 40 days without toxic heavy metal chromium. Maintains the full epidermal grain for natural water resistance and develops an amber patina unique to each owner.",
    bestFor: "Blake-stitched Chelsea boots, watch straps, artisanal bracelets",
  },
];

export default function FabricGuidePage() {
  return (
    <div className="w-full min-h-screen bg-canvas">
      {/* Header Banner */}
      <div className="border-b border-border-subtle bg-canvas-elevated py-12 sm:py-16 px-6 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="cypress" className="mb-3">
            Atelier Materiality
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-ink tracking-tight">
            The Tactile Fabric Taxonomy
          </h1>
          <p className="text-xs sm:text-sm font-sans text-ink-muted mt-3 max-w-2xl mx-auto leading-relaxed">
            A technical and sensory exploration of our four core natural fiber pillars.
            Understanding fiber weight (GSM), yarn twist, and breathable comfort.
          </p>
        </div>
      </div>

      {/* Guide Cards */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-12 space-y-16">
        {FABRIC_CATALOG.map((f, idx) => (
          <div
            key={f.title}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-12 border-b border-border-subtle last:border-b-0 ${
              idx % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div className={`lg:col-span-5 relative aspect-[4/3] bg-canvas-elevated border border-border-subtle overflow-hidden ${
              idx % 2 === 1 ? "lg:order-2" : ""
            }`}>
              <Image
                src={optimizeCloudinaryUrl(f.image, { width: 800, height: 600 })}
                alt={f.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className={`lg:col-span-7 space-y-4 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-[#9E4733] font-bold">
                  0{idx + 1}
                </span>
                <span className="font-mono text-xs text-ink-muted">• {f.gsm}</span>
              </div>

              <h2 className="font-serif text-3xl font-light text-ink">{f.title}</h2>

              <p className="text-xs sm:text-sm font-sans text-ink-muted leading-relaxed">
                {f.description}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs bg-canvas-elevated p-4 border border-border-subtle">
                <div>
                  <span className="text-[10px] text-ink-muted block uppercase font-sans">
                    Geographic Origin:
                  </span>
                  <span className="font-medium text-ink">{f.origin}</span>
                </div>
                <div>
                  <span className="text-[10px] text-ink-muted block uppercase font-sans">
                    Weave Structure:
                  </span>
                  <span className="font-medium text-ink">{f.weave}</span>
                </div>
                <div>
                  <span className="text-[10px] text-ink-muted block uppercase font-sans">
                    Breathability:
                  </span>
                  <span className="text-[#2D4A3E] font-semibold">{f.breathability}</span>
                </div>
                <div>
                  <span className="text-[10px] text-ink-muted block uppercase font-sans">
                    Tactile Sensation:
                  </span>
                  <span className="text-ink truncate block">{f.feel}</span>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-xs font-sans text-ink-muted block mb-1">
                  Ideal Typology: <strong>{f.bestFor}</strong>
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* CTA Banner */}
        <div className="bg-[#181816] text-[#FAF8F5] p-8 sm:p-12 text-center space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-light">
            Experience the Fabrics in Person
          </h3>
          <p className="text-xs sm:text-sm font-sans text-neutral-400 max-w-xl mx-auto">
            Order online with Dhaka Metro 24h Express delivery, or visit our atelier space in Banani, Dhaka.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#FAF8F5] text-[#181816] text-xs font-sans uppercase tracking-editorial font-semibold hover:bg-neutral-200 transition-colors"
            >
              <span>Explore Garments & Wearables</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
