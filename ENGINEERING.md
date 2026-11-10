# ECWEARABLE ENGINEERING STANDARDS

- Strict TypeScript: Full type-safety for Product, Variant, Size, Color, CartItem, Order, and Customer. Zero `any`.
- Next.js Optimization: Use `next/image` with explicit `sizes` attributes and placeholder blur to eliminate Cumulative Layout Shift (CLS).
- Cart & State Management: Persist cart state in `localStorage` or unified global store with optimistic cart updates.
- Performance: Lazy load lookbook media below the fold; debounce search and filter updates.
- Responsive Viewports: Seamless responsiveness at 390px (mobile thumb-reachability), 768px (2-column grids), and 1440px (balanced 4-column catalog max-w-7xl).
