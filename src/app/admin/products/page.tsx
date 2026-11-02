"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PackagePlus,
  Trash2,
  Edit,
  ExternalLink,
  Search,
  Filter,
  Check,
} from "lucide-react";
import { useCommerceStore } from "@/store/useCommerceStore";
import { formatPrice } from "@/lib/utils";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/Badge";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";

export default function AdminProductsPage() {
  const { products, deleteProduct, currency } = useCommerceStore();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.dressType.toLowerCase().includes(search.toLowerCase()) ||
      p.fabricType.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || p.mainCategory === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#C5A059] block mb-1">
              Merchandising Studio
            </span>
            <h1 className="font-serif text-3xl font-light">
              All Garment & Wearable SKUs ({products.length})
            </h1>
          </div>

          <Link
            href="/admin/products/new"
            className="px-4 py-2.5 bg-[#181816] text-[#FAF8F5] text-xs font-sans uppercase tracking-wider hover:bg-neutral-800 transition-colors flex items-center gap-2 self-start"
          >
            <PackagePlus className="w-4 h-4 text-[#C5A059]" />
            <span>Create New Garment / Wearable</span>
          </Link>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 bg-canvas-elevated border border-border-subtle flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2 w-full sm:w-80 bg-canvas border border-border-subtle px-3 py-2">
            <Search className="w-4 h-4 text-ink-muted" />
            <input
              type="text"
              placeholder="Search by name, fabric, typology..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-xs text-ink outline-none w-full font-sans"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-xs font-mono text-ink-muted uppercase">Department:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-canvas border border-border-subtle text-xs px-3 py-2 text-ink outline-none cursor-pointer"
            >
              <option value="all">All Departments</option>
              <option value="GARMENTS">Apparel & Garments</option>
              <option value="WEARABLES">Wearables & Watches</option>
              <option value="FOOTWEAR">Footwear</option>
            </select>
          </div>
        </div>

        {/* Table of SKUs */}
        <div className="border border-border-subtle bg-canvas-elevated overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border-subtle font-mono uppercase text-ink-muted bg-canvas">
                <th className="py-3 px-4">Garment / Wearable</th>
                <th className="py-3 px-3">Typology & Demographic</th>
                <th className="py-3 px-3">Fabric & Weight</th>
                <th className="py-3 px-3">Price</th>
                <th className="py-3 px-3">Size Matrix & Stock</th>
                <th className="py-3 px-3">Merchandising</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle font-sans">
              {filtered.map((product) => {
                const totalStock = product.sizes.reduce((sum, s) => sum + s.stock, 0);
                const primaryImg =
                  product.colorVariants[0]?.images[0] ||
                  "https://res.cloudinary.com/dg5gwims9/image/upload/v1793617661/aurelia_studio/img_1596755094514f87.jpg";

                return (
                  <tr key={product.id} className="hover:bg-canvas transition-colors">
                    {/* Item */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-16 bg-white overflow-hidden border border-border-subtle flex-shrink-0">
                          <Image
                            src={optimizeCloudinaryUrl(primaryImg, { width: 100, height: 130 })}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <Link
                            href={`/product/${product.slug}`}
                            target="_blank"
                            className="font-medium text-ink hover:underline line-clamp-1"
                          >
                            {product.name}
                          </Link>
                          <span className="text-[10px] font-mono text-ink-muted block mt-0.5">
                            SKU: {product.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Typology */}
                    <td className="py-3 px-3">
                      <span className="font-mono font-medium block text-ink">
                        {product.dressType}
                      </span>
                      <span className="text-[10px] font-mono text-ink-muted">
                        {product.gender} ({product.ageGroup})
                      </span>
                    </td>

                    {/* Fabric */}
                    <td className="py-3 px-3">
                      <span className="text-ink font-medium block">
                        {product.fabricType}
                      </span>
                      {product.fabricWeightGsm && (
                        <span className="text-[10px] font-mono text-[#2D4A3E]">
                          {product.fabricWeightGsm} GSM
                        </span>
                      )}
                    </td>

                    {/* Price */}
                    <td className="py-3 px-3 font-mono font-bold text-ink">
                      {formatPrice(product.discountPrice || product.basePrice, currency)}
                    </td>

                    {/* Sizes & Stock */}
                    <td className="py-3 px-3">
                      <div className="flex flex-wrap gap-1 max-w-[180px]">
                        {product.sizes.map((s) => (
                          <span
                            key={s.sizeLabel}
                            className={`px-1.5 py-0.5 text-[10px] font-mono border ${
                              s.stock < 5
                                ? "bg-[#9E4733]/10 text-[#9E4733] border-[#9E4733]/30"
                                : "bg-canvas text-ink border-border-subtle"
                            }`}
                            title={`${s.sizeLabel}: ${s.stock} in stock`}
                          >
                            {s.sizeLabel}:{s.stock}
                          </span>
                        ))}
                      </div>
                      <span className="text-[10px] font-mono text-ink-muted block mt-1">
                        Total: {totalStock} units
                      </span>
                    </td>

                    {/* Merchandising */}
                    <td className="py-3 px-3">
                      <div className="flex flex-col gap-1">
                        {product.isNewCollection && (
                          <Badge variant="terracotta">New Collection</Badge>
                        )}
                        {product.isTrending && (
                          <Badge variant="brass">Trending</Badge>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/product/${product.slug}`}
                          target="_blank"
                          className="p-1.5 text-ink-muted hover:text-ink transition-colors"
                          title="View on Storefront"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => {
                            if (confirm(`Delete SKU "${product.name}"?`)) {
                              deleteProduct(product.id);
                            }
                          }}
                          className="p-1.5 text-ink-muted hover:text-[#9E4733] transition-colors"
                          title="Delete SKU"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
