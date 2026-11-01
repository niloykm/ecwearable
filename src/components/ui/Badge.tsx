import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "terracotta" | "cypress" | "brass" | "obsidian" | "surface" | "outline";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "surface",
  size = "sm",
  className,
}: BadgeProps) {
  const variantStyles = {
    terracotta: "bg-[#9E4733]/10 text-[#9E4733] border-[#9E4733]/20",
    cypress: "bg-[#2D4A3E]/10 text-[#2D4A3E] border-[#2D4A3E]/20",
    brass: "bg-[#C5A059]/15 text-[#8F6E2C] border-[#C5A059]/30",
    obsidian: "bg-[#181816] text-[#FAF8F5] border-transparent",
    surface: "bg-[#F2EFE9] text-[#141413] border-[#E5E0D8]",
    outline: "bg-transparent text-[#141413] border-[#E5E0D8]",
  };

  const sizeStyles = {
    sm: "text-[10px] tracking-[0.14em] uppercase px-2 py-0.5",
    md: "text-xs tracking-[0.12em] uppercase px-2.5 py-1",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium border rounded-none transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}
