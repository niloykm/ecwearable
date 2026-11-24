# ECWEARABLE — Engineered Everyday Garments & Technical Wearables

High-performance technical apparel, everyday essentials, and curated garments engineered with 280 GSM French Terry, DWR 3-Layer Ripstop, 18.5µ Merino Wool, and 500D Cordura® ballistic nylon.

## Architecture & Tech Stack

- **Storefront & Admin Web App:** Next.js 15 (App Router, React 19, TypeScript)
- **Design System:** High-contrast monochrome zinc canvas (`#FFFFFF` / `#09090B`) with deep olive (`#365314`) and tactical orange (`#EA580C`) semantic accents, paired with `Plus Jakarta Sans` and `JetBrains Mono` (`tabular-nums`).
- **Motion & Transitions:** `framer-motion` with `<MotionConfig reducedMotion="user">`, route-level transitions (`src/app/template.tsx`), shared `layoutId` indicators, `<AnimatePresence>` drawers/panels, and scroll-progress/reveal primitives.
- **State Management:** Unified `Zustand` store (`src/store/useCommerceStore.ts`) persisted to `localStorage` for Cart, Wishlist, Unit (`INCH` / `CM`), Currency (`BDT` / `USD`), Admin SKUs, and Order Fulfillment.
- **Backend Architecture:** Modular NestJS API (`/backend`) with `ProductsModule`, `OrdersModule`, `CloudinaryModule`, and `AnalyticsModule`.

## Development

```bash
pnpm install
pnpm dev
pnpm build
```
