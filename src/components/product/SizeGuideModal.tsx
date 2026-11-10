"use client";

import React, { useState } from "react";
import { X, Ruler, UserCheck, Sparkles, Check } from "lucide-react";
import { Product } from "@/types/commerce";
import { useCommerceStore } from "@/store/useCommerceStore";
import { cn } from "@/lib/utils";

interface SizeGuideModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function SizeGuideModal({ product, isOpen, onClose }: SizeGuideModalProps) {
  const { unit: storeUnit, setUnit } = useCommerceStore();
  const [localUnit, setLocalUnit] = useState<'INCH' | 'CM'>(storeUnit);

  // Fit predictor state
  const [userHeightCm, setUserHeightCm] = useState<number>(180);
  const [userWeightKg, setUserWeightKg] = useState<number>(75);

  if (!isOpen) return null;

  const handleUnitToggle = (u: 'INCH' | 'CM') => {
    setLocalUnit(u);
    setUnit(u);
  };

  const isWearableOrWatch = product.mainCategory === "WEARABLES";
  const isFootwear = product.mainCategory === "FOOTWEAR";

  // Simple ergonomic fit predictor recommendation
  const predictedSize = (() => {
    if (isWearableOrWatch || isFootwear) return null;
    const bmi = userWeightKg / Math.pow(userHeightCm / 100, 2);
    if (bmi < 20) return "S";
    if (bmi < 24) return userHeightCm > 182 ? "L" : "M";
    if (bmi < 27) return "L";
    if (bmi < 31) return "XL";
    return "XXL";
  })();

  const defaultModelRef = product.modelReference || 'Model is 6\'1" (185 cm) wearing size L / Regular Fit';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
                <h3 className="font-sans text-lg sm:text-xl uppercase tracking-tight text-zinc-950 dark:text-white font-bold">
                  Interactive Size & Fit Guide
                </h3>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-sans">
                {product.name} — {product.fitType} ({product.fabricType})
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Model Height Reference Banner */}
          <div className="mt-4 p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
            <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <div className="text-xs font-sans text-zinc-700 dark:text-zinc-300">
              <span className="font-semibold text-zinc-950 dark:text-white">Editorial Reference: </span>
              <span>{defaultModelRef}</span>
            </div>
          </div>

          {/* Unit Toggle Banner & Interactive Fit Predictor */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 border-b border-zinc-200 dark:border-zinc-800">
            <div>
              <span className="text-xs font-sans text-zinc-900 dark:text-zinc-100 uppercase tracking-wider font-semibold">
                Measurement Standard
              </span>
            </div>

            <div className="flex items-center border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 p-0.5">
              <button
                onClick={() => handleUnitToggle("INCH")}
                className={cn(
                  "px-3 py-1 text-xs font-mono transition-colors",
                  localUnit === "INCH"
                    ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-bold"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
                )}
              >
                INCHES (in)
              </button>
              <button
                onClick={() => handleUnitToggle("CM")}
                className={cn(
                  "px-3 py-1 text-xs font-mono transition-colors",
                  localUnit === "CM"
                    ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-bold"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
                )}
              >
                CENTIMETERS (cm)
              </button>
            </div>
          </div>

          {/* Sizing Table */}
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60">
                  <th className="py-2.5 px-3 font-mono uppercase text-zinc-900 dark:text-zinc-100 font-bold">Size</th>
                  {!isWearableOrWatch && !isFootwear && (
                    <>
                      <th className="py-2.5 px-3 font-mono uppercase text-zinc-900 dark:text-zinc-100">
                        Chest ({localUnit === "INCH" ? "in" : "cm"})
                      </th>
                      <th className="py-2.5 px-3 font-mono uppercase text-zinc-900 dark:text-zinc-100">
                        Shoulder ({localUnit === "INCH" ? "in" : "cm"})
                      </th>
                      <th className="py-2.5 px-3 font-mono uppercase text-zinc-900 dark:text-zinc-100">
                        Length ({localUnit === "INCH" ? "in" : "cm"})
                      </th>
                      <th className="py-2.5 px-3 font-mono uppercase text-zinc-900 dark:text-zinc-100">
                        Sleeve ({localUnit === "INCH" ? "in" : "cm"})
                      </th>
                    </>
                  )}
                  {isFootwear && (
                    <th className="py-2.5 px-3 font-mono uppercase text-zinc-900 dark:text-zinc-100">
                      Foot Length ({localUnit === "INCH" ? "in" : "cm"})
                    </th>
                  )}
                  {isWearableOrWatch && (
                    <th className="py-2.5 px-3 font-mono uppercase text-zinc-900 dark:text-zinc-100">
                      Case / Wrist ({localUnit === "INCH" ? "in" : "cm"})
                    </th>
                  )}
                  <th className="py-2.5 px-3 font-mono uppercase text-zinc-900 dark:text-zinc-100 text-right">
                    Stock
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 font-mono">
                {product.sizes.map((s) => {
                  const m =
                    localUnit === "INCH" ? s.measurementsInch : s.measurementsCm;

                  return (
                    <tr key={s.sizeLabel} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-zinc-950 dark:text-white tabular-nums">
                        {s.sizeLabel}
                      </td>
                      {!isWearableOrWatch && !isFootwear && (
                        <>
                          <td className="py-2.5 px-3 text-zinc-600 dark:text-zinc-400 tabular-nums">
                            {m?.chest ? `${m.chest} ${localUnit === "INCH" ? '"' : "cm"}` : "—"}
                          </td>
                          <td className="py-2.5 px-3 text-zinc-600 dark:text-zinc-400 tabular-nums">
                            {m?.shoulder ? `${m.shoulder} ${localUnit === "INCH" ? '"' : "cm"}` : "—"}
                          </td>
                          <td className="py-2.5 px-3 text-zinc-600 dark:text-zinc-400 tabular-nums">
                            {m?.length ? `${m.length} ${localUnit === "INCH" ? '"' : "cm"}` : "—"}
                          </td>
                          <td className="py-2.5 px-3 text-zinc-600 dark:text-zinc-400 tabular-nums">
                            {m?.sleeve ? `${m.sleeve} ${localUnit === "INCH" ? '"' : "cm"}` : "—"}
                          </td>
                        </>
                      )}
                      {isFootwear && (
                        <td className="py-2.5 px-3 text-zinc-600 dark:text-zinc-400 tabular-nums">
                          {m?.footLength ? `${m.footLength} ${localUnit === "INCH" ? '"' : "cm"}` : "—"}
                        </td>
                      )}
                      {isWearableOrWatch && (
                        <td className="py-2.5 px-3 text-zinc-600 dark:text-zinc-400 tabular-nums">
                          {m?.wristOrCase ? `${m.wristOrCase} ${localUnit === "INCH" ? '"' : "cm"}` : "—"}
                        </td>
                      )}
                      <td className="py-2.5 px-3 text-right tabular-nums">
                        {s.stock > 0 ? (
                          <span className="text-emerald-600 dark:text-emerald-400 font-medium">{s.stock} in stock</span>
                        ) : (
                          <span className="text-red-500 font-medium">Sold Out</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Interactive Fit Predictor Slider */}
          {predictedSize && (
            <div className="mt-5 p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-zinc-950 dark:text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-100" />
                  Quick Fit Predictor
                </span>
                <span className="text-xs font-mono font-bold text-zinc-950 dark:text-white bg-white dark:bg-zinc-800 px-2 py-0.5 border border-zinc-200 dark:border-zinc-700">
                  Recommended: Size {predictedSize}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                <div>
                  <div className="flex justify-between text-zinc-500 mb-1">
                    <span>Height:</span>
                    <span className="font-mono tabular-nums text-zinc-900 dark:text-zinc-100">{userHeightCm} cm</span>
                  </div>
                  <input
                    type="range"
                    min="155"
                    max="205"
                    value={userHeightCm}
                    onChange={(e) => setUserHeightCm(Number(e.target.value))}
                    className="w-full accent-zinc-950 dark:accent-white cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-zinc-500 mb-1">
                    <span>Weight:</span>
                    <span className="font-mono tabular-nums text-zinc-900 dark:text-zinc-100">{userWeightKg} kg</span>
                  </div>
                  <input
                    type="range"
                    min="45"
                    max="125"
                    value={userWeightKg}
                    onChange={(e) => setUserWeightKg(Number(e.target.value))}
                    className="w-full accent-zinc-950 dark:accent-white cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Advice notes */}
          <div className="mt-4 p-3 bg-zinc-100 dark:bg-zinc-900 text-xs font-sans text-zinc-600 dark:text-zinc-400 space-y-1">
            <p className="font-semibold text-zinc-900 dark:text-zinc-100">Measuring & Fit Protocol:</p>
            <p>
              Garment measurements are taken with apparel laid flat. For standard relaxed styling, allow 2-3 inches (5-8 cm) of chest ease. Free exchanges within 7 days if the fit is not ideal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
