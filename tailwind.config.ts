import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "#FAF8F5", // Warm Alabaster / Raw Silk
          elevated: "#F2EFE9", // Unbleached Linen / Stone
          dark: "#0C0C0B", // Admin Obsidian Black
          darkSurface: "#161614", // Admin Card Surface
        },
        ink: {
          DEFAULT: "#141413", // Deep Charcoal Espresso
          muted: "#65625D", // Warm Graphite
          faint: "#8E8A82",
          light: "#F5F3EF",
        },
        border: {
          subtle: "#E5E0D8", // Warm Sand 1px Hairline
          dark: "#2A2A27",
        },
        sartorial: {
          black: "#181816", // Sartorial Black
          terracotta: "#9E4733", // Burnt Sienna / Rust (New Collection, Trending)
          cypress: "#2D4A3E", // Botanical Cypress (100% Organic, Stock)
          brass: "#C5A059", // Brushed Brass (Watches & Wearables)
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      letterSpacing: {
        editorial: "0.14em",
        tightest: "-0.03em",
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(20, 20, 19, 0.04), 0 4px 12px rgba(20, 20, 19, 0.03)",
        elevated: "0 8px 30px rgba(20, 20, 19, 0.08)",
        drawer: "-8px 0 32px rgba(20, 20, 19, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
