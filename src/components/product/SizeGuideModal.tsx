"use client";

import React, { useState } from "react";
import { X, Ruler } from "lucide-react";
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

  if (!isOpen) return null;

  const handleUnitToggle = (u: 'INCH' | 'CM') => {
    setLocalUnit(u);
    setUnit(u);
  };

  const isWearableOrWatch = product.mainCategory === "WEARABLES";
  const isFootwear = product.mainCategory === "FOOTWEAR";

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-canvas border border-border-subtle shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-border-subtle pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-[#C5A059]" />
                <h3 className="font-serif text-xl sm:text-2xl uppercase tracking-tight text-ink font-semibold">
                  Garment & Wearable Sizing Guide
                </h3>
              </div>
              <p className="text-xs text-ink-muted mt-1 font-sans">
                {product.name} — {product.fitType} ({product.fabricType})
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-ink-muted hover:text-ink hover:bg-canvas-elevated rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Unit Toggle Banner */}
          <div className="flex items-center justify-between py-4 border-b border-border-subtle">
            <span className="text-xs font-sans text-ink uppercase tracking-wider">
              Measurement Standard
            </span>

            <div className="flex items-center border border-border-subtle bg-canvas-elevated p-0.5">
              <button
                onClick={() => handleUnitToggle("INCH")}
                className={cn(
                  "px-3 py-1 text-xs font-mono transition-colors",
                  localUnit === "INCH"
                    ? "bg-[#181816] text-[#FAF8F5] font-bold"
                    : "text-ink-muted hover:text-ink"
                )}
              >
                INCHES (in)
              </button>
              <button
                onClick={() => handleUnitToggle("CM")}
                className={cn(
                  "px-3 py-1 text-xs font-mono transition-colors",
                  localUnit === "CM"
                    ? "bg-[#181816] text-[#FAF8F5] font-bold"
                    : "text-ink-muted hover:text-ink"
                )}
              >
                CENTIMETERS (cm)
              </button>
            </div>
          </div>

          {/* Sizing Table */}
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-border-subtle bg-canvas-elevated">
                  <th className="py-2.5 px-3 font-mono uppercase text-ink">Size</th>
                  {!isWearableOrWatch && !isFootwear && (
                    <>
                      <th className="py-2.5 px-3 font-mono uppercase text-ink">
                        Chest ({localUnit === "INCH" ? "in" : "cm"})
                      </th>
                      <th className="py-2.5 px-3 font-mono uppercase text-ink">
                        Shoulder ({localUnit === "INCH" ? "in" : "cm"})
                      </th>
                      <th className="py-2.5 px-3 font-mono uppercase text-ink">
                        Length ({localUnit === "INCH" ? "in" : "cm"})
                      </th>
                      <th className="py-2.5 px-3 font-mono uppercase text-ink">
                        Sleeve ({localUnit === "INCH" ? "in" : "cm"})
                      </th>
                    </>
                  )}
                  {isFootwear && (
                    <th className="py-2.5 px-3 font-mono uppercase text-ink">
                      Foot Length ({localUnit === "INCH" ? "in" : "cm"})
                    </th>
                  )}
                  {isWearableOrWatch && (
                    <th className="py-2.5 px-3 font-mono uppercase text-ink">
                      Case / Wrist ({localUnit === "INCH" ? "in" : "cm"})
                    </th>
                  )}
                  <th className="py-2.5 px-3 font-mono uppercase text-ink text-right">
                    Stock
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle font-mono">
                {product.sizes.map((s) => {
                  const m =
                    localUnit === "INCH" ? s.measurementsInch : s.measurementsCm;

                  return (
                    <tr key={s.sizeLabel} className="hover:bg-canvas-elevated/50 transition-colors">
                      <td className="py-3 px-3 font-bold text-ink">{s.sizeLabel}</td>
                      {!isWearableOrWatch && !isFootwear && (
                        <>
                          <td className="py-3 px-3 text-ink-muted">
                            {m?.chest ? `${m.chest} ${localUnit === "INCH" ? '"' : "cm"}` : "—"}
                          </td>
                          <td className="py-3 px-3 text-ink-muted">
                            {m?.shoulder ? `${m.shoulder} ${localUnit === "INCH" ? '"' : "cm"}` : "—"}
                          </td>
                          <td className="py-3 px-3 text-ink-muted">
                            {m?.length ? `${m.length} ${localUnit === "INCH" ? '"' : "cm"}` : "—"}
                          </td>
                          <td className="py-3 px-3 text-ink-muted">
                            {m?.sleeve ? `${m.sleeve} ${localUnit === "INCH" ? '"' : "cm"}` : "—"}
                          </td>
                        </>
                      )}
                      {isFootwear && (
                        <td className="py-3 px-3 text-ink-muted">
                          {m?.footLength ? `${m.footLength} ${localUnit === "INCH" ? '"' : "cm"}` : "—"}
                        </td>
                      )}
                      {isWearableOrWatch && (
                        <td className="py-3 px-3 text-ink-muted">
                          {m?.wristOrCase ? `${m.wristOrCase} ${localUnit === "INCH" ? '"' : "cm"}` : "—"}
                        </td>
                      )}
                      <td className="py-3 px-3 text-right">
                        {s.stock > 0 ? (
                          <span className="text-[#2D4A3E] font-medium">{s.stock} in stock</span>
                        ) : (
                          <span className="text-[#9E4733]">Sold Out</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Advice notes */}
          <div className="mt-6 p-4 bg-canvas-elevated border border-border-subtle text-xs font-sans text-ink-muted space-y-1">
            <p className="font-semibold text-ink">Measuring Tip:</p>
            <p>
              Measurements are garment dimensions laid flat. For relaxed fits, allow 2-3 inches (5-8 cm) of ease around the chest for optimal drape and breathability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
