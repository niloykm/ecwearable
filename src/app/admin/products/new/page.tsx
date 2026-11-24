"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Ruler, Check, Plus, Trash2, Upload, Loader2 } from "lucide-react";
import { useCommerceStore } from "@/store/useCommerceStore";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  Product,
  SizeMeasurement,
  TargetGender,
  AgeGroup,
  MainCategory,
  FabricOrMaterial,
} from "@/types/commerce";
import { inchToCm, cmToInch } from "@/lib/utils";
import {
  DEFAULT_PRODUCT_IMAGE,
  getGarmentObjectPosition,
  optimizeCloudinaryUrl,
  uploadImageToCloudinary,
} from "@/lib/cloudinary";
import { SafeImage } from "@/components/ui/SafeImage";

export default function AdminNewProductPage() {
  const router = useRouter();
  const { addProduct, products } = useCommerceStore();

  const [name, setName] = useState("Technical Merino Transit Overshirt");
  const [subtitle, setSubtitle] = useState("280 GSM Heavyweight French Terry with articulated gussets");
  const [dressType, setDressType] = useState("Overshirt");
  const [mainCategory, setMainCategory] = useState<MainCategory>("OUTERWEAR");
  const [gender, setGender] = useState<TargetGender>("UNISEX");
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("ADULT");
  const [fabricType, setFabricType] = useState<FabricOrMaterial>("Heavyweight French Terry (280 GSM)");
  const [fabricWeightGsm, setFabricWeightGsm] = useState<number>(280);
  const [fitType, setFitType] = useState<Product["fitType"]>("Boxy Fit");
  const [careInstructions, setCareInstructions] = useState(
    "Machine wash cold inside out, hang dry in shade. Do not bleach."
  );
  const [basePrice, setBasePrice] = useState<number>(3650);
  const [discountPrice, setDiscountPrice] = useState<number | undefined>(undefined);
  const [isNewCollection, setIsNewCollection] = useState<boolean>(true);
  const [isTrending, setIsTrending] = useState<boolean>(true);
  const [isFeatured, setIsFeatured] = useState<boolean>(true);
  const [description, setDescription] = useState(
    "Structured everyday overshirt engineered for urban transit with reinforced flatlock seams and breathable thermal regulation."
  );

  const [primaryColor, setPrimaryColor] = useState("Obsidian Charcoal");
  const [primaryColorHex, setPrimaryColorHex] = useState("#18181B");
  const [imageUrlInput, setImageUrlInput] = useState(DEFAULT_PRODUCT_IMAGE);
  const [hoverImageUrlInput, setHoverImageUrlInput] = useState(
    "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526180/ecwearable/editorial/cat-windbreakers.webp"
  );
  const [uploadingSlot, setUploadingSlot] = useState<"primary" | "secondary" | null>(null);
  const [uploadError, setUploadError] = useState<string>("");

  const handleCloudinaryUpload = async (
    slot: "primary" | "secondary",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError("");
    setUploadingSlot(slot);
    try {
      const uploaded = await uploadImageToCloudinary(file, "ecwearable/products/custom");
      if (slot === "primary") {
        setImageUrlInput(uploaded.secure_url);
      } else {
        setHoverImageUrlInput(uploaded.secure_url);
      }
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : "Cloudinary upload failed");
    } finally {
      setUploadingSlot(null);
      e.target.value = "";
    }
  };

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
      cmObj[field] = inchToCm(num);
    }

    newSizes[sizeIndex] = {
      ...newSizes[sizeIndex],
      measurementsInch: inchObj,
      measurementsCm: cmObj,
    };
    setSizes(newSizes);
  };

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
      inchObj[field] = cmToInch(num);
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
    newSizes[sizeIndex] = { ...newSizes[sizeIndex], stock: isNaN(num) ? 0 : num };
    setSizes(newSizes);
  };

  const addNewSizeRow = () => {
    const nextLabels = ["XL", "XXL", "XS", "3XL"];
    const nextLabel = nextLabels.find((l) => !sizes.some((s) => s.sizeLabel === l)) || `S${sizes.length + 1}`;
    setSizes([
      ...sizes,
      {
        sizeLabel: nextLabel,
        stock: 10,
        skuSuffix: nextLabel,
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

    const baseSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const slugExists = products.some((p) => p.slug === baseSlug);
    const slug = slugExists ? `${baseSlug}-${Date.now().toString().slice(-4)}` : baseSlug;

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
        `${fabricType} build`,
        `${fabricWeightGsm} GSM density`,
        "Reinforced flatlock seam construction",
        "ECWEARABLE quality certified",
      ],
    };

    addProduct(newProduct);
    router.push(`/product/${newProduct.slug}`);
  };

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-700 dark:text-emerald-400 font-semibold block mb-1">
              GARMENT &amp; WEARABLE ENGINEERING STUDIO
            </span>
            <h1 className="font-sans text-2xl sm:text-3xl font-black uppercase tracking-tight">
              Create &amp; Publish New SKU
            </h1>
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-sans uppercase tracking-wider font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-sm transition-colors flex items-center gap-2 self-start sm:self-auto"
          >
            <Check className="w-4 h-4" />
            <span>Publish To Live Storefront</span>
          </button>
        </div>

        {/* Section 1: Core Identity */}
        <div className="p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4">
          <h2 className="font-sans text-base uppercase font-bold border-b border-zinc-200 dark:border-zinc-800 pb-2.5">
            1. Core Identity &amp; Department
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
            <div>
              <label className="block text-zinc-600 dark:text-zinc-400 uppercase font-mono text-[10px] font-semibold mb-1.5">
                Garment / Wearable Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-sm p-2.5 text-sm outline-none font-medium"
              />
            </div>

            <div>
              <label className="block text-zinc-600 dark:text-zinc-400 uppercase font-mono text-[10px] font-semibold mb-1.5">
                Subtitle / Texture Spec *
              </label>
              <input
                type="text"
                required
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-sm p-2.5 text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-zinc-600 dark:text-zinc-400 uppercase font-mono text-[10px] font-semibold mb-1.5">
                Main Department *
              </label>
              <select
                value={mainCategory}
                onChange={(e) => setMainCategory(e.target.value as MainCategory)}
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-sm p-2.5 text-xs outline-none cursor-pointer"
              >
                <option value="OUTERWEAR">Technical Outerwear</option>
                <option value="BASICS">Everyday Basics</option>
                <option value="ACCESSORIES">Technical Accessories</option>
                <option value="GARMENTS">Apparel &amp; Garments</option>
                <option value="WEARABLES">Wearables &amp; Horology</option>
                <option value="FOOTWEAR">Footwear</option>
              </select>
            </div>

            <div>
              <label className="block text-zinc-600 dark:text-zinc-400 uppercase font-mono text-[10px] font-semibold mb-1.5">
                Specific Typology / Dress Type *
              </label>
              <input
                type="text"
                required
                value={dressType}
                onChange={(e) => setDressType(e.target.value)}
                placeholder="Heavyweight Tee, Cargo Pant, Windbreaker, Panjabi..."
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-sm p-2.5 text-xs outline-none"
              />
            </div>

            <div>
              <label className="block text-zinc-600 dark:text-zinc-400 uppercase font-mono text-[10px] font-semibold mb-1.5">
                Target Gender *
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as TargetGender)}
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-sm p-2.5 text-xs outline-none cursor-pointer"
              >
                <option value="UNISEX">Unisex</option>
                <option value="MALE">Male (Men)</option>
                <option value="FEMALE">Female (Women)</option>
                <option value="KIDS_BOY">Kids (Boy)</option>
                <option value="KIDS_GIRL">Kids (Girl)</option>
              </select>
            </div>

            <div>
              <label className="block text-zinc-600 dark:text-zinc-400 uppercase font-mono text-[10px] font-semibold mb-1.5">
                Age Demographic *
              </label>
              <select
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value as AgeGroup)}
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-sm p-2.5 text-xs outline-none cursor-pointer"
              >
                <option value="ADULT">Adult</option>
                <option value="CHILDREN">Children / Kids</option>
                <option value="TODDLER">Toddler / Infant</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-zinc-600 dark:text-zinc-400 uppercase font-mono text-[10px] font-semibold mb-1.5">
                Product Description
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-sm p-2.5 text-xs outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Fabric & Material */}
        <div className="p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4">
          <h2 className="font-sans text-base uppercase font-bold border-b border-zinc-200 dark:border-zinc-800 pb-2.5">
            2. Fabric &amp; Material Engineering
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
            <div>
              <label className="block text-zinc-600 dark:text-zinc-400 uppercase font-mono text-[10px] font-semibold mb-1.5">
                Fabric / Material Taxonomy *
              </label>
              <select
                value={fabricType}
                onChange={(e) => setFabricType(e.target.value as FabricOrMaterial)}
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-sm p-2.5 text-xs outline-none cursor-pointer"
              >
                <option value="Heavyweight French Terry (280 GSM)">Heavyweight French Terry (280 GSM)</option>
                <option value="DWR 3-Layer Ripstop Nylon">DWR 3-Layer Ripstop Nylon</option>
                <option value="4-Way Stretch Technical Knit">4-Way Stretch Technical Knit</option>
                <option value="Cordura® 500D Ballistic Nylon">Cordura® 500D Ballistic Nylon</option>
                <option value="Merino Wool Thermal Knit">Merino Wool Thermal Knit</option>
                <option value="Pure European Linen">Pure European Linen</option>
                <option value="100% Organic Cotton">100% Organic Cotton</option>
                <option value="Egyptian Giza Cotton">Egyptian Giza Cotton</option>
                <option value="Dhakai Jamdani / Muslin">Dhakai Jamdani / Muslin</option>
                <option value="Mulberry Silk">Mulberry Silk</option>
                <option value="Merino Wool">Merino Wool</option>
                <option value="Full-Grain Italian Leather">Full-Grain Italian Leather</option>
              </select>
            </div>

            <div>
              <label className="block text-zinc-600 dark:text-zinc-400 uppercase font-mono text-[10px] font-semibold mb-1.5">
                Fabric Weight (GSM)
              </label>
              <input
                type="number"
                value={fabricWeightGsm}
                onChange={(e) => setFabricWeightGsm(Number(e.target.value))}
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-sm p-2.5 text-xs font-mono tabular-nums outline-none"
              />
            </div>

            <div>
              <label className="block text-zinc-600 dark:text-zinc-400 uppercase font-mono text-[10px] font-semibold mb-1.5">
                Silhouette Fit Type *
              </label>
              <select
                value={fitType}
                onChange={(e) => setFitType(e.target.value as Product["fitType"])}
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-sm p-2.5 text-xs outline-none cursor-pointer"
              >
                <option value="Boxy Fit">Boxy Fit</option>
                <option value="Athletic Taper">Athletic Taper</option>
                <option value="Relaxed Fit">Relaxed Fit</option>
                <option value="Tailored Fit">Tailored Fit</option>
                <option value="Regular Fit">Regular Fit</option>
                <option value="Oversized">Oversized</option>
                <option value="Adjustable">Adjustable</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-zinc-600 dark:text-zinc-400 uppercase font-mono text-[10px] font-semibold mb-1.5">
                Care &amp; Washing Instructions
              </label>
              <input
                type="text"
                value={careInstructions}
                onChange={(e) => setCareInstructions(e.target.value)}
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-sm p-2.5 text-xs outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Auto-Converting Dual-Unit Size Matrix */}
        <div className="p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <h2 className="font-sans text-base uppercase font-bold">
                  3. Size Matrix &amp; Dual INCH / CM Auto-Calculator
                </h2>
              </div>
              <p className="text-xs font-sans text-zinc-500 mt-0.5">
                Type in Inches and Centimeters updates automatically (x 2.54), or vice-versa.
              </p>
            </div>

            <button
              type="button"
              onClick={addNewSizeRow}
              className="px-3 py-1.5 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-mono uppercase font-semibold rounded-sm flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Size Row</span>
            </button>
          </div>

          <div className="space-y-4">
            {sizes.map((s, idx) => (
              <div
                key={idx}
                className="p-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold uppercase text-zinc-500">Size</span>
                    <input
                      type="text"
                      aria-label={`Size label row ${idx + 1}`}
                      value={s.sizeLabel}
                      onChange={(e) => {
                        const newSizes = [...sizes];
                        newSizes[idx] = { ...newSizes[idx], sizeLabel: e.target.value, skuSuffix: e.target.value };
                        setSizes(newSizes);
                      }}
                      className="w-20 bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-sm px-2 py-1 text-xs font-mono text-center font-bold"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">Stock</span>
                      <input
                        type="number"
                        min="0"
                        aria-label={`Stock for size ${s.sizeLabel}`}
                        value={s.stock}
                        onChange={(e) => handleStockChange(idx, e.target.value)}
                        className="w-16 bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-sm px-2 py-1 text-xs font-mono text-center font-bold tabular-nums"
                      />
                    </div>

                    {sizes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSizeRow(idx)}
                        aria-label={`Remove size ${s.sizeLabel}`}
                        className="text-zinc-500 hover:text-red-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
                  {(["chest", "length", "shoulder", "sleeve"] as const).map((field) => (
                    <div key={field} className="space-y-1">
                      <span className="text-[10px] text-zinc-500 uppercase block">{field}</span>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          step="0.1"
                          placeholder="in"
                          aria-label={`${s.sizeLabel} ${field} inches`}
                          value={s.measurementsInch[field] ?? ""}
                          onChange={(e) => handleInchChange(idx, field, e.target.value)}
                          className="w-1/2 p-1.5 border border-zinc-300 dark:border-zinc-700 rounded-sm text-xs bg-zinc-50 dark:bg-zinc-900 tabular-nums"
                        />
                        <span className="text-[10px] text-zinc-500">&quot;</span>
                        <input
                          type="number"
                          step="0.1"
                          placeholder="cm"
                          aria-label={`${s.sizeLabel} ${field} cm`}
                          value={s.measurementsCm[field] ?? ""}
                          onChange={(e) => handleCmChange(idx, field, e.target.value)}
                          className="w-1/2 p-1.5 border border-zinc-300 dark:border-zinc-700 rounded-sm text-xs bg-zinc-50 dark:bg-zinc-900 tabular-nums"
                        />
                        <span className="text-[10px] text-zinc-500">cm</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Color Swatch & Images */}
        <div className="p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4">
          <h2 className="font-sans text-base uppercase font-bold border-b border-zinc-200 dark:border-zinc-800 pb-2.5">
            4. Color Swatch &amp; Visual Asset Photography
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
            <div>
              <label className="block text-zinc-600 dark:text-zinc-400 uppercase font-mono text-[10px] font-semibold mb-1.5">
                Color Name *
              </label>
              <input
                type="text"
                required
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-sm p-2.5 text-xs outline-none"
              />
            </div>

            <div>
              <label className="block text-zinc-600 dark:text-zinc-400 uppercase font-mono text-[10px] font-semibold mb-1.5">
                Color Hex Code *
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  aria-label="Color swatch picker"
                  value={primaryColorHex}
                  onChange={(e) => setPrimaryColorHex(e.target.value)}
                  className="w-10 h-10 border border-zinc-300 dark:border-zinc-700 cursor-pointer"
                />
                <input
                  type="text"
                  value={primaryColorHex}
                  onChange={(e) => setPrimaryColorHex(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-sm p-2.5 text-xs font-mono uppercase"
                />
              </div>
            </div>

            <div className="sm:col-span-2 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="block text-zinc-600 dark:text-zinc-400 uppercase font-mono text-[10px] font-semibold">
                  Primary Editorial Image (Cloudinary URL) *
                </label>
                <label className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-[10px] font-mono uppercase font-semibold rounded-sm cursor-pointer hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
                  {uploadingSlot === "primary" ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Upload className="w-3 h-3" />
                  )}
                  <span>{uploadingSlot === "primary" ? "Uploading..." : "Upload to Cloudinary"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    disabled={uploadingSlot !== null}
                    onChange={(e) => handleCloudinaryUpload("primary", e)}
                    className="sr-only"
                  />
                </label>
              </div>
              <input
                type="url"
                required
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                placeholder="https://res.cloudinary.com/..."
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-sm p-2.5 text-xs font-mono"
              />
            </div>

            <div className="sm:col-span-2 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="block text-zinc-600 dark:text-zinc-400 uppercase font-mono text-[10px] font-semibold">
                  Secondary / Hover Detail Image (Cloudinary URL)
                </label>
                <label className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-[10px] font-mono uppercase font-semibold rounded-sm cursor-pointer hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
                  {uploadingSlot === "secondary" ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Upload className="w-3 h-3" />
                  )}
                  <span>{uploadingSlot === "secondary" ? "Uploading..." : "Upload to Cloudinary"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    disabled={uploadingSlot !== null}
                    onChange={(e) => handleCloudinaryUpload("secondary", e)}
                    className="sr-only"
                  />
                </label>
              </div>
              <input
                type="url"
                value={hoverImageUrlInput}
                onChange={(e) => setHoverImageUrlInput(e.target.value)}
                placeholder="https://res.cloudinary.com/..."
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-sm p-2.5 text-xs font-mono"
              />
            </div>

            {uploadError && (
              <div className="sm:col-span-2 p-2.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-mono rounded-sm">
                {uploadError}
              </div>
            )}
          </div>

          <div className="pt-2">
            <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-2">
              Live Asset Preview
            </span>
            <div className="flex items-center gap-4">
              {imageUrlInput && (
                <div className="relative w-20 h-28 bg-zinc-100 dark:bg-zinc-800 overflow-hidden border border-zinc-200 dark:border-zinc-700">
                  <SafeImage
                    src={optimizeCloudinaryUrl(imageUrlInput, { width: 160, height: 210 })}
                    alt="Primary preview"
                    fill
                    sizes="80px"
                    className={getGarmentObjectPosition(mainCategory)}
                  />
                </div>
              )}
              {hoverImageUrlInput && (
                <div className="relative w-20 h-28 bg-zinc-100 dark:bg-zinc-800 overflow-hidden border border-zinc-200 dark:border-zinc-700">
                  <SafeImage
                    src={optimizeCloudinaryUrl(hoverImageUrlInput, { width: 160, height: 210 })}
                    alt="Hover preview"
                    fill
                    sizes="80px"
                    className={getGarmentObjectPosition(mainCategory)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 5: Pricing & Placement */}
        <div className="p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4">
          <h2 className="font-sans text-base uppercase font-bold border-b border-zinc-200 dark:border-zinc-800 pb-2.5">
            5. Pricing &amp; Merchandising Placement
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
            <div>
              <label className="block text-zinc-600 dark:text-zinc-400 uppercase font-mono text-[10px] font-semibold mb-1.5">
                Base Retail Price (BDT) *
              </label>
              <input
                type="number"
                required
                value={basePrice}
                onChange={(e) => setBasePrice(Number(e.target.value))}
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-sm p-2.5 text-sm font-mono font-bold tabular-nums"
              />
            </div>

            <div>
              <label className="block text-zinc-600 dark:text-zinc-400 uppercase font-mono text-[10px] font-semibold mb-1.5">
                Discount / Sale Price (BDT, Optional)
              </label>
              <input
                type="number"
                value={discountPrice ?? ""}
                onChange={(e) =>
                  setDiscountPrice(e.target.value ? Number(e.target.value) : undefined)
                }
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-sm p-2.5 text-sm font-mono tabular-nums"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <label className="flex items-center gap-3 p-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 cursor-pointer">
              <input
                type="checkbox"
                checked={isNewCollection}
                onChange={(e) => setIsNewCollection(e.target.checked)}
                className="w-4 h-4 accent-zinc-950 dark:accent-white"
              />
              <span className="text-xs font-sans font-medium">New Collection Flag</span>
            </label>

            <label className="flex items-center gap-3 p-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 cursor-pointer">
              <input
                type="checkbox"
                checked={isTrending}
                onChange={(e) => setIsTrending(e.target.checked)}
                className="w-4 h-4 accent-zinc-950 dark:accent-white"
              />
              <span className="text-xs font-sans font-medium">Trending Now Flag</span>
            </label>

            <label className="flex items-center gap-3 p-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 accent-zinc-950 dark:accent-white"
              />
              <span className="text-xs font-sans font-medium">Featured on Homepage</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-8 py-4 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-sans uppercase tracking-wider font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-sm transition-colors flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Publish New SKU To Live Catalog</span>
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
