import { NextRequest, NextResponse } from "next/server";
import { SEED_PRODUCTS } from "@/data/seedProducts";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = SEED_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return NextResponse.json(
      { success: false, error: "Product not found" },
      { status: 404 }
    );
  }

  // Related complete the look products
  const related = SEED_PRODUCTS.filter(
    (p) => p.id !== product.id && p.mainCategory !== product.mainCategory
  ).slice(0, 3);

  return NextResponse.json({
    success: true,
    product,
    related,
  });
}
