export class CreateProductDto {
  name: string;
  subtitle: string;
  dressType: string;
  mainCategory: 'GARMENTS' | 'WEARABLES' | 'FOOTWEAR';
  gender: 'MALE' | 'FEMALE' | 'UNISEX' | 'KIDS_BOY' | 'KIDS_GIRL';
  ageGroup: 'ADULT' | 'CHILDREN' | 'TODDLER';
  fabricType: string;
  fabricWeightGsm?: number;
  careInstructions: string;
  fitType: string;
  basePrice: number;
  discountPrice?: number;
  currency: string;
  primaryColor: string;
  primaryColorHex: string;
  isNewCollection?: boolean;
  isTrending?: boolean;
  isFeatured?: boolean;
  description?: string;
  editorialHighlights?: string[];
  sizes: Array<{
    sizeLabel: string;
    stock: number;
    skuSuffix: string;
    measurementsInch?: Record<string, number>;
    measurementsCm?: Record<string, number>;
  }>;
  colorVariants: Array<{
    colorName: string;
    colorHex: string;
    images: string[];
  }>;
}
