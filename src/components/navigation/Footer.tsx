import React from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-zinc-950 text-white pt-16 pb-12 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Brand Statement Banner */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-zinc-800">
          <div className="md:col-span-5 space-y-3">
            <span className="text-[10px] tracking-[0.25em] uppercase font-mono text-emerald-400 block">
              ECWEARABLE // TECHNICAL ATELIER & LAB
            </span>
            <h3 className="font-sans text-2xl sm:text-3xl font-black uppercase leading-tight tracking-tightest">
              Engineered Everyday Garments & Technical Wearables.
            </h3>
            <p className="text-xs font-sans text-zinc-400 max-w-sm leading-relaxed">
              Heavyweight 280 GSM French Terry, water-repellent ripstop shells, and ergonomic activewear built for daily transit and training.
            </p>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-[11px] font-mono tracking-wider uppercase text-zinc-400 font-semibold mb-4">
                Systems & Catalog
              </h4>
              <ul className="space-y-2.5 text-xs font-sans text-zinc-400">
                <li>
                  <Link href="/shop?category=OUTERWEAR" className="hover:text-white transition-colors">
                    Technical Outerwear
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=BASICS" className="hover:text-white transition-colors">
                    Everyday Basics (280 GSM)
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=ACCESSORIES" className="hover:text-white transition-colors">
                    Tactical Bags & Caps
                  </Link>
                </li>
                <li>
                  <Link href="/shop?gender=MALE" className="hover:text-white transition-colors">
                    Men&apos;s Collection
                  </Link>
                </li>
                <li>
                  <Link href="/shop?gender=FEMALE" className="hover:text-white transition-colors">
                    Women&apos;s Collection
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-mono tracking-wider uppercase text-zinc-400 font-semibold mb-4">
                Materials & Testing
              </h4>
              <ul className="space-y-2.5 text-xs font-sans text-zinc-400">
                <li>
                  <Link href="/fabric-guide" className="hover:text-white transition-colors">
                    Fabric Taxonomy & Lab Specs
                  </Link>
                </li>
                <li>
                  <span className="text-zinc-500">280 GSM French Terry</span>
                </li>
                <li>
                  <span className="text-zinc-500">10K Hydrostatic Ripstop</span>
                </li>
                <li>
                  <span className="text-zinc-500">18.5µ Merino Fiber</span>
                </li>
                <li>
                  <span className="text-zinc-500">500D Cordura® Ballistic</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-mono tracking-wider uppercase text-zinc-400 font-semibold mb-4">
                Operations & Admin
              </h4>
              <ul className="space-y-2.5 text-xs font-sans text-zinc-400">
                <li>
                  <Link
                    href="/admin"
                    className="flex items-center gap-1.5 text-emerald-400 hover:underline"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Command Center</span>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/products/new" className="hover:text-white transition-colors">
                    New Product Studio
                  </Link>
                </li>
                <li>
                  <Link href="/admin/orders" className="hover:text-white transition-colors">
                    Order Fulfillment & CRM
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Guarantees */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <p>© 2026 ECWEARABLE Systems Inc. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <span>7-Day Sizing Guarantee</span>{" "}
            <span>256-Bit SSL Encrypted</span>{" "}
            <span>Dhaka Metro &amp; Nationwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
