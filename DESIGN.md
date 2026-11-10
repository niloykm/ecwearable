# ECWEARABLE UI/UX DESIGN SYSTEM

## 1. Aesthetic & Brand Surfaces
- Palette: High-fashion monochromatic foundation with natural earthy accents.
  - Light Canvas: `#ffffff` true white background with `#f4f4f5` (zinc-100) card backdrops.
  - Dark Canvas: `#09090b` (zinc-950) base with `#18181b` (zinc-900) surfaces.
  - Text: High-contrast `#09090b` (light) / `#fafafa` (dark), meeting strict WCAG AA.
  - Accent Tokens: Deep olive (`#365314`), warm stone (`#78716c`), or tactical orange (`#ea580c`) reserved strictly for alerts/sale badges.
- Geometry: Minimalist edges (`rounded-none` or subtle `rounded-sm` for luxury fashion; max `rounded-md` 6px for buttons and form elements). Never bloated `rounded-3xl` bubble cards.
- Dividers: Crisp 1px lines (`border-zinc-200 dark:border-zinc-800`).

## 2. Typography & Numerical Precision
- Headings: Editorial, clean uppercase or tight tracking sans-serif (`font-medium tracking-tight text-zinc-900 dark:text-zinc-50`).
- Numerical Precision: All prices (`৳ 1,850`), SKU codes, stock quantities, and size measurements formatted in `font-mono tabular-nums`.
- Labels: Clean uppercase micro-labels (`text-[11px] uppercase tracking-wider font-medium text-zinc-500`).

## 3. Micro-Interactions & Tactile Feedback
- Smooth image crossfade transitions (`duration-300 ease-out`).
- Instant slide-over cart drawer opening without screen flickering.
- Visual toast notifications with product thumbnail on successful "Add to Cart".
