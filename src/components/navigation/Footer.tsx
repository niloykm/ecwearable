import React from "react";
import Link from "next/link";
import { ShieldCheck, Sparkles, Compass, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#141413] text-[#FAF8F5] pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Brand Statement Banner */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-neutral-800">
          <div className="md:col-span-5">
            <span className="text-[10px] tracking-[0.35em] uppercase font-sans text-[#C5A059] block mb-2">
              Atelier Vêtements & Horology
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal leading-snug tracking-tight">
              Quiet sartorial architecture tailored for longevity, tactile luxury, and everyday ceremony.
            </h3>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-[11px] font-mono tracking-editorial uppercase text-[#C5A059] mb-4">
                Collections
              </h4>
              <ul className="space-y-2.5 text-xs font-sans text-neutral-400">
                <li>
                  <Link href="/shop?gender=MALE" className="hover:text-white transition-colors">
                    Men&apos;s Sartorial
                  </Link>
                </li>
                <li>
                  <Link href="/shop?gender=FEMALE" className="hover:text-white transition-colors">
                    Women&apos;s Atelier
                  </Link>
                </li>
                <li>
                  <Link href="/shop?ageGroup=CHILDREN" className="hover:text-white transition-colors">
                    Children&apos;s Edit
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=WEARABLES" className="hover:text-white transition-colors">
                    Timepieces & Wearables
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=FOOTWEAR" className="hover:text-white transition-colors">
                    Handmade Footwear
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-mono tracking-editorial uppercase text-[#C5A059] mb-4">
                Craftsmanship
              </h4>
              <ul className="space-y-2.5 text-xs font-sans text-neutral-400">
                <li>
                  <Link href="/fabric-guide" className="hover:text-white transition-colors">
                    Tactile Fabric Guide
                  </Link>
                </li>
                <li>
                  <span className="text-neutral-500">Normandy French Flax</span>
                </li>
                <li>
                  <span className="text-neutral-500">Dhakai Pit Loom Muslin</span>
                </li>
                <li>
                  <span className="text-neutral-500">Giza 87 Egyptian Cotton</span>
                </li>
                <li>
                  <span className="text-neutral-500">316L Marine Horology</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-mono tracking-editorial uppercase text-[#C5A059] mb-4">
                Command Studio
              </h4>
              <ul className="space-y-2.5 text-xs font-sans text-neutral-400">
                <li>
                  <Link
                    href="/admin"
                    className="flex items-center gap-1.5 text-[#C5A059] hover:underline"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Admin Command Center</span>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/products/new" className="hover:text-white transition-colors">
                    Product Studio & Sizer
                  </Link>
                </li>
                <li>
                  <Link href="/admin/orders" className="hover:text-white transition-colors">
                    Fulfillment & CRM
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-neutral-500">
          <div className="flex items-center gap-6">
            <span className="font-serif tracking-widest text-sm text-white">AURELIA</span>
            <span>© {new Date().getFullYear()} Aurelia Studio Ltd. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>Dhaka Metro • London • Paris</span>
            <span>•</span>
            <span className="text-[#2D4A3E]">100% Traceable Fabrics</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
