# AURELIA STUDIO — Editorial Garment & Wearable Flagship

> **A human-crafted, editorial fashion commerce web application and command center** designed with the architectural minimalism of **COS**, **SSENSE**, and **Zara**, featuring pure European flax, Dhakai pit-loom muslin, GOTS organic cotton, and mechanical timepieces.

---

## 🏛️ Architecture & Tech Stack

- **Storefront & Admin Web App:** Next.js 15 (App Router, React 19, Server & Client Components)
- **Styling & Color Psychology:** Tailwind CSS with the **Warm Sartorial Minimalist** palette:
  - *Canvas Background:* `#FAF8F5` (Warm Raw Silk / Alabaster)
  - *Elevated Surface:* `#F2EFE9` (Unbleached Linen)
  - *Primary Ink Text:* `#141413` (Deep Charcoal Espresso)
  - *Accents:* `#181816` (Sartorial Black), `#9E4733` (Terracotta Badges), `#2D4A3E` (Botanical Cypress 100% Organic), `#C5A059` (Brushed Brass Horology)
- **Typography:** Cormorant Garamond (Editorial Display), Plus Jakarta Sans (Labels & Navigation), JetBrains Mono (Prices, SKUs, and `INCH/CM` measurement matrices)
- **State Management:** Unified `Zustand` Store (`useCommerceStore.ts`) persisted to `localStorage` for zero-latency instant offline/online sync across Cart, Wishlist, Admin Products, and Orders.
- **Micro-Interactions:** Dual-image hover swap, quick-add size slide-up bar, interactive color swatch dots, real-time dynamic `[ INCH ↔ CM ]` size conversion table, slide-over Cart and Wishlist drawers.
- **Backend Architecture:** Modular NestJS API (`/backend`) with `ProductsModule`, `OrdersModule`, `CloudinaryModule`, `AnalyticsModule`, and relational Prisma schema.
- **Cloudinary Optimization:** `src/lib/cloudinary.ts` utility supporting automatic `f_auto,q_auto` URL transformations and direct client/server uploads.

---

## 🚀 Key Features

### 1. 20-Product Seed Catalog (`src/data/seedProducts.ts`)
1. **Men's Adult Garments:** Pure European Linen Casual Shirt, Artisan Embroidered Festive Panjabi, Egyptian Cotton Tailored Polo, Relaxed Pleated Chino Trousers, Merino Wool Overshirt.
2. **Women's Adult Garments:** Handloom Muslin & Silk Festive Saree, Belted Pure Linen Midi Dress, Botanical Embroidered Cotton Kurti, Tailored Linen Co-ord Set, Modest Cashmere-Blend Shawl/Abaya.
3. **Children's Garments (Boys & Girls):** Kids Organic Cotton Festive Panjabi Set, Girls Smocked Linen Party Frock, Toddler Breathable Cotton Co-ord Romper, Kids Denim & Flannel Jacket.
4. **Wearables, Watches, Footwear & Accessories:** Minimalist 40mm Automatic Chronograph Watch (316L Stainless Steel & Sapphire), Classic Heritage Leather Dress Watch, Handcrafted Italian Leather Chelsea Boots, Artisanal Suede Penny Loafers, Sterling Silver Minimalist Cuff Bracelet, Braided Leather & Brass Wristband.

### 2. Dual-Unit `[ INCH ↔ CM ]` Measurement Engine
- Every product size stores both inches and centimeters across `chest`, `waist`, `shoulder`, `length`, `sleeve`, `footLength`, and `wristOrCase`.
- Clicking the `[ INCH | CM ]` toggle in the Header, Product Page, or Size Guide Modal dynamically flips all measurements in real time.

### 3. Full-Spectrum Admin Command Center (`/admin`)
- Accessible via the **"⚡ Admin Studio"** toggle in the top navigation bar.
- **Executive Overview (`/admin`):** Live KPI cards (Gross Volume, Active Orders, SKUs, Low Stock alerts), revenue contribution by demographic, and top fabric breakdown.
- **Product Studio (`/admin/products` & `/admin/products/new`):** Add/edit garments and wearables with demographic filters, fabric GSM input, Cloudinary image preview, and an **auto-calculating dual-unit measurement matrix builder**.
- **Fulfillment & CRM (`/admin/orders`):** Update order status in real time from dropdown (`Pending` ➔ `Confirmed` ➔ `Packed` ➔ `Shipped` ➔ `Delivered`) which immediately updates customer's `/orders/[id]` tracking page.

---

## 💻 CLI & Deployment Commands

### Development
```bash
# Run Next.js storefront & admin panel
pnpm dev
# App will run at http://localhost:3000
```

### Production Build
```bash
pnpm build
```

### Vercel Deployment
```bash
vercel --prod
```

### GitHub Remote
Repository created and linked via GitHub CLI (`gh`):
`https://github.com/niloykm/ecwearable`
