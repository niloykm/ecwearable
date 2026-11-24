import { Product } from "@/types/commerce";

export const SEED_PRODUCTS: Product[] = [
  // ==========================================
  // 0. TECHNICAL APPAREL & EVERYDAY ESSENTIALS
  // ==========================================
  {
    id: "prod-tech-heavyweight-tee",
    slug: "heavyweight-boxy-tee-280-gsm",
    name: "Heavyweight Boxy Tee 280 GSM",
    subtitle: "Custom 280 GSM combed organic cotton with twin-needle reinforced collar",
    dressType: "Heavyweight Tee",
    mainCategory: "BASICS",
    gender: "UNISEX",
    ageGroup: "ADULT",
    fabricType: "Heavyweight French Terry (280 GSM)",
    fabricWeightGsm: 280,
    breathabilityRating: "High airflow 42 CFM",
    modelReference: 'Model is 6\'1" (185 cm) wearing size L (Boxy Fit)',
    badge: "HEAVYWEIGHT",
    careInstructions: "Machine wash cold inside-out with like colors. Hang dry to maintain collar tension. Do not tumble dry.",
    fitType: "Boxy Fit",
    basePrice: 1950,
    discountPrice: 1650,
    currency: "BDT",
    primaryColor: "Obsidian Black",
    primaryColorHex: "#111111",
    colorVariants: [
      {
        colorName: "Obsidian Black",
        colorHex: "#111111",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526208/ecwearable/products/prod-tech-heavyweight-tee/obsidian-black-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526209/ecwearable/products/prod-tech-heavyweight-tee/obsidian-black-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526210/ecwearable/products/prod-tech-heavyweight-tee/obsidian-black-3-detail.webp"
        ]
      },
      {
        colorName: "Washed Olive",
        colorHex: "#36453B",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526210/ecwearable/products/prod-tech-heavyweight-tee/washed-olive-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526211/ecwearable/products/prod-tech-heavyweight-tee/washed-olive-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526211/ecwearable/products/prod-tech-heavyweight-tee/washed-olive-3-detail.webp"
        ]
      },
      {
        colorName: "Warm Stone",
        colorHex: "#8E8A82",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526211/ecwearable/products/prod-tech-heavyweight-tee/warm-stone-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526210/ecwearable/products/prod-tech-heavyweight-tee/warm-stone-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526210/ecwearable/products/prod-tech-heavyweight-tee/warm-stone-3-detail.webp"
        ]
      }
    ],
    sizes: [
      {
        sizeLabel: "XS",
        stock: 14,
        skuSuffix: "XS-BLK",
        measurementsInch: { chest: 38.0, shoulder: 18.0, length: 27.5, sleeve: 8.5 },
        measurementsCm: { chest: 96.5, shoulder: 45.7, length: 69.8, sleeve: 21.6 }
      },
      {
        sizeLabel: "S",
        stock: 28,
        skuSuffix: "S-BLK",
        measurementsInch: { chest: 40.5, shoulder: 19.0, length: 28.5, sleeve: 9.0 },
        measurementsCm: { chest: 102.9, shoulder: 48.2, length: 72.4, sleeve: 22.8 }
      },
      {
        sizeLabel: "M",
        stock: 35,
        skuSuffix: "M-BLK",
        measurementsInch: { chest: 43.0, shoulder: 20.0, length: 29.5, sleeve: 9.5 },
        measurementsCm: { chest: 109.2, shoulder: 50.8, length: 74.9, sleeve: 24.1 }
      },
      {
        sizeLabel: "L",
        stock: 22,
        skuSuffix: "L-BLK",
        measurementsInch: { chest: 45.5, shoulder: 21.0, length: 30.5, sleeve: 10.0 },
        measurementsCm: { chest: 115.6, shoulder: 53.3, length: 77.5, sleeve: 25.4 }
      },
      {
        sizeLabel: "XL",
        stock: 12,
        skuSuffix: "XL-BLK",
        measurementsInch: { chest: 48.0, shoulder: 22.0, length: 31.5, sleeve: 10.5 },
        measurementsCm: { chest: 121.9, shoulder: 55.9, length: 80.0, sleeve: 26.7 }
      },
      {
        sizeLabel: "XXL",
        stock: 7,
        skuSuffix: "XXL-BLK",
        measurementsInch: { chest: 50.5, shoulder: 23.0, length: 32.5, sleeve: 11.0 },
        measurementsCm: { chest: 128.3, shoulder: 58.4, length: 82.5, sleeve: 27.9 }
      }
    ],
    isNewCollection: true,
    isTrending: true,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 84,
    createdAt: "2026-03-20T10:00:00Z",
    description: "Constructed from custom-developed 280 GSM combed organic cotton. Featuring a wide-gauge ribbed collar that refuses to bacon or sag, dropped shoulder geometry, and a structured drape that holds its silhouette through countless wash cycles.",
    editorialHighlights: ["280 GSM Heavyweight Organic Cotton", "Twin-Needle Ribbed Tension Collar", "Pre-Shrunk Cold Garment Dye", "Engineered Drop Shoulder Geometry"]
  },

  {
    id: "prod-tech-ripstop-cargo",
    slug: "transit-ripstop-cargo-pant",
    name: "Transit Ripstop Cargo Pant",
    subtitle: "DWR water-repellent ripstop shell with articulated knees and magnetic utility pockets",
    dressType: "Cargo Pant",
    mainCategory: "OUTERWEAR",
    gender: "UNISEX",
    ageGroup: "ADULT",
    fabricType: "DWR 3-Layer Ripstop Nylon",
    fabricWeightGsm: 240,
    breathabilityRating: "Waterproof 8,000mm / Breathable 6,500 g/m²",
    modelReference: 'Model is 6\'2" (188 cm) wearing size L (Athletic Taper)',
    badge: "DWR RIPSTOP",
    careInstructions: "Machine wash cold delicate cycle. Fasten all pocket flaps and drawstrings before washing. Line dry in shade.",
    fitType: "Athletic Taper",
    basePrice: 3850,
    discountPrice: 3450,
    currency: "BDT",
    primaryColor: "Tactical Charcoal",
    primaryColorHex: "#22252A",
    colorVariants: [
      {
        colorName: "Tactical Charcoal",
        colorHex: "#22252A",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526214/ecwearable/products/prod-tech-ripstop-cargo/tactical-charcoal-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526214/ecwearable/products/prod-tech-ripstop-cargo/tactical-charcoal-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526215/ecwearable/products/prod-tech-ripstop-cargo/tactical-charcoal-3-detail.webp"
        ]
      },
      {
        colorName: "Olive Drab",
        colorHex: "#3A4333",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526213/ecwearable/products/prod-tech-ripstop-cargo/olive-drab-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526213/ecwearable/products/prod-tech-ripstop-cargo/olive-drab-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526214/ecwearable/products/prod-tech-ripstop-cargo/olive-drab-3-detail.webp"
        ]
      }
    ],
    sizes: [
      {
        sizeLabel: "XS",
        stock: 8,
        skuSuffix: "XS-TAC",
        measurementsInch: { waist: 28.0, inseam: 30.0, length: 39.5 },
        measurementsCm: { waist: 71.1, inseam: 76.2, length: 100.3 }
      },
      {
        sizeLabel: "S",
        stock: 16,
        skuSuffix: "S-TAC",
        measurementsInch: { waist: 30.0, inseam: 30.5, length: 40.5 },
        measurementsCm: { waist: 76.2, inseam: 77.5, length: 102.9 }
      },
      {
        sizeLabel: "M",
        stock: 24,
        skuSuffix: "M-TAC",
        measurementsInch: { waist: 32.0, inseam: 31.0, length: 41.5 },
        measurementsCm: { waist: 81.3, inseam: 78.7, length: 105.4 }
      },
      {
        sizeLabel: "L",
        stock: 19,
        skuSuffix: "L-TAC",
        measurementsInch: { waist: 34.0, inseam: 31.5, length: 42.5 },
        measurementsCm: { waist: 86.4, inseam: 80.0, length: 107.9 }
      },
      {
        sizeLabel: "XL",
        stock: 9,
        skuSuffix: "XL-TAC",
        measurementsInch: { waist: 36.0, inseam: 32.0, length: 43.5 },
        measurementsCm: { waist: 91.4, inseam: 81.3, length: 110.5 }
      },
      {
        sizeLabel: "XXL",
        stock: 5,
        skuSuffix: "XXL-TAC",
        measurementsInch: { waist: 38.0, inseam: 32.5, length: 44.5 },
        measurementsCm: { waist: 96.5, inseam: 82.5, length: 113.0 }
      }
    ],
    isNewCollection: true,
    isTrending: true,
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 62,
    createdAt: "2026-03-21T10:00:00Z",
    description: "Built for urban commuting and technical transit. Engineered from cross-weave ripstop nylon coated with fluorocarbon-free DWR. Features articulated knee darts, ergonomic diamond gusset for 180-degree mobility, and silent magnetic pocket flaps.",
    editorialHighlights: ["DWR Fluorocarbon-Free Water Repellence", "Articulated Knee Ergonomics", "Dual Magnetic Utility Cargo Pockets", "Tapered Cinch Ankle Bungees"]
  },

  {
    id: "prod-tech-merino-crewneck",
    slug: "merino-wool-thermal-crewneck",
    name: "Merino Wool Thermal Crewneck",
    subtitle: "18.5-micron ultrafine Australian Merino wool for natural odor resistance and thermoregulation",
    dressType: "Thermal Crewneck",
    mainCategory: "BASICS",
    gender: "UNISEX",
    ageGroup: "ADULT",
    fabricType: "Merino Wool Thermal Knit",
    fabricWeightGsm: 220,
    breathabilityRating: "Ultra-breathable microclimate regulation",
    modelReference: 'Model is 6\'0" (183 cm) wearing size M (Regular Fit)',
    badge: "MERINO WOOL",
    careInstructions: "Hand wash or gentle wool cycle cold with wool detergent. Reshape flat to dry. Do not hang damp.",
    fitType: "Regular Fit",
    basePrice: 4200,
    discountPrice: 3800,
    currency: "BDT",
    primaryColor: "Deep Heather Charcoal",
    primaryColorHex: "#282828",
    colorVariants: [
      {
        colorName: "Deep Heather Charcoal",
        colorHex: "#282828",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526212/ecwearable/products/prod-tech-merino-crewneck/heather-charcoal-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526212/ecwearable/products/prod-tech-merino-crewneck/heather-charcoal-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526212/ecwearable/products/prod-tech-merino-crewneck/heather-charcoal-3-detail.webp"
        ]
      },
      {
        colorName: "Pine Forest",
        colorHex: "#1E3024",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526212/ecwearable/products/prod-tech-merino-crewneck/pine-forest-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526212/ecwearable/products/prod-tech-merino-crewneck/pine-forest-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526213/ecwearable/products/prod-tech-merino-crewneck/pine-forest-3-detail.webp"
        ]
      }
    ],
    sizes: [
      {
        sizeLabel: "XS",
        stock: 6,
        skuSuffix: "XS-MER",
        measurementsInch: { chest: 37.0, shoulder: 17.0, length: 26.5, sleeve: 24.0 },
        measurementsCm: { chest: 94.0, shoulder: 43.2, length: 67.3, sleeve: 61.0 }
      },
      {
        sizeLabel: "S",
        stock: 14,
        skuSuffix: "S-MER",
        measurementsInch: { chest: 39.5, shoulder: 17.5, length: 27.5, sleeve: 24.5 },
        measurementsCm: { chest: 100.3, shoulder: 44.5, length: 69.8, sleeve: 62.2 }
      },
      {
        sizeLabel: "M",
        stock: 20,
        skuSuffix: "M-MER",
        measurementsInch: { chest: 42.0, shoulder: 18.2, length: 28.5, sleeve: 25.0 },
        measurementsCm: { chest: 106.7, shoulder: 46.2, length: 72.4, sleeve: 63.5 }
      },
      {
        sizeLabel: "L",
        stock: 16,
        skuSuffix: "L-MER",
        measurementsInch: { chest: 44.5, shoulder: 19.0, length: 29.5, sleeve: 25.5 },
        measurementsCm: { chest: 113.0, shoulder: 48.3, length: 74.9, sleeve: 64.8 }
      },
      {
        sizeLabel: "XL",
        stock: 8,
        skuSuffix: "XL-MER",
        measurementsInch: { chest: 47.0, shoulder: 19.8, length: 30.5, sleeve: 26.0 },
        measurementsCm: { chest: 119.4, shoulder: 50.3, length: 77.5, sleeve: 66.0 }
      },
      {
        sizeLabel: "XXL",
        stock: 4,
        skuSuffix: "XXL-MER",
        measurementsInch: { chest: 49.5, shoulder: 20.5, length: 31.5, sleeve: 26.5 },
        measurementsCm: { chest: 125.7, shoulder: 52.1, length: 80.0, sleeve: 67.3 }
      }
    ],
    isNewCollection: true,
    isTrending: false,
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 47,
    createdAt: "2026-03-22T10:00:00Z",
    description: "Spun from certified 18.5-micron Australian Merino wool fibers. Naturally antibacterial, moisture-wicking, and temperature regulating across both brisk mornings and warm afternoons without holding odor.",
    editorialHighlights: ["18.5 Micron Ultrafine Merino", "Zero-Itch Skin Feel", "Natural Odor Resistance", "Flatlock Anti-Chafe Seams"]
  },

  {
    id: "prod-tech-storm-windbreaker",
    slug: "all-weather-storm-shell-windbreaker",
    name: "All-Weather Storm Shell Windbreaker",
    subtitle: "10,000mm hydrostatic waterproof membrane, taped seams, YKK Aquaguard zips",
    dressType: "Water-Resistant Windbreaker",
    mainCategory: "OUTERWEAR",
    gender: "UNISEX",
    ageGroup: "ADULT",
    fabricType: "DWR 3-Layer Ripstop Nylon",
    fabricWeightGsm: 190,
    breathabilityRating: "10,000mm Hydrostatic / 10,000 g/m²/24hr Breathability",
    modelReference: 'Model is 6\'1" (185 cm) wearing size L (Regular Fit)',
    badge: "WATERPROOF 10K",
    careInstructions: "Machine wash cold delicate. Tumble dry low for 20 minutes to reactivate DWR coating. Do not dry clean.",
    fitType: "Regular Fit",
    basePrice: 5800,
    discountPrice: 5200,
    currency: "BDT",
    primaryColor: "Stealth Black",
    primaryColorHex: "#0F1012",
    colorVariants: [
      {
        colorName: "Stealth Black",
        colorHex: "#0F1012",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526216/ecwearable/products/prod-tech-storm-windbreaker/stealth-black-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526216/ecwearable/products/prod-tech-storm-windbreaker/stealth-black-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526216/ecwearable/products/prod-tech-storm-windbreaker/stealth-black-3-detail.webp"
        ]
      },
      {
        colorName: "Signal Ember",
        colorHex: "#C74B28",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526215/ecwearable/products/prod-tech-storm-windbreaker/signal-ember-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526215/ecwearable/products/prod-tech-storm-windbreaker/signal-ember-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526215/ecwearable/products/prod-tech-storm-windbreaker/signal-ember-3-detail.webp"
        ]
      }
    ],
    sizes: [
      {
        sizeLabel: "XS",
        stock: 5,
        skuSuffix: "XS-STM",
        measurementsInch: { chest: 41.0, shoulder: 18.0, length: 28.0, sleeve: 25.5 },
        measurementsCm: { chest: 104.1, shoulder: 45.7, length: 71.1, sleeve: 64.8 }
      },
      {
        sizeLabel: "S",
        stock: 11,
        skuSuffix: "S-STM",
        measurementsInch: { chest: 43.5, shoulder: 18.8, length: 29.0, sleeve: 26.0 },
        measurementsCm: { chest: 110.5, shoulder: 47.8, length: 73.7, sleeve: 66.0 }
      },
      {
        sizeLabel: "M",
        stock: 18,
        skuSuffix: "M-STM",
        measurementsInch: { chest: 46.0, shoulder: 19.5, length: 30.0, sleeve: 26.5 },
        measurementsCm: { chest: 116.8, shoulder: 49.5, length: 76.2, sleeve: 67.3 }
      },
      {
        sizeLabel: "L",
        stock: 14,
        skuSuffix: "L-STM",
        measurementsInch: { chest: 48.5, shoulder: 20.3, length: 31.0, sleeve: 27.0 },
        measurementsCm: { chest: 123.2, shoulder: 51.6, length: 78.7, sleeve: 68.6 }
      },
      {
        sizeLabel: "XL",
        stock: 8,
        skuSuffix: "XL-STM",
        measurementsInch: { chest: 51.0, shoulder: 21.0, length: 32.0, sleeve: 27.5 },
        measurementsCm: { chest: 129.5, shoulder: 53.3, length: 81.3, sleeve: 69.8 }
      },
      {
        sizeLabel: "XXL",
        stock: 4,
        skuSuffix: "XXL-STM",
        measurementsInch: { chest: 53.5, shoulder: 21.8, length: 33.0, sleeve: 28.0 },
        measurementsCm: { chest: 135.9, shoulder: 55.4, length: 83.8, sleeve: 71.1 }
      }
    ],
    isNewCollection: true,
    isTrending: true,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 51,
    createdAt: "2026-03-23T10:00:00Z",
    description: "An uncompromising technical shell constructed with 3-layer micro-ripstop and a breathable waterproof membrane. Features fully sealed seams, two-way YKK AquaGuard® zippers, storm visor hood, and underarm venting for active heat expulsion.",
    editorialHighlights: ["10,000mm Waterproof Taped Seams", "YKK AquaGuard® Dual Zippers", "Underarm Ventilation Pit-Zips", "Packable Into Internal Chest Pocket"]
  },

  {
    id: "prod-tech-active-jogger",
    slug: "ergonomic-activewear-transit-jogger",
    name: "Ergonomic Activewear Transit Jogger",
    subtitle: "4-way technical stretch double-weave with moisture-wicking gusset and concealed zip storage",
    dressType: "Cargo Pants & Joggers",
    mainCategory: "BASICS",
    gender: "UNISEX",
    ageGroup: "ADULT",
    fabricType: "4-Way Stretch Technical Knit",
    fabricWeightGsm: 260,
    breathabilityRating: "Dynamic moisture transfer 58 CFM",
    modelReference: 'Model is 6\'0" (183 cm) wearing size M (Athletic Taper)',
    badge: "4-WAY STRETCH",
    careInstructions: "Machine wash cold with synthetic activewear wash. Do not use fabric softeners. Line dry.",
    fitType: "Athletic Taper",
    basePrice: 3200,
    discountPrice: 2800,
    currency: "BDT",
    primaryColor: "Deep Onyx",
    primaryColorHex: "#171717",
    colorVariants: [
      {
        colorName: "Deep Onyx",
        colorHex: "#171717",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526208/ecwearable/products/prod-tech-active-jogger/deep-onyx-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526208/ecwearable/products/prod-tech-active-jogger/deep-onyx-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526209/ecwearable/products/prod-tech-active-jogger/deep-onyx-3-detail.webp"
        ]
      }
    ],
    sizes: [
      {
        sizeLabel: "S",
        stock: 15,
        skuSuffix: "S-JOG",
        measurementsInch: { waist: 29.0, inseam: 29.5, length: 39.0 },
        measurementsCm: { waist: 73.7, inseam: 74.9, length: 99.1 }
      },
      {
        sizeLabel: "M",
        stock: 22,
        skuSuffix: "M-JOG",
        measurementsInch: { waist: 31.0, inseam: 30.0, length: 40.0 },
        measurementsCm: { waist: 78.7, inseam: 76.2, length: 101.6 }
      },
      {
        sizeLabel: "L",
        stock: 18,
        skuSuffix: "L-JOG",
        measurementsInch: { waist: 33.0, inseam: 30.5, length: 41.0 },
        measurementsCm: { waist: 83.8, inseam: 77.5, length: 104.1 }
      },
      {
        sizeLabel: "XL",
        stock: 10,
        skuSuffix: "XL-JOG",
        measurementsInch: { waist: 35.0, inseam: 31.0, length: 42.0 },
        measurementsCm: { waist: 88.9, inseam: 78.7, length: 106.7 }
      }
    ],
    isNewCollection: false,
    isTrending: true,
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 39,
    createdAt: "2026-03-18T10:00:00Z",
    description: "Designed for seamless transitions between morning training and all-day commute. Crafted from durable nylon-elastane double-weave that stretches 4 ways without bagging out at the knees.",
    editorialHighlights: ["4-Way Omnidirectional Stretch", "Concealed Phone Security Pocket", "Abrasion-Resistant Face Fabric", "Elastic Waistband with Dipped Cord"]
  },

  {
    id: "prod-tech-cordura-daypack",
    slug: "cordura-ballistic-utility-daypack-22l",
    name: "Cordura® Ballistic Utility Daypack 22L",
    subtitle: "500D water-resistant Cordura nylon with fidlock magnetic buckles and padded 16\" laptop chamber",
    dressType: "Technical Bags & Caps",
    mainCategory: "ACCESSORIES",
    gender: "UNISEX",
    ageGroup: "ADULT",
    fabricType: "Cordura® 500D Ballistic Nylon",
    fabricWeightGsm: 500,
    breathabilityRating: "Weather-resistant PU back-coating",
    badge: "CORDURA® 500D",
    careInstructions: "Spot clean with warm water and mild detergent. Air dry. Do not machine wash.",
    fitType: "Adjustable",
    basePrice: 4800,
    discountPrice: 4200,
    currency: "BDT",
    primaryColor: "Tactical Black",
    primaryColorHex: "#121314",
    colorVariants: [
      {
        colorName: "Tactical Black",
        colorHex: "#121314",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526208/ecwearable/products/prod-tech-cordura-daypack/tactical-black-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526209/ecwearable/products/prod-tech-cordura-daypack/tactical-black-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526209/ecwearable/products/prod-tech-cordura-daypack/tactical-black-3-detail.webp"
        ]
      }
    ],
    sizes: [
      {
        sizeLabel: "22L",
        stock: 14,
        skuSuffix: "22L-BLK",
        measurementsInch: { length: 19.0, shoulder: 12.0 },
        measurementsCm: { length: 48.3, shoulder: 30.5 }
      }
    ],
    isNewCollection: true,
    isTrending: false,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 31,
    createdAt: "2026-03-24T10:00:00Z",
    description: "Engineered from military-spec 500D Cordura® nylon. Features quick-release Fidlock® magnetic buckles, suspended and padded 16-inch laptop compartment, ergonomic EVA foam back-panel, and luggage pass-through.",
    editorialHighlights: ["Invista Cordura® 500D Nylon", "German Fidlock® Magnetic Buckles", "Suspended 16-Inch Laptop Cradle", "Ergonomic Channel Airflow Backing"]
  },

  {
    id: "prod-tech-transit-cap",
    slug: "hydrophobic-technical-transit-cap",
    name: "Hydrophobic Technical Transit Cap",
    subtitle: "Laser-perforated lightweight ripstop cap with moisture-wicking headband and magnetic closure",
    dressType: "Technical Bags & Caps",
    mainCategory: "ACCESSORIES",
    gender: "UNISEX",
    ageGroup: "ADULT",
    fabricType: "DWR 3-Layer Ripstop Nylon",
    fabricWeightGsm: 95,
    breathabilityRating: "Laser-cut 360° airflow perforation",
    badge: "LOW WEIGHT",
    careInstructions: "Hand rinse in cool water. Air dry away from direct heat.",
    fitType: "Adjustable",
    basePrice: 1450,
    discountPrice: 1200,
    currency: "BDT",
    primaryColor: "Stealth Black",
    primaryColorHex: "#0D0E10",
    colorVariants: [
      {
        colorName: "Stealth Black",
        colorHex: "#0D0E10",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526216/ecwearable/products/prod-tech-transit-cap/stealth-black-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526217/ecwearable/products/prod-tech-transit-cap/stealth-black-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526218/ecwearable/products/prod-tech-transit-cap/stealth-black-3-detail.webp"
        ]
      }
    ],
    sizes: [
      {
        sizeLabel: "OSFA",
        stock: 25,
        skuSuffix: "OSFA-BLK",
        measurementsInch: { wristOrCase: 22.5 },
        measurementsCm: { wristOrCase: 57.0 }
      }
    ],
    isNewCollection: false,
    isTrending: true,
    isFeatured: true,
    rating: 4.7,
    reviewsCount: 28,
    createdAt: "2026-03-19T10:00:00Z",
    description: "Featherlight 45-gram cap engineered from water-repellent micro-ripstop. Features laser-cut ventilation temples, quick-drying internal sweatband, and flexible crushable brim that springs back into shape.",
    editorialHighlights: ["Ultralight 45g Weight", "Laser-Cut Breathability Ports", "Crushable Packable Brim", "Micro-Adjustable Webbing"]
  },

  // ==========================================
  // 1. MEN'S ADULT GARMENTS
  // ==========================================
  {
    id: "prod-men-linen-shirt",
    slug: "pure-european-linen-casual-shirt",
    name: "Pure European Linen Casual Shirt",
    subtitle: "Air-washed 180 GSM Normandy Flax with camp collar",
    dressType: "Linen Shirt",
    mainCategory: "GARMENTS",
    gender: "MALE",
    ageGroup: "ADULT",
    fabricType: "Pure European Linen",
    fabricWeightGsm: 180,
    careInstructions: "Gentle cold machine wash, line dry in shade. Iron damp.",
    fitType: "Relaxed Fit",
    basePrice: 3850,
    discountPrice: 3450,
    currency: "BDT",
    primaryColor: "Ecru Alabaster",
    primaryColorHex: "#F2EFE9",
    colorVariants: [
      {
        colorName: "Ecru Alabaster",
        colorHex: "#F2EFE9",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526200/ecwearable/products/prod-men-linen-shirt/ecru-alabaster-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526197/ecwearable/products/prod-men-linen-shirt/ecru-alabaster-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526198/ecwearable/products/prod-men-linen-shirt/ecru-alabaster-3-detail.webp"
        ]
      },
      {
        colorName: "Botanical Cypress",
        colorHex: "#2D4A3E",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526196/ecwearable/products/prod-men-linen-shirt/botanical-cypress-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526196/ecwearable/products/prod-men-linen-shirt/botanical-cypress-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526196/ecwearable/products/prod-men-linen-shirt/botanical-cypress-3-detail.webp"
        ]
      },
      {
        colorName: "Midnight Espresso",
        colorHex: "#181816",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526198/ecwearable/products/prod-men-linen-shirt/midnight-espresso-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526200/ecwearable/products/prod-men-linen-shirt/midnight-espresso-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526200/ecwearable/products/prod-men-linen-shirt/midnight-espresso-3-detail.webp"
        ]
      }
    ],
    sizes: [
      {
        sizeLabel: "S",
        stock: 12,
        skuSuffix: "S-ECR",
        measurementsInch: { chest: 38.0, shoulder: 17.5, length: 28.5, sleeve: 24.5 },
        measurementsCm: { chest: 96.5, shoulder: 44.5, length: 72.4, sleeve: 62.2 }
      },
      {
        sizeLabel: "M",
        stock: 24,
        skuSuffix: "M-ECR",
        measurementsInch: { chest: 40.5, shoulder: 18.0, length: 29.5, sleeve: 25.0 },
        measurementsCm: { chest: 102.9, shoulder: 45.7, length: 74.9, sleeve: 63.5 }
      },
      {
        sizeLabel: "L",
        stock: 18,
        skuSuffix: "L-ECR",
        measurementsInch: { chest: 43.0, shoulder: 18.8, length: 30.5, sleeve: 25.5 },
        measurementsCm: { chest: 109.2, shoulder: 47.8, length: 77.5, sleeve: 64.8 }
      },
      {
        sizeLabel: "XL",
        stock: 8,
        skuSuffix: "XL-ECR",
        measurementsInch: { chest: 45.5, shoulder: 19.5, length: 31.5, sleeve: 26.0 },
        measurementsCm: { chest: 115.6, shoulder: 49.5, length: 80.0, sleeve: 66.0 }
      }
    ],
    isNewCollection: true,
    isTrending: true,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 38,
    createdAt: "2026-03-15T10:00:00Z",
    description: "Tailored from French flax cultivated in Normandy, this casual linen shirt is garment-washed for a softened drape that breathes effortlessly through high humidity.",
    editorialHighlights: ["100% Normandy Flax", "Corozo Nut Buttons", "Single Needle French Seams", "Relaxed Cuban Collar"]
  },

  {
    id: "prod-men-panjabi-festive",
    slug: "artisan-embroidered-festive-panjabi",
    name: "Artisan Embroidered Festive Panjabi",
    subtitle: "Fine Mulberry silk-cotton blend with subtle placket tone-on-tone threadwork",
    dressType: "Panjabi",
    mainCategory: "GARMENTS",
    gender: "MALE",
    ageGroup: "ADULT",
    fabricType: "Mulberry Silk",
    fabricWeightGsm: 165,
    careInstructions: "Dry clean only. Store on wide hanger.",
    fitType: "Tailored Fit",
    basePrice: 6500,
    currency: "BDT",
    primaryColor: "Warm Alabaster",
    primaryColorHex: "#FAF8F5",
    colorVariants: [
      {
        colorName: "Warm Alabaster",
        colorHex: "#FAF8F5",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526202/ecwearable/products/prod-men-panjabi-festive/warm-alabaster-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526202/ecwearable/products/prod-men-panjabi-festive/warm-alabaster-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526204/ecwearable/products/prod-men-panjabi-festive/warm-alabaster-3-detail.webp"
        ]
      },
      {
        colorName: "Midnight Navy",
        colorHex: "#1B2430",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526200/ecwearable/products/prod-men-panjabi-festive/midnight-navy-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526202/ecwearable/products/prod-men-panjabi-festive/midnight-navy-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526202/ecwearable/products/prod-men-panjabi-festive/midnight-navy-3-detail.webp"
        ]
      }
    ],
    sizes: [
      {
        sizeLabel: "38",
        stock: 9,
        skuSuffix: "38-WHT",
        measurementsInch: { chest: 39.0, shoulder: 17.5, length: 40.0, sleeve: 24.5 },
        measurementsCm: { chest: 99.1, shoulder: 44.5, length: 101.6, sleeve: 62.2 }
      },
      {
        sizeLabel: "40",
        stock: 15,
        skuSuffix: "40-WHT",
        measurementsInch: { chest: 41.0, shoulder: 18.0, length: 42.0, sleeve: 25.0 },
        measurementsCm: { chest: 104.1, shoulder: 45.7, length: 106.7, sleeve: 63.5 }
      },
      {
        sizeLabel: "42",
        stock: 14,
        skuSuffix: "42-WHT",
        measurementsInch: { chest: 43.0, shoulder: 18.5, length: 43.0, sleeve: 25.5 },
        measurementsCm: { chest: 109.2, shoulder: 47.0, length: 109.2, sleeve: 64.8 }
      },
      {
        sizeLabel: "44",
        stock: 6,
        skuSuffix: "44-WHT",
        measurementsInch: { chest: 45.0, shoulder: 19.2, length: 44.0, sleeve: 26.0 },
        measurementsCm: { chest: 114.3, shoulder: 48.8, length: 111.8, sleeve: 66.0 }
      }
    ],
    isNewCollection: true,
    isTrending: true,
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 22,
    createdAt: "2026-03-20T11:00:00Z",
    description: "An heirloom-grade celebratory garment crafted from shimmering silk and breathable long-staple cotton, finished with minimalist needlework along the band collar.",
    editorialHighlights: ["Mulberry Silk Lustre", "Hand-Finished Placket", "Concealed Side Pockets", "Bespoke Horn Buttons"]
  },

  {
    id: "prod-men-egyptian-polo",
    slug: "egyptian-cotton-tailored-polo",
    name: "Egyptian Cotton Tailored Polo",
    subtitle: "Mercerized 220 GSM Giza 87 double-knit pique",
    dressType: "Polo",
    mainCategory: "GARMENTS",
    gender: "MALE",
    ageGroup: "ADULT",
    fabricType: "Egyptian Giza Cotton",
    fabricWeightGsm: 220,
    careInstructions: "Machine wash cold inside out, lay flat to dry.",
    fitType: "Tailored Fit",
    basePrice: 2850,
    currency: "BDT",
    primaryColor: "Terracotta Rust",
    primaryColorHex: "#9E4733",
    colorVariants: [
      {
        colorName: "Terracotta Rust",
        colorHex: "#9E4733",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526197/ecwearable/products/prod-men-egyptian-polo/terracotta-rust-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526201/ecwearable/products/prod-men-egyptian-polo/terracotta-rust-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526193/ecwearable/products/prod-men-egyptian-polo/terracotta-rust-3-detail.webp"
        ]
      },
      {
        colorName: "Obsidian Charcoal",
        colorHex: "#141413",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526190/ecwearable/products/prod-men-egyptian-polo/obsidian-charcoal-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526192/ecwearable/products/prod-men-egyptian-polo/obsidian-charcoal-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526195/ecwearable/products/prod-men-egyptian-polo/obsidian-charcoal-3-detail.webp"
        ]
      }
    ],
    sizes: [
      {
        sizeLabel: "S",
        stock: 10,
        skuSuffix: "S-TER",
        measurementsInch: { chest: 37.5, shoulder: 16.8, length: 27.5, sleeve: 8.5 },
        measurementsCm: { chest: 95.3, shoulder: 42.7, length: 69.9, sleeve: 21.6 }
      },
      {
        sizeLabel: "M",
        stock: 20,
        skuSuffix: "M-TER",
        measurementsInch: { chest: 40.0, shoulder: 17.5, length: 28.5, sleeve: 9.0 },
        measurementsCm: { chest: 101.6, shoulder: 44.5, length: 72.4, sleeve: 22.9 }
      },
      {
        sizeLabel: "L",
        stock: 18,
        skuSuffix: "L-TER",
        measurementsInch: { chest: 42.5, shoulder: 18.2, length: 29.5, sleeve: 9.5 },
        measurementsCm: { chest: 108.0, shoulder: 46.2, length: 74.9, sleeve: 24.1 }
      },
      {
        sizeLabel: "XL",
        stock: 12,
        skuSuffix: "XL-TER",
        measurementsInch: { chest: 45.0, shoulder: 19.0, length: 30.5, sleeve: 10.0 },
        measurementsCm: { chest: 114.3, shoulder: 48.3, length: 77.5, sleeve: 25.4 }
      }
    ],
    isNewCollection: false,
    isTrending: true,
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 45,
    createdAt: "2026-02-10T12:00:00Z",
    description: "Spun from extra-long staple Egyptian Giza cotton, mercerized for subtle sheen and durable colorfastness. Designed with an open structured collar without buttons.",
    editorialHighlights: ["Giza 87 Extra-Long Staple", "Mercerized Lustre", "Ribbed Seamless Cuffs", "Split Hem"]
  },

  {
    id: "prod-men-pleated-chino",
    slug: "relaxed-pleated-chino-trousers",
    name: "Relaxed Pleated Chino Trousers",
    subtitle: "High-twist 240 GSM organic cotton twill with single reverse pleats",
    dressType: "Trousers",
    mainCategory: "GARMENTS",
    gender: "MALE",
    ageGroup: "ADULT",
    fabricType: "100% Organic Cotton",
    fabricWeightGsm: 240,
    careInstructions: "Machine wash lukewarm, warm iron. Dry clean compatible.",
    fitType: "Relaxed Fit",
    basePrice: 3450,
    currency: "BDT",
    primaryColor: "Sand Stone",
    primaryColorHex: "#D8D2C2",
    colorVariants: [
      {
        colorName: "Sand Stone",
        colorHex: "#D8D2C2",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526204/ecwearable/products/prod-men-pleated-chino/sand-stone-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526204/ecwearable/products/prod-men-pleated-chino/sand-stone-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526204/ecwearable/products/prod-men-pleated-chino/sand-stone-3-detail.webp"
        ]
      },
      {
        colorName: "Deep Espresso",
        colorHex: "#141413",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526204/ecwearable/products/prod-men-pleated-chino/deep-espresso-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526203/ecwearable/products/prod-men-pleated-chino/deep-espresso-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526204/ecwearable/products/prod-men-pleated-chino/deep-espresso-3-detail.webp"
        ]
      }
    ],
    sizes: [
      {
        sizeLabel: "30",
        stock: 7,
        skuSuffix: "30-SND",
        measurementsInch: { waist: 31.0, length: 39.5, inseam: 29.5 },
        measurementsCm: { waist: 78.7, length: 100.3, inseam: 74.9 }
      },
      {
        sizeLabel: "32",
        stock: 14,
        skuSuffix: "32-SND",
        measurementsInch: { waist: 33.0, length: 40.5, inseam: 30.5 },
        measurementsCm: { waist: 83.8, length: 102.9, inseam: 77.5 }
      },
      {
        sizeLabel: "34",
        stock: 12,
        skuSuffix: "34-SND",
        measurementsInch: { waist: 35.0, length: 41.5, inseam: 31.0 },
        measurementsCm: { waist: 88.9, length: 105.4, inseam: 78.7 }
      },
      {
        sizeLabel: "36",
        stock: 5,
        skuSuffix: "36-SND",
        measurementsInch: { waist: 37.0, length: 42.0, inseam: 31.5 },
        measurementsCm: { waist: 94.0, length: 106.7, inseam: 80.0 }
      }
    ],
    isNewCollection: false,
    isTrending: false,
    isFeatured: false,
    rating: 4.7,
    reviewsCount: 19,
    createdAt: "2026-01-20T09:00:00Z",
    description: "Tailored with architectural single front pleats and a relaxed tapered leg that breaks softly over loafers or boots. Includes internal tab adjusters.",
    editorialHighlights: ["High-Twist Organic Twill", "Single Reverse Pleats", "Hidden Waist Adjusters", "Horn Buttons"]
  },

  {
    id: "prod-men-merino-overshirt",
    slug: "merino-wool-overshirt",
    name: "Merino Wool Overshirt",
    subtitle: "Dense 280 GSM boiled Australian merino with dual patch pockets",
    dressType: "Overshirt",
    mainCategory: "GARMENTS",
    gender: "MALE",
    ageGroup: "ADULT",
    fabricType: "Merino Wool",
    fabricWeightGsm: 280,
    careInstructions: "Specialist wool dry clean. Air out between wears.",
    fitType: "Regular Fit",
    basePrice: 5200,
    currency: "BDT",
    primaryColor: "Olive Sage",
    primaryColorHex: "#3E4A3E",
    colorVariants: [
      {
        colorName: "Olive Sage",
        colorHex: "#3E4A3E",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526202/ecwearable/products/prod-men-merino-overshirt/olive-sage-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526201/ecwearable/products/prod-men-merino-overshirt/olive-sage-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526202/ecwearable/products/prod-men-merino-overshirt/olive-sage-3-detail.webp"
        ]
      }
    ],
    sizes: [
      {
        sizeLabel: "M",
        stock: 8,
        skuSuffix: "M-OLV",
        measurementsInch: { chest: 42.0, shoulder: 18.5, length: 29.0, sleeve: 25.5 },
        measurementsCm: { chest: 106.7, shoulder: 47.0, length: 73.7, sleeve: 64.8 }
      },
      {
        sizeLabel: "L",
        stock: 10,
        skuSuffix: "L-OLV",
        measurementsInch: { chest: 44.5, shoulder: 19.2, length: 30.0, sleeve: 26.0 },
        measurementsCm: { chest: 113.0, shoulder: 48.8, length: 76.2, sleeve: 66.0 }
      }
    ],
    isNewCollection: true,
    isTrending: false,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 16,
    createdAt: "2026-03-01T15:00:00Z",
    description: "An understated transitional layer woven from thermoregulating boiled merino wool that repels light drizzle and blocks spring breezes.",
    editorialHighlights: ["100% Australian Merino", "Natural Odor Resistance", "Double-Stitched Pockets", "Brushed Interior"]
  },

  // ==========================================
  // 2. WOMEN'S ADULT GARMENTS
  // ==========================================
  {
    id: "prod-women-muslin-saree",
    slug: "handloom-muslin-silk-festive-saree",
    name: "Handloom Muslin & Silk Festive Saree",
    subtitle: "Dhakai heirloom weave with antique zari borders and unstitched blouse piece",
    dressType: "Saree",
    mainCategory: "GARMENTS",
    gender: "FEMALE",
    ageGroup: "ADULT",
    fabricType: "Dhakai Jamdani / Muslin",
    fabricWeightGsm: 110,
    careInstructions: "Exclusive dry clean only. Wrap in unbleached cotton muslin cloth.",
    fitType: "Regular Fit",
    basePrice: 12500,
    currency: "BDT",
    primaryColor: "Raw Silk Ecru",
    primaryColorHex: "#F5F1E8",
    colorVariants: [
      {
        colorName: "Raw Silk Ecru",
        colorHex: "#F5F1E8",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526227/ecwearable/products/prod-women-muslin-saree/raw-silk-ecru-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526227/ecwearable/products/prod-women-muslin-saree/raw-silk-ecru-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526228/ecwearable/products/prod-women-muslin-saree/raw-silk-ecru-3-detail.webp"
        ]
      },
      {
        colorName: "Crimson Rust",
        colorHex: "#8D3426",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526226/ecwearable/products/prod-women-muslin-saree/crimson-rust-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526227/ecwearable/products/prod-women-muslin-saree/crimson-rust-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526227/ecwearable/products/prod-women-muslin-saree/crimson-rust-3-detail.webp"
        ]
      }
    ],
    sizes: [
      {
        sizeLabel: "5.5M Standard",
        stock: 5,
        skuSuffix: "STD-ECR",
        measurementsInch: { length: 216.0, waist: 46.0 },
        measurementsCm: { length: 548.6, waist: 116.8 }
      }
    ],
    isNewCollection: true,
    isTrending: true,
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 31,
    createdAt: "2026-03-22T08:00:00Z",
    description: "Woven over four months by heritage master weavers on traditional pit looms, combining featherweight Dhakai fine yarn with pure mulberry silk highlights.",
    editorialHighlights: ["Heirloom Dhakai Weave", "Real Antique Zari Weft", "Featherlight 110 GSM", "Includes 0.8M Blouse Fabric"]
  },

  {
    id: "prod-women-linen-midi-dress",
    slug: "belted-pure-linen-midi-dress",
    name: "Belted Pure Linen Midi Dress",
    subtitle: "Sculptural silhouette with removable sash belt and deep side slits",
    dressType: "Midi Dress",
    mainCategory: "GARMENTS",
    gender: "FEMALE",
    ageGroup: "ADULT",
    fabricType: "Pure European Linen",
    fabricWeightGsm: 195,
    careInstructions: "Machine wash cold inside out, hang to dry.",
    fitType: "Tailored Fit",
    basePrice: 4600,
    currency: "BDT",
    primaryColor: "Cypress Green",
    primaryColorHex: "#2D4A3E",
    colorVariants: [
      {
        colorName: "Cypress Green",
        colorHex: "#2D4A3E",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526224/ecwearable/products/prod-women-linen-midi-dress/cypress-green-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526224/ecwearable/products/prod-women-linen-midi-dress/cypress-green-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526225/ecwearable/products/prod-women-linen-midi-dress/cypress-green-3-detail.webp"
        ]
      },
      {
        colorName: "Warm Sand",
        colorHex: "#E5DEC9",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526226/ecwearable/products/prod-women-linen-midi-dress/warm-sand-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526226/ecwearable/products/prod-women-linen-midi-dress/warm-sand-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526225/ecwearable/products/prod-women-linen-midi-dress/warm-sand-3-detail.webp"
        ]
      }
    ],
    sizes: [
      {
        sizeLabel: "XS",
        stock: 6,
        skuSuffix: "XS-CYP",
        measurementsInch: { chest: 33.0, waist: 26.0, length: 47.0 },
        measurementsCm: { chest: 83.8, waist: 66.0, length: 119.4 }
      },
      {
        sizeLabel: "S",
        stock: 14,
        skuSuffix: "S-CYP",
        measurementsInch: { chest: 35.0, waist: 28.0, length: 48.0 },
        measurementsCm: { chest: 88.9, waist: 71.1, length: 121.9 }
      },
      {
        sizeLabel: "M",
        stock: 16,
        skuSuffix: "M-CYP",
        measurementsInch: { chest: 37.0, waist: 30.0, length: 48.5 },
        measurementsCm: { chest: 94.0, waist: 76.2, length: 123.2 }
      },
      {
        sizeLabel: "L",
        stock: 8,
        skuSuffix: "L-CYP",
        measurementsInch: { chest: 39.5, waist: 32.5, length: 49.0 },
        measurementsCm: { chest: 100.3, waist: 82.6, length: 124.5 }
      }
    ],
    isNewCollection: true,
    isTrending: true,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 27,
    createdAt: "2026-03-18T14:30:00Z",
    description: "An effortless architectural staple with subtle cap sleeves and an adjustable fabric tie. Can be worn cinched at the natural waist or relaxed.",
    editorialHighlights: ["100% Belgian Flax", "Deep Functional Pockets", "Corozo Button Back Placket", "High Side Vents"]
  },

  {
    id: "prod-women-embroidered-kurti",
    slug: "botanical-embroidered-cotton-kurti",
    name: "Botanical Embroidered Cotton Kurti",
    subtitle: "Breathable 60s combed cotton with hand-drawn leaf motif embroidery",
    dressType: "Kurti",
    mainCategory: "GARMENTS",
    gender: "FEMALE",
    ageGroup: "ADULT",
    fabricType: "100% Organic Cotton",
    fabricWeightGsm: 145,
    careInstructions: "Delicate machine wash inside out, medium iron.",
    fitType: "Regular Fit",
    basePrice: 2650,
    currency: "BDT",
    primaryColor: "Terracotta Earth",
    primaryColorHex: "#9E4733",
    colorVariants: [
      {
        colorName: "Terracotta Earth",
        colorHex: "#9E4733",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526223/ecwearable/products/prod-women-embroidered-kurti/terracotta-earth-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526223/ecwearable/products/prod-women-embroidered-kurti/terracotta-earth-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526223/ecwearable/products/prod-women-embroidered-kurti/terracotta-earth-3-detail.webp"
        ]
      },
      {
        colorName: "Ecru Ivory",
        colorHex: "#F8F5EE",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526222/ecwearable/products/prod-women-embroidered-kurti/ecru-ivory-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526222/ecwearable/products/prod-women-embroidered-kurti/ecru-ivory-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526223/ecwearable/products/prod-women-embroidered-kurti/ecru-ivory-3-detail.webp"
        ]
      }
    ],
    sizes: [
      {
        sizeLabel: "S",
        stock: 11,
        skuSuffix: "S-TER",
        measurementsInch: { chest: 36.0, shoulder: 14.5, length: 42.0, sleeve: 18.0 },
        measurementsCm: { chest: 91.4, shoulder: 36.8, length: 106.7, sleeve: 45.7 }
      },
      {
        sizeLabel: "M",
        stock: 18,
        skuSuffix: "M-TER",
        measurementsInch: { chest: 38.0, shoulder: 15.0, length: 43.0, sleeve: 18.5 },
        measurementsCm: { chest: 96.5, shoulder: 38.1, length: 109.2, sleeve: 47.0 }
      },
      {
        sizeLabel: "L",
        stock: 15,
        skuSuffix: "L-TER",
        measurementsInch: { chest: 40.5, shoulder: 15.5, length: 44.0, sleeve: 19.0 },
        measurementsCm: { chest: 102.9, shoulder: 39.4, length: 111.8, sleeve: 48.3 }
      }
    ],
    isNewCollection: false,
    isTrending: true,
    isFeatured: false,
    rating: 4.8,
    reviewsCount: 39,
    createdAt: "2026-02-14T09:00:00Z",
    description: "Crafted from fine combed cotton that softens with every wear, detailed with delicate botanical stem embroidery inspired by tropical foliage.",
    editorialHighlights: ["GOTS Certified Cotton", "Artisanal Needlework", "Mandarin Keyhole Collar", "Clean Straight Cut"]
  },

  {
    id: "prod-women-linen-coord",
    slug: "tailored-linen-co-ord-set",
    name: "Tailored Linen Co-ord Set",
    subtitle: "Double-breasted short sleeve waistcoat and pleated wide-leg trousers",
    dressType: "Co-ord Set",
    mainCategory: "GARMENTS",
    gender: "FEMALE",
    ageGroup: "ADULT",
    fabricType: "Pure European Linen",
    fabricWeightGsm: 210,
    careInstructions: "Dry clean or gentle hand wash. Steam iron.",
    fitType: "Tailored Fit",
    basePrice: 5900,
    currency: "BDT",
    primaryColor: "Oatmeal Stone",
    primaryColorHex: "#D6CEBF",
    colorVariants: [
      {
        colorName: "Oatmeal Stone",
        colorHex: "#D6CEBF",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526224/ecwearable/products/prod-women-linen-coord/oatmeal-stone-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526223/ecwearable/products/prod-women-linen-coord/oatmeal-stone-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526224/ecwearable/products/prod-women-linen-coord/oatmeal-stone-3-detail.webp"
        ]
      }
    ],
    sizes: [
      {
        sizeLabel: "S",
        stock: 8,
        skuSuffix: "S-OAT",
        measurementsInch: { chest: 35.0, waist: 27.0, length: 41.0, inseam: 30.0 },
        measurementsCm: { chest: 88.9, waist: 68.6, length: 104.1, inseam: 76.2 }
      },
      {
        sizeLabel: "M",
        stock: 12,
        skuSuffix: "M-OAT",
        measurementsInch: { chest: 37.0, waist: 29.0, length: 42.0, inseam: 30.5 },
        measurementsCm: { chest: 94.0, waist: 73.7, length: 106.7, sleeve: 77.5 }
      },
      {
        sizeLabel: "L",
        stock: 6,
        skuSuffix: "L-OAT",
        measurementsInch: { chest: 39.5, waist: 31.5, length: 43.0, inseam: 31.0 },
        measurementsCm: { chest: 100.3, waist: 80.0, length: 109.2, sleeve: 78.7 }
      }
    ],
    isNewCollection: true,
    isTrending: false,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 14,
    createdAt: "2026-03-10T16:00:00Z",
    description: "A two-piece ensemble combining modern power dressing with the relaxed grace of breathable heavy linen. Includes waistcoat and matching trousers.",
    editorialHighlights: ["Complete 2-Piece Ensemble", "Horn Front Buttons", "Elastic Back Trouser Band", "Fully Lined Vest"]
  },

  {
    id: "prod-women-cashmere-abaya",
    slug: "modest-cashmere-blend-shawl-abaya",
    name: "Modest Cashmere-Blend Shawl & Abaya",
    subtitle: "Draped cocoon silhouette in 320 GSM cashmere and superfine wool",
    dressType: "Abaya",
    mainCategory: "GARMENTS",
    gender: "FEMALE",
    ageGroup: "ADULT",
    fabricType: "Fine Cashmere Blend",
    fabricWeightGsm: 320,
    careInstructions: "Specialist wool & cashmere dry clean.",
    fitType: "Oversized",
    basePrice: 8900,
    currency: "BDT",
    primaryColor: "Deep Charcoal",
    primaryColorHex: "#1C1C1B",
    colorVariants: [
      {
        colorName: "Deep Charcoal",
        colorHex: "#1C1C1B",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526221/ecwearable/products/prod-women-cashmere-abaya/deep-charcoal-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526221/ecwearable/products/prod-women-cashmere-abaya/deep-charcoal-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526221/ecwearable/products/prod-women-cashmere-abaya/deep-charcoal-3-detail.webp"
        ]
      }
    ],
    sizes: [
      {
        sizeLabel: "54 (Height 5'2-5'4)",
        stock: 7,
        skuSuffix: "54-CHR",
        measurementsInch: { chest: 48.0, length: 54.0, sleeve: 27.0 },
        measurementsCm: { chest: 121.9, length: 137.2, sleeve: 68.6 }
      },
      {
        sizeLabel: "56 (Height 5'5-5'7)",
        stock: 9,
        skuSuffix: "56-CHR",
        measurementsInch: { chest: 50.0, length: 56.0, sleeve: 28.0 },
        measurementsCm: { chest: 127.0, length: 142.2, sleeve: 71.1 }
      }
    ],
    isNewCollection: true,
    isTrending: false,
    isFeatured: false,
    rating: 5.0,
    reviewsCount: 11,
    createdAt: "2026-03-05T13:00:00Z",
    description: "Designed for graceful cold-weather layering, this open-front abaya is accompanied by a coordinated feather-touch cashmere wrap.",
    editorialHighlights: ["Mongolian Cashmere Blend", "Thermal Insulating", "Deep Inset Pockets", "Seamless Dolman Cut"]
  },

  // ==========================================
  // 3. CHILDREN'S GARMENTS (BOYS & GIRLS)
  // ==========================================
  {
    id: "prod-kids-panjabi-boy",
    slug: "kids-organic-cotton-festive-panjabi-set",
    name: "Kids Organic Cotton Festive Panjabi Set",
    subtitle: "Skin-soft 100% GOTS organic cotton with matching pyjama trousers",
    dressType: "Kids Panjabi",
    mainCategory: "GARMENTS",
    gender: "KIDS_BOY",
    ageGroup: "CHILDREN",
    fabricType: "100% Organic Cotton",
    fabricWeightGsm: 140,
    careInstructions: "Machine wash warm, colorfast guaranteed, easy iron.",
    fitType: "Regular Fit",
    basePrice: 2250,
    currency: "BDT",
    primaryColor: "Mustard Saffron",
    primaryColorHex: "#DDA15E",
    colorVariants: [
      {
        colorName: "Mustard Saffron",
        colorHex: "#DDA15E",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526188/ecwearable/products/prod-kids-panjabi-boy/mustard-saffron-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526190/ecwearable/products/prod-kids-panjabi-boy/mustard-saffron-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526189/ecwearable/products/prod-kids-panjabi-boy/mustard-saffron-3-detail.webp"
        ]
      },
      {
        colorName: "Raw Silk Off-White",
        colorHex: "#FAF6EF",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526190/ecwearable/products/prod-kids-panjabi-boy/raw-silk-off-white-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526189/ecwearable/products/prod-kids-panjabi-boy/raw-silk-off-white-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526190/ecwearable/products/prod-kids-panjabi-boy/raw-silk-off-white-3-detail.webp"
        ]
      }
    ],
    sizes: [
      {
        sizeLabel: "3-4Y",
        stock: 12,
        skuSuffix: "34Y-SAF",
        measurementsInch: { chest: 26.0, shoulder: 11.0, length: 24.0, sleeve: 14.5 },
        measurementsCm: { chest: 66.0, shoulder: 27.9, length: 61.0, sleeve: 36.8 }
      },
      {
        sizeLabel: "5-6Y",
        stock: 15,
        skuSuffix: "56Y-SAF",
        measurementsInch: { chest: 28.0, shoulder: 11.8, length: 27.0, sleeve: 16.0 },
        measurementsCm: { chest: 71.1, shoulder: 30.0, length: 68.6, sleeve: 40.6 }
      },
      {
        sizeLabel: "7-8Y",
        stock: 10,
        skuSuffix: "78Y-SAF",
        measurementsInch: { chest: 30.0, shoulder: 12.5, length: 30.0, sleeve: 17.5 },
        measurementsCm: { chest: 76.2, shoulder: 31.8, length: 76.2, sleeve: 44.5 }
      }
    ],
    isNewCollection: true,
    isTrending: true,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 23,
    createdAt: "2026-03-21T09:00:00Z",
    description: "Designed for carefree celebration, featuring soft tag-free seams, child-safe snap buttons, and breathable hypoallergenic organic cotton.",
    editorialHighlights: ["Complete 2-Piece Set", "Tag-Free Scratch Protection", "Elasticated Waist Pyjama", "Naturally Dyed Yarn"]
  },

  {
    id: "prod-kids-linen-frock",
    slug: "girls-smocked-linen-party-frock",
    name: "Girls Smocked Linen Party Frock",
    subtitle: "Artisan hand-smocked bodice with flutter sleeves in soft washed flax",
    dressType: "Frock",
    mainCategory: "GARMENTS",
    gender: "KIDS_GIRL",
    ageGroup: "CHILDREN",
    fabricType: "Pure European Linen",
    fabricWeightGsm: 160,
    careInstructions: "Machine wash delicate, hang dry.",
    fitType: "Regular Fit",
    basePrice: 2450,
    currency: "BDT",
    primaryColor: "Blush Clay",
    primaryColorHex: "#D8A48F",
    colorVariants: [
      {
        colorName: "Blush Clay",
        colorHex: "#D8A48F",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526187/ecwearable/products/prod-kids-linen-frock/blush-clay-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526187/ecwearable/products/prod-kids-linen-frock/blush-clay-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526188/ecwearable/products/prod-kids-linen-frock/blush-clay-3-detail.webp"
        ]
      }
    ],
    sizes: [
      {
        sizeLabel: "2-3Y",
        stock: 8,
        skuSuffix: "23Y-BLS",
        measurementsInch: { chest: 23.0, length: 20.0 },
        measurementsCm: { chest: 58.4, length: 50.8 }
      },
      {
        sizeLabel: "4-5Y",
        stock: 14,
        skuSuffix: "45Y-BLS",
        measurementsInch: { chest: 25.0, length: 23.0 },
        measurementsCm: { chest: 63.5, length: 58.4 }
      },
      {
        sizeLabel: "6-7Y",
        stock: 9,
        skuSuffix: "67Y-BLS",
        measurementsInch: { chest: 27.0, length: 26.0 },
        measurementsCm: { chest: 68.6, length: 66.0 }
      }
    ],
    isNewCollection: true,
    isTrending: false,
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 18,
    createdAt: "2026-03-12T11:00:00Z",
    description: "Delightful smocked detailing with flexible elastic gathering that moves with active toddlers and children. Fully lined in soft organic voile.",
    editorialHighlights: ["Hand-Smocked Bodice", "Cotton Voile Lining", "Natural Shell Back Buttons", "Breathable Linen"]
  },

  {
    id: "prod-kids-romper-toddler",
    slug: "toddler-breathable-cotton-coord-romper",
    name: "Toddler Breathable Cotton Co-ord Romper",
    subtitle: "Double gauze muslin romper with easy nickel-free gusset snaps",
    dressType: "Romper",
    mainCategory: "GARMENTS",
    gender: "UNISEX",
    ageGroup: "CHILDREN",
    fabricType: "100% Organic Cotton",
    fabricWeightGsm: 135,
    careInstructions: "Machine wash warm, tumble dry gentle.",
    fitType: "Relaxed Fit",
    basePrice: 1650,
    currency: "BDT",
    primaryColor: "Sage Mint",
    primaryColorHex: "#B7C4B0",
    colorVariants: [
      {
        colorName: "Sage Mint",
        colorHex: "#B7C4B0",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526190/ecwearable/products/prod-kids-romper-toddler/sage-mint-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526190/ecwearable/products/prod-kids-romper-toddler/sage-mint-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526191/ecwearable/products/prod-kids-romper-toddler/sage-mint-3-detail.webp"
        ]
      }
    ],
    sizes: [
      {
        sizeLabel: "6-12M",
        stock: 10,
        skuSuffix: "612M-SGE",
        measurementsInch: { chest: 20.0, length: 17.0 },
        measurementsCm: { chest: 50.8, length: 43.2 }
      },
      {
        sizeLabel: "12-18M",
        stock: 12,
        skuSuffix: "1218M-SGE",
        measurementsInch: { chest: 21.5, length: 18.5 },
        measurementsCm: { chest: 54.6, length: 47.0 }
      },
      {
        sizeLabel: "18-24M",
        stock: 8,
        skuSuffix: "1824M-SGE",
        measurementsInch: { chest: 23.0, length: 20.0 },
        measurementsCm: { chest: 58.4, length: 50.8 }
      }
    ],
    isNewCollection: false,
    isTrending: false,
    isFeatured: false,
    rating: 4.8,
    reviewsCount: 15,
    createdAt: "2026-01-15T10:00:00Z",
    description: "Pillow-soft double cotton gauze that keeps sensitive skin cool and irritation-free during warm play days.",
    editorialHighlights: ["100% Cotton Gauze", "Nickel-Free Hardware", "Stretchy Leg Openings", "Gender-Neutral Tone"]
  },

  {
    id: "prod-kids-denim-jacket",
    slug: "kids-denim-flannel-jacket",
    name: "Kids Denim & Flannel Jacket",
    subtitle: "10 oz washed indigo denim with brushed cotton tartan lining",
    dressType: "Jacket",
    mainCategory: "GARMENTS",
    gender: "UNISEX",
    ageGroup: "CHILDREN",
    fabricType: "Raw Japanese Denim",
    fabricWeightGsm: 310,
    careInstructions: "Machine wash cold inside out with like colors.",
    fitType: "Regular Fit",
    basePrice: 2850,
    currency: "BDT",
    primaryColor: "Washed Indigo",
    primaryColorHex: "#3A506B",
    colorVariants: [
      {
        colorName: "Washed Indigo",
        colorHex: "#3A506B",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526187/ecwearable/products/prod-kids-denim-jacket/washed-indigo-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526187/ecwearable/products/prod-kids-denim-jacket/washed-indigo-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526187/ecwearable/products/prod-kids-denim-jacket/washed-indigo-3-detail.webp"
        ]
      }
    ],
    sizes: [
      {
        sizeLabel: "4-5Y",
        stock: 7,
        skuSuffix: "45Y-IND",
        measurementsInch: { chest: 28.0, shoulder: 12.0, length: 16.5, sleeve: 15.0 },
        measurementsCm: { chest: 71.1, shoulder: 30.5, length: 41.9, sleeve: 38.1 }
      },
      {
        sizeLabel: "6-7Y",
        stock: 11,
        skuSuffix: "67Y-IND",
        measurementsInch: { chest: 30.0, shoulder: 12.8, length: 18.0, sleeve: 16.5 },
        measurementsCm: { chest: 76.2, shoulder: 32.5, length: 45.7, sleeve: 41.9 }
      },
      {
        sizeLabel: "8-9Y",
        stock: 6,
        skuSuffix: "89Y-IND",
        measurementsInch: { chest: 32.0, shoulder: 13.5, length: 19.5, sleeve: 18.0 },
        measurementsCm: { chest: 81.3, shoulder: 34.3, length: 49.5, sleeve: 45.7 }
      }
    ],
    isNewCollection: false,
    isTrending: true,
    isFeatured: false,
    rating: 4.7,
    reviewsCount: 17,
    createdAt: "2026-02-05T14:00:00Z",
    description: "A rugged, charming mini trucker jacket built to survive rough and tumble, softened by an ultra-cozy plaid interior.",
    editorialHighlights: ["Durable 10 oz Denim", "Warm Tartan Flannel Interior", "Durable Shank Buttons", "Dual Chest Pockets"]
  },

  // ==========================================
  // 4. WEARABLES, WATCHES, FOOTWEAR & ACCESSORIES
  // ==========================================
  {
    id: "prod-watch-chronograph-auto",
    slug: "minimalist-40mm-automatic-chronograph-watch",
    name: "Minimalist 40mm Automatic Chronograph Watch",
    subtitle: "316L surgical steel, exhibition sapphire caseback & 42-hour power reserve",
    dressType: "Chronograph Watch",
    mainCategory: "WEARABLES",
    gender: "UNISEX",
    ageGroup: "ADULT",
    fabricType: "316L Surgical Stainless Steel",
    careInstructions: "Wipe with microfiber cloth. 50M water resistance (splash resistant).",
    fitType: "Adjustable",
    basePrice: 18500,
    discountPrice: 16900,
    currency: "BDT",
    primaryColor: "Brushed Steel & Obsidian",
    primaryColorHex: "#C5A059",
    colorVariants: [
      {
        colorName: "Brushed Steel & Obsidian",
        colorHex: "#C5A059",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526217/ecwearable/products/prod-watch-chronograph-auto/brushed-steel-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526218/ecwearable/products/prod-watch-chronograph-auto/brushed-steel-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526218/ecwearable/products/prod-watch-chronograph-auto/brushed-steel-3-detail.webp"
        ]
      },
      {
        colorName: "Midnight Blackout",
        colorHex: "#141413",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526218/ecwearable/products/prod-watch-chronograph-auto/midnight-blackout-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526218/ecwearable/products/prod-watch-chronograph-auto/midnight-blackout-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526218/ecwearable/products/prod-watch-chronograph-auto/midnight-blackout-3-detail.webp"
        ]
      }
    ],
    sizes: [
      {
        sizeLabel: "40mm Case (Standard)",
        stock: 7,
        skuSuffix: "40MM-STL",
        measurementsInch: { wristOrCase: 1.57 },
        measurementsCm: { wristOrCase: 4.0 }
      }
    ],
    isNewCollection: true,
    isTrending: true,
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 42,
    createdAt: "2026-03-24T12:00:00Z",
    description: "An architectural chronograph driven by an automatic mechanical calibre. Features domed anti-reflective sapphire crystal, faceted baton markers, and interchangeable milanese mesh strap.",
    editorialHighlights: ["24-Jewel Automatic Movement", "AR-Coated Sapphire Crystal", "316L Marine-Grade Steel", "5 ATM Depth Rated"]
  },

  {
    id: "prod-watch-heritage-leather",
    slug: "classic-heritage-leather-dress-watch",
    name: "Classic Heritage Leather Dress Watch",
    subtitle: "Ultra-thin 38mm champagne dial with Italian vegetable-tanned bridle leather strap",
    dressType: "Dress Watch",
    mainCategory: "WEARABLES",
    gender: "UNISEX",
    ageGroup: "ADULT",
    fabricType: "Full-Grain Italian Leather",
    careInstructions: "Avoid soaking leather in water. Condition with beeswax balm annually.",
    fitType: "Adjustable",
    basePrice: 9800,
    currency: "BDT",
    primaryColor: "Cognac Brown & Brass",
    primaryColorHex: "#99582A",
    colorVariants: [
      {
        colorName: "Cognac Brown & Brass",
        colorHex: "#99582A",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526219/ecwearable/products/prod-watch-heritage-leather/cognac-brass-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526219/ecwearable/products/prod-watch-heritage-leather/cognac-brass-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526220/ecwearable/products/prod-watch-heritage-leather/cognac-brass-3-detail.webp"
        ]
      }
    ],
    sizes: [
      {
        sizeLabel: "38mm Case (Slim)",
        stock: 9,
        skuSuffix: "38MM-COG",
        measurementsInch: { wristOrCase: 1.5 },
        measurementsCm: { wristOrCase: 3.8 }
      }
    ],
    isNewCollection: false,
    isTrending: true,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 34,
    createdAt: "2026-02-18T10:00:00Z",
    description: "With a profile of just 7.2mm, this heritage dress watch slips seamlessly beneath tailored shirt cuffs. The vegetable-tanned Tuscan leather strap patinas richly over time.",
    editorialHighlights: ["7.2mm Ultra-Thin Profile", "Tuscan Bridle Leather", "Sunburst Champagne Dial", "Swiss Quartz Movement"]
  },

  {
    id: "prod-shoe-chelsea-boot",
    slug: "handcrafted-italian-leather-chelsea-boots",
    name: "Handcrafted Italian Leather Chelsea Boots",
    subtitle: "Blake-stitched full-grain calfskin leather with Vibram rubber half-sole",
    dressType: "Chelsea Boots",
    mainCategory: "FOOTWEAR",
    gender: "MALE",
    ageGroup: "ADULT",
    fabricType: "Full-Grain Italian Leather",
    careInstructions: "Use cedar shoe trees. Polish with natural cream wax.",
    fitType: "Regular Fit",
    basePrice: 9500,
    discountPrice: 8750,
    currency: "BDT",
    primaryColor: "Oxblood Espresso",
    primaryColorHex: "#3D2B1F",
    colorVariants: [
      {
        colorName: "Oxblood Espresso",
        colorHex: "#3D2B1F",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526206/ecwearable/products/prod-shoe-chelsea-boot/oxblood-espresso-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526206/ecwearable/products/prod-shoe-chelsea-boot/oxblood-espresso-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526206/ecwearable/products/prod-shoe-chelsea-boot/oxblood-espresso-3-detail.webp"
        ]
      },
      {
        colorName: "Obsidian Black",
        colorHex: "#141413",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526205/ecwearable/products/prod-shoe-chelsea-boot/obsidian-black-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526206/ecwearable/products/prod-shoe-chelsea-boot/obsidian-black-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526206/ecwearable/products/prod-shoe-chelsea-boot/obsidian-black-3-detail.webp"
        ]
      }
    ],
    sizes: [
      {
        sizeLabel: "EU 40 (US 7.5)",
        stock: 5,
        skuSuffix: "40-OXB",
        measurementsInch: { footLength: 10.1 },
        measurementsCm: { footLength: 25.7 }
      },
      {
        sizeLabel: "EU 41 (US 8.5)",
        stock: 8,
        skuSuffix: "41-OXB",
        measurementsInch: { footLength: 10.4 },
        measurementsCm: { footLength: 26.4 }
      },
      {
        sizeLabel: "EU 42 (US 9.0)",
        stock: 12,
        skuSuffix: "42-OXB",
        measurementsInch: { footLength: 10.7 },
        measurementsCm: { footLength: 27.2 }
      },
      {
        sizeLabel: "EU 43 (US 10.0)",
        stock: 9,
        skuSuffix: "43-OXB",
        measurementsInch: { footLength: 11.0 },
        measurementsCm: { footLength: 27.9 }
      },
      {
        sizeLabel: "EU 44 (US 11.0)",
        stock: 4,
        skuSuffix: "44-OXB",
        measurementsInch: { footLength: 11.3 },
        measurementsCm: { footLength: 28.7 }
      }
    ],
    isNewCollection: true,
    isTrending: true,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 38,
    createdAt: "2026-03-14T10:00:00Z",
    description: "Bench-made Chelsea boots sculpted on an almond-toe last from supple full-grain Italian leather. Goodyear-inspired Blake stitch construction allows full resoling.",
    editorialHighlights: ["Full-Grain Italian Calfskin", "Blake Stitched Sole", "Reinforced Elastic Gussets", "Leather Heel with Rubber Cap"]
  },

  {
    id: "prod-shoe-suede-loafer",
    slug: "artisanal-suede-penny-loafers",
    name: "Artisanal Suede Penny Loafers",
    subtitle: "Water-repellent repello calf suede with unlined vamp for sockless comfort",
    dressType: "Loafers",
    mainCategory: "FOOTWEAR",
    gender: "UNISEX",
    ageGroup: "ADULT",
    fabricType: "Full-Grain Italian Leather",
    careInstructions: "Brush with brass suede brush. Treat with waterproof mist.",
    fitType: "Regular Fit",
    basePrice: 7900,
    currency: "BDT",
    primaryColor: "Snuff Suede Tobacco",
    primaryColorHex: "#785338",
    colorVariants: [
      {
        colorName: "Snuff Suede Tobacco",
        colorHex: "#785338",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526206/ecwearable/products/prod-shoe-suede-loafer/snuff-suede-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526206/ecwearable/products/prod-shoe-suede-loafer/snuff-suede-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526207/ecwearable/products/prod-shoe-suede-loafer/snuff-suede-3-detail.webp"
        ]
      }
    ],
    sizes: [
      {
        sizeLabel: "EU 41",
        stock: 6,
        skuSuffix: "41-SNF",
        measurementsInch: { footLength: 10.4 },
        measurementsCm: { footLength: 26.4 }
      },
      {
        sizeLabel: "EU 42",
        stock: 10,
        skuSuffix: "42-SNF",
        measurementsInch: { footLength: 10.7 },
        measurementsCm: { footLength: 27.2 }
      },
      {
        sizeLabel: "EU 43",
        stock: 7,
        skuSuffix: "43-SNF",
        measurementsInch: { footLength: 11.0 },
        measurementsCm: { footLength: 27.9 }
      }
    ],
    isNewCollection: false,
    isTrending: true,
    isFeatured: false,
    rating: 4.8,
    reviewsCount: 29,
    createdAt: "2026-02-24T15:00:00Z",
    description: "The definitive sartorial summer loafer. Unlined through the forefoot for immediate flexibility and lightweight breathability alongside tailored linen trousers or shorts.",
    editorialHighlights: ["Repello Suede", "Unlined Breathable Vamp", "Goodyear Welted Leather Sole", "Stacked Leather Heel"]
  },

  {
    id: "prod-jewelry-silver-cuff",
    slug: "sterling-silver-minimalist-cuff-bracelet",
    name: "Sterling Silver Minimalist Cuff Bracelet",
    subtitle: "Solid 925 sterling silver with hand-beveled edges and matte satin finish",
    dressType: "Bracelet",
    mainCategory: "WEARABLES",
    gender: "UNISEX",
    ageGroup: "ADULT",
    fabricType: "316L Surgical Stainless Steel",
    careInstructions: "Wipe with silver polishing cloth to maintain radiant patina.",
    fitType: "Adjustable",
    basePrice: 3800,
    currency: "BDT",
    primaryColor: "Satin Silver",
    primaryColorHex: "#D0D3D4",
    colorVariants: [
      {
        colorName: "Satin Silver",
        colorHex: "#D0D3D4",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526185/ecwearable/products/prod-jewelry-silver-cuff/satin-silver-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526185/ecwearable/products/prod-jewelry-silver-cuff/satin-silver-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526187/ecwearable/products/prod-jewelry-silver-cuff/satin-silver-3-detail.webp"
        ]
      }
    ],
    sizes: [
      {
        sizeLabel: "Medium (Wrist 6.5-7.5\")",
        stock: 14,
        skuSuffix: "MED-SLV",
        measurementsInch: { wristOrCase: 7.0 },
        measurementsCm: { wristOrCase: 17.8 }
      },
      {
        sizeLabel: "Large (Wrist 7.5-8.5\")",
        stock: 8,
        skuSuffix: "LRG-SLV",
        measurementsInch: { wristOrCase: 8.0 },
        measurementsCm: { wristOrCase: 20.3 }
      }
    ],
    isNewCollection: true,
    isTrending: false,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 20,
    createdAt: "2026-03-16T11:30:00Z",
    description: "Forged in solid 925 silver with understated beveling, this open cuff adjusts gently with hand pressure to sit flush against the wrist.",
    editorialHighlights: ["Solid 925 Sterling Silver", "Hand-Beveled Silhouette", "Subtle Internal Hallmark", "Velvet Presentation Pouch"]
  },

  {
    id: "prod-jewelry-braided-wristband",
    slug: "braided-leather-brass-wristband",
    name: "Braided Leather & Brass Wristband",
    subtitle: "English vegetable-tanned bridle cord with hand-cast solid brass shackle hook",
    dressType: "Bracelet",
    mainCategory: "WEARABLES",
    gender: "UNISEX",
    ageGroup: "ADULT",
    fabricType: "Full-Grain Italian Leather",
    careInstructions: "Keep dry. Wipe brass clasp with dry cotton cloth.",
    fitType: "Adjustable",
    basePrice: 1950,
    currency: "BDT",
    primaryColor: "Espresso & Brass",
    primaryColorHex: "#3E2723",
    colorVariants: [
      {
        colorName: "Espresso & Brass",
        colorHex: "#3E2723",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526184/ecwearable/products/prod-jewelry-braided-wristband/espresso-brass-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526185/ecwearable/products/prod-jewelry-braided-wristband/espresso-brass-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526185/ecwearable/products/prod-jewelry-braided-wristband/espresso-brass-3-detail.webp"
        ]
      }
    ],
    sizes: [
      {
        sizeLabel: "Standard (19cm)",
        stock: 22,
        skuSuffix: "19CM-BRS",
        measurementsInch: { wristOrCase: 7.5 },
        measurementsCm: { wristOrCase: 19.0 }
      }
    ],
    isNewCollection: false,
    isTrending: true,
    isFeatured: false,
    rating: 4.8,
    reviewsCount: 33,
    createdAt: "2026-02-01T10:00:00Z",
    description: "Four-strand braided Italian cord paired with a custom marine screw-pin shackle in solid raw brass that patinas alongside your daily wear.",
    editorialHighlights: ["Full-Grain Bridle Cord", "Solid Cast Brass Hardware", "Screw-Pin Marine Shackle", "Hand-Braided"]
  },

  {
    id: "prod-men-linen-blazer",
    slug: "tailored-normandy-linen-blazer",
    name: "Tailored Normandy Linen Blazer",
    subtitle: "Unstructured single-breasted blazer in breathable Normandy flax with horn buttons",
    dressType: "Blazer",
    mainCategory: "GARMENTS",
    gender: "MALE",
    ageGroup: "ADULT",
    fabricType: "Pure European Linen",
    fabricWeightGsm: 240,
    careInstructions: "Dry clean or gentle steam. Do not tumble dry.",
    fitType: "Tailored Fit",
    basePrice: 9450,
    discountPrice: 8500,
    currency: "BDT",
    primaryColor: "Oatmeal Flax",
    primaryColorHex: "#D8C7B5",
    colorVariants: [
      {
        colorName: "Oatmeal Flax",
        colorHex: "#D8C7B5",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526196/ecwearable/products/prod-men-linen-blazer/oatmeal-flax-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526194/ecwearable/products/prod-men-linen-blazer/oatmeal-flax-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526194/ecwearable/products/prod-men-linen-blazer/oatmeal-flax-3-detail.webp"
        ]
      }
    ],
    sizes: [
      {
        sizeLabel: "38R",
        stock: 10,
        skuSuffix: "38R-BLZ",
        measurementsInch: { chest: 40.0, shoulder: 17.5, length: 29.0, sleeve: 25.0 },
        measurementsCm: { chest: 101.6, shoulder: 44.5, length: 73.7, sleeve: 63.5 }
      },
      {
        sizeLabel: "40R",
        stock: 14,
        skuSuffix: "40R-BLZ",
        measurementsInch: { chest: 42.0, shoulder: 18.2, length: 29.5, sleeve: 25.5 },
        measurementsCm: { chest: 106.7, shoulder: 46.2, length: 74.9, sleeve: 64.8 }
      },
      {
        sizeLabel: "42R",
        stock: 8,
        skuSuffix: "42R-BLZ",
        measurementsInch: { chest: 44.0, shoulder: 19.0, length: 30.0, sleeve: 26.0 },
        measurementsCm: { chest: 111.8, shoulder: 48.3, length: 76.2, sleeve: 66.0 }
      }
    ],
    isNewCollection: true,
    isTrending: true,
    isFeatured: true,
    rating: 4.95,
    reviewsCount: 38,
    createdAt: "2026-03-22T10:00:00Z",
    description: "An unstructured tailoring masterpiece crafted with high-density Normandy linen. Half-lined in breathable Bemberg silk for warm-weather lightness.",
    editorialHighlights: ["Pure Normandy Flax", "Genuine Natural Horn Buttons", "Unstructured Soft Shoulder", "Dual Rear Vents"]
  },

  {
    id: "prod-women-trench-coat",
    slug: "gabardine-atelier-trench-coat",
    name: "Belted Atelier Gabardine Trench",
    subtitle: "Double-breasted storm-flap trench tailored from water-repellent organic cotton gabardine",
    dressType: "Overcoat",
    mainCategory: "GARMENTS",
    gender: "FEMALE",
    ageGroup: "ADULT",
    fabricType: "100% Organic Cotton",
    fabricWeightGsm: 280,
    careInstructions: "Specialist dry clean. Cool iron under cloth.",
    fitType: "Relaxed Fit",
    basePrice: 11200,
    discountPrice: 9800,
    currency: "BDT",
    primaryColor: "Caramel Honey",
    primaryColorHex: "#C19A6B",
    colorVariants: [
      {
        colorName: "Caramel Honey",
        colorHex: "#C19A6B",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526229/ecwearable/products/prod-women-trench-coat/caramel-honey-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526228/ecwearable/products/prod-women-trench-coat/caramel-honey-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526229/ecwearable/products/prod-women-trench-coat/caramel-honey-3-detail.webp"
        ]
      }
    ],
    sizes: [
      {
        sizeLabel: "S",
        stock: 9,
        skuSuffix: "S-TRN",
        measurementsInch: { chest: 39.0, shoulder: 16.5, length: 44.0, sleeve: 24.0 },
        measurementsCm: { chest: 99.0, shoulder: 42.0, length: 111.8, sleeve: 61.0 }
      },
      {
        sizeLabel: "M",
        stock: 15,
        skuSuffix: "M-TRN",
        measurementsInch: { chest: 41.0, shoulder: 17.2, length: 45.0, sleeve: 24.5 },
        measurementsCm: { chest: 104.1, shoulder: 43.7, length: 114.3, sleeve: 62.2 }
      },
      {
        sizeLabel: "L",
        stock: 7,
        skuSuffix: "L-TRN",
        measurementsInch: { chest: 43.5, shoulder: 18.0, length: 45.5, sleeve: 25.0 },
        measurementsCm: { chest: 110.5, shoulder: 45.7, length: 115.6, sleeve: 63.5 }
      }
    ],
    isNewCollection: true,
    isTrending: true,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 42,
    createdAt: "2026-03-24T12:00:00Z",
    description: "An architectural double-breasted trench featuring an exaggerated lapel, raglan shoulders, storm shield, and a cinched self-fabric waist belt.",
    editorialHighlights: ["High-Density Cotton Gabardine", "Detachable Buckled Belt", "Storm Flap Architecture", "Horn Buttons"]
  },

  {
    id: "prod-women-silk-gown",
    slug: "flowing-mulberry-silk-evening-gown",
    name: "Flowing Mulberry Silk Evening Gown",
    subtitle: "Floor-length bias-cut pure silk gown with fluid liquid drape and delicate halter neckline",
    dressType: "Dress",
    mainCategory: "GARMENTS",
    gender: "FEMALE",
    ageGroup: "ADULT",
    fabricType: "Mulberry Silk",
    fabricWeightGsm: 115,
    careInstructions: "Dry clean only. Steam with silk attachment.",
    fitType: "Regular Fit",
    basePrice: 12500,
    currency: "BDT",
    primaryColor: "Midnight Obsidian",
    primaryColorHex: "#151515",
    colorVariants: [
      {
        colorName: "Midnight Obsidian",
        colorHex: "#151515",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526227/ecwearable/products/prod-women-silk-gown/midnight-obsidian-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526228/ecwearable/products/prod-women-silk-gown/midnight-obsidian-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526228/ecwearable/products/prod-women-silk-gown/midnight-obsidian-3-detail.webp"
        ]
      }
    ],
    sizes: [
      {
        sizeLabel: "S",
        stock: 6,
        skuSuffix: "S-GWN",
        measurementsInch: { chest: 34.0, waist: 27.0, length: 56.0 },
        measurementsCm: { chest: 86.4, waist: 68.6, length: 142.2 }
      },
      {
        sizeLabel: "M",
        stock: 8,
        skuSuffix: "M-GWN",
        measurementsInch: { chest: 36.5, waist: 29.5, length: 57.0 },
        measurementsCm: { chest: 92.7, waist: 74.9, length: 144.8 }
      }
    ],
    isNewCollection: true,
    isTrending: true,
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 29,
    createdAt: "2026-03-25T14:30:00Z",
    description: "Cut on the bias from opulent 22-momme Rajshahi mulberry silk, this silhouette cascades effortlessly over curves with tactile liquid sheen.",
    editorialHighlights: ["22-Momme Pure Mulberry Silk", "Bias-Cut Fluid Drape", "French Clean Seams", "Floor Grazing Hemline"]
  },

  {
    id: "prod-bag-leather-duffel",
    slug: "tapioca-full-grain-leather-weekender",
    name: "Full-Grain Leather Weekender Duffel",
    subtitle: "Heavyweight vegetable-tanned Tuscan leather travel holdall with brass YKK Excella zippers",
    dressType: "Bag",
    mainCategory: "WEARABLES",
    gender: "UNISEX",
    ageGroup: "ADULT",
    fabricType: "Full-Grain Italian Leather",
    careInstructions: "Condition with beeswax leather balm twice yearly.",
    fitType: "Regular Fit",
    basePrice: 14800,
    discountPrice: 13500,
    currency: "BDT",
    primaryColor: "Cognac Amber",
    primaryColorHex: "#9E5B28",
    colorVariants: [
      {
        colorName: "Cognac Amber",
        colorHex: "#9E5B28",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526182/ecwearable/products/prod-bag-leather-duffel/cognac-amber-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526182/ecwearable/products/prod-bag-leather-duffel/cognac-amber-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526183/ecwearable/products/prod-bag-leather-duffel/cognac-amber-3-detail.webp"
        ]
      }
    ],
    sizes: [
      {
        sizeLabel: "45L Standard",
        stock: 12,
        skuSuffix: "45L-DUF",
        measurementsInch: { length: 21.0, chest: 11.5 },
        measurementsCm: { length: 53.3, chest: 29.2 }
      }
    ],
    isNewCollection: true,
    isTrending: true,
    isFeatured: true,
    rating: 4.95,
    reviewsCount: 51,
    createdAt: "2026-03-21T09:00:00Z",
    description: "Constructed from thick 2.2mm Tuscan hide with reinforced hand-riveted handles and an adjustable wool-padded shoulder strap.",
    editorialHighlights: ["2.2mm Tuscan Calfskin", "Hand-Riveted Stress Points", "Solid Antique Brass Hardware", "Passport Quick-Access Pocket"]
  },

  {
    id: "prod-eyewear-aviator",
    slug: "titanium-minimalist-aviator-sunglasses",
    name: "Japanese Titanium Aviator Sunglasses",
    subtitle: "Ultra-lightweight aerospace titanium frames with anti-reflective polarized Zeiss lenses",
    dressType: "Eyewear",
    mainCategory: "WEARABLES",
    gender: "UNISEX",
    ageGroup: "ADULT",
    fabricType: "Sapphire Crystal & Titanium",
    careInstructions: "Clean with microfiber cloth and lens solution.",
    fitType: "Regular Fit",
    basePrice: 5200,
    currency: "BDT",
    primaryColor: "Gunmetal & Charcoal",
    primaryColorHex: "#2C3539",
    colorVariants: [
      {
        colorName: "Gunmetal & Charcoal",
        colorHex: "#2C3539",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526182/ecwearable/products/prod-eyewear-aviator/gunmetal-charcoal-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526183/ecwearable/products/prod-eyewear-aviator/gunmetal-charcoal-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526184/ecwearable/products/prod-eyewear-aviator/gunmetal-charcoal-3-detail.webp"
        ]
      }
    ],
    sizes: [
      {
        sizeLabel: "54mm (Universal)",
        stock: 18,
        skuSuffix: "54MM-TIT",
        measurementsInch: { wristOrCase: 5.5 },
        measurementsCm: { wristOrCase: 14.0 }
      }
    ],
    isNewCollection: false,
    isTrending: true,
    isFeatured: false,
    rating: 4.88,
    reviewsCount: 24,
    createdAt: "2026-02-18T16:00:00Z",
    description: "Weighing only 18 grams, forged from beta-titanium with precision silicone nose pads and 100% UVA/UVB Carl Zeiss polarized optic glass.",
    editorialHighlights: ["18g Beta-Titanium Frame", "Carl Zeiss Polarized Optics", "Hypoallergenic Nose Pads", "Hand-Stitched Leather Case"]
  },

  {
    id: "prod-wear-merino-scarf",
    slug: "handwoven-merino-cashmere-fringe-scarf",
    name: "Handwoven Merino Cashmere Fringe Scarf",
    subtitle: "Featherlight oversized winter drape woven from combed extrafine Merino & Mongolian cashmere",
    dressType: "Scarf",
    mainCategory: "WEARABLES",
    gender: "UNISEX",
    ageGroup: "ADULT",
    fabricType: "Fine Cashmere Blend",
    fabricWeightGsm: 160,
    careInstructions: "Hand wash cold with wool detergent. Dry flat.",
    fitType: "Regular Fit",
    basePrice: 3800,
    currency: "BDT",
    primaryColor: "Camel Ivory",
    primaryColorHex: "#C19A6B",
    colorVariants: [
      {
        colorName: "Camel Ivory",
        colorHex: "#C19A6B",
        images: [
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526220/ecwearable/products/prod-wear-merino-scarf/camel-ivory-1-front.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526220/ecwearable/products/prod-wear-merino-scarf/camel-ivory-2-angle.webp",
          "https://res.cloudinary.com/dg5gwims9/image/upload/f_auto,q_auto/v1795526221/ecwearable/products/prod-wear-merino-scarf/camel-ivory-3-detail.webp"
        ]
      }
    ],
    sizes: [
      {
        sizeLabel: "200cm × 70cm",
        stock: 25,
        skuSuffix: "200X70-SCF",
        measurementsInch: { length: 78.5, chest: 27.5 },
        measurementsCm: { length: 200.0, chest: 70.0 }
      }
    ],
    isNewCollection: true,
    isTrending: true,
    isFeatured: true,
    rating: 4.92,
    reviewsCount: 36,
    createdAt: "2026-03-20T11:00:00Z",
    description: "Spun in Nepal from blended grade-A Mongolian cashmere and Australian merino. Finished with eyelash hand-twisted fringe details.",
    editorialHighlights: ["70% Merino 30% Cashmere", "Eyelash Hand-Twisted Fringe", "Air-Spun Featherlight Warmth", "Generous Oversized Wrap"]
  }
];
