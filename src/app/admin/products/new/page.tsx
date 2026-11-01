"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Ruler,
  UploadCloud,
  Check,
  Plus,
  Trash2,
  Sparkles,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { useCommerceStore } from "@/store/useCommerceStore";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  Product,
  SizeMeasurement,
  ColorVariant,
  TargetGender,
  AgeGroup,
  MainCategory,
  FabricOrMaterial,
} from "@/types/commerce";
import { inchToCm, cmToInch } from "@/lib/utils";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";

export default function AdminNewProductPage() {
  const router = useRouter();
  const { addProduct } = useCommerceStore();

  // Core product attributes
  const [name, setName] = useState("Artisan Linen Summer Tunic");
  const [subtitle, setSubtitle] = useState("Breathable 190 GSM French flax with mandarin collar");
  const [dressType, setDressType] = useState("Linen Shirt");
  const [mainCategory, setMainCategory] = useState<MainCategory>("GARMENTS");
  const [gender, setGender] = useState<TargetGender>("MALE");
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("ADULT");
  const [fabricType, setFabricType] = useState<FabricOrMaterial>("Pure European Linen");
  const [fabricWeightGsm, setFabricWeightGsm] = useState<number>(190);
  const [fitType, setFitType] = useState<Product["fitType"]>("Relaxed Fit");
  const [careInstructions, setCareInstructions] = useState("Machine wash cold inside out, hang to dry. Warm iron.");
  const [basePrice, setBasePrice] = useState<number>(3650);
  const [discountPrice, setDiscountPrice] = useState<number | undefined>(undefined);
  const [isNewCollection, setIsNewCollection] = useState<boolean>(true);
  const [isTrending, setIsTrending] = useState<boolean>(true);
  const [isFeatured, setIsFeatured] = useState<boolean>(true);
  const [description, setDescription] = useState(
    "A relaxed atelier tunic cut from organic Normandy flax. Breathable, durable, and naturally moisture-wicking."
  );

  // Color & Image Builder
  const [primaryColor, setPrimaryColor] = useState("Ecru Alabaster");
  const [primaryColorHex, setPrimaryColorHex] = useState("#F2EFE9");
  const [imageUrlInput, setImageUrlInput] = useState(
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80"
  );
  const [hoverImageUrlInput, setHoverImageUrlInput] = useState(
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80"
  );

  // Dynamic Size Matrix Builder with Auto-Converting Dual-Unit Engine
  const [sizes, setSizes] = useState<SizeMeasurement[]>([
    {
      sizeLabel: "S",
      stock: 12,
      skuSuffix: "S",
      measurementsInch: { chest: 38, shoulder: 17.5, length: 28.5, sleeve: 24.5 },
      measurementsCm: { chest: 96.5, shoulder: 44.5, length: 72.4, sleeve: 62.2 },
    },
    {
      sizeLabel: "M",
      stock: 20,
      skuSuffix: "M",
      measurementsInch: { chest: 40.5, shoulder: 18, length: 29.5, sleeve: 25 },
      measurementsCm: { chest: 102.9, shoulder: 45.7, length: 74.9, sleeve: 63.5 },
    },
    {
      sizeLabel: "L",
      stock: 16,
      skuSuffix: "L",
      measurementsInch: { chest: 43, shoulder: 18.8, length: 30.5, sleeve: 25.5 },
      measurementsCm: { chest: 109.2, shoulder: 47.8, length: 77.5, sleeve: 64.8 },
    },
  ]);

  // Handler for entering an Inch measurement -> auto converts and populates CM
  const handleInchChange = (
    sizeIndex: number,
    field: keyof SizeMeasurement["measurementsInch"],
    val: string
  ) => {
    const num = parseFloat(val);
    const newSizes = [...sizes];
    const inchObj = { ...newSizes[sizeIndex].measurementsInch };
    const cmObj = { ...newSizes[sizeIndex].measurementsCm };

    if (isNaN(num)) {
      delete inchObj[field];
      delete cmObj[field];
    } else {
      inchObj[field] = num;
      cmObj[field] = inchToCm(num); // Auto calculate CM
    }

    newSizes[sizeIndex] = {
      ...newSizes[sizeIndex],
      measurementsInch: inchObj,
      measurementsCm: cmObj,
    };
    setSizes(newSizes);
  };

  // Handler for entering a CM measurement -> auto converts and populates Inches
  const handleCmChange = (
    sizeIndex: number,
    field: keyof SizeMeasurement["measurementsCm"],
    val: string
  ) => {
    const num = parseFloat(val);
    const newSizes = [...sizes];
    const inchObj = { ...newSizes[sizeIndex].measurementsInch };
    const cmObj = { ...newSizes[sizeIndex].measurementsCm };

    if (isNaN(num)) {
      delete inchObj[field];
      delete cmObj[field];
    } else {
      cmObj[field] = num;
      inchObj[field] = cmToInch(num); // Auto calculate Inches
    }

    newSizes[sizeIndex] = {
      ...newSizes[sizeIndex],
      measurementsInch: inchObj,
      measurementsCm: cmObj,
    };
    setSizes(newSizes);
  };

  const handleStockChange = (sizeIndex: number, val: string) => {
    const num = parseInt(val, 10);
    const newSizes = [...sizes];
    newSizes[sizeIndex].stock = isNaN(num) ? 0 : num;
    setSizes(newSizes);
  };

  const addNewSizeRow = () => {
    setSizes([
      ...sizes,
      {
        sizeLabel: "XL",
        stock: 10,
        skuSuffix: "XL",
        measurementsInch: { chest: 45, shoulder: 19.5, length: 31.5, sleeve: 26 },
        measurementsCm: { chest: 114.3, shoulder: 49.5, length: 80.0, sleeve: 66.0 },
      },
    ]);
  };

  const removeSizeRow = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const newProduct: Product = {
      id: `prod-custom-${Date.now()}`,
      slug,
      name,
      subtitle,
      dressType,
      mainCategory,
      gender,
      ageGroup,
      fabricType,
      fabricWeightGsm: Number(fabricWeightGsm),
      careInstructions,
      fitType,
      basePrice: Number(basePrice),
      discountPrice: discountPrice ? Number(discountPrice) : undefined,
      currency: "BDT",
      primaryColor,
      primaryColorHex,
      colorVariants: [
        {
          colorName: primaryColor,
          colorHex: primaryColorHex,
          images: [imageUrlInput, hoverImageUrlInput].filter(Boolean),
        },
      ],
      sizes,
      isNewCollection,
      isTrending,
      isFeatured,
      rating: 5.0,
      reviewsCount: 1,
      createdAt: new Date().toISOString(),
      description,
      editorialHighlights: [
        `${fabricType} provenance`,
        `${fabricWeightGsm} GSM density`,
        "Hand-finished French seams",
        "Atelier guaranteed",
      ],
    };

    addProduct(newProduct);
    router.push(`/product/${newProduct.slug}`);
  };

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-6">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#C5A059] block mb-1">
              Garment & Wearable Engineering Studio
            </span>
            <h1 className="font-serif text-3xl font-light">
              Create & Publish New SKU
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="px-6 py-3 bg-[#181816] text-[#FAF8F5] text-xs font-sans uppercase tracking-editorial font-medium hover:bg-neutral-800 transition-colors flex items-center gap-2"
            >
              <Check className="w-4 h-4 text-[#C5A059]" />
              <span>Publish To Live Storefront</span>
            </button>
          </div>
        </div>

        {/* =========================================================
            SECTION 1: CORE IDENTITY
           ========================================================= */}
        <div className="p-6 bg-canvas-elevated border border-border-subtle space-y-4">
          <h2 className="font-serif text-xl uppercase font-semibold text-ink border-b border-border-subtle pb-2">
            1. Core Identity & Department
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
            <div>
              <label className="block text-ink-muted uppercase font-mono text-[10px] mb-1">
                Garment / Wearable Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-canvas border border-border-subtle p-2.5 text-sm outline-none font-medium"
              />
            </div>

            <div>
              <label className="block text-ink-muted uppercase font-mono text-[10px] mb-1">
                Subtitle / Texture Spec *
              </label>
              <input
                type="text"
                required
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full bg-canvas border border-border-subtle p-2.5 text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-ink-muted uppercase font-mono text-[10px] mb-1">
                Main Department *
              </label>
              <select
                value={mainCategory}
                onChange={(e) => setMainCategory(e.target.value as MainCategory)}
                className="w-full bg-canvas border border-border-subtle p-2.5 text-xs outline-none cursor-pointer"
              >
                <option value="GARMENTS">Apparel & Garments</option>
                <option value="WEARABLES">Wearables & Horology</option>
                <option value="FOOTWEAR">Footwear</option>
              </select>
            </div>

            <div>
              <label className="block text-ink-muted uppercase font-mono text-[10px] mb-1">
                Specific Typology / Dress Type *
              </label>
              <input
                type="text"
                required
                value={dressType}
                onChange={(e) => setDressType(e.target.value)}
                placeholder="Panjabi, Linen Shirt, Saree, Chronograph Watch, Chelsea Boots..."
                className="w-full bg-canvas border border-border-subtle p-2.5 text-xs outline-none"
              />
            </div>

            <div>
              <label className="block text-ink-muted uppercase font-mono text-[10px] mb-1">
                Target Gender *
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as TargetGender)}
                className="w-full bg-canvas border border-border-subtle p-2.5 text-xs outline-none cursor-pointer"
              >
                <option value="MALE">Male (Men)</option>
                <option value="FEMALE">Female (Women)</option>
                <option value="KIDS_BOY">Kids (Boy)</option>
                <option value="KIDS_GIRL">Kids (Girl)</option>
                <option value="UNISEX">Unisex</option>
              </select>
            </div>

            <div>
              <label className="block text-ink-muted uppercase font-mono text-[10px] mb-1">
                Age Demographic *
              </label>
              <select
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value as AgeGroup)}
                className="w-full bg-canvas border border-border-subtle p-2.5 text-xs outline-none cursor-pointer"
              >
                <option value="ADULT">Adult</option>
                <option value="CHILDREN">Children / Kids</option>
                <option value="TODDLER">Toddler / Infant</option>
              </select>
            </div>
          </div>
        </div>

        {/* =========================================================
            SECTION 2: FABRIC & MATERIAL ENGINEERING
           ========================================================= */}
        <div className="p-6 bg-canvas-elevated border border-border-subtle space-y-4">
          <h2 className="font-serif text-xl uppercase font-semibold text-ink border-b border-border-subtle pb-2">
            2. Fabric & Material Engineering
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
            <div>
              <label className="block text-ink-muted uppercase font-mono text-[10px] mb-1">
                Fabric / Material Taxonomy *
              </label>
              <select
                value={fabricType}
                onChange={(e) => setFabricType(e.target.value as FabricOrMaterial)}
                className="w-full bg-canvas border border-border-subtle p-2.5 text-xs outline-none cursor-pointer"
              >
                <option value="Pure European Linen">Pure European Linen</option>
                <option value="100% Organic Cotton">100% Organic Cotton</option>
                <option value="Egyptian Giza Cotton">Egyptian Giza Cotton</option>
                <option value="Dhakai Jamdani / Muslin">Dhakai Jamdani / Muslin</option>
                <option value="Mulberry Silk">Mulberry Silk</option>
                <option value="Raw Japanese Denim">Raw Japanese Denim</option>
                <option value="Merino Wool">Merino Wool</option>
                <option value="Full-Grain Italian Leather">Full-Grain Italian Leather</option>
                <option value="316L Surgical Stainless Steel">316L Surgical Stainless Steel</option>
                <option value="Fine Cashmere Blend">Fine Cashmere Blend</option>
              </select>
            </div>

            <div>
              <label className="block text-ink-muted uppercase font-mono text-[10px] mb-1">
                Fabric Weight (GSM)
              </label>
              <input
                type="number"
                value={fabricWeightGsm}
                onChange={(e) => setFabricWeightGsm(Number(e.target.value))}
                className="w-full bg-canvas border border-border-subtle p-2.5 text-xs outline-none"
              />
            </div>

            <div>
              <label className="block text-ink-muted uppercase font-mono text-[10px] mb-1">
                Silhouette Fit Type *
              </label>
              <select
                value={fitType}
                onChange={(e) => setFitType(e.target.value as any)}
                className="w-full bg-canvas border border-border-subtle p-2.5 text-xs outline-none cursor-pointer"
              >
                <option value="Relaxed Fit">Relaxed Fit</option>
                <option value="Tailored Fit">Tailored Fit</option>
                <option value="Regular Fit">Regular Fit</option>
                <option value="Oversized">Oversized</option>
                <option value="Adjustable">Adjustable</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-ink-muted uppercase font-mono text-[10px] mb-1">
                Care & Washing Instructions
              </label>
              <input
                type="text"
                value={careInstructions}
                onChange={(e) => setCareInstructions(e.target.value)}
                className="w-full bg-canvas border border-border-subtle p-2.5 text-xs outline-none"
              />
            </div>
          </div>
        </div>

        {/* =========================================================
            SECTION 3: AUTO-CONVERTING DUAL-UNIT SIZE MATRIX BUILDER
           ========================================================= */}
        <div className="p-6 bg-canvas-elevated border border-border-subtle space-y-4">
          <div className="flex items-center justify-between border-b border-border-subtle pb-2">
            <div>
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-[#C5A059]" />
                <h2 className="font-serif text-xl uppercase font-semibold text-ink">
                  3. Size Matrix & Dual [INCH ↔ CM] Auto-Calculator
                </h2>
              </div>
              <p className="text-[11px] font-sans text-ink-muted mt-0.5">
                Type in <strong>Inches</strong> and <strong>Centimeters</strong> automatically populates (`val * 2.54`), or vice-versa!
              </p>
            </div>

            <button
              type="button"
              onClick={addNewSizeRow}
              className="px-3 py-1.5 bg-[#181816] text-[#FAF8F5] text-xs font-mono uppercase flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Size Row</span>
            </button>
          </div>

          <div className="space-y-4">
            {sizes.map((s, idx) => (
              <div
                key={idx}
                className="p-4 bg-canvas border border-border-subtle space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold text-ink">
                      Size: {s.sizeLabel}
                    </span>
                    <input
                      type="text"
                      value={s.sizeLabel}
                      onChange={(e) => {
                        const newSizes = [...sizes];
                        newSizes[idx].sizeLabel = e.target.value;
                        setSizes(newSizes);
                      }}
                      className="w-20 bg-canvas-elevated border border-border-subtle px-2 py-1 text-xs font-mono text-center font-bold"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-ink-muted uppercase">Stock:</span>
                      <input
                        type="number"
                        min="0"
                        value={s.stock}
                        onChange={(e) => handleStockChange(idx, e.target.value)}
                        className="w-16 bg-canvas-elevated border border-border-subtle px-2 py-1 text-xs font-mono text-center font-bold"
                      />
                    </div>

                    {sizes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSizeRow(idx)}
                        className="text-ink-muted hover:text-[#9E4733] p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Dual Input Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                  {/* Chest */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-ink-muted uppercase block">Chest:</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        step="0.1"
                        placeholder="Inches"
                        value={s.measurementsInch.chest ?? ""}
                        onChange={(e) => handleInchChange(idx, "chest", e.target.value)}
                        className="w-1/2 p-1.5 border border-border-subtle text-xs bg-canvas-elevated"
                      />
                      <span className="text-[10px] text-ink-muted">&quot;</span>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="cm"
                        value={s.measurementsCm.chest ?? ""}
                        onChange={(e) => handleCmChange(idx, "chest", e.target.value)}
                        className="w-1/2 p-1.5 border border-border-subtle text-xs bg-canvas-elevated"
                      />
                      <span className="text-[10px] text-ink-muted">cm</span>
                    </div>
                  </div>

                  {/* Length */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-ink-muted uppercase block">Length:</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        step="0.1"
                        placeholder="Inches"
                        value={s.measurementsInch.length ?? ""}
                        onChange={(e) => handleInchChange(idx, "length", e.target.value)}
                        className="w-1/2 p-1.5 border border-border-subtle text-xs bg-canvas-elevated"
                      />
                      <span className="text-[10px] text-ink-muted">&quot;</span>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="cm"
                        value={s.measurementsCm.length ?? ""}
                        onChange={(e) => handleCmChange(idx, "length", e.target.value)}
                        className="w-1/2 p-1.5 border border-border-subtle text-xs bg-canvas-elevated"
                      />
                      <span className="text-[10px] text-ink-muted">cm</span>
                    </div>
                  </div>

                  {/* Shoulder */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-ink-muted uppercase block">Shoulder:</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        step="0.1"
                        placeholder="Inches"
                        value={s.measurementsInch.shoulder ?? ""}
                        onChange={(e) => handleInchChange(idx, "shoulder", e.target.value)}
                        className="w-1/2 p-1.5 border border-border-subtle text-xs bg-canvas-elevated"
                      />
                      <span className="text-[10px] text-ink-muted">&quot;</span>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="cm"
                        value={s.measurementsCm.shoulder ?? ""}
                        onChange={(e) => handleCmChange(idx, "shoulder", e.target.value)}
                        className="w-1/2 p-1.5 border border-border-subtle text-xs bg-canvas-elevated"
                      />
                      <span className="text-[10px] text-ink-muted">cm</span>
                    </div>
                  </div>

                  {/* Sleeve */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-ink-muted uppercase block">Sleeve:</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        step="0.1"
                        placeholder="Inches"
                        value={s.measurementsInch.sleeve ?? ""}
                        onChange={(e) => handleInchChange(idx, "sleeve", e.target.value)}
                        className="w-1/2 p-1.5 border border-border-subtle text-xs bg-canvas-elevated"
                      />
                      <span className="text-[10px] text-ink-muted">&quot;</span>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="cm"
                        value={s.measurementsCm.sleeve ?? ""}
                        onChange={(e) => handleCmChange(idx, "sleeve", e.target.value)}
                        className="w-1/2 p-1.5 border border-border-subtle text-xs bg-canvas-elevated"
                      />
                      <span className="text-[10px] text-ink-muted">cm</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================
            SECTION 4: COLOR SWATCH & CLOUDINARY IMAGES
           ========================================================= */}
        <div className="p-6 bg-canvas-elevated border border-border-subtle space-y-4">
          <h2 className="font-serif text-xl uppercase font-semibold text-ink border-b border-border-subtle pb-2">
            4. Color Swatch & Visual Asset Photography
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
            <div>
              <label className="block text-ink-muted uppercase font-mono text-[10px] mb-1">
                Color Name *
              </label>
              <input
                type="text"
                required
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                placeholder="Ecru Alabaster, Terracotta, Midnight Espresso..."
                className="w-full bg-canvas border border-border-subtle p-2.5 text-xs outline-none"
              />
            </div>

            <div>
              <label className="block text-ink-muted uppercase font-mono text-[10px] mb-1">
                Color Hex Code *
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={primaryColorHex}
                  onChange={(e) => setPrimaryColorHex(e.target.value)}
                  className="w-10 h-10 border border-border-subtle cursor-pointer"
                />
                <input
                  type="text"
                  value={primaryColorHex}
                  onChange={(e) => setPrimaryColorHex(e.target.value)}
                  className="w-full bg-canvas border border-border-subtle p-2.5 text-xs font-mono uppercase"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-ink-muted uppercase font-mono text-[10px] mb-1">
                Primary Editorial Image URL (Cloudinary / Unsplash) *
              </label>
              <input
                type="url"
                required
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                className="w-full bg-canvas border border-border-subtle p-2.5 text-xs font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-ink-muted uppercase font-mono text-[10px] mb-1">
                Secondary / Hover Detail Image URL
              </label>
              <input
                type="url"
                value={hoverImageUrlInput}
                onChange={(e) => setHoverImageUrlInput(e.target.value)}
                className="w-full bg-canvas border border-border-subtle p-2.5 text-xs font-mono"
              />
            </div>
          </div>

          {/* Visual Preview */}
          <div className="pt-2">
            <span className="text-[10px] font-mono uppercase text-ink-muted block mb-2">
              Cloudinary f_auto,q_auto Optimized Preview:
            </span>
            <div className="flex items-center gap-4">
              {imageUrlInput && (
                <div className="relative w-20 h-26 bg-white overflow-hidden border border-border-subtle">
                  <Image
                    src={optimizeCloudinaryUrl(imageUrlInput, { width: 160, height: 210 })}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              {hoverImageUrlInput && (
                <div className="relative w-20 h-26 bg-white overflow-hidden border border-border-subtle">
                  <Image
                    src={optimizeCloudinaryUrl(hoverImageUrlInput, { width: 160, height: 210 })}
                    alt="Hover Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* =========================================================
            SECTION 5: PRICING & MERCHANDISING FLAGS
           ========================================================= */}
        <div className="p-6 bg-canvas-elevated border border-border-subtle space-y-4">
          <h2 className="font-serif text-xl uppercase font-semibold text-ink border-b border-border-subtle pb-2">
            5. Pricing & Merchandising Placement
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
            <div>
              <label className="block text-ink-muted uppercase font-mono text-[10px] mb-1">
                Base Retail Price (BDT) *
              </label>
              <input
                type="number"
                required
                value={basePrice}
                onChange={(e) => setBasePrice(Number(e.target.value))}
                className="w-full bg-canvas border border-border-subtle p-2.5 text-sm font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-ink-muted uppercase font-mono text-[10px] mb-1">
                Discount / Sale Price (BDT, Optional)
              </label>
              <input
                type="number"
                value={discountPrice ?? ""}
                onChange={(e) =>
                  setDiscountPrice(e.target.value ? Number(e.target.value) : undefined)
                }
                className="w-full bg-canvas border border-border-subtle p-2.5 text-sm font-mono"
              />
            </div>
          </div>

          {/* Flags */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <label className="flex items-center gap-3 p-3 bg-canvas border border-border-subtle cursor-pointer">
              <input
                type="checkbox"
                checked={isNewCollection}
                onChange={(e) => setIsNewCollection(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-xs font-sans font-medium text-ink">
                ✨ New Collection Flag
              </span>
            </label>

            <label className="flex items-center gap-3 p-3 bg-canvas border border-border-subtle cursor-pointer">
              <input
                type="checkbox"
                checked={isTrending}
                onChange={(e) => setIsTrending(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-xs font-sans font-medium text-ink">
                🔥 Trending Now Flag
              </span>
            </label>

            <label className="flex items-center gap-3 p-3 bg-canvas border border-border-subtle cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-xs font-sans font-medium text-ink">
                ⭐ Featured on Homepage
              </span>
            </label>
          </div>
        </div>

        {/* Bottom Publish Bar */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-8 py-4 bg-[#181816] text-[#FAF8F5] text-xs font-sans uppercase tracking-editorial font-medium hover:bg-neutral-800 transition-colors flex items-center gap-2"
          >
            <Check className="w-4 h-4 text-[#C5A059]" />
            <span>Publish New SKU To Live Catalog</span>
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
