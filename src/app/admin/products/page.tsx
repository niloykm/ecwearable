"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PackagePlus, Trash2, ExternalLink, Search } from "lucide-react";
import { useCommerceStore } from "@/store/useCommerceStore";
import { formatPrice } from "@/lib/utils";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DEFAULT_PRODUCT_IMAGE, optimizeCloudinaryUrl } from "@/lib/cloudinary";
import { SafeImage } from "@/components/ui/SafeImage";

export default function AdminProductsPage() {
  const { products, deleteProduct, currency } = useCommerceStore();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(q) ||
      p.dressType.toLowerCase().includes(q) ||
      p.fabricType.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q);

    const matchesCategory = categoryFilter === "all" || p.mainCategory === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-700 dark:text-emerald-400 font-semibold block mb-1">
              MERCHANDISING STUDIO
            </span>
            <h1 className="font-sans text-2xl sm:text-3xl font-black uppercase tracking-tight tabular-nums">
              All Garment &amp; Wearable SKUs ({products.length})
            </h1>
          </div>

          <Link
            href="/admin/products/new"
            className="px-4 py-2.5 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-sans uppercase tracking-wider font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-sm transition-colors flex items-center gap-2 self-start"
          >
            <PackagePlus className="w-4 h-4" />
            <span>Create New SKU</span>
          </Link>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2 w-full sm:w-80 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-sm px-3 py-2">
            <Search className="w-4 h-4 text-zinc-500 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search by name, fabric, typology..."
              aria-label="Search SKU catalog"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-xs outline-none w-full font-sans"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <label htmlFor="admin-dept-filter" className="text-xs font-mono text-zinc-500 uppercase">
              Department:
            </label>
            <select
              id="admin-dept-filter"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-sm text-xs px-3 py-2 outline-none cursor-pointer"
            >
              <option value="all">All Departments ({products.length})</option>
              <option value="OUTERWEAR">Technical Outerwear</option>
              <option value="BASICS">Everyday Basics</option>
              <option value="ACCESSORIES">Technical Accessories</option>
              <option value="GARMENTS">Apparel &amp; Garments</option>
              <option value="WEARABLES">Wearables &amp; Watches</option>
              <option value="FOOTWEAR">Footwear</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 font-mono uppercase text-zinc-500 bg-white dark:bg-zinc-950">
                <th className="py-3 px-4">Garment / Wearable</th>
                <th className="py-3 px-3">Typology &amp; Dept</th>
                <th className="py-3 px-3">Fabric &amp; Weight</th>
                <th className="py-3 px-3">Price</th>
                <th className="py-3 px-3">Size Matrix &amp; Stock</th>
                <th className="py-3 px-3">Flags</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 font-sans">
              {filtered.map((product) => {
                const totalStock = product.sizes.reduce((sum, s) => sum + s.stock, 0);
                const primaryImg = product.colorVariants[0]?.images[0] || DEFAULT_PRODUCT_IMAGE;

                return (
                  <tr key={product.id} className="hover:bg-white dark:hover:bg-zinc-950 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-16 bg-zinc-100 dark:bg-zinc-800 overflow-hidden border border-zinc-200 dark:border-zinc-700 flex-shrink-0">
                          <SafeImage
                            src={optimizeCloudinaryUrl(primaryImg, { width: 100, height: 130 })}
                            alt={product.name}
                            fill
                            sizes="48px"
                            className="object-cover object-top"
                          />
                        </div>
                        <div className="min-w-0">
                          <Link
                            href={`/product/${product.slug}`}
                            className="font-semibold hover:underline line-clamp-1"
                          >
                            {product.name}
                          </Link>
                          <span className="text-[10px] font-mono text-zinc-500 block mt-0.5 truncate max-w-[200px]">
                            SKU: {product.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <span className="font-mono font-medium block">{product.dressType}</span>
                      <span className="text-[10px] font-mono text-zinc-500">
                        {product.mainCategory} · {product.gender}
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      <span className="font-medium block">{product.fabricType}</span>
                      {product.fabricWeightGsm && (
                        <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 tabular-nums">
                          {product.fabricWeightGsm} GSM
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-3 font-mono font-bold tabular-nums whitespace-nowrap">
                      {formatPrice(product.discountPrice || product.basePrice, currency)}
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex flex-wrap gap-1 max-w-[180px]">
                        {product.sizes.map((s) => (
                          <span
                            key={s.sizeLabel}
                            className={`px-1.5 py-0.5 text-[10px] font-mono border tabular-nums ${
                              s.stock < 5
                                ? "bg-orange-50 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800"
                                : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-700"
                            }`}
                          >
                            {s.sizeLabel}: {s.stock}
                          </span>
                        ))}
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500 block mt-1 tabular-nums">
                        Total: {totalStock} units
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex flex-col gap-1 items-start">
                        {product.isNewCollection && (
                          <span className="px-2 py-0.5 text-[10px] font-mono uppercase font-semibold bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
                            New
                          </span>
                        )}
                        {product.isTrending && (
                          <span className="px-2 py-0.5 text-[10px] font-mono uppercase font-semibold bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                            Trending
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/product/${product.slug}`}
                          className="p-1.5 text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors"
                          title="View on Storefront"
                          aria-label={`View ${product.name}`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Delete SKU "${product.name}"?`)) {
                              deleteProduct(product.id);
                            }
                          }}
                          className="p-1.5 text-zinc-500 hover:text-red-600 transition-colors"
                          title="Delete SKU"
                          aria-label={`Delete ${product.name}`}
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
