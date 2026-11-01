export type TargetGender = 'MALE' | 'FEMALE' | 'UNISEX' | 'KIDS_BOY' | 'KIDS_GIRL';
export type AgeGroup = 'ADULT' | 'CHILDREN' | 'TODDLER';
export type MainCategory = 'GARMENTS' | 'WEARABLES' | 'FOOTWEAR';

export type FabricOrMaterial =
  | '100% Organic Cotton'
  | 'Pure European Linen'
  | 'Cotton-Linen Blend'
  | 'Egyptian Giza Cotton'
  | 'Mulberry Silk'
  | 'Dhakai Jamdani / Muslin'
  | 'Raw Japanese Denim'
  | 'Merino Wool'
  | 'Full-Grain Italian Leather'
  | '316L Surgical Stainless Steel'
  | 'Sapphire Crystal & Titanium'
  | 'Fine Cashmere Blend';

export interface SizeMeasurement {
  sizeLabel: string; // e.g., "XS", "S", "M", "L", "XL", "XXL", "4-5Y", "EU 42", "40mm", "19cm"
  stock: number;
  skuSuffix: string;
  measurementsInch: {
    chest?: number;
    waist?: number;
    shoulder?: number;
    length?: number;
    sleeve?: number;
    inseam?: number;
    footLength?: number;
    wristOrCase?: number;
  };
  measurementsCm: {
    chest?: number;
    waist?: number;
    shoulder?: number;
    length?: number;
    sleeve?: number;
    inseam?: number;
    footLength?: number;
    wristOrCase?: number;
  };
}

export interface ColorVariant {
  colorName: string;
  colorHex: string;
  images: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  dressType: string;
  mainCategory: MainCategory;
  gender: TargetGender;
  ageGroup: AgeGroup;
  fabricType: FabricOrMaterial;
  fabricWeightGsm?: number;
  careInstructions: string;
  fitType: 'Relaxed Fit' | 'Tailored Fit' | 'Regular Fit' | 'Oversized' | 'Adjustable';
  basePrice: number;
  discountPrice?: number;
  currency: 'BDT' | 'USD';
  primaryColor: string;
  primaryColorHex: string;
  colorVariants: ColorVariant[];
  sizes: SizeMeasurement[];
  isNewCollection: boolean;
  isTrending: boolean;
  isFeatured: boolean;
  rating: number;
  reviewsCount: number;
  createdAt: string;
  description?: string;
  editorialHighlights?: string[];
}

export interface CartItem {
  id: string; // unique item id: productId-colorName-sizeLabel
  product: Product;
  selectedColor: ColorVariant;
  selectedSize: SizeMeasurement;
  quantity: number;
}

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zone: 'DHAKA_METRO' | 'NATIONWIDE' | 'INTERNATIONAL';
  postalCode: string;
  deliveryNotes?: string;
}

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PACKED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
export type PaymentMethod = 'CASH_ON_DELIVERY' | 'BKASH_NAGAD' | 'CREDIT_CARD';

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  customer: OrderCustomer;
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'PAID' | 'PENDING';
  orderStatus: OrderStatus;
  createdAt: string;
  estimatedDelivery: string;
  timeline: {
    status: OrderStatus;
    timestamp: string;
    note: string;
  }[];
}
