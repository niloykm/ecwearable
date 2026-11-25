# ECWEARABLE UI/UX & Anti-Slop Design System

## 1. Domain Classification & Editorial Benchmark
- **Domain:** Technical Apparel, Everyday Essentials & Wearable Gear E-Commerce (`ECWEARABLE`).
- **Layout & Density:** Asymmetric editorial lookbook grid with interactive garment inspection pins, immediate server-rendered product catalog (`/shop`) with multi-faceted filtering, and multi-angle product inspection (`Front`, `Fit / Angle`, `Fabric & Seam Detail`) with 2x zoom lightbox.

## 2. Color Theory & 60-30-10 Distribution (WCAG AA Enforced)
- **60% Dominant Surface:** Crisp pure white (`#ffffff`) in light mode / obsidian (`#09090b`, `zinc-950`) in dark mode.
- **30% Structural Surfaces & Hairline Borders:** Subtle neutral elevation (`#f4f4f5` / `zinc-100` in light, `#18181b` / `zinc-900` in dark) with 1px structural dividers (`border-zinc-200 dark:border-zinc-800`).
- **10% Primary Action & Semantic Tokens:** High-contrast obsidian/white primary actions, paired with semantic emerald (`emerald-700` / `emerald-400`) for stock/lab verification and orange (`orange-600`) for low-stock alerts.
- **Strict Anti-Slop Bans:** Zero purple/blue mesh gradients, zero neon glows, zero floating blobs, zero emojis in headings or controls, and zero concatenated DOM strings.

## 3. Typography, Spacing & Numerical Precision
- **Font Pairing:** `Plus Jakarta Sans` (`--font-jakarta`) for editorial display and UI copy, paired with `JetBrains Mono` (`--font-jetbrains`) for garment specs, GSM ratings, dimensions, and pricing.
- **Numerical Discipline:** All prices (`৳ 1,650` / `$13.75`), shipping thresholds (`৳ 3,000` / `$25`), SKU counts, stock levels, and `INCH / CM` flat dimensions enforce `font-mono tabular-nums`.
- **DOM Text & Control Separation:** Adjacent interactive buttons, badges, and spec tokens include explicit spacing and semantic block boundaries so both visual layout and DOM text/screen-reader output remain cleanly separated.

## 4. Motion, Transitions & Reduced-Motion Compliance
- **Root Motion Stack:** `<MotionConfig reducedMotion="user">` in `MotionProvider` paired with `@media (prefers-reduced-motion: reduce)` CSS rules.
- **Route Open Transitions:** `src/app/template.tsx` animates page mounts keyed by `usePathname()` (`initial={{ opacity: 0, y: 14 }}`, `animate={{ opacity: 1, y: 0 }}`, `duration: 0.3`, `ease: [0.22, 1, 0.36, 1]`).
- **Shared-Element Indicators & Panel Transitions:** Controlled springs (`stiffness: 400, damping: 30`) on `layoutId` indicators paired with `<AnimatePresence mode="wait">` on switched panels and drawers.
- **Scroll Progress & Reveal:** Top `ScrollProgressBar` (`useScroll` + `useSpring`) and `ScrollReveal` (`initial={{ opacity: 0, y: 20 }}`, `duration: 0.38`, `ease: [0.22, 1, 0.36, 1]`) with light stagger (`0.05s`).
