import { Product } from "@/types/commerce";

export const SEED_PRODUCTS: Product[] = [
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
          "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80"
        ]
      },
      {
        colorName: "Botanical Cypress",
        colorHex: "#2D4A3E",
        images: [
          "https://images.unsplash.com/photo-1620012253295-c15c429f66bf?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=80"
        ]
      },
      {
        colorName: "Midnight Espresso",
        colorHex: "#181816",
        images: [
          "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80"
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
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=80"
        ]
      },
      {
        colorName: "Midnight Navy",
        colorHex: "#1B2430",
        images: [
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1000&q=80"
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
          "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80"
        ]
      },
      {
        colorName: "Obsidian Charcoal",
        colorHex: "#141413",
        images: [
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80"
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
          "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80"
        ]
      },
      {
        colorName: "Deep Espresso",
        colorHex: "#141413",
        images: [
          "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1000&q=80"
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
          "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1000&q=80"
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
          "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80"
        ]
      },
      {
        colorName: "Crimson Rust",
        colorHex: "#8D3426",
        images: [
          "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=80"
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
          "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80"
        ]
      },
      {
        colorName: "Warm Sand",
        colorHex: "#E5DEC9",
        images: [
          "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80"
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
          "https://images.unsplash.com/photo-1583391733975-00c7324bbbe4?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&w=1000&q=80"
        ]
      },
      {
        colorName: "Ecru Ivory",
        colorHex: "#F8F5EE",
        images: [
          "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=80"
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
          "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"
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
          "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80"
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
          "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1514315384763-ba401779410f?auto=format&fit=crop&w=1000&q=80"
        ]
      },
      {
        colorName: "Raw Silk Off-White",
        colorHex: "#FAF6EF",
        images: [
          "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1000&q=80"
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
          "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=1000&q=80"
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
          "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1000&q=80"
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
          "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1471286174890-9c112ffca564?auto=format&fit=crop&w=1000&q=80"
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
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80"
        ]
      },
      {
        colorName: "Midnight Blackout",
        colorHex: "#141413",
        images: [
          "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=1000&q=80"
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
          "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80"
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
          "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80"
        ]
      },
      {
        colorName: "Obsidian Black",
        colorHex: "#141413",
        images: [
          "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=1000&q=80"
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
          "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80"
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
          "https://images.unsplash.com/photo-1611591475102-460a7f58000f?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80"
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
          "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1611591475102-460a7f58000f?auto=format&fit=crop&w=1000&q=80"
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
  }
];
